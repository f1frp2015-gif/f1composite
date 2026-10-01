import E40TestEvidence from "@/components/sections/E40TestEvidence";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { E23_MIN, E23_ISO_PUBLISHED, PROPERTY_ROWS, TYP_NOTE } from "@/lib/catalog/en13706";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Technical Data — Material Properties & Test Methods",
  description:
    "FRP material properties and original SGS full-section reports: 40.8 and 41.5 GPa E40-class results, EN 13706 test methods and sample-specific scope notes.",
  path: "/resources/technical-data",
  image: "/resources/technical-data/opengraph-image",
});

const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

const designSteps = [
  { title: "Select the laminate", body: "Match the resin system and grade to corrosion, fire, temperature, moisture, and electrical requirements before using a mechanical property in a calculation." },
  { title: "Combine material and geometry", body: "Use the relevant modulus or strength with the actual section properties, span, restraint, load direction, and connection layout from the selected profile datasheet." },
  { title: "Apply design factors", body: "Convert characteristic or published values into project design values using the safety, environment, duration, temperature, and code factors required by the governing standard." },
];

// Third-party programs being prepared. Dates and laboratories are confirmed per
// program when the work is contracted, so they are not printed here.
const plannedTests = [
  { title: "Chemical resistance: 2000 h in H₂SO₄, NaOH and Cl₂", standard: "ASTM G48 and D543 methodology", scope: "Vinyl ester and isophthalic polyester profiles, 2000-hour exposure at concentrations relevant to chemical plants, pulp and paper, and water treatment. Tensile retention curves per resin system." },
  { title: "UV durability: 5000 h", standard: "ASTM G154 Cycle 1", scope: "5000 hours of accelerated UV and moisture exposure. Surface blush, color shift (ΔE) and flexural retention by resin system: polyester, vinyl ester and UV-stabilized." },
  { title: "Hydrolysis: 28 days in boiling water", standard: "ASTM D570, extended", scope: "Tensile and flexural retention and dimensional swelling after 28 days of boiling-water immersion, for water treatment, marina and coastal specifiers." },
  { title: "Fire: EN 45545-2 and ASTM E84", standard: "EN 45545-2, ASTM E84", scope: "Phenolic and fire-retardant polyester variants tested for rail (EN 45545-2 HL1/HL2/HL3) and North American building use (ASTM E84 Class A/B), with smoke density and toxicity." },
  { title: "Fatigue: 10⁷ bending cycles", standard: "ASTM D7791", scope: "Cyclic flexural loading to 10 million cycles on I-beam and channel sections, with S–N curves at 30, 50 and 70% of ultimate load, for bridge deck, walkway and machinery-base specifiers." },
  { title: "Creep: 1000 h sustained load", standard: "ASTM D2990", scope: "Sustained-load creep at 30, 50 and 70% of design stress, at room temperature and 60 °C, to derive a creep factor for long-span structural design." },
];

