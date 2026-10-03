import ApplicationArtwork from "@/components/ui/ApplicationArtwork";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import type { ApplicationPage } from "@/lib/applicationPages";
import { buildRfqHref } from "@/lib/rfq";

const path = "/applications/frp-utility-crossarms";
const quoteHref = buildRfqHref({
  source: "frp-utility-crossarms",
  product: "FRP utility crossarms",
  productPath: path,
  message: "Please review an FRP crossarm enquiry. Utility / country: __. Pole and line arrangement: __. Voltage class: __. Tangent / angle / dead-end duty: __. Conductor and insulator positions: __. Design loads and deflection limits: __. Crossarm length, section and hole drawing: __. Surface, electrical and test requirements: __. Quantity and destination: __. Drawings can follow.",
});

const navigation = [
  { id: "fit", label: "Applications" },
  { id: "assembly", label: "Assembly" },
  { id: "engineering", label: "Design checks" },
  { id: "qualification", label: "Qualification" },
  { id: "specification", label: "Specification" },
  { id: "questions", label: "FAQ" },
  { id: "quote", label: "Quote" },
];

const arrangements = [
  { title: "Tangent distribution pole", use: "Straight line, modest line angle", detail: "Define vertical conductor and ice loads, wind loads, insulator positions and the pole-center attachment. Verify the full member-and-mount arrangement." },
  { title: "Angle or dead-end pole", use: "Line changes direction or terminates", detail: "Longitudinal and transverse forces can control. Specify guying, brace and mount details, then qualify the complete assembly for the utility's load cases." },
  { title: "Replacement program", use: "Existing wood or steel crossarms", detail: "Survey pole spacing, insulator hardware, holes and clearances. A matching length or section depth alone does not establish structural or electrical equivalence." },
];

const checks = [
  { number: "01", title: "Line actions", body: "Provide conductor type and span, self-weight, ice, wind, line angle and any broken-wire or construction cases required by the owner. State load combinations and the allowable deflection." },
  { number: "02", title: "Member and local bearing", body: "Check both bending directions, shear, long-duration behavior and local compression at pole mounts, braces and insulator holes. Hole pattern and edge distance affect capacity." },
  { number: "03", title: "Electrical coordination", body: "The electrical designer sets voltage class, insulation coordination, air and surface clearances, creepage, bonding and lightning protection. A glass FRP member is not a substitute for an approved insulator assembly." },
  { number: "04", title: "Outdoor durability", body: "Specify UV protection, wet-contamination tracking performance, moisture ingress control and cut-edge or drilled-hole sealing for the actual exposure." },
];

const evidence = [
  { reference: "ASTM D8019", scope: "Full-section flexural modulus and bending strength of assembled tangent and dead-end FRP crossarms with center mounts.", request: "Test configuration, span, holes, loading directions, failure mode and result for the offered assembly." },
  { reference: "ASTM D2303", scope: "Relative tracking and erosion resistance of an insulating material under liquid contamination.", request: "Report for the specified laminate or surface system, including specimen and test conditions." },
  { reference: "ASTM G154", scope: "Controlled fluorescent UV and moisture exposure procedure; it does not itself set a pass/fail service life.", request: "Exposure cycle, duration and retained property or surface evaluation criteria." },
  { reference: "Utility / local line code", scope: "Site loading, clearances, construction and acceptance requirements are set by the owner and jurisdiction.", request: "Applicable drawing, code edition, inspection plan and approval responsibility." },
];

const faqs = [
  { question: "Can an FRP crossarm directly replace a wood crossarm?", answer: "It can be developed for a replacement arrangement, but the pole mount, hole pattern, insulator positions, load cases and electrical clearances must be checked together. A matching outer dimension is only a starting point." },
  { question: "What voltage rating does a fiberglass crossarm have?", answer: "There is no universal voltage rating from the material name or crossarm shape. Insulation coordination depends on the complete line geometry, insulators, contamination, clearances and tests required by the utility." },
  { question: "Are distribution and transmission crossarms the same product?", answer: "They may use similar composite materials, but transmission members can have much larger spans, forces and connection systems. This page describes distribution planning; transmission or H-frame work needs a separate engineering and qualification scope." },
  { question: "Can new holes be drilled on site?", answer: "Only if the approved design and supplier procedure permit them. Added holes can change bending capacity and local bearing, and freshly exposed laminate requires the specified sealing treatment." },
  { question: "What should I send for a first quotation?", answer: "A utility drawing or sketch, pole configuration, voltage class, load schedule, crossarm dimensions and hole plan, material and test requirements, quantity and destination. The initial enquiry can be sent before every detail is final." },
];

