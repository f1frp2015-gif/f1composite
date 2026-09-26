import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
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

function ChemicalComparison() {
  return <div className="mt-7 rounded-card border border-border-default bg-bg2 p-5 sm:p-6">
    <h3 className="text-f18 font-bold">How resin and temperature change a screening result</h3>
    <p className="mt-2 text-f14 text-t2">Selected NHC supplier-chart examples, reproduced as a comparison reference. ISO here means <strong>isophthalic polyester</strong>; VE means vinyl ester. These are not F1 test results or approved service limits.</p>
    <div role="region" aria-label="Chemical screening examples, scroll horizontally" tabIndex={0} className="mt-4 overflow-x-auto rounded-card focus-visible:outline-2 focus-visible:outline-teal-text">
      <table className="w-full min-w-[580px] border-collapse text-f14">
        <caption className="sr-only">Supplier screening at 20 and 50 degrees Celsius by resin type</caption>
        <thead className="bg-deep text-white"><tr>
          {["Chemical / concentration", "ISO · 20°C", "ISO · 50°C", "VE · 20°C", "VE · 50°C"].map(label => <th key={label} scope="col" className="px-3 py-3 text-left font-semibold">{label}</th>)}
        </tr></thead>
        <tbody>{chemicalExamples.map(row => <tr key={row.chemical} className="border-b border-border-default bg-white">
          <th scope="row" className="p-3 text-left font-medium">{row.chemical}</th>
          {[row.iso20, row.iso50, row.ve20, row.ve50].map((rating, i) => <td key={i} className="p-3"><span aria-label={rating === "+" ? "Good resistance in supplier chart" : rating === "0" ? "Possible attack; consider another resin" : "Unsuitable in supplier chart"} className="font-bold">{rating}</span></td>)}
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

function GradeComparison() {
  return <div className="mt-7 rounded-card border border-border-default bg-bg2 p-5 sm:p-6">
    <h3 className="text-f18 font-bold">E17 / E23: selected reference minimums</h3>
    <p className="mt-2 text-f14 text-t2">Selected EN 13706-3 grade requirements, cross-checked against Fiberline’s published comparison. These are standard reference minimums, not F1 measured results or design allowables. L = longitudinal; T = transverse.</p>
    <div role="region" aria-label="E17 and E23 grade comparison, scroll horizontally" tabIndex={0} className="mt-4 overflow-x-auto rounded-card focus-visible:outline-2 focus-visible:outline-teal-text">
      <table className="w-full min-w-[460px] border-collapse text-f14">
        <caption className="sr-only">Selected EN 13706 E17 and E23 minimum material properties</caption>
        <thead className="bg-deep text-white"><tr>{["Property", "Unit", "E17 minimum", "E23 minimum"].map(label => <th key={label} scope="col" className="p-3 text-left font-semibold">{label}</th>)}</tr></thead>
        <tbody>{gradeRows.map(row => <tr key={row.key} className="border-b border-border-default bg-white"><th scope="row" className="p-3 text-left font-medium">{row.label}</th><td className="p-3 text-t2">{row.unit}</td><td className="p-3 tabular-nums">{E17_MIN[row.key]}</td><td className="p-3 font-semibold tabular-nums">{E23_MIN[row.key]}</td></tr>)}</tbody>
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
    <PageHeader tag="Engineering / Material performance" title="Pultruded profile performance" description="From dimensional fit to chemical exposure: define the properties, test methods and conditions that matter for your FRP profile."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology", href: "/technology" }, { label: "Profile Performance" }]}
      actions={{ primary: { label: "Review My Specification", href: rfqHref }, secondary: { label: "View Material Data", href: "/resources/technical-data" }, note: "For glass-fiber thermoset profiles. Carbon, hybrid and special formulations require their own data." }} />

    <section className="border-b border-border-default bg-white py-8 sm:py-10">
      <div className="site-container grid gap-6 md:grid-cols-3">
        {[
          { label: "01 / Define", title: "Geometry + material", body: "Start with the drawing, resin, reinforcement and surface finish. These establish what the test data applies to." },
          { label: "02 / Specify", title: "Method + conditions", body: "Name the standard and edition, direction, conditioning, temperature and acceptance value for each property." },
          { label: "03 / Verify", title: "Report + supplied product", body: "Match the tested specimen and report scope to the profile being offered. Agree any additional tests before production." },
        ].map(item => <div key={item.label}><p className="text-f14 font-bold text-teal-text">{item.label}</p><h2 className="mt-2 text-f18 font-bold">{item.title}</h2><p className="mt-2 text-f14 text-t2">{item.body}</p></div>)}
      </div>
    </section>

    <div className="site-container grid gap-8 py-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-10">
      <aside className="min-w-0">
        <nav aria-label="Performance page contents" className="rounded-card border border-border-default bg-bg2 p-5 lg:sticky lg:top-[110px]">
          <p className="text-f14 font-bold uppercase tracking-wider text-t2">On this page</p>
          <ol className="mt-3 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
            {performanceSections.map((section, index) => <li key={section.id}><a className="flex min-h-11 items-center gap-3 rounded-tag px-2 py-2 text-f14 font-semibold text-t1 hover:bg-white hover:text-teal-text" href={`#${section.id}`}><span className="text-teal-text">0{index + 1}</span>{section.short}</a></li>)}
            <li><a href="#standards" className="block px-2 py-3 text-f14 font-semibold text-t1 hover:text-teal-text">Standards & scope</a></li>
            <li><a href="#specification" className="block px-2 py-3 text-f14 font-semibold text-t1 hover:text-teal-text">Specification checklist</a></li>
            <li><a href="#sources" className="block px-2 py-3 text-f14 font-semibold text-t1 hover:text-teal-text">Source library</a></li>
          </ol>
        </nav>
      </aside>

      <div className="min-w-0">
        <div className="mb-10 rounded-card border border-teal-border bg-teal-bg p-5 sm:p-6">
          <h2 className="text-f18 font-bold">How to read these tables</h2>
          <p className="mt-2 text-f16 text-t2">Published references illustrate the property and its units. Product-specific values and drawing tolerances must be confirmed for the offered configuration. References to a standard do not assert certification or compliance.</p>
          <p className="mt-3 text-f14 text-t2">A standard minimum, a typical published value, a measured batch result and a design allowable have different meanings. Use the <Link href="/resources/technical-data" className="font-semibold text-teal-text underline">material data page</Link> for the existing E23 table, and the <Link href="/resources/evidence" className="font-semibold text-teal-text underline">evidence library</Link> for available documents.</p>
        </div>

        {performanceSections.map((section, index) => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="mb-14 scroll-mt-[115px]">
          <SectionTag>0{index + 1} / Performance</SectionTag>
          <h2 id={`${section.id}-heading`} className="mt-3 text-f32 font-bold tracking-[-0.02em] text-t1">{section.title}</h2>
          <p className="mt-3 text-f16 leading-relaxed text-t2">{section.intro}</p>
          {section.id === "dimensions" ? <div className="mt-5"><DimensionSketch /></div> : null}
          <p className="mt-5 text-f14 text-t3 sm:hidden">Scroll the table horizontally to view methods and conditions.</p>
          <div role="region" aria-label={`${section.title} table, scroll horizontally`} tabIndex={0} className="mt-3 overflow-x-auto rounded-card border border-border-default focus-visible:outline-2 focus-visible:outline-teal-text sm:mt-5">
            <table className="w-full min-w-[780px] border-collapse text-f14">
              <caption className="sr-only">{section.title}: metrics, reference basis, methods and conditions</caption>
              <thead className="bg-deep text-white"><tr>
                <th scope="col" className="w-[20%] p-4 text-left font-semibold">Property / unit</th>
                <th scope="col" className="w-[23%] p-4 text-left font-semibold">Value or specification</th>
                <th scope="col" className="w-[23%] p-4 text-left font-semibold">Test / specification route</th>
                <th scope="col" className="p-4 text-left font-semibold">Conditions to confirm</th>
              </tr></thead>
              <tbody>{section.rows.map(row => <tr key={row.property} className="border-b border-border-default last:border-0 even:bg-bg2/60">
                <th scope="row" className="p-4 text-left align-top font-semibold text-t1">{row.property}<span className="mt-2 block text-f14 font-normal text-t2">{row.unit}</span></th>
                <td className="p-4 align-top"><span className={`mb-2 inline-block rounded-tag px-2 py-1 text-f12 font-semibold ${row.basis === "Published reference" ? "bg-teal-bg2 text-teal-text" : "bg-bg2 text-t2"}`}>{row.basis}</span><span className="block text-t1">{row.reference}</span></td>
                <td className="p-4 align-top text-t2">{row.methods}</td>
                <td className="p-4 align-top text-t2">{row.conditions}</td>
              </tr>)}</tbody>
            </table>
          </div>
          <p className="mt-4 border-l-[3px] border-teal pl-4 text-f16 leading-relaxed text-t2">{section.takeaway}</p>
          {section.id === "fire" ? <p className="mt-4 rounded-card bg-bg2 p-4 text-f14 text-t2"><strong>China edition check · 21 September 2026:</strong> GB 8624-2012 remains current. GB 8624-2025 is published and takes effect on <strong>1 January 2027</strong>. Confirm the edition required for the project approval date. <a href={performanceSources.gbFire2025.href} className="text-teal-text underline">SAMR implementation record</a>.</p> : null}
          <SourceLinks ids={section.sources} />
          {section.id === "physical-mechanical" ? <GradeComparison /> : null}
          {section.id === "chemical" ? <ChemicalComparison /> : null}
        </section>)}

        <section id="standards" className="mb-14 scroll-mt-[115px]">
          <SectionTag>Standards & scope</SectionTag>
          <h2 className="mt-3 text-f32 font-bold tracking-[-0.02em]">Choose a specification route</h2>
          <p className="mt-3 text-f16 text-t2">These documents have different jobs. Select the governing product specification, then the relevant property tests and end-use requirements. Listing several methods does not make their results interchangeable.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { title: "China · structural profiles", text: "GB/T 31539-2015 provides the structural pultruded-profile specification route. Use the specified test methods, grade and acceptance criteria for the project.", ids: ["gbProfiles"] as PerformanceSourceId[] },
              { title: "Europe · EN 13706 series", text: "Part 1 covers designation; Part 2 covers test methods and general requirements; Part 3 covers grade requirements. E17 and E23 are profile grades, not fire or insulation classes.", ids: ["enTests", "enGrades"] as PerformanceSourceId[] },
              { title: "United States · ASTM methods", text: "D3917 addresses dimensions; D4385 addresses visual defects. Mechanical, thermal, electrical and fire properties require their relevant tests and agreed acceptance values.", ids: ["dimensions", "appearance", "composites"] as PerformanceSourceId[] },
              { title: "Test result → engineering design", text: "Define whether a value is a mean, minimum or characteristic result. Establish member and connection capacity with the governing design rules, load duration and environmental factors.", ids: ["composites"] as PerformanceSourceId[] },
            ].map(card => <article key={card.title} className="rounded-card border border-border-default bg-bg2 p-5"><h3 className="text-f18 font-bold">{card.title}</h3><p className="mt-3 text-f14 text-t2">{card.text}</p><SourceLinks ids={card.ids} /></article>)}
          </div>
        </section>

        <section id="specification" className="mb-14 scroll-mt-[115px] rounded-card bg-deep p-6 text-white sm:p-8">
          <p className="text-f14 font-semibold text-white/75">FROM REFERENCE TO RFQ</p>
          <h2 className="mt-3 text-f24 font-bold">Build a testable specification</h2>
          <ol className="mt-5 space-y-3 text-f16 text-white/85">
            <li><strong className="text-white">1. Product:</strong> profile drawing and revision, cut length, tolerances, resin, reinforcement, finish and quantity.</li>
            <li><strong className="text-white">2. Service:</strong> load direction and duration, temperature range, UV / moisture, chemicals and contact mode.</li>
            <li><strong className="text-white">3. Acceptance:</strong> each target or minimum, standard and edition, specimen direction, conditioning and sampling frequency.</li>
            <li><strong className="text-white">4. Evidence:</strong> report identification, specimen match, batch traceability and any independent or witnessed testing required.</li>
          </ol>
          <Link href={rfqHref} className="mt-6 inline-flex min-h-11 items-center rounded-card bg-white px-5 py-3 font-bold text-deep hover:bg-bg2">Send My Performance Requirements →</Link>
        </section>

        <section id="sources" className="scroll-mt-[115px]">
          <SectionTag>Source library</SectionTag>
          <h2 className="mt-3 text-f24 font-bold">Standards and published references</h2>
          <p className="mt-3 text-f14 text-t2">Reviewed 21 September 2026. Public catalogue records establish document identity and scope; use the licensed standard and the agreed edition for contractual limits and complete procedures. Supplier and industry examples remain separately attributed.</p>
          <details className="mt-5 rounded-card border border-border-default bg-bg2 p-5">
            <summary className="cursor-pointer text-f16 font-bold text-t1">Browse all {Object.keys(performanceSources).length} references</summary>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2">{Object.entries(performanceSources).map(([id, source]) => <li key={id}><a className="text-f14 font-semibold text-teal-text underline underline-offset-4" href={source.href}>{source.label}</a><p className="mt-1 text-f14 text-t2">{source.note}</p></li>)}</ul>
          </details>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-f14 font-semibold text-teal-text">
            <Link href="/technology/pultrusion-resin-systems" className="underline">Compare resin systems</Link>
            <Link href="/technology/quality-testing" className="underline">Quality & testing</Link>
            <Link href="/products/fiberglass-structural-shapes" className="underline">Find a profile</Link>
            <Link href="/frp-density-calculator" className="underline">Calculate profile weight</Link>
          </div>
        </section>
      </div>
    </div>
    <AnswerBlocks title="Profile performance questions" items={performanceFaqs} />
    <InnerCTA title="Specify the performance your application needs" quoteHref={rfqHref} />
  </>;
}
