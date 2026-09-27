import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import { BENCHMARK_TOLERANCE_PERCENT, runSectionPropertyBenchmarks } from "@/lib/frpCalculatorValidation";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/frp-profile-calculator/validation";
const publishedAt = "2026-07-30";
const updatedAt = "2026-07-30";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Calculator Validation Benchmarks | F1 Composite",
  description:
    "Review 12 reproducible section-property benchmarks, build-time tolerances, validation scope, and known limits for the F1 Composite FRP calculator.",
  path: pagePath,
});

function formatError(value: number) {
  if (value < 0.000001) return "<0.000001%";
  return `${value.toFixed(6)}%`;
}

export default function CalculatorValidationPage() {
  const benchmarks = runSectionPropertyBenchmarks();
  const maxError = Math.max(...benchmarks.flatMap((row) => [row.ixErrorPercent, row.areaErrorPercent]));
  const passed = maxError <= BENCHMARK_TOLERANCE_PERCENT;

  if (!passed) {
    throw new Error(
      `FRP calculator section-property benchmark failed: ${maxError}% exceeds ${BENCHMARK_TOLERANCE_PERCENT}%`,
    );
  }

  const number = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: 6 });
  const link = "font-semibold text-teal-text hover:underline";
  const th = "px-[14px] py-[8px] font-semibold text-t1";
  const td = "px-[14px] py-[10px] text-right tabular-nums";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "F1 Composite FRP Calculator Section-Property Validation Benchmarks",
          description: "Twelve reproducible closed-form benchmarks for area and strong-axis second moment of area across five profile families.",
          url: absoluteUrl(pagePath),
          datePublished: publishedAt,
          dateModified: updatedAt,
          creator: { "@id": "https://www.f1composite.com/#organization" },
          license: absoluteUrl("/terms"),
          variableMeasured: ["Cross-sectional area A (mm²)", "Second moment of area Ix (mm⁴)", "Relative error (%)"],
          measurementTechnique: "Closed-form geometry benchmark recomputed during static site generation",
        }}
      />
      <PageHeader
        tag="Tools"
        title="FRP calculator validation benchmarks"
        description="Twelve fixed-reference geometry cases are recalculated from the production engine during every build. This page publishes the inputs, expected values, live outputs, tolerance, pass status and validation limits."
        facts={[
          { label: "Build status", value: "Pass" },
          { label: "Reference cases", value: String(benchmarks.length) },
          { label: "Acceptance tolerance", value: `≤ ${BENCHMARK_TOLERANCE_PERCENT}%` },
        ]}
        updated={updatedAt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "FRP profile calculator", href: "/frp-profile-calculator" },
          { label: "Validation" },
        ]}
      />

      <PageNav
        items={[
          { id: "benchmarks", label: "Benchmarks" },
          { id: "scope", label: "Scope" },
          { id: "reproduce", label: "Reproduce" },
        ]}
      />

      <PageSection
        id="benchmarks"
        title="Benchmark results"
        intro={<>Each row stores fixed expected A and Ix values evaluated from closed-form geometry equations. During static generation, the same production module imported by the interactive calculator and span tables recalculates each case. If either relative error exceeds {BENCHMARK_TOLERANCE_PERCENT}%, the page throws a build error instead of publishing a false pass. Differences below the printed precision come from storing circular-section π results as finite constants.</>}
        tone="white"
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[940px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={th}>Benchmark section</th>
                <th scope="col" className={`${th} text-right`}>Expected A (mm²)</th>
                <th scope="col" className={`${th} text-right`}>Engine A (mm²)</th>
                <th scope="col" className={`${th} text-right`}>A error</th>
                <th scope="col" className={`${th} text-right`}>Expected Ix (mm⁴)</th>
                <th scope="col" className={`${th} text-right`}>Engine Ix (mm⁴)</th>
                <th scope="col" className={`${th} text-right`}>Ix error</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map((row) => (
                <tr key={row.name} className="border-b border-border-default align-top text-t2 last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{row.name}</th>
                  <td className={td}>{number(row.expectedArea)}</td>
                  <td className={td}>{number(row.actualArea)}</td>
                  <td className={`${td} text-teal-text`}>{formatError(row.areaErrorPercent)}</td>
                  <td className={td}>{number(row.expectedIx)}</td>
                  <td className={td}>{number(row.actualIx)}</td>
                  <td className={`${td} text-teal-text`}>{formatError(row.ixErrorPercent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="scope" title="What the benchmarks cover" tone="muted">
        <div className="grid gap-[12px] md:grid-cols-2">
          <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">What this validates</h3>
            <ul className="mt-[8px] list-disc space-y-[6px] pl-[20px] text-f14 leading-golden text-t2">
              <li>Gross area and strong-axis Ix for I-beams, channels, angles, rectangular and square tubes, and round tubes.</li>
              <li>Centroid-aware angle calculation using the parallel-axis theorem.</li>
              <li>One shared geometry engine across the calculator, span tables and benchmark page.</li>
              <li>Build-time regression protection against an accidental formula or unit change.</li>
            </ul>
          </div>
          <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">What this does not validate</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              This release does not claim comparison against SAP2000, ANSYS, physical load testing or an accredited third-party
              calculation. It also does not validate local or lateral buckling, connections, creep, fatigue, fire, combined actions
              or a complete code design. Those claims will be added only when the underlying model files, boundary conditions, test
              records and reviewer can be published.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="reproduce" title="Reproduce the result" tone="white">
        <p className="max-w-[820px] text-f16 leading-golden text-t2">
          Choose any row, enter its H, B, tw and tf in the <Link href="/frp-profile-calculator" className={link}>FRP profile calculator</Link>,
          and compare the reported section properties. The equations and unit path are documented in the{" "}
          <Link href="/frp-profile-calculator/methodology" className={link}>methodology</Link>. Catalog beams can also be traced
          from the <Link href="/frp-span-tables" className={link}>span tables</Link> into a preloaded calculation.
        </p>
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "Calculation record", links: [
            { href: "/frp-profile-calculator/methodology", label: "Read the calculation methodology" },
            { href: "/frp-profile-calculator", label: "Run the live calculator" },
            { href: "/frp-span-tables", label: "Review the span-table dataset" },
          ] },
          { title: "Profile data", links: [
            { href: "/products/fiberglass-structural-shapes", label: "Fiberglass structural shapes" },
            { href: "/datasheets", label: "Profile datasheets and drawings" },
            { href: "/technology/quality-testing", label: "Quality and testing" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the member and loads for a checked section"
        quoteHref="/contact?source=calculator-validation&inquiry_type=technical"
        text="Send the span, loads, support conditions and design code with the candidate section."
      />
    </>
  );
}
