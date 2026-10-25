import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import CoverCard from "@/components/ui/CoverCard";
import { FAQList } from "@/components/ui/FAQ";
import { australiaContact } from "@/content/data/australia";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { productCovers } from "@/lib/covers";
import { gratingRequestItems } from "@/lib/gratingInquiry";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const path = "/products/frp-grating-bunnings";
const seo = getSeoQueryTarget(path);
const bunningsUrl = "https://www.bunnings.com.au/matrix-1200-x-400-x-40mm-charcoal-fast-floor-panel_p3042389";
const matrixUrl = "https://jackmatrix.com.au/ground-panels/";
const baseMetadata = buildPageMetadata({ title: seo.title, description: seo.description, path, image: `${path}/opengraph-image` });
export const metadata: Metadata = { ...baseMetadata, openGraph: { ...baseMetadata.openGraph, locale: "en_AU" } };

const inquiryHref = `${buildRfqHref({
  source: "frp-grating-bunnings",
  product: "FRP grating for an Australian project",
  productPath: path,
  message: "Please review and quote FRP grating for my Australian project.\n\nApplication:\nMoulded / pultruded / help with selection:\nPanel sizes or cut plan:\nQuantity (panels or total area):\nClear span, supports and design loads:\nResin, surface and exposure:\nClips, cutouts and required documents:\nDelivery suburb, state and postcode:\nRequired date:\n\nPlease confirm the proposed configuration, applicable load data, minimum order, packing, freight scope and lead time.",
})}&country=Australia`;

const comparisons = [
  ["Material", "Matrix ground panels are described by the supplier as recycled plastic.", "Glass fibre reinforcement in a resin matrix; choose moulded mesh or pultruded bearing bars."],
  ["Starting use", "The Bunnings Fast Floor listing describes shed, storage and vehicle parking areas on a prepared flat surface.", "Walkways, platforms and access areas selected around the actual support layout and service conditions."],
  ["Panel selection", "The linked Fast Floor product is listed at 1200 × 400 × 40 mm. Follow its own installation instructions.", "Select panel geometry, mesh or bar spacing, depth, surface and a cut plan from the grating range."],
  ["Loads and supports", "Confirm suitability for your intended installation with the product supplier.", "Request load and deflection data for the chosen panel, clear span, load footprint and bearing direction."],
  ["Buying route", "Check the retailer for current price, local stock and collection or delivery.", "Request a project quotation covering panels, fabrication, clips, packing and delivery to Australia."],
] as const;

const options = [
  { href: "/products/molded-frp-grating", title: "Moulded FRP grating", label: "Mesh panels", text: "Start here for platforms with frequent cutouts or layouts requiring support in both directions. Compare square mesh and mini mesh against the opening and access requirements.", facts: ["Square & mini mesh", "Cut plans & fixing clips"] },
  { href: "/products/frp-gratings", title: "Pultruded FRP grating", label: "Bearing-bar panels", text: "Start here when the main span direction is defined. Compare I-bar and T-bar configurations, and align the bearing bars with the designed span before checking load data.", facts: ["I-bar & T-bar configurations", "Directional load path"] },
] as const;

const specifications = [
  { title: "Panel dimensions & openings", text: "Supply panel length, width, clear openings and any cutouts. Mesh designation and bar centres are not the clear opening." },
  { title: "Span, load & deflection", text: "Include support spacing and width, distributed or point loads, load footprint and allowable deflection. Thickness alone does not establish capacity." },
  { title: "Resin & exposure", text: "State chemicals, concentration, temperature, salt spray and sunlight exposure. Match the resin and surface protection to the service environment." },
  { title: "Walking surface & fixings", text: "Identify wet use, footwear, grit or other finish, clip kits and supporting frame material. Request test evidence for the proposed configuration." },
];

