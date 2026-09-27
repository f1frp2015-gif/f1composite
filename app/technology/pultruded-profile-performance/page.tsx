import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Figure from "@/components/ui/Figure";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import Button from "@/components/ui/Button";
import AnswerBlocks from "@/components/sections/AnswerBlocks";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";
import { E17_MIN, E23_MIN } from "@/lib/catalog/en13706";
import {
  chemicalExamples, performanceFaqs, performancePath, performanceReviewed,
  performanceSections, performanceSources, type PerformanceSourceId,
} from "@/content/data/pultrudedPerformance";

export const metadata: Metadata = buildPageMetadata({
  title: "Pultruded FRP Profile Performance & Standards",
  description: "Specify pultruded FRP dimensions, mechanical, thermal, electrical, fire and chemical performance with GB, EN, ISO and ASTM references and test conditions.",
  path: performancePath,
  image: `${performancePath}/opengraph-image`,
});

const rfqHref = buildRfqHref({
  source: "pultruded-profile-performance",
  product: "Pultruded FRP profiles",
  productPath: performancePath,
  message: "Please review the performance requirements for my pultruded profile.\nDrawing / dimensions / tolerances:\nResin and reinforcement:\nLoad and direction:\nTemperature and exposure:\nElectrical / fire requirement:\nChemical, concentration and contact mode:\nStandard, edition and target values:\nQuantity and required test reports:",
});

function SourceLinks({ ids }: { ids: PerformanceSourceId[] }) {
  return <p className="mt-4 text-f14 leading-relaxed text-t2">
    <span className="font-semibold">References: </span>
    {ids.map((id, index) => <span key={id}>
      {index > 0 ? " · " : ""}
      <a href={performanceSources[id].href} className="text-teal-text underline decoration-teal-border underline-offset-4 hover:decoration-teal-text">{performanceSources[id].label}</a>
    </span>)}
  </p>;
}

function DimensionSketch() {
  return <figure className="rounded-card border border-border-default bg-white p-5">
    <svg viewBox="0 0 520 250" role="img" aria-labelledby="profile-sketch-title profile-sketch-desc" className="mx-auto w-full max-w-[560px]">
      <title id="profile-sketch-title">Profile dimensions and material directions</title>
      <desc id="profile-sketch-desc">A schematic hollow rectangular profile showing outside width b, height h, wall thickness t, and longitudinal direction L along the profile. The section is not drawn to scale.</desc>
      <defs><marker id="profile-arrow" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto-start-reverse"><path d="M0 0 L7 3.5 L0 7Z" fill="#007a74" /></marker></defs>
      <path d="M130 75 L315 30 L465 30 L280 75Z" fill="#e9f4f2" stroke="#0b1838" strokeWidth="2" />
      <path d="M280 75 L465 30 L465 160 L280 205Z" fill="#d5eae6" stroke="#0b1838" strokeWidth="2" />
      <path d="M130 75H280V205H130Z M150 95V185H260V95Z" fillRule="evenodd" fill="#0b1838" />
      <path d="M150 185L260 158V95" fill="none" stroke="#a2b9b6" strokeWidth="1.5" />
      <g fill="none" stroke="#007a74" strokeWidth="1.5">
        <path d="M130 215V239M280 215V239M95 75H120M95 205H120" />
        <path d="M135 230H275M105 80V200M150 117H130M315 207L450 175" markerStart="url(#profile-arrow)" markerEnd="url(#profile-arrow)" />
      </g>
      <g fill="#0b1838" fontSize="16" fontFamily="sans-serif">
        <text x="200" y="224">b</text><text x="82" y="145">h</text><text x="163" y="122">t</text>
        <text x="331" y="235">L · pultrusion direction</text>
        <text x="146" y="52">Cross-section</text>
      </g>
    </svg>
    <figcaption className="mt-3 text-f14 text-t2">b = width · h = height · t = wall thickness. L follows the continuous fibers; transverse and through-thickness properties require separate data. Schematic, not to scale.</figcaption>
  </figure>;
}

