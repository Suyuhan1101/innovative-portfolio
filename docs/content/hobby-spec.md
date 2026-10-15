# Hobby

Replace the Music navigation item with Hobby at `/hobby`, keeping the music content intact. `/music` permanently redirects to `/hobby`. Update homepage, menu, section badge, metadata and About Me link together.

Use the existing palette: paper #faf9f4, ink #11141c, green #17492d, accent #b53b24, muted #69707b and rule #d8d9d1. Keep DM Serif Display for headings and DM Sans for body text and controls. Left-align headings and captions.

Three quiet category buttons sit above the content: Music, Robotics, LEGO. Music is initially selected. Robotics shows the landscape competition recording at its natural ratio. LEGO shows two portrait clips side by side, capped to a combined 720px; stack them on mobile. No wide video boxes around portrait footage. This extends the established design rather than adding another card grid.

New videos play inline on request with native controls and posters. Preserve originals in ignored `assets/originals/hobby`; remux H.264 without re-encoding, remove the audio track and original metadata, and put fast-start MP4 copies in `public/media/hobby`. No automatic playback or initial video download. Playing another hobby clip pauses the previous one; leaving the category/page unmounts its video. Existing piano videos and music recordings retain their sound.

Use neutral competition copy without unconfirmed dates, placements or awards. The supplied files show a robotics competition, a LEGO robotic arm, and a LEGO walking robot. `scripts/prepare-hobby-videos.py` verifies that every decoded video frame matches the original and that the web copies have no audio stream. Results are recorded in `docs/media/hobby-videos.json`.
