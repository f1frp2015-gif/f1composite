/**
 * GFRP rebar supply page data. Catalog availability is not stock, a design value or a certification.
 * Sources: docs/research/frp-rebar-procurement.md (manufacturing source) and
 * docs/research/frp-rebar-market-2026-10.md (market, leading producers, standards, pricing).
 */
export const rebarCatalog = {
  path: "/products/frp-rebar",
  revision: "2026-10-25",
  title: "FRP Rebar Supplier | GFRP Bars, Stirrups & Mesh Export",
  description: "GFRP rebar Ø6–36 mm (No. 2–No. 10): straight bars, factory stirrups and mesh for marine, precast, slab and MRI concrete. ASTM D7957 data, export packing, RFQ.",
  diameters: [6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 30, 32, 34, 36],
  scope: "GFRP straight bars, factory-formed stirrups and reinforcement mesh supplied against a project schedule. Grade, resin, dimensions, evidence and delivery are confirmed for the offered product.",
  images: {
    straight: "/images/products/frp-rebar/gfrp-straight-bars.webp",
    bends: "/images/products/frp-rebar/gfrp-rectangular-stirrups.webp",
    mesh: "/images/products/frp-rebar/gfrp-reinforcement-mesh.webp",
    surface: "/images/products/frp-rebar/gfrp-helical-surface.webp",
  },
  forms: [
    { id: "straight", anchor: "straight-bars", title: "Straight GFRP rebar", subtitle: "Schedule by diameter, length and quantity", body: "Glass-fiber reinforcing bars with an enhanced bond surface. The source catalog lists 15 metric diameters; confirm the resin, surface profile and cut length for your order.", inputs: "Diameter or bar designation · cut length · number of bars · surface requirement", action: "Quote straight bars" },
    { id: "bends", anchor: "stirrups-bends", title: "Factory-formed stirrups & bends", subtitle: "Make the shape before it reaches site", body: "Rectangular stirrups and project bends are reviewed against your drawing. Confirm the inside bend radius, leg dimensions, tolerances and bent-section performance before manufacture.", inputs: "Bar diameter · shape drawing · inside radius · dimensions · quantity", action: "Send a bending schedule" },
    { id: "mesh", anchor: "mesh", title: "GFRP reinforcement mesh", subtitle: "Specify both directions and the intersection", body: "The source offers glass-fiber and epoxy-resin mesh with custom spacing and panel dimensions. Rod properties alone do not establish the performance of the assembled mesh or its joints.", inputs: "Rod sizes in both directions · spacing · panel dimensions · joint type · number of sheets", action: "Quote reinforcement mesh" },
  ],
  /**
   * Who specifies GFRP rebar, in the order of export relevance. "Route" states honestly where an
   * imported bar fits: the leading producers win US and Canadian public work through producer
   * listings and domestic-content rules that an importer cannot supply.
   */
  segments: [
    { title: "Marine, seawalls & coastal concrete", why: "Chloride-driven corrosion of steel is the failure mode in seawalls, piles, caps and wharves; a nonmetallic bar removes it.", sizes: "Ø10–Ø25 mm (No. 3–No. 8) straight bars and factory cages", route: "Open to imported bars in the Middle East, Africa, Asia-Pacific and Latin America and for private US and Australian owners who accept a third-party test report; public US work follows state producer lists.", href: "/resources/gfrp-rebar-applications#marine" },
    { title: "Precast panels, segments & architectural concrete", why: "Lighter cages, reduced cover and no rust staining; repeat schedules and mesh suit factory production.", sizes: "Ø6–Ø16 mm bars and welded-pattern mesh, cut to repeat lengths", route: "Precasters buy to their own qualification; a sample lot with full test scope is the normal first step.", href: "/resources/gfrp-rebar-applications#precast" },
    { title: "Slabs, pavements, pools & ICF walls", why: "Flatwork, pool shells and insulated-concrete-form walls use small bars where corrosion staining and handling weight matter more than stiffness.", sizes: "Ø10–Ø16 mm (No. 3–No. 5), 6 m and 12 m lengths or project cut lengths", route: "The largest volume segment; sold through distributors and contractors who want a stable size mix rather than a design approval.", href: "/resources/gfrp-rebar-applications#flatwork" },
    { title: "Bridge decks, barriers & transport", why: "De-icing salts and traffic disruption make corrosion-free decks and barriers worth a higher first cost.", sizes: "Ø16–Ø32 mm (No. 5–No. 10) with high-modulus grades", route: "In the United States and Canada this work runs through DOT producer lists, Buy America rules and CSA S807 Grade III requirements; outside North America it is specified project by project.", href: "/resources/gfrp-rebar-applications#bridges" },
    { title: "MRI suites, rail & electrical facilities", why: "Nonmagnetic and electrically insulating reinforcement for imaging rooms, electrified rail slabs, substations and sensitive laboratories.", sizes: "Ø8–Ø20 mm bars with nonmetallic chairs and ties", route: "Specified by the equipment supplier's exclusion zone; the whole mat, including accessories, must stay nonmetallic.", href: "/resources/gfrp-rebar-applications#mri" },
    { title: "TBM soft-eyes, mining & temporary works", why: "Reinforcement that a tunnel boring machine or a roadheader can cut, in diaphragm walls, shafts and portals.", sizes: "Ø20–Ø32 mm cages engineered to the breakthrough sequence", route: "Engineered packages led by the contractor's designer; polyester-matrix bars are acceptable only where the use is temporary.", href: "/resources/gfrp-rebar-applications#soft-eye" },
    { title: "Water, wastewater & chemical plants", why: "Tanks, channels and slabs in wet or chemically aggressive service where steel would need coatings or stainless grades.", sizes: "Ø10–Ø25 mm bars and mesh", route: "Industrial owners accept supplier qualification data with a project-specific chemical exposure review.", href: "/resources/gfrp-rebar-applications#water" },
  ],
  /** How buyers reach a quotation; each route maps to a contact stage. */
  supplyRoutes: [
    { stage: "quote", title: "Project supply", text: "A bar schedule or BOQ for one structure: diameters, cut lengths, shapes, quantities, standard and destination. Quoted per metre or per bar, with bends and mesh on separate lines." },
    { stage: "distributor", title: "Distributor or precaster program", text: "A repeating size mix, usually Ø10–Ø16 mm in 6 m or 12 m lengths, with agreed labels, bundle counts and a shipment rhythm. Quoted per tonne or per container with the packing list fixed." },
    { stage: "sample", title: "Sample and qualification lot", text: "A small lot of the sizes your engineer wants tested, with the test scope agreed in advance: ASTM D7205 tension, D7617 shear, D7913 bond, D7705 alkali exposure, or the ISO 10406-1 equivalents." },
    { stage: "technical", title: "Technical review", text: "An application, exposure and code question before any schedule exists. Suitability, documents and samples are discussed first; the schedule follows." },
  ],
  /**
   * Price basis. Ranges are public retail references on one date, not quotations; the project price
   * is the one in the RFQ response (owner rule, 2026-10-23: ranges only, RFQ decides).
   */
  pricing: {
    observed: "2026-10",
    retailRange: "US retail and dealer listings observed in October 2026 ran from roughly $0.25 to $0.85 per foot for No. 3 and No. 4 fiberglass bars, with structural No. 5 bars above $1 per foot at dealers.",
    drivers: [
      { title: "Size mix", text: "Material scales with cross-sectional area, so a Ø25 mm bar costs several times a Ø12 mm bar per metre. Quote the schedule, not an average." },
      { title: "Grade, resin and test scope", text: "Vinyl ester matrix, E-CR glass, a higher modulus tier and third-party test reports each add cost per metre and are what separates a structural bar from a flatwork bar." },
      { title: "Bends, mesh and cut lengths", text: "Every shape is factory-formed before cure and priced from the bending schedule; mesh is priced per sheet; project cut lengths add handling but cut site waste." },
      { title: "Packing and freight", text: "GFRP weighs about a quarter of steel for the same size, so freight is bought per container rather than per tonne; dense bundles of large bars reach the road payload while small bars and bent shapes run out of space first. Bars over 11.8 m need special equipment." },
      { title: "Terms", text: "FOB, CIF, DAP or DDP change who carries freight, insurance, duty and clearance. Compare offers on the same term and the same bar data." },
    ],
  },
  /** Export packing and documents. Figures are planning values; the packing list governs. */
  export: {
    lengths: "Standard straight lengths are 6 m and 12 m, or 20 ft for North American schedules. Bars up to about 11.8 m load into a 40 ft high-cube container; longer bars need an open-top or flat-rack booking or a cut length agreed in advance.",
    coils: "Ø6–Ø10 mm bars can be coiled on request, which cuts freight volume for small-diameter mesh and slab orders; confirm straightening and handling on site before choosing coils.",
    packing: "Bundles are strapped, labeled by bar mark, diameter, length and quantity, and protected from abrasion; bends and mesh sheets are palletized or crated to the drawing reference.",
    documents: ["Commercial invoice, packing list and bill of lading", "Certificate of origin (Form E, Form F or non-preferential, per destination)", "Production-lot certificate with the test results agreed for the order", "Qualification report for each size, stating the standard and edition tested", "Handling, storage and cutting instructions for the offered grade"],
  },
  documents: [
    { title: "Product & size data", detail: "Grade, fiber/resin, surface, measured area, unit mass, guaranteed tensile load and modulus for each offered size." },
    { title: "Qualification & durability", detail: "Requested test methods and editions, laboratory, specimen scope, bond, transverse shear, alkali exposure and retained properties." },
    { title: "Bends & mesh details", detail: "Approved shape drawings, bent-section data, mesh intersections, tolerances and the relevant inspection requirements." },
    { title: "Production & delivery records", detail: "Agreed batch identification, inspection records, packing list and handling instructions for the released order." },
  ],
  installation: [
    { title: "Release the drawings", body: "Have the project designer establish bar area, spacing, cover, anchorage and lap details. Recheck the design when changing reinforcement material." },
    { title: "Order bends in advance", body: "Specify the required shapes before manufacture. Do not field-bend, heat or weld cured GFRP reinforcing bars." },
    { title: "Receive, support & protect", body: "Check labels, quantities and damage on arrival. Follow the supplied storage instructions; protect bars from unnecessary impact and prolonged exposure." },
    { title: "Cut with the correct tools", body: "Use the approved product cutting procedure and suitable protective equipment. Steel-style shearing can damage the fibers." },
    { title: "Place & inspect before pouring", body: "Use appropriate supports and ties. Check the approved spacing, cover, laps and stability so reinforcement remains in position during casting." },
  ],
  faqs: [
    { question: "What sizes of GFRP rebar can I request?", answer: "The manufacturing-source catalog lists nominal metric diameters of 6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 30, 32, 34 and 36 mm, which covers the ASTM D7957 range from No. 2 to No. 10. These are inquiry sizes, not a stock list. Confirm the offered grade, tolerance, length and supporting reports with your quotation." },
    { question: "Is fiberglass rebar stronger than steel?", answer: "In tension, yes: GFRP bars are typically guaranteed between 800 and 1,100 MPa against 420 MPa yield for Grade 60 steel. But the modulus is 45 to 60 GPa against about 200 GPa, so GFRP is about a quarter as stiff and does not yield. Crack width and deflection, not strength, usually set the bar area." },
    { question: "Can GFRP replace steel rebar at the same diameter?", answer: "Do not assume a one-for-one substitution. Stiffness, cracking, deflection, bond, anchorage and sustained loading must be checked along with strength under ACI CODE-440.11-22, CSA S806 or the code adopted for the project. The project designer approves the reinforcement layout and the offered bar properties." },
    { question: "Can I bend or weld fiberglass rebar on site?", answer: "No. Cured GFRP bars must not be field-bent, heated into shape or welded. Submit the required factory-formed shapes with dimensions, inside radii and quantities before production, and design with the bent-portion strength, which ASTM D7957 only requires to be 60% of the straight bar." },
    { question: "How much does GFRP rebar weigh?", answer: "About a quarter of steel for the same nominal size. A Ø12 mm or No. 4 bar is roughly 0.22 to 0.25 kg per metre against 0.99 kg for steel. The size chart lists calculated weights for every size; the supplier's declared unit mass governs." },
    { question: "How much does fiberglass rebar cost?", answer: "US retail and dealer listings observed in October 2026 ran from roughly $0.25 to $0.85 per foot for No. 3 and No. 4 bars, with structural No. 5 bars above $1 per foot. Project and export prices depend on the size mix, grade, test scope, bends, packing and shipping terms, so the actual price is confirmed by quotation against your bar schedule." },
    { question: "Which standard should my specification name?", answer: "ASTM D7957/D7957M is the product standard most export projects cite, with ACI CODE-440.11-22 for building design in the United States. Canada uses CSA S807 for bars and S806 or S6 for design; Australia has AS 5204:2023; Europe designs to EN 1992-1-1:2023 Annex R and certifies bars through an ETA. The standards crosswalk explains what each one fixes." },
    { question: "Are ICC-ES, DOT or CE approvals included?", answer: "No. Those are producer-specific listings that only the named manufacturer may claim. Tell us which standard, edition and approval documents your project requires; we confirm the test evidence available for the proposed grade and identify what further testing a project would need. A management-system certificate or a reference to a standard is not a product approval." },
    { question: "Can GFRP rebar be used in seismic or fire-rated members?", answer: "Only within the limits of the governing code. ACI CODE-440.11-22 excludes GFRP from seismic-force-resisting systems in higher seismic design categories and relies on cover and detailing rather than a fire rating of the bar, whose resin softens above its glass transition temperature. The engineer of record decides element by element." },
    { question: "How do I specify reinforcement mesh?", answer: "Give the rod diameter and center-to-center spacing in both directions, overall sheet dimensions, joint requirements, quantity and approved drawing. Mesh is outside the scope of ASTM D7957 and needs its own acceptance basis; a straight-bar test report does not qualify the complete mesh." },
    { question: "What about BFRP, lengths, MOQ and delivery?", answer: "Basalt reinforcement can be raised as a technical inquiry and needs its own material data to ASTM D8505 or CSA S807. Cut lengths, minimum quantities, samples, packing and shipping dates are confirmed for the requested product and destination. Share your bar schedule, port and required delivery date." },
    { question: "How much GFRP rebar fits in a container?", answer: "Depending on diameter and packing, a 40 ft high-cube container carries roughly 12 to 20 tonnes of straight bars up to 11.8 m long, which is 50,000 to 90,000 m of Ø12 mm bar: dense bundles of large bars approach the road payload, while small diameters and bent shapes run out of space first. Ø6–Ø10 mm bars can be coiled to save volume. The export guide gives metres per tonne by size; the packing list for your order gives the exact quantity." },
  ],
} as const;

export type RebarSegment = (typeof rebarCatalog.segments)[number];
