import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle = "FRP Round Rods — Solid Circular Sections";
const pageDescription =
  "Pultruded FRP solid round rods from 6 mm to 50 mm diameter. 65-70% unidirectional glass. Soil nails, rock bolts, marine tie-rods.";
const pagePath = "/products/standard-profiles/rod";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/standard-profiles/rod/opengraph-image",
});

const sizes = [
  { model: "Rod Ø6", d: 6, weight: "0.05" },
  { model: "Rod Ø8", d: 8, weight: "0.09" },
  { model: "Rod Ø10", d: 10, weight: "0.14" },
  { model: "Rod Ø12", d: 12, weight: "0.21" },
  { model: "Rod Ø13", d: 13, weight: "0.24" },
  { model: "Rod Ø16", d: 16, weight: "0.37" },
  { model: "Rod Ø19", d: 19, weight: "0.52" },
  { model: "Rod Ø20", d: 20, weight: "0.57" },
  { model: "Rod Ø22", d: 22, weight: "0.69" },
  { model: "Rod Ø25", d: 25, weight: "0.89" },
  { model: "Rod Ø28", d: 28, weight: "1.12" },
  { model: "Rod Ø30", d: 30, weight: "1.29" },
  { model: "Rod Ø32", d: 32, weight: "1.47" },
  { model: "Rod Ø38", d: 38, weight: "2.06" },
  { model: "Rod Ø40", d: 40, weight: "2.29" },
  { model: "Rod Ø50", d: 50, weight: "3.57" },
];

export default function RodPage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "FRP Round Rods",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/round-rod/frp-round-rod-solid.jpg",
          category: "Pultruded FRP Structural Profiles",
          material: ["Unidirectional glass roving", "Polyester resin", "Vinyl ester resin"],
          additionalProperty: [
            { name: "Diameter Range", value: "6 mm to 50 mm" },
            { name: "Glass Content", value: "65-70% unidirectional glass" },
          ],
        })}
      />
      <PageHeader
        tag="Round Rod"
        title="FRP Round Rods"
        description="Solid circular pultruded FRP rods from 6 mm to 50 mm diameter. Non-magnetic, non-conductive."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Standard Profiles", href: "/products/standard-profiles" },
          { label: "Round Rod" },
        ]}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTag>Solid Circular Sections</SectionTag>
              <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                High-strength solid rods
              </h2>
              <p className="mt-[21px] text-f15 leading-golden text-t2">
                Pultruded with 65-70% unidirectional glass roving for exceptional tensile strength along the longitudinal axis. Primary applications include soil nails, rock bolts, guy-wire replacements, and marine tie-rods where non-magnetic, non-conductive, and corrosion-proof properties are decisive advantages over steel.
              </p>
              <div className="mt-[21px] flex flex-wrap gap-[13px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">65-70% glass content</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Non-magnetic</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Smooth / sand-coated / wound</span>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[8px] bg-neutral-50">
              <Image src="/images/products/round-rod/frp-round-rod-solid.jpg" alt="Pultruded FRP solid round rod by F1 Composite" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-[21px]" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Specifications</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Available sizes</h2>
          <p className="mt-[13px] text-f15 text-t2">Surface options: smooth, sand-coated, or helically wound — selected to suit bond requirements.</p>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Model</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Diameter (mm)</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Weight (kg/m)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.model} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{s.model}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.d}</td>
                    <td className="py-[13px] text-f15 text-teal-text font-medium">{s.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related FRP profiles",
            links: [
              { href: "/products/standard-profiles/tube", label: "FRP round tube" },
              { href: "/products/standard-profiles/flat-bar", label: "FRP flat bar" },
              { href: "/products/standard-profiles/i-beam", label: "FRP I-beam profiles" },
              { href: "/products/standard-profiles/square-tube", label: "FRP square tube" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/infrastructure", label: "Soil nails & rock bolts" },
              { href: "/industries/marine", label: "Marine tie-rods" },
              { href: "/industries/industrial", label: "Industrial tie-rods" },
              { href: "/industries/energy", label: "Solar tracker shafts" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel comparison" },
              { href: "/technology/calculator", label: "Deflection & load calculator" },
              { href: "/resources/technical-data", label: "Data sheets" },
              { href: "/resources/design-guides", label: "Design guides" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      <InnerCTA title="Need engineering data or a quotation for round rods?" />
    </>
  );
}
