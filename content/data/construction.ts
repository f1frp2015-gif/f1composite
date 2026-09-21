/** Construction navigation uses existing product routes and their actual supply scopes. */
export const constructionApplications = [
  {
    id: "windows",
    number: "01",
    title: "Windows & doors",
    summary: "Choose profiles for fabrication, reinforcement inserts, thresholds or complete glazed units.",
    products: [
      { label: "Windows & doors overview", href: "/products/frp-window-frames" },
      { label: "Window & door profiles", href: "/products/window-door-profiles" },
      { label: "Window reinforcement profiles", href: "/products/frp-window-reinforcement" },
      { label: "Fiberglass door thresholds", href: "/products/fiberglass-door-thresholds" },
      { label: "Finished windows & doors", href: "/products/fiberglass-windows-doors" },
    ],
    heading: "Treat the window as a complete envelope assembly",
    paragraphs: [
      "A window frame must support glazing and hardware while helping control heat flow, air leakage and water entry. Pultruded glass-fiber profiles are useful where the project needs a less conductive frame material and resistance to damp or coastal conditions. The benefit depends on the frame geometry, glazing, spacer, seals and installation joint working together; the profile material alone does not establish a whole-window U-value or Passive House certification.",
      "Start with the purchasing scope. A fabricator ordering window and door profiles needs section drawings, cutting and joining details, coating requirements and hardware interfaces. A contractor ordering finished windows needs an opening schedule, operating types, glazing build-up, installation dimensions and the performance evidence for the proposed system. Keeping these routes separate prevents a quote for lineal profiles from being compared with a quote for installed-ready units.",
      "Reinforcement inserts and door thresholds solve more specific problems. An insert must fit the host frame and transfer screw and hardware loads; a threshold must coordinate sill support, drainage, seals and the floor transition. For an energy retrofit, examine the perimeter joint and adjacent wall as carefully as the new frame: a conductive fixing or poorly insulated reveal can limit the improvement at the opening.",
    ],
    checks: ["Opening schedule, frame sections and operating types", "Glazing, air/water/wind requirements and thermal targets", "Hardware, drainage, finish and installation interfaces"],
  },
  {
    id: "facades",
    number: "02",
    title: "Facades & sunshades",
    summary: "Flat blades, vertical fins, louvers and custom architectural sections for exterior shading.",
    products: [
      { label: "Facade fins & sunshade panels", href: "/products/frp-facade-panels" },
      { label: "Custom architectural profiles", href: "/products/custom-pultruded-profiles" },
      { label: "Hollow & multi-cell profiles", href: "/products/fiberglass-plates" },
    ],
    heading: "Design the blade, bracket and wall interface together",
    paragraphs: [
      "F1's facade product route focuses on pultruded shading blades and architectural profiles: flat plate fins, louvers and custom hollow sections. These elements can give an elevation depth and solar control without requiring a heavy metal blade. Their orientation, spacing and projection should follow the building's solar exposure and daylight objectives. A vertical fin, a projecting horizontal louver and an operable blade place different demands on the same material.",
      "Wind pressure and suction, self-weight, torsion and allowable deflection determine the section and bracket spacing. Reinforcement across the blade and around fixing locations matters alongside longitudinal stiffness. At the connection, check bolt bearing, pull-through, edge distance, local restraint and movement. A headline material modulus cannot establish the capacity of an entire sunshade assembly.",
      "Follow the full heat-flow path through the facade. A low-conductivity FRP member can reduce a thermal bridge, but metal anchors and adjoining components still contribute. Specify the exposed finish, color and weathering requirements, then review the fire evidence for the exact laminate and intended assembly. Shading blades should not be confused with a complete weatherproof wall panel or a tested rainscreen system.",
    ],
    checks: ["Elevation, blade orientation, projection and bracket spacing", "Wind actions, deflection limit and connection geometry", "Coating, movement allowance and assembly-specific fire evidence"],
  },
  {
    id: "structure",
    number: "03",
    title: "Secondary structures & supports",
    summary: "Beams, channels, angles and tubes for designed frames, equipment supports and substructures.",
    products: [
      { label: "All fiberglass structural shapes", href: "/products/fiberglass-structural-shapes" },
      { label: "I-beams & wide flanges", href: "/products/fiberglass-structural-shapes/frp-i-beam" },
      { label: "Channels", href: "/products/fiberglass-structural-shapes/frp-channel" },
      { label: "Angles", href: "/products/fiberglass-structural-shapes/frp-angle" },
      { label: "Square & rectangular tubes", href: "/products/fiberglass-structural-shapes/frp-square-tube" },
    ],
    heading: "Select a section around stiffness and connections",
    paragraphs: [
      "Standard pultruded sections are a starting point for service platforms, equipment frames, facade substructures and other secondary building supports. Glass-fiber composites resist the rusting mechanism that affects steel and can reduce handling weight. These characteristics are useful in wet plant spaces, coastal projects and locations where access for maintenance is difficult. Suitability still depends on the resin, exposure and actual load path.",
      "FRP is directional: properties along the continuous fibers differ from those across the section. Deflection, creep under sustained load, shear, local buckling and connection behavior can control a member before its longitudinal tensile strength is fully used. Replacing a steel member with an identically sized FRP section is therefore an engineering redesign, even where both sections have the same external dimensions.",
      "Plan fabrication early. Hole locations, end bearing, splice plates, bracing and fastener materials belong on the assembly drawing. Confirm how cut edges and drilled surfaces will be treated for the exposure. For repeated assemblies, a custom profile can incorporate useful returns or interfaces, but tooling and sample approval should be weighed against a standard section with secondary fabrication.",
    ],
    checks: ["Member orientation, unsupported lengths, loads and service temperature", "Deflection, creep, stability, bearing and joint design", "Cut lengths, hole schedule, fasteners and erection sequence"],
  },
  {
    id: "access",
    number: "04",
    title: "Walkways, stairs & access",
    summary: "Coordinate walking surfaces, treads, rails and fixed ladders as one access package.",
    products: [
      { label: "Molded FRP grating", href: "/products/molded-frp-grating" },
      { label: "Pultruded FRP grating", href: "/products/frp-gratings" },
      { label: "Structural deck panels", href: "/products/frp-deck-panels" },
      { label: "Stair treads & covers", href: "/products/frp-stair-treads" },
      { label: "Handrail systems", href: "/products/frp-handrail-systems" },
      { label: "Fixed ladder systems", href: "/products/frp-ladders" },
    ],
    heading: "Choose the walking surface before detailing the access route",
    paragraphs: [
      "Roof maintenance paths, plant-room platforms and wet service areas need a walking surface suited to the users, support layout and environment. Molded grating offers intersecting grid construction that can suit layouts with cutouts. Pultruded grating has continuous load-bearing bars with a defined primary span direction. Select using the actual panel geometry and load/span data; the two constructions are not interchangeable merely because their depths match.",
      "Open mesh allows drainage but also lets small objects pass through. Mesh opening, footwear, wheeled equipment and accessibility requirements may lead to a smaller opening or a closed surface. Structural deck panels provide a different route through closed or multi-cell sections. They still require support and joint design, surface selection and drainage detailing; a closed top does not by itself establish a watertight roof or floor assembly.",
      "Specify stair treads together with their nosings and supports. A tread cover improves an existing substrate's surface; it is not automatically a spanning stair tread. Handrails need post spacing, infill and anchorage coordinated with the supporting frame. Fixed ladders need landing, clearance, bracket and fall-protection interfaces resolved. For any escape route or public circulation area, confirm the applicable access and fire requirements before choosing an industrial access product.",
    ],
    checks: ["Clear spans, load direction, point loads and panel cutouts", "Slip surface, openings, drainage and hold-down details", "Stair supports, rail anchorage and ladder landing interfaces"],
  },
  {
    id: "reinforcement",
    number: "05",
    title: "Concrete reinforcement",
    summary: "Start with GFRP bars and schedule factory-formed bends for the specified concrete design.",
    products: [
      { label: "FRP rebar & factory-formed shapes", href: "/products/frp-rebar" },
    ],
    heading: "Specify reinforcement as a qualified bar system",
    paragraphs: [
      "FRP reinforcement can be considered for slabs, foundations, precast components and building elements where chloride exposure or electromagnetic requirements make steel reinforcement less attractive. GFRP is the usual starting point in F1's rebar range; basalt- and carbon-fiber options follow the project specification. A smooth pultruded round rod is a different product from a reinforcing bar with a qualified bond surface.",
      "The structural design must account for the selected bar's modulus, bond, anchorage, environmental reductions and failure behavior. GFRP does not provide steel's yield plateau, and a higher tensile strength does not justify a diameter-for-diameter substitution. Crack width, deflection, fire exposure and detailing need review under the governing design basis for the actual building element.",
      "Order from an approved bar schedule showing diameters, quantities, cut lengths and bend geometry. Bends and stirrups must be factory-formed to the specified shape; do not plan to bend cured bars on site. Tie material identification, guaranteed properties and production records to the offered grade. Where electrical insulation matters, distinguish glass- and basalt-fiber bars from electrically conductive carbon-fiber reinforcement.",
    ],
    checks: ["Governing design basis and approved bar schedule", "Fiber, resin, bond surface and guaranteed grade properties", "Factory bends, anchorage, fire exposure and lot traceability"],
  },
  {
    id: "rooftops",
    number: "06",
    title: "Rooftop solar & building services",
    summary: "Find PV frame profiles, mounting sections and support routes for rooftop equipment and cables.",
    products: [
      { label: "Solar frames & mounting profiles", href: "/products/frp-solar-mounting-systems" },
      { label: "Cable tray support applications", href: "/applications/frp-cable-tray-supports" },
      { label: "Cooling tower profile applications", href: "/applications/frp-cooling-tower-profiles" },
    ],
    heading: "Coordinate supports with the roof and its equipment",
    paragraphs: [
      "A roof installation brings together the building structure, waterproofing, solar modules, cable routes and maintenance access. FRP support profiles can be useful where handling weight, corrosion or electrical isolation influences material selection. Separate a profile that forms the edge of a solar module from a rail or beam supporting the module: they have different interfaces, load cases and qualification requirements.",
      "For a mounting system, provide the roof geometry, module layout, support spacing and governing wind and snow conditions. The design must establish the path from module clamps through rails, joints and anchors into the building. Check concentrated loads on the roof, uplift restraint, thermal movement and the waterproofing detail. A lightweight support profile does not remove the need to verify the existing roof's capacity.",
      "Cable tray supports and cooling-tower frames are additional building-services uses for standard or custom profiles. Match the section and resin to the supported equipment, vibration, moisture, chemical exposure and service temperature. Coordinate maintenance walkways from the access range and resolve bonding, grounding and lightning protection for the complete installation; insulating supports alone do not settle those requirements.",
    ],
    checks: ["Roof and equipment layouts, fixing interfaces and waterproofing", "Wind uplift, snow, point loads and existing roof capacity", "Exposure, movement, electrical coordination and maintenance access"],
  },
] as const;

