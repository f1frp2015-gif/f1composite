import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AskAICard from "@/components/ai/AskAICard";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import JumpNav from "@/components/sections/JumpNav";
import { WindowOpeningTypes } from "@/components/sections/ConceptAnimations";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle =
  "Pultruded Fiberglass & FRP Windows, Doors — Extreme Cold";
const pageDescription =
  "Pultruded fiberglass (GFRP-PU) windows & doors for extreme cold: factory-assembled, leak-tested, U_w 0.78 (PHI 2491wi03), proven to −60°C. Canada, Russia. DDP.";
const pagePath = "/products/fenestration-systems";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fenestration-systems/opengraph-image",
});

const supplyModels = [
  {
    name: "Complete window & door units",
    tag: "Finished product · ready to install",
    description:
      "We supply the finished article: GFRP-PU window and door units factory-assembled, glazed, hardware-fitted, gasketed, leak-tested, and palletized for shipment. Each unit arrives squared, sealed, and ready to set into the rough opening — no local fabrication, no glazing line, no hardware sourcing. This is the model we use for extreme-cold and Passive House projects where envelope air-tightness and thermal performance must be guaranteed at the factory, not assembled on a jobsite. Every unit ships with its certification pack, spare gaskets, and mounting hardware, and we quote DDP to your port or jobsite with duty pre-itemized.",
  },
  {
    name: "Pultruded profiles for local fabricators",
    tag: "Profile supply · fabricator model",
    description:
      "For markets with an established window-fabrication base, we ship the pultruded FRP profile set — known in the North American trade as window lineals: frame, sash, mullion, transom, glazing bead — plus co-extruded EPDM gasketing, reinforced corner kits, and fabrication drawings, so a local fabricator cuts, joins, glazes, and finishes the units to your specification. This is the route many North American projects take through a fabricator-partner. The profiles are identical to those in our finished units; only the assembly location changes. Choose this model when local content, local glazing supply, or local service warranties favor in-country assembly.",
  },
];

const productTypes = [
  {
    name: "Tilt-and-turn windows",
    series: "65 / 70 / 80 / 90",
    detail:
      "The European cold-climate workhorse: a single handle gives a tilt position for trickle ventilation and a full inward-turn for cleaning and egress. Multi-point perimeter locking pulls the sash into a continuous EPDM compression seal — the air-tightness that Passive House and severe-cold codes demand. Sash sizes to roughly 1,600 × 2,400 mm without steel reinforcement.",
  },
  {
    name: "Casement & awning windows",
    series: "65 / 70 / 80",
    detail:
      "Side-hung casements and top-hung awnings on stainless friction stays, sealing against a compression gasket that stays elastic at −40°C. The preferred operable type for North American specs that call for NAFS/AAMA performance grades; awnings shed snow-melt and allow ventilation during light precipitation.",
  },
  {
    name: "Fixed lights & picture windows",
    series: "65 / 70 / 80 / 90",
    detail:
      "Maximum daylight, minimum frame, lowest whole-window U-value. Fixed lights carry the largest insulating glass builds — triple and quadruple-glazed — and are the lowest-cost path to a passive-grade envelope where operability is not required. Combined with operable units into ribbon glazing and window walls via mullion/transom sections.",
  },
  {
    name: "Lift-and-slide doors",
    series: "140",
    detail:
      "The 140-series lift-and-slide system carries leaves up to 400 kg over a thermally-broken sill track, for terrace, balcony, and large glazed openings. The lift mechanism drops the leaf onto its seals when closed for a weather-tight, air-tight perimeter, then lifts it onto rollers for near-frictionless operation — no cold-air infiltration at the meeting stile.",
  },
  {
    name: "Swing entrance doors",
    series: "90",
    detail:
      "Insulated entrance leaves up to 130 kg on concealed adjustable hinges, with multi-point hook-bolt locking and a thermally-broken composite threshold that breaks the conductive path at the most common cold-climate condensation point — the door sill. Foam-cored leaves keep the door-panel U-value in step with the frame.",
  },
  {
    name: "Tilt-slide & parallel-slide doors",
    series: "80 / 90",
    detail:
      "Balcony and terrace access where a full lift-and-slide is more door than the opening needs: the leaf tilts in for ventilation, then slides parallel to the frame. Compression sealing on the tilt position gives air-tightness a conventional slider cannot, while keeping a slim sightline.",
  },
];

