import Link from "next/link";
import { e40EvidenceHref, e40ReportDate, e40Reports, e40TestMethod } from "@/content/data/e40Evidence";

export function E40EvidenceLink({ facade = false }: { facade?: boolean }) {
  return (
    <aside className="my-[21px] rounded-[8px] border border-border-default bg-teal-bg p-[21px]">
      <h3 className="text-f18 font-bold text-t1">E40 / 40 GPa-class test evidence</h3>
      <p className="mt-[8px] text-f15 leading-golden text-t2">
        SGS reports record full-section averages of 40.8 and 41.5 GPa using {e40TestMethod}.
        E40 is a commercial performance designation, not an EN 13706 grade.
        {facade
          ? " These square-profile results do not validate the facade plate laminate or blade geometry; request plate-specific evidence for your specification."
          : " Results apply to the tested samples; the report size identifiers need clarification before qualification of a particular tube size or supplied batch."}
      </p>
      <Link href={e40EvidenceHref} className="mt-[8px] inline-flex min-h-[44px] items-center font-semibold text-teal-text underline underline-offset-4">
        Review the SGS reports, test conditions and scope →
      </Link>
    </aside>
  );
}

export default function E40TestEvidence() {
  return (
    <section id="e40-test-reports" className="scroll-mt-[100px] bg-bg2 py-[55px]" aria-labelledby="e40-evidence-heading">
      <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
        <p className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Original SGS test reports · {e40ReportDate}</p>
        <h2 id="e40-evidence-heading" className="mt-[13px] text-f24 font-bold text-t1">E40 evidence: full-section results above 40 GPa</h2>
        <p className="mt-[13px] max-w-[960px] text-f15 leading-golden text-t2">
          Two SGS-CSTC Standards Technical Services (Shanghai) Co., Ltd. reports record
          full-section test averages of 40.8 and 41.5 GPa to {e40TestMethod}.
          Both name Chongqing Xianju New Material Co. Ltd as the customer and identify
          the sample as a fiber-reinforced composite profile. Each report contains three
          individual results, all above 40 GPa. These are measured sample results, not
          characteristic values, guaranteed production minimums or design allowables.
        </p>
        <div className="mt-[21px] grid gap-[21px] lg:grid-cols-2">
          {e40Reports.map((report) => (
            <article key={report.id} className="min-w-0 rounded-[8px] border border-border-default bg-white p-[21px]">
              <h3 className="text-f24 font-bold text-t1">{report.average} GPa <span className="text-f15 font-medium text-t2">reported average</span></h3>
              <p className="mt-[8px] break-words text-f13 font-semibold text-teal-text">{report.reference}</p>
              <dl className="mt-[21px] space-y-[13px] text-f13 text-t2">
                <div><dt className="font-bold text-t1">Individual results (3 specimens)</dt><dd>{report.values.join(" / ")} GPa</dd></div>
                <div><dt className="font-bold text-t1">Product specification on page 1</dt><dd>{report.specification}</dd></div>
                <div><dt className="font-bold text-t1">Specimen dimensions on page 3</dt><dd>{report.specimen}</dd></div>
                <div><dt className="font-bold text-t1">Test span / rate</dt><dd>{report.span} mm / {report.rate} mm/min</dd></div>
                <div><dt className="font-bold text-t1">Test method / conclusion</dt><dd>{e40TestMethod} / N/A (no pass/fail judgment)</dd></div>
              </dl>
              <a href={report.file} className="mt-[21px] inline-flex min-h-[44px] items-center font-semibold text-teal-text underline underline-offset-4">
                Open original SGS report — {report.average} GPa (PDF, 3 pages)
              </a>
            </article>
          ))}
        </div>
        <div className="mt-[21px] max-w-[1040px] space-y-[13px] text-f15 leading-golden text-t2">
          <p><strong className="text-t1">What E40 means here.</strong> E40 denotes a commercial 40 GPa-class performance tier. EN 13706 defines E17 and E23 grades; the use of its test method does not create an EN 13706 E40 grade or establish compliance with every grade requirement. See the <a href="https://fiberline.com/european-standard-en-13706" className="font-semibold text-teal-text underline">EN 13706 grade comparison</a>.</p>
          <p><strong className="text-t1">Size identification needs clarification.</strong> The supplied files are named for 60 × 60 × 5 and 90 × 90 × 5 mm tubes. CM01 lists specification 60605 on page 1 but a 90 × 90 mm specimen on page 3; CM02 lists 90905 but a 60 × 60 mm specimen. We preserve both originals and identify results by report number. A corrected report or laboratory clarification is needed before assigning either result to a specific catalog size.</p>
          <p><strong className="text-t1">Report scope.</strong> The reports state that results refer only to the tested samples and include an internal-reference note for research, teaching, quality control and product development. Their conclusion is N/A. They are not product certification, approval for structural use, or proof of facade-plate, bridge-system, fire or durability performance. Match the supplied section, laminate and batch to applicable evidence before design or procurement.</p>
        </div>
        <nav aria-label="E40 related resources" className="mt-[21px] flex flex-wrap gap-x-[24px] gap-y-[12px] text-f13 font-semibold text-teal-text">
          <Link className="inline-flex min-h-[44px] items-center underline" href="/products/fiberglass-structural-shapes/frp-square-tube">Square and rectangular tubes</Link>
          <Link className="inline-flex min-h-[44px] items-center underline" href="/products/fiberglass-structural-shapes">Structural profile range</Link>
          <Link className="inline-flex min-h-[44px] items-center underline" href="/resources/evidence#sgs-e40-cm01">Product evidence library</Link>
          <Link className="inline-flex min-h-[44px] items-center underline" href="/resources/downloads">Downloads and CAD</Link>
          <Link className="inline-flex min-h-[44px] items-center underline" href="/contact?source=e40-test-evidence&inquiry_type=technical">Request project-specific verification</Link>
        </nav>
      </div>
    </section>
  );
}
