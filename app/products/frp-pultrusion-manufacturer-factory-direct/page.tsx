import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
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
const updatedAt = "2026-07-30";
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
    body: "Start with the load case, span, deflection limit, temperature, chemical exposure, fire or smoke requirement, UV exposure, design life, quantity, and destination. A useful factory RFQ describes the application rather than asking for a generic FRP grade. That lets engineering select the resin family, reinforcement architecture, surface veil, and mechanical grade against the actual duty.",
  },
  {
    title: "Freeze the drawing and acceptance criteria",
    body: "For standard shapes, identify the catalog model and the properties that govern. For custom pultrusions, issue a controlled drawing with critical dimensions, tolerances, straightness, cut length, hole pattern, finish, color, and interface dimensions. The approved drawing becomes the shared reference for die design, first-article inspection, production checks, and incoming inspection at the buyer's site.",
  },
  {
    title: "Validate material and tooling",
    body: "The manufacturer reviews resin chemistry, glass architecture, die envelope, pulling force, cure window, and expected production rate before quoting tooling. A first-article plan should state which dimensions and material properties are measured, which reports are supplied, and what happens if the sample does not meet the agreed criteria. This is where factory-direct engineering reduces rework before volume production begins.",
  },
  {
    title: "Release controlled production",
    body: "Production records should connect the finished profile to raw-material lots, process settings, dimensional inspections, and any agreed coupon tests. Cut-to-length, drilling, CNC machining, labeling, protective film, and export packaging are added only after the profile itself is stable. For repeat orders, the same approved drawing and inspection plan keep the qualification history attached to the product.",
  },
  {
    title: "Agree the export and landed-cost basis",
    body: "FOB leaves international freight, import clearance, and duty with the buyer. DDP places those tasks with the seller to the named destination, but the quotation must still state the assumed HS classification, duty exposure, delivery point, unloading responsibility, and exclusions. Comparing suppliers on the same Incoterm and destination prevents a low unit price from hiding a higher landed cost.",
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
        tag="Factory-Direct FRP Supply"
        title="FRP Pultrusion Manufacturer for Factory-Direct Global Projects"
        description="Qualify a pultruded FRP factory by its engineering evidence, process controls, tooling path, inspection records, and landed-cost terms—not by a unit-price claim alone. F1 Composite coordinates standard and custom profile supply from drawing review through FOB or DDP delivery."
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
      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName={author.fullName}
        authorRole={author.jobTitle}
        authorHref={`/about/authors/${author.slug}`}
        reviewedBy={reviewer.fullName}
        standards={["ISO 9001:2015", "EN 13706", "ASTM D3917", "Incoterms® 2020"]}
      />

      <section className="bg-white py-[72px]">
        <div className="mx-auto grid max-w-[1280px] gap-[40px] px-[34px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <SectionTag>What factory-direct should prove</SectionTag>
            <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
              A manufacturer relationship, not an anonymous trading quote
            </h2>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              A factory-direct FRP purchase should shorten the path between the project requirement and the people who control the die, reinforcement schedule, resin mix, pull speed, cure temperature, and inspection plan. The practical benefit is not simply a lower sales margin. It is the ability to resolve a tolerance, surface, load, fire, corrosion, machining, or packaging question before it becomes a production defect.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              F1 Composite is the international project and export interface for FengDu manufacturing. The operating footprint covers five production bases and 370 pultrusion lines. That scale matters only when it is paired with product-specific controls: an approved drawing, a defined material system, first-article evidence, traceable inspection, and a shipment specification that reaches the buyer unchanged.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              Buyers can begin with the complete <Link href="/pultruded-frp-profiles" className="text-teal-text hover:underline">pultruded FRP profile range</Link>, then use this page to qualify the manufacturing and export route. The two pages serve different intents: the catalog owns profile selection, while this factory-direct guide owns supplier verification and procurement execution.
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
            Factory capacity is useful only when the order has a controlled path
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
            These figures define the available platform; they do not replace qualification of the exact profile. Mechanical values, resin chemistry, glass architecture, fire performance, tolerances, and certificate requirements must be tied to the quoted section and production plan. Review the <Link href="/technology/quality-testing" className="text-teal-text hover:underline">FRP quality-testing system</Link> for the distinction between incoming materials, in-process checks, coupon testing, and project acceptance evidence.
          </p>
        </div>
      </section>

      <section className="bg-white py-[72px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Supply range</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            What a factory-direct FRP pultrusion manufacturer can quote
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
            Standard structural profiles use established dies and published section data, which usually makes them the fastest qualification route. A <Link href="/products/custom-pultruded-profiles" className="text-teal-text hover:underline">custom pultruded profile</Link> adds a tooling and first-article phase but can remove secondary assembly, reduce part count, integrate channels or fastening features, and place reinforcement where the application needs it. The quotation should separate recurring profile cost from one-time tooling, testing, machining, and certification costs.
          </p>
        </div>
      </section>

      <section className="bg-bg2 py-[72px]">
        <div className="mx-auto max-w-[1060px] px-[34px]">
          <SectionTag>Qualification workflow</SectionTag>
          <h2 className="mt-[13px] text-f24 font-bold text-t1 md:text-f31">
            Five gates from project specification to repeat shipment
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
              Compare the same landed-cost boundary
            </h2>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              FOB is appropriate when the buyer already controls freight forwarding, customs brokerage, insurance, and import compliance. DDP is useful when the buyer wants one delivered number and the seller can state the classification and duty assumptions behind it. CIF and DAP divide the responsibilities differently. None is universally cheaper; the correct comparison includes the same port or jobsite, shipment size, packaging, insurance, customs clearance, tariffs, local charges, unloading, and tax treatment.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The <Link href="/resources/frp-pultrusion-fob-ddp-export-guide" className="text-teal-text hover:underline">FRP pultrusion FOB and DDP export guide</Link> explains those boundaries, HS/HTSUS classification, and Section 301 exposure in detail. It is a procurement guide, not customs or legal advice; the importer should confirm the final classification with its broker or customs authority for the exact section and intended use.
            </p>
          </div>
          <div className="rounded-[10px] border border-border-default bg-bg2 p-[26px]">
            <h2 className="text-f19 font-bold text-t1">Send these inputs for a comparable factory quote</h2>
            <ul className="mt-[18px] space-y-[10px] text-f15 leading-relaxed text-t2">
              <li>• Drawing, catalog model, or application with critical dimensions</li>
              <li>• Quantity by length, cut schedule, annual demand, and order cadence</li>
              <li>• Resin, exposure, fire, UV, color, surface, and mechanical requirements</li>
              <li>• Applicable standards, reports, certificates, and inspection hold points</li>
              <li>• Machining, labeling, bundling, pallet, container, and unloading constraints</li>
              <li>• Named destination and Incoterm: EXW, FOB, CIF, DAP, or DDP</li>
            </ul>
            <p className="mt-[18px] text-f13 leading-relaxed text-t3">
              A quote that omits these inputs is a preliminary price indication, not a controlled production offer. The final commercial offer should reference the approved specification and identify exclusions.
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
              { href: "/products/frp-gratings", label: "Factory-direct FRP gratings" },
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
      <InnerCTA title="Qualify a factory-direct FRP profile supply route" />
    </>
  );
}
