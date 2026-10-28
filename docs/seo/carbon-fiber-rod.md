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
