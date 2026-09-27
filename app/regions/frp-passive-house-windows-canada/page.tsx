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
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { company, supplyTerms, weeks } from "@/content/data/company";
import { blogPostsBySlug } from "@/content/data/blogPosts";
import { blogCover, coverFor, regionCovers } from "@/lib/covers";

const pageTitle = "FRP Passive House Windows — Canada Supplier";
const pageDescription =
  "Pultruded FRP passive house windows for Canada: PHI certificate 2491wi03 (Uw 0.78), NAFS and CSA A440 reports on request, DDP quotes with duties itemized.";
const pagePath = "/regions/frp-passive-house-windows-canada";

const cover = regionCovers[pagePath];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  image: "/regions/frp-passive-house-windows-canada/opengraph-image",
  path: pagePath,
});

const faqs = [
  {
    question: "Are FRP windows from China subject to Canada's 25% surtax?",
    answer:
      "Canada's surtaxes on Chinese-origin goods in this area target steel and aluminum products, including steel-framed doors and windows. Pultruded FRP frames are a glass-fiber composite, not steel or aluminum, so those orders are not written for them. Surtax rules change, so we confirm the current treatment for the HS classification we use (usually 3926.90 or 7019) when we quote. The normal MFN duty and 5% GST are itemized in the DDP Canada price.",
  },
  {
    question: "Which Canadian standards are F1 Composite FRP windows tested to?",
    answer:
      "Window test reports to NAFS (AAMA/WDMA/CSA 101/I.S.2/A440 with the Canadian supplement CSA A440S1) and thermal simulations to CSA A440.2 / NFRC 100 are provided on request for the configuration you specify. The published thermal document is Passive House Institute (PHI) component certificate 2491wi03 for the 90-series window: Uw 0.78 W/m²·K (U-factor about 0.14 Btu/h·ft²·°F), phB class, for the tested size and glazing. Phius and Passive House Canada projects use it as input data for their own energy models.",
  },
  {
    question: "Do F1 FRP windows meet the BC Energy Step Code and Toronto Green Standard?",
    answer:
      "The certified 90-series configuration is well inside the window targets of the upper BC Energy Step Code steps, which call for U-factors well below 0.22 Btu/h·ft²·°F (about 1.25 W/m²·K): its Uw is 0.78 W/m²·K (U-factor about 0.14). The frame itself conducts little heat (about 0.3 W/m·K) and has no aluminum thermal break. Step Code and Toronto Green Standard compliance is assessed for the whole building, so confirm the U-factor for your window sizes and glazing in the energy model.",
  },
  {
    question: "What are the lead times and shipping options to Canadian ports?",
    answer:
      `Window projects take ${weeks(supplyTerms.fenestrationLeadTimeWeeks)} in production from an approved order, depending on the series, finish and quantity. Ocean transit takes about 14–20 days to Vancouver or Prince Rupert and 26–32 days to Montreal or Halifax. Inland sites such as Calgary, Toronto and Ottawa are served DAP by rail or truck from the port of entry. The quote gives an estimated delivery date for your site. Samples and replacement parts can go by air freight at extra cost.`,
  },
  {
    question: "Can F1 supply CAD-priced, DDP quotes for Canadian projects?",
    answer:
      "Yes. We quote DDP to your Canadian site in CAD or USD, with MFN customs duty and 5% GST itemized so your quantity surveyor sees the landed cost up front. We state the HS classification (usually 3926.90 or 7019), our Canadian customs broker handles clearance, and supply-chain traceability documents ship with each order. Provincial PST/HST handling is confirmed for the delivery province when the purchase order is placed.",
  },
  {
    question: "How does F1's FRP compare to Cascadia, Inline, and Innotech fiberglass frames?",
    answer:
      `North American fiberglass-frame makers also build low-conductivity frames without a thermal break, so compare certified values for the same window size and glazing. What F1 adds is a published PHI component certificate for the 90 series (Uw 0.78 W/m²·K), AAMA 2604 / 2605 powder coating in RAL colors, and a large tooling base: FengDu's production network has more than ${company.production.dieSets.toLocaleString("en-US")} existing dies across ${company.production.lines} pultrusion lines, so many fenestration profiles need no new die. If you work with a Canadian fabricator, we supply the profiles for their assembly.`,
  },
];

