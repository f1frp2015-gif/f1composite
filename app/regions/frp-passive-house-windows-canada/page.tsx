import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "FRP Passive House Windows — Canada Supplier";
const pageDescription =
  "Pultruded FRP passive house windows for Canada — PHIUS-aligned PHI Cert 2491wi03 (U_w 0.78), CSA A440 / NAFS / NFRC ready. Not caught by the 25% surtax. DDP.";
const pagePath = "/regions/frp-passive-house-windows-canada";

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
      "No. Canada's surtax orders apply to steel and aluminum goods containing Chinese-melted or -cast metal (in force since July 31, 2025) and were extended to steel derivative goods — including steel-framed doors and windows — effective December 26, 2025. Pultruded FRP (fiberglass-reinforced polymer) fenestration is a glass-fiber composite, not steel or aluminum, so it is not covered by these surtax orders. Aluminum window systems with Chinese content can be caught by the 25% surtax; FRP is not. The normal MFN customs duty (classified under HS 3926.90 / 7019) and 5% GST still apply and are quoted inline in our DDP Canada price — no surprise on landed cost.",
  },
  {
    question: "Which Canadian standards are F1 Composite FRP windows tested to?",
    answer:
      "Performance to NAFS — AAMA/WDMA/CSA 101/I.S.2/A440-11 with the Canadian Supplement CSA A440S1 (air, water, wind, forced-entry, operating force). Energy performance per CSA A440.2 / A440.3 simulation and NFRC 100 on request, so the frames carry an ENERGY STAR for Canada-comparable U-factor. Thermal certification is the PHIUS-aligned PHI Component Certificate 2491wi03 (U_w = 0.78 W/m²·K ≈ U-factor 0.14 Btu/h·ft²·°F, phB class) — recognized across PHIUS and Passive House Canada projects nationwide.",
  },
  {
    question: "Do F1 FRP windows meet the BC Energy Step Code and Toronto Green Standard?",
    answer:
      "Yes — comfortably. The BC Energy Step Code and Zero Carbon Step Code drive new buildings to net-zero-energy-ready by 2032, and upper steps require window U-factors well below 0.22 Btu/h·ft²·°F (≈ 1.25 W/m²·K). Our 90-series FRP frame at U_w 0.78 W/m²·K (U-factor ≈ 0.14) clears Step 4/5 window targets and the Toronto Green Standard Tier 2–4 thermal envelope criteria with margin, because the entire pultruded frame is intrinsically insulating (≈ 0.3 W/m·K) with no aluminum thermal-break path to fail in cold climates.",
  },
  {
    question: "What are the lead times and shipping options to Canadian ports?",
    answer:
      "Standard schedule from PO: 4–6 weeks production + sea freight of 14–20 days to Vancouver / Prince Rupert (West Coast) or 26–32 days to Montreal / Halifax (East Coast). Total PO-to-jobsite is typically 8–12 weeks DDP. For inland destinations (Calgary, Toronto, Ottawa) we deliver DAP via rail/truck from the port of entry. Urgent samples or replacement parts ship air freight ex-Shanghai to any major Canadian hub in 4–6 days at premium cost.",
  },
  {
    question: "Can F1 supply CAD-priced, DDP quotes for Canadian projects?",
    answer:
      "Yes. We quote DDP to your Canadian jobsite in CAD or USD, with MFN customs duty and 5% GST itemized so your QS sees the full landed cost up front. We classify under HS 3926.90 or 7019 depending on configuration, ship with our Canadian customs broker handling clearance, and provide UFLPA-grade supply-chain traceability documentation with every shipment. Provincial PST/HST handling is confirmed per delivery province at PO acceptance.",
  },
  {
    question: "How does F1's FRP compare to Cascadia, Inline, and Innotech fiberglass frames?",
    answer:
      "F1 matches the thermal performance of North American fiberglass-frame specialists (U_w to 0.78 W/m²·K, no thermal break) and adds a PHIUS-aligned PHI component certificate plus AAMA 2604/2605 architectural finishes in any RAL color. The difference is sourcing economics: F1 holds 800+ existing die sections and pultrudes on its own lines (5 bases, 370 lines), so engineered fenestration profiles often skip new tooling, and — unlike aluminum systems — FRP is not exposed to the 25% Chinese-content surtax in Canada. For projects needing a Canadian fabricator, F1 supplies profiles into a fabricator-partner assembly model.",
  },
];

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
    provider: {
      "@id": "https://www.f1composite.com/#organization",
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "FRP Passive House Windows for Canada — PHIUS-Aligned Fiberglass Window Frames",
    description: pageDescription,
    url: absoluteUrl(pagePath),
    image: [absoluteUrl("/images/regions/frp-passive-house-windows-canada.jpg")],
    brand: { "@type": "Brand", name: "F1 Composite" },
    model: "F1-THERM",
    manufacturer: {
      "@id": "https://www.f1composite.com/#organization",
      "@type": "Organization",
      name: "F1 Composite",
    },
    category: "FRP Window Frames and Fenestration Systems",
    material: ["E-glass roving", "Vinyl ester resin"],
    offers: {
      "@type": "AggregateOffer",
      url: absoluteUrl("/contact"),
      priceCurrency: "CAD",
      lowPrice: "12",
      highPrice: "160",
      offerCount: "50",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      eligibleRegion: { "@type": "Country", name: "Canada" },
      seller: {
        "@id": "https://www.f1composite.com/#organization",
        "@type": "Organization",
        name: "F1 Composite",
      },
    },
    hasMeasurement: [
      {
        "@type": "QuantitativeValue",
        propertyID: "Whole-window U-value (U_w)",
        value: "0.78",
        unitText: "W/m²·K",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />

      <PageHeader
        tag="Canada"
        title="FRP passive house windows for Canadian projects"
        description="Pultruded fiberglass window frames for Canada's Passive House, net-zero, and step-code buildings — PHIUS-aligned PHI Cert 2491wi03 (U_w 0.78), CSA A440 / NAFS performance, and not caught by Canada's 25% surtax on Chinese steel and aluminum."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions/frp-passive-house-windows-canada" },
          { label: "Canada — FRP Passive House Windows" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/regions/frp-passive-house-windows-canada.jpg"
              alt="Interior view through a Canadian window in winter — passive-house-grade fiberglass window frames hold up against snow, ice, and sub-zero cold"
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
          <SectionTag>Why Canadian Specifiers Source from F1</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Passive-house-grade fiberglass windows — without the aluminum surtax
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Canada is pushing every new building toward net-zero-energy-ready by
                2032 — through the BC Energy Step Code, the Toronto Green Standard, the
                National Building Code / NECB tiered energy paths, and a growing book of
                PHIUS and Passive House Canada certified projects. Those targets are won or
                lost at the window: a thermally broken aluminum frame simply cannot reach
                the U-factor the upper steps demand without oversized glazing.
              </p>
              <p>
                F1 Composite&rsquo;s pultruded FRP fenestration solves the thermal problem
                at the frame. The whole frame is intrinsically insulating — fiberglass
                thermal conductivity ≈ 0.3 W/m·K versus aluminum&rsquo;s 160 — so our
                90-series reaches a whole-window U<sub>w</sub> of 0.78 W/m²·K (U-factor
                ≈ 0.14 Btu/h·ft²·°F) with no metallic thermal-break path to fail in a
                Canadian winter.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Then there is the cost story Canadian buyers are not being told. Since
                December 26, 2025 Canada&rsquo;s 25% surtax covers steel <em>and</em>{" "}
                aluminum goods with Chinese content — and steel-framed doors and windows
                specifically. Pultruded FRP is a glass-fiber composite, not steel or
                aluminum, so it is <strong>not</strong> caught by the surtax. Where a
                Chinese-content aluminum window now lands with a 25% surtax, an F1 FRP
                window does not.
              </p>
              <p>
                For Passive House projects: our 90 Series GFRP-PU window frame holds{" "}
                <strong>PHI Component Certificate 2491wi03</strong> (U<sub>w</sub> = 0.78
                W/m²·K, phB class) — recognized across PHIUS and Passive House Canada
                projects. Drop-in replacement for aluminum or fiberglass frames on any
                certifying building, with architectural-grade AAMA 2604 / 2605 powder
                coating in any RAL color. Normal MFN duty + 5% GST are quoted inline DDP —
                no surprise on landed cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Canadian Standards Stack</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            NAFS, CSA A440, NFRC, PHIUS — the certifications your spec calls for
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Requirement</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Canadian Standard</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">F1 Performance</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Documentation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { app: "Window performance", std: "NAFS — CSA 101/I.S.2/A440-11 + A440S1", perf: "Air / water / wind / forced-entry rated", doc: "NAFS test report" },
                  { app: "Energy / thermal sim", std: "CSA A440.2 / A440.3 · NFRC 100", perf: "U-factor 0.14 (U_w 0.78 W/m²·K)", doc: "Simulation on request" },
                  { app: "Passive House thermal", std: "PHIUS / PHI Component", perf: "U_w 0.78, Cert 2491wi03, phB", doc: "PHI certificate" },
                  { app: "Step-code envelope", std: "BC Energy Step Code 4–5", perf: "Clears upper-step window U-factor", doc: "Engineering calculation" },
                  { app: "Municipal green", std: "Toronto Green Standard Tier 2–4", perf: "Meets thermal envelope criteria", doc: "U-value calculation pack" },
                  { app: "Architectural coating", std: "AAMA 2604 / 2605", perf: "10-yr exposure, any RAL color", doc: "AAMA-listed coater report" },
                  { app: "Supply-chain trace", std: "UFLPA-grade documentation", perf: "Own-line production, 5 bases", doc: "Traceability pack" },
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
            China factory → Canadian jobsite, surtax-free with duty pre-quoted
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "RFQ → DDP Canada quote in 24h",
                body: "Send drawing or section sketch + target quantity + delivery province. F1 returns full DDP pricing (CAD or USD) with MFN duty + 5% GST itemized, HS classification, and ETA to your jobsite. FRP carries no 25% surtax.",
              },
              {
                step: "2",
                title: "Production 4–6 weeks · cert pack",
                body: "Pultruded on F1's own lines. PHI Component Certificate 2491wi03, NAFS test report, AAMA-listed coater report, and CSA A440.2 / NFRC simulation supplied with the shipment.",
              },
              {
                step: "3",
                title: "Sea freight + DDP delivery",
                body: "14–20 days to Vancouver / Prince Rupert or 26–32 days to Montreal / Halifax. Total PO-to-jobsite 8–12 weeks. DAP inland to Calgary, Toronto, and Ottawa from the port of entry.",
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
            <LinkArrow href="/products/fenestration-systems">FRP fenestration systems (65–140)</LinkArrow>
            <LinkArrow href="/ai/passive-house">Free passive house window selector</LinkArrow>
            <LinkArrow href="/technology/u-value-calculator">Window U-value calculator</LinkArrow>
            <LinkArrow href="/regions/frp-pultrusion-supplier-usa">Sourcing FRP for US projects</LinkArrow>
          </div>

          <FAQ items={faqs} suppressSchema />
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
              <h3 className="text-f15 font-bold text-t1">PHIUS-aligned GFRP frames (U_w 0.78)</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">PHI Component Certificate 2491wi03 — drop-in Passive House frames for Canadian projects.</p>
            </Link>
            <Link
              href="/technology/frp-vs-aluminum-windows"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">FRP vs Aluminum — thermal & U-factor</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">Why FRP wins on U-value and avoids the 25% surtax that hits aluminum frames.</p>
            </Link>
            <Link
              href="/case-studies/qinling-station-antarctic-passive-windows"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">phA arctic-class case study</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">FRP passive windows certified at the arctic ceiling of the standard — Qinling Station.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg2 pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <CalculatorCTA
            href="/technology/u-value-calculator?frame=frp-90&glass=tg-kr&spacer=warm-premium&type=casement&w=1200&h=1400"
            eyebrow="Free tool · cold-climate preset"
            title="Check a passive-house window U-value for your Canadian climate zone"
            sub="Opens the U-value calculator pre-loaded with an F1 90-Series passive-house build-up — verify the whole-window Uw against CSA A440 and Passive House targets, then quote DDP Canada, surtax-free."
          />
        </div>
      </section>

      <InnerCTA title="Need FRP passive house windows quoted DDP Canada — surtax-free?" />
    </>
  );
}
