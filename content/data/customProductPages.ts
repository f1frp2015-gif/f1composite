export interface CustomProductPage {
  slug: string; name: string; title: string; description: string; intro: string; use: string; image: string; imageAlt: string;
  /** Describes the drawing and what it does not establish. */
  imageCaption: string;
  status: string;
  options: string[][]; checks: string[][]; rfq: string[]; faq: string[][]; related: string[][];
}

/** One review date for the five custom product pages, shown on each page and in the sitemap. */
export const customProductUpdated = "2026-10-03";

export const customProductPages: CustomProductPage[] = [
  {
    slug: "fiberglass-square-rods",
    name: "Fiberglass Square Rods",
    title: "Fiberglass Square Rods | Custom Solid GFRP Bars",
    description: "Specify solid fiberglass square rods for spacers, insulating supports and machined components. Review section size, tolerances, resin and cut lengths.",
    intro: "A solid square section gives fixtures and assemblies flat locating faces on every side. Send F1 Composite your section drawing and service conditions for a custom pultrusion review, including tooling, samples and secondary machining.",
    use: "Insulating spacers, equipment supports, locating blocks and fabricated frames where a solid section and flat contact faces suit the assembly.",
    options: [
      [
        "Cross-section",
        "Equal side lengths, corner radius and dimensional tolerance; a solid bar has no internal cavity."
      ],
      [
        "Material",
        "Glass reinforcement with a resin selected for the actual temperature, chemical exposure and electrical requirements."
      ],
      [
        "Finish and fabrication",
        "Cut lengths, end finish, drilling and slots reviewed against the drawing; exposed fibers and cut edges need an agreed finish."
      ]
    ],
    checks: [
      [
        "Solid bar or hollow tube?",
        "Use a solid bar where machining stock or full bearing faces are needed. A hollow tube can save mass for a frame. Compare stiffness, local bearing and the connection rather than choosing by outside dimensions alone."
      ],
      [
        "Fiber direction and holes",
        "Most continuous fibers run along the rod. Transverse holes and short end distances can govern a connection even when the axial material strength is adequate."
      ],
      [
        "Qualification",
        "Agree on dimensional inspection, straightness, surface acceptance and the relevant mechanical or electrical tests on the offered section before releasing a production order."
      ]
    ],
    rfq: [
      "Side dimension, corner radius and cut length",
      "Drawing with holes, slots and tolerances",
      "Loading direction and temperature or chemical exposure",
      "Electrical acceptance criteria, if applicable",
      "Sample quantity, order volume and destination"
    ],
    faq: [
      [
        "Are square rods the same as square tubes?",
        "No. Square rods are solid throughout; square tubes contain a cavity. Their weight, stiffness and connection details differ."
      ],
      [
        "Can I order a standard size immediately?",
        "Send the requested section first. F1 will confirm tooling availability, material, minimum order and delivery in the quotation; this page is a custom inquiry range."
      ]
    ],
    related: [
      [
        "Square & rectangular tubes",
        "/products/fiberglass-structural-shapes/frp-square-tube"
      ],
      [
        "Solid round rods",
        "/products/fiberglass-structural-shapes/frp-rod"
      ],
      [
        "Flat bars",
        "/products/fiberglass-structural-shapes/frp-flat-bar"
      ]
    ],
    image: "/images/products/custom-range/fiberglass-square-rods.svg",
    imageCaption: "Solid square section with flat faces on every side. Side length, corner radius and tolerances are set by the approved drawing.",
    imageAlt: "Schematic of fiberglass square rods; conceptual geometry, not a production drawing",
    status: "Custom inquiry · specification review required"
  },
  {
    slug: "fiberglass-t-profiles",
    name: "Fiberglass T Profiles",
    title: "Fiberglass T Profiles | Custom Pultruded Tee Sections",
    description: "Custom pultruded fiberglass T profiles for panel supports, stiffeners and frames. Define flange, stem, resin, connections and qualification requirements.",
    intro: "A pultruded tee combines a flange for attachment with a perpendicular stem for support or separation. F1 Composite reviews the flange width, stem depth, wall thickness and connections against your drawing before confirming a custom production scope.",
    use: "Panel backing, longitudinal stiffeners, equipment frames and support ledges where one flange and one stem fit the available space.",
    options: [
      [
        "Section geometry",
        "Flange width and thickness, overall depth, stem thickness and internal radii. Specify symmetry or any intentional offset."
      ],
      [
        "Support interface",
        "Fastener positions, contact width, adhesive bond area and cutouts, with the supported panel or equipment identified."
      ],
      [
        "Material and surface",
        "Resin and reinforcement chosen for exposure and loading; surface veil, color and bonding preparation agreed in the specification."
      ]
    ],
    checks: [
      [
        "Load path",
        "A tee is not symmetric about both axes. Identify the loaded flange, restraint and load eccentricity; bending, twisting and local flange behavior may need separate checks."
      ],
      [
        "Joint detailing",
        "Check bearing, pull-through, bond preparation and how the flange transfers force into the stem. A coupon strength is not a rated joint capacity."
      ],
      [
        "Tooling and samples",
        "Approve the section drawing and inspection plan before tooling. Review trial lengths for dimensions, straightness and assembly fit before the production run."
      ]
    ],
    rfq: [
      "Dimensioned T-section and required length",
      "Panel or frame assembly drawing",
      "Span, load direction and connection details",
      "Exposure, fire or electrical requirements",
      "Annual demand, first order quantity and destination"
    ],
    faq: [
      [
        "Can a T profile replace a steel tee directly?",
        "Replacement needs a new section and connection check using the proposed GFRP properties. Match deflection, stability and joint behavior as well as strength."
      ],
      [
        "Can the flange and stem have different thicknesses?",
        "Yes, this can be reviewed as a custom geometry. Tooling feasibility, reinforcement and corner transitions must be checked before a section is confirmed."
      ]
    ],
    related: [
      [
        "Custom profile development",
        "/products/custom-pultruded-profiles"
      ],
      [
        "Angles",
        "/products/fiberglass-structural-shapes/frp-angle"
      ],
      [
        "Channels",
        "/products/fiberglass-structural-shapes/frp-channel"
      ]
    ],
    image: "/images/products/custom-range/fiberglass-t-profiles.svg",
    imageCaption: "Flange and stem of a pultruded tee. Dimensions, wall thicknesses and radii are set by the approved section drawing.",
    imageAlt: "Schematic of fiberglass T profiles; conceptual geometry, not a production drawing",
    status: "Custom inquiry · specification review required"
  },
  {
    slug: "frp-sheet-piling",
    name: "FRP Sheet Piling",
    title: "FRP Sheet Piling | Custom Composite Waterfront Profiles",
    description: "Review custom FRP sheet piling for waterfront walls and retaining structures. Specify interlocks, site conditions, structural evidence and installation scope.",
    intro: "Interlocking composite sheet piles form a continuous wall for projects where water and soil exposure drive material selection. Submit the wall layout and site information to F1 Composite for a section and supply feasibility review; dimensions and availability are confirmed per project.",
    use: "Waterfront retaining walls, canal edges, erosion-control structures and cutoff walls subject to project design and installation assessment.",
    options: [
      [
        "Wall section",
        "Profile depth, effective cover width, laminate and interlock geometry define the wall section. Request properties for the complete offered profile."
      ],
      [
        "Joints and accessories",
        "Corner pieces, capping, walers, tie connections and sealing arrangements need a coordinated wall detail. Interlocking alone does not establish watertightness."
      ],
      [
        "Exposure",
        "Freshwater or saltwater, soil chemistry, sunlight, abrasion and temperature inform the material and protective finish."
      ]
    ],
    checks: [
      [
        "Geotechnical design",
        "Soil layers, water levels, surcharge, scour and required embedment must be assessed for the whole wall. An ordinary profile beam calculator cannot design a retaining wall."
      ],
      [
        "Structural verification",
        "Review long-term bending, shear, local buckling and interlock behavior using section-specific evidence. Check anchors, walers and cap connections as part of the same load path."
      ],
      [
        "Installation trial",
        "Confirm handling, driving equipment, protection of the pile head and interlock engagement. Trial installation should establish feasibility in the actual ground before bulk procurement."
      ]
    ],
    rfq: [
      "Wall plan, retained height and top level",
      "Geotechnical report, water levels and scour allowance",
      "Design loads, design life and governing project requirements",
      "Anchors, walers, corners and sealing scope",
      "Pile lengths, quantities, installation method and destination"
    ],
    faq: [
      [
        "Does an interlocking FRP wall stop all water?",
        "No. Seepage depends on the joint design, sealant, installation and hydraulic conditions. Specify a leakage criterion and verification method when a cutoff function is required."
      ],
      [
        "Is F1 quoting a complete installed seawall?",
        "The initial inquiry is for custom sections and agreed accessories. Engineering, installation and performance responsibilities must be defined separately in the quotation."
      ]
    ],
    related: [
      [
        "Waterfront retaining wall guide",
        "/applications/frp-waterfront-retaining-walls"
      ],
      [
        "Marine & offshore",
        "/industries/marine"
      ],
      [
        "Custom profile development",
        "/products/custom-pultruded-profiles"
      ]
    ],
    image: "/images/products/custom-range/frp-sheet-piling.svg",
    imageCaption: "Interlocking sheet-pile section with its repeating wall width. Section depth, interlock detail and embedment are not established by the drawing.",
    imageAlt: "Schematic of FRP sheet piling; conceptual geometry, not a production drawing",
    status: "Custom inquiry · specification review required"
  },
  {
    slug: "frp-rock-bolts",
    name: "FRP Rock Bolts",
    title: "FRP Rock Bolts | GFRP Ground Support Inquiry",
    description: "Specify GFRP rock bolts for tunnel, mine and ground-support projects. Review bar geometry, plates, nuts, grout interfaces and system qualification.",
    intro: "GFRP rock bolts are a specialist ground-support assembly: the bar, nut, bearing plate and grout interface must work together. Send F1 Composite the support specification for a sourcing and qualification review before confirming a supply package.",
    use: "Tunnel face reinforcement, mine support and selected ground-anchor applications where the design calls for qualified GFRP reinforcement or cuttable components.",
    options: [
      [
        "Bar configuration",
        "Specify solid or hollow construction, diameter, thread or surface geometry, length and any coupler arrangement. Each construction needs its own qualification."
      ],
      [
        "End assembly",
        "Nut, plate, washer and connection details must match the bar and required installation procedure. Assess the full assembly capacity."
      ],
      [
        "Bonding and installation",
        "Identify cementitious grout or resin cartridge, borehole geometry, installation equipment, cure conditions and acceptance testing."
      ]
    ],
    checks: [
      [
        "System capacity",
        "Evaluate tensile rupture, bar shear across joints or bedding planes, thread stripping, plate bearing, bond failure and displacement. The nominal tensile strength of a bar alone is insufficient to specify the anchor."
      ],
      [
        "Temporary or permanent support",
        "State service duration, sustained load, groundwater chemistry and temperature. For permanent support, expect a sustained-stress limit well below the short-term tensile strength and request creep-rupture evidence (ASTM D7337/D7337M) for the offered bar."
      ],
      [
        "Project acceptance",
        "The responsible ground-support designer defines the support pattern and acceptance tests. Cut-through behavior, mine fire requirements and other special conditions require project-specific confirmation."
      ]
    ],
    rfq: [
      "Support design and temporary or permanent duty",
      "Bar diameter, construction, length and quantity",
      "Required assembly load and displacement criteria",
      "Nut, plate, coupler and grout specifications",
      "Groundwater, temperature and project acceptance documents"
    ],
    faq: [
      [
        "Can ordinary GFRP concrete rebar be used as a rock bolt?",
        "Only a qualified ground-support design can establish suitability. A concrete reinforcing bar does not automatically include the thread, nut, plate and bond performance needed for a rock-bolt assembly."
      ],
      [
        "Are cuttable bolts automatically approved for tunneling?",
        "No. The tunnel designer and equipment requirements determine acceptability. Submit the cutting, load, installation and testing requirements with the inquiry."
      ]
    ],
    related: [
      [
        "Mining & tunneling guide",
        "/applications/frp-mining-tunneling"
      ],
      [
        "Concrete reinforcement",
        "/products/frp-rebar"
      ],
      [
        "Solid pultruded rods",
        "/products/fiberglass-structural-shapes/frp-rod"
      ]
    ],
    image: "/images/products/custom-range/frp-rock-bolts.svg",
    imageCaption: "Bar, bond interface, plate and nut shown as one assembly. The drawing does not establish bar size, thread form or assembly capacity.",
    imageAlt: "Schematic of FRP rock bolts; conceptual geometry, not a production drawing",
    status: "Custom inquiry · specification review required"
  },
  {
    slug: "frp-fencing",
    name: "FRP Fencing",
    title: "FRP Fencing | Fiberglass Posts, Panels & Gates",
    description: "Plan FRP fencing with fiberglass posts, pickets or grating infill. Specify panel layout, gates, connections, exposure and project acceptance requirements.",
    intro: "Build a fence specification around the boundary it protects. F1 Composite reviews pultruded posts and rails, pickets or grating infill, and any agreed fabrication as a coordinated package with the gate and foundation interfaces defined.",
    use: "Utility boundaries, water-treatment sites, industrial compounds and coastal facilities where corrosion exposure and the fence layout guide selection.",
    options: [
      [
        "Picket layout",
        "Individual profiles connected to rails, with spacing, height and exposed ends set by the boundary requirements."
      ],
      [
        "Grating infill",
        "Molded or pultruded grating held within a frame. Select aperture, edge treatment, retention and panel orientation for the application."
      ],
      [
        "Posts and gates",
        "Post sections, base or embedment details, hinges, latches and gate frames sized for the loading and operating duty."
      ]
    ],
    checks: [
      [
        "Wind and stability",
        "Assess wind on the chosen infill, post bending, rail deflection and foundation reactions. A denser panel may require a different post spacing or foundation."
      ],
      [
        "Electrical interfaces",
        "GFRP profiles can form part of an insulating arrangement, but metal hardware, contamination, moisture and clearances affect the completed boundary. Specify the required electrical review and tests."
      ],
      [
        "Access and security",
        "Define openings, anti-climb requirements, gate operation and inspection access. A perimeter fence and a fall-protection guardrail have different acceptance requirements."
      ]
    ],
    rfq: [
      "Boundary plan, panel heights and total length",
      "Infill type, openings and appearance",
      "Wind criteria, post spacing and foundation details",
      "Gate openings, hinges, latches and hardware material",
      "Electrical, security and environmental requirements"
    ],
    faq: [
      [
        "Can FRP fencing also serve as a safety handrail?",
        "Only if the complete assembly is designed and qualified for that duty. Use the handrail product page for fall-protection and platform-edge requirements."
      ],
      [
        "Is every component nonmetallic?",
        "The agreed package may contain metal hinges, anchors or fasteners. Specify component materials and the full electrical requirements before a quotation is finalized."
      ]
    ],
    related: [
      [
        "Utility & industrial fencing guide",
        "/applications/frp-utility-fencing"
      ],
      [
        "Handrail systems",
        "/products/frp-handrail-systems"
      ],
      [
        "Molded grating",
        "/products/molded-frp-grating"
      ]
    ],
    image: "/images/products/custom-range/frp-fencing.svg",
    imageCaption: "Posts, rails and picket infill. Post spacing, foundations and gate hardware are not established by the drawing.",
    imageAlt: "Schematic of FRP fencing; conceptual geometry, not a production drawing",
    status: "Custom inquiry · specification review required"
  }
];