function ChemicalComparison({ ground }: { ground: string }) {
  return <div className={`mt-7 rounded-card border border-border-default p-5 sm:p-6 ${ground}`}>
    <h3 className="text-f18 font-bold text-t1">How resin and temperature change a screening result</h3>
    <p className="mt-2 text-f14 text-t2">Selected NHC supplier-chart examples, reproduced as a comparison reference. ISO here means <strong>isophthalic polyester</strong>; VE means vinyl ester. These are not F1 test results or approved service limits.</p>
    <div role="region" aria-label="Chemical screening examples, scroll horizontally" tabIndex={0} className="relative mt-4 overflow-x-auto rounded-card border border-border-default bg-white focus-visible:outline-2 focus-visible:outline-teal-text">
      <table className="w-full min-w-[580px] border-collapse text-f14">
        <caption className="sr-only">Supplier screening at 20 and 50 degrees Celsius by resin type</caption>
        <thead className="border-b border-border-default bg-bg2 text-t1"><tr>
          {["Chemical / concentration", "ISO · 20°C", "ISO · 50°C", "VE · 20°C", "VE · 50°C"].map(label => <th key={label} scope="col" className="px-[14px] py-[8px] text-left font-semibold">{label}</th>)}
        </tr></thead>
        <tbody>{chemicalExamples.map(row => <tr key={row.chemical} className="border-b border-border-default last:border-b-0">
          <th scope="row" className="px-[14px] py-[10px] text-left font-semibold text-t1">{row.chemical}</th>
          {[row.iso20, row.iso50, row.ve20, row.ve50].map((rating, i) => <td key={i} className="px-[14px] py-[10px]"><span aria-label={rating === "+" ? "Good resistance in supplier chart" : rating === "0" ? "Possible attack; consider another resin" : "Unsuitable in supplier chart"} className="font-bold">{rating}</span></td>)}
        </tr>)}</tbody>
      </table>
    </div>
    <p className="mt-3 text-f14 text-t2">+ Good resistance in the source chart · 0 Possible attack; consider another resin · − Unsuitable in the source chart. The chart does not provide a complete exposure duration, stress or laminate specification; confirm compatibility for the actual supply.</p>
    <SourceLinks ids={["nhcChemical"]} />
  </div>;
}

const gradeRows: { key: keyof typeof E23_MIN; label: string; unit: string }[] = [
  { key: "e_l_gpa", label: "Tensile modulus · L", unit: "GPa" },
  { key: "e_t_gpa", label: "Tensile modulus · T", unit: "GPa" },
  { key: "tensile_l_mpa", label: "Tensile strength · L", unit: "MPa" },
  { key: "tensile_t_mpa", label: "Tensile strength · T", unit: "MPa" },
  { key: "flexural_l_mpa", label: "Flexural strength · L", unit: "MPa" },
  { key: "flexural_t_mpa", label: "Flexural strength · T", unit: "MPa" },
  { key: "shear_mpa", label: "Apparent interlaminar shear strength", unit: "MPa" },
];

function GradeComparison({ ground }: { ground: string }) {
  return <div className={`mt-7 rounded-card border border-border-default p-5 sm:p-6 ${ground}`}>
    <h3 className="text-f18 font-bold text-t1">E17 / E23: selected reference minimums</h3>
    <p className="mt-2 text-f14 text-t2">Selected EN 13706-3 grade requirements, cross-checked against Fiberline’s published comparison. These are standard reference minimums, not F1 measured results or design allowables. L = longitudinal; T = transverse.</p>
    <div role="region" aria-label="E17 and E23 grade comparison, scroll horizontally" tabIndex={0} className="relative mt-4 overflow-x-auto rounded-card border border-border-default bg-white focus-visible:outline-2 focus-visible:outline-teal-text">
      <table className="w-full min-w-[460px] border-collapse text-f14">
        <caption className="sr-only">Selected EN 13706 E17 and E23 minimum material properties</caption>
        <thead className="border-b border-border-default bg-bg2 text-t1"><tr>{["Property", "Unit", "E17 minimum", "E23 minimum"].map(label => <th key={label} scope="col" className="px-[14px] py-[8px] text-left font-semibold">{label}</th>)}</tr></thead>
        <tbody>{gradeRows.map(row => <tr key={row.key} className="border-b border-border-default last:border-b-0"><th scope="row" className="px-[14px] py-[10px] text-left font-semibold text-t1">{row.label}</th><td className="px-[14px] py-[10px] text-t2">{row.unit}</td><td className="px-[14px] py-[10px] tabular-nums">{E17_MIN[row.key]}</td><td className="px-[14px] py-[10px] font-semibold tabular-nums">{E23_MIN[row.key]}</td></tr>)}</tbody>
      </table>
    </div>
    <p className="mt-3 text-f14 text-t2">This is a selected-property summary, not a complete grade acceptance checklist. Full-section stiffness, pin bearing and the other applicable requirements must also be verified. Compare with <Link href="/resources/technical-data" className="font-semibold text-teal-text underline">F1’s published material reference</Link> before requesting product-specific evidence.</p>
    <SourceLinks ids={["enGrades", "gradeReference"]} />
  </div>;
}

