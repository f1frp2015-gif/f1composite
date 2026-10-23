import { blogPosts, blogPostsBySlug, type BlogPost } from "@/content/data/blogPosts";

// Collection navigation revision; original article dates remain content-owned.
export const blogLibraryUpdated = "2026-10-19";

export type BlogTopicSlug =
  | "materials-and-process"
  | "structural-design-and-procurement"
  | "windows-and-thermal-performance"
  | "grating-and-access"
  | "cable-management"
  | "gfrp-rebar"
  | "infrastructure-and-energy";

type BlogLink = { label: string; href: string };

export interface BlogTopic {
  slug: BlogTopicSlug;
  label: string;
  title: string;
  description: string;
  intro: string;
  questions: string[];
  startHere: string[];
  nextLinks: BlogLink[];
}

export interface BlogKeywordTarget {
  slug: string;
  topic: BlogTopicSlug;
  primaryQuery: string;
  secondaryQueries: string[];
  intent: "guide" | "technical" | "comparison" | "commercial";
  nextStep: BlogLink;
}

/**
 * Editorial topic navigation, separate from the commercial query owners in
 * seoQueryTargets.ts. Topic pages collect decisions and reading paths; the
 * linked product, reference and tool pages retain their existing search intent.
 */
export const blogTopics: BlogTopic[] = [
  {
    slug: "materials-and-process",
    label: "Materials & process",
    title: "FRP Material & Pultrusion Articles | F1 Composite",
    description: "Read FRP material and pultrusion articles on fibers, resins, density, fire testing and recycling. Find the evidence needed to specify a composite.",
    intro: "Start with the material names, then examine the fibers, resin and manufacturing method behind a specific property. Use the articles to identify which test evidence your application needs.",
    questions: ["What do FRP, GRP and GFRP mean in a specification?", "How do reinforcement and resin affect density and performance?", "Which fire, impact or recycling claims apply to the material being offered?"],
    startHere: ["fiberglass-reinforced-plastic", "frp-material", "frp-density-fiberglass-profile-density-explained"],
    nextLinks: [
      { label: "FRP terminology and material overview", href: "/what-is-frp" },
      { label: "Pultrusion process", href: "/technology/pultrusion-process" },
      { label: "Compare pultrusion resin systems", href: "/technology/pultrusion-resin-systems" },
      { label: "Estimate profile density", href: "/frp-density-calculator" },
    ],
  },
  {
    slug: "structural-design-and-procurement",
    label: "Structural design & sourcing",
    title: "FRP Structural Design & Sourcing Articles | F1 Composite",
    description: "Explore FRP structural design and sourcing articles covering material comparisons, supplier qualification, cost drivers, order quantities and lead times.",
    intro: "Work from the load case and service environment to a supplier-ready specification. These articles connect profile selection, qualification evidence and quotation scope so that offers can be compared on the same basis.",
    questions: ["Which design checks change when a steel profile is replaced by FRP?", "What should a supplier submit before a profile is approved?", "Which assumptions make cost, MOQ and delivery quotations comparable?"],
    startHere: ["engineers-most-asked-questions-pultruded-frp", "how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide", "frp-profile-cost-benchmarks-and-lead-times-2026"],
    nextLinks: [
      { label: "Compare structural profile families", href: "/products/fiberglass-structural-shapes" },
      { label: "Screen a profile for load and deflection", href: "/frp-profile-calculator" },
      { label: "Supplier selection guide", href: "/resources/how-to-choose-frp-pultrusion-supplier" },
      { label: "Profile price estimator", href: "/fiberglass-pultruded-profile-price" },
    ],
  },
  {
    slug: "windows-and-thermal-performance",
    label: "Windows & thermal performance",
    title: "Fiberglass Window Engineering Articles | F1 Composite",
    description: "Read fiberglass window engineering articles on U-values, thermal breaks, condensation, fabrication and test evidence for window and door projects.",
    intro: "Follow the questions that arise when specifying or fabricating fiberglass windows: frame and whole-window heat transfer, climate targets, finish, hardware and assembly testing. Match each claim to its tested configuration.",
    questions: ["How do frame Uf, whole-window Uw and SHGC affect the project?", "What changes when a fabricator switches to pultruded window lineals?", "Which certificates and assembly tests match the proposed window system?"],
    startHere: ["en-iso-10077-window-u-value-calculation", "passive-house-window-u-value-requirements", "qualify-chinese-fiberglass-window-profile-supplier"],
    nextLinks: [
      { label: "Fiberglass window specification guide", href: "/resources/frp-windows-guide" },
      { label: "Window and door profile supply", href: "/products/window-door-profiles" },
      { label: "Whole-window U-value calculator", href: "/technology/frp-u-value-calculator" },
      { label: "Review product evidence", href: "/resources/evidence" },
    ],
  },
  {
    slug: "grating-and-access",
    label: "Grating, handrails & ladders",
    title: "FRP Grating & Access System Guides | F1 Composite",
    description: "Read FRP grating, handrail and fixed-ladder guides covering load tables, support layout, installation, access requirements and whole-system costs.",
    intro: "Plan the complete access system, from grating span and support direction to handrail bases and ladder geometry. Use these guides to prepare project questions, then verify dimensions and loads against the applicable design and supplier documents.",
    questions: ["Which grating load table matches the panel, span and load type?", "How should panels, handrails and their fixings be installed?", "Which access requirements and lifecycle costs belong in the specification?"],
    startHere: ["how-to-read-frp-grating-load-table", "how-to-install-frp-grating", "frp-handrail-guardrail-requirements-osha-ibc-iso-14122"],
    nextLinks: [
      { label: "Compare fiberglass grating systems", href: "/products/grating" },
      { label: "Handrail systems and components", href: "/products/frp-handrail-systems" },
      { label: "Fixed ladder specifications", href: "/products/frp-ladders" },
      { label: "Access geometry checker", href: "/tools/access-geometry-checker" },
    ],
  },
  {
    slug: "cable-management",
    label: "Cable tray & electrical supports",
    title: "FRP Cable Tray Specification & Installation Articles",
    description: "Compare FRP cable tray, ladder and trunking systems, prepare a load and standards checklist, and review supports, splices and installation details.",
    intro: "Choose the cable support system before comparing materials. These articles distinguish trays, ladders and trunking, explain the evidence needed for a quotation, and connect the specification to installation details.",
    questions: ["Does the project require cable tray, ladder or enclosed trunking?", "Which load, span, resin and fire documents should accompany an RFQ?", "How are supports, joints, expansion and electrical requirements addressed?"],
    startHere: ["frp-cable-tray-trunking-ladder-vs-metal", "frp-cable-tray-specifications-advantages", "how-to-install-frp-cable-tray"],
    nextLinks: [
      { label: "Cable tray support applications", href: "/applications/frp-cable-tray-supports" },
      { label: "Fasteners and fittings", href: "/products/frp-fasteners-fittings" },
      { label: "Quality and testing evidence", href: "/technology/quality-testing" },
    ],
  },
  {
    slug: "gfrp-rebar",
    label: "GFRP rebar & concrete reinforcement",
    title: "GFRP Rebar Specification & Installation Guides",
    description: "Prepare a GFRP rebar specification with guides to standards, bent bars, stirrups, schedules, handling and installation before concrete placement.",
    intro: "Move from design requirements to a bar schedule and an installation plan. The articles separate product qualification from structural design and explain why bends, handling and site changes must be agreed before delivery.",
    questions: ["Which product standards and design documents apply to the rebar?", "How should factory-formed bends, stirrups and mesh be scheduled?", "What handling and placement checks are needed before concrete is poured?"],
    startHere: ["gfrp-rebar-specification-guide-aci-440-astm-d7957", "gfrp-bent-bars-stirrups-mesh-ordering-guide", "how-to-install-gfrp-rebar"],
    nextLinks: [
      { label: "GFRP rebar supply and RFQ", href: "/products/frp-rebar" },
      { label: "Compare fiberglass rebar and steel", href: "/technology/fiberglass-rebar-vs-steel" },
      { label: "Rebar size and design-value calculator", href: "/tools/gfrp-rebar-calculator" },
      { label: "Download the bar schedule template", href: "/downloads/f1-rebar-schedule-template.csv" },
    ],
  },
  {
    slug: "infrastructure-and-energy",
    label: "Infrastructure, marine & energy",
    title: "FRP Infrastructure & Energy Articles | F1 Composite",
    description: "Explore FRP articles on bridge decks, coastal infrastructure, wind-blade spar caps, solar supports and pipe applications with project-specific design checks.",
    intro: "Explore where pultruded composites fit in bridges, marine facilities and energy equipment. Start with the application, then examine its loading, exposure and qualification requirements before transferring a material result to a new project.",
    questions: ["Which loads and exposure conditions govern this infrastructure application?", "What distinguishes glass and carbon spar-cap evidence for wind blades?", "Where do pultruded profiles fit in solar, oil-and-gas or mine systems?"],
    startHere: ["frp-bridge-deck-design-guide", "frp-replacing-steel-coastal-infrastructure", "pultruded-frp-offshore-fishery-solar-mounts-and-frames"],
    nextLinks: [
      { label: "Bridge engineering and reference projects", href: "/case-studies/beam-bridge" },
      { label: "Marine applications", href: "/industries/marine" },
      { label: "Solar mounting profiles", href: "/applications/frp-solar-mounting-profiles" },
      { label: "Wind turbine blade panels", href: "/products/wind-turbine-blade-panels" },
    ],
  },
];

