export const carbonPlateSpecifications = [
  ["Width × thickness × length", "State each dimension with units, the cut length and piece quantity. Identify dimensions that control fit or bond-line thickness."],
  ["Dimensional tolerances", "Define thickness and width limits, straightness, flatness and end squareness on the drawing."],
  ["Fiber architecture", "Specify longitudinal stiffness and strength requirements, plus any transverse, shear or fatigue demands."],
  ["Resin & service", "Provide temperature range, moisture, chemicals and outdoor exposure so the resin and surface protection can be reviewed."],
  ["Bonding face & edges", "Identify the bonding face, required surface preparation, edge condition and any peel-ply requirement."],
  ["Inspection & supply", "Agree material identification, dimensional inspection, test evidence, packing, trial quantity and repeat demand."],
] as const;

export const carbonPlateApplications = [
  { title: "Wind-blade spar caps", text: "Longitudinal laminates for blade reinforcement programs. Review thickness consistency, bonding surfaces, stacking and fatigue qualification together.", href: "/products/wind-turbine-blade-panels", label: "Explore wind-blade panels" },
  { title: "Bonded strengthening", text: "Flat CFRP strips for an engineered reinforcement system. The substrate, adhesive, end load transfer and installation conditions form part of the design.", href: "/products/pultruded-cfrp-strengthening-strips", label: "Explore strengthening strips" },
  { title: "Lightweight stiffeners", text: "Straight strips and flat bars for equipment rails, model spars and bonded beam reinforcement. Define the bending direction, span and attachment details.", href: "/products/carbon-fiber-robotic-beams", label: "Explore lightweight carbon members" },
] as const;

export const carbonPlateFaqs = [
  { question: "What are pultruded carbon fiber plates?", answer: "They are flat, constant-section CFRP profiles made by pulling continuous carbon reinforcement and resin through a heated die. The main fibers run along the length. The same product form may be described as a carbon fiber strip, flat bar or pultruded laminate, depending on the section and application." },
  { question: "Are pultruded plates the same as woven carbon fiber sheets?", answer: "No. A typical pultruded plate emphasizes continuous longitudinal reinforcement. A laminated sheet can use selected ply directions or woven fabric to carry loads across a wider panel. For a machined panel with holes and loads in several directions, specify the layup and compare it with a laminated-sheet option." },
  { question: "What widths, thicknesses and lengths are available?", answer: "Send width × thickness × length, tolerances and quantities in mm or inches. F1 reviews the section, tooling and material requirements before confirming the available configuration. Cut lengths, minimum order, sample timing and lead time are confirmed in the quotation." },
  { question: "Can I order plates for adhesive bonding?", answer: "Yes. Include the substrate, bonded area, adhesive requirements and service environment in your inquiry. Agree the supplied surface, any peel ply or surface preparation, and the finished joint’s acceptance tests. Surface preparation must suit the selected laminate and adhesive system." },
  { question: "Can pultruded carbon fiber plates be drilled or machined?", answer: "Send hole positions, cutouts and edge details for review. Cutting across the fibers changes the load path, and concentrated fastener loads need a connection design. Specify the final component geometry and inspection requirements before confirming machining." },
  { question: "How stiff and how strong is a pultruded carbon plate?", answer: "Class values for unidirectional pultruded carbon at about 60% fiber volume are a longitudinal modulus of 120–150 GPa at about 1.55 g/cm³; strengthening-grade strips at 65–70% fiber volume reach 150–170 GPa and 2,500–3,000 MPa, so a 50 × 1.4 mm strip carries roughly the ultimate tension of a 50 × 8 mm mild-steel plate at a tenth of the weight. Across and through the thickness the plate is resin-dominated and far weaker. These are published ranges, not an F1 datasheet; the qualification report of the offered laminate states what a delivered plate achieves." },
  { question: "Why are spar caps and strengthening strips pultruded rather than laid up?", answer: "Pultrusion gives the highest fiber content and the most uniform thickness of any carbon laminate, in any length, at the lowest cost per metre, because the tows are pulled straight through a die with no plies to drop or mandrel to wrap. A spar cap is stacked from tens of identical planks; a strengthening strip must be the same thickness along a whole beam. Both need exactly what pultrusion does well and nothing it does badly." },
  { question: "Does the plate carry the load, or the adhesive?", answer: "Both, in series. The plate carries tension along its fibers; the adhesive carries that tension into the member as shear over the bonded area. The strip almost never fails; the joint does, by peeling at a square-cut end, delaminating off weak concrete or softening above the adhesive's glass transition. The substrate preparation, bond-line thickness, anchorage length and end detail are the design, and they belong to the strengthening system and the engineer of record." },
  { question: "How do I compare a plate with a carbon tube or rod?", answer: "A flat plate offers a broad bonding face and directional bending stiffness. A tube distributes material around a hollow section, while a rod provides a compact solid section. Compare the actual section, fiber architecture, supports and joints against the same load and deflection requirements." },
] as const;

export const carbonPlateRfqItems = [
  { title: "Dimensions & quantities", text: "Width, thickness, cut length, tolerances, trial quantity and repeat demand." },
  { title: "Loads & application", text: "Span, supports, bending direction, stiffness target and any fatigue duty." },
  { title: "Surface & interfaces", text: "Bonding face, adhesive or substrate, holes, edge finish and surface protection." },
  { title: "Material & delivery", text: "Fiber and resin requirements, acceptance evidence, destination and required date." },
];
