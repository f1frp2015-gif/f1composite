# Pultruded carbon fiber plates — sources and image map

Reviewed 2026-10-25 for `/products/pultruded-carbon-fiber-plates`.

## Technical sources

- [Exel — Guide to composites](https://exelcomposites.com/guide-to-composites/): continuous pultrusion, constant sections, fiber orientation and material selection. Generic insulating-fiber claims are not applied to carbon.
- [Exel — Carbon planks for Vestas wind turbines](https://exelcomposites.com/exel-composites-winds-bidding-for-vestas/): carbon pultruded planks in blade spar caps. The customer relationship and qualification belong to Exel, not F1.
- [Sika — CarboDur S](https://can.sika.com/en/construction/concrete-repair-protection/structural-strengtheningsystems/prf-fabrics/sika-carbodur-s.html): pultruded CFRP plates used within an engineered bonded strengthening system. Sika dimensions, properties, adhesive compatibility and approvals are not F1 specifications.
- [Rock West — Quasi-unidirectional carbon plate](https://www.rockwestcomposites.com/103-410.html): example of a sheet combining selected ply directions. Sheet layups vary; neither the word sheet nor a woven surface implies isotropic properties.
- [Easy Composites — Carbon fibre strips](https://www.easycomposites.co.uk/carbon-fibre-strip): longitudinally reinforced rectangular pultrusions for lightweight reinforcement. The supplier's stock sizes and resin data are not used as F1 claims.
- Existing `content/data/windTurbineBladePanelSpecs.ts`: F1 carbon-panel program and existing supplier image. GFP-WE20 glass-fiber test data are excluded from carbon-plate content.

Content is qualitative. No unverified F1 stock dimensions, mechanical ratings, certifications, lead times or customer programs are asserted. Plates may also be called laminates; the comparison is between predominantly longitudinal pultruded profiles and sheets with selected multidirectional layups.

## Images and future replacement

Three original SVG illustrations are in `public/images/products/carbon-fiber-plates/`:

| File | Size | Page position |
| --- | --- | --- |
| `pultruded-carbon-fiber-plates.svg` | 1200 × 900 | Hero and registered card cover |
| `plate-dimensions-fiber-direction.svg` | 1200 × 700 | Dimensions, bonding face and fiber direction |
| `pultruded-plate-vs-laminate.svg` | 1200 × 700 | Pultruded profile versus multidirectional sheet example |

All are original conceptual vector illustrations with longitudinal striations, accessible titles/descriptions and no numeric product specifications. They are labelled as illustrations or schematics on the page.

The application section reuses `/images/products/wind-turbine-blade-panels/pultruded-carbon-fiber-wind-blade-panel.webp` (605 × 209), labelled “Representative supplier image”. Its existing provenance and usage permissions continue to apply. No competitor images were downloaded or republished for this page.

When replacing an illustration with user-supplied product photography, update its source, alt text, dimensions and figure note together. The hero's card registration is in `lib/covers.ts`; related carbon pages use shared destinations in `content/data/carbonFiberPultrusion.ts`.

## Page connections

The overview, plates, tubes and rods each link directly to the other three pages. Overview cards and collection structured data now target the standalone products; the existing `#plates`, `#tubes` and `#rods` sections remain available. The new route is also in the product navigation, sitemap and generated site-search index.
