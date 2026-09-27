import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import Figure from "@/components/ui/Figure";
import RelatedLinks from "@/components/sections/RelatedLinks";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import { FAQList } from "@/components/ui/FAQ";
import ReadMore from "@/components/ui/ReadMore";
import JsonLd from "@/components/seo/JsonLd";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

/* ═══════════════════════════════════════════════════════
   Page metadata
   ═══════════════════════════════════════════════════════ */

const pagePath = "/technology/frp-vs-traditional-materials";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const publishedAt = "2024-03-22";
const updatedAt = "2026-09-25";
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

const materials = ["FRP", "Steel", "Aluminum", "Timber", "Concrete"] as const;
type Material = (typeof materials)[number];

// FRP is the subject of every chart, so it alone is teal; the materials it is
// compared with share one neutral. Each bar is labelled with its material.
const matColors: Record<Material, string> = {
  FRP: "bg-teal",
  Steel: "bg-t3/45",
  Aluminum: "bg-t3/45",
  Timber: "bg-t3/45",
  Concrete: "bg-t3/45",
};

const matLabels: Record<Material, string> = {
  FRP: "Pultruded FRP (E-glass/polyester)",
  Steel: "Structural steel (A36/S275)",
  Aluminum: "Aluminum (6061-T6)",
  Timber: "Structural softwood",
  Concrete: "Reinforced concrete (C30/37)",
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
  { property: "Density", unit: "g/cm³", values: { FRP: "1.8–2.1", Steel: "7.85", Aluminum: "2.70", Timber: "0.4–0.6", Concrete: "2.40" }, frpHighlight: true },
  { property: "Tensile strength", unit: "MPa", values: { FRP: "350–700", Steel: "400–550", Aluminum: "260–310", Timber: "50–100", Concrete: "2–5" } },
  { property: "Elastic modulus", unit: "GPa", values: { FRP: "20–40", Steel: "200", Aluminum: "69", Timber: "8–14", Concrete: "30" } },
  { property: "Strength-to-weight", values: { FRP: "Excellent", Steel: "Moderate", Aluminum: "Good", Timber: "Good", Concrete: "Poor" }, frpHighlight: true },
  { property: "Corrosion resistance", values: { FRP: "No rust; resin-dependent chemical resistance", Steel: "Poor: requires coating", Aluminum: "Moderate: pitting", Timber: "Poor: rots", Concrete: "Moderate: rebar corrodes" }, frpHighlight: true },
  { property: "Thermal conductivity", unit: "W/m·K", values: { FRP: "0.3–0.5", Steel: "50", Aluminum: "167", Timber: "0.1–0.2", Concrete: "1.7" }, frpHighlight: true },
  { property: "Electrical insulation", values: { FRP: "Excellent", Steel: "None", Aluminum: "None", Timber: "Moderate (dry)", Concrete: "Poor (wet)" }, frpHighlight: true },
  { property: "Maintenance (30 yr)", values: { FRP: "Minimal: no painting", Steel: "High: repaint 8–15 yr", Aluminum: "Low–moderate", Timber: "High: reseal 3–5 yr", Concrete: "Moderate: crack repair" }, frpHighlight: true },
  { property: "Lifecycle cost (30 yr)", values: { FRP: "Often lowest in corrosive sites", Steel: "High", Aluminum: "Moderate", Timber: "High", Concrete: "Moderate–high" }, frpHighlight: true },
  { property: "CO₂ footprint", unit: "kg CO₂/kg", values: { FRP: "3.1–5.0", Steel: "1.8–2.5", Aluminum: "8.0–12.0", Timber: "0.3–0.5", Concrete: "0.1–0.2" } },
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
    note: "Lower is better: lighter profiles, easier handling",
    bars: [
      { material: "FRP", value: "1.9", pct: 24 },
      { material: "Steel", value: "7.85", pct: 100 },
      { material: "Aluminum", value: "2.70", pct: 34 },
      { material: "Timber", value: "0.5", pct: 6 },
      { material: "Concrete", value: "2.40", pct: 31 },
    ],
  },
  {
    title: "Tensile strength",
    unit: "MPa",
    note: "Higher is better: FRP is in the range of structural steel",
    bars: [
      { material: "FRP", value: "525", pct: 75 },
      { material: "Steel", value: "475", pct: 68 },
      { material: "Aluminum", value: "285", pct: 41 },
      { material: "Timber", value: "75", pct: 11 },
      { material: "Concrete", value: "3.5", pct: 1 },
    ],
  },
  {
    title: "Thermal conductivity",
    unit: "W/m·K",
    note: "Lower is better: FRP is a natural thermal break",
    bars: [
      { material: "FRP", value: "0.4", pct: 0.24 },
      { material: "Steel", value: "50", pct: 30 },
      { material: "Aluminum", value: "167", pct: 100 },
      { material: "Timber", value: "0.15", pct: 0.09 },
      { material: "Concrete", value: "1.7", pct: 1 },
    ],
  },
  {
    title: "Elastic modulus",
    unit: "GPa",
    note: "Higher means stiffer: FRP compensates with deeper sections",
    bars: [
      { material: "FRP", value: "30", pct: 15 },
      { material: "Steel", value: "200", pct: 100 },
      { material: "Aluminum", value: "69", pct: 35 },
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
  headline: string; // one-line key takeaway
  detail: string[]; // paragraphs (shown on expand)
}

const propertyCards: PropertyCard[] = [
  {
    title: "Density and weight",
    headline: "About a quarter of the weight of steel, volume for volume",
    detail: [
      "Pultruded FRP has a density of 1.8–2.1 g/cm³, approximately one quarter that of steel (7.85 g/cm³) and roughly 70% of aluminum (2.70 g/cm³). Because FRP is less stiff, a replacement section is often deeper than the steel one, so the weight saving on a member is smaller than the density ratio suggests, but it usually remains large.",
      "This weight reduction cascades: lighter members require smaller foundations, lower-capacity cranes (or no crane at all; many FRP profiles can be carried by two workers), fewer transport loads, and less energy during installation. For bridge decks, building facades, and offshore platforms, weight savings translate directly into cost savings and expanded design possibilities.",
    ],
  },
  {
    title: "Tensile strength",
    headline: "Up to 700 MPa along the fibers, in the range of structural steel",
    detail: [
      "The tensile strength of pultruded E-glass FRP ranges from 350 to 700 MPa in the longitudinal (fiber) direction, which overlaps with and often exceeds the yield strength of structural steel (250–350 MPa). Carbon fiber reinforcement pushes tensile strengths above 1,000 MPa.",
      "The key distinction is directionality: pultrusion produces primarily unidirectional reinforcement, so transverse strength is lower (50–100 MPa). For multi-directional loads, we incorporate continuous filament mat and multi-axial fabrics. We optimize fiber architecture for each application.",
    ],
  },
  {
    title: "Elastic modulus",
    headline: "20–40 GPa, so deflection usually governs the design",
    detail: [
      "The elastic modulus of E-glass FRP is 20–40 GPa, roughly one fifth to one tenth that of steel (200 GPa). For a given cross-section, an FRP member deflects more than steel under the same load.",
      "In deflection-governed designs, this is addressed by increasing the moment of inertia (deeper profiles, wider flanges, or hollow box shapes) or by using carbon fiber (100–150 GPa modulus). Because FRP is so much lighter, dead-load deflection is significantly lower, partially offsetting the modulus difference in real-world designs.",
    ],
  },
  {
    title: "Corrosion resistance",
    headline: "No rust; the resin is matched to the chemical exposure",
    detail: [
      "Corrosion resistance is the most compelling advantage of FRP over metals. Carbon steel rusts in humid air, accelerates in salt spray, and suffers severe degradation in chemical environments, requiring continuous expenditure on coatings, cathodic protection, and periodic replacement.",
      "FRP is inherently immune to electrochemical corrosion because it contains no metal. Vinyl ester and epoxy resin systems resist a wide range of acids, alkalis, solvents, and salt solutions at elevated temperatures. In chemical plants, wastewater facilities, marine structures and coastal buildings, FRP profiles need no corrosion protection. Where the resin is matched to the exposure and the surface is protected from UV, the recoating avoided often offsets the higher initial cost.",
    ],
  },
  {
    title: "Thermal insulation",
    headline: "About 500× lower conductivity than aluminum, so far less thermal bridging",
    detail: [
      "FRP has a thermal conductivity of 0.3–0.5 W/m·K, roughly 100× lower than steel and about 500× lower than aluminum. This makes FRP an inherent thermal break.",
      "In fenestration, FRP frames remove most of the thermal bridging that makes metal-framed openings the weak point of an envelope; how much energy that saves depends on the glazing, spacer and installation, so compare whole-window Uw values. In cold stores, LNG facilities and cryogenic environments, FRP reduces the condensation and ice formation that affect steel structures.",
    ],
  },
  {
    title: "Electrical insulation",
    headline: "Dielectric strength of 12–20 kV/mm; non-conductive and non-magnetic",
    detail: [
      "Glass-fiber FRP is an electrical insulator with a dielectric strength of 12–20 kV/mm, making it intrinsically non-conductive. This is critical for electrical utility applications (crossarms, switchgear enclosures), railway electrification, and worker safety.",
      "Glass-fiber FRP is also non-magnetic, which matters for MRI room construction, EMC enclosures and radar-transparent applications. No metal combines this with electrical insulation.",
    ],
  },
  {
    title: "Lifecycle cost",
    headline: "Often the lowest whole-life cost where steel needs repeated recoating",
    detail: [
      "Steel structures in corrosive environments require full repainting every 8–15 years at USD 30–60 per m² per cycle. Over 50 years, a steel structure may be repainted 3–5 times, adding 60–100% to the initial material cost. Timber requires resealing every 3–5 years and is subject to insect damage, rot, and fire.",
      "FRP profiles need no corrosion painting, cathodic protection or preservative treatment. Surface care is limited to UV protection where the exposure calls for it, and inspection is the same as for any structure. When the full lifecycle cost is calculated, including installation, maintenance, downtime and disposal, FRP often has the lowest total cost in corrosive, marine and high-maintenance environments.",
    ],
  },
  {
    title: "CO₂ and sustainability",
    headline: "Higher carbon per kilogram, often comparable per functional unit",
    detail: [
      "Embodied carbon of pultruded FRP (3.1–5.0 kg CO₂/kg) is higher than steel (1.8–2.5 kg CO₂/kg) per kilogram. However, because an FRP member is usually much lighter than the steel member it replaces, the CO₂ per functional unit (per meter of railing, per m² of grating) is often comparable to or lower than steel.",
      "When avoided emissions from eliminated maintenance cycles and reduced transport energy are included in a full LCA, FRP frequently achieves a net carbon advantage over the service period. Aluminum carries the highest embodied carbon at 8–12 kg CO₂/kg, reflecting the energy of smelting.",
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
    answer: "FRP does not corrode in salt spray or in acidic or alkaline environments, while aluminum suffers pitting and galvanic corrosion. FRP is electrically non-conductive and thermally insulating, ideal for window frames (eliminating thermal bridging) and electrical enclosures. FRP also has lower embodied energy per kilogram when lifecycle impacts are considered.",
  },
  {
    question: "What are the main advantages of pultrusion over traditional materials?",
    answer: "Pultruded FRP combines five key advantages no single traditional material can match: (1) No rusting, with chemical resistance set by the resin; (2) About a quarter of the weight of steel, volume for volume; (3) Electrical and thermal insulation; (4) Dimensional stability; (5) Design freedom through fiber architecture selection. These can lower installation and maintenance costs, particularly where steel would need recoating.",
  },
  {
    question: "How does FRP compare to concrete for structural applications?",
    answer: "FRP is lighter than concrete by volume (1.8–2.1 g/cm³ against about 2.4), and a thin-walled FRP member weighs far less than a concrete member doing the same job, which reduces foundation loads, transport and installation effort. Unlike concrete, FRP does not crack under tensile loading and has no steel reinforcement to corrode. FRP is electrically insulating and non-magnetic. Concrete retains advantages in compressive-load-dominated applications and where fire resistance beyond 2 hours is required.",
  },
  {
    question: "What is the lifespan of pultruded FRP profiles?",
    answer: "Service life depends on the resin system, UV protection, loads, exposure, connections and inspection plan, so no single figure applies to every profile. UV-stabilized resin with a surfacing veil or coating protects outdoor profiles, and vinyl ester or epoxy systems are used for aggressive chemicals. Ask for durability evidence for the resin and exposure in your project.",
  },
];

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
    author: { "@id": "https://www.f1composite.com/#organization" },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    citation: referencedStandards,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        updated={updatedAt}
        tag="Material Comparison"
        title="FRP vs Steel, Aluminum, Timber & Concrete"
        description="Pultruded glass-fiber FRP weighs about a quarter as much as steel (1.8–2.1 g/cm³ against 7.85) and reaches 350–700 MPa tensile strength, in the range of structural steel. Its elastic modulus is only 20–40 GPa, against 200 GPa for steel and 69 GPa for aluminum, so deflection usually governs an FRP design. FRP does not rust or conduct electricity and conducts little heat, but its resin softens at high temperature, so fire exposure needs separate review."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "FRP vs Traditional Materials" },
        ]}
      />
      <PageNav items={[{ id: "why-frp", label: "Why FRP" }, { id: "visual-comparison", label: "At a glance" }, { id: "properties-table", label: "Properties" }, { id: "detailed-analysis", label: "How to read them" }, { id: "faq", label: "FAQ" }]} />

      {/* ── Why FRP — brief intro ── */}
      <PageSection id="why-frp" title="Why FRP differs from traditional structural materials" tone="white">
        <Figure number={1} title="Material surfaces" note="Illustrative photo" className="mb-[24px]" bleed>
          <Image
            src="/images/technology/frp-vs-steel-aluminum-timber-concrete-material-comparison.jpg"
            alt="Five material surfaces side by side: dark metal bars, painted profiles, rusted steel rebar, sawn timber and galvanized steel beams"
            width={1280}
            height={500}
            sizes="(max-width: 1280px) 94vw, 1216px"
            className="h-auto w-full"
            preload
          />
        </Figure>
        <p className="text-f16 leading-golden text-t2">
          Steel rusts. Aluminum conducts heat and electricity. Timber rots and burns.
          Concrete cracks under tension. Pultruded FRP avoids each of these problems, with limits of its own:
          lower stiffness than steel, and a resin that softens in fire.
        </p>

        <ul className="mt-[24px] grid grid-cols-2 gap-[12px] lg:grid-cols-4">
          {[
            { value: "75%", label: "Lighter than steel" },
            { value: "500×", label: "Less heat conducted than aluminum" },
            { value: "E23", label: "EN 13706 grade, standard profiles" },
            { value: "No rust", label: "In salt, chemical or wet service" },
          ].map((stat) => (
            <li key={stat.label} className="rounded-card border border-border-default bg-bg2 p-[16px] sm:p-[20px]">
              <p className="text-f32 font-extrabold leading-none tracking-[-0.02em] text-t1">{stat.value}</p>
              <p className="mt-[8px] text-f14 font-bold text-t1">{stat.label}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* ── §1  Visual Bar Charts ── */}
      <PageSection id="visual-comparison" title="FRP vs steel and aluminum: key properties at a glance" tone="muted" intro="Typical values for each material, on one scale per chart. FRP is the teal bar.">
        <div className="grid gap-[12px] lg:grid-cols-2">
          {barCharts.map((chart) => (
            <figure key={chart.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <figcaption>
                <h3 className="text-f16 font-bold text-t1">
                  {chart.title} <span className="font-normal text-t3">({chart.unit})</span>
                </h3>
                <p className="mt-[4px] text-f14 text-t2">{chart.note}</p>
              </figcaption>
              <ul className="mt-[16px] space-y-[8px]">
                {chart.bars.map((bar) => (
                  <li key={bar.material} className="grid grid-cols-[76px_minmax(0,1fr)_64px] items-center gap-[10px] text-f14">
                    <span className={bar.material === "FRP" ? "font-semibold text-t1" : "text-t2"}>{bar.material}</span>
                    <span className="relative h-[16px]">
                      <span className={`absolute inset-y-0 left-0 rounded-r-tag ${matColors[bar.material]}`} style={{ width: `${Math.max(bar.pct, 2)}%` }} />
                    </span>
                    <span className={`text-right tabular-nums ${bar.material === "FRP" ? "font-semibold text-t1" : "text-t2"}`}>{bar.value}</span>
                  </li>
                ))}
              </ul>
            </figure>
          ))}
        </div>
      </PageSection>

      {/* ── §2  Comparison Table (data-driven) ── */}
      <PageSection id="properties-table" title="FRP vs traditional materials: full property comparison" tone="white" intro="Typical values; bold marks the properties where FRP leads.">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[800px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Property</th>
                {materials.map((m) => (
                  <th key={m} scope="col" className={`px-[14px] py-[8px] font-semibold ${m === "FRP" ? "bg-teal-bg2 text-teal-text" : "text-t1"}`}>
                    {matLabels[m]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row) => (
                <tr key={row.property} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">
                    {row.property}
                    {row.unit && <span className="ml-[4px] font-normal text-t3">({row.unit})</span>}
                  </th>
                  {materials.map((m) => (
                    <td key={m} className={`px-[14px] py-[10px] ${m === "FRP" ? `bg-teal-bg ${row.frpHighlight ? "font-semibold text-t1" : "text-t2"}` : "text-t2"}`}>
                      {row.values[m]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* ── §3  Understanding Each Property — visual cards with collapsible detail ── */}
      <PageSection id="detailed-analysis" title="How to interpret each FRP material property" tone="muted">
        <ul className="grid items-start gap-[12px] sm:grid-cols-2">
          {propertyCards.map((card) => (
            <li key={card.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">{card.title}</h3>
              <p className="mt-[4px] text-f16 leading-golden text-t2">{card.headline}</p>
              <ReadMore className="mt-[4px]">
                {card.detail.map((paragraph) => (
                  <p key={paragraph} className="text-f16 leading-golden text-t2">{paragraph}</p>
                ))}
              </ReadMore>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks background="bg2"
        groups={[
          {
            title: "Comparisons by application",
            links: [
              { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum window frames" },
              { href: "/technology/frp-vs-pvc-windows", label: "FRP vs PVC window frames" },
              { href: "/technology/frp-vs-steel-gratings", label: "FRP vs steel gratings" },
              { href: "/technology/fiberglass-rebar-vs-steel", label: "Fiberglass rebar vs steel" },
            ],
          },
          {
            title: "FRP basics",
            links: [
              { href: "/what-is-frp", label: "What is FRP?" },
              { href: "/technology/pultrusion-process", label: "How pultrusion works" },
              { href: "/technology/quality-testing", label: "Quality and testing standards" },
              { href: "/technology/china-alternative-to-strongwell-fiberline-exel", label: "China alternative to Strongwell and Exel" },
            ],
          },
          {
            title: "Products and tools",
            links: [
              { href: "/pultruded-frp-profiles", label: "Pultruded FRP profiles" },
              { href: "/fiberglass-pultruded-profile-price", label: "Profile price estimator" },
              { href: "/technology/knowhow-services", label: "Know-how transfer services" },
              { href: "/industries", label: "Industry applications" },
            ],
          },
        ]}
      />

      <InnerCTA title="Need help selecting the right material for your project?" />
    </>
  );
}