/**
 * One primary editorial query per existing article. These are intent choices,
 * not measured search volumes or ranking claims. The three existing blog
 * query owners retain their exact primaryQuery values from seoQueryTargets.ts.
 */
export const blogKeywordTargets: BlogKeywordTarget[] = [
  {
    slug: "frp-cable-tray-trunking-ladder-vs-metal", topic: "cable-management",
    primaryQuery: "FRP cable tray vs metal", secondaryQueries: ["cable ladder vs cable tray", "FRP trunking vs cable tray"], intent: "comparison",
    nextStep: { label: "Specify cable tray supports", href: "/applications/frp-cable-tray-supports" },
  },
  {
    slug: "china-first-all-composite-truss-bridge-pengshui", topic: "infrastructure-and-energy",
    primaryQuery: "Pengshui all composite truss bridge", secondaryQueries: ["China composite pedestrian bridge", "FRP truss bridge mountain access"], intent: "technical",
    nextStep: { label: "Explore bridge engineering references", href: "/case-studies/beam-bridge" },
  },
  {
    slug: "fiberglass-reinforced-plastic", topic: "materials-and-process",
    primaryQuery: "fiberglass reinforced plastic", secondaryQueries: ["fiberglass reinforced plastic properties", "fiberglass reinforced plastic uses"], intent: "guide",
    nextStep: { label: "Compare pultruded profile families", href: "/pultruded-frp-profiles" },
  },
  {
    slug: "frp-material", topic: "materials-and-process",
    primaryQuery: "FRP material", secondaryQueries: ["FRP material properties", "FRP resin and fiber selection"], intent: "technical",
    nextStep: { label: "Compare pultrusion resin systems", href: "/technology/pultrusion-resin-systems" },
  },
  {
    slug: "frp-meaning", topic: "materials-and-process",
    primaryQuery: "FRP full form", secondaryQueries: ["FRP meaning", "fiber reinforced polymer or plastic"], intent: "guide",
    nextStep: { label: "Read the FRP material overview", href: "/what-is-frp" },
  },
  {
    slug: "qualify-chinese-fiberglass-window-profile-supplier", topic: "windows-and-thermal-performance",
    primaryQuery: "qualify fiberglass window profile supplier", secondaryQueries: ["fiberglass window supplier checklist", "Chinese window profile supplier qualification"], intent: "commercial",
    nextStep: { label: "Review window and door profile supply", href: "/products/window-door-profiles" },
  },
  {
    slug: "fiberglass-window-profile-price-drivers", topic: "windows-and-thermal-performance",
    primaryQuery: "fiberglass window profile price drivers", secondaryQueries: ["fiberglass window lineal cost", "pultruded window profile quotation factors"], intent: "commercial",
    nextStep: { label: "Prepare a window profile enquiry", href: "/products/window-door-profiles" },
  },
  {
    slug: "fabricating-fiberglass-window-lineals-switching-guide", topic: "windows-and-thermal-performance",
    primaryQuery: "fabricating fiberglass window lineals", secondaryQueries: ["switching to fiberglass window profiles", "fiberglass window lineal machining"], intent: "technical",
    nextStep: { label: "Specify window and door lineals", href: "/products/window-door-profiles" },
  },
  {
    slug: "aluminum-window-condensation-cold-climate", topic: "windows-and-thermal-performance",
    primaryQuery: "aluminum window condensation in cold climates", secondaryQueries: ["window frame condensation causes", "thermal bridging aluminum window frames"], intent: "guide",
    nextStep: { label: "Compare FRP and aluminum window frames", href: "/technology/frp-vs-aluminum-windows" },
  },
  {
    slug: "frp-window-profile-market-suppliers-demand", topic: "windows-and-thermal-performance",
    primaryQuery: "FRP window profile market", secondaryQueries: ["fiberglass window profile suppliers", "pultruded window profile demand"], intent: "commercial",
    nextStep: { label: "Review window profile specifications", href: "/products/window-door-profiles" },
  },
  {
    slug: "frp-thermal-break-profiles-curtain-wall", topic: "windows-and-thermal-performance",
    primaryQuery: "FRP curtain wall thermal break profiles", secondaryQueries: ["structural thermal isolators curtain wall", "GFRP curtain wall thermal break design"], intent: "technical",
    nextStep: { label: "Discuss a custom thermal-break section", href: "/products/custom-pultruded-profiles" },
  },
  {
    slug: "pultruded-frp-pipe-oil-and-gas", topic: "infrastructure-and-energy",
    primaryQuery: "pultruded FRP pipe in oil and gas", secondaryQueries: ["pultruded tube oil and gas applications", "pultruded FRP pipe limitations"], intent: "technical",
    nextStep: { label: "Review structural fiberglass tube scope", href: "/products/fiberglass-structural-shapes/frp-tube" },
  },
  {
    slug: "frp-pipe-for-coal-mine-gas-drainage", topic: "infrastructure-and-energy",
    primaryQuery: "FRP pipe for coal mine gas drainage", secondaryQueries: ["antistatic FRP mine pipe", "flame retardant coal mine drainage pipe"], intent: "technical",
    nextStep: { label: "Prepare custom-profile requirements", href: "/products/custom-pultruded-profiles" },
  },
  {
    slug: "frp-vs-steel-structural-profiles", topic: "structural-design-and-procurement",
    primaryQuery: "FRP vs steel structural profiles", secondaryQueries: ["pultruded profile vs steel section", "FRP structural profile stiffness comparison"], intent: "comparison",
    nextStep: { label: "Compare structural material properties", href: "/technology/frp-vs-traditional-materials" },
  },
  {
    slug: "frp-fenestration-thermal-performance", topic: "windows-and-thermal-performance",
    primaryQuery: "FRP window frame thermal performance", secondaryQueries: ["fiberglass window frame Uf", "FRP frame thermal bridging"], intent: "technical",
    nextStep: { label: "Calculate whole-window U-value", href: "/technology/frp-u-value-calculator" },
  },
  {
    slug: "frp-grating-vs-steel-grating-cost-comparison", topic: "grating-and-access",
    primaryQuery: "FRP grating lifecycle cost", secondaryQueries: ["FRP vs steel grating maintenance cost", "grating whole system cost comparison"], intent: "comparison",
    nextStep: { label: "Compare FRP and steel grating systems", href: "/technology/frp-vs-steel-gratings" },
  },
  {
    slug: "frp-cable-tray-specifications-advantages", topic: "cable-management",
    primaryQuery: "FRP cable tray specification checklist", secondaryQueries: ["FRP cable tray load requirements", "FRP cable tray RFQ checklist"], intent: "technical",
    nextStep: { label: "Prepare a cable support enquiry", href: "/applications/frp-cable-tray-supports" },
  },
  {
    slug: "frp-bridge-deck-design-guide", topic: "infrastructure-and-energy",
    primaryQuery: "FRP bridge deck design", secondaryQueries: ["FRP bridge deck specification", "composite bridge deck design considerations"], intent: "technical",
    nextStep: { label: "Explore bridge design and load paths", href: "/case-studies/beam-bridge" },
  },
  {
    slug: "frp-windows-hurricane-wind-borne-debris-resistance", topic: "windows-and-thermal-performance",
    primaryQuery: "FRP window hurricane testing requirements", secondaryQueries: ["fiberglass windows ASTM E1996", "wind borne debris window test evidence"], intent: "technical",
    nextStep: { label: "Review window product evidence", href: "/resources/evidence" },
  },
  {
    slug: "pultrusion-industry-questions-2026", topic: "materials-and-process",
    primaryQuery: "pultrusion industry questions 2026", secondaryQueries: ["pultrusion qualification challenges", "pultrusion industry technical questions"], intent: "guide",
    nextStep: { label: "Understand the pultrusion process", href: "/technology/pultrusion-process" },
  },
  {
    slug: "engineers-most-asked-questions-pultruded-frp", topic: "structural-design-and-procurement",
    primaryQuery: "questions before specifying pultruded FRP", secondaryQueries: ["pultruded FRP specification checklist", "FRP engineering design questions"], intent: "guide",
    nextStep: { label: "Review structural profile options", href: "/products/fiberglass-structural-shapes" },
  },
  {
    slug: "biggest-pain-point-pultrusion-qualification-speed", topic: "structural-design-and-procurement",
    primaryQuery: "pultruded FRP qualification process", secondaryQueries: ["FRP profile qualification lead time", "pultrusion approval documentation"], intent: "technical",
    nextStep: { label: "Review quality and testing requirements", href: "/technology/quality-testing" },
  },
  {
    slug: "pultrusion-industry-trends-2026", topic: "materials-and-process",
    primaryQuery: "pultrusion industry trends 2026", secondaryQueries: ["pultrusion standards developments", "pultrusion sustainability trends"], intent: "guide",
    nextStep: { label: "Explore pultrusion technology", href: "/technology/pultrusion-process" },
  },
  {
    slug: "frp-replacing-steel-coastal-infrastructure", topic: "infrastructure-and-energy",
    primaryQuery: "FRP replacing steel in coastal infrastructure", secondaryQueries: ["FRP coastal corrosion resistance", "marine infrastructure FRP lifecycle"], intent: "comparison",
    nextStep: { label: "Explore marine applications", href: "/industries/marine" },
  },
  {
    slug: "frp-fenestration-passivhaus-certification", topic: "windows-and-thermal-performance",
    primaryQuery: "fiberglass window frame Passivhaus certification", secondaryQueries: ["FRP fenestration PHI certification", "Passive House window frame certificate scope"], intent: "technical",
    nextStep: { label: "Inspect window certificate applicability", href: "/resources/evidence" },
  },
  {
    slug: "thermoset-frp-recycling-breakthrough", topic: "materials-and-process",
    primaryQuery: "thermoset FRP chemical recycling", secondaryQueries: ["glass fiber recovery thermoset composites", "FRP resin chemical degradation recycling"], intent: "technical",
    nextStep: { label: "Review the pultrusion manufacturing process", href: "/technology/pultrusion-process" },
  },
  {
    slug: "frp-fire-resistance-ratings-guide", topic: "materials-and-process",
    primaryQuery: "FRP fire ratings and resin selection", secondaryQueries: ["FRP fire resistance ratings", "flame retardant FRP test requirements"], intent: "technical",
    nextStep: { label: "Review product-specific test evidence", href: "/resources/evidence" },
  },
  {
    slug: "frp-impact-resistance-vs-steel-aluminum", topic: "materials-and-process",
    primaryQuery: "FRP impact resistance vs steel and aluminum", secondaryQueries: ["pultruded FRP drop test", "FRP three point bending impact resistance"], intent: "comparison",
    nextStep: { label: "Compare structural material properties", href: "/technology/frp-vs-traditional-materials" },
  },
  {
    slug: "gfrp-fenestration-australian-market-as2047", topic: "windows-and-thermal-performance",
    primaryQuery: "GFRP windows AS 2047 testing", secondaryQueries: ["fiberglass windows Australian requirements", "AS 2047 window test scope"], intent: "technical",
    nextStep: { label: "Review tested window product evidence", href: "/resources/evidence" },
  },
  {
    slug: "frp-window-profiles-powder-coating-aluminum-finish", topic: "windows-and-thermal-performance",
    primaryQuery: "powder coated FRP window profiles", secondaryQueries: ["fiberglass window profile powder coating", "FRP window aluminum appearance finish"], intent: "technical",
    nextStep: { label: "Specify window profile finish and fabrication", href: "/products/window-door-profiles" },
  },
  {
    slug: "frp-lift-sliding-door-as2047-engineering", topic: "windows-and-thermal-performance",
    primaryQuery: "FRP lift sliding door AS 2047", secondaryQueries: ["GFRP patio door engineering", "fiberglass lift sliding door test configuration"], intent: "technical",
    nextStep: { label: "Review finished window and door supply", href: "/products/fiberglass-windows-doors" },
  },
  {
    slug: "frp-window-finish-transverse-reinforcement", topic: "windows-and-thermal-performance",
    primaryQuery: "FRP window profile surface finish", secondaryQueries: ["fiberglass window fiber telegraphing", "transverse reinforcement pultruded window finish"], intent: "technical",
    nextStep: { label: "Specify fabricated window profiles", href: "/products/window-door-profiles" },
  },
  {
    slug: "how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide", topic: "structural-design-and-procurement",
    primaryQuery: "how to source pultruded FRP profiles from China", secondaryQueries: ["importing pultruded FRP profiles", "China FRP profile procurement checklist"], intent: "commercial",
    nextStep: { label: "Review export terms and shipment preparation", href: "/resources/frp-pultrusion-fob-ddp-export-guide" },
  },
  {
    slug: "frp-profile-cost-benchmarks-and-lead-times-2026", topic: "structural-design-and-procurement",
    primaryQuery: "FRP profile MOQ and lead times", secondaryQueries: ["FRP profile cost benchmarks", "custom pultrusion tooling and order quantity"], intent: "commercial",
    nextStep: { label: "Build a profile price estimate", href: "/fiberglass-pultruded-profile-price" },
  },
  {
    slug: "gfrp-pultruded-spar-cap-fatigue-wind-blade", topic: "infrastructure-and-energy",
    primaryQuery: "GFRP pultruded spar cap fatigue", secondaryQueries: ["glass fiber spar cap fatigue testing", "wind blade pultruded laminate fatigue design"], intent: "technical",
    nextStep: { label: "Review wind turbine blade panels", href: "/products/wind-turbine-blade-panels" },
  },
  {
    slug: "cfrp-pultruded-spar-cap-static-design-wind-blade", topic: "infrastructure-and-energy",
    primaryQuery: "CFRP pultruded spar cap static design", secondaryQueries: ["carbon fiber spar cap characteristic values", "DNV wind blade pultruded laminate design"], intent: "technical",
    nextStep: { label: "Review wind blade panel supply scope", href: "/products/wind-turbine-blade-panels" },
  },
  {
    slug: "pultruded-frp-offshore-fishery-solar-mounts-and-frames", topic: "infrastructure-and-energy",
    primaryQuery: "FRP offshore fishery solar mounting", secondaryQueries: ["FRP tidal solar support profiles", "pultruded composites fishery photovoltaic frames"], intent: "technical",
    nextStep: { label: "Specify solar mounting profiles", href: "/applications/frp-solar-mounting-profiles" },
  },
  {
    slug: "frp-curtain-wall-mullion-transom-carbon-glass-hybrid-pultrusion", topic: "windows-and-thermal-performance",
    primaryQuery: "FRP curtain wall mullions and transoms", secondaryQueries: ["hybrid carbon glass curtain wall profiles", "pultruded curtain wall mullion stiffness"], intent: "technical",
    nextStep: { label: "Review custom-profile development", href: "/products/custom-pultruded-profiles" },
  },
  {
    slug: "en-iso-10077-window-u-value-calculation", topic: "windows-and-thermal-performance",
    primaryQuery: "EN ISO 10077 window U value calculation", secondaryQueries: ["whole window Uw calculation", "Uf Ug psi window U value formula"], intent: "technical",
    nextStep: { label: "Calculate a whole-window U-value", href: "/technology/frp-u-value-calculator" },
  },
  {
    slug: "passive-house-window-u-value-requirements", topic: "windows-and-thermal-performance",
    primaryQuery: "Passive House window U value requirements", secondaryQueries: ["PHI window U value climate zones", "Phius window thermal requirements"], intent: "guide",
    nextStep: { label: "Review window project requirements", href: "/resources/frp-windows-guide" },
  },
  {
    slug: "window-u-value-vs-shgc-climate", topic: "windows-and-thermal-performance",
    primaryQuery: "window U value vs SHGC by climate", secondaryQueries: ["U value and solar heat gain coefficient", "window thermal targets hot and cold climates"], intent: "comparison",
    nextStep: { label: "Screen whole-window thermal performance", href: "/technology/frp-u-value-calculator" },
  },
  {
    slug: "pultruded-thermal-break-profiles-aluminum-windows", topic: "windows-and-thermal-performance",
    primaryQuery: "GFRP thermal breaks for aluminum windows", secondaryQueries: ["pultruded thermal break vs polyamide", "fiberglass aluminum window thermal isolator"], intent: "comparison",
    nextStep: { label: "Specify a custom thermal-break profile", href: "/products/custom-pultruded-profiles" },
  },
  {
    slug: "frp-density-fiberglass-profile-density-explained", topic: "materials-and-process",
    primaryQuery: "pultruded FRP density explained", secondaryQueries: ["fiberglass profile density factors", "glass content and composite density"], intent: "technical",
    nextStep: { label: "Calculate estimated composite density", href: "/frp-density-calculator" },
  },
  {
    slug: "frp-handrail-guardrail-requirements-osha-ibc-iso-14122", topic: "grating-and-access",
    primaryQuery: "FRP handrail and guardrail requirements", secondaryQueries: ["FRP guardrail OSHA 1910.29", "FRP handrail ISO 14122 requirements"], intent: "technical",
    nextStep: { label: "Review handrail system specifications", href: "/products/frp-handrail-systems" },
  },
  {
    slug: "fixed-ladder-requirements-osha-iso-14122-4", topic: "grating-and-access",
    primaryQuery: "FRP fixed ladder requirements", secondaryQueries: ["fiberglass ladder OSHA requirements", "fixed ladder ISO 14122-4"], intent: "technical",
    nextStep: { label: "Specify a fixed ladder system", href: "/products/frp-ladders" },
  },
  {
    slug: "gfrp-rebar-specification-guide-aci-440-astm-d7957", topic: "gfrp-rebar",
    primaryQuery: "GFRP rebar specification guide", secondaryQueries: ["GFRP rebar ASTM D7957", "ACI 440.11 rebar submittal requirements"], intent: "technical",
    nextStep: { label: "Prepare a GFRP rebar specification enquiry", href: "/products/frp-rebar" },
  },
  {
    slug: "gfrp-bent-bars-stirrups-mesh-ordering-guide", topic: "gfrp-rebar",
    primaryQuery: "GFRP bent bars and stirrups ordering guide", secondaryQueries: ["can you bend fiberglass rebar", "GFRP rebar bend schedule", "GFRP mesh ordering requirements"], intent: "commercial",
    nextStep: { label: "Download the rebar schedule template", href: "/downloads/f1-rebar-schedule-template.csv" },
  },
  {
    slug: "how-to-install-frp-grating", topic: "grating-and-access",
    primaryQuery: "how to install FRP grating", secondaryQueries: ["fiberglass grating hold down clips", "FRP grating cutting and edge sealing"], intent: "guide",
    nextStep: { label: "Select a fiberglass grating system", href: "/products/grating" },
  },
  {
    slug: "how-to-read-frp-grating-load-table", topic: "grating-and-access",
    primaryQuery: "how to read FRP grating load tables", secondaryQueries: ["FRP grating span and deflection", "fiberglass grating load table interpretation"], intent: "technical",
    nextStep: { label: "Compare grating panel constructions", href: "/products/grating" },
  },
  {
    slug: "how-to-install-frp-cable-tray", topic: "cable-management",
    primaryQuery: "how to install FRP cable tray", secondaryQueries: ["FRP cable ladder support installation", "FRP cable tray expansion and splice joints"], intent: "guide",
    nextStep: { label: "Review cable tray support specifications", href: "/applications/frp-cable-tray-supports" },
  },
  {
    slug: "how-to-install-frp-handrail", topic: "grating-and-access",
    primaryQuery: "how to install FRP handrail", secondaryQueries: ["fiberglass handrail post base anchors", "FRP handrail fittings and edge sealing"], intent: "guide",
    nextStep: { label: "Review handrail components and fixings", href: "/products/frp-handrail-systems" },
  },
  {
    slug: "how-to-install-gfrp-rebar", topic: "gfrp-rebar",
    primaryQuery: "how to install GFRP rebar", secondaryQueries: ["GFRP rebar handling and storage", "fiberglass rebar ties and concrete placement"], intent: "guide",
    nextStep: { label: "Review rebar supply and schedule requirements", href: "/products/frp-rebar" },
  },
  {
    slug: "fiberglass-rebar-cost-per-foot", topic: "gfrp-rebar",
    primaryQuery: "fiberglass rebar cost per foot", secondaryQueries: ["GFRP rebar price", "fiberglass rebar vs steel price"], intent: "commercial",
    nextStep: { label: "Request a GFRP rebar quotation", href: "/products/frp-rebar" },
  },
  {
    slug: "how-to-cut-fiberglass-rebar", topic: "gfrp-rebar",
    primaryQuery: "how to cut fiberglass rebar", secondaryQueries: ["cut GFRP rebar with an angle grinder", "fiberglass rebar cutting tools"], intent: "guide",
    nextStep: { label: "Order GFRP bars cut to your schedule", href: "/products/frp-rebar" },
  },
  {
    slug: "basalt-rebar-vs-fiberglass-rebar", topic: "gfrp-rebar",
    primaryQuery: "basalt rebar vs fiberglass rebar", secondaryQueries: ["BFRP vs GFRP rebar", "basalt rebar standards"], intent: "comparison",
    nextStep: { label: "Review GFRP rebar supply", href: "/products/frp-rebar" },
  },
  {
    slug: "frp-grating-specification-guide", topic: "grating-and-access",
    primaryQuery: "FRP grating specification", secondaryQueries: ["fiberglass grating specification", "FRP grating guide specification 06 74 13"], intent: "technical",
    nextStep: { label: "Download the FRP grating guide specification", href: "/downloads/f1-frp-grating-guide-specification.txt" },
  },
];

