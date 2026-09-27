import type { Metadata } from "next";
import CaseStudyGrid, { type CaseItem } from "@/components/sections/CaseStudyGrid";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { coverFor } from "@/lib/covers";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Case Studies & Engineering References",
  description:
    "Explore F1 project accounts and source-backed public engineering references for FRP profiles, bridge systems, windows, platforms, solar and infrastructure.",
  path: "/case-studies",
  image: "/case-studies/opengraph-image",
});

// title: the case page's own title, for the structured data; card: the short
// name on the hub card. Covers come from the cover registry, so a card shows
// the picture its case opens on, with the same label.
const caseStudies = [
  {
    slug: "beam-bridge",
    title: "FRP Beam Bridges — Four Manufacturing Routes",
    card: "FRP beam bridges: four manufacturing routes",
    industry: "Engineering reference",
    location: "F1 capabilities and global references",
    year: "Reference",
    excerpt:
      "Four FRP bridge concepts, F1 fabrication and assembly capabilities, interactive beam calculations and source-backed engineering references.",
  },
  {
    slug: "qinling-station-antarctic-passive-windows",
    title: "Qinling Station, Antarctic Ross Sea — GFRP Window Project",
    card: "Qinling Station, Antarctica",
    industry: "Construction",
    location: "Ross Sea, Antarctica",
    year: "2024",
    excerpt:
      "PHI-certified (Component-ID 2491wi03) 90-series pultruded GFRP Passive House windows at China's fifth Antarctic research station: phB efficiency class for the cool-temperate climate zone, −60 °C design low, 45 m/s katabatic wind loading.",
  },
  {
    slug: "yancheng-talent-apartment-fenestration",
    title: "Yancheng Talent Apartments: FRP Window Supply for a Coastal Housing Development",
    card: "Yancheng talent apartments",
    industry: "Construction",
    location: "Yancheng, Jiangsu, China",
    year: "2024",
    excerpt:
      "Supplied the complete pultruded FRP fenestration package (65-series casement, inward and outward; 90-series sliding; matching facade frames) across about 20 residential and commercial buildings of a coastal talent-housing development.",
  },
  {
    slug: "factory-access-staircase",
    title: "F1 Factory Access Staircase, Built From Our Own FRP Profiles",
    card: "F1 factory access staircase",
    industry: "Industrial",
    location: "Chongqing, China",
    year: "2024",
    excerpt:
      "F1 Composite's own Chongqing production base: a staircase and elevated platform built end to end from our pultruded FRP profiles, and a live reference for visiting customers.",
  },
  {
    slug: "european-bridge-deck",
    title: "European Bridge Deck Replacement",
    card: "European bridge deck replacement",
    industry: "Infrastructure",
    location: "Netherlands",
    year: "2023",
    excerpt:
      "Replaced corroding steel bridge deck components with custom-pultruded FRP profiles, achieving 40% weight reduction while exceeding original load specifications.",
  },
  {
    slug: "coastal-marina-walkway",
    title: "Coastal Marina Walkway System",
    card: "Coastal marina walkway",
    industry: "Marine",
    location: "United Kingdom",
    year: "2022",
    excerpt:
      "Designed and supplied a complete FRP grating and handrail system for a 500m coastal marina walkway, designed for saltwater exposure with resin selection and periodic inspection.",
  },
  {
    slug: "baotou-industrial-gfrp-pu-windows",
    title: "Baotou Industrial Park: GFRP-PU Windows for Severe Cold and Chemical Exposure",
    card: "Baotou industrial park windows",
    industry: "Industrial",
    location: "Baotou, Inner Mongolia, China",
    year: "2024",
    excerpt:
      "Supplied 70/80/90-series pultruded GFRP-PU window-frame profiles across an industrial manufacturing campus combining chemical-exposure workshops with an administrative and welfare block. The GFRP-PU frame solves the severe-cold-zone (−25 °C design low, 200-day heating season) thermal-bridge problem and the chemical-aerosol corrosion problem in one material specification.",
  },
  {
    slug: "wanhua-yantai-zero-carbon-windows",
    title: "Wanhua Yantai Zero-Carbon Community: GFRP-PU Passive Windows",
    card: "Wanhua Yantai zero-carbon community",
    industry: "Construction",
    location: "Yantai, Shandong, China",
    year: "2022",
    excerpt:
      "Supplied 65 / 90-series pultruded GFRP-PU window-frame profiles for the 13,657 m² employee-dormitory envelope of Wanhua Chemical's first end-to-end zero-carbon community. Whole-window U = 0.99 W/m²·K, N50 = 1.0 airtightness, 61.11 % comprehensive energy-saving rate verified at handover.",
  },
  {
    slug: "chongqing-rooftop-pv-frp-rail",
    title: "Chongqing Rooftop PV Retrofit: Pultruded FRP H-Rail on Color Steel-Tile Roofs",
    card: "Chongqing rooftop PV retrofit",
    industry: "Energy",
    location: "Chongqing, China",
    year: "2024",
    excerpt:
      "Supplied pultruded GFRP H-section rail and Jiaochi-clamp accessory kit for a rooftop PV retrofit on existing industrial factory buildings. The composite rail at ~1.0–1.5 kg/m removes roughly 75 % of rail dead load against galvanized steel, keeping the retrofit inside the original roof's as-designed live-load reserve with project-specific connection and inspection requirements.",
  },
  {
    slug: "water-treatment-cable-tray",
    title: "Municipal Water Treatment Plant — Cable Tray & Handrail System",
    card: "Municipal water treatment plant",
    industry: "Infrastructure",
    location: "Thailand",
    year: "2024",
    excerpt:
      "Replaced corroding galvanized steel cable trays and handrails across a 120,000 m³/day water treatment facility with pultruded FRP, with resin selection and inspection requirements for high-humidity chlorine environments.",
  },
];

const cards: CaseItem[] = caseStudies.map((cs) => {
  const cover = coverFor(`/case-studies/${cs.slug}`);
  if (!cover) throw new Error(`No cover registered for /case-studies/${cs.slug}`);
  return { slug: cs.slug, title: cs.card, industry: cs.industry, location: cs.location, year: cs.year, cover, excerpt: cs.excerpt };
});

const projects = caseStudies.filter((cs) => cs.year !== "Reference");
const years = projects.map((cs) => Number(cs.year));

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
        tag="Case studies"
        title="Projects and engineering references"
        description="Browse F1 project accounts and source-backed public engineering references. Ask for project-specific records when evaluating a similar supply."
        facts={[
          { label: "Project accounts", value: String(projects.length) },
          { label: "Engineering references", value: String(caseStudies.length - projects.length) },
          { label: "Project years", value: `${Math.min(...years)}–${Math.max(...years)}` },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case studies" },
        ]}
      />

      <PageSection
        id="cases"
        title="All cases"
        intro="Each card opens the case with its scope, the products supplied and the documents behind it. Pictures are labeled: renderings and illustrative photos are marked as such."
        tone="muted"
      >
        <CaseStudyGrid items={cards} />
      </PageSection>

      <InnerCTA title="Have a similar project in mind?" />
    </>
  );
}
