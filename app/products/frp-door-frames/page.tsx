import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { doorFrames as page } from "@/content/data/doorFrames";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

export const metadata: Metadata = buildPageMetadata({
  title: page.title, description: page.description, path: page.path,
  image: `${page.path}/opengraph-image`,
});

const quote = buildRfqHref({ source: "frp-door-frames", product: "F1 FRP Door Frame Profiles", productPath: page.path, message: page.message });

// The inquiry checklist, paired into the quote block's four items.
const requestItems = [
  { title: "Section and openings", text: `${page.checklist[0]}.` },
  { title: "Leaf and hardware", text: `${page.checklist[1]}.` },
  { title: "Wall and environment", text: `${page.checklist[2]}; ${page.checklist[3].toLowerCase()}.` },
  { title: "Quantities and delivery", text: `${page.checklist[4]}.` },
];

const card = "rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]";

export default function DoorFramesPage() {
  return <>
    <JsonLd data={buildProductFamilyPageSchema({ name: page.h1, description: page.description, path: page.path, image: page.image, category: "Windows & Doors", material: "Pultruded glass-fiber-reinforced polymer (FRP / GRP)", schemaType: "ItemPage" })} />
    <PageHeader
      tag="Door frames"
      line={{ name: "F1-THERM", label: "Door frames" }}
      title={page.h1}
      description={page.intro}
      facts={[
        { label: "Section families", value: `${page.profileOptions.length} reference sections` },
        { label: "Supply", value: "Lengths or cut parts" },
        { label: "Machining", value: "Hinge and strike prep" },
        { label: "Tooling", value: "Per approved drawing" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Windows & Doors", href: "/products/frp-window-frames" }, { label: "FRP Door Frames" }]}
      actions={{ primary: { label: "Request a door frame quote", href: quote }, secondary: { label: "Read the sections", href: "#sections", variant: "secondary" }, stickyMobile: true }}
      figure={
        <Figure number={1} title="Door frame profiles" note="AI concept" caption="Integral stops and chambers run continuously along the profile. Final geometry follows the approved section drawing." bleed>
          <Image src={page.image} alt="Three fiberglass door frame profiles with continuous hollow raised stops running the full length: two open-back frame sections and one closed mullion concept" width={1536} height={1024} sizes="(max-width: 1023px) 94vw, 44vw" preload className="h-auto w-full" />
        </Figure>
      }
    />
    <PageNav items={[
      { id: "frame-design", label: "Overview" },
      { id: "sections", label: "Sections" },
      { id: "components", label: "Components" },
      { id: "assembly", label: "Fabrication" },
      { id: "anchoring", label: "Wall anchors" },
      { id: "openings", label: "Layouts" },
      { id: "applications", label: "Applications" },
      { id: "specification", label: "Specification" },
      { id: "faq", label: "FAQ" },
      { id: "quote", label: "Quote" },
    ]} />

    <PageSection id="frame-design" title="A fiberglass door frame starts with the section">
      <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[48px]">
        <div className="space-y-[14px] text-f16 leading-golden text-t2">
          <p className="text-f18 text-t1">Pultrusion produces a constant cross-section along the profile length. That makes the section drawing the starting point for jamb depth, the door stop and seal interfaces. Cutting, joining and local hardware preparation turn those lengths into a frame.</p>
          <p>The raised stop is a continuous part of the section. Its hollow passage runs in the same direction as the main profile; it is not a short tab attached near the end. Local pockets or stop terminations are made during secondary fabrication.</p>
          <p>Specify the door leaf and wall connection alongside the profile. This lets the fabrication review address corner joints, anchor access and concentrated loads from hinges or closers before tooling is agreed.</p>
        </div>
        <aside className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
          <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">What F1 supplies</p>
          <p className="mt-[8px] text-f16 leading-golden text-t1">{page.scope}</p>
        </aside>
      </div>
    </PageSection>

    <PageSection id="sections" title="Read the section before comparing sizes" tone="muted" intro="Overall jamb depth spans the wall direction. Face width describes the visible frame leg; throat width is the clear opening at the back of an open section. These dimensions are related, but they are not interchangeable.">
      <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
        {page.profileOptions.map((item, index) => (
          <Figure key={item.title} number={index + 2} title={item.title} note="Section concept">
            <a href={item.image} aria-label={`View full-size ${item.title.toLowerCase()} drawing`}><Image src={item.image} alt={item.alt} width={800} height={640} sizes="(max-width: 1024px) 100vw, 33vw" className="h-auto w-full bg-white" /></a>
            <p className="mt-[12px] text-f14 leading-golden text-t2">{item.body}</p>
          </Figure>
        ))}
      </div>
      <div className="mt-[32px] grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-[48px]">
        <div>
          <h3 className="text-f20 font-bold text-t1">Reference geometry for a drawing discussion</h3>
          <p className="mt-[10px] text-f16 leading-golden text-t2">These example dimensions help explain the illustrated section family. They are not an F1 stocked-size list or tooling confirmation. Metric values are rounded conversions of the inch reference dimensions.</p>
          <p className="mt-[10px] text-f14 leading-golden text-t2">Specify wall thickness, corner radii, straightness and dimensional tolerances separately. Match the rebates to the leaf and seal, and the throat to the finished wall and installation clearance.</p>
        </div>
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="spec-table w-full border-collapse text-left text-f14">
            <caption className="sr-only">Illustrative frame dimensions, subject to project drawing and tooling review</caption>
            <thead><tr className="border-b border-border-default bg-bg2"><th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Dimension</th><th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Inch reference</th><th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Metric</th></tr></thead>
            <tbody>{page.referenceDimensions.map(([label, imperial, metric]) => <tr key={label} className="border-b border-border-default last:border-b-0"><th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{label}</th><td className="px-[14px] py-[10px] text-t2">{imperial}</td><td className="px-[14px] py-[10px] text-t2">{metric}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </PageSection>

    <PageSection id="components" title="Coordinate every side of the opening">
      <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-2 lg:grid-cols-4">
        {page.components.map((item) => <li key={item.title} className={card}><h3 className="text-f16 font-bold text-t1">{item.title}</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p></li>)}
      </ol>
      <Link href="/products/fiberglass-door-thresholds" className="mt-[16px] inline-block text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Explore matching fiberglass door thresholds</Link>
    </PageSection>

    <PageSection id="assembly" title="From straight lengths to a fabricated frame" tone="muted">
      <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2">
        {page.assembly.map((item) => <article key={item.title} className={card}><h3 className="text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p></article>)}
      </div>
    </PageSection>

    <PageSection id="anchoring" title="Select the anchor approach around the wall" intro="An existing finished opening and a wall being built around the frame need different fixing details. Identify the substrate, construction stage, fixing access and service exposure before selecting the section.">
      <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2">
        {page.anchors.map((item) => <article key={item.title} className={card}><h3 className="text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[6px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">{item.method}</p><p className="mt-[8px] text-f14 leading-golden text-t2">{item.detail}</p></article>)}
      </div>
      <p className="mt-[16px] max-w-[900px] text-f14 leading-golden text-t3">Anchor layouts, sizes and spacing require project-specific design. The approaches above describe interfaces to review, not an installation schedule.</p>
    </PageSection>

    <PageSection id="openings" title="Coordinate doors, sidelights and transoms" tone="muted">
      <Figure number={page.profileOptions.length + 2} title="Opening layouts" note="Concept elevations" caption="Door leaves, glazing, retainers, seals and hardware are separate specification items.">
        <a href="/images/products/door-frames/door-opening-layouts.svg" aria-label="View full-size door opening layout diagrams"><Image src="/images/products/door-frames/door-opening-layouts.svg" alt="Front elevation concepts of a single door, paired doors, a door with a transom and a door with a sidelight" width={1200} height={560} sizes="(max-width: 1320px) 100vw, 1248px" className="h-auto w-full bg-white" /></a>
      </Figure>
      <div className="mt-[24px] grid grid-cols-1 gap-x-[32px] gap-y-[20px] md:grid-cols-2 lg:grid-cols-4">
        {page.layouts.map((item) => <div key={item.title} className="border-t border-border-default pt-[14px]"><h3 className="text-f16 font-bold text-t1">{item.title}</h3><p className="mt-[6px] text-f14 leading-golden text-t2">{item.body}</p></div>)}
      </div>
      <aside className="mt-[24px] rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
        <h3 className="text-f18 font-bold text-t1">Include a plan view for handing and swing</h3>
        <p className="mt-[8px] text-f14 leading-golden text-t2">Mark the outside or corridor side, hinge side and swing arc. For paired doors, name the active and inactive leaves. Confirm the hardware supplier&apos;s handing convention; a left/right label alone can be ambiguous across different schedules.</p>
      </aside>
    </PageSection>

    <PageSection id="applications" title="Where to consider an FRP door frame">
      <div className="grid grid-cols-1 gap-x-[40px] gap-y-[24px] md:grid-cols-2">
        {page.applications.map((item) => <article key={item.title} className="border-t border-border-default pt-[16px]"><h3 className="text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[8px] text-f16 leading-golden text-t2">{item.body}</p></article>)}
      </div>
    </PageSection>

    <PageSection id="specification" title="Specify the frame before selecting the tooling" tone="muted" intro="Use these inputs to develop a quote for your fiberglass door frame profile. Dimensions and tolerances belong on the agreed section drawing; assembly requirements belong in the opening and hardware schedule.">
      <dl className="divide-y divide-border-default rounded-card border border-border-default bg-white px-[20px] sm:px-[24px]">{page.specification.map(([title, body]) => <div key={title} className="grid gap-[4px] py-[14px] md:grid-cols-[220px_minmax(0,1fr)] md:gap-[16px]"><dt className="text-f14 font-bold text-t1">{title}</dt><dd className="text-f14 leading-golden text-t2">{body}</dd></div>)}</dl>
      <p className="mt-[16px] max-w-[900px] text-f14 leading-golden text-t2">For a fire-rated, weather-rated or thermally specified opening, confirm evidence for the complete proposed door assembly. A profile material designation alone does not establish that performance.</p>
    </PageSection>

    <PageSection id="faq" title="FRP door frame questions">
      <FAQList items={[...page.faq]} />
    </PageSection>

    <RelatedLinks
      title="Continue your frame design"
      groups={[{ title: "Windows & doors", links: [
        { label: "Window & door profiles for fabricators", href: "/products/window-door-profiles" },
        { label: "Fiberglass door thresholds", href: "/products/fiberglass-door-thresholds" },
        { label: "Finished fiberglass windows & doors", href: "/products/fiberglass-windows-doors" },
      ] }, { title: "Development", links: [
        { label: "Custom pultruded profile development", href: "/products/custom-pultruded-profiles" },
      ] }]}
    />

    <PageSection id="quote" title="Send your door frame requirements" tone="deep">
      <ProductRfq
        product="FRP door frame profiles"
        productPath={page.path}
        quoteHref={quote}
        items={requestItems}
        intro="Start with an existing section or an opening concept. We review the profile geometry and supply scope, then define tooling and samples for evaluation before production."
      />
    </PageSection>
  </>;
}
