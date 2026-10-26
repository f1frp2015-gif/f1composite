export const carbonPultrusionPath = "/products/pultrusion-carbon-fiber";

export const carbonProfileLinks = [
  { label: "Carbon fiber pultrusion overview", href: carbonPultrusionPath, description: "Compare plates, tubes and rods, manufacturing steps and material selection." },
  { label: "Pultruded carbon fiber plates", href: "/products/pultruded-carbon-fiber-plates", description: "Flat plates, strips and bars with longitudinal fibers and a broad bonding face." },
  { label: "Hollow carbon fiber rods & tubes", href: "/products/pultruded-carbon-fiber-tubes", description: "Hollow CFRP sections for lightweight supports, booms and moving components." },
  { label: "Pultruded carbon fiber rods", href: "/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod", description: "Solid carbon sections for compact members, alignment and reinforcement." },
];

// Illustrations are owned assets; see docs/pultrusion-carbon-fiber-images.md.
export const carbonProfileFormats = [
  {
    id: "plates",
    href: "/products/pultruded-carbon-fiber-plates",
    name: "Carbon fiber plates & strips",
    shortName: "Plates & strips",
    image: "/images/products/pultrusion-carbon-fiber/plates.svg",
    alt: "Illustration of flat pultruded carbon fiber plates and narrow strips with longitudinal fibers",
    summary: "Flat, constant-section laminates for bonded reinforcement, spar caps and lightweight stiffeners.",
    geometry: "Width × thickness × cut length",
    detail: "A pultruded carbon fiber plate carries continuous reinforcement along its length. Specify the bonding face, edge condition and thickness tolerance as well as the section. For a broad sheet with loads in several directions, review a laminated sheet construction instead.",
    checks: "Confirm longitudinal and transverse properties, bond preparation, end load transfer and the qualification of the complete assembly.",
    links: [
      { label: "Pultruded carbon fiber plate product details", href: "/products/pultruded-carbon-fiber-plates" },
      { label: "CFRP strengthening strips", href: "/products/pultruded-cfrp-strengthening-strips" },
      { label: "Carbon fiber wind-blade panels", href: "/products/wind-turbine-blade-panels#programs" },
    ],
  },
  {
    id: "tubes",
    href: "/products/pultruded-carbon-fiber-tubes",
    name: "Pultruded carbon fiber tubes",
    shortName: "Tubes",
    image: "/images/products/pultrusion-carbon-fiber/tubes.svg",
    alt: "Illustration of hollow round carbon fiber tubes showing the wall and axial reinforcement",
    summary: "Hollow profiles for lightweight supports, booms and components where section stiffness matters.",
    geometry: "Outside size × inside size or wall × length",
    detail: "Carbon tubing puts material away from the center of the section. Round, square or rectangular geometry can be reviewed against the drawing and tooling. A mainly axial pultrusion needs particular care at clamps, holes, inserts and bonded end fittings.",
    checks: "State torque, transverse loading and clamp pressure. Pull-winding or another off-axis laminate may be needed; a structural tube has no implied pressure rating.",
    links: [
      { label: "Pultruded carbon fiber tube product details", href: "/products/pultruded-carbon-fiber-tubes" },
      { label: "Carbon fiber roller tube components", href: "/products/carbon-fiber-roller-tubes" },
      { label: "Compare fiberglass round tubes", href: "/products/fiberglass-structural-shapes/frp-tube" },
    ],
  },
  {
    id: "rods",
    href: "/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod",
    name: "Pultruded carbon fiber rods",
    shortName: "Solid rods",
    image: "/images/products/pultrusion-carbon-fiber/rods.svg",
    alt: "Illustration of solid pultruded carbon fiber rods with filled circular ends and lengthwise fibers",
    summary: "Solid sections for alignment members, model spars, pushrods and drawing-led reinforcement.",
    geometry: "Diameter or section × cut length",
    detail: "A carbon fiber rod is solid through its cross-section. It can suit compact axial members and small reinforcement parts, but its diameter alone does not define load capacity. Long compression members also need a buckling check against their unsupported length and end restraints.",
    checks: "For a 3 mm rod inquiry, send the diameter tolerance, length, quantity, end finish and load case. This is a specification example; stock availability, minimum order and lead time are confirmed in the quote.",
    links: [
      { label: "Carbon fiber rod product details", href: "/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod" },
      { label: "Custom carbon profile development", href: "/products/custom-pultruded-profiles" },
      { label: "Compare fiberglass solid rods", href: "/products/fiberglass-structural-shapes/frp-rod" },
    ],
  },
] as const;

export const carbonProcessSteps = [
  { title: "Align the carbon tow", text: "Continuous fibers are guided into the required section. Their orientation establishes the main reinforcement direction." },
  { title: "Impregnate with resin", text: "The selected resin wets the reinforcement through an appropriate bath or injection arrangement." },
  { title: "Shape and cure", text: "A heated die controls the profile geometry while the resin cures around the fibers." },
  { title: "Pull continuously", text: "A puller advances the cured section at a controlled speed matched to the material and die." },
  { title: "Cut and inspect", text: "The profile is cut to the agreed length and checked against the order's dimensional and material requirements." },
];

export const carbonRfqItems = [
  { title: "Section, length & quantity", text: "Plate width and thickness; tube outside and inside dimensions; or rod diameter. Include units, tolerances and batch quantities." },
  { title: "Loads & interfaces", text: "Span, supports, tension, compression, bending, torque, deflection limits, joints, holes and bonded or clamped fittings." },
  { title: "Material & service", text: "Carbon grade if specified, reinforcement direction, resin requirements, temperature, moisture, UV exposure and electrical isolation." },
  { title: "Inspection & delivery", text: "Required test evidence, first-article acceptance, traceability, packing, destination and target delivery date." },
];

export const carbonPultrusionFaqs = [
  { question: "What is pultrusion carbon fiber?", answer: "Carbon fiber pultrusion is a continuous process that pulls resin-impregnated carbon reinforcement through a heated shaping die. It produces constant-section CFRP profiles such as plates, strips, tubes and rods, with the main fibers typically aligned along the profile." },
  { question: "Are pultruded carbon fiber plates the same as woven carbon sheets?", answer: "No. A pultruded plate is generally designed around continuous longitudinal fibers. A laminated sheet may contain woven or angled plies to address loading in several directions. Choose the reinforcement architecture for the loads, joints and geometry rather than the black surface appearance." },
  { question: "Should I choose a solid carbon rod or a hollow tube?", answer: "Start with the space available, load direction, span and connection. Tubes can distribute material efficiently for bending stiffness, while rods offer a solid section for compact members. Neither form has a universal load rating; compare the actual section, laminate, stability and joints." },
  { question: "Can I request a 3 mm pultruded carbon fiber rod?", answer: "Yes. Use the rod inquiry link and state 3 mm as the requested diameter, along with tolerance, cut length, quantity and application. F1 will review feasibility and supply terms. The example is not a stock listing or a promise of a particular weight, strength or delivery time." },
  { question: "Is carbon fiber electrically insulating like fiberglass?", answer: "No. Carbon fibers conduct electricity. Specify electrical isolation where needed and review contacts with metals in wet service. If insulation is central to the application, consider an appropriate fiberglass system and qualify the finished assembly." },
  { question: "Can I specify custom sizes, resin and cut lengths?", answer: "Send a drawing and the service requirements. F1 reviews the section, fiber architecture, resin, tooling, finish and inspection plan before confirming the supply scope. Material properties, minimum order, tooling cost and lead time are quotation-specific." },
];
