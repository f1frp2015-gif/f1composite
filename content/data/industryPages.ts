// Industry pages in the industry template (components/industries/IndustryPage):
// the areas where FRP is used and what to check there, the products, the
// projects and applications, documents, questions and the quote checklist.
//
// Every statement here must be supportable from a product page, an
// application page, a case study, company.ts or the evidence library.
// Certifications, service lives, cost savings and test results are not
// stated for the whole range: reports belong to a formulation and product
// and are confirmed per project (see WEBSITE.md, content and fact rules).

import type { GlyphShape } from "@/components/ui/SectionGlyph";
import type { ApplicationCard } from "@/components/products/ApplicationCards";
import { factoryStaircase } from "@/lib/familyApplications";
import { getApplicationPage } from "@/lib/applicationPages";

export interface IndustryArea {
  area: string;
  exposure: string;
  parts: string;
  check: string;
}

export interface IndustryProduct {
  label: string;
  href: string;
  glyph: GlyphShape;
  reason: string;
}

export interface IndustryPageData {
  slug: string;
  path: string;
  name: string;
  updated: string;
  h1: string;
  intro: string;
  image: { src: string; alt: string; note: string; caption: string };
  areas: IndustryArea[];
  areasIntro: string;
  products: IndustryProduct[];
  projects: ApplicationCard[];
  reading: { label: string; href: string }[];
  documentPaths: string[];
  faqs: { question: string; answer: string }[];
  request: { title: string; text: string }[];
}

function applicationCard(slug: string, text?: string): ApplicationCard {
  const page = getApplicationPage(slug);
  if (!page) throw new Error(`Unknown application page: ${slug}`);
  return { href: `/applications/${page.slug}`, kind: "Application", title: page.shortTitle, text: text ?? page.description, image: page.image, imageAlt: page.imageAlt };
}

const ILLUSTRATIVE = "Illustrative photo, not an F1 project";

