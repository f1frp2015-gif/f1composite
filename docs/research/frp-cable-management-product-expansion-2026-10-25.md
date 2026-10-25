# FRP cable management product expansion

Reviewed: 2026-10-25. Owner page: `/applications/frp-cable-tray-supports`.

## Scope and editorial decisions

Expand the existing English destination rather than duplicate its search intent under a new URL. Add covered routes, dimension definitions, named manufacturer size examples, support-component dimensions, conditional load examples, route fitting drawings and a procurement / inspection plan. Keep F1 supply and document availability subject to the offered configuration. No competitor certification, photograph or project reference becomes an F1 claim.

## Primary-source ledger

| Source | Used for | Limits |
| --- | --- | --- |
| [NHC product family](https://www.nhcfrp.com/Cable-Tray-and-Ladder.html) | Tray, ladder, cover and fitting scope | Product-family evidence, not approved F1 system performance. |
| [NHC supports](https://www.nhcfrp.com/grp-cable-trunking.html) | CRS / CRZ length, effective length and mass rows | Retain original model names. “Efficiency Length” requires drawing confirmation. No support capacity inferred. |
| [Eaton B-Line](https://www.eaton.com/mx/en-us/catalog/support-systems/fiberglass-cable-channel-tray.html) | Imperial ladder dimensions, series exception, section lengths; material / accessory context | Exact conversions, no cross-series guarantee. |
| [Ercon](https://ercon-india.com/GRP-FRP_Cable_Trays.php) | Ladder and CT / CTF dimensions, pitch, radius and standard / optional lengths | Product-specific options, not F1 tooling or inventory. |
| [Øglænd FOE](https://www.oglaend-system.com/products/cableladders/foe/) | Dimensions and published load / span table | Preserve end-span and splice conditions; ask for complete test report and applicability. Do not interpolate. |
| [EAE KCA](https://www.eaeusa.us/products/grp-cable-trays/kca-grp-cable-tray) | Height, width and section length | Do not repeat the source's non-flammable / non-toxic interpretation of fire tests. |
| [FibreTek](https://www.fibretek.co.za/portfolio/grp-cable-ladder/) | Rail, rung, pitch and length examples | Exclude load number because its full test and installation basis is not provided here. |
| [IEC 61537:2023](https://webstore.iec.ch/en/publication/31963) | Tray / ladder and support-device scope | Public abstract only; no access to purchased clauses claimed. |
| [IEC 61084-1 consolidated edition](https://webstore.iec.ch/en/publication/92096) | Trunking / ducting scope; applicable parts used together | A covered tray does not automatically satisfy this standard or an IP rating. |
| [Cable Tray Institute](https://www.cabletrays.org/codes-and-standards/) | UL 568 scope; FG 1 rescission | Historical NEMA references are labeled as such. |

Older supporting links remain from the September source review in `frp-cable-tray-trunking-ladder-sources.md`; the page distinguishes the new review date from that older reading list.

## Supplier data excluded from publication

- [NHC tray](https://www.nhcfrp.com/FRP-Cable-Tray1.html) and [ladder](https://www.nhcfrp.com/frp-cable-management-solution.html) list loading values without a usable span / configuration basis. No conversion, correction or F1 load guarantee is inferred.
- Their generic mechanical, thermal and fire fields lack sufficient specimen / method context for a new F1 datasheet. Request the actual grade, laminate and test reports before use.
- [NHC trunking](https://www.nhcfrp.com/GRP-Cable-Trunking-14421-product_3.html) contains bar-spacing / open-area / area-mass rows resembling grating data. They are not used as cable-trunking dimensions.
- Mita distributor load tables were not used; apparent span discrepancies require the original system table. Legrand steel ladder specifications are not FRP evidence.

## Original engineering example

All inputs are explicitly assumed: cable mass 24 kg/m, project future allowance 25%, tray + covers + accessory mass 6 kg/m. Cable request = 30 kg/m; supported total = 36 kg/m. With g = 9.80665 m/s², total gravity line load = 0.3530394 kN/m. For an ideal 2 m tributary length, vertical reaction = 0.7060788 kN. This is load bookkeeping, not structural qualification. Actual reactions, other actions and the manufacturer's self-weight convention remain separate checks.

## Image provenance

- Reuse existing original generated product / application illustrations; provenance is recorded in `frp-cable-tray-image-prompts.md`. Label them as illustrations on the public page.
- New `public/images/applications/cable-management/*.svg` assets are original schematic drawings created for this update. No manufacturer imagery is copied. They do not specify fabrication geometry, load capacity or tested connections.
- Dimension and fitting diagrams open at full resolution; adjacent captions define their terms for mobile readers and assistive technology.

## Validation

Record final lint, build, functional and rendered-page checks in the handoff / pull request. No production release is implied by this content update.
