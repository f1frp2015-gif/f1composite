import ProductNextSteps from "@/components/sections/ProductNextSteps";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";

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

const evidence = [
  {
    value: "370",
    label: "pultrusion lines",
    detail: "Distributed across five manufacturing bases for repeat production and capacity planning.",
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
        tag="Factory-Direct FRP Supply"
        title="FRP Pultrusion Manufacturer for Factory-Direct Global Projects"
        description="Judge a pultruded FRP supplier on engineering evidence, process controls, tooling, inspection records and landed cost as well as unit price. F1 Composite handles standard and custom profile supply from drawing review to FOB or DDP delivery."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Factory-Direct Manufacturer" },
        ]}
        actions={{
          primary: {
            label: "Request a Factory Quote",
            href: "/contact?source=factory-direct-manufacturer&inquiry_type=rfq",
          },
          secondary: {
            label: "Review Product Range",
            href: "/pultruded-frp-profiles",
            variant: "secondary",
          },
          note: "Send a drawing or profile type, quantity, standards, application, and destination for a scoped response.",
          stickyMobile: true,
        }}
      />

      <section className="bg-white py-[72px]">
        <div className="mx-auto grid max-w-[1280px] gap-[40px] px-[34px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionTag>What factory-direct should prove</SectionTag>
            <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
              Why buy from the production network
            </h2>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              Buying direct puts your project requirements in front of the people who control the die, reinforcement schedule, resin mix, pull speed, cure temperature and inspection plan. The saving on sales margin is the smaller part of it. The bigger benefit is that tolerance, surface, load, fire, corrosion, machining and packaging questions get settled before production instead of turning up as defects.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              F1 Composite handles international projects and export for FengDu&rsquo;s production network: five production bases with 370 pultrusion lines. Each order runs against an approved drawing, a defined material system, first-article checks, traceable inspection records and a shipping specification agreed with the buyer.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              If you are still choosing a profile, start with the <Link href="/pultruded-frp-profiles" className="text-teal-text hover:underline">pultruded FRP profile range</Link>. This page covers how to check the supplier and plan the purchase.
            </p>
          </div>
          <Image
            src="/images/technology/f1-composite-pultrusion-production-line-aerial.webp"
            alt="F1 Composite pultrusion manufacturing lines used for factory-direct FRP profile supply"
            width={2000}
            height={788}
            sizes="(max-width: 1024px) calc(100vw - 68px), 54vw"
            className="h-auto w-full rounded-[12px] border border-border-default object-cover shadow-[0_18px_45px_rgba(11,24,56,0.12)]"
          />
        </div>
      </section>

      <section className="bg-bg2 py-[72px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Verifiable scope</SectionTag>
          <h2 className="mt-[13px] max-w-[860px] text-f24 font-bold text-t1 md:text-f31">
            Capacity figures, and what they cover
          </h2>
          <div className="mt-[34px] grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {evidence.map((item) => (
              <article key={item.label} className="rounded-[10px] border border-border-default bg-white p-[21px]">
                <p className="text-f24 font-extrabold text-teal-text">{item.value}</p>
                <h3 className="mt-[5px] text-f15 font-bold text-t1">{item.label}</h3>
                <p className="mt-[8px] text-f13 leading-relaxed text-t2">{item.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-[21px] max-w-[960px] text-f15 leading-golden text-t2">
            These figures describe the production network. They do not qualify a specific profile: mechanical values, resin, glass architecture, fire performance, tolerances and certificates are tied to the quoted section and its production plan. The <Link href="/technology/quality-testing" className="text-teal-text hover:underline">FRP quality-testing</Link> page explains how incoming material checks, in-process checks, coupon tests and project acceptance evidence differ.
          </p>
        </div>
      </section>

      <section className="bg-white py-[72px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Supply range</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            What you can order direct
          </h2>
          <div className="mt-[34px] overflow-x-auto rounded-[10px] border border-border-default">
            <table className="w-full min-w-[820px] border-collapse bg-white text-f13">
              <thead>
                <tr className="border-b-2 border-border-default bg-bg2 text-left text-t1">
                  <th className="px-[16px] py-[13px] font-bold">Product family</th>
                  <th className="px-[16px] py-[13px] font-bold">Typical supply</th>
                  <th className="px-[16px] py-[13px] font-bold">RFQ inputs that govern</th>
                </tr>
              </thead>
              <tbody>
                {supplyFamilies.map(([family, supply, inputs], index) => (
                  <tr key={family} className={`border-b border-border-default ${index % 2 ? "bg-bg2/40" : "bg-white"}`}>
                    <td className="px-[16px] py-[14px] font-semibold text-t1">{family}</td>
                    <td className="px-[16px] py-[14px] leading-relaxed text-t2">{supply}</td>
                    <td className="px-[16px] py-[14px] leading-relaxed text-t2">{inputs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Standard structural profiles use existing dies and published section data, so they are usually the quickest to qualify. A <Link href="/products/custom-pultruded-profiles" className="text-teal-text hover:underline">custom pultruded profile</Link> adds tooling and a first-article stage, but it can remove secondary assembly, cut the part count, build in channels or fastening features, and put reinforcement where the load is. The quotation should list recurring profile cost separately from one-time tooling, testing, machining and certification costs.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[72px]">
        <div className="mx-auto max-w-[1060px] px-[34px]">
          <SectionTag>Qualification workflow</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Five steps from specification to repeat orders
          </h2>
          <ol className="mt-[34px] space-y-[18px]">
            {qualificationSteps.map((step, index) => (
              <li key={step.title} className="grid gap-[13px] rounded-[10px] border border-border-default bg-white p-[21px] sm:grid-cols-[42px_1fr]">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-teal-text text-f13 font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-f19 font-bold text-t1">{step.title}</h3>
                  <p className="mt-[8px] text-f15 leading-golden text-t2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-[72px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[34px] lg:grid-cols-2">
          <div>
            <SectionTag>FOB or DDP</SectionTag>
            <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
              Compare quotes on the same delivery terms
            </h2>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              FOB suits buyers who already handle freight forwarding, customs brokerage, insurance and import compliance. DDP suits buyers who want one delivered price, provided the seller states the classification and duty assumptions behind it. CIF and DAP split the responsibilities in other ways. No Incoterm is always cheaper, so compare quotes on the same port or site, shipment size, packing, insurance, customs clearance, tariffs, local charges, unloading and tax treatment.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The <Link href="/resources/frp-pultrusion-fob-ddp-export-guide" className="text-teal-text hover:underline">FRP pultrusion FOB and DDP export guide</Link> covers these terms, HS/HTSUS classification and Section 301 duties in more detail. It is a purchasing guide, not customs or legal advice: the importer should confirm the classification with its broker or customs authority for the exact section and use.
            </p>
          </div>
          <div className="rounded-[10px] border border-border-default bg-bg2 p-[26px]">
            <h2 className="text-f19 font-bold text-t1">What to send for a comparable quote</h2>
            <ul className="mt-[18px] space-y-[10px] text-f15 leading-relaxed text-t2">
              <li>• Drawing, catalog model, or application with critical dimensions</li>
              <li>• Quantity by length, cut schedule, annual demand, and order cadence</li>
              <li>• Resin, exposure, fire, UV, color, surface, and mechanical requirements</li>
              <li>• Applicable standards, reports, certificates, and inspection hold points</li>
              <li>• Machining, labeling, bundling, pallet, container, and unloading constraints</li>
              <li>• Named destination and Incoterm: EXW, FOB, CIF, DAP, or DDP</li>
            </ul>
            <p className="mt-[18px] text-f13 leading-relaxed text-t3">
              Without these details we can only give an indicative price. The final offer references the approved specification and lists what is excluded.
            </p>
          </div>
        </div>
      </section>

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
      <ProductNextSteps path="/products/frp-pultrusion-manufacturer-factory-direct" />
      <InnerCTA title="Qualify a factory-direct FRP profile supply route" />
    </>
  );
}
