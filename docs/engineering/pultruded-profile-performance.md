# Pultruded profile performance page

Content review: 2026-09-21. Route: `/technology/pultruded-profile-performance`.

## Scope

English engineering reference for glass-fiber thermoset pultruded profiles. Six sections cover dimensions, physical/mechanical properties, thermal behavior, electrical properties, fire/smoke and chemical resistance. Carbon, hybrid and special formulations need separate qualification.

The content and source registry live in `content/data/pultrudedPerformance.ts`. The page uses server-rendered tables, native anchor navigation and a native source disclosure. No new client bundle or dependency was introduced. Entry links are in Engineering navigation, the technology hub, the pultruded-profile overview and the existing technical-data page. Canonical metadata, an Open Graph image, WebPage structured data and a dated sitemap entry are included.

## Source decisions

- NHC's requested tolerance page and related physical, thermal, electrical, technical-data and chemical pages informed the topic structure. Their values do not constitute F1 performance guarantees.
- The NHC tolerance image was not retrievable through the research browser. Numeric tolerance classes were not transcribed or inferred. The page describes drawing acceptance fields and cites ASTM D3917-23, EN 13706-2 and GB/T 31539-2015. Contractual tolerances require the licensed standard, size band and approved drawing.
- NHC lists ASTM D495 for Barcol hardness on its physical/technical data page. The correct Barcol reference is ASTM D2583; D495 measures dry arc resistance. Verified against ASTM's public catalogue descriptions.
- NHC's thermal-expansion units are ambiguous, and its thermal page mixes fire results with temperature properties. Those values were not adopted. The EPTA rail briefing supplies explicitly attributed illustrative conductivity (0.3 W/(m·K)) and expansion (11 × 10⁻⁶/K) values. Direction and temperature conditions must be requested for the offered product.
- NHC's PF dielectric example is 200 V/mil. Conversion: 200 / 0.0254 / 1000 = 7.8740 kV/mm, displayed as approximately 7.87 kV/mm. The original PF designation is retained without inventing its orientation definition. This is not a working-voltage rating.
- Four NHC chemical-chart examples show the role of resin and temperature. ISO is explicitly decoded as isophthalic polyester, not an ISO standard. The source's + / 0 / − results are preserved, with missing duration, stress and laminate information made explicit. No general compatibility promise or service-life prediction is made.
- SAMR lists GB/T 31539-2015 as current. EN 13706-2/-3:2002 are verified with BSI. ASTM D3917-23 and D4385-19 cover dimensional and visual acceptance respectively; these do not certify all performance categories.
- SAMR lists GB 8624-2012 as current at this review date. GB 8624-2025 is published with an implementation date of 2027-01-01. The page labels this as a dated edition check, not a permanently current statement. Revisit at implementation.
- UL 94, ASTM E84 and EN 13501-1 are distinct evaluations. The page separates reaction to fire, smoke density, toxicity and fire resistance. No F1 class is asserted without matching evidence.
- IEC 62631-3-1 and -3-2 links use their 2023 editions. They measure volume and surface resistivity respectively. Conductive profiles need an appropriate measurement method outside the assumption of an insulating laminate.

## Maintenance boundaries

The existing F1 published laminate table remains on `/resources/technical-data`. A selected seven-row E17/E23 minimum comparison imports `E17_MIN` and `E23_MIN` from `lib/catalog/en13706.ts`, avoiding a second copy of the numbers. The subset was cross-checked with Fiberline's published EN 13706 comparison (https://fiberline.com/european-standard-en-13706); it is explicitly incomplete for grade acceptance and is not labeled as F1 measured performance. Public standard catalogue pages establish scope and identity, not a substitute for complete licensed clauses. Candidate test routes listed together are not declarations of technical equivalence.

Future F1 measured data should identify the report, product/drawing, resin, reinforcement, thickness, orientation, conditioning, method/edition, statistic and date. Do not replace a reference label with an F1 claim merely because a supplier offers that resin family.

## Validation

- `npm run lint`: no errors; existing `components/calculators/section/SectionViewer3D.tsx` exhaustive-deps warning at line 394.
- `npm run test:navigation`: all four existing tests pass.
- `npm run check:sitemap`: static route coverage passes.
- `npm run build`: final production compile, TypeScript and static generation pass (356 pages). The final build needed process permissions outside the sandbox after sandboxed Turbopack runs stalled; no source or security-policy change was required.
- Browser at 1280 px and 390 px: readable headings/tables, no document overflow, valid anchor targets, native source disclosure, and RFQ message/product prefill. No inquiry submitted.
- Built HTML verifies the canonical URL, title, all six section IDs and sitemap inclusion, with no Product certification/offer markup added.
- Development mode reports a pre-existing React debug eval/CSP warning. Final production-mode browser verification leaves CSP unchanged.

This task prepares a review branch and preview. Production merge/deployment requires separate authorization.
