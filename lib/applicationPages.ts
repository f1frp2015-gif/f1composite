export interface ApplicationPage {
  slug: string;
  lastModified: string;
  title: string;
  shortTitle: string;
  description: string;
  h1: string;
  intro: string;
  environment: string;
  recommendedProfiles: string[];
  resinSystem: string;
  standards: string[];
  rfqInputs: string[];
  related: Array<{ href: string; label: string }>;
  /** Optional long-form section for pages that carry real search demand. */
  deepDive?: { heading: string; paragraphs: string[] };
}

export const applicationPages: ApplicationPage[] = [
  {
    slug: "frp-cable-tray-supports",
    lastModified: "2026-05-03",
    title: "FRP Cable Tray Supports — Channels & Brackets",
    shortTitle: "FRP cable tray supports",
    description:
      "FRP cable tray supports using pultruded channels, angles and brackets for substations, tunnels, wastewater plants and corrosive industrial cable routing.",
    h1: "FRP cable tray supports for corrosive and electrical environments",
    intro:
      "F1 Composite manufactures pultruded support systems for projects where steel tray frames create corrosion, grounding, or hot-work problems. Typical assemblies use fiberglass channels, angles, square tubes, and custom brackets — including strut-compatible sections — to carry ladder trays, perforated trays, and instrument runs.",
    environment:
      "Best fit: substations, tunnels, wastewater plants, chemical plants, coastal utilities, and facilities where non-conductive structural members simplify installation and maintenance.",
    recommendedProfiles: [
      "Channel sections for tray stringers and wall-mounted supports",
      "Angles for cleats, ledgers, and bracing",
      "Square tube for posts and free-standing frames",
      "Custom pultruded brackets and fiberglass strut for repeat modular assemblies",
    ],
    resinSystem:
      "Isophthalic polyester is the standard choice. Vinyl ester is recommended for acid splash, wastewater, saltwater, and aggressive chemical exposure. Fire-retardant resin systems are available when tunnels or transit infrastructure require tighter flame-spread limits.",
    standards: ["EN 13706", "ASTM D3917", "ASTM E84", "ISO 9001:2015"],
    rfqInputs: [
      "Tray width, support spacing, and total route length",
      "Cable load per meter and any concentrated maintenance loads",
      "Chemical, humidity, UV, and temperature exposure",
      "Fire rating or electrical isolation requirements",
      "Preferred connection method: bolted, bonded, or hybrid",
    ],
    related: [
      { href: "/products/standard-profiles/channel", label: "FRP channels" },
      { href: "/products/standard-profiles/angle", label: "FRP angles" },
      { href: "/products/custom-pultrusions", label: "Custom pultruded profiles" },
      { href: "/industries/energy", label: "Energy applications" },
    ],
  },
  {
    slug: "frp-cooling-tower-profiles",
    lastModified: "2026-05-03",
    title: "FRP Cooling Tower Profiles — Corrosion-Resistant",
    shortTitle: "FRP cooling tower profiles",
    description:
      "Pultruded FRP cooling tower profiles for wet, chlorinated and high-humidity structures: beams, tubes, louvers, handrails and access members.",
    h1: "FRP cooling tower profiles for wet and chlorinated service",
    intro:
      "Cooling towers attack galvanized steel through constant humidity, chlorides, biocides, and wet-dry cycling. F1 Composite supplies pultruded beams, tubes, angles, louvers, and grating supports in fiberglass that keep structural stiffness while removing corrosion-driven maintenance.",
    environment:
      "Best fit: industrial cooling towers, power plant cooling systems, HVAC towers, chemical plants, and replacement programs where steel members require repeated recoating.",
    recommendedProfiles: [
      "I-beams and channels for primary support members",
      "Square tubes for frames, posts, and bracing",
      "Angles for edge supports and louver framing",
      "Custom thin-wall pultrusions for drift eliminators and louvers",
    ],
    resinSystem:
      "Vinyl ester is recommended for chlorinated water, high humidity, and aggressive cooling tower chemistry. Isophthalic polyester can be used for mild HVAC towers with controlled water treatment.",
    standards: ["EN 13706", "ASTM D3917", "ASTM D638", "ASTM D790", "ISO 9001:2015"],
    rfqInputs: [
      "Cooling tower type and operating temperature range",
      "Water chemistry: chlorides, pH, biocides, and chemical dosing",
      "Member spans, loads, and deflection limits",
      "UV exposure and required coating color",
      "Replacement geometry or existing steel drawings",
    ],
    related: [
      { href: "/products/standard-profiles/i-beam", label: "FRP I-beams" },
      { href: "/products/standard-profiles/square-tube", label: "FRP square tubes" },
      { href: "/products/custom-pultrusions", label: "Custom profiles" },
      { href: "/industries/industrial", label: "Industrial applications" },
    ],
    deepDive: {
      heading: "Why fiberglass structure wins inside a cooling tower",
      paragraphs: [
        "A cooling tower is close to a worst-case environment for coated steel: the structure sits in saturated air at elevated temperature, gets sprayed with chlorinated and chemically dosed water, dries out, and is wetted again — thousands of cycles a year. Galvanizing sacrifices itself, coatings blister at cut edges and bolt holes, and every recoating cycle means a plant outage with confined-space access. Pultruded fiberglass removes the failure mechanism instead of slowing it down: the glass-fiber laminate is immune to electrochemical corrosion, and a vinyl ester matrix resists the chlorides, biocides, and pH swings of open recirculating water.",
        "The industry recognized this decades ago — fiberglass pultrusions are now the default structural material for new field-erected towers, and the Cooling Technology Institute maintains a dedicated specification (CTI STD-137) for pultruded structural products used in them. Typical member mapping in a tower frame: I-beams and channels for columns, girts, and fan-deck framing; square tubes for diagonal bracing and casing support; angles for louver frames and connection cleats; and thin-wall custom sections for louvers and drift-eliminator supports. All of these come from the same standard families listed in our size catalog, with published weights per meter.",
        "For replacement programs, the practical route is to match the existing steel member geometry at equal stiffness rather than equal depth — fiberglass runs at roughly a quarter of the weight of the steel it replaces, which usually means the old crane and access plan can be downsized or eliminated. Send the existing framing drawings and water-chemistry report with your RFQ; we return a member-by-member substitution list with section sizes, resin recommendation, and hardware notes, priced per meter.",
      ],
    },
  },
  {
    slug: "frp-bridge-deck-panels",
    lastModified: "2026-05-03",
    title: "FRP Bridge Deck Panels - Lightweight Pultruded Decking",
    shortTitle: "FRP bridge deck panels",
    description:
      "FRP bridge deck panels and pultruded structural decking for pedestrian bridges, access decks and lightweight bridge deck replacement.",
    h1: "FRP bridge deck panels for lightweight deck replacement",
    intro:
      "Pultruded deck panels replace steel, timber, and concrete systems where weight, corrosion, and installation access control the project economics. F1 Composite supplies closed-top planks, gratings, and support profiles for pedestrian bridges and light vehicular access decks.",
    environment:
      "Best fit: pedestrian bridges, coastal boardwalks, utility access decks, replacement decks on aging structures, and projects where a lighter deck reduces crane size or substructure reinforcement.",
    recommendedProfiles: [
      "Closed-top deck panels for continuous walking surfaces",
      "Pultruded gratings for drainage and ventilation",
      "I-beams and channels for secondary support framing",
      "Custom edge profiles and splice plates for modular panels",
    ],
    resinSystem:
      "Isophthalic polyester is common for general infrastructure. Vinyl ester is recommended for coastal, de-icing salt, marine, wastewater, and chemical exposure. Gritted top surfaces are used for pedestrian slip resistance.",
    standards: ["EN 13706", "ASTM D3917", "AASHTO load classes", "AS 4586", "ISO 9001:2015"],
    rfqInputs: [
      "Clear span, support spacing, and required deck width",
      "Pedestrian, maintenance vehicle, or light vehicular load class",
      "Required deflection limit and anti-slip surface",
      "Exposure: coastal, de-icing salt, UV, chemicals, or immersion",
      "Panel length limits for container loading and installation access",
    ],
    related: [
      { href: "/products/gratings", label: "FRP gratings and deck panels" },
      { href: "/products/standard-profiles/i-beam", label: "FRP I-beams" },
      { href: "/industries/infrastructure", label: "Infrastructure applications" },
      { href: "/case-studies/european-bridge-deck", label: "Bridge deck case study" },
    ],
  },
  {
    slug: "frp-solar-mounting-profiles",
    lastModified: "2026-05-03",
    title: "FRP Solar Mounting Profiles — Lightweight PV Racking",
    shortTitle: "FRP solar mounting profiles",
    description:
      "FRP solar mounting profiles for PV farms where lightweight, corrosion resistance, UV stability and electrical isolation matter.",
    h1: "FRP solar mounting profiles for PV support structures",
    intro:
      "F1 Composite manufactures pultruded mounting structure for PV projects where aluminum or galvanized steel creates corrosion, grounding, or logistics penalties. The fiberglass sections are lightweight, electrically non-conductive, and stable in long-term outdoor UV exposure when specified with the correct veil and coating system.",
    environment:
      "Best fit: coastal solar farms, floating PV, agricultural PV, corrosive industrial sites, and off-grid structures where weight reduction simplifies transport and installation.",
    recommendedProfiles: [
      "Channels and square tubes for rails and posts",
      "Angles for panel support brackets and bracing",
      "Flat bars and custom sections for clips, spacers, and edge members",
      "Vinyl ester or UV-stabilized polyester laminates for harsh outdoor service",
    ],
    resinSystem:
      "UV-stabilized isophthalic polyester is the baseline for standard outdoor PV supports. Vinyl ester is recommended for coastal, floating PV, fertilizer exposure, and aggressive industrial environments.",
    standards: ["EN 13706", "ASTM D3917", "ASTM D638", "ASTM D790", "ISO 9001:2015"],
    rfqInputs: [
      "PV module size, array layout, and support spacing",
      "Wind, snow, and seismic design loads",
      "Site exposure: coastal, desert, agricultural, floating, or industrial",
      "Grounding, bonding, and electrical isolation requirements",
      "Target service life and UV/color requirements",
    ],
    related: [
      { href: "/products/standard-profiles/channel", label: "FRP channels" },
      { href: "/products/standard-profiles/square-tube", label: "FRP square tubes" },
      { href: "/industries/energy", label: "Energy applications" },
      { href: "/case-studies/solar-farm-mounting", label: "Solar mounting case study" },
    ],
  },
  {
    slug: "frp-chemical-plant-platforms",
    lastModified: "2026-05-03",
    title: "FRP Chemical Plant Platforms - Beams, Gratings and Handrails",
    shortTitle: "FRP chemical plant platforms",
    description:
      "FRP chemical plant platforms using pultruded beams, channels, gratings, stair treads and handrails for acid splash and corrosive process areas.",
    h1: "FRP chemical plant platforms for corrosive process areas",
    intro:
      "Chemical plant access platforms fail when steel framing, gratings, and handrails sit in acid splash, caustic washdown, or chloride-rich air. F1 Composite supplies the pultruded beams, channels, gratings, stair treads, and handrail profiles required for corrosion-proof platform assemblies.",
    environment:
      "Best fit: acid production, fertilizer plants, chlor-alkali units, wastewater treatment, battery materials, petrochemical areas, and any process zone where coating maintenance is expensive or unsafe.",
    recommendedProfiles: [
      "FRP I-beams and channels for primary and secondary framing",
      "Molded or pultruded FRP gratings for walking surfaces",
      "FRP round tubes and square tubes for handrails and guardrails",
      "FRP angles and flat bars for bracing, toe boards, and splice plates",
    ],
    resinSystem:
      "Vinyl ester is the default resin for chemical exposure. Phenolic or fire-retardant systems can be evaluated when the project combines corrosion resistance with strict flame, smoke, or offshore requirements.",
    standards: ["EN 13706", "ASTM D3917", "ASTM E84", "BS 476", "ISO 9001:2015"],
    rfqInputs: [
      "Chemical exposure list, concentration, temperature, and spill frequency",
      "Platform span, load class, and deflection limit",
      "Grating type: molded, pultruded, or solid-top",
      "Fire, smoke, and plant safety requirements",
      "Assembly drawings or existing steel platform dimensions",
    ],
    related: [
      { href: "/products/gratings", label: "FRP gratings" },
      { href: "/products/handrail-systems", label: "Fiberglass handrail systems" },
      { href: "/products/stair-tread-covers", label: "Stair tread covers" },
      { href: "/products/standard-profiles/i-beam", label: "FRP I-beams" },
      { href: "/industries/industrial", label: "Industrial applications" },
    ],
  },
];

export function getApplicationPage(slug: string) {
  return applicationPages.find((page) => page.slug === slug);
}
