import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle = "FRP Round Tubes — Circular Hollow Sections";
const pageDescription =
  "Pultruded FRP round tubes from 25 mm to 150 mm OD. Ideal for handrails, guardrails, and structural applications. Corrosion-free, lightweight.";
const pagePath = "/products/standard-profiles/tube";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/standard-profiles/tube/opengraph-image",
});

const sizes = [
  { model: "CHS 25×3", od: 25, t: 3, weight: "0.3" },
  { model: "CHS 32×3", od: 32, t: 3, weight: "0.4" },
  { model: "CHS 38×3.2", od: 38, t: 3.2, weight: "0.5" },
  { model: "CHS 42×4", od: 42, t: 4, weight: "0.7" },
  { model: "CHS 50×4", od: 50, t: 4, weight: "0.9" },
  { model: "CHS 50×5", od: 50, t: 5, weight: "1.1" },
  { model: "CHS 60×5", od: 60, t: 5, weight: "1.3" },
  { model: "CHS 63.5×6.4", od: 63.5, t: 6.4, weight: "1.7" },
  { model: "CHS 70×5", od: 70, t: 5, weight: "1.6" },
  { model: "CHS 76×6.4", od: 76, t: 6.4, weight: "2.1" },
  { model: "CHS 80×5", od: 80, t: 5, weight: "1.8" },
  { model: "CHS 80×7", od: 80, t: 7, weight: "2.5" },
  { model: "CHS 89×6.4", od: 89, t: 6.4, weight: "2.5" },
  { model: "CHS 100×6", od: 100, t: 6, weight: "2.7" },
  { model: "CHS 114×6.4", od: 114, t: 6.4, weight: "3.3" },
  { model: "CHS 127×6.4", od: 127, t: 6.4, weight: "3.7" },
  { model: "CHS 150×8", od: 150, t: 8, weight: "5.4" },
];

export default function TubePage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "FRP Round Tubes",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/round-tube/frp-round-tube-80mm-od.jpg",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          additionalProperty: [
            { name: "Outer Diameter Range", value: "25 mm to 150 mm" },
            { name: "Applications", value: "Handrails, guardrails, and conduit applications" },
          ],
        })}
      />
      <PageHeader
        tag="Round Tube"
        title="FRP Round Tubes"
        description="Circular hollow section pultruded FRP tubes from 25 mm to 150 mm OD."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Standard Profiles", href: "/products/standard-profiles" },
          { label: "Round Tube" },
        ]}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTag>Circular Hollow Sections</SectionTag>
              <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Round tubes for handrails and structures
              </h2>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                Pultruded FRP round tubes are the standard choice for handrail systems, guardrails, and structural applications requiring a circular cross-section. Smooth interior bore allows use as conduits. Non-conductive, corrosion-free, and available in standard grey or safety yellow.
              </p>
              <div className="mt-[8px] flex flex-wrap gap-[13px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Handrail systems</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Guardrails</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Conduit applications</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white">
              <Image src="/images/products/round-tube/frp-round-tube-photo.png" alt="Pultruded FRP round tube profile by F1 Composite" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Specifications</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Available sizes</h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Model</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">OD (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">t (mm)</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Weight (kg/m)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.model} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{s.model}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.od}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.t}</td>
                    <td className="py-[13px] text-f15 text-teal-text font-medium">{s.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/standard-profiles">All standard profiles</LinkArrow>
            <LinkArrow href="/products/custom-pultrusions">Need a custom size?</LinkArrow>
            <LinkArrow href="/technology/frp-vs-traditional-materials">FRP vs steel comparison</LinkArrow>
            <LinkArrow href="/industries/marine">Marine applications</LinkArrow>
            <LinkArrow href="/industries/construction">Construction applications</LinkArrow>
            <LinkArrow href="/contact">Request a quotation</LinkArrow>
          </div>
        </div>
      </section>

      <InnerCTA title="Need engineering data or a quotation for round tube profiles?" />
    </>
  );
}
