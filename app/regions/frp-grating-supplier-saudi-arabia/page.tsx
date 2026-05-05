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
  "FRP Grating Supplier in Saudi Arabia — Pultruded Fiberglass Gratings for Aramco, SABIC & Petrochemical Plants";
const pageDescription =
  "FRP grating supplier and direct-from-China factory for Saudi Arabia. Vinyl ester pultruded and moulded fiberglass gratings for Aramco, SABIC, Maaden, and Royal Commission projects. Jebel Ali / Dammam port delivery, ASTM E84 fire-rated, anti-slip, EN 13706.";
const pagePath = "/regions/frp-grating-supplier-saudi-arabia";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Why is FRP grating preferred over galvanized steel in Saudi petrochemical plants?",
    answer:
      "Saudi petrochemical and oil refining environments combine 50°C+ ambient temperatures, salt-laden coastal air on the Eastern Province coast, and chemical splash exposure (sulphuric acid, caustic, hydrocarbons). Galvanized steel gratings in this combined service typically last 5–8 years before requiring full replacement. Vinyl ester pultruded FRP gratings deliver 25-year design life with zero coating maintenance, which removes the largest single category of plant maintenance cost on grated walkways and access platforms. Aramco, SABIC, and Maaden have used FRP gratings on capital projects for over 15 years; the qualification has been done.",
  },
  {
    question: "Which FRP grating standards do Saudi EPC contractors typically specify?",
    answer:
      "The standards stack typically referenced on Saudi project specifications: ASTM E84 (Class 1 / Class A flame spread, FSI ≤ 25), EN 13501-1 (B-s1,d0 where European standards apply), ASTM F3125/F3125M for slip resistance, ASTM D635 for self-extinguishing behaviour, and project-specific Aramco SAES-Q-005 / SAES-S-070 for materials in oily/chemical service. F1 Composite supplies grating to all of these standards from vinyl ester resin formulations qualified for the Aramco vendor list pathway.",
  },
  {
    question: "What are the lead times to Jebel Ali, Dammam, or Jeddah port from China?",
    answer:
      "Sea freight from Shanghai or Ningbo to Jebel Ali (UAE — most common transhipment port for Saudi Arabia) runs 18–25 days. Direct sailings to Dammam and Jeddah are available but with less frequency, typically 22–32 days. For project-critical Saudi orders, F1 Composite typically ships CIF Jebel Ali or DAP project-site, with inland trucking via the GCC road network (1–3 days from Jebel Ali to Riyadh, Jubail, Yanbu, or Ras Tanura). Total PO-to-site for stock standard FRP gratings is 6–9 weeks; custom panel sizes add 2–3 weeks for fabrication.",
  },
  {
    question: "Can FRP gratings handle 65°C+ desert summer surface temperatures?",
    answer:
      "Yes. Vinyl ester FRP gratings retain over 90% of their structural properties at 65°C continuous service temperature. Heat distortion temperature for vinyl ester FRP exceeds 110°C — well above any realistic Saudi outdoor surface temperature, even with solar gain on dark grating colours. The thermal expansion coefficient of FRP is approximately 1/3 that of aluminium, so thermal cycling does not generate the gap-and-buckling problems seen on aluminium grating in the same desert service. UV-stabilised resin systems and synthetic surfacing veils prevent surface degradation under 25+ years of Saudi solar exposure.",
  },
  {
    question: "What grating sizes and load ratings are most commonly ordered for Saudi projects?",
    answer:
      "The most common spec on Saudi petrochemical and infrastructure projects is moulded FRP grating, 38 × 38 mm mesh, 38 mm or 50 mm thick, vinyl ester resin, with concave anti-slip surface. Standard panel sizes are 1220 × 3660 mm (4' × 12') and 1500 × 4000 mm. Load ratings of 500 kN/m² (uniformly distributed) and 4.5 kN concentrated wheel load cover most maintenance vehicle access requirements. For higher loads — pipe-rack support, heavy maintenance access — pultruded FRP grating in 38 mm or 50 mm I-bar configuration is specified.",
  },
  {
    question: "Does F1 Composite handle Aramco vendor approval and project documentation?",
    answer:
      "F1 Composite supplies project documentation packages aligned with Aramco SAEP / SAES requirements: Mill Test Certificates per ASTM D790 / D638, third-party test reports for fire and chemical resistance, ISO 9001:2015 quality system certification, country-of-origin certificates, and full traceability from raw material batch to finished grating panel. For Aramco direct-vendor qualification, we work through approved Saudi distributors and project EPC partners (SNC-Lavalin Arabia, KBR Arabian, and several local contractors). For SABIC and Maaden projects, direct-vendor relationships are established.",
  },
];

