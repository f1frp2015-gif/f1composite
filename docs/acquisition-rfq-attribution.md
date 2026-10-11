# Inquiry acquisition and sales qualification

`source` remains the on-site entry (`contact`, `calculator`, `datasheet-builder`, `ai-chat`, etc.). It never identifies an external traffic channel. The separate optional `acquisition` object is attached to the same inquiry ID, included with that reference in sales email for contact submissions, and exported by the existing authenticated `/api/inquiries` endpoint.

## Capture and privacy

- `version: 1`; `consent: explicit | regional_default`; `firstTouch` and `sessionTouch` each contain `capturedAt`, `landingPath`, `referrerOrigin`, and `utm`.
- First touch means the first **permitted, observed** landing within a 90-day window. A session is per tab and expires after 30 minutes of inactivity. No persistent visitor ID is generated.
- Analytics rejection prevents capture and removes both attribution stores. Existing consent defaults are preserved: a saved choice takes priority; when absent, the existing browser-timezone policy requires consent for Europe/EEA territories and unknown zones. This timezone approximation is not an independently verified location. A page-local choice remains effective when browser storage is blocked.
- Only the path is retained from a landing URL, and only an external origin from a referrer. Canonical www/apex self-referrals are discarded at both client and API boundaries; the browser also excludes its current origin (including Preview/local hosts). Query strings and fragments are discarded except short campaign identifiers in the six UTM fields. Email, phone-like identifiers, URLs, free text and unknown fields are rejected. Campaign tags must never contain customer identifiers. Operational `referer` storage follows the same canonical self-referral exclusion on new inserts.
- No observed referrer or campaign is **unknown/unavailable**, not “direct”, “AI”, “organic” or any inferred attribution. `utm_source=chatgpt.com` is a client-supplied campaign label; a referrer of `https://chatgpt.com` is an observed browser referrer. Neither proves an AI citation or recommendation.
- Internal navigation after capture preserves the landing touch. A server redirect before JavaScript runs can only be recorded at the final landing; dropped UTMs cannot be recovered or invented. Preserve query parameters in redirects and test the public redirect separately.
- Contact forms, calculator/guide lead forms, datasheet downloads, assistant chat and sourcing requests share the capture helper. Old clients without acquisition remain accepted and stored as null. Optional malformed metadata is ignored; oversized multipart fields remain subject to normal request limits.

## Sales review on the existing record

Existing `outcome` (`won`, `lost`, `pending`) remains independent. `qualification_status` is nullable for legacy/unreviewed records, or `unreviewed`, `qualified`, `quotable`, `not-fit`.

- `qualified`: a human confirms a real project and reasonable product fit.
- `quotable`: a human confirms the required product/drawing revision, dimensions and tolerance basis, resin/performance requirements, quantity/cut lengths, delivery destination and scope, and records any remaining conditions in `qualificationNote`. A note is required by the API; the API cannot verify whether the statement is true. Calculation results, message length and UTM values never automatically qualify an inquiry.
- `not-fit`: sales determines the request is outside the offered scope; record the reason when available.

Use the same bearer-token API as Cockpit:

```http
PATCH /api/inquiries
Authorization: Bearer <INQUIRY_API_TOKEN>
Content-Type: application/json

{"id":1000001,"qualificationStatus":"quotable","qualificationNote":"Drawing R2, VE system, 200 pieces at 6 m and Hamburg destination confirmed; freight quote pending."}
```

Update qualification and outcome in separate PATCH requests. The old outcome payload is unchanged. GET exports acquisition and qualification with the original inquiry ID. `?metrics=1` adds qualification counts and `by_acquisition` grouped by observed session UTM source and referrer origin; null/null is unknown. Qualified counts include quotable records. These aggregates are all-time like existing `by_source`; the `weeks` parameter applies only to the existing weekly series. Attribution is descriptive, not causal.

There is no admin UI in this repository. The external Cockpit must add display/edit controls for these fields. Its `since` cursor returns new IDs only; it does not resynchronize changes to already-imported rows. A caller that updates qualification should update its local copy from the successful PATCH and may refetch the relevant batch with an earlier `since` cursor. No new CRM has been introduced.

## Delivery and release checks

`lib/db.ts` contains additive `ADD COLUMN IF NOT EXISTS` statements. They execute lazily on the first DB-backed request after deployment. Do not send test inquiries to a Preview configured with the production database or live notification credentials. Use an isolated Preview database and notification sink, or the offline mocks in `scripts/acquisition.test.mjs`, `scripts/inquiry-qualification.test.mjs` and `scripts/contact-delivery.test.mjs`.

RFQ snapshot context travels in the URL fragment via `buildRfqHref`; it is not part of the HTTP URL/referrer. Builder and parser share limits of 19,000 UTF-8 bytes for context, 10,000 UTF-8 bytes for message, and 90,000 characters for the encoded fragment excluding `#`. Oversized or invalid shared details show an explicit form warning. After loading a payload, ordinary anchors such as Skip to main preserve the payload, typed draft and attachment; only a new valid payload or relevant prefill query resets the form. The contact API independently validates calculator snapshot versions, inputs, basis and recomputed results. This consistency check is not engineering certification. The existing accepted-receipt success events and receipt-ID deduplication are unchanged.