export const constructionSupportingProducts = [
  { label: "Solid fiberglass sheets", href: "/products/fiberglass-sheets", description: "Cut-to-size flat stock for covers, kick panels, liners and fabricated parts. Confirm thickness, laminate, surface and support conditions." },
  { label: "Flat bars & connection parts", href: "/products/fiberglass-structural-shapes/frp-flat-bar", description: "Narrow solid sections for spacers, strips and fabricated details, with the bearing and fixing arrangement checked for the job." },
  { label: "Round tubes", href: "/products/fiberglass-structural-shapes/frp-tube", description: "Circular sections for fabricated rails, bracing and component assemblies. Choose the wall and connections for the actual duty." },
  { label: "Sound barrier wall panels", href: "/products/frp-sound-barrier-wall", description: "A project route for perimeter or service-area noise screening. Acoustic performance depends on the panel, joints, posts and overall layout." },
] as const;

export const constructionFaqs = [
  { question: "Which F1 products are relevant to a building project?", answer: "Begin with the six application groups above: windows and doors; facade fins and sunshades; structural supports; grating, decking and access; concrete reinforcement; and rooftop solar or building services. Solid sheets, flat bars, round tubes and sound barriers cover additional fabricated or site-specific requirements." },
  { question: "Can I buy profiles rather than a finished assembly?", answer: "Yes. Standard and custom pultrusions are profile supply routes, while the window range also has a dedicated finished-unit route. For rails, ladders, platforms and solar supports, agree whether the quotation includes cut lengths, drilled parts, fasteners, fabrication or assembled units. State that scope in the enquiry." },
  { question: "Does an FRP frame automatically meet a thermal target?", answer: "No. Frame geometry, glazing, edge spacers, seals, fixings and the wall connection determine assembly performance. Request the calculation or test for the offered window or facade configuration, including the size and glazing used. A material conductivity value is not a whole-window U-value." },
  { question: "Is one fire report valid for every FRP building product?", answer: "No. Match the report to the offered resin, reinforcement, thickness, surface and tested configuration. Reaction to fire and the fire resistance of a building assembly are different questions. The project team must confirm that the available evidence covers the intended use and the applicable local requirements." },
  { question: "What should be checked for outdoor service?", answer: "Specify UV exposure, moisture, temperature, chemicals and appearance requirements. Review the proposed resin, surface veil or coating, cut-edge treatment, joints and inspection plan. Corrosion resistance does not remove weathering or maintenance considerations, and a service-life claim must be supported for the actual duty." },
  { question: "What information makes a construction enquiry useful?", answer: "Send the building location, application, drawing or dimensions, quantity and delivery destination. Add loads, spans, exposure, fire or thermal targets and the required supply scope when available. A marked-up drawing and a component schedule make it easier to identify the correct product route and missing specification details." },
] as const;
