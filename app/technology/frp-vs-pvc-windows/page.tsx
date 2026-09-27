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
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "FRP vs PVC Windows: Thermal, Durability, Structural";
const pageDescription =
  "FRP vs uPVC window frames: U-value, thermal expansion, structural reinforcement, UV stability, fire performance, and matching applications. When to choose each.";
const pagePath = "/technology/frp-vs-pvc-windows";
const publishedAt = "2026-04-15";
const updatedAt = "2026-04-15";
const referencedStandards = ["EN ISO 10077-1", "EN 12608", "EN 13501-1", "BS 7412", "ASTM D4216"];

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
  pvc: string;
  frpBetter?: boolean;
}

const comparisonData: CompRow[] = [
  { property: "Frame Uf (70mm, no reinforcement)", unit: "W/m²·K", frp: "0.95 – 1.2", pvc: "1.3 – 1.7", frpBetter: true },
  { property: "Frame Uf (with steel reinforcement)", unit: "W/m²·K", frp: "N/A: none needed", pvc: "1.5 – 2.1 (steel bridge)", frpBetter: true },
  { property: "Thermal Conductivity", unit: "W/m·K", frp: "0.3 – 0.5", pvc: "0.17" },
  { property: "Tensile Strength", unit: "MPa", frp: "240 – 400", pvc: "40 – 55", frpBetter: true },
  { property: "Elastic Modulus", unit: "GPa", frp: "20 – 28", pvc: "2.4 – 3.5", frpBetter: true },
  { property: "Requires Steel Reinforcement", frp: "No: structural alone", pvc: "Yes, above 1.2m span", frpBetter: true },
  { property: "Coefficient of Thermal Expansion", unit: "10⁻⁶/K", frp: "8 – 10 (matches glass)", pvc: "60 – 80 (8× glass)", frpBetter: true },
  { property: "Max Frame Color Surface Temp", unit: "°C before warping", frp: "180+ (unchanged)", pvc: "60 – 70 (dark colors warp)", frpBetter: true },
  { property: "UV stability", frp: "Stable with a UV-stabilized resin and coating", pvc: "Yellowing, chalking, embrittlement", frpBetter: true },
  { property: "Fire Reaction (EN 13501-1)", frp: "Class B-s1,d0 (with FR resin)", pvc: "Class B / C with toxic HCl emission" },
  { property: "Fire Smoke Toxicity", frp: "Low-toxicity", pvc: "Releases HCl: toxic at low concentration" },
  { property: "Dimensional Stability", frp: "Excellent (low CTE, high stiffness)", pvc: "Sag above 2m, thermal creep" },
  { property: "Recyclability", frp: "Limited (thermoset)", pvc: "Recyclable 5–7 times" },
  { property: "Initial Cost", frp: "Moderate–high", pvc: "Lowest", frpBetter: false },
];

const faqs = [
  {
    question: "Is FRP genuinely more thermally insulating than PVC?",
    answer:
      "At the material level, PVC has slightly lower thermal conductivity (0.17 W/m·K) than FRP (0.3–0.5 W/m·K). But window frame performance is driven by cross-section geometry and reinforcement. PVC frames above 1.2 m span must be reinforced with steel inserts to carry the glass load, and that steel creates a thermal bridge that raises the effective Uf to 1.5–2.1 W/m²·K. FRP has 10× the elastic modulus and carries the same loads without any reinforcement, so the finished frame Uf is typically 0.95–1.2 W/m²·K. For any window larger than a kitchen casement, FRP delivers lower Uf in practice.",
  },
  {
    question: "Why does PVC need steel reinforcement but FRP does not?",
    answer:
      "PVC elastic modulus is 2.4–3.5 GPa, about 1/10 that of pultruded FRP. Under glass dead load and wind load, unreinforced PVC sash or mullion profiles deflect well beyond code limits above roughly 1.2 m span. PVC system manufacturers insert U-shaped or rectangular galvanized steel reinforcement inside the hollow chamber to restore stiffness. That steel works structurally but creates a continuous cold bridge through the frame. FRP at 20–28 GPa modulus carries the same loads at the same section depth without reinforcement.",
  },
  {
    question: "How does dark-color or south-facing performance compare?",
    answer:
      "PVC softens around 60–70°C. Dark-color PVC frames on south-facing elevations in hot climates can reach 70–85°C in direct sun, causing visible warping, sash binding, and sealant failure. Most PVC window warranties explicitly exclude dark colors or south-facing installations. Pultruded FRP carries a heat distortion temperature above 180°C with standard polyester resin and retains full properties to 120°C continuous: dark colors on any elevation are fine. This matters for commercial curtain walls, villa architecture with dark-bronze aesthetics, and hot-climate markets.",
  },
  {
    question: "What is the lifecycle difference between FRP and PVC windows?",
    answer:
      "Quality uPVC window frames in moderate climates last 30–40 years before UV-induced embrittlement, sealant degradation, or dimensional creep forces replacement. Pultruded FRP frames do not embrittle under UV in the same way and keep their stiffness in heat, so they are expected to outlast uPVC; confirm the design life for your exposure with the system supplier. Life-cycle cost (LCC) analysis at a 60-year building horizon typically shows FRP is 20–35% lower total cost because PVC requires one full replacement cycle while FRP does not.",
  },
  {
    question: "Is PVC still the right choice for any project?",
    answer:
      "Yes: PVC remains the lowest first-cost option and the right choice for budget-driven residential retrofit, low-rise housing in mild climates, and projects where 30-year design life is acceptable. Modern triple-chamber uPVC can reach Uw below 1.0 W/m²·K with proper glazing. For those projects PVC's price advantage is real. FRP becomes the better choice when the project requires passive-house Uw ≤ 0.80, dark colors or south-facing elevations, spans above 2 m, fire performance without toxic HCl emission, or a longer design life than PVC is usually specified for.",
  },
  {
    question: "How do FRP and PVC compare on fire safety?",
    answer:
      "Pultruded FRP with fire-retardant resin achieves EN 13501-1 Class B-s1, d0: low smoke, no flaming droplets. PVC reaches Class B or C depending on formulation, but its combustion products include hydrogen chloride (HCl), which is acutely toxic at 100 ppm and fatal at 2000 ppm. For commercial buildings, high-rise residential, schools, and hospitals, fire codes increasingly scrutinize HCl emission; several jurisdictions have restricted PVC window use in fire-critical applications. FRP avoids the HCl issue entirely.",
  },
];

