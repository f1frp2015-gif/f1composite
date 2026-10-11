# P1 machining, purchasing evidence and public knowledge upgrade

Implementation date: 2026-10-11. Branch: `codex/frp-machining-p1`.

## Buyer outcome

A buyer can now move from a structural profile to an illustrated machining specification, distinguish raw-profile variation from finished-feature tolerances, and carry a requested dimension into an RFQ. Resin, material-comparison, custom-profile and inspection pages describe the evidence needed for the offered configuration. AI context and the public catalog share configuration identities, revision and evidence status.

## P1 coverage

| Workstream | Implemented | Evidence still required for additional claims |
|---|---|---|
| Cutting / drilling / machining | `/technology/frp-profile-machining`: six operations, nine original schematics, four purchasing control levels, tolerance-limit planner, datum and inspection matrix, first-article / production / packing workflow | Actual machine/supplier capability records; customer-approved finished drawings; measured samples |
| Custom profiles / tooling / tolerances | Drawing and datum review, first article, change control, retained illustrative die-cost amortization example; quality record checklist with unfilled results | Real first-article and repeatability records; no blanket ± capability advertised |
| Polyester / vinyl ester / chemical / UV | Shared qualitative resin selection, chemical-condition matrix and surface-system evidence; removed unsupported family scores and general temperature/price ranges | Named formulation and applicable exposure / weathering evidence |
| FRP / steel / aluminum / life-cycle cost | Equivalent-function basis, shared E23 reference and equal-EI teaching example; visible LCC assumptions, exclusions and RFQ snapshot | Configuration design checks, comparable quotations and maintenance evidence |
| Grating load / span | Both product pages explain required specimen, support, load and layout information; corresponding article and steel comparison aligned | No actual configuration load table supplied; no generated grating capacity published |
| Fasteners and connections | Thread / mating component / material / joint / inspection checklist; machining guide cross-link | Matched assembly tests and approved installation procedure; no universal torque |
| Cooling / cable applications | Guide links to existing application owners and relevant product pages | No new delivered-case, strut-compatibility or system certification claim |
| GEO / machine context | Shared public catalog projection with keys, formulation, revision, dimensions, mass and evidence scope; shared material comparison and machining summary | Discoverability does not demonstrate ranking or AI citation gains |
| Downloads | Existing 46-page design manual rebuilt from current data; unsupported fixed machining assumptions removed | Manual is a reference; project drawings and applicable evidence control release |

## Technical source ledger

The guide's visible citations are maintained in `content/data/frpMachining.ts`. Representative primary sources reviewed:

- Strongwell Fabrication & Repair Manual (2024/10 URL): support, tooling by operation, drilling backers, routing and treatment of exposed reinforcement.
- Bedford Fabrication & Maintenance Manual (2016): tool wear, supported cutting, backed drilling and controlled routing.
- Exel Composites Machining / Working with Composites / Secondary Processing: finished-hole verification, trial pieces, workholding and operation categories.
- Fiberline written cutting/drilling guidance: long-stock restraint and chemical-exposure considerations.
- Strongwell Metric Tolerances, Rev. 1124: published tables are scoped to EXTREN, not all pultrusions.
- Creative Composites Group prefabricated bridge specification: separate fabrication requirements from profile requirements; vendor template is not a universal standard.

All diagrams are original, schematic and unscaled. No customer logos, identifiers, quantities, drawings or numerical acceptance criteria are published. The supplied private document is a 12-page manufacturing/inspection requirements file; it lists drawing references but does not contain the actual engineering drawings. It establishes requested controls, not achieved F1 capability. Slots/notches and additional operation categories come from separate manufacturer research, not inferred customer geometry.

## Implementation boundaries

- The four control levels organize a procurement brief; they are not industry precision grades. The 100 mm tolerance examples are invented arithmetic examples.
- The planner accepts bilateral and unilateral dimensional deviations, retains unconfirmed buyer-request status and uses an RFQ fragment. It does not validate geometric tolerances, fit, uncertainty or manufacturability.
- The LCC RFQ also uses a fragment for user-entered commercial assumptions; no inquiry was submitted during acceptance.
- `/api/ai-context` reads the same published catalog as `/api/catalog`. CDN caching can retain an older snapshot for up to 300 seconds; consumers can compare explicit catalog revisions. A best-effort request limit protects uncached reads.
- Static llms text links to the catalog rather than claiming a current catalog snapshot. No special AI protocol or ranking promise is introduced.
- Existing URLs, datasheet indexing pilot, catalog configurations, dependencies and production environment settings are retained.

## Validation

Local lint/build passed (one pre-existing lint warning); 277 tests passed; 180 owner links and sitemap checks passed. Nine changed pages returned HTTP 200 with correct canonical and parseable JSON-LD, and the AI snapshot matched the 114-record catalog. Desktop interaction preserved requested limits and unconfirmed status in the contact draft; no inquiry was submitted. Mobile viewport acceptance is outstanding because automatic approval review rejected a local iframe harness that would remove framing headers; it was not run. See the PR and integrated internal research report for Preview results. Local checks cover catalog overlays/deactivation, unilateral/bilateral limits, RFQ context round trips, equal-EI arithmetic, existing site regression tests, metadata limits, theme tokens, links and sitemap. The design manual remains 46 pages and passed overflow and visual checks.
