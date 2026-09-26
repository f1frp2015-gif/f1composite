import { E40EvidenceLink } from "@/components/sections/E40TestEvidence";
import TubeSizeTable from "@/components/sections/TubeSizeTable";
import ProfileSupplyGuide from "@/components/sections/ProfileSupplyGuide";
import { buildRfqHref } from "@/lib/rfq";
import ProductNextSteps from "@/components/sections/ProductNextSteps";
import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { buildPageMetadata, buildProductFamilyPageSchema, priceRangeFromWeights } from "@/lib/seo";
import { getCategorySizes } from "@/lib/catalog/public";

// Size table is DB-driven (catalog admin) with the historical hardcoded list
// as build-safe fallback; refreshed hourly.
export const revalidate = 3600;

const pageTitle = "Fiberglass Square Tube & Tubing — Pultruded FRP SHS & RHS";
const pageDescription =
  "Compare pultruded fiberglass square tube and rectangular tubing sizes, walls and weights. Select a section and request cut lengths, resin options and a quote.";
const pagePath = "/products/fiberglass-structural-shapes/frp-square-tube";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-square-tube/opengraph-image",
});

const fallbackSizes = [
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
    question: "Can I order fiberglass tubing cut to length?",
    answer: "Include finished length per piece, piece count, end cuts or holes, and tolerances with your selected section. We review the cutting and machining scope, material and packing before confirming the quotation. Catalog dimensions are section options, not a live stock list.",
  },
  {
    question: "What is the minimum order quantity and lead time?",
    answer: "Minimum quantity and timing are confirmed for the section, resin, tooling and processing required. Send your trial quantity, expected repeat demand, destination and target date. Ask for sample arrangements and production and shipping timing to be listed separately in the quotation.",
  },
  {
    question: "What is the advantage of FRP square tubes over open profiles?",
    answer:
      "Closed-section square tubes deliver superior torsional rigidity compared to I-beams or channels, making them ideal for columns, trusses, and structures that resist combined bending and torsion. The smooth interior bore also allows use as conduits or cable enclosures.",
  },
  {
    question: "Are rectangular hollow sections (RHS) available?",
    answer:
      "Yes. The catalog includes rectangular hollow sections such as 80×60, 100×60 and 120×60 mm alongside square sections. Confirm tooling, material, production quantity and timing in your quotation. Send a drawing for a custom rectangular size.",
  },
];

async function loadSizes(): Promise<typeof fallbackSizes> {
  const rows = await getCategorySizes("square-tube");
  if (rows.length === 0) return fallbackSizes;
  return rows.map((r) => ({
    model: r.model,
    // SHS stores side as D; RHS stores H×B
    h: r.dims.D ?? r.dims.H ?? 0,
    b: r.dims.D ?? r.dims.B ?? 0,
    t: r.dims.t ?? 0,
    weight: r.weight == null ? "—" : String(r.weight),
  }));
}

export default async function SquareTubePage() {
  const sizes = await loadSizes();
  const weights = sizes.map((s) => Number(s.weight)).filter((w) => Number.isFinite(w));
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Square and Rectangular Tubes",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/square-tube/frp-square-tube-100x100x6mm.webp",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          priceRange: priceRangeFromWeights(weights, 2.2, 4.5) ?? undefined,
          additionalProperty: [
            { name: "Size Range", value: "25×25 mm to 240×240 mm" },
            { name: "Formats", value: "Square hollow sections and rectangular hollow sections" },
          ],
        })}
      />
      <PageHeader
        tag="Square Tube"
        title="Fiberglass Square & Rectangular Tubes (FRP)"
        description="Pultruded fiberglass square and rectangular tubing (SHS / RHS) from 25×25 mm to 240×240 mm."
        actions={{
          primary: { label: "Choose a size", href: "#sizes" },
          secondary: { label: "Request a quote", href: buildRfqHref({ source: "tube-product-header", product: "Pultruded fiberglass square and rectangular tubing", productPath: pagePath }), variant: "secondary" },
          note: "Select a catalog section, then add cut lengths, quantity and service requirements.",
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/fiberglass-structural-shapes" },
          { label: "Square Tube" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="site-container">
          <div className="grid gap-[34px] lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionTag>SHS & RHS Profiles</SectionTag>
              <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Closed-section structural tubes
              </h2>
              <p className="mt-[8px] text-f16 leading-golden text-t2">
                FRP square and rectangular tubes provide closed-section torsional rigidity for columns, trusses, and frame structures. Multi-axial reinforcement can support transverse demands, while the smooth interior bore allows conduit or cable-enclosure use. Electrical-insulation performance depends on the specified laminate, moisture and contamination exposure, joints and any metal hardware.
              </p>
              <div className="mt-[8px] flex flex-wrap gap-[8px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f14 font-medium text-t2">Superior torsional rigidity</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f14 font-medium text-t2">SHS + RHS available</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f14 font-medium text-t2">Electrical insulation options</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white">
              <Image src="/images/products/square-tube/frp-square-tube-cover.jpg" alt="Pultruded FRP square tube SHS profile by F1 Composite" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: "center 30%" }} preload />
            </div>
          </div>
        </div>
      </section>

      <section id="sizes" className="scroll-mt-[100px] bg-bg2 py-[89px]">
        <div className="site-container">
          <SectionTag>Specifications</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Fiberglass square and rectangular tube sizes</h2>
          <E40EvidenceLink />
          <TubeSizeTable
            sizes={sizes.map((s) => ({ model: s.model, dimensions: [s.h, s.b, s.t], weight: s.weight }))}
            columns={["H (mm)", "B (mm)", "Wall (mm)"]}
            product="Pultruded fiberglass square and rectangular tubing"
            productPath={pagePath}
          />
        </div>
      </section>

      <ProfileSupplyGuide product="square and rectangular tubes" />

      <RelatedLinks
        groups={[
          {
            title: "Related FRP profiles",
            links: [
              { href: "/products/frp-handrail-systems", label: "Complete fiberglass handrail systems" },
              { href: "/products/frp-ladders", label: "Complete fiberglass fixed ladder systems" },
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beam profiles" },
              { href: "/products/fiberglass-structural-shapes/frp-channel", label: "FRP channel profiles" },
              { href: "/products/fiberglass-structural-shapes/frp-tube", label: "FRP round tube" },
              { href: "/products/fiberglass-structural-shapes/frp-flat-bar", label: "FRP flat bar" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusion services" },
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
              { href: "/frp-span-tables#square-tube", label: "FRP square tube span table — allowable loads" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel comparison" },
              { href: "/frp-profile-calculator", label: "Deflection & load calculator" },
              { href: "/resources/technical-data", label: "Data sheets" },
              { href: "/resources/design-guides", label: "Design guides" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      <section className="bg-white py-[89px]">
        <div className="site-container">
          <FAQ items={faqItems} />
        </div>
      </section>

      <section className="bg-white pb-[55px]">
        <div className="site-container">
          <CalculatorCTA
            href="/frp-profile-calculator#shape=square-tube"
            eyebrow="Free tool · square tube preset"
            title="Size an FRP square tube — bending, shear &amp; deflection"
            sub="Opens the FRP profile calculator on a square / rectangular tube: check bending, shear, and Timoshenko-corrected deflection against your span and load, find the steel-equivalent section, then quote against your spec."
          />
        </div>
      </section>

      <ProductNextSteps path="/products/fiberglass-structural-shapes/frp-square-tube" />
      <InnerCTA title="Need engineering data or a quotation for square tube profiles?" />
    </>
  );
}
