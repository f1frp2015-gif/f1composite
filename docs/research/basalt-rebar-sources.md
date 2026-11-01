# Basalt FRP rebar page and manual: sources (November 2026)

Data basis for `/products/basalt-frp-rebar` (`content/data/basaltRebar.ts`), the product manual (`scripts/build-basalt-rebar-manual.py` → `public/downloads/f1composite-basalt-frp-rebar-manual-2026-11.pdf`) and the photo credits.

## Manufacturer

**Owner decision 2026-11-01: the product is offered as made by FengDu New Material** (the GFRP family's manufacturer), and the page, manual and figures say so. The data and product photographs come from Chongqing Hesheng Longgang Technology Co., Ltd. (hslg-tech.com), factory in Guang'an, Sichuan, a basalt-fiber producer (published capacity about 30,000 t/yr) that pultrudes bars from its own fiber; its name, location, capacity and "own fiber" narrative are **not** used on the site. Owner's instruction 2026-10-31: add the supplier's basalt rebar to f1composite.com and rewrite its product manual as an F1 manual.

Supplier pages read 2026-10-31: `/products/basalt-fiber-rebar.html`, `/products/basalt-fiber-rebar-new-material-to-replace-reinforcement.html`, `/download.html` (verification-code gated; no PDF URL exposed, so the manual was written from the product pages, not from a supplier PDF).

## What the data source publishes, and how the page restates it (as "published values", not attributed to a named maker)

| Supplier statement | Page / manual |
| --- | --- |
| BFRP-03/06/08/10/12: tensile 1100 MPa, modulus "55 MPa" (unit typo; GPa), elongation 2.6%, density 1.9–2.1; BFRP-25: 1000 MPa / 52 GPa | Classes: 1,100 MPa (Ø3–Ø12), 1,000 MPa (Ø25), 50 GPa class (52–55 GPa published); sizes Ø14–Ø22 taken at 1,000 MPa pending the size report |
| Comparison table: basalt ≥900 MPa, ≥40 GPa (one page) / ≥1100, ≥50 (other page) vs steel | The higher, product-specific table is used; the generic table is not |
| Yield strength ≥250 MPa for basalt vs ≥300 steel | Not used (FRP has no yield; the row is meaningless) |
| "4× / 3× lighter", "370% / 270% lighter" | Not used; density 1.9–2.1 vs 7.85 stated instead |
| 900-day alkali / seawater immersion, 75–80% retention | Quoted as the manufacturer's durability statement with "ask for the method and report" |
| Weight g/m: Ø6 54, Ø8 95, Ø10 149–150, Ø16 382, Ø20 597–600, Ø22 720 | Reproduced by nominal area × 1.9 g/cm³ (Ø6 53.7, Ø8 95.5, Ø10 149, Ø16 382, Ø20 597, Ø22 722); the page calculates at 1.9 |
| Tensile resistance kN: Ø8 55, Ø10 86, Ø16 221, Ø20 345, Ø22 345 | Area × 1,100 MPa reproduces Ø8–Ø20 (55, 86, 221, 345); Ø22 at 345 is a copy error (380 mm² × 1,100 = 418). The page shows nominal kN = area × class and labels it "not a guaranteed force" |
| Steel→BFRP substitution table (10→6–8, 12→8, 14–16→10, 18→12, 20–22→14, 24→16, 26→18, 28–30→20) | Reproduced as the manufacturer's strength-equivalent guide with the serviceability caveat |
| Cost tables at 5,250 or 3,175 USD/t basalt vs 703 or 794 USD/t steel; 20–35% or 2.7–3.8% "saving" | Not used (unit prices and contradictory savings claims). Price basis: ranges only (owner rule 2026-10-23) |
| Price range USD 0.6–1.6/m FOB Shanghai | Stated as "public FOB listings observed in October 2026, roughly $0.6 to $1.6 per metre, rising with diameter" |
| Applications: construction, highways, pipe networks, bridges, dams | Eight segments written from the GFRP applications research with basalt-specific notes |
| Surface "shaped and sanded"; photos show helical wrap and sand-coated bars; coil photo | "Helical fiber wrap; sand coating on request; Ø≤10 mm coiled" |
| No standards, lengths, packing, bond or test reports published | Standards section written from the standards research below; lengths and packing from the GFRP export planning values; documents listed as what to ask for |

## Standards

- ASTM D8505/D8505M-23, Standard Specification for Basalt and Glass Fiber Reinforced Polymer (BFRP and GFRP) Bars for Concrete Reinforcement (modulus floor 44.8 GPa, guaranteed force per size, bond, alkali resistance).
- CSA S807:19 (R2024) covers bars of E-CR glass, carbon, aramid or basalt fibers; modulus grades I (≥50 GPa), II, III.
- ISO 10406-1:2015 test methods for FRP bars.
- ACI CODE-440.11-22 scope: GFRP bars to ASTM D7957 only; basalt bars are outside it (design to ACI 440.1R guidance with authority acceptance).
- GB/T 26743-2011 (FRP bars for civil engineering) and JG/T 406-2013 (basalt FRP bars for civil engineering): the manufacturer's home standards.
- EN 1992-1-1:2023 Annex R: embedded FRP reinforcement where the national annex adopts it (same treatment as in the basalt-vs-fiberglass post).

## Photographs

Manufacturer's product photographs (labelled "Supplier photo", as for the GFRP family's FengDu photographs), cropped to remove marketing text and the watermark; stored in `public/images/products/basalt-rebar/`:

