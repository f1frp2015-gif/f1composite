import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { industries } from "@/content/data/industries";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Industries Served — FRP Profiles for Construction, Marine & Energy",
  description:
    "Pultruded FRP profiles for construction, infrastructure, energy, marine, industrial, and vehicle sectors. Corrosion-resistant fiberglass solutions replacing steel and aluminium worldwide.",
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
        title="FRP Solutions for Every Sector"
        description="Fiber-reinforced polymer profiles deliver measurable advantages across industries where corrosion resistance, lightweight strength, and design longevity matter most."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries" },
        ]}
      />

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
              { href: "/products/standard-profiles", label: "Standard structural profiles" },
              { href: "/products/custom-pultrusions", label: "Custom pultrusion services" },
              { href: "/products/fenestration-systems", label: "FRP window frames" },
              { href: "/products/gratings", label: "FRP gratings & deck panels" },
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

      <InnerCTA title="Not sure which FRP solution fits your project?" />
    </>
  );
}
