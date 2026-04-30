import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle = "FRP Angle — Pultruded Fiberglass L-Profile Manufacturer";
const pageDescription =
  "Pultruded FRP angle (L-section) profiles 25×25 mm — 152×152 mm, equal and unequal legs. EN 13706 / ASTM D3917, corrosion-free, thermal expansion matches concrete. Bracing, ledgers, stiffeners. Free samples.";
const pagePath = "/products/standard-profiles/angle";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/standard-profiles/angle/opengraph-image",
});

const sizes = [
  { model: "L 25×25×3.2", a: 25, b: 25, t: 3.2, weight: "0.3" },
  { model: "L 30×30×4", a: 30, b: 30, t: 4, weight: "0.4" },
  { model: "L 38×38×4.8", a: 38, b: 38, t: 4.8, weight: "0.5" },
  { model: "L 50×50×5", a: 50, b: 50, t: 5, weight: "0.8" },
  { model: "L 50×50×6", a: 50, b: 50, t: 6, weight: "0.9" },
  { model: "L 50×50×8", a: 50, b: 50, t: 8, weight: "1.2" },
  { model: "L 65×65×6", a: 65, b: 65, t: 6, weight: "1.2" },
  { model: "L 75×75×6", a: 75, b: 75, t: 6, weight: "1.4" },
  { model: "L 75×75×8", a: 75, b: 75, t: 8, weight: "1.8" },
  { model: "L 76×76×6.4", a: 76, b: 76, t: 6.4, weight: "1.5" },
  { model: "L 100×100×8", a: 100, b: 100, t: 8, weight: "2.5" },
  { model: "L 100×100×10", a: 100, b: 100, t: 10, weight: "3.0" },
  { model: "L 102×102×9.5", a: 102, b: 102, t: 9.5, weight: "3.0" },
  { model: "L 150×150×12", a: 150, b: 150, t: 12, weight: "5.6" },
  { model: "L 152×152×12.7", a: 152, b: 152, t: 12.7, weight: "6.0" },
];

const faqItems = [
  {
    question: "Are unequal-leg FRP angles available?",
    answer:
      "Yes. In addition to our standard equal-leg range, we can produce unequal-leg angles via custom pultrusion. Common unequal-leg sizes include 75×50, 100×75, and 150×100 mm. Contact our engineering team for custom specifications.",
  },
  {
    question: "Can FRP angles be used in concrete-embedded connections?",
    answer:
      "FRP angles are excellent for embedded connections in reinforced concrete. The coefficient of thermal expansion closely matches concrete, preventing differential thermal movement that would compromise bond integrity over time — a common issue with steel embedments.",
  },
];

export default function AnglePage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "FRP Angle Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/angle/frp-angle-profile-100x100x10mm.png",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          additionalProperty: [
            { name: "Size Range", value: "25×25 mm to 152×152 mm" },
            { name: "Format", value: "Equal-leg and unequal-leg L-profiles" },
          ],
        })}
      />
      <PageHeader
        tag="Angle"
        title="FRP Angle Profiles"
        description="Equal and unequal-leg pultruded FRP L-profiles from 25×25 mm to 152×152 mm."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Standard Profiles", href: "/products/standard-profiles" },
          { label: "Angle" },
        ]}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTag>L-Profiles</SectionTag>
              <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Versatile structural angles
              </h2>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                FRP angles serve as stiffeners, bracing members, ledger supports, and connection elements across structural and architectural applications. Balanced fiber architecture provides near-equal mechanical properties on both legs for consistent load transfer at bolted connections.
              </p>
              <div className="mt-[8px] flex flex-wrap gap-[13px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Equal & unequal-leg</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Thermal expansion ≈ concrete</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Non-conductive</span>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[8px] bg-white">
              <Image
                src="/images/products/angle/frp-angle-cover.jpg"
                alt="Pultruded FRP angle L-profile 100x100x10 mm by F1 Composite"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: "center 25%" }}
                priority
              />
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
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">A (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">B (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">t (mm)</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Weight (kg/m)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.model} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{s.model}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.a}</td>
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
              { href: "/products/standard-profiles/flat-bar", label: "FRP flat bar" },
              { href: "/products/standard-profiles/square-tube", label: "FRP square tube" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/construction", label: "Construction bracing & stiffeners" },
              { href: "/industries/industrial", label: "Industrial frames" },
              { href: "/industries/energy", label: "Energy & solar mounting" },
              { href: "/industries/infrastructure", label: "Infrastructure" },
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

      <InnerCTA title="Need engineering data or a quotation for angle profiles?" />
    </>
  );
}
