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
import { coverFor, regionCovers } from "@/lib/covers";

const pageTitle = "FRP Passive House Windows — Germany Supplier";
const pageDescription =
  "Pultruded FRP (GFK) passive house windows for Germany: PHI certificate 2491wi03 (Uw 0.78, phB), CE documents per project, outside EU aluminum duties and CBAM.";
const pagePath = "/regions/frp-passive-house-windows-germany";

const cover = regionCovers[pagePath];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  image: "/regions/frp-passive-house-windows-germany/opengraph-image",
  path: pagePath,
});

const faqs = [
  {
    question: "Are FRP windows from China subject to EU anti-dumping duties or CBAM?",
    answer:
      "Not under current rules. The EU's anti-dumping duties on Chinese aluminum extrusions (Implementing Regulation (EU) 2021/546, 21.2–32.1%) apply to aluminum profiles, so aluminum window systems made from Chinese extrusions carry that cost. CBAM, in its definitive period since January 2026, charges for the embedded carbon of imported iron, steel and aluminum goods, including aluminum doors, windows and frames (CN 7610) and steel ones (CN 7308 30). Pultruded FRP fenestration is a glass-fiber composite, classified under HS 3925.20 or 7019 depending on the configuration, so it falls outside both. We confirm the treatment for the classification we use when we quote. Normal EU customs duty and Germany's 19% import VAT (Einfuhrumsatzsteuer) still apply and are itemized in the DDP Germany price.",
  },
  {
    question: "Which German and EU standards do F1 Composite FRP windows follow?",
    answer:
      "Windows placed on the EU market carry CE marking under EN 14351-1 with a declaration of performance. Type testing for air permeability, watertightness and wind-load resistance (classified to EN 12207, EN 12208 and EN 12210) is arranged per project at an accredited European laboratory such as ift Rosenheim. Thermal performance is calculated to EN ISO 10077. The published Passive House document is PHI component certificate 2491wi03 for the 90-series window (Uw 0.78 W/m²·K, phB class), issued by the Passive House Institute in Darmstadt.",
  },
  {
    question: "Do F1 FRP windows meet GEG, BEG funding and Passivhaus targets?",
    answer:
      "The certified 90-series configuration does. Its Uw of 0.78 W/m²·K (PHI 2491wi03, phB) is below the GEG reference window value of 1.3, the BEG threshold of 0.95 for replacement windows and the PHI criterion of 0.80 for the cool-temperate climate zone. The whole frame insulates (about 0.3 W/m·K, against 160 for aluminum), with no metal thermal break and no steel reinforcement as in uPVC frames. GEG compliance and BEG funding are assessed for the building or the measure, so confirm the Uw for your window sizes and glazing in the energy calculation.",
  },
  {
    question: "What are the lead times and shipping options to German sites?",
    answer:
      `Window projects take ${weeks(supplyTerms.fenestrationLeadTimeWeeks)} in production from an approved order, depending on the series, finish and quantity. Ocean transit takes about 30–35 days to Hamburg, Bremerhaven or Rotterdam. Inland sites such as Munich, Frankfurt, Berlin and the Ruhr are served DAP by truck or rail from the port of entry. The quote gives an estimated delivery date for your site. Samples and replacement parts can go by air freight at extra cost.`,
  },
  {
    question: "Can F1 supply EUR-priced, DDP quotes for German projects?",
    answer:
      "Yes. We quote DDP to your German site in EUR or USD, with EU customs duty and 19% import VAT itemized so your quantity surveyor sees the landed cost up front. We state the HS classification (3925.20 or 7019, depending on the configuration), our EU customs broker handles clearance, and supply-chain traceability documents ship with each order.",
  },
  {
    question: "Does F1 supply profiles to German window fabricators, or only finished windows?",
    answer:
      `Both. For Passivhaus and Effizienzhaus projects that want the glazing and gaskets fitted in the factory, we ship complete GFRP-PU window units, including tilt-and-turn (Dreh-Kipp) openings. For Germany's window-fabrication trade (Fensterbau), we supply the pultruded profile set (frame, sash, mullion, transom and glazing bead) with EPDM gaskets and fabrication drawings, so a German fabricator assembles locally. FengDu's production network has more than ${company.production.dieSets.toLocaleString("en-US")} existing dies on ${company.production.lines} lines across ${company.production.bases} bases, so many profiles need no new die. Frames can be powder coated with AAMA 2604 / 2605 systems in RAL colors.`,
  },
];

