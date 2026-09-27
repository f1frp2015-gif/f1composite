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
import { company, supplyTerms, usdRange, weeks } from "@/content/data/company";
import { blogPostsBySlug } from "@/content/data/blogPosts";
import { blogCover, regionCovers } from "@/lib/covers";

const pageTitle = "FRP Pultrusion Supplier USA — ASTM-Compliant Profiles";
const pageDescription =
  "Pultruded FRP profiles for USA projects: ASTM test methods, US duties itemized in every DDP quote, and engineering support from F1 Composite.";
const pagePath = "/regions/frp-pultrusion-supplier-usa";

const cover = regionCovers[pagePath];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const dies = company.production.dieSets.toLocaleString("en-US");

const faqs = [
  {
    question: "How does F1 Composite handle Section 301 tariffs on FRP from China?",
    answer:
      "Every DDP USA quote itemizes the US duties that apply at the time of shipment, including Section 301 duties on goods from China, so the landed cost has no hidden customs charge. We state the HTSUS classification we use (usually 3926.90 or 7019, depending on the product), and our customs broker handles clearance. If your project needs duty planning, raise it at the RFQ stage; the country of origin for F1 profiles is China.",
  },
  {
    question: "Which US standards are F1 Composite FRP profiles tested to?",
    answer:
      "Mechanical and dimensional QA uses ASTM D638 (tensile), D790 (flexural), D2344 (short-beam shear) and D3917 (dimensional tolerance). Fire test reports (ASTM E84, ASTM D635) for fire-retardant formulations and coating reports (AAMA 2604 / 2605) for finished sections are provided on request with the report number and scope, so you can match them to the exact product. For windows, the 90-series frame holds Passive House Institute (PHI) component certificate 2491wi03 (Uw 0.78 W/m²·K, phB class). Phius runs its own certification, so for a Phius project we supply the PHI certificate and frame data for your energy model. For federally funded projects under Buy America rules, see the next question.",
  },
  {
    question: "Can I use F1 Composite FRP on Buy America Act / BABA federal projects?",
    answer:
      "Not directly on federally funded BABA projects that require US-manufactured content: F1 profiles are made in China. A US fabricator may be able to process F1 profiles into a finished assembly under its own domestic manufacturing; confirm eligibility with the funding agency before you specify. Private EPC work and most commercial and industrial projects without federal funding have no such restriction. State and local projects can carry their own domestic-content rules, so check the contract.",
  },
  {
    question: "What are the lead times and shipping options to US ports?",
    answer:
      `Production takes ${weeks(supplyTerms.catalogLeadTimeWeeks)} for catalog sections, ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)} for variants on an existing die and ${weeks(supplyTerms.newDieLeadTimeWeeks)} with a new die. Ocean transit adds about 16–22 days to Los Angeles or Long Beach and 28–32 days to New York, Savannah or Houston. The quote gives an estimated delivery date for your site. Samples and replacement parts can go by air freight at extra cost.`,
  },
  {
    question: "What is the MOQ for custom pultrusion in the US market?",
    answer:
      `The minimum first run is ${supplyTerms.customMoqMeters.firstRun} linear meters, and repeat orders start at ${supplyTerms.customMoqMeters.repeat} meters. A new die takes ${weeks(supplyTerms.dieManufactureWeeks)} to make and costs from ${usdRange(supplyTerms.dieCostUsd.singleCavity)} for a small single-cavity die to ${usdRange(supplyTerms.dieCostUsd.largeOrMultiCavity)} for a large or multi-cavity one. It is a one-time cost, and we keep the die for repeat orders. For samples and validation orders under ${supplyTerms.customMoqMeters.repeat} meters, we ship an existing standard section or a close match from the existing dies. Send us your drawing: if it matches an existing die, a shorter validation run may be possible.`,
  },
  {
    question: "How does F1's FRP compare to Strongwell, Creative Pultrusions, and Bedford Reinforced?",
    answer:
      `The resin options are comparable: isophthalic polyester, vinyl ester, fire-retardant grades and phenolic. The main practical difference is tooling. FengDu's production network has more than ${dies} existing dies, so many engineered profiles do not need a new die. On price, send us your section list and quantities and we will quote DDP to your site, so you can compare landed cost with your current supplier line by line. For ASCE/SEI 74-23 design data, ask for the section properties and test reports for the profiles you plan to use.`,
  },
];

