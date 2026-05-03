import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "FRP vs Aluminum Window Frames — Thermal Performance, Cost, and PHI Suitability";
const pageDescription =
  "FRP vs aluminum window frames: U-value, thermal bridging, condensation, lifecycle cost, and passive house certification compared. Why pultruded fiberglass frames outperform thermally-broken aluminum.";
const pagePath = "/technology/frp-vs-aluminum-windows";
const publishedAt = "2026-04-15";
const updatedAt = "2026-04-15";
const authorName = "F1 Composite Fenestration Engineering Team";
const authorRole = "Window system design, U-value modeling, and passive house certification specialists";
const reviewedBy = "Technical Applications Group";
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
  { property: "Frame Uf (70mm section)", unit: "W/m²·K", frp: "0.85 – 1.2", aluminum: "1.8 – 2.4", frpBetter: true },
  { property: "Frame Uf (90mm passive section)", unit: "W/m²·K", frp: "0.78 – 0.95", aluminum: "1.4 – 1.8", frpBetter: true },
  { property: "Thermal Conductivity", unit: "W/m·K", frp: "0.3 – 0.5", aluminum: "160 – 200", frpBetter: true },
  { property: "Thermal Bridge at Frame", unit: "ψ, W/m·K", frp: "≈ 0.035 (warm-edge)", aluminum: "0.06 – 0.11", frpBetter: true },
  { property: "Coefficient of Thermal Expansion", unit: "10⁻⁶/K", frp: "8 – 10 (matches glass)", aluminum: "23 – 24 (3× glass)", frpBetter: true },
  { property: "Condensation Risk (fRsi ≥ 0.7)", frp: "Passes at -20°C exterior", aluminum: "Fails in cold climates without additional break", frpBetter: true },
  { property: "Tensile Strength (longitudinal)", unit: "MPa", frp: "240 – 400", aluminum: "240 – 310 (6063-T6)" },
  { property: "Density", unit: "g/cm³", frp: "1.9", aluminum: "2.7" },
  { property: "Corrosion Resistance", frp: "Immune to salt, chloride, sulfur", aluminum: "Pitting in coastal and industrial atmospheres", frpBetter: true },
  { property: "Passive House Certified", frp: "Yes — 90-series PHI certified", aluminum: "Few products certified, require complex breaks", frpBetter: true },
  { property: "Typical Service Life", unit: "years", frp: "50 – 75", aluminum: "30 – 50", frpBetter: true },
  { property: "Recyclability", frp: "Limited (thermoset)", aluminum: "Excellent (infinite loop)" },
  { property: "Embodied CO₂", unit: "kg CO₂/kg", frp: "3.1 – 5.0", aluminum: "8.0 – 12.0 (primary)", frpBetter: true },
];

