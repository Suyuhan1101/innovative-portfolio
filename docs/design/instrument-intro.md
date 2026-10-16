# Personal instrument entrance

Confirmed on October 16, 2026. The supplied local video is visual inspiration only. The rejected photo reveal has been removed. No reference media, branding, Chinese text, account fields, verification claims, or soundtrack is included in the website.

## Visual plan

- Palette: paper `#faf9f4`, green `#17492d`, ink `#11141c`, rule `#d8d9d1`, muted `#69707b`. Use green for one scan and fine instrument strokes; keep the site's existing palette.
- Typography: DM Sans for the geometric YH monogram, name and controls; DM Serif Display for `Welcome to My World`.
- Layout: a centered personal mark with an asymmetric open arc and seven calibration notches, representing the seven site sections. A faint drawing grid and four corner marks frame this one focal element. Keep controls outside its geometry.

```text
                                      Skip intro (while running)

                      seven fine notches
                       open green arcs
                            YH
                         Yuhan Su

                       Enter my world

                       Animations [on]
```

The reference uses large concentric data-system rings and login panels. This design instead uses a personal YH mark, seven sectional notches, a single quiet scan and the site's original welcome typography. Avoid fake readouts, hexadecimal columns and authentication language. The instrument plays once after an explicit action.

## Flowing landscape fragments

Confirmed refinement: replace the large photograph cutouts with hundreds of tiny polygon shards, following the user's small-fragment reference. Each shard shows only a local piece of its original photograph. The side streams already flow while waiting to enter, the left upward and the right downward. On entry, let the shards gradually clear before the welcome title moves into the header.

- Keep the existing paper `#faf9f4`, green `#17492d`, ink `#11141c`, rule `#d8d9d1` and muted `#69707b` palette and typefaces. Snow, turquoise water, red rock and green valleys provide the color.
- Keep the central instrument clear; form two narrow, curving streams toward the outer thirds, with denser cores and scattered edges. Use triangular and quadrilateral shards, mostly 5–18 px on desktop with occasional 20–30 px pieces. Preserve the texture and color of actual small areas from the photographs.
- Give each shard its own speed, gentle turn and lateral drift. A small subset makes local curling motions inside a stream whose overall direction remains upward on the left and downward on the right. Recycle individual shards outside the viewport, avoiding a synchronized reset.
- Narrow portrait screens use fewer, smaller shards. Confine all movement to the side regions so the entry and animation controls stay unobstructed.
- Preserve the 1.95-second instrument boot, 0.85-second welcome flight, skip and short reduced-motion exit. Animations Off shows a static arrangement.
- Reuse the four small landscape WebP files. Pre-render local polygon crops into sprite atlases and animate two decorative canvases, avoiding hundreds of animated DOM nodes. Stop frame scheduling when animations are off, the tab is hidden, or the intro has exited. Decorative artwork carries no interactive controls or duplicate accessible text.

```text
   ·▵▫ · ↗                            ↙ ·▫▵·
     ▫▵ ↖           YH dial          ↘ ▵▫
   ·▵▫ ↗                             ↙ ▫▵·
                   Enter my world
```

The central instrument remains the focus, with the irregular opposing streams providing the flowing landscape effect requested by the user. The earlier rejected four-photo collage and pointer-reveal effect stay removed.

## Sequence and controls

1. Ready: YH, name, a quiet instrument outline, `Enter my world` and the existing animation switch, with colorful landscape fragments flowing upward on the left and downward on the right.
2. Click, Enter or Space: assemble the fine arcs and notches, pass one green scan across the mark, then replace the mark with `Welcome to My World`.
3. After about 1.95 seconds, shrink `Welcome to My World` and move that same text into the top-left header over 0.85 seconds. Measure the destination's real position and size so the landing matches on desktop and mobile; blend green into the header's ink color.
4. Once the title lands, reveal the destination with a 0.2-second fade. The full entrance lasts about 3 seconds. No second click or extra content reveal is required.

`Skip intro` is available during the sequence and enters immediately. Animations Off bypasses the sequence with a short fade. The entrance is silent. Touch follows the same click flow. Native navigation cancels the sequence safely, and heading focus moves to the destination after entering.

The landscape exports in `public/media/intro/` come from existing gallery photographs: `snow.webp` from `09-clouded-peaks.jpg`, `lake.webp` from `30-turquoise-lake.jpg`, `canyon.webp` from `13-red-canyon.jpg`, and `valley.webp` from `41-green-valley.jpg`. They are 720 px wide, WebP quality 78, about 309 KiB combined; original photographs stay untouched.
