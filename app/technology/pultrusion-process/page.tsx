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

const pageTitle = "What Is Pultrusion? — How Pultruded FRP Profiles Are Made";
const pageDescription =
  "Complete guide to the pultrusion manufacturing process: fiber creel, resin impregnation, heated die forming, and pull mechanism. How fiberglass structural profiles are produced at scale.";
const pagePath = "/technology/pultrusion-process";
const publishedAt = "2024-03-15";
const updatedAt = "2026-04-02";
const authorName = "F1 Composite Process Engineering Team";
const authorRole = "Pultrusion line setup, tooling, and process-control specialists";
const reviewedBy = "Manufacturing Technology Review Group";
const referencedStandards = ["EN 13706", "ASTM D3917", "ASTM D638", "ASTM D790"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/technology/pultrusion-process/opengraph-image",
});

/* ═══════════════════════════════════════════════════════
   §1  Process Stages — data
   ═══════════════════════════════════════════════════════ */

interface ProcessStage {
  step: number;
  title: string;
  subtitle: string; // one-line key point
  params: { label: string; value: string }[]; // key parameters
  detail: string[]; // collapsible paragraphs
}

const processStages: ProcessStage[] = [
  {
    step: 1,
    title: "Fiber Creel",
    subtitle: "50–300+ spools of continuous fiber roving organized on a steel rack",
    params: [
      { label: "Fibers", value: "E-glass, ECR-glass, carbon, aramid" },
      { label: "Reinforcements", value: "Roving, CFM, multi-axial fabrics" },
      { label: "Tension", value: "Spring/pneumatic tensioners" },
    ],
    detail: [
      "The creel rack holds 50 to over 300 spools of continuous fiber roving configured to deliver the precise number and type required by the profile design. For complex shapes, the creel also supplies continuous filament mat (CFM) or stitched multi-axial fabrics for off-axis strength.",
      "Proper creel tension management is critical. Each roving must pay out at consistent tension to prevent dry spots (under-tensioned) or fiber breakage (over-tensioned). Modern systems use spring-loaded or pneumatic tensioners to maintain even pay-off as spool diameters decrease.",
    ],
  },
  {
    step: 2,
    title: "Guide Plate",
    subtitle: "Precision cards with ceramic-lined eyelets arrange fibers into the correct spatial configuration",
    params: [
      { label: "Function", value: "Spatial arrangement + pre-tensioning" },
      { label: "Material", value: "Ceramic-lined eyelets/slotted channels" },
      { label: "Routing", value: "More rovings to flanges, fewer to web" },
    ],
    detail: [
      "Fiber rovings and fabric reinforcements pass through precision-machined guide plates that arrange the fibers into the spatial configuration required by the die cross-section and pre-tension the fiber bundle to prevent tangling.",
      "For profiles with multiple wall thicknesses — such as an I-beam with thick flanges and a thinner web — the guide plate routes more rovings to flange zones and fewer to the web, ensuring uniform fiber volume fraction throughout the cross-section.",
    ],
  },
  {
    step: 3,
    title: "Resin Impregnation",
    subtitle: "Fibers are fully wetted with thermoset resin via injection or open-bath",
    params: [
      { label: "Method", value: "Injection (standard) or open-bath" },
      { label: "Injection pressure", value: "3–8 bar" },
      { label: "Ratio control", value: "±1 % of target (injection)" },
    ],
    detail: [
      "Every fiber filament must be completely wetted by the resin system — any dry fibers create internal voids that reduce mechanical strength and durability. In injection systems, resin is injected under controlled pressure (3–8 bar) into a sealed chamber at the die entrance. This achieves near-zero emissions, minimal waste, and ±1 % resin-to-fiber ratio control.",
      "Open-bath systems submerge fibers in a resin trough — simpler and lower cost, but with higher styrene emissions and ±3–5 % ratio control. Injection pultrusion is our standard process.",
    ],
  },
  {
    step: 4,
    title: "Heated Die",
    subtitle: "Chrome-plated steel die at 120–180 °C cures the resin and forms the profile shape",
    params: [
      { label: "Die length", value: "600–1200 mm" },
      { label: "Temperature", value: "100–180 °C, 3-zone control" },
      { label: "Accuracy", value: "±2 °C across all zones" },
    ],
    detail: [
      "The resin-impregnated fiber bundle enters a precision-machined, chrome-plated steel die whose internal cavity defines the profile cross-section. The die has three independently controlled temperature zones: entry (100–130 °C to initiate cure), center (140–170 °C to complete cure), and exit (150–180 °C for controlled shrinkage release).",
      "The exothermic peak temperature inside the profile must be carefully managed — if too high, the resin develops internal stresses causing surface crazing. Our dies incorporate thermocouple ports at multiple depths for real-time core temperature monitoring.",
    ],
  },
  {
    step: 5,
    title: "Pull Mechanism",
    subtitle: "Reciprocating clamp or caterpillar puller draws the cured profile at 0.3–1.5 m/min",
    params: [
      { label: "Pull speed", value: "0.3–1.5 m/min (typical)" },
      { label: "Max pull force", value: "Up to 100 kN" },
      { label: "Control", value: "Servo-driven, ±0.5 % accuracy" },
    ],
    detail: [
      "Two types of puller are used: reciprocating clamp pullers (hydraulic, for large profiles requiring up to 100 kN pull force) and caterpillar belt pullers (smoother, vibration-free, preferred for thin-walled profiles).",
      "Pull speed determines the residence time inside the heated die and controls the degree of cure. Thick-walled profiles run at 0.3 m/min (longer heat penetration time), while small shapes reach 1.5 m/min. Our servo-driven pullers maintain ±0.5 % speed accuracy.",
    ],
  },
  {
    step: 6,
    title: "Cut-Off",
    subtitle: "Flying saw cuts continuous profile to length without stopping the line",
    params: [
      { label: "Blade", value: "Diamond/carbide-tipped, wet cutting" },
      { label: "Accuracy", value: "±0.5 mm" },
      { label: "Post-cut", value: "Label, inspect, measure, package" },
    ],
    detail: [
      "A flying cut-off saw travels with the profile during the cutting stroke to maintain continuous production. Diamond-tipped blades cut through the abrasive composite; wet cutting with coolant suppresses dust and extends blade life.",
      "After cutting, profiles are labeled, inspected for visual defects per ASTM D4385, measured for dimensional compliance, and staged for packaging or secondary fabrication (drilling, routing, bonding, painting).",
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   §2  Injection vs Open-Bath — data
   ═══════════════════════════════════════════════════════ */

interface MethodComparison {
  parameter: string;
  injection: string;
  openBath: string;
  injectionBetter: boolean;
}

const methodComparison: MethodComparison[] = [
  { parameter: "VOC Emissions", injection: "Near zero", openBath: "High", injectionBetter: true },
  { parameter: "Resin Ratio Control", injection: "±1 %", openBath: "±3–5 %", injectionBetter: true },
  { parameter: "Resin Waste", injection: "Minimal", openBath: "5–10 %", injectionBetter: true },
  { parameter: "Surface Finish", injection: "Excellent", openBath: "Good", injectionBetter: true },
  { parameter: "Capital Cost", injection: "Higher", openBath: "Lower", injectionBetter: false },
  { parameter: "Resin Compatibility", injection: "Polyester, VE, epoxy, PU", openBath: "Polyester, VE", injectionBetter: true },
  { parameter: "Changeover Time", injection: "30–60 min", openBath: "15–30 min", injectionBetter: false },
  { parameter: "Operator Exposure", injection: "Minimal", openBath: "Significant", injectionBetter: true },
];

/* ═══════════════════════════════════════════════════════
   §3  Equipment Specs — data
   ═══════════════════════════════════════════════════════ */

const equipmentSpecs = [
  { parameter: "Line Speed", range: "0.2 – 2.0 m/min", note: "Servo-controlled, ±0.5 % accuracy" },
  { parameter: "Die Temperature", range: "100 – 200 °C", note: "3-zone independent control, ±2 °C" },
  { parameter: "Maximum Pull Force", range: "Up to 100 kN", note: "Hydraulic clamp puller" },
  { parameter: "Profile Envelope", range: "500 mm × 100 mm", note: "Width × depth bounding rectangle" },
  { parameter: "Min. Wall Thickness", range: "1.5 mm", note: "With CFM reinforcement" },
  { parameter: "Fiber Volume Fraction", range: "55 – 72 %", note: "Geometry and resin dependent" },
  { parameter: "Injection Pressure", range: "3 – 8 bar", note: "Closed-loop pressure regulation" },
  { parameter: "Cut-Off Accuracy", range: "±0.5 mm", note: "Flying saw, automatic tracking" },
];

/* ═══════════════════════════════════════════════════════
   §4  FAQ — data
   ═══════════════════════════════════════════════════════ */

const faqItems = [
  {
    question: "What is pultrusion?",
    answer: "Pultrusion is a continuous manufacturing process for producing fiber-reinforced polymer (FRP) composite profiles with a constant cross-section. The term combines 'pull' and 'extrusion' — reinforcing fibers are pulled through a resin bath and then through a heated steel die where the resin cures, forming a rigid structural profile.",
  },
  {
    question: "How does the pultrusion process work step by step?",
    answer: "The pultrusion process follows six sequential stages: (1) Fiber Creel — fibers dispensed from roving rack; (2) Guide Plate — fibers organized into correct spatial arrangement; (3) Resin Impregnation — fibers wetted via injection or open-bath; (4) Heated Die — resin cures at 120–180 °C; (5) Pull Mechanism — cured profile drawn at 0.3–1.5 m/min; (6) Cut-Off — flying saw cuts to required length.",
  },
  {
    question: "What is the difference between injection and open-bath pultrusion?",
    answer: "In open-bath pultrusion, fibers pass through an open resin trough. In injection pultrusion, resin is injected into a sealed chamber under 3–8 bar pressure. Injection offers near-zero VOC emissions, ±1 % resin ratio control, less waste, and better surface finish. Open-bath is simpler and lower in capital cost.",
  },
  {
    question: "What types of fibers and resins are used?",
    answer: "Fibers: E-glass (most common), ECR-glass (chemical resistance), carbon (stiffness), aramid (impact). Resins: isophthalic polyester (general structural), vinyl ester (chemical/corrosion resistance), epoxy (highest properties, carbon fiber), polyurethane (high toughness, fast cure).",
  },
  {
    question: "What are the advantages of pultrusion over hand lay-up or filament winding?",
    answer: "Pultrusion is the most cost-effective method for constant-cross-section profiles: continuous, highly automated, 60–70 % fiber volume fraction (vs 30–45 % for hand lay-up). Hand lay-up suits complex one-off shapes. Filament winding suits hollow rotational parts (pipes, tanks) but cannot produce open shapes like I-beams or channels.",
  },
];

/* ═══════════════════════════════════════════════════════
   SVG Icons for each stage
   ═══════════════════════════════════════════════════════ */

function StageIcon({ step }: { step: number }) {
  const paths: Record<number, React.ReactNode> = {
    1: ( // Creel — spools
      <>
        <circle cx="14" cy="16" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="26" cy="16" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="20" cy="26" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="14" y1="12" x2="14" y2="8" stroke="currentColor" strokeWidth="2" />
        <line x1="26" y1="12" x2="26" y2="8" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    2: ( // Guide — grid/plate
      <>
        <rect x="10" y="12" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="16" cy="18" r="1.5" fill="currentColor" />
        <circle cx="24" cy="18" r="1.5" fill="currentColor" />
        <circle cx="16" cy="24" r="1.5" fill="currentColor" />
        <circle cx="24" cy="24" r="1.5" fill="currentColor" />
        <circle cx="20" cy="21" r="1.5" fill="currentColor" />
      </>
    ),
    3: ( // Resin — droplet/bath
      <>
        <path d="M20 10 C20 10 14 18 14 22 C14 25.3 16.7 28 20 28 C23.3 28 26 25.3 26 22 C26 18 20 10 20 10Z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M17 22 C17 24 18.5 25.5 20 25.5 C21.5 25.5 23 24 23 22" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </>
    ),
    4: ( // Die — heated block
      <>
        <rect x="10" y="14" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="8" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="2" />
        <path d="M15 17 v6 M20 17 v6 M25 17 v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    5: ( // Pull — arrows
      <>
        <line x1="10" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="2" />
        <path d="M22 16 L26 20 L22 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="27" y="14" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      </>
    ),
    6: ( // Cut — saw blade
      <>
        <line x1="10" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="24" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="22" y1="12" x2="22" y2="28" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="22" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </>
    ),
  };

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-teal">
      <rect width="40" height="40" rx="8" className="fill-teal-bg" />
      {paths[step]}
    </svg>
  );
}

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

export default function PultrusionProcessPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    image: absoluteUrl("/technology/pultrusion-process/opengraph-image"),
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
        tag="Pultrusion Process"
        title="How Pultruded FRP Profiles Are Manufactured"
        description="Continuous, automated, precision-controlled — pultrusion converts raw fibers and resins into structural profiles with consistent, repeatable mechanical properties."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Pultrusion Process" },
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

      {/* ── Key stats bar ── */}
      <section className="bg-white py-[34px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid grid-cols-2 gap-[13px] sm:grid-cols-4">
            {[
              { value: "60–70%", label: "Fiber volume fraction" },
              { value: "0.3–1.5", label: "m/min line speed" },
              { value: "±2°C", label: "Die temp accuracy" },
              { value: "±0.5mm", label: "Cut-off tolerance" },
            ].map((s) => (
              <div key={s.label} className="rounded-[8px] bg-bg2 px-[21px] py-[13px] text-center">
                <span className="text-f24 font-extrabold text-teal">{s.value}</span>
                <p className="mt-[3px] text-f11 font-bold uppercase tracking-[0.08em] text-t3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="bg-white pb-[34px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="overflow-hidden rounded-[8px]">
            <Image
              src="/images/technology/pultrusion-manufacturing-production-line.jpg"
              alt="Pultrusion manufacturing production line with engineer"
              width={1280}
              height={600}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
         §1  Process Flow — visual diagram
         ══════════════════════════════════════════════════ */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Process Flow</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            The Six Stages of Pultrusion
          </h2>

          {/* ── Horizontal flow diagram (desktop: 6 columns, mobile: vertical) ── */}
          <div className="relative mt-[55px]">
            {/* Connector line — desktop */}
            <div className="absolute left-[50px] right-[50px] top-[19px] hidden h-[2px] bg-gradient-to-r from-teal via-teal/60 to-teal/30 lg:block" />
            {/* Connector line — mobile */}
            <div className="absolute left-[19px] top-[20px] h-[calc(100%-40px)] w-[2px] bg-gradient-to-b from-teal via-teal/60 to-teal/30 lg:hidden" />

            <div className="grid gap-[34px] lg:grid-cols-6 lg:gap-[13px]">
              {processStages.map((stage) => (
                <div key={stage.step} className="relative pl-[55px] lg:pl-0">
                  {/* Step circle — mobile */}
                  <div className="absolute left-[5px] top-0 flex h-[28px] w-[28px] items-center justify-center rounded-full border-[3px] border-teal bg-white text-f11 font-extrabold text-teal lg:hidden">
                    {stage.step}
                  </div>

                  {/* Step icon — desktop */}
                  <div className="hidden lg:flex lg:justify-center">
                    <div className="relative z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full border-[3px] border-teal bg-white text-f13 font-extrabold text-teal">
                      {stage.step}
                    </div>
                  </div>

                  {/* Icon + title */}
                  <div className="mt-0 lg:mt-[13px] lg:text-center">
                    <div className="hidden lg:flex lg:justify-center">
                      <StageIcon step={stage.step} />
                    </div>
                    <h3 className="text-f15 font-bold text-t1 lg:mt-[8px]">{stage.title}</h3>
                    <p className="mt-[3px] text-f11 leading-golden text-t3">{stage.subtitle}</p>
                  </div>

                  {/* Key parameters */}
                  <div className="mt-[8px] space-y-[3px]">
                    {stage.params.map((p) => (
                      <div key={p.label} className="text-f11 leading-golden">
                        <span className="font-bold text-t2">{p.label}: </span>
                        <span className="text-t3">{p.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Collapsible detail */}
                  <details className="group mt-[8px]">
                    <summary className="flex cursor-pointer select-none items-center gap-[5px] text-f11 font-bold text-teal-text transition-colors hover:text-teal">
                      <ChevronDown className="h-[14px] w-[14px] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                      Details
                    </summary>
                    <div className="mt-[8px] space-y-[8px] pl-[19px] text-f13 leading-golden text-t2">
                      {stage.detail.map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>

          {/* Simplified flow arrow diagram */}
          <div className="mt-[55px] hidden overflow-x-auto lg:block">
            <div className="flex items-center justify-center gap-[5px] text-f13">
              {processStages.map((stage, i) => (
                <div key={stage.step} className="flex items-center gap-[5px]">
                  <div className="flex items-center gap-[5px] rounded-full bg-teal px-[13px] py-[5px] text-white">
                    <span className="font-extrabold">{stage.step}</span>
                    <span className="font-bold">{stage.title}</span>
                  </div>
                  {i < processStages.length - 1 && (
                    <svg width="24" height="12" viewBox="0 0 24 12" className="shrink-0 text-teal/40">
                      <path d="M0 6h20M16 2l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
         §2  Injection vs Open-Bath — visual comparison
         ══════════════════════════════════════════════════ */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Impregnation Methods</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Injection vs Open-Bath
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            We operate injection pultrusion as our standard process. The comparison below
            shows why.
          </p>

          <div className="mt-[34px] overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-f13 leading-golden">
              <thead>
                <tr className="border-b-2 border-teal-border bg-teal-bg text-left">
                  <th className="px-[13px] py-[13px] font-bold text-t1">Parameter</th>
                  <th className="px-[13px] py-[13px] font-bold text-teal">Injection</th>
                  <th className="px-[13px] py-[13px] font-bold text-t1">Open-Bath</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {methodComparison.map((row, i) => (
                  <tr key={row.parameter} className={i % 2 === 0 ? "bg-white" : "bg-bg2"}>
                    <td className="px-[13px] py-[13px] font-semibold text-t1">{row.parameter}</td>
                    <td className={`px-[13px] py-[13px] ${row.injectionBetter ? "font-bold text-teal" : "text-t2"}`}>
                      {row.injection}
                    </td>
                    <td className={`px-[13px] py-[13px] ${!row.injectionBetter ? "font-bold text-t1" : "text-t2"}`}>
                      {row.openBath}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
         §3  Equipment Specs — data-driven
         ══════════════════════════════════════════════════ */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Equipment</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Production Line Specifications
          </h2>

          <div className="mt-[34px] overflow-hidden rounded-[8px]">
            <Image
              src="/images/technology/production-line-pultrusion-krauss-maffei.jpg"
              alt="F1 Composite pultrusion production line with Krauss Maffei pullers"
              sizes="(max-width: 1280px) 100vw, 1280px"
              width={2560}
              height={1920}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="mt-[34px] grid gap-[13px] sm:grid-cols-2 lg:grid-cols-4">
            {equipmentSpecs.map((spec) => (
              <div key={spec.parameter} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                <p className="text-f11 font-bold uppercase tracking-[0.08em] text-t3">{spec.parameter}</p>
                <p className="mt-[5px] text-f19 font-extrabold text-t1">{spec.range}</p>
                <p className="mt-[3px] text-f11 text-t3">{spec.note}</p>
              </div>
            ))}
          </div>

          <details className="group mt-[34px]">
            <summary className="flex cursor-pointer select-none items-center gap-[8px] text-f13 font-bold text-teal-text transition-colors hover:text-teal">
              <ChevronDown className="h-[16px] w-[16px] shrink-0 transition-transform duration-200 group-open:rotate-180" />
              Process parameter control details
            </summary>
            <div className="mt-[13px] max-w-[640px] space-y-[13px] pl-[24px] text-f15 leading-golden text-t2">
              <p>
                Every production run is governed by a validated recipe specifying exact values
                for pull speed, die zone temperatures, injection pressure, and resin mix ratios.
                Recipes are stored digitally and version-controlled; any parameter change triggers
                a formal engineering change order (ECO) with re-validation testing.
              </p>
              <p>
                Real-time statistical process control (SPC) monitors key parameters at one-second
                intervals against control limits. If any parameter drifts outside its control band,
                the system generates an immediate alert and can automatically pause the puller for
                critical deviations.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* ── Cross-links and FAQ ── */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <h2 className="mt-[21px] text-f24 font-bold text-t1">Explore Further</h2>
          <div className="mt-[21px] flex flex-wrap gap-[21px]">
            <LinkArrow href="/products">View Our Product Range</LinkArrow>
            <LinkArrow href="/technology/knowhow-services">Know-How Transfer Services</LinkArrow>
            <LinkArrow href="/technology/frp-vs-traditional-materials">FRP vs Traditional Materials</LinkArrow>
            <LinkArrow href="/technology/quality-testing">Quality & Testing Standards</LinkArrow>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Ready to discuss your pultrusion requirements?" />
    </>
  );
}
