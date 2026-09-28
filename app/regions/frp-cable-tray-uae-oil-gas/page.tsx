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
  "FRP cable trays and ladders for UAE oil and gas projects: vinyl ester for sour service, NEMA FG 1 / IEC 61537 references, Jebel Ali or Khalifa Port delivery.";
const pagePath = "/regions/frp-cable-tray-uae-oil-gas";

const cover: Cover = regionCovers[pagePath];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Why is FRP cable tray preferred over galvanized steel in UAE oil and gas service?",
    answer:
      "UAE oil and gas sites combine three things that wear out galvanized steel cable tray: salty coastal air across Abu Dhabi, Dubai, Ras Al Khaimah and Fujairah; H₂S and CO₂ on sour-service upstream and midstream assets; and chemical splash and oil mist on process platforms. FRP cable tray does not rust, and a vinyl ester resin handles most of this exposure without coatings. Galvanized steel tray in the same service can need partial or full replacement within the asset's first major shutdown cycle. Design life for FRP still depends on the resin, UV protection and inspection.",
  },
  {
    question: "Which standards do ADNOC and UAE EPC contractors specify for FRP cable tray?",
    answer:
      "UAE project specifications usually reference NEMA FG 1 (fiberglass cable tray, with load/span classes), IEC 61537 (cable tray and cable ladder systems), ASTM E84 flame spread (Class 1 / Class A), UL 568 for nonmetallic cable tray where a listing is required, and the operator's own material selection specifications for cable management in process areas. We supply FRP cable tray in vinyl ester or isophthalic polyester resin, with batch mill test certificates; fire, chemical and load test reports are provided on request.",
  },
  {
    question: "What FRP cable tray cross-sections and load classes are most commonly ordered for UAE projects?",
    answer:
      "The most common order for UAE oil and gas projects is pultruded FRP ladder-type cable tray, 100, 150, 300 or 600 mm wide and 100 or 150 mm deep, NEMA Class 16C or 20C, in vinyl ester resin, with 6 m or 12 m straight lengths and matching elbows, tees, crosses and reducers. Solid-bottom ventilated tray is specified where smaller instrument cables run. Cable ladders are preferred over solid-bottom tray in process areas so that oil and water drain away. Offshore and sour-service onshore projects specify vinyl ester or polyurethane resin; less aggressive service uses isophthalic polyester.",
  },
  {
    question: "How does FRP cable tray weight reduction affect installation cost on UAE process plants?",
    answer:
      "Pultruded FRP cable tray weighs roughly half as much as galvanized steel tray of the same load class. On a process platform with more than 2,000 m of tray, that is 8–12 tonnes less to lift. Most sizes can be carried and fitted by two people without mechanical lifting, and there is less rigging and no hot work. FRP costs more per meter than galvanized steel, so whether the installed cost comes out lower depends on quantities, support spacing and site labor; we can price both options for your layout.",
  },
  {
    question: "Does FRP cable tray meet UAE Civil Defence fire safety requirements?",
    answer:
      "It can, with the right resin and test evidence. Fire-retardant formulations are tested for ASTM E84 flame spread (Class 1 / Class A: FSI ≤ 25, smoke developed ≤ 450), and higher-performance grades for EN 13501-1 and BS 476 Part 7 where a project calls for European or UK classifications. UAE Civil Defence (DCD / Abu Dhabi CD) acceptance depends on the building type and route, so confirm the required classification with the consultant. Fire test reports for the supplied formulation are provided on request.",
  },
  {
    question: "What lead times and ports apply for UAE oil and gas FRP cable tray orders?",
    answer:
      "Sea freight from Shanghai or Ningbo takes 18–22 days to Jebel Ali in Dubai and 19–24 days to Khalifa Port or Mussafah Port in Abu Dhabi. Direct calls are also available to Mina Zayed and Khor Fakkan. F1 Composite typically quotes CIF Jebel Ali for projects staged through Dubai or Sharjah and DAP to the project site for ADNOC Onshore destinations. Standard cable tray reaches the port 5–7 weeks after the purchase order; custom widths or project-specific coatings add 2–4 weeks. For multi-container orders, container planning begins 6–8 weeks before installation to avoid storage charges at Jebel Ali.",
  },
];

const loadClasses = [
  { nemaClass: "8A / 8B / 8C", span: "8 ft (2.4 m)", use: "Light cable, instrument runs" },
  { nemaClass: "12A / 12B / 12C", span: "12 ft (3.7 m)", use: "General process and utility runs" },
  { nemaClass: "16A / 16B / 16C", span: "16 ft (4.9 m)", use: "Main process trays" },
  { nemaClass: "20A / 20B / 20C", span: "20 ft (6.1 m)", use: "Heavy power cable, refinery mains" },
  { nemaClass: "24A / 24B / 24C", span: "24 ft (7.3 m)", use: "High-load mains and pipe-rack runs" },
];