const standards = [
  { requirement: "CE marking", standard: "EN 14351-1 (windows and external doors)", provides: "Air, water and wind type testing per project", documents: "Test reports and declaration of performance on request" },
  { requirement: "Thermal calculation", standard: "EN ISO 10077, DIN 4108", provides: "Uw 0.78 W/m²·K (90-series, certified size)", documents: "Calculation on request" },
  { requirement: "Passive House thermal", standard: "PHI component certificate", provides: "Uw 0.78, certificate 2491wi03, phB", documents: "PHI certificate (published)" },
  { requirement: "GEG reference building", standard: "Reference window Uw 1.3", provides: "0.78 in the certified configuration", documents: "Project U-value calculation" },
  { requirement: "BEG window funding", standard: "Replacement windows Uw ≤ 0.95", provides: "0.78 in the certified configuration", documents: "U-value calculation on request" },
  { requirement: "Trade costs", standard: "EU anti-dumping duties (aluminum), CBAM (aluminum, steel)", provides: "FRP falls outside both under current rules", documents: "HS classification in the quote" },
  { requirement: "Architectural coating", standard: "AAMA 2604 / 2605", provides: "Powder coating in RAL colors", documents: "Coater report on request" },
];

const steps = [
  {
    title: "RFQ and DDP Germany quote",
    body: `Send a drawing or window schedule, the quantity and the delivery region. We reply within ${supplyTerms.responseTime}, then quote DDP in EUR or USD with EU duty and 19% import VAT itemized, the HS classification and an estimated delivery date.`,
  },
  {
    title: "Production and documents",
    body: `Window projects take ${weeks(supplyTerms.fenestrationLeadTimeWeeks)} in FengDu's production network. The document set includes PHI component certificate 2491wi03, plus EN ISO 10077 calculations, coating reports and CE type-test reports on request for your configuration.`,
  },
  {
    title: "Ocean freight and DDP delivery",
    body: "Ocean transit takes about 30–35 days to Hamburg, Bremerhaven or Rotterdam. Inland sites such as Munich, Frankfurt, Berlin and the Ruhr are served DAP by truck or rail from the port. The quote gives an estimated delivery date for your site.",
  },
];

const quoteHref = "/contact?source=region-frp-passive-house-windows-germany&inquiry_type=rfq";
const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

