import TubeSizeTable from "@/components/sections/TubeSizeTable";
import ProfileSupplyGuide from "@/components/sections/ProfileSupplyGuide";
import { buildRfqHref } from "@/lib/rfq";
import ProductNextSteps from "@/components/sections/ProductNextSteps";
import MaterialTerminologyNote from "@/components/sections/MaterialTerminologyNote";
import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import { buildPageMetadata, buildProductFamilyPageSchema, priceRangeFromWeights } from "@/lib/seo";
import { getCategorySizes } from "@/lib/catalog/public";

// Size table is DB-driven (catalog admin) with the historical hardcoded list
// as build-safe fallback; refreshed hourly.
export const revalidate = 3600;

const pageTitle = "Fiberglass Round Tube | Pultruded FRP & GRP Tubing";
const pageDescription =
  "Pultruded fiberglass round tube, also called GRP tube, in 25–150 mm OD. Compare nominal walls and weights for structural tubing and request a drawing-led quote.";
const pagePath = "/products/fiberglass-structural-shapes/frp-tube";

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
    question: "What are pultruded FRP round tubes used for?",
    answer:
      "Pultruded FRP round tubes are used as members in handrail systems, structural columns, antenna masts, conduits and insulating stand-offs. Their low density, resin-selected corrosion resistance and dielectric material properties can suit marine, chemical and electrical service, but the finished assembly, exposure and any metal hardware still require project review.",
  },
  {
    question: "FRP round tube vs FRP square tube — which should I use?",
    answer:
      "Round tubing suits circular grips and members such as handrails and masts. Square and rectangular tubing provides flat bearing faces for frames and bolted connections. Compare the actual section properties, laminate, span and load case; the shape name alone does not establish which section is stiffer or stronger. Structural tubing is not a pressure-pipe specification.",
  },
  {
    question: "Can FRP round tubes be used outdoors with UV exposure?",
    answer:
      "Outdoor configurations can use a UV-stabilized resin, surface veil and, where specified, a compatible coating. Appearance and mechanical-property retention depend on resin, pigment, surface system, climate and exposure duration, so state the project location and design life and request the applicable weathering evidence.",
  },
  {
    question: "What's the load capacity of FRP handrail tubes?",
    answer:
      "A round tube by itself cannot establish the capacity or compliance of a handrail. The complete posts, top and middle rails, fittings, splices, bases, anchors and supporting substrate must be evaluated together against the governing load and deflection criteria. Use the complete fiberglass handrail systems page for the catalog assembly and project-release boundary.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/fiberglass-structural-shapes/frp-tube/opengraph-image",
});

