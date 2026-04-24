import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Technical Data",
  description:
    "Mechanical properties, chemical resistance data, and specification sheets for F1 Composite pultruded FRP profiles.",
  path: "/resources/technical-data",
  image: "/resources/technical-data/opengraph-image",
});

export default function TechnicalDataPage() {
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "F1 Composite FRP Profile Technical Data",
    description:
      "Mechanical properties, density, glass content, and reference test standards for pultruded E-glass polyester FRP profiles.",
    url: absoluteUrl("/resources/technical-data"),
    creator: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
      legalName: "F1 Composite Co., Ltd",
    },
    license: absoluteUrl("/terms"),
    isAccessibleForFree: true,
    keywords: [
      "FRP mechanical properties",
      "pultruded fiberglass specifications",
      "E-glass polyester data sheet",
      "ASTM D638 tensile strength",
      "ASTM D790 flexural modulus",
    ],
  };

  return (
    <>
      <JsonLd data={datasetSchema} />
      <PageHeader
        tag="Technical Data"
        title="FRP Profile Specifications"
        description="Comprehensive mechanical, thermal, and chemical resistance data for our standard pultruded FRP profile range."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Technical Data" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[21px] text-f24 font-bold text-t1">
            Typical Mechanical Properties — Pultruded E-Glass / Polyester Profiles
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-border-default bg-bg2">
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Property</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Unit</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Lengthwise</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Crosswise</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Test Standard</th>
                </tr>
              </thead>
              <tbody className="text-t2">
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Tensile Strength</td>
                  <td className="px-[13px] py-[8px]">MPa</td>
                  <td className="px-[13px] py-[8px]">≥ 240</td>
                  <td className="px-[13px] py-[8px]">≥ 50</td>
                  <td className="px-[13px] py-[8px]">ASTM D638</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Tensile Modulus</td>
                  <td className="px-[13px] py-[8px]">GPa</td>
                  <td className="px-[13px] py-[8px]">≥ 20</td>
                  <td className="px-[13px] py-[8px]">≥ 7</td>
                  <td className="px-[13px] py-[8px]">ASTM D638</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Flexural Strength</td>
                  <td className="px-[13px] py-[8px]">MPa</td>
                  <td className="px-[13px] py-[8px]">≥ 280</td>
                  <td className="px-[13px] py-[8px]">≥ 100</td>
                  <td className="px-[13px] py-[8px]">ASTM D790</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Flexural Modulus</td>
                  <td className="px-[13px] py-[8px]">GPa</td>
                  <td className="px-[13px] py-[8px]">≥ 17</td>
                  <td className="px-[13px] py-[8px]">≥ 6</td>
                  <td className="px-[13px] py-[8px]">ASTM D790</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Compressive Strength</td>
                  <td className="px-[13px] py-[8px]">MPa</td>
                  <td className="px-[13px] py-[8px]">≥ 210</td>
                  <td className="px-[13px] py-[8px]">≥ 100</td>
                  <td className="px-[13px] py-[8px]">ASTM D695</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">In-Plane Shear Strength</td>
                  <td className="px-[13px] py-[8px]">MPa</td>
                  <td className="px-[13px] py-[8px]" colSpan={2}>≥ 30</td>
                  <td className="px-[13px] py-[8px]">ASTM D5379</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Density</td>
                  <td className="px-[13px] py-[8px]">g/cm³</td>
                  <td className="px-[13px] py-[8px]" colSpan={2}>1.8 – 2.1</td>
                  <td className="px-[13px] py-[8px]">ASTM D792</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Glass Content</td>
                  <td className="px-[13px] py-[8px]">% by weight</td>
                  <td className="px-[13px] py-[8px]" colSpan={2}>60 – 70</td>
                  <td className="px-[13px] py-[8px]">ASTM D2584</td>
                </tr>
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Barcol Hardness</td>
                  <td className="px-[13px] py-[8px]">—</td>
                  <td className="px-[13px] py-[8px]" colSpan={2}>≥ 40</td>
                  <td className="px-[13px] py-[8px]">ASTM D2583</td>
                </tr>
                <tr>
                  <td className="px-[13px] py-[8px]">Water Absorption (24h)</td>
                  <td className="px-[13px] py-[8px]">%</td>
                  <td className="px-[13px] py-[8px]" colSpan={2}>≤ 0.6</td>
                  <td className="px-[13px] py-[8px]">ASTM D570</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-[21px] text-f13 text-t3">
            Values shown are typical minimums for standard E-glass / isophthalic polyester pultruded profiles.
            Actual values depend on fiber architecture, resin system, and cross-section geometry.
            Contact our engineering team for project-specific data sheets.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="mb-[21px]">
            <span className="inline-block rounded-full bg-teal-bg px-[13px] py-[5px] text-f11 font-bold uppercase tracking-[2px] text-teal-text">
              Publishing Q3–Q4 2026
            </span>
            <h2 className="mt-[13px] text-f24 font-bold tracking-[-0.02em] text-t1">
              Original Test Reports & Long-Term Durability Data
            </h2>
            <p className="mt-[8px] max-w-[800px] text-f15 leading-golden text-t2">
              We are commissioning third-party testing to publish <strong>original durability
              data</strong> for our pultruded FRP profiles — not manufacturer-reported specs, but
              signed reports from Intertek / SGS labs. Each report will be cite-able by specifiers
              and usable by external LLMs.
            </p>
          </div>

          <div className="grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Chemical Resistance — 2000h H₂SO₄ / NaOH / Cl₂",
                standard: "ASTM G48 + D543 methodology",
                scope:
                  "Vinyl ester + isophthalic polyester profiles, 2000-hour exposure at concentrations relevant to chemical plants, pulp & paper, water treatment. Tensile retention curves per resin system.",
                lab: "Intertek (TBD)",
                eta: "Q3 2026",
              },
              {
                title: "UV Durability — 5000h ASTM G154",
                standard: "ASTM G154 Cycle 1",
                scope:
                  "5000 hours accelerated UV + moisture exposure. Surface blush, color shift (ΔE), flexural retention by resin system (polyester vs vinyl ester vs UV-stabilized). Correlates to ~10 years outdoor.",
                lab: "SGS (TBD)",
                eta: "Q3 2026",
              },
              {
                title: "Long-Term Hydrolysis — Boiling Water 28d",
                standard: "ASTM D570 extended",
                scope:
                  "Wet-environment exposure: 28-day boiling water immersion. Tensile & flexural retention, dimensional swelling. Relevant for water treatment, marina, and coastal infrastructure specifiers.",
                lab: "Intertek (TBD)",
                eta: "Q3 2026",
              },
              {
                title: "Fire — EN 45545-2 R1/HL2 + ASTM E84",
                standard: "EN 45545-2, ASTM E84 Class A",
                scope:
                  "Phenolic and fire-retardant polyester variants tested for rail (EN 45545-2 HL1/HL2/HL3) and North American building (ASTM E84 Class A/B). Smoke density and toxicity.",
                lab: "UL (TBD)",
                eta: "Q4 2026",
              },
              {
                title: "Fatigue — 10⁷ cycles bending",
                standard: "ASTM D7791",
                scope:
                  "Cyclic flexural loading to 10 million cycles on I-beam and channel sections. S–N curves at 30/50/70 % ultimate load. For bridge deck, walkway, and machinery base specifiers.",
                lab: "SGS (TBD)",
                eta: "Q4 2026",
              },
              {
                title: "Creep — 1000h sustained load",
                standard: "ASTM D2990",
                scope:
                  "Long-term sustained-load creep at 30/50/70 % design stress, room temperature and 60 °C. Generates creep factor for long-span structural design.",
                lab: "Intertek (TBD)",
                eta: "Q4 2026",
              },
            ].map((report) => (
              <div
                key={report.title}
                className="rounded-[8px] border border-border-default bg-white p-[21px]"
              >
                <div className="flex items-center gap-[8px]">
                  <span className="rounded-full bg-amber-100 px-[8px] py-[3px] text-f11 font-bold uppercase tracking-[1px] text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                    {report.eta}
                  </span>
                </div>
                <h3 className="mt-[8px] text-f15 font-bold text-t1">{report.title}</h3>
                <p className="mt-[5px] text-f11 font-semibold text-t3">Standard: {report.standard}</p>
                <p className="mt-[8px] text-f13 leading-golden text-t2">{report.scope}</p>
                <p className="mt-[13px] text-f11 text-t3">Testing lab: {report.lab}</p>
                <a
                  href={`mailto:f1frp2015@gmail.com?subject=${encodeURIComponent(
                    `Early access request — ${report.title}`
                  )}&body=${encodeURIComponent(
                    `Please add me to the pre-publication notification list for:\n\n${report.title}\nStandard: ${report.standard}\nExpected: ${report.eta}\n\nMy project context (briefly): ____\nWhy this data matters for us: ____\n\nThanks.`
                  )}`}
                  className="mt-[13px] inline-block text-f13 font-semibold text-teal-text hover:underline"
                >
                  Request early access →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-[34px] rounded-[8px] border-l-[4px] border-teal bg-teal-bg p-[21px]">
            <p className="text-f13 leading-golden text-t2">
              <strong>For specifiers:</strong> If you need a specific test protocol (different
              chemical, higher temperature, longer duration) to unblock a project decision, email{" "}
              <a href="mailto:f1frp2015@gmail.com" className="font-semibold text-teal-text hover:underline">
                f1frp2015@gmail.com
              </a>{" "}
              — we prioritize testing that serves real specification questions. Qualified projects
              can access preliminary data under NDA.
            </p>
          </div>
        </div>
      </section>

      <InnerCTA title="Need specific technical data for your project?" />
    </>
  );
}
