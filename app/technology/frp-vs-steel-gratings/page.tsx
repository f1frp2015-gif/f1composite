import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "FRP vs Steel Gratings — Corrosion, Weight, Slip Resistance, and Electrical Safety";
const pageDescription =
  "FRP vs steel gratings compared: load capacity, corrosion, weight, slip resistance, electrical conductivity, and lifecycle cost. Why pultruded and molded fiberglass gratings replace galvanized steel in corrosive environments.";
const pagePath = "/technology/frp-vs-steel-gratings";
const publishedAt = "2026-04-15";
const updatedAt = "2026-04-15";
const authorName = "F1 Composite Gratings Engineering Team";
const authorRole = "Platform design, load rating, and industrial walkway specialists";
const reviewedBy = "Technical Applications Group";
const referencedStandards = ["ASTM E2979", "ASTM F3125", "HSE UK Slip Resistance", "OSHA 1910.29", "IBC 1607.8"];

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
  steel: string;
  frpBetter?: boolean;
}

const comparisonData: CompRow[] = [
  { property: "Density (installed)", unit: "kg/m²", frp: "14 – 22 (38mm molded)", steel: "34 – 48 (25mm bar)", frpBetter: true },
  { property: "Load Capacity (30mm deep)", unit: "kN/m² UDL", frp: "≥ 500", steel: "≥ 500" },
  { property: "Concentrated Load (wheel)", unit: "kN", frp: "45 – 90 (pultruded)", steel: "90 – 180" },
  { property: "Corrosion Resistance", frp: "Immune to acids, alkalis, chlorides, saltwater", steel: "Coating-dependent; HDG fails 10–15 yr in aggressive environments", frpBetter: true },
  { property: "Electrical Conductivity", frp: "Non-conductive (insulator)", steel: "Fully conductive (fault current path)", frpBetter: true },
  { property: "Slip Resistance (wet)", unit: "PTV", frp: "≥ 55 (grit top)", steel: "25 – 40 (serrated)", frpBetter: true },
  { property: "Fire Rating", frp: "Class 1 flame spread (FR resin)", steel: "Non-combustible" },
  { property: "Installation Tools", frp: "Standard hand tools, no hot work permit", steel: "Cutting torch, welding, grinding", frpBetter: true },
  { property: "Lifecycle (coastal / industrial)", unit: "years", frp: "40 – 50", steel: "10 – 15 (before recoating)", frpBetter: true },
  { property: "Repaint / Re-galvanize Cost", frp: "None", steel: "$15 – $30 per m² every 10 yr", frpBetter: true },
  { property: "Spark Risk", frp: "Non-sparking (safe in ATEX zones)", steel: "Sparks on impact", frpBetter: true },
  { property: "Magnetic Interference", frp: "Non-magnetic", steel: "Ferromagnetic", frpBetter: true },
  { property: "Thermal Conductivity", unit: "W/m·K", frp: "0.3 – 0.5", steel: "50", frpBetter: true },
];

