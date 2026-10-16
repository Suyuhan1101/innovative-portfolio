# High school FTC test video

Verified October 16, 2026 (America/New_York).

- Added `FTC robot testing` before the competition recording in Hobby → Robotics & LEGO. The description is `Robot testing with my high school FTC club.`; no tasks, results or team details were inferred.
- The 1:43 recording retains its original 568×320 H.264 video and AAC audio. Both encoded streams match the source hashes. The web MP4 is about 10.4 MiB, uses fast-start, and excludes source metadata and extra data tracks. The original stays unchanged in ignored local storage. Preparation and checks are reproducible with `scripts/prepare-ftc-video.py`; the media manifest is `docs/media/ftc-robot-testing.json`.
- The 10-second frame is the poster. The player is silent by default and offers native controls to enable the retained audio after playback starts.
- Actual browser playback advanced normally with the correct 103.18-second duration, 568×320 dimensions, active audio decoding and a 206 partial-content response. No MP4 was requested before clicking Play.
- The new clip precedes the competition video; both LEGO recordings remain present. Starting the competition recording pauses FTC, and leaving the detail page unmounts and pauses the player.
- Layout checks passed at 1440, 390 and 320 px widths, preserving the video aspect ratio without horizontal overflow. Screenshots and disposable checks are in ignored `docs/qa/ftc-video-2026-10-16/`.
- The production build, TypeScript and diff checks passed. Browser checks recorded no page exceptions.
