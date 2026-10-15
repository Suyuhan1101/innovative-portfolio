"""Prepare the supplied WAV for the website and validate the complete MP3."""

import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import wave


def sha256(path: Path) -> str:
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def run_ffmpeg(executable: Path, arguments: list[str]) -> subprocess.CompletedProcess:
    result = subprocess.run(
        [str(executable), "-hide_banner", "-loglevel", "error", "-nostdin", *arguments],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    if result.returncode:
        raise RuntimeError(result.stderr.decode("utf-8", errors="replace"))
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ffmpeg", type=Path, required=True)
    args = parser.parse_args()
    executable = args.ffmpeg.resolve(strict=True)
    root = Path(__file__).resolve().parents[1]
    manifest_path = root / "docs/content/about-me-media.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8-sig"))
    original = manifest["audio"]
    source = root / original["path"]
    if sha256(source) != original["sha256"]:
        raise ValueError("The original WAV does not match the recorded source.")

    with wave.open(str(source), "rb") as wav:
        channels = wav.getnchannels()
        rate = wav.getframerate()
        frames = wav.getnframes()
        if (channels, rate, wav.getsampwidth()) != (2, 44100, 2):
            raise ValueError("Expected the supplied stereo 44.1kHz, 16-bit WAV.")

    relative_output = "public/media/about-me/flower-dance-320.mp3"
    output = root / relative_output
    output.parent.mkdir(parents=True, exist_ok=True)
    if output.exists():
        raise FileExistsError(f"Preserving the existing file: {output}")

    run_ffmpeg(executable, [
        "-n", "-i", str(source), "-map", "0:a:0", "-vn",
        "-c:a", "libmp3lame", "-b:a", "320k", "-compression_level", "0",
        "-ar", str(rate), "-ac", str(channels), "-map_metadata", "-1",
        "-metadata", "title=Flower Dance", "-metadata", "artist=DJ Okawari",
        "-id3v2_version", "3", "-write_xing", "1", str(output),
    ])

    # Read the first MPEG frame after the ID3 tag to check the encoded stream.
    with output.open("rb") as stream:
        start = stream.read(10)
        tag_size = 0
        if start[:3] == b"ID3":
            for value in start[6:10]:
                tag_size = (tag_size << 7) | (value & 0x7F)
            stream.seek(10 + tag_size)
        else:
            stream.seek(0)
        header = int.from_bytes(stream.read(4), "big")
    if header >> 21 != 0x7FF or (header >> 19) & 3 != 3 or (header >> 17) & 3 != 1:
        raise ValueError("Expected an MPEG-1 Layer III stream.")
    if (header >> 12) & 15 != 14 or (header >> 10) & 3 != 0 or (header >> 6) & 3 == 3:
        raise ValueError("MP3 does not have the requested 320kbps stereo 44.1kHz format.")

    decoded = run_ffmpeg(executable, [
        "-i", str(output), "-map", "0:a:0", "-f", "s16le",
        "-acodec", "pcm_s16le", "pipe:1",
    ]).stdout
    decoded_frames, remainder = divmod(len(decoded), channels * 2)
    if remainder or decoded_frames != frames:
        raise ValueError("Decoded duration does not match the complete source WAV.")
    if sha256(source) != original["sha256"]:
        raise ValueError("Source WAV changed during conversion.")

    size = output.stat().st_size
    playback = {
        "path": relative_output,
        "src": "/media/about-me/flower-dance-320.mp3",
        "mime_type": "audio/mpeg",
        "encoding": "MP3 / LAME",
        "bitrate": 320000,
        "sample_rate": rate,
        "channels": channels,
        "duration_seconds": decoded_frames / rate,
        "bytes": size,
        "sha256": sha256(output),
        "smaller_percent": round((1 - size / original["bytes"]) * 100, 2),
        "validation": {
            "full_decode_passed": True,
            "mpeg_header_passed": True,
            "source_frames": frames,
            "decoded_frames": decoded_frames,
            "original_hash_unchanged": True,
        },
    }
    original["playback_version"] = "mp3-320kbps"
    original["playback"] = playback
    original["interaction"] = "planned: click-to-load; manual play; preload=none"
    manifest["status"] = "source assets prepared; web audio encoded; page integration pending"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(playback, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
