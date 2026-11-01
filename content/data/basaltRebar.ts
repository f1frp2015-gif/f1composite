/**
 * Basalt FRP (BFRP) rebar supply page data. Catalog availability is not stock, a design value or a
 * certification. Manufacturer: FengDu New Material (owner decision 2026-11-01: the product is offered
 * as FengDu-made, like the GFRP family); F1 Composite is its export company. The data source (a
 * basalt-fiber producer's published product page) is on file in docs/research/basalt-rebar-sources.md
 * and is not named. Published values are typical values re-stated as classes; the qualification
 * report for the offered size governs.
 */
import type { ScenePhoto } from "@/content/data/frpRebar";

/**
 * Openly licensed photographs specific to basalt (Wikimedia Commons, verified 2026-11-01; details
 * in docs/research/basalt-rebar-sources.md). The concrete scenes on the page reuse the GFRP rebar
 * photo library (rebarScenePhotos). Files are cropped to 8:5 and re-encoded; nothing else is changed.
 */
export const basaltScenePhotos = {
  quarryBlocks: { src: "/images/products/basalt-rebar/scenes/basalt-quarry-blocks-loader.webp", alt: "Pile of freshly quarried grey basalt blocks with a bulldozer behind them in a hillside quarry", shows: "A basalt quarry in the Odzun region of Armenia. Basalt fiber starts as this rock: crushed, washed and melted with no other ingredient.", credit: { title: "Odzoun-Carrière de basalte (1)", author: "Ji-Elle", sourceHref: "https://commons.wikimedia.org/wiki/File:Odzoun-Carri%C3%A8re_de_basalte_(1).jpg", license: "CC BY-SA 4.0", licenseHref: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  crushedBasalt: { src: "/images/products/basalt-rebar/scenes/crushed-basalt-aggregate.webp", alt: "Close-up of crushed grey basalt aggregate in a quarry stockpile", shows: "Crushed basalt at the Klöch quarry, Austria. The same rock is sold as road stone; for fiber it is graded, melted at about 1,450 °C and drawn into filaments.", credit: { title: "Basaltsteinbruch Klöch Basaltschotter", author: "Geolina163", sourceHref: "https://commons.wikimedia.org/wiki/File:Basaltsteinbruch_Kl%C3%B6ch_Basaltschotter.jpg", license: "CC BY-SA 4.0", licenseHref: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  crushingPlant: { src: "/images/products/basalt-rebar/scenes/basalt-quarry-crushing-plant.webp", alt: "Crushing and screening plant of a basalt quarry under a cloudy sky", shows: "The crushing plant of a basalt quarry at Gracze, Poland. Not the bar maker's site; it shows the scale of the industry the fiber is drawn from.", credit: { title: "Kopalnia bazaltu w Graczach", author: "IMnext", sourceHref: "https://commons.wikimedia.org/wiki/File:Kopalnia_bazaltu_w_Graczach.jpg", license: "CC BY-SA 4.0", licenseHref: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  basaltFiber: { src: "/images/products/basalt-rebar/scenes/chopped-basalt-fibers.webp", alt: "Heap of golden-brown chopped basalt fibers on a white background", shows: "Chopped basalt fiber from a materials study. The bar uses the same filament as continuous roving; the bronze colour is the rock's iron, not a coating.", credit: { title: "Basalt-fiber", author: "Lei Gao, Guohui Hu, Nan Xu, Junyi Fu, Chao Xiang and Chen Yang", sourceHref: "https://commons.wikimedia.org/wiki/File:Basalt-fiber.jpg", license: "CC BY 4.0", licenseHref: "https://creativecommons.org/licenses/by/4.0/" } },
  fabricFireTest: { src: "/images/products/basalt-rebar/scenes/glass-and-basalt-fabric-before-fire-test.webp", alt: "Two woven fabric samples labelled glass and basalt taped to a board before a fire test", shows: "Glass and basalt fabric samples before a flame test. The fiber tolerates far more heat than the resin around it; the bar's temperature limit is set by the resin.", credit: { title: "Basalt fibre and glass fibre", author: "Nils Austa", sourceHref: "https://commons.wikimedia.org/wiki/File:Basalt_fibre_and_glass_fibre.jpg", license: "CC BY 3.0", licenseHref: "https://creativecommons.org/licenses/by/3.0/" } },
} as const satisfies Record<string, ScenePhoto>;

export type BasaltSceneId = keyof typeof basaltScenePhotos;

/** Nominal area (mm²) of a round bar. */
export const barAreaMm2 = (diameterMm: number) => (Math.PI * diameterMm * diameterMm) / 4;

/** Density the published unit masses reconcile to (Ø6 54 g/m, Ø16 382 g/m, Ø20 597 g/m). */
export const BFRP_MASS_DENSITY_GCM3 = 1.9;

export const basaltCatalog = {
  path: "/products/basalt-frp-rebar",
  revision: "2026-11-01",
  title: "Basalt FRP Rebar (BFRP) Supplier | Bars Ø3–Ø25 mm & Manual",
  description: "Basalt FRP (BFRP) rebar Ø3–25 mm: 1,100 MPa and 50 GPa classes, 1.9 g/cm³. Published values, sizes, standards, export packing and a downloadable product manual.",
  scope: "Basalt fiber reinforced polymer (BFRP) straight bars made by FengDu New Material and supplied by F1 Composite against a project schedule. Values on this page are published typical values re-stated as classes; the qualification report for each offered size governs.",
  images: {
    cutPieces: "/images/products/basalt-rebar/bfrp-rebar-cut-pieces.webp",
    surface: "/images/products/basalt-rebar/bfrp-rebar-helical-surface.webp",
    barEnds: "/images/products/basalt-rebar/bfrp-rebar-bar-ends.webp",
    // Schematic figures drawn by scripts/covers/draw-basalt-rebar-figures.mjs (not to scale).
    rockToBar: "/images/products/basalt-rebar/basalt-rebar-rock-to-bar.webp",
    stressStrain: "/images/products/basalt-rebar/basalt-rebar-stress-strain.webp",
    sizeLadder: "/images/products/basalt-rebar/basalt-rebar-size-ladder.webp",
  },
  /** Inquiry diameters: BFRP-03 to BFRP-12 and BFRP-25 by code, with Ø6–Ø22 in the weight and substitution tables. */
  diameters: [3, 6, 8, 10, 12, 14, 16, 18, 20, 22, 25],
  /** Published tensile strength class by size: 1,100 MPa up to Ø12; 1,000 MPa for Ø25; sizes between are taken at the lower class until the size report says otherwise. */
  strengthClassMPa: (diameterMm: number) => (diameterMm <= 12 ? 1100 : 1000),
  /**
   * Published typical values, as classes. Not guaranteed values: ASTM D8505 and
   * CSA S807 guarantee per size from the qualification report.
   */
  published: [
    { property: "Tensile strength", value: "1,100 MPa (Ø3–Ø12) · 1,000 MPa (Ø25)", basis: "Published typical values; guaranteed force per size by report" },
    { property: "Tensile modulus", value: "50 GPa class (52–55 GPa published)", basis: "Above the 44.8 GPa ASTM D8505 floor and the CSA S807 Grade I threshold of 50 GPa" },
    { property: "Elongation at rupture", value: "about 2.6% (Ø3–Ø12)", basis: "Linear to rupture; no yield" },
    { property: "Density", value: "1.9–2.1 g/cm³", basis: "Published unit masses reconcile to 1.9 g/cm³" },
    { property: "Alkali and seawater exposure", value: "75–80% strength retained after 900 days immersion", basis: "Published durability statement; ask for the test method and report" },
    { property: "Surface", value: "Helical fiber wrap; sand-coated finish on request", basis: "Bond is tested per size to the governing standard" },
    { property: "Forms", value: "Straight bars to cut length; Ø≤10 mm also coiled", basis: "Factory bends and mesh are raised as a separate inquiry" },
  ],
  /**
   * BFRP against the site's GFRP classes and Grade 60 steel, property by property. BFRP values are
   * the published classes; GFRP values are ASTM D7957 minimums or the GFRP 45/60
   * classes; steel values are ASTM A615 Grade 60. Class values, not a datasheet.
   */
  properties: [
    { property: "Tensile strength", bfrp: "1,000–1,100 MPa class", gfrp: "530–840 MPa guaranteed minimum (ASTM D7957, size-dependent); about 900–1,000 MPa typical", steel: "420 MPa yield, 620 MPa ultimate", note: "The highest tensile class of the three; strength still rarely sets the bar." },
    { property: "Tensile modulus", bfrp: "50 GPa class", gfrp: "45 or 60 GPa class", steel: "200 GPa", note: "A quarter of steel: crack width and deflection govern the design, as for GFRP." },
    { property: "Behaviour to failure", bfrp: "Linear to rupture at about 2.6% strain", gfrp: "Linear to rupture at 1.1% strain or more", steel: "Yields at about 0.2% strain, then stretches", note: "Sections are proportioned for concrete crushing with the bar kept elastic." },
    { property: "Density and weight", bfrp: "1.9–2.1 g/cm³; a Ø16 mm bar is about 0.38 kg/m", gfrp: "About 1.9–2.1 g/cm³", steel: "7.85 g/cm³; a Ø16 mm bar is 1.58 kg/m", note: "A quarter of the weight; a tonne of bar is four times the length of a tonne of steel." },
    { property: "Corrosion", bfrp: "No electrochemical corrosion; 75–80% retained after 900 days in alkali or seawater (published)", gfrp: "No electrochemical corrosion; 80% retained after ASTM D7705 exposure", steel: "Rusts once chlorides or carbonation reach the bar", note: "The reason either fiber is specified; compare the reports, not the fibers." },
    { property: "Fiber", bfrp: "Continuous basalt filament, drawn from melted rock with no additives", gfrp: "E-glass or E-CR glass, a formulated melt", steel: "Rolled carbon steel", note: "Basalt fiber is stiffer and stronger than E-glass; the bar inherits only part of that." },
    { property: "Electrical and magnetic", bfrp: "Non-conductive, nonmagnetic", gfrp: "Non-conductive, nonmagnetic", steel: "Conductive, ferromagnetic", note: "MRI suites, rail detection loops, substations." },
    { property: "Thermal conductivity", bfrp: "Below 1 W/m·K", gfrp: "Below 1 W/m·K", steel: "About 50 W/m·K", note: "No thermal bridge through an insulated element." },
    { property: "Temperature", bfrp: "Fiber tolerates far more heat than glass; the bar is limited by its resin (Tg 100 °C class)", gfrp: "Resin Tg 100 °C minimum", steel: "Keeps most strength to about 500 °C", note: "Fire design is by cover and detailing for both FRP bars." },
    { property: "Product standard", bfrp: "ASTM D8505/D8505M-23; CSA S807:19 (basalt included); ISO 10406-1 methods", gfrp: "ASTM D7957/D7957M-26; CSA S807:19", steel: "ASTM A615, EN 10080", note: "ACI CODE-440.11-22 covers glass bars only; a basalt bar needs the D8505 and engineer route in the US." },
    { property: "Shaping", bfrp: "Straight bars and coils; bends by inquiry", gfrp: "Factory-formed stirrups, bends and mesh", steel: "Bent, cut and welded on site", note: "Nothing is bent, heated or welded on site for either FRP bar." },
  ],
  /**
   * The published strength-equivalent substitution guide: the BFRP diameter whose nominal
   * tensile capacity at the published class matches the steel bar's yield capacity. It equates
   * ultimate tensile capacity only; FRP designs are governed by serviceability, bond and sustained
   * load and usually need more area than this table gives. The project designer decides.
   */
  substitution: [
    { steel: "Ø10", bfrp: "Ø6–Ø8" },
    { steel: "Ø12", bfrp: "Ø8" },
    { steel: "Ø14–Ø16", bfrp: "Ø10" },
    { steel: "Ø18", bfrp: "Ø12" },
    { steel: "Ø20–Ø22", bfrp: "Ø14" },
    { steel: "Ø24", bfrp: "Ø16" },
    { steel: "Ø26", bfrp: "Ø18" },
    { steel: "Ø28–Ø30", bfrp: "Ø20" },
  ],
  /** Who specifies basalt bars, with the sizes each element usually takes and where an imported bar fits. */
  segments: [
    { title: "Marine, seawalls & coastal concrete", why: "Chloride corrosion is the failure mode; a nonmetallic bar removes it, and the published seawater immersion data speaks to exactly this exposure.", sizes: "Ø10–Ø25 mm straight bars", route: "Open to imported bars in the Middle East, Africa, Asia-Pacific and Latin America; Canadian projects through CSA S807.", photo: "seawall" },
    { title: "Bridge decks, barriers & highways", why: "De-icing salt and traffic disruption justify a corrosion-free deck; basalt's higher modulus class helps on deflection-governed spans.", sizes: "Ø14–Ø25 mm", route: "In the United States and Canada public work runs through owner producer lists; elsewhere the engineer's acceptance of the D8505 or S807 data.", photo: "bridgeDeck" },
    { title: "Slabs, pavements & industrial floors", why: "Crack control over a large thin area, with no rust staining and bars light enough to place by hand.", sizes: "Ø6–Ø12 mm bars, coils for Ø≤10", route: "The largest volume segment; sold on the size mix and the delivered price per metre.", photo: "slabMat" },
    { title: "Foundations in aggressive soils", why: "Chloride or sulfate groundwater, and pile caps and rafts that are expensive to repair once cover spalls.", sizes: "Ø12–Ø25 mm", route: "Engineered packages; durability data reviewed against the soil report.", photo: "foundationSlab" },
    { title: "Culverts, channels & stormwater", why: "Wet-dry cycling and saline groundwater in linings, box culverts and headwalls.", sizes: "Ø8–Ø16 mm for linings; Ø16–Ø25 mm for walls", route: "Owner acceptance of supplier qualification data with a durability review.", photo: "culvert" },
    { title: "Tunnels, soft-eyes & mining", why: "Reinforcement a tunnel boring machine or roadheader can cut, and a bar that does not rust in groundwater.", sizes: "Ø16–Ø25 mm cages engineered to the breakthrough sequence", route: "Engineered packages led by the contractor's designer.", photo: "tbm" },
    { title: "MRI, rail, substations & data centers", why: "Nonmagnetic and electrically insulating reinforcement, with nonmetallic chairs and ties.", sizes: "Ø8–Ø20 mm", route: "Engineered by the facility designer; supplier data accepted project by project.", photo: "mri" },
    { title: "Pools, tanks & water plants", why: "Shells, tanks and channels in wet or chemically aggressive service where steel needs coatings.", sizes: "Ø8–Ø16 mm bars", route: "Pool builders and industrial owners buy on supplier qualification data.", photo: "pool" },
  ],
  /** Standards to name, in three layers: product, design, approval. */
  standards: [
    { layer: "Product standards", text: "ASTM D8505/D8505M-23 covers basalt and glass FRP bars (guaranteed force, modulus, bond, alkali resistance per size); CSA S807:19 (R2024) grades BFRP bars by modulus like GFRP; ISO 10406-1:2015 gives the test methods; GB/T 26743-2011 and JG/T 406-2013 are the manufacturer's home standards." },
    { layer: "Design codes", text: "ACI CODE-440.11-22 is written for glass bars only, so a US building using basalt needs the engineer's design to ACI 440.1R guidance and the authority's acceptance. CSA S806 and S6 accept S807 bars of either fiber. EN 1992-1-1:2023 Annex R applies where the national annex adopts it, with product data from an assessment." },
    { layer: "Approvals and listings", text: "ICC-ES AC454 and state DOT lists cover named GFRP producers; F1 holds no ICC-ES, DOT, CE or ETA listing for basalt bars and does not claim one. Tell us which document your project requires and we confirm what the manufacturer can evidence." },
  ],
  documents: [
    { title: "Product & size data", detail: "Fiber and resin, surface, measured area, unit mass, guaranteed tensile force and modulus for each offered size." },
    { title: "Qualification & durability", detail: "Test methods and editions, laboratory, bond, transverse shear, alkali and seawater exposure and retained properties." },
    { title: "Production records", detail: "Batch identification, inspection records, packing list and handling instructions for the released order." },
    { title: "Product manual", detail: "The F1 product manual (PDF) restates this page with the size table, the substitution guide and the ordering checklist." },
  ],
  pricing: {
    observed: "2026-10",
    range: "Public FOB listings observed in October 2026 for basalt bars from Ø6 to Ø25 mm ran from roughly $0.6 to $1.6 per metre, rising with diameter; basalt fiber itself costs more per tonne than E-glass, so a BFRP bar prices above the same GFRP size.",
    drivers: [
      { title: "Diameter", text: "Material scales with cross-sectional area, so a Ø20 mm bar costs about four times a Ø10 mm bar per metre. Quote the schedule, not an average." },
      { title: "Resin and test scope", text: "Vinyl ester or epoxy matrix, sand coating and third-party reports to D8505 or S807 each add cost per metre." },
      { title: "Lengths and coils", text: "Project cut lengths add handling but cut site waste; coils for Ø≤10 mm cut freight volume." },
      { title: "Packing and freight", text: "A tonne of BFRP is about four times the length of a tonne of steel, so freight is bought per container; terms (FOB, CIF, DAP, DDP) decide who carries freight, duty and clearance." },
    ],
  },
  export: {
    lengths: "Straight bars are cut to the project length; 6 m and 12 m are the usual planning lengths and bars up to about 11.8 m load into a 40 ft high-cube container. Longer bars need an open-top or flat-rack booking or an agreed cut length.",
    coils: "Ø6–Ø10 mm bars are coiled on a reel, which cuts freight volume for slab and pavement orders; confirm straightening and handling on site before choosing coils.",
    packing: "Bundles are strapped, labeled by diameter, length and quantity, and protected from abrasion; coils are wrapped and palletized.",
    documents: ["Commercial invoice, packing list and bill of lading", "Certificate of origin (Form E, Form F or non-preferential, per destination)", "Production-lot certificate with the test results agreed for the order", "Qualification report for each size, stating the standard and edition tested", "Handling, storage and cutting instructions"],
  },
  installation: [
    { title: "Design with the certified values", body: "Have the project designer size the bar to the governing FRP code using the guaranteed force and modulus of the offered size, not the steel substitution table." },
    { title: "Order shapes in advance", body: "Straight bars and coils are the standard product. Raise bends, hooks and mesh as an inquiry; never bend, heat or weld a cured bar on site." },
    { title: "Receive, support & protect", body: "Check labels, quantities and damage on arrival. Store off the ground and out of prolonged sun; protect from impact." },
    { title: "Cut with a blade", body: "Diamond or abrasive blade with dust extraction; no shears, bolt cutters or torch." },
    { title: "Tie it down and inspect", body: "Nonmetallic chairs set the cover; tie the light mat so it cannot float. Check spacing, cover and laps before the pour." },
  ],
  faqs: [
    { question: "What is basalt rebar?", answer: "A pultruded bar of continuous basalt fiber in a thermoset resin, with a helical wrap or sand coating for bond. Basalt fiber is drawn from melted basalt rock with no other ingredient. The bar does not rust, weighs about a quarter of steel, carries no current and no magnetic signature, and is cut with a blade." },
    { question: "Which sizes can I request?", answer: "Eleven inquiry diameters from Ø3 to Ø25 mm: 3, 6, 8, 10, 12, 14, 16, 18, 20, 22 and 25 mm. Ø6–Ø10 mm bars can be coiled. These are inquiry sizes, not a stock list; the quotation confirms the measured area, tolerance, length and unit mass." },
    { question: "Is basalt rebar stronger than fiberglass rebar?", answer: "At the fiber, yes; at the bar, by class. FengDu's basalt bar is published at 1,100 MPa and a 50 GPa class against the 45 GPa class and 530–840 MPa guaranteed minimums of ASTM D7957 glass bars. Only the certified values of the bar supplied can be designed with, so compare qualification reports, not fibers." },
    { question: "Can basalt rebar replace steel at the same diameter?", answer: "No. The published substitution guide pairs each steel size with a smaller BFRP size of equal tensile capacity, but FRP designs are governed by crack width, deflection, bond and sustained load under the governing code, which usually need more bar area than the strength match. The designer decides." },
    { question: "Which standard should my specification name?", answer: "ASTM D8505/D8505M-23 is the product specification that covers basalt bars; CSA S807:19 covers them in Canada with modulus grades; ISO 10406-1 gives the test methods. ACI CODE-440.11-22 is written for glass bars only, so a US building project using basalt needs the engineer's design and the authority's acceptance." },
    { question: "Are ICC-ES, DOT or CE approvals included?", answer: "No. Those are producer-specific listings and F1 does not claim one for basalt bars. Tell us which documents your project requires; we confirm what FengDu can evidence for the proposed sizes and identify what further testing would be needed." },
    { question: "How does it compare with your GFRP rebar?", answer: "Same handling, same design logic, a different fiber and a different code path. GFRP has the broader code acceptance (ASTM D7957, ACI 440.11) and the factory-bend and mesh programme; basalt offers a higher strength class and a 50 GPa class in one grade, and a price above the same GFRP size. Our basalt-vs-fiberglass guide and the GFRP rebar page cover the choice." },
    { question: "Can I get bends, stirrups or mesh in basalt?", answer: "Raise them as an inquiry with the shape drawings. The standard basalt product is straight bars and coils; factory-formed stirrups, bends and mesh are routine in the GFRP family, and a project can mix straight basalt bars with GFRP shapes where the designer allows it." },
    { question: "How much does basalt rebar cost?", answer: "Public FOB listings observed in October 2026 ran from roughly $0.6 to $1.6 per metre from Ø6 to Ø25 mm. Project and export prices depend on the size mix, resin, test scope, lengths or coils, packing and shipping terms; the RFQ response is the price." },
    { question: "How much fits in a container?", answer: "Depending on diameter and packing, a 40 ft high-cube carries roughly 12 to 20 metric tons of straight bars up to 11.8 m long; at 0.38 kg/m a tonne of Ø16 mm bar is about 2,600 m. Coils of small diameters pack denser still." },
    { question: "Is there a product manual I can download?", answer: "Yes. The F1 basalt FRP rebar product manual (PDF) carries the published properties, the size table with nominal area, unit mass and tensile capacity, the steel substitution guide with its caveats, standards, handling and the ordering checklist. The link is in the manual section of this page and on the downloads page." },
  ],
} as const;

export type BasaltSegment = (typeof basaltCatalog.segments)[number];
