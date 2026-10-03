import { specialistApplicationPages } from "@/content/data/pultrusionGuideIndex";

export interface ApplicationPage {
  slug: string;
  calculator?: false;
  supplyScope?: string;
  lastModified: string;
  title: string;
  shortTitle: string;
  description: string;
  h1: string;
  intro: string;
  environment: string;
  image: string;
  imageAlt: string;
  imageSize?: { width: number; height: number };
  imageCaption?: string;
  /** Where a photo comes from, shown on its figure and on cards: "Project photo", "Reference photo" … */
  imageNote?: string;
  recommendedProfiles: string[];
  resinSystem: string;
  standards: string[];
  designChecks: Array<{ title: string; body: string }>;
  rfqInputs: string[];
  related: Array<{ href: string; label: string }>;
  /** Optional long-form section for pages that carry real search demand. */
  deepDive?: { heading: string; paragraphs: string[] };
}

export const applicationPages: ApplicationPage[] = [
  ...specialistApplicationPages,
  {
    slug: "frp-waterfront-retaining-walls",
    shortTitle: "Waterfront retaining walls",
    title: "FRP Waterfront Retaining Walls | Sheet Pile Specification",
    description: "Plan composite sheet piling for canal edges and waterfront retaining walls. Define ground conditions, water levels, interlocks, anchors and supply scope.",
    h1: "FRP profiles for waterfront retaining walls",
    intro: "A waterfront wall connects ground engineering, hydraulic conditions and a structural section. Use this guide to prepare a custom FRP sheet-pile inquiry with the site information needed to evaluate a suitable wall system.",
    environment: "Canal banks, marina boundaries and waterfront retaining structures where the designer is evaluating a composite wall.",
    supplyScope: "The inquiry covers interlocking sections and agreed caps, corner pieces or connection components. Confirm design responsibility, geotechnical work, accessories and installation separately in the project scope.",
    recommendedProfiles: [
      "Interlocking sheet-pile sections selected for the wall geometry",
      "Capping sections and corner transitions matched to the interlocks",
      "Walers and connection components reviewed as part of the anchor layout"
    ],
    resinSystem: "Provide soil and water chemistry, salinity, abrasion, temperature and UV exposure. Review durability evidence and resin suitability for both submerged and exposed portions.",
    designChecks: [
      {
        title: "Ground and water",
        body: "Provide soil strata, groundwater and surface-water levels, surcharge and scour conditions. The designer establishes embedment, drainage and global stability."
      },
      {
        title: "Wall and connections",
        body: "Use properties for the offered section to check long-term bending, shear, local stability, interlock loads and anchor connections. Define movement and leakage acceptance criteria."
      },
      {
        title: "Installation access",
        body: "Review delivery lengths, lifting points, working space and the driving method. A trial in representative ground helps establish protection and acceptance procedures."
      }
    ],
    rfqInputs: [
      "Wall plan, sections and retained levels",
      "Geotechnical information and design water levels",
      "Loads, movement limits and required design life",
      "Tie rods, walers, corners and sealing requirements",
      "Proposed installation method, quantities and destination"
    ],
    related: [
      {
        label: "FRP sheet piling",
        href: "/products/frp-sheet-piling"
      },
      {
        label: "Marine & offshore",
        href: "/industries/marine"
      },
      {
        label: "Deck panels",
        href: "/products/frp-deck-panels"
      }
    ],
    deepDive: {
      heading: "Design the wall for stiffness, sustained pressure and its exposed face",
      paragraphs: [
        "Serviceability usually governs a composite wall. The longitudinal modulus of an EN 13706 E23 laminate is 23 GPa, about one-ninth of structural steel, so wall deflection and anchor movement need checking before strength. Earth and water pressure act for the whole service life, which brings creep deflection and a sustained-stress limit into the design; request creep evidence for the offered section rather than relying on short-term coupon values.",
        "Interlocks transfer shear between piles and control seepage, and the zone between low water and the cap sees UV, abrasion, impact and wet-dry cycling. Review durability evidence for the submerged and the exposed portions separately, and confirm the driving method, since thin-walled sections often need a mandrel or guide frame.",
        "Where a boardwalk or deck meets the wall, define the interface between the wall cap, deck supports and any railing: how loads transfer into the wall, whether connections accommodate movement and which party designs each interface."
      ]
    },
    lastModified: "2026-10-03",
    image: "/images/applications/frp-waterfront-retaining-walls.svg",
    imageAlt: "Section through a waterfront retaining wall showing retained ground, the water level and an interlocking FRP sheet-pile wall",
    imageNote: "Concept diagram",
    imageCaption: "Retained ground, water level and the interlocking wall. The drawing does not establish embedment, section size or anchor layout.",
    imageSize: {
      width: 900,
      height: 600
    },
    standards: ["ASCE/SEI 74-23 · pultruded members", "CEN/TS 19101:2022 · FRP structures", "ASTM D7290 · characteristic values", "EN 1997-1 · geotechnical design", "USACE EM 1110-2-2504 · sheet pile walls"],
    calculator: false
  },
  {
    slug: "frp-mining-tunneling",
    shortTitle: "Mining & tunneling support",
    title: "GFRP for Mining & Tunneling | Ground Support Planning",
    description: "Prepare GFRP ground-support and tunnel-access inquiries. Separate rock-bolt qualification, cutting requirements and underground access components.",
    h1: "GFRP components for mining & tunneling",
    intro: "Underground projects use composites for different tasks, from ground reinforcement to corrosion-exposed access components. Define the support duty and approval requirements first, then prepare a separate specification for each component package.",
    environment: "Tunnel face reinforcement and selected mine or underground civil works where the project design permits qualified GFRP components.",
    supplyScope: "Submit rock-bolt assemblies for a sourcing and qualification review. Access profiles, grating and cable-support components can be reviewed as separate packages. Ground-support design and site installation responsibilities must be assigned explicitly.",
    recommendedProfiles: [
      "GFRP rock-bolt assemblies with matching nuts and bearing plates, qualified as a system for the project",
      "Grating and support sections for agreed underground access areas",
      "Cable-support profiles with the required fire and environmental evidence"
    ],
    resinSystem: "Identify groundwater chemistry, temperature and underground fire or smoke requirements. Antistatic performance, where required, must be supported for the offered material and assembly; ordinary GFRP is not automatically suitable.",
    designChecks: [
      {
        title: "Support design",
        body: "The responsible designer sets the support pattern, loads, acceptable displacement and service duration. Qualify the bolt, plate, nut and grout interface together."
      },
      {
        title: "Cut-through zones",
        body: "Identify excavation sequences and the equipment that will encounter the reinforcement. Confirm cutting behavior and embedded hardware with the project team."
      },
      {
        title: "Underground acceptance",
        body: "State the owner’s fire, smoke, electrical, durability and site-test requirements. Separate temporary excavation support from permanent ground support."
      }
    ],
    rfqInputs: [
      "Tunnel or mine support specification and design duty",
      "Bolt assembly geometry and required loads",
      "Grout system and installation method",
      "Cut-through locations and machinery interface",
      "Fire, antistatic and other owner acceptance requirements"
    ],
    related: [
      {
        label: "FRP rock bolts",
        href: "/products/frp-rock-bolts"
      },
      {
        label: "Cable trays & supports",
        href: "/applications/frp-cable-tray-supports"
      },
      {
        label: "Pultruded grating",
        href: "/products/frp-gratings"
      },
      {
        label: "Solid pultruded rods",
        href: "/products/fiberglass-structural-shapes/frp-rod"
      }
    ],
    deepDive: {
      heading: "Qualify the assembly before scheduling bulk supply",
      paragraphs: [
        "A bolt’s longitudinal tensile result describes only one possible limit. Nut engagement, plate bearing, grout bond and installation quality may govern the installed support. Define test methods and acceptance criteria for the full assembly.",
        "Permanent support carries sustained load for its whole service life, so creep rupture must be covered. ASTM D7337/D7337M tests FRP bars for it, and concrete design codes limit sustained stress in GFRP to a fraction of the design tensile strength (0.30 in ACI 440.11-22).",
        "Keep trial quantities and production release as separate milestones. Record the exact bar, accessories and installation materials used in qualification so a later substitution does not silently change the approved system."
      ]
    },
    lastModified: "2026-10-03",
    image: "/images/applications/frp-mining-tunneling.svg",
    imageAlt: "Diagram of a GFRP ground-support assembly in rock, labeled as qualified as a system",
    imageNote: "Concept diagram",
    imageCaption: "Bolt, plate and nut in grouted ground, shown as one assembly to qualify. The drawing does not establish a support pattern or bolt capacity.",
    imageSize: {
      width: 900,
      height: 600
    },
    standards: ["ASTM D7205/D7205M · bar tensile", "ASTM D7337/D7337M · creep rupture", "ISO 10406-1:2025 · FRP bar test methods"],
    calculator: false
  },
  {
    slug: "frp-utility-fencing",
    shortTitle: "Utility & industrial fencing",
    title: "FRP Utility Fencing | Substation & Industrial Boundaries",
    description: "Plan fiberglass fences for utility and industrial boundaries. Review infill, posts, gates, foundations, electrical interfaces and maintenance access.",
    h1: "FRP fencing for utility & industrial boundaries",
    intro: "A boundary fence must fit the site’s access, loading and electrical requirements. Coordinate fiberglass posts, rails and infill with gate hardware and foundations to define a complete, reviewable fence package.",
    environment: "Substations, water-treatment compounds, industrial equipment enclosures and coastal utility sites.",
    supplyScope: "Specify profile lengths, fabricated fence panels or an agreed component kit. Confirm gate hardware, anchors, foundations and installation as separate line items in the quotation.",
    recommendedProfiles: [
      "Pultruded square tubes for posts and fence frames",
      "Pickets or grating infill selected for the opening and security requirements",
      "Rails and connection plates matched to the panel layout"
    ],
    resinSystem: "Match resin and surface protection to weather, UV, salt spray and process chemicals. Electrical performance belongs to the offered material and complete assembly, including hardware and surface condition.",
    designChecks: [
      {
        title: "Boundary geometry",
        body: "Define height, terrain changes, infill openings and access gates. The utility owner sets clearances, security requirements and maintenance access."
      },
      {
        title: "Posts and foundations",
        body: "Check wind loading, post bending, rail deflection, gate reactions and anchorage. Provide foundation details or assign their design before fabrication."
      },
      {
        title: "Electrical coordination",
        body: "Identify metallic hardware and connections to surrounding equipment. Have the project electrical designer assess clearances, bonding and the complete fence arrangement."
      }
    ],
    rfqInputs: [
      "Site boundary plan, levels and heights",
      "Panel type, aperture and post spacing",
      "Wind criteria and foundation interfaces",
      "Gate schedule and hardware materials",
      "Electrical and owner approval requirements"
    ],
    related: [
      {
        label: "FRP fencing",
        href: "/products/frp-fencing"
      },
      {
        label: "Utility crossarms",
        href: "/applications/frp-utility-crossarms"
      },
      {
        label: "Handrail systems",
        href: "/products/frp-handrail-systems"
      }
    ],
    deepDive: {
      heading: "Choose the infill before finalizing the posts",
      paragraphs: [
        "Pickets, grating and closed panels present different areas to the wind and create different visibility and access conditions. Finalize those requirements before choosing a post section or repeating a spacing from another site.",
        "Gate leaves concentrate loads at hinges and posts. Include operating loads, latch alignment and the surrounding foundation in the review, with replacement and inspection access for moving parts."
      ]
    },
    lastModified: "2026-10-03",
    image: "/images/applications/frp-utility-fencing.svg",
    imageAlt: "Diagram of a fiberglass fence panel with posts, rails and pickets",
    imageNote: "Concept diagram",
    imageCaption: "Posts, rails and picket infill. Post spacing, foundations and electrical clearances are not established by the drawing.",
    imageSize: {
      width: 900,
      height: 600
    },
    standards: ["ASCE 7-22 Ch. 29 · wind on freestanding walls", "EN 1991-1-4 §7.4 · wind on fences", "IEC 61936-1 / EN 50522 · substation fences and earthing", "OSHA 1910.29 · guardrails"],
    calculator: false
  },
  {
    slug: "frp-swimming-pool-facilities",
    shortTitle: "Swimming pool facilities",
    title: "FRP for Swimming Pools | Access & GFRP Reinforcement",
    description: "Specify FRP access components and GFRP reinforcement for swimming pool facilities, with wet-area surfaces, chemical exposure and electrical coordination.",
    h1: "FRP components for swimming pool facilities",
    intro: "Pool facilities combine wet public areas, chemical-handling rooms and reinforced concrete. Match each location to its own product and acceptance criteria, from maintenance platforms to the reinforcement specified for the pool shell.",
    environment: "Pool plant rooms, equipment access platforms and engineered pool-shell reinforcement packages. Public walking surfaces require a finish qualified for their actual use.",
    supplyScope: "F1 can review profiles, grating and reinforcement inquiries against the project schedule. The structural designer, pool designer and electrical designer define the accepted system and interfaces.",
    recommendedProfiles: [
      "Grating and support profiles for plant-room access and equipment platforms",
      "Handrail components with a suitable surface finish and connection design",
      "GFRP concrete reinforcing bars, factory-formed bends and mesh per an engineered schedule"
    ],
    resinSystem: "Provide the chemical names, concentrations, cleaning agents, temperature and whether exposure is splash, vapor or immersion. Review grade-specific compatibility instead of assuming all fiberglass tolerates all pool chemicals.",
    designChecks: [
      {
        title: "Wet surfaces",
        body: "Specify footwear or barefoot use, openings, edge finish, cleanability and the required slip test. An industrial gritted surface may be unsuitable for barefoot public areas."
      },
      {
        title: "Pool-shell design",
        body: "GFRP reinforcing bars require a design using their own properties, bond and bend details. Confirm crack control, cover and water-retaining requirements with the structural designer."
      },
      {
        title: "Electrical and access",
        body: "A GFRP-reinforced shell has no reinforcing steel to serve as the bonding grid, so the electrical design must provide its own equipotential bonding, such as the copper grid of NEC 680.26(B)(1)(b) or the supplementary bonding of IEC 60364-7-702. Metallic equipment and accessories still need the project electrical design."
      }
    ],
    rfqInputs: [
      "Facility layout and intended use of each component",
      "Load, span and support details for access areas",
      "Bar schedule and approved concrete reinforcement design",
      "Chemical exposure and surface acceptance requirements",
      "Electrical interfaces, quantities and destination"
    ],
    related: [
      {
        label: "GFRP rebar & mesh",
        href: "/products/frp-rebar"
      },
      {
        label: "Molded FRP grating",
        href: "/products/molded-frp-grating"
      },
      {
        label: "Handrail systems",
        href: "/products/frp-handrail-systems"
      }
    ],
    deepDive: {
      heading: "Separate public poolside finishes from maintenance access",
      paragraphs: [
        "Maintenance staff in footwear and barefoot visitors interact with surfaces differently. Define the user, cleaning regime and wet slip criteria for every area rather than extending one industrial grating specification throughout the facility.",
        "For concrete reinforcement, fix the complete bar schedule before manufacture. Factory-formed bends, laps, supports and placement details must be coordinated with the pool design; do not improvise field bending of cured GFRP bars."
      ]
    },
    lastModified: "2026-10-03",
    image: "/images/applications/frp-swimming-pool-facilities.svg",
    imageAlt: "Section through a pool shell with reinforcement placed to an engineered schedule",
    imageNote: "Concept diagram",
    imageCaption: "Pool shell with reinforcement to an engineered schedule. Bar size, cover and the bonding arrangement are not established by the drawing.",
    imageSize: {
      width: 900,
      height: 600
    },
    standards: ["EN 15288-1/-2 · public pools", "EN 16165 Annex A · barefoot slip", "NEC Art. 680 / IEC 60364-7-702 · bonding", "ACI 440.11-22 · GFRP-reinforced concrete"],
    calculator: false
  },
  {
    slug: "agriculture-horticulture-stakes",
    lastModified: "2026-09-21",
    title: "Fiberglass Stakes for Agriculture & Horticulture",
    shortTitle: "Agriculture & horticulture stakes",
    description: "Plan fiberglass stakes for nurseries, vineyards, orchards and crops. Compare configurations, qualify samples and prepare a bulk planting stake inquiry.",
    h1: "Fiberglass stakes for agriculture & horticulture",
    intro: "Plan plant support for nurseries, vineyards, young orchards and growing programs. Match F1 fiberglass stakes to your crop, field conditions and planting schedule—from initial selection to sample approval and bulk supply.",
    environment: "Nurseries, vineyards, young orchards, vegetable and flower production, and compatible tree-shelter programs.",
    image: "/images/products/fiberglass-stakes/frp-stakes-vineyard-training.webp",
    imageAlt: "Vineyard row with fiberglass stakes supporting young vine training",
    imageSize: { width: 1536, height: 1024 },
    imageCaption: "Fiberglass stakes for young vine training. Confirm stake geometry and attachments for the project.",
    recommendedProfiles: ["Solid round pultruded fiberglass stakes with agreed diameter, cut length, surface and end treatment"],
    resinSystem: "Confirm resin, UV package and finish against actual outdoor, irrigation and chemical exposure.",
    standards: [],
    designChecks: [
      { title: "Plant and support assembly", body: "Review exposed height, stiffness, soil, embedment and tie or shelter interface before choosing the rod." },
    ],
    rfqInputs: ["Crop and growth stage", "Dimensions, soil, wind and attachments", "Quantity, destination and planting date"],
    related: [{ href: "/products/fiberglass-stakes", label: "Fiberglass stakes" }],
  },
  {
    slug: "frp-cable-tray-supports",
    lastModified: "2026-09-21",
    title: "FRP Cable Trays & Cable Ladders | Selection Guide",
    shortTitle: "FRP cable trays & ladders",
    description:
      "Compare FRP cable trays and cable ladders for corrosive environments. Define tray bases, ladder rungs, resins, supports, fittings and project requirements.",
    h1: "FRP cable trays & cable ladders",
    intro:
      "F1 Composite supplies pultruded fiberglass profiles and agreed fabricated support components for cable routes in corrosive environments. Define whether the inquiry covers raw profiles, fabricated supports or a complete tray package, with system availability and documentation confirmed in the quotation.",
    environment:
      "Best fit: substations, tunnels, wastewater plants, chemical plants, coastal utilities, and facilities where non-conductive structural members simplify installation and maintenance.",
    image: "/images/applications/frp-cable-ladder-gray-product.webp",
    imageAlt:
      "Gray pultruded fiberglass cable ladder with channel side rails and transverse rungs",
    imageSize: { width: 1536, height: 1024 },
    imageCaption: "Side rails, rungs and splices vary by system; confirm the offered configuration in the quotation.",
    recommendedProfiles: [
      "Channel sections for tray stringers and wall-mounted supports",
      "Angles for cleats, ledgers, and bracing",
      "Square tube for posts and free-standing frames",
      "Custom pultruded brackets and fiberglass strut for repeat modular assemblies",
    ],
    resinSystem:
      "Evaluate isophthalic polyester or vinyl ester against the actual chemicals, concentrations, temperature and exposure duration. State fire, smoke and toxicity requirements separately and confirm evidence for the offered resin and system.",
    standards: ["IEC 61537 · system scope", "UL 568 · nonmetallic trays", "EN 13706 · profiles"],
    designChecks: [
      {
        title: "Support spacing and serviceability",
        body: "Size channels and brackets from the loaded tray span, not from tray width alone. Cable mass, future fill allowance, splice position, and the project deflection limit all affect the support spacing.",
      },
      {
        title: "Fire and electrical scope",
        body: "Confirm flame-spread and smoke requirements for the route. FRP supports are electrically non-conductive, but cables, metallic trays, fasteners, bonding, and lightning protection still follow the electrical engineer's design.",
      },
      {
        title: "Connections and local loads",
        body: "Wall brackets, post bases, and tray clamps introduce bearing and pull-out loads that are not represented by a simple beam-span check. State hole patterns and edge distances before fabrication release.",
      },
    ],
    rfqInputs: [
      "Tray width, support spacing, and total route length",
      "Cable load per meter and any concentrated maintenance loads",
      "Chemical, humidity, UV, and temperature exposure",
      "Fire rating or electrical isolation requirements",
      "Preferred connection method: bolted, bonded, or hybrid",
    ],
    related: [
      { href: "/products/fiberglass-structural-shapes/frp-channel", label: "FRP channels" },
      { href: "/products/fiberglass-structural-shapes/frp-angle", label: "FRP angles" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
      { href: "/industries/energy", label: "Energy applications" },
      { href: "/case-studies/water-treatment-cable-tray", label: "Water-treatment cable tray case study" },
    ],
  },
  {
    slug: "frp-utility-crossarms",
    lastModified: "2026-09-28",
    title: "FRP Utility Crossarms | Overhead Distribution Guide",
    shortTitle: "FRP utility crossarms",
    description: "Specify pultruded fiberglass crossarms for overhead distribution: pole geometry, conductor loads, fittings, electrical performance and qualification evidence.",
    h1: "FRP crossarms for overhead power distribution",
    intro: "Plan a fiberglass crossarm around the complete pole assembly. Start with conductor arrangement, structural actions and electrical clearances, then define the profile, holes, brackets, insulators and evidence required by the utility.",
    environment: "Overhead distribution pole replacements, new lines and coastal or humid networks where a qualified composite crossarm may reduce exposure to timber decay or steel corrosion.",
    image: "/images/applications/frp-utility-crossarm-schematic.svg",
    imageAlt: "Schematic utility pole with a rectangular FRP crossarm, three insulators, conductors, center mount and braces",
    imageNote: "Concept schematic · not a construction drawing",
    imageCaption: "Typical tangent-pole arrangement. Insulator positions, hardware and member capacity depend on the approved utility drawing and tested assembly.",
    recommendedProfiles: ["Pultruded rectangular or square hollow crossarm profile to an approved drawing", "Factory-cut and drilled members with specified end treatment", "Braces, mounts and hardware only when included in the agreed supply scope"],
    resinSystem: "Specify the actual glass reinforcement, resin, surface protection, moisture control and cut-edge treatment for the site. Request electrical and weathering evidence for the offered laminate and assembly; a material name is not a voltage rating.",
    standards: ["ASTM D8019 · assembled flexure", "ASTM D2303 · tracking and erosion", "ASTM G154 · UV exposure", "Utility / local line code"],
    designChecks: [
      { title: "Phase and line loads", body: "Check vertical weight and ice, transverse wind and angle loads, and longitudinal loads at dead ends or broken-wire cases as required by the utility." },
      { title: "Complete connection", body: "Verify bending and deflection with the actual pole mount, braces, drilled holes, local bearing, fasteners and insulator hardware." },
      { title: "Electrical and weathering", body: "Coordinate phase-to-phase and phase-to-ground clearances, wet or contaminated surface behavior, UV exposure and water ingress at ends and holes." },
    ],
    rfqInputs: ["Utility standard drawing and pole arrangement", "Voltage class, conductor / insulator layout and clearances", "Load cases and required serviceability limits", "Crossarm section, length, hole schedule and connection details", "Resin, UV, electrical and test-document requirements", "Quantity, destination and requested supply scope"],
    related: [
      { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "Square and rectangular FRP tubes" },
      { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
      { href: "/industries/energy", label: "Energy and utilities" },
    ],
  },
  {
    slug: "frp-cooling-tower-profiles",
    lastModified: "2026-07-30",
    title: "FRP Cooling Tower Profiles — Corrosion-Resistant",
    shortTitle: "FRP cooling tower profiles",
    description:
      "Pultruded FRP cooling tower profiles for wet, chlorinated and high-humidity structures: beams, tubes, louvers, handrails and access members.",
    h1: "FRP cooling tower profiles for wet and chlorinated service",
    intro:
      "Cooling towers attack galvanized steel through constant humidity, chlorides, biocides, and wet-dry cycling. F1 Composite supplies pultruded beams, tubes, angles, louvers, and grating supports in fiberglass that keep structural stiffness while removing corrosion-driven maintenance.",
    environment:
      "Best fit: industrial cooling towers, power plant cooling systems, HVAC towers, chemical plants, and replacement programs where steel members require repeated recoating.",
    image: "/images/industries/industrial-cooling-tower-walkway.webp",
    imageAlt:
      "Cooling tower access walkway with FRP grating, yellow handrails and structural supports above the water basin",
    imageSize: { width: 1536, height: 1024 },
    imageCaption: "Cooling tower access above the water basin. Member sizes, resin and connections require project design.",
    recommendedProfiles: [
      "I-beams and channels for primary support members",
      "Square tubes for frames, posts, and bracing",
      "Angles for edge supports and louver framing",
      "Custom thin-wall pultrusions for drift eliminators and louvers",
    ],
    resinSystem:
      "Vinyl ester is recommended for chlorinated water, high humidity, and aggressive cooling tower chemistry. Isophthalic polyester can be used for mild HVAC towers with controlled water treatment.",
    standards: ["EN 13706", "ASTM D3917", "ASTM D638", "ASTM D790"],
    designChecks: [
      {
        title: "Water chemistry and temperature",
        body: "Provide chloride concentration, pH, biocide program, operating temperature, and cleaning chemicals. Resin selection must be checked against the combined exposure rather than against humidity alone.",
      },
      {
        title: "Buckling and sustained load",
        body: "Columns, diagonal braces, and fan-deck members require global and local buckling checks. Permanent equipment and casing loads also require the applicable long-duration design factors.",
      },
      {
        title: "Connections in saturated service",
        body: "Connection plates, bolt bearing, drainage details, and cut-edge sealing need to be coordinated so trapped water and repeated wet-dry cycling do not create avoidable local damage.",
      },
    ],
    rfqInputs: [
      "Cooling tower type and operating temperature range",
      "Water chemistry: chlorides, pH, biocides, and chemical dosing",
      "Member spans, loads, and deflection limits",
      "UV exposure and required coating color",
      "Replacement geometry or existing steel drawings",
    ],
    related: [
      { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beams" },
      { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "FRP square tubes" },
      { href: "/products/custom-pultruded-profiles", label: "Custom profiles" },
      { href: "/industries/industrial", label: "Industrial applications" },
    ],
    deepDive: {
      heading: "Why FRP cooling tower profiles work in saturated service",
      paragraphs: [
        "A cooling tower is close to a worst-case environment for coated steel: the structure sits in saturated air at elevated temperature, gets sprayed with chlorinated and chemically dosed water, dries out, and is wetted again — thousands of cycles a year. Galvanizing sacrifices itself, coatings blister at cut edges and bolt holes, and every recoating cycle means a plant outage with confined-space access. Pultruded fiberglass removes the failure mechanism instead of slowing it down: the glass-fiber laminate is immune to electrochemical corrosion, and a vinyl ester matrix resists the chlorides, biocides, and pH swings of open recirculating water.",
        "The industry recognized this decades ago — fiberglass pultrusions are now the default structural material for new field-erected towers, and the Cooling Technology Institute maintains a dedicated specification (CTI STD-137) for pultruded structural products used in them. Typical member mapping in a tower frame: I-beams and channels for columns, girts, and fan-deck framing; square tubes for diagonal bracing and casing support; angles for louver frames and connection cleats; and thin-wall custom sections for louvers and drift-eliminator supports. All of these come from the same standard families listed in our size catalog, with published weights per meter.",
        "For replacement programs, the practical route is to match the existing steel member geometry at equal stiffness rather than equal depth — fiberglass runs at roughly a quarter of the weight of the steel it replaces, which usually means the old crane and access plan can be downsized or eliminated. Send the existing framing drawings and water-chemistry report with your RFQ; we return a member-by-member substitution list with section sizes, resin recommendation, and hardware notes, priced per meter.",
      ],
    },
  },
  {
    slug: "frp-bridge-deck-panels",
    lastModified: "2026-09-21",
    title: "FRP Bridge Deck Panels - Lightweight Pultruded Decking",
    shortTitle: "FRP bridge deck panels",
    description:
      "FRP bridge deck panels and pultruded structural decking for pedestrian bridges, access decks and lightweight bridge deck replacement.",
    h1: "FRP bridge deck panels for lightweight deck replacement",
    intro:
      "Pultruded deck panels replace steel, timber, and concrete systems where weight, corrosion, and installation access control the project economics. F1 Composite supplies closed-top planks, gratings, and support profiles for pedestrian bridges and light vehicular access decks.",
    environment:
      "Best fit: pedestrian bridges, coastal boardwalks, utility access decks, replacement decks on aging structures, and projects where a lighter deck reduces crane size or substructure reinforcement.",
    image: "/images/applications/frp-decking-bridge-marina.webp",
    imageAlt:
      "Gray closed-top FRP deck panels with an anti-slip surface on a coastal pedestrian bridge leading to a marina and vessel-access gangway",
    imageSize: { width: 1672, height: 941 },
    imageCaption:
      "Closed-top FRP decking for coastal pedestrian bridges, marina walkways and vessel access. Final panel sizes, supports and connections require project-specific engineering.",
    recommendedProfiles: [
      "Closed-top deck panels for continuous walking surfaces",
      "Pultruded gratings for drainage and ventilation",
      "I-beams and channels for secondary support framing",
      "Custom edge profiles and splice plates for modular panels",
    ],
    resinSystem:
      "Isophthalic polyester is common for general infrastructure. Vinyl ester is recommended for coastal, de-icing salt, marine, wastewater, and chemical exposure. Gritted top surfaces are used for pedestrian slip resistance.",
    standards: ["EN 13706", "ASTM D3917", "AASHTO load classes", "AS 4586"],
    designChecks: [
      {
        title: "Panel span and load distribution",
        body: "State the clear support spacing, deck orientation, pedestrian or vehicle load model, wheel or patch loads, and the required deflection limit. Adjacent-plank load sharing must be justified by the joint detail.",
      },
      {
        title: "Surface and drainage",
        body: "Select a gritted anti-slip surface, closed or open deck, crossfall, drainage path, and joint geometry from the access and climate requirements. Public routes may also impose opening and accessibility limits.",
      },
      {
        title: "Deck-to-girder connection",
        body: "Clips, through-bolts, adhesive interfaces, edge distances, and thermal movement define how panel reactions reach the supporting girders. The deck cannot be specified independently of this connection zone.",
      },
    ],
    rfqInputs: [
      "Clear span, support spacing, and required deck width",
      "Pedestrian, maintenance vehicle, or light vehicular load class",
      "Required deflection limit and anti-slip surface",
      "Exposure: coastal, de-icing salt, UV, chemicals, or immersion",
      "Panel length limits for container loading and installation access",
    ],
    related: [
      { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
      { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beams" },
      { href: "/industries/infrastructure", label: "Infrastructure applications" },
      { href: "/case-studies/beam-bridge", label: "Pedestrian & cycle beam bridge design guide" },
      { href: "/resources/blog/frp-bridge-deck-design-guide", label: "FRP bridge deck design: engineering guide" },
    ],
    deepDive: {
      heading: "FRP bridge deck panels from load model to installation plan",
      paragraphs: [
        "FRP bridge deck panels are closed-top pultruded planks or coordinated panel assemblies that form the traffic or walking surface above the primary girders. Their value is system-level: lower dead load can preserve an existing substructure, modular panels shorten the closure window, and a corrosion-resistant laminate removes the painting and deck-repair cycle that often drives lifecycle cost. The correct panel depth is therefore selected from span, stiffness, local patch load, joint behavior, and installation constraints together — not from a generic kilograms-per-square-meter comparison.",
        "Serviceability is normally central to the design. The engineer checks global panel deflection, local face response under concentrated loads, vibration for pedestrian use, and load transfer across tongue-and-groove or bonded joints. Vehicle-rated decks also need the governing wheel-load model and fatigue-sensitive connection details. F1 supplies preliminary load-deflection data, but the issued-for-construction system must be reviewed under the bridge owner's applicable code and project load combinations.",
        "Replacement projects should include a survey of girder spacing, bearing elevations, drainage, curbs, expansion joints, and maximum lift size. Factory-cut modules can arrive with gritted surfaces, edge pieces, splice details, and a numbered installation sequence. Linking the panel design to crane access and closure duration is where the low mass of FRP produces a measurable construction benefit rather than remaining only a material property.",
      ],
    },
  },
  {
    slug: "frp-solar-mounting-profiles",
    lastModified: "2026-09-12",
    title: "FRP Solar Support Design: Loads, Spans & Connections",
    shortTitle: "FRP solar mounting profiles",
    description:
      "Plan FRP solar support structures around wind and snow loads, spans, clamp zones and connections. Link the design requirements to a specified profile schedule.",
    h1: "FRP solar support design: spans, loads and connections",
    intro:
      "This guide covers the use of FRP profiles in PV support structures. Begin with the array layout and load path, then specify rail and post sections, clamp zones and attachments. Use the linked solar product catalog for dimensions and component supply; final structural and electrical design remains project-specific.",
    environment:
      "Best fit: coastal solar farms, floating PV, agricultural PV, corrosive industrial sites, and off-grid structures where weight reduction simplifies transport and installation.",
    image: "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
    imageNote: "Project photo",
    imageAlt:
      "Pultruded FRP solar mounting profiles supporting photovoltaic modules on an industrial rooftop",
    recommendedProfiles: [
      "Channels and square tubes for rails and posts",
      "Angles for panel support brackets and bracing",
      "Flat bars and custom sections for clips, spacers, and edge members",
      "Vinyl ester or UV-stabilized polyester laminates for harsh outdoor service",
    ],
    resinSystem:
      "UV-stabilized isophthalic polyester is the baseline for standard outdoor PV supports. Vinyl ester is recommended for coastal, floating PV, fertilizer exposure, and aggressive industrial environments.",
    standards: ["EN 13706", "ASTM D3917", "ASTM D638", "ASTM D790"],
    designChecks: [
      {
        title: "Wind, snow, and array geometry",
        body: "Rail and post sizing starts with module dimensions, support points, tributary area, uplift and downward wind pressure, snow drift, seismic demand, and the project's serviceability limit.",
      },
      {
        title: "Roof or foundation interface",
        body: "Standing-seam clamps, roof fasteners, piles, ballast, and floating supports each create different local reactions. Pull-out and attachment capacity must be checked separately from the FRP rail span.",
      },
      {
        title: "Electrical and environmental coordination",
        body: "FRP rails do not create a conductive path, but modules, inverters, metallic clips, cabling, and lightning protection still require code-compliant bonding. Coastal, fertilizer, floating, and desert sites also need different resin and UV packages.",
      },
    ],
    rfqInputs: [
      "PV module size, array layout, and support spacing",
      "Wind, snow, and seismic design loads",
      "Site exposure: coastal, desert, agricultural, floating, or industrial",
      "Grounding, bonding, and electrical isolation requirements",
      "Target service life and UV/color requirements",
    ],
    related: [
      { href: "/products/fiberglass-structural-shapes/frp-channel", label: "FRP channels" },
      { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "FRP square tubes" },
      { href: "/industries/energy", label: "Energy applications" },
      { href: "/case-studies/chongqing-rooftop-pv-frp-rail", label: "Rooftop PV rail case study" },
      { href: "/products/frp-solar-mounting-systems", label: "Solar profile catalog and component supply" },
    ],
    deepDive: {
      heading: "Specifying FRP solar mounting profiles as a PV system",
      paragraphs: [
        "FRP solar mounting profiles can serve at three levels: module perimeter frames, purlins and rails immediately below the module, or the wider post-and-brace support structure. Each level sees a different combination of bending, torsion, clamp pressure, uplift reversal, temperature cycling, and assembly tolerance. The RFQ should identify which level is in scope and include the module drawing, clamp zones, array layout, site design actions, attachment concept, and target installation sequence.",
        "Low density is most valuable when an existing roof or floating structure has limited reserve. It reduces the rail contribution to permanent load and simplifies manual handling, but it does not eliminate structural review of the roof sheet, seam clamp, fastener pull-out, pile, or float. Likewise, electrical insulation is useful around DC cabling but does not replace module bonding, lightning protection, or the electrical engineer's grounding design.",
        "Outdoor durability depends on the full laminate and surface package. UV-stabilized polyester with a protective veil is a common baseline; vinyl ester is preferred for saline water, fertilizer, and aggressive industrial exposure. F1 can provide standard channels and tubes or develop custom clamp and drainage geometry, then supply factory-cut rails, splice plates, and hardware schedules linked to the installation drawing.",
      ],
    },
  },
  {
    slug: "frp-chemical-plant-platforms",
    lastModified: "2026-07-30",
    title: "FRP Chemical Plant Platforms - Beams, Gratings and Handrails",
    shortTitle: "FRP chemical plant platforms",
    description:
      "FRP chemical plant platforms using pultruded beams, channels, gratings, stair treads and handrails for acid splash and corrosive process areas.",
    h1: "FRP chemical plant platforms for corrosive process areas",
    intro:
      "Chemical plant access platforms fail when steel framing, gratings, and handrails sit in acid splash, caustic washdown, or chloride-rich air. F1 Composite supplies the pultruded beams, channels, gratings, stair treads, and handrail profiles required for corrosion-proof platform assemblies.",
    environment:
      "Best fit: acid production, fertilizer plants, chlor-alkali units, wastewater treatment, battery materials, petrochemical areas, and any process zone where coating maintenance is expensive or unsafe.",
    image: "/images/industries/industrial-chemical-tank-platform.webp",
    imageAlt:
      "Chemical tank access platform with FRP grating, yellow handrails, stair and structural supports",
    imageSize: { width: 1536, height: 1024 },
    imageCaption: "Tank access platform with grating, handrails and a stair. Members, connections and resin are confirmed by project design.",
    recommendedProfiles: [
      "FRP I-beams and channels for primary and secondary framing",
      "Molded or pultruded FRP gratings for walking surfaces",
      "FRP round tubes and square tubes for handrails and guardrails",
      "FRP angles and flat bars for bracing, toe boards, and splice plates",
    ],
    resinSystem:
      "Vinyl ester is the default resin for chemical exposure. Phenolic or fire-retardant systems can be evaluated when the project combines corrosion resistance with strict flame, smoke, or offshore requirements.",
    standards: ["EN 13706", "ASTM D3917", "ASTM E84", "BS 476"],
    designChecks: [
      {
        title: "Chemical compatibility",
        body: "List each chemical, concentration, temperature, exposure mode, and cleaning cycle. Resin selection should reflect the worst credible combined service condition and any required verification testing.",
      },
      {
        title: "Platform load path",
        body: "Check primary beams, secondary members, grating spans, stair stringers, handrail posts, base plates, and connections as one assembly under operating, maintenance, and equipment loads.",
      },
      {
        title: "Fire and plant safety",
        body: "Corrosion resistance does not establish fire performance. Confirm flame, smoke, electrical, anti-slip, egress, and static-control requirements for the actual process area before selecting the laminate and surface.",
      },
    ],
    rfqInputs: [
      "Chemical exposure list, concentration, temperature, and spill frequency",
      "Platform span, load class, and deflection limit",
      "Grating type: molded, pultruded, or solid-top",
      "Fire, smoke, and plant safety requirements",
      "Assembly drawings or existing steel platform dimensions",
    ],
    related: [
      { href: "/products/molded-frp-grating", label: "Molded FRP grating" },
      { href: "/products/frp-gratings", label: "Pultruded FRP grating" },
      { href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" },
      { href: "/products/frp-ladders", label: "Industrial FRP fixed ladders" },
      { href: "/products/frp-stair-treads", label: "Stair tread covers" },
      { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beams" },
      { href: "/industries/industrial", label: "Industrial applications" },
      { href: "/industries/water-wastewater", label: "FRP profiles for water and wastewater plants" },
      { href: "/case-studies/factory-access-staircase", label: "FRP access staircase case study" },
    ],
    deepDive: {
      heading: "FRP chemical plant platforms as coordinated access systems",
      paragraphs: [
        "A chemical plant platform combines several FRP product families into one safety-critical access system. I-beams and channels carry the floor, grating distributes pedestrian and maintenance loads, stair stringers establish the access route, and handrail posts transfer guard loads back into the frame. Treating each item as a separate catalog purchase can leave gaps at the connections, so the useful design package includes the framing plan, grating orientation, stair geometry, handrail reactions, base details, and plant load cases together.",
        "Chemical compatibility must be stated with concentration, temperature, splash or immersion mode, and exposure frequency. Vinyl ester is a common starting point for aggressive process areas, but oxidizers, solvents, high temperature, and mixed cleaning chemicals may require a different formulation or test program. Fire-retardant and phenolic systems solve different hazards and should be selected from the plant's flame, smoke, and toxicity criteria rather than from a generic 'FR' label.",
        "Factory fabrication can reduce hot work and shutdown time. Profiles can be cut, drilled, labeled, and packed by assembly zone with gratings, stair components, handrail sections, and fastener kits. The engineering handoff should still state allowable site modifications, cut-edge sealing, bolt torque, inspection access, and the boundary between F1's component calculations and the local engineer's foundation and building-structure review.",
      ],
    },
  },
  {
    slug: "frp-pedestrian-bridge-superstructures",
    lastModified: "2026-09-14",
    title: "FRP Pedestrian Bridges: Truss, Deck & Design Guide",
    shortTitle: "FRP pedestrian bridge superstructures",
    description:
      "Specify FRP pedestrian bridges: compare beam and truss systems, review vibration, joints, decking and installation, and prepare a component RFQ.",
    h1: "FRP pedestrian bridge superstructures for lightweight crossings",
    intro:
      "F1 Composite supplies pultruded members and coordinated component packages for pedestrian bridge superstructures where low dead load, corrosion resistance, rapid installation, or difficult site access govern the concept. The scope can include primary beams or trusses, cross-members, deck panels, bracing, parapets, and handrail profiles.",
    environment:
      "Best fit: coastal and riverside crossings, park and trail bridges, utility access bridges, replacement superstructures on retained abutments, and remote sites where smaller lifts and prefabricated modules reduce construction disruption.",
    image: "/images/applications/frp-pedestrian-bridge-truss-superstructure.webp",
    imageNote: "Reference photo",
    imageAlt:
      "FRP pedestrian bridge with gray truss members spanning a stream beside a hillside stairway",
    imageSize: { width: 1920, height: 1280 },
    imageCaption: "Pedestrian truss bridge showing the main chords, diagonal members and end connections. Final member sizes, material specifications and capacity require the project drawings and engineering records.",
    recommendedProfiles: [
      "I-beams, channels, or box members for primary longitudinal girders",
      "Square tubes and custom closed sections for trusses and cross-bracing",
      "Closed-top deck panels or pultruded grating for the walking surface",
      "Round and square tubes for parapets, handrails, and approach guards",
    ],
    resinSystem:
      "Specify the resin, reinforcement, protective surface and service temperature together. Compare polyester and vinyl ester systems using supplier data for the actual wet, salt or chemical exposure; resin name alone does not establish durability. Request the relevant retained-property and weathering evidence. Fire and smoke criteria need separate review for enclosed crossings or egress routes.",
    standards: ["Owner-adopted pedestrian bridge criteria", "ASCE/SEI 74-23 where applicable", "Project-specific deck slip testing"],
    designChecks: [
      {
        title: "Global stiffness and vibration",
        body: "Primary members require strength, deflection, buckling, and pedestrian vibration checks under the governing load combinations. FRP bridges are commonly serviceability-controlled.",
      },
      {
        title: "Joints and module boundaries",
        body: "Bolted, bonded, or hybrid splices must transfer girder, truss, deck, and parapet actions while remaining inspectable. Transport length and lift planning often determine where those joints belong.",
      },
      {
        title: "Interfaces and local approvals",
        body: "Bearings, abutments, foundations, accessibility, drainage, anti-slip surface, parapet loads, and owner-specific bridge criteria remain part of the local engineer's complete design.",
      },
    ],
    rfqInputs: [
      "Clear span, deck width, alignment, and available structural depth",
      "Pedestrian density, maintenance vehicle, wind, snow, and seismic actions",
      "Deflection, vibration, parapet, accessibility, and anti-slip criteria",
      "Site exposure, design life, drainage, and fire requirements",
      "Transport route, maximum module size, crane or manual-lift constraints",
    ],
    related: [
      { href: "/applications/frp-bridge-deck-panels", label: "FRP bridge deck panels" },
      { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beams" },
      { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
      { href: "/products/frp-handrail-systems", label: "FRP handrail systems" },
      { href: "/case-studies/beam-bridge", label: "Pedestrian & cycle beam bridge design guide" },
      { href: "/resources/blog/china-first-all-composite-truss-bridge-pengshui", label: "China's first all-composite truss bridge (Pengshui)" },
    ],
    deepDive: {
      heading: "FRP pedestrian bridge superstructures from concept to modules",
      paragraphs: [
        "The superstructure is the complete load-carrying assembly above the bearings, not only the walking deck. A typical FRP pedestrian bridge combines longitudinal girders or trusses, cross-members, lateral bracing, a deck system, parapets, and connection plates. Low mass can reduce foundation reactions and allow longer prefabricated modules, but the design still has to resolve global stability, lateral-torsional behavior, member buckling, pedestrian vibration, wind, snow, thermal movement, and the transfer of parapet loads into the main structure.",
        "Pultruded FRP has lower elastic modulus than structural steel, so deflection and vibration frequently govern before material strength. Efficient concepts use section depth, closed or built-up geometry, truss action, and realistic restraint instead of simply substituting equal-size profiles. Connections deserve the same attention: bolt bearing, net-section rupture, block shear, adhesive durability, edge distance, and inspection access determine whether the modular bridge behaves as the analytical model assumes.",
        "A quote-ready concept includes the site survey, clear span and width, load criteria, allowable structural depth, bearing and abutment interfaces, deck and parapet requirements, transport envelope, and proposed lift sequence. Request a pultruded member schedule, deck and handrail package, calculation scope, and fabrication drawings as explicit quotation deliverables; the bridge owner's appointed engineer retains responsibility for the governing code, foundations, site actions, and final stamped design.",
      ],
    },
  },
];

export function getApplicationPage(slug: string) {
  return applicationPages.find((page) => page.slug === slug);
}
