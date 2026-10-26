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

## Fact-check and illustration pass (2026-10-26, second release)

Every cited source was reopened and the article's claims were checked against the source text. Corrections and additions:

| Item | Finding | Change |
| --- | --- | --- |
| ASTM E84 link | `e0084-26.html` is superseded; E84-26a is active. The noncombustibility exclusion is Section 4.3.3 (Significance and Use), not Scope | Link to the stable `store.astm.org/standards/e84`; cite E84-26a §4.3.3; add the 10-minute test and the 24 ft × 20 in (7.32 m × 508 mm) specimen from §1.2/§4.2 |
| ICC citation | The IFC 2021 Chapter 8 provisions apply to existing buildings and classify by reference to IBC Section 803; the ICC IFC page returns 403 to automated readers | Cite 2021 IBC Section 803.1.2 as primary; add the full Class A/B/C table (FSI 0–25 / 26–75 / 76–200, SDI 0–450 for all) |
| BS EN 13501-1 table row | Linked to the GOV.UK FAQ rather than the standard | Link to the BSI Knowledge record for BS EN 13501-1:2018; GOV.UK FAQ kept for Question 18 |
| Euroclass detail | Absent | Add class/test-method/sub-class table (A1–F, s1–s3, d0–d2) from the Measurlabs summary; check against the purchased standard before any product claim |
| NRC source | The archive record URL is canonical; the paper is Chowdhury, Green, Bisby, Bénichou and Kodur, PROTECT 2007 | Use the record URL. Add §3.1–3.2 data: Tg of construction resins 65–120 °C; epoxy/polyester composite ignition ~300–400 °C; glass-fibre tensile strength ~50% lower above 550 °C; glass softening 650–970 °C, melting above 1,225 °C; glass/vinyl ester bars −20% at ~100 °C, −40% at ~250 °C (secondary citation of Kumahara et al.); char on thick FRP gives minimal protection |
| Supporting still | Alt text said "localized darkening", but the frame shows a yellow flame at the torch contact point | Alt text and caption describe the flame accurately; boundary statement kept |
| ASTM E136 / E119 | Current editions E136-26 and E119-26; scope statements match the article | Edition labels added to source list |
| CDC/NIOSH, Johns Manville, Strongwell, GOV.UK Q18 | Text matches the article's claims | No change |
| Commons photos | Achim Hering (CC BY 3.0 / GFDL dual) and Tracey Nicholls / CSIRO (CC BY 3.0) confirmed | No change |

New figure: `public/images/blog/frp-fire-resistance/composite-heating-stages.webp` (1294 × 800, golden-ratio frame to match the article figure box), drawn by `scripts/covers/draw-fiberglass-fire-figures.mjs`. All plotted ranges come from the NRC paper; the 750 °C reference line is the ASTM E136 furnace temperature. Resin/glass colours (#c2410c / #0d9488) pass the dataviz palette validator (CVD ΔE 13.7, normal-vision ΔE 27.1); rows are direct-labelled.
