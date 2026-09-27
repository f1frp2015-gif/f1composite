import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { fastenerFaqs, fastenerRanges, fastenersPath, threadedRodSeries } from "@/content/data/frpFasteners";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { fastenerInquiryHref } from "@/lib/fastenerInquiry";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

// Last content review; shown in the page header and used as dateModified.
const updatedAt = "2026-09-21";

const target = getSeoQueryTarget(fastenersPath);
const imageBase = "/images/products/frp-fasteners-fittings/";

export const metadata: Metadata = buildPageMetadata({
  title: target.title,
  description: target.description,
  path: fastenersPath,
  image: `${fastenersPath}/opengraph-image`,
});

// What a fastener quotation needs: the joint, the materials, the release
// details and the parts list.
const requestItems = [
  { title: "The joint", text: "The mating sections, hole pattern, grip length and installation access, and whether the connection carries tension, shear or both." },
  { title: "The materials", text: "Chemicals, concentration, temperature, outdoor exposure and any electrical isolation, so the fastener, nut and washer are selected together." },
  { title: "Release details", text: "Thread tolerances, engagement, tightening procedure, test documents, and the drawing and sample requirements." },
  { title: "Parts list and delivery", text: "Quantity per size, packing or assembly requirements, destination and target date." },
];

// Thread ranges from the rod series, as on the product family card.
const uncSizes = threadedRodSeries.filter((rod) => rod.thread.endsWith(" UNC")).map((rod) => rod.thread.split("–")[0]);
const metricSizes = threadedRodSeries.filter((rod) => /^M\d+$/.test(rod.thread)).map((rod) => rod.thread);

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
        tag="Connections"
        line={{ name: "Connections", mark: false }}
        title="FRP Fasteners and Fittings"
        description="Specify the connection as a complete set: fiberglass threaded rods, matching nuts, washers and molded fittings for industrial FRP assemblies. Compare the catalog range and send your joint requirements for a project quotation."
        facts={[
          { label: "UNC rods", value: `${uncSizes[0]}–${uncSizes[uncSizes.length - 1]}` },
          { label: "Metric rods", value: `${metricSizes[0]}–${metricSizes[metricSizes.length - 1]}` },
          { label: "Resins", value: "Vinyl ester, epoxy, polyester" },
          { label: "Fittings", value: "To your drawing" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Fasteners & Fittings" }]}
        actions={{
          primary: { label: "Request a fastener quote", href: fastenerInquiryHref() },
          secondary: { label: "Browse sizes & threads", href: "#thread-sizes", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Hex and square nuts" note="Catalog photo" caption="Component shape, color and dimensions are confirmed on the order drawing." bleed>
            <Image src={`${imageBase}frp-hex-nuts.webp`} alt="Composite hexagonal and square nuts showing different heights and bearing faces" width={600} height={400} sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" preload />
          </Figure>
        }
      />

      <PageNav
        items={[
          { id: "overview", label: "Overview" },
          { id: "product-range", label: "Range", count: fastenerRanges.length },
          { id: "thread-sizes", label: "Thread sizes", count: threadedRodSeries.length },
          { id: "grating-fixings", label: "Grating fixings" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="overview" title="Choose the thread, match the material, review the joint">
        <p className="max-w-[820px] text-f18 leading-golden text-t1">
          FRP / GRP hardware brings composite material options to profile connections, equipment supports and access assemblies. Start with the component family, then define the dimensions and service conditions of the whole connection.
        </p>
      </PageSection>

      <PageSection id="product-range" title="Find the right fastening components" tone="muted" intro="Catalog sizes provide a starting point for your inquiry. Availability, resin grade and finished geometry are confirmed for each order.">
        <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {fastenerRanges.map((range) => (
            <article id={range.id} key={range.id} className="flex scroll-mt-[128px] flex-col overflow-hidden rounded-card border border-border-default bg-white">
              <div className="relative aspect-[3/2] border-b border-border-default bg-white">
                <Image src={`${imageBase}${range.image}`} alt={range.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-contain" />
              </div>
              <div className="flex flex-1 flex-col p-[20px]">
                <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{range.label}</p>
                <h3 className="mt-[4px] text-f20 font-bold leading-tight text-t1">{range.name}</h3>
                <p className="mt-[10px] text-f14 leading-golden text-t2">{range.description}</p>
                <p className="mt-[12px] rounded-control bg-bg2 px-[12px] py-[10px] text-f14 leading-golden text-t1">{range.specification}</p>
                <p className="mb-[16px] mt-[10px] text-f12 leading-golden text-t3">{range.confirm}</p>
                <Link href={fastenerInquiryHref(range.name, range.specification)} className="mt-auto text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Quote {range.name.toLowerCase()}</Link>
              </div>
            </article>
          ))}
          <article className="flex flex-col rounded-card border border-border-default bg-white p-[24px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">One connection, one parts list</p>
            <h3 className="mt-[4px] text-f20 font-bold leading-tight text-t1">Need a matched set?</h3>
            <p className="mt-[10px] text-f14 leading-golden text-t2">Send the rod or bolt, nut and washer requirements together. Add the mating profile and a marked connection sketch so the interfaces can be checked in one review.</p>
            <p className="mt-[10px] text-f12 leading-golden text-t3">Include quantities per size and any packing or assembly requirements.</p>
            <div className="mt-auto pt-[18px]"><Button href={fastenerInquiryHref("Matched FRP fastener set")}>Quote a complete set</Button></div>
          </article>
        </div>
      </PageSection>

      <PageSection id="thread-sizes" title="Threaded rod sizes & matching nut series" count={`${threadedRodSeries.length} sizes`} intro="Select a series to carry it into your inquiry. Inch-to-millimeter values identify nominal diameter only; UNC and metric threads are not interchangeable. Metric pitch and tolerance must be confirmed.">
        <div role="region" aria-label="Threaded rod catalog sizes, scroll horizontally on small screens" tabIndex={0} className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[650px] border-collapse text-left text-f14">
            <caption className="sr-only">Vinyl ester UNC and epoxy metric threaded rod catalog sizes; lengths subject to order confirmation</caption>
            <thead><tr className="border-b border-border-default bg-bg2">{["Resin", "Thread designation", "Nominal diameter", "Catalog lengths", "Inquiry"].map((label) => <th key={label} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">{label}</th>)}</tr></thead>
            <tbody>{threadedRodSeries.map((row) => <tr key={`${row.resin}-${row.thread}`} className="border-b border-border-default last:border-b-0">
              <td className="px-[14px] py-[10px] text-t2">{row.resin}</td>
              <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.thread}</th>
              <td className="px-[14px] py-[10px] tabular-nums text-t2">{row.diameter}</td>
              <td className="px-[14px] py-[10px] text-t2">{row.length}</td>
              <td className="px-[14px] py-[4px]"><Link href={fastenerInquiryHref(`${row.resin} threaded rod`, `${row.thread}; nominal diameter ${row.diameter}; catalog length options ${row.length}`)} aria-label={`Quote ${row.resin} ${row.thread} threaded rod`} className="inline-flex min-h-[40px] items-center font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Quote size</Link></td>
            </tr>)}</tbody>
          </table>
        </div>
        <p className="mt-[14px] max-w-[900px] text-f14 leading-golden text-t3">Custom lengths can be reviewed. This table is a size reference; connection capacity, electrical performance and installation torque require documents for the supplied configuration.</p>
      </PageSection>

      <PageSection id="grating-fixings" title="Fasteners for fiberglass grating" tone="muted" intro="Specify the grating type, bar or mesh geometry, support flange and underside access before selecting the clip. These are 316 stainless steel fixing kits for FRP panels; use the guide that matches your grating family.">
        <div className="grid grid-cols-1 items-center gap-[24px] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[48px]">
          <Figure number={2} title="Grating clips and hardware" note="Reference photo" bleed>
            <div className="relative aspect-[3/2] bg-white"><Image src="/images/products/molded-frp-grating/grating-clips-hardware-reference.webp" alt="Metal hold-down clips and connection hardware for fiberglass grating" fill sizes="(max-width: 768px) 100vw, 500px" className="object-contain p-[18px]" /></div>
          </Figure>
          <div className="flex flex-wrap gap-[10px]">
            <Button href="/products/molded-frp-grating#grating-clips" variant="secondary">Molded grating · M / C / J clips</Button>
            <Button href="/products/frp-gratings#grating-clips" variant="secondary">Pultruded grating · M / J / T clips</Button>
          </div>
        </div>
      </PageSection>

      <PageSection id="faq" title="Fastener selection questions">
        <FAQList items={fastenerFaqs} />
      </PageSection>

      <RelatedLinks groups={[
        { title: "Connect your FRP assembly", links: [{ href: "/products/fiberglass-structural-shapes", label: "Structural profiles" }, { href: "/products/frp-handrail-systems", label: "Handrail systems & fittings" }, { href: "/products/frp-ladders", label: "Fixed ladder systems" }] },
        { title: "Plan the application", links: [{ href: "/applications/frp-cable-tray-supports", label: "Cable tray supports" }, { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant platforms" }, { href: "/industries/water-wastewater", label: "Water & wastewater" }] },
        { title: "Specify the material", links: [{ href: "/technology/pultrusion-resin-systems", label: "Resin systems" }, { href: "/technology/quality-testing", label: "Quality & test requirements" }, { href: "/products/custom-pultruded-profiles", label: "Custom profile development" }] },
      ]} />

      <PageSection id="quote" title="Quote fasteners and fittings" tone="deep">
        <ProductRfq
          product="FRP fasteners and fittings"
          productPath={fastenersPath}
          quoteHref={fastenerInquiryHref()}
          items={requestItems}
          intro="Send the joint, the materials and the parts list with the destination. Attach the drawing on the inquiry form so the complete supply scope can be reviewed."
        />
      </PageSection>
    </>
  );
}
