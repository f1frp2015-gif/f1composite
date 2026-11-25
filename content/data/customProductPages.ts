import { E23_MIN } from "@/lib/catalog/en13706";

/** A data table shown under the configuration cards: reference sizes or design figures with their basis. */
export interface CustomProductData {
  title: string; intro: string; columns: string[]; rows: string[][]; note: string;
  source?: { label: string; href: string };
}

/** Section properties of an equal tee (flange B × depth H, constant wall t), for reference sizes made to order. */
function teeRow(B: number, H: number, t: number): string[] {
  const Af = B * t, As = t * (H - t), A = Af + As;
  const y = (Af * t / 2 + As * (t + (H - t) / 2)) / A; // centroid from the flange top
  const Ix = B * t ** 3 / 12 + Af * (y - t / 2) ** 2 + t * (H - t) ** 3 / 12 + As * (t + (H - t) / 2 - y) ** 2;
  const Iy = t * B ** 3 / 12 + (H - t) * t ** 3 / 12;
  const f = (n: number, d = 1) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  return [`${B} × ${H} × ${t}`, f(A, 0), f(A * 1.9e-3, 2), f(y), f(Ix / 1e4, 1), f(Ix / Math.max(y, H - y) / 1e3, 2), f(Iy / 1e4, 1)];
}
const teeSizes: [number, number, number][] = [[25, 25, 3], [38, 38, 5], [50, 50, 5], [50, 50, 6], [75, 75, 6], [75, 75, 8], [100, 100, 8], [100, 100, 10], [150, 150, 10]];
const lbFtPerFt = (v: number) => `${v.toLocaleString("en-US")} lb·ft/ft (${(v * 4.448e-3).toFixed(1)} kN·m/m)`;

export interface CustomProductPage {
  slug: string; name: string; title: string; description: string; intro: string; use: string; image: string; imageAlt: string;
  data?: CustomProductData;
  /** Describes the drawing and what it does not establish. */
  imageCaption: string;
  status: string;
  options: string[][]; checks: string[][]; rfq: string[]; faq: string[][]; related: string[][];
}

/** One review date for the five custom product pages, shown on each page and in the sitemap. */
export const customProductUpdated = "2026-11-24";

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
        "Solid carbon fiber rods",
        "/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod"
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
        "Check bearing at the bolt holes, pull-through, bond preparation and how the flange transfers force into the stem. Holes across the flange cut the lengthwise fibers, so keep them out of the stem root."
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
        `Not at the same size. E23 fiberglass has a lengthwise modulus of ${E23_MIN.e_l_gpa} GPa against 210 GPa for steel, so a tee of the same dimensions deflects about nine times as much. Use the Ix column in the size table to pick a deeper section, then check the joint.`
      ],
      [
        "Can the flange and stem have different thicknesses?",
        "Yes. The die can give the flange and stem different thicknesses with a radiused corner between them. The thicker leg takes longest to cure, so it sets the line speed."
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
    data: {
      title: "Reference tee sizes and section properties",
      intro: "Equal tees with a constant wall, calculated from the geometry at a laminate density of 1.9 g/cm³. Corner radii are ignored, so real sections differ by a few percent. Each size is made to order on a new die.",
      columns: ["Size B × H × t, mm", "Area, mm²", "Mass, kg/m", "Centroid from flange top, mm", "Ix, cm⁴", "Wx (stem tip), cm³", "Iy, cm⁴"],
      rows: teeSizes.map(([B, H, t]) => teeRow(B, H, t)),
      note: `Material for checks: EN 13706 E23 minimums, ${E23_MIN.e_l_gpa} GPa lengthwise modulus and ${E23_MIN.tensile_l_mpa} MPa lengthwise tensile strength. Ix is about the horizontal axis through the centroid; the stem tip is the extreme fiber, so Wx = Ix / (H − centroid).`,
    },
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
        "Profile depth, effective cover width, laminate and interlock geometry define the wall section; its moment capacity is set by local buckling of the compression flange, so flange width-to-thickness matters as much as depth."
      ],
      [
        "Joints and accessories",
        "Corner pieces, capping, walers, tie connections and sealing arrangements need a coordinated wall detail. Use oversized washers or plates at walers and tie rods to spread point loads into the sheet."
      ],
      [
        "Exposure",
        "Vinyl ester resin for saltwater and aggressive soils, and a UV-stabilized surface veil on the face exposed above the waterline. Heavy ice flow or severe abrasion rules FRP sheets out."
      ]
    ],
    checks: [
      [
        "Geotechnical design",
        "The wall is modelled in sheet-pile software such as SPW911 with soil layers, water levels, slopes, surcharge and scour. Its output moment, shear, wale force and deflection are then checked against the pile section."
      ],
      [
        "Structural verification",
        "Design to characteristic values per ASTM D7290 with allowable-stress safety factors of about 2.5 in bending and 3.0 in shear. Take deflection with the lower of the lengthwise tensile and compressive modulus; deflection often decides the section."
      ],
      [
        "Installation trial",
        "FRP sheets drive with a vibratory hammer in soils with SPT blow counts of about 20 or less. Stiffer ground needs pre-excavation, jetting or a steel driving mandrel; a trial pair of sheets on site shows which."
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
        "The quotation covers the pile sections, caps and connectors made to your drawing. Wall design, driving and the installed performance stay with the project engineer and the piling contractor."
      ]
    ],
    related: [
      [
        "Waterfront retaining wall guide",
        "/applications/frp-waterfront-retaining-walls"
      ],
      [
        "Composite retaining wall types and heights",
        "/resources/blog/composite-retaining-wall"
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
    data: {
      title: "Design figures for FRP sheet-pile walls",
      intro: "Published figures from full-section testing and design practice for pultruded FRP sheet piles. They show why buckling, not material strength, sizes the sheet.",
      columns: ["Item", "Figure", "What it means for the wall"],
      rows: [
        ["Tested moment capacity of one section", lbFtPerFt(16569), "Failure came at a flange compression stress of 15,201 psi (105 MPa), about 30% of the material's 50 ksi (345 MPa) compressive strength: local buckling governed."],
        ["Predicted capacity, same section", `${lbFtPerFt(14472)} by mechanics of materials; ${lbFtPerFt(13128)} by FEA`, "Both methods were conservative against the test, by 13% and 21%."],
        ["Allowable-stress safety factors", "2.0–2.5 bending · 2.0–3.0 shear · 2.5–3.0 connections", "Applied to characteristic values derived per ASTM D7290 (80% lower confidence bound on the 5th percentile)."],
        ["Recommended for design", "2.5 in bending, 3.0 in shear", "Divide the characteristic moment by 2.5 to get the allowable wall moment."],
        ["Modulus for deflection", "Lower of lengthwise tensile and compressive E", "Deflection often governs the section choice."],
        ["Driving", "SPT blow count of about 20 or less", "Above that, pre-excavate or use a driving mandrel."],
      ],
      note: "Moments are per unit length of wall. Converted at 1 lb·ft/ft = 4.448 N·m/m.",
      source: { label: "ACMA Composites Technology Day 2021: FRP sheet piling design and installation (PDF)", href: "https://acmanet.org/wp-content/uploads/2024/02/B1-Troutman-2021-ACMA-CI-Tech-Day-Sheet-Piling-1.pdf" },
    },
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
