# Carbon fiber rod product page

Reviewed: 2026-10-25

Canonical route: `/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod`

The solid rod family owns the entry point. The new page has a breadcrumb and comparison link back to fiberglass round rods, with reciprocal links from the parent rod page, fiberglass square rods and custom pultruded profiles. Sitemap, site search and a dedicated social image make the route discoverable.

## Search intent and placement

| Intent | Terms | Placement |
| --- | --- | --- |
| Product | carbon fiber rod, carbon fiber rods | Title, H1, introduction |
| Construction | solid carbon fiber rod, pultruded carbon fiber rod, CFRP round bar | Title, overview, specification, FAQ |
| Imperial diameter | 3/8 inch carbon fiber rod, 3/8 carbon fiber rod | Size heading, contextual inquiry link, FAQ |
| Selection | carbon fiber rod vs fiberglass rod | Comparison heading and reciprocal links |

Ahrefs keyword overview was requested for US terms after consulting the API documentation. It returned `API units left: 0`. No search volume, keyword difficulty or ranking claims are made. Terms reflect the supplied reference and manufacturer terminology, not a quantified priority ranking.

## Source and claim boundaries

- User reference: https://incomepultrusion.com/product/3-8-carbon-fiber-rod/ — supports the solid/pultruded/round-bar and 3/8-inch search intent. Its pricing, stock lengths, tolerances, fiber grades and performance values are not F1 claims.
- https://www.rockwestcomposites.com/47311-l48.html — manufacturer reference for solid pultruded carbon rods, longitudinal reinforcement and axial/bending design considerations.
- https://www.easycomposites.co.uk/2mm-carbon-fibre-rod — manufacturer reference for unidirectional pultruded construction and model/equipment applications; shows why diameter and unsupported length matter.
- https://goodwinds.com/defense-contract-manufacturing-composite-rods-tubes/ — material-selection context for carbon stiffness/weight and glass-fiber electrical applications.
- Dimensional conversion: `3 / 8 × 25.4 = 9.525 mm`. A 10 mm rod differs by 0.475 mm. Neither 9.5 mm nor 10 mm is automatically interchangeable with 3/8 inch.

The page offers a drawing-led inquiry. Diameter availability, fiber/resin grade, length, tolerance, tooling, samples, MOQ, price and lead time are quotation-controlled. No numerical CFRP strength, modulus, temperature rating, inventory or certification is asserted. Existing GFRP catalog values and other CFRP product evidence are explicitly excluded from rod qualification. Applications are discussion examples, not approved end uses.

The original SVG is a labeled section illustration, not a product photograph or a dimensional manufacturing drawing.

## Picture-led rewrite (2026-10-28)

Owner request: the same depth of rewrite as the GFRP rebar page (A028) for the carbon fiber tube and rod pages, picture-led, with openly licensed photographs, explaining performance, application scenarios and benefits.

| Change | Where |
|---|---|
| New first section `#performance` on both pages: specific-stiffness figure, a photo of the pultruded material (plate edge, roving, carbonization line), four reason cards with proof lines, an 11-row class-value table CFRP vs E23 GFRP vs aluminium 6061-T6 vs structural steel (`carbonProperties`), and four limit cards beside the broken-pole and drilled-hole photographs | `app/products/pultruded-carbon-fiber-tubes/page.tsx`, `app/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod/page.tsx`, `content/data/carbonFiberScenes.ts` |
| Hollow vs solid section drawn to scale with I and A (Ø10 rod, Ø14 × Ø10 tube at the same mass, Ø10 × Ø7 tube at the same OD); fiber-direction figure (pultruded 0° against roll-wrapped 0/±45/90) with "choose pultruded when / wrap when" lists on the tube page | `scripts/covers/draw-carbon-fiber-figures.mjs`, `public/images/products/carbon-fiber/figures/` |
| Application cards with photographs: tubes (UAV arms, parallel robots, optics and metrology, booms and masts, research and model aircraft, frames, flexible poles, metal replacement); rods (linkages, delta robots, model aircraft, drones, poles and spars, concrete strengthening); each with typical sizes and what to send | both pages |
| Connections and fabrication sections keep the three rules and add the drilled-hole photograph and the galvanic-isolation detail | both pages |
| Hero photographs replace the SVG concept diagrams (hexacopter arms; delta robot linkages); H1 and header facts lead with stiffness per kilogram; three FAQs added (stiffness and mass class values, price basis, pultruded vs wrapped or machined) | both pages, `content/data/carbonFiberRod.ts` |
| 18 photographs from Wikimedia Commons (public domain, CC BY, CC BY-SA), cropped to 8:5 at ≤ 1280 px, 1.2 MB in total; credits block at the end of each FAQ section; sources and property basis in `docs/research/carbon-fiber-pages-photo-sources.md` | `public/images/products/carbon-fiber/scenes/` |
| New gate test `scripts/carbon-fiber-pages.test.mjs` added to `npm test` | scripts |

Editorial decision: the 2026-10-25 pages carried no numbers at all. The rewrite states published class values for unidirectional pultruded carbon (ACI 440.1R ranges, supplier datasheets) and labels them as such in the table footnote, the figure footers and the FAQ, with the offered laminate's qualification report named as the design basis. No F1 CFRP datasheet, certificate, stock size, tolerance, MOQ or lead time is asserted. Titles and meta descriptions are unchanged.

## Plate page rewrite (2026-10-31)

Owner request: the same picture-led rewrite for `/products/pultruded-carbon-fiber-plates`.

