# Procurement interaction events

Implemented on `codex/seo-geo-round-three`, 2026-10-11. This document records local implementation, not a production deployment or a GA4 configuration change.

## Purpose and event definitions

These events measure deliberate actions before a buyer reaches the contact form. They are not leads, accepted RFQs, viewed comparison tables, engineering approvals or confirmed orders. The existing `rfq_start`, `inquiry_submit_success`, `rfq_submit_success` and receipt-based conversion deduplication are unchanged.

| Event | Trigger | Allowed event-specific fields | Counting rule |
|---|---|---|---|
| `profile_shortlist_add` | A valid finder row is added to the shortlist | `category`, `selection_count` | Count after addition, 1–4; a full shortlist rejects another addition without emitting |
| `profile_shortlist_remove` | A selected row is removed by checkbox, comparison table or shortlist chip | `category`, `selection_count` | Count after removal, 0–3 |
| `profile_compare_open` | Buyer activates the shortlist's Compare link | `selection_count`, `category_count` | At least 2 valid selections; automatic table rendering and bookmarked state do not count as a view |
| `profile_rfq_handoff` | Buyer activates Quote this size / Quote selected | `selection_count`, `category_count` | 1–4 valid selections; activation does not prove the contact page loaded or a request was submitted |
| `machining_rfq_handoff` | Buyer activates Include this requirement in an RFQ while limits are valid | `feature` | One event per link activation; no event while typing or for invalid limits |
| `lcc_quote_click` | Buyer activates Get an FRP quote to compare for a valid result | `steel_type` | Preserves the previous event name; the old `saving` amount is removed and no second handoff event is emitted |
| `lcc_scenario` | Buyer activates an existing scenario preset | `corrosivity` | Existing event name retained; fixed preset only |
| `lcc_share` | Existing share action finishes its copy attempt/address-bar fallback | `steel_type`, optional `corrosivity` | Existing event name retained; not proof of a successful clipboard copy; omit corrosion class for `other` steel |

All events receive a fixed `source`, parameter-free `page_location`, fixed `page_title`, and empty `page_referrer`. Source is one of `profile-finder`, `machining-tolerance-planner`, or `life-cycle-cost-calculator`; it is not taken from a URL parameter or user text. Fixed page locations are the respective canonical tool/guide pages.

## Privacy boundary and allowed values

`lib/analytics.ts` constructs each payload from scratch. It does not spread arbitrary caller fields. Runtime checks supplement TypeScript: unknown actions, enum values and impossible/noninteger counts are rejected.

- Categories: `i_beam`, `channel`, `angle`, `shs`, `rhs`, `tube`, `rod`, `flat`.
- Machining feature tokens: `cut_length`, `hole_diameter`, `datum_distance`, `slot_width`, `notch_depth`; UI labels map to these fixed tokens.
- Steel type: `galvanized` or `other`; corrosion class, when applicable: `C1`, `C2`, `C3`, `C4`, `C5`, `CX`.
- Selection counts are bounded by the current four-size shortlist limit; category count is at least one and no larger than selection count.

No profile model or individual section ID, dimension, tolerances, material quotation, cost/saving, drawing, datum text, application text, customer data, RFQ context, URL query or fragment is sent by these event calls. In particular, overriding GA's page context prevents an event from inheriting the private fragment created by the LCC share link. The actual RFQ continues to carry its complete requirement/assumptions in the existing fragment; analytics does not alter or copy it.

This boundary applies to the explicit events documented here. It is not a claim that every third-party automatic measurement feature or every existing site event has been audited.

## Consent and delivery

The helper reuses the same visit preference, stored preference and region-default rule as existing acquisition tracking. An explicit analytics refusal suppresses these events regardless of ads consent. Without a choice, consent/unknown time zones are suppressed; other time zones retain the site's existing regional default. Blocked storage can still use the in-memory visit choice. Events also pass through the existing `gtag` function and Consent Mode settings; this change never sets consent, loads a tag, sends a separate network request, queues its own retry, or creates tracking storage.

Missing or throwing tags do not block selection or navigation. Preferences changing from denied to allowed do not replay earlier interactions. Repeated deliberate clicks count as repeated actions; there is no user/session identifier or new cross-page deduplication store.

## Measurement use

Compare shortlist additions/removals with deliberate Compare/RFQ activations, then with the existing contact-start and accepted-submit events. Interpret these as aggregate action counts, not unique buyers or an exact person-level funnel. Bookmarked shortlists may enter at comparison/handoff without a preceding add event. Ad blockers and consent create expected gaps.

GA4 reporting setup can use event-scoped dimensions for `source`, `category`, `feature`, `steel_type`, `corrosivity` and event-scoped metrics for `selection_count`/`category_count`, subject to the property's available custom-definition quota. No GA4 property changes or key-event promotion were made. These interactions should not replace the accepted-RFQ conversion. Historical `lcc_quote_click` reports must account for the removal of `saving` and the stricter consent guard from this release onward.

## Validation

`scripts/procurement-analytics.test.mjs` executes the runtime sanitizer and compiled component event handlers with deterministic React hook state. It verifies:

- unknown fields and private URL/drawing/price data are excluded; malformed enums/counts are rejected;
- explicit denial, regional/unknown defaults and unavailable tags are handled;
- actual shortlist transitions, the four-item guard, Compare and RFQ activation work without render/filter events;
- machining edits and invalid values remain silent; a valid handoff emits only the feature;
- LCC retains private assumptions in the RFQ but emits one compatible event with no saving/cost data.

Scoped tests, TypeScript and lint passed locally. The related consent and LCC RFQ tests passed as well. This unit-level handler check does not replace browser/GA DebugView acceptance. A browser acceptance run should stub `gtag` locally, exercise mouse/keyboard activation and consent changes, inspect only the whitelisted fields, and stop before submitting a real inquiry. Test registration in `package.json` and full repository acceptance are handled by the parent task.
