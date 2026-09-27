import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import Figure from "@/components/ui/Figure";
import { company } from "@/content/data/company";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug, reviewerCredit } from "@/lib/authors";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/frp-pultrusion-manufacturer-factory-direct";
const seoTarget = getSeoQueryTarget(pagePath);
const publishedAt = "2026-07-30";
const updatedAt = "2026-09-23";
const author = authorsBySlug["haifeng-gong"];
const reviewer = authorsBySlug["yifan-liu"];

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: "/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "factory-direct-manufacturer",
  product: "Factory-direct FRP pultrusion",
  productPath: pagePath,
  message: "Please quote factory-direct FRP profiles. I will send the drawing or profile type, quantity, standards, application and destination.",
});

const requestItems = [
  { title: "Drawing or model", text: "A drawing, catalog model or the application, with the critical dimensions." },
  { title: "Quantities", text: "Quantity by length, cut schedule, annual demand and order cadence." },
  { title: "Requirements", text: "Resin, exposure, fire, UV, color, surface and mechanical requirements; standards, reports, certificates and inspection hold points." },
  { title: "Packing and delivery", text: "Machining, labeling, bundling, pallet, container and unloading constraints; the named destination and Incoterm (EXW, FOB, CIF, DAP or DDP)." },
];

const evidence = [
  {
    value: String(company.production.lines),
    label: "pultrusion lines",
    detail: `Distributed across ${company.production.bases} manufacturing bases for repeat production and capacity planning.`,
  },
  {
    value: "600 × 300 mm",
    label: "custom die envelope",
    detail: "For large or application-specific pultruded sections, subject to geometry and process review.",
  },
  {
    value: "FOB / DDP",
    label: "export delivery routes",
    detail: "Buyer-controlled freight or a quoted landed-cost route with customs assumptions stated.",
  },
  {
    value: "EN 13706",
    label: "structural profile framework",
    detail: "Used with drawing-specific tolerances, test methods, and ASTM D3917 where applicable.",
  },
];

const qualificationSteps = [
  {
    title: "Define the service requirement",
    body: "Start with the load case, span, deflection limit, temperature, chemical exposure, fire or smoke requirement, UV exposure, design life, quantity and destination. Describe the application rather than asking for a generic FRP grade; that lets our engineers choose the resin family, reinforcement, surface veil and mechanical grade for the actual duty.",
  },
  {
    title: "Freeze the drawing and acceptance criteria",
    body: "For standard shapes, give the catalog model and the properties that govern. For custom pultrusions, issue a controlled drawing with critical dimensions, tolerances, straightness, cut length, hole pattern, finish, color and interface dimensions. The approved drawing is then the reference for die design, first-article inspection, production checks and your incoming inspection.",
  },
  {
    title: "Validate material and tooling",
    body: "Before tooling is quoted, the resin, glass architecture, die envelope, pulling force, cure window and expected production rate are reviewed. The first-article plan should say which dimensions and properties are measured, which reports you receive, and what happens if the sample misses the agreed criteria. Problems caught at this stage never reach volume production.",
  },
  {
    title: "Release controlled production",
    body: "Production records link each finished profile to its raw-material lots, process settings, dimensional inspections and any agreed coupon tests. Cutting, drilling, CNC machining, labeling, protective film and export packing are added once the profile itself is stable. Repeat orders use the same approved drawing and inspection plan, so the qualification history stays with the product.",
  },
  {
    title: "Agree the export and landed-cost basis",
    body: "Under FOB, international freight, import clearance and duty stay with the buyer. Under DDP the seller takes them on to the named destination, and the quotation should state the assumed HS classification, duty, delivery point, unloading responsibility and exclusions. Compare suppliers on the same Incoterm and destination, or a low unit price can hide a higher landed cost.",
  },
];

const supplyFamilies = [
  ["Structural shapes", "I-beams, channels, angles, square and round tubes, flat bars, rods", "Standing-die sizes with section data; custom dimensions by drawing"],
  ["FRP gratings", "Molded and pultruded panels, stair treads, clips and cut panels", "Resin, mesh, load, slip, fire and exposure requirements"],
  ["Window profiles", "Frame, sash, mullion, transom and glazing-bead lineals; finished units", "U-value target, opening type, glazing, hardware and certification route"],
  ["Custom pultrusions", "System-specific sections, reinforcement cores, rails, supports and panels", "Geometry, interface tolerance, fiber architecture, machining and finish"],
];

export default function FactoryDirectPultrusionPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Factory-direct FRP pultrusion manufacturing and export supply",
          description: seoTarget.description,
          path: pagePath,
          image: "/images/technology/f1-composite-pultrusion-production-line-aerial.webp",
          category: "FRP pultrusion manufacturer",
          material: ["E-glass reinforced polymer", "Polyester resin", "Vinyl ester resin", "Polyurethane resin"],
          schemaType: "WebPage",
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: { name: author.fullName, jobTitle: author.jobTitle, path: `/about/authors/${author.slug}` },
          reviewedBy: { name: reviewer.fullName, jobTitle: reviewer.jobTitle, path: `/about/authors/${reviewer.slug}` },
        })}
      />
      <PageHeader
        updated={updatedAt}
        reviewer={reviewerCredit(reviewer)}
        tag="Manufacturing"
        title="FRP Pultrusion Manufacturer for Factory-Direct Global Projects"
        description="Judge a pultruded FRP supplier on engineering evidence, process controls, tooling, inspection records and landed cost as well as unit price. F1 Composite handles standard and custom profile supply from drawing review to FOB or DDP delivery."
        facts={[
          { label: "Pultrusion lines", value: String(company.production.lines) },
          { label: "Production bases", value: String(company.production.bases) },
          { label: "Existing dies", value: `${company.production.dieSets.toLocaleString("en-US")}+` },
          { label: "Delivery", value: "FOB or DDP" },
        ]}
        figure={
          <Figure number={1} title="Pultrusion lines" note="Production photo" caption="Pultrusion lines in FengDu's production network; F1 Composite is its export company." bleed>
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/technology/f1-composite-pultrusion-production-line-aerial.webp"
                alt="F1 Composite pultrusion manufacturing lines used for factory-direct FRP profile supply"
                fill
                preload
                sizes="(max-width: 1023px) 94vw, 44vw"
                className="object-cover"
                style={{ objectPosition: "62% center" }}
              />
            </div>
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Factory-Direct Manufacturer" },
        ]}
        actions={{
          primary: { label: "Request a factory quote", href: quoteHref },
          secondary: { label: "Review the product range", href: "/pultruded-frp-profiles", variant: "secondary" },
          note: "Send a drawing or profile type, quantity, standards, application, and destination for a scoped response.",
          stickyMobile: true,
        }}
      />
      <PageNav
        items={[
          { id: "why", label: "Why direct" },
          { id: "capacity", label: "Capacity" },
          { id: "range", label: "Supply range" },
          { id: "workflow", label: "Qualification" },
          { id: "delivery", label: "FOB or DDP" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <PageSection id="why" title="Why buy from the production network">
        <div className="max-w-[820px] space-y-[14px] text-f16 leading-golden text-t2">
          <p className="text-f18 text-t1">
            Buying direct puts your project requirements in front of the people who control the die, reinforcement schedule, resin mix, pull speed, cure temperature and inspection plan. The saving on sales margin is the smaller part of it. The bigger benefit is that tolerance, surface, load, fire, corrosion, machining and packaging questions get settled before production instead of turning up as defects.
          </p>
          <p>
            F1 Composite handles international projects and export for FengDu&rsquo;s production network: {company.production.bases} production bases with {company.production.lines} pultrusion lines. Each order runs against an approved drawing, a defined material system, first-article checks, traceable inspection records and a shipping specification agreed with the buyer.
          </p>
          <p>
            If you are still choosing a profile, start with the{" "}
            <Link href="/pultruded-frp-profiles" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">pultruded FRP profile range</Link>. This page covers how to check the supplier and plan the purchase.
          </p>
        </div>
      </PageSection>

      <PageSection id="capacity" title="Capacity figures, and what they cover" tone="muted">
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border-default bg-border-default sm:grid-cols-2 lg:grid-cols-4">
          {evidence.map((item) => (
            <div key={item.label} className="bg-white px-[20px] py-[16px]">
              <dt className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{item.label}</dt>
              <dd className="mt-[6px] text-f24 font-extrabold leading-tight text-t1">{item.value}</dd>
              <dd className="mt-[6px] text-f14 leading-golden text-t2">{item.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-[16px] max-w-[960px] text-f16 leading-golden text-t2">
          These figures describe the production network. They do not qualify a specific profile: mechanical values, resin, glass architecture, fire performance, tolerances and certificates are tied to the quoted section and its production plan. The{" "}
          <Link href="/technology/quality-testing" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">FRP quality-testing</Link> page explains how incoming material checks, in-process checks, coupon tests and project acceptance evidence differ.
        </p>
      </PageSection>

      <PageSection id="range" title="What you can order direct">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-f14">
            <caption className="sr-only">Product families supplied factory-direct</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Product family</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Typical supply</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">RFQ inputs that govern</th>
              </tr>
            </thead>
            <tbody>
              {supplyFamilies.map(([family, supply, inputs]) => (
                <tr key={family} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[12px] font-semibold text-t1">{family}</th>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{supply}</td>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{inputs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[960px] text-f16 leading-golden text-t2">
          Standard structural profiles use existing dies and published section data, so they are usually the quickest to qualify. A{" "}
          <Link href="/products/custom-pultruded-profiles" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">custom pultruded profile</Link> adds tooling and a first-article stage, but it can remove secondary assembly, cut the part count, build in channels or fastening features, and put reinforcement where the load is. The quotation should list recurring profile cost separately from one-time tooling, testing, machining and certification costs.
        </p>
      </PageSection>

      <PageSection id="workflow" title="Five steps from specification to repeat orders" tone="muted">
        <ol className="divide-y divide-border-default rounded-card border border-border-default bg-white px-[20px] sm:px-[24px]">
          {qualificationSteps.map((step, index) => (
            <li key={step.title} className="grid gap-[4px] py-[16px] md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-[24px]">
              <div>
                <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p>
                <h3 className="mt-[4px] text-f16 font-bold text-t1">{step.title}</h3>
              </div>
              <p className="text-f14 leading-golden text-t2 md:pt-[20px]">{step.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="delivery" title="Compare quotes on the same delivery terms">
        <div className="grid grid-cols-1 gap-[16px] text-f16 leading-golden text-t2 lg:grid-cols-2 lg:gap-[48px]">
          <p>
            FOB suits buyers who already handle freight forwarding, customs brokerage, insurance and import compliance. DDP suits buyers who want one delivered price, provided the seller states the classification and duty assumptions behind it. CIF and DAP split the responsibilities in other ways. No Incoterm is always cheaper, so compare quotes on the same port or site, shipment size, packing, insurance, customs clearance, tariffs, local charges, unloading and tax treatment.
          </p>
          <p>
            The{" "}
            <Link href="/resources/frp-pultrusion-fob-ddp-export-guide" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">FRP pultrusion FOB and DDP export guide</Link> covers these terms, HS/HTSUS classification and Section 301 duties in more detail. It is a purchasing guide, not customs or legal advice: the importer should confirm the classification with its broker or customs authority for the exact section and use.
          </p>
        </div>
      </PageSection>

      <RelatedLinks
        groups={[
          {
            title: "Select products",
            links: [
              { href: "/pultruded-frp-profiles", label: "Pultruded FRP profiles and structural shapes" },
              { href: "/products/frp-gratings", label: "Factory-direct pultruded FRP gratings" },
              { href: "/products/frp-window-frames", label: "FRP window frames and profiles" },
            ],
          },
          {
            title: "Qualify the factory",
            links: [
              { href: "/technology/quality-testing", label: "FRP manufacturing quality tests" },
              { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "How to choose an FRP pultrusion supplier" },
              { href: "/about", label: "F1 Composite company and manufacturing" },
            ],
          },
          {
            title: "Plan procurement",
            links: [
              { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "FRP pultrusion FOB and DDP export guide" },
              { href: "/fiberglass-pultruded-profile-price", label: "Pultruded FRP profile price estimator" },
              { href: "/regions/frp-pultrusion-supplier-usa", label: "FRP pultrusion supply to the USA" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Qualify a factory-direct FRP profile supply route" tone="deep">
        <ProductRfq
          product="Factory-direct FRP pultrusion"
          productPath={pagePath}
          quoteHref={quoteHref}
          items={requestItems}
          intro="Send what you have. Without these details we can only give an indicative price; the final offer references the approved specification and lists what is excluded."
        />
      </PageSection>
    </>
  );
}
