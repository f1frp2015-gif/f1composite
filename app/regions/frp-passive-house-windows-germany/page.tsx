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

const pageTitle = "FRP Passive House Windows — Germany Supplier";
const pageDescription =
  "Pultruded FRP (GFK) passive house windows for Germany. PHI Cert 2491wi03 (U_w 0.78, phB), GEG/BEG-ready, with no aluminum duty or CBAM.";
const pagePath = "/regions/frp-passive-house-windows-germany";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  image: "/regions/frp-passive-house-windows-germany/opengraph-image",
  path: pagePath,
});

const faqs = [
  {
    question:
      "Are FRP windows from China subject to EU anti-dumping duties or CBAM?",
    answer:
      "No. The EU's anti-dumping duties on Chinese aluminum extrusions (Regulation (EU) 2021/546, 21.2%–32.1%) apply to aluminum profiles, so aluminum window systems made with Chinese extrusions carry that cost. In its definitive regime, CBAM prices the embedded carbon in imported iron, steel, and aluminum goods, including aluminum door and window frames (CN 7610) and steel doors and windows (CN 7308 30). Pultruded FRP (fiberglass-reinforced polymer) fenestration is a glass-fiber composite classified under HS 3925.20 or 7019, placing it outside both the anti-dumping orders and CBAM. Standard EU customs duties and Germany's 19% import VAT (Einfuhrumsatzsteuer) still apply and are itemized in our DDP Germany quote.",
  },
  {
    question: "Which German and EU standards do F1 Composite FRP windows follow?",
    answer:
      "Windows placed on the EU market carry CE marking under EN 14351-1 with a Declaration of Performance — air permeability (EN 12207), watertightness (EN 12208), and wind-load resistance (EN 12210) type testing is arranged per project at an accredited European laboratory such as ift Rosenheim. Thermal performance is calculated to EN ISO 10077, and the frame's Passive House credential is the PHI Component Certificate 2491wi03 (U_w = 0.78 W/m²·K, phB class) issued by the Passive House Institute in Darmstadt — the body that wrote the standard.",
  },
  {
    question:
      "Do F1 FRP windows meet GEG 2024, BEG funding, and Passivhaus targets?",
    answer:
      "Yes, with margin at every tier. The GEG 2024 reference building assumes a window U_w of 1.3 W/m²·K; BEG funding for a single window-replacement measure requires U_w ≤ 0.95; and a PHI-certified component for the cool-temperate climate zone must reach U_w ≤ 0.80. Our 90-series GFRP-PU frame is certified at U_w 0.78 W/m²·K (PHI 2491wi03, phB). Because the entire pultruded frame is intrinsically insulating (≈ 0.3 W/m·K versus 160 for aluminum), there is no metallic thermal-break path or steel reinforcement conducting heat as there is in uPVC frames.",
  },
  {
    question: "What are the lead times and shipping options to German jobsites?",
    answer:
      "Standard schedule from PO: 4–6 weeks production + 30–35 days sea freight to Hamburg, Bremerhaven, or Rotterdam. Total PO-to-jobsite is typically 9–13 weeks DDP. For inland destinations (Munich, Frankfurt, Berlin, the Ruhr) we deliver DAP via truck or rail from the port of entry. Urgent samples or replacement parts ship air freight ex-Shanghai to any major German hub in 4–6 days at premium cost.",
  },
  {
    question: "Can F1 supply EUR-priced, DDP quotes for German projects?",
    answer:
      "Yes. We quote DDP to your German jobsite in EUR or USD, with EU customs duty and 19% import VAT itemized so your quantity surveyor sees the full landed cost up front. We classify under HS 3925.20 or 7019 depending on configuration, ship with our EU customs broker handling clearance, and provide full supply-chain traceability documentation with every shipment.",
  },
  {
    question:
      "Does F1 supply profiles to German window fabricators, or only finished windows?",
    answer:
      "Both models run in parallel. For Passivhaus and Effizienzhaus projects that want guaranteed factory airtightness, we ship complete GFRP-PU window units — assembled, glazed, gasketed, and leak-tested, including tilt-turn (Dreh-Kipp) configurations in the 80-series. For Germany's established window-fabrication industry (Fensterbau), we supply the pultruded profile set — frame, sash, mullion, transom, glazing bead — plus co-extruded EPDM gasketing and fabrication drawings, so a German fabricator assembles locally. F1 holds 800+ existing die sections and pultrudes on its own lines (5 bases, 370 lines), so engineered profiles often skip new tooling; finishes are AAMA 2604/2605 architectural powder coating in any RAL color.",
  },
];

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
        description="Pultruded fiberglass (GFK) window frames for Germany's Passivhaus, Effizienzhaus, and GEG-driven buildings — PHI Component Cert 2491wi03 (U_w 0.78, phB) from the institute that wrote the standard, and outside EU anti-dumping duties on aluminum and outside CBAM."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions/frp-passive-house-windows-germany" },
          { label: "Germany — FRP Passive House Windows" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/regions/frp-passive-house-windows-germany.jpg"
              alt="Passive house facade with large triple-glazed openings — pultruded FRP (GFK) window frames hold certified Passivhaus U-values without a metallic thermal break"
              width={1280}
              height={854}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Why German Specifiers Source from F1</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Certified where Passivhaus was born — without the aluminum duty stack
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Germany invented the Passivhaus standard, and German energy law keeps
                raising the bar: the GEG 2024 reference building already assumes window
                U<sub>w</sub> 1.3 W/m²·K, BEG funding for window replacement requires
                U<sub>w</sub> ≤ 0.95, and Passivhaus / Effizienzhaus 40 projects push
                below 0.80. Those targets are won or lost at the frame: thermally broken
                aluminum struggles to reach them economically, and uPVC gets there only
                with steel reinforcement that bridges heat and limits sash sizes.
              </p>
              <p>
                F1 Composite&rsquo;s pultruded FRP (GFK) fenestration solves the thermal
                problem in the material itself. The whole frame is intrinsically
                insulating — fiberglass thermal conductivity ≈ 0.3 W/m·K versus
                aluminum&rsquo;s 160 — so our 90-series reaches a whole-window
                U<sub>w</sub> of 0.78 W/m²·K with no thermal break to design, install,
                or fail. The certificate comes from the source: <strong>PHI Component
                Certificate 2491wi03</strong> (phB class), issued by the Passive House
                Institute in Darmstadt.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Then there is the cost story German buyers should check before specifying
                imported aluminum. Chinese aluminum extrusions carry EU anti-dumping
                duties of 21.2%–32.1% (Regulation (EU) 2021/546), and since January 2026
                CBAM prices embedded carbon on imported aluminum and steel building
                products — including aluminum window frames. Pultruded FRP is a
                glass-fiber composite, not aluminum or steel, so it sits{" "}
                <strong>outside both regimes</strong>. Normal EU duty + 19% import VAT
                are quoted inline DDP — no surprise on landed cost.
              </p>
              <p>
                German projects choose the supply model: complete factory-glazed,
                leak-tested window units — including tilt-turn (Dreh-Kipp)
                configurations — for Passivhaus jobs where airtightness must be
                guaranteed at the factory, or pultruded profile sets into
                Germany&rsquo;s established Fensterbau industry for local assembly.
                Architectural AAMA 2604 / 2605 powder coating in any RAL color, matching
                the finish German architects specify on aluminum.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>German Standards Stack</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            CE / EN 14351-1, GEG, BEG, PHI — the paperwork your spec calls for
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Requirement</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">German / EU Standard</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">F1 Performance</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Documentation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { app: "CE marking", std: "EN 14351-1 (windows & external doors)", perf: "Air / water / wind type testing per project", doc: "Declaration of Performance" },
                  { app: "Thermal calculation", std: "EN ISO 10077 · DIN 4108", perf: "U_w 0.78 W/m²·K (90-series)", doc: "Calculation pack" },
                  { app: "Passive House thermal", std: "PHI Component (Darmstadt)", perf: "U_w 0.78, Cert 2491wi03, phB", doc: "PHI certificate" },
                  { app: "GEG 2024 compliance", std: "Reference window U_w 1.3", perf: "Clears reference value by 40%", doc: "Engineering calculation" },
                  { app: "BEG window funding", std: "Single-measure U_w ≤ 0.95", perf: "0.78 qualifies with margin", doc: "U-value calculation pack" },
                  { app: "Trade-cost exposure", std: "EU AD duties (alu) · CBAM (alu/steel)", perf: "FRP outside both regimes", doc: "HS 3925.20 / 7019 classification" },
                  { app: "Architectural coating", std: "AAMA 2604 / 2605 · RAL colors", perf: "10-yr exposure, any RAL color", doc: "AAMA-listed coater report" },
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
            From our factory in China to your German jobsite, with duties and VAT itemized
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "RFQ → DDP Germany quote within 24 hours",
                body: "Send us a drawing or section sketch, the target quantity, and the delivery region. F1 will provide complete DDP pricing in EUR or USD, with EU duties and the 19% import VAT itemized, plus the HS classification and estimated delivery date. Aluminum anti-dumping duties and CBAM charges do not apply.",
              },
              {
                step: "2",
                title: "Production in 4–6 weeks · certification package",
                body: "F1 manufactures the profiles on its own pultrusion lines. The shipment includes PHI Component Certificate 2491wi03, the EN ISO 10077 thermal calculation, a report from an AAMA-listed coating applicator, and CE type-testing documentation.",
              },
              {
                step: "3",
                title: "Ocean freight and DDP delivery",
                body: "Ocean transit takes 30–35 days to Hamburg, Bremerhaven, or Rotterdam. The total lead time from purchase order to jobsite is 9–13 weeks. DAP delivery is available from the port of entry to Munich, Frankfurt, Berlin, and the Ruhr region.",
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
            <LinkArrow href="/products/frp-window-frames">Pultruded window profiles (65–140)</LinkArrow>
            <LinkArrow href="/ai/passive-house">Free passive house window selector</LinkArrow>
            <LinkArrow href="/technology/frp-u-value-calculator">Window U-value calculator</LinkArrow>
            <LinkArrow href="/regions/frp-passive-house-windows-canada">FRP passive house windows — Canada</LinkArrow>
            <LinkArrow href="/what-is-frp">What is FRP? Material guide</LinkArrow>
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
              <h3 className="text-f15 font-bold text-t1">PHI-certified GFRP frames (U_w 0.78)</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">PHI Component Certificate 2491wi03 — what the Darmstadt certification covers and how to specify it.</p>
            </Link>
            <Link
              href="/technology/frp-vs-pvc-windows"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">FRP vs uPVC — stiffness & U-value</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">Why GFK frames need no steel reinforcement — larger sashes, no hidden thermal bridge.</p>
            </Link>
            <Link
              href="/case-studies/fenestration-residential"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Zero-carbon community case study</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">65/90-series GFRP-PU frames across a 13,657 m² zero-carbon dormitory envelope — Wanhua Yantai.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg2 pb-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <CalculatorCTA
            href="/technology/frp-u-value-calculator#frame=frp-90&glass=tg-kr&spacer=warm-premium&type=casement&w=1200&h=1400"
            eyebrow="Free tool · Passivhaus preset"
            title="Check a passive-house window U-value against GEG and PHI targets"
            sub="Opens the U-value calculator pre-loaded with an F1 90-Series passive-house build-up — verify the whole-window Uw against GEG 2024, BEG funding thresholds, and the PHI 0.80 component criterion, then quote DDP Germany."
          />
        </div>
      </section>

      <InnerCTA title="Request a DDP Germany quote for FRP passive house windows without the aluminum duty stack" />
    </>
  );
}
