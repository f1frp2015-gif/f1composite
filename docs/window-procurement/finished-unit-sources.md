# Finished window and door source register

Revision: 2026-11-04. This register covers the 11 finished-unit families at `/products/fiberglass-windows-doors`. The separate nine-series profile range remains documented in `product-sources.md` and `content/data/windowSystems.json`.

## Source and publication

- Original supplied PDF SHA-256: `b869f01f55e146a5e32d680553f6239f0e819be427da16880dac985c837ffa55`.
- Published F1 English catalog: `public/downloads/f1composite-finished-windows-doors-catalog-2026-11.pdf`, edition 2026.11, 16 pages.
- Published PDF SHA-256: `279ced0ce8ec5bbb1b2b8c2e308ea500146fa1e55ae2b6ddd9d589854cad7add`.
- Website product data: `content/data/finishedWindowSystems.ts`. Product pages 4–14 of the published catalog correspond to pages 10–20 of the supplied PDF, in the order below.
- Product images: `public/images/products/finished-windows/`. Images retain the supplied product illustrations; crops exclude supplier identification and exported assets have metadata removed. They illustrate configurations, not delivered projects or test specimens.

| Website ID | Product | F1 page | Supplied page |
|---|---|---:|---:|
| `pu-65` | 65 Casement Window | 4 | 10 |
| `pu-72` | 72 Casement Window | 5 | 11 |
| `pu-83` | 83 Flush Window | 6 | 12 |
| `pu-85` | 85 Casement Window | 7 | 13 |
| `pu-95` | 95 Casement Window | 8 | 14 |
| `pu-103` | 103 Tilt-and-Turn Window | 9 | 15 |
| `pu-103-microvent` | 103 Micro-Vent Window | 10 | 16 |
| `pu-114` | 114 Curtain-Wall Window | 11 | 17 |
| `pu-entry` | Insulated Entrance Door | 12 | 18 |
| `pu-132` | 132 Lift-and-Slide Door | 13 | 19 |
| `pu-145` | 145 Side-Pressure Door | 14 | 20 |

All 16 published pages were audited. The range comprises eight window systems and three door systems. Series numbers are product identifiers, not verified frame depths. The finished `pu-65` model and legacy profile `65` are distinct; neither shared numbering nor similar operation establishes interchangeable components.

## Technical scope

Glazing build-ups, A/Ar notation and whole-window or whole-door U-values are retained as supplied. A pair such as `0.8 / 0.7` has undefined individual conditions: do not turn it into a range or assign either number to a gas fill. The entrance door lists a single assembly value without a glazing build-up.

Wind, water and air entries retain the source classes without a stated test standard or international conversion. Acoustic entries retain `>40 dB` or `>42 dB` without an Rw, STC or OITC designation. Catalog values do not establish certification or guaranteed acceptance criteria. Confirm dimensions, glass, hardware, seals and configuration-specific test or calculation evidence before project approval. Earlier profile certificates and historical window or door reports do not automatically cover these finished-unit families.

## Updating this range

1. Verify the revised source and record its hash. Audit product values, page mapping, wording and illustrations against that source; preserve any unresolved technical conditions.
2. Update `content/data/finishedWindowSystems.ts` and the published PDF together. Keep finished IDs distinct from profile IDs; synchronize any ID or label changes with `lib/windowInquiry.ts`. Preserve existing inbound RFQ references when changing the range.
3. Review image crops for identification and geometry, remove exported metadata, and inspect every revised PDF page. Update catalog size and edition in `content/data/downloads.ts`, plus the publication hash and mapping here. `lib/documents.ts` pins the catalog so database-loaded download rows cannot remove or duplicate it.
4. Run `node --test scripts/finished-window-catalog.test.mjs scripts/finished-window-inquiry.test.mjs scripts/window-inquiry.test.mjs scripts/contact-delivery.test.mjs`, then `npm run lint` and `npm run build`. Check finished product selection, comparison, readable RFQ handoff, PDF links and the unchanged profile route in the preview. Follow the repository Git-to-production workflow for publication.
