import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Technical Data",
  description:
    "Mechanical properties, chemical resistance data, and specification sheets for F1 Composite pultruded FRP profiles.",
  path: "/resources/technical-data",
  image: "/resources/technical-data/opengraph-image",
});

export default function TechnicalDataPage() {
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "F1 Composite FRP Profile Technical Data",
    description:
      "Mechanical properties, density, glass content, and reference test standards for pultruded E-glass polyester FRP profiles.",
    url: absoluteUrl("/resources/technical-data"),
    creator: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
      legalName: "FengDu New Material",
    },
    license: absoluteUrl("/terms"),
    isAccessibleForFree: true,
    keywords: [
      "FRP mechanical properties",
      "pultruded fiberglass specifications",
      "E-glass polyester data sheet",
      "ASTM D638 tensile strength",
      "ASTM D790 flexural modulus",
    ],
  };

  return (
    <>
      <JsonLd data={datasetSchema} />
      <PageHeader
        tag="Technical Data"
        title="FRP Profile Specifications"
        description="Comprehensive mechanical, thermal, and chemical resistance data for our standard pultruded FRP profile range."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Technical Data" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[21px] text-f24 font-bold text-t1">
            Typical Mechanical Properties — Pultruded E-Glass / Polyester Profiles
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-border-default bg-bg2">
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Property</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Unit</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Lengthwise</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Crosswise</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Test Standard</th>
                </tr>
              </thead>
              <tbody className="text-t2">
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Tensile Strength</td>
                  <td className="px-[13px] py-[8px]">MPa</td>
                  <td className="px-[13px] py-[8px]">≥ 240</td>
                  <td className="px-[13px] py-[8px]">≥ 50</td>
                  <td className="px-[13px] py-[8px]">ASTM D638</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Tensile Modulus</td>
                  <td className="px-[13px] py-[8px]">GPa</td>
                  <td className="px-[13px] py-[8px]">≥ 20</td>
                  <td className="px-[13px] py-[8px]">≥ 7</td>
                  <td className="px-[13px] py-[8px]">ASTM D638</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Flexural Strength</td>
                  <td className="px-[13px] py-[8px]">MPa</td>
                  <td className="px-[13px] py-[8px]">≥ 280</td>
                  <td className="px-[13px] py-[8px]">≥ 100</td>
                  <td className="px-[13px] py-[8px]">ASTM D790</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Flexural Modulus</td>
                  <td className="px-[13px] py-[8px]">GPa</td>
                  <td className="px-[13px] py-[8px]">≥ 17</td>
                  <td className="px-[13px] py-[8px]">≥ 6</td>
                  <td className="px-[13px] py-[8px]">ASTM D790</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Compressive Strength</td>
                  <td className="px-[13px] py-[8px]">MPa</td>
                  <td className="px-[13px] py-[8px]">≥ 210</td>
                  <td className="px-[13px] py-[8px]">≥ 100</td>
                  <td className="px-[13px] py-[8px]">ASTM D695</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">In-Plane Shear Strength</td>
                  <td className="px-[13px] py-[8px]">MPa</td>
                  <td className="px-[13px] py-[8px]" colSpan={2}>≥ 30</td>
                  <td className="px-[13px] py-[8px]">ASTM D5379</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Density</td>
                  <td className="px-[13px] py-[8px]">g/cm³</td>
                  <td className="px-[13px] py-[8px]" colSpan={2}>1.8 – 2.1</td>
                  <td className="px-[13px] py-[8px]">ASTM D792</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Glass Content</td>
                  <td className="px-[13px] py-[8px]">% by weight</td>
                  <td className="px-[13px] py-[8px]" colSpan={2}>60 – 70</td>
                  <td className="px-[13px] py-[8px]">ASTM D2584</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Barcol Hardness</td>
                  <td className="px-[13px] py-[8px]">—</td>
                  <td className="px-[13px] py-[8px]" colSpan={2}>≥ 40</td>
                  <td className="px-[13px] py-[8px]">ASTM D2583</td>
                </tr>
                <tr>
                  <td className="px-[13px] py-[8px]">Water Absorption (24h)</td>
                  <td className="px-[13px] py-[8px]">%</td>
                  <td className="px-[13px] py-[8px]" colSpan={2}>≤ 0.6</td>
                  <td className="px-[13px] py-[8px]">ASTM D570</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-[21px] text-f13 text-t3">
            Values shown are typical minimums for standard E-glass / isophthalic polyester pultruded profiles.
            Actual values depend on fiber architecture, resin system, and cross-section geometry.
            Contact our engineering team for project-specific data sheets.
          </p>
        </div>
      </section>

      <InnerCTA title="Need specific technical data for your project?" />
    </>
  );
}
