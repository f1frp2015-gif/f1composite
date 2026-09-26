import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import DocumentCard, { libraryCard, type DocumentCardData } from "@/components/downloads/DocumentCard";
import ProductPageNav from "@/components/products/ProductPageNav";
import ProductRfq from "@/components/products/ProductRfq";
import ProductSection from "@/components/products/ProductSection";
import JsonLd from "@/components/seo/JsonLd";
import Figure from "@/components/ui/Figure";
import SectionGlyph, { type GlyphShape } from "@/components/ui/SectionGlyph";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { prefillForCaseStudy } from "@/lib/aiPrefill";
import { assembleDocuments } from "@/lib/documents";
import { buildRfqHref } from "@/lib/rfq";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Case-study product labels, with the product page, section glyph and a line
// on what the family is.
const productInfo: Record<string, { href: string; label: string; glyph: GlyphShape; text: string }> = {
  "Standard Profiles": { href: "/products/fiberglass-structural-shapes", label: "Standard structural profiles", glyph: "i_beam", text: "I-beams, channels, angles, tubes, rods and flat bar from the catalog." },
  "Custom Pultrusions": { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles", glyph: "custom", text: "Sections developed for the project on their own tooling." },
  "Fenestration Systems": { href: "/products/frp-window-frames", label: "FRP windows and doors", glyph: "window", text: "Pultruded window and door profiles, and finished units." },
  "Structural Deck Panels": { href: "/products/frp-deck-panels", label: "Structural deck panels", glyph: "multicell", text: "Closed-top multicell planks for decks and walkways." },
  "Molded Grating": { href: "/products/molded-frp-grating", label: "Molded FRP grating", glyph: "grating", text: "Two-way mesh panels for walkways, platforms and stairs." },
};

const caseStudyData: Record<
  string,
  {
    title: string;
    /** One or two sentences under the title: what was supplied, where, and the outcome the account reports. */
    summary: string;
    seoTitle?: string;
    seoDescription?: string;
    focusKeyphrase: string;
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
    summary:
      "Custom-pultruded FRP deck panels replaced a corroded steel bridge deck in the Netherlands, installed without closing the bridge to traffic.",
    seoTitle: "FRP Bridge Deck Replacement — Netherlands Case Study",
    seoDescription:
      "FRP bridge deck — Netherlands. 1,200 m² custom pultruded panels, 40% lighter than steel, project finished 2 weeks ahead of schedule.",
    focusKeyphrase: "FRP bridge deck replacement",
    industry: "Infrastructure",
    location: "Netherlands",
    year: "2023",
    products: ["Structural Deck Panels", "Custom Pultrusions", "Standard Profiles"],
    challenge:
      "A 45-year-old steel bridge deck in the Netherlands was suffering from severe corrosion damage, requiring increasingly frequent and costly maintenance interventions. The bridge owner needed a replacement solution that would provide a design life of 75+ years with minimal maintenance, while keeping the bridge open to traffic during installation.",
    solution:
      "F1 Composite engineered a custom-pultruded FRP deck system using vinyl ester resin with E-glass and carbon fiber hybrid reinforcement. The modular deck panels were designed for rapid on-site assembly using adhesive bonding and mechanical fasteners. Each panel was factory-produced to tight tolerances, ensuring consistent quality and fast installation. The lightweight nature of FRP (approximately 80% lighter than steel equivalents) allowed installation using smaller cranes and eliminated the need for temporary bridge closures.",
    results:
      "The project was completed two weeks ahead of schedule. The FRP deck system achieved a 40% weight reduction compared to the original steel structure while exceeding the EN 1991-2 traffic load requirements. Future service life and maintenance depend on the approved design, exposure, connections and inspection plan; they are not measured project outcomes.",
    stats: [
      { value: "1,200m²", label: "Deck Area" },
      { value: "40%", label: "Weight Reduction" },
      { value: "Project-specific", label: "Design life review" },
    ],
  },
  "coastal-marina-walkway": {
    title: "Coastal Marina Walkway System",
    summary:
      "A 500 m walkway of pultruded FRP subframes and anti-slip molded grating replaced timber and steel at a UK marina, installed in sections during low-tide windows.",
    seoTitle: "FRP Marina Walkway — UK Coastal Case Study",
    seoDescription:
      "Marine FRP walkway case study — UK marina. 500 m pultruded structural + molded grating system, resin selection and connection details for coastal exposure.",
    focusKeyphrase: "FRP marina walkway",
    industry: "Marine",
    location: "United Kingdom",
    year: "2022",
    products: ["Molded Grating", "Standard Profiles"],
    challenge:
      "A major UK marina required replacement of its aging timber and steel walkway infrastructure. The existing materials had deteriorated rapidly due to constant saltwater exposure, requiring annual maintenance and presenting safety hazards. The marina needed a durable, slip-resistant solution that could withstand the harsh coastal environment.",
    solution:
      "F1 Composite supplied a complete FRP walkway system comprising pultruded structural profiles for the subframe and molded gratings with anti-slip surfaces for the walkway deck. The FRP profiles were designed to resist saltwater corrosion, UV degradation, and biological fouling without protective coatings. The modular design allowed installation in sections during low-tide windows, minimizing disruption to marina operations.",
    results:
      "The 500-meter walkway system was installed over a 4-week period. The FRP system was selected for the coastal exposure. Long-term cost savings and service life require a documented comparison including inspection, fasteners, surface condition and replacement assumptions.",
    stats: [
      { value: "500m", label: "Walkway Length" },
      { value: "Periodic", label: "Inspection required" },
      { value: "Coastal", label: "Exposure" },
    ],
  },
  "baotou-industrial-gfrp-pu-windows": {
    title: "Baotou Industrial Park: GFRP-PU Windows for Severe Cold and Chemical Exposure",
    summary:
      "Pultruded GFRP-PU window profiles for the workshops and office block of an industrial campus in Baotou, where the frames had to meet a severe-cold U-value limit and tolerate chemical exposure.",
    seoTitle: "Baotou Industrial Fenestration — GFRP-PU Windows",
    seoDescription:
      "Baotou industrial GFRP-PU windows: 70/80/90-series profiles for cold climate and chemical exposure. Review assembly evidence and inspection requirements.",
    focusKeyphrase: "GFRP-PU industrial windows",
    industry: "Industrial",
    location: "Baotou, Inner Mongolia, China",
    year: "2024",
    products: ["Fenestration Systems"],
    challenge:
      "In early 2024 an industrial complex on the edge of Baotou, Inner Mongolia, started building a production campus: manufacturing workshops, buildings that handle chemicals, freight yards, rooftop PV and an office and welfare block. Two conditions shaped the window specification. Baotou is in China's severe-cold climate zone, with winter design lows around −25 °C and a heating season of more than 200 days, and the energy code for industrial buildings there sets a window U-value ceiling that thermally broken aluminum struggles to meet without special glazing. Several workshops also handle chemical reagents, acid mist and chloride aerosols. In that air, aluminum frames pit and corrode where they meet fasteners, and coatings need renewing within a few years, which means production downtime on a building planned to run for 30 years. PVC could not span the workshop openings, many of them taller than 2.5 m, and becomes brittle under the strong UV at this altitude. Steel frames carry the load but conduct heat and rust. The owner wanted one frame material for every building: one that met the thermal limit, tolerated the chemical exposure, spanned the tall openings and kept maintenance low over a 25- to 30-year life.",
    solution:
      "F1 supplied pultruded glass-fiber-reinforced polyurethane (GFRP-PU) window profiles from FengDu's Yancheng plant for both the chemical-exposure workshops and the office and welfare block. Workshop facades used 70- and 80-series casement and tilt-and-turn profiles. The larger office openings used 90-series sliding profiles, with matching subframe sections where the windows meet the workshop curtain wall. The GFRP-PU frame conducts heat at about 0.3 W/m·K, roughly 500 times less than aluminum, so it needs no metal thermal break or polyamide insert. With a triple-glazed unit (5 + 12 Ar + 5 Low-E + 12 Ar + 5 Low-E), the whole-window U-value was below the code ceiling for the project. The frame has no anodized surface to pit and no metal to corrode, but resistance to the specific reagents on site depends on their concentration and temperature and has to be confirmed building by building. Profiles arrived factory-finished in a dark frame colour, with co-extruded EPDM gaskets, reinforced corner joints and mounting brackets set to the site's anchor lines. They were delivered in two batches to follow the civil works.",
    results:
      "The same GFRP-PU frame system was used across the workshops and the office block. For a similar project, check the whole-window U-value for your actual sizes and glazing, and confirm resin compatibility with the chemicals, concentrations and temperatures on your site. This account does not show a maintenance-free period or resistance to every acid, alkali or chloride exposure.",
    stats: [
      { value: "Baotou", label: "Inner Mongolia, China" },
      { value: "Severe Cold A", label: "Climate zone" },
      { value: "−25 °C", label: "Winter design low" },
      { value: "0.3 W/m·K", label: "GFRP-PU frame conductivity" },
      { value: "70 / 80 / 90", label: "Window series supplied" },
      { value: "Triple", label: "Low-E argon glazing" },
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
  "wanhua-yantai-zero-carbon-windows": {
    title: "Wanhua Yantai Zero-Carbon Community: GFRP-PU Passive Windows",
    summary:
      "13,657 m² of GFRP-PU windows for Wanhua Chemical's zero-carbon employee community in Yantai, at a whole-window U-value of 0.99 W/m²·K against a 1.0 requirement.",
    seoTitle: "Wanhua Yantai Zero-Carbon — GFRP-PU Passive Windows",
    seoDescription:
      "Wanhua Yantai zero-carbon community: 13,657 m² of GFRP-PU 65- and 90-series windows at Uw 0.99 W/m²·K, built to China's near-zero energy standard.",
    focusKeyphrase: "GFRP-PU passive house windows",
    industry: "Construction",
    location: "Yantai, Shandong, China",
    year: "2022",
    products: ["Fenestration Systems"],
    challenge:
      "Wanhua Chemical, the world's largest producer of MDI and a supplier of polyurethane raw materials, decided in 2021 to build a zero-carbon employee community on its campus in the Yantai Economic and Technological Development Zone, Shandong. The complex has 112,815 m² of above-ground floor area in mid- and high-rise dormitories and supporting buildings. It had to meet two energy standards at once: China's national near-zero energy building standard and Shandong's passive ultra-low energy residential standard. That meant a cap of 50 kWh per square metre per year for heating, cooling and lighting, an envelope well inside the national code, and blower-door testing of airtightness. The windows were the hardest part. The specification asked for whole-window U-values below 1.0 W/m²·K, which thermally broken aluminum rarely reaches without special glazing, and PVC frames could not span the tall openings on the stair towers. Wanhua also wanted the frames to be made with its own polyurethane resin.",
    solution:
      "F1 supplied pultruded GFRP-PU window profiles from FengDu's Yancheng plant for the 13,657 m² dormitory part of the project. The smaller dormitory windows used 65-series inward-opening casement and tilt-and-turn profiles, the balconies used 90-series sliding profiles, and matching facade-frame sections were used at the stair-tower curtain wall. With a triple-glazed unit (5 mm single-silver Low-E + 16 mm argon + 5 mm single-silver Low-E + 16 mm argon + 5 mm Low-E), the whole-window U-value was 0.99 W/m²·K against the 1.0 W/m²·K requirement. The frame has no metal thermal break: the GFRP-PU section conducts heat at about 0.3 W/m·K, around 500 times less than aluminum. The profiles were pultruded with Wanhua polyurethane resin, from the same supplier as the building's polyurethane sandwich wall insulation. They were finished in a dark frame colour with co-extruded EPDM gasket channels and reinforced corners, and delivered on pallets in installation order during eight months of overlapping site work.",
    results:
      "The dormitory envelope was completed with F1's GFRP-PU windows as the main opening component. Figures from the building-envelope verification at handover: a comprehensive building energy-saving rate of 61.11 % against the national baseline (the near-zero energy threshold in the standard is 60 %), an envelope-only energy-saving rate of 47.56 %, a renewable-energy share of 51.81 %, and airtightness of N50 = 1.0 air changes per hour at 50 Pa. With the wall insulation, ground-source heat pumps, rooftop PV and solar hot water, the development is projected to cut CO₂ emissions by more than 2,000 tonnes a year across its 112,815 m². Wanhua Chemical's 2022 sustainability reporting lists it as the company's first zero-carbon community. For F1 it is the main reference for near-zero energy and passive residential projects: 13,657 m² of GFRP-PU windows at a whole-window U-value of 0.99 W/m²·K.",
    stats: [
      { value: "112,815 m²", label: "Total project area" },
      { value: "13,657 m²", label: "F1 window envelope" },
      { value: "0.99 W/m²K", label: "Whole-window U-value" },
      { value: "61.11 %", label: "Energy-saving rate" },
      { value: "N50 = 1.0", label: "Measured airtightness" },
      { value: "2,000+ t/yr", label: "Projected CO₂ reduction" },
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
  "chongqing-rooftop-pv-frp-rail": {
    title: "Chongqing Rooftop PV Retrofit: Pultruded FRP H-Rail on Colour Steel-Tile Roofs",
    summary:
      "Pultruded GFRP H-rail let an industrial park in Chongqing add rooftop PV to colour steel-tile roofs within their original live-load reserve, with about 75% less rail dead load than galvanized steel.",
    seoTitle: "Chongqing PV Rooftop Retrofit — FRP H-Rail Mounting",
    seoDescription:
      "Chongqing rooftop PV retrofit: pultruded GFRP H-rail on colour steel-tile roofs, about 75% less rail weight than galvanized steel and no zinc coating to renew.",
    focusKeyphrase: "FRP rooftop solar mounting",
    industry: "Energy",
    location: "Chongqing, China",
    year: "2024",
    products: ["Custom Pultrusions", "Standard Profiles"],
    challenge:
      "In 2024 the owner of an industrial park in Chongqing decided to add rooftop PV to a group of existing factory buildings, to cut the campus's carbon emissions and earn revenue from unused roof area. Two things ruled out the usual galvanized-steel and aluminum rails. First, the roofs had little spare capacity. They were designed for a generic industrial live load of about 0.5 kN/m², the common reserve for Chinese industrial roofs built before 2012, with no allowance for a permanent PV array. A monocrystalline array on galvanized-steel rail adds roughly 15–20 kg/m² once panels, rail, clamps and ballast are counted, a large share of that reserve, and the structural reviewer named it as the limit on the retrofit. The owner needed a rail clearly lighter than steel, and ideally lighter than aluminum, so the roofs could take the array without strengthening work that would have wiped out the payback. Second, the rooftop environment is harsh. Chongqing's humidity is above 80 % for much of the year, dew is frequent (the city is known locally as the Fog City), and rain in the Yangtze industrial corridor is acidic. On a colour steel-tile roof the surface passes 70 °C in summer and falls close to freezing in winter, with a heating and cooling cycle every day. Galvanized rail there loses zinc quickly and would need recoating every 5–8 years, which means lifting the panels off each time, over an asset designed for 25 years. Aluminum rail avoids rust, but its anodized surface pits in acidic, humid air and it forms a galvanic couple with stainless-steel clamps and the copper earthing wire.",
    solution:
      "F1 supplied pultruded glass-fiber-reinforced polymer (GFRP) H-section rail from FengDu's Yancheng plant, with a matched accessory kit: mid-clamps, end-clamps, splice plates and Jiaochi-type roof clamps that grip the standing seams of the existing colour steel-tile roof without drilling through it. The rail answers both problems. On weight, GFRP has a density of about 1.9 g/cm³, against 7.85 g/cm³ for carbon steel and 2.70 g/cm³ for 6063 aluminum. A typical rooftop layout needs 4–6 kg per metre of galvanized C-section or 1.5–2.5 kg/m of aluminum extrusion; the GFRP H-rail weighs about 1.0–1.5 kg/m, roughly three-quarters less rail dead load than steel. A 1 MW rooftop array uses around 2,000 m of rail, so the saving runs to several tonnes and the roofs stayed within their original live-load reserve without strengthening. On durability, the GFRP rail has no zinc to renew and no anodized surface to pit, and it does not form a galvanic couple with the stainless clamps or the copper earthing wire. The accessory kit was produced in two batches to match the installation sequence, with a published bolt schedule (M6 × 12 for rail splices, M8 × 25 for mid- and end-clamps and T-bolts, M8 × 30 for the Jiaochi roof clamps) that matched the installer's standard rooftop kit. Rails were cut to length in the factory and palletised in installation order for hoisting from ground level.",
    results:
      "The PV arrays were commissioned within the roofs' original live-load reserve, with no structural strengthening and without taking the factory roofs out of use. Compared with galvanized steel rail at 4–6 kg/m, the GFRP rail at about 1.0–1.5 kg/m removed roughly 75 % of the rail's share of the permanent dead load. It also removes the 5–8-year zinc recoating that steel rail would have needed, and the pitting and galvanic-corrosion upkeep that aluminum rail would have brought in this humid, acidic climate. For F1, this project is the reference for rooftop PV retrofits where roof capacity and weathering both limit the design.",
    stats: [
      { value: "~75 %", label: "Rail dead-load reduction vs steel" },
      { value: "1.9 g/cm³", label: "GFRP rail density" },
      { value: "1.0 – 1.5", label: "Rail mass (kg/m)" },
      { value: "0.5 kN/m²", label: "Original roof live-load reserve" },
      { value: "Jiaochi", label: "Non-penetrating roof clamp" },
      { value: "M6 / M8", label: "Stainless bolt schedule" },
    ],
    downloads: [
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
    title: "Qinling Station, Antarctic Ross Sea — GFRP Window Project",
    summary:
      "90-series GFRP windows with insulated glazing for Qinling Station, China's research station on the Ross Sea, opened in February 2024.",
    seoTitle: "Qinling Antarctic Station — GFRP Window Project",
    seoDescription:
      "Qinling Station GFRP window project account. Review the 90-series component reference separately from project-specific Antarctic design requirements.",
    focusKeyphrase: "Antarctic passive house FRP windows",
    industry: "Construction",
    location: "Ross Sea, Antarctica",
    year: "2024",
    products: ["Fenestration Systems"],
    challenge:
      "Qinling Station, China's research station on the Ross Sea, opened in February 2024. Its windows had to cope with Antarctic conditions and a short shipping season: the project account gives a design low of about −60 °C and winds up to 45 m/s. Those site conditions go well beyond the climate zone covered by the window's PHI component certificate.",
    solution:
      "The windows used 90-series GFRP frames with insulated glazing, assembled in the factory. The related document is PHI component certificate 2491wi03 for the Fengdu Passive GFRP 90 Series, issued to Chongqing Xianju New Material Co., Ltd., a FengDu subsidiary. It certifies the window for the cool-temperate climate zone at efficiency class phB, with Uw 0.78 W/(m²·K) and Ug 0.70, valid until 31 December 2026. It is not an Arctic rating and does not cover the station as a whole. For a similar project, ask for the drawings, assembly tests and acceptance records of the configuration actually supplied.",
    results:
      "Qinling is F1's reference for GFRP windows in extreme cold. The PHI certificate on its own does not prove Antarctic wind resistance, service life or fuel savings for every installed unit; those need project-specific tests and supply records.",
    stats: [
      { value: "phB", label: "Component efficiency class" },
      { value: "−60°C", label: "Design Low" },
      { value: "45 m/s", label: "Katabatic Wind" },
      { value: "2491wi03", label: "PHI Component ID" },
    ],
    downloads: [
      {
        label: "Download PHI Certificate (PDF)",
        href: "/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf",
        description: "Passive House Institute component certification — 90-series GFRP, Component-ID 2491wi03, phB efficiency class for the cool-temperate climate zone.",
      },
    ],
  },
  "yancheng-talent-apartment-fenestration": {
    title: "Yancheng Talent Apartments: FRP Window Supply for a Coastal Housing Development",
    summary:
      "One pultruded FRP window system for about 20 coastal mid-rise buildings in Yancheng: casements, balcony sliders and facade frames, delivered in phases over 14 months.",
    seoTitle: "Yancheng Talent Apartment — FRP Fenestration Supply",
    seoDescription:
      "Yancheng talent apartments, Jiangsu: GFRP window profiles for about 20 coastal mid-rise buildings, Uw below 1.6 W/m²·K, supplied in phases over 14 months.",
    focusKeyphrase: "FRP apartment window frames",
    industry: "Construction",
    location: "Yancheng, Jiangsu, China",
    year: "2024",
    products: ["Fenestration Systems"],
    challenge:
      "The Yancheng Talent Apartment development in Jiangsu is a government-backed complex of about 20 mid-rise apartment buildings, a commercial plaza and community facilities, built to house skilled workers on regional industrial and R&D programmes. Yancheng lies less than 40 km from the Yellow Sea, and the salty, humid air is hard on coated aluminum frames, which typically need repainting after 8–12 years. The specification asked for: (a) a whole-window U-value below 1.6 W/m²K under the local residential energy code, (b) sound reduction above 32 dB, (c) one consistent appearance across thousands of units, (d) several window types in one pultruded system: inward and outward casements for the flats, large sliders for the balconies and framed glazing for the commercial and clubhouse facades, and (e) deliveries phased over a 14-month build with no storage space on site.",
    solution:
      "F1 supplied the whole window package from three pultruded FRP product families. The flats received 65-series casement frames in inward- and outward-opening versions; the 65 mm frame depth with a double-glazed unit meets the 1.6 W/m²K target, and the FRP profile needs no thermal-break insert. Balconies and terraces used 90-series multi-track sliding frames with clear openings up to 2.4 m, reinforced interlock mullions and stainless-steel rollers for daily use. The commercial plaza, clubhouse and facade areas used 90-series framed glazing with the same sightlines, so the architects could keep one frame look across residential and non-residential buildings. All profiles were pigmented dark grey through the section, so there is no paint layer to renew. Lengths were cut and corner joints pre-drilled in the factory, and batches were shipped straight to the installer to match each building's glazing schedule.",
    results:
      "F1 delivered the full window package for all residential and commercial buildings on schedule over the 14-month programme. One supplier covered the 65-series casements, the 90-series sliders and the facade frames, which kept the U-value, acoustic and appearance requirements consistent across the site. After the first winter and summer, the post-handover inspection found no UV fading and no salt-air damage on the dark grey profiles.",
    stats: [
      { value: "~20", label: "Buildings glazed" },
      { value: "< 1.6", label: "Uw target (W/m²K)" },
      { value: "65 + 90", label: "Series supplied" },
      { value: "40 km", label: "From the coast" },
    ],
  },
  "factory-access-staircase": {
    title: "F1 Factory Access Staircase, Built From Our Own FRP Profiles",
    summary:
      "A multi-level access stair in our Chongqing plant, built from our own FRP profiles and molded grating and bolted together by four people during a 3-day shutdown.",
    seoTitle: "F1 Factory FRP Access Staircase — Self-Built",
    seoDescription:
      "FRP access staircase at F1's Chongqing pultrusion plant: I-beams, tubes and molded grating replaced galvanized steel that needed recoating every 18 months.",
    focusKeyphrase: "FRP access staircase",
    industry: "Industrial",
    location: "Chongqing, China",
    year: "2024",
    products: ["Standard Profiles", "Molded Grating", "Custom Pultrusions"],
    challenge:
      "Our Chongqing production base needed a multi-level access staircase and platform linking the pultrusion-line mezzanine to the fibre creel area. It sits above the resin impregnation zone, where humidity, resin vapour and the occasional chemical splash rule out painted carbon steel; the galvanized steel stairs there had to be recoated every 18 months and still rusted. The replacement had to resist corrosion, insulate electrically (live cabinets are within 2 m), meet the factory's fire-retardant class and go in during a 3-day shutdown without hot-work permits.",
    solution:
      "We built the whole stair from our own pultruded FRP profiles, the same ones customers buy. Stringers and landing beams are FRP I-beams and square tubes in vinyl ester resin for chemical resistance. The intermediate platforms are molded FRP grating with a gritted anti-slip surface (AS 4586 R11). Handrails and kick plates are pultruded round tube and flat bar in safety-orange, UV-stabilised polyester resin. Every connection is a 316L stainless-steel bolt through pre-drilled profiles, so there was no welding, no hot work and no crane. Four people assembled it with hand tools inside the 3-day window.",
    results:
      "The installed stair weighs about 68 % less than the steel structure it replaced, so the existing concrete pad was reused without strengthening. Like any structure, it still needs periodic inspection of connections, surfaces and supports. Because it is in our own plant, visiting customers can walk it, load it and inspect the connections and wear since it was installed in 2024.",
    stats: [
      { value: "68%", label: "Weight reduction" },
      { value: "316L", label: "Stainless bolts" },
      { value: "3-day", label: "Install window" },
      { value: "4", label: "Installers, hand tools only" },
    ],
  },
  "water-treatment-cable-tray": {
    title: "Municipal Water Treatment Plant — Cable Tray & Handrail System",
    summary:
      "FRP cable trays, tray supports and handrails replaced corroded galvanized steel at a municipal water treatment plant in Thailand.",
    seoTitle: "Water Treatment FRP Cable Tray & Handrail — Thailand",
    seoDescription:
      "Thai water treatment project: FRP cable trays and handrails for humid, chlorinated exposure. Review resin selection, connections and inspection requirements.",
    focusKeyphrase: "FRP cable tray and handrail system",
    industry: "Infrastructure",
    location: "Thailand",
    year: "2024",
    products: ["Standard Profiles", "Molded Grating", "Custom Pultrusions"],
    challenge:
      "A 120,000 m³/day municipal water treatment facility in Thailand required full replacement of its cable management and safety handrail systems. The existing galvanized steel cable trays and handrails had suffered severe corrosion after only 8 years of service due to constant exposure to chlorinated water vapor, high humidity (85–95% RH year-round), and tropical UV radiation. Annual maintenance costs had escalated to over USD 45,000, and several sections posed safety risks due to structural section loss exceeding 30%. The facility operator required a zero-maintenance solution with a minimum 25-year design life that could be installed during normal plant operation without process shutdowns.",
    solution:
      "F1 Composite supplied a complete FRP cable tray and handrail system comprising pultruded FRP cable ladder trays (600mm and 450mm widths, NEMA VE 1 compliant), FRP channel and angle sections for tray supports, pultruded round tube and square tube handrail assemblies with UV-stabilized polyester resin, and molded FRP grating stair treads with anti-slip surfaces rated to AS 4586 R11. The isophthalic polyester resin system was selected for its proven resistance to chlorinated water environments and tropical UV exposure. All profiles were factory-cut and pre-drilled to site dimensions, with stainless steel 316L fasteners for connections. The modular design allowed installation by a 4-person crew using hand tools only — no welding, no hot work permits, no crane required. Each cable tray section weighed approximately 75% less than the galvanized steel equivalent, enabling manual handling throughout the plant.",
    results:
      "The complete system — covering 2.8 km of cable tray runs and 1.2 km of handrail — was installed over 6 weeks with zero process interruption. The FRP system weighs 78% less than the replaced steel, eliminating all crane operations during installation. Post-installation load testing confirmed compliance with IEC 61537 cable tray load requirements and EN ISO 14122-3 handrail loading standards. Long-term maintenance and lifecycle savings have not been established by this short observation period. Confirm resin compatibility, inspection and connection maintenance for similar plants. After 6 months of service, inspection confirmed no visible degradation, discoloration, or structural change in any FRP component.",
    stats: [
      { value: "2.8km", label: "Cable Tray Installed" },
      { value: "78%", label: "Weight Reduction" },
      { value: "Project-specific", label: "Lifecycle cost review" },
      { value: "Periodic", label: "Inspection required" },
    ],
  },
};

const caseStudyImages: Record<string, string> = {
  "european-bridge-deck": "/images/case-studies/frp-bridge-deck-replacement-infrastructure-project.jpg",
  "coastal-marina-walkway": "/images/case-studies/frp-coastal-marina-walkway-grating-system.jpg",
  "baotou-industrial-gfrp-pu-windows": "/images/case-studies/frp-baotou-industrial-park-aerial-rendering.webp",
  "wanhua-yantai-zero-carbon-windows": "/images/case-studies/frp-wanhua-yantai-zero-carbon-community-aerial.webp",
  "chongqing-rooftop-pv-frp-rail": "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
  "water-treatment-cable-tray": "/images/case-studies/frp-water-treatment-plant-aerial-cable-tray-handrail.webp",
  "factory-access-staircase": "/images/case-studies/frp-factory-access-staircase-hero.webp",
  "yancheng-talent-apartment-fenestration": "/images/case-studies/frp-talent-apartment-yancheng-aerial-view.webp",
  "qinling-station-antarctic-passive-windows": "/images/case-studies/frp-qinling-station-antarctic-ross-sea-aerial.webp",
};

// Figure 1 of each case: a short title, what the image is, and its alt text.
// Renderings and illustrative photos say so, so neither is read as a
// photograph of the project (WEBSITE.md: case images must show the project).
const caseStudyImageMeta: Record<string, { title: string; note: string; alt: string; caption?: string }> = {
  "european-bridge-deck": {
    title: "Pedestrian bridge",
    note: "Illustrative photo",
    alt: "Covered pedestrian bridge with curved timber slats and a white steel arch",
  },
  "coastal-marina-walkway": {
    title: "Marina walkway",
    note: "Illustrative photo",
    alt: "Paved walkway with steel railings leading down to a marina on a lake",
  },
  "baotou-industrial-gfrp-pu-windows": {
    title: "Industrial park",
    note: "Rendering",
    alt: "Architectural rendering of the Baotou industrial park, with workshop buildings, rooftop PV and an office block",
    caption: "Architectural rendering of the project, not a site photograph.",
  },
  "wanhua-yantai-zero-carbon-windows": {
    title: "Zero-carbon community",
    note: "Rendering",
    alt: "Architectural rendering of the Wanhua Yantai zero-carbon community from above",
    caption: "Architectural rendering of the project, not a site photograph.",
  },
  "chongqing-rooftop-pv-frp-rail": {
    title: "Rooftop array",
    note: "Project photo",
    alt: "PV modules on pultruded FRP rails over a blue colour steel-tile factory roof in Chongqing",
  },
  "qinling-station-antarctic-passive-windows": {
    title: "Qinling Station",
    note: "Rendering",
    alt: "Architectural rendering of Qinling Station on the Ross Sea coast, Antarctica",
    caption: "Architectural rendering of the station, not a site photograph.",
  },
  "yancheng-talent-apartment-fenestration": {
    title: "Apartment development",
    note: "Rendering",
    alt: "Architectural rendering of the Yancheng talent apartment development from above",
    caption: "Architectural rendering of the project, not a site photograph.",
  },
  "factory-access-staircase": {
    title: "Stair and platform",
    note: "Project photo",
    alt: "FRP access staircase and platform with orange handrails inside F1 Composite's Chongqing plant",
  },
  "water-treatment-cable-tray": {
    title: "Treatment plant",
    note: "Illustrative photo",
    alt: "Aerial view of circular clarifiers and rectangular basins at a water treatment plant",
  },
};

// Further figures, shown with what F1 supplied.
const caseStudyContentImages: Record<string, { src: string; title: string; note: string; alt: string }[]> = {
  "factory-access-staircase": [
    {
      src: "/images/case-studies/frp-factory-staircase-structural-view.webp",
      title: "Stringers and frame",
      note: "Project photo",
      alt: "Side view of FRP I-beam stringers and pultruded structural profiles forming the staircase frame inside F1 Composite's Chongqing factory",
    },
    {
      src: "/images/case-studies/frp-factory-staircase-platform-handrail.webp",
      title: "Platform and handrails",
      note: "Project photo",
      alt: "Elevated platform with safety-orange pultruded FRP handrails and guardrails installed above the pultrusion line",
    },
    {
      src: "/images/case-studies/frp-factory-staircase-grating-treads.webp",
      title: "Grating treads",
      note: "Project photo",
      alt: "Anti-slip molded FRP grating stair treads and platform panels in corrosive factory environment",
    },
    {
      src: "/images/case-studies/frp-factory-staircase-assembly-detail.webp",
      title: "Bolted connection",
      note: "Project photo",
      alt: "Bolted connection detail between pultruded FRP profiles and 316L stainless steel fasteners — no welding required",
    },
  ],
  "water-treatment-cable-tray": [
    {
      src: "/images/case-studies/frp-water-treatment-plant-aeration-basin-piping-system.webp",
      title: "Aeration basins",
      note: "Illustrative photo",
      alt: "Aerial view of aeration basins with walkways and piping between them",
    },
    {
      src: "/images/case-studies/frp-water-treatment-plant-walkway-handrail-installation.jpg",
      title: "Basin walkway",
      note: "Illustrative photo",
      alt: "Walkway with railings between treatment basins",
    },
  ],
  "wanhua-yantai-zero-carbon-windows": [
    {
      src: "/images/case-studies/frp-wanhua-yantai-passive-house-building.webp",
      title: "Dormitory building",
      note: "Rendering",
      alt: "Wanhua Yantai Zero-Carbon Community — rendering of a passive-house dormitory building with continuous pultruded GFRP-PU window frames and a high-glazing facade",
    },
    {
      src: "/images/case-studies/frp-wanhua-yantai-residential-tower-courtyard.webp",
      title: "Courtyard",
      note: "Photo",
      alt: "Ground-level courtyard at the Wanhua Yantai Zero-Carbon Community — residents and staff in the landscaped quad between dormitory buildings, with floor-to-ceiling pultruded GFRP-PU windows above",
    },
  ],
};

// What a request for a similar project needs, in the quote block.
const similarProjectItems = [
  { title: "Your project", text: "What the parts do and where they are installed, with drawings or photos." },
  { title: "Site conditions", text: "Loads, spans, chemicals, climate and UV exposure at your site." },
  { title: "Requirements", text: "Codes, fire, thermal or electrical requirements and the documents you need." },
  { title: "Quantities and delivery", text: "Quantities, destination and program." },
];

const UPDATED = "2026-09-26";

export async function generateStaticParams() {
  return Object.keys(caseStudyData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudyData[slug];
  if (!cs) return { title: "Case Study" };
  const title = cs.seoTitle ?? cs.title;
  const description =
    cs.seoDescription ??
    `${cs.industry} case study in ${cs.location}. ${cs.results.slice(0, 110)}`.slice(0, 155);
  return buildPageMetadata({
    title,
    description,
    path: `/case-studies/${slug}`,
    image: `/case-studies/${slug}/opengraph-image`,
    article: { section: "Case Studies", authors: ["F1 Composite"] },
  });
}

/** The case's downloads as library cards, with the case's own description of each file. */
function downloadCards(downloads: NonNullable<(typeof caseStudyData)[string]["downloads"]>): DocumentCardData[] {
  const library = new Map(assembleDocuments().flatMap((document) => (document.file ? [[document.file, document] as const] : [])));
  return downloads.map((download) => {
    const document = library.get(download.href);
    const title = download.label.replace(/^Download /, "").replace(/ \(PDF\)$/, "");
    if (document) return { ...libraryCard(document, "case-study-download"), title, description: download.description ?? document.description };
    return { type: "PDF", title, meta: "PDF", description: download.description, action: { label: "Download PDF", href: download.href, file: true } };
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = caseStudyData[slug];

  if (!cs) {
    notFound();
  }

  const path = `/case-studies/${slug}`;
  const image = caseStudyImageMeta[slug];
  const figures = caseStudyContentImages[slug] ?? [];
  const products = cs.products.map((label) => productInfo[label] ?? { href: "/pultruded-frp-profiles", label, glyph: "custom" as const, text: "" });
  const documents = cs.downloads?.length ? downloadCards(cs.downloads) : [];
  const quote = buildRfqHref({
    source: "case-study",
    product: cs.focusKeyphrase,
    productPath: path,
    message: `I have a project similar to the case study "${cs.title}". Please contact me to discuss the details and quotation.`,
  });

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    name: cs.focusKeyphrase,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    description: cs.seoDescription ?? cs.results,
    about: cs.industry,
    articleSection: "Case Studies",
    datePublished: `${cs.year}-01-01`,
    dateModified: UPDATED,
    contentLocation: { "@type": "Place", name: cs.location },
    author: { "@id": "https://www.f1composite.com/#organization" },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    image: [
      absoluteUrl(caseStudyImages[slug]),
      absoluteUrl(`/case-studies/${slug}/opengraph-image`),
    ],
    keywords: [cs.focusKeyphrase, cs.industry, ...cs.products],
  };

  return (
    <>
      <JsonLd data={caseStudySchema} />
      <PageHeader
        tag="Case study"
        line={{ name: "Case study", label: cs.industry, mark: false }}
        updated={UPDATED}
        title={cs.title}
        description={cs.summary}
        facts={[
          { label: "Location", value: cs.location },
          { label: "Year", value: cs.year },
          { label: "Industry", value: cs.industry },
        ]}
        figure={
          <Figure number={1} title={image?.title ?? cs.location} note={image?.note ?? "Photo"} caption={image?.caption}>
            <div className="relative -m-[16px] aspect-[3/2]">
              <Image
                src={caseStudyImages[slug] || "/images/case-studies/frp-bridge-deck-replacement-infrastructure-project.jpg"}
                alt={image?.alt ?? cs.title}
                fill
                sizes="(max-width: 1023px) 94vw, 44vw"
                className="object-cover"
                preload
              />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Discuss a similar project", href: quote },
          secondary: { label: "Products used", href: "#products", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: cs.title },
        ]}
      />
      <ProductPageNav
        items={[
          { id: "challenge", label: "Challenge" },
          { id: "solution", label: "What F1 supplied" },
          { id: "results", label: "Results" },
          { id: "products", label: "Products", count: products.length },
          ...(documents.length ? [{ id: "documents", label: "Documents", count: documents.length }] : []),
          { id: "quote", label: "Similar project" },
        ]}
      />

      <ProductSection id="challenge" title="The challenge">
        <p className="max-w-[760px] text-f16 leading-[1.8] text-t2">{cs.challenge}</p>
      </ProductSection>

      <ProductSection id="solution" title="What F1 supplied" tone="muted">
        <p className="max-w-[760px] text-f16 leading-[1.8] text-t2">{cs.solution}</p>
        {figures.length ? (
          <div className="mt-[28px] grid grid-cols-1 gap-[16px] sm:grid-cols-2">
            {figures.map((figure, index) => (
              <Figure key={figure.src} number={index + 2} title={figure.title} note={figure.note}>
                <div className="relative -m-[16px] aspect-[4/3]">
                  <Image src={figure.src} alt={figure.alt} fill sizes="(max-width: 639px) 94vw, 45vw" className="object-cover" />
                </div>
              </Figure>
            ))}
          </div>
        ) : null}
      </ProductSection>

      <ProductSection id="results" title="Results">
        <p className="max-w-[760px] text-f16 leading-[1.8] text-t2">{cs.results}</p>
        <dl className="mt-[28px] grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border-default bg-border-default sm:grid-cols-3">
          {cs.stats.map((stat) => (
            <div key={stat.label} className="bg-white px-[14px] py-[12px]">
              <dt className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{stat.label}</dt>
              <dd className="mt-[4px] text-f18 font-bold text-t1">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </ProductSection>

      <ProductSection id="products" title="Products used" count={`${products.length} product ${products.length === 1 ? "family" : "families"}`} tone="muted">
        <ul className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.href}>
              <Link href={product.href} className="flex h-full items-start gap-[14px] rounded-card border border-border-default bg-white p-[16px] transition-colors hover:border-teal-border">
                <SectionGlyph shape={product.glyph} size={40} />
                <span>
                  <span className="block text-f16 font-bold text-t1">{product.label}</span>
                  {product.text ? <span className="mt-[4px] block text-f14 leading-golden text-t2">{product.text}</span> : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-semibold text-teal-text">
          {[
            { label: `${cs.industry} industry`, href: `/industries/${cs.industry.toLowerCase()}` },
            { label: "All pultruded FRP profiles", href: "/pultruded-frp-profiles" },
            { label: "FRP vs steel and aluminum", href: "/technology/frp-vs-traditional-materials" },
            { label: "What is FRP?", href: "/what-is-frp" },
            { label: "All case studies", href: "/case-studies" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="underline underline-offset-4 hover:text-teal">
              {link.label}
            </Link>
          ))}
        </p>
      </ProductSection>

      {documents.length ? (
        <ProductSection id="documents" title="Certificates and downloads">
          <ul className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((card) => (
              <li key={card.action.href}>
                <DocumentCard card={card} compact />
              </li>
            ))}
          </ul>
        </ProductSection>
      ) : null}

      <ProductSection id="quote" title="Discuss a similar project" tone="deep">
        <ProductRfq
          product={cs.focusKeyphrase}
          productPath={path}
          quoteHref={quote}
          items={similarProjectItems}
          intro="Tell us how your project differs from this one: the site, the loads and the requirements."
          advisorPrompt={prefillForCaseStudy({ title: cs.title, slug, industry: cs.industry, location: cs.location })}
        />
      </ProductSection>
    </>
  );
}