const fallbackSizes = [
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

async function loadSizes(): Promise<typeof fallbackSizes> {
  const rows = await getCategorySizes("round-tube");
  if (rows.length === 0) return fallbackSizes;
  return rows.map((r) => ({
    model: r.model,
    od: r.dims.OD ?? 0,
    t: r.dims.t ?? 0,
    weight: r.weight == null ? "—" : String(r.weight),
  }));
}

export default async function TubePage() {
  const sizes = await loadSizes();
  const weights = sizes.map((s) => Number(s.weight)).filter((w) => Number.isFinite(w));
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Round Tubes",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/round-tube/frp-round-tube-80mm-od.jpg",
          category: "Pultruded FRP Structural Profiles",
          material: ["E-glass fiber", "Polyester resin", "Vinyl ester resin"],
          priceRange: priceRangeFromWeights(weights, 2.2, 4.5) ?? undefined,
          additionalProperty: [
            { name: "Outer Diameter Range", value: "25 mm to 150 mm" },
            { name: "Applications", value: "Handrails, guardrails, and conduit applications" },
          ],
        })}
      />
      <PageHeader
        tag="Round Tube"
        title="Fiberglass Round Tubes & Tubing (FRP)"
        description="Circular hollow section pultruded fiberglass tubing from 25 mm to 150 mm OD."
        actions={{
          primary: { label: "Choose a size", href: "#sizes" },
          secondary: { label: "Request a quote", href: buildRfqHref({ source: "tube-product-header", product: "Pultruded fiberglass round tubing", productPath: pagePath }), variant: "secondary" },
          note: "Select a catalog section, then add cut lengths, quantity and service requirements.",
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Standard Profiles", href: "/products/fiberglass-structural-shapes" },
          { label: "Round Tube" },
        ]}
      />

      <MaterialTerminologyNote title="GRP tube for structural applications">
        GRP tube and fiberglass round tubing refer to the glass-reinforced pultrusions in this range. Select outside diameter, wall thickness and resin against the design load. Structural tube dimensions do not establish a pressure rating; pressure pipe needs a separately qualified specification.
      </MaterialTerminologyNote>

      <section className="bg-white py-[89px]">
        <div className="site-container">
          <div className="grid gap-[34px] lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTag>Circular Hollow Sections</SectionTag>
              <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Round tubes for handrails and structures
              </h2>
              <p className="mt-[8px] text-f16 leading-golden text-t2">
                Pultruded FRP round tubes are used as members in handrail systems, guardrails, and structural applications requiring a circular cross-section. Their smooth interior bore also supports conduit applications. Electrical and corrosion performance depend on the specified laminate, exposure and complete assembly; catalog tube data do not qualify a finished safety system.
              </p>
              <div className="mt-[8px] flex flex-wrap gap-[13px]">
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f14 font-medium text-t2">Handrail systems</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f14 font-medium text-t2">Guardrails</span>
                <span className="rounded-[4px] bg-bg2 px-[13px] py-[5px] text-f14 font-medium text-t2">Conduit applications</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white">
              <Image src="/images/products/round-tube/frp-round-tube-photo.webp" alt="Pultruded FRP round tube profile by F1 Composite" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" preload />
            </div>
          </div>
        </div>
      </section>

      <section id="sizes" className="scroll-mt-[100px] bg-bg2 py-[89px]">
        <div className="site-container">
          <SectionTag>Specifications</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">Fiberglass round tube sizes</h2>
          <TubeSizeTable
            sizes={sizes.map((s) => ({ model: s.model, dimensions: [s.od, s.t], weight: s.weight }))}
            columns={["OD (mm)", "Wall (mm)"]}
            product="Pultruded fiberglass round tubing"
            productPath={pagePath}
          />
        </div>
      </section>

      <ProfileSupplyGuide />

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related FRP profiles",
            links: [
              { href: "/products/frp-handrail-systems", label: "Complete fiberglass handrail systems" },
              { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "FRP square tube" },
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beam profiles" },
              { href: "/products/fiberglass-structural-shapes/frp-rod", label: "FRP round rod" },
              { href: "/products/fiberglass-structural-shapes/frp-channel", label: "FRP channel profiles" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusion services" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/marine", label: "Marine handrails & antennas" },
              { href: "/industries/construction", label: "Handrails & guardrails" },
              { href: "/industries/energy", label: "Non-conductive standoffs" },
              { href: "/industries/infrastructure", label: "Infrastructure handrails" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/frp-span-tables#round-tube", label: "FRP round tube span table — allowable loads" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel comparison" },
              { href: "/frp-profile-calculator", label: "Deflection & load calculator" },
              { href: "/resources/technical-data", label: "Data sheets" },
              { href: "/resources/design-guides", label: "Design guides" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="site-container">
          <FAQ items={faqItems} />
        </div>
      </section>

      <section className="bg-white pb-[55px]">
        <div className="site-container">
          <CalculatorCTA
            href="/frp-profile-calculator#shape=round-tube"
            eyebrow="Free tool · round tube preset"
            title="Size an FRP round tube — bending, shear &amp; deflection"
            sub="Opens the FRP profile calculator on a round tube: check bending, shear, and Timoshenko-corrected deflection against your span and load, find the steel-equivalent section, then quote against your spec."
          />
        </div>
      </section>

      <ProductNextSteps path="/products/fiberglass-structural-shapes/frp-tube" />
      <InnerCTA title="Need engineering data or a quotation for round tube profiles?" />
    </>
  );
}
