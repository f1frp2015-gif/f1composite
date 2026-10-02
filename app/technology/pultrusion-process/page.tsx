import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import Figure from "@/components/ui/Figure";
import RelatedLinks from "@/components/sections/RelatedLinks";
import PageSection from "@/components/layout/PageSection";
import PultrusionAnimation from "./PultrusionAnimation";
import InnerCTA from "@/components/sections/InnerCTA";
import { FAQList } from "@/components/ui/FAQ";
import ReadMore from "@/components/ui/ReadMore";
import JsonLd from "@/components/seo/JsonLd";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

/* ═══════════════════════════════════════════════════════
   Page metadata
   ═══════════════════════════════════════════════════════ */

const pagePath = "/technology/pultrusion-process";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const publishedAt = "2024-03-15";
const updatedAt = "2026-09-25";
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
    title: "Fiber creel",
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
    title: "Guide plate",
    subtitle: "Precision cards with ceramic-lined eyelets arrange fibers into the correct spatial configuration",
    params: [
      { label: "Function", value: "Spatial arrangement + pre-tensioning" },
      { label: "Material", value: "Ceramic-lined eyelets/slotted channels" },
      { label: "Routing", value: "More rovings to flanges, fewer to web" },
    ],
    detail: [
      "Fiber rovings and fabric reinforcements pass through precision-machined guide plates that arrange the fibers into the spatial configuration required by the die cross-section and pre-tension the fiber bundle to prevent tangling.",
      "For profiles with multiple wall thicknesses (such as an I-beam with thick flanges and a thinner web) the guide plate routes more rovings to flange zones and fewer to the web, ensuring uniform fiber volume fraction throughout the cross-section.",
    ],
  },
  {
    step: 3,
    title: "Resin impregnation",
    subtitle: "Fibers are fully wetted with thermoset resin via injection or open-bath",
    params: [
      { label: "Method", value: "Injection (standard) or open-bath" },
      { label: "Injection pressure", value: "3–8 bar" },
      { label: "Ratio control", value: "±1% of target (injection)" },
    ],
    detail: [
      "Every fiber filament must be completely wetted by the resin system: any dry fibers create internal voids that reduce mechanical strength and durability. In injection systems, resin is injected under controlled pressure (3–8 bar) into a sealed chamber at the die entrance. This achieves near-zero emissions, minimal waste, and ±1% resin-to-fiber ratio control.",
      "Open-bath systems submerge fibers in a resin trough: simpler and lower cost, but with higher styrene emissions and ±3–5% ratio control. Injection pultrusion is our standard process.",
    ],
  },
  {
    step: 4,
    title: "Heated die",
    subtitle: "Chrome-plated steel die at 120–180 °C cures the resin and forms the profile shape",
    params: [
      { label: "Die length", value: "600–1200 mm" },
      { label: "Temperature", value: "120–180 °C typical, 3-zone control" },
      { label: "Accuracy", value: "±2 °C across all zones" },
    ],
    detail: [
      "The resin-impregnated fiber bundle enters a precision-machined, chrome-plated steel die whose internal cavity defines the profile cross-section. The die has three independently controlled temperature zones: entry (100–130 °C to initiate cure), center (140–170 °C to complete cure), and exit (150–180 °C for controlled shrinkage release).",
      "The exothermic peak temperature inside the profile must be carefully managed. If it runs too high, the resin develops internal stresses that cause surface crazing. Our dies incorporate thermocouple ports at multiple depths for real-time core temperature monitoring.",
    ],
  },
  {
    step: 5,
    title: "Pull mechanism",
    subtitle: "Reciprocating clamp or caterpillar puller draws the cured profile at 0.3–1.5 m/min",
    params: [
      { label: "Pull speed", value: "0.3–1.5 m/min (typical)" },
      { label: "Max pull force", value: "Up to 100 kN" },
      { label: "Control", value: "Servo-driven, ±0.5% accuracy" },
    ],
    detail: [
      "Two types of puller are used: reciprocating clamp pullers (hydraulic, for large profiles requiring up to 100 kN pull force) and caterpillar belt pullers (smoother, vibration-free, preferred for thin-walled profiles).",
      "Pull speed determines the residence time inside the heated die and controls the degree of cure. Thick-walled profiles run at 0.3 m/min (longer heat penetration time), while small shapes reach 1.5 m/min. Our servo-driven pullers maintain ±0.5% speed accuracy.",
    ],
  },
  {
    step: 6,
    title: "Cut-off",
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
  { parameter: "VOC emissions", injection: "Near zero", openBath: "High", injectionBetter: true },
  { parameter: "Resin ratio control", injection: "±1%", openBath: "±3–5%", injectionBetter: true },
  { parameter: "Resin waste", injection: "Minimal", openBath: "5–10%", injectionBetter: true },
  { parameter: "Surface finish", injection: "Excellent", openBath: "Good", injectionBetter: true },
  { parameter: "Capital cost", injection: "Higher", openBath: "Lower", injectionBetter: false },
  { parameter: "Resin compatibility", injection: "Polyester, VE, epoxy, PU", openBath: "Polyester, VE", injectionBetter: true },
  { parameter: "Changeover time", injection: "30–60 min", openBath: "15–30 min", injectionBetter: false },
  { parameter: "Operator exposure", injection: "Minimal", openBath: "Significant", injectionBetter: true },
];

