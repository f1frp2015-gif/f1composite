import type { Metadata } from "next";
import Link from "next/link";
import ArticleSignals from "@/components/sections/ArticleSignals";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/sections/RelatedLinks";
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
        tag="Reproducible Test Record"
        title="FRP Calculator Validation Benchmarks"
        description="Twelve fixed-reference geometry cases are recalculated from the production engine during every build. This page publishes the inputs, expected values, live outputs, tolerance, pass status, and validation limits."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
          { label: "Validation" },
        ]}
      />
      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName="Yifan Liu"
        authorRole="Senior Application Engineer — pultruded FRP structural design"
        authorHref="/about/authors/yifan-liu"
        reviewedBy="Yifan Liu, Application Engineer"
        standards={["Classical section properties", "ASCE/SEI 74-23", "EN 13706", "ASTM D3917-23"]}
      />

      <article className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1120px] px-[34px]">
          <div className="grid gap-[21px] md:grid-cols-3">
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]"><p className="text-f11 font-bold uppercase tracking-[1px] text-t3">Build status</p><p className="mt-[5px] text-f24 font-bold text-teal-text">PASS</p></div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]"><p className="text-f11 font-bold uppercase tracking-[1px] text-t3">Reference cases</p><p className="mt-[5px] text-f24 font-bold text-t1">{benchmarks.length}</p></div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]"><p className="text-f11 font-bold uppercase tracking-[1px] text-t3">Acceptance tolerance</p><p className="mt-[5px] text-f24 font-bold text-t1">≤ {BENCHMARK_TOLERANCE_PERCENT}%</p></div>
          </div>

          <div className="mt-[34px] max-w-[920px] text-f15 leading-golden text-t2">
            <p>
              Each row stores fixed expected A and Ix values evaluated from closed-form geometry equations. During
              static generation, the same production module imported by the interactive calculator and span tables
              recalculates each case. If either relative error exceeds {BENCHMARK_TOLERANCE_PERCENT}%, the page throws
              a build error instead of publishing a false pass. Decimal differences below the printed precision come
              from storing circular-section π results as finite constants.
            </p>
          </div>

          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default">
            <table className="w-full min-w-[940px] border-collapse text-f13">
              <thead className="bg-bg2 text-left text-t1">
                <tr>
                  <th className="p-[13px]">Benchmark section</th><th className="p-[13px]">Expected A mm²</th><th className="p-[13px]">Engine A mm²</th><th className="p-[13px]">A error</th><th className="p-[13px]">Expected Ix mm⁴</th><th className="p-[13px]">Engine Ix mm⁴</th><th className="p-[13px]">Ix error</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((row) => (
                  <tr key={row.name} className="border-t border-border-default text-t2">
                    <td className="whitespace-nowrap p-[13px] font-semibold text-t1">{row.name}</td>
                    <td className="p-[13px] tabular-nums">{row.expectedArea.toLocaleString("en-US", { maximumFractionDigits: 6 })}</td>
                    <td className="p-[13px] tabular-nums">{row.actualArea.toLocaleString("en-US", { maximumFractionDigits: 6 })}</td>
                    <td className="p-[13px] tabular-nums text-teal-text">{formatError(row.areaErrorPercent)}</td>
                    <td className="p-[13px] tabular-nums">{row.expectedIx.toLocaleString("en-US", { maximumFractionDigits: 6 })}</td>
                    <td className="p-[13px] tabular-nums">{row.actualIx.toLocaleString("en-US", { maximumFractionDigits: 6 })}</td>
                    <td className="p-[13px] tabular-nums text-teal-text">{formatError(row.ixErrorPercent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="mt-[55px] grid gap-[34px] text-f15 leading-golden text-t2 lg:grid-cols-2">
            <div>
              <h2 className="text-f24 font-bold text-t1">What this validates</h2>
              <ul className="mt-[13px] space-y-[10px]">
                <li>Gross area and strong-axis Ix for I-beams, channels, angles, rectangular/square tubes, and round tubes.</li>
                <li>Centroid-aware angle calculation using the parallel-axis theorem.</li>
                <li>One shared geometry engine across the calculator, span tables, and benchmark page.</li>
                <li>Build-time regression protection against an accidental formula or unit change.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-f24 font-bold text-t1">What this does not validate</h2>
              <p className="mt-[13px]">
                This release does not claim comparison against SAP2000, ANSYS, physical load testing, or an
                accredited third-party calculation. It also does not validate local/lateral buckling, connections,
                creep, fatigue, fire, combined actions, or a complete code design. Those claims will be added only
                when the underlying model files, boundary conditions, test records, and reviewer can be published.
              </p>
            </div>
          </section>

          <section className="mt-[55px] rounded-[8px] border border-border-default bg-bg2 p-[21px] text-f15 leading-golden text-t2">
            <h2 className="text-f19 font-bold text-t1">Reproduce the result</h2>
            <p className="mt-[8px]">
              Choose any row, enter its H, B, tw, and tf in the <Link href="/frp-profile-calculator" className="text-teal-text hover:underline">FRP profile calculator</Link>,
              and compare the reported section properties. The equations and unit path are documented in the{" "}
              <Link href="/frp-profile-calculator/methodology" className="text-teal-text hover:underline">methodology white paper</Link>.
              Catalog beams can also be traced from the <Link href="/frp-span-tables" className="text-teal-text hover:underline">span tables</Link>{" "}
              into a preloaded calculation.
            </p>
          </section>
        </div>
      </article>

      <RelatedLinks
        groups={[
          { title: "Calculation record", links: [
            { href: "/frp-profile-calculator/methodology", label: "Read calculation methodology" },
            { href: "/frp-profile-calculator", label: "Run the live calculator" },
            { href: "/frp-span-tables", label: "Review span-table dataset" },
          ] },
          { title: "Profile data", links: [
            { href: "/products/standard-profiles", label: "Fiberglass structural shapes" },
            { href: "/datasheets", label: "Profile datasheets and drawings" },
            { href: "/technology/quality-testing", label: "Quality and testing" },
          ] },
        ]}
      />
    </>
  );
}
