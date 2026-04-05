import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const caseStudyData: Record<
  string,
  {
    title: string;
    industry: string;
    location: string;
    year: string;
    products: string[];
    challenge: string;
    solution: string;
    results: string;
    stats: { value: string; label: string }[];
  }
> = {
  "european-bridge-deck": {
    title: "European Bridge Deck Replacement",
    industry: "Infrastructure",
    location: "Netherlands",
    year: "2023",
    products: ["Custom Pultrusions", "Standard Profiles"],
    challenge:
      "A 45-year-old steel bridge deck in the Netherlands was suffering from severe corrosion damage, requiring increasingly frequent and costly maintenance interventions. The bridge owner needed a replacement solution that would provide a design life of 75+ years with minimal maintenance, while keeping the bridge open to traffic during installation.",
    solution:
      "F1 Composite engineered a custom-pultruded FRP deck system using vinyl ester resin with E-glass and carbon fiber hybrid reinforcement. The modular deck panels were designed for rapid on-site assembly using adhesive bonding and mechanical fasteners. Each panel was factory-produced to tight tolerances, ensuring consistent quality and fast installation. The lightweight nature of FRP (approximately 80% lighter than steel equivalents) allowed installation using smaller cranes and eliminated the need for temporary bridge closures.",
    results:
      "The project was completed two weeks ahead of schedule. The FRP deck system achieved a 40% weight reduction compared to the original steel structure while exceeding the EN 1991-2 traffic load requirements. The non-corrosive nature of the FRP profiles eliminates the need for painting or cathodic protection, projecting zero structural maintenance costs over the 100-year design life.",
    stats: [
      { value: "1,200m²", label: "Deck Area" },
      { value: "40%", label: "Weight Reduction" },
      { value: "100yr", label: "Design Life" },
    ],
  },
  "coastal-marina-walkway": {
    title: "Coastal Marina Walkway System",
    industry: "Marine",
    location: "United Kingdom",
    year: "2022",
    products: ["Gratings", "Standard Profiles"],
    challenge:
      "A major UK marina required replacement of its aging timber and steel walkway infrastructure. The existing materials had deteriorated rapidly due to constant saltwater exposure, requiring annual maintenance and presenting safety hazards. The marina needed a durable, slip-resistant solution that could withstand the harsh coastal environment.",
    solution:
      "F1 Composite supplied a complete FRP walkway system comprising pultruded structural profiles for the subframe and molded gratings with anti-slip surfaces for the walkway deck. The FRP profiles were designed to resist saltwater corrosion, UV degradation, and biological fouling without protective coatings. The modular design allowed installation in sections during low-tide windows, minimizing disruption to marina operations.",
    results:
      "The 500-meter walkway system was installed over a 4-week period. The FRP system eliminated all corrosion-related maintenance requirements and is projected to deliver a 60% reduction in total lifecycle cost compared to the previous steel and timber structure over a 50-year service period.",
    stats: [
      { value: "500m", label: "Walkway Length" },
      { value: "60%", label: "Lifecycle Savings" },
      { value: "50yr", label: "Design Life" },
    ],
  },
  "chemical-plant-platform": {
    title: "Chemical Processing Plant Access Platforms",
    industry: "Industrial",
    location: "Saudi Arabia",
    year: "2023",
    products: ["Gratings", "Standard Profiles", "Custom Pultrusions"],
    challenge:
      "A petrochemical complex in Saudi Arabia required replacement of corroding steel access platforms across 12 processing units. The existing platforms suffered rapid degradation from chemical splash, high humidity, and temperatures exceeding 50°C.",
    solution:
      "F1 Composite supplied vinyl ester resin FRP gratings and structural profiles engineered for the specific chemical environment. Each platform was pre-assembled in modular sections for rapid on-site installation during scheduled shutdowns.",
    results:
      "All 12 platforms were replaced within a 3-week shutdown window. The FRP system eliminates corrosion entirely, projecting zero structural maintenance over 30+ years. The lightweight panels reduced crane requirements by 60%.",
    stats: [
      { value: "12", label: "Platforms Replaced" },
      { value: "0", label: "Maintenance Cost" },
      { value: "30yr+", label: "Design Life" },
    ],
  },
  "fenestration-residential": {
    title: "High-Performance Fenestration — Residential Tower",
    industry: "Construction",
    location: "Germany",
    year: "2024",
    products: ["Fenestration Systems"],
    challenge:
      "A 24-story residential tower in Germany required window frame profiles that could achieve Passivhaus-certified thermal performance while providing the structural integrity needed for high-rise wind loads.",
    solution:
      "F1 Composite supplied 90-series pultruded FRP window frame profiles with integrated thermal breaks. The profiles achieve U-values below 0.8 W/m²K with zero thermal bridging — impossible with aluminum frames without complex thermal break inserts.",
    results:
      "The building achieved Passivhaus certification with 40% energy savings versus conventional aluminum fenestration. The FRP frames eliminated thermal bridging completely, contributing to a 15% reduction in heating demand beyond the baseline model.",
    stats: [
      { value: "2,400", label: "Window Units" },
      { value: "0.8", label: "U-Value (W/m²K)" },
      { value: "40%", label: "Energy Savings" },
    ],
  },
  "solar-farm-mounting": {
    title: "Solar Farm Mounting Structure",
    industry: "Energy",
    location: "Australia",
    year: "2023",
    products: ["Custom Pultrusions", "Standard Profiles"],
    challenge:
      "A 50MW solar installation in Australia needed mounting structures that could withstand extreme UV exposure, cyclonic wind loads, and high temperatures while being lighter than aluminum to reduce foundation costs across thousands of mounting points.",
    solution:
      "F1 Composite engineered UV-stabilized FRP mounting profiles using polyester resin with enhanced UV inhibitors. The custom cross-sections were optimized for the specific panel geometry and wind load requirements, achieving a 35% weight reduction versus aluminum equivalents.",
    results:
      "The FRP mounting system reduced structural dead load by 35%, enabling smaller foundations across 50,000+ mounting points. The non-conductive nature of FRP eliminated electrical grounding requirements, saving additional installation time and cost.",
    stats: [
      { value: "50MW", label: "Installation Capacity" },
      { value: "35%", label: "Weight Reduction" },
      { value: "50,000+", label: "Mounting Points" },
    ],
  },
  "water-treatment-cable-tray": {
    title: "Municipal Water Treatment Plant — Cable Tray & Handrail System",
    industry: "Infrastructure",
    location: "Thailand",
    year: "2024",
    products: ["Standard Profiles", "Gratings", "Custom Pultrusions"],
    challenge:
      "A 120,000 m³/day municipal water treatment facility in Thailand required full replacement of its cable management and safety handrail systems. The existing galvanized steel cable trays and handrails had suffered severe corrosion after only 8 years of service due to constant exposure to chlorinated water vapor, high humidity (85–95% RH year-round), and tropical UV radiation. Annual maintenance costs had escalated to over USD 45,000, and several sections posed safety risks due to structural section loss exceeding 30%. The facility operator required a zero-maintenance solution with a minimum 25-year design life that could be installed during normal plant operation without process shutdowns.",
    solution:
      "F1 Composite supplied a complete FRP cable tray and handrail system comprising pultruded FRP cable ladder trays (600mm and 450mm widths, NEMA VE 1 compliant), FRP channel and angle sections for tray supports, pultruded round tube and square tube handrail assemblies with UV-stabilized polyester resin, and molded FRP grating stair treads with anti-slip surfaces rated to AS 4586 R11. The isophthalic polyester resin system was selected for its proven resistance to chlorinated water environments and tropical UV exposure. All profiles were factory-cut and pre-drilled to site dimensions, with stainless steel 316L fasteners for connections. The modular design allowed installation by a 4-person crew using hand tools only — no welding, no hot work permits, no crane required. Each cable tray section weighed approximately 75% less than the galvanized steel equivalent, enabling manual handling throughout the plant.",
    results:
      "The complete system — covering 2.8 km of cable tray runs and 1.2 km of handrail — was installed over 6 weeks with zero process interruption. The FRP system weighs 78% less than the replaced steel, eliminating all crane operations during installation. Post-installation load testing confirmed compliance with IEC 61537 cable tray load requirements and EN ISO 14122-3 handrail loading standards. The facility operator projects zero structural maintenance over the 30-year design life, representing estimated lifecycle savings of USD 850,000 compared to repeated galvanized steel replacement cycles. After 6 months of service, inspection confirmed no visible degradation, discoloration, or structural change in any FRP component.",
    stats: [
      { value: "2.8km", label: "Cable Tray Installed" },
      { value: "78%", label: "Weight Reduction" },
      { value: "$850K", label: "Lifecycle Savings" },
      { value: "30yr", label: "Design Life" },
    ],
  },
};

