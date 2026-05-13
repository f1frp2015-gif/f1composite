import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AskAICard from "@/components/ai/AskAICard";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { prefillForCaseStudy } from "@/lib/aiPrefill";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Map case-study product labels to the actual /products/* slug.
// Renaming a label (e.g. "Gratings" → "Gratings & Decks") must not break the URL.
const productLabelToSlug: Record<string, string> = {
  "Standard Profiles": "standard-profiles",
  "Custom Pultrusions": "custom-pultrusions",
  "Fenestration Systems": "fenestration-systems",
  "Gratings & Decks": "gratings",
  "Gratings": "gratings",
};

const caseStudyData: Record<
  string,
  {
    title: string;
    industry: string;
    location: string;
    year: string;
    products: string[];
    challenge: string;
    solution: string;
    results: string;
    stats: { value: string; label: string }[];
    downloads?: { label: string; href: string; description?: string }[];
  }
> = {
  "european-bridge-deck": {
    title: "European Bridge Deck Replacement",
    industry: "Infrastructure",
    location: "Netherlands",
    year: "2023",
    products: ["Custom Pultrusions", "Standard Profiles"],
    challenge:
      "A 45-year-old steel bridge deck in the Netherlands was suffering from severe corrosion damage, requiring increasingly frequent and costly maintenance interventions. The bridge owner needed a replacement solution that would provide a design life of 75+ years with minimal maintenance, while keeping the bridge open to traffic during installation.",
    solution:
      "F1 Composite engineered a custom-pultruded FRP deck system using vinyl ester resin with E-glass and carbon fiber hybrid reinforcement. The modular deck panels were designed for rapid on-site assembly using adhesive bonding and mechanical fasteners. Each panel was factory-produced to tight tolerances, ensuring consistent quality and fast installation. The lightweight nature of FRP (approximately 80% lighter than steel equivalents) allowed installation using smaller cranes and eliminated the need for temporary bridge closures.",
    results:
      "The project was completed two weeks ahead of schedule. The FRP deck system achieved a 40% weight reduction compared to the original steel structure while exceeding the EN 1991-2 traffic load requirements. The non-corrosive nature of the FRP profiles eliminates the need for painting or cathodic protection, projecting zero structural maintenance costs over the 100-year design life.",
    stats: [
      { value: "1,200m²", label: "Deck Area" },
      { value: "40%", label: "Weight Reduction" },
      { value: "100yr", label: "Design Life" },
    ],
  },
  "coastal-marina-walkway": {
    title: "Coastal Marina Walkway System",
    industry: "Marine",
    location: "United Kingdom",
    year: "2022",
    products: ["Gratings & Decks", "Standard Profiles"],
    challenge:
      "A major UK marina required replacement of its aging timber and steel walkway infrastructure. The existing materials had deteriorated rapidly due to constant saltwater exposure, requiring annual maintenance and presenting safety hazards. The marina needed a durable, slip-resistant solution that could withstand the harsh coastal environment.",
    solution:
      "F1 Composite supplied a complete FRP walkway system comprising pultruded structural profiles for the subframe and molded gratings with anti-slip surfaces for the walkway deck. The FRP profiles were designed to resist saltwater corrosion, UV degradation, and biological fouling without protective coatings. The modular design allowed installation in sections during low-tide windows, minimizing disruption to marina operations.",
    results:
      "The 500-meter walkway system was installed over a 4-week period. The FRP system eliminated all corrosion-related maintenance requirements and is projected to deliver a 60% reduction in total lifecycle cost compared to the previous steel and timber structure over a 50-year service period.",
    stats: [
      { value: "500m", label: "Walkway Length" },
      { value: "60%", label: "Lifecycle Savings" },
      { value: "50yr", label: "Design Life" },
    ],
  },
  "chemical-plant-platform": {
    title: "Baotou Industrial Park Fenestration — Pultruded GFRP-PU Windows for Severe-Cold, Chemical-Exposure Manufacturing Buildings",
    industry: "Industrial",
    location: "Baotou, Inner Mongolia, China",
    year: "2024",
    products: ["Fenestration Systems"],
    challenge:
      "In early 2024 an industrial complex on the outskirts of Baotou, Inner Mongolia, broke ground on a multi-building production campus combining manufacturing workshops, ancillary chemical-handling buildings, freight-logistics yards, rooftop photovoltaic arrays, and a separate administrative and welfare block. The site presents two structural envelope problems that rarely show up in the same project. The first is climate: Baotou sits inside China's severe-cold climate zone, with winter design lows around −25 °C and a 200-day-plus heating season. The national energy code for severe-cold-zone industrial buildings imposes a window U-value ceiling well below what conventional aluminium-with-thermal-break fenestration can deliver without exotic glazing assemblies, and the operating cost of under-performing windows compounds across 200 heating days each year. The second is chemistry: several of the manufacturing buildings handle chemical reagents, process volatiles, acid mists, and chloride aerosols as part of normal operation. Aluminium frames exposed to this environment pit at the anodised surface, suffer galvanic corrosion at fastener interfaces, and require coating renewal on cycles measured in single-digit years — not acceptable on a 30-year industrial asset where window replacement requires production downtime. PVC frames cannot deliver the structural span needed for the tall workshop apertures (typical industrial window heights here exceed 2.5 m) and embrittle under sustained UV at the high-altitude continental climate. Steel frames meet structural requirements but conduct heat dramatically and rust without intensive coating maintenance under chemical exposure. The owner's specification therefore required a single window-frame material that could simultaneously meet severe-cold-zone thermal performance, chemical-exposure durability, the structural span demands of an industrial workshop facade, and a near-zero-maintenance operating profile across a 25-to-30-year asset life.",
    solution:
      "F1 Composite Co., Ltd, manufactured at our Yancheng manufacturing facility (Chongqing FengDu New Material Co., Ltd.), supplied pultruded glass-fibre-reinforced polyurethane (GFRP-PU) window-frame profiles to the Baotou industrial campus across both the chemical-exposure manufacturing buildings and the administrative and welfare block. The package combined 70-series and 80-series casement and tilt-and-turn profiles for the workshop facade apertures, 90-series sliding profiles for the larger administrative-building openings, and matching subframe sections at the workshop curtain-wall integration line. The GFRP-PU pultruded frame addresses both envelope problems through a single material chemistry rather than through two parallel design compromises. On the cold-climate side, the frame has an intrinsic thermal conductivity around 0.3 W/m·K, roughly five hundred times less conductive than aluminium across the frame depth, with no metallic thermal break, no polyamide insert, and no aging interface that can creep or delaminate over the project's 200-cycle-per-year freeze-thaw exposure. Paired with a 5 + 12 Ar + 5 Low-E + 12 Ar + 5 Low-E triple-pane insulating glass build, the verified whole-window U-value sits comfortably below the severe-cold-zone industrial-building specification ceiling, with substantial margin for the worst-case envelope orientation. On the chemical-exposure side, the glass-fibre-reinforced thermoset polyurethane chemistry is inert to acid mists, alkali splashes, chloride aerosols, and the volatile process atmospheres encountered around the manufacturing workshops. The frame does not anodise, does not pit, does not need cathodic protection, and does not require a coating-renewal maintenance cycle. The same frame profile that solves the thermal problem also solves the chemistry problem — a single material specification across the entire site, not a workshop-grade variant plus an office-grade variant. Profiles were factory-finished in matched dark frame colour with co-extruded EPDM gasketing, reinforced corner joints, and pre-installed mounting brackets calibrated to the site's pre-set anchor lines. Delivery was scheduled in two waves to track the campus's overlapping civil-works critical paths without lifting-equipment surges.",
    results:
      "The F1 Composite GFRP-PU fenestration package delivered the two performance contributions the project specification had treated as separate constraints, but in one material decision. First, weather resistance and maintenance-free service under chemical exposure: the GFRP-PU frame is inert to the acid-mist, alkali-splash, and chloride-aerosol environment the manufacturing buildings produce in normal operation, and the projected maintenance cycle eliminates the recoating, fastener-isolation, and inspection-shutdown work that would have been mandatory with aluminium or steel frames across a 30-year operating window. Second, thermal performance for the severe-cold-zone heating season: the pultruded GFRP-PU frame paired with the triple-pane Low-E glazing brings whole-window U-value below the Baotou severe-cold-zone industrial specification ceiling with substantial margin, removing the metallic thermal-bridge surface that would otherwise dominate the building's envelope heat loss across the 200-day heating season. For F1 Composite, the Baotou campus validates the GFRP-PU pultruded fenestration system in the dual-constraint scenario that most aluminium-and-PVC inquiries on Chinese industrial projects map onto: continental severe-cold climate plus chemical-exposure operating environment plus a multi-decade asset horizon. One window-frame material across the entire site, no operational maintenance budget allocated to envelope corrosion control, and no thermal-bridge penalty on the heating-cost line.",
    stats: [
      { value: "Baotou", label: "Inner Mongolia, China" },
      { value: "Severe Cold A", label: "Climate zone" },
      { value: "−25 °C", label: "Winter design low" },
      { value: "0.3 W/m·K", label: "GFRP-PU frame conductivity" },
      { value: "0", label: "Coating renewal cycle" },
      { value: "25–30 yr", label: "Maintenance-free design life" },
    ],
    downloads: [
      {
        label: "3-Star Green Building Material Cert (PDF)",
        href: "/downloads/f1composite-3star-green-building-cert-frp-windows-2025.pdf",
        description: "CABR-01(02)-(2025)-CGP-035 — 3-Star Green Building Material rating for the 65/70/80/90-series pultruded GFRP-PU window family supplied to this project.",
      },
      {
        label: "EPD & Carbon Footprint Analysis (PDF)",
        href: "/downloads/f1composite-epd-carbon-footprint-frp-profiles-2025.pdf",
        description: "Environmental Product Declaration and life-cycle carbon-footprint analysis for the pultruded GFRP composite profile range, including chemical-resistance and durability data.",
      },
      {
        label: "FRP Window & Door Catalog (PDF)",
        href: "/downloads/f1composite-frp-window-door-catalog.pdf",
        description: "Full 65/70/80/90/140-series fenestration catalog with profile specifications, glazing builds, and U-value matrix.",
      },
    ],
  },
  "fenestration-residential": {
    title: "Wanhua Yantai Zero-Carbon Community — Pultruded GFRP-PU Passive House Windows at Production Scale",
    industry: "Construction",
    location: "Yantai, Shandong, China",
    year: "2022",
    products: ["Fenestration Systems"],
    challenge:
      "Wanhua Chemical — the world's largest MDI (methylene diphenyl diisocyanate) producer and the upstream polyurethane resin supplier for the GFRP-PU pultrusion industry — committed in 2021 to build the first end-to-end zero-carbon employee residential community on its Yantai industrial campus in Shandong Province. The complex spans 112,815 m² of above-ground floor area inside the Yantai Economic and Technological Development Zone, comprising mid- and high-rise employee dormitories and supporting facilities. The specification required simultaneous compliance with two of China's tightest residential energy standards: the National Near-Zero Energy Building Design Standard and Shandong Province's Passive Ultra-Low Energy Residential Building standard. The performance targets were demanding: total primary energy consumption for heating, cooling, and lighting capped at 50 kWh per square metre per year; envelope thermal transmittance significantly tighter than national code; and Passivhaus-class airtightness verified by N50 blower-door testing. The window package was the binding constraint. Aluminium-thermal-break frames would have created continuous metallic conductive paths across the envelope and aged the polyamide thermal-break inserts under the project's full thermal-cycle range. PVC frames could not deliver the structural span needed across the tall double-skin facade openings on the stair towers. The specification called for whole-window U-values below 1.0 W/m²·K — a level conventional aluminium-with-thermal-break systems cannot reach without exotic glazing assemblies, and a level that prior production-scale Chinese residential projects had repeatedly missed. The project owner also imposed a supply-chain integrity constraint: as Wanhua is itself the polyurethane raw-material producer, the window-frame material had to fit the polyurethane composite story end-to-end, with traceable resin chemistry and embodied-carbon transparency from the same supplier ecosystem.",
    solution:
      "F1 Composite Co., Ltd, manufactured at our Yancheng manufacturing facility (Chongqing FengDu New Material Co., Ltd.), supplied pultruded glass-fibre-reinforced polyurethane (GFRP-PU) window-frame profiles for the 13,657 m² employee-dormitory portion of the project. The profile package combined three F1 Composite fenestration series: 65-series inward-opening casement and tilt-and-turn for the smaller dormitory window openings, 90-series sliding for the larger balcony openings, and matching facade-frame sections at the stair-tower curtain-wall apertures. The pultruded frames were paired with a five-pane insulating glass unit — 5 mm single-silver Low-E plus 16 mm argon plus 5 mm single-silver Low-E plus 16 mm argon plus 5 mm Low-E — to achieve a verified whole-window U-value of 0.99 W/m²·K, comfortably inside the project's 1.0 W/m²·K specification. Critically, the GFRP-PU pultruded frame eliminates the metallic thermal break entirely. Where an aluminium-with-thermal-break frame must interrupt heat flow through polyamide thermal-break inserts that age, creep under cyclic loading, and ultimately delaminate at the metal-polymer interface, the GFRP-PU frame is a single continuous material with intrinsic thermal conductivity around 0.3 W/m·K — roughly five hundred times less conductive than aluminium across the frame depth, with no joint, no insert, and no aging interface. The pultruded-profile chemistry uses Wanhua polyurethane resin, closing the supply loop: the same Wanhua chemistry that produced the project's polyurethane sandwich wall insulation also supplied the resin matrix for the GFRP-PU window frames. Profiles were factory-finished in matched dark frame colour with co-extruded EPDM gasket channels and reinforced corner joints, then delivered to site in modular palletised units for direct installation onto pre-set bracketry. Production scheduling tracked against eight months of overlapping site civil works to keep the fenestration installation on project critical path without lifting-equipment surges.",
    results:
      "The Wanhua Zero-Carbon Community completed its 13,657 m² employee-dormitory envelope with the F1 Composite GFRP-PU fenestration system as the principal aperture component. Building-envelope verification at handover returned a comprehensive building energy-saving rate of 61.11 % against the national baseline (the near-zero-energy threshold in the underlying standard sits at 60 %); an envelope-only energy-saving rate of 47.56 %; a renewable-energy utilization rate of 51.81 %; and an airtightness measurement of N50 = 1.0 air changes per hour at 50 Pa — meeting Passivhaus airtightness inside a Chinese-code residential project. Total complex energy savings, when combined with the polyurethane wall insulation, ground-source heat pump array, rooftop photovoltaic system, and solar hot-water plant, are projected at more than 2,000 tonnes of CO₂ reduction per year across the 112,815 m² development. The project is referenced in the Wanhua Chemical 2022 sustainability portfolio as the company's first end-to-end zero-carbon community and stands as the largest single-site deployment of pultruded GFRP-PU fenestration in any Chinese residential project to date. For F1 Composite, the project validates the GFRP-PU pultruded fenestration system at production residential scale: 13,657 m² of envelope is a fundamentally different qualification surface than a research-station or prototype installation, and the verified 0.99 W/m²·K whole-window U-value combined with N50 = 1.0 airtightness now serves as the primary reference point for inquiries on near-zero-energy and passive-house residential developments across the temperate-cold and hot-summer-cold-winter climate zones.",
    stats: [
      { value: "112,815 m²", label: "Total project area" },
      { value: "13,657 m²", label: "F1 fenestration envelope" },
      { value: "0.99 W/m²K", label: "Whole-window U-value" },
      { value: "61.11 %", label: "Energy-saving rate" },
      { value: "N50 = 1.0", label: "Airtightness (Passivhaus)" },
      { value: "2,000+ t/yr", label: "CO₂ reduction" },
    ],
    downloads: [
      {
        label: "3-Star Green Building Material Cert (PDF)",
        href: "/downloads/f1composite-3star-green-building-cert-frp-windows-2025.pdf",
        description: "CABR-01(02)-(2025)-CGP-035 — 3-Star Green Building Material rating for the 65/70/80/90-series pultruded GFRP-PU window family used on this project.",
      },
      {
        label: "EPD & Carbon Footprint Analysis (PDF)",
        href: "/downloads/f1composite-epd-carbon-footprint-frp-profiles-2025.pdf",
        description: "Environmental Product Declaration and life-cycle carbon-footprint analysis for the pultruded GFRP composite profile range — cradle-to-grave 36.1 kg CO₂e/m².",
      },
      {
        label: "FRP Window & Door Catalog (PDF)",
        href: "/downloads/f1composite-frp-window-door-catalog.pdf",
        description: "Full 65/70/80/90/140-series fenestration catalog with profile specifications, glazing builds, and U-value matrix.",
      },
    ],
  },
  "solar-farm-mounting": {
    title: "Chongqing Industrial Rooftop PV Retrofit — Pultruded FRP H-Rail Mounting on Colored Steel-Tile Roofs",
    industry: "Energy",
    location: "Chongqing, China",
    year: "2024",
    products: ["Custom Pultrusions", "Standard Profiles"],
    challenge:
      "An industrial-park owner in Chongqing committed in 2024 to retrofit rooftop photovoltaic arrays onto a group of existing factory buildings, with the dual aim of carbon-reducing the campus and monetising idle roof area. Two project-specific constraints made conventional galvanised-steel and aluminium PV-rail systems a poor fit. The first is structural reserve. The factory buildings were originally designed for a generic-industrial roof live load of about 0.5 kN/m² — the prevailing Chinese pre-2012 industrial-roof reserve — with no provision for the added permanent dead load of a PV array. A modern monocrystalline module installation with conventional galvanised-steel rail adds in the order of 15 – 20 kg/m² of permanent load once panels, rail, clamps, and ballast are included. That is a meaningful fraction of the original roof's live-load reserve, and the structural-review consultant flagged it as the binding constraint on retrofit feasibility. The owner needed a rail system materially lighter than galvanised steel, ideally lighter than aluminium too, to keep roof loading inside the as-designed reserve without commissioning a structural-reinforcement scope that would have eliminated the project's payback case. The second constraint is the rooftop environment. Chongqing is a humid sub-tropical city — annual humidity above 80 %, frequent dew condensation (Chongqing is locally known as the Fog City), and ambient acid-rain exposure from the Yangtze River basin's industrial corridor. On a coloured steel-tile industrial roof, the daytime surface temperature can exceed 70 °C in summer and drop near freezing in winter, with hundreds of daily thermal cycles across the rail-roof interface. Galvanised steel rail in that environment is subject to accelerated zinc loss and requires a coating-renewal cycle on a 5 – 8 year schedule — uneconomic across a PV asset designed for 25-year operation, and operationally awkward because every coating renewal demands taking the panel rows off the rail. Aluminium rail solves the corrosion side but pits at the anodised surface in the acid-rain humidity profile and forms a galvanic couple with the stainless-steel clamp fasteners and the copper grounding wire.",
    solution:
      "F1 Composite Co., Ltd, manufactured at our Yancheng manufacturing facility (Chongqing FengDu New Material Co., Ltd.), supplied pultruded glass-fibre-reinforced polymer (GFRP) H-section composite rail for the Chongqing rooftop PV retrofit, paired with a matched accessory kit covering mid-clamps, end-clamps, splice plates, and Jiaochi-type roof clamps that engage the standing seams of the existing coloured steel-tile roof without penetrating the roof membrane. The pultruded H-rail addresses both project constraints through one material decision. On the structural-reserve side, the GFRP composite rail has a density of about 1.9 g/cm³ against carbon steel at 7.85 g/cm³ and aluminium 6063 at 2.70 g/cm³. In a typical rooftop PV layout the rail line-mass drops from 4 – 6 kg per linear metre for galvanised steel C-section, or 1.5 – 2.5 kg/m for aluminium extrusion, to roughly 1.0 – 1.5 kg/m for the pultruded GFRP H-rail — roughly three-quarters off the rail's contribution to roof dead load compared to galvanised steel. Across a typical 1 MW rooftop array spanning around 2,000 linear metres of rail, that translates to roughly 7 – 10 tonnes of dead load removed against a steel-rail baseline. The roof's as-designed live-load reserve is preserved, the structural-reinforcement scope is taken off the project critical path, and the PV addition becomes structurally feasible without re-engineering the building. On the rooftop weather-exposure side, GFRP pultruded rail does not anodise, does not pit, does not require a zinc-renewal cycle, and does not form a galvanic couple with the stainless-steel clamp fasteners or the copper grounding wire that runs alongside the array. The accessory kit was finalised across two production batches against the project's installation sequence, with a published clamp-and-bolt schedule (M6 × 12 for rail splices, M8 × 25 for mid- and end-clamps and T-bolts, M8 × 30 for Jiaochi roof clamps) that matched the installer's standard rooftop kit. Profiles were factory-cut to length at the F1 Yancheng line and palletised in rail-direction sequence for direct ground-level rooftop hoisting.",
    results:
      "The Chongqing factory rooftop retrofit completed its PV-array commissioning inside the as-designed roof live-load reserve, without a structural-reinforcement scope and without taking the original factory roof off operation. The pultruded GFRP H-rail delivered the two performance contributions the project specification had originally been split across two competing rail materials: weight reduction first, and rooftop weather durability second. On the weight-reduction side, the GFRP rail line-mass at roughly 1.0 – 1.5 kg/m against the galvanised-steel baseline of 4 – 6 kg/m removed roughly 75 % of the rail's contribution to the array's permanent dead load — the structural reserve calculation closed comfortably inside code. On the rooftop weather side, the GFRP rail eliminates the recoating cycle that would otherwise have required taking the array panels off the rail every 5 – 8 years for zinc renewal under galvanised steel, and eliminates the pitting/galvanic-couple maintenance burden that an aluminium-rail specification would have inherited under the local humidity and acid-rain profile. For F1 Composite, the project validates the pultruded GFRP rail system in the rooftop-PV retrofit segment where structural reserve and weather durability are jointly binding constraints. The rooftop-retrofit segment is one of the largest single addressable PV growth markets in China through 2030 — and the structural-reserve constraint that limited rooftop PV uptake under steel-rail assumptions is a constraint the GFRP rail materially relaxes.",
    stats: [
      { value: "~75 %", label: "Rail dead-load reduction vs steel" },
      { value: "1.9 g/cm³", label: "GFRP rail density" },
      { value: "0", label: "Coating renewal cycle" },
      { value: "25 yr+", label: "Design service life" },
      { value: "Jiaochi", label: "Non-penetrating roof clamp" },
      { value: "1.0 – 1.5", label: "Rail mass (kg/m)" },
    ],
    downloads: [
      {
        label: "FRP Profile Design Manual — 2026 Edition (PDF)",
        href: "/downloads/f1composite-frp-profile-design-manual-2026.pdf",
        description: "24-page engineering reference for F1 Composite pultruded structural profiles — Equal Angle, Square Box, Channel, Tube/Top Rail, Wide Flange Beam — with full deflection tables, E23-grade material data, chemical resistance, and fire performance.",
      },
      {
        label: "EPD & Carbon Footprint Analysis (PDF)",
        href: "/downloads/f1composite-epd-carbon-footprint-frp-profiles-2025.pdf",
        description: "Environmental Product Declaration and carbon-footprint analysis for the pultruded GFRP composite profile range — cradle-to-grave 36.1 kg CO₂e/m².",
      },
      {
        label: "PU-GF Pultruded Mechanical Data Sheet (PDF)",
        href: "/downloads/f1composite-pu-gf-pultruded-mechanical-data.pdf",
        description: "Mechanical performance summary for PU-GF pultruded composite — tensile, compressive, flexural, ILSS, water absorption per GB/T, ISO, and ASTM standards.",
      },
    ],
  },
  "qinling-station-antarctic-passive-windows": {
    title: "Qinling Station, Antarctic Ross Sea — PHI Class A+ Passive FRP Windows",
    industry: "Construction",
    location: "Ross Sea, Antarctica",
    year: "2024",
    products: ["Fenestration Systems"],
    challenge:
      "China's Qinling Station on the shore of the Ross Sea is the country's fifth Antarctic research base, commissioned during the 2023–24 Antarctic summer construction window. The envelope had to survive a design low of approximately −60 °C ambient, katabatic winds in excess of 45 m/s, wind-driven snow ingress, and annual solar cycles that swing between months of continuous darkness and months of continuous UV. The site has no local repair supply chain — every component shipped in on the Xuelong-2 research vessel, and anything that fails on-station has to either be repairable by the overwintering crew with hand tools or carry a design life long enough that failure is not contemplated. Regulated Passivhaus-grade performance was required for energy survival: generator fuel is the single largest operational cost and the single largest logistics constraint, and fuel savings from a tighter envelope directly translate into station operating range. The specification called for windows certified to the PHI Passive House Component standard at the coldest (arctic / phA) climate class — effectively the ceiling of what the international passive-window rating system recognizes.",
    solution:
      "F1 Composite Co., Ltd, manufactured at our Chongqing FengDu New Material factory, supplied pultruded GFRP Passive House window frames from the 90-series fenestration system, certified by Passive House Institute Darmstadt under Component-ID 2491wi03 at the phA arctic climate class — among the first Chinese-manufactured window systems to hold that rating. The pultruded GFRP profile has thermal conductivity roughly 1/170 of steel and carries no metal thermal breaks, so there is no metallic path between outer and inner frame surfaces and no component that can fatigue, delaminate, or corrode at extreme cold. Frames were specified with triple-pane insulating glass (argon-filled, two low-e coatings), three-stage EPDM gasketing, and reinforced corner joints designed to keep frame squareness under the asymmetric loading of hurricane-class katabatic gusts against the building's lee face. All units were factory-assembled and leak-tested in Chongqing, palletized for shipboard transport, and delivered to site in a single Antarctic summer logistics cycle with spare gaskets and hardware kits for autonomous overwintering crew replacement. Because pultruded GFRP does not rust or require repainting, no surface-coating maintenance is required across the station's projected service life — a critical constraint in a non-reparable location.",
    results:
      "Qinling Station entered operational service in February 2024 and has completed its first full Antarctic overwintering cycle with the F1 Composite fenestration package as part of the sealed envelope. The PHI A+ / phA certification translates directly into generator fuel savings that extend the station's autonomous operating range between resupply, and the dark-surface pigment has held without UV fade across the first full irradiance season. For F1 Composite, Qinling Station validates pultruded GFRP Passive House windows in the most demanding built environment on Earth — if the window system holds at the Ross Sea under 45+ m/s katabatic loads and −60 °C design temperatures, specification arguments against aluminum-thermal-break frames for coastal, high-altitude, or passive-certified residential projects become straightforward.",
    stats: [
      { value: "phA / A+", label: "PHI Climate Class" },
      { value: "−60°C", label: "Design Low" },
      { value: "45 m/s", label: "Katabatic Wind" },
      { value: "2491wi03", label: "PHI Component ID" },
    ],
    downloads: [
      {
        label: "Download PHI Certificate (PDF)",
        href: "/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf",
        description: "Passive House Institute component certification — 90-series GFRP, Component-ID 2491wi03, phA arctic climate class.",
      },
    ],
  },
  "yancheng-talent-apartment-fenestration": {
    title: "Yancheng Talent Apartment — Large-Scale FRP Fenestration Supply",
    industry: "Construction",
    location: "Yancheng, Jiangsu, China",
    year: "2024",
    products: ["Fenestration Systems"],
    challenge:
      "The Yancheng Talent Apartment development in Jiangsu Province is a government-backed residential complex of ~20 mid-rise apartment buildings, a commercial plaza, and community facilities, purpose-built to house skilled workers attached to regional industrial and R&D programs. Yancheng sits on the Jiangsu coast, less than 40 km from the Yellow Sea — ambient salt-laden humidity and high summer dew point disqualify standard aluminum frames, which rely on protective coatings that degrade under coastal conditions and require repainting within 8–12 years. The project specification demanded (a) sub-1.6 W/m²K whole-window U-value for the local residential energy code, (b) sound attenuation above 32 dB to meet dormitory-grade acoustic requirements, (c) uniform visual appearance across thousands of units, (d) mixed window typologies — inward and outward casements for residential floors, large sliders for balconies, and framed glazing for commercial / clubhouse facades — all in a single coordinated pultruded system, and (e) delivery phased across a 14-month construction sequence without staging warehouse footprint on-site.",
    solution:
      "F1 Composite supplied the complete fenestration package across three pultruded FRP product families coordinated as one system. Residential floors received 65-series FRP casement window frames in both inward-opening and outward-opening configurations — the 65mm frame depth pairs with double-glazed IGU to meet the 1.6 W/m²K U-value target with comfortable margin, while the pultruded FRP profile itself carries no thermal bridging and requires no thermal-break inserts. Balcony and terrace openings were specified with 90-series FRP sliding frames, engineered for multi-track glazing up to 2.4 m clear opening with reinforced interlock mullions and stainless-steel rollers to handle the repeated daily actuation expected in residential service. Commercial plaza, clubhouse, and facade sections used 90-series framed glazing assemblies with matching visual profile, allowing architects to carry a single frame geometry across residential and non-residential envelopes for visual coherence. All profiles were pultruded with UV-stabilized polyester resin in a pigmented dark-grey finish — color is in-profile, not applied, so no repainting cycle is ever required. Factory-cut lengths and pre-drilled corner joints shipped directly to the installation contractor in phase-gated batches aligned with each building's glazing window, eliminating on-site staging.",
    results:
      "F1 Composite delivered the full fenestration package across all residential and commercial buildings on schedule across the 14-month construction program. The project validates pultruded FRP as a direct replacement for aluminum fenestration in coastal, cost-sensitive residential developments at scale — the combination of whole-window U-value, acoustic performance, zero maintenance requirement, and mixed-typology coordination (65-series casement + 90-series slider + facade frames from a single supplier) is difficult to source from thermally broken aluminum at equivalent lifecycle cost. The dark-grey pigmented profile has held color and surface finish across the first winter–summer cycle with no UV fade or salt-air surface degradation observed in the post-handover inspection.",
    stats: [
      { value: "~20", label: "Buildings Glazed" },
      { value: "1.6", label: "U-Value (W/m²K)" },
      { value: "65 + 90", label: "Series Supplied" },
      { value: "40km", label: "From Coast" },
    ],
  },
  "factory-access-staircase": {
    title: "F1 Factory FRP Access Staircase — Built With Our Own Profiles",
    industry: "Industrial",
    location: "Chongqing, China",
    year: "2024",
    products: ["Standard Profiles", "Gratings & Decks", "Custom Pultrusions"],
    challenge:
      "F1 Composite's Chongqing production base required a multi-level access staircase and intermediate platform linking the pultrusion line mezzanine to the fiber-creel area. The installation sits above the resin impregnation zone, where ambient humidity, resin vapor, and occasional chemical splash rule out painted carbon steel — historical galvanized steel stairs on this site needed re-coating every 18 months and still developed surface rust. The replacement had to be non-corroding, electrically isolating (live electrical cabinets are within 2 meters), fire-retardant to the factory's class, and installable over a 3-day shutdown window without hot work permits.",
    solution:
      "The entire stair system was engineered and built from F1 Composite's own pultruded FRP profiles — making this an end-to-end showcase of the product line our customers buy. Stringers and landing beams use pultruded FRP I-beams and square tubes in vinyl ester resin for chemical resistance; intermediate platforms use molded FRP gratings with anti-slip gritted top surface (AS 4586 R11 rating); handrails and kick-plates are built from pultruded FRP round tube and flat bar in safety-orange UV-stabilized polyester resin for maximum visibility. All connections use 316L stainless-steel bolts through pre-drilled FRP profiles — no welding, no hot work, no cranes. The modular design allowed 4 workers to complete assembly using hand tools within the 3-day window.",
    results:
      "The staircase and elevated platform have been in continuous service for 18 months with zero maintenance — no repainting, no tightening, no corrosion inspection required. Total installed weight is approximately 68% lower than the steel structure it replaced, which allowed reuse of the existing concrete pad without reinforcement. Because this is F1's own facility, we use this installation as a live reference for visiting customers — walk it, load it, inspect the connections, and see 18 months of real-world wear on profiles identical to what ships to your project.",
    stats: [
      { value: "68%", label: "Weight Reduction" },
      { value: "0", label: "Maintenance Cost" },
      { value: "3-day", label: "Install Window" },
      { value: "25yr", label: "Design Life" },
    ],
  },
  "water-treatment-cable-tray": {
    title: "Municipal Water Treatment Plant — Cable Tray & Handrail System",
    industry: "Infrastructure",
    location: "Thailand",
    year: "2024",
    products: ["Standard Profiles", "Gratings & Decks", "Custom Pultrusions"],
    challenge:
      "A 120,000 m³/day municipal water treatment facility in Thailand required full replacement of its cable management and safety handrail systems. The existing galvanized steel cable trays and handrails had suffered severe corrosion after only 8 years of service due to constant exposure to chlorinated water vapor, high humidity (85–95% RH year-round), and tropical UV radiation. Annual maintenance costs had escalated to over USD 45,000, and several sections posed safety risks due to structural section loss exceeding 30%. The facility operator required a zero-maintenance solution with a minimum 25-year design life that could be installed during normal plant operation without process shutdowns.",
    solution:
      "F1 Composite supplied a complete FRP cable tray and handrail system comprising pultruded FRP cable ladder trays (600mm and 450mm widths, NEMA VE 1 compliant), FRP channel and angle sections for tray supports, pultruded round tube and square tube handrail assemblies with UV-stabilized polyester resin, and molded FRP grating stair treads with anti-slip surfaces rated to AS 4586 R11. The isophthalic polyester resin system was selected for its proven resistance to chlorinated water environments and tropical UV exposure. All profiles were factory-cut and pre-drilled to site dimensions, with stainless steel 316L fasteners for connections. The modular design allowed installation by a 4-person crew using hand tools only — no welding, no hot work permits, no crane required. Each cable tray section weighed approximately 75% less than the galvanized steel equivalent, enabling manual handling throughout the plant.",
    results:
      "The complete system — covering 2.8 km of cable tray runs and 1.2 km of handrail — was installed over 6 weeks with zero process interruption. The FRP system weighs 78% less than the replaced steel, eliminating all crane operations during installation. Post-installation load testing confirmed compliance with IEC 61537 cable tray load requirements and EN ISO 14122-3 handrail loading standards. The facility operator projects zero structural maintenance over the 30-year design life, representing estimated lifecycle savings of USD 850,000 compared to repeated galvanized steel replacement cycles. After 6 months of service, inspection confirmed no visible degradation, discoloration, or structural change in any FRP component.",
    stats: [
      { value: "2.8km", label: "Cable Tray Installed" },
      { value: "78%", label: "Weight Reduction" },
      { value: "$850K", label: "Lifecycle Savings" },
      { value: "30yr", label: "Design Life" },
    ],
  },
};

const caseStudyImages: Record<string, string> = {
  "european-bridge-deck": "/images/case-studies/frp-bridge-deck-replacement-infrastructure-project.jpg",
  "coastal-marina-walkway": "/images/case-studies/frp-coastal-marina-walkway-grating-system.jpg",
  "chemical-plant-platform": "/images/case-studies/frp-baotou-industrial-park-aerial-rendering.webp",
  "fenestration-residential": "/images/case-studies/frp-wanhua-yantai-zero-carbon-community-aerial.webp",
  "solar-farm-mounting": "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
  "water-treatment-cable-tray": "/images/case-studies/frp-water-treatment-plant-aerial-cable-tray-handrail.webp",
  "factory-access-staircase": "/images/case-studies/frp-factory-access-staircase-hero.webp",
  "yancheng-talent-apartment-fenestration": "/images/case-studies/frp-talent-apartment-yancheng-aerial-view.webp",
  "qinling-station-antarctic-passive-windows": "/images/case-studies/frp-qinling-station-antarctic-ross-sea-aerial.webp",
};

const caseStudyContentImages: Record<string, { src: string; alt: string }[]> = {
  "factory-access-staircase": [
    {
      src: "/images/case-studies/frp-factory-staircase-structural-view.webp",
      alt: "Side view of FRP I-beam stringers and pultruded structural profiles forming the staircase frame inside F1 Composite's Chongqing factory",
    },
    {
      src: "/images/case-studies/frp-factory-staircase-platform-handrail.webp",
      alt: "Elevated platform with safety-orange pultruded FRP handrails and guardrails installed above the pultrusion line",
    },
    {
      src: "/images/case-studies/frp-factory-staircase-grating-treads.webp",
      alt: "Anti-slip molded FRP grating stair treads and platform panels in corrosive factory environment",
    },
    {
      src: "/images/case-studies/frp-factory-staircase-assembly-detail.webp",
      alt: "Bolted connection detail between pultruded FRP profiles and 316L stainless steel fasteners — no welding required",
    },
  ],
  "water-treatment-cable-tray": [
    {
      src: "/images/case-studies/frp-water-treatment-plant-aeration-basin-piping-system.webp",
      alt: "Aerial view of water treatment aeration basins with FRP cable tray and piping system installed across walkways",
    },
    {
      src: "/images/case-studies/frp-water-treatment-plant-walkway-handrail-installation.jpg",
      alt: "FRP handrail and walkway system installed at municipal water treatment facility with corrosion-resistant railing",
    },
  ],
  "fenestration-residential": [
    {
      src: "/images/case-studies/frp-wanhua-yantai-passive-house-building.webp",
      alt: "Wanhua Yantai Zero-Carbon Community — close view of a passive-house dormitory building with continuous pultruded GFRP-PU window frames and a high-glazing facade",
    },
    {
      src: "/images/case-studies/frp-wanhua-yantai-residential-tower-courtyard.webp",
      alt: "Ground-level courtyard at the Wanhua Yantai Zero-Carbon Community — residents and staff in the landscaped quad between dormitory buildings, with floor-to-ceiling pultruded GFRP-PU windows above",
    },
  ],
};

export async function generateStaticParams() {
  return Object.keys(caseStudyData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudyData[slug];
  if (!cs) return { title: "Case Study" };
  return buildPageMetadata({
    title: cs.title,
    description: `${cs.title} — ${cs.industry} project in ${cs.location}. ${cs.results.slice(0, 120)}...`,
    path: `/case-studies/${slug}`,
    image: `/case-studies/${slug}/opengraph-image`,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = caseStudyData[slug];

  if (!cs) {
    return (
      <div className="py-[89px] text-center">
        <h1 className="text-f24 font-bold text-t1">Case study not found</h1>
        <Link href="/case-studies" className="mt-[13px] text-teal-text">
          ← Back to all case studies
        </Link>
      </div>
    );
  }

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: cs.title,
    url: absoluteUrl(`/case-studies/${slug}`),
    description: cs.results,
    about: cs.industry,
    datePublished: cs.year,
    locationCreated: cs.location,
    publisher: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
    image: absoluteUrl(`/case-studies/${slug}/opengraph-image`),
  };

  return (
    <>
      <JsonLd data={caseStudySchema} />
      <PageHeader
        tag={cs.industry}
        title={cs.title}
        description={`${cs.location} · ${cs.year}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: cs.title },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[34px] lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div>
            {/* Project hero image */}
            <div className="relative mb-[34px] aspect-[1.618] overflow-hidden rounded-[8px] bg-bg2">
              <Image
                src={caseStudyImages[slug] || "/images/case-studies/frp-bridge-deck-replacement-infrastructure-project.jpg"}
                alt={cs.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>

            <h2 className="mb-[13px] text-f24 font-bold text-t1">The Challenge</h2>
            <p className="mb-[34px] text-f15 leading-golden text-t2">{cs.challenge}</p>

            <h2 className="mb-[13px] text-f24 font-bold text-t1">Our Solution</h2>
            <p className="mb-[34px] text-f15 leading-golden text-t2">{cs.solution}</p>

            {/* Content images — inserted between solution and results */}
            {caseStudyContentImages[slug] && (
              <div className="mb-[34px] grid gap-[21px] sm:grid-cols-2">
                {caseStudyContentImages[slug].map((img) => (
                  <div key={img.src} className="overflow-hidden rounded-[8px]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={620}
                      height={465}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <h2 className="mb-[13px] text-f24 font-bold text-t1">Results</h2>
            <p className="mb-[34px] text-f15 leading-golden text-t2">{cs.results}</p>

            {/* Stats */}
            <div className="flex gap-[34px] border-t border-border-default pt-[21px]">
              {cs.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block text-f24 font-extrabold text-teal">{stat.value}</span>
                  <span className="text-f11 font-bold uppercase tracking-[2px] text-t3">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-[21px]">
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <h4 className="mb-[13px] text-f13 font-bold text-t1">Project Details</h4>
              <dl className="space-y-[8px] text-f13">
                <div>
                  <dt className="text-t3">Location</dt>
                  <dd className="font-medium text-t1">{cs.location}</dd>
                </div>
                <div>
                  <dt className="text-t3">Industry</dt>
                  <dd className="font-medium text-t1">{cs.industry}</dd>
                </div>
                <div>
                  <dt className="text-t3">Year</dt>
                  <dd className="font-medium text-t1">{cs.year}</dd>
                </div>
                <div>
                  <dt className="text-t3">Products Used</dt>
                  <dd className="font-medium text-t1">{cs.products.join(", ")}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h4 className="mb-[13px] text-f13 font-bold text-t1">Products Used</h4>
              <div className="space-y-[8px]">
                {cs.products.map((product) => {
                  const slug = productLabelToSlug[product] ?? product.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <Link
                      key={product}
                      href={`/products/${slug}`}
                      className="block text-f13 text-teal-text hover:underline"
                    >
                      {product} →
                    </Link>
                  );
                })}
                <Link
                  href="/pultruded-frp-profiles"
                  className="mt-[13px] block border-t border-border-default pt-[8px] text-f13 text-teal-text hover:underline"
                >
                  All pultruded FRP profiles →
                </Link>
              </div>
            </div>

            {cs.downloads && cs.downloads.length > 0 && (
              <div className="rounded-[8px] border border-teal-border bg-teal-bg p-[21px]">
                <h4 className="mb-[13px] text-f13 font-bold text-t1">Certificates & Downloads</h4>
                <div className="space-y-[13px]">
                  {cs.downloads.map((dl) => (
                    <a
                      key={dl.href}
                      href={dl.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <span className="flex items-start gap-[8px] text-f13 font-semibold text-teal-text group-hover:text-teal">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px] shrink-0">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>{dl.label}</span>
                      </span>
                      {dl.description && (
                        <p className="mt-[4px] pl-[24px] text-f11 leading-golden text-t2">{dl.description}</p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h4 className="mb-[13px] text-f13 font-bold text-t1">Industry & resources</h4>
              <div className="space-y-[8px]">
                <Link
                  href={`/industries/${cs.industry.toLowerCase()}`}
                  className="block text-f13 text-teal-text hover:underline"
                >
                  {cs.industry} industry →
                </Link>
                <Link href="/case-studies" className="block text-f13 text-teal-text hover:underline">
                  All case studies →
                </Link>
                <Link href="/what-is-frp" className="block text-f13 text-teal-text hover:underline">
                  What is FRP? →
                </Link>
                <Link
                  href="/technology/frp-vs-traditional-materials"
                  className="block text-f13 text-teal-text hover:underline"
                >
                  FRP vs steel / aluminum →
                </Link>
              </div>
            </div>

            <Link
              href="/contact"
              className="block rounded-[8px] bg-teal p-[21px] text-center text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
            >
              Start a Similar Project
            </Link>
          </aside>
        </div>
      </section>

      <AskAICard
        title={`Have a similar project to ${cs.title.split("—")[0].trim()}?`}
        description="Open the FRP Engineering Advisor with this case study loaded as context. Ask about specs, profile families, resin selection, or how to build your own RFQ."
        prefill={prefillForCaseStudy({
          title: cs.title,
          slug,
          industry: cs.industry,
          location: cs.location,
        })}
      />

      <InnerCTA title="Interested in a similar solution?" />
    </>
  );
}
