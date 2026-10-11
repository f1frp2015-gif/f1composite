import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import { FAQList } from "@/components/ui/FAQ";
import CoverCard from "@/components/ui/CoverCard";
import Figure from "@/components/ui/Figure";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { supplyTerms } from "@/content/data/company";
import { blogPostsBySlug } from "@/content/data/blogPosts";
import { blogCover, coverFor, regionCovers, type Cover } from "@/lib/covers";

const pageTitle =
  "FRP Cable Tray Supplier UAE — Oil & Gas Projects";
const pageDescription =
  "FRP cable tray and support inquiries for UAE oil and gas projects: define load/span evidence, component scope and delivery via Jebel Ali or Khalifa Port.";
const pagePath = "/regions/frp-cable-tray-uae-oil-gas";

const cover: Cover = regionCovers[pagePath];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "When should a UAE oil and gas project evaluate FRP cable tray?",
    answer:
      "Evaluate FRP where the project has identified corrosion or maintenance constraints, then provide the actual salt, chemical, temperature, UV and cleaning exposure. For sour-service locations, include the specified exposure and material-qualification criteria. A vinyl ester label alone does not establish suitability; the offered laminate, hardware, fire performance and installation must be reviewed against the project requirements.",
  },
  {
    question: "What standards and evidence should be included in a UAE cable tray RFQ?",
    answer:
      "Send the operator or EPC specification and its required editions, load/span criteria, fire requirements and acceptance documents. If it cites NEMA FG 1, IEC 61537, ASTM E84 or a UL listing, identify the exact requirement. F1 must confirm whether evidence exists for the offered configuration and what is included in the quotation. Listing a standard on this page is not a product certification, operator approval or promise that every report is available.",
  },
  {
    question: "Does the quotation cover supports, tray components or a complete system?",
    answer:
      "State the scope explicitly: raw support profiles, cut or drilled brackets, cable-carrying side rails and rungs, or a coordinated tray / ladder package. List straight sections, bends, tees, reducers, splices, covers, clamps and fasteners separately. Width, depth, length and load class are project inputs, not evidence of stock or a previously qualified system. Availability, fabrication and design responsibility are confirmed in the quotation.",
  },
  {
    question: "How should FRP and steel installation weight be compared?",
    answer:
      "Compare complete BOMs at the same supported load, span, deflection criteria and route geometry. Include fittings, brackets, fasteners and lifting units, using confirmed component masses. A material-density comparison alone does not establish equal capacity, lifting requirements or installed-cost savings. The site contractor determines handling, access and permit requirements for the actual work.",
  },
  {
    question: "Does a fire-test reference establish UAE project acceptance?",
    answer:
      "No. Ask the project's responsible consultant to identify the fire, smoke and approval requirements for the installation. Any proposed evidence must identify the tested formulation, specimen or assembly, method and applicable scope. Confirm report availability and whether further testing or approval is needed before ordering; a general FRP material description does not establish Civil Defence or operator acceptance.",
  },
  {
    question: "What lead times and ports apply for UAE oil and gas FRP cable tray orders?",
    answer:
      "Name Jebel Ali, Khalifa Port or the required receiving point, and state the requested Incoterm and site address. Production lead time starts from the agreed drawing, material and order release conditions; the quotation must separately confirm fabrication, inspection, booking and current freight estimates. Site access, receiving windows, unloading and any customs or inland-delivery scope need explicit agreement. No fixed arrival date is established by this page.",
  },
];

const loadRequirements = [
  { item: "Cable load and span", input: "Cable mass per meter, future fill, concentrated loads and support locations", confirmation: "Offered section, deflection limit and applicable load evidence" },
  { item: "System geometry", input: "Width, depth, rung spacing, straight lengths and splice locations", confirmation: "Match between the supplied assembly and the tested / calculated configuration" },
  { item: "Supports and connections", input: "Bracket projection, fixing substrate, clamps and anchor interfaces", confirmation: "Connection design responsibility and local bearing / fixing checks" },
  { item: "Standard or load class", input: "Governing edition, project class and required acceptance method", confirmation: "Document availability, scope and any remaining qualification work" },
];

const components = [
  { name: "Support profiles", note: "Channels, angles or tubes; identify cut lengths, holes and brackets." },
  { name: "Tray / ladder members", note: "State side rails, rungs or base type and the required width and depth." },
  { name: "Route fittings", note: "Schedule bends, tees, reducers, splices and covers for configuration review." },
  { name: "Fixings and interfaces", note: "Identify clamps, fasteners, bases and anchors, including items supplied by others." },
];

const steps = [
  {
    title: "RFQ and quote",
    body: `Send the route drawing, cable loads, component scope, operator specification and destination. We reply within ${supplyTerms.responseTime}; the quotation identifies offered items, exclusions, required approvals and available documents.`,
  },
  {
    title: "Release and inspection",
    body: "Agree the BOM, drawing revision, material, fabrication tolerances and inspection plan before release. Confirm which batch records and applicable test reports are included, and resolve any required qualification work before production.",
  },
  {
    title: "Sea freight and delivery",
    body: "Confirm the named port or site, requested Incoterm, package lengths and receiving / unloading conditions. Quote current freight and production estimates separately; inland delivery and site access are subject to the agreed scope.",
  },
];

const quoteHref = "/contact?source=region-frp-cable-tray-uae-oil-gas&inquiry_type=rfq";
const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

