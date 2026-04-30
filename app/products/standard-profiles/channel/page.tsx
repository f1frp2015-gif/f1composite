import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

const pageTitle = "FRP Channel — Pultruded Fiberglass C & U Channel Manufacturer";
const pageDescription =
  "Pultruded FRP channel profiles (C and U) 38×13 mm — 305×89 mm. EN 13706 / ASTM D3917 certified, 75% lighter than steel, non-conductive, UV-protected. Cable trays, framing, stringers. Quote in 24h.";
const pagePath = "/products/standard-profiles/channel";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/standard-profiles/channel/opengraph-image",
});

const sizes = [
  { model: "U 38×13×4.8", h: 38, b: 13, t: 4.8, weight: "0.4" },
  { model: "U 50×25×5", h: 50, b: 25, t: 5, weight: "0.7" },
  { model: "U 76×25×6.4", h: 76, b: 25, t: 6.4, weight: "1.0" },
  { model: "U 76×38×6.4", h: 76, b: 38, t: 6.4, weight: "1.4" },
  { model: "U 100×30×6", h: 100, b: 30, t: 6, weight: "1.5" },
  { model: "U 100×50×6", h: 100, b: 50, t: 6, weight: "1.8" },
  { model: "U 120×50×6", h: 120, b: 50, t: 6, weight: "2.0" },
  { model: "U 150×40×6", h: 150, b: 40, t: 6, weight: "2.1" },
  { model: "U 152×43×6.4", h: 152, b: 43, t: 6.4, weight: "2.2" },
  { model: "U 152×43×9.5", h: 152, b: 43, t: 9.5, weight: "3.2" },
  { model: "U 160×48×8", h: 160, b: 48, t: 8, weight: "3.0" },
  { model: "U 200×60×8", h: 200, b: 60, t: 8, weight: "3.8" },
  { model: "U 200×60×10", h: 200, b: 60, t: 10, weight: "4.6" },
  { model: "U 240×72×8", h: 240, b: 72, t: 8, weight: "4.6" },
  { model: "U 240×72×12", h: 240, b: 72, t: 12, weight: "6.8" },
  { model: "U 254×76×9.5", h: 254, b: 76, t: 9.5, weight: "5.6" },
  { model: "U 300×90×15", h: 300, b: 90, t: 15, weight: "10.4" },
  { model: "U 305×89×12.7", h: 305, b: 89, t: 12.7, weight: "8.8" },
  { model: "U 360×108×18", h: 360, b: 108, t: 18, weight: "15.0" },
];

const faqItems = [
  {
    question: "What colors are available for FRP channels?",
    answer:
      "Standard colors are grey and safety yellow. Custom RAL colors are available on request for minimum order quantities (typically 200 linear meters). A UV-protective surface veil is included on all channels.",
  },
  {
    question: "Can FRP channels be bolted to dissimilar materials?",
    answer:
      "Yes. The non-conductive nature of FRP eliminates galvanic corrosion risk when bolted to aluminium, stainless steel, or other metals — a common failure mode in traditional multi-material assemblies.",
  },
];

export default function ChannelPage() {
  return (
    <>
      <JsonLd
        data={buildProductSchema({
          name: "FRP Channel Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/channel/frp-channel-profile-200x60x12mm.png",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          additionalProperty: [
            { name: "Size Range", value: "38×13 mm to 305×89 mm" },
            { name: "Feature", value: "UV-protected surface veil and non-conductive performance" },
          ],
        })}
      />
      <PageHeader
        tag="Channel"
        title="FRP Channel Profiles"
        description="Pultruded FRP U-profiles from 38×13 mm to 305×89 mm. UV-protected, non-conductive."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Standard Profiles", href: "/products/standard-profiles" },
          { label: "Channel" },
        ]}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTag>U-Profiles</SectionTag>
              <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Open-section framing profiles
              </h2>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                Pultruded channels provide versatile framing for secondary structural members, cable management systems, and modular assemblies. The open U-shape simplifies field connections with mechanical fasteners. Available in standard grey, safety yellow, and custom RAL colors.
              </p>
              <div className="mt-[8px] flex flex-wrap gap-[13px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">UV-protected surface veil</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">No galvanic corrosion</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2">Custom colors available</span>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[8px] bg-white">
              <Image src="/images/products/channel/frp-channel-cover.jpg" alt="Pultruded FRP channel U-profile by F1 Composite" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: "center 20%" }} priority />
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
              { href: "/products/standard-profiles/angle", label: "FRP angle profiles" },
              { href: "/products/standard-profiles/square-tube", label: "FRP square tube" },
              { href: "/products/standard-profiles/tube", label: "FRP round tube" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/energy", label: "Cable trays & substations" },
              { href: "/industries/industrial", label: "Industrial skids & platforms" },
              { href: "/industries/construction", label: "Construction framing" },
              { href: "/industries/infrastructure", label: "Infrastructure stringers" },
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

      <InnerCTA title="Need engineering data or a quotation for channel profiles?" />
    </>
  );
}