const caseStudyImages: Record<string, string> = {
  "european-bridge-deck": "/images/case-studies/frp-bridge-deck-replacement-infrastructure-project.jpg",
  "coastal-marina-walkway": "/images/case-studies/frp-coastal-marina-walkway-grating-system.jpg",
  "chemical-plant-platform": "/images/case-studies/frp-chemical-plant-access-platform.jpg",
  "fenestration-residential": "/images/case-studies/frp-fenestration-residential-tower-facade.jpg",
  "solar-farm-mounting": "/images/case-studies/frp-solar-farm-mounting-structure.jpg",
  "water-treatment-cable-tray": "/images/case-studies/frp-water-treatment-plant-aerial-cable-tray-handrail.jpg",
};

const caseStudyContentImages: Record<string, { src: string; alt: string }[]> = {
  "water-treatment-cable-tray": [
    {
      src: "/images/case-studies/frp-water-treatment-plant-aeration-basin-piping-system.jpg",
      alt: "Aerial view of water treatment aeration basins with FRP cable tray and piping system installed across walkways",
    },
    {
      src: "/images/case-studies/frp-water-treatment-plant-walkway-handrail-installation.jpg",
      alt: "FRP handrail and walkway system installed at municipal water treatment facility with corrosion-resistant railing",
    },
  ],
};

