# Fiberglass fire query refresh

Review date: 2026-10-26. Status: owner approved publication on 2026-10-26; releasing through the normal PR/Preview workflow.

## Query ownership and page choice

Keep `/resources/blog/frp-fire-resistance-ratings-guide` and its self-canonical URL. Refresh the existing fire article rather than creating near-duplicate US/GB spelling pages. No redirects or URL migrations are required.

- Primary query: **does fiberglass burn** (US brief).
- Secondary query: **is fibreglass flammable** (GB brief).
- Supporting questions: is fiberglass flammable; does fiberglass insulation burn; FRP fire resistance ratings; ASTM E84 Class A FRP.
- Both target questions occur in the title, H1 and description. The primary is in the opening paragraph; the British phrase has its own H2. FAQ answers address the actual material and evidence boundaries.
- Contextual incoming links: `/what-is-frp` and `/technology/pultrusion-resin-systems`.
- Conversion path: structural shapes / custom profiles → product-specific evidence → technical inquiry.
- The existing blog, material-topic navigation, site search and article sitemap consume the revised data automatically.

Ahrefs overview and SERP requests for US/GB both returned `API units limit reached`, with zero units left. No volume, difficulty, traffic potential, rank or growth figure is asserted. Public search results and the existing live article were inspected to establish the material-definition intent. Search-engine results viewed here are not a location-controlled Google rank baseline.

The existing article contained unsupported blanket ratings, generic charring/temperature claims and broad assertions about structural fire performance. The refresh removes those, preserves the original publication date and records a substantive update date. Editorial authorship replaces an unverified named technical review for this new copy.

## Fact ledger

| Claim used | Source | Boundary |
| --- | --- | --- |
| Glass fibers are noncombustible | https://www.cdc.gov/niosh/npg/npgd0288.html | Describes fibers, not every finished product |
| Unfaced insulation and facing have different fire behavior | https://www.jm.com/content/dam/jm/global/en/building-insulation/Files/BI%20Data%20Sheets/Resi%20and%20Commercial/BID-0144-JM-Unfaced-Kraft-and-Foil-Faced-Fiberglass-DS.pdf | Named manufacturer's unfaced example; kraft/standard foil facing warning, not a worldwide product classification |
| Matrix softening can reduce load transfer and structural properties before flaming | https://publications-cnrc.canada.ca/eng/view/accepted/?id=424b0bf1-c553-4b5f-b443-21271b163f23 | Chowdhury et al., PROTECT 2007, section 3.2; no universal F1 failure temperature inferred |
| Resin options have distinct fire/smoke considerations | https://www.strongwell.com/faqs/technical-product-questions/ | Industry example, not F1 qualification |
| E84 addresses surface burning and excludes defining noncombustibility from FSI alone | https://store.astm.org/e0084-26.html | Public scope/limitations; no claim to reproduce the full standard |
| E136 assesses combustibility | https://store.astm.org/standards/e136 | Does not rate the finished assembly's endurance |
| E119 addresses fire endurance of tested building elements | https://store.astm.org/standards/e119 | Do not extend to other configurations or post-fire reuse |
| Class A interior-finish limits: FSI 0–25, SDI 0–450 | https://codes.iccsafe.org/content/IFC2021P2/chapter-8-interior-finish-decorative-materials-and-furnishings | Explicit 2021 IFC example, not F1 test results or a claim about local adopted code |
| Reaction-to-fire classification depends on configuration and field of application | https://www.gov.uk/guidance/approved-document-b-fire-safety-frequently-asked-questions | Question 18; applies to England, not a UK-wide approval |

The page uses short original explanations, links adjacent to substantive claims, and a source list. No general noncombustibility, smoke-toxicity or structural endurance rating is assigned to F1 products.

## Image provenance

Both new photos were downloaded from the original Commons files, inspected and converted to WebP with proportional resizing (no content edits or cropping). They are locally served; the page does not depend on remote image loading. Public captions include author, source-file link, license link and transformation disclosure.

| Local image | Original file / creator | License | Delivered size |
| --- | --- | --- | --- |
| `public/images/blog/frp-fire-resistance/fiberglass-cloth.webp` | https://commons.wikimedia.org/wiki/File:Fibreglass_fabric_1100g_per_m2.jpg — Achim Hering | CC BY 3.0, https://creativecommons.org/licenses/by/3.0/ | 1400 × 1363, 181,532 bytes |
| `public/images/blog/frp-fire-resistance/glass-wool-insulation.webp` | https://commons.wikimedia.org/wiki/File:CSIRO_ScienceImage_2175_Installing_Insulation_Batts.jpg — Tracey Nicholls / CSIRO | CC BY 3.0, https://creativecommons.org/licenses/by/3.0/ | 1217 × 1400, 100,164 bytes |

Original download URLs:

- https://upload.wikimedia.org/wikipedia/commons/b/b6/Fibreglass_fabric_1100g_per_m2.jpg
- https://upload.wikimedia.org/wikipedia/commons/0/0c/CSIRO_ScienceImage_2175_Installing_Insulation_Batts.jpg

The existing torch video and supporting still remain reference demonstrations. Captions explicitly say they do not establish classification, noncombustibility, smoke performance or retained structural capacity.

## Implementation and acceptance

The blog renderer now accepts a local raster image block with descriptive alt text and a caption containing safe source/license links. Source paths are restricted to `/images/`; remote URLs, path traversal, SVG and empty alt text are rejected. Images reserve layout space and load lazily in the body. Existing headings, lists, tables and video behavior have regression coverage.

Before release, review desktop/mobile rendering, title/description, one H1, canonical URL, article dates/structured data, source links, image attribution and technical inquiry links. Run lint, build, blog audit and relevant parser/search tests. The production release must follow the repository's commit → PR → Vercel Preview → merge → canonical-domain verification workflow; this draft does not claim a deployment or ranking improvement.

Validation completed on 2026-10-26:

- `npm run lint`: passed with zero errors; one pre-existing hooks dependency warning in `components/calculators/section/SectionViewer3D.tsx:394`.
- `npm run build`: passed, including TypeScript and 471 generated pages. The first sandboxed attempt could not bind Turbopack's internal port; the permitted retry passed.
- Blog content / SEO / site-search regression tests: 19 passed.
- `npm run seo:blog-map`, `npm run check:sitemap`, and `git diff --check`: passed.
- Built HTML: one H1, unchanged production canonical, 143-character meta description, correct TechArticle query, organization author and updated date. SEO title is 46 characters; article body is about 1,350 words before FAQs.
- Browser production preview: checked at 713 CSS pixels with no page-level horizontal overflow; cover and inline photos loaded, FAQ expanded successfully. This is a narrow-panel check, not a full device matrix. No production-page error was reported; the development server's inherited CSP warning is separate.
- Independent source review: no mandatory factual corrections found.

Local review URL: `http://127.0.0.1:3011/resources/blog/frp-fire-resistance-ratings-guide`. This local preview is not a public deployment. The owner approved commit, PR and production release of `codex/fiberglass-fire-seo` on 2026-10-26. The final merge SHA and Vercel deployment ID are reported in the release chat.
