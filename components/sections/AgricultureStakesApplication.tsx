import Image from "next/image";
import type { ReactNode } from "react";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import AgricultureInquiryPlanner from "@/components/sections/AgricultureInquiryPlanner";
import RelatedLinks from "@/components/sections/RelatedLinks";
import Button from "@/components/ui/Button";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { plantingApplications, plantingSelectionChecks, plantingSteps, plantingFaqs, plantingSources } from "@/content/data/agricultureStakes";
import { frpStakeImageAssets, frpStakeReferenceSizes } from "@/content/data/frpStakeSpecs";
import { buildAgricultureInquiry } from "@/lib/agricultureInquiry";
import type { ApplicationPage } from "@/lib/applicationPages";

const paragraph = "mt-4 text-f16 leading-golden text-t2";
const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

function Section({ id, title, intro, children, shaded = false }: { id: string; title: string; intro?: ReactNode; children: ReactNode; shaded?: boolean }) {
  return <PageSection id={id} title={title} intro={intro} tone={shaded ? "muted" : "white"}>{children}</PageSection>;
}

export default function AgricultureStakesApplication({ page }: { page: ApplicationPage }) {
  return (
    <>
      <PageHeader
        tag="Agriculture & Horticulture · F1-STRUX"
        line={{ name: "Application", label: "Agriculture & horticulture", mark: false }}
        updated={page.lastModified}
        title={page.h1}
        description={page.intro}
        figure={<Figure number={1} title="Vineyard training" caption="Trellis supports, attachments and stake geometry require project-specific confirmation." bleed><div className="relative aspect-[3/2]"><Image src={frpStakeImageAssets.vineyard} alt="Vineyard row with fiberglass rods supporting young vine training" fill sizes="(max-width: 1023px) 94vw, 44vw" preload className="object-cover" /></div></Figure>}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applications", href: "/applications" }, { label: "Agriculture & horticulture" }]}
        actions={{ primary: { label: "Plan my stake requirement", href: "#project-brief" }, secondary: { label: "Request trial samples", href: buildAgricultureInquiry("sample"), variant: "secondary" }, note: "For growers, nurseries, planting contractors and agricultural supply distributors.", stickyMobile: true }}
      />

      <PageNav items={[{ id: "overview", label: "Overview" }, { id: "growing-applications", label: "Your application" }, { id: "stake-selection", label: "Selection & sizes" }, { id: "materials", label: "Material comparison" }, { id: "field-trial", label: "Installation & trial" }, { id: "procurement", label: "Buying process" }, { id: "questions", label: "FAQ" }, { id: "project-brief", label: "Start your inquiry" }]} />

      <Section id="overview" title="Build a support plan around the crop">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-[48px]">
          <div className="max-w-[720px]">
            <p className="text-f18 leading-golden text-t1">The right stake depends on what it supports, how it is held and how crews use it. A nursery leader, a young vine and a tree shelter place different demands on the rod and its attachments.</p>
            <p className={paragraph}>F1 supplies solid pultruded fiberglass stakes configured by diameter, cut length, surface, color and end finish. Start with the application, validate an agreed sample in your conditions, then order against a defined specification.</p>
            <div className="mt-[20px] flex flex-wrap items-center gap-[12px]"><Button href="/products/fiberglass-stakes" variant="secondary">View the stakes product range</Button><Button href={buildAgricultureInquiry("selection")} variant="text">Get selection help</Button></div>
          </div>
          <ul className="grid grid-cols-1 gap-[12px]">{[
          ["Growers & nurseries", "Match support to crop, crew handling and the planting calendar."],
          ["Shelter & planting programs", "Check the stake, guard, tie and ground as one assembly."],
          ["Distributors & importers", "Define repeatable SKUs, bundle counts, labels and delivery terms."],
        ].map(([title, body]) => <li key={title} className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f16 font-bold text-t1">{title}</h3><p className="mt-[6px] text-f14 leading-golden text-t2">{body}</p></li>)}</ul>
        </div>
      </Section>

      <Section id="growing-applications" title="Where fiberglass stakes fit" shaded>
        <div className="grid gap-5 md:grid-cols-2">{plantingApplications.map((item, index) => <article key={item.title} className="rounded-card border border-border-default bg-white p-6 sm:p-7">
          <p className={mono}>Application {index + 1}</p><h3 className="mt-[6px] text-f20 font-bold leading-snug text-t1">{item.title}</h3><p className={paragraph}>{item.task}</p>
          <dl className="mt-5 space-y-4 text-f14 leading-relaxed"><div><dt className="font-bold text-t1">Tell us</dt><dd className="mt-1 text-t2">{item.inputs}</dd></div><div><dt className="font-bold text-t1">Validate in the trial</dt><dd className="mt-1 text-t2">{item.check}</dd></div></dl>
          <Button href={buildAgricultureInquiry("selection", { application: item.title })} variant="text" className="mt-5">Discuss this application</Button>
        </article>)}
          <aside className="flex flex-col justify-center rounded-card border border-teal-border bg-teal-bg p-[20px] sm:p-[28px]"><p className={mono}>Define the supply scope</p><h3 className="mt-[6px] text-f20 font-bold text-t1">A stake is one part of the planting system.</h3><p className="mt-[8px] text-f14 leading-golden text-t2">List caps, ties, clips, shelters, trellis hardware and netting separately. F1’s standard enquiry here is for fiberglass rods; accessories and complete assemblies require an agreed quotation.</p><p className="mt-[8px] text-f14 leading-golden text-t2">For a shelter replacement, share the original model and a photo of the attachment. Confirm compatibility with the shelter supplier before substituting a round rod.</p><Button href={buildAgricultureInquiry("selection", { application: "Tree shelter compatibility review" })} variant="secondary" className="mt-[16px] self-start">Review my shelter interface</Button></aside>
        </div>
      </Section>

      <Section id="stake-selection" title="Select the assembly, then the stake size">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{plantingSelectionChecks.map((item) => <div key={item.title} className="border-t-2 border-teal/30 pt-5"><h3 className="text-f18 font-bold text-t1">{item.title}</h3><p className={paragraph}>{item.body}</p></div>)}</div>
        <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.75fr_1.25fr]"><figure><Image src={frpStakeImageAssets.hero} alt="Round fiberglass stakes in different diameters, colors and end finishes" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 440px" className="h-auto w-full rounded-card" /><figcaption className="mt-3 text-f12 text-t3">The approved sample and order specification control supply.</figcaption></figure><div><h3 className="text-f24 font-bold text-t1">Reference dimensions for your enquiry</h3><p className={paragraph}>These dimensions are shared with the F1 stakes product page and originate from public market listings. They are <strong>planning references, not F1 stock commitments, crop recommendations or design capacities</strong>. Confirm the offered dimensions and tolerances in the quotation.</p>
          <div role="region" aria-label="Stake dimension references" tabIndex={0} className="relative mt-5 overflow-x-auto rounded-card border border-border-default bg-white"><table className="w-full min-w-[430px] border-collapse text-left text-f14"><caption className="sr-only">Public-market nominal stake diameters and length references</caption><thead><tr className="border-b border-border-default bg-bg2">{["Nominal diameter", "Metric reference", "Listed length"].map((h) => <th scope="col" key={h} className="px-[14px] py-[8px] font-semibold text-t1">{h}</th>)}</tr></thead><tbody>{frpStakeReferenceSizes.map((size) => <tr key={size.nominalDiameter} className="border-b border-border-default text-t2 last:border-b-0"><th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{size.nominalDiameter}</th><td className="px-[14px] py-[10px]">{size.metricDiameter}</td><td className="px-[14px] py-[10px]">{size.referenceLengths}</td></tr>)}</tbody></table></div>
          <Button href={buildAgricultureInquiry("quote")} variant="text" className="mt-4">Quote my dimensions or existing SKU</Button>
        </div></div>
      </Section>

      <Section id="materials" title="FRP, bamboo, wood or coated steel?" intro="Compare equivalent support duties and your actual reuse plan. Purchase price alone misses crew time, replacement, storage, freight and disposal. A higher-cost rod only pays back if field results support the assumed reuse." shaded>
        <div role="region" aria-label="Stake material comparison" tabIndex={0} className="relative overflow-x-auto rounded-card border border-border-default bg-white"><table className="w-full min-w-[760px] border-collapse text-left text-f14"><caption className="sr-only">Plant stake materials: practical procurement tradeoffs</caption><thead><tr className="border-b border-border-default bg-bg2">{["Decision", "Pultruded fiberglass", "Bamboo / wood", "Coated steel"].map((h) => <th scope="col" key={h} className="px-[14px] py-[8px] font-semibold text-t1">{h}</th>)}</tr></thead><tbody>{[
          ["Wet outdoor service", "Does not rust or rot; qualify resin, UV package and finish.", "Natural material can weather, split or decay; treatment and species matter.", "Coating condition controls exposure of the underlying steel to corrosion."],
          ["Consistency & handling", "Controlled round geometry; inspect surface and cut ends for fiber exposure.", "Diameter, straightness and defects can vary between pieces.", "Consistent geometry; compare bundle weight and cut-end protection."],
          ["Support response", "Select diameter and unsupported length for the required stiffness and movement.", "Performance varies with section, moisture and natural defects.", "High stiffness; overload may leave a permanent bend."],
          ["End of the growing cycle", "Inspect before reuse; thermoset FRP is not biodegradable. Plan collection and an available disposal route.", "May suit short seasonal use; treatment affects end-of-life options.", "Inspect for coating damage and deformation; local metal recycling may be available."],
        ].map(([topic, ...cells]) => <tr key={topic} className="border-b border-border-default align-top last:border-b-0"><th scope="row" className="px-[14px] py-[12px] font-semibold text-t1">{topic}</th>{cells.map((cell) => <td key={cell} className="px-[14px] py-[12px] leading-golden text-t2">{cell}</td>)}</tr>)}</tbody></table></div>
        <div className="mt-6 rounded-card border border-teal-border bg-teal-bg p-[20px] sm:p-[24px]"><h3 className="text-f18 font-bold text-t1">Evaluate cost per completed growing cycle</h3><p className={paragraph}>Record purchase and freight, installation and removal labor, replacements, cleaning and storage, plus end-of-life costs. Divide by the number of planting positions successfully supported across the measured cycles. Compare on the same crop, site and support requirement; no assumed savings percentage is needed.</p></div>
      </Section>

      <Section id="field-trial" title="Installation, inspection & a useful field trial">
        <div className="grid gap-9 lg:grid-cols-2"><div><figure><Image src={frpStakeImageAssets.nursery} alt="Young nursery tree supported with fiberglass stakes and broad soft ties" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 580px" className="h-auto w-full rounded-card" /><figcaption className="mt-3 text-f12 leading-relaxed text-t3">Stake count and tie positions must suit the plant and site.</figcaption></figure><p className={paragraph}>For trees, first establish whether support is needed. Where staking is appropriate, allow movement and inspect ties as the trunk grows. Remove temporary support when the tree is established. <a href="https://www.extension.umd.edu/resource/planting-tree-or-shrub" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-text underline">University of Maryland Extension guidance</a>.</p></div>
          <ol className="space-y-[20px]">{[
            ["Check the sample against the brief", "Measure diameter, length, straightness and end finish. Fit the actual ties, clips or shelter. Agree acceptable surface condition and dimensional tolerances before ordering."],
            ["Trial the actual installation", "Use representative soil or growing medium and the intended tools. Protect roots and irrigation lines. Agree the insertion method; do not assume a generic rod can be hammered directly or use another brand’s driving instructions."],
            ["Observe the loaded assembly", "Check leaning, slippage, shelter movement, tie abrasion and plant clearance after irrigation and representative wind. Record conditions and photographs rather than accepting an unloaded hand-bend as a field rating."],
            ["Maintain, recover and inspect", "Adjust ties as growth changes contact pressure; inspect after adverse weather or machinery contact. Wear suitable handling protection, retire damaged rods and store recovered stakes to avoid bending or surface damage."],
          ].map(([title, body], index) => <li key={title} className="border-t border-border-default pt-[14px]"><p className={mono}>Step {index + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{title}</h3><p className="mt-[6px] text-f14 leading-golden text-t2">{body}</p></li>)}</ol>
        </div>
        <div className="mt-9 flex flex-col gap-5 rounded-card bg-bg2 p-6 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-f18 font-bold text-t1">Make the sample decision measurable.</h3><p className="mt-2 max-w-[740px] text-f14 leading-relaxed text-t2">Agree the trial duration and acceptance criteria with your growing team. Short trials confirm fit and handling; they do not prove multi-year UV durability or storm performance.</p></div><Button href={buildAgricultureInquiry("sample")} className="shrink-0">Request trial samples</Button></div>
      </Section>

      <Section id="procurement" title="From a field requirement to a repeatable order" shaded>
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{plantingSteps.map((step, index) => <li key={step.title} className="rounded-card border border-border-default bg-white p-[20px]"><p className={mono}>Step {index + 1}</p><h3 className="mt-[4px] text-f18 font-bold leading-snug text-t1">{step.title}</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{step.buyer}</p><p className="mt-[10px] border-t border-border-default pt-[10px] text-f14 leading-golden text-t2"><strong className="text-t1">Decision / output: </strong>{step.outcome}</p></li>)}</ol>
        <div className="mt-8 grid gap-7 md:grid-cols-2"><div><h3 className="text-f20 font-bold text-t1">For growers & planting contractors</h3><p className={paragraph}>Work backward from the required arrival date. Reserve time for sample shipment, a meaningful field trial, specification changes, production and local transport. State whether the order covers one planting block, phased deliveries or replacement stock.</p></div><div><h3 className="text-f20 font-bold text-t1">For distributors & OEM supply programs</h3><p className={paragraph}>Send a SKU schedule with annual demand and order frequency. Confirm bundle count, unit/barcode labels, mixed-size packs, pallet dimensions and packaging protection. Ask for MOQ and lead time by SKU; custom colors, labels and packaging remain subject to quotation.</p></div></div>
      </Section>

      <Section id="questions" title="Planting stake questions">
        <FAQList items={[...plantingFaqs]} />
        <details className="mt-[24px] rounded-card border border-border-default bg-bg2 p-[20px]"><summary className="cursor-pointer text-f16 font-bold text-t1">Reference reading and scope of this guide</summary><p className="mt-[12px] text-f14 leading-golden text-t2">Reviewed September 21, 2026. Supplier references inform application and purchasing considerations; they are not evidence of F1 performance, affiliation or compatibility. Agronomic practice should follow the crop and local growing conditions.</p><ul className="mt-[12px] grid gap-[8px] text-f14 sm:grid-cols-2">{plantingSources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">{source.label}</a></li>)}</ul></details>
      </Section>

      <RelatedLinks
        groups={[
          { title: "Stakes and markers", links: [{ href: "/products/fiberglass-stakes", label: "Fiberglass stakes product specifications" }, { href: "/products/fiberglass-snow-markers", label: "Fiberglass snow markers" }, { href: "/products/fiberglass-structural-shapes/frp-rod", label: "Solid FRP rods" }] },
          { title: "Quality and documents", links: [{ href: "/technology/quality-testing", label: "Quality and testing" }, { href: "/resources/downloads", label: "Data sheets and certificates" }] },
          { title: "Other application guides", links: [{ href: "/applications", label: "All application guides" }, { href: "/applications/frp-solar-mounting-profiles", label: "PV support design" }, { href: "/applications/frp-cable-tray-supports", label: "FRP cable trays and ladders" }] },
        ]}
      />

      <PageSection id="project-brief" title="Tell us about your planting project" tone="deep" intro="Choose the next step that fits your project. You can ask for help before dimensions are fixed, request a trial configuration or send an existing specification for pricing.">
        <div data-page-rfq><AgricultureInquiryPlanner /></div>
      </PageSection>
    </>
  );
}