const standards = [
  { requirement: "Window performance", standard: "NAFS (CSA 101/I.S.2/A440) with A440S1", provides: "Air, water, wind and forced-entry testing", documents: "Test report on request" },
  { requirement: "Thermal simulation", standard: "CSA A440.2 / A440.3, NFRC 100", provides: "U-factor 0.14 (Uw 0.78 W/m²·K, certified size)", documents: "Simulation on request" },
  { requirement: "Passive House thermal", standard: "PHI component certificate", provides: "Uw 0.78, certificate 2491wi03, phB", documents: "PHI certificate (published)" },
  { requirement: "Step Code envelope", standard: "BC Energy Step Code 4–5", provides: "Window U-factor well below upper-step targets", documents: "Project U-value calculation" },
  { requirement: "Municipal green standard", standard: "Toronto Green Standard Tiers 2–4", provides: "Window input for the envelope model", documents: "U-value calculation on request" },
  { requirement: "Architectural coating", standard: "AAMA 2604 / 2605", provides: "Powder coating in RAL colors", documents: "Coater report on request" },
  { requirement: "Traceability", standard: "Import records", provides: "Made in FengDu's production network", documents: "Traceability documents" },
];

const steps = [
  {
    title: "RFQ and DDP Canada quote",
    body: `Send a drawing or window schedule, the quantity and the delivery province. We reply within ${supplyTerms.responseTime}, then quote DDP in CAD or USD with MFN duty and 5% GST itemized, the HS classification and an estimated delivery date.`,
  },
  {
    title: "Production and documents",
    body: `Window projects take ${weeks(supplyTerms.fenestrationLeadTimeWeeks)} in FengDu's production network. The document set includes PHI component certificate 2491wi03, plus NAFS test reports, coating reports and CSA A440.2 / NFRC simulations on request for your configuration.`,
  },
  {
    title: "Ocean freight and DDP delivery",
    body: "Ocean transit takes about 14–20 days to Vancouver or Prince Rupert and 26–32 days to Montreal or Halifax. Inland sites such as Calgary, Toronto and Ottawa are served DAP by rail or truck from the port. The quote gives an estimated delivery date for your site.",
  },
];

const quoteHref = "/contact?source=region-frp-passive-house-windows-canada&inquiry_type=rfq";
const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