const faqs = [
  {
    question: "Can FRP gratings carry the same loads as steel bar gratings?",
    answer:
      "For uniform distributed loads up to 500 kN/m², FRP molded and pultruded gratings match standard steel bar gratings at comparable depths. For concentrated wheel loads above 90 kN, steel still leads — heavy forklifts and vehicle traffic may require either deeper FRP sections or hybrid FRP-over-steel panels. For pedestrian walkways, platforms, maintenance access, and light vehicle traffic (<45 kN wheel load), FRP is fully equivalent and often lighter-installed.",
  },
  {
    question: "Why do industrial facilities specify FRP over hot-dip galvanized steel?",
    answer:
      "Hot-dip galvanized steel typically survives 20–30 years in benign atmospheres but fails in 10–15 years under acid rain, coastal salt, chlorine, H₂S, or wash-down chemicals. Every recoating cycle costs $15–$30 per m² and disrupts operations. FRP is immune to the electrochemical corrosion mechanisms that attack steel — no coating to fail, no maintenance cycle. In water treatment, pulp and paper, chemical process, and coastal offshore applications, FRP lifecycle cost is typically 40–60% lower than galvanized steel over 30 years.",
  },
  {
    question: "Are FRP gratings safe around electrical equipment?",
    answer:
      "FRP gratings are electrical insulators — this is a safety advantage that steel gratings cannot offer. In substations, near transformers, or on electrified rail platforms, a metallic grating creates touch potential and step potential hazards during fault events. FRP eliminates both. Fault current cannot propagate through FRP, which also simplifies grounding requirements per NEC Article 392 and reduces arc-flash risk during cable insulation failures.",
  },
  {
    question: "How does slip resistance compare in wet conditions?",
    answer:
      "FRP gratings with factory-applied grit top surface achieve Pendulum Test Values (PTV) above 55 per HSE UK guidance — well above the 36 threshold for low-slip risk on wet surfaces. Serrated steel bar gratings typically PTV 25–40 when wet; smooth-top steel plates fall below PTV 20. For offshore platforms, wastewater plants, and any walkway exposed to rain or process water, FRP offers materially safer footing.",
  },
  {
    question: "Is FRP cost-competitive with steel on initial installed cost?",
    answer:
      "Per square meter of grating material, hot-dip galvanized steel is typically 30–50% less expensive than pultruded FRP. However, installed cost — including supporting structure, lifting equipment, hot-work permits, and labor — is often comparable because FRP weighs 60% less. A two-person crew can install FRP gratings with hand tools where steel requires a crane, welding rig, and permit. Total installed cost for chemical plant walkways typically runs within 5–15% of each other; over 30 years FRP wins on total cost of ownership by 40–60%.",
  },
  {
    question: "What grating types does F1 Composite manufacture?",
    answer:
      "F1 Composite manufactures both pultruded and molded FRP gratings. Pultruded gratings (38mm, 50mm depths) suit heavy-duty walkways and vehicle traffic. Molded gratings (25mm, 38mm, 50mm) with square-mesh 38×38mm or 50×50mm patterns suit platforms, mezzanines, stair treads, and trench covers. Solid-top, ventilated, and anti-slip grit surface finishes are all available. Standard resin is isophthalic polyester; vinyl ester is offered for aggressive chemical service.",
  },
];

