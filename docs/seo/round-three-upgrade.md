# Round-three SEO/GEO procurement upgrade

Implementation date: 2026-10-11. Branch: `codex/seo-geo-round-three`.
Production baseline: `255ea95adc5fc6eb69146d31656ec49c5a007795` (PR #161).
This document covers requested items 2–5. It records implementation and local acceptance, not a production release or measured SEO improvement.

## 2. Configuration and machining evidence

Round and square/rectangular tube size rows now open the evidence library with a stable catalog key, material formulation and catalog revision. The evidence page validates that selection, shows its identity, and carries it through the selected PDF and all report/inspection RFQ links. A family/section mismatch, unknown selection, duplicate parameter or stale revision cannot silently become a current configuration.

The selection supports alternative material datasets without inheriting the default material's mass or certificate claims. Profiles lacking a default dataset remain reviewable with an explicit missing-material state. HTML datasheets are labelled as their default configuration; selected PDFs carry the chosen material. Nominal DXF links require an existing asset with matching standard geometry. A catalog revision is never presented as an approved drawing revision.

The public catalog and AI context share the same compact procurement projection: document URLs, nominal drawing status, missing approved-drawing revision, first-article publication status and blank template link. The evidence HTML explains publisher, report reference/date, specimen and test conditions, value type, applicability and unknowns.

`public/downloads/frp-first-article-inspection-template.csv` is explicitly **BLANK — NOT INSPECTED**. It has fields for the drawing/revision, batch/sample, datum, specified limits, method/setup, instrument/calibration, uncertainty, actual result, disposition and release. It contains no measured values or approval. Custom, machining and quality pages explain how to use it.

**Remaining evidence input:** an authorized, redacted drawing and actual first-article inspection record, together with a technical review of configuration/report applicability. No customer PDF, private quotation, invented measurement or new direct-match claim is published by this change.

## 3. Procurement sequence and interaction measurement

Existing round tube, square tube, custom, machining and quality pages place specification/dimensions before applicable documents, fabrication/inspection and the final RFQ handoff. Navigation anchors follow their actual DOM sequence. The existing machining planner and related links remain available.

Finder shortlist additions/removals, deliberate comparison clicks and RFQ handoffs now have consent-aware, runtime-whitelisted events. Machining handoffs send only a feature enum. LCC events retain their existing names but no longer send the saving amount. Fixed canonical page context prevents these explicit events from inheriting private URL parameters/fragments.

See [procurement-events.md](procurement-events.md) for definitions and limits. No GA4 property settings, key-event promotion or actual DebugView verification occurred. These actions are not submitted or qualified leads.

## 4. Query ownership review

`npm run seo:query-review -- --input /private/path/gsc.csv --output /private/path/review.json --as-of YYYY-MM-DD` reads genuine query/page/country/device/date rows and compares adjacent 56-day windows. It preserves missing values, rejects duplicate grains, weights position by impressions, and shows weekly page observations without diagnosing cannibalization or changing routes.

The existing query ownership registry is read only. Real GSC aggregate observations were reviewed separately and retained in private research records. They are not converted into invented daily data. No genuine joint daily export has yet been imported into this CLI. See [query-review.md](query-review.md) and the empty input/manifest/decision templates.

## 5. Correct AI citation and measurement

HTML, the public catalog and AI context now expose the same selected-object identity and evidence limitations. This is an information-quality improvement; it is not a promise of AI citation or ranking.

[geo-measurement.md](geo-measurement.md) and its templates define 20 fixed English procurement questions, controlled run conditions, repeated observations, citation-level fact checking and explicit denominators. No AI experiment, recurring automation or new AI-specific schema/file was created. Account observations and business performance stay outside the public repository.

## Acceptance

- `npm run lint`: passes with one pre-existing `SectionViewer3D.tsx` hook warning.
- `npm test`: 305/305 pass, including configuration handoff, event/consent and offline query-review behavior.
- `npm run build`: passes; 440 pages generated.
- Owner links: 180 supporting pages pass. Sitemap route coverage: 124 static indexable routes plus 3 crawlable noindex routes pass. Copy check: zero errors and 13 existing warnings.
- Local production HTTP acceptance: 13 base/selected/invalid/stale URLs return 200 with one H1, expected canonical and parseable JSON-LD. Filtered evidence pages retain `noindex, follow`.
- Two selected PDF samples have valid PDF headers; both matching nominal drawings exist. Catalog/AI projections match across 114 records at `catalog-05fc2fc34578`; sitemap has 257 URLs and the 24-datasheet indexing pilot remains unchanged.
- Browser: selecting a square tube and alternative formulation survives resubmission and reaches the contact form with the same key, formulation, revision and review limits. No inquiry was submitted.
- At a 390px viewport, evidence/configuration, square tube, machining and custom pages have no document-level horizontal overflow. The configuration form stacks its controls and preserves the selected material. Browser viewport was reset afterward.
- Independent review found and resolved selection persistence, per-report RFQ identity, finder URL and missing-default-material issues. Separate read-only review found no material issue in the offline query methodology.

No dependencies, environment variables, database migrations, new indexable routes, case-study facts or production settings are changed. Preview/CI and release status are recorded on the associated PR; a later production release must follow the repository's Git-to-production workflow.