function Card({ title, body, eyebrow }: { title: string; body: string; eyebrow?: string }) {
  return <article className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
    {eyebrow ? <p className="font-mono text-f12 uppercase tracking-[0.06em] text-teal-text">{eyebrow}</p> : null}
    <h3 className="mt-[4px] text-f18 font-bold text-t1">{title}</h3>
    <p className="mt-[10px] text-f14 leading-golden text-t2">{body}</p>
  </article>;
}

export default function UtilityCrossarmApplication({ page }: { page: ApplicationPage }) {
  return <>
    <PageHeader
      tag="Overhead lines · application guide"
      line={{ name: "Application", label: "Utility crossarms", mark: false }}
      updated={page.lastModified}
      title={page.h1}
      description={page.intro}
      figure={<Figure number={1} title="Distribution pole crossarm arrangement" note="Concept schematic · not to scale" caption={page.imageCaption} bleed>
        <ApplicationArtwork src={page.image} alt={page.imageAlt} width={page.imageSize?.width} height={page.imageSize?.height} />
      </Figure>}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applications", href: "/applications" }, { label: "FRP utility crossarms" }]}
      actions={{ primary: { label: "Discuss a crossarm", href: quoteHref }, secondary: { label: "View specification inputs", href: "#specification", variant: "secondary" }, stickyMobile: true }}
    />
    <PageNav items={navigation} />

    <PageSection id="fit" title="Where a composite crossarm fits" intro="Pultruded fiberglass crossarms support conductors and insulators on overhead utility poles. The most useful starting point is the line duty and the existing or proposed pole drawing.">
      <div className="grid gap-[16px] md:grid-cols-3">{arrangements.map(item => <Card key={item.title} eyebrow={item.use} title={item.title} body={item.detail} />)}</div>
      <p className="mt-[20px] max-w-[900px] text-f16 leading-golden text-t2">Glass FRP can avoid timber rot and steel rust in compatible outdoor service. Actual durability depends on the resin, surface protection, end details and installed environment. <Link href="/industries/energy" className="font-semibold text-teal-text underline underline-offset-4">Explore energy applications</Link>.</p>
    </PageSection>

    <PageSection id="assembly" title="Specify an assembly, not a loose beam" tone="muted" intro="The load path runs from conductor and insulator hardware into the crossarm, through mounts and braces, and into the pole. Define every interface before releasing a drilling schedule.">
      <div className="grid gap-[16px] md:grid-cols-2">
        <Card eyebrow="01 · member" title="Pultruded profile" body="Confirm outer section, wall thickness, length, laminate and surface system against available tooling and the utility drawing. Hollow rectangular sections are one common arrangement, not a fixed F1 size range." />
        <Card eyebrow="02 · interfaces" title="Holes, inserts and ends" body="Schedule insulator and pole-clamp holes, edge distances, inserts or local reinforcement, cut-end sealing and end caps where required by the accepted design." />
        <Card eyebrow="03 · hardware" title="Mounts and braces" body="Identify center mount, pole bolts, braces, insulator fittings and corrosion protection. Metal hardware remains part of the electrical and corrosion assessment." />
        <Card eyebrow="04 · scope" title="What F1 quotes" body="Request a raw profile, cut-and-drilled member or agreed component package. Factory fabrication, mounts, hardware, testing and engineering deliverables are listed explicitly in the quotation." />
      </div>
    </PageSection>

    <PageSection id="engineering" title="Four checks before crossarm selection" intro="A single beam bending calculation does not qualify a pole assembly. Use the owner's loading and electrical criteria, then review the offered member with its actual mounts and holes.">
      <div className="grid gap-[16px] md:grid-cols-2">{checks.map(item => <Card key={item.number} eyebrow={`Check ${item.number}`} title={item.title} body={item.body} />)}</div>
      <aside className="mt-[20px] rounded-card border border-teal-border bg-teal-bg p-[20px] text-f14 leading-golden text-t2"><strong className="text-t1">Design boundary.</strong> F1 can discuss profile and fabrication options from the supplied criteria. The utility and its appointed engineers approve line loading, insulation coordination, pole structure and field work procedures.</aside>
    </PageSection>

    <PageSection id="qualification" title="Connect each claim to the right evidence" tone="muted" intro="Ask for records on the exact offered material and assembly. Standards below describe test methods or project requirements; listing them is not a certification claim for an F1 crossarm.">
      <div role="region" aria-label="Crossarm standards and evidence" tabIndex={0} className="overflow-x-auto rounded-card border border-border-default bg-white">
        <table className="w-full min-w-[760px] border-collapse text-left text-f14">
          <thead><tr className="border-b border-border-default bg-bg2 text-t1"><th scope="col" className="p-[14px]">Reference</th><th scope="col" className="p-[14px]">Scope</th><th scope="col" className="p-[14px]">Request with RFQ</th></tr></thead>
          <tbody>{evidence.map(row => <tr key={row.reference} className="border-b border-border-default align-top last:border-0"><th scope="row" className="p-[14px] font-semibold text-t1">{row.reference}</th><td className="p-[14px] leading-golden text-t2">{row.scope}</td><td className="p-[14px] leading-golden text-t2">{row.request}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14 font-medium text-teal-text">
        <a href="https://store.astm.org/d8019-23e01.html" className="underline underline-offset-4">ASTM D8019 ↗</a>
        <a href="https://store.astm.org/d2303-20e01.html" className="underline underline-offset-4">ASTM D2303 ↗</a>
        <a href="https://store.astm.org/g0154-23.html" className="underline underline-offset-4">ASTM G154 ↗</a>
      </div>
    </PageSection>

    <PageSection id="specification" title="Build a quote-ready crossarm schedule" intro="Send the existing utility standard drawing where available. If the project is at concept stage, a marked-up pole sketch and target requirements are enough to begin the conversation.">
      <div className="grid gap-[16px] md:grid-cols-3">{[
        ["Line and pole", "Voltage class, tangent / angle / dead-end duty, pole type, conductor and insulator layout, required clearances."],
        ["Structural schedule", "Design loads and combinations, deflection criteria, member size and length, hole coordinates, mounts and braces."],
        ["Qualification and delivery", "Required test reports, surface and end treatment, inspection and marking, supply scope, quantity and destination."],
      ].map(([title, body]) => <Card key={title} title={title} body={body} />)}</div>
      <p className="mt-[20px] text-f14 leading-golden text-t3">Reference designs from other manufacturers are useful for defining questions, but their load ratings, voltage suitability and service-life statements do not transfer to an F1 offer.</p>
    </PageSection>

    <PageSection id="questions" title="Crossarm questions" tone="muted"><FAQList items={faqs} /></PageSection>

    <RelatedLinks groups={[{ title: "Related F1 pages", links: page.related }, { title: "Technical references", links: [
      { href: "https://www.wagnerscft.com/app/uploads/2024/05/crossarm-technical-information-guide.pdf", label: "Wagners CFT crossarm technical guide (external example)" },
      { href: "https://pupi.com/distribution/mounts-and-braces/", label: "PUPI mounts and braces (external example)" },
    ] }]} />

    <PageSection id="quote" title="Discuss an FRP crossarm project" tone="deep">
      <ProductRfq product="FRP utility crossarms" productPath={path} quoteHref={quoteHref} items={page.rfqInputs.map(title => ({ title }))} intro="Start with the pole drawing or a sketch, the supply scope you need and the project location. Loads and test criteria can follow if they are still being finalized." advisorPrompt="I am evaluating pultruded FRP crossarms for an overhead distribution line. Please help me prepare a profile, connection, electrical and qualification RFQ." />
    </PageSection>
  </>;
}
