import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import { fastenerFaqs, fastenerRanges, fastenersPath, threadedRodSeries } from "@/content/data/frpFasteners";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { fastenerInquiryHref } from "@/lib/fastenerInquiry";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

// Last content review; shown in the page header and used as dateModified.
const updatedAt = "2026-09-21";

const target = getSeoQueryTarget(fastenersPath);
const imageBase = "/images/products/frp-fasteners-fittings/";
const container = "mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]";

export const metadata: Metadata = buildPageMetadata({
  title: target.title,
  description: target.description,
  path: fastenersPath,
  image: `${fastenersPath}/opengraph-image`,
});

const selectionSteps = [
  { title: "Define the joint", body: "Send the mating sections, hole pattern, grip length and access for installation. Identify whether the connection carries tension, shear or both." },
  { title: "Match the materials", body: "List chemicals, concentration, temperature, outdoor exposure and any electrical isolation requirement. Select the fastener, nut and washer together." },
  { title: "Confirm the release details", body: "Agree the thread tolerances, engagement, tightening procedure and test documents. Approve the drawing and sample requirements before production." },
];

export default function FastenersFittingsPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({
        name: "FRP Fasteners and Fittings",
        description: target.description,
        path: fastenersPath,
        image: `${imageBase}frp-hex-nuts.webp`,
        category: "Fiberglass threaded rods, nuts, washers and molded fittings",
        schemaType: "CollectionPage",
        datePublished: "2026-09-21",
        dateModified: updatedAt,
        material: ["Glass-reinforced polymer", "Vinyl ester", "Epoxy", "Polyester"],
      })} />
      <PageHeader
        updated={updatedAt}
        tag="Fasteners & Fittings · F1 Composite"
        title="FRP Fasteners and Fittings"
        description="Specify the connection as a complete set: fiberglass threaded rods, matching nuts, washers and molded fittings for industrial FRP assemblies. Compare the catalog range and send your joint requirements for a project quotation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Fasteners & Fittings" }]}
        actions={{
          primary: { label: "Request a Fastener Quote", href: fastenerInquiryHref() },
          secondary: { label: "Browse Sizes & Threads", href: "#thread-sizes", variant: "secondary" },
          note: "Include a drawing or parts list. Matching components and supply details are confirmed with your quote.",
          stickyMobile: true,
        }}
      />

      <section className="bg-white py-[40px] md:py-[55px]">
        <div className={`${container} grid items-center gap-[28px] lg:grid-cols-2`}>
          <div>
            <SectionTag>Small components. Complete connections.</SectionTag>
            <h2 className="mt-[13px] text-[clamp(26px,3vw,36px)] font-bold leading-tight tracking-[-0.02em] text-t1">Choose the thread.<br />Match the material.<br />Review the joint.</h2>
            <p className="mt-[18px] text-f16 leading-relaxed text-t2">FRP / GRP hardware brings composite material options to profile connections, equipment supports and access assemblies. Start with the component family, then define the dimensions and service conditions of the whole connection.</p>
            <div className="mt-[22px] flex flex-wrap gap-[8px]">
              {["UNC & metric series", "VE · EP · UP options", "Drawing-based fittings"].map((label) => <span key={label} className="rounded-full border border-teal-border bg-teal-bg px-[13px] py-[7px] text-f12 font-semibold text-teal-text">{label}</span>)}
            </div>
          </div>
          <figure className="overflow-hidden rounded-[12px] border border-border-default bg-bg2">
            <Image src={`${imageBase}frp-hex-nuts.webp`} alt="Composite hexagonal and square nuts showing different heights and bearing faces" width={600} height={400} sizes="(max-width: 1024px) 100vw, 600px" className="h-auto w-full" preload />
            <figcaption className="px-[18px] py-[12px] text-f12 leading-relaxed text-t3">Catalog product reference. Component shape, color and dimensions are confirmed on the order drawing.</figcaption>
          </figure>
        </div>
      </section>

      <nav aria-label="Fasteners page sections" className="border-y border-border-default bg-bg2">
        <div className={`${container} flex flex-wrap gap-x-[24px] gap-y-[2px] py-[10px]`}>
          {[{ href: "#product-range", label: "Product range" }, { href: "#thread-sizes", label: "Thread sizes" }, { href: "#grating-fixings", label: "Grating fixings" }, { href: "#selection", label: "Selection & RFQ" }].map((link) => <Link key={link.href} href={link.href} className="inline-flex min-h-[44px] items-center text-f13 font-semibold text-teal-text hover:underline">{link.label} ↓</Link>)}
        </div>
      </nav>

      <section id="product-range" className="scroll-mt-[110px] bg-bg2 py-[48px] md:py-[64px]">
        <div className={container}>
          <SectionTag>Component range</SectionTag>
          <h2 className="mt-[12px] text-f31 font-bold text-t1">Find the right fastening components</h2>
          <p className="mt-[12px] max-w-[850px] text-f15 leading-relaxed text-t2">Catalog sizes provide a starting point for your inquiry. Availability, resin grade and finished geometry are confirmed for each order.</p>
          <div className="mt-[28px] grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
            {fastenerRanges.map((range) => (
              <article id={range.id} key={range.id} className="flex scroll-mt-[110px] flex-col overflow-hidden rounded-[10px] border border-border-default bg-white">
                <div className="relative aspect-[3/2] bg-white">
                  <Image src={`${imageBase}${range.image}`} alt={range.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-contain" />
                </div>
                <div className="flex flex-1 flex-col p-[22px]">
                  <p className="text-f11 font-bold uppercase tracking-[0.08em] text-teal-text">{range.label}</p>
                  <h3 className="mt-[8px] text-f21 font-bold leading-tight text-t1">{range.name}</h3>
                  <p className="mt-[12px] text-f14 leading-relaxed text-t2">{range.description}</p>
                  <p className="mt-[14px] rounded-[6px] bg-bg2 p-[12px] text-f13 leading-relaxed text-t1">{range.specification}</p>
                  <p className="mb-[18px] mt-[12px] text-f12 leading-relaxed text-t3">{range.confirm}</p>
                  <Link href={fastenerInquiryHref(range.name, range.specification)} className="mt-auto inline-flex min-h-[44px] items-center text-f13 font-bold text-teal-text hover:underline">Quote {range.name.toLowerCase()} →</Link>
                </div>
              </article>
            ))}
            <article className="flex flex-col justify-center rounded-[10px] border border-teal-border bg-teal-bg p-[26px]">
              <SectionTag>One connection, one parts list</SectionTag>
              <h3 className="mt-[16px] text-f24 font-bold leading-tight text-t1">Need a matched set?</h3>
              <p className="mt-[16px] text-f15 leading-relaxed text-t2">Send the rod or bolt, nut and washer requirements together. Add the mating profile and a marked connection sketch so the interfaces can be checked in one review.</p>
              <div className="mt-[24px]"><Button href={fastenerInquiryHref("Matched FRP fastener set")}>Quote a Complete Set</Button></div>
              <p className="mt-[18px] text-f12 leading-relaxed text-t3">Include quantities per size and any packing or assembly requirements.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="thread-sizes" className="scroll-mt-[110px] bg-white py-[48px] md:py-[64px]">
        <div className={container}>
          <SectionTag>Nominal catalog sizes</SectionTag>
          <h2 className="mt-[12px] text-f31 font-bold text-t1">Threaded rod sizes & matching nut series</h2>
          <p className="mt-[12px] max-w-[900px] text-f15 leading-relaxed text-t2">Select a series to carry it into your inquiry. Inch-to-millimeter values identify nominal diameter only; UNC and metric threads are not interchangeable. Metric pitch and tolerance must be confirmed.</p>
          <div role="region" aria-label="Threaded rod catalog sizes, scroll horizontally on small screens" tabIndex={0} className="mt-[24px] overflow-x-auto rounded-[8px] border border-border-default focus-visible:outline-2 focus-visible:outline-teal">
            <table className="w-full min-w-[650px] text-left text-f14">
              <caption className="sr-only">Vinyl ester UNC and epoxy metric threaded rod catalog sizes; lengths subject to order confirmation</caption>
              <thead className="bg-bg2 text-f12 uppercase tracking-wide text-t1"><tr>{["Resin", "Thread designation", "Nominal diameter", "Catalog lengths", "Inquiry"].map((label) => <th key={label} scope="col" className="px-[18px] py-[15px]">{label}</th>)}</tr></thead>
              <tbody>{threadedRodSeries.map((row) => <tr key={`${row.resin}-${row.thread}`} className="border-t border-border-default">
                <td className="px-[18px] py-[12px] text-t2">{row.resin}</td>
                <th scope="row" className="px-[18px] py-[12px] font-semibold text-t1">{row.thread}</th>
                <td className="px-[18px] py-[12px] text-t2">{row.diameter}</td>
                <td className="px-[18px] py-[12px] text-t2">{row.length}</td>
                <td className="px-[18px] py-[6px]"><Link href={fastenerInquiryHref(`${row.resin} threaded rod`, `${row.thread}; nominal diameter ${row.diameter}; catalog length options ${row.length}`)} aria-label={`Quote ${row.resin} ${row.thread} threaded rod`} className="inline-flex min-h-[44px] items-center font-semibold text-teal-text hover:underline">Quote size →</Link></td>
              </tr>)}</tbody>
            </table>
          </div>
          <p className="mt-[14px] text-f13 leading-relaxed text-t3">Custom lengths can be reviewed. This table is a size reference; connection capacity, electrical performance and installation torque require documents for the supplied configuration.</p>
        </div>
      </section>

      <section id="grating-fixings" className="scroll-mt-[110px] border-y border-border-default bg-bg2 py-[48px]">
        <div className={`${container} grid items-center gap-[28px] md:grid-cols-[0.85fr_1.15fr]`}>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[10px] bg-white"><Image src="/images/products/molded-frp-grating/grating-clips-hardware-reference.webp" alt="Metal hold-down clips and connection hardware for fiberglass grating" fill sizes="(max-width: 768px) 100vw, 500px" className="object-contain p-[18px]" /></div>
          <div>
            <SectionTag>Related fixing hardware · 316 stainless steel</SectionTag>
            <h2 className="mt-[12px] text-f31 font-bold leading-tight text-t1">Fasteners for fiberglass grating</h2>
            <p className="mt-[16px] text-f15 leading-relaxed text-t2">Specify the grating type, bar or mesh geometry, support flange and underside access before selecting the clip. These are metal fixing kits for FRP panels; use the guide that matches your grating family.</p>
            <div className="mt-[22px] flex flex-wrap gap-[12px]">
              <Button href="/products/molded-frp-grating#grating-clips" variant="secondary">Molded Grating · M / C / J</Button>
              <Button href="/products/frp-gratings#grating-clips" variant="secondary">Pultruded Grating · M / J / T</Button>
            </div>
          </div>
        </div>
      </section>

      <section id="selection" className="scroll-mt-[110px] bg-white py-[48px] md:py-[64px]">
        <div className={container}>
          <SectionTag>Selection & quotation</SectionTag>
          <h2 className="mt-[12px] text-f31 font-bold text-t1">Prepare a connection that can be quoted</h2>
          <div className="mt-[26px] grid gap-[20px] md:grid-cols-3">{selectionSteps.map((step, index) => <div key={step.title} className="border-t-2 border-teal-border pt-[18px]">
            <span className="text-f12 font-bold text-teal-text">0{index + 1}</span><h3 className="mt-[8px] text-f21 font-bold text-t1">{step.title}</h3><p className="mt-[12px] text-f14 leading-relaxed text-t2">{step.body}</p>
          </div>)}</div>
          <div className="mt-[30px] flex flex-col gap-[18px] rounded-[10px] bg-bg2 p-[24px] sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[730px] text-f15 leading-relaxed text-t2"><strong className="text-t1">Ready with a BOM?</strong> Include quantity per size, delivery destination and target date. Attach the drawing on the inquiry form so F1 can review the complete supply scope.</p>
            <Button className="shrink-0" href={fastenerInquiryHref()}>Send Your Parts List</Button>
          </div>
          <FAQ items={fastenerFaqs} title="Fastener selection questions" />
        </div>
      </section>

      <RelatedLinks groups={[
        { title: "Connect your FRP assembly", links: [{ href: "/products/fiberglass-structural-shapes", label: "Structural profiles" }, { href: "/products/frp-handrail-systems", label: "Handrail systems & fittings" }, { href: "/products/frp-ladders", label: "Fixed ladder systems" }] },
        { title: "Plan the application", links: [{ href: "/applications/frp-cable-tray-supports", label: "Cable tray supports" }, { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant platforms" }, { href: "/industries/water-wastewater", label: "Water & wastewater" }] },
        { title: "Specify the material", links: [{ href: "/technology/pultrusion-resin-systems", label: "Resin systems" }, { href: "/technology/quality-testing", label: "Quality & test requirements" }, { href: "/products/custom-pultruded-profiles", label: "Custom profile development" }] },
      ]} />
      <InnerCTA title="Source the fasteners with the connection in mind" quoteHref={fastenerInquiryHref()} />
    </>
  );
}
