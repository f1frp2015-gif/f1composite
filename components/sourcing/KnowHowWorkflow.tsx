import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import { knowHowModules } from "@/lib/knowhowInquiry";

export default function KnowHowWorkflow() {
  return (
    <PageSection id="delivery-chain" title="Connect the whole production package" intro="Start from a product drawing and acceptance requirements. Coordinate the material, tooling and equipment interfaces before commissioning the line.">
      <ol className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-4">{knowHowModules.map((module, index) => <li key={module.id} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px]"><span className="font-mono text-f12 text-teal-text">MODULE {index + 1}</span><h3 className="mt-[8px] text-f18 font-bold text-t1">{module.label}</h3><p className="mt-[10px] text-f14 leading-golden text-t2">{module.detail}</p><Link href={module.href} className="mt-auto inline-flex min-h-[44px] items-center pt-[12px] text-f14 font-semibold text-teal-text">Review scope →</Link></li>)}</ol>
      <p className="mt-[20px] max-w-[920px] text-f16 leading-golden text-t2">A shared interface schedule connects the parties: the tool maker owns the approved tooling details, equipment suppliers confirm their machine interfaces, material suppliers identify approved grades, and the receiving factory confirms utilities and site readiness. F1’s coordination and engineering responsibilities are defined in the engagement.</p>
    </PageSection>
  );
}

export function KnowHowAcceptance() {
  const gates = [
    ["Design & scope release", "Product drawing and test requirements; named material candidates; tooling/line interfaces; included modules and buyer responsibilities.", "Approved scope, drawings and an acceptance plan with owners for every open item."],
    ["Factory acceptance (FAT)", "The agreed machine configuration, controls, tooling and representative materials; dimensional and process checks during a defined trial.", "Trial report, sampled parts, equipment checks and a deviation/correction record."],
    ["Site acceptance (SAT)", "Installed utilities, alignment, connections, site controls and operation with the nominated local team.", "Installation checks, site trial results, training records and signed acceptance or an agreed punch list."],
    ["Product qualification", "Finished-profile or component requirements, including the project’s mechanical, durability, electrical or other tests.", "Results for the exact material/section/process. Equipment acceptance alone does not qualify the finished product."],
  ];
  return (
    <PageSection id="acceptance" title="Agree the evidence at each project gate" tone="muted" intro="Define the trial material, sample quantity or run duration, test methods and pass criteria before ordering. Values are agreed for the actual product and configuration.">
      <div className="overflow-x-auto rounded-card border border-border-default bg-white" role="region" aria-label="Project acceptance gates" tabIndex={0}><table className="w-full min-w-[720px] text-left text-f14 leading-golden"><caption className="sr-only">Project stages, checks and required evidence</caption><thead className="bg-deep text-white"><tr>{["Gate", "What is reviewed", "Release evidence"].map(label => <th key={label} scope="col" className="p-[16px]">{label}</th>)}</tr></thead><tbody className="divide-y divide-border-default">{gates.map(([stage, checks, evidence]) => <tr key={stage}><th scope="row" className="p-[16px] align-top text-t1">{stage}</th><td className="p-[16px] align-top text-t2">{checks}</td><td className="p-[16px] align-top text-t2">{evidence}</td></tr>)}</tbody></table></div>
    </PageSection>
  );
}

export function KnowHowHandover() {
  const items = [
    ["Product & tooling records", "Approved drawings, tooling/fixture IDs, preformer and reinforcement routing diagrams, and controlled revisions."],
    ["Materials & process records", "Approved material BOM, supplier grade documents, validated trial records and an agreed process-control plan."],
    ["Equipment & maintenance", "Supplier manuals, utilities/interface drawings, control access agreed in contract, wear/spare parts and maintenance tasks."],
    ["Training & support", "Operator competency checks, troubleshooting escalation, support contacts, warranty boundaries and response arrangements."],
    ["Quality & change control", "Incoming inspection, first-piece/patrol checks, test records, sample retention and review of material/tool/process substitutions."],
    ["Ownership & responsibilities", "Drawing and recipe rights, licensing or confidentiality conditions, open items and the party responsible for each deliverable."],
  ];
  return (
    <PageSection id="handover" title="A handover package your team can use">
      <div className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">{items.map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px] text-f14 leading-golden text-t2">{body}</p></article>)}</div>
      <p className="mt-[20px] text-f16 leading-golden text-t2">Aftercare follows the agreed scope: identify a defect or production change, collect the batch/tool/process records, review the cause, validate the corrective action and update the controlled documents.</p>
      <div className="mt-[24px] flex flex-wrap gap-[16px] text-f14 font-semibold text-teal-text"><a href="/downloads/knowhow-project-scope-template.txt" download className="inline-flex min-h-[44px] items-center underline underline-offset-4">Download project scope template (TXT)</a><a href="/downloads/knowhow-acceptance-handover-checklist.txt" download className="inline-flex min-h-[44px] items-center underline underline-offset-4">Download acceptance & handover checklist (TXT)</a><Link href="#project-brief" className="inline-flex min-h-[44px] items-center">Build your inquiry brief →</Link></div>
    </PageSection>
  );
}
