import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Design Guides",
  description:
    "Engineering design guidance for FRP structural applications. Connection details, load tables, and best practices from F1 Composite.",
  path: "/resources/design-guides",
  image: "/resources/design-guides/opengraph-image",
});

const guides = [
  {
    title: "FRP Profile Selection Guide",
    description:
      "Step-by-step methodology for selecting the right pultruded FRP profile for structural applications, including load analysis, deflection criteria, and safety factors.",
    status: "Available",
  },
  {
    title: "Connection Design for FRP Structures",
    description:
      "Detailed guidance on bolted, bonded, and hybrid connections for pultruded FRP profiles, with worked examples and capacity tables per EN 13706.",
    status: "Available",
  },
  {
    title: "Fire Performance of FRP Composites",
    description:
      "Overview of fire reaction and fire resistance properties of pultruded FRP profiles, including phenolic resin options and intumescent coating systems.",
    status: "Coming Soon",
  },
  {
    title: "Fenestration System Installation Manual",
    description:
      "Complete installation guide for F1 Composite 70/80/90-series FRP window and door frame systems, including anchoring details and weathersealing.",
    status: "Coming Soon",
  },
];

export default function DesignGuidesPage() {
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Design Guides",
    url: absoluteUrl("/resources/design-guides"),
    hasPart: guides.map((guide) => ({
      "@type": "TechArticle",
      headline: guide.title,
      description: guide.description,
    })),
  };

  return (
    <>
      <JsonLd data={guideSchema} />
      <PageHeader
        tag="Design Guides"
        title="Engineering Design Resources"
        description="Practical design guidance developed by our engineering team to help you specify and detail FRP composite structures with confidence."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Design Guides" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="space-y-[21px]">
            {guides.map((guide) => (
              <div
                key={guide.title}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                <div className="flex items-start justify-between gap-[21px]">
                  <div>
                    <h3 className="text-f19 font-bold text-t1">{guide.title}</h3>
                    <p className="mt-[8px] max-w-[640px] text-f15 leading-golden text-t2">
                      {guide.description}
                    </p>
                  </div>
                  {guide.status === "Available" ? (
                    <Link
                      href="/contact"
                      className="flex-shrink-0 rounded-[4px] bg-teal px-[21px] py-[8px] text-f11 font-bold uppercase tracking-[1px] text-white hover:bg-teal-text"
                    >
                      Request Access
                    </Link>
                  ) : (
                    <span className="flex-shrink-0 rounded-[4px] bg-bg2 px-[21px] py-[8px] text-f11 font-bold uppercase tracking-[1px] text-t3">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InnerCTA title="Need custom engineering support?" />
    </>
  );
}
