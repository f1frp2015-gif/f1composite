import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import Figure from "@/components/ui/Figure";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import InnerCTA from "@/components/sections/InnerCTA";
import MachiningTolerancePlanner from "@/components/tools/MachiningTolerancePlanner";
import { machiningGuide as guide, machiningOperations, machiningControlLevels, machiningSources, machiningFaqs } from "@/content/data/frpMachining";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

export const metadata: Metadata = buildPageMetadata({ title: guide.title, description: guide.description, path: guide.path, image: `${guide.path}/opengraph-image` });
const imageRoot = "/images/technology/frp-machining";
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const rfqHref = buildRfqHref({ source: "frp-profile-machining", product: "FRP profile machining", productPath: guide.path, message: "Please review my FRP profile machining requirements.\nStage (trial / first article / production): \nProfile / material / resin: \nDrawing revision and units: \nCut list and quantity: \nHole / slot / notch schedule: \nCritical dimensions and datums: \nMating part or fit gauge: \nService environment and edge treatment: \nInspection records / sampling: \nPart identification and packing: " });

const inspectionRows = [
  ["Raw profile", "Width / OD / ID, wall, straightness, twist and section orientation", "State support positions, gauge length and datum surfaces. Check the incoming section before adding machined features."],
  ["Cut length and end", "Reference end, length convention, angle and end condition", "Use a suitable length/angle method with the part supported as specified. Record the final state after required finishing."],
  ["Hole diameter", "Finished bore size, through or blind depth, opposite-wall alignment", "Choose a bore measurement or calibrated GO/NO-GO gauge appropriate to the feature. Caliper access and display resolution alone do not validate the method."],
  ["Hole / slot location", "Functional datums, coordinates, pitch and any geometric tolerance", "Reproduce the datum setup. Use a suitable fixture or coordinate measurement method; record which faces establish the reference."],
  ["Machined surface", "Loose fibres, edge breakout, layer separation, resin damage and treatment", "Agree visual examples and any numerical defect limits. Measure defects with a suitable method; assess dimensional and visual acceptance separately."],
  ["Fit and traceability", "Counterpart revision, gauge ID, part / lot identity and inspection stage", "If required, perform the physical assembly check and record the counterpart or gauge. A digital model or a photograph does not replace a specified fit test."],
] as const;

