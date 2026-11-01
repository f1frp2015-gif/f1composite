# Navigation priority: what the menus show first, and why

Implemented: 2026-10-31. Scope: `content/data/navigation.ts` (Products, Tools, footer), the Products menu panel in `components/layout/Navbar.tsx`, and `scripts/navigation-ia.test.mjs`. Owner request: rank the navigation categories and what they show so the main product navigation is clear and matches how buyers browse.

## Evidence

Search Console export, 12 months to 2026-10-25 (`f1composite.com-Performance-on-Search-2026-10-27 (1).xlsx`, Pages and Queries sheets), with the automated product-attribute queries removed from the query counts (`docs/seo/query-review.md` rules; 111 of 1,000 named queries). Desktop is 84% of impressions; the United States 32%, then India, the United Kingdom, China, Australia, Canada and Japan.

| What buyers click | Clicks | Impressions | Reading |
|---|---:|---:|---|
| Window and door queries (139 queries) | 100 | 9,188 | 44% of named-query clicks on 14% of impressions: the best-converting family, listed third in the old menu |
| Profile and shape queries (309) | 39 | 15,015 | The volume family; `pultruded profiles` alone 27 clicks at position 30 |
| Tool pages (span tables, profile calculator, U-value calculators) | 193 | 5,175 | 7% of impressions, 26% of clicks: the strongest click asset on the site |
| Grating and stair-tread queries (64) | 1 | 5,421 | Demand without clicks; the Saudi grating page alone 5,784 impressions |
| `/products/frp-handrail-systems`, `/products/frp-ladders` | 3 | 611 + | Pages with demand that no menu listed |
| `/products/frp-solar-mounting-systems` | 11 | 813 | Second-highest clicks of any product page after windows; reachable only from the directory |
| `/products/custom-pultruded-profiles` | 4 | 1,876 | Drawing-led route; carbon tube, rod and plate pages sit under it |
| `/products/frp-rebar`, fasteners | 3 / 4 | 134 / 377 | Bought by name; one link each is enough |
| Specialist component anchors | 0 | 2–22 each | Four anchor links in the menu that nobody used |
| Applications (24 pages) / Industries (7) | 24 / 26 | 1,896 / 5,891 | Weak as entry points; kept as conventional B2B top-level items |

## Decisions

Top level stays `Products · Applications · Industries · Tools · Resources · Company`, search and the quote button. The six labels are what B2B buyers expect, the data does not justify removing one, and `Tools` already sits in the bar. The ranking work goes inside the menus.

**Products menu** (40 destinations, the per-menu bound):

1. Standard profiles (F1-STRUX): the glyph grid of the ten standard shapes, unchanged, with two hub links under it (all standard sizes; the pultruded profiles overview page, which carries 17,213 impressions).
2. Windows & doors (F1-THERM), promoted from third to first family: profiles for fabricators, finished windows and doors, door frames, thresholds, window reinforcement.
3. Grating, handrails & ladders (F1-GRID): the three grating pages plus handrail systems and fixed ladders, which were previously outside every menu. One access-systems purchase, one family.
4. Custom & carbon fiber profiles (F1-FORM): carbon tubes, carbon rods (new page, previously unlisted), carbon plates, the carbon pultrusion overview, T profiles, square rods.
5. GFRP rebar & mesh.
6. Fasteners & fittings.
7. Solar mounting systems, newly listed.
8. Site & civil works: sheet piling, rock bolts, fencing, tree and plant stakes, snow and driveway markers. The long tail, grouped so it does not dilute the families above.
9. Specialist components: one link to the directory section instead of four anchor links.

The side panel keeps the profile finder card and adds the three most-clicked tools (span tables, profile calculator, window U-value calculator) above the document links. The "Systems" heading becomes "Product families".

**Tools menu**: every live tool is listed (15, up from 9), most-used first: span tables and the profile calculator lead; column buckling, thermal expansion, unit converter, GFRP rebar, life-cycle cost and cut-list tools join.

**Footer products**: windows second, "Grating, Handrails & Ladders" and "Custom & Carbon Fiber Profiles" replace "FRP Grating" and the specialist-components anchor.

**Applications, Industries, Resources, Company**: unchanged. The applications menu mirrors `applicationGroups` exactly (guarded by `scripts/pultrusion-guides.test.mjs`), so panel products that live there (facade panels, sound barriers, wind-blade panels) stay there rather than repeating in Products.

## Guards

`scripts/navigation-ia.test.mjs` now pins the family order, requires handrails, ladders, solar mounting, carbon rods and stakes in the Products menu, requires every family heading to link to a page, requires span tables and the profile calculator to lead the Tools menu, and raises the whole-menu bound from 115 to 125 destinations (124 used; the per-menu bound of 40 is unchanged).

## Measurement

Record as PDCA A030. Homepage navigation analytics (`homepage_navigation` event, destination path only) and Search Console at T+30: clicks to `/products/frp-handrail-systems`, `/products/frp-ladders`, `/products/frp-solar-mounting-systems` and the carbon rod page, which had no menu entry before; window-family CTR from the product menu; tool-page entrances from product pages.