export default function FrpVsPvcWindowsPage() {
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
      { "@type": "Thing", name: "PVC uPVC window frames" },
      { "@type": "Thing", name: "Thermal transmittance U-value" },
      { "@type": "Thing", name: "Fenestration design" },
    ],
    citation: referencedStandards,
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <PageHeader
        tag="Material Comparison"
        title="FRP vs PVC Window Frames"
        description="Thermal performance, structural capacity, UV stability, dimensional stability, and fire safety compared. When PVC is genuinely the right choice, and when only pultruded FRP meets the requirement."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "FRP vs PVC Windows" },
        ]}
      />
      <PageNav items={[{ id: "short-answer", label: "Short answer" }, { id: "property-comparison", label: "Comparison" }, { id: "when-to-choose-each", label: "When to choose each" }, { id: "try-the-calculation", label: "Calculation" }, { id: "faq", label: "FAQ" }, { id: "products", label: "Products" }]} />

      <PageSection id="short-answer" title="PVC wins on cost; FRP wins on everything related to long-term performance" tone="white">
        <p className="text-f16 leading-golden text-t2">
          uPVC remains the lowest first-cost window frame material and is the right specification for budget-sensitive residential retrofit and small windows in mild climates. Three technical limits cap its performance: the frame needs internal steel reinforcement above about 1.2 m span, dark colors warp on sun-exposed elevations, and UV embrittlement shortens service life to roughly 30 years. Pultruded FRP removes all three constraints (it needs no reinforcement, takes any color and does not embrittle in UV) while adding passive-house-class thermal performance and cleaner fire behavior.
        </p>
        <p className="mt-[12px] text-f16 leading-golden text-t2">
          This page compares FRP and PVC across 15 properties that drive specification. The verdict is context-dependent: for small casements in mild climates PVC is genuinely competitive; for windows that are large, dark-colored, south-facing or expected to outlast a typical PVC design life, FRP is the stronger choice.
        </p>
      </PageSection>

      <PageSection id="property-comparison" title="Side-by-side: FRP vs uPVC window frames" tone="muted">
        <p className="text-f16 leading-golden text-t2">
          FRP values are typical of pultruded E-glass/polyester window profiles at 65 to 90 mm frame depths. PVC values reflect premium triple-chamber uPVC systems typical of leading European manufacturers, steel-reinforced where required by span. Bold marks the properties where FRP materially outperforms PVC.
        </p>
        <div className="relative mt-[20px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full border-collapse text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] text-left font-semibold text-t1">Property</th>
                <th scope="col" className="px-[14px] py-[8px] text-left font-semibold text-t1">Unit</th>
                <th scope="col" className="bg-teal-bg2 px-[14px] py-[8px] text-left font-semibold text-teal-text">Pultruded FRP</th>
                <th scope="col" className="px-[14px] py-[8px] text-left font-semibold text-t1">uPVC (triple-chamber)</th>
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
                  <td className="px-[14px] py-[10px] text-t2">{row.pvc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="when-to-choose-each" title="A decision framework by project type" tone="white">
        <div className="grid gap-[32px] md:grid-cols-2">
          <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
            <h3 className="text-f18 font-bold text-t1">Choose PVC when</h3>
            <ul className="mt-[12px] space-y-[8px] text-f16 leading-golden text-t2">
              <li>• First-cost is the dominant project driver</li>
              <li>• Windows are under 1.2 m span and white/light-beige</li>
              <li>• Climate is moderate (no extreme heat or cold)</li>
              <li>• 30-year design life is acceptable</li>
              <li>• Recyclability matters to the project LCA</li>
              <li>• Uw target is 1.0–1.4 W/m²·K (standard energy code)</li>
            </ul>
          </div>
          <div className="rounded-card border border-teal-border bg-teal-bg p-[20px]">
            <h3 className="text-f18 font-bold text-t1">Choose FRP when</h3>
            <ul className="mt-[12px] space-y-[8px] text-f16 leading-golden text-t2">
              <li>• Passive house certification (Uw ≤ 0.80)</li>
              <li>• Windows over 1.5 m span without visible reinforcement</li>
              <li>• Dark colors or south/west solar exposure</li>
              <li>• Hot climates (Uf ambient &gt; 40°C)</li>
              <li>• Long building design life</li>
              <li>• Fire safety with low smoke toxicity required</li>
              <li>• Coastal or high-UV climate (30+ years UV stable)</li>
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection id="try-the-calculation" title="Compare Uw across FRP, PVC, and aluminum frames on your specific window size" tone="muted">
        <p className="text-f16 leading-golden text-t2">
          Whole-window U-value depends on frame material, glazing configuration, spacer, and dimensions. Our <Link href="/technology/frp-u-value-calculator" className="text-teal-text hover:underline">U-value calculator</Link> implements EN ISO 10077-1 and lets you swap frame materials on the same window to see the Uw delta. For a typical 1230 × 1480 mm triple-glazed window, FRP 90-series typically delivers Uw ≈ 0.72 W/m²·K vs PVC steel-reinforced ≈ 1.10 W/m²·K: a 35% reduction in heat loss for the same glazing package.
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
          href="/technology/frp-u-value-calculator#frame=pvc-multi&glass=tg-ar&spacer=warm-basic&type=casement&w=1200&h=1400"
          eyebrow="Free tool · PVC vs FRP"
          title="Compare your PVC window against FRP"
          sub="Opens the U-value calculator on a multi-chamber PVC frame: switch to an F1 FRP frame on the same glazing to see the whole-window Uw delta, with no steel reinforcement needed at large sizes."
        />
        </div>
      </PageSection>

      <RelatedLinks background="white"
        groups={[
          {
            title: "FRP fenestration products",
            links: [
              { href: "/products/frp-window-frames", label: "Fiberglass windows and doors, 50–140 mm" },
              { href: "/products/window-door-profiles", label: "Window & door profiles for fabricators" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded window profiles" },
              { href: "/technology/frp-u-value-calculator", label: "U-value calculator (EN ISO 10077-1)" },
              { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion windows (GFRP-PU)" },
              { href: "/products/frp-window-reinforcement", label: "Fiberglass window reinforcements (steel replacement)" },
              { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum window frames" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminum, concrete" },
            ],
          },
          {
            title: "Applications & projects",
            links: [
              { href: "/industries/construction", label: "Construction & building envelopes" },
              { href: "/ai/passive-house", label: "Passive House window selector (AI)" },
              { href: "/case-studies/wanhua-yantai-zero-carbon-windows", label: "Case: Wanhua Yantai zero-carbon dormitories" },
              { href: "/case-studies/yancheng-talent-apartment-fenestration", label: "Case: Yancheng coastal residential" },
              { href: "/case-studies/qinling-station-antarctic-passive-windows", label: "Case: Qinling Station, Antarctica" },
            ],
          },
          {
            title: "Deeper reading",
            links: [
              { href: "/resources/blog/frp-fenestration-thermal-performance", label: "Blog: Thermal performance of FRP fenestration" },
              { href: "/resources/blog/frp-fenestration-passivhaus-certification", label: "Blog: Passivhaus certification path" },
              { href: "/resources/blog/frp-window-profiles-powder-coating-aluminum-finish", label: "Blog: FRP with aluminum-look finish" },
              { href: "/what-is-frp", label: "FRP material and properties guide" },
              { href: "/resources/design-guides", label: "Fenestration design guides" },
              { href: "/resources/downloads", label: "Data sheets & certificates" },
            ],
          },
        ]}
      />



      <InnerCTA title="Selecting window frames for a passive house, commercial, or premium residential project?" />
    </>
  );
}
