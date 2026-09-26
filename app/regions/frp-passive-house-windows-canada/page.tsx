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
  "Pultruded FRP passive house windows for Canada: PHI certificate 2491wi03 (Uw 0.78), NAFS and CSA A440 reports on request, DDP quotes with duties itemized.";
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
      "Canada's surtaxes on Chinese-origin goods in this area target steel and aluminum products, including steel-framed doors and windows. Pultruded FRP frames are a glass-fibre composite, not steel or aluminum, so those orders are not written for them. Surtax rules change, so we confirm the current treatment for the HS classification we use (usually 3926.90 or 7019) when we quote. The normal MFN duty and 5% GST are itemized in the DDP Canada price.",
  },
  {
    question: "Which Canadian standards are F1 Composite FRP windows tested to?",
    answer:
      "Window test reports to NAFS (AAMA/WDMA/CSA 101/I.S.2/A440 with the Canadian supplement CSA A440S1) and thermal simulations to CSA A440.2 / NFRC 100 are provided on request for the configuration you specify. The published thermal document is Passive House Institute (PHI) component certificate 2491wi03 for the 90-series window: Uw 0.78 W/m²·K (U-factor about 0.14 Btu/h·ft²·°F), phB class, for the tested size and glazing. PHIUS and Passive House Canada projects use it as input data for their own energy models.",
  },
  {
    question: "Do F1 FRP windows meet the BC Energy Step Code and Toronto Green Standard?",
    answer:
      "The certified 90-series configuration is well inside the window targets of the upper BC Energy Step Code steps, which call for U-factors well below 0.22 Btu/h·ft²·°F (about 1.25 W/m²·K): its Uw is 0.78 W/m²·K (U-factor about 0.14). The frame itself conducts little heat (about 0.3 W/m·K) and has no aluminum thermal break. Step Code and Toronto Green Standard compliance is assessed for the whole building, so confirm the U-factor for your window sizes and glazing in the energy model.",
  },
  {
    question: "What are the lead times and shipping options to Canadian ports?",
    answer:
      "Standard schedule from PO: 4–6 weeks production + sea freight of 14–20 days to Vancouver / Prince Rupert (West Coast) or 26–32 days to Montreal / Halifax (East Coast). Total PO-to-jobsite is typically 8–12 weeks DDP. For inland destinations (Calgary, Toronto, Ottawa) we deliver DAP via rail/truck from the port of entry. Urgent samples or replacement parts ship air freight ex-Shanghai to any major Canadian hub in 4–6 days at premium cost.",
  },
  {
    question: "Can F1 supply CAD-priced, DDP quotes for Canadian projects?",
    answer:
      "Yes. We quote DDP to your Canadian site in CAD or USD, with MFN customs duty and 5% GST itemized so your quantity surveyor sees the landed cost up front. We state the HS classification (usually 3926.90 or 7019), our Canadian customs broker handles clearance, and supply-chain traceability documents ship with each order. Provincial PST/HST handling is confirmed for the delivery province when the purchase order is placed.",
  },
  {
    question: "How does F1's FRP compare to Cascadia, Inline, and Innotech fiberglass frames?",
    answer:
      "North American fiberglass-frame makers also build low-conductivity frames without a thermal break, so compare certified values for the same window size and glazing. What F1 adds is a published PHI component certificate for the 90 series (Uw 0.78 W/m²·K), AAMA 2604 / 2605 powder coating in RAL colours, and a large tooling base: FengDu's production network has more than 1,000 existing dies across 370 pultrusion lines, so many fenestration profiles need no new die. If you need a Canadian fabricator, we supply profiles into their assembly.",
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
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />

      <PageHeader
        tag="Canada"
        title="FRP passive house windows for Canadian projects"
        description="Pultruded fiberglass window frames for Canada's Passive House, net-zero and Step Code buildings, with PHI certificate 2491wi03 (Uw 0.78) and NAFS / CSA A440 reports on request."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions/frp-passive-house-windows-canada" },
          { label: "Canada — FRP Passive House Windows" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="site-container">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/regions/frp-passive-house-windows-canada.jpg"
              alt="Interior view through a Canadian window in winter — passive-house-grade fiberglass window frames hold up against snow, ice, and sub-zero cold"
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
          <SectionTag>Why Canadian Specifiers Source from F1</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Passive House fiberglass windows for Canadian projects
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f16 leading-golden text-t2">
              <p>
                Canadian codes are moving new buildings toward net-zero-energy-ready by
                2032, through the BC Energy Step Code, the Toronto Green Standard and the
                tiered energy paths in the national codes, alongside a growing number of
                PHIUS and Passive House Canada projects. The window is often the limiting
                element: thermally broken aluminum struggles to reach the U-factors of the
                upper steps without very high-performance glazing.
              </p>
              <p>
                A pultruded FRP frame conducts about 0.3 W/m·K of heat, against about 160
                for aluminum, so it needs no metal thermal break. In its certified
                configuration our 90-series window reaches U<sub>w</sub> 0.78 W/m²·K
                (U-factor about 0.14 Btu/h·ft²·°F).
              </p>
            </div>
            <div className="space-y-[21px] text-f16 leading-golden text-t2">
              <p>
                Tariffs matter too. Canada&rsquo;s surtaxes on Chinese-origin goods in this
                area are aimed at steel and aluminum products, including steel-framed doors
                and windows. Pultruded FRP is a glass-fibre composite, so those orders are
                not written for it. We confirm the current treatment for our HS
                classification in every quote.
              </p>
              <p>
                For Passive House projects, our 90-series GFRP-PU window frame holds Passive
                House Institute <strong>component certificate 2491wi03</strong> (U<sub>w</sub>{" "}
                0.78 W/m²·K, phB class). PHIUS and Passive House Canada projects can use its
                values in their energy models. Frames can be powder coated with AAMA 2604 /
                2605 systems in RAL colours, and MFN duty and 5% GST are itemized in the DDP
                price.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="site-container">
          <SectionTag>Canadian Standards Stack</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            NAFS, CSA A440, NFRC and Passive House documents for Canadian specifications
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f14 font-bold uppercase tracking-wide text-t1">Requirement</th>
                  <th className="py-[13px] pr-[21px] text-f14 font-bold uppercase tracking-wide text-t1">Canadian Standard</th>
                  <th className="py-[13px] pr-[21px] text-f14 font-bold uppercase tracking-wide text-t1">What F1 provides</th>
                  <th className="py-[13px] text-f14 font-bold uppercase tracking-wide text-t1">Documentation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { app: "Window performance", std: "NAFS — CSA 101/I.S.2/A440-11 + A440S1", perf: "Air, water, wind and forced-entry testing", doc: "Test report on request" },
                  { app: "Energy / thermal sim", std: "CSA A440.2 / A440.3 · NFRC 100", perf: "U-factor 0.14 (Uw 0.78 W/m²·K, certified size)", doc: "Simulation on request" },
                  { app: "Passive House thermal", std: "PHI component certificate", perf: "Uw 0.78, certificate 2491wi03, phB", doc: "PHI certificate (published)" },
                  { app: "Step Code envelope", std: "BC Energy Step Code 4–5", perf: "Window U-factor well below upper-step targets", doc: "Project U-value calculation" },
                  { app: "Municipal green", std: "Toronto Green Standard Tier 2–4", perf: "Window input for the envelope model", doc: "U-value calculation on request" },
                  { app: "Architectural coating", std: "AAMA 2604 / 2605", perf: "Powder coating in RAL colours", doc: "Coater report on request" },
                  { app: "Supply-chain trace", std: "Import traceability", perf: "FengDu production network", doc: "Traceability documents" },
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
            From FengDu&apos;s plants in China to your Canadian site, with duties itemized
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "RFQ and DDP Canada quote",
                body: "Send a drawing or section sketch, the quantity and the delivery province. We reply within one business day, then quote DDP in CAD or USD with MFN duty and 5% GST itemized, the HS classification and an estimated delivery date.",
              },
              {
                step: "2",
                title: "Production in 4–6 weeks and documents",
                body: "Profiles are made in FengDu's production network. The document set includes PHI component certificate 2491wi03, plus NAFS test reports, coating reports and CSA A440.2 / NFRC simulations on request for your configuration.",
              },
              {
                step: "3",
                title: "Ocean freight and DDP delivery",
                body: "Ocean transit takes 14–20 days to Vancouver or Prince Rupert and 26–32 days to Montreal or Halifax. The total lead time from purchase order to jobsite is 8–12 weeks. DAP delivery is available from the port of entry to Calgary, Toronto, and Ottawa.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-[8px] border border-border-default bg-white p-[34px]">
                <div className="text-f12 font-bold uppercase tracking-[2px] text-teal-text">Step {s.step}</div>
                <h3 className="mt-[8px] text-f18 font-bold text-t1">{s.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-[34px] flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/frp-window-frames">Fiberglass window frames (65–140)</LinkArrow>
            <LinkArrow href="/products/window-door-profiles">Window profiles for local fabricators</LinkArrow>
            <LinkArrow href="/ai/passive-house">Free passive house window selector</LinkArrow>
            <LinkArrow href="/technology/frp-u-value-calculator">Window U-value calculator</LinkArrow>
            <LinkArrow href="/regions/frp-pultrusion-supplier-usa">Sourcing FRP for US projects</LinkArrow>
            <LinkArrow href="/regions/frp-passive-house-windows-germany">FRP passive house windows — Germany</LinkArrow>
            <LinkArrow href="/what-is-frp">FRP material &amp; properties</LinkArrow>
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
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f16 font-bold text-t1">PHI-certified GFRP frames (Uw 0.78)</h3>
              <p className="mt-[5px] text-f14 leading-golden text-t2">What PHI component certificate 2491wi03 covers, and how to use it on a Canadian project.</p>
            </Link>
            <Link
              href="/technology/frp-vs-aluminum-windows"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f16 font-bold text-t1">FRP vs Aluminum — thermal & U-factor</h3>
              <p className="mt-[5px] text-f14 leading-golden text-t2">Frame conductivity, U-factor and tariff treatment compared.</p>
            </Link>
            <Link
              href="/case-studies/qinling-station-antarctic-passive-windows"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f16 font-bold text-t1">Antarctic window project account</h3>
              <p className="mt-[5px] text-f14 leading-golden text-t2">Qinling Station project account. The PHI component reference covers a cool-temperate configuration; confirm separate cold-climate project requirements.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg2 pb-[55px]">
        <div className="site-container">
          <CalculatorCTA
            href="/technology/frp-u-value-calculator#frame=frp-90&glass=tg-kr&spacer=warm-premium&type=casement&w=1200&h=1400"
            eyebrow="Free tool · cold-climate preset"
            title="Check a passive-house window U-value for your Canadian climate zone"
            sub="Opens the U-value calculator pre-loaded with an F1 90-Series passive-house build-up — verify the whole-window Uw against CSA A440 and Passive House targets, then quote DDP Canada, surtax-free."
          />
        </div>
      </section>

      <InnerCTA title="Request a DDP Canada quote for FRP passive house windows" />
    </>
  );
}
