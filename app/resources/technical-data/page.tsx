import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { E23_MIN, E23_ISO_PUBLISHED, TYP_NOTE } from "@/lib/catalog/en13706";

// Same property rows, labels, and test methods as /datasheets/[slug]
// (MECH_ROWS) — one vocabulary for the customer everywhere. Values come from
// lib/catalog/en13706.ts, the same module the datasheet seed reads, so this
// page and every product datasheet can never disagree.
const PROPERTY_ROWS: {
  key: keyof typeof E23_ISO_PUBLISHED & keyof typeof E23_MIN | "compressive_l_mpa" | "barcol" | "water_abs_pct";
  label: string;
  unit: string;
  method: string;
}[] = [
  { key: "e_l_gpa", label: "Tensile modulus E_L (longitudinal)", unit: "GPa", method: "EN ISO 527-4" },
  { key: "e_t_gpa", label: "Transverse tensile modulus E_T", unit: "GPa", method: "EN ISO 527-4" },
  { key: "tensile_l_mpa", label: "Tensile strength (longitudinal)", unit: "MPa", method: "EN ISO 527-4" },
  { key: "tensile_t_mpa", label: "Tensile strength (transverse)", unit: "MPa", method: "EN ISO 527-4" },
  { key: "flexural_l_mpa", label: "Flexural strength (longitudinal)", unit: "MPa", method: "EN ISO 14125" },
  { key: "flexural_t_mpa", label: "Flexural strength (transverse)", unit: "MPa", method: "EN ISO 14125" },
  { key: "shear_mpa", label: "Interlaminar shear strength (ILSS)", unit: "MPa", method: "EN ISO 14130" },
  { key: "pin_bearing_l_mpa", label: "Pin-bearing strength (longitudinal)", unit: "MPa", method: "EN 13706-2 Annex D" },
  { key: "pin_bearing_t_mpa", label: "Pin-bearing strength (transverse)", unit: "MPa", method: "EN 13706-2 Annex D" },
  { key: "compressive_l_mpa", label: "Compressive strength (longitudinal)", unit: "MPa", method: "EN ISO 604" },
  { key: "barcol", label: "Barcol hardness", unit: "", method: "ASTM D2583" },
  { key: "water_abs_pct", label: "Water absorption (24 h)", unit: "%", method: "EN ISO 62" },
];

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Material Properties — Mechanical & Physical Data",
  description:
    "FRP material properties for pultruded E-glass profiles: tensile, flexural, shear, density, glass content — full specification data per EN 13706 and ASTM.",
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
      legalName: "Chongqing F1 Composites Co., Ltd.",
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
        title="FRP Material Properties & Specifications"
        description="Comprehensive mechanical, thermal, and chemical resistance data for our standard pultruded FRP profile range."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Technical Data" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[8px] text-f24 font-bold text-t1">
            Mechanical &amp; Physical Properties — E23 General-Purpose Laminate
          </h2>
          <p className="mb-[21px] max-w-[860px] text-f15 leading-golden text-t2">
            The same laminate values printed on every product datasheet (E-glass /
            isophthalic polyester, EN 13706 Grade E23), shown against the EN 13706-3
            Table 1 grade minimums. One data source feeds both this page and the
            per-size datasheets, so the numbers always match.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-border-default bg-bg2">
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Property</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-teal-text">Published value</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">EN 13706 E23 minimum</th>
                  <th className="px-[13px] py-[8px] text-left font-bold text-t1">Test method</th>
                </tr>
              </thead>
              <tbody className="text-t2">
                {PROPERTY_ROWS.map((r) => {
                  const pub = E23_ISO_PUBLISHED[r.key as keyof typeof E23_ISO_PUBLISHED];
                  const min = E23_MIN[r.key as keyof typeof E23_MIN];
                  return (
                    <tr key={r.key} className="border-b border-border-default">
                      <td className="px-[13px] py-[8px]">{r.label}</td>
                      <td className="px-[13px] py-[8px] font-medium text-t1">
                        {typeof pub === "number" ? `${pub}${r.unit ? ` ${r.unit}` : ""}` : "—"}
                      </td>
                      <td className="px-[13px] py-[8px]">
                        {typeof min === "number" ? `${min}${r.unit ? ` ${r.unit}` : ""}` : "not specified"}
                      </td>
                      <td className="px-[13px] py-[8px]">{r.method}</td>
                    </tr>
                  );
                })}
                <tr className="border-b border-border-default">
                  <td className="px-[13px] py-[8px]">Density</td>
                  <td className="px-[13px] py-[8px] font-medium text-t1">{E23_ISO_PUBLISHED.density_g_cm3} g/cm³</td>
                  <td className="px-[13px] py-[8px]">not specified</td>
                  <td className="px-[13px] py-[8px]">EN ISO 1183</td>
                </tr>
                <tr>
                  <td className="px-[13px] py-[8px]">Glass content</td>
                  <td className="px-[13px] py-[8px] font-medium text-t1">{E23_ISO_PUBLISHED.glass_content}</td>
                  <td className="px-[13px] py-[8px]">not specified</td>
                  <td className="px-[13px] py-[8px]">EN ISO 1172</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-[21px] max-w-[860px] text-f13 leading-golden text-t3">
            ILSS is published at 30 MPa, above the EN 13706 minimum of 25 MPa (FRP Profile
            Design Manual DOC-PF-2026-EN Rev. A). {TYP_NOTE} Values apply to the standard
            general-purpose laminate; fire-retardant, vinyl ester, epoxy, polyurethane, and
            phenolic systems each have their own formulation sheet on the per-size datasheets.
          </p>
          <div className="mt-[21px] rounded-[8px] border-l-[4px] border-teal bg-teal-bg p-[21px] text-f13 leading-golden text-t2">
            <strong>Looking for a specific size?</strong> Per-size datasheets — section drawing,
            published weight per meter, these properties, and a free DXF — live in the{" "}
            <Link href="/resources/downloads#datasheets" className="font-semibold text-teal-text hover:underline">
              datasheet shortlist (8 most-requested sizes per family)
            </Link>{" "}
            or the complete{" "}
            <Link href="/datasheets" className="font-semibold text-teal-text hover:underline">
              114-size datasheet library
            </Link>
            .
          </div>
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
            <p className="mt-[8px] text-f15 leading-golden text-t2">
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
                  href={`/contact?source=technical-data&inquiry_type=technical&message=${encodeURIComponent(
                    `Early access request — ${report.title}\nStandard: ${report.standard}\nExpected: ${report.eta}\n\nMy project context (briefly): \nWhy this data matters for us: `
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
              chemical, higher temperature, longer duration) to unblock a project decision,{" "}
              <a href="/contact?source=technical-data&inquiry_type=technical" className="font-semibold text-teal-text hover:underline">
                request it here
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
