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
  "FRP Cable Tray Supplier in UAE — Pultruded Fiberglass Cable Tray for ADNOC, DUSUP & Oil & Gas";
const pageDescription =
  "FRP cable tray supplier in the UAE — direct from China factory. Pultruded fiberglass cable trays and ladders for ADNOC, DUSUP, Emirates Steel, and oil & gas projects. NEMA VE-1 / IEC 61537 compliant, 25-year H₂S/sour-service durability, Jebel Ali / Khalifa Port delivery.";
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
      "UAE oil and gas service combines three corrosion drivers that destroy galvanized steel cable tray within 8–12 years: (1) coastal salt-laden air across Abu Dhabi, Dubai, Ras Al Khaimah, and Fujairah operations; (2) sour-service H₂S and CO₂ exposure on upstream and midstream assets; (3) chemical splash and oil-mist contamination on process platforms. FRP cable tray is fundamentally inert to all three. NEMA VE-1 and IEC 61537 qualified pultruded FRP cable tray delivers 25+ year design life with zero coating maintenance — versus galvanized steel cable tray that typically requires partial or full replacement within the asset's first major shutdown cycle.",
  },
  {
    question: "Which standards do ADNOC and UAE EPC contractors specify for FRP cable tray?",
    answer:
      "The standards stack typically referenced: NEMA VE-1 (load classification 8A through 24C), IEC 61537 (cable tray and cable ladder systems), ASTM E84 (Class 1 / Class A flame spread), UL 568 / cUL listing for indoor / hazardous-location applications, and project-specific ADNOC AGES-PH-04-001 or DUSUP material selection criteria for cable management in process areas. F1 Composite supplies FRP cable tray to all of these standards in vinyl ester or premium isophthalic polyester resin, with batch Mill Test Certificates and third-party fire and chemical test reports as required.",
  },
  {
    question: "What FRP cable tray cross-sections and load classes are most commonly ordered for UAE projects?",
    answer:
      "The most common order pattern for UAE oil & gas projects: pultruded FRP ladder-type cable tray, 100 mm / 150 mm / 300 mm / 600 mm widths, 100 mm or 150 mm depth, NEMA Class 16C or 20C load rating, vinyl ester resin, with 6 m or 12 m straight lengths plus matching elbows, tees, crosses, and reducers. Solid-bottom ventilated cable tray is specified where smaller-diameter instrument cables run. Cable ladders are preferred over solid-bottom in process areas to allow oil and water drainage. Premium projects (offshore, sour-service onshore) specify vinyl ester or polyurethane resin matrix; less aggressive service uses isophthalic polyester.",
  },
  {
    question: "How does FRP cable tray weight reduction affect installation cost on UAE process plants?",
    answer:
      "Pultruded FRP cable tray weighs approximately 50% of equivalent galvanized steel cable tray and 70% of aluminium cable tray at the same load class. On a typical UAE process platform with 2,000+ linear meters of cable tray, this is 8–12 tonnes of weight reduction. The installation impact is direct: longer span between supports (5 m typical for FRP vs 3 m for steel), faster manual installation (2-person lift versus mechanical lift for many sizes), reduced support steel quantity, and reduced rigging requirements. Total installed cost is typically 10–18% below galvanized steel for medium-to-large project quantities, even with FRP material cost being higher per linear meter.",
  },
  {
    question: "Does FRP cable tray meet UAE Civil Defence fire safety requirements?",
    answer:
      "Yes. F1 Composite FRP cable tray is supplied with ASTM E84 Class 1 / Class A flame spread (FSI ≤ 25, smoke developed ≤ 450) using fire-retardant resin formulations. Higher-performance fire-rated grades meet EN 13501-1 B-s1,d0 and BS 476 Part 7 Class 1 for projects requiring full European or UK fire spec compliance. UAE Civil Defence (DCD / Abu Dhabi CD) generally accepts the ASTM E84 Class 1 specification for non-life-safety installations and the EN 13501-1 B-s1,d0 specification for buildings and life-safety routes. Fire performance certificates are supplied with each shipment.",
  },
  {
    question: "What lead times and ports apply for UAE oil and gas FRP cable tray orders?",
    answer:
      "Sea freight from Shanghai or Ningbo to Jebel Ali (Dubai) runs 18–22 days; to Khalifa Port (Abu Dhabi) and Mussafah Port runs 19–24 days; to Mina Zayed and Khor Fakkan are also direct-callable. F1 Composite typically quotes CIF Jebel Ali for project staging in Dubai/Sharjah operations and DAP project-site for ADNOC/Onshore destinations. Stock cable tray ships in 5–7 weeks PO-to-port; project-spec custom widths or coatings add 2–4 weeks. Container forecasting begins 6–8 weeks before installation start to avoid Jebel Ali storage costs on multi-container project orders.",
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
    name: "Pultruded FRP Cable Tray for UAE Oil & Gas",
    description: pageDescription,
    url: absoluteUrl(pagePath),
    image: [absoluteUrl("/images/blog/frp-electrical-insulation-substation.jpg")],
    brand: { "@type": "Brand", name: "F1 Composite" },
    manufacturer: {
      "@id": "https://www.f1composite.com/#organization",
      "@type": "Organization",
      name: "F1 Composite",
    },
    category: "Pultruded FRP Cable Tray",
    offers: {
      "@type": "AggregateOffer",
      url: absoluteUrl("/contact"),
      priceCurrency: "USD",
      lowPrice: "12",
      highPrice: "85",
      offerCount: "25",
      availability: "https://schema.org/InStock",
      eligibleRegion: { "@type": "Country", name: "United Arab Emirates" },
      seller: {
        "@id": "https://www.f1composite.com/#organization",
        "@type": "Organization",
        name: "F1 Composite",
      },
    },
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
        tag="UAE / Oil & Gas"
        title="FRP Cable Tray Supplier for UAE Oil & Gas"
        description="Pultruded fiberglass cable trays and ladders for ADNOC, DUSUP, Emirates Steel, and onshore/offshore oil & gas operations. NEMA VE-1 / IEC 61537 / ASTM E84 compliant, vinyl ester resin for sour-service durability, CIF Jebel Ali or DAP project-site delivery."
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
              src="/images/blog/frp-electrical-insulation-substation.jpg"
              alt="FRP cable tray for UAE oil and gas project — corrosion-resistant pultruded fiberglass cable management"
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
          <SectionTag>UAE Oil & Gas Service Reality</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Coastal salt + sour service + chemical splash — the three failure modes galvanized cable tray cannot survive
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                ADNOC Onshore, ADNOC Offshore, ADNOC Refining, ADNOC Gas, and the broader DUSUP / Emirates Steel / Borouge UAE industrial network operate cable management infrastructure across the harshest combined-corrosion environment in the global oil and gas industry. The physical service reality: 45–50°C summer ambient, Gulf coastal salt-laden air, episodic H₂S and CO₂ in sour-service operations, and chemical splash and oil-mist contamination across process platforms.
              </p>
              <p>
                Galvanized steel cable tray in this combined service typically reaches end-of-life within 8–12 years. The dominant failure mode is sacrificial zinc consumption at the splash zone followed by accelerated steel corrosion at galvanic discontinuities — most often at field-cut ends and field-welded supports where galvanizing was never properly restored. Replacement campaigns are operationally expensive: shutdown windows, scaffold access, hot-work permits, and crew mobilisation.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Pultruded FRP cable tray in vinyl ester resin is fundamentally inert to all three corrosion drivers. The 25-year design life is documented across UAE installed base going back to early 2000s ADNOC projects. Maintenance is limited to dust removal during scheduled shutdowns; structural inspection has no findings on cable tray that has been in continuous splash-zone service for over 20 years.
              </p>
              <p>
                F1 Composite supplies FRP cable tray to NEMA VE-1, IEC 61537, ASTM E84 Class 1, and project-specific ADNOC AGES standards directly from China factory. CIF Jebel Ali is the most common Incoterm for staging in Dubai/Sharjah operations; DAP project-site is preferred for ADNOC Onshore (Habshan, Bab, Bu Hasa), ADNOC Refining (Ruwais), and offshore operations via Mussafah Port logistics.
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
                  { c: "16A / 16B / 16C", l: "50 / 75 / 100 lb/ft (74 / 112 / 149 kg/m)", s: "16 ft / 4.9 m", a: "ADNOC/DUSUP main process trays" },
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
            <LinkArrow href="/products/standard-profiles">FRP structural profiles for cable tray supports</LinkArrow>
            <LinkArrow href="/ai/sourcing">Free FRP Sourcing Assistant</LinkArrow>
            <LinkArrow href="/resources/blog/how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide">
              Buyer&rsquo;s guide: sourcing from China
            </LinkArrow>
          </div>

          <FAQ items={faqs} suppressSchema />
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <div className="mt-[21px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/products/custom-pultrusions"
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

      <InnerCTA title="Need FRP cable tray quoted CIF Jebel Ali or DAP UAE project-site?" />
    </>
  );
}
