# Image SEO pattern: how site images reach Google Images and link back here

Implemented 2026-11-01 from the owner's question: how do f1composite.com images become search-engine results that link to the page, and what pattern should every image follow.

## How an image result links to a page

Google Images (and Bing Images) do not index files on their own. They index an image **as part of a page**, and the result links to that page. So the site cannot "attach a link" to an image; it can only make sure that

1. every image is embedded on exactly the page that should receive the click, in regular `<img>` markup with alt text and a caption (not CSS backgrounds, not canvas, not an `<img>` only mounted by client JavaScript),
2. the crawler is told which page claims the image (image sitemap) and what the image is (structured data), and
3. copies of the file still point back (watermark, IPTC/XMP rights metadata, a licensing statement), which is also what earns the **Licensable** badge in Google Images.

Points 1 and 3 were already in place (`components/ui/Figure.tsx`, `scripts/image-audit.mjs`, `scripts/mark-owned-photos.mjs`, `/terms#image-use`). This change adds point 2 across the site.

## What changed

| Layer | Before | Now |
| --- | --- | --- |
| Image sitemap | One page (`/case-studies/beam-bridge`) listed six drawings inline. | `lib/pageImages.ts` builds a route → images registry from the cover registry (`lib/covers.ts`: a page's cover **is** its lead figure), blog cover and supporting images, case-study figures, the beam-bridge drawings and the group's own photos where they are placed. `app/sitemap.ts` emits `<image:image>` for every entry: 220 routes, 311 image entries, 254 distinct files. |
| ImageObject | `primaryImageOfPage` was `{ "@type": "ImageObject", url }`; articles listed plain URLs. | `lib/imageSeo.ts` → `buildImageObject` / `primaryImageObject`: `contentUrl` (always the static `/images/...` file, never the `/_next/image` optimizer URL), `url` (the page), `caption` (= the rendered alt), `description` (= the figure caption), `width`/`height` when known, `representativeOfPage`. Used by `buildProductFamilyPageSchema` (37 product pages), blog posts (cover + supporting), case studies (Figure 1 + further figures), industries, applications, pultrusion guides and custom product pages. |
| Licensing | Rights were only in the files (XMP/EXIF) and on `/terms`. | For every photo in `content/data/ownedPhotos.ts` the ImageObject carries `license` (`/terms#image-use`), `acquireLicensePage` (licensing contact), `creditText`, `creator`, `copyrightHolder`, `copyrightNotice`: the fields Google reads for the Licensable badge. Openly licensed photographs pass their `credit` and get the author's name and the CC deed instead. Stock, supplier and catalog images get neither. |
| Guard | `scripts/image-performance.test.mjs` (alt, sizes, names, payload). | plus `scripts/image-seo.test.mjs`: every sitemap image exists, is lowercase-hyphenated and not duplicated; every owned photo is claimed by a page that really renders it; the ImageObject shape; licence only on owned photos; templates emit it; alt texts in the registries are descriptive (20–260 chars, no "image of", no file names). |

Case-study image data moved from the page to `content/data/caseStudyImages.ts` so the registry can read it.

## The pattern for any new image

1. **File**: `public/images/<area>/<descriptive-hyphenated-name>.webp`, lowercase, no spaces or underscores, name says what the picture shows (`frp-factory-staircase-grating-treads.webp`). WebP (or SVG for drawings); JPEG only for photos that lose too much. Run `npm run audit:images`.
2. **Markup**: `next/image` inside `Figure` (or a `<figure>` with `<figcaption>`), `alt` that describes the picture in a sentence (what, where, which material), `sizes`, `preload` only for the first-screen figure. The caption says what the picture shows and whose project it is. Stock images are labelled "Illustrative photo"; supplier images "Supplier photo"; the group's own "Production photo" / "Project photo".
3. **Registry**: a page's lead image goes in its cover (`lib/covers.ts`) or data record (`coverImage`, `image`, `caseStudyImages`); that alone puts it in the image sitemap. An owned photo placed on a page whose lead image is something else goes in `ownedPhotoPlacements` (`lib/pageImages.ts`).
4. **Structured data**: the page template already emits the ImageObject from the same fields. Pass `imageAlt` / `imageCaption` to `buildProductFamilyPageSchema` for a hand-built product page. A third-party photograph passes its `credit` (author, license, deed URL, source).
5. **Rights**: a photo the group owns is added to `content/data/ownedPhotos.ts` and run through `node scripts/mark-owned-photos.mjs` (mark + XMP/EXIF). Never list stock or supplier images there.
6. **Social card**: `buildPageMetadata` gives every page an `og:image`; a real photo may be passed as `image` with `imageSize`.

Avoid: text baked into images that is not also on the page; one image carrying different alt texts on different pages; the same cover on many pages (Google keeps one); images only reachable through a carousel or tab that needs a click; renaming a file without a redirect in `next.config.ts`.

## Why the optimizer URL is not the canonical image

`next/image` serves `/_next/image?url=/images/...&w=...&q=75`. Google indexes those variants too, but every page here declares the static file in the sitemap and in `contentUrl`, so the index converges on one URL per picture and a redirect or a cache change never orphans an image. The optimizer cache is 31 days (`minimumCacheTTL`), and `/_next/image` is not blocked in `robots.ts`.

## Verification

- `node --test scripts/image-seo.test.mjs` (8 tests), `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build`, `npm run check:sitemap`: see the PR.
- After production: `curl -s https://www.f1composite.com/sitemap.xml | grep -c "<image:loc>"` should report about 311; Rich Results Test on `/case-studies/factory-access-staircase` shows the ImageObjects with licence fields.

## Measurement

PDCA A037 (vault `05-市场/SEO/PDCA`). Search Console → Performance → **Search type: Image**: baseline impressions/clicks at T+0, then T+7 and T+14; **Indexing → Sitemaps** shows discovered images once the sitemap is re-read (resubmit it after deploy). Bing Webmaster Tools receives the same sitemap; IndexNow already pings page URLs.