export default function FrpVsSteelGratingsPage() {
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
      { "@type": "Thing", name: "Pultruded FRP gratings" },
      { "@type": "Thing", name: "Molded FRP gratings" },
      { "@type": "Thing", name: "Hot-dip galvanized steel bar gratings" },
      { "@type": "Thing", name: "Industrial walkway and platform design" },
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
        title="FRP vs Steel Gratings"
        description="Load capacity, corrosion resistance, weight, slip resistance, electrical safety, and lifecycle cost compared. Why fiberglass gratings have replaced galvanized steel across water treatment, chemical processing, offshore, and electrical infrastructure."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "FRP vs Steel Gratings" },
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
            For corrosive, electrical, or wet environments, FRP gratings outlast steel by 3–5× at comparable installed cost
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Steel bar gratings dominate industrial walkways for one reason: low material cost. In dry, non-corrosive, non-electrical environments with heavy vehicle traffic, that cost advantage wins. Everywhere else — chemical plants, wastewater, offshore platforms, coastal marinas, substations, food processing with wash-down — galvanized steel enters a 10–15 year recoating cycle that erases its initial savings. Pultruded and molded FRP gratings eliminate the cycle entirely while delivering better slip resistance, lower installed weight, and inherent electrical insulation.
          </p>
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            This page compares the two across 13 properties that matter to grating specifiers: uniform and concentrated load capacity, corrosion mechanisms, slip resistance on wet surfaces, fire rating, electrical conductivity, and 30-year lifecycle cost.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Property Comparison</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Side-by-side: FRP vs hot-dip galvanized steel gratings
          </h2>
          <p className="mt-[13px] max-w-[800px] text-f15 leading-golden text-t2">
            FRP values reflect pultruded and molded E-glass/polyester gratings typical of F1 Composite product range. Steel values reflect standard bar grating, 25mm × 5mm bearing bars, hot-dip galvanized per ASTM A123. Highlighted rows show properties where FRP materially outperforms steel.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-border-default bg-bg2">
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Property</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Unit</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Pultruded / Molded FRP</th>
                  <th className="px-[13px] py-[13px] text-left font-bold text-t1">Hot-Dip Galvanized Steel</th>
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
                    <td className="px-[13px] py-[13px] text-t2">{row.steel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[960px] px-[34px]">
          <SectionTag>Where FRP Replaces Steel</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Five environments where FRP is now the default specification
          </h2>
          <ul className="mt-[21px] space-y-[21px] text-f15 leading-golden text-t2">
            <li>
              <strong className="text-t1">Wastewater treatment plants.</strong> H₂S, chlorine, and constant humidity corrode galvanized steel gratings in 8–12 years. FRP vinyl ester gratings carry 50+ year design life with zero maintenance. The European Water Industry has specified FRP as default for new-build secondary and tertiary treatment since the 2010s.
            </li>
            <li>
              <strong className="text-t1">Offshore platforms and coastal marinas.</strong> Saltwater and salt spray pit galvanized coatings within 5–10 years. Stainless steel grating costs 3–4× FRP. Every major offshore operator now specifies FRP gratings for secondary walkways, helideck surrounds, and engine-room access platforms.
            </li>
            <li>
              <strong className="text-t1">Electrical substations and power plants.</strong> Non-conductive FRP eliminates fault current paths, reduces grounding infrastructure cost by $200,000–$500,000 on a typical 220 kV substation, and removes arc-flash risk in cable management areas.
            </li>
            <li>
              <strong className="text-t1">Chemical and pulp & paper plants.</strong> Sulfuric acid, sodium hydroxide, hypochlorite, and solvent exposure attack any steel coating. FRP vinyl ester gratings resist the full range of process chemicals per the chemical resistance chart — which is why process plants routinely replace steel mezzanines and walkways with FRP during turnarounds.
            </li>
            <li>
              <strong className="text-t1">Food and pharmaceutical facilities.</strong> FDA-compliant polyester resins, non-porous sealed surfaces, and cleanability with caustic CIP solutions make FRP the right choice for environments where steel corrosion particulates could contaminate product.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[960px] px-[34px]">
          <SectionTag>Where Steel Still Wins</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Heavy vehicle traffic in dry, non-corrosive environments
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Steel bar gratings remain the right specification in three scenarios. <strong className="text-t1">Heavy wheel loads:</strong> forklifts above 45 kN per wheel and truck traffic on loading docks still benefit from steel's higher concentrated-load capacity. <strong className="text-t1">Dry industrial buildings:</strong> indoor steel mills, dry warehouses, and foundries with low humidity and no chemical exposure see galvanized steel last 40+ years without recoating, eliminating FRP's lifecycle advantage. <strong className="text-t1">Fire-critical primary structures:</strong> where code requires non-combustible structural elements, steel is the direct choice; FRP with FR resin achieves Class 1 flame spread but is not non-combustible.
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
            Explore F1 Composite FRP gratings — molded and pultruded, solid-top and ventilated, grit and smooth, polyester and vinyl ester resin systems.
          </p>
          <Link
            href="/products/gratings"
            className="mt-[21px] inline-block rounded-[8px] bg-teal px-[34px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
          >
            View FRP Gratings →
          </Link>
        </div>
      </section>

      <InnerCTA title="Specifying gratings for a corrosive, electrical, or wet environment?" />
    </>
  );
}
