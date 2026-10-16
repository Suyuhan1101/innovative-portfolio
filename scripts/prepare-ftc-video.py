"""Prepare the high-school FTC clip, retaining its video and audio streams.

Usage: python scripts/prepare-ftc-video.py SOURCE_VIDEO
Originals stay local. The web MP4 removes source metadata and extra data tracks,
retains H.264/AAC without re-encoding, and moves the MP4 index to the beginning.
"""
import importlib.util
import json
from pathlib import Path
import re
import shutil
import struct
import sys

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("hobby_media", ROOT / "scripts/prepare-hobby-videos.py")
media = importlib.util.module_from_spec(spec)
spec.loader.exec_module(media)


def stream_hash(path, stream):
    return media.run("-loglevel", "error", "-i", str(path), "-map", stream, "-c", "copy", "-f", "hash", "-hash", "sha256", "pipe:1").decode().strip().split("=", 1)[1]


def fast_start(path):
    atoms = []
    with path.open("rb") as file:
        while header := file.read(8):
            size, kind = struct.unpack(">I4s", header)
            header_size = 8
            if size == 1:
                size = struct.unpack(">Q", file.read(8))[0]
                header_size = 16
            if size == 0:
                break
            atoms.append(kind)
            file.seek(size - header_size, 1)
    return b"moov" in atoms and b"mdat" in atoms and atoms.index(b"moov") < atoms.index(b"mdat")


def main():
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    source = Path(sys.argv[1])
    source_hash = media.sha256(source)
    original = ROOT / "assets/originals/hobby/ftc-robot-testing.mp4"
    original.parent.mkdir(parents=True, exist_ok=True)
    if original.exists() and media.sha256(original) != source_hash:
        raise ValueError("A different FTC original already exists")
    if not original.exists():
        shutil.copy2(source, original)
    destination = ROOT / "public/media/hobby"
    destination.mkdir(parents=True, exist_ok=True)
    output = destination / "ftc-robot-testing.mp4"
    poster = destination / "ftc-robot-testing.jpg"
    media.run("-loglevel", "error", "-y", "-i", str(original), "-map", "0:v:0", "-map", "0:a:0", "-c", "copy", "-map_metadata", "-1", "-map_chapters", "-1", "-movflags", "+faststart", str(output))
    media.run("-loglevel", "error", "-y", "-ss", "10", "-i", str(output), "-frames:v", "1", "-q:v", "3", "-map_metadata", "-1", str(poster))
    details = media.probe(output)
    if "location" in details.lower() or "Data:" in details:
        raise ValueError("Unexpected source metadata or data stream in the web copy")
    time = re.search(r"Duration: (\d+):(\d+):([\d.]+)", details)
    size = re.search(r"Video: h264.*?\b(\d{2,5})x(\d{2,5})\b", details)
    if not time or not size or "Audio: aac" not in details:
        raise ValueError("Expected H.264 video and AAC audio")
    hashes = {}
    for kind, selector in [("video", "0:v:0"), ("audio", "0:a:0")]:
        before, after = stream_hash(original, selector), stream_hash(output, selector)
        if before != after:
            raise ValueError(f"Encoded {kind} changed")
        hashes[kind] = before
    if media.sha256(source) != source_hash or media.sha256(original) != source_hash:
        raise ValueError("Original file changed")
    if not fast_start(output):
        raise ValueError("MP4 index must precede the video data")
    manifest = {
        "id": "ftc-robot-testing", "src": "/media/hobby/ftc-robot-testing.mp4",
        "poster": "/media/hobby/ftc-robot-testing.jpg", "poster_second": 10,
        "width": int(size[1]), "height": int(size[2]),
        "duration": int(time[1]) * 3600 + int(time[2]) * 60 + float(time[3]),
        "bytes": output.stat().st_size, "source_sha256": source_hash, "web_sha256": media.sha256(output),
        "video_stream_sha256": hashes["video"], "audio_stream_sha256": hashes["audio"],
        "verified_identical_video_and_audio": True, "audio_streams": 1,
        "default_muted": True, "fast_start": True,
    }
    (ROOT / "docs/media/ftc-robot-testing.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: manifest[key] for key in ("width", "height", "duration", "bytes", "verified_identical_video_and_audio", "fast_start")}))


if __name__ == "__main__":
    main()
