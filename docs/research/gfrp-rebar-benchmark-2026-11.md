# GFRP rebar product page: benchmark sources (2026-11-04)

The benchmark section and figures 6, 9 and 10 on `/products/frp-rebar` compare FengDu's two grades with the four producers that recur across ICC-ES, US DOT producer lists, Ontario MTO and Queensland TMR (owner's research note "FRP筋材全球市场定价与成本深度调研" v2, 2026-11-04). Every value on the page was read from the producer's own document or its ICC-ES report on 2026-11-04. Data lives in `rebarCatalog.benchmark` (`content/data/frpRebar.ts`); figures are drawn by `scripts/covers/draw-gfrp-rebar-benchmark-figures.mjs`.

| Bar | Document | Values used |
| --- | --- | --- |
| Mateenbar 60 | Mateenbar "Technical Data, Mateenbar 60 GFRP Rebar", USA, revised 2024-08-08 | 60 GPa (8,700 ksi) modulus; 180 MPa guaranteed transverse shear; epoxy-backboned vinyl ester and E-CR glass; ASTM D8505 and CSA S807 Grade III; No. 2–No. 10 |
| Mateenbar (Greenbar2X, Mateenbar60) | [ICC-ES ESR-5548](https://cdn-v2.icc-es.org/wp-content/uploads/report-directory/ESR-5548.pdf), reissued Aug 2026 | Report holder Mateenbar Composite Reinforcements, Concord, NC; Greenbar2X 46.8 GPa; bent shapes outside scope |
| Pultrall V-ROD 60 | V-ROD 60 product data sheet, revision May 2019 | 1,100 MPa guaranteed tensile No. 2–No. 8, 1,000 MPa No. 9–No. 10; 60 GPa minimum modulus; 180 MPa guaranteed transverse shear; vinyl ester; CSA S807 Grade III, MTO Grade III, ASTM D7957 |
| Pultrall | [TxDOT GFRP producer list](https://www.txdot.gov/content/dam/docs/division/mtd/mpl/gfrpman.pdf), 2025-12-19 | Listed for the 60 GPa product; Edon, Ohio plant per CompositesWorld 2026-05 |
| MST-BAR | [MST-BAR high-modulus sheet](https://ernestmaier.com/wp-content/uploads/2024/11/MSTBar_HiModSheet_25.pdf) (distributor copy) | 60 GPa (8,702 ksi); 145 ksi (1,000 MPa) guaranteed tensile; 3,000 psi (21 MPa) guaranteed bond; 31.9 ksi (220 MPa) transverse shear |
| MST-BAR 4EQ | [ICC-ES ESR-4664](https://icc-es.org/wp-content/uploads/report-directory/ESR-4664.pdf), reissued Apr 2026, revised Jun 2026 | Holder MST Rebar USA, Bladenboro, NC; No. 3 only; 9,427 ksi (65.0 GPa) mean modulus; 1.91% mean strain; bent shapes outside scope |
| Dextra Astec Plus | [ICC-ES ESR-5751](https://icc-es.org/wp-content/uploads/report-directory/ESR-5751.pdf), issued Mar 2026, revised 2026-05-14 | Holder Dextra Building Products (Guangdong), Xintang, Zengcheng; M13 9,831 ksi (67.8 GPa), M25 9,394 ksi (64.8 GPa) mean modulus; 2.19–2.23% strain; 2.12–3.17 ksi (14.6–21.9 MPa) guaranteed bond; bent shapes outside scope |
| Dextra Astec | Dextra "PDS-021 Astec GFRP Rebar", Rev. 00, Nov 2024 | Grades 45P and 50P; E-CR glass and vinyl ester; Ø6–41 mm |

Conversions: 1 ksi = 6.895 MPa. Listing claims for MST (MTO DSM, Queensland TMR) and V-ROD (MTO DSM) are from the owner's research note, which cites the MTO 2022 guideline and the TMR register of 2026-10-28.

Rules applied: the F1 row states grade classes and what is not held, never a measured value; ESR values are labelled as means, data-sheet values as guaranteed or minimum; product names are identified as trademarks of their owners. Re-check every document before changing a value.

Hero photograph: `f1-frp-rebar-sand-coated-helical.webp` (1254 × 1254), a supplier photograph already published in the rebar blog articles since PR #64; it replaces the 450 px straight-bar photo as Figure 1.
