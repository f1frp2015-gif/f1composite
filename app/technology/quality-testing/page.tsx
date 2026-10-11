import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Figure from "@/components/ui/Figure";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
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

const inspectionFields = [
  { field: "Part and drawing", prompt: "Part number, drawing revision and units" },
  { field: "Material and traceability", prompt: "Profile, resin / reinforcement reference and batch or sample identification" },
  { field: "Feature and requirement", prompt: "Characteristic ID, nominal value, permitted variation and visual criteria" },
  { field: "Datum and setup", prompt: "Reference face / axis, support condition and stage before or after edge treatment" },
  { field: "Method and sampling", prompt: "Instrument / method, instrument identification and agreed sample quantity" },
  { field: "Result", prompt: "Actual measured values with units, sample IDs and visual observations" },
  { field: "Disposition", prompt: "Acceptance decision, deviation reference and authorized action" },
  { field: "Review and release", prompt: "Inspector, date, reviewer and first-article or production-release reference" },
];

const reviewHref = buildRfqHref({ source: "quality-testing", message: "Please review the applicable test reports and inspection requirements for my project. Product / drawing: \nEnvironment: \nStandard and edition: \nRequired records: " });

export default function QualityTestingPage() {
  return <>
    <PageHeader tag="Quality & testing" title="Evidence for the product you are specifying" description="Use the original report and an agreed inspection plan to connect a product claim to the material or assembly being supplied." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology", href: "/technology" }, { label: "Quality & Testing" }]} figure={<Figure number={1} title="Materials testing" note="Illustrative photo" caption="Illustrative photo. The records for an order are the reports and inspection plan agreed for it." bleed><div className="relative aspect-[16/10]"><Image src="/images/technology/f1-composite-quality-testing-laboratory.webp" alt="Technician at work in a materials testing laboratory" fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload /></div></Figure>} actions={{ primary: { label: "Browse reports and documents", href: "/resources/evidence" }, secondary: { label: "Request an evidence review", href: reviewHref, variant: "secondary" } }} />
    <PageNav items={[{ id: "scope", label: "Document scope" }, { id: "checks", label: "Four checks" }, { id: "machining-records", label: "Record checklist" }, { id: "references", label: "Public references" }]} />

    <PageSection id="scope" title="Start with document scope">
      <div className="max-w-[820px] space-y-[12px] text-f16 leading-golden text-t2">
        <p className="text-f18 text-t1">{commercialFacts.compliance}</p>
        <p>A quality-management certificate describes a management-system scope; it does not establish the performance of every product. Request the current holder and scope for the proposed supply. Published technical references do not replace a project approval or a batch inspection report.</p>
      </div>
    </PageSection>

    <PageSection id="checks" title="Four checks before a product claim goes into the order" tone="muted">
      <ol className="grid gap-[12px] md:grid-cols-2">{checks.map((check, index) => <li key={check.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Check {index + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{check.title}</h3><p className="mt-[8px] text-f16 leading-golden text-t2">{check.text}</p></li>)}</ol>
    </PageSection>

    <PageSection id="machining-records" title="A dimensional inspection record you can specify" intro="Blank planning example — no part has been measured, accepted or certified by this table. Agree the fields and inspection scope for the actual order.">
      <div className="overflow-x-auto rounded-card border border-border-default bg-white">
        <table className="w-full border-collapse text-left text-f14">
          <caption className="px-[16px] py-[12px] text-left font-semibold text-t1">Blank inspection record: fields to complete for each identified part or sample</caption>
          <thead className="border-y border-border-default bg-bg2">
            <tr><th scope="col" className="px-[16px] py-[10px] font-semibold text-t1">Record field</th><th scope="col" className="px-[16px] py-[10px] font-semibold text-t1">Information required</th><th scope="col" className="px-[16px] py-[10px] font-semibold text-t1">Order record</th></tr>
          </thead>
          <tbody>{inspectionFields.map((item) => <tr key={item.field} className="border-b border-border-default last:border-b-0"><th scope="row" className="px-[16px] py-[12px] align-top font-semibold text-t1">{item.field}</th><td className="px-[16px] py-[12px] align-top text-t2">{item.prompt}</td><td className="px-[16px] py-[12px] align-top italic text-t3">Not entered</td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-[20px] max-w-[860px] space-y-[12px] text-f16 leading-golden text-t2">
        <p>Keep the required tolerance, actual measurement and acceptance decision separate. An instrument&apos;s display resolution is not a machining tolerance. A first-article record describes the identified sample; production checks and any capability claim need their own agreed evidence.</p>
        <p>Before changing the drawing, material, tooling or machining route, agree whether another sample, repeat inspection or further qualification is required. Link any approved deviation to the affected order and revision.</p>
        <p>Use the <Link href="/technology/frp-profile-machining" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">FRP profile machining guide</Link> to define cutting, hole, slot, notch and edge-treatment requirements, then include the required records in the RFQ.</p>
      </div>
    </PageSection>

    <PageSection id="references" title="Available public references" intro={<>Product pages carry their own evidence and release scope, for example the laminate test data for <Link href="/products/wind-turbine-blade-panels" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">pultruded wind turbine blade panels</Link> and the inspection and release records for <Link href="/products/frp-pultrusion-manufacturer-factory-direct" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">factory-direct pultrusion supply</Link>.</>}>
      <ul className="divide-y divide-border-default border-y border-border-default">{engineeringEvidence.map((record) => <li key={record.id} className="py-[14px]"><Link href={`/resources/evidence#${record.id}`} className="text-f16 font-semibold text-teal-text underline underline-offset-4 hover:text-teal">{record.title}</Link><p className="mt-[4px] max-w-[900px] text-f14 leading-golden text-t2">{record.scope}</p></li>)}</ul>
    </PageSection>

    <InnerCTA title="Include the acceptance requirements in your RFQ" quoteHref={reviewHref} text="Send the drawing, service conditions, required standard and edition, sampling plan and document requirements. We will confirm the available evidence and any testing gaps for your proposed product." links={[{ label: "Test reports and their scope", href: "/resources/evidence" }, { label: "Custom profile development", href: "/products/custom-pultruded-profiles" }]} />
  </>;
}