export default function UAECableTrayPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    about: {
      "@type": "Thing",
      name: "FRP cable tray supply for UAE oil and gas projects",
    },
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />

      <PageHeader
        tag="United Arab Emirates"
        title="FRP cable tray supplier for UAE oil and gas"
        description="Prepare a UAE oil and gas RFQ for FRP supports, tray components or an agreed cable-ladder package. Define the route, loads, exposure and required evidence, then confirm supply and delivery scope for the offered configuration."
        figure={
          <Figure number={1} title="Cable ladder in a process plant" note={cover.note} bleed>
            <div className="relative aspect-[16/10]">
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request a UAE cable tray quote", href: quoteHref },
          secondary: { label: "Review load requirements", href: "#load-classes", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/regions" },
          { label: "United Arab Emirates" },
        ]}
      />
      <PageNav items={[{ id: "why", label: "Project exposure" }, { id: "load-classes", label: "Load requirements" }, { id: "components", label: "Components" }, { id: "logistics", label: "Logistics" }, { id: "faq", label: "FAQ" }, { id: "evidence", label: "Evidence" }]} />

      <PageSection id="why" title="Define the exposure and the package for your UAE site" tone="white">
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              A coastal UAE installation, an inland process unit and an offshore route
              can require different material and access decisions. Provide the actual
              salt, chemical splash, temperature, UV and cleaning exposure, including
              sour-service requirements where the project specifies them.
            </p>
            <p>
              For replacement work, mark retained supports and interfaces on the route
              drawing. Include current cable loads, future fill, available access and
              the shutdown window. The project engineer must check the complete
              load path and the condition of the retained structure.
            </p>
          </div>
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              Choose raw support profiles, fabricated components or a coordinated
              cable-tray package as distinct supply scopes. Resin, fire behavior,
              electrical requirements and metal hardware need review for the offered
              assembly. Material selection alone does not establish operator approval.
            </p>
            <p>
              For delivery planning, name Jebel Ali, Khalifa Port or the actual
              receiving site and your requested terms. Onshore or offshore access,
              receiving appointments, onward transport and unloading need separate
              confirmation. Port choice does not establish a production or arrival date.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="load-classes"
        title="Load, span and evidence to confirm before ordering"
        intro="If your specification cites a NEMA class or IEC 61537, send the edition and acceptance criteria. No class, certification or operator approval is claimed for a complete system without evidence for its actual configuration."
        tone="muted"
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Requirement</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Provide with RFQ</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Confirm for the offer</th>
              </tr>
            </thead>
            <tbody>
              {loadRequirements.map((row) => (
                <tr key={row.item} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.item}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.input}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.confirmation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="components" title="Mark the components included in your inquiry" intro="Availability and fabrication are confirmed item by item. Supplying profiles or brackets does not automatically include the complete cable-carrying system." tone="white">
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
          {components.map((item) => (
            <li key={item.name} className="rounded-card border border-border-default bg-bg2 p-[20px]">
              <h3 className="text-f18 font-bold text-t1">{item.name}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.note}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="logistics" title="From scope confirmation to UAE delivery planning" intro="Use the quotation to agree included components, document scope, production release conditions and the named delivery point." tone="muted">
        <ol className="grid gap-[12px] lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className={mono}>Step {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{step.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <PageSection id="evidence" title="Evidence and further reading" intro="These references help define a request. They do not establish approval of a particular UAE project or the availability of a test report for your configuration." tone="muted">
        <ul className="grid gap-[12px] md:grid-cols-3">
          <li>
            <CoverCard href="/applications/frp-cable-tray-supports" cover={coverFor("/applications/frp-cable-tray-supports")!} label={<span className={mono}>Application</span>} title="FRP cable trays and cable ladders" text="Support spacing, fire and electrical scope, and connections, for selecting a tray system." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/case-studies/water-treatment-cable-tray" cover={coverFor("/case-studies/water-treatment-cable-tray")!} label={<span className={mono}>Case study</span>} title="Cable tray and handrails at a treatment plant" text="FRP cable tray, supports and handrails in wet, chemical process service." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/resources/blog/pultruded-frp-pipe-oil-and-gas" cover={blogCover(blogPostsBySlug["pultruded-frp-pipe-oil-and-gas"])} label={<span className={mono}>Article</span>} title="Where pultruded FRP fits in oil and gas" text="Which oil and gas uses suit pultruded sections, and which need wound pipe." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
        </ul>
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Products",
            links: [
              { href: "/products/fiberglass-structural-shapes", label: "FRP structural profiles for tray supports" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions" },
            ],
          },
          {
            title: "Tools",
            links: [
              { href: "/ai/sourcing", label: "Free FRP sourcing assistant" },
            ],
          },
          {
            title: "Guides",
            links: [
              { href: "/industries/industrial", label: "FRP for industrial and petrochemical plants" },
              { href: "/resources/blog/how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide", label: "Buyer's guide: sourcing FRP from China" },
            ],
          },
          {
            title: "Other markets",
            links: [
              { href: "/regions/frp-grating-supplier-saudi-arabia", label: "FRP grating for Saudi Arabia" },
            ],
          },
        ]}
      />

      <InnerCTA
        title="Request a UAE quote for FRP cable tray or support components"
        quoteHref={quoteHref}
        text="Send the route drawing, component scope, load and evidence requirements, plus the named port or site and requested delivery terms."
      />
    </>
  );
}
