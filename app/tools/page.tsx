import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import CoverCard from "@/components/ui/CoverCard";
import JsonLd from "@/components/seo/JsonLd";
import { toolCovers } from "@/lib/covers";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools";
const pageDescription =
  "Free tools for pultruded FRP: beam and column checks, span tables, handrail loads, ladder checks, cut lists, life-cycle cost vs steel and a unit converter.";

export const metadata: Metadata = buildPageMetadata({ title: "FRP Engineering Tools & Calculators", description: pageDescription, path: pagePath });

type ToolHref = keyof typeof toolCovers;

const groups: { id: string; title: string; intro: string; tools: { href: ToolHref; kind: string; title: string; text: string }[] }[] = [
  {
    id: "size",
    title: "Size a profile",
    intro: "Find a standard size and check it as a beam or a column.",
    tools: [
      { href: "/tools/profile-finder", kind: "Finder", title: "Profile finder", text: "Filter the standard sizes by shape, size, mass and stiffness, and compare up to four." },
      { href: "/frp-profile-calculator", kind: "Calculator", title: "FRP profile calculator", text: "Bending, shear and Timoshenko-corrected deflection for a section, span and load, with steel and aluminum equivalents." },
      { href: "/tools/frp-column-calculator", kind: "Calculator", title: "Column buckling", text: "Global buckling, flange, web and wall local buckling and crushing for I-beams and tubes, with the lightest sizes that pass." },
      { href: "/frp-span-tables", kind: "Tables", title: "Span tables", text: "Allowable uniform loads for the published I-beams, channels and tubes over 1 to 6 m spans." },
    ],
  },
  {
    id: "details",
    title: "Check the details",
    intro: "Guardrail loads, access geometry, movement and reinforcement, checked before the drawings are detailed.",
    tools: [
      { href: "/tools/handrail-load-calculator", kind: "Load check", title: "Handrail load check", text: "Posts and rails against OSHA, IBC, EN ISO 14122-3, BS 6180, NBC and AS 1657 loads, with base reactions for the anchors." },
      { href: "/tools/access-geometry-checker", kind: "Checker", title: "Ladder, stair and walkway checker", text: "Rung spacing, clear width, fall protection, risers and grating openings against OSHA, EN ISO 14122, AS 1657 and the IBC." },
      { href: "/tools/thermal-expansion-calculator", kind: "Calculator", title: "Thermal expansion", text: "Movement of FRP members between fixings, the difference against steel, concrete or glass, and sealed joint widths." },
      { href: "/tools/gfrp-rebar-calculator", kind: "Calculator", title: "GFRP rebar calculator", text: "Steel bar sizes matched to GFRP bars, ACI CODE-440.11-22 design values and the standards for each market." },
    ],
  },
  {
    id: "quantities-and-costs",
    title: "Quantities and costs",
    intro: "Bars to order, weights, planning prices, and the cost over the life of the project against steel.",
    tools: [
      { href: "/tools/frp-cut-list-optimizer", kind: "Optimizer", title: "Cut list optimizer", text: "Nest piece lengths into 6 m, 12 m or container-length bars with kerf and trim; bars to order, waste and a CSV cut list." },
      { href: "/frp-density-calculator", kind: "Calculator", title: "Density and weight", text: "FRP density from mat, fabric and roving, and profile weight from the section." },
      { href: "/fiberglass-pultruded-profile-price", kind: "Estimator", title: "Price estimator", text: "Planning prices per meter and per kilogram by section, resin, finish and volume." },
      { href: "/tools/frp-life-cycle-cost-calculator", kind: "Calculator", title: "Life-cycle cost vs steel", text: "Present-value cost of FRP against galvanized or painted steel, with galvanizing life from ISO 9223 corrosion rates." },
    ],
  },
  {
    id: "windows-and-sourcing",
    title: "Units, windows and sourcing",
    intro: "Metric and US units, window U-values and series, and a quote request built from your project.",
    tools: [
      { href: "/tools/frp-unit-converter", kind: "Converter", title: "Unit converter", text: "MPa and ksi, GPa and Msi, kN/m and plf, kg/m and lb/ft, U- and R-values, and inch profile sizes to catalog sizes." },
      { href: "/technology/frp-u-value-calculator", kind: "Calculator", title: "Window U-value calculator", text: "Whole-window U-value to EN ISO 10077-1, compared with targets in Europe, the UK, the US, Canada and New Zealand." },
      { href: "/ai/passive-house", kind: "Selector", title: "Passive House window selector", text: "Match climate, target U-value and opening type to PHI-certified FRP window series." },
      { href: "/ai/sourcing", kind: "Assistant", title: "Sourcing assistant", text: "Match profiles, resins and standards to a project and send the result as a quote request." },
    ],
  },
];

const allTools = [...groups.flatMap((group) => group.tools), { href: "/ask" as const, title: "Engineering assistant" }];

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "FRP engineering tools",
          url: absoluteUrl(pagePath),
          description: pageDescription,
          hasPart: allTools.map((tool) => ({ "@type": "WebApplication", name: tool.title, url: absoluteUrl(tool.href), applicationCategory: "EngineeringApplication" })),
        }}
      />
      <PageHeader
        tag="Tools"
        title="Engineering tools"
        description="Find a standard size, check it as a beam or a column, work out cut lists, weight, price and life-cycle cost, and prepare the details a quotation needs. The tools are free and need no login."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools" }]}
      />

      {groups.map((group, groupIndex) => (
        <PageSection key={group.id} id={group.id} title={group.title} count={`${group.tools.length} tools`} intro={group.intro} tone={groupIndex % 2 === 0 ? "white" : "muted"}>
          <ul className="grid grid-cols-2 gap-[12px] lg:grid-cols-4 lg:gap-[16px]">
            {group.tools.map((tool, index) => (
              <li key={tool.href}>
                <CoverCard
                  href={tool.href}
                  cover={toolCovers[tool.href]}
                  label={<span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{tool.kind}</span>}
                  title={tool.title}
                  text={tool.text}
                  action="Open the tool"
                  priority={groupIndex === 0 && index < 4}
                  compact
                  sizes="(max-width: 1023px) 46vw, 290px"
                />
              </li>
            ))}
          </ul>
          {groupIndex === groups.length - 1 ? (
            <div className="mt-[32px] max-w-[820px] rounded-card border-l-4 border-l-teal bg-bg2 p-[20px]">
              <p className="text-f16 font-bold text-t1">Not sure which tool fits the question?</p>
              <p className="mt-[4px] text-f14 leading-golden text-t2">
                The{" "}
                <Link href="/ask" className="font-semibold text-teal-text hover:underline">engineering assistant</Link>{" "}
                answers questions on profile selection, resins, standards and documents from the catalog data and test reports,
                and points to the tool or page that covers the rest.
              </p>
            </div>
          ) : null}
        </PageSection>
      ))}

      <InnerCTA
        title="Send the sizes and checks with your RFQ"
        quoteHref="/contact?source=tools-hub&inquiry_type=rfq"
        text="Send the profile list, spans and loads, quantities and destination; attach the tool results if you have them."
      />
    </>
  );
}