const systemSeries = [
  {
    name: "65-Series",
    frameDepth: "65 mm",
    chambers: 2,
    kValue: "1.3 - 1.5 W/m²K",
    glassRange: "24 - 38 mm",
    applications: "Residential windows, light commercial projects, renovation and retrofit",
    description:
      "The 65-series is our entry-level fenestration system, designed for residential and light commercial applications where thermal performance must exceed aluminum but project budgets are tightly controlled. The 65 mm frame depth accommodates double-glazed insulating glass units with cavities up to 18 mm, delivering whole-window K-values of 1.3 to 1.5 W/m²K depending on glass specification. Despite being our most compact system, the 65-series leverages the inherently low thermal conductivity of pultruded FRP (approximately 0.3 W/mK, compared to 160 W/mK for aluminum) to achieve thermal performance that aluminum systems can only match with complex multi-chamber thermal break inserts. The two-chamber frame design provides structural rigidity sufficient for window units up to 1,800 mm in height without steel reinforcement, eliminating the hidden thermal bridge that steel-reinforced PVC frames introduce.",
  },
  {
    name: "70-Series",
    frameDepth: "70 mm",
    chambers: 3,
    kValue: "1.1 - 1.3 W/m²K",
    glassRange: "28 - 44 mm",
    applications: "Residential, commercial, passive house compatible",
    description:
      "Our 70-series system is the workhorse of our fenestration range, balancing high thermal performance with broad architectural applicability. The 70 mm frame depth and three-chamber internal geometry accommodate triple-glazed insulating glass units with argon or krypton gas fills, achieving whole-window K-values of 1.1 to 1.3 W/m²K. This places the 70-series within the performance envelope required by most passive house certification bodies when combined with appropriate glazing. The profile set includes fixed-light frames, tilt-and-turn sash profiles, casement sash profiles, and dedicated mullion and transom sections that allow fabricators to build complex window wall configurations from a single system. All profiles feature a co-pultruded EPDM gasket channel that provides a continuous weatherseal without the need for secondary gasket adhesion, improving long-term air-tightness and simplifying fabrication.",
  },
  {
    name: "80-Series",
    frameDepth: "80 mm",
    chambers: 3,
    kValue: "0.9 - 1.1 W/m²K",
    glassRange: "36 - 52 mm",
    applications: "High-performance commercial, curtain wall, near-zero-energy buildings",
    description:
      "The 80-series targets high-performance commercial and near-zero-energy building projects where fenestration thermal performance is a critical factor in achieving energy compliance. The 80 mm frame depth with three internal chambers provides exceptional thermal isolation, and the increased glazing rebate depth accommodates quadruple-glazed units or triple-glazed units with wide cavities for maximum gas-fill performance. We engineer the 80-series profiles with a hybrid fiber architecture that combines unidirectional E-glass roving for longitudinal stiffness with +/- 45-degree multiaxial fabric for corner rigidity and impact resistance. This architecture allows the 80-series to span larger openings without supplementary steel reinforcement, maintaining the thermal integrity that makes FRP fenestration superior to aluminum and PVC alternatives. The 80-series also includes a dedicated curtain wall framing system with pressure-equalized drainage and structural silicone glazing compatibility.",
  },
  {
    name: "90-Series",
    frameDepth: "90 mm",
    chambers: 3,
    kValue: "0.78 - 0.95 W/m²K",
    glassRange: "44 - 60 mm",
    applications: "Ultra-low-energy buildings, arctic and extreme climate zones, institutional projects",
    description:
      "Our flagship 90-series represents the pinnacle of pultruded FRP fenestration performance, engineered for projects in extreme climate zones and ultra-low-energy building standards such as Passive House Premium and MINERGIE-P. The 90 mm frame depth and three-chamber geometry provide a thermal barrier equivalent to approximately 100 mm of mineral wool insulation, achieving certified whole-window K-values as low as 0.78 W/m²K with appropriate glazing selection. This is the frame behind PHI Component Certificate 2491wi03 at the phA arctic climate class — the coldest tier the international Passive House component rating recognizes. The 90-series profile set includes entrance door frame and leaf profiles capable of supporting door leaves weighing up to 130 kg on concealed hinges, as well as lift-and-slide door tracks rated for leaves up to 400 kg. All 90-series profiles are manufactured in vinyl ester or polyurethane resin as standard, providing superior long-term dimensional stability and resistance to the moisture cycling that can compromise PVC frames in high-humidity environments.",
  },
  {
    name: "140-Series",
    frameDepth: "140 mm",
    chambers: 4,
    kValue: "0.9 - 1.1 W/m²K",
    glassRange: "36 - 56 mm",
    applications: "Lift-and-slide patio doors, balcony and terrace access, large glazed openings",
    description:
      "The 140-series is our lift-and-slide door system, a deep multi-chamber frame and thermally-broken sill track engineered for the largest glazed openings in the range. Leaves up to 400 kg run on stainless rollers; the lift handle drops each leaf onto a continuous gasket line when closed, delivering the air-tightness and water resistance that a conventional sliding door — which seals only by brush — cannot reach in a cold climate. The pultruded frame keeps the interior face of the track and meeting stile warm enough to stay condensation-free where aluminum slide tracks frost and drip. Specified for terrace doors, balcony access, and floor-to-ceiling glazed walls on Passive House and near-zero-energy residential projects.",
  },
];

const coldEngineering = [
  {
    title: "No metallic thermal bridge to fail",
    body:
      "The whole frame is intrinsically insulating — there is no aluminum core, no polyamide thermal-break strip, no steel reinforcement, and therefore no metallic path between the cold exterior and the warm interior. In a Canadian or Siberian winter the interior frame face stays warm, so it does not collect condensation or frost the way a thermally-broken aluminum frame does at its weakest detail.",
  },
  {
    title: "Conductivity 0.3 vs aluminum 160 W/m·K",
    body:
      "Pultruded FRP conducts heat at roughly 1/500th the rate of aluminum and on par with timber. That lifts the interior surface temperature of the frame and edge-of-glass, raising the condensation resistance factor (CRF) — the number that decides whether a window streams water or stays dry on the coldest design night.",
  },
  {
    title: "Dimensional stability −40 to +80°C",
    body:
      "FRP has a coefficient of thermal expansion close to that of glass, so the frame and its IGU move together. Across 200-plus freeze-thaw cycles a year the seals stay compressed, the corners stay square, and there is no oil-canning or seal-pumping that opens air-leakage paths over the building's life.",
  },
  {
    title: "No cold embrittlement",
    body:
      "PVC frames lose impact strength and can crack at deep-cold temperatures, which is why severe-cold codes treat them cautiously. Thermoset FRP keeps its impact strength and stiffness at −40°C and below — the same reason it survives 45 m/s katabatic gusts at our Antarctic installation.",
  },
  {
    title: "Triple EPDM seals + warm-edge IGU",
    body:
      "Every operable unit carries a three-stage EPDM gasket line that retains its elasticity at low temperature, paired with warm-edge (non-metallic) IGU spacers that lift the edge-of-glass temperature and push the unit's condensation point further below the design low.",
  },
  {
    title: "No corrosion, no recoating",
    body:
      "Snow-belt and Arctic environments mean de-icing salt, chloride aerosol, and constant wet-dry cycling. FRP does not corrode, pit, or need a coating-renewal cycle, so a 60-year service life carries no envelope-maintenance budget for the windows — proven on a −25°C chemical-exposure industrial campus.",
  },
];

