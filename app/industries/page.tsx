import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import { industries } from "@/content/data/industries";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const faqs = [
  {
    question: "Which industry has the longest project lead time, and why?",
    answer:
      "Construction (fenestration) and Infrastructure (bridge deck) typically run 6-12 months because of mock-up testing and code-stamping requirements. Industrial process equipment can ship in 6-10 weeks once resin is qualified.",
  },
  {
    question: "Which standards apply to which industry?",
    answer:
      "Construction: AS 2047, PHI, NFRC. Infrastructure: AASHTO, ASCE Pre-Standard, EN 13706. Energy: AS/NZS 1170, IEC 61730, IBC. Marine: IMO, ISO 12215, ABS. Industrial: customer-specific (Aramco SAES-W-018, SABIC PSPC, ADNOC). Vehicle: OEM-specific.",
  },
  {
    question: "Do you have references in my industry?",
    answer:
      "Yes for all six industries above; deployment scale varies. Industry-specific reference lists are available on request — inquiry@f1composite.com.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Industrial Applications — Construction, Marine & Energy",
  description:
    "Explore FRP industrial applications in construction, infrastructure, energy, marine, process plants and vehicles, with sector-specific products and guidance.",
  path: "/industries",
  image: "/industries/opengraph-image",
});

const icons: Record<string, React.ReactNode> = {
  building: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0v-2M5 21H3m2 0v-2m4-14h2m-2 4h2m4-4h2m-2 4h2" />
    </svg>
  ),
  bridge: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 10v4m4-4v4m4-4v4" />
    </svg>
  ),
  bolt: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  anchor: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8a2 2 0 100-4 2 2 0 000 4zm0 0v12m-7-4a7 7 0 0014 0M5 12H3m18 0h-2" />
    </svg>
  ),
  factory: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 21V8l4 3V3h4v8l4-3v13m2-10v10m3-7v7" />
    </svg>
  ),
  vehicle: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h.01M16 17h.01M3 11l1.5-5A2 2 0 016.4 4h11.2a2 2 0 011.9 1.4L21 11M3 11h18M3 11v6a1 1 0 001 1h1a2 2 0 104 0h6a2 2 0 104 0h1a1 1 0 001-1v-6" />
    </svg>
  ),
};

export default function IndustriesPage() {
  const industriesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "F1 Composite Industry Solutions",
    url: absoluteUrl("/industries"),
    hasPart: industries.map((industry) => ({
      "@type": "WebPage",
      name: industry.title,
      description: industry.description,
      url: absoluteUrl(industry.href),
    })),
  };

  return (
    <>
      <JsonLd data={industriesSchema} />
      <PageHeader
        tag="Industries"
        title="FRP industrial applications by sector"
        description="Fiber-reinforced polymer profiles deliver measurable advantages across industries where corrosion resistance, lightweight strength, and design longevity matter most."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries" },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Industries Served by Pultruded FRP</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            FRP industrial applications across six sectors
          </h2>
          <div className="mt-[13px] space-y-[21px] text-f17 leading-golden text-t2">
            <p>
              F1 Composite supplies pultruded fiberglass profiles to six industries where corrosion, weight, electrical neutrality, or radio transparency drive the material decision. Each industry has its own qualification standards, procurement language, and typical failure modes — we publish the engineering and specification context for each so that procurement teams and engineers can move from concept to qualified supplier without re-discovering the wheel.
            </p>
            <p>
              The case for FRP is rarely &quot;lighter than steel&quot; alone — every industry has a specific reason. <strong>Construction</strong>: thermal break (FRP frames have 1/200th the thermal conductivity of aluminum), making them the structural choice for passive house and high-performance fenestration. <strong>Infrastructure</strong>: lifecycle cost — a 50-year service life with no recoating eliminates roughly $15-25/m² per year of maintenance cost on rail and marine cable trays. <strong>Energy</strong>: corrosion resistance in coastal salt-spray environments where aluminum pits and steel needs continuous coating renewal. <strong>Marine</strong>: corrosion resistance plus dimensional stability under sustained UV and salt exposure. <strong>Industrial</strong>: chemical resistance — the scenario where FRP wins outright is when the alternative is exotic alloys (Hastelloy, duplex stainless) priced at 5-10× FRP. <strong>Vehicle</strong>: weight reduction directly translates to fuel economy or payload capacity, plus electrical isolation in hybrid powertrains.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={industry.href}
                className="group relative block rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
              >
                <div className="card-topbar absolute inset-x-0 top-0 rounded-t-[8px]" />
                <div className="mb-[13px] flex h-[36px] w-[36px] items-center justify-center rounded-[6px] bg-teal-bg">
                  {icons[industry.icon]}
                </div>
                <h3 className="mb-[8px] text-[17px] font-bold text-t1">
                  {industry.title}
                </h3>
                <p className="text-f13 leading-golden text-t2">
                  {industry.description}
                </p>
                <span className="mt-[13px] block text-f13 font-semibold text-teal-text opacity-0 transition-opacity duration-[0.34s] group-hover:opacity-100">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Product families for every sector",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/fiberglass-structural-shapes", label: "Standard structural profiles" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusion services" },
              { href: "/products/frp-window-frames", label: "FRP window frames" },
              { href: "/products/frp-gratings", label: "Pultruded FRP gratings & deck panels" },
              { href: "/products/molded-frp-grating", label: "Molded FRP grating" },
            ],
          },
          {
            title: "Technical reference",
            links: [
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel / aluminum" },
              { href: "/technology/pultrusion-process", label: "Pultrusion process" },
              { href: "/technology/quality-testing", label: "Quality testing (EN 13706 / ASTM)" },
            ],
          },
          {
            title: "Proof & resources",
            links: [
              { href: "/case-studies", label: "Case studies in 30+ countries" },
              { href: "/resources/blog", label: "Engineering blog" },
              { href: "/resources/design-guides", label: "Design guides" },
              { href: "/resources/technical-data", label: "Data sheets" },
              { href: "/ask", label: "Ask the AI engineering assistant" },
            ],
          },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Regional Supplier Pages</SectionTag>
          <div className="mt-[21px] space-y-[21px] text-f17 leading-golden text-t2">
            <p>For procurement teams in regions with local supplier compliance requirements:</p>
            <ul className="list-disc space-y-[8px] pl-[21px]">
              <li>
                <Link href="/regions/frp-grating-supplier-saudi-arabia" className="text-teal-text hover:underline">
                  FRP Grating Supplier in Saudi Arabia
                </Link>{" "}
                — Aramco SAES-W-018, SABIC, ADNOC procurement
              </li>
              <li>
                <Link href="/regions/pultruded-frp-solar-mounting-australia" className="text-teal-text hover:underline">
                  Pultruded FRP Solar Mounting in Australia
                </Link>{" "}
                — AS/NZS 1170, NCC, Clean Energy Council
              </li>
              <li>
                <Link href="/regions/frp-cable-tray-uae-oil-gas" className="text-teal-text hover:underline">
                  FRP Cable Tray for UAE Oil &amp; Gas
                </Link>{" "}
                — ADNOC, ESMA conformity, IECEx where applicable
              </li>
            </ul>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <InnerCTA title="Not sure which FRP solution fits your project?" />
    </>
  );
}
