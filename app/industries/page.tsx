import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import CoverCard from "@/components/ui/CoverCard";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { industries } from "@/content/data/industries";
import { industryCovers } from "@/lib/covers";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const faqs = [
  { question: "How do industries differ from applications?", answer: "Industries describe the project sector, such as water treatment or energy. Applications describe the component's use, such as cable supports or walkways. One profile may serve several sectors with different material and connection requirements." },
  { question: "Does an industry page describe a complete system supply?", answer: "No. Start with the profiles, grating or window products required. Confirm engineering, cutting, drilling, fittings and any assembly scope on the quotation; complete equipment, civil works and site installation are separate scopes." },
  { question: "How should I specify a product for my sector?", answer: "Provide the component drawing, service environment, loads and connections, quantity, required documents and destination. Use data for the offered section and material rather than assuming that every FRP product meets the same requirements." },
];

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Industrial Applications — Construction, Marine & Energy",
  description:
    "Explore FRP industrial applications in construction, infrastructure, energy, marine, process plants and vehicles, with sector-specific products and guidance.",
  path: "/industries",
  image: "/industries/opengraph-image",
});

// Why FRP is chosen in each sector, in the terms each industry page supports.
const reasons: Record<string, string> = {
  construction: "Thermal performance: glass FRP conducts about 0.3 W/m·K against about 160 for aluminum, so window and facade frames need no separate thermal break.",
  infrastructure: "Corrosion: FRP decks, handrails and cable supports do not rust, so they avoid steel's recoating cycle; the inspection plan is still set for each project.",
  energy: "Electrical insulation with corrosion resistance, for cable supports, substations and solar structures on coastal or humid sites.",
  marine: "Seawater: glass FRP does not rust, and a vinyl ester laminate with sealed cut edges suits splash and immersion.",
  industrial: "Chemicals: with the resin chosen for the chemicals on site, platforms, grating and supports avoid the corrosion and recoating of steel.",
  vehicle: "Weight and insulation: glass FRP weighs about a quarter as much as steel for the same volume and does not conduct; fire requirements are set part by part.",
  "water-wastewater": "Wet, chemically dosed service around treatment equipment, where cable supports, access frames and walkways would otherwise need repeated coating.",
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

      <PageSection
        id="sectors"
        title={`FRP industrial applications across ${industries.length === 7 ? "seven" : industries.length} sectors`}
        intro={`F1 Composite supplies pultruded fiberglass profiles to ${industries.length === 7 ? "seven" : industries.length} industries where corrosion, weight, electrical neutrality, or radio transparency drive the material decision. Each industry has its own qualification standards, procurement language, and typical failure modes; we publish the engineering and specification context for each so that procurement teams and engineers can move from concept to qualified supplier.`}
      >
        <ul className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <li key={industry.slug}>
              <CoverCard
                href={industry.href}
                cover={industryCovers[industry.href]}
                title={industry.title}
                text={industry.description}
                action="Explore the sector"
                priority={index < 3}
              />
            </li>
          ))}
          <li>
            <CoverCard
              href="/applications"
              cover={{ src: "/images/industries/industrial-plating-line-walkway.webp", alt: "Walkway with FRP grating and yellow handrails beside process tanks" }}
              title="Browse by application"
              text="Platforms, cooling towers, solar mounting, cable trays, bridges and agricultural stakes: start from the component's use."
              action="All applications"
            />
          </li>
        </ul>
      </PageSection>

      <PageSection id="why-frp" title="Why FRP, sector by sector" tone="muted" intro='The case for FRP is rarely "lighter than steel" alone. Every industry has a specific reason.'>
        <dl className="divide-y divide-border-default rounded-card border border-border-default bg-white px-[20px] sm:px-[24px]">
          {industries.map((industry) => (
            <div key={industry.slug} className="grid gap-[4px] py-[14px] md:grid-cols-[240px_minmax(0,1fr)] md:gap-[16px]">
              <dt>
                <Link href={industry.href} className="text-f16 font-bold text-t1 hover:text-teal-text">{industry.title}</Link>
              </dt>
              <dd className="text-f14 leading-golden text-t2">{reasons[industry.slug]}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection id="markets" title="Regional supplier pages" intro="For procurement teams in regions with local supplier compliance requirements.">
        <ul className="divide-y divide-border-default border-y border-border-default">
          {[
            { href: "/regions/frp-grating-supplier-saudi-arabia", label: "FRP Grating Supplier in Saudi Arabia", detail: "Aramco SAES-W-018, SABIC, ADNOC procurement" },
            { href: "/regions/pultruded-frp-solar-mounting-australia", label: "Pultruded FRP Solar Mounting in Australia", detail: "AS/NZS 1170, NCC, Clean Energy Council" },
            { href: "/regions/frp-cable-tray-uae-oil-gas", label: "FRP Cable Tray for UAE Oil & Gas", detail: "ADNOC, ESMA conformity, IECEx where applicable" },
          ].map((market) => (
            <li key={market.href}>
              <Link href={market.href} className="group flex flex-wrap items-baseline justify-between gap-x-[16px] gap-y-[2px] py-[12px]">
                <span className="text-f16 font-semibold text-t1 group-hover:text-teal-text">{market.label}</span>
                <span className="text-f14 text-t3">{market.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/regions" className="mt-[14px] inline-block text-f14 font-semibold text-teal-text underline underline-offset-4 hover:text-teal">All global markets</Link>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Product families for every sector",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/fiberglass-structural-shapes", label: "Standard structural profiles" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusion services" },
              { href: "/products/frp-window-frames", label: "FRP window frames" },
              { href: "/products/frp-gratings", label: "Pultruded FRP grating" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
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
              { href: "/case-studies", label: "Selected supply projects" },
              { href: "/resources/blog", label: "Engineering blog" },
              { href: "/resources/design-guides", label: "Design guides" },
              { href: "/resources/technical-data", label: "Data sheets" },
              { href: "/ask", label: "Ask the AI engineering assistant" },
            ],
          },
        ]}
      />

      <InnerCTA title="Not sure which FRP solution fits your project?" />
    </>
  );
}
