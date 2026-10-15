# HIS 2.0 guideline gallery

## Design

Use the portfolio's existing paper (#faf9f4), ink (#11141c), green (#17492d), red accent (#b53b24), muted text (#69707b) and rule (#d8d9d1). DM Serif Display carries the section heading; DM Sans carries captions and controls.

Place the gallery in the expanded HIS case study, after the existing empty consultation form. A large, uncropped screenshot leads, followed by its original guideline number, English title and brief description. A horizontal thumbnail strip and previous/next controls allow deliberate reading, with the same restrained image transition as the homepage. A native modal opens a larger view with original-resolution zoom and scroll.

The original guideline numbers encode a real sequence, so keep 1, 2.1–2.4, 3.1–3.7, 4.1–4.2, 5 and 6.1. Do not add decorative category cards or automatic advances that interrupt reading. Keep the portfolio's typography and colors; the annotated interface images supply the distinctive visual content. Preserve all red annotations and image edges.

## Content and sources

These 16 user-supplied screenshots document requested changes for version 2.0, not completion evidence or instructions to change the HIS application. Keep the existing administrator-testing status and finance-in-progress description.

`scripts/prepare-his-guidelines.mjs` copies only the 16 supplied images from `D:/Downloads/系统优化2.0`. It preserves byte-identical originals in `assets/originals/projects/his-guidelines` and serves ASCII-named copies from `public/media/projects/clinic/guidelines`. Source paths, dimensions and SHA-256 hashes are recorded in `docs/media/his-guidelines-sources.json`. The six additional 6.2–6.7 reference files in that source folder are outside this request.

No deployment or external upload is part of this change.

## Verification · 2026-10-15

- Asset preparation verified 16 source/original/public copies by SHA-256 (4,655,655 bytes in each set). Original dimensions and red annotations are preserved. The stage and full-size viewer serve the PNGs directly to keep annotation text sharp and avoid a slow initial image conversion; thumbnails use Next Image optimization.
- `npm run typecheck` passed. The final `npm run build` passed, including TypeScript and all 10 static pages. `git diff --check` passed.
- Browser QA on `/projects`: expanded the HIS case, selected thumbnails, verified the counter and last-to-first / first-to-last navigation, and opened the selected screenshot in the native modal.
- Original-size mode showed the 1904 × 1101 finance screenshot inside a 1208 × 543 scrollable viewport. Escape closed the modal, restored body scrolling, and returned focus to the selected image button.
- At 320 × 720, the page content and scroll width were both 305 px (scrollbar excluded); the inner gallery was 231 px wide. The modal stayed within the screen at 285 × 696 px. The prescription screenshot loaded at its full 1905 px source width and used `object-fit: contain`.
- Arrow-key selection was checked both in the inline gallery and in the modal. The native modal traps focus; reduced-motion styles disable the image transition. The temporary viewport override was reset after QA.

Evidence: `docs/qa/his-guidelines-desktop.png`, `his-guidelines-projects-full.png`, `his-guidelines-viewer.png`, `his-guidelines-mobile.png`, and `his-guidelines-mobile-viewer.png`.

## Proportional image layout revision · 2026-10-15

The fixed, short image stage compressed wide interface screenshots and introduced large gray side gutters. Replace it with an image-sized button and an intrinsic image ratio: use the available width, let height follow the source dimensions, and cap enlargement at the source width. Remove the mobile 4:3 stage too. The portfolio palette and typography stay in place; dense annotated screens need space for reading rather than a fixed photo frame. Small cropped dialogs stay at a sensible native size. Original screenshot backgrounds and all annotations remain intact.

- Browser verification at the default desktop size: a 1905 × 1101 screenshot renders at approximately 904 × 522 px, matching the button with no added side gutters. The panoramic 3.1 screenshot and smaller 3.3 crop retain their own ratios.
- At 320 × 720, the 552 × 491 crop renders at approximately 231 × 205 px; both the page width and scroll width are 305 px, excluding the scrollbar. The temporary viewport override was reset.
- Thumbnail selection, opening the selected login image, Escape dismissal and focus restoration work after the change. The production build passed, including TypeScript and all 10 static pages.

Updated evidence: `docs/qa/his-guidelines-proportional-desktop.png`, `his-guidelines-proportional-wide.png`, `his-guidelines-proportional-mobile.png`, `his-guidelines-proportional-login.png`, and `his-guidelines-proportional-check.json`.
