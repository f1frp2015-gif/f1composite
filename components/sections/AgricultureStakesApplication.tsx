import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JumpNav from "@/components/sections/JumpNav";
import AgricultureInquiryPlanner from "@/components/sections/AgricultureInquiryPlanner";
import { plantingApplications, plantingSelectionChecks, plantingSteps, plantingFaqs, plantingSources } from "@/content/data/agricultureStakes";
import { frpStakeImageAssets, frpStakeReferenceSizes } from "@/content/data/frpStakeSpecs";
import { buildAgricultureInquiry } from "@/lib/agricultureInquiry";
import type { ApplicationPage } from "@/lib/applicationPages";

const wrap = "site-container lg:px-9";
const heading = "mt-3 text-[clamp(26px,3.3vw,40px)] font-extrabold leading-tight tracking-[-0.02em] text-t1";
const paragraph = "mt-4 text-f16 leading-relaxed text-t2";

function Section({ id, tag, title, children, shaded = false }: { id: string; tag: string; title: string; children: ReactNode; shaded?: boolean }) {
  return <section id={id} className={`scroll-mt-28 py-14 md:py-20 ${shaded ? "bg-bg2" : "bg-white"}`}><div className={wrap}><SectionTag>{tag}</SectionTag><h2 className={heading}>{title}</h2>{children}</div></section>;
}

