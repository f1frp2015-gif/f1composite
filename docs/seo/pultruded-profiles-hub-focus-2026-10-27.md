# Pultruded FRP profiles hub: focus on the query it owns

Implemented: 2026-10-27. Scope: `/pultruded-frp-profiles` only, plus its entry in `content/data/seoQueryTargets.ts` and the regenerated search index.

## Evidence

Search Console, 12 months to 2026-10-25 (owner's export). The owner confirmed in the Search Console UI that the `pultruded profiles` query family lands on this page, so the earlier suspicion of several hubs splitting the query was dropped.

| Measure | Value |
|---|---|
| Page impressions / clicks | 17,213 / 84 (CTR 0.49%, average position 15.9) |
| `pultruded profiles` | 1,009 impressions, 27 clicks (2.7% CTR) at position 29.7 |
| `frp pultruded profiles` | 1,500 impressions, 0 clicks, position 39.6 |
| `structural pultruded profile` / `pultruded fiberglass profiles` | positions 25 / 24 |

When the snippet is shown, people click (2.7% at position 30). The page itself was a 2,500–3,000 word, 17-section hub that repeated the resin table, the FRP-vs-steel table, the EN 13706 grade table and a glossary that each have their own page, which diluted what the page is about and competed with those pages.

## Changes

- Title: `Pultruded FRP Profiles: Standard Sizes & Custom Sections` (56 chars, was `Pultruded FRP & GRP Profiles | Product Range`). Description names the shapes, the grade, mm and inches (159 chars).
- H1 `Pultruded FRP profiles`; GRP stays in the description and body for UK/AU searchers, not in the H1.
- First screen: a real production photo (owned, `f1-composite-pultrusion-plant-floor.webp`) instead of a stock still life; facts are catalog sizes, standards, catalog lead time and custom MOQ; the secondary action is the design manual PDF instead of an anchor.
- New first section **Standard sizes at a glance**: the seven standard families with catalog size count, dimension range in mm and inches, and mass in kg/m and lb/ft, read from the same catalog as the family pages (hourly revalidation). The US is 32% of impressions; this is the first place the hub shows inches.
- Removed from this page: the resin table, the FRP vs steel vs aluminum table, the EN 13706 grade table, the glossary, the three "buying path" cards, the industries cover grid and the three-column resource list. Each topic keeps one card linking to its owner page (`/technology/pultrusion-process`, `/technology/pultrusion-resin-systems`, `/technology/quality-testing`, `/technology/frp-vs-traditional-materials`, `/resources/glossary`, `/resources/how-to-choose-frp-pultrusion-supplier`).
- Tools moved up to the third section (technical/tool pages have 2.5% CTR site-wide against 0.76% for commercial pages).
- FAQ cut from 10 to 5 purchasing questions, each under 50 words, with lead time, MOQ and lengths read from `supplyTerms`.
- Rendered `<main>` is now about 2,100 words and 8 H2s (was 17 sections); 100 links in main, all query owners that list this page as a supporting URL still linked (`check:owner-links` passes).

## Verification

`npx eslint app components content lib scripts` (0 errors), `npm test` (319 pass after `node scripts/search-pages.mjs`), `npm run build`, `check:owner-links`, `check:copy`, `check:sitemap`.

## Measurement

Hold the title, H1 and section order for 60 days. Review at T+30 and T+60 in Search Console, filtered to this page, excluding the automated long-tail queries (product-attribute strings at positions 1–5 with no clicks) and the spike days 2026-09-17/18 and 2026-10-22/23:

- `pultruded profiles`, `pultruded fiberglass profiles`, `structural pultruded profiles` from positions 24–30 to 15 or better.
- Page CTR from 0.49% to 1.5% or better.
- Page clicks from about 12 a month to 30 or more.
- No target for `frp pultruded profiles`; that spelling is dominated by marketplace listings.

Off-page work (association listings, directory and editorial links to this page) is tracked separately; without it the expected ceiling is the top of page 2.
