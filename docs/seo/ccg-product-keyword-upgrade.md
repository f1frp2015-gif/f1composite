# Product keyword and RFQ upgrade

Implemented 2026-09-14 following the user's CCG traffic review and deployment authorization.

## Scope and evidence

The supplied Top pages screenshot shows CCG round-tube, square-tube and flat-sheet pages with estimated traffic of 103, 47 and 242 respectively. Top-keyword US search volumes are 350 for `fiberglass tubing`, 150 for `fiberglass square tube` and 2,000 for `fiberglass sheets`. These are third-party screenshot estimates, not F1 performance, conversions or forecasts. The 988-traffic comparison page has `frp full form` in India as its top keyword; that traffic is not evidence of equivalent procurement demand.

Public references reviewed:

- https://catalog.creativecompositesgroup.com/viewitems/all-categories/fiberglass-round-tubes — specification-led catalog and inquiry route.
- https://www.creativecompositesgroup.com/blog/frp-vs-fiberglass — terminology topic.
- https://www.eplastics.com/fiberglass/sheets — mixed G10/FR4 and pultruded sheet intent.

## Changes

| Existing page | Intent and implementation |
| --- | --- |
| `/products/fiberglass-structural-shapes/frp-tube` | Fiberglass tubing / round tube. Preserve live catalog and fallback data; add approximate inch references and a quotation link per metric section. |
| `/products/fiberglass-structural-shapes/frp-square-tube` | Square and rectangular tubing. Preserve dimensions and weights; selected model and dimensions carry into the RFQ. |
| `/products/fiberglass-sheets` | Solid pultruded sheet cut to size. Collect requested length, width, thickness, units, piece count and surface before the existing contact form. |
| `/what-is-frp` | Explain FRP vs fiberglass at a stable anchor and link to tube and solid-sheet procurement pages; update description and title. |

Existing URLs and canonicals are retained. Search intent ownership and actual modification dates are recorded in the keyword map and sitemap. No duplicate synonym pages or blanket stock, minimum-order, fire-rating, tolerance or lead-time promises are introduced. The supplier's quantities, tooling or specifications are not copied. Existing F1 photographs, design resources and material references remain available.

The new table and procurement guidance render on the server; only sheet input state uses a client component. Per-row contact links disable prefetch. Forms reuse the existing contact endpoint and its receipt-confirmed success tracking; opening the contact form is not counted as a successful inquiry.

## Validation

- `npm run lint`: no errors; existing `SectionViewer3D.tsx` dependency warning remains.
- `npm run build`: passes using the required local compiler process permissions.
- 27 tests: inquiry serialization/conversion, navigation, taxonomy, site audit, contact delivery, IndexNow and sheet/plate separation.
- Browser: round and rectangular tube selections retain exact metric dimensions and product identity on the contact page.
- Browser: sheet required fields prevent empty continuation; `48 × 24 × 0.25 in`, 12 pieces and gritted surface survive navigation; `1000 × 500 × 6 mm`, 10 pieces also survive.
- Desktop and 390 px mobile: table scroll is contained; sheet form has no page overflow. Terminology anchor and product links render. No browser console errors observed in the local QA session.
- Four page responses, canonical URLs, single H1 and JSON-LD syntax checked on the production build.
- No real inquiry was sent during QA. Delivery behavior is covered with mocked mail/database tests, so production mailbox delivery has not been re-tested.

## Measurement after release

Keep GSC reporting by page, country and non-brand query group. Compare rolling 28-day periods, starting with a pre-release baseline when available. Prioritize actual buyer-related clicks and qualified inquiries over total definition traffic.

New RFQ source values are `tube-size-selection`, `tube-product-header`, `sheet-specification` and `sheet-product-header`. They use the existing `rfq_start` / `rfq_submit_success` pathway with `product_path`. Specification context travels with the inquiry; private message contents are not added to analytics events.

No GSC/GA data was accessed and no new analytics property or automatic monitor was configured. Review indexing and relevant impressions at 30 days, clicks at 60 days, and qualified inquiries at 90 days; these are review intervals, not promised ranking dates. Record the production commit and Vercel deployment ID in the deployment handoff.
