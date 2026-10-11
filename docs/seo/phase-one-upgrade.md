# SEO / GEO phase one: evidence, catalog and inquiry integrity

Implementation date: 2026-10-11. Scope: changes prepared for review and Preview; this document does not record a production release.

## What changed

| Buyer task | Implemented behavior | Remaining boundary |
| --- | --- | --- |
| Select a round tube | The first 17 round tubes have stable website references. Product tables, finder, HTML datasheets and PDFs use one published-catalog reader, revision and configuration context. Inactive DB records are not filled back from seed during a successful catalog read. | The IDs are website references, not manufacturer SKUs. Supply and finished-product properties require confirmation. If the catalog DB is unavailable, the existing static fallback remains a reference dataset. |
| Evaluate evidence | The evidence page states document holder, tested object, date and applicability. A configuration link retains section and formulation; unrelated reports are not treated as proof of the selected product. | No public report has been verified as a direct match for a round-tube/formulation combination. No direct-match binding is created by this change. |
| Compare resin options | The PDF selector validates explicit material codes and catalog revisions. Alternative material comparisons require reference mode and do not inherit the default published mass. | Dataset comparisons do not establish availability, certification or production qualification. |
| Ask engineering about a calculation | The visible calculation, share link and inquiry use the same engine. A versioned snapshot carries full inputs, units, coefficients, unrounded results and limitations. The API independently recomputes it before accepting it. | Reproducibility is not design approval. Nearest catalog geometry is a candidate requiring recalculation. The engine uses a named static catalog version, separate from the live sales catalog. |
| Measure useful inquiries | Optional acquisition data and manual sales qualification attach to the existing inquiry ID. Consent denial clears attribution. Unknown sources remain unknown. Qualification is independent of won/lost outcome. | Browser-observed sources are not proof of AI citations. The external Cockpit UI is outside this repository and needs display/edit integration. |
| Understand custom tooling | The custom-profile page separates tooling cost, amortization and production limits. The company timeline gives PHI certification its documented 2025 date. | Quotation, simultaneous process limits and applicable certificates still need project-specific review. |

## Search behavior

- Finder comparisons are initialized from server search parameters so the initial HTML contains the requested selection.
- Finder filter/compare and evidence configuration URLs use `noindex,follow` with the base-page canonical. The base tool and evidence pages remain indexable.
- Existing canonical product/datasheet routes are retained. No mass-created keyword pages, fabricated reports, reviews or certifications are added.
- Detailed inquiry context travels in fragments instead of HTTP query strings. The receiving form and API validate its contents; snapshot fields are not ranking metadata.

## Validation and release

Run `npm run lint`, `npm test`, `npm run check:copy`, `npm run check:sitemap`, `npm run build`, and `npm run check:owner-links`. `npm run test:phase-one` isolates the new evidence, catalog, calculation and acquisition suites. Browser acceptance covers selected configuration → inquiry, calculator custom properties → inquiry, comparison links and ordinary contact-page anchor navigation.

Local acceptance: 269 tests passed; lint had no errors and one pre-existing `SectionViewer3D` effect-dependency warning. Copy checking had no errors and 14 style warnings. Sitemap coverage and 154 supporting-page owner links passed. The production build passed. Browser checks preserved custom E=41 GPa calculation details in the contact draft and preserved the entered name and message after the skip link. The finder comparison controls were inspected at a 390 px viewport. A three-page default/alternative-material PDF was rendered and visually checked. No live inquiry was submitted.

Use empty DB/email environment variables or isolated test services for local verification. Never submit test inquiries against a Preview that shares production DB or email credentials. The additive database columns are created lazily on the first DB-backed request after deployment; details and the existing authenticated qualification API are in [acquisition-rfq-attribution.md](../acquisition-rfq-attribution.md).

Publish only after PR checks and Vercel Preview validation. Record the merged commit and production deployment when a production release is authorized. Search visibility and AI citations require subsequent measurement; this change makes no ranking or citation guarantee.
