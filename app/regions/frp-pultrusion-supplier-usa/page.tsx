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

const pageTitle = "ASTM-Compliant FRP Pultrusions — Direct to US Projects";
const pageDescription =
  "ASTM E84 · AAMA 2604/2605 · PHIUS frames (PHI 2491wi03). Engineered pultrusions for US infrastructure & Passive House. DDP USA, Section 301 inline, 24h quote.";
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
      "We quote Section 301 25% inline in every DDP USA price — no surprise on landed cost, no last-minute customs charge. We classify under HTSUS 3926.90 or 7019 depending on configuration; the duty rate is locked into the quote at PO acceptance, and we ship under DDP with our US customs broker handling clearance. For projects that require duty optimization, we discuss Foreign Trade Zone delivery and Mexico nearshoring as a Year 2+ option — but for Day 1 the COO is honestly China, and the tariff is paid transparently. Buyers consistently tell us that transparent landed-cost beats undisclosed surprise charges by competitors.",
  },
  {
    question: "Which US standards are F1 Composite FRP profiles tested to?",
    answer:
      "Our standard portfolio is tested to: ASTM E84 (Class A / Class 1 flame spread, FSI ≤ 25), AAMA 2604 and 2605 (architectural-grade powder coatings, 10-year South Florida exposure), ASTM D635 (self-extinguishing), ASTM D790 (flexural), ASTM D638 (tensile), ASTM D2344 (shear), and ASTM D3917 (pultrusion dimensional tolerance). Fenestration carries PHIUS-aligned PHI Component Certificate 2491wi03 (U_w = 0.78 W/m²·K, phB class), which is recognized across PHIUS projects in the United States and Canada. For Davis-Bacon, federal, or BABA-restricted projects, we route through US specifier and EPC partners rather than direct supply — see the next FAQ.",
  },
  {
    question: "Can I use F1 Composite FRP on Buy America Act / BABA federal projects?",
    answer:
      "Not directly on federal-funded BABA projects requiring US-manufactured content. F1's Day 1 production is all in Chongqing, China; we do not pretend otherwise. For BABA-covered work, the practical path is OEM/specifier partnership: a US fabricator installs F1 profiles into a finished assembly that qualifies for substantial transformation under their domestic manufacturing operation. State DOT projects, private EPC, and most commercial / industrial work outside federal grants are fully open. We can introduce you to US-based fabrication partners who routinely take our profiles and produce BABA-eligible assemblies.",
  },
  {
    question: "What are the lead times and shipping options to US ports?",
    answer:
      "Standard schedule from PO: 4–6 weeks production + 16–22 days sea freight to Los Angeles / Long Beach (West Coast) or 28–32 days to New York / Savannah / Houston (East and Gulf Coast). Total PO-to-jobsite is typically 8–12 weeks DDP. For urgent samples or replacement parts, air freight ex-Shanghai to any major US hub adds 4–6 days at premium cost. Starting Month 6, F1 maintains a US 3PL buffer stock in NJ and TX for the most common standard sections — enables 1-week DAP delivery to most CONUS destinations on stock items.",
  },
  {
    question: "What is the MOQ for custom pultrusion in the US market?",
    answer:
      "First run 500 linear meters, repeat orders from 200 m. Tooling lead time 4–8 weeks; tooling cost $3,000–$15,000 depending on cross-section complexity and is one-time (retained for repeat). For samples and small validation orders (<200 m), we ship from existing standard sections or from spec-near tooling we already hold. Send your drawing — if it matches a tool we already cut, MOQ becomes 50–100 m for first validation.",
  },
  {
    question: "How does F1's FRP compare to Strongwell, Creative Pultrusions, and Bedford Reinforced?",
    answer:
      "F1 matches or exceeds those vendors on ASTM E84 fire performance and EN 13706 mechanical grade, with comparable resin chemistry options (isophthalic polyester, vinyl ester, fire-retardant, premium phenolic). Differences: F1 holds 800+ existing die sections (vs ~200–300 at most US competitors), so engineered profiles often don't require new tooling. Pricing on standard sections is 30–50% below Strongwell/CPI before Section 301; even after 25% duty, F1 lands at 5–20% below US-stocked equivalent on most sections. For ASCE/SEI 74-23 LRFD design data and ICC-ES recognition, our partner-fabricator program supplies the same compliance documentation as a US-stocked profile. Detailed head-to-head at /resources/blog/how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide.",
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
        title="ASTM-compliant FRP pultrusions for US projects"
        description="Custom and standard pultruded FRP profiles, gratings, and PHIUS-certified fenestration — direct from F1 Composite. ASTM E84 Class A, AAMA 2604/2605, transparent Section 301 in every DDP USA quote."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions/frp-pultrusion-supplier-usa" },
          { label: "United States — FRP Pultrusion" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/regions/frp-pultrusion-supplier-usa.jpg"
              alt="Dimensioned isometric drawings of pultruded FRP structural profile shapes — channel, flat plate, and angle sections — to EN 13706 / ASTM D3917, supplied factory-direct for US projects"
              width={1280}
              height={600}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Why US Specifiers Source from F1</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Engineered FRP that meets US standards — without the landed-cost surprise
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                US specifiers and EPC procurement teams sourcing FRP face three structural challenges that domestic distributors don&rsquo;t advertise: Section 301 25% tariff on Chinese composites that is often quoted opaquely, BABA / Buy America restrictions on federal-funded projects, and UFLPA supply-chain traceability requirements. F1 Composite addresses all three head-on. Section 301 is pre-quoted in every DDP USA price. BABA-covered work is routed through US specifier-fabricator partnerships rather than direct supply. UFLPA traceability documentation is supplied as standard with every shipment.
              </p>
              <p>
                What remains is what US buyers actually want from a pultrusion source: ASTM E84 Class A fire performance, AAMA 2604 / 2605 architectural finishes, PHIUS-aligned thermal performance, and engineered custom cross-sections cut from F1&rsquo;s library of 800+ existing dies. The combination delivers 5–20% landed cost savings versus US-stocked equivalents on most sections, with engineering response times measured in days, not weeks.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                F1 Composite is FengDu New Material&rsquo;s international export company.
                FengDu operates 5 production bases, 370 pultrusion lines, 150,000
                tons/year capacity, and 1,000+ existing die sets; F1 handles U.S.
                engineering support, contracts, documentation, and delivery.
              </p>
              <p>
                For Passive House projects specifically: our 90 Series GFRP-PU window frame system holds <strong>PHI Component Certificate 2491wi03</strong> (U_w = 0.78 W/m²·K, phB class) — recognized across PHIUS projects in the United States and Canada. Drop-in replacement for aluminum or fiberglass frames on any PHIUS-certifying building, with architectural-grade powder coating in any RAL color via AAMA 2604 / 2605 systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>US Standards Stack</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            ASTM, AAMA, PHIUS — the certifications your spec engineer is looking for
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Application</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">US Standard</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">F1 Performance</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Documentation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { app: "Fire — interior structural", std: "ASTM E84 Class A", perf: "FSI ≤ 25 · SDI ≤ 450", doc: "3rd-party test report" },
                  { app: "Fenestration thermal", std: "PHIUS / PHI Component", perf: "U_w 0.78, Cert 2491wi03", doc: "PHI certificate" },
                  { app: "Architectural coating", std: "AAMA 2604", perf: "10-yr South Florida verified", doc: "AAMA-listed coater report" },
                  { app: "Premium coating (PVDF)", std: "AAMA 2605", perf: "Highest exterior tier", doc: "AAMA-listed coater report" },
                  { app: "Grating slip resistance", std: "ASTM F3125 / AS 4586", perf: "Class R10–R13 surface", doc: "Slip test report" },
                  { app: "Tensile / flexural QA", std: "ASTM D638 / D790", perf: "Per-batch MTC", doc: "Batch test certificate" },
                  { app: "Pultrusion tolerance", std: "ASTM D3917", perf: "±0.25 mm (tighter than ±0.3)", doc: "Dimensional report" },
                  { app: "Bridge / vehicular deck", std: "AASHTO H-5 / H-10 / H-20", perf: "Pultruded deck plank options", doc: "Engineering calculation pack" },
                ].map((row) => (
                  <tr key={row.app} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{row.app}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.std}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.perf}</td>
                    <td className="py-[13px] text-f15 text-t2">{row.doc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Logistics & Landed Cost</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            China factory → US jobsite, with Section 301 pre-quoted
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "RFQ → DDP USA quote in 24h",
                body: "Send drawing or section sketch + target quantity + delivery state. F1 returns full DDP USA pricing with Section 301 25% pre-quoted inline, HTSUS classification, and ETA to your jobsite.",
              },
              {
                step: "2",
                title: "Production 4–6 weeks · MTC per batch",
                body: "Manufacturing at one of 5 F1 production bases. Mill Test Certificates per batch, AAMA-listed coater report on finished sections, third-party fire and slip test reports on request.",
              },
              {
                step: "3",
                title: "Sea freight + DDP delivery",
                body: "16–22 days to Los Angeles / Long Beach (West Coast) or 28–32 days to NY / Savannah / Houston. Total PO-to-jobsite 8–12 weeks. US 3PL buffer stock in NJ + TX from Month 6 enables 1-week DAP on common sections.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-[8px] border border-border-default bg-white p-[34px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step {s.step}</div>
                <h3 className="mt-[8px] text-f17 font-bold text-t1">{s.title}</h3>
                <p className="mt-[8px] text-f13 leading-golden text-t2">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-[34px] flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/custom-pultrusions">Custom pultrusion capabilities</LinkArrow>
            <LinkArrow href="/products/fenestration-systems">PHIUS-certified fenestration</LinkArrow>
            <LinkArrow href="/products/gratings">FRP gratings</LinkArrow>
            <LinkArrow href="/regions/frp-passive-house-windows-canada">FRP passive house windows — Canada</LinkArrow>
            <LinkArrow href="/ai/passive-house">Passive house window selector</LinkArrow>
            <LinkArrow href="/technology/u-value-calculator">Window U-value calculator</LinkArrow>
            <LinkArrow href="/resources/blog/frp-fenestration-passivhaus-certification">PHI Cert 2491wi03 — Passive House</LinkArrow>
            <LinkArrow href="/resources/blog/how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide">
              US Buyer&rsquo;s Guide: sourcing FRP from China
            </LinkArrow>
          </div>

          <FAQ items={faqs} />
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/resources/blog/frp-fenestration-passivhaus-certification"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">PHIUS-certified GFRP frames (U_w 0.78)</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">PHI Component Certificate 2491wi03 — drop-in Passive House frames for US projects.</p>
            </Link>
            <Link
              href="/resources/blog/frp-fire-resistance-ratings-guide"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">ASTM E84 Class A — FRP fire ratings</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">How resin chemistry and additives achieve North American Class 1 / Class A flame spread.</p>
            </Link>
            <Link
              href="/resources/blog/frp-vs-aluminum-window-frames-comparison"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">FRP vs Aluminum — AAMA & thermal</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">Why FRP wins on U-value and AAMA 2604/2605 architectural finishes for US projects.</p>
            </Link>
          </div>
        </div>
      </section>

      <InnerCTA title="Need FRP quoted DDP USA with Section 301 pre-disclosed?" />
    </>
  );
}
