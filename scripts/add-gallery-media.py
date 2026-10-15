"""Append the October 15 gallery uploads, preserving original image pixels.

Usage: python scripts/add-gallery-media.py IMAGE_DIRECTORY WATERFALL_VIDEO
Originals stay in ignored assets/originals/gallery. JPEG metadata is removed
without re-encoding; the new video uses the existing silent-video workflow.
"""
from pathlib import Path
import hashlib
import importlib.util
import json
import shutil
import sys

from PIL import Image

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
INPUTS = [
    ("26-classroom-cards", "c9364d08-6e09-4791-8fc6-7e9c9af37a82"),
    ("27-desert-tree", "480baced-7705-4d75-a689-1abce9cb66d4"),
    ("28-lake-reflections", "df42e2a8-cc96-4bde-b00b-767069c65dfb"),
    ("29-lake-shore", "92aef36f-2bc6-4c47-86df-d7d95e642355"),
    ("30-turquoise-lake", "c5a01977-e2f5-4dd1-b03e-12bcc999a885"),
    ("31-rock-window", "53fd1080-6b34-4dd6-9dd0-8346684499f7"),
    ("32-temple-lanterns", "af2803ea-77a9-4a5c-826a-96f7b5449251"),
    ("33-bookshop-aisle", "3233845b-24fc-4bdb-85ef-300aa64801d0"),
    ("34-reflecting-pool", "af543d0c-a0bc-4bd5-9a82-0f396ac0cd97"),
    ("35-stone-passage", "ab3b0dff-cd61-4d44-be0a-44dc6c5ed0cc"),
    ("36-library-steps", "f78548c9-9c6b-4746-b6b0-52e9b426de83"),
    ("37-beach-walk", "69b4d072-9ede-4c91-aa33-14f4876472b1"),
    ("38-cafe-interior", "39b04185-f2bc-455c-9bb3-39d5c0d1925e"),
    ("39-wetland-airboat", "19df5cb5-f601-4b30-a1c6-1fc700c6c3cd"),
    ("40-canyon-bridge", "c425d46c-bb85-4fd8-b186-aa42be65bd11"),
    ("41-green-valley", "f06ec387-0958-48a7-b76c-a7bdce9598d3"),
    ("42-mountain-portrait", "2526ab89-b081-4993-a28a-fb709f924d43"),
    ("43-stone-arch", "703d4120-bc8b-4f12-8108-3dd4add4c9fd"),
]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def preserve(source, destination):
    data = source.read_bytes()
    if destination.exists():
        if destination.read_bytes() != data:
            raise ValueError(f"Different original already exists: {destination.name}")
    else:
        shutil.copy2(source, destination)
    return data


def remove_jpeg_metadata(data):
    if not data.startswith(b"\xff\xd8"):
        raise ValueError("Expected a JPEG")
    output = bytearray(data[:2])
    offset = 2
    while offset < len(data):
        start = offset
        if data[offset] != 0xFF:
            raise ValueError("Unexpected JPEG marker")
        while data[offset] == 0xFF:
            offset += 1
        marker = data[offset]
        offset += 1
        if marker in (0xDA, 0xD9):
            output.extend(data[start:])
            break
        end = offset + int.from_bytes(data[offset:offset + 2], "big")
        # Preserve ICC colour profiles and the original compressed scan data.
        if marker not in (0xE1, 0xED, 0xFE):
            output.extend(data[start:end])
        offset = end
    return bytes(output)


def main():
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    source_directory, video_source = map(Path, sys.argv[1:])
    originals = ROOT / "assets/originals/gallery"
    web = ROOT / "public/media/gallery"
    originals.mkdir(parents=True, exist_ok=True)
    web.mkdir(parents=True, exist_ok=True)
    manifest_path = web / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    existing = {entry["id"]: entry for entry in manifest["images"]}
    report = []
    for image_id, uuid in INPUTS:
        source = source_directory / f"codex-clipboard-{uuid}.jpg"
        original = originals / f"{image_id}.jpg"
        data = preserve(source, original)
        with Image.open(original) as image:
            if image.getexif().get(274, 1) not in (0, 1):
                raise ValueError(f"Orientation requires an explicit transform: {image_id}")
            dimensions = image.size
            pixel_hash = digest(image.tobytes())
        output = web / f"{image_id}.jpg"
        output.write_bytes(remove_jpeg_metadata(data))
        with Image.open(output) as image:
            if image.size != dimensions or digest(image.tobytes()) != pixel_hash:
                raise ValueError(f"Image pixels changed: {image_id}")
            if image.getexif():
                raise ValueError(f"EXIF remains: {image_id}")
        existing[image_id] = {"id": image_id, "src": f"/media/gallery/{image_id}.jpg", "width": dimensions[0], "height": dimensions[1]}
        report.append({**existing[image_id], "source_sha256": digest(data), "web_sha256": digest(output.read_bytes()), "unchanged_pixels": True, "exif_removed": True})
    manifest["images"] = list(existing.values())
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    spec = importlib.util.spec_from_file_location("silent_video", ROOT / "scripts/prepare-hobby-videos.py")
    media = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(media)
    original_video = originals / "waterfall-overlook.mp4"
    video_data = preserve(video_source, original_video)
    video_output = web / "waterfall-overlook.mp4"
    media.run("-loglevel", "error", "-y", "-i", str(original_video), "-map", "0:v:0", "-c:v", "copy", "-an", "-map_metadata", "-1", "-map_chapters", "-1", "-movflags", "+faststart", str(video_output))
    media.run("-loglevel", "error", "-y", "-ss", "12", "-i", str(video_output), "-frames:v", "1", "-q:v", "3", "-map_metadata", "-1", str(web / "waterfall-overlook-poster.jpg"))
    frames = media.frame_hashes(original_video)
    if not frames or frames != media.frame_hashes(video_output) or "Audio:" in media.probe(video_output):
        raise ValueError("Video validation failed")
    (ROOT / "docs/media/gallery-additions.json").write_text(json.dumps({"photos": report, "video": {"src": "/media/gallery/waterfall-overlook.mp4", "width": 720, "height": 1280, "source_sha256": digest(video_data), "web_sha256": digest(video_output.read_bytes()), "audio_streams": 0, "unchanged_video_frames": len(frames)}}, indent=2) + "\n", encoding="utf-8")
    print(f"Added {len(report)} photographs ({len(existing)} total), with identical decoded pixels.")
    print(f"Added silent waterfall video: {len(frames)} unchanged decoded frames.")


if __name__ == "__main__":
    main()