const faqs = [
  {
    question: "Can aluminum window frames match FRP on U-value?",
    answer:
      "Standard thermally-broken aluminum frames rarely reach Uf below 1.4 W/m²·K. Premium polyamide-broken aluminum systems achieve Uf around 1.1 W/m²·K at significant cost premium. Pultruded FRP 90-series frames deliver Uf of 0.85 W/m²·K without any thermal break assembly because FRP is inherently 500× less conductive than aluminum. For Uw ≤ 0.80 W/m²·K (PHI passive house target), FRP is the only mainstream frame material that consistently meets the limit at residential window sizes.",
  },
  {
    question: "Why does thermal bridging favor FRP so strongly?",
    answer:
      "Aluminum conducts heat at 160–200 W/m·K — roughly 500× more than pultruded FRP's 0.3–0.5 W/m·K. Even with a polyamide thermal break, aluminum frames still create a linear thermal bridge of 0.06–0.11 W/m·K at the frame-to-glass junction. FRP frames paired with warm-edge spacers deliver ψ ≈ 0.035 W/m·K. On a typical 1.5 m² window, this difference alone shifts Uw by 0.15–0.25 W/m²·K — enough to fail passive house certification.",
  },
  {
    question: "Is FRP more expensive than aluminum for window frames?",
    answer:
      "At bare frame cost, FRP and premium thermally-broken aluminum systems are comparable — FRP is typically 10–20% higher per linear meter. Over a 30-year service life the economics reverse: FRP requires no painting, no break-assembly maintenance, and no gasket replacement from thermal cycling stress. Lifecycle cost analysis for passive house residential projects shows FRP at 15–25% lower total cost when reduced HVAC sizing (from lower Uw) is included.",
  },
  {
    question: "How does FRP handle thermal expansion compared to aluminum?",
    answer:
      "The coefficient of thermal expansion (CTE) of FRP is 8–10 × 10⁻⁶/K, essentially matching glass at 8 × 10⁻⁶/K. Aluminum expands at 23–24 × 10⁻⁶/K — three times faster than glass. Over a 2 m long window, aluminum grows 1.4 mm more than the glass across a 30°C temperature swing, cycling this stress into the perimeter sealant every day. Seal failures and fogging between panes are common aluminum-frame failure modes; FRP eliminates the cyclic stress source entirely.",
  },
  {
    question: "Do FRP frames work in both hot and cold climates?",
    answer:
      "Yes. FRP window frames perform across the full climate range from -50°C to +80°C without any change in thermal or structural behavior. The low thermal conductivity reduces heat loss in cold climates and heat gain in hot climates equally. In tropical coastal projects, FRP additionally solves the aluminum pitting-corrosion problem that typically drives aluminum frame replacement in 15–20 years.",
  },
  {
    question: "What certifications does F1 Composite hold for window frames?",
    answer:
      "F1 Composite 90-series FRP fenestration profiles are certified by the Passive House Institute (PHI) with Uf = 0.78 W/m²·K. Additional certifications include ISO 9001:2015 quality management, EN 14024 for thermally insulated profiles, and project-specific fire testing to EN 13501-1 Class B-s1,d0. Test certificates from accredited third-party laboratories accompany all export shipments.",
  },
];

