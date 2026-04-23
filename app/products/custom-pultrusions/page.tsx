import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductSchema, absoluteUrl } from "@/lib/seo";

const pageTitle = "Custom Pultrusion Services — Bespoke Fiberglass Profiles";
const pageDescription =
  "Custom pultruded FRP profiles engineered to your specifications. Cross-sections up to 600×300mm, E-glass, carbon, aramid fibers. In-house die design, 4-8 week tooling, 500m MOQ. Get a quote.";
const pagePath = "/products/custom-pultrusions";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/custom-pultrusions/opengraph-image",
});

const processSteps = [
  {
    number: "01",
    title: "Inquiry & Feasibility",
    duration: "1–3 days",
    brief: "Share your geometry, loads, and environment. We assess pultrudability and propose optimizations.",
  },
  {
    number: "02",
    title: "Engineering & Simulation",
    duration: "5–10 days",
    brief: "Fiber architecture design, FEA validation, resin selection, and quality plan definition.",
  },
  {
    number: "03",
    title: "Tooling Manufacture",
    duration: "4–8 weeks",
    brief: "CNC-machined steel dies, guide plates, and preformers — all designed and built in-house.",
  },
  {
    number: "04",
    title: "Trial & Validation",
    duration: "1–2 weeks",
    brief: "Production-grade trial run with full mechanical testing. You approve before we proceed.",
  },
  {
    number: "05",
    title: "Production & Delivery",
    duration: "Ongoing",
    brief: "Series production with batch testing and certificates. Tooling stored for repeat orders.",
  },
];

const capabilities = {
  dimensions: [
    { label: "Maximum cross-section", value: "600 \u00D7 300 mm" },
    { label: "Minimum wall thickness", value: "1.5 mm" },
    { label: "Maximum wall thickness", value: "30 mm" },
    { label: "Maximum profile length", value: "14 m (standard), custom lengths on request" },
    { label: "Dimensional tolerance", value: "\u00B10.25 mm typical" },
  ],
  matrix: {
    fiber: [
      { name: "E-Glass Fiber", note: "Standard. Best strength-to-cost ratio." },
      { name: "Carbon Fiber", note: "Ultra-high modulus and strength." },
      { name: "Basalt Fiber", note: "Superior heat and chemical resistance." },
      { name: "Carbon-Glass Hybrid", note: "Balanced stiffness, weight, and cost." },
    ],
    resin: [
      { name: "Unsaturated Polyester", note: "Cost-effective general-purpose." },
      { name: "Vinyl Ester", note: "Superior chemical resistance." },
      { name: "Epoxy", note: "Highest mechanical performance." },
      { name: "Polyurethane", note: "High toughness and transverse strength." },
    ],
    surface: [
      { name: "Glass Surface Veil", note: "Smooth finish, UV + corrosion barrier." },
      { name: "Woven Glass Fabric", note: "Multi-axial strength, impact resistance." },
      { name: "Combination Mat", note: "Roving + CSM in one ply, balanced properties." },
      { name: "Carbon Fiber Mat", note: "Conductive surface, EMI shielding." },
    ],
    coating: [
      { name: "Fluorocarbon (PVDF)", note: "20+ year UV and weather resistance." },
      { name: "Powder Coating", note: "Durable color finish, RAL options." },
      { name: "Film Lamination", note: "Wood-grain, marble, or custom patterns." },
      { name: "Weather-Resistant (No Coat)", note: "Built-in UV stability, zero maintenance." },
    ],
  },
};

const faqItems = [
  {
    question: "How much does custom pultrusion tooling cost?",
    answer:
      "Tooling costs depend on the complexity and size of the cross-section. Simple single-cavity dies for small profiles start at approximately USD 5,000 to 8,000, while large or complex multi-cavity dies can range from USD 15,000 to 40,000. Tooling is a one-time investment that we maintain and store at our facility for the life of the product. For high-volume programs, the tooling cost per linear meter becomes negligible within the first production run.",
  },
  {
    question: "What is the minimum order quantity for custom profiles?",
    answer:
      "The minimum order quantity for a first production run is typically 500 linear meters, which is the minimum length required to validate process parameters and ensure consistent quality across the batch. Repeat orders can be as low as 200 linear meters. For prototype or development quantities below these thresholds, we offer trial run packages that include a limited quantity of validated profile along with full mechanical test data.",
  },
  {
    question: "Can you match an existing steel or aluminum cross-section?",
    answer:
      "Yes. We routinely design pultruded FRP profiles as direct replacements for steel and aluminum sections. However, a direct dimensional copy is rarely the optimal approach. Because FRP has different mechanical properties than metals, particularly a lower elastic modulus, we typically recommend modifications to the cross-section geometry such as increased moment of inertia, thicker flanges, or additional internal stiffening ribs that optimize the profile for FRP-specific behavior while maintaining the same connection and envelope dimensions.",
  },
  {
    question: "What lead time should we expect from inquiry to first delivery?",
    answer:
      "For a new custom profile with no existing tooling, the typical lead time from approved design to first delivery is 6 to 10 weeks. This includes tooling manufacture (4-8 weeks), trial run and validation (1-2 weeks), and production of the first order (1-2 weeks). We can compress this timeline for urgent projects by running parallel workstreams, though expedited fees may apply. Repeat orders with existing tooling typically ship within 2 to 4 weeks.",
  },
];