export default function GermanyRegionPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    about: {
      "@type": "Thing",
      name: "Pultruded FRP (GFK) passive house window frames for German Passivhaus, Effizienzhaus, and GEG projects",
    },
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />

      <PageHeader
        tag="Germany"
        title="FRP passive house windows for German projects"
        description="Pultruded fiberglass (GFK) window frames for Passivhaus, Effizienzhaus and GEG projects, with PHI certificate 2491wi03 (Uw 0.78, phB) from the Passive House Institute in Darmstadt. FRP frames fall outside the EU anti-dumping duties on Chinese aluminum and outside CBAM."
        figure={
          <Figure number={1} title="Passive house in Germany" note={cover.note} bleed>
            <div className="relative aspect-[16/10]">
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request a DDP Germany quote", href: quoteHref },
          secondary: { label: "See the standards", href: "#standards", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/regions" },
          { label: "Germany" },
        ]}
      />
      <PageNav items={[{ id: "why", label: "Why F1" }, { id: "standards", label: "Standards" }, { id: "logistics", label: "Logistics" }, { id: "faq", label: "FAQ" }, { id: "evidence", label: "Evidence" }]} />

      <PageSection id="why" title="Why FRP frames suit German energy targets" tone="white">
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              German energy law keeps raising the bar for windows. The GEG reference
              building assumes a window U<sub>w</sub> of 1.3 W/m²·K, BEG funding for
              replacement windows asks for U<sub>w</sub> ≤ 0.95, and Passivhaus and
              Effizienzhaus 40 projects usually aim below 0.80. Much of that is decided
              at the frame: thermally broken aluminum needs very high-performance glazing
              to get there, and larger uPVC sashes carry steel reinforcement that
              conducts heat.
            </p>
            <p>
              A pultruded FRP (GFK) frame conducts about 0.3 W/m·K of heat, against about
              160 for aluminum, so it needs no metal thermal break. In its certified
              configuration our 90-series window reaches U<sub>w</sub> 0.78 W/m²·K,
              confirmed by <strong>PHI component certificate 2491wi03</strong> (phB
              class) from the Passive House Institute in Darmstadt.
            </p>
          </div>
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              Trade costs are worth checking too. Chinese aluminum extrusions carry EU
              anti-dumping duties of 21.2–32.1% (Implementing Regulation (EU) 2021/546),
              and since January 2026 CBAM charges for the embedded carbon of imported
              aluminum and steel goods, including aluminum window frames. Pultruded FRP
              is a glass-fiber composite, so neither applies to it under current rules.
              Normal EU duty and 19% import VAT are itemized in the DDP price.
            </p>
            <p>
              German projects choose the supply model: complete factory-glazed window
              units, including tilt-and-turn (Dreh-Kipp) openings, or pultruded profile
              sets for a German window fabricator to assemble. Frames can be powder
              coated with AAMA 2604 / 2605 systems in RAL colors.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="standards" title="CE, GEG, BEG and Passive House documents" intro="What a German specification usually asks of the window, and the document we supply for each requirement." tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Requirement</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">German or EU standard</th>
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
            eyebrow="Free tool · Passivhaus preset"
            title="Check the U-value of a passive house window"
            sub="Opens the U-value calculator with a 90-series passive house build-up. Change the size and glazing, compare Uw with the GEG reference value, the BEG threshold and the PHI 0.80 criterion, then ask for a DDP Germany quote."
          />
        </div>
      </PageSection>

      <PageSection id="logistics" title="From FengDu's plants to your German site" intro="One quote covers the frames, freight, EU duty and import VAT, so the landed cost is known before the order." tone="white">
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
            <CoverCard href="/technology/polyurethane-pultrusion-windows" cover={coverFor("/technology/polyurethane-pultrusion-windows")!} label={<span className={mono}>Technology</span>} title="Polyurethane pultrusion windows" text="Why the PU resin in our window profiles allows thin walls and tough frames, and what PHI certificate 2491wi03 covers." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/technology/frp-vs-pvc-windows" cover={coverFor("/technology/frp-vs-pvc-windows")!} label={<span className={mono}>Comparison</span>} title="FRP vs PVC window frames" text="Why FRP frames need no steel reinforcement, and what that means for sash size and thermal bridges." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/case-studies/wanhua-yantai-zero-carbon-windows" cover={coverFor("/case-studies/wanhua-yantai-zero-carbon-windows")!} label={<span className={mono}>Case study</span>} title="Wanhua Yantai zero-carbon community" text="13,657 m² of 65- and 90-series GFRP-PU windows at Uw 0.99 W/m²·K, against a 1.0 requirement." sizes="(max-width: 767px) 94vw, 390px" />
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
              { href: "/resources/blog/frp-fenestration-passivhaus-certification", label: "How pultruded frames reach Passivhaus certification" },
              { href: "/resources/frp-windows-guide", label: "FRP windows buying guide" },
              { href: "/what-is-frp", label: "What is FRP? Material guide" },
            ],
          },
          {
            title: "Other markets",
            links: [
              { href: "/regions/grp-windows-uk", label: "GRP windows for the UK" },
              { href: "/regions/frp-passive-house-windows-canada", label: "FRP passive house windows: Canada" },
            ],
          },
        ]}
      />

      <InnerCTA
        title="Request a DDP Germany quote for FRP passive house windows"
        quoteHref={quoteHref}
        text="Send the window schedule or drawings, the Uw target and the delivery region."
        links={[{ label: "Window U-value calculator", href: "/technology/frp-u-value-calculator" }]}
      />
    </>
  );
}