export default function PultrudedProfilePerformancePage() {
  return <>
    <JsonLd data={{
      "@context": "https://schema.org", "@type": "WebPage",
      name: "Pultruded FRP Profile Performance & Standards", url: absoluteUrl(performancePath),
      description: "A specification reference for six areas of pultruded-profile performance, with test methods, source attribution and acceptance conditions.",
      dateModified: performanceReviewed,
      publisher: { "@id": "https://www.f1composite.com/#organization" },
      citation: Object.values(performanceSources).map(source => source.href),
    }} />
    <PageHeader updated={performanceReviewed} tag="Engineering / Material performance" title="Pultruded profile performance" description="From dimensional fit to chemical exposure: define the properties, test methods and conditions that matter for your FRP profile."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology", href: "/technology" }, { label: "Profile Performance" }]}
      figure={<Figure number={1} title="A profile, drawn and rendered" note="Drawing and rendering"><Image src="/images/technology/frp-profile-engineering-drawing-3d-render.jpg" alt="Dimensioned drawing and rendering of a custom pultruded FRP profile" width={1280} height={640} sizes="(max-width: 1023px) 94vw, 44vw" preload className="h-auto w-full" /></Figure>}
      actions={{ primary: { label: "Review my specification", href: rfqHref }, secondary: { label: "View material data", href: "/resources/technical-data", variant: "secondary" }, note: "For glass-fiber thermoset profiles. Carbon, hybrid and special formulations require their own data." }} />
    <PageNav items={[{ id: "method", label: "Method" }, ...performanceSections.map((section) => ({ id: section.id, label: section.short })), { id: "standards", label: "Standards" }, { id: "specification", label: "Specification" }, { id: "sources", label: "Sources" }, { id: "faq", label: "FAQ" }]} />

    <PageSection id="method" title="Define, specify, verify">
      <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
        {[
          { title: "Geometry and material", body: "Start with the drawing, resin, reinforcement and surface finish. These establish what the test data applies to." },
          { title: "Method and conditions", body: "Name the standard and edition, direction, conditioning, temperature and acceptance value for each property." },
          { title: "Report and supplied product", body: "Match the tested specimen and report scope to the profile being offered. Agree any additional tests before production." },
        ].map((item, index) => <li key={item.title} className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1} · {["Define", "Specify", "Verify"][index]}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p></li>)}
      </ol>
      <div className="mt-[16px] rounded-card border border-teal-border bg-teal-bg p-[20px] sm:p-[24px]">
        <h3 className="text-f18 font-bold text-t1">How to read these tables</h3>
        <p className="mt-[8px] text-f16 leading-golden text-t2">Published references illustrate the property and its units. Product-specific values and drawing tolerances must be confirmed for the offered configuration. References to a standard do not assert certification or compliance.</p>
        <p className="mt-[8px] text-f14 leading-golden text-t2">A standard minimum, a typical published value, a measured batch result and a design allowable have different meanings. Use the <Link href="/resources/technical-data" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">material data page</Link> for the existing E23 table, and the <Link href="/resources/evidence" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">evidence library</Link> for available documents.</p>
      </div>
    </PageSection>

    {performanceSections.map((section, index) => {
      const tone = index % 2 === 0 ? "muted" : "white";
      const ground = tone === "muted" ? "bg-white" : "bg-bg2";
      return <PageSection key={section.id} id={section.id} title={section.title} intro={section.intro} tone={tone}>
        {section.id === "dimensions" ? <div className="mb-[20px]"><DimensionSketch /></div> : null}
        <p className="mb-[8px] text-f14 text-t3 sm:hidden">Scroll the table horizontally to view methods and conditions.</p>
        <div role="region" aria-label={`${section.title} table, scroll horizontally`} tabIndex={0} className="relative overflow-x-auto rounded-card border border-border-default bg-white focus-visible:outline-2 focus-visible:outline-teal-text">
          <table className="w-full min-w-[780px] border-collapse text-f14">
            <caption className="sr-only">{section.title}: metrics, reference basis, methods and conditions</caption>
            <thead><tr className="border-b border-border-default bg-bg2">
              <th scope="col" className="w-[20%] px-[14px] py-[8px] text-left font-semibold text-t1">Property / unit</th>
              <th scope="col" className="w-[23%] px-[14px] py-[8px] text-left font-semibold text-t1">Value or specification</th>
              <th scope="col" className="w-[23%] px-[14px] py-[8px] text-left font-semibold text-t1">Test / specification route</th>
              <th scope="col" className="px-[14px] py-[8px] text-left font-semibold text-t1">Conditions to confirm</th>
            </tr></thead>
            <tbody>{section.rows.map(row => <tr key={row.property} className="border-b border-border-default align-top last:border-b-0">
              <th scope="row" className="px-[14px] py-[12px] text-left font-semibold text-t1">{row.property}<span className="mt-[4px] block text-f14 font-normal text-t2">{row.unit}</span></th>
              <td className="px-[14px] py-[12px]"><span className={`mb-[6px] inline-block rounded-tag px-[8px] py-[3px] text-f12 font-semibold ${row.basis === "Published reference" ? "bg-teal-bg2 text-teal-text" : "bg-bg2 text-t2"}`}>{row.basis}</span><span className="block text-t1">{row.reference}</span></td>
              <td className="px-[14px] py-[12px] leading-golden text-t2">{row.methods}</td>
              <td className="px-[14px] py-[12px] leading-golden text-t2">{row.conditions}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[820px] border-l-[3px] border-teal pl-[16px] text-f16 leading-golden text-t2">{section.takeaway}</p>
        {section.id === "fire" ? <p className={`mt-[16px] rounded-card border border-border-default p-[16px] text-f14 leading-golden text-t2 ${ground}`}><strong className="text-t1">China edition check · September 21, 2026:</strong> GB 8624-2012 remains current. GB 8624-2025 is published and takes effect on <strong className="text-t1">January 1, 2027</strong>. Confirm the edition required for the project approval date. <a href={performanceSources.gbFire2025.href} className="font-semibold text-teal-text underline underline-offset-4">SAMR implementation record</a>.</p> : null}
        <SourceLinks ids={section.sources} />
        {section.id === "physical-mechanical" ? <GradeComparison ground={ground} /> : null}
        {section.id === "chemical" ? <ChemicalComparison ground={ground} /> : null}
      </PageSection>;
    })}

    <PageSection id="standards" title="Choose a specification route" tone={performanceSections.length % 2 === 0 ? "muted" : "white"} intro="These documents have different jobs. Select the governing product specification, then the relevant property tests and end-use requirements. Listing several methods does not make their results interchangeable.">
      <div className="grid gap-[12px] sm:grid-cols-2">
        {[
          { title: "China · structural profiles", text: "GB/T 31539-2015 provides the structural pultruded-profile specification route. Use the specified test methods, grade and acceptance criteria for the project.", ids: ["gbProfiles"] as PerformanceSourceId[] },
          { title: "Europe · EN 13706 series", text: "Part 1 covers designation; Part 2 covers test methods and general requirements; Part 3 covers grade requirements. E17 and E23 are profile grades, not fire or insulation classes.", ids: ["enTests", "enGrades"] as PerformanceSourceId[] },
          { title: "United States · ASTM methods", text: "D3917 addresses dimensions; D4385 addresses visual defects. Mechanical, thermal, electrical and fire properties require their relevant tests and agreed acceptance values.", ids: ["dimensions", "appearance", "composites"] as PerformanceSourceId[] },
          { title: "Test result → engineering design", text: "Define whether a value is a mean, minimum or characteristic result. Establish member and connection capacity with the governing design rules, load duration and environmental factors.", ids: ["composites"] as PerformanceSourceId[] },
        ].map(card => <article key={card.title} className={`rounded-card border border-border-default p-[20px] sm:p-[24px] ${performanceSections.length % 2 === 0 ? "bg-white" : "bg-bg2"}`}><h3 className="text-f18 font-bold text-t1">{card.title}</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{card.text}</p><SourceLinks ids={card.ids} /></article>)}
      </div>
    </PageSection>

    <PageSection id="specification" title="Build a testable specification" tone={performanceSections.length % 2 === 0 ? "white" : "muted"} intro="From reference to RFQ: four things a specification names, so the offered profile can be tested against it.">
      <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Product", "Profile drawing and revision, cut length, tolerances, resin, reinforcement, finish and quantity."],
          ["Service", "Load direction and duration, temperature range, UV and moisture, chemicals and contact mode."],
          ["Acceptance", "Each target or minimum, standard and edition, specimen direction, conditioning and sampling frequency."],
          ["Evidence", "Report identification, specimen match, batch traceability and any independent or witnessed testing required."],
        ].map(([title, body], index) => <li key={title} className={`rounded-card border border-border-default p-[20px] ${performanceSections.length % 2 === 0 ? "bg-bg2" : "bg-white"}`}><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Input {index + 1}</p><h3 className="mt-[4px] text-f16 font-bold text-t1">{title}</h3><p className="mt-[6px] text-f14 leading-golden text-t2">{body}</p></li>)}
      </ol>
      <div className="mt-[20px]"><Button href={rfqHref}>Send my performance requirements</Button></div>
    </PageSection>

    <PageSection id="sources" title="Standards and published references" tone={performanceSections.length % 2 === 0 ? "muted" : "white"} intro="Reviewed September 21, 2026. Public catalog records establish document identity and scope; use the licensed standard and the agreed edition for contractual limits and complete procedures. Supplier and industry examples remain separately attributed.">
      <details className={`rounded-card border border-border-default p-[20px] ${performanceSections.length % 2 === 0 ? "bg-white" : "bg-bg2"}`}>
        <summary className="cursor-pointer text-f16 font-bold text-t1">Browse all {Object.keys(performanceSources).length} references</summary>
        <ul className="mt-[16px] grid gap-[16px] sm:grid-cols-2">{Object.entries(performanceSources).map(([id, source]) => <li key={id}><a className="text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal" href={source.href}>{source.label}</a><p className="mt-[2px] text-f14 leading-golden text-t2">{source.note}</p></li>)}</ul>
      </details>
    </PageSection>

    <AnswerBlocks title="Profile performance questions" items={performanceFaqs} tone={performanceSections.length % 2 === 0 ? "white" : "muted"} />
    <RelatedLinks
      background={performanceSections.length % 2 === 0 ? "bg2" : "white"}
      groups={[
        { title: "Materials", links: [{ href: "/technology/pultrusion-resin-systems", label: "Compare resin systems" }, { href: "/resources/technical-data", label: "Material data (E23)" }, { href: "/resources/evidence", label: "Test reports and their scope" }] },
        { title: "Quality", links: [{ href: "/technology/quality-testing", label: "Quality and testing" }, { href: "/technology/pultrusion-process", label: "How pultrusion works" }] },
        { title: "Products and tools", links: [{ href: "/products/fiberglass-structural-shapes", label: "Find a profile" }, { href: "/frp-density-calculator", label: "Calculate profile weight" }] },
      ]}
    />
    <InnerCTA title="Specify the performance your application needs" quoteHref={rfqHref} />
  </>;
}