const targetRegions = [
  {
    region: "Canada",
    climate: "Cold / Arctic zones; −30 to −45°C design lows",
    standards: "CSA A440 / NAFS · NFRC · PHIUS · BC Energy Step Code",
    note: "U-factor clears Step 4/5 window targets, and FRP is not caught by Canada's 25% surtax on Chinese steel and aluminum. Dedicated Canada sourcing page available.",
    href: "/regions/frp-passive-house-windows-canada",
  },
  {
    region: "Germany",
    climate: "GEG 2024 / Effizienzhaus 40 · Passivhaus home market",
    standards: "EN 14351-1 CE · EN ISO 10077 · PHI Component (Darmstadt)",
    note: "U_w 0.78 clears GEG, BEG funding (≤ 0.95), and the PHI 0.80 component criterion — and FRP sits outside the EU aluminium anti-dumping duties and CBAM. Dedicated Germany sourcing page available.",
    href: "/regions/frp-passive-house-windows-germany",
  },
  {
    region: "Russia & Siberia",
    climate: "Severe-cold / Far North; −40 to −50°C design lows",
    standards: "GOST 23166 · SP 50.13330 (thermal protection) · УХЛ climatic execution",
    note: "Reduced heat-transfer resistance R₀ ≈ 1.3 m²·°C/W at U_w 0.78 clears Russian window requirements with margin; EAC / ГОСТ documentation supported per project.",
    href: null,
  },
  {
    region: "Nordics",
    climate: "Norway, Sweden, Finland — Passive House density",
    standards: "EN 14351-1 CE · NS-EN · Passivhaus component",
    note: "Triple and quadruple-glazed units to the low U_w the Nordic passive-house market specifies, with the same frost-free interior frame face.",
    href: null,
  },
  {
    region: "United Kingdom",
    climate: "Part L / Future Homes Standard · growing Passivhaus pipeline",
    standards: "EN 14351-1 · CE recognised / UKCA · PHI component",
    note: "Known locally as GRP windows — Part L-ready U-values without steel stiffeners, dark RAL colours without warping risk. Dedicated UK sourcing page available.",
    href: "/regions/grp-windows-uk",
  },
  {
    region: "Northern US",
    climate: "ENERGY STAR Northern climate zone",
    standards: "NFRC 100/200 · AAMA 2604 / 2605 · ASHRAE 90.1",
    note: "U-factor and condensation resistance for the Northern zone, with architectural-grade finishes in any RAL color. DDP USA with Section 301 quoted inline.",
    href: "/regions/frp-pultrusion-supplier-usa",
  },
  {
    region: "Kazakhstan · Mongolia · N. China",
    climate: "Continental severe-cold; long heating season",
    standards: "GB severe-cold-zone energy code · GOST (EAEU)",
    note: "Proven on Chinese severe-cold-zone industrial and residential projects, including a −25°C chemical-exposure campus and a 13,657 m² zero-carbon community.",
    href: null,
  },
];

const coldProof = [
  {
    title: "Qinling Station, Antarctica — −60°C, PHI phA arctic",
    body:
      "90-series GFRP-PU passive windows certified to PHI Component-ID 2491wi03 at the arctic climate class — factory-assembled and leak-tested in China, then shipped in a single Antarctic summer cycle to survive a −60°C design low and 45 m/s katabatic winds.",
    href: "/case-studies/qinling-station-antarctic-passive-windows",
  },
  {
    title: "Baotou Industrial Park — −25°C + chemical exposure",
    body:
      "70/80/90-series GFRP-PU windows for a severe-cold-zone manufacturing campus where the frame had to beat an aluminum thermal-bridge penalty and shrug off acid mist and chloride aerosol — one material, 25–30 years maintenance-free.",
    href: "/case-studies/chemical-plant-platform",
  },
  {
    title: "Wanhua Yantai Zero-Carbon Community",
    body:
      "13,657 m² of GFRP-PU fenestration on a near-zero-energy residential development: verified whole-window U_w 0.99 W/m²·K and N50 = 1.0 air changes — Passivhaus air-tightness at production residential scale.",
    href: "/case-studies/fenestration-residential",
  },
];

