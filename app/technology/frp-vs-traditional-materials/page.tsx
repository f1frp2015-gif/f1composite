import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

/* ═══════════════════════════════════════════════════════
   Page metadata
   ═══════════════════════════════════════════════════════ */

const pageTitle = "FRP vs Steel vs Aluminium — Structural Material Comparison";
const pageDescription =
  "FRP vs steel cost and performance comparison: weight, tensile strength, corrosion resistance, thermal conductivity, lifecycle cost. Why fiberglass profiles outperform traditional materials.";
const pagePath = "/technology/frp-vs-traditional-materials";
const publishedAt = "2024-03-22";
const updatedAt = "2026-04-02";
const authorName = "F1 Composite Applications Engineering Team";
const authorRole = "Material selection, design substitution, and lifecycle-cost specialists";
const reviewedBy = "Technical Applications Group";
const referencedStandards = ["EN 13706", "ASTM D638", "ASTM D790", "ASTM G154"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/technology/frp-vs-traditional-materials/opengraph-image",
});

/* ═══════════════════════════════════════════════════════
   Materials — color & label
   ═══════════════════════════════════════════════════════ */

const materials = ["FRP", "Steel", "Aluminium", "Timber", "Concrete"] as const;
type Material = (typeof materials)[number];

const matColors: Record<Material, string> = {
  FRP: "bg-teal",
  Steel: "bg-slate-500",
  Aluminium: "bg-blue-400",
  Timber: "bg-amber-600",
  Concrete: "bg-stone-400",
};

const matLabels: Record<Material, string> = {
  FRP: "Pultruded FRP (E-glass/polyester)",
  Steel: "Structural Steel (A36/S275)",
  Aluminium: "Aluminium (6061-T6)",
  Timber: "Structural Softwood",
  Concrete: "Reinforced Concrete (C30/37)",
};

/* ═══════════════════════════════════════════════════════
   §1  Comparison Table — data
   ═══════════════════════════════════════════════════════ */

interface CompRow {
  property: string;
  unit?: string;
  values: Record<Material, string>;
  frpHighlight?: boolean; // teal highlight for FRP cell
}

const comparisonData: CompRow[] = [
  { property: "Density", unit: "g/cm³", values: { FRP: "1.8 – 2.1", Steel: "7.85", Aluminium: "2.70", Timber: "0.4 – 0.6", Concrete: "2.40" }, frpHighlight: true },
  { property: "Tensile Strength", unit: "MPa", values: { FRP: "350 – 700", Steel: "400 – 550", Aluminium: "260 – 310", Timber: "50 – 100", Concrete: "2 – 5" } },
  { property: "Elastic Modulus", unit: "GPa", values: { FRP: "20 – 40", Steel: "200", Aluminium: "69", Timber: "8 – 14", Concrete: "30" } },
  { property: "Strength-to-Weight", values: { FRP: "Excellent", Steel: "Moderate", Aluminium: "Good", Timber: "Good", Concrete: "Poor" }, frpHighlight: true },
  { property: "Corrosion Resistance", values: { FRP: "Immune", Steel: "Poor — requires coating", Aluminium: "Moderate — pitting", Timber: "Poor — rots", Concrete: "Moderate — rebar corrodes" }, frpHighlight: true },
  { property: "Thermal Conductivity", unit: "W/m·K", values: { FRP: "0.3 – 0.5", Steel: "50", Aluminium: "167", Timber: "0.1 – 0.2", Concrete: "1.7" }, frpHighlight: true },
  { property: "Electrical Insulation", values: { FRP: "Excellent", Steel: "None", Aluminium: "None", Timber: "Moderate (dry)", Concrete: "Poor (wet)" }, frpHighlight: true },
  { property: "Maintenance (30 yr)", values: { FRP: "Minimal — no painting", Steel: "High — repaint 8–15 yr", Aluminium: "Low–moderate", Timber: "High — reseal 3–5 yr", Concrete: "Moderate — crack repair" }, frpHighlight: true },
  { property: "Lifecycle Cost (30 yr)", values: { FRP: "Lowest", Steel: "High", Aluminium: "Moderate", Timber: "High", Concrete: "Moderate–high" }, frpHighlight: true },
  { property: "CO₂ Footprint", unit: "kg CO₂/kg", values: { FRP: "3.1 – 5.0", Steel: "1.8 – 2.5", Aluminium: "8.0 – 12.0", Timber: "0.3 – 0.5", Concrete: "0.1 – 0.2" } },
];