/* ═══════════════════════════════════════════════════════
   §3  Equipment Specs — data
   ═══════════════════════════════════════════════════════ */

const equipmentSpecs = [
  { parameter: "Line speed range", range: "0.2–2.0 m/min", note: "Servo-controlled, ±0.5% accuracy" },
  { parameter: "Die heating range", range: "100–200 °C", note: "Three independent zones, ±2 °C" },
  { parameter: "Maximum pull force", range: "Up to 100 kN", note: "Hydraulic clamp puller" },
  { parameter: "Profile envelope", range: "500 × 100 mm", note: "Width × depth bounding rectangle" },
  { parameter: "Minimum wall", range: "1.5 mm", note: "With CFM reinforcement" },
  { parameter: "Fiber volume range", range: "55–72%", note: "Depends on geometry and resin" },
  { parameter: "Injection pressure", range: "3–8 bar", note: "Closed-loop pressure regulation" },
  { parameter: "Cut-off accuracy", range: "±0.5 mm", note: "Flying saw with automatic tracking" },
];

/* ═══════════════════════════════════════════════════════
   §4  FAQ — data
   ═══════════════════════════════════════════════════════ */

const faqItems = [
  {
    question: "What is pultrusion?",
    answer: "Pultrusion is a continuous manufacturing process for producing fiber-reinforced polymer (FRP) composite profiles with a constant cross-section. The term combines 'pull' and 'extrusion': reinforcing fibers are pulled through a resin bath and then through a heated steel die where the resin cures, forming a rigid structural profile.",
  },
  {
    question: "How does the pultrusion process work step by step?",
    answer: "The pultrusion process follows six sequential stages: (1) fiber creel, where fibers are dispensed from the roving rack; (2) guide plate, which arranges the fibers in position; (3) resin impregnation, by injection or an open bath; (4) heated die, where the resin cures at 120–180 °C; (5) pull mechanism, which draws the cured profile at 0.3–1.5 m/min; (6) cut-off, where a flying saw cuts it to length.",
  },
  {
    question: "What is the difference between injection and open-bath pultrusion?",
    answer: "In open-bath pultrusion, fibers pass through an open resin trough. In injection pultrusion, resin is injected into a sealed chamber under 3–8 bar pressure. Injection offers near-zero VOC emissions, ±1% resin ratio control, less waste, and better surface finish. Open-bath is simpler and lower in capital cost.",
  },
  {
    question: "What types of fibers and resins are used?",
    answer: "Fibers: E-glass (most common), ECR-glass (chemical resistance), carbon (stiffness), aramid (impact). Resins: isophthalic polyester (general structural), vinyl ester (chemical/corrosion resistance), epoxy (highest properties, carbon fiber), polyurethane (high toughness, fast cure).",
  },
  {
    question: "What are the advantages of pultrusion over hand lay-up or filament winding?",
    answer: "Pultrusion is the most cost-effective method for constant-cross-section profiles: continuous, highly automated, 60–70% fiber volume fraction (vs 30–45% for hand lay-up). Hand lay-up suits complex one-off shapes. Filament winding suits hollow rotational parts (pipes, tanks) but cannot produce open shapes like I-beams or channels.",
  },
];

/* ═══════════════════════════════════════════════════════
   SVG Icons for each stage
   ═══════════════════════════════════════════════════════ */

