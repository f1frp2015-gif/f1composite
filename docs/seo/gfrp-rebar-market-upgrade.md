# GFRP rebar market upgrade (October 2026)

Implemented 2026-10-25 from a market study of the five leading GFRP rebar producers (Dextra, Pultrall, Mateenbar/Pultron, Schöck, Neuvokas), the standards landscape and pricing mechanisms, and a search-landscape review of the rebar query cluster. Research basis and sources: `docs/research/frp-rebar-market-2026-10.md`.

## Why

The rebar cluster had a product page, a comparison page, a size chart, a calculator and six articles, but the product page carried no standard values, no segment positioning, no price basis and no export guidance. Search results for the cluster are held by distributor blogs, market-report vendors and retail listings; no page observed combined metric and imperial data with the standard minimums, an honest price basis, container planning and a standards crosswalk including ISO 10406-1, AS 5204 and GB/T 26743.

## Changes

| Page | Intent | Change |
| --- | --- | --- |
| `/products/frp-rebar` | FRP rebar supplier (commercial owner) | New title and description; four supply routes mapped to contact stages; seven buyer segments with the honest supply route per market; metric sizes with calculated mass beside ASTM D7957 Table 3 minimum forces; standards by market; price basis with the range rule; export packing and documents; FAQ grown from 6 to 12 questions. |
| `/resources/gfrp-rebar-applications` (new) | GFRP rebar applications (guide) | Seven segments: marine, precast, flatwork and pools, bridges, MRI and rail, soft-eyes and mining, water and chemical plants. Each states why GFRP, detailing changes, typical sizes, the approval route per market, attributed reference projects and what to send. |
| `/resources/gfrp-rebar-standards` (new) | GFRP rebar standards (technical) | Crosswalk of 14 documents in 8 markets by role (product, design, test methods, approval, construction) with what to ask for; ASTM D7957 Table 3 forces with implied stress; property requirements table; approvals explainer; "what F1 provides" statement. |
| `/resources/blog/gfrp-rebar-manufacturers-how-to-qualify-a-supplier` (new) | GFRP rebar manufacturers (commercial) | Sourced summary of the five leaders' positioning, sizes, modulus tiers, approvals and channels; seven-item supplier checklist; F1's stated position. |
| `/resources/blog/importing-gfrp-rebar-container-loading-documents` (new) | importing GFRP rebar (guide) | Metres per tonne by diameter, 20 ft and 40 ft planning, coils, documents, HS classification, MOQ and lead-time logic, shipping terms. |
| Size chart, calculator, vs-steel page, GFRP rebar topic | supporting pages | Links to the two new reference pages. |

Shared data lives in `lib/gfrpRebar.ts` (`ASTM_D7957_SIZE_MINIMUMS`, `ASTM_D7957_REQUIREMENTS`, `GFRP_STANDARDS_CROSSWALK`, `gfrpMetresPerTonne`) and `content/data/frpRebar.ts` (segments, supply routes, pricing basis, export, FAQs). Blog covers are drawn by `scripts/covers/draw-gfrp-rebar-covers.mjs`.

## Rules applied

- Prices: ranges only with the observation date; the RFQ response is the price (owner decision 2026-10-23).
- Approvals: no ICC-ES, DOT, CSA designated-source, ETA, DIBt or Buy America claim; "we do not hold" stated where a buyer would look. Guarded by `scripts/gfrp-rebar-market-pages.test.mjs`.
- Competitors: facts with sources, no comparison of performance against F1 and no competitor project attributed to F1 or its manufacturing source.
- Standards: values are the documents' own minimums; edition status noted (D7957-26 active, verified on the ASTM store 2026-10-25; ACI 440.11-22 cites -22).
- Navigation: the product menu is at its 115-destination bound, so the new pages are reached from the product page, the rebar tools and reference pages and the blog topic, not from the mega menu.

## Validation

- `npm test`: 324 tests, all passing after regenerating the search page index (`npm run search:pages`) and updating the product-title expectation in `scripts/site-search.test.mjs`.
- `npx eslint app components content lib scripts`: 0 errors, 1 pre-existing warning (`SectionViewer3D.tsx`). The repo-level `npm run lint` also reports untracked local directories (`.worktrees/`, `outputs/`, `tmp/`) on this workstation; they are not part of the commit.
- `npm run build`: passes with the prebuild editorial and blog audits.
- `npm run check:sitemap`: 134 static indexable routes covered. `npm run check:owner-links`: 194 supporting pages link to their owners.
- `npm run check:copy`: 0 errors, 13 pre-existing em-dash warnings in unrelated files.
- `npm run seo:blog-map`: keyword map regenerated with the two new articles.

## Measurement

Record the action in the vault PDCA ledger (A022). Review indexing of the four new URLs and the changed product page at T+7, impressions for "frp rebar", "gfrp rebar", "gfrp rebar applications", "gfrp rebar standards", "gfrp rebar manufacturers" and "importing gfrp rebar" at T+14, clicks and qualified rebar inquiries (contact source `rebar-procurement`, stages quote/technical/sample/distributor) at T+28. Two checks before trusting the baseline: confirm the rebar URLs are indexed in Google Search Console, and keep the sitemap host consistent with the canonical tags.

## Second pass: Pultron / Mateenbar benchmark (2026-10-26)

Source: `docs/research/frp-rebar-market-2026-10.md` §2b. The leading flatwork-and-structural producer was read across its three regional sites for product line, application taxonomy, FAQ and blog themes.

| Page | Change |
| --- | --- |
| `/products/frp-rebar` | Segments 7 → 10 (buildings and parking; flood channels, culverts and stormwater; basement, retaining and ICF walls and masonry); MRI segment widened to data centres, substations, compass pads and smelters; companion items block (smooth dowels via `/products/fiberglass-structural-shapes/frp-rod`, form ties via `/products/frp-fasteners-fittings`, nonmetallic accessories, rock bolts as inquiry); bend shape list with Z-shape caveat and the lower bent-bar class; 10/20/30/40 ft lengths and retail-length dealer programs; five FAQs (mixing with steel, No. 3 for No. 4, masonry and ICF, dowels and form ties, why 45 and 60 GPa); link to the residential article. Revision 2026-10-26. |
| `/resources/gfrp-rebar-applications` | Three sections added (`#buildings`, `#flood`, `#walls`) with detailing, sizes, route and attributed references; marine, flatwork and MRI sections extended (ports and dowels, industrial floors and retail lengths, rail detection loops and data centres); two FAQs; new title and description; header count derived from the data. |
| `/resources/blog/fiberglass-rebar-for-residential-concrete` (new) | Query owner "fiberglass rebar for residential concrete" with the flatwork long tail (driveway, slab on grade, pool, footings, ICF, No. 3 vs No. 4 steel). Element-by-element guide, code-route table by market, handling rules, price range, dealer and project supply. Cover drawn by `scripts/covers/draw-gfrp-rebar-covers.mjs`. |
| `content/data/blogStrategy.ts` | New keyword target; article added to the GFRP rebar topic's start-here list. |
| `content/data/seoQueryTargets.ts` | Applications owner title and description updated; the residential article added as a supporting URL of the product page. |
| `scripts/gfrp-rebar-market-pages.test.mjs` | Guards extended: 10 segments, companion items, dowel FAQ, the three new section ids, the new article's sources and FAQ, and the approval-claim scan now covers it. |

Rules unchanged: price ranges only; no approval, listing, domestic-content or service-life claim; competitor projects attributed to the producer that supplied them.