export async function generateStaticParams() {
  return Object.keys(caseStudyData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudyData[slug];
  if (!cs) return { title: "Case Study" };
  return buildPageMetadata({
    title: cs.title,
    description: `${cs.title} — ${cs.industry} project in ${cs.location}. ${cs.results.slice(0, 120)}...`,
    path: `/case-studies/${slug}`,
    image: `/case-studies/${slug}/opengraph-image`,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = caseStudyData[slug];

  if (!cs) {
    return (
      <div className="py-[89px] text-center">
        <h1 className="text-f24 font-bold text-t1">Case study not found</h1>
        <Link href="/case-studies" className="mt-[13px] text-teal-text">
          ← Back to all case studies
        </Link>
      </div>
    );
  }

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: cs.title,
    url: absoluteUrl(`/case-studies/${slug}`),
    description: cs.results,
    about: cs.industry,
    datePublished: cs.year,
    locationCreated: cs.location,
    publisher: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
    image: absoluteUrl(`/case-studies/${slug}/opengraph-image`),
  };

  return (
    <>
      <JsonLd data={caseStudySchema} />
      <PageHeader
        tag={cs.industry}
        title={cs.title}
        description={`${cs.location} · ${cs.year}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: cs.title },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[34px] lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div>
            {/* Project hero image */}
            <div className="relative mb-[34px] aspect-[1.618] overflow-hidden rounded-[8px] bg-bg2">
              <Image
                src={caseStudyImages[slug] || "/images/case-studies/frp-bridge-deck-replacement-infrastructure-project.jpg"}
                alt={cs.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>

            <h2 className="mb-[13px] text-f24 font-bold text-t1">The Challenge</h2>
            <p className="mb-[34px] text-f15 leading-golden text-t2">{cs.challenge}</p>

            <h2 className="mb-[13px] text-f24 font-bold text-t1">Our Solution</h2>
            <p className="mb-[34px] text-f15 leading-golden text-t2">{cs.solution}</p>

            {/* Content images — inserted between solution and results */}
            {caseStudyContentImages[slug] && (
              <div className="mb-[34px] grid gap-[21px] sm:grid-cols-2">
                {caseStudyContentImages[slug].map((img) => (
                  <div key={img.src} className="overflow-hidden rounded-[8px]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={620}
                      height={465}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <h2 className="mb-[13px] text-f24 font-bold text-t1">Results</h2>
            <p className="mb-[34px] text-f15 leading-golden text-t2">{cs.results}</p>

            {/* Stats */}
            <div className="flex gap-[34px] border-t border-border-default pt-[21px]">
              {cs.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block text-f24 font-extrabold text-teal">{stat.value}</span>
                  <span className="text-f11 font-bold uppercase tracking-[2px] text-t3">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-[21px]">
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <h4 className="mb-[13px] text-f13 font-bold text-t1">Project Details</h4>
              <dl className="space-y-[8px] text-f13">
                <div>
                  <dt className="text-t3">Location</dt>
                  <dd className="font-medium text-t1">{cs.location}</dd>
                </div>
                <div>
                  <dt className="text-t3">Industry</dt>
                  <dd className="font-medium text-t1">{cs.industry}</dd>
                </div>
                <div>
                  <dt className="text-t3">Year</dt>
                  <dd className="font-medium text-t1">{cs.year}</dd>
                </div>
                <div>
                  <dt className="text-t3">Products Used</dt>
                  <dd className="font-medium text-t1">{cs.products.join(", ")}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <h4 className="mb-[13px] text-f13 font-bold text-t1">Related Products</h4>
              <div className="space-y-[8px]">
                {cs.products.map((product) => (
                  <Link
                    key={product}
                    href={`/products/${product.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block text-f13 text-teal-text hover:underline"
                  >
                    {product} →
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="block rounded-[8px] bg-teal p-[21px] text-center text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
            >
              Start a Similar Project
            </Link>
          </aside>
        </div>
      </section>

      <InnerCTA title="Interested in a similar solution?" />
    </>
  );
}
