import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "FRP Pultrusion Supplier USA — ASTM-Compliant Profiles";
const pageDescription =
  "Pultruded FRP profiles for USA projects: ASTM test methods, US duties itemized in every DDP quote, and engineering support from F1 Composite.";
const pagePath = "/regions/frp-pultrusion-supplier-usa";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "How does F1 Composite handle Section 301 tariffs on FRP from China?",
    answer:
      "Every DDP USA quote itemizes the US duties that apply at the time of shipment, including Section 301 duties on goods from China, so the landed cost has no hidden customs charge. We state the HTSUS classification we use (usually 3926.90 or 7019, depending on the product), and our customs broker handles clearance. If your project needs duty planning, raise it at the RFQ stage; the country of origin for F1 profiles is China.",
  },
  {
    question: "Which US standards are F1 Composite FRP profiles tested to?",
    answer:
      "Mechanical and dimensional QA uses ASTM D638 (tensile), D790 (flexural), D2344 (short-beam shear) and D3917 (dimensional tolerance). Fire test reports (ASTM E84, ASTM D635) for fire-retardant formulations and coating reports (AAMA 2604 / 2605) for finished sections are provided on request with the report number and scope, so you can match them to the exact product. For windows, the 90-series frame holds Passive House Institute (PHI) component certificate 2491wi03 (Uw 0.78 W/m²·K, phB class). PHIUS runs its own certification, so for a PHIUS project we supply the PHI certificate and frame data for your energy model. For Davis-Bacon, federal or BABA-restricted projects, see the next question.",
  },
  {
    question: "Can I use F1 Composite FRP on Buy America Act / BABA federal projects?",
    answer:
      "Not directly on federally funded BABA projects that require US-manufactured content: F1 profiles are made in China. A US fabricator may be able to process F1 profiles into a finished assembly under its own domestic manufacturing; confirm eligibility with the funding agency before you specify. State DOT projects, private EPC work and most commercial and industrial projects outside federal grants have no such restriction.",
  },
  {
    question: "What are the lead times and shipping options to US ports?",
    answer:
      "Production takes 2–4 weeks for catalog sections and 4–6 weeks for variants on an existing die. Sea freight adds about 16–22 days to Los Angeles or Long Beach and 28–32 days to New York, Savannah or Houston, so purchase order to jobsite is typically 8–12 weeks DDP. Urgent samples or replacement parts can go by air from Shanghai to a major US hub at extra cost.",
  },
  {
    question: "What is the MOQ for custom pultrusion in the US market?",
    answer:
      "The minimum first run is 500 linear meters, and repeat orders start at 200 meters. Tooling takes 4–8 weeks and costs $3,000–$15,000, depending on the complexity of the cross-section. This is a one-time cost because we retain the tooling for repeat orders. For samples and validation orders under 200 meters, we ship an existing standard section or use similar tooling already in our inventory. Send us your drawing; if it matches an existing tool, the minimum first validation run drops to 50–100 meters.",
  },
  {
    question: "How does F1's FRP compare to Strongwell, Creative Pultrusions, and Bedford Reinforced?",
    answer:
      "The resin options are comparable: isophthalic polyester, vinyl ester, fire-retardant grades and phenolic. The main practical difference is tooling. FengDu's production network has more than 1,000 existing dies, so many engineered profiles do not need a new die. On price, send us your section list and quantities and we will quote DDP to your site, so you can compare landed cost with your current supplier line by line. For ASCE/SEI 74-23 design data, ask for the section properties and test reports for the profiles you plan to use.",
  },
];

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
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions/frp-pultrusion-supplier-usa" },
          { label: "United States — FRP Pultrusion" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="site-container">
          <div className="overflow-hidden rounded-card">
            <Image
              src="/images/regions/frp-pultrusion-supplier-usa.jpg"
              alt="Dimensioned isometric drawings of pultruded FRP structural profile shapes — channel, flat plate, and angle sections — to EN 13706 / ASTM D3917, supplied factory-direct for US projects"
              width={1280}
              height={600}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
              preload
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="site-container">
          <SectionTag>Why US Specifiers Source from F1</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Why US buyers use a direct FRP pultrusion supplier
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f16 leading-golden text-t2">
              <p>
                Buying FRP from China raises three questions for US specifiers and EPC buyers: what the duties add to the price, whether the project falls under Buy America / BABA rules, and what supply-chain documents customs will ask for under UFLPA. We answer them up front. Duties, including Section 301, are itemized in every DDP quote. BABA-covered work needs a US manufacturing step, so we do not supply it directly. Supply-chain traceability documents are prepared with each shipment.
              </p>
              <p>
                The rest is the usual engineering work: fire-retardant formulations with ASTM E84 reports on request, AAMA 2604 / 2605 coatings for architectural sections, low-conductivity window frames, and custom sections that can often use one of FengDu&rsquo;s more than 1,000 existing dies. Send a section list and we will quote DDP so you can compare landed cost with your current supplier.
              </p>
            </div>
            <div className="space-y-[21px] text-f16 leading-golden text-t2">
              <p>
                F1 Composite is the export company of FengDu New Material. FengDu
                runs 5 production bases with 370 pultrusion lines, about 150,000
                tonnes a year of capacity and more than 1,000 existing dies. F1
                handles engineering support, contracts, documents and delivery for
                U.S. buyers.
              </p>
              <p>
                For Passive House projects, our 90-series GFRP-PU window frame holds Passive House Institute <strong>component certificate 2491wi03</strong> (Uw 0.78 W/m²·K, phB class). PHIUS certifies buildings with its own window data, so for a PHIUS project we provide the PHI certificate and frame values for your energy model. Frames can be powder coated in RAL colors with AAMA 2604 / 2605 systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="site-container">
          <SectionTag>US Standards Stack</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            ASTM, AAMA and Passive House documents for US specifications
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f14 font-bold uppercase tracking-wide text-t1">Application</th>
                  <th className="py-[13px] pr-[21px] text-f14 font-bold uppercase tracking-wide text-t1">US Standard</th>
                  <th className="py-[13px] pr-[21px] text-f14 font-bold uppercase tracking-wide text-t1">What F1 provides</th>
                  <th className="py-[13px] text-f14 font-bold uppercase tracking-wide text-t1">Documentation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { app: "Fire — interior structural", std: "ASTM E84 (FSI ≤ 25 target)", perf: "Fire-retardant formulations", doc: "Test report on request" },
                  { app: "Window thermal", std: "PHI component certificate", perf: "Uw 0.78, certificate 2491wi03", doc: "PHI certificate (published)" },
                  { app: "Architectural coating", std: "AAMA 2604", perf: "Powder coating on finished sections", doc: "Coater report on request" },
                  { app: "Premium coating (PVDF)", std: "AAMA 2605", perf: "PVDF coating on finished sections", doc: "Coater report on request" },
                  { app: "Grating slip resistance", std: "AS 4586 surface classes", perf: "Gritted grating surfaces", doc: "Slip test report on request" },
                  { app: "Tensile / flexural QA", std: "ASTM D638 / D790", perf: "Batch testing", doc: "Batch test certificate" },
                  { app: "Pultrusion tolerance", std: "ASTM D3917", perf: "Dimensional checks per order", doc: "Dimensional report" },
                  { app: "Bridge / vehicular deck", std: "AASHTO load classes", perf: "Pultruded deck plank options", doc: "Project calculation on request" },
                ].map((row) => (
                  <tr key={row.app} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f16 font-medium text-t1">{row.app}</td>
                    <td className="py-[13px] pr-[21px] text-f16 text-t2">{row.std}</td>
                    <td className="py-[13px] pr-[21px] text-f16 text-t2">{row.perf}</td>
                    <td className="py-[13px] text-f16 text-t2">{row.doc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="site-container">
          <SectionTag>Logistics & Landed Cost</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            From our factory in China to your US jobsite, with the Section 301 tariff itemized
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "RFQ and DDP USA quote",
                body: "Send a drawing or section sketch, the quantity and the delivery state. We reply within one business day, then quote DDP to your site with US duties itemized, the HTSUS classification and an estimated delivery date.",
              },
              {
                step: "2",
                title: "Production and batch certificates",
                body: "Catalog sections take 2–4 weeks and variants on an existing die 4–6 weeks, in FengDu's production network. Each batch ships with a mill test certificate. Coating reports for finished sections and third-party fire and slip-resistance reports are provided on request.",
              },
              {
                step: "3",
                title: "Ocean freight and DDP delivery",
                body: "Ocean transit takes 16–22 days to Los Angeles or Long Beach and 28–32 days to New York, Savannah or Houston. Purchase order to jobsite is typically 8–12 weeks.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-card border border-border-default bg-white p-[34px]">
                <div className="text-f12 font-bold uppercase tracking-[2px] text-teal-text">Step {s.step}</div>
                <h3 className="mt-[8px] text-f18 font-bold text-t1">{s.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-[34px] flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/custom-pultruded-profiles">Custom pultrusion capabilities</LinkArrow>
            <LinkArrow href="/products/frp-window-frames">PHI-certified window frames</LinkArrow>
            <LinkArrow href="/products/frp-gratings">Pultruded FRP gratings</LinkArrow>
            <LinkArrow href="/regions/frp-passive-house-windows-canada">FRP passive house windows — Canada</LinkArrow>
            <LinkArrow href="/ai/passive-house">Passive house window selector</LinkArrow>
            <LinkArrow href="/technology/frp-u-value-calculator">Window U-value calculator</LinkArrow>
            <LinkArrow href="/resources/blog/frp-fenestration-passivhaus-certification">PHI Cert 2491wi03 — Passive House</LinkArrow>
            <LinkArrow href="/resources/blog/how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide">
              US Buyer&rsquo;s Guide: sourcing FRP from China
            </LinkArrow>
          </div>

          <FAQ items={faqs} />
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="site-container">
          <SectionTag>Related Resources</SectionTag>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/resources/blog/frp-fenestration-passivhaus-certification"
              className="group rounded-card border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f16 font-bold text-t1">PHI-certified GFRP frames (Uw 0.78)</h3>
              <p className="mt-[5px] text-f14 leading-golden text-t2">What PHI component certificate 2491wi03 covers, and how to use it on a US project.</p>
            </Link>
            <Link
              href="/resources/blog/frp-fire-resistance-ratings-guide"
              className="group rounded-card border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f16 font-bold text-t1">ASTM E84 and FRP fire ratings</h3>
              <p className="mt-[5px] text-f14 leading-golden text-t2">How resin chemistry and additives affect flame spread, and what a Class A report covers.</p>
            </Link>
            <Link
              href="/technology/frp-vs-aluminum-windows"
              className="group rounded-card border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f16 font-bold text-t1">FRP vs Aluminum — AAMA & thermal</h3>
              <p className="mt-[5px] text-f14 leading-golden text-t2">U-values, structure and AAMA 2604 / 2605 finishes compared for US projects.</p>
            </Link>
          </div>
        </div>
      </section>

      <InnerCTA title="Request a DDP USA quote with duties itemized" />
    </>
  );
}