const finishedUnitSpec = [
  {
    aspect: "Factory assembly & leak test",
    detail:
      "Cut, joined, glazed, hardware-fitted, and water/air leak-tested in our plant — not on a jobsite. Units arrive squared and sealed, with the air-tightness verified before they leave the factory.",
  },
  {
    aspect: "Multi-point locking & hardware",
    detail:
      "Perimeter multi-point locking on operable windows and hook-bolt locking on doors, draws the sash into the gasket for compression sealing. Concealed adjustable hinges rated to 130 kg leaves; stainless friction stays on casements.",
  },
  {
    aspect: "Glazing & warm edge",
    detail:
      "Double, triple, or quadruple-glazed IGUs with low-e coatings, argon or krypton fill, and warm-edge (non-metallic) spacers. Structural and dry-glazed options; we factory-glaze for finished units.",
  },
  {
    aspect: "Thermally-broken thresholds",
    detail:
      "Door sills and lift-and-slide tracks use a thermally-broken composite section so the most condensation-prone detail in a cold-climate door stays warm and dry.",
  },
  {
    aspect: "AAMA 2604 / 2605 finish",
    detail:
      "Architectural-grade acrylic and polyurethane finishes with 10-year exposure ratings in any RAL color — including the dark frame colors that hold without UV fade through a full polar irradiance season.",
  },
  {
    aspect: "Certification pack & spares",
    detail:
      "Each shipment carries its PHI certificate, EN 14351-1 / NAFS test reports, and finish reports, plus spare gaskets and mounting hardware for autonomous service in remote locations.",
  },
];

const thermalComparison = [
  { material: "Aluminum (no break)", kFrame: "5.0 - 7.0", conductivity: "160" },
  { material: "Aluminum (thermal break)", kFrame: "2.5 - 4.0", conductivity: "160 / 0.3 (insert)" },
  { material: "PVC (multi-chamber)", kFrame: "1.2 - 1.8", conductivity: "0.17" },
  { material: "PVC (steel reinforced)", kFrame: "1.4 - 2.2", conductivity: "0.17 / 50 (steel)" },
  { material: "Pultruded FRP (F1)", kFrame: "0.8 - 1.6", conductivity: "0.3" },
  { material: "Timber (softwood)", kFrame: "1.2 - 1.6", conductivity: "0.13" },
];

const glassConfigurations = [
  {
    name: "Double-Glazed IGU",
    structure: "4/16Ar/4 to 6/20Ar/6",
    kCenter: "1.0 - 1.1 W/m²K",
    description:
      "Standard double-glazed insulating glass units with low-emissivity coating and argon gas fill. Suitable for the 65-series and 70-series frames in mild and moderate climates. We recommend a minimum 16 mm cavity with 90% argon fill for optimal thermal performance within the double-glazed format.",
  },
  {
    name: "Triple-Glazed IGU",
    structure: "4/14Ar/4/14Ar/4 to 4/18Kr/4/18Kr/4",
    kCenter: "0.5 - 0.7 W/m²K",
    description:
      "Triple-glazed units with two low-e coatings and argon or krypton gas fill deliver the thermal performance required for passive house and near-zero-energy building standards. Compatible with our 70-series, 80-series, and 90-series frames. Krypton fill reduces the required cavity width, allowing thinner and lighter glass units at the same thermal performance level. This is the default glazing for extreme-cold projects in Canada, Russia, and the Nordics.",
  },
  {
    name: "Quadruple-Glazed IGU",
    structure: "3/12Kr/3/12Kr/3/12Kr/3",
    kCenter: "0.3 - 0.4 W/m²K",
    description:
      "Quadruple-glazed units represent the highest commercially available glazing thermal performance, with center-of-glass K-values approaching 0.3 W/m²K. These units are compatible with our 80-series and 90-series frames and are specified for extreme climate zones and buildings targeting net-zero or energy-positive performance. The increased glass weight requires careful frame engineering, which is why we offer structural analysis as a standard service for quadruple-glazed projects.",
  },
];

