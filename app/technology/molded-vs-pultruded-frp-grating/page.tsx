import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Figure from "@/components/ui/Figure";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import CoverCard from "@/components/ui/CoverCard";
import InnerCTA from "@/components/sections/InnerCTA";
import KeyFacts from "@/components/sections/KeyFacts";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ArticleCitationBlock from "@/components/sections/ArticleCitationBlock";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { moldedGratingManualImageAssets, moldedGratingSpecGroups } from "@/content/data/moldedGratingSpecs";
import { pultrudedGratingManualImages, pultrudedGratingSpecGroups } from "@/content/data/pultrudedGratingSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { productCovers } from "@/lib/covers";
import { citationMetaTags, type CitationInput } from "@/lib/citation";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/technology/molded-vs-pultruded-frp-grating";
const seoTarget = getSeoQueryTarget(pagePath);
const publishedAt = "2026-11-24";
const updatedAt = "2026-11-24";
const citation: CitationInput = {
  title: "Molded vs pultruded FRP grating",
  path: pagePath,
  authorName: "F1 Composite",
  publishedAt,
};

export const metadata: Metadata = {
  ...buildPageMetadata({ title: seoTarget.title, description: seoTarget.description, path: pagePath, image: `${pagePath}/opengraph-image` }),
  other: citationMetaTags(citation),
};

type Row = { depth: string; openArea: string; weight: string };
const num = (value: string) => Number.parseFloat(value);
function range(rows: readonly Row[], key: keyof Row) {
  const values = rows.map((row) => num(row[key])).filter(Number.isFinite);
  return [Math.min(...values), Math.max(...values)] as const;
}
const span = ([low, high]: readonly [number, number], unit: string) => `${low}–${high}${unit}`;

const moldedRows = moldedGratingSpecGroups.flatMap((group) => group.rows);
const pultrudedRows = pultrudedGratingSpecGroups.flatMap((group) => group.rows);
const crossBarPitch = pultrudedRows[0]?.crossBarCenter ?? "152.40";

const comparison: [string, string, string][] = [
  ["How it is made", "Continuous glass roving laid in both directions in a mold, wetted with resin and cured as one panel.", "Pultruded I-bar or T-bar bearing bars, joined by cross-rods into an open panel."],
  ["Reinforcement direction", "Bidirectional mesh: reinforcement runs both ways.", "One-way: most reinforcement runs along the bearing bars."],
  ["Glass content", "30–35% by total weight for the listed construction.", "Set by the bearing-bar laminate; request the series datasheet."],
  ["Catalog configurations", `${moldedRows.length} mesh and depth rows`, `${pultrudedRows.length} T-bar, I-bar and specialty rows`],
  ["Depth range", span(range(moldedRows, "depth"), " mm"), span(range(pultrudedRows, "depth"), " mm")],
  ["Open area", span(range(moldedRows, "openArea"), "%"), span(range(pultrudedRows, "openArea"), "%")],
  ["Nominal weight", span(range(moldedRows, "weight"), " kg/m²"), span(range(pultrudedRows, "weight"), " kg/m²")],
  ["Cross-bar spacing", "Fixed by the mesh, for example 38.1 × 38.1 mm.", `${crossBarPitch} mm cross-rod centers on the listed series.`],
  ["Spans", "Short to moderate spans; check the selected mesh and depth.", "Longer one-way spans with higher stiffness along the bars."],
  ["Field cutting", "Cut in any direction; support and seal every cut edge.", "Plan cuts so bearing bars span the support; support every cut bar end."],
  ["Clips", "M or J hold-downs, plus C connectors between panel edges.", "M, J or T hold-downs; T fits the F1 pultruded series only."],
];

const whenToChoose = [
  { situation: "Many penetrations, pipe openings or irregular cutouts", choice: "Molded", why: "The two-way mesh tolerates cuts in any direction." },
  { situation: "Loads that arrive from any direction, supports on all sides", choice: "Molded", why: "Reinforcement in both directions shares load across the panel." },
  { situation: "Trench covers and short-span wet walkways", choice: "Molded", why: "Small panels on close supports suit the mesh depths listed." },
  { situation: "Longer clear spans and fewer support beams", choice: "Pultruded", why: "Continuous bearing bars give higher stiffness in the span direction." },
  { situation: "Small top openings for pedestrian routes", choice: "Pultruded", why: "Wide-top T-bar series start at 12% open area; molded mini mesh is the alternative." },
  { situation: "Airflow-sensitive decks such as cooling towers", choice: "Pultruded", why: "The high-open SI series is listed for airflow-sensitive applications." },
];

