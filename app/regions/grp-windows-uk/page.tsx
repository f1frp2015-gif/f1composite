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
import { supplyTerms, weeks } from "@/content/data/company";
import { blogPostsBySlug } from "@/content/data/blogPosts";
import { blogCover, coverFor, regionCovers } from "@/lib/covers";

const pageTitle = "GRP Windows UK — Pultruded Fiberglass Frames Supplier";
const pageDescription =
  "Pultruded GRP (fiberglass) windows for UK projects: PHI certificate 2491wi03 (Uw 0.78), Part L and Passivhaus documents on request, and itemized DDP quotes.";
const pagePath = "/regions/grp-windows-uk";

const cover = regionCovers[pagePath];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "What are GRP windows, and are they the same as fiberglass or FRP windows?",
    answer:
      "Yes. GRP (glass-reinforced plastic, or glass-reinforced polymer) is the usual British term for what North America calls fiberglass or FRP. A GRP window frame is a pultruded profile of continuous glass fiber in a thermoset resin. It conducts about 0.3 W/m·K of heat, against 160 for aluminum, expands at a rate close to that of glass, needs no steel reinforcement and does not corrode. F1 Composite supplies GRP window and door systems in nine series from 50 to 140 mm frame depth, as profile sets for fabricators or as complete factory-glazed window units.",
  },
  {
    question: "Do GRP windows meet Approved Document Part L and the Future Homes Standard?",
    answer:
      "They can. Part L in England limits replacement windows in existing dwellings to a U-value of 1.4 W/m²·K and uses 1.2 for the notional new dwelling, and the Future Homes Standard tightens the envelope further. The 90-series holds PHI component certificate 2491wi03 at Uw 0.78 W/m²·K. For the other series the whole-window value depends on size and glazing, so check it in the U-value calculator or ask us for an EN ISO 10077 calculation. The GRP frame needs no metal thermal break and no steel stiffeners.",
  },
  {
    question: "Are GRP windows suitable for UK Passivhaus and EnerPHit projects?",
    answer:
      "Yes. F1's 90-series GFRP-PU frame holds PHI component certificate 2491wi03 at Uw 0.78 W/m²·K, below the 0.80 W/m²·K component criterion UK Passivhaus designers work to. Social housing and education lead UK Passivhaus work, and Scotland plans a Passivhaus-equivalent standard for new homes. The same 90-series system was supplied for Qinling Station in Antarctica; the certificate covers the cool-temperate climate zone, so extreme-cold sites need project-specific checks.",
  },
  {
    question: "What about CE marking, UKCA, and import duties for GRP windows into the UK?",
    answer:
      "Windows are construction products. EN 14351-1 type testing for air permeability, watertightness and wind resistance supports the declaration of performance, and CE or UKCA documents for the supplied configuration are provided on request; confirm which marking your project needs. GRP is a glass-fiber composite classified under HS 3925.20 or 7019, so it falls outside the trade remedies on aluminum extrusions and outside the UK CBAM planned from 2027, which covers iron, steel and aluminum among other goods. UK customs duty and 20% import VAT still apply and are itemized in the DDP quote.",
  },
  {
    question: "What are lead times and shipping options to UK sites?",
    answer:
      `Window projects take ${weeks(supplyTerms.fenestrationLeadTimeWeeks)} in production from an approved order, depending on the series, finish and quantity. Ocean transit takes about 30–38 days to Felixstowe, Southampton or London Gateway, with road delivery from the port to London, the Midlands, the North and Scotland. The quote gives an estimated delivery date for your site. Samples can go by air freight at extra cost.`,
  },
  {
    question: "Does F1 supply GRP profiles to UK window fabricators, or only finished windows?",
    answer:
      "Both. For Passivhaus and other performance-driven projects, we ship complete GRP window units, assembled, glazed and gasketed in the factory, including tilt-and-turn openings. For UK fabricators, we supply pultruded profile sets with EPDM gaskets, corner kits and fabrication drawings for local assembly. AAMA 2604 or 2605 powder coatings are available in RAL colors, including the anthracite and other dark tones UK architects specify. GRP is a thermoset, so dark finishes do not soften the frame in strong sun as they can with uPVC.",
  },
];