const faqItems = [
  {
    question: "Do you supply finished windows and doors, or only FRP profiles?",
    answer:
      "Both. For extreme-cold and Passive House projects we supply complete window and door units — factory-assembled, glazed, hardware-fitted, gasketed, and leak-tested, delivered DDP ready to install. For markets with a local fabrication base, we also supply the pultruded FRP profile set with gaskets, corner kits, and drawings so a local fabricator builds the units. The profiles are identical in both models; only the assembly location changes. Choose finished units when you need factory-verified air-tightness and thermal performance, or profiles when local content and local service warranties favor in-country assembly.",
  },
  {
    question: "How do FRP windows perform in extreme cold — −40°C and below?",
    answer:
      "This is where FRP separates from aluminum and PVC. The whole frame is intrinsically insulating (conductivity ≈ 0.3 W/m·K), so there is no metallic thermal bridge to drive interior condensation or frost — the interior frame face stays warm and dry. FRP keeps its impact strength at −40°C where PVC can embrittle, and its expansion coefficient is close to glass, so seals stay compressed across 200-plus freeze-thaw cycles a year. Our 90-series holds PHI Component Certificate 2491wi03 at the phA arctic class and is installed at Qinling Station, Antarctica, against a −60°C design low and 45 m/s katabatic winds.",
  },
  {
    question: "Are F1 windows suitable for the Russian and Siberian market?",
    answer:
      "Yes. At a whole-window U_w of 0.78 W/m²·K the reduced heat-transfer resistance R₀ is approximately 1.3 m²·°C/W, which clears Russian window requirements under GOST 23166 and the thermal-protection rules of SP 50.13330 with margin, including Far-North design lows of −40 to −50°C. The frame carries no metallic thermal bridge, so it stays frost-free on the interior face — the failure mode that plagues aluminum frames in Siberian winters. We supply finished units in УХЛ cold-climate execution and provide EAC / ГОСТ documentation per project.",
  },
  {
    question: "What makes FRP frames condensation-resistant in cold climates?",
    answer:
      "Condensation forms when an interior surface drops below the dew point. Because the FRP frame conducts heat at roughly 1/500th the rate of aluminum, its interior face and the edge-of-glass stay much warmer on a cold night, raising the condensation resistance factor (CRF). We pair this with warm-edge (non-metallic) IGU spacers and a three-stage EPDM gasket line, so the assembly's condensation point sits well below the design low even in a high-humidity interior. There is no aluminum thermal-break interface to act as a cold strip where water collects.",
  },
  {
    question: "What is the difference between FRP window frames, window profiles, and window lineals?",
    answer:
      "FRP window profiles are the individual pultruded fiberglass sections — frame, sash, mullion, transom, glazing bead — that are cut, joined, glazed, and fitted with hardware. In the North American window trade these same extruded lengths are called window lineals (fiberglass lineals). FRP window frames (or finished fenestration units) are the assembled, glazed, leak-tested windows and doors built from those profiles. F1 Composite manufactures the profiles/lineals and also assembles them into finished units in our own plant. All three terms refer to the same pultruded fiberglass window product line (65/70/80/90/140-series).",
  },
  {
    question: "How does FRP fenestration compare to aluminum in terms of thermal performance?",
    answer:
      "Pultruded FRP frames conduct heat at approximately 1/500th the rate of aluminum. In practical terms, this means an FRP frame achieves K-values of 0.8 to 1.6 W/m²K without any thermal break inserts, while aluminum frames require complex polyamide or polyurethane thermal break strips to reach K-values of 2.5 to 4.0 W/m²K. The structural thermal break in FRP is continuous and inherent to the material, not a bolted-in insert that creates potential condensation pathways and a long-term failure point in deep cold.",
  },
  {
    question: "Can FRP window frames be painted or finished in custom colors?",
    answer:
      "Yes. We supply units in standard RAL 7035 (light grey) or RAL 9016 (traffic white) as standard production colors, and finish in any RAL color with architectural-grade AAMA 2604 / 2605 acrylic or polyurethane topcoats rated for 10-year exposure. Dark frame colors hold without UV fade through a full polar irradiance season, as proven at our Antarctic installation. The resin-rich surface veil holds the finish without primer.",
  },
  {
    question: "Are your fenestration systems certified to international standards?",
    answer:
      "Complete window and door units are tested to EN 14351-1 for CE marking (air permeability, water tightness, wind resistance, operating forces) and to NAFS — AAMA/WDMA/CSA 101/I.S.2/A440 for North America. Thermal performance is the PHI Component Certificate 2491wi03 (U_w 0.78, phA arctic class), with NFRC 100 and CSA A440.2/.3 simulation on request. Profiles are characterized to EN ISO 10077-2 and EN 14024. For Russia and the EAEU we support GOST 23166 and EAC documentation per project. Every shipment includes the test reports and certificates your submission requires.",
  },
  {
    question: "What CSI MasterFormat section covers fiberglass (FRP) windows?",
    answer:
      "In North American project specifications, fiberglass windows are specified under CSI MasterFormat Division 08 (Openings), Section 08 53 00 — Plastic Windows, which covers non-metal framed window systems including pultruded fiberglass. The supporting pultruded profiles themselves fall under Division 06, Section 06 50 00 (Structural Plastics). F1 supports spec-section submittals with the full documentation stack: EN 14351-1 / NAFS test reports, PHI Component Certificate 2491wi03, EN ISO 10077-2 thermal simulation data, and AAMA 2604/2605 finish reports.",
  },
  {
    question: "Is F1 Composite a window factory or a trading company?",
    answer:
      "A manufacturer. F1 Composite pultrudes its window profiles on its own continuous lines (5 production bases, 370 pultrusion lines, 800+ standing die sections) and assembles finished window and door units in its own plant — no subcontracted production behind a trading front. We support third-party factory audits (SGS / Bureau Veritas) as a routine qualification step, and we run OEM / private-label lineal programs for window brands and fabricators who sell under their own name.",
  },
  {
    question: "What is the minimum order quantity for FRP window profiles?",
    answer:
      "It depends on which supply model and whether your sections need new tooling. Finished window and door units are quoted per project with no fixed MOQ floor. Profile (lineal) supply on our standing 65/70/80/90/140-series dies follows container-lot economics — mixed sections in one container are routine. Custom sections carry die fabrication (3–6 weeks), so the MOQ follows tooling amortization: either a one-time die charge with a low volume commitment, or the die cost amortized into a larger first order. Qualification orders are deliberately small — a paid first-article run precedes any production commitment.",
  },
  {
    question: "What warranty applies to FRP windows and window profiles?",
    answer:
      "Warranty terms are confirmed per project in the supply contract, structured in line with established fiberglass-window industry practice — where frame warranties typically run 10–20 years and finish warranties align with the AAMA 2604/2605 coating exposure ratings (10-year class). Profile-supply programs carry material and dimensional-conformity warranties backed by batch mill certificates. The underlying engineering basis is longer than any warranty document: pultruded FRP frames carry a 60+ year expected service life, with no embrittlement, corrosion, or recoating cycle across it.",
  },
  {
    question: "What is the expected service life of FRP window frames?",
    answer:
      "Pultruded FRP window frames have an expected service life exceeding 60 years based on accelerated weathering tests and field performance data from installations dating back to the early 1980s. Unlike PVC, FRP does not become brittle with age, UV, or deep cold, and unlike aluminum, it cannot corrode in snow-belt de-icing-salt environments. The dimensional stability of FRP over temperature cycles (−40°C to +80°C) is superior to PVC, maintaining seal compression and air-tightness throughout the life of the building with no coating-renewal cycle.",
  },
];

