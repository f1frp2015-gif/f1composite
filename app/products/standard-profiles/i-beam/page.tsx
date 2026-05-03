import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle = "FRP I-Beam Profiles — Pultruded Fiberglass Wide Flange Beams";
const pageDescription =
  "Pultruded FRP I-beam structural profiles from 76×38 mm to 305×305 mm. Fiberglass wide flange beams 75% lighter than steel, corrosion-free. Full size chart, specifications, and load tables.";
const pagePath = "/products/standard-profiles/i-beam";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/standard-profiles/i-beam/opengraph-image",
});

const sizes = [
  { model: "I 76×38×6.4", h: 76, b: 38, tw: 6.4, tf: 6.4, weight: "1.2" },
  { model: "I 100×50×6", h: 100, b: 50, tw: 6, tf: 6, weight: "1.6" },
  { model: "I 120×60×6", h: 120, b: 60, tw: 6, tf: 6, weight: "2.0" },
  { model: "I 152×76×6.4", h: 152, b: 76, tw: 6.4, tf: 6.4, weight: "2.9" },
  { model: "I 160×80×8", h: 160, b: 80, tw: 8, tf: 8, weight: "3.6" },
  { model: "I 200×100×10", h: 200, b: 100, tw: 10, tf: 10, weight: "5.8" },
  { model: "I 240×120×12", h: 240, b: 120, tw: 12, tf: 12, weight: "8.4" },
  { model: "I 300×150×15", h: 300, b: 150, tw: 15, tf: 15, weight: "13.5" },
  { model: "I 305×305×12.7", h: 305, b: 305, tw: 12.7, tf: 12.7, weight: "16.0" },
];

const faqItems = [
  {
    question: "How much lighter are FRP I-beams compared to steel?",
    answer:
      "Pultruded FRP I-beams weigh approximately 75% less than equivalent steel wide-flange sections. For example, an FRP I 200×100×10 weighs roughly 5.8 kg/m compared to approximately 25 kg/m for a comparable steel section. This dramatically reduces lifting requirements and foundation loads.",
  },
  {
    question: "What resin systems are available for I-beams?",
    answer:
      "We offer I-beams in isophthalic polyester for general structural use, vinyl ester for aggressive chemical or marine environments, polyurethane for high toughness and fast cure, and epoxy on request for maximum mechanical performance.",
  },
  {
    question: "Can FRP I-beams be used as primary structural members?",
    answer:
      "Yes. FRP I-beams are widely used as primary structural members for walkways, bridges, platforms, and building frames. The elastic modulus of FRP is approximately 1/5th that of steel, so deflection often governs design rather than strength. We provide full engineering data and can assist with span table calculations.",
  },
];

export default function IBeamPage() {
  return (
    <>
      <PageHeader
        tag="I-Beam"
        title="FRP I-Beam Profiles"
        description="Wide flange pultruded FRP I-beams from 76×38 mm to 305×305 mm. Up to 75% weight reduction versus steel with full corrosion resistance."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/standard-profiles" },
          { label: "I-Beam" },
        ]}
      />

      <JsonLd
        data={buildProductSchema({
          name: "FRP I-Beam Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/i-beam/frp-i-beam-profile-200x100x10mm.png",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin", "Phenolic resin"],
          additionalProperty: [
            { name: "Size Range", value: "76×38 mm to 305×305 mm" },
            { name: "Benefit", value: "Up to 75% lighter than steel" },
          ],
        })}
      />

      {/* Hero Image + Intro */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTag>Wide Flange Profiles</SectionTag>
              <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Structural I-beams engineered for performance
              </h2>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                Our pultruded FRP I-beams replicate standard steel wide-flange geometry while delivering up to 75% weight reduction. Unidirectional E-glass roving in the flanges provides maximum flexural stiffness, combined with continuous strand mat in the web for shear resistance. Available in polyester, vinyl ester, polyurethane, and epoxy resin systems.
              </p>
              <div className="mt-[8px] flex flex-wrap gap-[13px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">75% lighter than steel</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Corrosion-free</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Non-conductive</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">ISO 9001 certified</span>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[8px] bg-neutral-50">
              <Image
                src="/images/products/i-beam/frp-i-beam-cover.jpg"
                alt="Pultruded FRP I-beam wide flange structural profile by F1 Composite"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Size Chart */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Specifications</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Available sizes
          </h2>
          <p className="mt-[13px] max-w-[560px] text-f15 leading-golden text-t2">
            All dimensions in millimeters. Custom sizes available via our{" "}
            <a href="/products/custom-pultrusions" className="font-semibold text-teal-text hover:text-teal">custom pultrusion</a> service.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Model</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">H (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">B (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">tw (mm)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">tf (mm)</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Weight (kg/m)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.model} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{s.model}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.h}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.b}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.tw}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{s.tf}</td>
                    <td className="py-[13px] text-f15 text-teal-text font-medium">{s.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[13px] text-f13 text-t3">
            Wall thicknesses and weights are typical values for E-glass/polyester. Actual values may vary by resin system and fiber architecture.
          </p>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Related FRP profiles",
            links: [
              { href: "/products/standard-profiles/channel", label: "FRP channel profiles" },
              { href: "/products/standard-profiles/angle", label: "FRP angle profiles" },
              { href: "/products/standard-profiles/square-tube", label: "FRP square tube" },
              { href: "/products/standard-profiles/flat-bar", label: "FRP flat bar" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/infrastructure", label: "Infrastructure & bridges" },
              { href: "/industries/construction", label: "Construction & rooftops" },
              { href: "/industries/energy", label: "Energy & solar mounting" },
              { href: "/industries/marine", label: "Marine & offshore" },
              { href: "/case-studies/european-bridge-deck", label: "Bridge deck case study" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel comparison" },
              { href: "/technology/calculator", label: "Deflection & load calculator" },
              { href: "/resources/technical-data", label: "Data sheets & test certificates" },
              { href: "/resources/design-guides", label: "Design guides (ASCE / EN 13706)" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      {/* FAQ */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Need engineering data or a quotation for I-beam profiles?" />
    </>
  );
}
