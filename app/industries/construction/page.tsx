import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JumpNav from "@/components/sections/JumpNav";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import CollectionSchema from "@/components/seo/CollectionSchema";
import { buildPageMetadata } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";
import {
  constructionApplications,
  constructionSupportingProducts,
  constructionFaqs,
} from "@/content/data/construction";

const pageTitle = "FRP Products for Buildings & Construction";
const pageDescription =
  "Explore FRP windows, facade fins, structural profiles, grating, stairs, rebar and rooftop supports. Find products and design guidance by building application.";
const pagePath = "/industries/construction";
const conceptImage = "/images/industries/frp-building-applications-concept.webp";
const quoteHref = buildRfqHref({
  source: "construction-industry",
  product: "FRP products for a building project",
  productPath: pagePath,
});
const container = "mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]";
const heading = "mt-[13px] text-[clamp(26px,3vw,36px)] font-bold leading-tight tracking-[-0.025em] text-t1";
const productLinks = Array.from(
  new Map(
    [...constructionApplications.flatMap((group) => [...group.products]), ...constructionSupportingProducts]
      .filter((product) => product.href.startsWith("/products/"))
      .map((product) => [product.href, product]),
  ).values(),
);

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: conceptImage,
});

const selectionRows = [
  ["Window openings", "Profiles, reinforcement, thresholds or finished units", "Supply scope, complete-window performance and installation details"],
  ["Fins & support frames", "Flat, hollow or standard structural sections", "Stiffness, wind loads, joints and exposed finish"],
  ["Walking surfaces", "Molded grating, pultruded grating or closed deck", "Span direction, point loads, mesh opening, slip surface and drainage"],
  ["Concrete reinforcement", "Qualified FRP bars and factory-formed shapes", "Design basis, bond, serviceability, anchorage and fire exposure"],
  ["Rooftop installations", "Module frames, mounting rails or equipment supports", "Equipment interfaces, uplift, roof capacity and waterproofing"],
];

const resources = [
  { label: "Product evidence & reports", href: "/resources/evidence", description: "Check the scope of available test records for the proposed material or system." },
  { label: "Technical data & submittals", href: "/resources/technical-data", description: "Identify the material properties and project documentation to request." },
  { label: "Design guides", href: "/resources/design-guides", description: "Continue into member selection, fabrication and connection considerations." },
  { label: "Downloads & CAD", href: "/resources/downloads", description: "Find drawings and reference documents for the product you are evaluating." },
];

