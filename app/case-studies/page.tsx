import type { Metadata } from "next";
import CaseStudyGrid from "@/components/sections/CaseStudyGrid";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Case Studies & Engineering References",
  description:
    "Explore F1 project accounts and source-backed public engineering references for FRP profiles, bridge systems, windows, platforms, solar and infrastructure.",
  path: "/case-studies",
  image: "/case-studies/opengraph-image",
});

const caseStudies = [
  {
    slug: "beam-bridge",
    title: "FRP Beam Bridges — Four Manufacturing Routes",
    industry: "Active-Transport Bridge Engineering",
    location: "F1 capabilities & global references",
    year: "Reference",
    image: "/images/case-studies/beam-bridge/pedestrian-cycle-beam-bridge-load-path.svg",
    excerpt:
      "Four FRP bridge concepts, F1 fabrication and assembly capabilities, interactive beam calculations and source-backed engineering references.",
  },
  {
    slug: "qinling-station-antarctic-passive-windows",
    title: "Qinling Station, Antarctic Ross Sea — GFRP Window Project",
    industry: "Construction",
    location: "Ross Sea, Antarctica",
    year: "2024",
    image: "/images/case-studies/frp-qinling-station-antarctic-ross-sea-aerial.webp",
    excerpt:
      "PHI-certified (Component-ID 2491wi03) 90-series pultruded GFRP Passive House windows at China's fifth Antarctic research station — phB efficiency class for the cool-temperate climate zone, −60 °C design low, 45 m/s katabatic wind loading.",
  },
  {
    slug: "yancheng-talent-apartment-fenestration",
    title: "Yancheng Talent Apartment — Large-Scale FRP Fenestration Supply",
    industry: "Construction",
    location: "Yancheng, Jiangsu, China",
    year: "2024",
    image: "/images/case-studies/frp-talent-apartment-yancheng-aerial-view.webp",
    excerpt:
      "Supplied the complete pultruded FRP fenestration package — 65-series casement (inward and outward), 90-series sliding, and matching facade frames — across ~20 residential and commercial buildings of a coastal talent-housing development.",
  },
  {
    slug: "factory-access-staircase",
    title: "F1 Factory FRP Access Staircase",
    industry: "Industrial",
    location: "Chongqing, China",
    year: "2024",
    image: "/images/case-studies/frp-factory-access-staircase-hero.webp",
    excerpt:
      "F1 Composite's own Chongqing production base — staircase and elevated platform built end-to-end from our pultruded FRP profiles, live reference for visiting customers.",
  },
  {
    slug: "european-bridge-deck",
    title: "European Bridge Deck Replacement",
    industry: "Infrastructure",
    location: "Netherlands",
    year: "2023",
    image: "/images/case-studies/frp-bridge-deck-replacement-infrastructure-project.jpg",
    excerpt:
      "Replaced corroding steel bridge deck components with custom-pultruded FRP profiles, achieving 40% weight reduction while exceeding original load specifications.",
  },
  {
    slug: "coastal-marina-walkway",
    title: "Coastal Marina Walkway System",
    industry: "Marine",
    location: "United Kingdom",
    year: "2022",
    image: "/images/case-studies/frp-coastal-marina-walkway-grating-system.jpg",
    excerpt:
      "Designed and supplied a complete FRP grating and handrail system for a 500m coastal marina walkway, designed for saltwater exposure with resin selection and periodic inspection.",
  },
  {
    slug: "chemical-plant-platform",
    title: "Baotou Industrial Park Fenestration — Severe-Cold-Climate GFRP-PU Windows under Chemical Exposure",
    industry: "Industrial",
    location: "Baotou, Inner Mongolia, China",
    year: "2024",
    image: "/images/case-studies/frp-baotou-industrial-park-aerial-rendering.webp",
    excerpt:
      "Supplied 70/80/90-series pultruded GFRP-PU window-frame profiles across an industrial manufacturing campus combining chemical-exposure workshops with an administrative and welfare block. The GFRP-PU frame solves the severe-cold-zone (−25 °C design low, 200-day heating season) thermal-bridge problem and the chemical-aerosol corrosion problem in one material specification.",
  },
  {
    slug: "fenestration-residential",
    title: "Wanhua Yantai Zero-Carbon Community — GFRP-PU Passive House Windows",
    industry: "Construction",
    location: "Yantai, Shandong, China",
    year: "2022",
    image: "/images/case-studies/frp-wanhua-yantai-zero-carbon-community-aerial.webp",
    excerpt:
      "Supplied 65 / 90-series pultruded GFRP-PU window-frame profiles for the 13,657 m² employee-dormitory envelope of Wanhua Chemical's first end-to-end zero-carbon community. Whole-window U = 0.99 W/m²·K, N50 = 1.0 airtightness, 61.11 % comprehensive energy-saving rate verified at handover.",
  },
  {
    slug: "solar-farm-mounting",
    title: "Chongqing Rooftop PV Retrofit — Pultruded FRP H-Rail on Industrial Colored Steel-Tile Roofs",
    industry: "Energy",
    location: "Chongqing, China",
    year: "2024",
    image: "/images/case-studies/frp-chongqing-rooftop-solar-mounting-colored-steel-tile.webp",
    excerpt:
      "Supplied pultruded GFRP H-section rail and Jiaochi-clamp accessory kit for a rooftop PV retrofit on existing industrial factory buildings. The composite rail at ~1.0–1.5 kg/m removes roughly 75 % of rail dead load against galvanized steel, keeping the retrofit inside the original roof's as-designed live-load reserve with project-specific connection and inspection requirements.",
  },
  {
    slug: "water-treatment-cable-tray",
    title: "Municipal Water Treatment Plant — Cable Tray & Handrail System",
    industry: "Infrastructure",
    location: "Thailand",
    year: "2024",
    image: "/images/case-studies/frp-water-treatment-cable-tray-handrail.jpg",
    excerpt:
      "Replaced corroding galvanized steel cable trays and handrails across a 120,000 m³/day water treatment facility with pultruded FRP, with resin selection and inspection requirements for high-humidity chlorine environments.",
  },
];


export default function CaseStudiesPage() {
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Case Studies",
    url: absoluteUrl("/case-studies"),
    hasPart: caseStudies.map((cs) => ({
      "@type": "Article",
      headline: cs.title,
      about: cs.industry,
      contentLocation: cs.location,
      url: absoluteUrl(`/case-studies/${cs.slug}`),
      description: cs.excerpt,
    })),
  };

  return (
    <>
      <JsonLd data={caseStudySchema} />
      <PageHeader
        tag="Case Studies"
        title="Projects & Engineering References"
        description="Browse F1 project accounts and source-backed public engineering references. Ask for project-specific records when evaluating a similar supply."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <CaseStudyGrid items={caseStudies} />
        </div>
      </section>

      <InnerCTA title="Have a similar project in mind?" />
    </>
  );
}