const standards = [
  { requirement: "Replacement windows", standard: "Part L: Uw ≤ 1.4 W/m²·K", provides: "Series and glazing chosen for the target", documents: "U-value calculation on request" },
  { requirement: "New dwellings", standard: "Part L notional dwelling: Uw 1.2", provides: "Series and glazing chosen for the target", documents: "EN ISO 10077 calculation on request" },
  { requirement: "Passivhaus / EnerPHit", standard: "PHI component criterion: Uw ≤ 0.80", provides: "90-series: 0.78, certificate 2491wi03", documents: "PHI certificate (published)" },
  { requirement: "Type testing", standard: "EN 14351-1 (air, water, wind)", provides: "Type testing per project", documents: "Test reports and declaration of performance on request" },
  { requirement: "Product marking", standard: "CE or UKCA", provides: "Documents for the supplied configuration", documents: "CE / UKCA documents on request" },
  { requirement: "Trade costs", standard: "UK CBAM from 2027: iron, steel, aluminum", provides: "GRP falls outside its scope", documents: "HS classification in the quote" },
  { requirement: "Architectural finish", standard: "AAMA 2604 / 2605", provides: "Powder coating in RAL colors, including anthracite", documents: "Coater report on request" },
];

const steps = [
  {
    title: "RFQ and DDP UK quote",
    body: `Send a drawing or window schedule, the quantity and the delivery region. We reply within ${supplyTerms.responseTime}, then quote DDP in GBP or USD with UK duty and 20% import VAT itemized, the HS classification and an estimated delivery date.`,
  },
  {
    title: "Production and documents",
    body: `Window projects take ${weeks(supplyTerms.fenestrationLeadTimeWeeks)} in FengDu's production network. The document set includes PHI component certificate 2491wi03, plus EN ISO 10077 calculations, coating reports and EN 14351-1 type-test reports on request for your configuration.`,
  },
  {
    title: "Ocean freight and DDP delivery",
    body: "Ocean transit takes about 30–38 days to Felixstowe, Southampton or London Gateway. Sites in London, the Midlands, the North and Scotland are served by road from the port. The quote gives an estimated delivery date for your site.",
  },
];

const quoteHref = "/contact?source=region-grp-windows-uk&inquiry_type=rfq";
const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

