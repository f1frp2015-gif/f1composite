# Grating product and SEO upgrade — 2026-09-20

Scope: /products/grating, /products/molded-frp-grating and /products/frp-gratings.

The existing website specifications are the authority for this change. The 26 molded rows, 36 pultruded rows and existing product image files are unchanged. No manual was re-imported. CSV downloads use the same arrays as the HTML tables. No load capacities, test certificates, prices, stock locations or delivery promises have been invented.

The hub now targets fiberglass grating and compares the two constructions. Product pages add configuration shortcuts, exact specification-to-RFQ links, approximate inch depths, opening guidance and product-specific engineering/supply paths. Existing canonicals are retained. Grating next steps no longer send buyers to the structural-profile calculator or prefill “Structural profiles”.

## New image provenance

- Built-in image generation tool (image_gen); no external image API.
- File: public/images/products/grating/grating-panel-comparison.webp
- Generated 1536 × 1024; encoded WebP quality 82.
- References: existing molded-grating-grit-mesh-closeup.webp and pultruded-grating-t-bar-closeup.webp.
- Visible caption identifies the image as an AI-generated product illustration, not a measured product drawing or a real installation.
- Existing application and construction photographs remain in the product pages.

Prompt:

> Use case: product-mockup. Create one premium photorealistic catalog illustration for an industrial fiberglass grating supplier website, landscape 3:2. Reference images show actual product textures: green integrally molded square mesh and yellow pultruded parallel T-bearing bars with dark transverse cross rods. Show two substantial rectangular sample panels resting separately side by side on a pale cool-gray studio surface, green molded square grid at left, yellow pultruded grating at right. Three-quarter overhead view with front panel edges visible so the thickness and different construction are legible. Straight regular geometries, open drainage holes, realistic gritty resin surfaces, soft daylight, refined restrained industrial photography. Products fill most of frame with breathing space around edges. No people, no buildings, no tools, no text, no logos, no dimensions, no certificates. Do not imply a real project or measured specification. Clearly maintain square interconnected lattice vs directional parallel bearing bars; no metal bar appearance. Supporting product concept image, not a technical drawing.

## Verification

Run npm run lint, npm run build, npm run test:grating-pages, npm run test:grating-clips, npm run test:product-inquiry and npm run check:sitemap. Grating page tests include CSV and RFQ preservation for all 62 rows.

Validated on 2026-09-20:

- Production build passed (354 generated pages).
- Lint passed with the existing SectionViewer3D.tsx hook-dependency warning.
- Grating page/RFQ/CSV tests: 11 passed; clip tests: 7 passed; existing product inquiry tests: 3 passed; navigation tests: 4 passed; sitemap check passed.
- Browser: all three pages have a single H1, working section targets, and no document overflow at 390 px. Detail pages render all 26/36 rows. Molded 13 mm and pultruded T-1210 row clicks populate the correct product, exact specification and message in the contact form. No inquiry was submitted.
- Full-site image audit: new image has no missing references or implementation issues. The pre-existing fiberglass-door-thresholds/page.tsx eager-image warning fails the broad image test (confirmed present in HEAD). This unrelated page is unchanged.
- Engineering load/test documents remain request-based; publishing project-specific values requires actual matching documents.

## Supplier manual cross-check

The user subsequently provided the supplier PDF for a second check. All 26 molded rows match its printed pages 10–11, and all 36 pultruded rows match its page 17 overview. Several detail cards contradict that overview; no numerical value was replaced from those cards. The existing I-bar overview was corrected to 25/30/38 mm, while its mixed industrial group is now explicitly labeled I-bar & T-bar. Pultruded concave wording was corrected to a confirmed profile/grit selection, distinct from molded concave finishes.

The PDF alone does not establish F1's 316SS material, T-clip offering, fastening spacings or polyurethane grating availability. These pre-existing F1-specific specifications were not silently replaced with the supplier's different catalogue. Load appendices require source clarification before publication because their applicability and several cells are inconsistent.


## Procurement workflow, second release

The three product pages now share task-based entry points, a 62-configuration search/filter, three-way comparison and a 30-line panel schedule. Same-tab session storage preserves the draft between product pages; a separate summary key transfers it to the existing contact form without placing project text in a URL. Contact details and drawings are still entered on that form, with the existing delivery safeguards. Unknown fields are explicit; complete positive dimensions and integer panel counts produce net area only, excluding waste. No load suitability, prices or stock promises are calculated.

The hub hero uses the existing product construction photographs. Two new inline SVG guides explain clear span/bearing direction and whole-panel/cut-panel/fixing-kit supply scope. The existing clear-opening diagram and clip drawings remain available. No new supplier photography or unsupported surface/packing evidence was fabricated.

RFQ summaries can be downloaded as text or printed. Browser tests verified model search, comparison, a T-1210 panel at 1000 × 500 mm / 4 pieces producing 2.000 m², destination transfer, and draft restoration across families. At 390 px the pultruded planner had no document overflow. No inquiry was submitted. Automated tests cover all specification mappings, area conversion/invalid quantities and draft parsing. Grating tests are now included in CI.
