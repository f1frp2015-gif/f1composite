import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ProductPageNav from "@/components/products/ProductPageNav";
import ProductRfq from "@/components/products/ProductRfq";
import ProductSection from "@/components/products/ProductSection";
import Figure from "@/components/ui/Figure";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
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

// The package a useful building enquiry defines, in the quote block's checklist.
const requestItems = [
  { title: "Components on a drawing", text: "Mark each FRP component on a drawing and state its job." },
  { title: "Sizes and quantities", text: "Section or opening dimensions, lengths, quantities and the delivery destination." },
  { title: "Loads and exposure", text: "Loads, support spacing, exposure and required performance where available." },
  { title: "Supply scope", text: "Profiles, cut and drilled parts, fabricated assemblies or finished units." },
];

export default function ConstructionPage() {
  return (
    <>
      <CollectionSchema name={pageTitle} description={pageDescription} path={pagePath} links={productLinks} />
      <PageHeader
        tag="Industries"
        line={{ name: "Industry", label: "Buildings & construction", mark: false }}
        title={pageTitle}
        description="From the window opening to the rooftop: find the right fiberglass product for each part of a building, understand the design decisions, and build a coordinated enquiry."
        figure={
          <Figure number={1} title="One building, six application areas" note="Concept illustration" caption="Teal marks potential FRP components; connections and proportions are schematic. The numbers match the product groups below.">
            <Image
              src={conceptImage}
              alt="Concept building with six numbered FRP applications: 01 window frames, 02 facade fins, 03 secondary support frame, 04 grating stairs and handrails, 05 slab reinforcement, and 06 rooftop solar supports."
              width={1536}
              height={1024}
              sizes="(max-width: 1023px) 94vw, 44vw"
              className="h-auto w-full"
              preload
            />
          </Figure>
        }
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: { label: "Find building products", href: "#products", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Buildings & Construction" },
        ]}
      />
      <ProductPageNav
        items={[
          { id: "products", label: "Products", count: constructionApplications.length },
          { id: "design-guide", label: "Design guide" },
          { id: "specification", label: "Selection checklist" },
          { id: "resources", label: "Resources" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <ProductSection
        id="products"
        title="Products by building area"
        count={`${constructionApplications.length} areas`}
        intro="Fiber-reinforced polymer combines fibers with a resin matrix; the glass-fiber products here are also called GFRP, GRP or fiberglass. Start with the component's job, then choose its geometry, material and supply scope. Final dimensions, material, fabrication and documentation are confirmed for the order."
      >
        <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {constructionApplications.map((group) => (
            <div key={group.id} id={`products-${group.id}`} className="flex scroll-mt-[40px] flex-col rounded-card border border-border-default bg-white p-[20px] md:p-[24px]">
              <div className="flex items-center gap-[12px]">
                <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-deep text-f14 font-bold text-white">{group.number}</span>
                <h3 className="text-f18 font-bold text-t1">{group.title}</h3>
              </div>
              <p className="mt-[10px] text-f14 leading-relaxed text-t2">{group.summary}</p>
              <ul className="my-[16px] divide-y divide-border-default border-y border-border-default">
                {group.products.map((product) => (
                  <li key={product.href}>
                    <Link href={product.href} className="flex items-center justify-between gap-[12px] py-[10px] text-f14 font-medium text-t1 hover:text-teal-text">
                      {product.label}
                      <span aria-hidden="true" className="shrink-0 text-teal-text">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <a href={`#guide-${group.id}`} className="mt-auto text-f14 font-semibold text-teal-text underline decoration-teal-border underline-offset-4">
                Read the {group.title.toLowerCase()} guide ↓
              </a>
            </div>
          ))}
        </div>
        <h3 className="mt-[36px] text-f24 font-bold text-t1">More components for the building and its site</h3>
        <div className="mt-[16px] grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {constructionSupportingProducts.map((product) => (
            <Link key={product.href} href={product.href} className="rounded-card border border-border-default bg-white p-[20px] transition-colors hover:border-teal-border">
              <h4 className="font-bold text-t1">
                {product.label} <span aria-hidden="true" className="text-teal-text">→</span>
              </h4>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">{product.description}</p>
            </Link>
          ))}
        </div>
      </ProductSection>

      <ProductSection id="design-guide" title="Make the material choice at the component level" tone="muted">
        <div className="grid gap-[20px] text-f16 leading-relaxed text-t2 lg:grid-cols-2">
          <p>FRP earns its place when a specific building problem matters: heat flow through an opening, corrosion around wet equipment, handling weight on a retrofit, or repeated maintenance of exposed components. A useful comparison follows the complete installed component, including its fixings, finish and expected inspection needs.</p>
          <p>Different products use different fiber layouts, resins and manufacturing methods. A grating panel, window profile and reinforcing bar cannot share one set of design properties. Compare the proposed assembly with steel, aluminum or other options against the same loads, performance requirements and service environment.</p>
        </div>
        <div className="mt-[32px] divide-y divide-border-default border-t border-border-default">
          {constructionApplications.map((group) => (
            <article key={group.id} id={`guide-${group.id}`} className="grid scroll-mt-[40px] gap-[24px] py-[32px] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-[56px]">
              <div>
                <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">
                  {group.number} · {group.title}
                </p>
                <h3 className="mt-[10px] text-f24 font-bold leading-snug text-t1">{group.heading}</h3>
                <p className="mt-[16px] text-f16 leading-[1.8] text-t2">{group.paragraphs[0]}</p>
                {/* The rest of the guide stays in the page, one tap away, so the six guides scan as a list. */}
                {group.paragraphs.length > 1 ? (
                  <details className="group mt-[12px]">
                    <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-[8px] text-f14 font-semibold text-teal-text [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">Continue reading</span>
                      <span className="hidden group-open:inline">Show less</span>
                      <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="mt-[8px] space-y-[16px] text-f16 leading-[1.8] text-t2">
                      {group.paragraphs.slice(1).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                ) : null}
              </div>
              <aside className="self-start rounded-card border border-border-default bg-white p-[20px]" aria-label={`${group.title} specification inputs`}>
                <h4 className="font-bold text-t1">Bring to the specification</h4>
                <ul className="mt-[14px] list-disc space-y-[10px] pl-[18px] text-f14 leading-relaxed text-t2">
                  {group.checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
                <a href={`#products-${group.id}`} className="mt-[16px] inline-block text-f14 font-semibold text-teal-text">
                  Browse this product group ↑
                </a>
              </aside>
            </article>
          ))}
        </div>
      </ProductSection>

      <ProductSection id="specification" title="Resolve the choices that change the specification" intro="Use this comparison to turn a general request for “FRP for a building” into a defined component package.">
        <div role="region" aria-label="Construction product selection comparison" tabIndex={0} className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[700px] border-collapse text-left text-f14">
            <caption className="sr-only">Building component, product choice and specification priority</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Building component", "Product choice", "What decides the specification"].map((label) => (
                  <th key={label} scope="col" className="px-[14px] py-[10px] font-semibold text-t1">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectionRows.map(([component, choice, decision]) => (
                <tr key={component} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[12px] font-bold text-t1">{component}</th>
                  <td className="px-[14px] py-[12px] text-t2">{choice}</td>
                  <td className="px-[14px] py-[12px] text-t2">{decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-[24px] rounded-card border border-border-default bg-white p-[20px] md:p-[26px]">
          <h3 className="text-f18 font-bold text-t1">Agree the submittal and acceptance basis</h3>
          <div className="mt-[12px] grid gap-[16px] text-f16 leading-relaxed text-t2 lg:grid-cols-2">
            <p>Match drawings and material declarations to the offered product. Agree which calculations, fire or thermal reports, coating evidence, samples and batch records the project needs. A report for a different laminate or assembly should be reviewed for applicability before it is used.</p>
            <p>For custom work, settle tooling, sample approval, dimensional tolerances, inspection and packing before production. Compare quotations on that same scope so fabrication and documentation are included consistently.</p>
          </div>
        </div>
      </ProductSection>

      <ProductSection id="resources" title="Drawings, evidence and design resources" tone="muted">
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <Link key={resource.href} href={resource.href} className="rounded-card border border-border-default bg-white p-[20px] transition-colors hover:border-teal-border">
              <h3 className="font-bold text-t1">
                {resource.label} <span aria-hidden="true" className="text-teal-text">→</span>
              </h3>
              <p className="mt-[10px] text-f14 leading-relaxed text-t2">{resource.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-[24px] flex flex-wrap gap-x-[26px] gap-y-[12px]">
          <LinkArrow href="/technology/frp-vs-aluminum-windows">FRP vs aluminum windows</LinkArrow>
          <LinkArrow href="/technology/fiberglass-rebar-vs-steel">FRP rebar vs steel</LinkArrow>
          <LinkArrow href="/case-studies">Explore project case studies</LinkArrow>
        </div>
      </ProductSection>

      <ProductSection id="faq" title="Questions about FRP in buildings">
        <div className="grid items-start gap-[12px] md:grid-cols-2">
          {constructionFaqs.map((item) => (
            <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </ProductSection>

      <ProductSection id="quote" title="Bring your building drawings to the discussion" tone="deep">
        <ProductRfq product="FRP products for a building project" productPath={pagePath} quoteHref={quoteHref} items={requestItems} intro="Mark the FRP components on your drawings with their sizes, loads and the supply scope." />
      </ProductSection>
    </>
  );
}
