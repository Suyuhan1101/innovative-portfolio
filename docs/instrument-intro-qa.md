# Personal instrument entrance verification

Verified October 16, 2026 (America/New_York) against the local production build on `http://127.0.0.1:3000`.

- `npm run build`, `npm run typecheck`, and `git diff --check` passed. The build retains 21 static routes.
- The ready, boot and welcome stages were inspected visually. The approved side streams now use full-color landscape fragments from four existing gallery photos. The rejected photo collage, pointer trails, branded reference graphics and reference-video assets stay removed.
- The entrance's text is English only; there are no account inputs, login labels or authentication claims. The animation control is inside the welcome dialog and remains available before starting. The sequence is silent.
- Layout checks passed at 1440×900, 1920×1080, 768×1024, 390×844, 320×568, 844×390, 568×320 and 600×600. The monogram, entry control and preference switch do not overlap, and there is no horizontal overflow.
- The final welcome text now shrinks and moves into the top-left header before the overlay fades. Full runs took 3,208 ms at 1440×900, 3,175 ms at 390×844 and 3,194 ms at 844×390, including browser automation overhead. Sequence: `intro-boot,welcome-move,intro-exit,idle`. Final title position and dimensions matched the real header within 0.004 CSS pixels; the text reached the header's ink color with no horizontal overflow.
- Skip remained enabled during the boot and entered in 231 ms in the latest test. Animations Off entered in 207 ms without playing either the boot or the welcome flight. Enter and Space work as native button activation; the motion preference persists across refresh.
- Direct entry to `/hobby/sport` retained the Sport destination. Projects navigation followed by browser Back did not replay the entrance.
- A touch-enabled context at 390×844 and 2× device density passed both a full tap-start run and tap-to-skip, restoring heading focus afterward.
- Native forward navigation during boot safely cancelled the sequence; the ready state could then be started again on the correct destination without a stuck overlay.
- Native history navigation during the welcome flight also cancelled safely, restored the header's opacity, and left the destination interactive.
- Browser checks recorded zero page exceptions. A short silent screen recording of the authored entrance is stored alongside disposable scripts and screenshots in ignored `docs/qa/instrument-intro-2026-10-16/`.

## Fine landscape fragment update

- The large photo cutouts have been replaced by two decorative canvases using pre-rendered polygon sprites. Each sprite contains a small area of its source photo; browser probes confirmed crops around 40×40 source pixels from the 720 px images, rather than repeated whole photographs.
- There are 520 shards at 1440×900 and 624 at 1920×1080. Mobile layouts use 188 at 390×844, 126 at 320×568, 140 at 844×390 and 110 at 568×320; the DOM contains only two canvases, with no per-shard image elements.
- Actual draw transforms confirmed opposite overall vertical motion, lateral drift and independent rotation. In the sampled interval, median movement was about −29 px on the left and +29 px on the right; most sampled shards also changed horizontal position and angle. Individual off-screen recycling avoids a shared reset.
- Checks passed at 1440×900, 1920×1080, 768×1024, 390×844, 320×568, 844×390 and 568×320. The side canvas bounds stay clear of YH and the entry button with no horizontal overflow. A bottom fade fully clears the animation-switch region.
- Canvas pixels remain identical while Animations is Off and change again after it is switched On. The render loop also stops when the document is hidden or the intro reaches exiting; unmount cleanup cancels animation frames, removes observers/listeners and releases sprite atlases.
- Shards clear before the welcome title appears. The latest full entry took 3,174 ms with `intro-boot,welcome-move,intro-exit,idle`, ending with heading focus and interactive content. Skip entered in 253 ms; Animations Off entered in 202 ms. The latest check recorded zero page exceptions. The production build, TypeScript and diff checks passed.
- A 75-frame sample in the local desktop browser had a median interval of 16.7 ms and 95th percentile of 16.8 ms. This is a local browser measurement, not a device-independent frame-rate guarantee. A touch-enabled 390×844 context at 2× density also entered successfully, using 94 shards per canvas.
