import Link from "next/link";
import { commercialFacts, engineeringEvidence } from "@/content/data/engineeringEvidence";
import { buildRfqHref } from "@/lib/rfq";

const journeys = {
  structural: { title: "Structural profiles", application: "/applications/frp-chemical-plant-platforms", applicationLabel: "Platform components and design inputs", tool: "/frp-profile-calculator", toolLabel: "Check section properties and preliminary response", project: "/case-studies/factory-access-staircase", projectLabel: "Factory access staircase", evidence: "structural-design" },
  windows: { title: "Windows and building profiles", application: "/industries/construction", applicationLabel: "Building applications", tool: "/technology/frp-u-value-calculator", toolLabel: "Calculate whole-window Uw for a stated configuration", project: "/case-studies/qinling-station-antarctic-passive-windows", projectLabel: "Qinling window project and component evidence", evidence: "phi-2491wi03" },
  specialty: { title: "Project product", application: "/applications", applicationLabel: "Review application requirements", tool: "/resources/technical-data", toolLabel: "Review material selection and test methods", project: "/case-studies", projectLabel: "Explore project and engineering references", evidence: "" },
  wind: { title: "Wind turbine blade panels", application: "/industries/energy", applicationLabel: "Energy applications", tool: "/products/wind-turbine-blade-panels", toolLabel: "Review laminate specification inputs", project: "/resources/downloads", projectLabel: "Related technical downloads", evidence: "wind-laminate" },
  custom: { title: "Custom pultrusions", application: "/technology/pultrusion-process", applicationLabel: "Review the pultrusion process", tool: "/resources/technical-data", toolLabel: "Compare material and test references", project: "/case-studies", projectLabel: "Explore project and engineering references", evidence: "pu-gf-data" },
};

export default function ProductNextSteps({ path }: { path: string }) {
  const journey = /window-frames/.test(path) ? journeys.windows : /wind-turbine/.test(path) ? journeys.wind : /custom-pultruded/.test(path) ? journeys.custom : /structural-shapes|grating|stair-treads|handrail|ladder|deck-panels/.test(path) ? journeys.structural : journeys.specialty;
  const document = engineeringEvidence.find((entry) => entry.id === journey.evidence);
  return (
    <section className="border-y border-border-default bg-bg2 py-[36px]" aria-label="Specification and quotation next steps">
      <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
        <h2 className="text-f24 font-bold text-t1">From selection to a project quotation</h2>
        <p className="mt-[8px] max-w-[850px] text-f13 text-t2">{commercialFacts.availability}</p>
        <div className="mt-[22px] grid gap-[24px] md:grid-cols-3">
          <div><h3 className="font-bold text-t1">1. Check the application</h3><Link className="mt-[8px] block text-f13 text-teal-text underline underline-offset-4" href={journey.application}>{journey.applicationLabel}</Link><Link className="mt-[8px] block text-f13 text-teal-text underline underline-offset-4" href={journey.tool}>{journey.toolLabel}</Link></div>
          <div><h3 className="font-bold text-t1">2. Review supporting evidence</h3><Link className="mt-[8px] block text-f13 text-teal-text underline underline-offset-4" href={document ? `/resources/evidence#${document.id}` : "/resources/evidence"}>{document ? `${document.title} and scope` : "Find applicable product evidence"}</Link><Link className="mt-[8px] block text-f13 text-teal-text underline underline-offset-4" href={journey.project}>{journey.projectLabel}</Link><p className="mt-[8px] text-f11 text-t3">Confirm that the document and project match your proposed product.</p></div>
          <div><h3 className="font-bold text-t1">3. Send the specification</h3><p className="mt-[8px] text-f13 text-t2">Include the drawing, resin or environment, loads, quantity and destination.</p><Link className="mt-[12px] inline-flex min-h-[44px] items-center rounded-[6px] bg-teal-text px-[16px] text-f13 font-bold text-white" href={buildRfqHref({ source: "product-next-steps", product: journey.title, productPath: path })}>Request a specification review</Link></div>
        </div>
      </div>
    </section>
  );
}
