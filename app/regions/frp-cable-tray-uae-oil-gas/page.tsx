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

const pageTitle =
  "FRP Cable Tray Supplier UAE — Oil & Gas Projects";
const pageDescription =
  "FRP cable trays and ladders for UAE oil and gas projects: vinyl ester for sour service, NEMA FG 1 / IEC 61537 references, Jebel Ali or Khalifa Port delivery.";
const pagePath = "/regions/frp-cable-tray-uae-oil-gas";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Why is FRP cable tray preferred over galvanized steel in UAE oil and gas service?",
    answer:
      "UAE oil and gas sites combine three things that wear out galvanized steel cable tray: salty coastal air across Abu Dhabi, Dubai, Ras Al Khaimah and Fujairah; H₂S and CO₂ on sour-service upstream and midstream assets; and chemical splash and oil mist on process platforms. FRP cable tray does not rust, and a vinyl ester resin handles most of this exposure without coatings. Galvanized steel tray in the same service often needs partial or full replacement within the asset's first major shutdown cycle. Design life for FRP still depends on the resin, UV protection and inspection.",
  },
  {
    question: "Which standards do ADNOC and UAE EPC contractors specify for FRP cable tray?",
    answer:
      "UAE project specifications usually reference NEMA FG 1 (fiberglass cable tray, with load/span classes), IEC 61537 (cable tray and cable ladder systems), ASTM E84 flame spread (Class 1 / Class A), UL 568 for nonmetallic cable tray where a listing is required, and the operator's own material selection specifications for cable management in process areas. We supply FRP cable tray in vinyl ester or isophthalic polyester resin, with batch mill test certificates; fire, chemical and load test reports are provided on request.",
  },
  {
    question: "What FRP cable tray cross-sections and load classes are most commonly ordered for UAE projects?",
    answer:
      "The most common order pattern for UAE oil & gas projects: pultruded FRP ladder-type cable tray, 100 mm / 150 mm / 300 mm / 600 mm widths, 100 mm or 150 mm depth, NEMA Class 16C or 20C load rating, vinyl ester resin, with 6 m or 12 m straight lengths plus matching elbows, tees, crosses, and reducers. Solid-bottom ventilated cable tray is specified where smaller-diameter instrument cables run. Cable ladders are preferred over solid-bottom in process areas to allow oil and water drainage. Premium projects (offshore, sour-service onshore) specify vinyl ester or polyurethane resin matrix; less aggressive service uses isophthalic polyester.",
  },
  {
    question: "How does FRP cable tray weight reduction affect installation cost on UAE process plants?",
    answer:
      "Pultruded FRP cable tray weighs roughly half as much as galvanized steel tray of the same load class. On a process platform with more than 2,000 m of tray, that is 8–12 tonnes less to lift. Most sizes can be carried and fitted by two people without mechanical lifting, and there is less rigging and no hot work. FRP costs more per metre than galvanized steel, so whether the installed cost comes out lower depends on quantities, support spacing and site labour; we can price both options for your layout.",
  },
  {
    question: "Does FRP cable tray meet UAE Civil Defense fire safety requirements?",
    answer:
      "It can, with the right resin and test evidence. Fire-retardant formulations are tested for ASTM E84 flame spread (Class 1 / Class A: FSI ≤ 25, smoke developed ≤ 450), and higher-performance grades for EN 13501-1 and BS 476 Part 7 where a project calls for European or UK classifications. UAE Civil Defence (DCD / Abu Dhabi CD) acceptance depends on the building type and route, so confirm the required classification with the consultant. Fire test reports for the supplied formulation are provided on request.",
  },
  {
    question: "What lead times and ports apply for UAE oil and gas FRP cable tray orders?",
    answer:
      "Sea freight from Shanghai or Ningbo takes 18–22 days to Jebel Ali in Dubai and 19–24 days to Khalifa Port or Mussafah Port in Abu Dhabi. Direct calls are also available to Mina Zayed and Khor Fakkan. F1 Composite typically quotes CIF Jebel Ali for projects staged through Dubai or Sharjah and DAP to the project site for ADNOC Onshore destinations. Stock cable tray reaches the port 5–7 weeks after the purchase order; custom widths or project-specific coatings add 2–4 weeks. For multi-container orders, container planning begins 6–8 weeks before installation to avoid storage charges at Jebel Ali.",
  },
];

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
        tag="UAE / Oil & Gas"
        title="FRP Cable Tray Supplier for UAE Oil & Gas"
        description="Pultruded fiberglass cable trays and ladders for onshore and offshore oil and gas projects in the UAE, with vinyl ester resin for sour service, NEMA FG 1 and IEC 61537 references, and CIF Jebel Ali or DAP delivery to site."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions/frp-cable-tray-uae-oil-gas" },
          { label: "UAE Oil & Gas — FRP Cable Tray" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/industries/frp-electric-power-substation-infrastructure.jpg"
              alt="Pultruded FRP cable tray and cable ladder in an oil and gas electrical installation"
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
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>UAE Oil & Gas Service Reality</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Coastal salt, sour service and chemical splash: why galvanized cable tray wears out
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                UAE upstream, refining and gas plants run cable management in one of the hardest corrosion environments in the industry: 45–50°C summer air, salty Gulf coastal air, H₂S and CO₂ in sour-service operations, and chemical splash and oil mist on process platforms.
              </p>
              <p>
                Galvanized steel cable tray under these combined conditions typically reaches the end of its service life within 8–12 years. The dominant failure mode is loss of sacrificial zinc in the splash zone, followed by accelerated steel corrosion at galvanic discontinuities — most often at field-cut ends and field-welded supports where the galvanizing was not properly restored. Replacement programs are operationally expensive because they require shutdown windows, scaffold access, hot-work permits, and crew mobilization.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Pultruded FRP cable tray in vinyl ester resin does not rust and handles most of this exposure without coatings. FRP cable management has been used on Gulf oil and gas projects for many years; maintenance is mainly cleaning and inspection during scheduled shutdowns.
              </p>
              <p>
                We supply FRP cable tray made in China with NEMA FG 1 and IEC 61537 references, and test reports (including ASTM E84) on request against the operator&apos;s project requirements. CIF Jebel Ali is the most common Incoterm for projects staged through Dubai or Sharjah. DAP to site suits onshore locations such as Habshan, Bab and Bu Hasa, the Ruwais refinery area, and offshore work supported through Mussafah Port.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>NEMA Load Classification</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            FRP cable tray load class reference for UAE project specs
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">NEMA Class</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Load (lb/ft / kg/m)</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Span (ft / m)</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Typical UAE application</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { c: "8A / 8B / 8C", l: "50 / 75 / 100 lb/ft (74 / 112 / 149 kg/m)", s: "8 ft / 2.4 m", a: "Light cable, instrument runs" },
                  { c: "12A / 12B / 12C", l: "50 / 75 / 100 lb/ft", s: "12 ft / 3.7 m", a: "General process / utility runs" },
                  { c: "16A / 16B / 16C", l: "50 / 75 / 100 lb/ft (74 / 112 / 149 kg/m)", s: "16 ft / 4.9 m", a: "Main process trays" },
                  { c: "20A / 20B / 20C", l: "50 / 75 / 100 lb/ft", s: "20 ft / 6.1 m", a: "Heavy power cable, refinery main" },
                  { c: "24A / 24B / 24C", l: "50 / 75 / 100 lb/ft", s: "24 ft / 7.3 m", a: "High-load main / pipe-rack runs" },
                ].map((row) => (
                  <tr key={row.c} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{row.c}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.l}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.s}</td>
                    <td className="py-[13px] text-f15 text-t2">{row.a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[13px] text-f13 text-t3">
            Class numbers indicate maximum span between supports; A/B/C suffixes indicate uniformly distributed load capacity. Project specs typically reference 16C or 20C for main process trays.
          </p>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Cable Tray System Components</SectionTag>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Ladder Cable Tray", note: "Open-rung, 100/150/300/600 mm widths" },
              { name: "Solid-Bottom Tray", note: "Ventilated or solid, instrument cable runs" },
              { name: "Fittings", note: "Elbows, tees, crosses, reducers, dropouts" },
              { name: "Support Hardware", note: "Pultruded FRP support brackets, clamps" },
            ].map((p) => (
              <div key={p.name} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <h3 className="text-f15 font-bold text-t1">{p.name}</h3>
                <p className="mt-[5px] text-f13 leading-golden text-t2">{p.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-[34px] flex flex-wrap gap-[13px]">
            <LinkArrow href="/products/fiberglass-structural-shapes">FRP structural profiles for cable tray supports</LinkArrow>
            <LinkArrow href="/ai/sourcing">Free FRP Sourcing Assistant</LinkArrow>
            <LinkArrow href="/resources/blog/how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide">
              Buyer&rsquo;s guide: sourcing from China
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
              href="/products/custom-pultruded-profiles"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Custom Pultrusion Services</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">Custom FRP cable tray cross-sections, supports, and project-specific cable management profiles.</p>
            </Link>
            <Link
              href="/case-studies/water-treatment-cable-tray"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Case Study: Cable Tray in Process Service</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">Project-scale FRP cable tray and supports — installation, inspection, and 10-year service report.</p>
            </Link>
            <Link
              href="/industries/industrial"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Industrial / Petrochemical</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">Full FRP product family for chemical plant, refinery, and petrochemical service.</p>
            </Link>
          </div>
        </div>
      </section>

      <InnerCTA title="Request a CIF Jebel Ali or DAP UAE quote for FRP cable tray" />
    </>
  );
}
