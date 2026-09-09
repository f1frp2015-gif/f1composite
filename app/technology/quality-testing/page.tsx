import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { buildPageMetadata } from "@/lib/seo";
import { commercialFacts, engineeringEvidence } from "@/content/data/engineeringEvidence";
import { buildRfqHref } from "@/lib/rfq";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Quality, Testing & Product Evidence",
  description: "Match FRP test reports and component certificates to your material, section and assembly. Define inspection records and acceptance criteria before production.",
  path: "/technology/quality-testing",
  image: "/technology/quality-testing/opengraph-image",
});

const checks = [
  { title: "Define the offered product", text: "Identify the drawing revision, resin, reinforcement, finish, tolerances, quantity and intended environment. A standard section name alone does not define its mechanical or fire performance." },
  { title: "Agree the inspection plan", text: "Specify dimensional and visual acceptance criteria, sampling, required mechanical tests and any witness inspection in the quotation or purchase specification. Confirm test frequency and reporting for the actual order." },
  { title: "Match the evidence", text: "Compare the offered material and assembly with the report holder, specimen geometry, conditioning, test method and results. Request the original document and any additional testing needed for a changed configuration." },
  { title: "Define the release records", text: "Agree the required batch identification, inspection report, packing record and document package before production. Confirm which records are included and which require additional testing or third-party inspection." },
];

export default function QualityTestingPage() {
  return <>
    <PageHeader tag="Quality & testing" title="Evidence for the product you are specifying" description="Use the original report and an agreed inspection plan to connect a product claim to the material or assembly being supplied." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology", href: "/technology" }, { label: "Quality & Testing" }]} />
    <section className="bg-bg2 py-[40px]"><div className="mx-auto max-w-[1200px] px-[20px] sm:px-[28px]">
      <h2 className="text-f24 font-bold text-t1">Start with document scope</h2>
      <p className="mt-[13px] max-w-[950px] text-f15 leading-relaxed text-t2">{commercialFacts.compliance}</p>
      <p className="mt-[13px] max-w-[950px] text-f15 leading-relaxed text-t2">A quality-management certificate describes a management-system scope; it does not establish the performance of every product. Request the current holder and scope for the proposed supply. Published technical references do not replace a project approval or a batch inspection report.</p>
      <Link className="mt-[20px] inline-flex min-h-[44px] items-center rounded-[6px] bg-teal-text px-[20px] font-bold text-white" href="/resources/evidence">Browse reports and supporting documents</Link>
      <div className="mt-[34px] grid gap-[20px] md:grid-cols-2">{checks.map((check) => <article key={check.title} className="rounded-[8px] border border-border-default bg-white p-[24px]"><h2 className="text-f18 font-bold text-t1">{check.title}</h2><p className="mt-[10px] text-f15 leading-relaxed text-t2">{check.text}</p></article>)}</div>
      <h2 className="mt-[40px] text-f24 font-bold text-t1">Available public references</h2>
      <ul className="mt-[16px] space-y-[14px]">{engineeringEvidence.map((record) => <li key={record.id}><Link href={`/resources/evidence#${record.id}`} className="font-semibold text-teal-text underline">{record.title}</Link><p className="mt-[4px] text-f13 text-t2">{record.scope}</p></li>)}</ul>
      <h2 className="mt-[40px] text-f24 font-bold text-t1">Include the acceptance requirements in your RFQ</h2>
      <p className="mt-[12px] text-f15 text-t2">Send the drawing, service conditions, required standard and edition, sampling plan and document requirements. We will confirm the available evidence and any testing gaps for your proposed product.</p>
      <Link className="mt-[18px] inline-block text-teal-text underline" href={buildRfqHref({ source: "quality-testing", message: "Please review the applicable test reports and inspection requirements for my project. Product / drawing: \nEnvironment: \nStandard and edition: \nRequired records: " })}>Request an evidence and inspection review</Link>
    </div></section>
  </>;
}
