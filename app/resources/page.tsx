import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources",
  description:
    "Technical resources, design guides, blog articles, and downloadable documents from F1 Composite — your FRP pultrusion knowledge hub.",
  path: "/resources",
  image: "/resources/opengraph-image",
});

const resources = [
  {
    title: "Technical Data",
    description: "Mechanical properties, chemical resistance charts, and specification sheets for all standard FRP profiles.",
    href: "/resources/technical-data",
    icon: "📊",
  },
  {
    title: "Design Guides",
    description: "Engineering design guidance for FRP structural applications, connection details, and load tables.",
    href: "/resources/design-guides",
    icon: "📐",
  },
  {
    title: "Blog",
    description: "Technical articles, industry insights, and project updates from our engineering team.",
    href: "/resources/blog",
    icon: "📝",
  },
  {
    title: "Downloads",
    description: "Product catalogs, certification documents, CAD files, and technical brochures in PDF format.",
    href: "/resources/downloads",
    icon: "📁",
  },
];

export default function ResourcesPage() {
  const resourceSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Resources",
    url: absoluteUrl("/resources"),
    hasPart: resources.map((resource) => ({
      "@type": "WebPage",
      name: resource.title,
      description: resource.description,
      url: absoluteUrl(resource.href),
    })),
  };

  return (
    <>
      <JsonLd data={resourceSchema} />
      <PageHeader
        tag="Resources"
        title="Knowledge Hub"
        description="Technical data, design guidance, and expert insights to support your FRP composite project from concept to completion."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] md:grid-cols-2">
            {resources.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border"
              >
                <span className="mb-[13px] block text-[34px]">{r.icon}</span>
                <h3 className="mb-[8px] text-f19 font-bold text-t1 group-hover:text-teal-text">
                  {r.title}
                </h3>
                <p className="text-f15 leading-golden text-t2">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