const faqs = [
  { question: "What is the difference between molded and pultruded grating?", answer: "Molded grating is cast as one panel with glass reinforcement running in both directions, so it behaves the same both ways and can be cut freely. Pultruded grating is assembled from pultruded bearing bars and cross-rods, so it is a one-way product with higher stiffness along the bars and longer spans." },
  { question: "Which is stronger, molded or pultruded FRP grating?", answer: "Neither is stronger in general. Pultruded grating is stiffer along its bearing bars and usually spans further; molded grating spreads load in both directions. Compare product-specific load tables for the same span, load footprint and deflection limit." },
  { question: "Is pultruded grating more expensive than molded grating?", answer: "It depends on the series, depth, span and quantity. A pultruded panel can need fewer supports on a long span, which changes the cost of the steel or FRP frame. Compare installed quotes for the same layout rather than price per square meter alone." },
  { question: "Which grating is better for chemical plants?", answer: "Both are made in corrosion-resistant resins. Molded grating is resin-rich, with 30–35% glass by weight, while pultruded grating relies on the bearing-bar laminate and its surface. Match the resin formulation to the chemicals, concentration and temperature for either type, and seal cut edges." },
  { question: "Can molded and pultruded grating be used on the same platform?", answer: "Yes. A common layout uses pultruded panels on long walkway spans and molded panels around equipment and penetrations. Keep the walking surface, panel depth at transitions and clip types consistent on the layout drawing." },
  { question: "Where are load tables for each type?", answer: "F1 publishes nominal geometry and weight for both families, not rated loads. Send the selected row, span, load case and deflection limit for a review of product-specific load evidence; the load-table guide explains how to read the result." },
];