export default function FrpVsAluminumWindowsPage() {
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
      { "@type": "Thing", name: "Thermally broken aluminum window frames" },
      { "@type": "Thing", name: "Whole-window U-value (Uw)" },
      { "@type": "Thing", name: "Passive house fenestration" },
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
        title="FRP vs Aluminum Window Frames"
        description="Thermal performance, lifecycle cost, condensation risk, and passive house suitability compared. Why pultruded fiberglass frames outperform even premium thermally-broken aluminum on every metric that matters to energy code compliance."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "FRP vs Aluminum Windows" },
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
            For passive house and net-zero buildings, FRP is the only mainstream frame that meets Uw ≤ 0.80 W/m²·K without extraordinary glazing
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Aluminum dominated commercial fenestration for 40 years because it combines high strength, long spans, low maintenance, and clean aesthetics. Those advantages still hold — but the energy-code floor moved. Most national codes now require whole-window Uw below 1.4 W/m²·K, and passive house targets 0.80. Aluminum cannot reach either limit without elaborate polyamide thermal breaks, oversized glazing cavities, or both. Pultruded FRP reaches them with a monolithic section and standard triple glazing.
          </p>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            This page compares FRP and aluminum across the 13 properties that actually drive specification decisions: frame Uf, thermal bridging ψ, coefficient of thermal expansion, condensation resistance, corrosion resistance, lifecycle cost, and PHI certifiability. Every number is sourced from EN ISO 10077-1 calculations, manufacturer datasheets, or third-party certification test reports.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Property Comparison</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Side-by-side: FRP vs aluminum window frames
          </h2>
          <p className="mt-[13px] max-w-[800px] text-f15 leading-golden text-t2">
            FRP values reflect pultruded E-glass/polyester profiles in F1 Composite 65/70/80/90-series fenestration geometries. Aluminum values reflect 6063-T6 with polyamide thermal breaks typical of premium commercial systems. Highlighted rows show properties where FRP materially outperforms aluminum.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-border-default bg-bg2">
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Property</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Unit</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Pultruded FRP</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Thermally-Broken Aluminum</th>
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
                    <td className="px-[13px] py-[13px] text-t2">{row.aluminum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[960px] px-[34px]">
          <SectionTag>Why FRP Wins on Thermal Performance</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            The 500× conductivity gap is the whole story
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Aluminum conducts heat at 160–200 W/m·K. Pultruded FRP conducts at 0.3–0.5 W/m·K. Everything else — thermal breaks, chamber geometries, spacer upgrades — is engineering effort directed at narrowing a 500× gap that the base material imposes. FRP starts with the gap already closed.
          </p>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            For a 1230 × 1480 mm triple-glazed window (Ug = 0.6), the whole-window Uw calculation per EN ISO 10077-1 produces Uw ≈ 1.05 W/m²·K with a 70 mm thermally-broken aluminum frame, versus Uw ≈ 0.72 W/m²·K with an F1 Composite 90-series FRP frame. The aluminum window fails the PHI 0.80 limit by 31%; the FRP window passes with 10% margin.
          </p>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            Try the calculation yourself with real dimensions and frame properties — our <Link href="/technology/u-value-calculator" className="text-teal-text hover:underline">U-value calculator</Link> implements the EN ISO 10077-1 method.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[960px] px-[34px]">
          <SectionTag>Where Aluminum Still Wins</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Large spans and fully recyclable systems
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            This page argues FRP is better for energy-focused projects — but aluminum remains the right choice in three contexts. <strong className="text-t1">Large spans:</strong> aluminum&apos;s higher elastic modulus (69 GPa vs FRP&apos;s 23–28 GPa) allows longer clear-span mullions on curtain walls above 3 m without intermediate supports. <strong className="text-t1">End-of-life recyclability:</strong> aluminum recycles infinitely at ~5% of primary production energy; thermoset FRP does not. <strong className="text-t1">Tight budget, mild climate:</strong> if Uw = 1.4 W/m²·K is sufficient, a standard thermally-broken aluminum system is lower first-cost.
          </p>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            For residential and commercial envelopes targeting Uw ≤ 1.0 W/m²·K in climates where condensation, corrosion, or thermal bridging are design drivers, FRP wins decisively.
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

      <RelatedLinks
        groups={[
          {
            title: "FRP fenestration products",
            links: [
              { href: "/products/fenestration-systems", label: "FRP fenestration systems (65/70/80/90/140)" },
              { href: "/products/custom-pultrusions", label: "Custom pultruded window profiles" },
              { href: "/technology/u-value-calculator", label: "U-value calculator (EN ISO 10077-1)" },
              { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC window frames" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel, aluminium, concrete" },
            ],
          },
          {
            title: "Passive house & projects",
            links: [
              { href: "/industries/construction", label: "Construction & building envelopes" },
              { href: "/ai/passive-house", label: "Passive House window selector (AI)" },
              { href: "/case-studies/fenestration-residential", label: "Case: German PHI residential tower" },
              { href: "/case-studies/qinling-station-antarctic-passive-windows", label: "Case: Qinling Antarctic PHI A+ windows" },
              { href: "/case-studies/yancheng-talent-apartment-fenestration", label: "Case: Yancheng coastal residential" },
            ],
          },
          {
            title: "Deeper reading",
            links: [
              { href: "/resources/blog/frp-vs-aluminium-window-frames-comparison", label: "Blog: FRP vs aluminium deep dive" },
              { href: "/resources/blog/frp-fenestration-passivhaus-certification", label: "Blog: Passivhaus certification path" },
              { href: "/resources/blog/frp-fenestration-thermal-performance", label: "Blog: FRP fenestration thermal performance" },
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
