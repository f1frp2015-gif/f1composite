import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "FRP vs PVC Window Frames — Thermal Performance, Durability, and Structural Capacity";
const pageDescription =
  "FRP vs PVC (uPVC) window frames compared: U-value, thermal expansion, structural reinforcement, UV stability, fire performance, and suitable applications. When to choose each.";
const pagePath = "/technology/frp-vs-pvc-windows";
const publishedAt = "2026-04-15";
const updatedAt = "2026-04-15";
const authorName = "F1 Composite Fenestration Engineering Team";
const authorRole = "Window system design, U-value modeling, and material selection specialists";
const reviewedBy = "Technical Applications Group";
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
  { property: "Frame Uf (with steel reinforcement)", unit: "W/m²·K", frp: "N/A — none needed", pvc: "1.5 – 2.1 (steel bridge)", frpBetter: true },
  { property: "Thermal Conductivity", unit: "W/m·K", frp: "0.3 – 0.5", pvc: "0.17" },
  { property: "Tensile Strength", unit: "MPa", frp: "240 – 400", pvc: "40 – 55", frpBetter: true },
  { property: "Elastic Modulus", unit: "GPa", frp: "20 – 28", pvc: "2.4 – 3.5", frpBetter: true },
  { property: "Requires Steel Reinforcement", frp: "No — structural alone", pvc: "Yes — above 1.2m span", frpBetter: true },
  { property: "Coefficient of Thermal Expansion", unit: "10⁻⁶/K", frp: "8 – 10 (matches glass)", pvc: "60 – 80 (8× glass)", frpBetter: true },
  { property: "Max Frame Color Surface Temp", unit: "°C before warping", frp: "180+ (unchanged)", pvc: "60 – 70 (dark colors warp)", frpBetter: true },
  { property: "UV Stability (30-year)", frp: "Negligible change with UV-stable resin", pvc: "Yellowing, chalking, embrittlement", frpBetter: true },
  { property: "Fire Reaction (EN 13501-1)", frp: "Class B-s1,d0 (with FR resin)", pvc: "Class B / C with toxic HCl emission" },
  { property: "Fire Smoke Toxicity", frp: "Low-toxicity", pvc: "Releases HCl — toxic at low concentration" },
  { property: "Dimensional Stability", frp: "Excellent (low CTE, high stiffness)", pvc: "Sag above 2m, thermal creep" },
  { property: "Typical Service Life", unit: "years", frp: "50 – 75", pvc: "25 – 40", frpBetter: true },
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
      "PVC elastic modulus is 2.4–3.5 GPa — about 1/10 that of pultruded FRP. Under glass dead load and wind load, unreinforced PVC sash or mullion profiles deflect well beyond code limits above roughly 1.2 m span. PVC system manufacturers insert U-shaped or rectangular galvanized steel reinforcement inside the hollow chamber to restore stiffness. That steel works structurally but creates a continuous cold bridge through the frame. FRP at 20–28 GPa modulus carries the same loads at the same section depth without reinforcement.",
  },
  {
    question: "How does dark-color or south-facing performance compare?",
    answer:
      "PVC softens around 60–70°C. Dark-color PVC frames on south-facing elevations in hot climates can reach 70–85°C in direct sun, causing visible warping, sash binding, and sealant failure. Most PVC window warranties explicitly exclude dark colors or south-facing installations. Pultruded FRP carries a heat distortion temperature above 180°C with standard polyester resin and retains full properties to 120°C continuous — dark colors on any elevation are fine. This matters for commercial curtain walls, villa architecture with dark-bronze aesthetics, and hot-climate markets.",
  },
  {
    question: "What is the lifecycle difference between FRP and PVC windows?",
    answer:
      "Quality uPVC window frames in moderate climates last 30–40 years before UV-induced embrittlement, sealant degradation, or dimensional creep forces replacement. Pultruded FRP frames carry 50–75 year design life under the same conditions, with negligible change in U-value or mechanical properties over the service period. Life-cycle cost (LCC) analysis at a 60-year building horizon typically shows FRP is 20–35% lower total cost because PVC requires one full replacement cycle while FRP does not.",
  },
  {
    question: "Is PVC still the right choice for any project?",
    answer:
      "Yes — PVC remains the lowest first-cost option and the right choice for budget-driven residential retrofit, low-rise housing in mild climates, and projects where 30-year design life is acceptable. Modern triple-chamber uPVC can reach Uw below 1.0 W/m²·K with proper glazing. For those projects PVC's price advantage is real. FRP becomes the better choice when the project requires passive-house Uw ≤ 0.80, dark colors or south-facing elevations, spans above 2 m, fire performance without toxic HCl emission, or 50+ year design life.",
  },
  {
    question: "How do FRP and PVC compare on fire safety?",
    answer:
      "Pultruded FRP with fire-retardant resin achieves EN 13501-1 Class B-s1, d0 — low smoke, no flaming droplets. PVC reaches Class B or C depending on formulation, but its combustion products include hydrogen chloride (HCl), which is acutely toxic at 100 ppm and fatal at 2000 ppm. For commercial buildings, high-rise residential, schools, and hospitals, fire codes increasingly scrutinize HCl emission; several jurisdictions have restricted PVC window use in fire-critical applications. FRP avoids the HCl issue entirely.",
  },
];

export default function FrpVsPvcWindowsPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pageTitle,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@type": "Organization", name: authorName },
    editor: { "@type": "Organization", name: reviewedBy },
    publisher: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/f1-logo.png") },
    },
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={faqSchema} />
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

      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName={authorName}
        authorRole={authorRole}
        reviewedBy={reviewedBy}
        standards={referencedStandards}
      />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[960px] px-[34px]">
          <SectionTag>The Short Answer</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            PVC wins on cost; FRP wins on everything related to long-term performance
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            uPVC remains the lowest first-cost window frame material and is the right specification for budget-sensitive residential retrofit and small windows in mild climates. Three technical limits cap its performance: the frame needs internal steel reinforcement above about 1.2 m span, dark colors warp on sun-exposed elevations, and UV embrittlement shortens service life to roughly 30 years. Pultruded FRP removes all three constraints — no reinforcement, full color freedom, 50+ year service life — while adding passive-house-class thermal performance and cleaner fire behavior.
          </p>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            This page compares FRP and PVC across 15 properties that drive specification. The verdict is context-dependent: for small casements in mild climates PVC is genuinely competitive; for any window that is large, dark-colored, south-facing, or required to last 50+ years, FRP is the only material that delivers.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Property Comparison</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Side-by-side: FRP vs uPVC window frames
          </h2>
          <p className="mt-[13px] max-w-[800px] text-f15 leading-golden text-t2">
            FRP values reflect pultruded E-glass/polyester profiles in F1 Composite 65/70/80/90-series fenestration geometries. PVC values reflect premium triple-chamber uPVC systems typical of leading European manufacturers, steel-reinforced where required by span. Highlighted rows show properties where FRP materially outperforms PVC.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-border-default bg-bg2">
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Property</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Unit</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Pultruded FRP</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">uPVC (triple-chamber)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr
                    key={row.property}
                    className={`border-b border-border-default ${row.frpBetter ? "bg-teal/5" : ""}`}
                  >
                    <td className="px-[13px] py-[13px] font-medium text-t1">{row.property}</td>
                    <td className="px-[13px] py-[13px] text-t3">{row.unit ?? "—"}</td>
                    <td className={`px-[13px] py-[13px] ${row.frpBetter ? "font-semibold text-teal-text" : "text-t2"}`}>
                      {row.frp}
                    </td>
                    <td className="px-[13px] py-[13px] text-t2">{row.pvc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[960px] px-[34px]">
          <SectionTag>When to Choose Each</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            A decision framework by project type
          </h2>
          <div className="mt-[34px] grid gap-[34px] md:grid-cols-2">
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <h3 className="text-f19 font-bold text-t1">Choose PVC when</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li>• First-cost is the dominant project driver</li>
                <li>• Windows are under 1.2 m span and white/light-beige</li>
                <li>• Climate is moderate (no extreme heat or cold)</li>
                <li>• 30-year design life is acceptable</li>
                <li>• Recyclability matters to the project LCA</li>
                <li>• Uw target is 1.0–1.4 W/m²·K (standard energy code)</li>
              </ul>
            </div>
            <div className="rounded-[8px] border border-teal-border bg-teal/5 p-[21px]">
              <h3 className="text-f19 font-bold text-t1">Choose FRP when</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li>• Passive house certification (Uw ≤ 0.80)</li>
                <li>• Windows over 1.5 m span without visible reinforcement</li>
                <li>• Dark colors or south/west solar exposure</li>
                <li>• Hot climates (Uf ambient &gt; 40°C)</li>
                <li>• 50+ year building design life</li>
                <li>• Fire safety with low smoke toxicity required</li>
                <li>• Coastal or high-UV climate (30+ years UV stable)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[960px] px-[34px]">
          <SectionTag>Try the Calculation</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Compare Uw across FRP, PVC, and aluminum frames on your specific window size
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Whole-window U-value depends on frame material, glazing configuration, spacer, and dimensions. Our <Link href="/technology/u-value-calculator" className="text-teal-text hover:underline">U-value calculator</Link> implements EN ISO 10077-1 and lets you swap frame materials on the same window to see the Uw delta. For a typical 1230 × 1480 mm triple-glazed window, FRP 90-series typically delivers Uw ≈ 0.72 W/m²·K vs PVC steel-reinforced ≈ 1.10 W/m²·K — a 35% reduction in heat loss for the same glazing package.
          </p>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[960px] px-[34px]">
          <FAQ items={faqs} suppressSchema />
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px] text-center">
          <p className="text-f15 leading-golden text-t2">
            Explore the full F1 Composite FRP fenestration range — 65/70/80/90/140-series profiles, PHI certified 90-series, custom sections available.
          </p>
          <Link
            href="/products/fenestration-systems"
            className="mt-[21px] inline-block rounded-[8px] bg-teal px-[34px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
          >
            View Fenestration Systems →
          </Link>
        </div>
      </section>

      <InnerCTA title="Selecting window frames for a passive house, commercial, or premium residential project?" />
    </>
  );
}