/* ═══════════════════════════════════════════════════════
   §2  Visual Bar Charts — data
   Each chart compares a numeric property across materials.
   `pct` = bar width as percentage (normalized to the max).
   `highlight` marks FRP advantage (lower-is-better or higher-is-better).
   ═══════════════════════════════════════════════════════ */

interface BarEntry {
  material: Material;
  value: string;
  pct: number; // 0–100
}

interface BarChart {
  title: string;
  unit: string;
  note: string; // e.g. "lower is better"
  bars: BarEntry[];
}

const barCharts: BarChart[] = [
  {
    title: "Density",
    unit: "g/cm³",
    note: "Lower is better — lighter profiles, easier handling",
    bars: [
      { material: "FRP", value: "1.9", pct: 24 },
      { material: "Steel", value: "7.85", pct: 100 },
      { material: "Aluminium", value: "2.70", pct: 34 },
      { material: "Timber", value: "0.5", pct: 6 },
      { material: "Concrete", value: "2.40", pct: 31 },
    ],
  },
  {
    title: "Tensile Strength",
    unit: "MPa",
    note: "Higher is better — FRP matches or exceeds steel",
    bars: [
      { material: "FRP", value: "525", pct: 75 },
      { material: "Steel", value: "475", pct: 68 },
      { material: "Aluminium", value: "285", pct: 41 },
      { material: "Timber", value: "75", pct: 11 },
      { material: "Concrete", value: "3.5", pct: 1 },
    ],
  },
  {
    title: "Thermal Conductivity",
    unit: "W/m·K",
    note: "Lower is better — FRP is a natural thermal break",
    bars: [
      { material: "FRP", value: "0.4", pct: 0.24 },
      { material: "Steel", value: "50", pct: 30 },
      { material: "Aluminium", value: "167", pct: 100 },
      { material: "Timber", value: "0.15", pct: 0.09 },
      { material: "Concrete", value: "1.7", pct: 1 },
    ],
  },
  {
    title: "Elastic Modulus",
    unit: "GPa",
    note: "Higher means stiffer — FRP compensates with deeper sections",
    bars: [
      { material: "FRP", value: "30", pct: 15 },
      { material: "Steel", value: "200", pct: 100 },
      { material: "Aluminium", value: "69", pct: 35 },
      { material: "Timber", value: "11", pct: 6 },
      { material: "Concrete", value: "30", pct: 15 },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   §3  Property Deep-Dive — data (collapsible)
   ═══════════════════════════════════════════════════════ */

interface PropertyCard {
  title: string;
  icon: string; // emoji-like short label
  headline: string; // one-line key takeaway
  detail: string[]; // paragraphs (shown on expand)
}

const propertyCards: PropertyCard[] = [
  {
    title: "Density & Weight",
    icon: "75%",
    headline: "FRP is 75 % lighter than steel at equivalent structural capacity",
    detail: [
      "Pultruded FRP has a density of 1.8–2.1 g/cm³, approximately one quarter that of steel (7.85 g/cm³) and roughly 70 % of aluminium (2.70 g/cm³). An FRP profile replacing a steel section of equivalent structural capacity weighs 70–80 % less.",
      "This weight reduction cascades: lighter members require smaller foundations, lower-capacity cranes (or no crane at all — many FRP profiles can be carried by two workers), fewer transport loads, and less energy during installation. For bridge decks, building facades, and offshore platforms, weight savings translate directly into cost savings and expanded design possibilities.",
    ],
  },
  {
    title: "Tensile Strength",
    icon: "700",
    headline: "Up to 700 MPa longitudinal — matching or exceeding structural steel",
    detail: [
      "The tensile strength of pultruded E-glass FRP ranges from 350 to 700 MPa in the longitudinal (fiber) direction, which overlaps with and often exceeds the yield strength of structural steel (250–350 MPa). Carbon fiber reinforcement pushes tensile strengths above 1,000 MPa.",
      "The key distinction is directionality: pultrusion produces primarily unidirectional reinforcement, so transverse strength is lower (50–100 MPa). For multi-directional loads, we incorporate continuous filament mat and multi-axial fabrics. We optimize fiber architecture for each application.",
    ],
  },
  {
    title: "Elastic Modulus",
    icon: "E",
    headline: "Lower modulus (20–40 GPa) — compensated by deeper, lighter sections",
    detail: [
      "The elastic modulus of E-glass FRP is 20–40 GPa, roughly one fifth to one tenth that of steel (200 GPa). For a given cross-section, an FRP member deflects more than steel under the same load.",
      "In deflection-governed designs, this is addressed by increasing the moment of inertia — deeper profiles, wider flanges, or hollow box shapes — or by using carbon fiber (100–150 GPa modulus). Because FRP is so much lighter, dead-load deflection is significantly lower, partially offsetting the modulus difference in real-world designs.",
    ],
  },
  {
    title: "Corrosion Resistance",
    icon: "0",
    headline: "Zero corrosion — no rust, no coating, no maintenance for 50+ years",
    detail: [
      "Corrosion resistance is the single most compelling advantage of FRP over metals. Carbon steel rusts in humid air, accelerates in salt spray, and suffers severe degradation in chemical environments — requiring continuous expenditure on coatings, cathodic protection, and periodic replacement.",
      "FRP is inherently immune to electrochemical corrosion because it contains no metal. Vinyl ester and epoxy resin systems resist a wide range of acids, alkalis, solvents, and salt solutions at elevated temperatures. In chemical plants, wastewater facilities, marine structures, and coastal buildings, FRP profiles can serve for 50+ years with zero corrosion-related maintenance — an economic advantage that often justifies the higher initial cost within 5–10 years.",
    ],
  },
  {
    title: "Thermal Insulation",
    icon: "500×",
    headline: "500× lower thermal conductivity than aluminium — no thermal bridging",
    detail: [
      "FRP has a thermal conductivity of 0.3–0.5 W/m·K — roughly 100× lower than steel and 400× lower than aluminium. This makes FRP an inherent thermal break.",
      "In fenestration applications, FRP frames eliminate the thermal bridging that is the primary source of energy loss through metal-framed openings. A building envelope using FRP framing instead of aluminium can reduce heating and cooling energy consumption by 15–30 % at opening locations. In cold stores, LNG facilities, and cryogenic environments, FRP prevents the condensation and ice formation that plagues steel structures.",
    ],
  },
  {
    title: "Electrical Insulation",
    icon: "kV",
    headline: "Dielectric strength 12–20 kV/mm — intrinsically non-conductive",
    detail: [
      "Glass-fiber FRP is an electrical insulator with a dielectric strength of 12–20 kV/mm, making it intrinsically non-conductive. This is critical for electrical utility applications (crossarms, switchgear enclosures), railway electrification, and worker safety.",
      "FRP also has zero magnetic permeability — required for MRI room construction, EMC enclosures, and radar-transparent military applications. No metal can provide these properties.",
    ],
  },
  {
    title: "Lifecycle Cost",
    icon: "$",
    headline: "Lowest total cost of ownership over 30+ years in corrosive environments",
    detail: [
      "Steel structures in corrosive environments require full repainting every 8–15 years at USD 30–60 per m² per cycle. Over 50 years, a steel structure may be repainted 3–5 times — adding 60–100 % to the initial material cost. Timber requires resealing every 3–5 years and is subject to insect damage, rot, and fire.",
      "FRP profiles require essentially no structural maintenance. UV-stabilized resin systems provide decades of color retention and surface integrity. No painting, no cathodic protection, no preservative treatment. When full lifecycle cost is calculated — including installation, maintenance, downtime, and disposal — FRP consistently delivers the lowest total cost in corrosive, marine, and high-maintenance environments.",
    ],
  },
  {
    title: "CO₂ & Sustainability",
    icon: "CO₂",
    headline: "Higher per-kg carbon, but lower per functional unit due to 75 % weight savings",
    detail: [
      "Embodied carbon of pultruded FRP (3.1–5.0 kg CO₂/kg) is higher than steel (1.8–2.5 kg CO₂/kg) per kilogram. However, because FRP is 75 % lighter for equivalent structural capacity, the CO₂ per functional unit (per meter of railing, per m² of grating) is often comparable to or lower than steel.",
      "When avoided emissions from eliminated maintenance cycles and reduced transport energy are included in a full LCA, FRP frequently achieves a net carbon advantage over 30–50 year service periods. Aluminium carries the highest embodied carbon at 8–12 kg CO₂/kg, reflecting enormous smelting energy.",
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   §4  FAQ — data
   ═══════════════════════════════════════════════════════ */

const faqItems = [
  {
    question: "Is FRP stronger than steel?",
    answer: "On a strength-to-weight basis, pultruded FRP is significantly stronger than structural steel. E-glass/polyester pultrusions achieve a tensile strength-to-density ratio roughly four times that of A36 structural steel. However, steel has a higher absolute elastic modulus (200 GPa vs 20–40 GPa for glass FRP), meaning it is stiffer per unit area. For applications where deflection governs the design, FRP profiles may need deeper sections or carbon fiber reinforcement.",
  },
  {
    question: "What are the advantages of fiberglass over aluminum?",
    answer: "FRP does not corrode in salt spray, acidic, or alkaline environments — unlike aluminium, which suffers pitting and galvanic corrosion. FRP is electrically non-conductive and thermally insulating, ideal for window frames (eliminating thermal bridging) and electrical enclosures. FRP also has lower embodied energy per kilogram when lifecycle impacts are considered.",
  },
  {
    question: "What are the main advantages of pultrusion over traditional materials?",
    answer: "Pultruded FRP combines five key advantages no single traditional material can match: (1) Corrosion immunity; (2) 75 % lighter than steel at comparable capacity; (3) Electrical and thermal insulation; (4) Dimensional stability; (5) Design freedom through fiber architecture selection. These translate into lower installation, maintenance, and lifecycle costs.",
  },
  {
    question: "How does FRP compare to concrete for structural applications?",
    answer: "FRP is 75–80 % lighter than concrete, which reduces foundation loads, transport costs, and installation complexity. Unlike concrete, FRP does not crack under tensile loading and is immune to chloride-induced rebar corrosion. FRP provides electrical insulation and zero magnetic permeability. Concrete retains advantages in compressive-load-dominated applications and where fire resistance beyond 2 hours is required.",
  },
  {
    question: "What is the lifespan of pultruded FRP profiles?",
    answer: "Pultruded FRP profiles have a proven service life exceeding 50 years in outdoor, corrosive, and marine environments. Accelerated UV aging tests (ASTM G154) demonstrate that UV-stabilized polyester FRP retains more than 90 % of original flexural strength after the equivalent of 30 years of Florida-level UV exposure. Vinyl ester and epoxy systems perform even better in aggressive chemical environments.",
  },
];

/* ═══════════════════════════════════════════════════════
   Helper: Chevron icon
   ═══════════════════════════════════════════════════════ */

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════ */

export default function FrpVsTraditionalPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    image: absoluteUrl("/technology/frp-vs-traditional-materials/opengraph-image"),
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { "@type": "Organization", name: authorName },
    editor: { "@type": "Organization", name: reviewedBy },
    publisher: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
    citation: referencedStandards,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        tag="Material Comparison"
        title="FRP vs Steel, Aluminium, Timber & Concrete"
        description="Property-by-property comparison with visual charts to help engineers select the right material for their application."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "FRP vs Traditional Materials" },
        ]}
      />
      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName={authorName}
        authorRole={authorRole}
        reviewedBy={reviewedBy}
        standards={referencedStandards}
      />

      {/* Hero image */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/technology/frp-vs-steel-aluminium-timber-concrete-material-comparison.jpg"
              alt="FRP vs steel, aluminium, timber and concrete — material surface textures side by side for structural comparison"
              width={1280}
              height={500}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Why FRP — brief intro ── */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Why FRP</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            The Case for Fiber-Reinforced Polymers
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Steel rusts. Aluminium conducts heat and electricity. Timber rots and burns.
            Concrete cracks under tension. Pultruded FRP composites were engineered to
            overcome all of these limitations simultaneously.
          </p>

          {/* Key advantages — visual grid */}
          <div className="mt-[34px] grid gap-[13px] sm:grid-cols-2 lg:grid-cols-5">
            {[
              { value: "75%", label: "Lighter than steel" },
              { value: "0", label: "Corrosion maintenance" },
              { value: "500×", label: "Better insulator than Al" },
              { value: "50+", label: "Years service life" },
              { value: "30%", label: "Lifecycle cost savings" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[8px] bg-bg2 p-[21px] text-center">
                <span className="text-[28px] font-extrabold leading-none text-teal">{stat.value}</span>
                <p className="mt-[5px] text-f11 font-bold uppercase tracking-[0.08em] text-t3">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §1  Visual Bar Charts ── */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Visual Comparison</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Key Properties at a Glance
          </h2>

          {/* Legend */}
          <div className="mt-[21px] flex flex-wrap gap-[13px]">
            {materials.map((m) => (
              <div key={m} className="flex items-center gap-[5px]">
                <span className={`inline-block h-[10px] w-[10px] rounded-[2px] ${matColors[m]}`} />
                <span className="text-f11 text-t3">{m}</span>
              </div>
            ))}
          </div>

          <div className="mt-[34px] grid gap-[34px] lg:grid-cols-2">
            {barCharts.map((chart) => (
              <div key={chart.title} className="rounded-[8px] border border-border-default bg-white p-[34px]">
                <h3 className="text-f15 font-bold text-t1">
                  {chart.title} <span className="font-normal text-t3">({chart.unit})</span>
                </h3>
                <p className="mt-[5px] text-f11 text-t3">{chart.note}</p>

                <div className="mt-[21px] space-y-[13px]">
                  {chart.bars.map((bar) => (
                    <div key={bar.material} className="flex items-center gap-[8px]">
                      <span className="w-[55px] shrink-0 text-right text-f11 font-bold text-t2">
                        {bar.material}
                      </span>
                      <div className="relative h-[24px] flex-1 overflow-hidden rounded-[4px] bg-bg2">
                        <div
                          className={`absolute inset-y-0 left-0 rounded-[4px] ${matColors[bar.material]} ${bar.material === "FRP" ? "opacity-100" : "opacity-60"}`}
                          style={{ width: `${Math.max(bar.pct, 2)}%` }}
                        />
                      </div>
                      <span className={`w-[55px] shrink-0 text-f11 ${bar.material === "FRP" ? "font-bold text-teal" : "text-t3"}`}>
                        {bar.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── §2  Comparison Table (data-driven) ── */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Properties Table</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Full Property Comparison
          </h2>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-f13">
              <thead>
                <tr className="border-b-2 border-teal-border bg-teal-bg text-left">
                  <th className="px-[13px] py-[13px] font-bold text-t1">Property</th>
                  {materials.map((m) => (
                    <th key={m} className={`px-[13px] py-[13px] font-bold ${m === "FRP" ? "text-teal" : "text-t1"}`}>
                      {matLabels[m]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {comparisonData.map((row, i) => (
                  <tr key={row.property} className={i % 2 === 0 ? "bg-white" : "bg-bg2"}>
                    <td className="px-[13px] py-[13px] font-semibold text-t1">
                      {row.property}
                      {row.unit && <span className="ml-[5px] font-normal text-t3">({row.unit})</span>}
                    </td>
                    {materials.map((m) => (
                      <td
                        key={m}
                        className={`px-[13px] py-[13px] ${m === "FRP" && row.frpHighlight ? "font-bold text-teal" : "text-t2"}`}
                      >
                        {row.values[m]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── §3  Understanding Each Property — visual cards with collapsible detail ── */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Detailed Analysis</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Understanding Each Property
          </h2>

          <div className="mt-[55px] grid gap-[21px] sm:grid-cols-2">
            {propertyCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[8px] border border-border-default bg-white p-[34px]"
              >
                {/* Visual header */}
                <div className="flex items-start gap-[13px]">
                  <div className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-[8px] bg-teal-bg">
                    <span className="text-f19 font-extrabold text-teal">{card.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-f19 font-bold text-t1">{card.title}</h3>
                    <p className="mt-[5px] text-f13 leading-golden text-t2">{card.headline}</p>
                  </div>
                </div>

                {/* Collapsible detail */}
                <details className="group mt-[13px]">
                  <summary className="flex cursor-pointer select-none items-center gap-[8px] text-f13 font-bold text-teal-text transition-colors hover:text-teal">
                    <ChevronDown className="h-[16px] w-[16px] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                    Read more
                  </summary>
                  <div className="mt-[13px] space-y-[13px] pl-[24px] text-f15 leading-golden text-t2">
                    {card.detail.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-links and FAQ ── */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <h2 className="mt-[21px] text-f24 font-bold text-t1">Explore Further</h2>
          <div className="mt-[21px] flex flex-wrap gap-[21px]">
            <LinkArrow href="/products">View Our Product Range</LinkArrow>
            <LinkArrow href="/technology/pultrusion-process">How Pultrusion Works</LinkArrow>
            <LinkArrow href="/technology/quality-testing">Quality & Testing Standards</LinkArrow>
            <LinkArrow href="/technology/knowhow-services">Know-How Transfer Services</LinkArrow>
            <LinkArrow href="/industries">Industry Applications</LinkArrow>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Need help selecting the right material for your project?" />
    </>
  );
}
