import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import { formatShortDate } from "@/lib/dates";
import { e40EvidenceHref, e40ReportDate, e40Reports, e40TestMethod } from "@/content/data/e40Evidence";

export function E40EvidenceLink({ facade = false }: { facade?: boolean }) {
  return (
    <aside className="rounded-card border border-teal-border bg-teal-bg p-[20px] sm:p-[24px]">
      <h3 className="text-f18 font-bold text-t1">E40 / 40 GPa-class test evidence</h3>
      <p className="mt-[8px] text-f14 leading-golden text-t2">
        SGS reports record full-section averages of 40.8 and 41.5 GPa using {e40TestMethod}.
        E40 is a commercial performance designation, not an EN 13706 grade.
        {facade
          ? " These square-profile results do not validate the facade plate laminate or blade geometry; request plate-specific evidence for your specification."
          : " Results apply to the tested samples; the report size identifiers need clarification before qualification of a particular tube size or supplied batch."}
      </p>
      <Link href={e40EvidenceHref} className="mt-[4px] inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
        Review the SGS reports, test conditions and scope <span aria-hidden className="ml-[4px]">→</span>
      </Link>
    </aside>
  );
}

export default function E40TestEvidence({ tone = "white" }: { tone?: "white" | "muted" }) {
  return (
    <PageSection
      id="e40-test-reports"
      title="E40 evidence: full-section results above 40 GPa"
      count={`SGS reports · ${formatShortDate(e40ReportDate)}`}
      tone={tone}
      intro={<>Two SGS-CSTC Standards Technical Services (Shanghai) Co., Ltd. reports record full-section test averages of 40.8 and 41.5 GPa to {e40TestMethod}. Both name Chongqing Xianju New Material Co. Ltd as the customer and identify the sample as a fiber-reinforced composite profile. Each report contains three individual results, all above 40 GPa. These are measured sample results, not characteristic values, guaranteed production minimums or design allowables.</>}
    >
      <ul className="grid gap-[12px] lg:grid-cols-2">
        {e40Reports.map((report) => (
          <li key={report.id} className={`min-w-0 rounded-card border border-border-default p-[20px] sm:p-[24px] ${tone === "white" ? "bg-bg2" : "bg-white"}`}>
            <h3 className="text-f24 font-bold text-t1">{report.average} GPa <span className="text-f16 font-medium text-t2">reported average</span></h3>
            <p className="mt-[4px] break-words font-mono text-f12 uppercase tracking-[0.06em] text-t3">{report.reference}</p>
            <dl className="mt-[16px] space-y-[10px] border-t border-border-default pt-[16px] text-f14 leading-golden text-t2">
              <div><dt className="font-semibold text-t1">Individual results (3 specimens)</dt><dd>{report.values.join(" / ")} GPa</dd></div>
              <div><dt className="font-semibold text-t1">Product specification on page 1</dt><dd>{report.specification}</dd></div>
              <div><dt className="font-semibold text-t1">Specimen dimensions on page 3</dt><dd>{report.specimen}</dd></div>
              <div><dt className="font-semibold text-t1">Test span / rate</dt><dd>{report.span} mm / {report.rate} mm/min</dd></div>
              <div><dt className="font-semibold text-t1">Test method / conclusion</dt><dd>{e40TestMethod} / N/A (no pass/fail judgment)</dd></div>
            </dl>
            <a href={report.file} className="mt-[12px] inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
              Open the SGS report, {report.average} GPa (PDF, 3 pages)
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-[24px] max-w-[860px] space-y-[12px] text-f16 leading-golden text-t2">
        <p><strong className="text-t1">What E40 means here.</strong> E40 denotes a commercial 40 GPa-class performance tier. EN 13706 defines E17 and E23 grades; the use of its test method does not create an EN 13706 E40 grade or establish compliance with every grade requirement. See the <a href="https://fiberline.com/european-standard-en-13706" className="font-semibold text-teal-text underline underline-offset-4">EN 13706 grade comparison</a>.</p>
        <p><strong className="text-t1">Size identification needs clarification.</strong> The supplied files are named for 60 × 60 × 5 and 90 × 90 × 5 mm tubes. CM01 lists specification 60605 on page 1 but a 90 × 90 mm specimen on page 3; CM02 lists 90905 but a 60 × 60 mm specimen. We preserve both originals and identify results by report number. A corrected report or laboratory clarification is needed before assigning either result to a specific catalog size.</p>
        <p><strong className="text-t1">Report scope.</strong> The reports state that results refer only to the tested samples and include an internal-reference note for research, teaching, quality control and product development. Their conclusion is N/A. They are not product certification, approval for structural use, or proof of facade-plate, bridge-system, fire or durability performance. Match the supplied section, laminate and batch to applicable evidence before design or procurement.</p>
      </div>
      <nav aria-label="E40 related resources">
        <ul className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[4px] text-f14 font-semibold">
          {[
            { href: "/products/fiberglass-structural-shapes/frp-square-tube", label: "Square and rectangular tubes" },
            { href: "/products/fiberglass-structural-shapes", label: "Structural profile range" },
            { href: "/resources/evidence#sgs-e40-cm01", label: "Product evidence library" },
            { href: "/resources/downloads", label: "Downloads and CAD" },
            { href: "/contact?source=e40-test-evidence&inquiry_type=technical", label: "Request project-specific verification" },
          ].map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="inline-flex min-h-[44px] items-center text-teal-text hover:underline">
                {link.label} <span aria-hidden="true" className="ml-[4px]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageSection>
  );
}