const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

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
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0 text-teal">
      <rect width="40" height="40" rx="8" className="fill-teal-bg" />
      {paths[step]}
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
    author: { "@id": "https://www.f1composite.com/#organization" },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    citation: referencedStandards,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How pultruded FRP profiles are manufactured",
    description:
      "Six-stage continuous process that converts E-glass roving and thermoset resin into constant-cross-section fiberglass structural profiles.",
    image: absoluteUrl("/technology/pultrusion-process/opengraph-image"),
    totalTime: "PT3H",
    supply: [
      { "@type": "HowToSupply", name: "E-glass / carbon / aramid roving" },
      { "@type": "HowToSupply", name: "Continuous strand mat (CSM) and surfacing veil" },
      { "@type": "HowToSupply", name: "Thermoset resin (polyester, vinyl ester, polyurethane, or epoxy)" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Creel rack (50–300 spool capacity)" },
      { "@type": "HowToTool", name: "Chrome-plated steel pultrusion die (100–200 °C, 3-zone control)" },
      { "@type": "HowToTool", name: "Resin injection chamber (3–8 bar)" },
      { "@type": "HowToTool", name: "Reciprocating or caterpillar puller (up to 100 kN)" },
      { "@type": "HowToTool", name: "Flying cut-off saw (diamond-tipped blade)" },
    ],
    step: processStages.map((stage) => ({
      "@type": "HowToStep",
      position: stage.step,
      name: stage.title,
      text: `${stage.subtitle}. ${stage.detail.join(" ")}`,
      url: `${absoluteUrl(pagePath)}#step-${stage.step}`,
    })),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={howToSchema} />
      <PageHeader
        updated={updatedAt}
        tag="Pultrusion Process"
        title="The fiberglass pultrusion process, step by step"
        description="Pultrusion is a continuous process: glass or carbon fiber rovings and mats are pulled through a resin bath or injection chamber, then through a steel die heated to about 120–180 °C, where the resin cures into a profile of constant cross-section. A puller draws the cured profile at 0.3–1.5 m/min, and a flying saw cuts it to length without stopping the line. Fiber makes up 60–70% of the profile by volume, which gives pultruded sections high strength along their length."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Pultrusion Process" },
        ]}
        facts={[
          { label: "Fiber volume", value: "60–70%" },
          { label: "Line speed", value: "0.3–1.5 m/min" },
          { label: "Die temperature", value: "±2 °C" },
          { label: "Cut-off length", value: "±0.5 mm" },
        ]}
        figure={
          <Figure number={1} title="F1 Composite pultrusion hall" note="Production photo" bleed>
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/f1-photos/f1-composite-pultrusion-production-line-aerial.webp"
                alt="Inside an F1 Composite pultrusion plant — multiple parallel continuous pultrusion lines in production"
                fill
                sizes="(max-width: 1023px) 94vw, 44vw"
                className="object-cover"
                preload
              />
            </div>
          </Figure>
        }
      />
      <PageNav items={[{ id: "process-flow", label: "Six stages" }, { id: "impregnation-methods", label: "Impregnation" }, { id: "equipment", label: "Line specifications" }, { id: "faq", label: "FAQ" }]} />
      {/* ══════════════════════════════════════════════════
         §1  Process Flow — visual diagram
         ══════════════════════════════════════════════════ */}
      <PageSection id="process-flow" title="The six stages of pultrusion" tone="white" intro="Watch the full line in motion, from fiber pay-off to the flying cut-off saw. Every speed in the animation is derived from one line speed, as on a real line.">
        <PultrusionAnimation />

        <ol className="mt-[32px] grid gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {processStages.map((stage) => (
            <li key={stage.step} id={`step-${stage.step}`} className="scroll-mt-[40px] rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <div className="flex items-start justify-between gap-[12px]">
                <div>
                  <p className={mono}>Stage {stage.step}</p>
                  <h3 className="mt-[4px] text-f18 font-bold text-t1">{stage.title}</h3>
                </div>
                <StageIcon step={stage.step} />
              </div>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{stage.subtitle}</p>
              <dl className="mt-[12px] space-y-[6px] border-t border-border-default pt-[12px] text-f14 leading-golden">
                {stage.params.map((param) => (
                  <div key={param.label} className="grid grid-cols-[minmax(96px,40%)_1fr] gap-[12px]">
                    <dt className="text-t3">{param.label}</dt>
                    <dd className="text-t1">{param.value}</dd>
                  </div>
                ))}
              </dl>
              <ReadMore label="How it works" className="mt-[4px]">
                {stage.detail.map((paragraph) => (
                  <p key={paragraph} className="text-f14 leading-golden text-t2">{paragraph}</p>
                ))}
              </ReadMore>
            </li>
          ))}
        </ol>
      </PageSection>

      {/* ══════════════════════════════════════════════════
         §2  Injection vs Open-Bath — visual comparison
         ══════════════════════════════════════════════════ */}
      <PageSection id="impregnation-methods" title="Injection vs open bath" tone="muted" intro="We run injection pultrusion as our standard process. The stronger option on each row is set in bold.">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[600px] border-collapse text-left text-f14 leading-golden">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Parameter</th>
                <th scope="col" className="bg-teal-bg2 px-[14px] py-[8px] font-semibold text-teal-text">Injection (our standard)</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Open bath</th>
              </tr>
            </thead>
            <tbody>
              {methodComparison.map((row) => (
                <tr key={row.parameter} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[10px] font-semibold text-t1">{row.parameter}</th>
                  <td className={`bg-teal-bg px-[14px] py-[10px] ${row.injectionBetter ? "font-semibold text-t1" : "text-t2"}`}>{row.injection}</td>
                  <td className={`px-[14px] py-[10px] ${!row.injectionBetter ? "font-semibold text-t1" : "text-t2"}`}>{row.openBath}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      {/* ══════════════════════════════════════════════════
         §3  Equipment Specs — data-driven
         ══════════════════════════════════════════════════ */}
      <PageSection id="equipment" title="Production line specifications" tone="white">
        <Figure number={3} title="Plant floor" note="Production photo" bleed>
          <Image
            src="/images/f1-photos/f1-composite-pultrusion-plant-floor.webp"
            alt="Finished pultruded profiles on inspection tables beside fiber-handling and pulling equipment in an F1 Composite plant"
            sizes="(max-width: 1280px) 94vw, 1216px"
            width={2000}
            height={832}
            className="h-auto w-full"
          />
        </Figure>

        <ul className="mt-[20px] grid grid-cols-2 gap-[12px] lg:grid-cols-4">
          {equipmentSpecs.map((spec) => (
            <li key={spec.parameter} className="rounded-card border border-border-default bg-bg2 p-[16px] sm:p-[20px]">
              <p className={mono}>{spec.parameter}</p>
              <p className="mt-[4px] text-f18 font-bold text-t1">{spec.range}</p>
              <p className="mt-[4px] text-f14 leading-golden text-t3">{spec.note}</p>
            </li>
          ))}
        </ul>

        <ReadMore label="How the process parameters are controlled" className="mt-[12px]">
          <p className="text-f16 leading-golden text-t2">
            Every production run is governed by a validated recipe specifying exact values
            for pull speed, die zone temperatures, injection pressure, and resin mix ratios.
            Recipes are stored digitally and version-controlled; any parameter change triggers
            a formal engineering change order (ECO) with re-validation testing.
          </p>
          <p className="text-f16 leading-golden text-t2">
            Real-time statistical process control (SPC) monitors key parameters at one-second
            intervals against control limits. If any parameter drifts outside its control band,
            the system generates an immediate alert and can automatically pause the puller for
            critical deviations.
          </p>
        </ReadMore>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks background="white"
        groups={[
          {
            title: "Products",
            links: [
              { href: "/pultruded-frp-profiles", label: "Pultruded FRP profiles" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultrusion services" },
              { href: "/technology/knowhow-services", label: "Know-how transfer services" },
            ],
          },
          {
            title: "Materials",
            links: [
              { href: "/what-is-frp", label: "What is FRP?" },
              { href: "/technology/pultrusion-resin-systems", label: "Resin systems and matrix selection" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs traditional materials" },
            ],
          },
          {
            title: "Quality",
            links: [
              { href: "/technology/quality-testing", label: "Quality and testing standards" },
              { href: "/technology/pultrusion-vs-extrusion-filament-winding", label: "Pultrusion vs extrusion and filament winding" },
              { href: "/resources/technical-data", label: "Technical data" },
            ],
          },
        ]}
      />

      <InnerCTA title="Ready to discuss your pultrusion requirements?" />
    </>
  );
}