const cell = "px-[14px] py-[12px] align-top text-t2";
const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export default function MoldedVsPultrudedGratingPage() {
  const keyFacts = [
    { label: "Molded grating", value: `A one-piece bidirectional mesh with 30–35% glass by weight. F1 lists ${moldedRows.length} configurations, ${span(range(moldedRows, "depth"), " mm")} deep with ${span(range(moldedRows, "openArea"), "%")} open area.` },
    { label: "Pultruded grating", value: `Pultruded I-bar or T-bar bearing bars joined by cross-rods. F1 lists ${pultrudedRows.length} configurations, ${span(range(pultrudedRows, "depth"), " mm")} deep with ${span(range(pultrudedRows, "openArea"), "%")} open area.` },
    { label: "Choose molded for", value: "Cutouts in any direction, loads from several directions, short spans and supports on all sides." },
    { label: "Choose pultruded for", value: "Longer one-way spans, higher stiffness along the bars, small-opening pedestrian surfaces or high-open airflow decks." },
    { label: "Fixing", value: "Molded panels use M or J hold-downs plus C edge connectors; pultruded panels use M, J or T hold-downs." },
  ];

  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: seoTarget.title, description: seoTarget.description, datePublished: publishedAt, dateModified: updatedAt, url: absoluteUrl(pagePath), author: { "@id": "https://www.f1composite.com/#organization" }, publisher: { "@id": "https://www.f1composite.com/#organization" }, about: ["Molded FRP grating", "Pultruded FRP grating"], citation: [absoluteUrl("/products/molded-frp-grating"), absoluteUrl("/products/frp-gratings")] }} />
    <PageHeader
      updated={updatedAt}
      tag="Grating comparison"
      title="Molded vs pultruded FRP grating"
      description="The two fiberglass grating types are made differently and span differently. Compare construction, depth, open area, weight, cutting and clips from F1's published catalog data, then pick the panel by span, load direction and layout."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology", href: "/technology" }, { label: "Molded vs pultruded grating" }]}
      figure={
        <Figure number={1} title="Molded mesh (left) and pultruded T-bar (right)" note="Catalog photos" bleed>
          <div className="grid grid-cols-2 gap-[4px]">
            <div className="relative aspect-[4/5]">
              <Image src={moldedGratingManualImageAssets.closeup} alt="Close-up of molded FRP grating: a square two-way mesh with a grit walking surface" fill sizes="(max-width: 1023px) 47vw, 22vw" className="object-cover" preload />
            </div>
            <div className="relative aspect-[4/5]">
              <Image src={pultrudedGratingManualImages.closeup} alt="Close-up of pultruded FRP grating: parallel T-bar bearing bars joined by cross-rods" fill sizes="(max-width: 1023px) 47vw, 22vw" className="object-cover" />
            </div>
          </div>
        </Figure>
      }
    />
    <PageNav items={[{ id: "key-facts", label: "Short answer" }, { id: "comparison", label: "Comparison" }, { id: "when-to-choose", label: "When to choose" }, { id: "load-evidence", label: "Loads" }, { id: "faq", label: "FAQ" }, { id: "products", label: "Products" }]} />
    <KeyFacts
      title="Molded vs pultruded grating: the short answer"
      summary="Molded FRP grating is a one-piece two-way mesh that can be cut in any direction; pultruded FRP grating is a one-way panel of pultruded bearing bars that spans further and is stiffer along the bars. Choose by span, load direction, cutouts and walking surface, then confirm the load table for the exact panel."
      facts={keyFacts}
    />
    <PageSection id="comparison" title="Molded and pultruded grating side by side" tone="muted" intro="Ranges are calculated from the nominal rows published on the two F1 grating product pages. They describe the listed catalog, not every product on the market.">
      <div className="overflow-x-auto rounded-card border border-border-default bg-white">
        <table className="w-full min-w-[760px] border-collapse text-left text-f14">
          <thead><tr className="border-b border-border-default bg-bg2">{["", "Molded FRP grating", "Pultruded FRP grating"].map((label) => <th key={label || "row"} scope="col" className={`${cell} font-semibold text-t1`}>{label}</th>)}</tr></thead>
          <tbody>{comparison.map(([attribute, molded, pultruded]) => <tr key={attribute} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} font-semibold text-t1`}>{attribute}</th><td className={cell}>{molded}</td><td className={cell}>{pultruded}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-[16px] max-w-[900px] text-f14 leading-golden text-t2">Row-by-row data: <Link href="/products/molded-frp-grating#molded-grating-specifications" className={link}>molded grating mesh and depth table</Link> and <Link href="/products/frp-gratings#pultruded-grating-specifications" className={link}>FRP pultruded grating series table</Link>. Hold-downs for both: <Link href="/products/frp-grating-clips" className={link}>fiberglass grating clips</Link>.</p>
    </PageSection>
    <PageSection id="when-to-choose" title="When to choose molded or pultruded grating">
      <div className="overflow-x-auto rounded-card border border-border-default bg-white">
        <table className="w-full min-w-[680px] border-collapse text-left text-f14">
          <thead><tr className="border-b border-border-default bg-bg2">{["Situation", "Usually", "Why"].map((label) => <th key={label} scope="col" className={`${cell} font-semibold text-t1`}>{label}</th>)}</tr></thead>
          <tbody>{whenToChoose.map((row) => <tr key={row.situation} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} font-semibold text-t1`}>{row.situation}</th><td className={`${cell} ${row.choice === "Molded" ? "" : "bg-teal-bg"} font-semibold text-t1`}>{row.choice}</td><td className={cell}>{row.why}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-[16px] max-w-[900px] text-f16 leading-golden text-t2">Many platforms use both: pultruded panels on the long walkway runs and molded panels around equipment and penetrations. The <Link href="/tools/frp-grating-selector" className={link}>FRP grating selector</Link> narrows the catalog rows by span, opening and surface.</p>
    </PageSection>
    <PageSection id="load-evidence" title="Compare loads with a table for the exact panel" tone="muted">
      <p className="max-w-[900px] text-f16 leading-golden text-t2">Equal depth does not mean equal capacity. A molded 38 mm mesh and a pultruded 38 mm I-bar panel deflect differently on the same span because their reinforcement runs differently. Ask for a load and deflection table that names the series, depth, resin, span direction and support condition, and compare the two options at the same clear span, load footprint and deflection limit.</p>
      <p className="mt-[12px] max-w-[900px] text-f16 leading-golden text-t2">How to read one: <Link href="/resources/blog/how-to-read-frp-grating-load-table" className={link}>FRP grating load table guide</Link>. Against steel: <Link href="/technology/frp-vs-steel-gratings" className={link}>FRP grating vs steel grating</Link>.</p>
    </PageSection>
    <PageSection id="faq" title="Frequently asked questions"><FAQList items={faqs} /></PageSection>
    <PageSection id="products" title="Open the product data" tone="muted">
      <ul className="grid gap-[16px] md:grid-cols-2">
        <li><CoverCard href="/products/molded-frp-grating" cover={productCovers["/products/molded-frp-grating"]} title="Molded FRP grating" text="Square and mini mesh, depths, nominal panel sizes, weights and open area." action="View molded grating" sizes="(max-width: 767px) 94vw, 46vw" /></li>
        <li><CoverCard href="/products/frp-gratings" cover={productCovers["/products/frp-gratings"]} title="FRP pultruded grating" text="T-bar, I-bar, high-load and high-open series with depth, bar centers and weight." action="View pultruded grating" sizes="(max-width: 767px) 94vw, 46vw" /></li>
      </ul>
    </PageSection>
    <ArticleCitationBlock variant="standalone" {...citation} />
    <RelatedLinks background="white" groups={[
      { title: "Grating", links: [{ href: "/products/grating", label: "Fiberglass grating overview" }, { href: "/products/frp-grating-clips", label: "Grating clips and hold-downs" }, { href: "/products/frp-stair-treads", label: "FRP stair treads" }] },
      { title: "Specify", links: [{ href: "/resources/blog/frp-grating-specification-guide", label: "Grating specification guide" }, { href: "/resources/blog/how-to-install-frp-grating", label: "How to install FRP grating" }, { href: "/technology/pultrusion-resin-systems", label: "Resin selection" }] },
      { title: "Process", links: [{ href: "/technology/pultrusion-process", label: "What is pultrusion" }, { href: "/technology/frp-vs-steel-gratings", label: "FRP vs steel grating" }, { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant platforms" }] },
    ]} />
    <InnerCTA title="Send the platform layout, spans and loads to compare both grating types" />
  </>;
}