const standards = [
  { requirement: "Surface burning, interior", standard: "ASTM E84 (flame spread index ≤ 25 for Class A)", provides: "Fire-retardant formulations", documents: "Test report on request" },
  { requirement: "Window thermal", standard: "PHI component certificate", provides: "Uw 0.78, certificate 2491wi03", documents: "PHI certificate (published)" },
  { requirement: "Architectural coating", standard: "AAMA 2604", provides: "Powder coating on finished sections", documents: "Coater report on request" },
  { requirement: "High-performance coating", standard: "AAMA 2605", provides: "AAMA 2605 coating on finished sections", documents: "Coater report on request" },
  { requirement: "Tensile and flexural properties", standard: "ASTM D638 / D790", provides: "Batch testing", documents: "Batch test certificate" },
  { requirement: "Dimensional tolerance", standard: "ASTM D3917", provides: "Dimensional checks per order", documents: "Dimensional report" },
  { requirement: "Bridge and vehicle decks", standard: "AASHTO load classes", provides: "Pultruded deck plank options", documents: "Project calculation on request" },
];

const steps = [
  {
    title: "RFQ and DDP USA quote",
    body: `Send a drawing or section list, the quantity and the delivery state. We reply within ${supplyTerms.responseTime}, then quote DDP to your site with US duties itemized, the HTSUS classification and an estimated delivery date.`,
  },
  {
    title: "Production and documents",
    body: `Catalog sections take ${weeks(supplyTerms.catalogLeadTimeWeeks)} and variants on an existing die ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)}, in FengDu's production network. Each batch ships with a mill test certificate. Coating reports for finished sections and third-party fire reports are provided on request.`,
  },
  {
    title: "Ocean freight and DDP delivery",
    body: "Ocean transit takes about 16–22 days to Los Angeles or Long Beach and 28–32 days to New York, Savannah or Houston. Inland sites are served by rail or truck from the port. The quote gives an estimated delivery date for your site.",
  },
];

const quoteHref = "/contact?source=region-frp-pultrusion-supplier-usa&inquiry_type=rfq";
const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