export default function AgricultureStakesApplication({ page }: { page: ApplicationPage }) {
  return (
    <>
      <PageHeader tag="Agriculture & Horticulture · F1-STRUX" title={page.h1} description={page.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applications", href: "/applications" }, { label: "Agriculture & horticulture" }]}
        actions={{ primary: { label: "Plan my stake requirement", href: "#project-brief" }, secondary: { label: "Request trial samples", href: buildAgricultureInquiry("sample") }, note: "For growers, nurseries, planting contractors and agricultural supply distributors.", stickyMobile: true }} />

      <JumpNav items={[{ href: "#growing-applications", label: "Your application" }, { href: "#stake-selection", label: "Selection & sizes" }, { href: "#materials", label: "Material comparison" }, { href: "#field-trial", label: "Installation & trial" }, { href: "#procurement", label: "Buying process" }, { href: "#project-brief", label: "Start your enquiry" }, { href: "#questions", label: "FAQs" }]} />

      <section className="bg-white py-12 md:py-16">
        <div className={`${wrap} grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]`}>
          <div><SectionTag>From planting to repeat supply</SectionTag><h2 className={heading}>Build a support plan around the crop.</h2>
            <p className={paragraph}>The right stake depends on what it supports, how it is held and how crews use it. A nursery leader, a young vine and a tree shelter place different demands on the rod and its attachments.</p>
            <p className={paragraph}>F1 supplies solid pultruded fiberglass stakes configured by diameter, cut length, surface, color and end finish. Start with the application, validate an agreed sample in your conditions, then order against a defined specification.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Button href="/products/fiberglass-stakes" variant="secondary">View the F1 stakes product range</Button><Button href={buildAgricultureInquiry("selection")} variant="text">Get selection help</Button></div>
          </div>
          <figure className="overflow-hidden rounded-card border border-border-default"><Image src={frpStakeImageAssets.vineyard} alt="Illustrative vineyard row showing fiberglass rods supporting young vine training" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 680px" preload className="h-auto w-full" /><figcaption className="bg-bg2 px-5 py-3 text-xs leading-relaxed text-t3">Application visualization, not a documented F1 installation. Trellis supports, attachments and stake geometry require project-specific confirmation.</figcaption></figure>
        </div>
        <div className={`${wrap} mt-8 grid gap-4 sm:grid-cols-3`}>{[
          ["Growers & nurseries", "Match support to crop, crew handling and the planting calendar."],
          ["Shelter & planting programs", "Check the stake, guard, tie and ground as one assembly."],
          ["Distributors & importers", "Define repeatable SKUs, bundle counts, labels and delivery terms."],
        ].map(([title, body]) => <div key={title} className="rounded-card bg-bg2 p-5"><h3 className="font-bold text-t1">{title}</h3><p className="mt-2 text-sm leading-relaxed text-t2">{body}</p></div>)}</div>
      </section>

      <Section id="growing-applications" tag="01 · Match the growing task" title="Where fiberglass stakes fit" shaded>
        <div className="mt-8 grid gap-5 md:grid-cols-2">{plantingApplications.map((item, index) => <article key={item.title} className="rounded-card border border-border-default bg-white p-6 sm:p-7">
          <p className="text-xs font-bold tracking-widest text-teal-text">0{index + 1}</p><h3 className="mt-3 text-f24 font-bold leading-tight text-t1">{item.title}</h3><p className={paragraph}>{item.task}</p>
          <dl className="mt-5 space-y-4 text-sm leading-relaxed"><div><dt className="font-bold text-t1">Tell us</dt><dd className="mt-1 text-t2">{item.inputs}</dd></div><div><dt className="font-bold text-t1">Validate in the trial</dt><dd className="mt-1 text-t2">{item.check}</dd></div></dl>
          <Button href={buildAgricultureInquiry("selection", { application: item.title })} variant="text" className="mt-5">Discuss this application</Button>
        </article>)}
          <aside className="flex flex-col justify-center rounded-card bg-deep p-7 text-white"><p className="text-xs font-bold uppercase tracking-widest text-white/70">Define the supply scope</p><h3 className="mt-4 text-f24 font-bold">A stake is one part of the planting system.</h3><p className="mt-4 text-sm leading-relaxed text-white/85">List caps, ties, clips, shelters, trellis hardware and netting separately. F1’s standard enquiry here is for fiberglass rods; accessories and complete assemblies require an agreed quotation.</p><p className="mt-4 text-sm leading-relaxed text-white/85">For a shelter replacement, share the original model and a photo of the attachment. Confirm compatibility with the shelter supplier before substituting a round rod.</p><Button href={buildAgricultureInquiry("selection", { application: "Tree shelter compatibility review" })} variant="secondary" className="mt-6 self-start">Review my shelter interface</Button></aside>
        </div>
      </Section>

      <Section id="stake-selection" tag="02 · Turn a use case into a specification" title="Select the assembly, then the stake size">
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{plantingSelectionChecks.map((item) => <div key={item.title} className="border-t-2 border-teal/30 pt-5"><h3 className="text-f18 font-bold text-t1">{item.title}</h3><p className={paragraph}>{item.body}</p></div>)}</div>
        <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.75fr_1.25fr]"><figure><Image src={frpStakeImageAssets.hero} alt="Product visualization of round fiberglass stakes in different diameters, colors and end finishes" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 440px" className="h-auto w-full rounded-card" /><figcaption className="mt-3 text-xs text-t3">Product visualization. The approved sample and order specification control supply.</figcaption></figure><div><h3 className="text-f24 font-bold text-t1">Reference dimensions for your enquiry</h3><p className={paragraph}>These dimensions are shared with the F1 stakes product page and originate from public market listings. They are <strong>planning references, not F1 stock commitments, crop recommendations or design capacities</strong>. Confirm the offered dimensions and tolerances in the quotation.</p>
          <div role="region" aria-label="Stake dimension references" tabIndex={0} className="mt-5 overflow-x-auto rounded-card border border-border-default"><table className="w-full min-w-[430px] text-left text-sm"><caption className="sr-only">Public-market nominal stake diameters and length references</caption><thead className="bg-bg2 text-t1"><tr>{["Nominal diameter", "Metric reference", "Listed length"].map((h) => <th scope="col" key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody>{frpStakeReferenceSizes.map((size) => <tr key={size.nominalDiameter} className="border-t border-border-default text-t2"><th scope="row" className="px-4 py-3 font-semibold text-t1">{size.nominalDiameter}</th><td className="px-4 py-3">{size.metricDiameter}</td><td className="px-4 py-3">{size.referenceLengths}</td></tr>)}</tbody></table></div>
          <Button href={buildAgricultureInquiry("quote")} variant="text" className="mt-4">Quote my dimensions or existing SKU</Button>
        </div></div>
      </Section>

      <Section id="materials" tag="03 · Compare the planting program" title="FRP, bamboo, wood or coated steel?" shaded>
        <p className={`${paragraph} max-w-[860px]`}>Compare equivalent support duties and your actual reuse plan. Purchase price alone misses crew time, replacement, storage, freight and disposal. A higher-cost rod only pays back if field results support the assumed reuse.</p>
        <div role="region" aria-label="Stake material comparison" tabIndex={0} className="mt-7 overflow-x-auto rounded-card border border-border-default"><table className="w-full min-w-[760px] bg-white text-left text-sm leading-relaxed"><caption className="sr-only">Plant stake materials: practical procurement tradeoffs</caption><thead className="bg-deep text-white"><tr>{["Decision", "Pultruded fiberglass", "Bamboo / wood", "Coated steel"].map((h) => <th scope="col" key={h} className="p-5">{h}</th>)}</tr></thead><tbody>{[
          ["Wet outdoor service", "Does not rust or rot; qualify resin, UV package and finish.", "Natural material can weather, split or decay; treatment and species matter.", "Coating condition controls exposure of the underlying steel to corrosion."],
          ["Consistency & handling", "Controlled round geometry; inspect surface and cut ends for fiber exposure.", "Diameter, straightness and defects can vary between pieces.", "Consistent geometry; compare bundle weight and cut-end protection."],
          ["Support response", "Select diameter and unsupported length for the required stiffness and movement.", "Performance varies with section, moisture and natural defects.", "High stiffness; overload may leave a permanent bend."],
          ["End of the growing cycle", "Inspect before reuse; thermoset FRP is not biodegradable. Plan collection and an available disposal route.", "May suit short seasonal use; treatment affects end-of-life options.", "Inspect for coating damage and deformation; local metal recycling may be available."],
        ].map(([topic, ...cells]) => <tr key={topic} className="border-t border-border-default"><th scope="row" className="p-5 align-top font-bold text-t1">{topic}</th>{cells.map((cell) => <td key={cell} className="p-5 align-top text-t2">{cell}</td>)}</tr>)}</tbody></table></div>
        <div className="mt-6 rounded-card border border-teal/20 bg-white p-6"><h3 className="font-bold text-t1">Evaluate cost per completed growing cycle</h3><p className={paragraph}>Record purchase and freight, installation and removal labor, replacements, cleaning and storage, plus end-of-life costs. Divide by the number of planting positions successfully supported across the measured cycles. Compare on the same crop, site and support requirement; no assumed savings percentage is needed.</p></div>
      </Section>

      <Section id="field-trial" tag="04 · Qualify before volume release" title="Installation, inspection & a useful field trial">
        <div className="mt-8 grid gap-9 lg:grid-cols-2"><div><figure><Image src={frpStakeImageAssets.nursery} alt="Illustrative young nursery tree supported with fiberglass stakes and broad soft ties" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 580px" className="h-auto w-full rounded-card" /><figcaption className="mt-3 text-xs leading-relaxed text-t3">Nursery support visualization. Stake count and tie positions must suit the plant and site.</figcaption></figure><p className={paragraph}>For trees, first establish whether support is needed. Where staking is appropriate, allow movement and inspect ties as the trunk grows. Remove temporary support when the tree is established. <a href="https://www.extension.umd.edu/resource/planting-tree-or-shrub" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-text underline">University of Maryland Extension guidance</a>.</p></div>
          <ol className="space-y-6">{[
            ["Check the sample against the brief", "Measure diameter, length, straightness and end finish. Fit the actual ties, clips or shelter. Agree acceptable surface condition and dimensional tolerances before ordering."],
            ["Trial the actual installation", "Use representative soil or growing medium and the intended tools. Protect roots and irrigation lines. Agree the insertion method; do not assume a generic rod can be hammered directly or use another brand’s driving instructions."],
            ["Observe the loaded assembly", "Check leaning, slippage, shelter movement, tie abrasion and plant clearance after irrigation and representative wind. Record conditions and photographs rather than accepting an unloaded hand-bend as a field rating."],
            ["Maintain, recover and inspect", "Adjust ties as growth changes contact pressure; inspect after adverse weather or machinery contact. Wear suitable handling protection, retire damaged rods and store recovered stakes to avoid bending or surface damage."],
          ].map(([title, body], index) => <li key={title} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg2 font-bold text-teal-text">{index + 1}</span><div><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-2 text-sm leading-relaxed text-t2">{body}</p></div></li>)}</ol>
        </div>
        <div className="mt-9 flex flex-col gap-5 rounded-card bg-bg2 p-6 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-f18 font-bold text-t1">Make the sample decision measurable.</h3><p className="mt-2 max-w-[740px] text-sm leading-relaxed text-t2">Agree the trial duration and acceptance criteria with your growing team. Short trials confirm fit and handling; they do not prove multi-year UV durability or storm performance.</p></div><Button href={buildAgricultureInquiry("sample")} className="shrink-0">Request trial samples</Button></div>
      </Section>

      <Section id="procurement" tag="05 · A clear route to supply" title="From a field requirement to a repeatable order" shaded>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{plantingSteps.map((step, index) => <li key={step.title} className="rounded-card border border-border-default bg-white p-5"><span className="text-f24 font-extrabold text-teal-text">0{index + 1}</span><h3 className="mt-4 text-f18 font-bold leading-tight text-t1">{step.title}</h3><p className="mt-4 text-sm leading-relaxed text-t2">{step.buyer}</p><p className="mt-4 border-t border-border-default pt-4 text-sm leading-relaxed text-t2"><strong className="text-t1">Decision / output: </strong>{step.outcome}</p></li>)}</ol>
        <div className="mt-8 grid gap-7 md:grid-cols-2"><div><h3 className="text-f24 font-bold text-t1">For growers & planting contractors</h3><p className={paragraph}>Work backward from the required arrival date. Reserve time for sample shipment, a meaningful field trial, specification changes, production and local transport. State whether the order covers one planting block, phased deliveries or replacement stock.</p></div><div><h3 className="text-f24 font-bold text-t1">For distributors & OEM supply programs</h3><p className={paragraph}>Send a SKU schedule with annual demand and order frequency. Confirm bundle count, unit/barcode labels, mixed-size packs, pallet dimensions and packaging protection. Ask for MOQ and lead time by SKU; custom colors, labels and packaging remain subject to quotation.</p></div></div>
      </Section>

      <Section id="project-brief" tag="06 · Start with what you know" title="Tell us about your planting project">
        <p className={`${paragraph} mb-8 max-w-[820px]`}>Choose the next step that fits your project. You can ask for help before dimensions are fixed, request a trial configuration or send an existing specification for pricing.</p>
        <AgricultureInquiryPlanner />
      </Section>

      <section id="questions" className="scroll-mt-28 bg-bg2 pb-16 pt-1"><div className={wrap}><FAQ items={[...plantingFaqs]} title="Planting stake questions, answered" />
        <details className="mt-10 rounded-card border border-border-default bg-white p-5"><summary className="cursor-pointer font-bold text-t1">Reference reading & scope of this guide</summary><p className="mt-4 text-sm leading-relaxed text-t2">Reviewed September 21, 2026. Supplier references inform application and purchasing considerations; they are not evidence of F1 performance, affiliation or compatibility. Agronomic practice should follow the crop and local growing conditions.</p><ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">{plantingSources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-teal-text underline">{source.label}</a></li>)}</ul></details>
        <div className="mt-9 flex flex-wrap gap-6 text-sm font-bold text-teal-text"><Link href="/products/fiberglass-stakes">Fiberglass stakes product specifications →</Link><Link href="/technology/quality-testing">Quality & testing →</Link><Link href="/applications">All application guides →</Link></div>
      </div></section>
    </>
  );
}