const faqs = [
  { question: "Does Bunnings sell FRP grating?", answer: "The Bunnings product linked here is Matrix Fast Floor; the Matrix supplier describes its ground panels as recycled plastic. That listing does not establish availability of glass-reinforced FRP grating across the retailer's range. Check the exact product material, your local store and current availability directly with Bunnings." },
  { question: "Is Matrix Fast Floor the same as fibreglass grating?", answer: "The linked Matrix ground-panel range is described as recycled plastic. F1's FRP or GRP grating uses glass fibre reinforcement and resin in a moulded grid or pultruded bar assembly. Compare the specific products and their installation data before choosing; a similar open-grid appearance does not establish equivalent performance." },
  { question: "Is FRP grating cheaper than Bunnings flooring?", answer: "There is no useful price comparison without matching the application and scope. Compare total usable area, required supports, cutting waste, fixing kits, freight and installation. Ask F1 for a written project quotation and check the current retailer price separately." },
  { question: "Can I use FRP grating for a shed floor or vehicle parking?", answer: "Describe the base and whether the panel will span between supports. Vehicle wheels create concentrated loads; a pedestrian grating selection is not a vehicle rating. The selected panel and supporting structure need applicable load data and design review before use." },
  { question: "Can I order cut-to-size panels or a small quantity?", answer: "Send the dimensions, cutouts and number of panels, even for a small requirement. Cutting scope, minimum quantity, sample arrangements and delivery cost are confirmed in the quotation. For an immediate retail purchase, check local availability with the retailer." },
  { question: "Do you supply Australian projects?", answer: `Yes. Submit your delivery suburb, state and postcode with the panel schedule. ${australiaContact.name} is F1 Composite's Australian contact in ${australiaContact.city}. Supply is through F1's China production network; freight terms and delivery timing are confirmed per order.` },
  { question: "Does F1 grating automatically meet Australian project requirements?", answer: "No generic material label establishes compliance. Provide the project's structural, slip, fire and access requirements and request evidence matching the proposed panel, resin, surface and installation. The project designer should assess that evidence before approval." },
  { question: "Is F1 Composite affiliated with Bunnings or Matrix?", answer: "No. F1 Composite is an independent FRP supplier. Bunnings and Matrix names identify the retail products discussed in this buying guide; they do not imply affiliation, approval or a distribution relationship." },
];

