# Image pass — 2026-09-23

## What changed

- Re-encoded 11 referenced JPEGs in place with mozjpeg (sharp), keeping every public URL unchanged. Each file had to clear the same safeguards as `scripts/optimize-image-assets.mjs`: full-resolution ffmpeg SSIM ≥ 0.98 against the original and ≥ 8 % byte savings. The lowest quality in 82/85/88/90 that cleared both was kept.
- `blog/pengshui-mao-yisheng-charity-bridge-foundation.jpg` was a 5184×3456 camera original (6.1 MiB) used as a blog cover and as the article's JSON-LD `image`. It is now 2400×1600 (500 KiB, q85, SSIM 0.9816 against a Lanczos-resized reference).
- The two door product pages loaded their first-section image with `loading="eager"` and no priority hint; they now use `preload`, matching the other product pages.

| File | Before | After | Quality | SSIM |
|---|---:|---:|---:|---:|
| blog/pengshui-mao-yisheng-charity-bridge-foundation.jpg | 6,256 KiB | 500 KiB | 85 | 0.9816 |
| blog/fiberglass-casement-open-fabrication.jpg | 443 KiB | 320 KiB | 82 | 0.9808 |
| blog/facade-balcony-window-grid-thermal-break.jpg | 442 KiB | 402 KiB | 88 | 0.9816 |
| blog/supplier-qualification-facade-inspection.jpg | 309 KiB | 226 KiB | 82 | 0.9842 |
| regions/frp-passive-house-windows-canada.jpg | 270 KiB | 215 KiB | 82 | 0.9877 |
| factory/pultruded-frp-manufacturer-video-cover.jpg | 236 KiB | 193 KiB | 82 | 0.9893 |
| regions/grp-windows-uk.jpg | 221 KiB | 173 KiB | 82 | 0.9911 |
| blog/cold-climate-window-interior.jpg | 208 KiB | 181 KiB | 82 | 0.9925 |
| blog/window-profile-price-yellow-facade.jpg | 205 KiB | 162 KiB | 82 | 0.9915 |
| blog/frp-lifecycle-cost-analysis.jpg | 168 KiB | 148 KiB | 85 | 0.9833 |
| blog/window-icicles-frozen-frame-cold-climate.jpg | 153 KiB | 123 KiB | 82 | 0.9893 |

Referenced heavy JPEGs: 10.62 MiB → 4.50 MiB. Ten other candidates were kept because a re-encode either grew the file or missed the SSIM gate.

## CI

`npm test` now runs 21 suites (118 tests) instead of the 11 suites previously listed in the workflow, and CI also runs `npm run check:sitemap`. Four page suites (`test:access-systems`, `test:snow-markers`, `test:sound-barrier-wall`, `test:wind-blade-panels`) still expect routes in the mega-menu that the navigation redesign moved to hub pages; they stay out of CI until their assertions are updated.