export default function TechnicalDataPage() {
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "F1 Composite FRP Profile Technical Data",
    description:
      "Mechanical properties, density, glass content, and reference test standards for pultruded E-glass polyester FRP profiles.",
    url: absoluteUrl("/resources/technical-data"),
    creator: { "@id": "https://www.f1composite.com/#organization" },
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
        title="FRP technical data — material properties & specifications"
        description="Published mechanical and physical properties for the standard pultruded E-glass profile laminate, with grade minimums, test methods, and guidance for using the data in member design."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Technical Data" },
        ]}
      />

      <PageNav items={[{ id: "properties", label: "Properties" }, { id: "design-use", label: "Using the data" }, { id: "e40-test-reports", label: "E40 reports" }, { id: "durability-testing", label: "Planned tests" }]} />

      <PageSection
        id="properties"
        title="E23 mechanical and physical properties"
        tone="white"
        intro={<>The laminate values printed on every product datasheet (E-glass / isophthalic polyester, EN 13706 Grade E23), shown against the EN 13706-3 Table 1 grade minimums. One data source feeds this page and the per-size datasheets, so the numbers always match. For dimensions, thermal, electrical, fire and chemical requirements, use the <Link href="/technology/pultruded-profile-performance" className="font-semibold text-teal-text underline underline-offset-4">pultruded profile performance guide</Link>; for what the fibers and resin contribute, the <Link href="/resources/blog/frp-material" className="font-semibold text-teal-text underline underline-offset-4">FRP material guide</Link>.</>}
      >
        <div className="max-w-[860px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>
            Read this data as material characterization, not as a member capacity table.
            Pultruded profiles are anisotropic: longitudinal values are dominated by continuous
            rovings, while transverse and connection behavior depend more on mats, resin,
            geometry, holes and load direction. Final design combines these properties with
            section data, exposure and duration factors, connection checks and the governing
            project code.
          </p>
          <p>
            EN 13706 sets the grade requirements; the referenced EN ISO methods define how each
            coupon property is measured. The published column is the standard laminate data used
            across F1 datasheets; the minimum column shows the E23 threshold beside it rather than
            mixing the two.
          </p>
        </div>
        <div className="relative mt-[24px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Property</th>
                <th scope="col" className="bg-teal-bg2 px-[14px] py-[8px] font-semibold text-teal-text">Published value</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">EN 13706 E23 minimum</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Test method</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...PROPERTY_ROWS.map((r) => {
                  const pub = E23_ISO_PUBLISHED[r.key as keyof typeof E23_ISO_PUBLISHED];
                  const min = E23_MIN[r.key as keyof typeof E23_MIN];
                  return {
                    label: r.label,
                    published: typeof pub === "number" ? `${pub}${r.unit ? ` ${r.unit}` : ""}` : "—",
                    minimum: typeof min === "number" ? `${min}${r.unit ? ` ${r.unit}` : ""}` : "Not specified",
                    method: r.method,
                  };
                }),
                { label: "Density", published: `${E23_ISO_PUBLISHED.density_g_cm3} g/cm³`, minimum: "Not specified", method: "EN ISO 1183" },
                { label: "Glass content", published: String(E23_ISO_PUBLISHED.glass_content), minimum: "Not specified", method: "EN ISO 1172" },
              ].map((row) => (
                <tr key={row.label} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.label}</th>
                  <td className="bg-teal-bg px-[14px] py-[10px] font-medium text-t1">{row.published}</td>
                  <td className="px-[14px] py-[10px] text-t2">{row.minimum}</td>
                  <td className="px-[14px] py-[10px] text-t2">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[12px] max-w-[860px] text-f14 leading-golden text-t3">
          ILSS is published at 30 MPa, above the EN 13706 minimum of 25 MPa (FRP Profile Design
          Manual DOC-PF-2026-EN Rev. B). {TYP_NOTE} Values apply to the standard general-purpose
          laminate; fire-retardant, vinyl ester, epoxy, polyurethane and phenolic systems each have
          their own formulation sheet on the per-size datasheets.
        </p>
      </PageSection>

      <PageSection id="design-use" title="How to use FRP technical data in design" tone="muted">
        <ol className="grid gap-[12px] md:grid-cols-3">
          {designSteps.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className={mono}>Step {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-[24px] max-w-[860px] text-f16 leading-golden text-t2">
          Calculate material mass with the <Link href="/frp-density-calculator" className="font-semibold text-teal-text hover:underline">FRP density calculator</Link>.
          For preliminary beam screening, pair this data with the{" "}
          <Link href="/frp-span-tables" className="font-semibold text-teal-text hover:underline">FRP span tables</Link> and the{" "}
          <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:underline">profile calculator</Link>.
          Concentrated loads, buckling, holes, joints, fatigue, fire and sustained loads still need
          project-specific engineering review.
        </p>
        <div className="mt-[16px] max-w-[860px] rounded-card border-l-4 border-l-teal bg-white p-[20px] text-f14 leading-golden text-t2">
          <strong className="text-t1">Looking for a specific size?</strong> Per-size datasheets (section
          drawing, published weight per meter, these properties and a free DXF) are in the{" "}
          <Link href="/resources/downloads#datasheets" className="font-semibold text-teal-text hover:underline">datasheet shortlist</Link>, eight
          most-requested sizes per family, or the complete{" "}
          <Link href="/datasheets" className="font-semibold text-teal-text hover:underline">datasheet library</Link>.
        </div>
      </PageSection>

      <E40TestEvidence tone="white" />

      <PageSection id="durability-testing" title="Original durability data in preparation" tone="muted" intro="We are commissioning third-party testing to publish original durability data for our pultruded profiles: signed laboratory reports rather than manufacturer-reported values, citable by specifiers. Ask about a program if it bears on a current project.">
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
          {plannedTests.map((test) => (
            <li key={test.title} className="flex flex-col rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className={mono}>{test.standard}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{test.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{test.scope}</p>
              <a
                href={`/contact?source=technical-data&inquiry_type=technical&message=${encodeURIComponent(`Durability data request: ${test.title}\nStandard: ${test.standard}\n\nMy project context (briefly): \nWhy this data matters for us: `)}`}
                className="mt-auto inline-flex min-h-[44px] items-center pt-[8px] text-f14 font-semibold text-teal-text hover:underline"
              >
                Ask about this program <span aria-hidden="true" className="ml-[4px]">→</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-[16px] max-w-[860px] rounded-card border-l-4 border-l-teal bg-white p-[20px] text-f14 leading-golden text-t2">
          <strong className="text-t1">For specifiers:</strong> if a project decision needs a specific
          test protocol (a different chemical, a higher temperature, a longer duration),{" "}
          <a href="/contact?source=technical-data&inquiry_type=technical" className="font-semibold text-teal-text hover:underline">
            request it here
          </a>
          . We prioritize testing that answers real specification questions.
        </div>
      </PageSection>

      <InnerCTA title="Need specific technical data for your project?" />
    </>
  );
}
