import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Downloads",
  description:
    "Download F1 Composite product catalogs, certification documents, CAD files, and technical brochures.",
  path: "/resources/downloads",
  image: "/resources/downloads/opengraph-image",
});

const downloads = [
  {
    title: "Product Catalog 2024",
    format: "PDF",
    size: "12 MB",
    description: "Complete catalog of standard pultruded FRP profiles with dimensions, properties, and ordering information.",
  },
  {
    title: "Fenestration Systems Brochure",
    format: "PDF",
    size: "8 MB",
    description: "Detailed brochure covering 70/80/90-series FRP window and door frame systems.",
  },
  {
    title: "ISO 9001:2015 Certificate",
    format: "PDF",
    size: "0.5 MB",
    description: "Current ISO 9001:2015 quality management system certification.",
  },
  {
    title: "CE Declaration of Performance",
    format: "PDF",
    size: "1 MB",
    description: "EN 13706 Declaration of Performance for CE-marked structural profiles.",
  },
  {
    title: "Standard Profiles — CAD Library",
    format: "DWG/STEP",
    size: "25 MB",
    description: "2D and 3D CAD models for all standard I-beam, channel, angle, and tube profiles.",
  },
  {
    title: "Chemical Resistance Chart",
    format: "PDF",
    size: "2 MB",
    description: "Chemical resistance ratings for polyester, vinyl ester, and epoxy resin systems across 200+ chemicals.",
  },
];

export default function DownloadsPage() {
  const downloadsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Document Library",
    url: absoluteUrl("/resources/downloads"),
    hasPart: downloads.map((dl) => ({
      "@type": "CreativeWork",
      name: dl.title,
      encodingFormat: dl.format,
      description: dl.description,
    })),
  };

  return (
    <>
      <JsonLd data={downloadsSchema} />
      <PageHeader
        tag="Downloads"
        title="Document Library"
        description="Product catalogs, certifications, CAD files, and technical documents available for download."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Downloads" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {downloads.map((dl) => (
              <div
                key={dl.title}
                className="rounded-[8px] border border-border-default bg-white p-[21px]"
              >
                <div className="mb-[13px] flex items-center gap-[8px]">
                  <span className="rounded-[4px] bg-teal-bg px-[8px] py-[3px] text-f11 font-bold text-teal-text">
                    {dl.format}
                  </span>
                  <span className="text-f11 text-t3">{dl.size}</span>
                </div>
                <h3 className="mb-[8px] text-f15 font-bold text-t1">{dl.title}</h3>
                <p className="mb-[13px] text-f13 leading-golden text-t2">{dl.description}</p>
                <Link
                  href="/contact"
                  className="text-f13 font-semibold text-teal-text hover:underline"
                >
                  Request download →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InnerCTA title="Can't find what you're looking for?" />
    </>
  );
}
