"""Make silent web copies without re-encoding the supplied H.264 video.

Usage: python scripts/prepare-hobby-videos.py ARM_VIDEO COMPETITION_VIDEO WALKER_VIDEO
Requires imageio-ffmpeg (available in .tools/audio in the development workspace).
Originals are preserved locally; only silent copies and posters belong in public/.
"""
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".tools/audio"))
import imageio_ffmpeg

CLIPS = [
    ("lego-robotic-arm", 10),
    ("robotics-competition", 20),
    ("lego-walking-robot", 2),
]


def sha256(path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def run(*arguments):
    result = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-nostdin", *arguments], capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode("utf-8", errors="replace"))
    return result.stdout


def probe(path):
    result = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-i", str(path)], capture_output=True)
    return result.stderr.decode("utf-8", errors="replace")


def frame_hashes(path):
    output = run("-loglevel", "error", "-i", str(path), "-map", "0:v:0", "-an", "-f", "framemd5", "pipe:1").decode()
    return [line.rsplit(",", 1)[-1].strip() for line in output.splitlines() if line and not line.startswith("#")]


def main():
    if len(sys.argv) != 4:
        raise SystemExit(__doc__)
    destination = ROOT / "public/media/hobby"
    originals = ROOT / "assets/originals/hobby"
    destination.mkdir(parents=True, exist_ok=True)
    originals.mkdir(parents=True, exist_ok=True)
    manifest = []
    for (slug, poster_second), source_arg in zip(CLIPS, sys.argv[1:]):
        source = Path(source_arg)
        source_hash = sha256(source)
        original = originals / f"{slug}.mp4"
        if original.exists():
            if sha256(original) != source_hash:
                raise ValueError(f"A different original already exists for {slug}")
        else:
            shutil.copy2(source, original)
        output = destination / f"{slug}.mp4"
        poster = destination / f"{slug}.jpg"
        run("-loglevel", "error", "-y", "-i", str(original), "-map", "0:v:0", "-c:v", "copy", "-an", "-map_metadata", "-1", "-map_chapters", "-1", "-movflags", "+faststart", str(output))
        run("-loglevel", "error", "-y", "-ss", str(poster_second), "-i", str(output), "-frames:v", "1", "-q:v", "3", "-map_metadata", "-1", str(poster))
        details = probe(output)
        if "Audio:" in details or "location" in details.lower():
            raise ValueError(f"Unexpected audio or location metadata in {slug}")
        original_frames = frame_hashes(original)
        if not original_frames or original_frames != frame_hashes(output):
            raise ValueError(f"Decoded video frames changed for {slug}")
        if sha256(source) != source_hash or sha256(original) != source_hash:
            raise ValueError(f"Original changed for {slug}")
        time = re.search(r"Duration: (\d+):(\d+):([\d.]+)", details)
        size = re.search(r"Video:.*?\b(\d{2,5})x(\d{2,5})\b", details)
        duration = int(time[1]) * 3600 + int(time[2]) * 60 + float(time[3])
        manifest.append({"id": slug, "src": f"/media/hobby/{slug}.mp4", "poster": f"/media/hobby/{slug}.jpg", "width": int(size[1]), "height": int(size[2]), "duration": duration, "bytes": output.stat().st_size, "source_sha256": source_hash, "web_sha256": sha256(output), "audio_streams": 0, "verified_unchanged_video_frames": len(original_frames)})
        print(f"{slug}: {duration:.2f}s; {len(original_frames)} identical decoded frames; no audio stream")
    (ROOT / "docs/media/hobby-videos.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
