import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import {
  GFRP_CHART_DENSITY_GCM3,
  STEEL_DENSITY_GCM3,
  astmGfrpChartRows,
  metricGfrpChartRows,
} from "@/lib/gfrpRebar";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

// Size and weight reference for GFRP bars. Diameters and areas are the nominal
// values in lib/gfrpRebar.ts; masses are calculated from the nominal area at
// GFRP_CHART_DENSITY_GCM3, so every mass is labeled "calculated".

const pagePath = "/resources/gfrp-rebar-size-chart";
const PAGE_UPDATED = "2026-10-23";
const pageTitle = "GFRP Rebar Size Chart: Diameters, Areas & Weights";
const pageDescription =
  "GFRP rebar size chart for ASTM D7957 No. 2 to No. 10 and metric Ø6–Ø36 bars: nominal diameter, area and calculated weight per foot and meter, next to steel.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const astmRows = astmGfrpChartRows();
const metricRows = metricGfrpChartRows();

const fixed = (value: number, digits: number) => value.toFixed(digits);

const faqs = [
  {
    question: "What sizes does GFRP rebar come in?",
    answer:
      "In the United States, ASTM D7957 GFRP bars use the same number designations as steel rebar, from No. 2 (1/4 in) to No. 10 (1.27 in), with No. 2 as an extra small size. Metric suppliers list nominal diameters; the F1 inquiry list runs from 6 mm to 36 mm. Larger and intermediate sizes depend on the supplier and the grade offered.",
  },
  {
    question: "How much does GFRP rebar weigh compared with steel?",
    answer: `About a quarter of the weight of a steel bar of the same nominal size. At a density of ${GFRP_CHART_DENSITY_GCM3} g/cm³ a No. 4 GFRP bar is calculated at about 0.16 lb/ft (0.25 kg/m), against about 0.68 lb/ft for steel at ${STEEL_DENSITY_GCM3} g/cm³. Use the supplier's declared mass for shipping and handling plans.`,
  },
  {
    question: "Is a No. 4 GFRP bar a direct replacement for a No. 4 steel bar?",
    answer:
      "No. The designation only describes the nominal size. GFRP has roughly a quarter of the stiffness of steel and no yield plateau, so the engineer of record sizes and spaces the bars to ACI CODE-440.11-22, CSA S806 or the code adopted for the project. The chart helps read drawings and prepare an inquiry.",
  },
  {
    question: "Why is the measured diameter of a GFRP bar larger than its nominal size?",
    answer:
      "Ribs, a helical wrap or a sand coating sit outside the load-bearing core, so a caliper across the surface reads more than the nominal diameter. Strength and design values are tied to the nominal area for the designation. When two offers name the same size, compare the certified area and guaranteed tensile load rather than the outside diameter.",
  },
];

export default function GfrpRebarSizeChartPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: pageTitle,
          description: pageDescription,
          url: absoluteUrl(pagePath),
          datePublished: "2026-10-23",
          dateModified: PAGE_UPDATED,
          author: { "@id": "https://www.f1composite.com/#organization" },
          publisher: { "@id": "https://www.f1composite.com/#organization" },
          about: ["GFRP rebar", "ASTM D7957", "Fiberglass rebar sizes"],
        }}
      />
      <PageHeader
        tag="Technical reference"
        title="GFRP rebar size chart"
        description="Nominal diameters, areas and calculated weights for ASTM D7957 bar sizes and the metric diameters F1 quotes, with the steel bar of the same size beside each one."
        facts={[
          { label: "ASTM sizes", value: "No. 2–No. 10" },
          { label: "Metric sizes", value: "Ø6–Ø36 mm" },
          { label: "Weight vs steel", value: "≈ 1/4" },
        ]}
        updated={PAGE_UPDATED}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "GFRP rebar size chart" },
        ]}
      />

      <PageNav
        items={[
          { id: "reading-sizes", label: "Reading sizes" },
          { id: "astm-sizes", label: "ASTM sizes" },
          { id: "metric-sizes", label: "Metric sizes" },
          { id: "using-the-chart", label: "Using the chart" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      <PageSection id="reading-sizes" title="How GFRP rebar sizes are named" tone="white">
        <div className="max-w-[860px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>
            ASTM D7957 glass fiber reinforced polymer (GFRP) bars use the inch-pound designations of steel rebar: the
            number is the nominal diameter in eighths of an inch, so a No. 4 bar is 1/2 in (12.7 mm). The series adds a
            No. 2 bar at 1/4 in. Metric suppliers name bars by nominal diameter instead, and the{" "}
            <Link href="/products/frp-rebar" className="font-semibold text-teal-text hover:underline">
              F1 GFRP rebar range
            </Link>{" "}
            is quoted from 6 mm to 36 mm.
          </p>
          <p>
            A designation fixes the nominal area that strength and design values refer to. It does not make a GFRP bar
            interchangeable with a steel bar of the same number: the reinforcement is designed for GFRP stiffness,
            bond and creep rules. The{" "}
            <Link href="/tools/gfrp-rebar-calculator" className="font-semibold text-teal-text hover:underline">
              GFRP rebar calculator
            </Link>{" "}
            converts certificate values into ACI CODE-440.11-22 design strengths.
          </p>
        </div>
      </PageSection>

      <PageSection
        id="astm-sizes"
        title="ASTM D7957 GFRP bar sizes and weights"
        count={`${astmRows.length} sizes`}
        intro={`Nominal values for each designation. Weights are calculated from the nominal area at ${GFRP_CHART_DENSITY_GCM3} g/cm³ for GFRP and ${STEEL_DENSITY_GCM3} g/cm³ for steel.`}
        tone="muted"
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="spec-table w-full min-w-[760px] border-collapse text-left text-f14">
            <caption className="sr-only">ASTM D7957 GFRP bar designations with nominal diameter, area and calculated weight</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Bar size</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Ø in</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Ø mm</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Area in²</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Area mm²</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">GFRP lb/ft</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">GFRP kg/m</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Steel lb/ft</th>
              </tr>
            </thead>
            <tbody>
              {astmRows.map((row) => (
                <tr key={row.designation} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className="px-[14px] py-[8px] font-semibold text-t1">{row.designation}</th>
                  <td className="px-[14px] py-[8px] text-t2">{fixed(row.diameterIn, 3)}</td>
                  <td className="px-[14px] py-[8px] text-t2">{fixed(row.diameterMm, 1)}</td>
                  <td className="px-[14px] py-[8px] text-t2">{fixed(row.areaIn2, 2)}</td>
                  <td className="px-[14px] py-[8px] text-t2">{row.areaMm2}</td>
                  <td className="px-[14px] py-[8px] text-t2">{fixed(row.gfrpLbPerFt, 3)}</td>
                  <td className="px-[14px] py-[8px] text-t2">{fixed(row.gfrpKgPerM, 3)}</td>
                  <td className="px-[14px] py-[8px] text-t3">{fixed(row.steelLbPerFt, 3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[12px] max-w-[860px] text-f12 leading-relaxed text-t3">
          Calculated weights, not declared values. The density basis follows the specific gravity of 1.92 measured on
          GFRP bars in a University of Kentucky study for FHWA; resin, glass content and surface treatment change the
          actual mass, so use the supplier&apos;s declared mass per foot for freight and handling.
        </p>
      </PageSection>

      <PageSection
        id="metric-sizes"
        title="Metric GFRP rebar diameters on the F1 inquiry list"
        count={`${metricRows.length} diameters`}
        intro="Nominal circular area for each diameter, the calculated weight and the closest ASTM designation. Sizes are inquiry sizes, not a stock list; the grade, tolerance and certified area come with the quotation."
        tone="white"
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="spec-table w-full min-w-[640px] border-collapse text-left text-f14">
            <caption className="sr-only">Metric GFRP rebar diameters with area, calculated weight and closest ASTM size</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Diameter</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Area mm²</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">GFRP kg/m</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">GFRP lb/ft</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Steel kg/m</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Closest ASTM</th>
              </tr>
            </thead>
            <tbody>
              {metricRows.map((row) => (
                <tr key={row.designation} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className="px-[14px] py-[8px] font-semibold text-t1">{row.designation} mm</th>
                  <td className="px-[14px] py-[8px] text-t2">{row.areaMm2}</td>
                  <td className="px-[14px] py-[8px] text-t2">{fixed(row.gfrpKgPerM, 3)}</td>
                  <td className="px-[14px] py-[8px] text-t2">{fixed(row.gfrpLbPerFt, 3)}</td>
                  <td className="px-[14px] py-[8px] text-t3">{fixed(row.steelKgPerM, 3)}</td>
                  <td className="px-[14px] py-[8px] text-t2">{row.closestAstm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="using-the-chart" title="Using the chart for an inquiry or a shipment" tone="muted">
        <div className="max-w-[860px] space-y-[12px] text-f16 leading-golden text-t2">
          <p>
            <strong className="text-t1">Reading a drawing.</strong> Take the bar size and spacing from the GFRP design,
            not from a steel drawing. If a drawing gives metric diameters and the supplier quotes ASTM sizes, or the
            reverse, ask for the certified area of the offered bar and have the designer confirm the substitution.
          </p>
          <p>
            <strong className="text-t1">Comparing offers.</strong> Two bars sold as the same size can differ in core
            diameter, surface and guaranteed tensile load. Compare the certified area, guaranteed tensile force,
            modulus and the edition of ASTM D7957 the reports were run against. The{" "}
            <Link href="/resources/blog/gfrp-rebar-specification-guide-aci-440-astm-d7957" className="font-semibold text-teal-text hover:underline">
              GFRP rebar specification guide
            </Link>{" "}
            lists the submittal documents, and the{" "}
            <Link href="/resources/blog/fiberglass-rebar-cost-per-foot" className="font-semibold text-teal-text hover:underline">
              fiberglass rebar cost guide
            </Link>{" "}
            shows how to compare price per foot on the same basis.
          </p>
          <p>
            <strong className="text-t1">Planning freight and handling.</strong> Multiply the declared mass per foot by
            the scheduled lengths and add bent shapes separately. GFRP bundles are light but flexible, so lifting still
            needs a spreader bar and several pick-up points, as the{" "}
            <Link href="/resources/blog/how-to-install-gfrp-rebar" className="font-semibold text-teal-text hover:underline">
              installation guide
            </Link>{" "}
            explains.
          </p>
        </div>
      </PageSection>

      <PageSection id="faq" title="GFRP rebar size questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        title="GFRP rebar resources"
        groups={[
          {
            title: "Supply",
            links: [
              { href: "/products/frp-rebar", label: "GFRP bars, stirrups and mesh" },
              { href: "/resources/gfrp-rebar-applications", label: "GFRP rebar applications" },
              { href: "/downloads/f1-rebar-schedule-template.csv", label: "Bar schedule template (CSV)" },
            ],
          },
          {
            title: "Design",
            links: [
              { href: "/tools/gfrp-rebar-calculator", label: "GFRP rebar calculator" },
              { href: "/resources/gfrp-rebar-standards", label: "GFRP rebar standards and ASTM D7957 forces" },
              { href: "/technology/fiberglass-rebar-vs-steel", label: "Fiberglass rebar vs steel" },
            ],
          },
          {
            title: "Guides",
            links: [
              { href: "/resources/blog/gfrp-bent-bars-stirrups-mesh-ordering-guide", label: "Bending and stirrups" },
              { href: "/resources/blog/how-to-cut-fiberglass-rebar", label: "How to cut fiberglass rebar" },
              { href: "/resources/blog/basalt-rebar-vs-fiberglass-rebar", label: "Basalt vs fiberglass rebar" },
            ],
          },
        ]}
      />

      <InnerCTA title="Send your bar schedule for sizes, certified data and a quotation." />
    </>
  );
}