| File | Source image (image.chukouplus.com/upload/C_1133/file/…) | Crop |
| --- | --- | --- |
| `bfrp-rebar-cut-pieces.webp` | `20211124/be2676b7b93360881f54afd8198dae9c.jpg` (750 × 400) | 750 × 330 below the "Product detail" caption |
| `bfrp-rebar-helical-surface.webp` | `20211124/b086d12d3bf619d8f6523e69cbd099a1.jpg` (750 × 668) | 688 × 430 between the title and the feature chips |
| `bfrp-rebar-bar-ends.webp` | `20211124/a4fdd2468c1f4b0f29401270b613e3e0.jpg` (800 × 800) | 576 × 360 top-left, clear of the centre watermark |

Photographs with the watermark across the subject (bundles on the rack, coil, bundle stack) were not used. The cover `public/images/covers/basalt-frp-rebar.webp` is the cut-pieces photograph centred by `scripts/make-product-cover.mjs`.

Openly licensed photographs (Wikimedia Commons, read 2026-11-01 through the API; cropped to 8:5 and re-encoded as WebP, nothing else changed), stored in `public/images/products/basalt-rebar/scenes/`:

| Published file | Source | Author | License | Original size |
| --- | --- | --- | --- | --- |
| `basalt-quarry-blocks-loader.webp` | [File:Odzoun-Carrière de basalte (1).jpg](https://commons.wikimedia.org/wiki/File:Odzoun-Carri%C3%A8re_de_basalte_(1).jpg), 2015-09-17 | Ji-Elle | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 4320 × 3240 |
| `crushed-basalt-aggregate.webp` | [File:Basaltsteinbruch Klöch Basaltschotter.jpg](https://commons.wikimedia.org/wiki/File:Basaltsteinbruch_Kl%C3%B6ch_Basaltschotter.jpg), 2023 | Geolina163 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 4864 × 3648 |
| `basalt-quarry-crushing-plant.webp` | [File:Kopalnia bazaltu w Graczach.jpg](https://commons.wikimedia.org/wiki/File:Kopalnia_bazaltu_w_Graczach.jpg), 2019-07-09 | IMnext | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 4032 × 3024 |
| `chopped-basalt-fibers.webp` | [File:Basalt-fiber.jpg](https://commons.wikimedia.org/wiki/File:Basalt-fiber.jpg), 2015 (Gao et al., Advances in Materials Science and Engineering) | Lei Gao, Guohui Hu, Nan Xu, Junyi Fu, Chao Xiang, Chen Yang | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 600 × 463 |
| `glass-and-basalt-fabric-before-fire-test.webp` | [File:Basalt fibre and glass fibre.jpg](https://commons.wikimedia.org/wiki/File:Basalt_fibre_and_glass_fibre.jpg), 2017-12-04 (YouTube, CC BY) | Nils Austa | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) | 1920 × 1080, cropped to 1440 × 900 |

Concrete-element photographs on the page (seawall, bridge deck, slab mat, foundation slab, culvert, TBM, MRI, pool, spalling, deck pour) are the GFRP page's library (`rebarScenePhotos`); sources in `docs/research/gfrp-rebar-page-photo-sources.md`. Captions state that the construction scenes are steel-reinforced and none is an F1 or manufacturer project or quarry.

Candidates reviewed and not used: `File:Basalt fabric.jpg` (474 × 310, too small), `File:Базальтове волокно.jpg` (597 × 449, CC BY-SA, duplicate subject), `File:Manufacturing process of basalt fibres.png` (schematic from a paper; redrawn as Fig. 9 instead), `File:De Afsluitdijk. ID511725.jpg` (concrete pour, no basalt relevance).

## Schematic figures

`scripts/covers/draw-basalt-rebar-figures.mjs` draws the rock-to-bar process, the stress-strain comparison (BFRP 1,100 MPa / 50 GPa published; GFRP 45 about 900 MPa; steel Grade 60) and the 11-size ladder. With a directory argument it also writes PNG copies of the figures and the three product photographs for the manual.