const components = [
  { name: "Ladder cable tray", note: "Open rungs, 100, 150, 300 and 600 mm wide" },
  { name: "Solid-bottom tray", note: "Ventilated or solid, for instrument cable runs" },
  { name: "Fittings", note: "Elbows, tees, crosses, reducers and dropouts" },
  { name: "Support hardware", note: "Pultruded FRP brackets and clamps" },
];

const steps = [
  {
    title: "RFQ and quote",
    body: `Send the tray layout or cable schedule, widths, load class, resin and delivery terms. We reply within ${supplyTerms.responseTime}, then quote CIF Jebel Ali or DAP to site with a list of included documents.`,
  },
  {
    title: "Production and documents",
    body: "Trays, fittings and supports are made in FengDu's production network. Batch mill test certificates ship with each order; fire, chemical and load test reports are provided on request.",
  },
  {
    title: "Sea freight and delivery",
    body: "Standard cable tray reaches Jebel Ali 5–7 weeks after the purchase order, and custom widths or coatings add 2–4 weeks. DAP delivery covers onshore sites such as Habshan, Bab, Bu Hasa and Ruwais.",
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
        description="Pultruded fiberglass cable trays and ladders for onshore and offshore oil and gas projects in the UAE, with vinyl ester resin for sour service, NEMA FG 1 and IEC 61537 references, and CIF Jebel Ali or DAP delivery to site."
        figure={
          <Figure number={1} title="Cable ladder in a process plant" note={cover.note} bleed>
            <div className="relative aspect-[16/10]">
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request a UAE cable tray quote", href: quoteHref },
          secondary: { label: "See the load classes", href: "#load-classes", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/regions" },
          { label: "United Arab Emirates" },
        ]}
      />
      <PageNav items={[{ id: "why", label: "Why FRP" }, { id: "load-classes", label: "Load classes" }, { id: "components", label: "Components" }, { id: "logistics", label: "Logistics" }, { id: "faq", label: "FAQ" }, { id: "evidence", label: "Evidence" }]} />

      <PageSection id="why" title="Why galvanized cable tray wears out in UAE service" tone="white">
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              UAE upstream, refining and gas plants run cable management in one of the
              hardest corrosion environments in the industry: 45–50°C summer air, salty
              Gulf coastal air, H₂S and CO₂ in sour-service operations, and chemical
              splash and oil mist on process platforms.
            </p>
            <p>
              Under these combined conditions galvanized steel cable tray can need
              replacement long before the plant does. Zinc is lost first in the splash
              zone, then the steel corrodes fastest at field-cut ends and field-welded
              supports where the galvanizing was not properly restored. Replacement
              needs shutdown windows, scaffold access, hot-work permits and crew
              mobilization.
            </p>
          </div>
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              Pultruded FRP cable tray in vinyl ester resin does not rust and handles most
              of this exposure without coatings. FRP cable management has been used on
              Gulf oil and gas projects for many years; maintenance is mainly cleaning and
              inspection during scheduled shutdowns.
            </p>
            <p>
              We supply FRP cable tray made in China with NEMA FG 1 and IEC 61537
              references, and test reports (including ASTM E84) on request against the
              operator&apos;s project requirements. CIF Jebel Ali is the most common
              Incoterm for projects staged through Dubai or Sharjah. DAP to site suits
              onshore locations such as Habshan, Bab and Bu Hasa, the Ruwais refinery
              area, and offshore work supported through Mussafah Port.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="load-classes"
        title="NEMA load classes for UAE project specifications"
        intro="The class number is the support span in feet and the letter the uniformly distributed load: A is 50 lb/ft (74 kg/m), B 75 lb/ft (112 kg/m) and C 100 lb/ft (149 kg/m). Specifications usually call for 16C or 20C on main process trays."
        tone="muted"
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">NEMA class</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Support span</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Typical UAE application</th>
              </tr>
            </thead>
            <tbody>
              {loadClasses.map((row) => (
                <tr key={row.nemaClass} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.nemaClass}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.span}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="components" title="Cable tray system components" tone="white">
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
          {components.map((item) => (
            <li key={item.name} className="rounded-card border border-border-default bg-bg2 p-[20px]">
              <h3 className="text-f18 font-bold text-t1">{item.name}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.note}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="logistics" title="From FengDu's plants to your UAE site" intro="One quote lists the trays, fittings, freight, delivery terms and the documents included, so the landed cost is known before the order." tone="muted">
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

      <PageSection id="evidence" title="Evidence and further reading" tone="muted">
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
        title="Request a CIF Jebel Ali or DAP UAE quote for FRP cable tray"
        quoteHref={quoteHref}
        text="Send the tray layout or cable schedule, widths, load class and delivery terms."
      />
    </>
  );
}
