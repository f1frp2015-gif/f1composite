import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import RelatedLinks from "@/components/sections/RelatedLinks";
import GratingSelector from "@/components/tools/GratingSelector";
import { buildGratingRows } from "@/lib/gratingSelector";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { pageDates } from "@/content/data/pageDates";

const updatedAt = pageDates["/tools/frp-grating-selector"];

const pagePath = "/tools/frp-grating-selector";
const rows = buildGratingRows();
const molded = rows.filter((row) => row.family === "molded");
const pultruded = rows.filter((row) => row.family === "pultruded");
const range = (values: number[]) => `${Math.min(...values)}–${Math.max(...values)}`;
const moldedDepths = range(molded.map((row) => row.depthMm));
const pultrudedDepths = range(pultruded.map((row) => row.depthMm));
const moldedWeights = range(molded.map((row) => row.weightKgM2));
const pultrudedWeights = range(pultruded.map((row) => row.weightKgM2));

const pageDescription = `Filter ${rows.length} published FRP grating configurations, ${molded.length} molded and ${pultruded.length} pultruded, by depth, open area, top opening and weight, then total the floor weight.`;

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Grating Selector: Molded & Pultruded Sizes and Weights",
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "What are the standard sizes of FRP grating?",
    answer: `In this catalog, molded FRP grating is listed from ${moldedDepths} mm deep in square, mini and large-open meshes, with panels such as 1220 × 3660, 1220 × 2440, 1524 × 4000 and 921 × 3050 mm. Pultruded grating runs from ${pultrudedDepths} mm deep in T-bar, I-bar, high-load and high-open series. General industrial platforms often use 38.1 × 38.1 mm or 40 × 40 mm square mesh; confirm the panel size and cut plan in the quotation.`,
  },
  {
    question: "How much does FRP grating weigh per square meter?",
    answer: `Nominal weights in the published tables are ${moldedWeights} kg/m² for molded grating and ${pultrudedWeights} kg/m² for pultruded grating. Enter a floor area in the selector to total the grating weight; clips, cut waste, crating and pallets are extra.`,
  },
  {
    question: "Should I choose molded or pultruded grating?",
    answer: "Molded grating is a two-way mesh panel and is generally more forgiving when a layout needs many irregular cutouts. Pultruded grating carries load in one direction along continuous bearing bars, which suits longer one-way spans and higher stiffness in the span direction. Mark the span direction on the layout when you choose pultruded panels.",
  },
  {
    question: "Can I select grating by load or span with this tool?",
    answer: "No. The selector compares geometry, open area and weight. Load capacity and deflection depend on the series, clear span, support width, load footprint and deflection limit, so send those with the request and F1 returns the applicable project load table. A load-class label does not replace the table for the selected row.",
  },
  {
    question: "Is open area the same as the clear opening?",
    answer: "No. Open area is the share of the panel surface that is open. A mesh designation or bearing-bar spacing is a center distance, not a clear opening. For single square molded meshes the selector estimates the top opening as mesh pitch minus top bar width; check mini meshes, pultruded rows and any accessibility or heel-gap rule on the order drawing.",
  },
];

export default function GratingSelectorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          dateModified: updatedAt,
          name: "FRP Grating Selector",
          url: absoluteUrl(pagePath),
          description: pageDescription,
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          publisher: { "@id": "https://www.f1composite.com/#organization" },
        }}
      />
      <PageHeader
        updated={updatedAt}
        tag="Tools"
        title="FRP grating selector"
        description="Compare the published molded and pultruded FRP grating configurations by depth, open area, top opening and weight, total the weight for a floor area, and send the chosen row for a quotation."
        facts={[
          { label: "Configurations", value: `${molded.length} molded · ${pultruded.length} pultruded` },
          { label: "Depths", value: `${Math.min(...rows.map((row) => row.depthMm))}–${Math.max(...rows.map((row) => row.depthMm))} mm` },
          { label: "Load data", value: "Project table on request" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Grating selector" }]}
      />

      <PageNav items={[{ id: "tool", label: "Selector" }, { id: "next-checks", label: "Next checks" }, { id: "faq", label: "FAQ" }]} />

      <ToolSection label="FRP grating selector">
        <GratingSelector />
      </ToolSection>

      <PageSection id="next-checks" title="After you shortlist a row" tone="muted" intro="The selector narrows the catalog. Three checks decide the order.">
        <ol className="grid gap-[12px] md:grid-cols-3">
          <li className="rounded-card border border-border-default bg-white p-[20px]">
            <h3 className="text-f16 font-bold text-t1">1. Load and deflection</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">Send the clear span, support width, uniform and point loads and the deflection limit. Read <Link href="/resources/blog/how-to-read-frp-grating-load-table" className="font-semibold text-teal-text underline underline-offset-4">how to read a grating load table</Link> before comparing offers.</p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px]">
            <h3 className="text-f16 font-bold text-t1">2. Openings and access rules</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">Check walkway openings, stair and ladder geometry in the <Link href="/tools/access-geometry-checker" className="font-semibold text-teal-text underline underline-offset-4">ladder, stair and walkway checker</Link>, and add <Link href="/products/frp-stair-treads" className="font-semibold text-teal-text underline underline-offset-4">stair treads</Link> and <Link href="/products/frp-handrail-systems" className="font-semibold text-teal-text underline underline-offset-4">handrails</Link> to the same request.</p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px]">
            <h3 className="text-f16 font-bold text-t1">3. Resin, surface and fixing</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">Name the chemicals and temperature, the walking surface and the hold-down clips. Full tables are on the <Link href="/products/molded-frp-grating" className="font-semibold text-teal-text underline underline-offset-4">molded FRP grating</Link> and <Link href="/products/frp-gratings" className="font-semibold text-teal-text underline underline-offset-4">pultruded FRP grating</Link> pages.</p>
          </li>
        </ol>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "Grating products", links: [
            { href: "/products/molded-frp-grating", label: "Molded FRP grating" },
            { href: "/products/frp-gratings", label: "Pultruded FRP grating" },
            { href: "/products/grating", label: "FRP grating overview" },
          ] },
          { title: "Other tools", links: [
            { href: "/tools", label: "All engineering tools" },
            { href: "/tools/access-geometry-checker", label: "Ladder, stair and walkway checker" },
            { href: "/tools/handrail-load-calculator", label: "Handrail load check" },
          ] },
          { title: "Guides", links: [
            { href: "/resources/blog/how-to-read-frp-grating-load-table", label: "How to read a grating load table" },
            { href: "/technology/frp-vs-steel-gratings", label: "FRP vs steel grating" },
            { href: "/resources/blog/how-to-install-frp-grating", label: "How to install FRP grating" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the selected grating with your span and loads"
        quoteHref="/contact?source=tool-grating-selector&inquiry_type=rfq"
        text="Send the configuration, floor area or cut plan, clear span, loads, resin and delivery country."
      />
    </>
  );
}
