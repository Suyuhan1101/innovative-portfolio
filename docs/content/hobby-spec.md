# Hobby

Replace the Music navigation item with Hobby at `/hobby`, keeping the music content intact. `/music` permanently redirects to `/hobby`. Update homepage, menu, section badge, metadata and About Me link together.

Use the existing palette: paper #faf9f4, ink #11141c, green #17492d, accent #b53b24, muted #69707b and rule #d8d9d1. Keep DM Serif Display for headings and DM Sans for body text and controls. Left-align headings and captions.

The latest user request replaces the category buttons with the exact shared Projects / Community gallery component. Music is the large left card, Sport is the upper right card, and Robotics & LEGO is the lower right card, as confirmed by the user. Keep the same banner, square green frames, typography, card proportions, full-colour images, 75%-opaque green hover/focus sweep, reduced-motion handling, and mobile stacking. Hobby calls to action read “Explore”.

Each card opens a separate route using the existing page fades, history and focus restoration: `/hobby/music`, `/hobby/sport`, and `/hobby/robotics-lego`. Hobby detail headings use the category name and “Back to Hobby”; the browser title stays “Yuhan Su”. The listing shows only the cards and home link, and does not mount the video players or music page.

Music retains its complete existing page, including piano performances, playlist, shared player, and concert photograph. Sport contains the three new swimming recordings, displayed at their natural viewing ratios with individual posters, durations and play controls. Robotics & LEGO combines the competition recording and both LEGO clips on one page. The portrait LEGO videos remain side by side at a combined maximum width of 720px and stack on mobile.

New videos play inline on request with native controls and posters. Preserve originals in ignored `assets/originals/hobby`; remux H.264 without re-encoding, remove the audio track and original metadata, and put fast-start MP4 copies in `public/media/hobby`. No automatic playback or initial video download. Playing another hobby clip pauses the previous one; leaving the category/page unmounts its video. Existing piano videos and music recordings retain their sound.

Use neutral competition copy without unconfirmed dates, placements or awards. The supplied files show a robotics competition, a LEGO robotic arm, and a LEGO walking robot. `scripts/prepare-hobby-videos.py` verifies that every decoded video frame matches the original and that the web copies have no audio stream. Results are recorded in `docs/media/hobby-videos.json`.

The swimming uploads are copied by `scripts/prepare-swimming-videos.py`, which verifies matching SHA256 hashes for the original and remuxed H.264 video packets, removes audio and source metadata, and preserves local originals. See `docs/media/swimming-videos.json`. The third recording has non-square source pixels; its poster and player use the original 16:9 display ratio without re-encoding the video. Describe only the visible swimming footage, without inferring the swimmer, stroke, results or awards.