| Change | Where |
|---|---|
| New first section `#performance`: plate-edge hero photo; tows, specific-stiffness figure and a wind-blade transport photo; four reason cards (bondable stiffness, thin and continuous, no fatigue/corrosion/creep, a broad face for the adhesive); the shared 11-row class-value table; four limit cards (flat is not stiff, the joint fails first, weak across the thickness, conductive and noble) beside the broken-pole photo | `app/products/pultruded-carbon-fiber-plates/page.tsx` |
| New `#orientation` section with a drawn figure of a 50 × 3 mm strip flat / on edge / stacked (I = 113 / 31,250 / 3,038 mm⁴) and three cards; new `#bonding` section with a bonded-strip figure (bond line, anchorage, end peel, seven drawing items) beside the slab-strip photo and a "what F1 supplies" card | `scripts/covers/draw-carbon-plate-figures.mjs`, `content/data/carbonFiberScenes.ts` |
| Application cards with photographs: wind-blade spar caps, concrete/masonry/timber strengthening, springs and orthoses, bonded stiffeners and spars, each with typical sections and what to send | page |
| Plate-vs-sheet section keeps the construction schematic and adds the woven-fabric photo, the drilled-hole photo and four fabrication rules | page |
| Three FAQs added (stiffness and strength class values, why pultruded, plate vs adhesive) | `content/data/carbonFiberPlates.ts` |
| 5 more Commons photographs (CC BY, CC BY-SA), 2 drawn figures; credits block; sources in `docs/research/carbon-fiber-pages-photo-sources.md` §Plate page additions; gate test extended to the plate page | `public/images/products/carbon-fiber/`, `scripts/carbon-fiber-pages.test.mjs` |

Class values labelled as such; strengthening design named as the engineer of record's and the system supplier's. Title and description unchanged.

## Hub page rewrite (2026-10-31)

Owner request: the same picture-led rewrite for `/products/pultrusion-carbon-fiber`. The hub's job is to route the reader to the right form, so it does not repeat the three product pages.

| Change | Where |
|---|---|
| Hero photo (carbon roving on a creel) replaces the SVG family illustration; H1 and facts lead with stiffness per kilogram and "which form your load case needs" | `app/products/pultrusion-carbon-fiber/page.tsx` |
| New first section `#profiles`: three form cards with photographs (plate edge, hexacopter tube arms, delta-robot rod linkages), when each is the answer and typical sizes, then a seven-row **load case → form** decision table that also routes torque/pressure cases to custom profiles and insulation/cost cases to fiberglass | page |
| New `#performance`: shared specific-stiffness figure, broken-pole photo, "what carbon gives / what it takes" (3 + 3), the shared 11-row class-value table | page |
| `#plates`, `#tubes`, `#rods` anchors kept; each now carries a photograph, the typical range and the same specify/links/RFQ block | page |
| `#process`: carbonization and tows photographs plus the FengDu KraussMaffei hall production photo (honestly captioned: glass runs on these lines) before the existing process schematic and five steps | page |
| `#selection`: shared fiber-direction figure beside the three existing cards; `#applications`: six photo cards routed to the form or specialist page | page |
| Credits block; gate test extended to the hub (property table, credits, links to all three forms, anchors) | `scripts/carbon-fiber-pages.test.mjs` |

No new photographs: the hub reuses the shared library in `content/data/carbonFiberScenes.ts` and the owned hall photo. Title, description and the product-directory cover unchanged.

## Strengthening strip page rewrite (2026-10-31)

Owner request: the same picture-led rewrite for the specialist page `/products/pultruded-cfrp-strengthening-strips`. The page was served by the generic guide template (`app/products/[slug]`), so it now has its own route that keeps the sourced guide data and adds the picture-led material in front of it.

| Change | Where |
|---|---|
| Dedicated route with its own OG image; the sourced specification sections, standards cards, sources list, FAQs, brief items and related links still come from the shared guide data and render through `GuideSection`, `GuideStandards` and `GuideSources`, newly exported from the guide template | `app/products/pultruded-cfrp-strengthening-strips/page.tsx`, `components/sections/PultrusionGuidePage.tsx` |
| Hero: a 5 mm strip being pressed onto a beam soffit; H1 and facts lead with "a steel plate's tension at a tenth of the weight" and the EB strip size class | page |
| `#performance`: strip-in-hand photo, specific-stiffness figure, slab-strip photo; four reason cards (steel-plate tension at a tenth of the weight, no added depth, no rust at the bond line, installed overnight) with proof lines; four limit cards (the bond is the capacity, fire and impact, strain limits cap the gain, one part of an assessed kit) | page |
| `#placement`: drawn figure of a beam strengthened three ways (EB strip, NSM strip or bar, bonded steel plate) with size ranges and governing failures; EB / NSM / wet lay-up cards | `scripts/covers/draw-cfrp-strip-figures.mjs` |
| `#bond`: the shared bond-line figure, the peel-ply plate photo and a "who owns what" card (engineer of record, system supplier, installer, F1) | page |
| `#applications`: four photo cards (beams and slabs under new load, new openings, corroded reinforcement, NSM strips and bars) with typical sections and what to send | page |
| `#product`: wet lay-up fabric photo for contrast, coiled strips photo, an "on the order" list; three FAQs added ahead of the guide's four | page |
| 6 more Commons photographs (CC BY 4.0, one contractor's site and product shots), 1 drawn figure; credits block; sources in `docs/research/carbon-fiber-pages-photo-sources.md`; gate test extended | `public/images/products/carbon-fiber/`, `scripts/carbon-fiber-pages.test.mjs` |

Boundary kept from the 2026-10-25 page: strip only, not the kit; no assessed-system, ETA or approval claim; class values labelled; adhesive and strengthening design belong to the system supplier and the engineer of record. Title and description unchanged.
