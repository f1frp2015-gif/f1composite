import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle = "FRP Flat Bars — Solid Rectangular Sections";
const pageDescription =
  "Pultruded FRP flat bars from 12×3 mm to 305×25 mm. High-modulus options up to 70% glass content. Tolerances ±0.25 mm thickness.";
const pagePath = "/products/standard-profiles/flat-bar";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/standard-profiles/flat-bar/opengraph-image",
});

const sizes = [
  { model: "FB 12×3", w: 12, t: 3, weight: "0.07" },
  { model: "FB 20×3", w: 20, t: 3, weight: "0.11" },
  { model: "FB 25×3", w: 25, t: 3, weight: "0.14" },
  { model: "FB 25×5", w: 25, t: 5, weight: "0.23" },
  { model: "FB 30×4", w: 30, t: 4, weight: "0.22" },
  { model: "FB 38×4.8", w: 38, t: 4.8, weight: "0.33" },
  { model: "FB 50×5", w: 50, t: 5, weight: "0.45" },
  { model: "FB 50×6", w: 50, t: 6, weight: "0.55" },
  { model: "FB 50×10", w: 50, t: 10, weight: "0.91" },
  { model: "FB 75×6", w: 75, t: 6, weight: "0.82" },
  { model: "FB 75×10", w: 75, t: 10, weight: "1.36" },
  { model: "FB 100×6", w: 100, t: 6, weight: "1.09" },
  { model: "FB 100×10", w: 100, t: 10, weight: "1.82" },
  { model: "FB 100×15", w: 100, t: 15, weight: "2.73" },
  { model: "FB 150×10", w: 150, t: 10, weight: "2.73" },
  { model: "FB 150×15", w: 150, t: 15, weight: "4.09" },
  { model: "FB 200×15", w: 200, t: 15, weight: "5.45" },
  { model: "FB 305×25", w: 305, t: 25, weight: "13.86" },
];

export default function FlatBarPage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "FRP Flat Bars",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/flat-bar/frp-flat-bar-150x15x4mm.jpg",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          additionalProperty: [
            { name: "Size Range", value: "12×3 mm to 305×25 mm" },
            { name: "Tolerance", value: "±0.25 mm thickness" },
          ],
        })}
      />
      <PageHeader
        tag="Flat Bar"
        title="FRP Flat Bars"
        description="Solid rectangular pultruded FRP bars from 12×3 mm to 305×25 mm. Tolerances ±0.25 mm."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Standard Profiles", href: "/products/standard-profiles" },
          { label: "Flat Bar" },
        ]}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTag>Solid Rectangular Sections</SectionTag>
              <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                The most versatile pultruded profile
              </h2>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                FRP flat bars serve as stiffeners, splice plates, wear strips, and spacer elements. High-modulus options with up to 70% glass content are used for concrete reinforcement and pre-stressed applications. Dimensional tolerances of ±0.25 mm on thickness and ±0.5 mm on width ensure reliable fit-up.
              </p>
              <div className="mt-[8px] flex flex-wrap gap-[13px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">±0.25 mm tolerance</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Up to 70% glass</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Rebar replacement</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white">
              <Image src="/images/products/flat-bar/frp-flat-bar-photo.png" alt="Pultruded FRP flat bar profile by F1 Composite" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
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
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Width (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Thickness (mm)</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Weight (kg/m)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.model} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{s.model}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.w}</td>
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
        background="white"
        groups={[
          {
            title: "Related FRP profiles",
            links: [
              { href: "/products/standard-profiles/i-beam", label: "FRP I-beam profiles" },
              { href: "/products/standard-profiles/channel", label: "FRP channel profiles" },
              { href: "/products/standard-profiles/angle", label: "FRP angle profiles" },
              { href: "/products/standard-profiles/rod", label: "FRP round rod" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/industrial", label: "Wear strips & stiffeners" },
              { href: "/industries/energy", label: "Solar module clamps" },
              { href: "/industries/infrastructure", label: "Splice plates" },
              { href: "/industries/construction", label: "Rooftop supports" },
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

      <InnerCTA title="Need engineering data or a quotation for flat bar profiles?" />
    </>
  );
}
