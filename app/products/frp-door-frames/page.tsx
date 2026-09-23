import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JumpNav from "@/components/sections/JumpNav";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import { doorFrames as page } from "@/content/data/doorFrames";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

export const metadata: Metadata = buildPageMetadata({
  title: page.title, description: page.description, path: page.path,
  image: `${page.path}/opengraph-image`,
});

const wrap = "mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]";
const quote = buildRfqHref({ source: "frp-door-frames", product: "F1 FRP Door Frame Profiles", productPath: page.path, message: page.message });

export default function DoorFramesPage() {
  return <>
    <JsonLd data={buildProductFamilyPageSchema({ name: page.h1, description: page.description, path: page.path, image: page.image, category: "Windows & Doors", material: "Pultruded glass-fiber-reinforced polymer (FRP / GRP)", schemaType: "ItemPage" })} />
    <PageHeader tag="F1 Composite · Door frame profiles" title={page.h1} description={page.intro}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Windows & Doors", href: "/products/frp-window-frames" }, { label: "FRP Door Frames" }]}
      actions={{ primary: { label: "Request a Door Frame Quote", href: quote }, secondary: { label: "Explore the Frame", href: "#frame-design" } }} />
    <JumpNav items={[
      { href: "#frame-design", label: "Profile overview" },
      { href: "#sections", label: "Sections & dimensions" },
      { href: "#assembly", label: "Fabrication" },
      { href: "#anchoring", label: "Wall anchors" },
      { href: "#openings", label: "Opening layouts" },
      { href: "#specification", label: "Specification" },
      { href: "#request-quote", label: "Request a quote" },
    ]} />

    <section id="frame-design" className="scroll-mt-[110px] bg-white py-12 md:py-16">
      <div className={`${wrap} grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]`}>
        <figure className="min-w-0">
          <a href={page.image} aria-label="View full-size fiberglass door frame profile rendering">
            <Image src={page.image} alt="Three fiberglass door frame profiles with continuous hollow raised stops running the full length: two open-back frame sections and one closed mullion concept" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 55vw" loading="eager" className="h-auto w-full rounded-2xl" />
          </a>
          <figcaption className="mt-3 text-f12 leading-relaxed text-t3">AI product visualization. Integral stops and chambers run continuously along the profile. Final geometry follows the approved section drawing.</figcaption>
        </figure>
        <div>
          <SectionTag>From continuous profile to assembled frame</SectionTag>
          <h2 className="mt-4 text-f31 font-bold leading-tight text-t1">A fiberglass door frame starts with the section</h2>
          <p className="mt-4 text-f15 leading-relaxed text-t2">Pultrusion produces a constant cross-section along the profile length. That makes the section drawing the starting point for jamb depth, the door stop and seal interfaces. Cutting, joining and local hardware preparation turn those lengths into a frame.</p>
          <p className="mt-4 text-f15 leading-relaxed text-t2">The raised stop is a continuous part of the section. Its hollow passage runs in the same direction as the main profile; it is not a short tab attached near the end. Local pockets or stop terminations are made during secondary fabrication.</p>
          <p className="mt-4 text-f15 leading-relaxed text-t2">Specify the door leaf and wall connection alongside the profile. This lets the fabrication review address corner joints, anchor access and concentrated loads from hinges or closers before tooling is agreed.</p>
          <div className="mt-6 rounded-xl bg-bg2 p-6"><h3 className="text-f15 font-bold text-t1">What F1 supplies</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{page.scope}</p></div>
        </div>
      </div>
    </section>

    <section id="sections" className="scroll-mt-[150px] bg-bg2 py-12 md:py-16">
      <div className={wrap}>
        <SectionTag>FRP door frame cross-sections</SectionTag>
        <h2 className="mt-4 text-f31 font-bold text-t1">Read the section before comparing sizes</h2>
        <p className="mt-4 max-w-3xl text-f15 leading-relaxed text-t2">Overall jamb depth spans the wall direction. Face width describes the visible frame leg; throat width is the clear opening at the back of an open section. These dimensions are related, but they are not interchangeable.</p>
        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          {page.profileOptions.map((item) => <article key={item.title} className="overflow-hidden rounded-xl border border-border-default bg-white">
            <a href={item.image} aria-label={`View full-size ${item.title.toLowerCase()} drawing`}><Image src={item.image} alt={item.alt} width={800} height={640} sizes="(max-width: 1024px) 100vw, 33vw" className="h-auto w-full" /></a>
            <div className="p-6"><h3 className="text-f20 font-bold text-t1">{item.title}</h3><p className="mt-3 text-f14 leading-relaxed text-t2">{item.body}</p></div>
          </article>)}
        </div>
        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <h3 className="text-f24 font-bold text-t1">Reference geometry for a drawing discussion</h3>
            <p className="mt-4 text-f15 leading-relaxed text-t2">These example dimensions help explain the illustrated section family. They are not an F1 stocked-size list or tooling confirmation. Metric values are rounded conversions of the inch reference dimensions.</p>
            <p className="mt-4 text-f14 leading-relaxed text-t2">Specify wall thickness, corner radii, straightness and dimensional tolerances separately. Match the rebates to the leaf and seal, and the throat to the finished wall and installation clearance.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border-default bg-white">
            <table className="w-full text-left text-f14">
              <caption className="sr-only">Illustrative frame dimensions, subject to project drawing and tooling review</caption>
              <thead className="bg-teal-bg text-t1"><tr><th scope="col" className="p-4">Dimension</th><th scope="col" className="p-4">Inch reference</th><th scope="col" className="p-4">Metric</th></tr></thead>
              <tbody>{page.referenceDimensions.map(([label, imperial, metric]) => <tr key={label} className="border-t border-border-default"><th scope="row" className="p-4 font-semibold text-t1">{label}</th><td className="p-4 text-t2">{imperial}</td><td className="p-4 text-t2">{metric}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-bg2 py-12 md:py-16">
      <div className={wrap}>
        <SectionTag>Door frame components</SectionTag>
        <h2 className="mt-4 text-f31 font-bold text-t1">Coordinate every side of the opening</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{page.components.map((item, index) => <article key={item.title} className="rounded-xl border border-border-default bg-white p-6"><p className="text-f13 font-bold text-teal-text">0{index + 1}</p><h3 className="mt-4 text-f20 font-bold text-t1">{item.title}</h3><p className="mt-3 text-f14 leading-relaxed text-t2">{item.body}</p></article>)}</div>
        <Link href="/products/fiberglass-door-thresholds" className="mt-6 inline-block text-f14 font-bold text-teal-text underline-offset-4 hover:underline">Explore matching fiberglass door thresholds →</Link>
      </div>
    </section>

    <section id="assembly" className="scroll-mt-[150px] bg-white py-12 md:py-16">
      <div className={wrap}>
        <SectionTag>Cutting, joining & hardware</SectionTag>
        <h2 className="mt-4 text-f31 font-bold text-t1">From straight lengths to a fabricated frame</h2>
        <div className="mt-7 grid gap-6 md:grid-cols-2">{page.assembly.map((item) => <article key={item.title} className="rounded-xl border border-border-default p-6"><h3 className="text-f20 font-bold text-t1">{item.title}</h3><p className="mt-3 text-f15 leading-relaxed text-t2">{item.body}</p></article>)}</div>
      </div>
    </section>

    <section id="anchoring" className="scroll-mt-[150px] bg-bg2 py-12 md:py-16">
      <div className={wrap}>
        <SectionTag>Installation interface</SectionTag>
        <h2 className="mt-4 text-f31 font-bold text-t1">Select the anchor approach around the wall</h2>
        <p className="mt-4 max-w-3xl text-f15 leading-relaxed text-t2">An existing finished opening and a wall being built around the frame need different fixing details. Identify the substrate, construction stage, fixing access and service exposure before selecting the section.</p>
        <div className="mt-7 grid gap-6 md:grid-cols-2">{page.anchors.map((item) => <article key={item.title} className="rounded-xl border border-border-default bg-white p-6"><h3 className="text-f20 font-bold text-t1">{item.title}</h3><p className="mt-3 text-f14 font-semibold text-teal-text">{item.method}</p><p className="mt-3 text-f14 leading-relaxed text-t2">{item.detail}</p></article>)}</div>
        <p className="mt-5 text-f13 leading-relaxed text-t3">Anchor layouts, sizes and spacing require project-specific design. The approaches above describe interfaces to review, not an installation schedule.</p>
      </div>
    </section>

    <section id="openings" className="scroll-mt-[150px] bg-white py-12 md:py-16">
      <div className={wrap}>
        <SectionTag>Architectural opening layouts</SectionTag>
        <h2 className="mt-4 text-f31 font-bold text-t1">Coordinate doors, sidelights and transoms</h2>
        <figure className="mt-7">
          <a href="/images/products/door-frames/door-opening-layouts.svg" aria-label="View full-size door opening layout diagrams"><Image src="/images/products/door-frames/door-opening-layouts.svg" alt="Front elevation concepts of a single door, paired doors, a door with a transom and a door with a sidelight" width={1200} height={560} sizes="(max-width: 1320px) 100vw, 1248px" className="h-auto w-full rounded-xl" /></a>
          <figcaption className="mt-3 text-f12 text-t3">Concept elevations. Door leaves, glazing, retainers, seals and hardware are separate specification items.</figcaption>
        </figure>
        <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{page.layouts.map((item) => <div key={item.title}><h3 className="text-f20 font-bold text-t1">{item.title}</h3><p className="mt-3 text-f14 leading-relaxed text-t2">{item.body}</p></div>)}</div>
        <aside className="mt-7 rounded-xl border border-teal-border bg-teal-bg p-6"><h3 className="text-f20 font-bold text-t1">Include a plan view for handing and swing</h3><p className="mt-3 text-f15 leading-relaxed text-t2">Mark the outside or corridor side, hinge side and swing arc. For paired doors, name the active and inactive leaves. Confirm the hardware supplier&apos;s handing convention; a left/right label alone can be ambiguous across different schedules.</p></aside>
      </div>
    </section>

    <section className="bg-white py-12 md:py-16">
      <div className={wrap}>
        <SectionTag>Applications & material selection</SectionTag>
        <h2 className="mt-4 text-f31 font-bold text-t1">Where to consider an FRP door frame</h2>
        <div className="mt-7 grid gap-x-10 gap-y-7 md:grid-cols-2">{page.applications.map((item) => <article key={item.title} className="border-t border-border-default pt-5"><h3 className="text-f20 font-bold text-t1">{item.title}</h3><p className="mt-3 text-f15 leading-relaxed text-t2">{item.body}</p></article>)}</div>
      </div>
    </section>

    <section id="specification" className="scroll-mt-[110px] bg-bg2 py-12 md:py-16">
      <div className={wrap}>
        <SectionTag>Custom FRP pultrusion profiles</SectionTag>
        <h2 className="mt-4 text-f31 font-bold text-t1">Specify the frame before selecting the tooling</h2>
        <p className="mt-4 max-w-3xl text-f15 leading-relaxed text-t2">Use these inputs to develop a quote for your fiberglass door frame profile. Dimensions and tolerances belong on the agreed section drawing; assembly requirements belong in the opening and hardware schedule.</p>
        <dl className="mt-7 divide-y divide-border-default rounded-xl border border-border-default bg-white px-6">{page.specification.map(([title, body]) => <div key={title} className="grid gap-2 py-5 md:grid-cols-[220px_1fr]"><dt className="text-f14 font-bold text-t1">{title}</dt><dd className="text-f14 leading-relaxed text-t2">{body}</dd></div>)}</dl>
        <p className="mt-5 text-f14 leading-relaxed text-t2">For a fire-rated, weather-rated or thermally specified opening, confirm evidence for the complete proposed door assembly. A profile material designation alone does not establish that performance.</p>
      </div>
    </section>

    <section id="request-quote" className="scroll-mt-[110px] bg-white py-12 md:py-16">
      <div className={`${wrap} grid gap-8 lg:grid-cols-2`}>
        <div><SectionTag>Drawing review & quotation</SectionTag><h2 className="mt-4 text-f31 font-bold leading-tight text-t1">Send your door frame requirements</h2><p className="mt-4 text-f15 leading-relaxed text-t2">Start with an existing section or an opening concept. We review the profile geometry and supply scope, then define tooling and samples for evaluation before production.</p><Button href={quote} className="mt-6">Request a Door Frame Quote</Button></div>
        <div className="rounded-xl border border-border-default bg-bg2 p-7"><h3 className="text-f20 font-bold text-t1">Include with your inquiry</h3><ul className="mt-4 list-disc space-y-3 pl-5 text-f15 text-t2">{page.checklist.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </div>
    </section>

    <section className="bg-bg2 pb-14 pt-1"><div className={wrap}>
      <FAQ items={[...page.faq]} title="FRP door frame questions" />
      <nav aria-label="Related door frame products" className="mt-10 border-t border-border-default pt-7"><h2 className="text-f20 font-bold text-t1">Continue your frame design</h2><ul className="mt-5 grid gap-4 text-f14 font-bold text-teal-text sm:grid-cols-2">{[
        ["Window & door profiles for fabricators", "/products/window-door-profiles"],
        ["Fiberglass door thresholds", "/products/fiberglass-door-thresholds"],
        ["Custom pultruded profile development", "/products/custom-pultruded-profiles"],
        ["Finished fiberglass windows & doors", "/products/fiberglass-windows-doors"],
      ].map(([label, href]) => <li key={href}><Link href={href} className="underline-offset-4 hover:underline">{label} →</Link></li>)}</ul></nav>
    </div></section>
  </>;
}