export default function FrpProfileMachiningPage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: guide.title, description: guide.description, url: absoluteUrl(guide.path), dateModified: guide.updated, author: { "@type": "Organization", name: "F1 Composite", url: absoluteUrl("/about") }, image: absoluteUrl(`${imageRoot}/machining-overview.svg`), about: ["FRP profile machining", "Fiberglass cutting and drilling", "Dimensional inspection"], citation: machiningSources.map(source => source.href) }} />
    <PageHeader tag="Fabrication guide" title="FRP profile machining: from cut length to inspected part" description="Specify cutting, drilling, slots and CNC machining for pultruded fiberglass and GRP profiles. Define the features that control fit, then agree the process and inspection records for your part." updated={guide.updated}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology", href: "/technology" }, { label: "FRP profile machining" }]}
      facts={[{ label: "Drawing", value: "Revision + datums" }, { label: "Precision", value: "Feature-specific limits" }, { label: "Release", value: "Agreed inspection" }]}
      actions={{ primary: { label: "Discuss a machining RFQ", href: rfqHref }, secondary: { label: "Plan tolerance requirements", href: "#tolerance-planner", variant: "secondary" }, note: "Send your requirements for feasibility review. The drawing and quotation define the agreed supply.", stickyMobile: true }}
      figure={<Figure number={1} title="Machined profile feature map" caption="Original explanatory drawing. Feature placement does not establish a structural design or an available F1 configuration."><Image src={`${imageRoot}/machining-overview.svg`} alt="Illustrative hollow FRP profile with drilled holes, a routed slot and finished end" width={720} height={510} className="h-auto w-full" preload /></Figure>} />
    <PageNav items={[{ id: "scope", label: "Supply scope" }, { id: "specification", label: "Drawing package" }, { id: "operations", label: "Operations" }, { id: "precision", label: "Dimensions & datums" }, { id: "inspection", label: "Inspection records" }, { id: "workflow", label: "Release process" }, { id: "sources", label: "Sources" }, { id: "quote", label: "Machining RFQ" }]} />

    <PageSection id="scope" title="A finished part needs more than a cut length">
      <p className="max-w-[900px] text-f18 leading-relaxed text-t1">{guide.answer}</p>
      <div className="mt-[24px] grid gap-[16px] md:grid-cols-3">{[
        ["1. The incoming profile", "Choose the section and material. Width, wall, straightness and twist affect workholding and the remaining material around a hole or notch."],
        ["2. The machined features", "Specify finished sizes, locations, angles, depths and edge conditions. Identify the dimensions that control the real assembly."],
        ["3. The acceptance record", "Agree how the part will be measured, what must be recorded and when a first article or physical fit test is required."],
      ].map(([title, body]) => <div key={title} className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[8px] text-f16 leading-relaxed text-t2">{body}</p></div>)}</div>
      <p className="mt-[20px] max-w-[860px] text-f14 leading-relaxed text-t2">This guide covers glass-fibre pultruded profiles. Carbon-fibre composites, qualified electrical tools, pressure components and complete structural assemblies need their own process and qualification requirements. Use the material SDS, suitable dust extraction, machine guarding and the workshop&apos;s applicable exposure controls.</p>
    </PageSection>

    <PageSection id="specification" title="Start with an identified profile and drawing package" intro="Define the material entering the workshop and the finished part leaving it. A drawing list alone cannot establish the geometry or the acceptance criteria.">
      <dl className="grid gap-[20px] md:grid-cols-3">{[
        ["Profile and units", "State the section, material reference, quantity and units. Distinguish nominal raw-profile dimensions from finished cut lengths, hole sizes and other machined features."],
        ["Controlled drawings", "Provide the actual files and revisions, datum setup, feature coordinates and limits. Identify the mating part or gauge and whether dimensions apply before or after finishing."],
        ["Evidence and records", "List the material evidence and first-article or production records needed. Confirm applicability to the selected section and formulation, and resolve missing evidence before release."],
      ].map(([title, text]) => <div key={title} className="border-t border-border-default pt-[14px]"><dt className="text-f18 font-bold text-t1">{title}</dt><dd className="mt-[8px] text-f16 leading-relaxed text-t2">{text}</dd></div>)}</dl>
      <p className="mt-[20px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14">
        <Link href="/resources/evidence?category=round-tube" className={linkStyle}>Round-tube evidence package</Link>
        <Link href="/resources/evidence?category=square-tube" className={linkStyle}>Square / rectangular-tube evidence package</Link>
        <Link href="/resources/evidence" className={linkStyle}>Other material and product references</Link>
      </p>
    </PageSection>

    <PageSection id="operations" title="Six machining operations, with drawing and inspection inputs" tone="muted" intro="Use these cards to prepare a finished-part specification. Tooling and process settings must be selected for the actual resin, reinforcement, wall thickness, geometry and production quantity.">
      <div className="grid gap-[24px] lg:grid-cols-2">{machiningOperations.map((operation, index) => <article id={`operation-${operation.id}`} key={operation.id} className="overflow-hidden rounded-card border border-border-default bg-white">
        <div className="border-b border-border-default bg-bg2 p-[12px]"><Image src={`${imageRoot}/${operation.image}.svg`} alt={`${operation.title}: illustrative feature and support requirements`} width={560} height={320} className="h-auto w-full" /></div>
        <div className="p-[20px] sm:p-[24px]"><p className="font-mono text-f12 uppercase tracking-wide text-t3">Operation {index + 1} · schematic, not to scale</p><h3 className="mt-[6px] text-f20 font-bold text-t1">{operation.title}</h3>
          <dl className="mt-[16px] space-y-[12px] text-f16 leading-relaxed">{[["Specify", operation.request], ["Plan the method", operation.method], ["Inspect", operation.check]].map(([label, body]) => <div key={label}><dt className="font-semibold text-t1">{label}</dt><dd className="mt-[2px] text-t2">{body}</dd></div>)}</dl>
          <p className="mt-[16px] border-l-2 border-teal pl-[12px] text-f14 leading-relaxed text-t2">{operation.limit}</p>
        </div>
      </article>)}</div>
      <p className="mt-[20px] text-f14 leading-relaxed text-t2">Technical basis: <a className={linkStyle} href={machiningSources[0].href}>Strongwell</a>, <a className={linkStyle} href={machiningSources[1].href}>Bedford</a>, <a className={linkStyle} href={machiningSources[2].href}>Exel machining guidance</a> and <a className={linkStyle} href={machiningSources[3].href}>Fiberline</a>. Their methods and capabilities apply to their stated products; they are not F1 capacity certificates.</p>
    </PageSection>

    <PageSection id="precision" title="Specify the level of dimensional control your assembly needs" intro="The four levels below organize a purchasing brief. They are not standardized precision grades or published F1 capability bands. A tight limit must be agreed for each material, feature and process.">
      <div className="grid gap-[16px] md:grid-cols-2">{machiningControlLevels.map((level, index) => <article key={level.name} className="rounded-card border border-border-default bg-bg2 p-[22px]"><p className="font-mono text-f12 uppercase tracking-wide text-teal-text">Control level {index + 1}</p><h3 className="mt-[6px] text-f20 font-bold text-t1">{level.name}</h3><p className="mt-[8px] text-f16 leading-relaxed text-t2">{level.function}</p><dl className="mt-[16px] space-y-[12px] text-f14 leading-relaxed">{[["Drawing", level.drawing], ["Verification", level.verification], ["Release evidence", level.release]].map(([label, body]) => <div key={label}><dt className="font-bold text-t1">{label}</dt><dd className="text-t2">{body}</dd></div>)}</dl></article>)}</div>
      <div className="mt-[28px] grid items-start gap-[24px] lg:grid-cols-2">
        <Figure number={2} title="Locate features from functional datums" caption="Illustrative datum arrangement only. Define the datum system, contact/support conditions and measurement setup on the released drawing; do not assume these faces suit every section."><Image src={`${imageRoot}/datum-inspection.svg`} alt="Two holes independently located from end datum C, with a broad support datum A and side datum B" width={560} height={320} className="h-auto w-full" /></Figure>
        <div className="space-y-[12px] text-f16 leading-relaxed text-t2"><h3 className="text-f20 font-bold text-t1">Read a tolerance literally</h3><p>The examples below all use an invented 100 mm nominal dimension. They illustrate arithmetic only. None is a recommended tolerance or an F1 capability claim.</p>
          <div className="overflow-x-auto"><table className="w-full text-left text-f14"><caption className="sr-only">Illustrative dimension limits, not machining grades</caption><thead className="border-b border-border-default text-t1"><tr><th scope="col" className="p-[8px]">Drawing callout</th><th scope="col" className="p-[8px]">Lower / upper limit</th></tr></thead><tbody>{[["100 ±1 mm", "99–101 mm"], ["100 ±0.5 mm", "99.5–100.5 mm"], ["100 ±0.2 mm", "99.8–100.2 mm"], ["100 +0 / −0.1 mm", "99.9–100.0 mm"]].map(([callout, range]) => <tr key={callout} className="border-b border-border-default"><th scope="row" className="p-[8px] font-medium text-t1">{callout}</th><td className="p-[8px]">{range}</td></tr>)}</tbody></table></div>
          <p>A hole&apos;s diameter and its position are different characteristics. A ± coordinate tolerance and a geometric position tolerance are also different specifications. For mating parts, review both components&apos; permitted variation and the final coated or sealed state.</p>
          <p className="text-f14">Product tolerances remain product-specific: <a href={machiningSources[6].href} className={linkStyle}>Strongwell explicitly limits its tables to EXTREN</a>. A general note such as “per standard” does not define every machined feature.</p>
        </div>
      </div>
    </PageSection>

    <PageSection id="tolerance-planner" title="Turn a critical dimension into a clear inquiry" tone="muted"><MachiningTolerancePlanner /></PageSection>

    <PageSection id="inspection" title="Inspect the feature, the surface and the fit" intro="A first article shows the measured condition of an identified part. Production capability requires evidence of repeatability from the agreed process; neither CNC machining nor a gauge display proves it.">
      <p className="mb-[20px] max-w-[900px] text-f14 leading-relaxed text-t2"><a href="/downloads/frp-first-article-inspection-template.csv" download className={linkStyle}>Download the blank first-article inspection template (CSV)</a> to plan the record. It contains no measurements or acceptance decisions; complete it against the identified sample and agreed inspection method.</p>
      <div className="overflow-x-auto rounded-card border border-border-default"><table className="w-full min-w-[700px] text-left text-f14 leading-relaxed"><caption className="sr-only">Machining inspection planning matrix</caption><thead className="bg-bg2 text-t1"><tr>{["Characteristic", "What the drawing must define", "Inspection plan"].map(label => <th key={label} scope="col" className="p-[16px]">{label}</th>)}</tr></thead><tbody>{inspectionRows.map(([name, spec, method]) => <tr key={name} className="border-t border-border-default"><th scope="row" className="p-[16px] align-top font-bold text-t1">{name}</th><td className="p-[16px] align-top text-t2">{spec}</td><td className="p-[16px] align-top text-t2">{method}</td></tr>)}</tbody></table></div>
      <div className="mt-[24px] grid gap-[24px] lg:grid-cols-2"><Figure number={3} title="Keep defect categories separate" caption="Exaggerated visual examples. Actual defect definitions and permissible limits belong in the approved inspection plan."><Image src={`${imageRoot}/defect-checks.svg`} alt="Four schematic defect types: loose fibres, edge breakout, layer separation and heat marking" width={560} height={320} className="h-auto w-full" /></Figure><div className="space-y-[12px] text-f16 leading-relaxed text-t2"><h3 className="text-f20 font-bold text-t1">Record actual values, with enough context</h3><p>A useful first-article sheet identifies the part, material or lot, drawing revision, ballooned feature, required limits, measured value, instrument or gauge, support condition, inspection date and acceptance decision.</p><p>Agree sampling and record requirements for production. Repeat the relevant checks after a tooling, fixture, program, material or process change that can affect the feature. Hold nonconforming parts for the agreed disposition; rework or repair needs approval where it can affect fit or function.</p><Link className={linkStyle} href="/technology/quality-testing#machining-records">Use the inspection-record checklist →</Link></div></div>
    </PageSection>

    <PageSection id="workflow" title="From drawing review to a labeled machining kit" tone="muted" intro="This is a proposed procurement workflow. The quotation and approved documents confirm which operations, trials, records and packing controls are included.">
      <ol className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">{[
        ["Resolve the document package", "Check the drawing list against the actual files, revision and purchase scope. A manufacturing requirements file that lists drawings is not a substitute for those drawings. Resolve missing coordinates, datums and precedence before release."],
        ["Review manufacturability", "Check material, raw-profile variation, tool access, support, wall compression, cutouts and mating clearances. Confirm the machining route and any external processing."],
        ["Approve the first article", "Agree critical dimensions, inspection method, acceptance limits, edge condition and any physical fit check. Resolve deviations before the production run."],
        ["Control the production run", "Keep setup and revision records, monitor tool condition and check the agreed features at the specified frequency. Separate accepted, held and reworked parts."],
        ["Identify and protect parts", "Match part labels, cut-list quantities and any color codes to the assembly schedule. If a color band is specified, agree adhesion, visibility, durability, cure and inspection requirements."],
        ["Release the package", "Reconcile quantities and records, protect machined ends and holes, prevent long-profile distortion, and identify the bundle sequence. Send the agreed inspection and packing documents."],
      ].map(([title, body], index) => <li key={title} className="rounded-card border border-border-default bg-white p-[20px]"><p className="font-mono text-f12 text-teal-text">STEP {index + 1}</p><h3 className="mt-[6px] text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px] text-f16 leading-relaxed text-t2">{body}</p></li>)}</ol>
      <div className="mt-[24px] rounded-card border border-border-default bg-white p-[24px]"><h3 className="text-f20 font-bold text-t1">Example: preparing a drilled tube-frame kit</h3><p className="mt-[10px] max-w-[950px] text-f16 leading-relaxed text-t2">For a hypothetical frame with multiple tube lengths, start with one controlled cut list and a drawing for each hole pattern. Identify the mating connector and critical clearance; keep raw tube size limits separate from hole-size and hole-location limits. Confirm a first-article fit check, then agree part labels, bundle sequence and the inspection records to accompany the shipment. This is a planning example, not a completed-project claim.</p></div>
    </PageSection>

    <PageSection id="related" title="Select the profile and supporting evidence">
      <div className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3">{[
        ["Round fiberglass tubes", "/products/fiberglass-structural-shapes/frp-tube", "OD / ID, wall and cut-length requirements."],
        ["Square and rectangular tubes", "/products/fiberglass-structural-shapes/frp-square-tube", "Face orientation, wall support and mating fit."],
        ["Channels, angles and beams", "/products/fiberglass-structural-shapes", "Section selection before drilling or notching."],
        ["Custom profiles and tooling", "/products/custom-pultruded-profiles", "New section development, trials and tooling scope."],
        ["Resin and exposure review", "/technology/pultrusion-resin-systems", "Chemical, temperature, UV and edge-treatment inputs."],
        ["Fasteners and fittings", "/products/frp-fasteners-fittings", "Matched connection components and inspection requirements."],
        ["Cable-tray support components", "/applications/frp-cable-tray-supports", "Drawing and assembly requirements for support profiles."],
        ["Cooling-tower replacement parts", "/applications/frp-cooling-tower-profiles", "Existing geometry, connection patterns and replacement scope."],
        ["Cut-list planning", "/tools/frp-cut-list-optimizer", "Stock length, saw kerf, trim and order quantities."],
      ].map(([title, href, body]) => <Link key={href} href={href} className="rounded-card border border-border-default p-[20px] hover:border-teal"><h3 className="text-f18 font-bold text-t1">{title} →</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{body}</p></Link>)}</div>
    </PageSection>

    <PageSection id="faq" title="Machining and tolerance questions" tone="muted"><FAQList items={machiningFaqs.map(item => ({ ...item }))} /></PageSection>
    <PageSection id="sources" title="Technical sources and scope" intro="This guide synthesizes representative manufacturers' public fabrication guidance. Source-specific tolerances, machinery, certifications and production claims remain with their original suppliers. All drawings on this page are original explanatory schematics.">
      <ul className="grid gap-[16px] md:grid-cols-2">{machiningSources.map(source => <li key={source.href} className="border-t border-border-default pt-[12px]"><a href={source.href} className={linkStyle}>{source.name}</a><p className="mt-[6px] text-f14 leading-relaxed text-t2">{source.scope}</p></li>)}</ul>
    </PageSection>
    <div id="quote" className="scroll-mt-[128px]"><InnerCTA title="Send the part requirements that control fit" text="Share the profile, material, drawing revision, cut list, hole and slot schedule, critical tolerances and inspection needs. Use the tolerance planner to carry a dimension and its limits into the RFQ, then add the remaining drawing and order requirements. We will review what requires a trial or additional evidence." quoteHref={rfqHref} links={[{ label: "Add a dimension to the RFQ", href: "#tolerance-planner" }, { label: "Quality and evidence", href: "/technology/quality-testing" }, { label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles" }]} /></div>
  </>;
}