export default function SaudiGratingPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    about: {
      "@type": "Thing",
      name: "FRP grating supply for Saudi Arabia petrochemical and infrastructure projects",
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
    name: "FRP Gratings for Saudi Arabia — Pultruded & Moulded Fiberglass",
    description: pageDescription,
    url: absoluteUrl(pagePath),
    image: [absoluteUrl("/images/industries/frp-industrial-chemical-plant-facility.jpg")],
    brand: { "@type": "Brand", name: "F1 Composite" },
    manufacturer: {
      "@id": "https://www.f1composite.com/#organization",
      "@type": "Organization",
      name: "F1 Composite",
    },
    category: "Pultruded FRP Gratings",
    offers: {
      "@type": "AggregateOffer",
      url: absoluteUrl("/contact"),
      priceCurrency: "USD",
      lowPrice: "35",
      highPrice: "90",
      offerCount: "20",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      eligibleRegion: { "@type": "Country", name: "Saudi Arabia" },
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
        tag="Saudi Arabia"
        title="FRP Grating Supplier for Saudi Arabia"
        description="Direct-from-factory pultruded and moulded fiberglass gratings for Aramco, SABIC, Maaden, and Royal Commission projects. Vinyl ester resin, ASTM E84 fire-rated, anti-slip surface, full project documentation. CIF Jebel Ali or DAP project-site delivery."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Regions", href: "/regions/frp-grating-supplier-saudi-arabia" },
          { label: "Saudi Arabia — FRP Grating" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/industries/frp-industrial-chemical-plant-facility.jpg"
              alt="FRP grating in Saudi Arabia petrochemical plant — corrosion-resistant fiberglass gratings"
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
          <SectionTag>Why Saudi Specifiers Use FRP</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Built for the combined service environment of the Saudi East Coast and inland petrochemical complexes
          </h2>
          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                The Eastern Province of Saudi Arabia — Jubail, Ras Tanura, Dammam, Khobar — runs the most aggressive combined-corrosion environment in industrial infrastructure: 50°C+ ambient summer temperatures, Gulf salt-laden coastal air, and continuous chemical splash exposure across petrochemical, refining, fertilizer, and aluminium primary metal production. Galvanized steel grating in this service typically requires full replacement every 5–8 years; carbon steel grating with paint coatings requires recoating cycles every 3–5 years.
              </p>
              <p>
                Pultruded FRP grating in vinyl ester resin removes both maintenance cycles. The grating is structurally inert to salt-laden air, chemical splash, and 65°C surface temperatures. F1 Composite has supplied FRP grating to Aramco, SABIC, and Maaden capital projects across all five major Saudi industrial zones. The qualification path is established; the grating performance in service is documented across 15+ years of installed base.
              </p>
            </div>
            <div className="space-y-[21px] text-f15 leading-golden text-t2">
              <p>
                Direct-from-China factory pricing typically delivers 30–50% landed-cost savings versus regional Saudi distributors of US/EU FRP grating — without compromising on standards compliance. F1 Composite ships CIF Jebel Ali (the most common transhipment port for Saudi-bound cargo) or DAP project-site directly to Jubail, Yanbu, Ras Tanura, Riyadh, or Royal Commission destinations.
              </p>
              <p>
                Project documentation is supplied as a complete package: Mill Test Certificates per batch, ISO 9001:2015 quality system, ASTM and EN test reports for fire and chemical resistance, country-of-origin certificates, and full traceability from glass fibre raw material through finished panel. The package aligns with Aramco SAEP review and SABIC project QA requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Saudi-Spec Reference</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            Common grating specifications for Saudi petrochemical and infrastructure projects
          </h2>
          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-border-default">
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Application</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Grating Type</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Mesh × Thickness</th>
                  <th className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">Resin</th>
                  <th className="py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">Finish</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { app: "Walkway / catwalk", type: "Moulded", mesh: "38×38 × 38 mm", resin: "Vinyl ester", finish: "Concave + grit" },
                  { app: "Maintenance access platform", type: "Moulded", mesh: "38×38 × 50 mm", resin: "Vinyl ester", finish: "Concave + grit" },
                  { app: "Pipe-rack support / heavy load", type: "Pultruded I-bar", mesh: "25 mm pitch × 38 mm", resin: "Vinyl ester", finish: "Grit top" },
                  { app: "Trench cover / drainage", type: "Moulded", mesh: "38×38 × 25 mm", resin: "Polyester", finish: "Concave" },
                  { app: "Acid splash zone", type: "Moulded", mesh: "38×38 × 38 mm", resin: "Premium vinyl ester", finish: "Grit + veil" },
                  { app: "Stair tread", type: "Pultruded", mesh: "38 mm depth", resin: "Vinyl ester", finish: "Yellow nosing + grit" },
                ].map((row) => (
                  <tr key={row.app} className="border-b border-border-default">
                    <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1">{row.app}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.type}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.mesh}</td>
                    <td className="py-[13px] pr-[21px] text-f15 text-t2">{row.resin}</td>
                    <td className="py-[13px] text-f15 text-t2">{row.finish}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[13px] text-f13 text-t3">
            Custom mesh sizes, panel cuts, banding details, and load-rated configurations are quoted from drawing.
          </p>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Logistics</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
            China factory → Saudi project site
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "RFQ → Quote in 48 hours",
                body: "Send drawing or panel layout, target quantity, application/environment, and delivery terms. F1 Composite returns full FOB / CIF / DAP pricing with documentation list.",
              },
              {
                step: "2",
                title: "Manufacturing — 4–6 weeks",
                body: "Production at one of 5 F1 Composite bases, with batch-traceable Mill Test Certificates and third-party fire/chemical test reports as required.",
              },
              {
                step: "3",
                title: "Sea freight to Jebel Ali — 18–25 days",
                body: "CIF Jebel Ali is the most common Incoterm; DAP Riyadh / Jubail / Ras Tanura via GCC road network adds 1–3 days inland.",
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
            <LinkArrow href="/products/gratings">Browse all FRP grating products</LinkArrow>
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
              href="/industries/industrial"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Industrial & Petrochemical</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">FRP for chemical plant platforms, pipe racks, and process facilities.</p>
            </Link>
            <Link
              href="/case-studies/chemical-plant-platform"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">Case Study: Chemical Plant Platform</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">FRP grating and structural framing in continuous chemical splash service.</p>
            </Link>
            <Link
              href="/technology/frp-vs-steel-gratings"
              className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-all hover:-translate-y-[2px] hover:border-teal-border"
            >
              <h3 className="text-f15 font-bold text-t1">FRP vs Steel Gratings</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">30-year lifecycle cost comparison: FRP vs galvanized steel grating.</p>
            </Link>
          </div>
        </div>
      </section>

      <InnerCTA title="Need FRP grating quoted CIF Jebel Ali or DAP Saudi project-site?" />
    </>
  );
}
