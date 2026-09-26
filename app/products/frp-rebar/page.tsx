import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Figure from "@/components/ui/Figure";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import ProductPageNav from "@/components/products/ProductPageNav";
import ProductRfq from "@/components/products/ProductRfq";
import ProductSection from "@/components/products/ProductSection";
import RebarScheduleBuilder from "@/components/sections/RebarScheduleBuilder";
import { rebarCatalog as catalog } from "@/content/data/frpRebar";
import { buildRebarRfqHref } from "@/lib/rebarInquiry";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ title: catalog.title, description: catalog.description, path: catalog.path, image: catalog.images.straight });

// What a rebar request needs, in the order the page asks for it.
const requestItems = [
  { title: "Bar schedule", text: "Diameters, cut lengths, quantities and bar marks, or your BOQ and drawings." },
  { title: "Shapes and mesh", text: "Bending schedules for stirrups and bent bars; mesh opening, bar size and sheet size." },
  { title: "Standard and documents", text: "The specification your project cites and the reports your engineer or purchaser requires." },
  { title: "Destination and timing", text: "Delivery country or port, target date, shipment phases and any sample evaluation." },
];

export default function RebarPage() {
  const diameters = `Ø${Math.min(...catalog.diameters)}–${Math.max(...catalog.diameters)} mm`;
  return <>
    <JsonLd data={buildProductFamilyPageSchema({ name: "FRP Rebar for Concrete Reinforcement", description: catalog.description, path: catalog.path, image: catalog.images.straight, category: "Concrete reinforcement", material: "Glass fiber reinforced polymer (GFRP)", schemaType: "ItemPage", dateModified: catalog.revision })} />
    <PageHeader
      updated={catalog.revision}
      tag="Concrete reinforcement"
      line={{ name: "GFRP reinforcement", mark: false }}
      title="FRP Rebar for Concrete Reinforcement"
      description="GFRP straight bars, factory-formed stirrups and reinforcement mesh. Start with your concrete application, then confirm the bar grade, dimensions and documents for your project."
      facts={[
        { label: "Straight bars", value: `${catalog.diameters.length} diameters, ${diameters}` },
        { label: "Forms", value: "Bars, factory bends, mesh" },
        { label: "Grade & documents", value: "Confirmed per project" },
      ]}
      figure={
        <Figure number={1} title="GFRP straight bars" note="Supplier photo" caption="Product appearance follows the confirmed grade.">
          <Image src={catalog.images.straight} alt="Supplier photograph of glass-fiber reinforcing bars with helical surfaces and different diameters" width={450} height={450} sizes="(max-width: 768px) 85vw, 360px" preload className="mx-auto h-auto w-full max-w-[320px] object-contain" />
        </Figure>
      }
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "FRP Rebar" }]}
      actions={{ primary: { label: "Request a Project Quote", href: buildRebarRfqHref() }, secondary: { label: "Review Technical Data", href: "#specifications" }, note: "Have a BOQ or drawing? Send it directly. Unspecified details can follow.", stickyMobile: true }}
    />
    <ProductPageNav
      items={[
        { id: "buying-routes", label: "Start" },
        { id: "range", label: "Product forms" },
        { id: "applications", label: "Applications" },
        { id: "specifications", label: "Sizes & data", count: catalog.diameters.length },
        { id: "documents", label: "Documents" },
        { id: "installation", label: "Installation" },
        { id: "delivery", label: "Delivery" },
        { id: "request-quote", label: "Build a schedule" },
      ]}
    />
    <ProductSection id="buying-routes" title="Three ways to move your project forward" intro="F1 Composite coordinates product selection, quotation and export delivery with the manufacturing source. We review your bar schedule, technical requirements and destination before confirming the offered reinforcement.">
      <div className="grid gap-5 md:grid-cols-3">{[
        { n: "01", title: "I have a BOQ or drawing", text: "Send your bar schedule, specifications or bending details. Add the project country and required delivery date if known.", label: "Send my schedule", href: buildRebarRfqHref() },
        { n: "02", title: "I know the sizes I need", text: "Build a short list of straight bars, stirrups or mesh. Keep length and quantity units with each line item.", label: "Build a rebar schedule", href: "#request-quote" },
        { n: "03", title: "I need technical guidance", text: "Explain the application, exposure and documents required. Discuss product suitability or samples before fixing the order.", label: "Request technical review", href: buildRebarRfqHref("technical") },
      ].map(item => <article key={item.n} className="flex flex-col rounded-card border border-border-default p-6"><h3 className="text-f20 font-bold text-t1">{item.title}</h3><p className="mb-5 mt-3 flex-1 text-sm leading-relaxed text-t2">{item.text}</p><Button href={item.href} variant="secondary">{item.label}</Button></article>)}</div>
      <p className="mt-4 text-xs leading-relaxed text-t3">Catalog sizes are for inquiry planning. Availability and project qualification are confirmed for the proposed grade.</p>
    </ProductSection>
    <ProductSection id="range" title="Straight bars, factory bends or reinforcement mesh" tone="muted" intro="Choose by geometry and the way the reinforcement will be placed. Each form needs its own dimensions, performance information and acceptance requirements.">
      <div className="grid gap-6 lg:grid-cols-3">{catalog.forms.map(form => <article id={form.anchor} key={form.id} className="flex scroll-mt-[40px] flex-col overflow-hidden rounded-card border border-border-default bg-white"><div className="relative h-[250px] bg-white"><Image src={catalog.images[form.id]} alt={form.title} fill sizes="(max-width: 1024px) 85vw, 30vw" className="object-contain p-6" /></div><div className="flex flex-1 flex-col border-t border-border-default p-6"><p className="text-xs font-semibold text-teal-text">{form.subtitle}</p><h3 className="mt-3 text-f24 font-bold text-t1">{form.title}</h3><p className="mt-3 text-sm leading-relaxed text-t2">{form.body}</p><p className="mb-6 mt-4 text-xs leading-relaxed text-t3"><strong>For your inquiry:</strong> {form.inputs}</p><Button href={buildRebarRfqHref("quote", form.id)} variant="secondary" className="mt-auto">{form.action}</Button></div></article>)}</div>
    </ProductSection>
    <ProductSection id="applications" title="Match the reinforcement to the project" intro="Corrosion exposure, electromagnetic requirements, concrete detailing and installation needs all influence selection. These are application routes for review, not approvals for every bar grade.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{catalog.applications.map(item => <article key={item.title} className="rounded-card border border-border-default p-5"><h3 className="text-f18 font-bold text-t1">{item.title}</h3><p className="mt-2 text-sm text-t2">{item.use}</p><dl className="mt-4 space-y-3 text-sm leading-relaxed"><div><dt className="font-semibold text-teal-text">Buyer priority</dt><dd className="mt-1 text-t2">{item.need}</dd></div><div><dt className="font-semibold text-t1">Confirm before specifying</dt><dd className="mt-1 text-t2">{item.confirm}</dd></div></dl></article>)}</div>
      <div className="mt-6 rounded-card bg-bg2 p-5"><p className="text-sm leading-relaxed text-t2">GFRP behaves differently from steel. Tensile strength alone does not determine bar size or spacing; stiffness, serviceability, bond and the applicable design rules matter.</p><Link href="/technology/fiberglass-rebar-vs-steel" className="mt-3 inline-flex min-h-10 items-center text-sm font-bold text-teal-text">Read the evidence-based fiberglass rebar vs steel comparison →</Link></div>
      <p className="mt-4 text-sm text-t2">Looking for plant, tree or vineyard stakes rather than concrete reinforcement? See our <Link href="/products/fiberglass-stakes" className="font-semibold text-teal-text underline">fiberglass stakes</Link>.</p>
    </ProductSection>
    <ProductSection id="specifications" title="Start with the diameter. Confirm the complete grade." count={`${catalog.diameters.length} diameters`} tone="muted" intro="The straight-bar catalog below lists metric inquiry sizes. It does not establish stock, measured area, unit weight or a guaranteed strength. Send your own bar designation if the project uses a different standard.">
      <div className="grid items-start gap-7 lg:grid-cols-[1.4fr_1fr]"><div className="overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[320px] text-left text-sm"><caption className="border-b border-border-default px-5 py-4 text-left font-semibold text-t1">Supplier-published GFRP straight-bar diameters</caption><thead className="bg-bg2"><tr><th scope="col" className="px-5 py-3">Nominal diameter</th><th scope="col" className="px-5 py-3">Supply basis</th></tr></thead><tbody>{catalog.diameters.map(d => <tr key={d} className="border-t border-border-default"><th scope="row" className="px-5 py-3 font-semibold text-t1">Ø{d} mm</th><td className="px-5 py-3 text-t2">Cut length and grade by quotation</td></tr>)}</tbody></table></div><p className="border-t border-border-default p-5 text-xs leading-relaxed text-t3">Diameter names are catalog designations. US bar numbers and metric sizes are not automatically interchangeable. Use the project specification and the offered grade data.</p></div><div className="space-y-5"><div className="rounded-card border border-border-default bg-white p-6"><h3 className="text-f20 font-bold text-t1">Confirm with the quotation</h3><ul className="mt-4 space-y-3 text-sm leading-relaxed text-t2">{["Fiber, resin and surface profile for the offered grade", "Measured area, mass per metre and dimensional tolerances", "Guaranteed tensile force, modulus and the test basis", "Bond, durability and any project-specific qualification", "Cut lengths, factory shapes, quantities and packing"].map(item => <li key={item} className="border-b border-border-default pb-3 last:border-0">{item}</li>)}</ul><Button href={buildRebarRfqHref("technical")} className="mt-5">Request grade-specific data</Button></div><div className="rounded-card border border-border-default bg-white p-5"><Image src={catalog.images.surface} alt="Close-up of a supplier rebar helical bond surface" width={450} height={450} sizes="(max-width: 1024px) 80vw, 320px" className="mx-auto h-auto max-h-[220px] w-auto object-contain" /><p className="mt-3 text-xs leading-relaxed text-t3">Confirm the surface with its bond test data. Color and texture alone do not identify a qualified material grade.</p></div></div></div>
    </ProductSection>
    <ProductSection id="documents" title="Ask for the documents your project actually needs" intro="Select the evidence required by your engineer or purchaser. We confirm what is available for the proposed product and identify any further testing or approval needed before supply.">
      <div className="grid gap-5 md:grid-cols-2">{catalog.documents.map(item => <article key={item.title} className="rounded-card border border-border-default p-6"><h3 className="text-f18 font-bold text-t1">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-t2">{item.detail}</p></article>)}</div>
      <div className="mt-6 rounded-card bg-bg2 p-6"><h3 className="text-f18 font-bold text-t1">Standards guide the review; evidence belongs to the product.</h3><p className="mt-3 text-sm leading-relaxed text-t2">ASTM D7957/D7957M-26 is the current GFRP bar specification. ACI CODE-440.11-22 addresses covered concrete structures and references D7957-22. Use the edition required by your project and the actual edition stated on each report. Neither reference is a claim that every offered product is approved.</p><p className="mt-3 text-sm leading-relaxed text-t2">Pre-manufactured mesh is outside D7957’s scope. Bent sections, mesh intersections and project-specific approvals need separate review. For Canada, Australia and other markets, include the governing local requirements with your inquiry.</p><div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold text-teal-text"><a href="https://store.astm.org/d7957_d7957m-26.html" target="_blank" rel="noreferrer">ASTM specification ↗</a><a href="https://www.concrete.org/store/productdetail?ItemID=44011U22&Language=English&Units=US_Units" target="_blank" rel="noreferrer">ACI design code ↗</a><a href="https://www.iso.org/standard/84321.html" target="_blank" rel="noreferrer">ISO 10406-1:2025 test methods ↗</a><Link href="/resources/blog/gfrp-rebar-specification-guide-aci-440-astm-d7957">GFRP rebar specification guide →</Link></div></div>
      <div className="mt-6 flex flex-wrap gap-4"><Button href={buildRebarRfqHref("technical")}>Discuss technical documents</Button><Button href={buildRebarRfqHref("sample")} variant="secondary">Request sample evaluation</Button></div>
    </ProductSection>
    <ProductSection id="installation" title="Plan fabrication before the bars arrive" tone="muted" intro="Use the approved drawings and the instructions for the selected grade. The sequence below identifies the checks to agree with your designer, fabricator and site team.">
      <ol className="grid gap-4 md:grid-cols-2">{catalog.installation.map((item, i) => <li key={item.title} className="flex gap-4 rounded-card border border-border-default bg-white p-5"><span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {i + 1}</span><div><h3 className="text-f18 font-bold text-t1">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-t2">{item.body}</p></div></li>)}</ol><p className="mt-5 text-sm leading-relaxed text-t2">Fire resistance, seismic use, sustained loading and chemical exposure require project-specific review. <a className="font-semibold text-teal-text underline" href="https://www.concrete.org/Portals/0/Files/PDF/Previews/440.5-22_preview.pdf" target="_blank" rel="noreferrer">ACI SPEC-440.5-22</a> covers construction requirements within its stated scope. Shapes, bend schedules and mesh are covered in our <Link href="/resources/blog/gfrp-bent-bars-stirrups-mesh-ordering-guide" className="font-semibold text-teal-text underline">GFRP stirrups and bent bars guide</Link>. Handling, storage, supports, ties and flotation on site are in the <Link href="/resources/blog/how-to-install-gfrp-rebar" className="font-semibold text-teal-text underline">GFRP rebar installation guide</Link>.</p>
    </ProductSection>
    <ProductSection id="delivery" title="Agree the product, the paperwork and the packing" intro="Compare quotations by the required bars, bends or mesh sheets and the agreed delivery scope. Price per kilogram alone does not capture cutting, shape fabrication, testing, packing or freight.">
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[
        ["1", "Review the schedule", "Confirm destination, standard, grade, straight lengths, shapes and quantities. Resolve missing details before the order."],
        ["2", "Confirm the offer", "Agree product data, sample needs, inspection scope, price basis, MOQ, lead time and shipping terms."],
        ["3", "Release & inspect", "Freeze drawing revisions and the acceptance criteria. Identify batches and check the dimensions and records agreed for the order."],
        ["4", "Pack & dispatch", "Agree labels by bar mark, bundle quantities, protection and shipment phases. Check bar length against the actual packing and transport plan."],
      ].map(([n, title, text]) => <li key={n} className="border-t-2 border-teal-border pt-4"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {n}</p><h3 className="mt-2 text-f18 font-bold text-t1">{title}</h3><p className="mt-3 text-sm leading-relaxed text-t2">{text}</p></li>)}</ol>
      <div className="mt-8 flex flex-wrap items-center gap-5 rounded-card bg-bg2 p-5"><p className="flex-1 text-sm leading-relaxed text-t2">Buying for distribution? Share the target market, size mix, initial quantity, sample needs and labeling requirements.</p><Button href={buildRebarRfqHref("distributor")} variant="secondary">Discuss distributor supply</Button></div>
    </ProductSection>
    <ProductSection id="request-quote" title="A clear schedule makes the next step easier" tone="muted" intro="Use the optional builder, download a blank template, or send an existing BOQ directly. You do not need complete specifications to start a conversation."><RebarScheduleBuilder /><div className="mt-5 text-sm"><Link href={buildRebarRfqHref()} className="inline-flex min-h-11 items-center font-bold text-teal-text">Already have a schedule? Go directly to the contact form →</Link></div><FAQ items={[...catalog.faqs]} title="FRP rebar purchasing questions" /></ProductSection>
    <ProductSection id="quote" title="Quote GFRP rebar" tone="deep">
      <ProductRfq product="GFRP rebar" productPath={catalog.path} quoteHref={buildRebarRfqHref()} items={requestItems} intro="Send your bar schedule or BOQ, the shapes and mesh, the documents required and the destination." links={[{ label: "Fiberglass rebar vs steel", href: "/technology/fiberglass-rebar-vs-steel" }]} />
    </ProductSection>
  </>;
}
