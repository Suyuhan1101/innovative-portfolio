"""Prepare the three supplied swimming clips for the Hobby Sport page.

Usage: python scripts/prepare-swimming-videos.py VIDEO_1 VIDEO_2 VIDEO_3
Preserves local originals and the encoded video stream, creates silent fast-start
MP4s and posters, and verifies that each web copy has identical video packets.
"""
import importlib.util
import json
from pathlib import Path
import re
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("hobby_media", ROOT / "scripts/prepare-hobby-videos.py")
media = importlib.util.module_from_spec(spec)
spec.loader.exec_module(media)


def video_hash(path):
    return media.run("-loglevel", "error", "-i", str(path), "-map", "0:v:0", "-c:v", "copy", "-an", "-f", "hash", "-hash", "sha256", "pipe:1").decode().strip().split("=", 1)[1]


def main():
    if len(sys.argv) != 4:
        raise SystemExit(__doc__)
    destination = ROOT / "public/media/hobby"
    originals = ROOT / "assets/originals/hobby"
    destination.mkdir(parents=True, exist_ok=True)
    originals.mkdir(parents=True, exist_ok=True)
    manifest = []
    for index, source_arg in enumerate(sys.argv[1:], 1):
        slug = f"swimming-{index:02d}"
        source = Path(source_arg)
        source_hash = media.sha256(source)
        original = originals / f"{slug}.mp4"
        if original.exists():
            if media.sha256(original) != source_hash:
                raise ValueError(f"A different original already exists for {slug}")
        else:
            shutil.copy2(source, original)
        details = media.probe(original)
        size = re.search(r"Video: h264.*?\b(\d{2,5})x(\d{2,5})\b", details)
        time = re.search(r"Duration: (\d+):(\d+):([\d.]+)", details)
        if not size or not time:
            raise ValueError(f"Expected a complete H.264 swimming clip: {slug}")
        width, encoded_height = map(int, size.groups())
        sar = re.search(r"SAR (\d+):(\d+)", details)
        height = round(encoded_height * int(sar[2]) / int(sar[1])) if sar else encoded_height
        duration = int(time[1]) * 3600 + int(time[2]) * 60 + float(time[3])
        output = destination / f"{slug}.mp4"
        poster = destination / f"{slug}.jpg"
        media.run("-loglevel", "error", "-y", "-i", str(original), "-map", "0:v:0", "-c:v", "copy", "-an", "-map_metadata", "-1", "-map_chapters", "-1", "-movflags", "+faststart", str(output))
        poster_second = min(30, duration / 3)
        media.run("-loglevel", "error", "-y", "-ss", str(poster_second), "-i", str(output), "-frames:v", "1", "-vf", f"scale={width}:{height},setsar=1", "-q:v", "3", "-map_metadata", "-1", str(poster))
        output_details = media.probe(output)
        if "Audio:" in output_details or "location" in output_details.lower():
            raise ValueError(f"Unexpected audio or source location metadata in {slug}")
        original_video_hash = video_hash(original)
        output_video_hash = video_hash(output)
        if original_video_hash != output_video_hash:
            raise ValueError(f"Encoded video stream changed for {slug}")
        if media.sha256(source) != source_hash or media.sha256(original) != source_hash:
            raise ValueError(f"Original changed for {slug}")
        manifest.append({
            "id": slug, "src": f"/media/hobby/{slug}.mp4", "poster": f"/media/hobby/{slug}.jpg",
            "width": width, "height": height, "encoded_height": encoded_height,
            "duration": duration, "bytes": output.stat().st_size,
            "source_sha256": source_hash, "web_sha256": media.sha256(output),
            "source_video_sha256": original_video_hash, "web_video_sha256": output_video_hash,
            "verified_identical_video_stream": True, "audio_streams": 0, "fast_start": True,
        })
        print(f"{slug}: {duration:.2f}s, display {width}x{height}; identical video stream; silent web copy")
    (ROOT / "docs/media/swimming-videos.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    runtime_fields = ("id", "src", "poster", "width", "height", "duration")
    runtime_manifest = [{key: clip[key] for key in runtime_fields} for clip in manifest]
    (ROOT / "content/swimming-videos.json").write_text(json.dumps(runtime_manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
