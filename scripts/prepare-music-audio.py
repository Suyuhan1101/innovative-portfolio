"""Preserve the supplied music and covers; encode and fully validate web copies.

Requires imageio-ffmpeg and mutagen (they may be installed in .tools/audio).
"""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".tools/audio"))
import imageio_ffmpeg
import mutagen

TRACKS = [
    ("luv-letter", "Luv Letter", "DJ Okawari", r"D:\无损音乐\Dj_Okawari_-_Luv_Letter.wav", "a87c3d75-93d3-4cc0-ab53-7211703b25d1"),
    ("ballade-pour-adeline", "Ballade pour Adeline", "Richard Clayderman", r"D:\Downloads\Ballade Pour Adeline.flac", "c154614a-41d9-44eb-a6ed-80e3cdcb5772"),
    ("mariage-d-amour", "Mariage d'Amour", "Richard Clayderman", r"D:\Downloads\Mariage d'Amour.flac", "dd93eb37-4e29-4a80-9e88-215dd3769ce1"),
    ("senbonzakura", "Senbonzakura", "Masque_Jupiter", r"D:\Downloads\千本樱.flac", "d17062fc-80cf-462a-8d69-da35d67c97b9"),
    ("the-battle-of-waterloo", "The Battle of Waterloo", "Various artists", r"D:\Downloads\waterloo.flac", "24aff120-eaa7-4532-a413-23dad789ff76"),
]

def sha256(path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()

def preserve(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        if sha256(source) != sha256(target):
            raise ValueError(f"Refusing to replace different existing file: {target}")
    else:
        shutil.copy2(source, target)

def ffmpeg(*arguments):
    result = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-nostdin", *arguments], capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode("utf-8", errors="replace"))
    return result.stdout

manifest = []
for slug, title, artist, source_path, cover_id in TRACKS:
    source = Path(source_path)
    source_hash = sha256(source)
    original = ROOT / f"assets/originals/audio/{slug}{source.suffix}"
    preserve(source, original)
    cover = Path(r"C:\Users\Suyuh\AppData\Local\Temp") / f"codex-clipboard-{cover_id}.png"
    original_cover = ROOT / f"assets/originals/audio/covers/{slug}.png"
    web_cover = ROOT / f"public/media/music/{slug}.png"
    preserve(cover, original_cover)
    preserve(cover, web_cover)
    output = ROOT / f"public/media/music/{slug}-320.mp3"
    if not output.exists():
        ffmpeg("-n", "-i", str(original), "-map", "0:a:0", "-vn", "-c:a", "libmp3lame", "-b:a", "320k", "-compression_level", "0", "-ar", "44100", "-ac", "2", "-map_metadata", "-1", "-metadata", f"title={title}", "-metadata", f"artist={artist}", "-id3v2_version", "3", "-write_xing", "1", str(output))
    # Decode BOTH complete streams to verify no audio has been truncated.
    source_pcm = ffmpeg("-i", str(original), "-map", "0:a:0", "-f", "s16le", "-ar", "44100", "-ac", "2", "pipe:1")
    output_pcm = ffmpeg("-i", str(output), "-map", "0:a:0", "-f", "s16le", "-ar", "44100", "-ac", "2", "pipe:1")
    if len(source_pcm) != len(output_pcm) or len(output_pcm) % 4:
        raise ValueError(f"Duration/frame mismatch: {slug}")
    info = mutagen.File(output).info
    if info.bitrate != 320000 or info.sample_rate != 44100 or info.channels != 2:
        raise ValueError(f"Unexpected playback format: {slug}")
    if sha256(source) != source_hash or sha256(original) != source_hash:
        raise ValueError(f"Original changed: {slug}")
    duration = len(output_pcm) / (44100 * 4)
    manifest.append({"id": slug, "title": title, "artist": artist, "source": str(source), "original": str(original.relative_to(ROOT)), "source_sha256": source_hash, "source_bytes": source.stat().st_size, "playback": str(output.relative_to(ROOT)), "playback_sha256": sha256(output), "playback_bytes": output.stat().st_size, "duration_seconds": duration, "bitrate": info.bitrate, "sample_rate": info.sample_rate, "channels": info.channels, "cover": str(web_cover.relative_to(ROOT)), "cover_sha256": sha256(cover), "validation": {"full_source_and_mp3_decode_passed": True, "matching_pcm_frames": len(output_pcm) // 4, "original_hash_unchanged": True}})
    print(f"{slug}: {duration:.3f}s, 320 kbps, complete decode verified")
(ROOT / "docs/media/music-audio.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