export const industryPages = {
  energy: {
    slug: "energy",
    path: "/industries/energy",
    name: "Energy & power",
    updated: "2026-09-26",
    h1: "FRP Composite Profiles for Energy & Electric Power",
    intro:
      "Pultruded FRP profiles for substations, cable routes, solar mounting and wind energy. Glass FRP is non-conductive and does not rust, so it suits equipment areas where steel needs grounding, bonding or recoating; the laminate and the assembly are confirmed for each project.",
    image: {
      src: "/images/industries/frp-electric-power-substation-infrastructure.jpg",
      alt: "Electrical substation with steel gantries at dusk",
      note: ILLUSTRATIVE,
      caption: "Substations, cable routes and solar sites are where FRP supports and frames replace steel most often.",
    },
    areasIntro: "The parts change from one kind of energy site to the next, and so do the checks. Electrical and fire requirements belong to the specified laminate and assembly, not to fiberglass as a category.",
    areas: [
      { area: "Substations and switchyards", exposure: "Steel frames need grounding and bonding, and corrode in coastal or industrial air", parts: "Equipment stands, frames and trench covers from standard profiles", check: "Clearances, dielectric data for the specified laminate, UV exposure and any fire classification" },
      { area: "Cable routes in plants", exposure: "Steel trays and supports rust in damp, chemical or coastal areas", parts: "Channels, angles and brackets for cable supports; custom tray sections", check: "Cable weight, support spacing, fire-retardant resin where required, the electrical design basis" },
      { area: "Solar mounting", exposure: "Zinc coatings wear on coastal, agricultural and floating sites; many roofs have little spare capacity", parts: "Rails, posts, clamps and PV module frame profiles", check: "Wind and snow loads, UV-stabilised resin and surface veil, connections and roof capacity" },
      { area: "Wind energy", exposure: "Blade reinforcement needs light laminates with documented fatigue behaviour", parts: "Pultruded spar-cap panels in glass, carbon or hybrid laminates", check: "The laminate data sheet and the blade designer's qualification route" },
      { area: "Transformers and switchgear", exposure: "Metal parts near high-current conductors can heat by induction", parts: "Custom insulating spacers, standoffs and supports", check: "Temperature class of the resin, and dielectric and thermal test data for the specific part" },
    ],
    products: [
      { label: "Standard structural profiles", href: "/products/fiberglass-structural-shapes", glyph: "i_beam", reason: "Frames, equipment stands and supports from 114 catalog sizes." },
      { label: "Custom profiles", href: "/products/custom-pultruded-profiles", glyph: "custom", reason: "Insulating spacers, tray sections and special shapes on new tooling." },
      { label: "Solar mounting systems", href: "/products/frp-solar-mounting-systems", glyph: "channel", reason: "PV module frames, rails and supports for rooftops, farms and coastal sites." },
      { label: "Wind turbine blade panels", href: "/products/wind-turbine-blade-panels", glyph: "sheet", reason: "Pultruded spar-cap panels in glass, carbon and hybrid laminates." },
      { label: "Pultruded grating", href: "/products/frp-gratings", glyph: "grating", reason: "Walkways and platforms around equipment." },
      { label: "Fasteners and fittings", href: "/products/frp-fasteners-fittings", glyph: "fastener", reason: "Fiberglass threaded rods, nuts and fittings for non-metallic joints." },
    ],
    projects: [
      {
        href: "/case-studies/chongqing-rooftop-pv-frp-rail",
        kind: "Case study",
        title: "Chongqing rooftop PV retrofit",
        text: "Pultruded GFRP H-rail on colour steel-tile factory roofs, with about 75% less rail dead load than galvanized steel.",
        image: "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
        imageAlt: "Solar modules on FRP rails over a colour steel-tile factory roof in Chongqing",
      },
      applicationCard("frp-solar-mounting-profiles"),
      applicationCard("frp-cable-tray-supports"),
    ],
    reading: [
      { label: "FRP for offshore, tidal and fishery-PV mounts", href: "/resources/blog/pultruded-frp-offshore-fishery-solar-mounts-and-frames" },
      { label: "How to specify FRP cable tray", href: "/resources/blog/frp-cable-tray-specifications-advantages" },
    ],
    documentPaths: ["/products/wind-turbine-blade-panels", "/products/frp-solar-mounting-systems", "/products/fiberglass-structural-shapes"],
    faqs: [
      { question: "Is FRP non-conductive enough for electrical applications?", answer: "Glass-fiber FRP is an electrical insulator, which is why it is used for supports near energized equipment. Its dielectric performance depends on the resin, glass content, surface condition, moisture and contamination. Request the dielectric test data for the specified laminate, and design the assembly, including any metal hardware, to your electrical standard." },
      { question: "Can FRP be used outdoors on solar and substation sites?", answer: "Yes, with a UV-stabilised resin and surface veil and, where specified, a compatible coating. Appearance and property retention depend on the resin, pigment, climate and exposure time, so state the location and design life and ask for the applicable weathering evidence." },
      { question: "Are FRP profiles fire-retardant?", answer: "Fire-retardant polyester, vinyl ester and phenolic laminates are available; the standard polyester laminate is not fire-retardant. Fire test reports are issued for a specified formulation and profile, so list the classification your project requires in the RFQ." },
      { question: "What operating temperature can FRP profiles take?", answer: "Standard laminates are used well below the resin's glass transition; the structural pages treat continuous service above about 60 °C as a reason to review the resin. Parts near transformers or other hot equipment need a resin selected and tested for the operating and peak temperatures you send." },
    ],
    request: [
      { title: "Application and site", text: "What the parts do, where they are installed, and the indoor or outdoor exposure." },
      { title: "Loads and layout", text: "Spans, support spacing, equipment or cable weights and any drawings." },
      { title: "Electrical and fire", text: "Dielectric, grounding and fire requirements, and the standards your project cites." },
      { title: "Quantities and delivery", text: "Lengths or part counts, destination and target date." },
    ],
  },
  industrial: {
    slug: "industrial",
    path: "/industries/industrial",
    name: "Industrial & chemical",
    updated: "2026-09-26",
    h1: "FRP Composite Profiles for Industrial Applications",
    intro:
      "Fiber-reinforced polymer (FRP) profiles for processing plants, water treatment facilities and manufacturing sites where steel corrodes: chemical-resistant resins, fire-retardant grades and low maintenance.",
    image: {
      src: "/images/industries/frp-industrial-chemical-plant-facility.jpg",
      alt: "Chemical processing plant with columns, tanks and pipe racks",
      note: ILLUSTRATIVE,
      caption: "Access routes, supports and cable routes in corrosive process areas are the usual starting points for FRP.",
    },
    areasIntro: "Corrosion, wash-down and access needs differ across a plant. Resin compatibility is confirmed per chemical, and safety requirements apply to the complete assembly.",
    areas: [
      { area: "Chemical processing", exposure: "Acids, alkalis and solvents corrode steel and attack its coatings", parts: "Platforms, grating, handrails, ladders and equipment frames", check: "Each chemical with its concentration and temperature; vinyl ester is the usual starting resin" },
      { area: "Access around equipment", exposure: "Steel access routes need recoating, and changes need hot-work permits", parts: "Molded or pultruded grating, stair treads, handrail systems, fixed ladders", check: "Loads, spans and openings, and guard and ladder requirements such as OSHA 1910.29 for the complete assembly" },
      { area: "Wash-down areas", exposure: "Constant moisture and cleaning agents in food, beverage and pharmaceutical plants", parts: "Grating, stair treads, covers and frames", check: "Cleaning agents and temperatures; any food-contact or hygiene requirement is confirmed for the specific resin and surface" },
      { area: "Cooling towers", exposure: "Humidity, chlorides, biocides and wet-dry cycling", parts: "Beams, tubes, angles, louvers and grating supports", check: "Water chemistry, temperature, loads and any fire requirement" },
      { area: "Cable routes and instrument areas", exposure: "Metal supports corrode and need grounding", parts: "Channels, angles and brackets for cable supports; instrument stands", check: "Cable weight, support spacing and fire-retardant resin where required" },
    ],
    products: [
      { label: "Molded FRP grating", href: "/products/molded-frp-grating", glyph: "grating", reason: "Two-way mesh panels for platforms and walkways around equipment." },
      { label: "Pultruded FRP grating", href: "/products/frp-gratings", glyph: "grating", reason: "Bearing-bar panels for span-led layouts." },
      { label: "Fiberglass handrail systems", href: "/products/frp-handrail-systems", glyph: "tube", reason: "Posts, rails, kick plates and fittings in square or round tube." },
      { label: "Industrial FRP fixed ladders", href: "/products/frp-ladders", glyph: "channel", reason: "Pultruded rails, fluted rungs, brackets and optional cages." },
      { label: "Standard structural profiles", href: "/products/fiberglass-structural-shapes", glyph: "i_beam", reason: "Beams, channels, angles and tubes for frames and supports." },
      { label: "FRP sound barrier walls", href: "/products/frp-sound-barrier-wall", glyph: "multicell", reason: "Noise barrier panels for industrial equipment and plant boundaries." },
    ],
    projects: [
      applicationCard("frp-chemical-plant-platforms"),
      { ...factoryStaircase, used: "I-beams, square tubes, round tube, flat bar and molded grating" },
      applicationCard("frp-cooling-tower-profiles"),
    ],
    reading: [
      { label: "FRP vs steel grating", href: "/technology/frp-vs-steel-gratings" },
      { label: "FRP pipe for coal mine gas drainage", href: "/resources/blog/frp-pipe-for-coal-mine-gas-drainage" },
      { label: "Water and wastewater facilities", href: "/industries/water-wastewater" },
    ],
    documentPaths: ["/products/fiberglass-structural-shapes", "/pultruded-frp-profiles"],
    faqs: [
      { question: "Which chemicals can FRP profiles resist?", answer: "It depends on the resin. Vinyl ester is the usual choice for acids, alkalis, chlorine chemicals and wastewater; isophthalic polyester suits milder exposure. Send each chemical with its concentration and temperature, and whether it splashes or immerses, and resin compatibility is confirmed per chemical." },
      { question: "What fire performance do FRP profiles achieve in industrial settings?", answer: "Fire-retardant resin systems, including halogen-free options, are available for industrial profiles. A pultruded composite profile has an SGS report for UL 94 V-0 self-extinguishing behaviour, published on the evidence page. ASTM E84 flame-spread, ASTM E662 smoke density, BS 6853 toxicity and ASTM E119 fire-resistance reports are provided on request for the formulation you specify." },
      { question: "Do FRP ladders and handrails meet OSHA requirements?", answer: "Compliance belongs to the complete assembly: rails, posts, fittings, anchors and the supporting structure. OSHA 1910.29 sets the requirements for guardrails and fixed ladders in general industry, and the design and installation are checked against it for the project." },
      { question: "Can FRP profiles carry the same loads as steel?", answer: "They can be sized for the same loads, usually as deeper sections, because the modulus is about a tenth of steel's. Compare sections with the span tables and the profile calculator, then confirm with the project calculations." },
    ],
    request: [
      { title: "Chemicals and temperatures", text: "Each chemical with its concentration, temperature and splash or immersion." },
      { title: "Loads and layout", text: "Spans, supports, openings and drawings for platforms, stairs and frames." },
      { title: "Safety and fire", text: "Guard, ladder and fire requirements, and the standards your plant uses." },
      { title: "Quantities and delivery", text: "Panel areas, lengths or assemblies, destination and target date." },
    ],
  },
  infrastructure: {
    slug: "infrastructure",
    path: "/industries/infrastructure",
    name: "Infrastructure",
    updated: "2026-09-26",
    h1: "FRP Composite Profiles for Infrastructure",
    intro:
      "Fiber-reinforced polymer (FRP) profiles for bridge decks, pedestrian structures, handrails and utility infrastructure. They do not rust, so they avoid the corrosion cycle that wears out steel and reinforced concrete.",
    image: {
      src: "/images/industries/frp-infrastructure-pultruded-profiles-rendering.webp",
      alt: "Rendering of a pedestrian bridge with pultruded FRP girders and yellow handrails over a river",
      note: "Rendering",
      caption: "Pedestrian bridges, decks, handrails and noise barriers are the usual infrastructure uses; members and connections are designed for each project.",
    },
    areasIntro: "Infrastructure work runs to a design code and an owner's acceptance process. The checks below are the ones that usually decide whether FRP fits.",
    areas: [
      { area: "Pedestrian and cycle bridges", exposure: "Steel girders need recoating; heavy spans need cranes", parts: "I-beams and girders, deck panels, grating, handrails", check: "Deflection and vibration, connections and the owner's acceptance of FRP" },
      { area: "Decks and walkways", exposure: "De-icing salt and coastal air corrode steel and reinforcement", parts: "Closed-top deck panels, pultruded grating", check: "Point and wheel loads, slip resistance, drainage and hold-down details" },
      { area: "Handrails and guardrails", exposure: "Galvanized rails corrode at welds and fixings", parts: "Handrail systems in square or round tube", check: "Guard loads and deflection for the complete system, anchors and the governing code" },
      { area: "Noise barriers", exposure: "Metal panels corrode, and weight drives the foundations", parts: "FRP sound barrier wall panels with posts and closures", check: "Wind loads, post spacing and the acoustic test data of the configured system" },
      { area: "Concrete in chloride exposure", exposure: "Steel reinforcement corrodes and spalls the concrete", parts: "GFRP straight bars, factory bends and mesh", check: "Design code, bond, anchorage and an approved bar schedule" },
    ],
    products: [
      { label: "FRP I-beams", href: "/products/fiberglass-structural-shapes/frp-i-beam", glyph: "i_beam", reason: "Girders and cross-members for pedestrian bridges and frames." },
      { label: "Structural deck panels", href: "/products/frp-deck-panels", glyph: "multicell", reason: "Closed-top planks for pedestrian bridges and light access decks." },
      { label: "Pultruded grating", href: "/products/frp-gratings", glyph: "grating", reason: "Open walking surfaces with drainage." },
      { label: "Handrail systems", href: "/products/frp-handrail-systems", glyph: "tube", reason: "Posts, rails and fittings for walkways and bridges." },
      { label: "FRP sound barrier walls", href: "/products/frp-sound-barrier-wall", glyph: "sheet", reason: "Reflective or absorptive panels for roads and railways." },
      { label: "GFRP rebar", href: "/products/frp-rebar", glyph: "rebar", reason: "Bars, bends and mesh for concrete in chloride exposure." },
    ],
    projects: [
      {
        href: "/case-studies/beam-bridge",
        kind: "Design guide",
        title: "Beam bridge design",
        text: "Load paths, width, vibration and FRP detailing for pedestrian and cycle bridges, with three source-backed case studies.",
        image: "/images/case-studies/beam-bridge/pedestrian-cycle-bridge-section.svg",
        imageAlt: "Cross-section of a pedestrian bridge with longitudinal I-girders under the deck",
        fit: "contain",
      },
      applicationCard("frp-pedestrian-bridge-superstructures"),
      applicationCard("frp-bridge-deck-panels"),
    ],
    reading: [
      { label: "Fiberglass rebar vs steel", href: "/technology/fiberglass-rebar-vs-steel" },
      { label: "FRP vs steel, aluminum and timber", href: "/technology/frp-vs-traditional-materials" },
      { label: "Custom pultrusions", href: "/products/custom-pultruded-profiles" },
    ],
    documentPaths: ["/products/fiberglass-structural-shapes", "/products/frp-deck-panels"],
    faqs: [
      { question: "How long do FRP infrastructure components last?", answer: "Design life and maintenance depend on the material system, loads, exposure, connections and inspection plan, so no single service life applies to every product. State the design life your project needs and request the evidence for the offered laminate." },
      { question: "Can FRP handrails and guardrails meet code requirements?", answer: "The complete system is what gets checked: posts, top and middle rails, fittings, splices, base details, anchors and the supporting structure, against the governing guard loads and deflection criteria." },
      { question: "Why use FRP for a pedestrian bridge?", answer: "Light members can be lifted with smaller equipment and do not need anti-corrosion recoating. Because FRP is about a tenth as stiff as steel, the design usually has to control deflection and vibration; the beam bridge guide sets out the checks." },
    ],
    request: [
      { title: "Structure and spans", text: "Bridge, deck, walkway or barrier type, spans and supports, with drawings." },
      { title: "Loads and design code", text: "Pedestrian, vehicle, wind and guard loads, and the code or owner's standard." },
      { title: "Exposure and design life", text: "De-icing salt, coastal air, UV and the required design life." },
      { title: "Quantities and site", text: "Members, panels or rails, lengths, delivery site and program." },
    ],
  },
  marine: {
    slug: "marine",
    path: "/industries/marine",
    name: "Marine & offshore",
    updated: "2026-09-26",
    h1: "FRP Composite Profiles for Marine Applications",
    intro:
      "Pultruded FRP profiles and grating for docks, marinas, offshore platforms and coastal walkways. Glass FRP does not rust in seawater, so it avoids the recoating cycle of steel; vinyl ester is the usual resin for splash and immersion.",
    image: {
      src: "/images/industries/frp-marine-harbor-dock-structure.jpg",
      alt: "Timber pier with white handrails on a harbor",
      note: ILLUSTRATIVE,
      caption: "Docks, piers and walkways are where FRP grating, handrails and profiles replace steel and timber.",
    },
    areasIntro: "Salt, splash and UV act on every marine structure; the loads and approval routes differ. These are the usual areas and what to confirm for each.",
    areas: [
      { area: "Docks and marinas", exposure: "Steel corrodes in the splash zone and timber decays", parts: "Grating, deck panels, frames and handrails", check: "Berthing, crowd and point loads, fixings and UV exposure" },
      { area: "Offshore platforms", exposure: "Corrosion maintenance is costly offshore, and weight matters", parts: "Grating, handrails, ladders and cable supports", check: "The operator's fire and approval requirements, and the loads" },
      { area: "Coastal walkways and piers", exposure: "Salt spray on wet walking surfaces", parts: "Gritted grating, stair treads and handrails", check: "Slip resistance, drainage, anchors and fixings" },
      { area: "Aquaculture and fishery PV", exposure: "Immersion or splash with strong UV", parts: "Frames, mounts and structural profiles", check: "Immersion behaviour of the resin and sealed cut edges" },
      { area: "Tie-rods and anchors", exposure: "Steel rods corrode in seawater", parts: "Solid FRP rods", check: "Design tensile values for the diameter and resin, and the anchorage" },
    ],
    products: [
      { label: "Molded FRP grating", href: "/products/molded-frp-grating", glyph: "grating", reason: "Gritted mesh panels for wet walking surfaces." },
      { label: "Pultruded FRP grating", href: "/products/frp-gratings", glyph: "grating", reason: "Bearing-bar panels for spans between supports." },
      { label: "Structural deck panels", href: "/products/frp-deck-panels", glyph: "multicell", reason: "Closed-top planks for piers and pedestrian decks." },
      { label: "Handrail systems", href: "/products/frp-handrail-systems", glyph: "tube", reason: "Rails and posts that do not rust in salt air." },
      { label: "Standard structural profiles", href: "/products/fiberglass-structural-shapes", glyph: "i_beam", reason: "Frames and supports from 114 catalog sizes." },
      { label: "Solid rods", href: "/products/fiberglass-structural-shapes/frp-rod", glyph: "rod", reason: "Ø6–50 mm rods for tie-rods and anchors." },
    ],
    projects: [
      applicationCard("frp-bridge-deck-panels"),
      applicationCard("frp-pedestrian-bridge-superstructures"),
    ],
    reading: [
      { label: "Why FRP is replacing steel in coastal infrastructure", href: "/resources/blog/frp-replacing-steel-coastal-infrastructure" },
      { label: "FRP for offshore, tidal and fishery-PV mounts", href: "/resources/blog/pultruded-frp-offshore-fishery-solar-mounts-and-frames" },
      { label: "FRP vs steel grating", href: "/technology/frp-vs-steel-gratings" },
    ],
    documentPaths: ["/products/fiberglass-structural-shapes", "/products/frp-deck-panels"],
    faqs: [
      { question: "Does FRP corrode in seawater?", answer: "Glass FRP does not rust. The resin and the cut edges still have to suit the immersion or splash, so vinyl ester and sealed edges are usual in marine work; confirm the laminate for the exposure." },
      { question: "Which fire requirements apply offshore?", answer: "They depend on the location and the operator's rules. State them in the RFQ so the resin, for example phenolic or fire-retardant vinyl ester, and the test route can be agreed." },
      { question: "Can FRP grating carry vehicle loads on a dock?", answer: "Only if it is designed for them. Specify the wheel load and footprint, the span and support conditions, and use the load table for the selected panel; pedestrian grating is not a vehicle deck." },
      { question: "Which fasteners suit marine FRP structures?", answer: "Stainless A4-316 bolts with oversized washers, or FRP threaded rods and nuts where a non-metallic joint is wanted. Isolate dissimilar metals and follow the connection detailing for the profile." },
    ],
    request: [
      { title: "Location and exposure", text: "Splash, immersion or salt air, water temperature and UV." },
      { title: "Loads and layout", text: "Spans, supports, crowd, point or wheel loads, with drawings." },
      { title: "Fire and approvals", text: "Operator, class or port requirements that apply." },
      { title: "Quantities and delivery", text: "Panel areas, lengths or assemblies, destination and target date." },
    ],
  },
  vehicle: {
    slug: "vehicle",
    path: "/industries/vehicle",
    name: "Transportation & rail",
    updated: "2026-09-26",
    h1: "FRP Composite Profiles for Vehicle & Transport",
    intro:
      "Pultruded FRP profiles for bus and coach bodies, rail interiors, trailers and specialty vehicles. They are lighter than steel and do not rust; fire, smoke and toxicity requirements are confirmed for each application.",
    image: {
      src: "/images/technology/f1-composite-pultrusion-production-line-aerial.webp",
      alt: "Row of pultrusion lines in the F1 Composite plant",
      note: "Pultrusion lines",
      caption: "Vehicle programs usually need custom sections run on dedicated tooling, with the vehicle maker's design and approval.",
    },
    areasIntro: "The vehicle maker designs and certifies the vehicle; the profiles are specified against its requirements. These are the usual uses and what to agree for each.",
    areas: [
      { area: "Bus and coach bodies", exposure: "Steel frames add weight and corrode at joints", parts: "Tubes, channels and custom sections for frames and floors", check: "The maker's crash, fatigue and joining design" },
      { area: "Rail interiors and equipment", exposure: "Fire, smoke and toxicity limits, such as EN 45545-2 in Europe", parts: "Custom profiles, cable ducts and panels", check: "The hazard level, and test reports for the specific formulation, often phenolic" },
      { area: "Trailers and truck bodies", exposure: "Road salt and moisture; every kilogram reduces payload", parts: "Profiles, flat bars and sheets", check: "Loads, fixings and UV exposure" },
      { area: "Trackside and roadside", exposure: "Noise along roads and railways; metal panels corrode", parts: "FRP sound barrier wall panels", check: "Wind loads and the acoustic data of the configured system" },
      { area: "Electric vehicles and charging", exposure: "Insulating parts near high-voltage components", parts: "Custom insulating profiles", check: "Dielectric and thermal data for the laminate" },
    ],
    products: [
      { label: "Custom profiles", href: "/products/custom-pultruded-profiles", glyph: "custom", reason: "Sections designed around the part, on dedicated tooling." },
      { label: "Standard structural profiles", href: "/products/fiberglass-structural-shapes", glyph: "shs", reason: "Tubes, channels and angles for frames and supports." },
      { label: "FRP sound barrier walls", href: "/products/frp-sound-barrier-wall", glyph: "sheet", reason: "Panels for highways and railways." },
      { label: "Fiberglass sheets", href: "/products/fiberglass-sheets", glyph: "sheet", reason: "Solid sheet cut to size for liners, covers and fabricated parts." },
      { label: "Fasteners and fittings", href: "/products/frp-fasteners-fittings", glyph: "fastener", reason: "Threaded rods, nuts and fittings for non-metallic joints." },
    ],
    projects: [],
    reading: [
      { label: "FRP vs steel, aluminum and timber", href: "/technology/frp-vs-traditional-materials" },
      { label: "Pultrusion resin systems", href: "/technology/pultrusion-resin-systems" },
    ],
    documentPaths: ["/products/custom-pultruded-profiles", "/products/fiberglass-structural-shapes"],
    faqs: [
      { question: "Does FRP meet fire safety standards for rail?", answer: "Rail requirements such as EN 45545-2 apply to the specified product and hazard level. Phenolic and fire-retardant formulations are the usual starting point, and test reports are issued for the specific formulation, so state the standard and hazard level in the RFQ." },
      { question: "How much lighter than steel is FRP?", answer: "Glass FRP has a density of about 1.9 g/cm³ against 7.85 g/cm³ for steel, so a part of the same volume weighs about 75% less. FRP is less stiff, so sections are often larger and the saving on a finished part is smaller than that ratio." },
      { question: "Can FRP profiles be used for structural body framing?", answer: "Yes, where the vehicle maker's design covers the joints, fatigue and crash requirements. F1 supplies the profiles and custom sections; the vehicle design and certification stay with the maker." },
    ],
    request: [
      { title: "Part and function", text: "What the part does, with drawings or a sample of the current part." },
      { title: "Standards", text: "Fire, smoke and toxicity, electrical and any customer specification." },
      { title: "Program", text: "Annual volume, first-article timing and tooling expectations." },
      { title: "Delivery", text: "Lengths or finished parts, packing and destination." },
    ],
  },
  "water-wastewater": {
    slug: "water-wastewater",
    path: "/industries/water-wastewater",
    name: "Water & wastewater",
    updated: "2026-09-26",
    h1: "FRP profiles for water & wastewater facilities",
    intro:
      "Water and wastewater projects use pultruded profiles and grating for cable supports, equipment access and walking surfaces. F1 supplies the specified profiles, panels and agreed fabricated components; treatment equipment and complete civil works are separate scopes.",
    image: {
      src: "/images/industries/frp-pultruded-profiles-water-treatment-rendering.webp",
      alt: "Concept rendering of gray pultruded FRP beams, columns and bracing supporting a grating access platform with yellow handrails beside wastewater treatment basins",
      note: "Rendering",
      caption: "Structural profiles, grating platforms, stairs and handrails around treatment basins. Final members and connections are designed for the project loads and exposure.",
    },
    areasIntro: "Exposure changes from one part of a treatment plant to the next, so the parts and the resin change too. This is where pultruded FRP is most often used, and what to check in each area.",
    areas: [
      { area: "Headworks and screening", exposure: "Hydrogen sulfide, high humidity and wash-down", parts: "Walkway grating, covers, cable supports", check: "Vinyl ester resin and a surface veil are the usual starting point where H₂S builds up under covers" },
      { area: "Aeration and biological basins", exposure: "Constant splash and humidity, outdoor UV", parts: "Access walkways, handrails, pipe and cable supports", check: "Long runs along basin edges make weight and no recoating the main reasons to use FRP" },
      { area: "Clarifiers and settling tanks", exposure: "Immersion or splash at the water line", parts: "Baffles and plates cut from solid sheet, walkway grating", check: "Parts that sit in the water need the resin and cut-edge sealing checked for immersion" },
      { area: "Chemical dosing rooms", exposure: "Sodium hypochlorite, ferric chloride, caustic, acids", parts: "Platforms, grating, cable trays, equipment frames", check: "The chemical list with concentrations and temperatures; compatibility is confirmed per chemical" },
      { area: "Sludge handling and digesters", exposure: "Hydrogen sulfide, methane, heat", parts: "Cable trays and ladders, access frames, grating", check: "Non-conductive trays and supports help where electrical isolation near equipment matters" },
    ],
    products: [
      { label: "Standard structural profiles", href: "/products/fiberglass-structural-shapes", glyph: "i_beam", reason: "Channels, angles, beams and tubes for cable supports and access frames." },
      { label: "FRP grating", href: "/products/grating", glyph: "grating", reason: "Molded and pultruded panels for walkways and platforms around basins." },
      { label: "Handrail systems", href: "/products/frp-handrail-systems", glyph: "tube", reason: "Rail and post sections for edge protection." },
      { label: "Fiberglass sheets", href: "/products/fiberglass-sheets", glyph: "sheet", reason: "Solid sheet cut to size for baffles and cover plates." },
      { label: "Custom profiles", href: "/products/custom-pultruded-profiles", glyph: "custom", reason: "Special sections on new tooling when no catalog size fits." },
    ],
    projects: [
      applicationCard("frp-cable-tray-supports"),
      applicationCard("frp-chemical-plant-platforms"),
      { ...factoryStaircase, used: "I-beams, square tubes, round tube, flat bar and molded grating" },
    ],
    reading: [
      { label: "How to specify FRP cable tray", href: "/resources/blog/frp-cable-tray-specifications-advantages" },
      { label: "Grating lifecycle cost example", href: "/resources/blog/frp-grating-vs-steel-grating-cost-comparison" },
      { label: "Material and resin selection", href: "/technology/pultrusion-resin-systems" },
      { label: "Technical references and report scope", href: "/resources/evidence" },
    ],
    documentPaths: ["/products/grating", "/products/fiberglass-structural-shapes"],
    faqs: [
      { question: "Which resin suits a wastewater plant?", answer: "Do not select a resin from the word wastewater alone. Provide the chemicals and concentrations, temperature, immersion or splash conditions, cleaning agents and outdoor exposure; resin compatibility, reinforcement, surface veil and cut-edge protection are reviewed together. A material suitable for one treatment zone may not suit another." },
      { question: "Can FRP parts sit in the water?", answer: "Baffles and plates in clarifiers and settling tanks are cut from solid sheet. Parts that sit in the water need the resin and cut-edge sealing checked for immersion, so state which parts are immersed and which only see splash." },
      { question: "What does F1 supply for a treatment plant?", answer: "The specified profiles, grating panels and agreed fabricated components: raw lengths, cut and drilled profiles, panels, fixing hardware and any agreed assemblies, listed on the bill of materials. Treatment equipment and complete civil works are separate scopes, and the quote states who designs and installs the final structure." },
      { question: "Do fire and electrical requirements apply?", answer: "They belong to the offered material and assembly, rather than to fiberglass as a universal category. List the fire and electrical requirements in the RFQ with the operating and maintenance loads, panel support and attachment details." },
    ],
    request: [
      { title: "Chemicals and exposure", text: "Chemicals with concentrations and temperatures, immersion or splash, cleaning agents and UV." },
      { title: "Loads and layout", text: "Operating and maintenance loads, panel supports, attachment details and drawings." },
      { title: "Scope of supply", text: "Raw lengths, cut and drilled parts, panels, hardware or agreed assemblies." },
      { title: "Documents and delivery", text: "Tolerances, inspection documents, quantities and destination." },
    ],
  },
} satisfies Record<string, IndustryPageData>;
