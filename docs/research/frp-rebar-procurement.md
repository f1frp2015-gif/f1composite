# FRP rebar procurement release — 2026-09-21

Owner approved publication and deployment after reviewing the September 20 research plan. FRP Rebar is the fifth commercial family; the existing canonical `/products/frp-rebar` remains the supply page. `/technology/fiberglass-rebar-vs-steel` remains the material comparison. No new brand name, country clones or duplicate comparison page.

## Manufacturing-source data

Source: Henan Zhongsheng Composite Material Co., Ltd., frpzs.com. Public catalog statements are supplier assertions, not third-party qualification. F1 coordinates selection, quotation and export delivery; this page does not present the source factory as F1-owned.

- [Straight bars, style 01](https://www.frpzs.com/FRP-Profiles/Fiberglass-Rebar/FRP-Rebar-Fiberglass-rebar-style-01.html): nominal diameter inquiry list 6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 30, 32, 34, 36 mm.
- [Rectangular stirrups](https://www.frpzs.com/FRP-Profiles/Fiberglass-Rebar/Gfrp-Rectangular-Shape-Stirrup.html): factory-formed geometry, dimensions and bent-section performance to confirm against drawings.
- [Mesh](https://www.frpzs.com/FRP-Profiles/Fiberglass-Rebar/Gfrp-Rebar-Mesh.html): glass fiber / epoxy and custom spacing/dimensions; no unverified mesh SKU table or intersection values.
- [Generic rebar page](https://www.frpzs.com/FRP-Profiles/Fiberglass-Rebar/Fiberglass-rebar.html) has different property values and obsolete field-bending advice. [Manufacturing guide](https://www.frpzs.com/News/Fiberglass-Rebar-Manufacturing-A-Complete-Guide.html) explains that cured bars cannot be field-bent.

Withheld: strength, modulus, tensile load, unit mass, stock, MOQ, lead time, approvals and guaranteed service life. The style 01 data are internally inconsistent: its Ø12 area × strength gives about 89.6 kN rather than the listed 99 kN; Ø6 area × density gives about 61.6 g/m rather than 51 g/m. Do not publish these as design or purchasing guarantees. Require a grade/size-specific datasheet and test scope first. BFRP remains a technical inquiry, without borrowing GFRP values. No CFRP supply claim.

## Representative global benchmark and resulting decisions

These are representative manufacturers/brand systems, not a verified sales ranking. Related brands are not counted as independent manufacturing groups.

| Reference | Procurement lesson applied |
|---|---|
| [Owens Corning / Pultron 2022 announcement](https://newsroom.owenscorning.com/all-news-releases/news-details/2022/Owens-Corning-and-Pultron-Composites-Form-Joint-Venture-to-Produce-Fiberglass-Rebar/) | Separate simple concrete applications from engineered structural requirements. Historical brand context, not a claim about current ownership. |
| [Mateenbar technical data](https://mateenbar.com/en-us/tech-data-and-approvals/) | Separate straight bars, bends, technical submittals and distributor inquiries. |
| [Dextra tunneling](https://www.dextragroup.com/applications/tunneling-and-mining/) | Explain the function and design inputs for TBM soft-eyes; require project review. |
| [Schöck Combar](https://www.schoeck.com/en/combar) | Make document scope, code editions and engineering consultation visible. |
| [Pultrall V-ROD](https://fiberglassrebar.com/product/structural/) | Do not mix structural/nonstructural scope or straight/bent properties. |
| [Sireg GLASSPREE](https://sireggeotech.it/prodotti/barre-in-vetroresina-glasspree/) | Put real product forms, application context and document requests beside the RFQ. |

No competitor performance, certification, case photograph or approval is attributed to F1 or Zhongsheng.

## Codes and construction boundaries

- [ASTM D7957/D7957M-26](https://store.astm.org/d7957_d7957m-26.html): current specification, September 2026. Pre-manufactured mesh is outside its scope.
- [ACI CODE-440.11-22](https://www.concrete.org/store/productdetail?ItemID=44011U22&Language=English&Units=US_Units): design code references D7957-22. Latest ASTM publication does not silently update an older code or test report.
- [ISO 10406-1:2025](https://www.iso.org/standard/84321.html): bar/grid test methods, not proof of supplied-product conformity.
- [ACI SPEC-440.5-22 preview](https://www.concrete.org/Portals/0/Files/PDF/Previews/440.5-22_preview.pdf): construction scope; approved project drawings and product instructions control installation.

No one-for-one steel substitution, field bending, heating or welding of cured GFRP. Modulus/serviceability, bond, durability, bends and intersections require their own review. Fire, seismic and specialized exposure are project-specific.

## Image provenance

The owner requested use of this supplier's images. Retrieved September 21, 2026; visually checked against the approved subjects. Direct supplier downloads were unavailable from this workstation, so the same public URLs were retrieved using wsrv.nl, then locally encoded to WebP. No generative edits, watermark removal, competitor imagery or inferred certification. Images are product illustrations, not F1 project proof. Production serves only the committed local files; no external image dependency remains.

| Local asset under `public/images/products/frp-rebar/` | Supplier URL | Dimensions |
|---|---|---|
| `gfrp-straight-bars.webp` | https://www.frpzs.com/d/file/p/2023-07-04/5d2665a0dfb7d604e884add443036799.jpg | 450 × 450 |
| `gfrp-rectangular-stirrups.webp` | https://www.frpzs.com/d/file/p/2023-07-04/e1c0ee9160cc51b1cfb41bb032bc58c4.jpg | 450 × 450 |
| `gfrp-reinforcement-mesh.webp` | https://www.frpzs.com/d/file/p/2025-08-21/561be88a4ab71c468b6ac959e74a038d.jpg | 500 × 500 |
| `gfrp-helical-surface.webp` | https://www.frpzs.com/d/file/p/2023-08-23/b4fb41225c3baab7a91165d6509ddb04.jpg | 450 × 450 |

## Procurement and delivery behavior

Three entrances: send a BOQ/drawing, prepare an optional schedule, or ask for technical/sample review. Distributor intent is a fourth contact stage. Unknown dimensions remain acceptable; only name and email are required to contact sales.

The optional builder supports 20 mixed line items. Each retains its form, bar mark, designation, units, quantities and geometry details. Straight lengths are omitted for bends/mesh. Pieces/sheets must be whole positive counts. A blank CSV is public. The contact page uses the existing single-file/ZIP upload and 4 MB limit.

Drafts stay in same-tab session storage under a versioned key; URLs carry intent, not the schedule. Missing/corrupt drafts show an editable fallback. Server validation normalizes the payload before database persistence and escaped email delivery. Existing partial-delivery/error receipts remain authoritative; tests mock the delivery channels and do not send sales emails.

## Release checks

Required: lint, production build, sitemap check; rebar validation/delivery tests; navigation/taxonomy, general product, grating and window inquiry regressions; desktop/mobile browser inspection; ready Git-linked Vercel Preview before merge; canonical production verification after merge. Retain the existing unrelated section-viewer hook warning separately from this release.