export default function ConstructionPage() {
  return (
    <>
      <CollectionSchema name={pageTitle} description={pageDescription} path={pagePath} links={productLinks} />
      <PageHeader
        tag="Industries / Buildings & Construction"
        title={pageTitle}
        description="From the window opening to the rooftop: find the right fiberglass product for each part of a building, understand the design decisions, and build a coordinated enquiry."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Buildings & Construction" },
        ]}
        actions={{
          primary: { label: "Find building products", href: "#products" },
          secondary: { label: "Discuss your project", href: quoteHref },
        }}
      />
      <JumpNav items={[
        { label: "Application map", href: "#application-map" },
        { label: "Product directory", href: "#products" },
        { label: "Design guide", href: "#design-guide" },
        { label: "Selection checklist", href: "#specification" },
        { label: "Resources & FAQ", href: "#resources" },
      ]} />

      <section id="application-map" className="scroll-mt-28 bg-white py-[40px] md:py-[55px]">
        <div className={container}>
          <div className="grid gap-[21px] lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <SectionTag>One building, six application areas</SectionTag>
              <h2 className={heading}>Where FRP fits in construction</h2>
            </div>
            <p className="max-w-[600px] text-f15 leading-relaxed text-t2">
              Fiber-reinforced polymer combines fibers with a resin matrix. The glass-fiber products in this guide are also called GFRP, GRP or fiberglass. Start with the component&apos;s job, then choose its geometry, material and supply scope.
            </p>
          </div>
          <figure className="mt-[28px]">
            <div className="overflow-hidden rounded-[12px] border border-border-default bg-white">
              <Image src={conceptImage} alt="Concept building with six numbered FRP applications: 01 window frames, 02 facade fins, 03 secondary support frame, 04 grating stairs and handrails, 05 slab reinforcement, and 06 rooftop solar supports."
                width={1536} height={1024} sizes="(max-width: 1280px) 100vw, 1212px" className="h-auto w-full" preload />
            </div>
            <figcaption className="mt-[10px] text-f13 text-t3">
              Concept illustration. Teal highlights potential FRP components; connections and proportions are schematic. Select an application below to explore its products.
            </figcaption>
          </figure>
          <nav aria-label="Building application legend" className="mt-[21px] grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
            {constructionApplications.map((group) => (
              <a key={group.id} href={`#products-${group.id}`} className="flex items-center gap-[12px] rounded-[8px] border border-border-default px-[16px] py-[13px] text-f13 font-semibold text-t1 transition-colors hover:border-teal-border hover:bg-teal-bg">
                <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-deep text-white">{group.number}</span>
                <span>{group.title}</span><span aria-hidden="true" className="ml-auto text-teal-text">↗</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="products" className="scroll-mt-28 border-y border-border-default bg-bg2 py-[55px]">
        <div className={container}>
          <SectionTag>Construction product directory</SectionTag>
          <h2 className={heading}>Go straight to the product you need</h2>
          <p className="mt-[16px] max-w-[780px] text-f15 leading-relaxed text-t2">Browse F1&apos;s current product pages by building function. Each page explains the available formats and enquiry route; final dimensions, material, fabrication and documentation are confirmed for the order.</p>
          <div className="mt-[28px] grid gap-[20px] md:grid-cols-2 lg:grid-cols-3">
            {constructionApplications.map((group) => (
              <div key={group.id} id={`products-${group.id}`} className="flex scroll-mt-28 flex-col rounded-[10px] border border-border-default bg-white p-[24px]">
                <span className="text-f13 font-bold tracking-widest text-teal-text">{group.number}</span>
                <h3 className="mt-[8px] text-f19 font-bold text-t1">{group.title}</h3>
                <p className="mt-[8px] text-f13 leading-relaxed text-t2">{group.summary}</p>
                <ul className="my-[18px] divide-y divide-border-default border-y border-border-default">
                  {group.products.map((product) => (
                    <li key={product.href}><Link href={product.href} className="flex items-center justify-between gap-[12px] py-[11px] text-f13 font-medium text-t1 hover:text-teal-text">
                      {product.label}<span aria-hidden="true" className="shrink-0 text-teal-text">→</span>
                    </Link></li>
                  ))}
                </ul>
                <a href={`#guide-${group.id}`} className="mt-auto text-f13 font-semibold text-teal-text underline decoration-teal-border underline-offset-4">Read the {group.title.toLowerCase()} guide ↓</a>
              </div>
            ))}
          </div>
          <h3 className="mt-[36px] text-f24 font-bold text-t1">More components for the building and its site</h3>
          <div className="mt-[18px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
            {constructionSupportingProducts.map((product) => (
              <Link key={product.href} href={product.href} className="rounded-[8px] border border-border-default bg-white p-[20px] transition-colors hover:border-teal-border">
                <h4 className="font-bold text-t1">{product.label} <span aria-hidden="true" className="text-teal-text">→</span></h4>
                <p className="mt-[8px] text-f13 leading-relaxed text-t2">{product.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="design-guide" className="scroll-mt-28 bg-white py-[55px]">
        <div className={container}>
          <SectionTag>Application & specification guide</SectionTag>
          <h2 className={heading}>Make the material choice at the component level</h2>
          <div className="mt-[20px] grid gap-[20px] text-f15 leading-relaxed text-t2 lg:grid-cols-2">
            <p>FRP earns its place when a specific building problem matters: heat flow through an opening, corrosion around wet equipment, handling weight on a retrofit, or repeated maintenance of exposed components. A useful comparison follows the complete installed component, including its fixings, finish and expected inspection needs.</p>
            <p>Different products use different fiber layouts, resins and manufacturing methods. A grating panel, window profile and reinforcing bar cannot share one set of design properties. Compare the proposed assembly with steel, aluminum or other options against the same loads, performance requirements and service environment.</p>
          </div>
          <div className="mt-[40px] divide-y divide-border-default">
            {constructionApplications.map((group) => (
              <article key={group.id} id={`guide-${group.id}`} className="grid scroll-mt-28 gap-[28px] py-[36px] first:pt-0 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-[55px]">
                <div>
                  <p className="text-f13 font-bold uppercase tracking-wider text-teal-text">{group.number} / {group.title}</p>
                  <h3 className="mt-[12px] text-f24 font-bold leading-snug text-t1">{group.heading}</h3>
                  <div className="mt-[20px] space-y-[16px] text-f15 leading-[1.8] text-t2">
                    {group.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
                <aside className="self-start rounded-[8px] border border-border-default bg-bg2 p-[22px]" aria-label={`${group.title} specification inputs`}>
                  <h4 className="font-bold text-t1">Bring to the specification</h4>
                  <ul className="mt-[16px] list-disc space-y-[12px] pl-[18px] text-f13 leading-relaxed text-t2">
                    {group.checks.map((check) => <li key={check}>{check}</li>)}
                  </ul>
                  <a href={`#products-${group.id}`} className="mt-[20px] inline-block text-f13 font-semibold text-teal-text">Browse this product group ↑</a>
                </aside>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="specification" className="scroll-mt-28 border-y border-border-default bg-bg2 py-[55px]">
        <div className={container}>
          <SectionTag>From concept to an enquiry</SectionTag>
          <h2 className={heading}>Resolve the choices that change the specification</h2>
          <p className="mt-[16px] max-w-[780px] text-f15 text-t2">Use this comparison to turn a general request for “FRP for a building” into a defined component package.</p>
          <div role="region" aria-label="Construction product selection comparison" tabIndex={0} className="mt-[24px] overflow-x-auto rounded-[8px] border border-border-default bg-white">
            <table className="w-full min-w-[700px] text-left text-f13">
              <caption className="sr-only">Building component, product choice and specification priority</caption>
              <thead className="bg-deep text-white"><tr>{["Building component", "Product choice", "What decides the specification"].map((label) => <th key={label} scope="col" className="px-[22px] py-[16px] font-semibold">{label}</th>)}</tr></thead>
              <tbody>{selectionRows.map(([component, choice, decision]) => <tr key={component} className="border-t border-border-default"><th scope="row" className="px-[22px] py-[18px] font-semibold text-t1">{component}</th><td className="px-[22px] py-[18px] text-t2">{choice}</td><td className="px-[22px] py-[18px] text-t2">{decision}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="mt-[32px] grid gap-[24px] md:grid-cols-2">
            <div className="rounded-[10px] border border-border-default bg-white p-[26px]">
              <h3 className="text-f19 font-bold text-t1">Define the package</h3>
              <ol className="mt-[16px] list-decimal space-y-[12px] pl-[20px] text-f15 text-t2">
                <li>Mark each FRP component on a drawing and state its job.</li>
                <li>Add section or opening dimensions, lengths, quantities and the delivery destination.</li>
                <li>Provide loads, support spacing, exposure and required performance where available.</li>
                <li>State the supply scope: profiles, cut and drilled parts, fabricated assemblies or finished units.</li>
              </ol>
            </div>
            <div className="rounded-[10px] border border-border-default bg-white p-[26px]">
              <h3 className="text-f19 font-bold text-t1">Agree the submittal and acceptance basis</h3>
              <p className="mt-[16px] text-f15 leading-relaxed text-t2">Match drawings and material declarations to the offered product. Agree which calculations, fire or thermal reports, coating evidence, samples and batch records the project needs. A report for a different laminate or assembly should be reviewed for applicability before it is used.</p>
              <p className="mt-[14px] text-f15 leading-relaxed text-t2">For custom work, settle tooling, sample approval, dimensional tolerances, inspection and packing before production. Compare quotations on that same scope so fabrication and documentation are included consistently.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="scroll-mt-28 bg-white py-[55px]">
        <div className={container}>
          <SectionTag>Continue your project</SectionTag>
          <h2 className={heading}>Drawings, evidence and design resources</h2>
          <div className="mt-[24px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => <Link key={resource.href} href={resource.href} className="rounded-[8px] border border-border-default p-[22px] hover:border-teal-border"><h3 className="font-bold text-t1">{resource.label} <span aria-hidden="true" className="text-teal-text">→</span></h3><p className="mt-[10px] text-f13 leading-relaxed text-t2">{resource.description}</p></Link>)}
          </div>
          <div className="mt-[26px] flex flex-wrap gap-x-[26px] gap-y-[12px]">
            <LinkArrow href="/technology/frp-vs-aluminum-windows">FRP vs aluminum windows</LinkArrow>
            <LinkArrow href="/technology/fiberglass-rebar-vs-steel">FRP rebar vs steel</LinkArrow>
            <LinkArrow href="/case-studies">Explore project case studies</LinkArrow>
          </div>
          <FAQ items={[...constructionFaqs]} title="Questions about FRP in buildings" />
        </div>
      </section>
      <InnerCTA title="Bring your building drawings to the discussion" quoteHref={quoteHref} />
    </>
  );
}
