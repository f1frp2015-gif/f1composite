# SEO / GEO phase two: profile buying intent and evidence scope

Prepared for PR and Preview review on 2026-10-11. This document does not record a production release.

## Problem and resulting behavior

Standard profile pages mixed ordinary section supply with specialist rebar, rock-bolt and electrical applications. Some application and shared supply copy also promised reports, grades or delivery times without tying them to the offered configuration. Buyers could select a geometry without identifying the scope of the part or system they needed.

The update keeps existing URLs and the phase-one catalog, evidence and inquiry flow. It makes member selection, fabrication inputs and delivery boundaries clearer:

- Round tubing explains outside/inside diameter, wall, fit and end processing. Square and rectangular tubing distinguishes orientation, connections and cooling-tower use. Both pass a tailored checklist into the inquiry draft.
- The structural-shapes hub connects member tasks to profile families and separates standard lengths, processed parts and new cross-sections.
- Rods, flat bars, angles, channels and I-beams distinguish ordinary stock geometry from separately qualified applications. Shared laminate and supply guidance identifies reference data, applicable evidence and quotation requirements.
- Cooling-tower, chemical-platform, cable-route and handrail pages distinguish components from coordinated systems. The UAE cable page replaces unsupported order, timing and performance claims with project-specific requirements.
- Standard-profile application cards use an explicit editorial selection, retaining the application source text and image label. A specialist application's mention of a rod no longer qualifies the ordinary rod family for that use.
- The query ownership registry records the missing standard families and selected applications, preserving distinct product and application purposes. Window overview metadata is aligned with the existing buying routes.

## Search and evidence boundaries

This implements the approved preliminary direction. Chrome's FRP bookmarks have not been read, and current country-specific keyword volumes have not been obtained. No new search-volume, ranking, AI-citation, stock, certification or project-delivery claims are introduced. Historical third-party volume estimates remain research evidence only.

No synonym, size or country pages are created; no redirects, indexing controls or production settings are changed. Existing specialist electrical and window buying guides remain the destination for their respective qualification and procurement tasks.

## Acceptance

Run the repository CI checks: lint, tests, copy, sitemap, build and rendered owner links. The added taxonomy checks cover cooling-tower visibility, exclusion of specialist rod recommendations and preservation of the source content behind application cards.

Browser acceptance covers the structural selection table, mobile horizontal overflow and navigation, round/square inquiry draft contents, links to specialist qualification, and application scope. The phase-one round-tube catalog and configuration-to-inquiry context must remain available. Do not submit live test inquiries or use production database/email credentials for local tests.

Local acceptance: 271 tests passed; the search-index and evidence/date suites also passed after the final metadata corrections. Lint has no errors and one existing `SectionViewer3D` hook-dependency warning. Copy checking has no errors and 14 existing style warnings. Sitemap coverage, the production build and all 173 rendered supporting-page links passed. The initial sandbox build could not bind a compiler-worker port; the build passed outside that restriction with database and email credentials explicitly disabled.

Browser checks at a 1280 px viewport confirmed the round-tube table still has 17 rows, the square-tube application cards include cooling towers, the connections anchor works, and the hub/round/square inquiry drafts preserve their respective input checklists. Only name and email remain required. Cooling-tower and UAE supply-scope content was inspected. No inquiry was submitted. Responsive table/container styles were reviewed; an attempted 390 px iframe check was blocked by the site's existing frame policy, so it is not recorded as a passed mobile-device test.

The optional `test:access-systems` suite has three existing source-literal assertions that also fail against the unchanged base; the normal repository CI suite passes. This change does not alter those unrelated ladder/navigation assertions.

A production release requires the repository's Git-to-production workflow and a recorded merged SHA and Vercel deployment ID.