export default function UkRegionPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    about: {
      "@type": "Thing",
      name: "Pultruded GRP (glass reinforced plastic) window frames for UK Part L, Passivhaus, and EnerPHit projects",
    },
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />

      <PageHeader
        tag="United Kingdom"
        title="GRP windows for UK projects"
        description="Pultruded GRP (fiberglass) window frames and complete window units for Part L, Passivhaus and EnerPHit projects, with PHI certificate 2491wi03 (Uw 0.78 W/m²·K), no metal thermal break or steel stiffeners, and DDP quotes that itemize UK duty and VAT."
        figure={
          <Figure number={1} title="Dark window frames on a facade" note={cover.note} bleed>
            <div className="relative aspect-[16/10]">
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request a DDP UK quote", href: quoteHref },
          secondary: { label: "See the standards", href: "#standards", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/regions" },
          { label: "United Kingdom" },
        ]}
      />
      <PageNav items={[{ id: "why", label: "Why F1" }, { id: "standards", label: "Standards" }, { id: "logistics", label: "Logistics" }, { id: "faq", label: "FAQ" }, { id: "evidence", label: "Evidence" }]} />

      <PageSection id="why" title="Why GRP frames suit UK energy targets" tone="white">
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              UK window specification is being squeezed from two sides. Part L in
              England limits replacement windows to a U-value of 1.4 W/m²·K and uses 1.2
              for the notional new dwelling, and the Future Homes Standard tightens the
              envelope further. Passivhaus and EnerPHit projects, common in social
              housing and education, work to the PHI component criterion of 0.80.
            </p>
            <p>
              Aluminum reaches those numbers only with elaborate thermal-break
              assemblies, and uPVC sashes carry steel stiffeners that conduct heat. GRP,
              the British term for pultruded fiberglass, conducts about 0.3 W/m·K against
              160 for aluminum and needs neither. Our 90-series window is certified at
              U<sub>w</sub> 0.78 W/m²·K (<strong>PHI component certificate
              2491wi03</strong>, phB class).
            </p>
          </div>
          <div className="space-y-[20px] text-f16 leading-golden text-t2">
            <p>
              The import sums differ for GRP too. It is a glass-fiber composite (HS
              3925.20 or 7019), outside the trade remedies on aluminum extrusions and
              outside the UK CBAM planned from 2027 for iron, steel and aluminum. UK
              customs duty and 20% import VAT are itemized in the DDP quote, so your
              quantity surveyor sees the landed cost before ordering.
            </p>
            <p>
              UK projects choose the supply model: complete factory-glazed GRP window
              units, or the pultruded profile set (frame, sash, mullion, transom and
              glazing bead with EPDM gaskets) for a UK fabricator to assemble. GRP is a
              thermoset, so anthracite and other dark RAL finishes do not soften the
              frame in strong sun as they can with uPVC.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="standards" title="Part L, Passivhaus and EN 14351-1 documents" intro="What a UK specification usually asks of the window, and the document we supply for each requirement." tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Requirement</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">UK standard or threshold</th>
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
            title="Check the U-value of a GRP window"
            sub="Opens the U-value calculator with a 90-series passive house build-up. Change the series, size and glazing, compare Uw with Part L (1.4 and 1.2) and the PHI 0.80 criterion, then ask for a DDP UK quote."
          />
        </div>
      </PageSection>

      <PageSection id="logistics" title="From FengDu's plants to your UK site" intro="One quote covers the frames, freight, UK duty and import VAT, so the landed cost is known before the order." tone="white">
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
            <CoverCard href="/resources/blog/frp-fenestration-passivhaus-certification" cover={blogCover(blogPostsBySlug["frp-fenestration-passivhaus-certification"])} label={<span className={mono}>Article</span>} title="How pultruded frames reach Passivhaus certification" text="What PHI component certificate 2491wi03 covers, and how to specify it on a UK project." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/technology/frp-vs-pvc-windows" cover={coverFor("/technology/frp-vs-pvc-windows")!} label={<span className={mono}>Comparison</span>} title="FRP vs PVC window frames" text="Why GRP frames need no steel reinforcement: larger sashes, dark colors and no hidden thermal bridge." sizes="(max-width: 767px) 94vw, 390px" />
          </li>
          <li>
            <CoverCard href="/case-studies/qinling-station-antarctic-passive-windows" cover={coverFor("/case-studies/qinling-station-antarctic-passive-windows")!} label={<span className={mono}>Case study</span>} title="Qinling Station, Antarctica" text="The certified 90-series system at a Ross Sea research station, against a −60 °C design low." sizes="(max-width: 767px) 94vw, 390px" />
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
              { href: "/products/window-door-profiles", label: "GRP window profiles for fabricators" },
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
              { href: "/technology/polyurethane-pultrusion-windows", label: "Polyurethane pultrusion windows" },
              { href: "/resources/frp-windows-guide", label: "FRP windows buying guide" },
            ],
          },
          {
            title: "Other markets",
            links: [
              { href: "/regions/frp-passive-house-windows-germany", label: "FRP passive house windows: Germany" },
              { href: "/regions/frp-passive-house-windows-canada", label: "FRP passive house windows: Canada" },
            ],
          },
        ]}
      />

      <InnerCTA
        title="Request a DDP quote for GRP windows delivered to a UK site"
        quoteHref={quoteHref}
        text="Send the window schedule or drawings, the U-value target and the delivery region."
        links={[{ label: "Window U-value calculator", href: "/technology/frp-u-value-calculator" }]}
      />
    </>
  );
}
