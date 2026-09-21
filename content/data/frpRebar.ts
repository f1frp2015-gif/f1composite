/** Catalog availability is not stock, a design value or a certification. Sources: docs/research/frp-rebar-procurement.md. */
export const rebarCatalog = {
  path: "/products/frp-rebar",
  revision: "2026-09-21",
  title: "FRP Rebar | GFRP Bars, Stirrups & Reinforcement Mesh",
  description: "Explore GFRP straight bars, factory-formed stirrups and reinforcement mesh. Review inquiry sizes, prepare a bar schedule and request a project quote.",
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
  applications: [
    { title: "Marine & coastal concrete", use: "Seawalls, retaining elements and precast coastal components", need: "Chloride exposure and access for future repairs", confirm: "Exposure, service life requirements, bond and anchorage details" },
    { title: "Slabs & precast components", use: "Ground slabs, panels and repeat concrete elements", need: "Repeatable cut lengths, handling and reinforcement placement", confirm: "Structural use, approved bar layout, joints and casting sequence" },
    { title: "Water & industrial facilities", use: "Concrete components in wet or chemically exposed environments", need: "Material compatibility and maintenance access", confirm: "Chemical, concentration, temperature and crack-control requirements" },
    { title: "MRI & electrical facilities", use: "Concrete in magnetically or electrically sensitive areas", need: "Non-magnetic reinforcement and electrical isolation", confirm: "Project electromagnetic requirements, supports and accessories" },
    { title: "Bridges & transportation", use: "Bridge decks, approach slabs and related concrete elements", need: "De-icing salt exposure and maintenance disruption", confirm: "Owner specifications, approved-product requirements and lot testing" },
    { title: "Tunnel soft-eyes", use: "Project-specific reinforcement in TBM breakthrough zones", need: "Cuttable reinforcement during the construction sequence", confirm: "Temporary/permanent function, interfaces and engineered details" },
  ],
  documents: [
    { title: "Product & size data", detail: "Grade, fiber/resin, surface, measured area, unit mass, tensile force and modulus for each offered size." },
    { title: "Qualification & durability", detail: "Requested test methods and editions, laboratory, specimen scope, bond, alkali exposure and retained properties." },
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
    { question: "What sizes of GFRP rebar can I request?", answer: "The manufacturing-source catalog lists nominal metric diameters of 6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 30, 32, 34 and 36 mm. These are inquiry sizes, not a stock list. Confirm the offered grade, tolerance, length and supporting reports with your quotation. Other sizes can be submitted for review." },
    { question: "Can GFRP replace steel rebar at the same diameter?", answer: "Do not assume a one-for-one substitution. Stiffness, cracking, deflection, bond, anchorage and sustained loading must be checked along with strength. The project designer must approve the reinforcement layout and the offered bar properties." },
    { question: "Can I bend or weld fiberglass rebar on site?", answer: "Cured GFRP bars must not be field-bent, heated into shape or welded. Submit the required factory-formed shapes with dimensions, inside radii and quantities before production." },
    { question: "Are ASTM compliance and project approvals included?", answer: "Tell us which standard, edition and approval documents your project requires. We confirm the evidence available for the proposed grade and manufacturing source. A management-system certificate or a reference to a standard is not a product approval." },
    { question: "How do I specify reinforcement mesh?", answer: "Give the rod diameter and center-to-center spacing in both directions, overall sheet dimensions, joint requirements, quantity and approved drawing. Mesh and its intersections require their own acceptance basis; a straight-bar test report does not qualify the complete mesh." },
    { question: "What about BFRP, lengths, MOQ and delivery?", answer: "Basalt reinforcement can be raised as a technical inquiry and needs its own material data. Cut lengths, minimum quantities, samples, packing and shipping dates are confirmed for the requested product and destination. Share your bar schedule, port and required delivery date." },
  ],
} as const;
