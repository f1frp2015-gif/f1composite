import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import CoverCard from "@/components/ui/CoverCard";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { productCovers } from "@/lib/covers";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import { HeatFlowFrameComparison } from "@/components/sections/ConceptAnimations";
import Figure from "@/components/ui/Figure";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "FRP vs Aluminum Windows: Thermal, Cost & U-Value Data";
const pageDescription =
  "FRP vs aluminum windows compared on U-value, thermal bridging, condensation, lifecycle cost and Passive House suitability, with certified frame data.";
const pagePath = "/technology/frp-vs-aluminum-windows";
const publishedAt = "2026-04-15";
const updatedAt = "2026-09-27";
const referencedStandards = ["EN ISO 10077-1", "EN ISO 10077-2", "EN 14024", "NFRC 100", "PHI certified components"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

interface CompRow {
  property: string;
  unit?: string;
  frp: string;
  aluminum: string;
  frpBetter?: boolean;
}

const comparisonData: CompRow[] = [
  { property: "Frame Uf (70 mm section)", unit: "W/m²·K", frp: "0.85 – 1.2", aluminum: "1.8 – 2.4", frpBetter: true },
  { property: "Frame Uf (90 mm passive section)", unit: "W/m²·K", frp: "0.78 – 0.95", aluminum: "1.4 – 1.8", frpBetter: true },
  { property: "Thermal conductivity", unit: "W/m·K", frp: "0.3 – 0.5", aluminum: "160 – 200", frpBetter: true },
  { property: "Glass-edge thermal bridge", unit: "ψ, W/m·K", frp: "≈ 0.035 (warm-edge)", aluminum: "0.06 – 0.11", frpBetter: true },
  { property: "Thermal expansion", unit: "10⁻⁶/K", frp: "8 – 10 (matches glass)", aluminum: "23 – 24 (3× glass)", frpBetter: true },
  { property: "Tensile strength (longitudinal)", unit: "MPa", frp: "240 – 400", aluminum: "240 – 310 (6063-T6)" },
  { property: "Density", unit: "g/cm³", frp: "1.9", aluminum: "2.7" },
  { property: "Corrosion resistance", frp: "Does not corrode in salt, chloride or sulfur atmospheres", aluminum: "Pitting in coastal and industrial atmospheres", frpBetter: true },
  { property: "Passive House certification", frp: "90-series: PHI component certificate 2491wi03", aluminum: "Certified systems use deep thermal breaks or insulated cores" },
  { property: "Recyclability", frp: "Limited (thermoset)", aluminum: "Excellent (infinite loop)" },
  { property: "Embodied CO₂", unit: "kg CO₂/kg", frp: "3.1 – 5.0", aluminum: "8.0 – 12.0 (primary)", frpBetter: true },
];

const faqs = [
  {
    question: "Can aluminum window frames match FRP on U-value?",
    answer:
      "Standard thermally broken aluminum frames rarely reach Uf below 1.4 W/m²·K. Premium systems with deep polyamide breaks and insulating inserts get to around 1.0 or lower, at a cost premium. A pultruded FRP 90-series frame reaches Uf 0.85 W/m²·K with no thermal break, because the material conducts about 500 times less heat than aluminum. For the PHI target of Uw ≤ 0.80 W/m²·K, FRP meets the limit with standard triple glazing; the aluminum systems that do are the premium, deep-break end of the range.",
  },
  {
    question: "Why does thermal bridging favor FRP so strongly?",
    answer:
      "Aluminum conducts heat at 160–200 W/m·K, roughly 500× more than pultruded FRP's 0.3–0.5 W/m·K. Even with a polyamide thermal break, aluminum frames still create a linear thermal bridge of 0.06–0.11 W/m·K at the frame-to-glass junction. FRP frames paired with warm-edge spacers deliver ψ ≈ 0.035 W/m·K. On a typical 1.5 m² window, this difference alone shifts Uw by 0.15–0.25 W/m²·K, enough to fail passive house certification.",
  },
  {
    question: "Is FRP more expensive than aluminum for window frames?",
    answer:
      "At frame level, FRP is priced close to premium thermally broken aluminum systems, and often somewhat above them per linear meter, so compare quotes for the same Uw target. Over the building's life, FRP frames need no repainting and have no thermal-break assembly to maintain, though gaskets and hardware still need normal upkeep. Whether that makes FRP cheaper overall depends on the energy prices, HVAC sizing and maintenance assumed for the project.",
  },
  {
    question: "How does FRP handle thermal expansion compared to aluminum?",
    answer:
      "The coefficient of thermal expansion (CTE) of FRP is 8–10 × 10⁻⁶/K, essentially matching glass at 8 × 10⁻⁶/K. Aluminum expands at 23–24 × 10⁻⁶/K: three times faster than glass. Over a 2 m long window, aluminum grows 1.4 mm more than the glass across a 30°C temperature swing, cycling this stress into the perimeter sealant every day. Seal failures and fogging between panes are common aluminum-frame failure modes; an FRP frame largely removes that cyclic stress.",
  },
  {
    question: "Do FRP frames work in both hot and cold climates?",
    answer:
      "Yes. Pultruded FRP frames are used from Antarctic stations to hot coastal sites; check the resin's service temperature range for the project. The low thermal conductivity reduces heat loss in cold climates and heat gain in hot ones. On tropical coastal projects, FRP also avoids the pitting corrosion that shortens the life of aluminum frames in salt air.",
  },
  {
    question: "What certificates does F1 Composite have for window frames?",
    answer:
      "The 90-series window frame holds Passive House Institute (PHI) component certificate 2491wi03, with Uf 0.78 W/m²·K and Uw 0.78 W/m²·K for the 1.23 × 1.48 m test window with Ug 0.70. Intertek AS 2047 reports cover a turn-and-tilt window and a lift-sliding door. ISO 9001, EN 14024 and fire test documents (for example EN 13501-1) are provided on request for the configuration you specify.",
  },
];

export default function FrpVsAluminumWindowsPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pageTitle,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@id": "https://www.f1composite.com/#organization" },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    description: pageDescription,
    mainEntityOfPage: absoluteUrl(pagePath),
    about: [
      { "@type": "Thing", name: "Pultruded FRP window frames" },
      { "@type": "Thing", name: "Thermally broken aluminum window frames" },
      { "@type": "Thing", name: "Whole-window U-value (Uw)" },
      { "@type": "Thing", name: "Passive house fenestration" },
    ],
    citation: referencedStandards,
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <PageHeader
        tag="Material Comparison"
        title="FRP vs Aluminum Window Frames"
        description="Thermal performance, lifecycle cost, condensation risk, and passive house suitability compared. Why pultruded fiberglass frames outperform even premium thermally-broken aluminum on every metric that matters to energy code compliance."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "FRP vs Aluminum Windows" },
        ]}
      />
      <PageNav items={[{ id: "short-answer", label: "Short answer" }, { id: "property-comparison", label: "Comparison" }, { id: "thermal-performance", label: "Thermal performance" }, { id: "where-aluminum-still-wins", label: "Where aluminum wins" }, { id: "faq", label: "FAQ" }, { id: "products", label: "Products" }]} />

      <PageSection id="short-answer" title="For passive house targets, an FRP frame reaches Uw 0.80 W/m²·K with standard triple glazing" tone="white">
        <p className="text-f16 leading-golden text-t2">
          Aluminum dominated commercial fenestration for 40 years because it combines high strength, long spans, low maintenance, and clean aesthetics. Those advantages still hold, but the energy-code floor moved. Most national codes now require whole-window Uw below 1.4 W/m²·K, and passive house targets 0.80. Aluminum reaches them only with deep polyamide thermal breaks, insulated cores or both. A pultruded FRP section reaches them without a thermal break, as our PHI-certified 90-series window does with triple glazing.
        </p>
        <p className="mt-[12px] text-f16 leading-golden text-t2">
          This page compares FRP and aluminum on the properties that drive specification decisions: frame Uf, thermal bridging ψ, thermal expansion, corrosion, cost and PHI certification. The values are typical ranges; use the certified or calculated values of the actual frame in your design.
        </p>
        <div className="mt-[20px] max-w-[860px]">
          <Figure number={1} title="Heat through an aluminum and an FRP frame" caption="Same winter night, same glazing: only the frame material changes. Aluminum conducts heat about 500 times faster than pultruded FRP, so its interior face drops below the dew point while the FRP face stays warm and dry.">
            <HeatFlowFrameComparison bare />
          </Figure>
        </div>
      </PageSection>

      <PageSection id="property-comparison" title="Side-by-side: FRP vs aluminum window frames" tone="muted">
        <p className="text-f16 leading-golden text-t2">
          FRP values are typical of pultruded E-glass/polyester window profiles at 65 to 90 mm frame depths. Aluminum values reflect 6063-T6 with polyamide thermal breaks typical of premium commercial systems. Bold marks the properties where FRP materially outperforms aluminum.
        </p>
        <div className="relative mt-[20px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full border-collapse text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] text-left font-semibold text-t1">Property</th>
                <th scope="col" className="px-[14px] py-[8px] text-left font-semibold text-t1">Unit</th>
                <th scope="col" className="bg-teal-bg2 px-[14px] py-[8px] text-left font-semibold text-teal-text">Pultruded FRP</th>
                <th scope="col" className="px-[14px] py-[8px] text-left font-semibold text-t1">Thermally broken aluminum</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row) => (
                <tr
                  key={row.property}
                  className="border-b border-border-default align-top last:border-b-0"
                >
                  <th scope="row" className="px-[14px] py-[10px] text-left font-semibold text-t1">{row.property}</th>
                  <td className="px-[14px] py-[10px] text-t3">{row.unit ?? "—"}</td>
                  <td className={`bg-teal-bg px-[14px] py-[10px] ${row.frpBetter ? "font-semibold text-t1" : "text-t2"}`}>
                    {row.frp}
                  </td>
                  <td className="px-[14px] py-[10px] text-t2">{row.aluminum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="thermal-performance" title="A 500-fold difference in conductivity" tone="white">
        <p className="text-f16 leading-golden text-t2">
          Aluminum conducts heat at 160–200 W/m·K. Pultruded FRP conducts at 0.3–0.5 W/m·K. Everything else (thermal breaks, chamber geometries, spacer upgrades) is engineering effort directed at narrowing a 500× gap that the base material imposes. FRP starts with the gap already closed.
        </p>
        <p className="mt-[12px] text-f16 leading-golden text-t2">
          For a 1230 × 1480 mm triple-glazed window (Ug = 0.6), the whole-window Uw calculation per EN ISO 10077-1 gives Uw ≈ 1.05 W/m²·K with a 70 mm thermally broken aluminum frame and Uw ≈ 0.72 W/m²·K with an F1 Composite 90-series FRP frame. The aluminum window misses the PHI 0.80 limit; the FRP window meets it.
        </p>
        <p className="mt-[12px] text-f16 leading-golden text-t2">
          Try the calculation yourself with real dimensions and frame properties: our <Link href="/technology/frp-u-value-calculator" className="text-teal-text hover:underline">U-value calculator</Link> implements the EN ISO 10077-1 method.
        </p>
      </PageSection>

      <PageSection id="where-aluminum-still-wins" title="Large spans and fully recyclable systems" tone="muted">
        <p className="text-f16 leading-golden text-t2">
          This page argues FRP is better for energy-focused projects, but aluminum remains the right choice in three contexts. <strong className="text-t1">Large spans:</strong> aluminum&apos;s higher elastic modulus (69 GPa vs FRP&apos;s 23–28 GPa) allows longer clear-span mullions on curtain walls above 3 m without intermediate supports. <strong className="text-t1">End-of-life recyclability:</strong> aluminum recycles infinitely at ~5% of primary production energy; thermoset FRP does not. <strong className="text-t1">Tight budget, mild climate:</strong> if Uw = 1.4 W/m²·K is sufficient, a standard thermally-broken aluminum system is lower first-cost.
        </p>
        <p className="mt-[12px] text-f16 leading-golden text-t2">
          For residential and commercial envelopes targeting Uw ≤ 1.0 W/m²·K, where condensation, corrosion or thermal bridging drive the design, FRP is the stronger choice.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <PageSection id="products" title="FRP windows and doors from F1 Composite" tone="muted" intro="Nine casement, tilt-and-turn and sliding series from 50 to 140 mm, with the 90 series PHI-certified as a component. Buy profiles to fabricate or finished units.">
        <ul className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
            <li>
              <CoverCard href="/products/window-door-profiles" cover={productCovers["/products/window-door-profiles"]} title="Window and door profiles" text="Frame, sash and mullion sections with agreed accessories, for local fabrication." action="Explore profile systems" sizes="(max-width: 767px) 94vw, 46vw" />
            </li>
            <li>
              <CoverCard href="/products/fiberglass-windows-doors" cover={productCovers["/products/fiberglass-windows-doors"]} title="Finished windows and doors" text="Units built to your window schedule, with the glass, hardware and delivery agreed." action="Explore finished units" sizes="(max-width: 767px) 94vw, 46vw" />
            </li>
        </ul>
        <div className="mt-[16px]">
        <CalculatorCTA
          href="/technology/frp-u-value-calculator#frame=alu-break&glass=tg-ar&spacer=warm-basic&type=casement&w=1200&h=1400"
          eyebrow="Free tool · aluminum vs FRP"
          title="Compare your aluminum window against FRP"
          sub="Opens the U-value calculator on a thermally-broken aluminum frame: swap to an F1 FRP frame on the same glazing and watch the whole-window Uw drop, per EN ISO 10077-1."
        />
        </div>
      </PageSection>

      <RelatedLinks background="white"
        groups={[
          {
            title: "FRP fenestration products",
            links: [
              { href: "/products/frp-window-frames", label: "FRP windows and doors, 50–140 mm" },
              { href: "/products/window-door-profiles", label: "Window & door profiles for fabricators" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded window profiles" },
              { href: "/technology/frp-u-value-calculator", label: "U-value calculator (EN ISO 10077-1)" },
              { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion windows (GFRP-PU)" },
              { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC window frames" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum, concrete" },
            ],
          },
          {
            title: "Passive house & projects",
            links: [
              { href: "/industries/construction", label: "Construction & building envelopes" },
              { href: "/ai/passive-house", label: "Passive House window selector (AI)" },
              { href: "/case-studies/wanhua-yantai-zero-carbon-windows", label: "Case: Wanhua Yantai zero-carbon dormitories" },
              { href: "/case-studies/qinling-station-antarctic-passive-windows", label: "Case: Qinling Station, Antarctica" },
              { href: "/case-studies/yancheng-talent-apartment-fenestration", label: "Case: Yancheng coastal residential" },
            ],
          },
          {
            title: "Deeper reading",
            links: [
              { href: "/resources/blog/frp-fenestration-passivhaus-certification", label: "Blog: Passivhaus certification path" },
              { href: "/resources/blog/frp-fenestration-thermal-performance", label: "Blog: thermal performance of FRP window frames" },
              { href: "/resources/blog/pultruded-thermal-break-profiles-aluminum-windows", label: "Blog: GFRP vs polyamide thermal breaks in aluminum windows" },
              { href: "/resources/frp-windows-guide", label: "FRP Windows Guide — complete buyer library" },
              { href: "/what-is-frp", label: "What is FRP? Material and properties guide" },
              { href: "/resources/design-guides", label: "Fenestration design guides" },
              { href: "/resources/downloads", label: "PHI certificates & data sheets" },
            ],
          },
        ]}
      />



      <InnerCTA title="Specifying windows for a passive house or net-zero project?" />
    </>
  );
}
