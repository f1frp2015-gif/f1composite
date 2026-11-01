# Basalt FRP rebar product page and manual (November 2026)

Implemented 2026-11-01 from the owner's instruction to add the supplier's basalt rebar to f1composite.com and to rewrite its product manual as an F1 manual offered for download. Sources, the supplier-to-page reconciliation and photo credits: `docs/research/basalt-rebar-sources.md`.

## Why

The rebar cluster was glass-only: one product page (FengDu GFRP), two reference pages, a size chart, a calculator and seven articles, one of which (basalt vs fiberglass) explained that F1 did not sell a basalt bar. The GFRP FAQ answered "What about BFRP" with "raise it as a technical inquiry". A supplier with its own basalt fiber base and published bar data closes that gap with a second family in the same cluster.

## Changes

| Page | Intent | Change |
| --- | --- | --- |
| `/products/basalt-frp-rebar` (new) | basalt rebar supplier (commercial owner) | Picture-led product page: hero and two product photographs (supplier, cropped clear of watermark and marketing text), corrosion and five basalt photographs (Commons), three drawn figures (rock-to-bar process, BFRP/GFRP/steel stress-strain, 11-size ladder), 11-row property table against GFRP and steel, published-values table as classes, size table (area, mass at 1.9 g/cm³, nominal kN), the manufacturer's steel substitution guide with its serviceability caveat, eight application cards reusing the GFRP photo library, three-layer standards (ASTM D8505, CSA S807, ISO 10406-1; ACI 440.11 glass-only), manual download section, price range, export, on-site steps, 11 FAQs, credits block. OG image. |
| `/downloads/f1composite-basalt-frp-rebar-manual-2026-11.pdf` (new) | product manual | 8-page A4 reportlab manual (`scripts/build-basalt-rebar-manual.py`, document F1-PM-BFRP-001 Rev. 2026-11) restating the page: scope, rock-to-bar, published classes, comparison, sizes, substitution caveat, applications, standards and documents, handling, price basis, ordering checklist, disclaimer. Registered as `basaltRebarManual` in `content/data/downloads.ts` (second on the downloads page) and classified under the product in `lib/documents.ts`. |
| `/products/frp-rebar` | FRP rebar supplier | "Also in the family" card linking the basalt page; BFRP FAQ rewritten; revision 2026-11-01. |
| `/resources/blog/basalt-rebar-vs-fiberglass-rebar` | comparison | Closing paragraph links the basalt page; updated 2026-11-01. |
| Navigation, taxonomy, covers, sitemap, query map | — | Product menu entry renamed "FRP rebar & mesh" (the menu is at its 40-destination bound, so no child link; the page is reached from the GFRP page, the rebar family card, the comparison post and the downloads page); rebar family card link; product cover (supplier photo); sitemap entry; `seoQueryTargets` owner "basalt rebar supplier" supported by the GFRP page and the comparison post. |

Data: `content/data/basaltRebar.ts` (photos with credits, catalog, published values, properties, substitution, segments, standards, pricing, export, installation, FAQ). Figures: `scripts/covers/draw-basalt-rebar-figures.mjs` (also writes PNG copies for the manual).

## Rules applied

- Values: the manufacturer's published typical values restated as classes, labelled as such in every table and in the manual; "the qualification report per size governs". The supplier's yield-strength row, "370% lighter" and contradictory cost-saving tables were not carried over; its Ø22 tensile figure (a copy error) was recomputed from area × class.
- Prices: ranges only with the observation date (owner rule 2026-10-23); the supplier's per-tonne and per-metre price tables are not reproduced.
- Approvals: no ICC-ES, DOT, CE or ETA claim; "F1 holds no listing for basalt bars" stated where a buyer would look. ACI CODE-440.11-22 is stated as glass-only; basalt routes through ASTM D8505 / CSA S807 and the engineer.
- Manufacturer: not named on the page or in the manual until the owner confirms (as for FengDu before 2026-10-26); identity recorded in `docs/research/basalt-rebar-sources.md`.
- Photos: supplier photographs labelled "Supplier photo" and cropped clear of the watermark; Commons photographs credited with title, author and license link; captions say the construction scenes are steel-reinforced and none is an F1 or manufacturer project or quarry. No "Illustrative photo".
- Guarded by `scripts/basalt-rebar-page.test.mjs` (photos and figures exist and are credited, classes labelled, no unit price or approval claim, manufacturer unnamed, manual registered and present, registrations in place).

## Validation

- `npm test`, `npx eslint app components content lib scripts`, `npm run build`, `npm run check:sitemap`, `node scripts/check-copy.mjs`, `npm run search:pages`, `npm run seo:blog-map`: see the PR.

## Measurement

PDCA A036 (vault `05-市场/SEO/PDCA`): T+7 indexing of the new route and the manual PDF; T+14 impressions for "basalt rebar", "basalt fiber rebar", "BFRP rebar" and "basalt rebar supplier" against a baseline to be captured at the next GSC export.