const topicsBySlug = new Map(blogTopics.map((topic) => [topic.slug as string, topic]));
const targetsBySlug = new Map(blogKeywordTargets.map((target) => [target.slug, target]));

export function getBlogTopic(slug: string): BlogTopic | undefined {
  return topicsBySlug.get(slug);
}

export function getBlogTarget(slug: string): BlogKeywordTarget | undefined {
  return targetsBySlug.get(slug);
}

export function topicHref(slug: string): string {
  return `/resources/blog/topics/${slug}`;
}

function newestFirst(a: BlogPost, b: BlogPost) {
  return b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
}

export function getTopicPosts(topicSlug: string): BlogPost[] {
  return blogPosts
    .filter((post) => getBlogTarget(post.slug)?.topic === topicSlug)
    .sort(newestFirst);
}

/** Preserve editorial links first, then offer topic entry points and new reads. */
export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const post = blogPostsBySlug[slug];
  const target = getBlogTarget(slug);
  if (!post || !target || !Number.isFinite(limit) || limit <= 0) return [];

  const topic = getBlogTopic(target.topic);
  const linkedSlugs = post.relatedLinks
    .filter((link) => link.href.startsWith("/resources/blog/"))
    .map((link) => link.href.slice("/resources/blog/".length).split(/[?#]/)[0]);
  const candidateSlugs = [
    ...linkedSlugs,
    ...(topic?.startHere ?? []),
    ...getTopicPosts(target.topic).map((item) => item.slug),
  ];
  const seen = new Set([slug]);
  const related: BlogPost[] = [];
  const count = Math.floor(limit);
  if (count === 0) return [];
  for (const candidate of candidateSlugs) {
    if (seen.has(candidate) || !blogPostsBySlug[candidate]) continue;
    seen.add(candidate);
    related.push(blogPostsBySlug[candidate]);
    if (related.length >= count) break;
  }
  return related;
}