export default function UsaRegionPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    about: {
      "@type": "Thing",
      name: "FRP pultrusion supply for United States infrastructure, energy, and Passive House projects",
    },
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />

      <PageHeader
        tag="United States"
        title="FRP pultrusion supplier for USA projects"
        description="Custom and standard pultruded FRP profiles, grating and PHI-certified window frames from F1 Composite, with ASTM test documentation and US duties itemized in every DDP quote."
        figure={
          <Figure number={1} title="Finished profiles on the plant floor" note={cover.note} bleed>
            <div className="relative aspect-[16/10]">
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request a DDP USA quote", href: quoteHref },
          secondary: { label: "See the standards", href: "#standards", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/regions" },
          { label: "United States" },
        ]}
      />
      <PageNav items={[{ id: "why", label: "Why F1" }, { id: "standards", label: "Standards" }, { id: "logistics", label: "Logistics" }, { id: "faq", label: "FAQ" }, { id: "evidence", label: "Evidence" }]} />

      <PageSection id="why" title="Duties, Buy America and traceability, answered up front" tone="white">
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              Buying FRP from China raises three questions for US specifiers and EPC
              buyers: what the duties add to the price, whether the project falls under
              Buy America / BABA rules, and what supply-chain documents customs will ask
              for under UFLPA. Duties, including Section 301, are itemized in every DDP
              quote. BABA-covered work needs a US manufacturing step, so we do not supply
              it directly. Supply-chain traceability documents are prepared with each
              shipment.
            </p>
            <p>
              The rest is the usual engineering work: fire-retardant formulations with
              ASTM E84 reports on request, AAMA 2604 / 2605 coatings for architectural
              sections, low-conductivity window frames, and custom sections that can
              often use one of more than {dies} existing dies. Send a section list and we
              will quote DDP, so you can compare landed cost with your current supplier.
            </p>
          </div>
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              F1 Composite is the export company of FengDu New Material. FengDu runs{" "}
              {company.production.bases} production bases with {company.production.lines}{" "}
              pultrusion lines and about {company.production.annualTonnes.toLocaleString("en-US")}{" "}
              tonnes a year of capacity. F1 handles engineering support, contracts,
              documents and delivery for US buyers.
            </p>
            <p>
              For Passive House projects, our 90-series GFRP-PU window frame holds Passive
              House Institute <strong>component certificate 2491wi03</strong> (U<sub>w</sub>{" "}
              0.78 W/m²·K, phB class). Phius runs its own certification, so for a Phius
              project we provide the PHI certificate and frame values for your energy
              model. Frames can be powder coated in RAL colors with AAMA 2604 / 2605
              systems.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="standards" title="ASTM, AAMA and Passive House documents" intro="What a US specification usually asks of the profiles, and the document we supply for each requirement." tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Requirement</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">US standard</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">What F1 provides</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Documentation</th>
              </tr>
            </thead>
            <tbody>
              {standards.map((row) => (
                <tr key={row.requirement} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.requirement}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.standard}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.provides}</td>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{row.documents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="logistics" title="From FengDu's plants to your US site" intro="One DDP quote covers the profiles, freight and US duties, including Section 301, so the landed cost is known before the order." tone="white">
        <ol className="grid gap-[12px] lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <p className={mono}>Step {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{step.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={faqs} />
      </PageSection>

      <PageSection id="evidence" title="Evidence and further reading" tone="white">
        <ul className="grid gap-[12px] md:grid-cols-3">
          <li>
            <CoverCard href="/resources/blog/how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide" cover={blogCover(blogPostsBySlug["how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide"])} label={<span className={mono}>Article</span>} title="Sourcing FRP profiles from China: a US buyer's guide" text="Section 301, UFLPA documents and trade-remedy checks, and how to compare landed cost." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/resources/blog/frp-fire-resistance-ratings-guide" cover={blogCover(blogPostsBySlug["frp-fire-resistance-ratings-guide"])} label={<span className={mono}>Article</span>} title="FRP fire ratings and ASTM E84" text="How resin chemistry and additives affect flame spread, and what a Class A report covers." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/resources/blog/frp-fenestration-passivhaus-certification" cover={blogCover(blogPostsBySlug["frp-fenestration-passivhaus-certification"])} label={<span className={mono}>Article</span>} title="How pultruded frames reach Passivhaus certification" text="What PHI component certificate 2491wi03 covers, and how to use it on a US project." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
        </ul>
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          {
            title: "Products",
            links: [
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions" },
              { href: "/products/fiberglass-structural-shapes", label: "Standard FRP structural profiles" },
              { href: "/products/frp-gratings", label: "Pultruded FRP gratings" },
              { href: "/products/frp-window-frames", label: "FRP window and door systems, 50–140 mm" },
            ],
          },
          {
            title: "Tools",
            links: [
              { href: "/frp-profile-calculator", label: "FRP profile calculator" },
              { href: "/ai/passive-house", label: "Passive house window selector" },
              { href: "/technology/frp-u-value-calculator", label: "Window U-value calculator" },
            ],
          },
          {
            title: "Guides",
            links: [
              { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "FOB and DDP export guide" },
              { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum window frames" },
            ],
          },
          {
            title: "Other markets",
            links: [
              { href: "/regions/frp-passive-house-windows-canada", label: "FRP passive house windows: Canada" },
            ],
          },
        ]}
      />

      <InnerCTA
        title="Request a DDP USA quote with duties itemized"
        quoteHref={quoteHref}
        text="Send the section list or drawings, quantities and the delivery state."
        links={[{ label: "FRP profile calculator", href: "/frp-profile-calculator" }]}
      />
    </>
  );
}
