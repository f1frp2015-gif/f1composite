import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Technology",
  description:
    "Pultrusion technology, FRP material advantages, quality testing standards, and engineering know-how for fiber-reinforced polymer profiles.",
  path: "/technology",
  image: "/technology/opengraph-image",
});

const areas = [
  {
    tag: "Process",
    title: "Pultrusion Process",
    description:
      "Continuous manufacturing of constant-cross-section FRP profiles through fiber reinforcement, resin impregnation, heated die forming, and precision pulling. Our lines deliver repeatable mechanical properties at industrial throughput.",
    href: "/technology/pultrusion-process",
  },
  {
    tag: "Materials",
    title: "FRP vs Traditional Materials",
    description:
      "Fiber-reinforced polymers outperform steel, aluminium, timber, and concrete across weight, corrosion resistance, electrical insulation, and lifecycle cost. See the full property-by-property comparison.",
    href: "/technology/frp-vs-traditional-materials",
  },
  {
    tag: "Quality",
    title: "Quality & Testing",
    description:
      "ISO 9001 certified production with EN 13706 and ASTM compliance. Every profile undergoes tensile, flexural, impact, and Barcol hardness testing before shipment.",
    href: "/technology/quality-testing",
  },
  {
    tag: "Services",
    title: "Know-How & Services",
    description:
      "From consulting engagements to full turnkey pultrusion line installations, our engineering team transfers decades of composite manufacturing expertise to your operation.",
    href: "/technology/knowhow-services",
  },
  {
    tag: "Tool",
    title: "FRP Profile Calculator",
    description:
      "Calculate beam deflection, bending stress, and find equivalent FRP replacements for steel and aluminium sections. EN 13706 and ASTM compliant.",
    href: "/technology/calculator",
  },
];

export default function TechnologyPage() {
  const technologySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Technology",
    url: absoluteUrl("/technology"),
    hasPart: areas.map((area) => ({
      "@type": "TechArticle",
      headline: area.title,
      description: area.description,
      url: absoluteUrl(area.href),
    })),
  };

  return (
    <>
      <JsonLd data={technologySchema} />
      <PageHeader
        tag="Technology"
        title="Engineering Excellence in Pultruded Composites"
        description="We combine advanced pultrusion process control, rigorous material science, and decades of application engineering to deliver FRP profiles that outperform traditional materials in the most demanding environments."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/technology/frp-material-engineering-analysis.jpg"
              alt="Engineering analysis and material science formulas for FRP composite design"
              width={1280}
              height={600}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Technology Areas</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Four Pillars of Our Technical Capability
          </h2>
          <p className="mt-[13px] max-w-[560px] text-f15 leading-golden text-t2">
            Each discipline reinforces the others — precise process control enables
            superior material performance, validated by comprehensive testing, and
            made accessible through our know-how transfer programs.
          </p>

          <div className="mt-[55px] grid gap-[21px] sm:grid-cols-2">
            {areas.map((area) => (
              <div
                key={area.href}
                className="group relative overflow-hidden rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:border-teal-border"
              >
                <div className="card-topbar absolute left-0 right-0 top-0" />
                <SectionTag>{area.tag}</SectionTag>
                <h3 className="mt-[13px] text-f24 font-bold text-t1">
                  {area.title}
                </h3>
                <p className="mt-[13px] text-f15 leading-golden text-t2">
                  {area.description}
                </p>
                <div className="mt-[21px]">
                  <LinkArrow href={area.href}>Learn more</LinkArrow>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InnerCTA title="Need technical guidance for your FRP project?" />
    </>
  );
}