export default function CanadaRegionPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    about: {
      "@type": "Thing",
      name: "Pultruded FRP passive house window frames for Canadian Passive House, net-zero, and step-code projects",
    },
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />

      <PageHeader
        tag="Canada"
        title="FRP passive house windows for Canadian projects"
        description="Pultruded fiberglass window frames for Canada's Passive House, net-zero and Step Code buildings, with PHI certificate 2491wi03 (Uw 0.78) and NAFS / CSA A440 reports on request."
        figure={
          <Figure number={1} title="Winter in Canada" note={cover.note} bleed>
            <div className="relative aspect-[16/10]">
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request a DDP Canada quote", href: quoteHref },
          secondary: { label: "See the standards", href: "#standards", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/regions" },
          { label: "Canada" },
        ]}
      />
      <PageNav items={[{ id: "why", label: "Why F1" }, { id: "standards", label: "Standards" }, { id: "logistics", label: "Logistics" }, { id: "faq", label: "FAQ" }, { id: "evidence", label: "Evidence" }]} />

      <PageSection id="why" title="Why FRP frames suit Canada's energy codes" tone="white">
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              Canadian building codes are moving toward net-zero energy ready
              construction, which British Columbia aims to require by 2032. The BC Energy
              Step Code, the Toronto Green Standard and the tiered energy paths in the
              national codes set the steps, and a growing number of projects follow Phius
              or Passive House Canada. The window is often the limiting element:
              thermally broken aluminum needs very high-performance glazing to reach the
              U-factors of the upper steps.
            </p>
            <p>
              A pultruded FRP frame conducts about 0.3 W/m·K of heat, against about 160
              for aluminum, so it needs no metal thermal break. In its certified
              configuration our 90-series window reaches U<sub>w</sub> 0.78 W/m²·K
              (U-factor about 0.14 Btu/h·ft²·°F), confirmed by <strong>PHI component
              certificate 2491wi03</strong> (phB class).
            </p>
          </div>
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              Tariffs matter too. Canada&rsquo;s surtaxes on Chinese-origin goods in this
              area are aimed at steel and aluminum products, including steel-framed doors
              and windows. Pultruded FRP is a glass-fiber composite, so those orders are
              not written for it. We confirm the current treatment for our HS
              classification in every quote, and MFN duty and 5% GST are itemized in the
              DDP price.
            </p>
            <p>
              Phius and Passive House Canada projects can use the PHI certificate values
              in their own energy models. Frames can be powder coated with AAMA 2604 /
              2605 systems in RAL colors, and we supply complete windows or profile sets
              for a Canadian fabricator to assemble.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="standards" title="NAFS, CSA A440 and Passive House documents" intro="What a Canadian specification usually asks of the window, and the document we supply for each requirement." tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Requirement</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Canadian standard</th>
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

        <div className="mt-[16px]">
          <CalculatorCTA
            href="/technology/frp-u-value-calculator#frame=frp-90&glass=tg-kr&spacer=warm-premium&type=casement&w=1200&h=1400"
            eyebrow="Free tool · Passive house preset"
            title="Check the U-value of a passive house window"
            sub="Opens the U-value calculator with a 90-series passive house build-up. Change the size and glazing, compare Uw with your energy model target, then ask for a DDP Canada quote with duties itemized."
          />
        </div>
      </PageSection>

      <PageSection id="logistics" title="From FengDu's plants to your Canadian site" intro="One quote covers the frames, freight, duty and GST, so the landed cost is known before the order." tone="white">
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
            <CoverCard href="/resources/blog/frp-fenestration-passivhaus-certification" cover={blogCover(blogPostsBySlug["frp-fenestration-passivhaus-certification"])} label={<span className={mono}>Article</span>} title="How pultruded frames reach Passivhaus certification" text="What PHI component certificate 2491wi03 covers, and how to use its values on a Canadian project." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/technology/frp-vs-aluminum-windows" cover={coverFor("/technology/frp-vs-aluminum-windows")!} label={<span className={mono}>Comparison</span>} title="FRP vs aluminum window frames" text="Frame conductivity, U-factor and condensation risk, property by property." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/case-studies/qinling-station-antarctic-passive-windows" cover={coverFor("/case-studies/qinling-station-antarctic-passive-windows")!} label={<span className={mono}>Case study</span>} title="Qinling Station, Antarctica" text="GFRP windows for a Ross Sea research station. The PHI certificate covers a cool-temperate configuration, so confirm cold-climate requirements separately." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
        </ul>
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          {
            title: "Products",
            links: [
              { href: "/products/frp-window-frames", label: "FRP window and door systems, 50–140 mm" },
              { href: "/products/window-door-profiles", label: "Window profiles for local fabricators" },
            ],
          },
          {
            title: "Tools",
            links: [
              { href: "/ai/passive-house", label: "Free passive house window selector" },
              { href: "/technology/frp-u-value-calculator", label: "Window U-value calculator" },
            ],
          },
          {
            title: "Guides",
            links: [
              { href: "/resources/frp-windows-guide", label: "FRP windows buying guide" },
              { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "FOB and DDP export guide" },
              { href: "/what-is-frp", label: "What is FRP? Material guide" },
            ],
          },
          {
            title: "Other markets",
            links: [
              { href: "/regions/frp-pultrusion-supplier-usa", label: "Sourcing FRP for US projects" },
              { href: "/regions/frp-passive-house-windows-germany", label: "FRP passive house windows: Germany" },
            ],
          },
        ]}
      />

      <InnerCTA
        title="Request a DDP Canada quote for FRP passive house windows"
        quoteHref={quoteHref}
        text="Send the window schedule or drawings, the glazing target and the delivery province."
        links={[{ label: "Window U-value calculator", href: "/technology/frp-u-value-calculator" }]}
      />
    </>
  );
}
