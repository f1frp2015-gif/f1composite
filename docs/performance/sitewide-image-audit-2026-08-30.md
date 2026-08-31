# Sitewide Image & Loading Audit — 2026-08-30

## Outcome

The public raster library was reduced from **30.07 MiB to 25.98 MiB** without reducing image dimensions. The change removes **4.09 MiB (13.6%)** from the source/deployment payload and keeps current public image URLs recoverable through permanent redirects where an asset path changed.

| Check | Before | After |
|---|---:|---:|
| Raster assets | 249 | 241 |
| Source payload | 30.07 MiB | 25.98 MiB |
| Files ≥300 KiB | 12 | 7 |
| Heavy JPEG/PNG candidates | 57 | 45 |
| Exact duplicate groups | 10 | 1 |
| SEO-unsafe basenames | 0 | 0 |
| Embedded AI provenance tokens | 0 | 0 |
| Next/Image implementation issues | not enforced | 0 |
| Missing direct image references | not enforced | 0 |

## Changes applied

- Re-encoded 29 JPEG files only when both safeguards passed:
  - structural similarity `SSIM ≥ 0.98`;
  - byte savings `≥ 8%`.
- Converted six referenced PNG assets to lossless WebP, keeping the descriptive basename and migrating internal references.
- Consolidated exact duplicate files onto one descriptive canonical asset path.
- Added 14 permanent image-path redirects so indexed or externally linked legacy image URLs remain valid.
- Migrated above-the-fold `next/image` usage from deprecated Next 16 `priority` to `preload`.
- Removed three unnecessary eager loads from the facade-panel image row; below-fold images now retain native lazy loading.
- Retained the existing 31-day Vercel image-optimizer cache TTL and AVIF/WebP response formats.

## SEO naming

All public raster basenames already passed the enforced SEO filename pattern:

```text
lowercase-keyword-description.ext
```

No mass rename was performed because changing already descriptive URLs would discard optimizer cache entries and create avoidable image-search churn. Only extension migrations and duplicate consolidation changed paths, and every retired path has a 301 redirect.

## AI watermark and provenance review

Three independent checks were used:

1. binary scan for `OpenAI`, `DALL-E`, `gpt-image`, `Midjourney`, `Stable Diffusion`, `Content Credentials`, `C2PA`, and `Adobe Firefly` tokens;
2. OCR scan of every public PNG/JPEG/WebP for visible generator labels;
3. original-resolution visual inspection of the recent generated product/application assets.

Result: **no visible AI watermark and no embedded AI provenance token was found**. The optimizer strips metadata from every JPEG it rewrites, and all WebP migrations use `-metadata none`. No generative inpainting was applied to real project photographs because there was no watermark to remove.

## Residual items intentionally retained

- Seven source files remain above 300 KiB. They are served through `next/image`, which returns responsive AVIF/WebP derivatives rather than the raw source to page visitors.
- One exact duplicate pair remains unreferenced and uses different nominal size filenames. It was retained because consolidating it would encode an unverified product-size equivalence.
- Ninety-three assets are not referenced by direct source strings. They may be catalog/archive inputs; deletion requires a separate ownership review and was not inferred from the performance request.

## Repeatable checks

```bash
npm run audit:images
npm run optimize:images
npm run test:images
```

`audit:images` checks dimensions, byte size, direct references, duplicate hashes, SEO filenames, AI provenance tokens, and Next/Image usage. `optimize:images` is deterministic and refuses a JPEG change that misses either the SSIM or savings threshold.
