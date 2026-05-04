import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle = "FRP Square Tube — Pultruded Fiberglass SHS & RHS Manufacturer";
const pageDescription =
  "Pultruded FRP square and rectangular hollow sections 25×25 mm — 240×240 mm. EN 13706 / ASTM D3917, 75% lighter than steel, dielectric, corrosion-free. Trusses, columns, frames. Free samples.";
const pagePath = "/products/standard-profiles/square-tube";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/standard-profiles/square-tube/opengraph-image",
});

const sizes = [
  { model: "SHS 25×25×3.2", h: 25, b: 25, t: 3.2, weight: "0.4" },
  { model: "SHS 38×38×4.8", h: 38, b: 38, t: 4.8, weight: "0.9" },
  { model: "RHS 40×20×7", h: 40, b: 20, t: 7, weight: "1.0" },
  { model: "RHS 40×25×8", h: 40, b: 25, t: 8, weight: "1.2" },
  { model: "SHS 50×50×5", h: 50, b: 50, t: 5, weight: "1.4" },
  { model: "SHS 60×60×5", h: 60, b: 60, t: 5, weight: "1.7" },
  { model: "SHS 75×75×6", h: 75, b: 75, t: 6, weight: "2.5" },
  { model: "RHS 80×60×5", h: 80, b: 60, t: 5, weight: "2.0" },
  { model: "SHS 100×100×6", h: 100, b: 100, t: 6, weight: "3.5" },
  { model: "SHS 100×100×8", h: 100, b: 100, t: 8, weight: "4.5" },
  { model: "RHS 100×60×8", h: 100, b: 60, t: 8, weight: "3.6" },
  { model: "SHS 114×114×6", h: 114, b: 114, t: 6, weight: "4.0" },
  { model: "SHS 114×114×8", h: 114, b: 114, t: 8, weight: "5.2" },
  { model: "SHS 120×120×8", h: 120, b: 120, t: 8, weight: "5.6" },
  { model: "RHS 120×60×5", h: 120, b: 60, t: 5, weight: "2.6" },
  { model: "SHS 132×132×9.5", h: 132, b: 132, t: 9.5, weight: "7.0" },
  { model: "SHS 152×152×9.5", h: 152, b: 152, t: 9.5, weight: "8.2" },
  { model: "SHS 160×160×8", h: 160, b: 160, t: 8, weight: "7.4" },
  { model: "SHS 200×200×10", h: 200, b: 200, t: 10, weight: "11.6" },
  { model: "SHS 240×240×12", h: 240, b: 240, t: 12, weight: "16.8" },
];

const faqItems = [
  {
    question: "What is the advantage of FRP square tubes over open profiles?",
    answer:
      "Closed-section square tubes deliver superior torsional rigidity compared to I-beams or channels, making them ideal for columns, trusses, and structures that resist combined bending and torsion. The smooth interior bore also allows use as conduits or cable enclosures.",
  },
  {
    question: "Are rectangular hollow sections (RHS) available?",
    answer:
      "Yes. In addition to square sections (SHS), we stock rectangular hollow sections including 80×60, 100×60, and 120×60 mm. Custom rectangular sizes are available via our custom pultrusion service.",
  },
];

export default function SquareTubePage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "FRP Square and Rectangular Tubes",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/square-tube/frp-square-tube-100x100x6mm.webp",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          additionalProperty: [
            { name: "Size Range", value: "25×25 mm to 240×240 mm" },
            { name: "Formats", value: "Square hollow sections and rectangular hollow sections" },
          ],
        })}
      />
      <PageHeader
        tag="Square Tube"
        title="FRP Square & Rectangular Tubes"
        description="Pultruded FRP SHS and RHS profiles from 25×25 mm to 240×240 mm."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/standard-profiles" },
          { label: "Square Tube" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionTag>SHS & RHS Profiles</SectionTag>
              <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Closed-section structural tubes
              </h2>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                FRP square and rectangular tubes deliver superior torsional rigidity for columns, trusses, and frame structures. Multi-axial reinforcement provides structural integrity in both directions. The smooth interior bore allows dual use as conduits or cable enclosures with inherent dielectric properties.
              </p>
              <div className="mt-[8px] flex flex-wrap gap-[8px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Superior torsional rigidity</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">SHS + RHS available</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Dielectric</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white">
              <Image src="/images/products/square-tube/frp-square-tube-cover.jpg" alt="Pultruded FRP square tube SHS profile by F1 Composite" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: "center 30%" }} priority />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Specifications</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Available sizes</h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Model</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">H (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">B (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">t (mm)</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Weight (kg/m)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.model} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{s.model}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.h}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.b}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.t}</td>
                    <td className="py-[13px] text-f15 text-teal-text font-medium">{s.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Related FRP profiles",
            links: [
              { href: "/products/standard-profiles/i-beam", label: "FRP I-beam profiles" },
              { href: "/products/standard-profiles/channel", label: "FRP channel profiles" },
              { href: "/products/standard-profiles/tube", label: "FRP round tube" },
              { href: "/products/standard-profiles/flat-bar", label: "FRP flat bar" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/infrastructure", label: "Infrastructure trusses" },
              { href: "/industries/construction", label: "Construction columns" },
              { href: "/industries/energy", label: "Solar racking posts" },
              { href: "/industries/industrial", label: "Industrial frames" },
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

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Need engineering data or a quotation for square tube profiles?" />
    </>
  );
}