export default function CustomPultrusionsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom fiberglass pultrusion services",
    name: "Custom Pultrusion Services",
    description:
      "End-to-end custom pultruded FRP profile design, tooling, and production — cross-sections up to 600×300 mm, tolerances per EN 13706 / ASTM D3917, MOQ 500 m first run / 200 m repeat.",
    url: absoluteUrl(pagePath),
    provider: {
      "@id": `https://www.f1composite.com/#organization`,
    },
    areaServed: [
      { "@type": "Continent", name: "Europe" },
      { "@type": "Continent", name: "North America" },
      { "@type": "Continent", name: "Asia" },
      { "@type": "Continent", name: "Oceania" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Custom pultrusion capabilities",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cross-section design and FEA validation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "In-house steel die manufacturing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pilot production and sample approval",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Series production with EN 13706 / ASTM D3917 QA",
          },
        },
      ],
    },
    termsOfService: absoluteUrl("/terms"),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd
        data={buildProductSchema({
          name: "Custom Pultruded FRP Profiles",
          description: pageDescription,
          path: pagePath,
          image: "/images/products/custom-profiles-overview.png",
          category: "Custom Pultruded FRP Profiles",
          material: [
            "E-glass fiber",
            "S-glass fiber",
            "Carbon fiber",
            "Basalt fiber",
            "Aramid fiber",
            "Polyester resin",
            "Vinyl ester resin",
            "Epoxy resin",
            "Phenolic resin",
          ],
          additionalProperty: [
            { name: "Maximum cross-section", value: "600 × 300 mm" },
            { name: "Minimum wall thickness", value: "1.5 mm" },
            { name: "Minimum order quantity", value: "500 m first run / 200 m repeat" },
            { name: "Typical tooling lead time", value: "3–6 weeks" },
          ],
        })}
      />
      <PageHeader
        tag="Custom Pultrusions"
        title="Bespoke FRP Profiles Engineered to Your Specification"
        description="Over 800 custom FRP geometries delivered — cross-sections up to 600×300 mm, walls as fine as 1.5 mm, in E-glass, carbon, basalt, or aramid fibers with polyester, vinyl ester, epoxy, or polyurethane resins. Dedicated tooling, validated mechanical performance."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Custom Pultrusions" },
        ]}
      />

      {/* Engineering Drawing */}
      <section className="bg-white py-[13px]">
        <div className="mx-auto max-w-[800px] px-[34px]">
          <Image
            src="/images/products/custom-frp-profile-engineering-drawing-3d-render.jpg"
            alt="Custom pultruded FRP profile with engineering drawing and dimensional tolerances"
            width={800}
            height={555}
            sizes="(max-width: 800px) 100vw, 800px"
            className="h-auto w-full"
            priority
          />
        </div>
      </section>



      {/* 5-Step Process */}
      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Development Process</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            From inquiry to production in five stages
          </h2>

          {/* Flow chart - horizontal on desktop, vertical on mobile */}
          <div className="mt-[34px] grid gap-[13px] sm:grid-cols-5">
            {processSteps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="absolute right-0 top-[22px] hidden h-[2px] w-[13px] translate-x-[13px] bg-teal/40 sm:block" />
                )}
                {/* Number circle */}
                <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-teal text-f15 font-extrabold text-white">
                  {step.number}
                </span>
                {/* Content */}
                <h3 className="mt-[8px] text-f15 font-bold text-t1">{step.title}</h3>
                <span className="mt-[3px] text-f11 font-semibold uppercase tracking-wide text-teal-text">{step.duration}</span>
                <p className="mt-[5px] text-f13 leading-golden text-t2">{step.brief}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Specs */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Capabilities</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Manufacturing specifications
          </h2>

          {/* Dimensional Capabilities */}
          <div className="mt-[34px]">
            <h3 className="mb-[13px] text-[17px] font-bold text-t1">Dimensional range</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <tbody>
                  {capabilities.dimensions.map((item) => (
                    <tr key={item.label} className="border-b border-border-default">
                      <td className="py-[13px] pr-[21px] text-f15 font-medium text-t1 whitespace-nowrap">
                        {item.label}
                      </td>
                      <td className="py-[13px] text-f15 text-t2">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Technology Matrix — Layered Cross-Section Visual */}
          <div className="mt-[34px]">
            <h3 className="mb-[8px] text-[17px] font-bold text-t1">Technology matrix</h3>
            <p className="mb-[21px] text-f13 text-t2">Each profile is built from four configurable layers — from core fiber outward to surface finish.</p>

            {/* Cross-section diagram + matrix */}
            <div className="grid gap-[34px] lg:grid-cols-[280px_1fr] lg:items-start">
              {/* Concentric layers diagram */}
              <div className="flex items-center justify-center">
                <svg viewBox="0 0 280 280" className="h-[280px] w-[280px]">
                  {/* Layer 4: Coating (outermost) */}
                  <rect x="10" y="10" width="260" height="260" rx="16" fill="none" stroke="#0d9488" strokeWidth="3" strokeDasharray="8 4" />
                  <text x="140" y="28" textAnchor="middle" className="fill-teal text-[10px] font-bold uppercase">Coating</text>
                  {/* Layer 3: Surface Reinforcement */}
                  <rect x="36" y="36" width="208" height="208" rx="12" fill="none" stroke="#14b8a6" strokeWidth="2.5" />
                  <text x="140" y="52" textAnchor="middle" className="fill-teal text-[10px] font-bold uppercase">Surface</text>
                  {/* Layer 2: Resin */}
                  <rect x="62" y="62" width="156" height="156" rx="8" fill="#f0fdfa" stroke="#5eead4" strokeWidth="2" />
                  <text x="140" y="78" textAnchor="middle" className="fill-teal text-[10px] font-bold uppercase">Resin</text>
                  {/* Layer 1: Fiber (core) */}
                  <rect x="90" y="90" width="100" height="100" rx="6" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2.5" />
                  <text x="140" y="134" textAnchor="middle" className="fill-teal text-[12px] font-extrabold uppercase">Fiber</text>
                  <text x="140" y="150" textAnchor="middle" className="fill-teal/70 text-[9px]">Core</text>
                  {/* Arrow labels */}
                  <line x1="196" y1="140" x2="224" y2="140" stroke="#0d9488" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                  <line x1="248" y1="140" x2="270" y2="140" stroke="#0d9488" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                  <defs>
                    <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                      <polygon points="0 0, 6 2, 0 4" fill="#0d9488" />
                    </marker>
                  </defs>
                </svg>
              </div>

              {/* Matrix grid */}
              <div className="grid gap-[13px] sm:grid-cols-2">
                {[
                  { label: "01 — Fiber Reinforcement", color: "bg-teal", items: capabilities.matrix.fiber, icon: "◉" },
                  { label: "02 — Resin System", color: "bg-teal/80", items: capabilities.matrix.resin, icon: "◈" },
                  { label: "03 — Surface Reinforcement", color: "bg-teal/60", items: capabilities.matrix.surface, icon: "◇" },
                  { label: "04 — Coating & Finish", color: "bg-teal/40", items: capabilities.matrix.coating, icon: "○" },
                ].map((layer) => (
                  <div key={layer.label} className="rounded-[8px] border border-border-default bg-white overflow-hidden">
                    <div className={`${layer.color} px-[13px] py-[6px] text-f11 font-bold uppercase tracking-widest text-white`}>
                      {layer.label}
                    </div>
                    <div className="divide-y divide-border-default">
                      {layer.items.map((item) => (
                        <div key={item.name} className="flex items-start gap-[8px] px-[13px] py-[8px]">
                          <span className="mt-[2px] text-teal text-f13">{layer.icon}</span>
                          <div>
                            <div className="text-f13 font-semibold text-t1">{item.name}</div>
                            <div className="text-f11 text-t3">{item.note}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        groups={[
          {
            title: "Related FRP products",
            links: [
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/products/standard-profiles", label: "Standard FRP profiles" },
              { href: "/products/fenestration-systems", label: "FRP fenestration systems" },
              { href: "/products/gratings", label: "FRP gratings" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/industries/construction", label: "Construction systems" },
              { href: "/industries/energy", label: "EV battery trays & solar" },
              { href: "/industries/vehicle", label: "Rail & transport profiles" },
              { href: "/case-studies", label: "Project case studies" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/technology/pultrusion-process", label: "Pultrusion process explained" },
              { href: "/technology/knowhow-services", label: "KNOWHOW transfer services" },
              { href: "/technology/quality-testing", label: "Quality testing (EN 13706)" },
              { href: "/resources/design-guides", label: "Design guides" },
              { href: "/what-is-frp", label: "What is FRP? Complete guide" },
            ],
          },
        ]}
      />

      {/* FAQ */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Have a custom profile requirement? Let\u2019s engineer it together." />
    </>
  );
}
