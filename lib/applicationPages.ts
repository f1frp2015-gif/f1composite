export interface ApplicationPage {
  slug: string;
  lastModified: string;
  title: string;
  shortTitle: string;
  description: string;
  h1: string;
  intro: string;
  environment: string;
  image: string;
  imageAlt: string;
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
  {
    slug: "frp-cable-tray-supports",
    lastModified: "2026-07-30",
    title: "FRP Cable Tray Supports — Channels & Brackets",
    shortTitle: "FRP cable tray supports",
    description:
      "FRP cable tray supports using pultruded channels, angles and brackets for substations, tunnels, wastewater plants and corrosive industrial cable routing.",
    h1: "FRP cable tray supports for corrosive and electrical environments",
    intro:
      "F1 Composite supplies pultruded support systems for projects where steel tray frames create corrosion, grounding, or hot-work problems. Typical assemblies use fiberglass channels, angles, square tubes, and custom brackets — including strut-compatible sections — to carry ladder trays, perforated trays, and instrument runs.",
    environment:
      "Best fit: substations, tunnels, wastewater plants, chemical plants, coastal utilities, and facilities where non-conductive structural members simplify installation and maintenance.",
    image: "/images/case-studies/frp-water-treatment-cable-tray-handrail.jpg",
    imageAlt:
      "FRP cable tray supports and handrail profiles installed in a humid water-treatment facility",
    recommendedProfiles: [
      "Channel sections for tray stringers and wall-mounted supports",
      "Angles for cleats, ledgers, and bracing",
      "Square tube for posts and free-standing frames",
      "Custom pultruded brackets and fiberglass strut for repeat modular assemblies",
    ],
    resinSystem:
      "Isophthalic polyester is the standard choice. Vinyl ester is recommended for acid splash, wastewater, saltwater, and aggressive chemical exposure. Fire-retardant resin systems are available when tunnels or transit infrastructure require tighter flame-spread limits.",
    standards: ["EN 13706", "ASTM D3917", "ASTM E84", "ISO 9001:2015"],
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
    deepDive: {
      heading: "Engineering FRP cable tray supports as a complete load path",
      paragraphs: [
        "An FRP cable tray support is more than a channel under a tray. The design load starts with installed cable mass and future fill allowance, moves through tray rungs and rails into the support channel, and then passes through a wall bracket, post, or trapeze frame into the building structure. Deflection often controls the FRP member before material strength does, while bearing at bolts and anchors can govern the connection. A useful quotation therefore states the tray type, route geometry, support spacing, cable load, attachment surface, and any maintenance point loads together.",
        "Material selection follows the environment. Isophthalic polyester covers many outdoor and humid industrial routes; vinyl ester is the safer starting point where acid splash, chlorides, hydrogen sulfide, or wastewater chemistry is present. Tunnel and transit work may add project-specific flame, smoke, and toxicity criteria. Those requirements must be tied to the actual laminate offered, not inferred from a generic fiberglass datasheet.",
        "For repeat routes, factory-cut and pre-drilled support kits reduce field decisions. F1 can supply channel, angle, square-tube posts, custom brackets, splice plates, and fastener schedules as one coordinated package. The engineering review checks member deflection, bracket action, hole geometry, and environmental compatibility before the cutting list is released, while the linked calculator provides a transparent preliminary screen for the channel member itself.",
      ],
    },
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
    image: "/images/industries/frp-industrial-chemical-plant-facility.jpg",
    imageAlt:
      "Industrial process facility representing the wet and chemically dosed service environment for FRP cooling tower profiles",
    recommendedProfiles: [
      "I-beams and channels for primary support members",
      "Square tubes for frames, posts, and bracing",
      "Angles for edge supports and louver framing",
      "Custom thin-wall pultrusions for drift eliminators and louvers",
    ],
    resinSystem:
      "Vinyl ester is recommended for chlorinated water, high humidity, and aggressive cooling tower chemistry. Isophthalic polyester can be used for mild HVAC towers with controlled water treatment.",
    standards: ["EN 13706", "ASTM D3917", "ASTM D638", "ASTM D790", "ISO 9001:2015"],
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
    lastModified: "2026-07-30",
    title: "FRP Bridge Deck Panels - Lightweight Pultruded Decking",
    shortTitle: "FRP bridge deck panels",
    description:
      "FRP bridge deck panels and pultruded structural decking for pedestrian bridges, access decks and lightweight bridge deck replacement.",
    h1: "FRP bridge deck panels for lightweight deck replacement",
    intro:
      "Pultruded deck panels replace steel, timber, and concrete systems where weight, corrosion, and installation access control the project economics. F1 Composite supplies closed-top planks, gratings, and support profiles for pedestrian bridges and light vehicular access decks.",
    environment:
      "Best fit: pedestrian bridges, coastal boardwalks, utility access decks, replacement decks on aging structures, and projects where a lighter deck reduces crane size or substructure reinforcement.",
    image: "/images/case-studies/frp-bridge-deck-replacement-infrastructure-project.jpg",
    imageAlt:
      "Lightweight FRP bridge deck replacement panels installed on an infrastructure project",
    recommendedProfiles: [
      "Closed-top deck panels for continuous walking surfaces",
      "Pultruded gratings for drainage and ventilation",
      "I-beams and channels for secondary support framing",
      "Custom edge profiles and splice plates for modular panels",
    ],
    resinSystem:
      "Isophthalic polyester is common for general infrastructure. Vinyl ester is recommended for coastal, de-icing salt, marine, wastewater, and chemical exposure. Gritted top surfaces are used for pedestrian slip resistance.",
    standards: ["EN 13706", "ASTM D3917", "AASHTO load classes", "AS 4586", "ISO 9001:2015"],
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
      { href: "/products/frp-gratings", label: "Pultruded FRP grating and deck panels" },
      { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beams" },
      { href: "/industries/infrastructure", label: "Infrastructure applications" },
      { href: "/case-studies/european-bridge-deck", label: "Bridge deck case study" },
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
    lastModified: "2026-07-30",
    title: "FRP Solar Mounting Profiles — Lightweight PV Racking",
    shortTitle: "FRP solar mounting profiles",
    description:
      "FRP solar mounting profiles for PV farms where lightweight, corrosion resistance, UV stability and electrical isolation matter.",
    h1: "FRP solar mounting profiles for PV support structures",
    intro:
      "F1 Composite supplies pultruded mounting structure for PV projects where aluminum or galvanized steel creates corrosion, grounding, or logistics penalties. The fiberglass sections are lightweight, electrically non-conductive, and stable in long-term outdoor UV exposure when specified with the correct veil and coating system.",
    environment:
      "Best fit: coastal solar farms, floating PV, agricultural PV, corrosive industrial sites, and off-grid structures where weight reduction simplifies transport and installation.",
    image: "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
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
    standards: ["EN 13706", "ASTM D3917", "ASTM D638", "ASTM D790", "ISO 9001:2015"],
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
      { href: "/case-studies/solar-farm-mounting", label: "Solar mounting case study" },
      { href: "/products/frp-solar-mounting-systems", label: "FRP solar mounting systems" },
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
    image: "/images/case-studies/frp-chemical-plant-access-platform.jpg",
    imageAlt:
      "FRP chemical plant platform with corrosion-resistant grating, beams and handrails",
    recommendedProfiles: [
      "FRP I-beams and channels for primary and secondary framing",
      "Molded or pultruded FRP gratings for walking surfaces",
      "FRP round tubes and square tubes for handrails and guardrails",
      "FRP angles and flat bars for bracing, toe boards, and splice plates",
    ],
    resinSystem:
      "Vinyl ester is the default resin for chemical exposure. Phenolic or fire-retardant systems can be evaluated when the project combines corrosion resistance with strict flame, smoke, or offshore requirements.",
    standards: ["EN 13706", "ASTM D3917", "ASTM E84", "BS 476", "ISO 9001:2015"],
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
      { href: "/products/frp-gratings", label: "Pultruded FRP grating & deck panels" },
      { href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" },
      { href: "/products/frp-stair-treads", label: "Stair tread covers" },
      { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beams" },
      { href: "/industries/industrial", label: "Industrial applications" },
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
    lastModified: "2026-07-30",
    title: "FRP Pedestrian Bridge Superstructures — Design Guide",
    shortTitle: "FRP pedestrian bridge superstructures",
    description:
      "FRP pedestrian bridge superstructures using pultruded beams, trusses, deck panels and handrails for lightweight, corrosion-resistant crossings.",
    h1: "FRP pedestrian bridge superstructures for lightweight crossings",
    intro:
      "F1 Composite supplies pultruded members and coordinated component packages for pedestrian bridge superstructures where low dead load, corrosion resistance, rapid installation, or difficult site access govern the concept. The scope can include primary beams or trusses, cross-members, deck panels, bracing, parapets, and handrail profiles.",
    environment:
      "Best fit: coastal and riverside crossings, park and trail bridges, utility access bridges, replacement superstructures on retained abutments, and remote sites where smaller lifts and prefabricated modules reduce construction disruption.",
    image: "/images/industries/frp-infrastructure-bridge-structure.jpg",
    imageAlt:
      "Bridge structure representing a lightweight FRP pedestrian bridge superstructure and deck system",
    recommendedProfiles: [
      "I-beams, channels, or box members for primary longitudinal girders",
      "Square tubes and custom closed sections for trusses and cross-bracing",
      "Closed-top deck panels or pultruded grating for the walking surface",
      "Round and square tubes for parapets, handrails, and approach guards",
    ],
    resinSystem:
      "UV-stabilized isophthalic polyester is a baseline for many inland bridges. Vinyl ester is recommended for coastal, de-icing-salt, wastewater, and persistently wet environments. Fire and smoke requirements are reviewed separately where the bridge forms part of an egress route or enclosed transport facility.",
    standards: ["ASCE/SEI 74-23", "EN 13706", "AASHTO LRFD / EN 1991-2 as applicable", "AS 4586", "ISO 9001:2015"],
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
      { href: "/products/frp-gratings", label: "Pultruded FRP grating and deck panels" },
      { href: "/products/frp-handrail-systems", label: "FRP handrail systems" },
      { href: "/case-studies/european-bridge-deck", label: "European bridge deck case study" },
    ],
    deepDive: {
      heading: "FRP pedestrian bridge superstructures from concept to modules",
      paragraphs: [
        "The superstructure is the complete load-carrying assembly above the bearings, not only the walking deck. A typical FRP pedestrian bridge combines longitudinal girders or trusses, cross-members, lateral bracing, a deck system, parapets, and connection plates. Low mass can reduce foundation reactions and allow longer prefabricated modules, but the design still has to resolve global stability, lateral-torsional behavior, member buckling, pedestrian vibration, wind, snow, thermal movement, and the transfer of parapet loads into the main structure.",
        "Pultruded FRP has lower elastic modulus than structural steel, so deflection and vibration frequently govern before material strength. Efficient concepts use section depth, closed or built-up geometry, truss action, and realistic restraint instead of simply substituting equal-size profiles. Connections deserve the same attention: bolt bearing, net-section rupture, block shear, adhesive durability, edge distance, and inspection access determine whether the modular bridge behaves as the analytical model assumes.",
        "A quote-ready concept includes the site survey, clear span and width, load criteria, allowable structural depth, bearing and abutment interfaces, deck and parapet requirements, transport envelope, and proposed lift sequence. F1 can develop the pultruded member schedule, deck and handrail package, preliminary calculations, and fabrication drawings; the bridge owner's appointed engineer retains responsibility for the governing code, foundations, site actions, and final stamped design.",
      ],
    },
  },
];

export function getApplicationPage(slug: string) {
  return applicationPages.find((page) => page.slug === slug);
}