export default function FenestrationSystemsPage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "Pultruded FRP Windows & Doors — Extreme-Cold Fenestration",
          description:
            "Finished GFRP-PU windows and doors and pultruded fenestration profiles for extreme-cold and passive house buildings. 65-140 series, U-values down to 0.78 W/m2K, proven to −60°C.",
          path: pagePath,
          image: "/images/products/window-door/frp-window-door-frame-80-series-tilt-turn.webp",
          category: "FRP Windows, Doors and Fenestration Systems",
          productLine: "F1-THERM",
          // Indicative per-metre profile band across the 65–140 series; finished
          // units are quoted per opening. Routes to /contact for a project quote.
          priceRange: { lowPrice: "12", highPrice: "120", offerCount: "5", unitText: "linear meter" },
          material: ["E-glass roving", "Continuous strand mat", "Polyurethane resin", "Vinyl ester resin", "Isophthalic polyester resin"],
          additionalProperty: [
            { name: "Also known as", value: "FRP windows and doors, pultruded fiberglass window frames, GRP windows, fiberglass fenestration" },
            { name: "Product form", value: "Finished factory-assembled units or pultruded profiles for fabricators" },
            { name: "Series", value: "65 / 70 / 80 / 90 / 140" },
            { name: "Frame U-value", value: "From 0.78 W/m²·K (90-series)" },
            { name: "Certification", value: "PHI Component 2491wi03 (phA arctic) · EN 14351-1 · NAFS" },
            { name: "Operating range", value: "−60°C to +80°C (proven at Qinling Station, Antarctica)" },
            { name: "Thermal conductivity", value: "0.3 W/m·K (vs aluminum 160 W/m·K)" },
            { name: "Target climates", value: "Canada, Russia/Siberia, Nordics, Northern US, severe-cold zones" },
          ],
          // Typed QuantitativeValue specs for AI citation. U_w 0.78 is the
          // PHI-certified 90-series flagship figure advertised across this page.
          measurements: [
            { propertyID: "thermalTransmittance", value: "0.78", unitText: "W/m²·K" },
            { propertyID: "thermalConductivity", value: "0.3", unitText: "W/m·K" },
          ],
        })}
      />
      <PageHeader
        tag="FRP Windows & Doors · F1-THERM"
        title="Pultruded fiberglass (FRP) windows & doors for extreme cold"
        description="Finished, factory-assembled fiberglass windows and doors — and the pultruded fiberglass window profiles behind them — for Passive House, low-energy, and extreme-cold buildings in Canada, Russia, and the Nordics. Whole-window U-values to 0.78 W/m²·K, proven to −60°C, with no metallic thermal bridge to frost or fail."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Windows & Doors" },
        ]}
      />

      <JumpNav
        items={[
          { href: "#supply", label: "Supply models" },
          { href: "#types", label: "Window types" },
          { href: "#series", label: "Series 65\u2013140" },
          { href: "#cold", label: "Cold-climate engineering" },
          { href: "#markets", label: "Markets & standards" },
          { href: "#spec", label: "What ships" },
          { href: "#faq", label: "FAQ" },
        ]}
      />

      {/* Window & Door Frame Images */}
      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] grid-cols-2 md:grid-cols-5">
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/window-door/frp-window-frame-65-series-corner-section.webp"
                alt="FRP window frame 65-series corner cross-section showing dual-chamber insulation structure"
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="w-full rounded-[8px]"
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">65-Series</p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/window-door/frp-window-frame-70-series-corner-section.webp"
                alt="FRP window frame 70-series corner cross-section showing three-chamber insulation design"
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="w-full rounded-[8px]"
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">70-Series</p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/window-door/frp-window-door-frame-80-series-tilt-turn.webp"
                alt="FRP window and door frame 80-series tilt and turn system"
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="w-full rounded-[8px]"
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">80-Series</p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/window-door/frp-window-frame-90-series-corner-section.webp"
                alt="FRP window frame 90-series corner cross-section for passive house fenestration"
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="w-full rounded-[8px]"
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">90-Series</p>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[13px]">
              <Image
                src="/images/products/window-door/frp-window-door-frame-140-series-sliding.webp"
                alt="FRP window and door frame 140-series lift-and-slide system"
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="w-full rounded-[8px]"
              />
              <p className="mt-[8px] text-center text-f13 font-medium text-t2">140-Series</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="max-w-[780px]">
            <p className="text-f19 leading-golden text-t2">
              <strong className="text-t1">Pultruded fiberglass windows and doors</strong> —
              known interchangeably as FRP, GRP, or pultrusion windows — are a generational
              advancement over aluminum and PVC, and F1 Composite supplies them as the
              finished article. We manufacture the pultruded fiberglass window profiles and
              assemble them, in our own plant, into complete window and door units:
              glazed, hardware-fitted, gasketed, and leak-tested before they ship. The
              result is a window that reaches whole-window K-values as low as 0.78
              W/m{"²"}·K with no thermal break inserts, no steel reinforcement, and no
              metallic path to frost or fail in a deep-cold winter.
            </p>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              That makes this range built for the climates where windows are hardest to get
              right — Canada, Russia and Siberia, the Nordics, and the severe-cold zones of
              northern Asia. Our frames are installed at Qinling Station in Antarctica
              against a −60°C design low, and across Chinese severe-cold-zone industrial and
              zero-carbon residential projects. Where local fabrication is preferred, we
              also ship the identical profiles for in-country assembly.
            </p>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              The range covers five series — four frame depths for casement and
              tilt-and-turn windows and swing doors (65, 70, 80, 90) plus the 140-series
              lift-and-slide door system — each matched to a performance tier, from
              residential renovation to Passivhaus and arctic-class projects. Every profile
              is pultruded on our continuous lines for dimensional consistency across runs of
              tens of thousands of linear meters.
            </p>
          </div>
        </div>
      </section>

      {/* Two ways to buy */}
      <section id="supply" className="scroll-mt-[89px] bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>How We Supply</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Finished units, or profiles for your fabricator
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Two supply models from one product line. The pultruded profiles are identical;
            you choose where the units are assembled.
          </p>

          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-2">
            {supplyModels.map((model) => (
              <div
                key={model.name}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                  {model.tag}
                </div>
                <h3 className="mt-[8px] text-[20px] font-extrabold text-t1">{model.name}</h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Types */}
      <section id="types" className="scroll-mt-[89px] bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Window & Door Types</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            A complete cold-climate window and door range
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Every operable type a cold-climate facade needs, each engineered around
            compression sealing and a continuous insulating frame.
          </p>

          <div className="mt-[34px]">
            <WindowOpeningTypes />
          </div>

          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {productTypes.map((type) => (
              <div
                key={type.name}
                className="flex flex-col rounded-[8px] border border-border-default bg-bg2 p-[34px]"
              >
                <h3 className="text-[17px] font-bold text-t1">{type.name}</h3>
                <p className="mt-[5px] text-f13 font-semibold text-teal-text">Series {type.series}</p>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{type.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Series */}
      <section id="series" className="scroll-mt-[89px] bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>System Overview</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Frame series — 65 to 140
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            The four frame-depth tiers (65–90) are casement, tilt-and-turn, and swing-door
            systems; the 140-series is our lift-and-slide door system for the largest glazed
            openings.
          </p>

          <div className="mt-[34px] space-y-[21px]">
            {systemSeries.map((series) => (
              <div
                key={series.name}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <div className="flex flex-col gap-[13px] md:flex-row md:items-start md:gap-[34px]">
                  <div className="shrink-0">
                    <h3 className="text-[24px] font-extrabold text-teal-text">{series.name}</h3>
                    <div className="mt-[8px] space-y-[3px] text-f13 text-t2">
                      <p><span className="font-semibold text-t1">Frame depth:</span> {series.frameDepth}</p>
                      <p><span className="font-semibold text-t1">Chambers:</span> {series.chambers}</p>
                      <p><span className="font-semibold text-t1">K-value:</span> {series.kValue}</p>
                      <p><span className="font-semibold text-t1">Glass range:</span> {series.glassRange}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-f13 font-semibold text-teal-text">{series.applications}</p>
                    <p className="mt-[8px] text-f15 leading-golden text-t2">{series.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extreme-Cold Engineering */}
      <section id="cold" className="scroll-mt-[89px] bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Extreme-Cold Engineering</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Built for −40°C and below — where aluminum frosts and PVC cracks
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            In a deep-cold climate the window is the weakest part of the envelope. These six
            properties are why pultruded FRP outperforms every other frame material in
            Canada, Russia, and the Nordics.
          </p>

          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {coldEngineering.map((item) => (
              <div
                key={item.title}
                className="rounded-[8px] border border-border-default bg-bg2 p-[34px]"
              >
                <h3 className="text-[17px] font-bold text-t1">{item.title}</h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Regions */}
      <section id="markets" className="scroll-mt-[89px] bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Cold-Climate Markets</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Standards and climate, market by market
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            We supply finished units to the certification stack and climatic execution each
            cold-climate market specifies.
          </p>

          <div className="mt-[34px] space-y-[13px]">
            {targetRegions.map((r) => (
              <div
                key={r.region}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <div className="flex flex-col gap-[8px] md:flex-row md:items-start md:gap-[34px]">
                  <div className="shrink-0 md:w-[240px]">
                    <h3 className="text-[19px] font-extrabold text-t1">{r.region}</h3>
                    <p className="mt-[3px] text-f13 text-t2">{r.climate}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-f13 font-semibold text-teal-text">{r.standards}</p>
                    <p className="mt-[8px] text-f15 leading-golden text-t2">{r.note}</p>
                    {r.href && (
                      <div className="mt-[13px]">
                        <LinkArrow href={r.href}>Regional sourcing details</LinkArrow>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cold-Climate Proof */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Proven In The Cold</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            From the Antarctic to severe-cold industry
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            The thermal argument is settled in the field. Three reference projects at the
            extremes of cold-climate fenestration.
          </p>

          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {coldProof.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex flex-col rounded-[8px] border border-border-default bg-bg2 p-[34px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
              >
                <h3 className="text-[17px] font-bold text-t1">{c.title}</h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{c.body}</p>
                <span className="mt-[21px] text-f13 font-semibold text-teal-text">Read the case study →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Finished Unit Specification */}
      <section id="spec" className="scroll-mt-[89px] bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Finished Unit Specification</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            What ships in a complete F1 window or door
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            A finished unit is more than a frame. Here is what is built into, and shipped
            with, every assembled window and door.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Component
                  </th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                    What you get
                  </th>
                </tr>
              </thead>
              <tbody>
                {finishedUnitSpec.map((row) => (
                  <tr key={row.aspect} className="border-b border-border-default align-top">
                    <td className="py-[13px] pr-[21px] text-f15 font-semibold text-t1 md:w-[260px]">
                      {row.aspect}
                    </td>
                    <td className="py-[13px] text-f15 leading-golden text-t2">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Thermal Performance */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Thermal Performance</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Frame material thermal comparison
          </h2>
          <p className="mt-[13px] max-w-[560px] text-f15 leading-golden text-t2">
            The thermal conductivity of the frame material determines the baseline
            performance of the fenestration system. FRP delivers the best
            combination of structural strength and thermal insulation of any
            frame material available today.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Frame Material
                  </th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    K-frame (W/m{"²"}K)
                  </th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Conductivity (W/mK)
                  </th>
                </tr>
              </thead>
              <tbody>
                {thermalComparison.map((row) => (
                  <tr key={row.material} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">
                      {row.material}
                    </td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.kFrame}</td>
                    <td className="py-[13px] text-f15 text-t2">{row.conductivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Glass Configurations */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Glazing Options</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Glass configuration options
          </h2>
          <p className="mt-[13px] max-w-[560px] text-f15 leading-golden text-t2">
            Our fenestration systems are designed to accommodate a wide range of
            insulating glass unit configurations. The optimal glass specification
            depends on the system series, climate zone, and project energy targets.
          </p>

          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {glassConfigurations.map((config) => (
              <div
                key={config.name}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <h3 className="text-[17px] font-bold text-t1">{config.name}</h3>
                <div className="mt-[8px] space-y-[3px]">
                  <p className="text-f13 text-teal-text">
                    <span className="font-semibold">Structure:</span> {config.structure}
                  </p>
                  <p className="text-f13 text-teal-text">
                    <span className="font-semibold">K-center:</span> {config.kCenter}
                  </p>
                </div>
                <p className="mt-[13px] text-f15 leading-golden text-t2">{config.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related FRP products",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/facade-sunshade-panels", label: "Facade sunshade panels (E40)" },
              { href: "/products/window-reinforcement-profiles", label: "Fiberglass window reinforcements (uPVC cores)" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
              { href: "/products/standard-profiles", label: "Standard FRP profiles" },
              { href: "/products/gratings", label: "FRP gratings" },
            ],
          },
          {
            title: "Cold-climate case studies",
            links: [
              { href: "/case-studies/qinling-station-antarctic-passive-windows", label: "Qinling Antarctic — −60°C, PHI phA" },
              { href: "/case-studies/chemical-plant-platform", label: "Baotou severe-cold industrial windows" },
              { href: "/case-studies/fenestration-residential", label: "Wanhua Yantai zero-carbon community" },
              { href: "/case-studies", label: "All case studies" },
            ],
          },
          {
            title: "Source by region",
            links: [
              { href: "/regions/frp-passive-house-windows-canada", label: "FRP passive house windows — Canada" },
              { href: "/regions/frp-passive-house-windows-germany", label: "FRP passive house windows — Germany" },
              { href: "/regions/frp-pultrusion-supplier-usa", label: "FRP pultrusions — United States" },
              { href: "/resources/blog/frp-fenestration-passivhaus-certification", label: "PHI Cert 2491wi03 — Passive House" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/resources/frp-windows-guide", label: "FRP Windows Guide — the complete library" },
              { href: "/technology/u-value-calculator", label: "Window U-value calculator" },
              { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion windows (GFRP-PU)" },
              { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum window frames" },
              { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC window frames" },
              { href: "/technology/quality-testing", label: "Quality testing (PHI / BS 476)" },
              { href: "/resources/design-guides", label: "Fenestration design guides" },
              { href: "/resources/downloads", label: "Data sheets & certificates" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      {/* FAQ */}
      <section id="faq" className="scroll-mt-[89px] bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} suppressSchema />
        </div>
      </section>

      <section className="bg-white pt-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <CalculatorCTA
            href="/technology/u-value-calculator?frame=frp-90&glass=tg-kr&spacer=warm-premium&type=casement&w=1200&h=1400"
            eyebrow="Free tool · 90-Series preset"
            title="Check the whole-window U-value of an F1 90-Series window"
            sub="Opens the U-value calculator pre-loaded with the PHI-certified 90-Series frame + triple glazing — see the EN ISO 10077-1 Uw and the pass/fail against Passive House, ENERGY STAR, CSA, and GB targets, then quote against your spec."
          />
        </div>
      </section>

      <AskAICard
        prefill="I'm specifying FRP windows/doors for a project in [Canada / Russia / Nordics / other cold climate]. Design low temperature [°C]. I need [finished units / profiles for a local fabricator]. Window/door types: [tilt-turn / casement / fixed / lift-slide / entrance door]. Target U-value [W/m²K]. Which series (65/70/80/90/140) fits, and what's the cost vs aluminum?"
      />

      <InnerCTA title="Specify FRP windows & doors for your cold-climate project" />
    </>
  );
}