const linkClass = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export default function FrpGratingBunningsPage() {
  return <div lang="en-AU">
    <JsonLd data={{
      "@context": "https://schema.org", "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#webpage`, url: absoluteUrl(path),
      name: seo.title, description: seo.description, inLanguage: "en-AU",
      dateModified: "2026-10-25",
      publisher: { "@id": "https://www.f1composite.com/#organization" },
      about: { "@type": "Thing", name: "FRP grating and retail floor panel selection" },
      citation: [bunningsUrl, matrixUrl],
    }} />
    <PageHeader
      tag="Australian buying guide"
      title="FRP grating Bunnings: compare your options"
      description="Searching for FRP grating at Bunnings? Compare retail floor panels with fibreglass grating for walkways, platforms and project supply. Choose the material, support layout and buying route that fit your job."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "FRP grating", href: "/products/grating" }, { label: "Bunnings comparison" }]}
      actions={{ primary: { label: "Get an Australian project quote", href: inquiryHref }, secondary: { label: "Compare the options", href: "#comparison" }, note: "F1 Composite is independent of Bunnings and Matrix.", stickyMobile: true }}
      facts={[{ label: "Choose", value: "Moulded or pultruded" }, { label: "Specify", value: "Panels, cuts & clips" }, { label: "Deliver", value: "Quote by postcode" }]}
      figure={<figure className="overflow-hidden rounded-card border border-border-default bg-white shadow-card">
        <div className="relative aspect-[4/3]">
          <Image src="/images/products/grating/grating-panel-comparison.webp" alt="Green moulded square-mesh and yellow pultruded FRP grating samples" fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
        </div>
        <figcaption className="border-t border-border-default px-[20px] py-[16px]">
          <span className="font-mono text-f12 uppercase tracking-wide text-teal-text">F1 Composite · FRP grating</span>
          <p className="mt-[6px] text-f14 leading-relaxed text-t2">Two constructions. Select the panel around its supports, loads and exposure.</p>
        </figcaption>
      </figure>}
    />
    <PageNav items={[{ id: "comparison", label: "Retail vs FRP" }, { id: "options", label: "Grating options" }, { id: "specification", label: "What to specify" }, { id: "price", label: "Price & delivery" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Project quote" }]} />

    <PageSection id="comparison" title="First, check what the panel is made from" intro="An open grid can be made from different materials. Match the product and its installation data to the job before comparing price." tone="white">
      <div className="grid gap-[24px] lg:grid-cols-[1.35fr_1fr]">
        <div className="border-l-[3px] border-teal pl-[20px] text-f16 leading-relaxed text-t2">
          <p>The <a href={bunningsUrl} className={linkClass}>Matrix Fast Floor listing at Bunnings</a> is a retail floor-panel option. <a href={matrixUrl} className={linkClass}>Matrix describes its ground panels as recycled plastic</a>. F1 supplies glass-reinforced grating, with the construction and resin selected for the project.</p>
          <p className="mt-[12px]">Use this comparison to decide which product information to request. It is not a claim that either panel can replace the other in an existing installation.</p>
        </div>
        <aside className="rounded-card bg-bg2 p-[24px]">
          <h3 className="text-f18 font-bold text-t1">Need a panel today, or a project package?</h3>
          <p className="mt-[8px] text-f14 leading-relaxed text-t2">For local collection, check the retailer. For a walkway or platform with a panel schedule, specified loads and fabrication requirements, send F1 your drawings.</p>
          <Link href={inquiryHref} className={`mt-[12px] inline-block text-f14 ${linkClass}`}>Discuss a project requirement →</Link>
        </aside>
      </div>
      <div role="region" aria-label="Retail floor panels and FRP grating comparison" tabIndex={0} className="mt-[28px] overflow-x-auto rounded-card border border-border-default">
        <table className="w-full min-w-[700px] border-collapse text-left text-f14">
          <caption className="sr-only">Matrix Fast Floor at Bunnings compared with F1 project-specified FRP grating</caption>
          <thead className="bg-deep text-white"><tr>{["Compare", "Matrix Fast Floor / retail route", "F1 FRP grating / project route"].map(heading => <th key={heading} scope="col" className="px-[20px] py-[18px] font-semibold">{heading}</th>)}</tr></thead>
          <tbody>{comparisons.map(([label, retail, frp]) => <tr key={label} className="border-t border-border-default align-top">
            <th scope="row" className="w-[18%] bg-bg2 px-[20px] py-[18px] font-semibold text-t1">{label}</th>
            <td className="w-[41%] px-[20px] py-[18px] leading-relaxed text-t2">{retail}</td>
            <td className="w-[41%] bg-bg2/50 px-[20px] py-[18px] leading-relaxed text-t2">{frp}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="mt-[12px] text-f12 leading-relaxed text-t3">Retail references checked 25 October 2026. This comparison concerns the linked products, not the full Bunnings range. Check current specifications, stock and pricing with the retailer.</p>
    </PageSection>

    <PageSection id="options" title="Choose your FRP grating construction" intro="Once your job calls for glass-reinforced grating, use the product pages for current configurations and selection data." tone="muted">
      <div className="grid gap-[24px] md:grid-cols-2">{options.map(option => <CoverCard key={option.href} {...option} facts={[...option.facts]} cover={productCovers[option.href]} action="Compare panel specifications" sizes="(max-width: 767px) 94vw, 46vw" />)}</div>
      <p className="mt-[20px] text-f14 leading-relaxed text-t2">Planning a complete access system? Review <Link href="/products/frp-stair-treads" className={linkClass}>stair treads</Link>, <Link href="/products/frp-handrail-systems" className={linkClass}>handrails</Link> and the <Link href="/products/grating" className={linkClass}>grating selection guide</Link> together with the support frame.</p>
    </PageSection>

    <PageSection id="specification" title="Four details that make the quote useful" intro="For a wet walkway, a coastal access platform or a maintenance area, start with the site conditions and a dimensioned layout.">
      <div className="grid gap-px overflow-hidden rounded-card border border-border-default bg-border-default md:grid-cols-2">{specifications.map((item, index) => <div key={item.title} className="bg-white p-[24px] md:p-[28px]">
        <span className="font-mono text-f12 text-teal-text">0{index + 1}</span>
        <h3 className="mt-[10px] text-f20 font-bold text-t1">{item.title}</h3>
        <p className="mt-[10px] text-f16 leading-relaxed text-t2">{item.text}</p>
      </div>)}</div>
      <div className="mt-[24px] flex flex-wrap items-center justify-between gap-[16px] rounded-card bg-bg2 p-[20px]">
        <p className="max-w-[760px] text-f14 leading-relaxed text-t2">Need help turning your layout into a panel schedule? Use the grating planner, then request the applicable load tables and supporting documents.</p>
        <Button href="/products/grating#grating-quote" variant="secondary">Build a panel schedule</Button>
      </div>
    </PageSection>

    <PageSection id="price" title="FRP grating price: compare the complete supply scope" intro="A retail panel price and an export quotation cover different things. Compare the cost of the finished area with the same installation assumptions." tone="muted">
      <div className="grid gap-[32px] lg:grid-cols-[1.2fr_1fr]">
        <div>
          <dl className="space-y-[20px]">
            {[
              ["Panels & fabrication", "Construction, resin, depth, surface, order quantity, cutting, cutouts and edge treatment."],
              ["Fixings & supporting work", "Clip kits, support-frame requirements, installation access and the usable area after cutting waste."],
              ["Packing & delivery", "Packed dimensions, freight scope, destination charges, applicable taxes and unloading arrangements."],
            ].map(([title, text]) => <div key={title} className="border-b border-border-default pb-[20px]"><dt className="text-f18 font-bold text-t1">{title}</dt><dd className="mt-[6px] text-f16 leading-relaxed text-t2">{text}</dd></div>)}
          </dl>
          <p className="mt-[20px] text-f14 leading-relaxed text-t2">Minimum order, production timing and freight are confirmed for your requirement. A small urgent order may be better served by an available local retail product, subject to its suitability.</p>
        </div>
        <aside className="rounded-card border border-border-default bg-white p-[28px]">
          <p className="font-mono text-f12 uppercase tracking-wide text-teal-text">Australian project enquiries</p>
          <h3 className="mt-[12px] text-f24 font-bold text-t1">From panel schedule to delivery quote</h3>
          <ol className="mt-[20px] list-decimal space-y-[16px] pl-[20px] text-f16 leading-relaxed text-t2">
            <li>Send dimensions, quantity, application and delivery postcode.</li>
            <li>Review the proposed panel, fabrication scope and applicable product evidence.</li>
            <li>Confirm price, freight terms and lead time in the written quotation.</li>
          </ol>
          <p className="mt-[24px] text-f14 leading-relaxed text-t2">Australian contact: {australiaContact.name}, {australiaContact.city}. Products are supplied through F1&apos;s China production network.</p>
          <Link href={australiaContact.path} className={`mt-[12px] inline-block text-f14 ${linkClass}`}>Australian supply and contact details →</Link>
        </aside>
      </div>
    </PageSection>

    <PageSection id="faq" title="FRP grating Bunnings: buying questions"><FAQList items={faqs} /></PageSection>
    <PageSection id="quote" title="Turn your grating search into a project quote" tone="deep">
      <ProductRfq product="FRP grating for Australian projects" productPath={path} quoteHref={inquiryHref} quoteLabel="Request my grating quote" items={gratingRequestItems} intro="Send your panel schedule or a sketch, the service conditions and an Australian delivery postcode." links={[{ label: "Compare all FRP grating options", href: "/products/grating" }, { label: "Read the grating specification guide", href: "/resources/blog/frp-grating-specification-guide" }]} />
    </PageSection>
  </div>;
}
