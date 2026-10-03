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
import { beamBridgeGuide, chongqingRooftopPv, factoryStaircase } from "@/lib/familyApplications";
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
  /** `note` names a stock photo (Illustrative photo), as on the figure head. */
  image: { src: string; alt: string; note?: string; caption: string };
  areas: IndustryArea[];
  areasIntro: string;
  products: IndustryProduct[];
  projects: ApplicationCard[];
  reading: { label: string; href: string }[];
  documentPaths: string[];
  faqs: { question: string; answer: string }[];
  request: { title: string; text: string }[];
  /** Opening of the quote block, when the industry needs more than the default. */
  quoteIntro?: string;
}

function applicationCard(slug: string, text?: string): ApplicationCard {
  const page = getApplicationPage(slug);
  if (!page) throw new Error(`Unknown application page: ${slug}`);
  return { href: `/applications/${page.slug}`, kind: "Application", title: page.shortTitle, text: text ?? page.description, image: page.image, imageAlt: page.imageAlt, note: page.imageNote };
}

// Image notes use the site vocabulary; a stock photo's caption says it is not an F1 project.
const ILLUSTRATIVE = "Illustrative photo";

export const industryPages = {
  energy: {
    slug: "energy",
    path: "/industries/energy",
    name: "Energy & power",
    updated: "2026-10-03",
    h1: "FRP Composite Profiles for Energy & Electric Power",
    intro:
      "Pultruded FRP profiles for substations, cable routes, solar mounting and wind energy. Glass FRP is non-conductive and does not rust, so it suits equipment areas where steel needs grounding, bonding or recoating; the laminate and the assembly are confirmed for each project.",
    image: {
      src: "/images/industries/frp-electric-power-substation-infrastructure.jpg",
      alt: "Electrical substation with steel gantries at dusk",
      note: ILLUSTRATIVE,
      caption: "Illustrative photo, not an F1 project. Substations, cable routes and solar sites are where FRP supports and frames replace steel most often.",
    },
    areasIntro: "The parts change from one kind of energy site to the next, and so do the checks. Electrical and fire requirements belong to the specified laminate and assembly, not to fiberglass as a category.",
    areas: [
      { area: "Overhead distribution lines", exposure: "Timber crossarms can decay and steel hardware can corrode in wet or coastal service", parts: "Pultruded fiberglass crossarm members with agreed drilling and assembly scope", check: "Conductor load cases, pole mount and brace capacity, clearances, tracking, UV and water ingress" },
      { area: "Substations and switchyards", exposure: "Steel frames need grounding and bonding, and corrode in coastal or industrial air", parts: "Equipment stands, frames and trench covers from standard profiles", check: "Clearances, dielectric data for the specified laminate, UV exposure and any fire classification" },
      { area: "Cable routes in plants", exposure: "Steel trays and supports rust in damp, chemical or coastal areas", parts: "Channels, angles and brackets for cable supports; custom tray sections", check: "Cable weight, support spacing, fire-retardant resin where required, the electrical design basis" },
      { area: "Solar mounting", exposure: "Zinc coatings wear on coastal, agricultural and floating sites; many roofs have little spare capacity", parts: "Rails, posts, clamps and PV module frame profiles", check: "Wind and snow loads, UV-stabilised resin and surface veil, connections and roof capacity" },
      { area: "Wind energy", exposure: "Blade reinforcement needs light laminates with documented fatigue behavior", parts: "Pultruded spar-cap panels in glass, carbon or hybrid laminates", check: "The laminate data sheet and the blade designer's qualification route" },
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
    // The solar application page opens on the same rooftop photo as the case
    // study, so it is linked below rather than shown as a second card.
    projects: [
      chongqingRooftopPv,
      applicationCard("frp-utility-crossarms"),
      applicationCard("frp-cable-tray-supports"),
    ],
    reading: [
      { label: "FRP utility crossarm application guide", href: "/applications/frp-utility-crossarms" },
      { label: "Dry-type transformer insulation supports", href: "/applications/frp-transformer-insulation-supports" },
      { label: "Switchgear insulating supports and operating links", href: "/applications/frp-switchgear-insulation-components" },
      { label: "Composite cores for overhead conductors", href: "/applications/composite-overhead-conductor-cores" },
      { label: "Live-line tool component qualification", href: "/applications/frp-live-line-tool-components" },
      { label: "PV support design guide", href: "/applications/frp-solar-mounting-profiles" },
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
    updated: "2026-09-27",
    h1: "FRP for Chemical & Industrial Facilities",
    intro:
      "Fiber-reinforced polymer (FRP) profiles, grating and access systems for processing plants and manufacturing sites where steel corrodes. The resin is chosen for the chemicals on site, with fire-retardant grades where the plant requires them.",
    image: {
      src: "/images/industries/industrial-chemical-tank-platform.webp",
      alt: "Chemical tank access platform with FRP grating, rails and structural supports",
      caption: "Grating, rails and structural supports at a tank access platform. Final members and connections require project design.",
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
    // The cooling-tower application opens on the guide's own concept image, so
    // the cable-support application takes its place here.
    projects: [
      { ...factoryStaircase, used: "I-beams, square tubes, round tube, flat bar and molded grating" },
      applicationCard("frp-chemical-plant-platforms"),
      applicationCard("frp-cable-tray-supports"),
    ],
    reading: [
      { label: "FRP vs steel grating", href: "/technology/frp-vs-steel-gratings" },
      { label: "Pulp and paper mill component specification", href: "/applications/frp-pulp-paper-mill-components" },
      { label: "Carbon-fiber industrial rollers", href: "/applications/carbon-fiber-industrial-rollers" },
      { label: "Robot beams and structural struts", href: "/applications/cfrp-robotic-beams-struts" },
      { label: "Scrubber and demister internals", href: "/applications/frp-scrubber-demister-profiles" },
      { label: "MRI patient-support component qualification", href: "/applications/composite-mri-patient-supports" },
      { label: "FRP pipe for coal mine gas drainage", href: "/resources/blog/frp-pipe-for-coal-mine-gas-drainage" },
      { label: "Water and wastewater facilities", href: "/industries/water-wastewater" },
    ],
    documentPaths: ["/products/fiberglass-structural-shapes", "/pultruded-frp-profiles"],
    faqs: [
      { question: "Which chemicals can FRP profiles resist?", answer: "It depends on the complete laminate and the chemical, concentration, temperature, exposure time and cleaning cycle. Vinyl ester is the usual starting point for acids, alkalis, chlorine chemicals and wastewater; isophthalic polyester suits milder exposure. Send the process-chemical list with the inquiry so the resin and surface construction can be reviewed for the actual service; a generic vinyl-ester rating does not cover every formulation or mixture." },
      { question: "When should a plant use molded rather than pultruded grating?", answer: "Molded panels are a useful starting point for layouts with frequent openings or support in two directions. Pultruded panels have a defined bearing-bar direction and suit span-led layouts. Both need a panel-specific load and deflection check, suitable edge support, hold-downs, surface and openings." },
      { question: "Can an FRP beam replace a steel beam of the same size?", answer: "Not directly. FRP can be sized for the same loads, usually as a deeper section, because its modulus is about a tenth of steel's. Compare the complete assembly against its load cases, deflection limit, buckling, connection bearing and exposure, using the span tables and the profile calculator, then confirm with the project calculation. Retrofitted anchors and the remaining structure also need review." },
      { question: "Is every FRP profile fire rated or suitable for a hazardous area?", answer: "No. Specify the flame, smoke, structural fire, static-control and hazardous-area requirements for the installed component or assembly, then request reports for the offered laminate and test configuration. A resin label or small-sample rating alone does not establish project acceptance." },
      { question: "Do FRP ladders and handrails meet OSHA requirements?", answer: "Compliance belongs to the complete assembly: rails, posts, fittings, anchors and the supporting structure. OSHA 1910.29 sets the requirements for guardrails and fixed ladders in general industry, and the design and installation are checked against it for the project." },
      { question: "Can these products be used in food or pharmaceutical production areas?", answer: "FRP may be evaluated for non-product-contact access and service areas exposed to frequent washdown. Direct food contact, cleanroom use and validated hygiene performance require separate review of the finished product, surface, joints, cleaning chemicals and the site's acceptance criteria. Do not infer those approvals from a resin ingredient." },
    ],
    request: [
      { title: "Process environment", text: "Each chemical with its concentration, the cleaning agents, operating and cleaning temperatures, and splash, mist, immersion or washdown." },
      { title: "Geometry and loads", text: "Plan, elevations, openings and access route; spans, support spacing, load cases, deflection limits and grating direction." },
      { title: "Interfaces and rules", text: "Anchors and base material; the guardrail, stair, ladder and egress basis; fire, smoke, electrical and hygiene requirements." },
      { title: "Supply and evidence", text: "Profiles, panels or a fabricated package; drawings, tests, samples and inspection records; quantity, destination and installation window." },
    ],
    quoteIntro: "Send a marked-up layout and a short exposure schedule; for a replacement, add the existing member and anchor drawings.",
  },
  infrastructure: {
    slug: "infrastructure",
    path: "/industries/infrastructure",
    name: "Infrastructure",
    updated: "2026-10-03",
    h1: "FRP Composite Profiles for Infrastructure",
    intro:
      "Fiber-reinforced polymer (FRP) profiles for bridge decks, pedestrian structures, handrails and utility infrastructure. They do not rust, so they avoid the corrosion cycle that wears out steel and reinforced concrete.",
    image: {
      src: "/images/industries/frp-infrastructure-pedestrian-bridge.webp",
      alt: "Pedestrian bridge with pultruded FRP girders and yellow handrails over a river",
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
      beamBridgeGuide,
      applicationCard("frp-pedestrian-bridge-superstructures"),
      applicationCard("frp-bridge-deck-panels"),
    ],
    reading: [
      { label: "Fiberglass rebar vs steel", href: "/technology/fiberglass-rebar-vs-steel" },
      { label: "FRP vs steel, aluminum and timber", href: "/technology/frp-vs-traditional-materials" },
      { label: "Rail interior profile qualification", href: "/applications/frp-rail-interior-profiles" },
      { label: "Third-rail protective cover systems", href: "/applications/frp-third-rail-protection" },
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
    updated: "2026-09-27",
    h1: "FRP for Marine Docks, Walkways & Access Platforms",
    intro:
      "Pultruded FRP profiles and grating for docks, marinas, offshore platforms and coastal walkways. Glass FRP does not rust in seawater, so it avoids the recoating cycle of steel; vinyl ester is the usual resin for splash and immersion.",
    image: {
      src: "/images/industries/marine-marina-access-grating.webp",
      alt: "Marina dock with fiberglass grating, mooring cleats and boats",
      caption: "Fiberglass grating on a marina access route. Deck support and fixings require project design.",
    },
    areasIntro: "Salt, splash and UV act on every marine structure; the loads and approval routes differ. These are the usual areas and what to confirm for each.",
    areas: [
      { area: "Docks and marinas", exposure: "Steel corrodes in the splash zone and timber decays", parts: "Grating, deck panels, frames and handrails", check: "Berthing, crowd and point loads, fixings and UV exposure" },
      { area: "Offshore platforms", exposure: "Corrosion maintenance is costly offshore, and weight matters", parts: "Grating, handrails, ladders and cable supports", check: "The operator's fire and approval requirements, and the loads" },
      { area: "Coastal walkways and piers", exposure: "Salt spray on wet walking surfaces", parts: "Gritted grating, stair treads and handrails", check: "Slip resistance, drainage, anchors and fixings" },
      { area: "Aquaculture and fishery PV", exposure: "Immersion or splash with strong UV", parts: "Frames, mounts and structural profiles", check: "Immersion behavior of the resin and sealed cut edges" },
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
      {
        href: "/case-studies/coastal-marina-walkway",
        kind: "Case study",
        title: "Coastal marina walkway",
        text: "A 500 m walkway of pultruded FRP subframes and anti-slip molded grating at a UK marina, installed in sections during low-tide windows.",
        image: "/images/case-studies/frp-coastal-marina-walkway-grating-system.jpg",
        imageAlt: "Paved walkway with steel railings leading down to a marina on a lake",
        note: "Illustrative photo",
      },
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
      { question: "Which FRP deck is best for a marina finger pier?", answer: "Start with the pier's clear span, support layout, pedestrian or trolley loads, allowable deck openings, wet slip requirement and local overwater permit. Molded grating, pultruded grating and closed deck panels solve different layout problems; select the panel and its fixings as one assembly." },
      { question: "Does open FRP grating satisfy a dock light-transmission permit?", answer: "An open panel may help transmit light, but compliance depends on the local permit and the complete dock. Framing, floats and equipment can block light below a panel. Submit the proposed panel open area and full overwater layout for permitting review." },
      { question: "Can a marine FRP grating carry carts, equipment or vehicles?", answer: "Only if it is designed for them. Wheel and leg loads can govern differently from pedestrian loading, and pedestrian grating is not a vehicle deck. Specify the load and its footprint, the span and support conditions, and request load and deflection data for the exact grating configuration." },
      { question: "Which fire rules and approvals apply offshore or on a ship?", answer: "They depend on the location, the fire scenario and the governing project, flag-state or class rules; no general offshore or shipboard approval is claimed here. State them in the RFQ so the resin, for example phenolic or fire-retardant vinyl ester, and the test route can be agreed, and have the responsible designer or authority review the finished assembly." },
      { question: "Which fasteners suit marine FRP structures?", answer: "Stainless A4-316 bolts with oversized washers, or FRP threaded rods and nuts where a non-metallic joint is wanted. Isolate dissimilar metals and follow the connection detailing for the profile." },
    ],
    request: [
      { title: "Layout and spans", text: "A marked plan of each deck, support, stair, ladder and rail, with spans, support widths, openings and clearances." },
      { title: "Loads", text: "Pedestrian, cart, equipment, wheel and maintenance loads stated separately, plus moving dock joints and flood or wave action." },
      { title: "Exposure and permits", text: "Immersion, splash, salt air, UV, temperature and cleaning media; slip, opening, accessibility and overwater permit requirements." },
      { title: "Approvals and supply", text: "Fire, offshore, flag-state or class rules; resin, color, fixings, reports, quantities and destination." },
    ],
    quoteIntro: "Send a marked plan with the loads, exposure and approvals that apply, and ask for load and deflection data for the selected panel and span.",
  },
  vehicle: {
    slug: "vehicle",
    path: "/industries/vehicle",
    name: "Automotive & rail",
    updated: "2026-10-03",
    h1: "FRP Profiles for Automotive, Bus & Rail Components",
    intro:
      "Explore custom pultruded FRP profiles for selected passenger-car reinforcements, EV battery-pack details, bus and coach bodies, commercial vehicles and rail interiors. Long, constant-section parts are evaluated against the vehicle program's loads, joints, environment and approval requirements; a candidate location is not a qualified replacement part.",
    image: {
      src: "/images/industries/vehicle-bus-body-profiles.webp",
      alt: "Bus body showing candidate roof and ceiling support-profile locations",
      caption: "Candidate roof and ceiling rail locations in a bus body; final components require vehicle-maker design and approval.",
    },
    areasIntro: "Start with the component's function and installation interface. These are candidate locations for long, constant-section FRP parts, each with its own acceptance basis.",
    areas: [
      { area: "Bus and coach bodies", exposure: "Long body details exposed to vibration, passenger use, weather and cleaning", parts: "Side-skirt edges, luggage-rack rails, ceiling supports, duct and hatch framing", check: "Fixture and access loads, joint fatigue, finish and applicable bus fire rules" },
      { area: "Passenger cars", exposure: "Mass and packaging constraints around crash and occupant load paths", parts: "Candidate bumper, sill, seat-crossmember or seat-frame sections", check: "OEM crash and restraint load cases, joint performance and production variation" },
      { area: "EV battery packs", exposure: "Underbody impact, moisture, temperature cycling and high-voltage interfaces", parts: "Candidate pack cross rails, end members, cell restraint bars and cover-edge profiles", check: "Pack-level crush, fire and electrical requirements, sealing and metallic inserts" },
      { area: "Trucks and refrigerated bodies", exposure: "Cargo impact, road salt, washdown and thermal bridges in insulated walls", parts: "Wall sideposts, liner fixing rails, roof or floor edge profiles", check: "Fastener loads, wall-level heat transfer, sealing and repair access" },
      { area: "Rail vehicles", exposure: "Vibration, cleaning and location-specific fire, smoke and toxicity requirements", parts: "Roof-edge, interior support, luggage-rack and cable-cover profiles", check: "EN 45545-2 or local requirement set, tested configuration and joint durability" },
      { area: "Specialty vehicles", exposure: "Equipment compartments exposed to salt, water, detergents and repeated access", parts: "Equipment-door frames, panel edging and secondary mounting rails", check: "Equipment mass, attachment cycles, exposure and service replacement" },
    ],
    products: [
      { label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles", glyph: "custom", reason: "Develop the section, reinforcement, finish and tolerances around a defined vehicle part." },
      { label: "Standard structural profiles", href: "/products/fiberglass-structural-shapes", glyph: "shs", reason: "Tubes, channels, angles and bars for early fit and load-path studies." },
      { label: "Fiberglass sheets", href: "/products/fiberglass-sheets", glyph: "sheet", reason: "Flat stock cut to size for compatible liners, covers and fabricated details." },
      { label: "Fasteners and fittings", href: "/products/frp-fasteners-fittings", glyph: "fastener", reason: "Options to review where a non-metallic joint is specified and validated." },
    ],
    projects: [],
    reading: [
      { label: "FRP vs steel, aluminum and timber", href: "/technology/frp-vs-traditional-materials" },
      { label: "Pultrusion resin systems", href: "/technology/pultrusion-resin-systems" },
      { label: "Rail interior and secondary profiles", href: "/applications/frp-rail-interior-profiles" },
    ],
    documentPaths: ["/products/custom-pultruded-profiles", "/products/fiberglass-structural-shapes"],
    faqs: [
      { question: "Can a pultruded FRP profile replace a steel bumper beam or side sill?", answer: "It can be evaluated as a candidate, but a drawing substitution is insufficient. The OEM must compare the complete crash pulse, energy absorption, intrusion, attachment loads, environmental aging and repair behavior of the proposed part and its joints. F1 can discuss a custom constant-section profile; qualification of a crash or occupant-safety component belongs to the vehicle program." },
      { question: "Are seat crossmembers or seat back frames suitable for pultrusion?", answer: "Constant-section members can be investigated, but seat and restraint load paths are safety-critical. The vehicle and seat-system engineers must set the static, dynamic, fatigue, anchorage and misuse cases before a material or cross-section is chosen." },
      { question: "Can one FRP material serve every EV battery-pack part?", answer: "No. A pack rail, cell restraint, cover edge and underbody-shield edge have different loads and thermal, fire, sealing and electrical duties. Moisture, conductive inserts and nearby metal can change the insulation behavior of the assembled part. Define the location and pack-level acceptance tests before selecting a laminate or claiming an electrical benefit." },
      { question: "How should a vehicle weight saving be calculated?", answer: "Compare parts that meet the same performance targets, including the redesigned section, inserts, adhesive, fasteners and protective finish. A same-volume density comparison is only a material comparison: composite stiffness, joining and crash behavior can change the geometry and installed mass." },
      { question: "Which fire requirements apply to bus and rail interiors?", answer: "The customer identifies the vehicle class, part location and governing market. Bus materials may have requirements under UN Regulation No. 118 or local rules; rail projects may specify EN 45545-2 requirement sets and hazard levels. Resin type alone does not establish compliance. Review reports for the offered formulation and finished configuration against the exact project requirement." },
      { question: "Will fiberglass sideposts reduce a refrigerated body's energy use?", answer: "A fiberglass sidepost conducts less heat than a metal one and reduces the thermal bridge through an insulated wall, but whole-body performance also depends on insulation, skins, doors, joints and air leakage. Compare wall or body assemblies under the same test conditions, and check cargo impact, fastening, sealing and condensation before predicting refrigeration energy use." },
      { question: "What evidence is needed before series supply?", answer: "The listed parts are engineering candidates, not claims of F1 supply to a vehicle program or an OEM partnership. Before series supply, agree on the drawing, laminate, interfaces, component tests, dimensional and visual inspection, traceability and the vehicle maker's approval route. The exact evidence follows the part's safety function and governing market." },
    ],
    request: [
      { title: "Part geometry and function", text: "Vehicle type, marked component location, section envelope and length; send 2D/3D drawings and identify the load path and adjacent parts." },
      { title: "Load cases and interfaces", text: "Static, impact, crash and fatigue cases as applicable; support spans, allowable movement, mating materials, insert locations and bond or bolt design." },
      { title: "Environment and acceptance", text: "Temperature range, water, salt, cleaners, UV, electrical proximity and fire exposure; list the component standards, test methods and approval evidence required by the OEM." },
      { title: "Prototype and production", text: "Target mass, cut length, tolerances, finish, machining, first-article quantity, annual forecast, inspection and traceability requirements." },
    ],
    quoteIntro: "Send the part drawing, load cases and vehicle interface with the required acceptance tests. We can then review whether a pultruded profile suits the geometry and define the proposed supply and test scope.",
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
      src: "/images/industries/frp-pultruded-profiles-water-treatment-platform.webp",
      alt: "Gray pultruded FRP beams, columns and bracing supporting a grating access platform with yellow handrails beside wastewater treatment basins",
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
      { label: "Clarifier flights, weirs and baffles", href: "/applications/frp-wastewater-clarifier-components" },
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
