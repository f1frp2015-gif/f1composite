import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Case Studies — Pultruded Profile Projects Worldwide",
  description:
    "Real pultruded FRP projects: bridge decks, marine walkways, chemical platforms, FRP windows, and solar mounting — with quantified outcomes.",
  path: "/case-studies",
  image: "/case-studies/opengraph-image",
});

const caseStudies = [
  {
    slug: "qinling-station-antarctic-passive-windows",
    title: "Qinling Station, Antarctic Ross Sea — PHI Class A+ Passive FRP Windows",
    industry: "Construction",
    location: "Ross Sea, Antarctica",
    year: "2024",
    image: "/images/case-studies/frp-qinling-station-antarctic-ross-sea-aerial.webp",
    excerpt:
      "PHI-certified (Component-ID 2491wi03) 90-series pultruded GFRP Passive House windows at China's fifth Antarctic research station — phA arctic climate class, −60 °C design low, 45 m/s katabatic wind loading.",
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
      "Designed and supplied a complete FRP grating and handrail system for a 500m coastal marina walkway, eliminating maintenance cycles in the saltwater environment.",
  },
  {
    slug: "chemical-plant-platform",
    title: "Chemical Processing Plant Access Platforms",
    industry: "Industrial",
    location: "Saudi Arabia",
    year: "2023",
    image: "/images/case-studies/frp-chemical-plant-access-platform.jpg",
    excerpt:
      "Delivered acid-resistant FRP grating and structural profiles for elevated access platforms across 12 chemical processing units.",
  },
  {
    slug: "fenestration-residential",
    title: "High-Performance Fenestration — Residential Tower",
    industry: "Construction",
    location: "Germany",
    year: "2024",
    image: "/images/case-studies/frp-fenestration-residential-tower-facade.jpg",
    excerpt:
      "Supplied 90-series FRP window frame profiles for a 24-story residential development, achieving Passivhaus-certified thermal performance.",
  },
  {
    slug: "solar-farm-mounting",
    title: "Solar Farm Mounting Structure",
    industry: "Energy",
    location: "Australia",
    year: "2023",
    image: "/images/case-studies/frp-solar-farm-mounting-structure.jpg",
    excerpt:
      "Engineered lightweight, UV-stable FRP mounting profiles for a 50MW solar installation, reducing structural dead load by 35% versus aluminium.",
  },
  {
    slug: "water-treatment-cable-tray",
    title: "Municipal Water Treatment Plant — Cable Tray & Handrail System",
    industry: "Infrastructure",
    location: "Thailand",
    year: "2024",
    image: "/images/case-studies/frp-water-treatment-cable-tray-handrail.jpg",
    excerpt:
      "Replaced corroding galvanized steel cable trays and handrails across a 120,000 m³/day water treatment facility with pultruded FRP, eliminating maintenance in high-humidity chlorine environments.",
  },
];

const industries = ["All", "Infrastructure", "Marine", "Industrial", "Construction", "Energy"];

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
        title="Proven Results Across Industries"
        description="Explore how F1 Composite's pultruded FRP profiles solve real-world engineering challenges — from bridge decks to offshore platforms."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          {/* Filter tabs */}
          <div className="mb-[34px] flex flex-wrap gap-[8px]">
            {industries.map((ind) => (
              <span
                key={ind}
                className="cursor-pointer rounded-[4px] border border-border-default px-[13px] py-[5px] text-f11 font-bold uppercase tracking-[2px] text-t3 transition-colors hover:border-teal-border hover:text-teal-text first:border-teal first:bg-teal first:text-white"
              >
                {ind}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group rounded-[8px] border border-border-default bg-white transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
              >
                {/* Case study image */}
                <div className="relative aspect-[1.618] overflow-hidden bg-bg2">
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[0.34s] group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-[13px] top-[13px] z-10 rounded-[4px] bg-teal/90 px-[8px] py-[3px] text-f11 font-bold uppercase tracking-[1px] text-white">
                    {cs.industry}
                  </span>
                </div>
                <div className="p-[21px]">
                  <h3 className="text-[17px] font-bold text-t1 group-hover:text-teal-text">
                    {cs.title}
                  </h3>
                  <p className="mt-[8px] text-f13 leading-golden text-t2">{cs.excerpt}</p>
                  <div className="mt-[13px] flex gap-[13px] text-f11 text-t3">
                    <span>{cs.location}</span>
                    <span>•</span>
                    <span>{cs.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InnerCTA title="Have a similar project in mind?" />
    </>
  );
}
