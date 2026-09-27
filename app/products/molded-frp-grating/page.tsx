import MaterialTerminologyNote from "@/components/sections/MaterialTerminologyNote";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import GratingBuyingGuide from "@/components/sections/GratingBuyingGuide";
import GratingHero from "@/components/sections/GratingHero";
import GratingProjectPlanner from "@/components/sections/GratingProjectPlanner";
import GratingVisualGuide from "@/components/sections/GratingVisualGuide";
import GratingSelectionCriteria from "@/components/sections/GratingSelectionCriteria";
import { gratingInquiryHref, gratingRequestItems, moldedGratingSelection } from "@/lib/gratingInquiry";
import { approximateInches } from "@/lib/productInquiry";
import GratingClipGuide from "@/components/sections/GratingClipGuide";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import CoverLink from "@/components/ui/CoverLink";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import {
  moldedAdditionalMeshFamilies,
  moldedGratingManualImageAssets,
  moldedGratingSpecGroups,
} from "@/content/data/moldedGratingSpecs";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { authorsBySlug } from "@/lib/authors";
import { productCovers } from "@/lib/covers";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/molded-frp-grating";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const publishedAt = "2026-08-29";
const updatedAt = "2026-09-20";
const author = authorsBySlug["yifan-liu"];
const reviewer = authorsBySlug["haifeng-gong"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/molded-frp-grating/opengraph-image",
});

const moldedAdvantages = [
  {
    label: "Load path",
    value: "Bidirectional molded reinforcement",
    detail: "Square-mesh panels can be oriented or field-cut without creating a single pultrusion load direction.",
  },
  {
    label: "Catalog depth range",
    value: "13–65 mm",
    detail: "Standard and high-depth rows are listed by mesh, bar thickness, panel format, nominal weight and open area.",
  },
  {
    label: "Catalog glass content",
    value: "30–35% by total weight",
    detail: "Interlaced glass roving is thermally cured in a resin-filled mold.",
  },
  {
    label: "Walking surfaces",
    value: "Square mesh · mini mesh · grit top",
    detail: "Select the opening and surface against drainage, heel resistance, slip, cleaning and project access rules.",
  },
];

const faqItems = [
  {
    question: "What is molded FRP grating?",
    answer:
      "Molded FRP grating is a one-piece panel made by placing continuous glass-fiber reinforcement in both directions of a mold and curing it in a resin matrix. That two-way architecture is the key difference from pultruded grating, whose bearing bars primarily carry load in one direction.",
  },
  {
    question: "Which molded grating mesh should I specify?",
    answer:
      "Use 38.1 × 38.1 mm or 40 × 40 mm square mesh for general industrial platforms; 50.8 × 50.8 mm or 83 × 83 mm when higher open area is important; and mini-mesh configurations when the top opening must be reduced for pedestrian access. The final choice must also satisfy the required load table, support spacing, drainage, slip resistance and local accessibility rules.",
  },
  {
    question: "Are the panel sizes and weights on this page certified design values?",
    answer:
      "They are nominal product-selection values. Use them for product selection and logistics planning. The F1 quotation, approved panel-layout drawing and order-specific certified datasheet control final dimensions, tolerances, resin, surface, load capacity and delivered weight.",
  },
  {
    question: "Can molded fiberglass grating be cut around pipes and equipment?",
    answer:
      "Yes. Its bidirectional reinforcement makes molded grating well suited to field cutouts and irregular layouts. Every cut still needs adequate bearing and cut-edge support; seal exposed cut surfaces with a compatible resin and re-check the hold-down layout on the approved installation drawing.",
  },
  {
    question: "Which clips are used with molded FRP grating?",
    answer:
      "F1 uses M hold-down clips for compatible panel-to-support connections, C connectors between adjacent molded-panel edges, and J support-hook assemblies where the approved detail clamps around a support flange without drilling it. C clips do not replace structural support or each panel's independent hold-downs.",
  },
  {
    question: "Are molded grating clips available in 316 stainless steel?",
    answer:
      "Yes. The F1 M/C/J clip kits shown here are specified in 316 stainless steel. Clip geometry, bolt length, complete fastener assembly, quantity and spacing are selected against the panel depth, mesh, support flange and installation access, then issued on the approved project drawing.",
  },
  {
    question: "When should I choose pultruded instead of molded grating?",
    answer:
      "Choose pultruded FRP grating when the design is governed by longer one-way spans, higher stiffness in the bearing-bar direction, dedicated I-bar or T-bar series, or higher open-area configurations. Use the separate pultruded FRP grating page so its bearing-bar data and M/J/T clips are not mixed with molded mesh specifications.",
  },
];

const th = "px-[14px] py-[8px] font-semibold text-t1";

export default function MoldedFrpGratingPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "Molded FRP Grating",
          description: pageDescription,
          path: pagePath,
          image: moldedGratingManualImageAssets.hero,
          category: "Molded fiberglass reinforced plastic grating",
          productLine: "F1-GRID-M",
          schemaType: "CollectionPage",
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: {
            name: author.fullName,
            jobTitle: author.jobTitle,
            path: `/about/authors/${author.slug}`,
          },
          reviewedBy: {
            name: reviewer.fullName,
            jobTitle: reviewer.jobTitle,
            path: `/about/authors/${reviewer.slug}`,
          },
          material: ["Glass fiber", "Isophthalic polyester resin", "Vinyl ester resin"],
          additionalProperty: [
            { name: "Mesh families", value: "Square mesh, mini mesh, rectangular mesh, large-open mesh" },
            { name: "Catalog depth range", value: "13–65 mm" },
            { name: "Compatible F1 clips", value: "M, C and J clip kits in 316 stainless steel" },
          ],
        })}
      />

      <GratingHero family="molded" title="Molded FRP grating: square and mini mesh"
        description="Compare molded fiberglass grating by mesh, depth, panel size and surface. Select a configuration for your project quotation, with matched M/C/J stainless-steel clips."
        image={moldedGratingManualImageAssets.closeup} imageAlt="Green molded fiberglass square mesh with a gritted surface"
        caption="Product construction reference. Confirm resin, surface and final geometry for the selected configuration."
        facts={[{ label: "Depth range", value: "13–65 mm" }, { label: "Listed configurations", value: "26 mesh/depth rows" }, { label: "Load direction", value: "Two-way mesh" }, { label: "Fixing hardware", value: "M/C/J · 316SS" }]} />
      <GratingProjectPlanner family="molded" />

      <PageSection id="overview" title="Molded mesh for cutouts, corrosive duty and multidirectional layouts">
        <div className="grid grid-cols-1 items-start gap-[28px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-[48px]">
          <div className="space-y-[14px]">
            <p className="text-f18 leading-golden text-t1">
              Molded fiberglass grating is cured as one panel with glass reinforcement running in both directions. It is the F1-GRID choice when the layout contains frequent penetrations, loads can approach from more than one direction, or the project needs resin-rich corrosion performance with a wide choice of square and mini meshes.
            </p>
            <p className="text-f16 leading-golden text-t2">
              Interlaced glass roving is thermally cured in a resin-filled mold. The listed construction has 30–35% glass content by total weight. For fire-retardant options, request the report for the proposed resin and panel configuration; confirm the required fire classification and test scope before ordering.
            </p>
            <MaterialTerminologyNote title="Molded FRP or moulded GRP grating?">
        Both names describe the glass-reinforced molded panels on this page; “moulded” is the British spelling. Choose mesh opening, panel depth, surface and resin for your application. Pultruded bearing-bar grating is a different construction with its own load tables.
      </MaterialTerminologyNote>
          </div>
          <Figure number={2} title="Coastal observation walkway" note="Catalog photo" caption="Application reference: molded open-mesh grating as an outdoor walking surface. Final support and fixing details depend on the project." bleed>
            <div className="relative aspect-[16/9]">
              <Image
                src={moldedGratingManualImageAssets.hero}
                alt="Molded FRP grating installed as a corrosion-resistant coastal observation walkway"
                fill
                sizes="(max-width: 1024px) 94vw, 46vw"
                className="object-cover"
              />
            </div>
          </Figure>
        </div>
        <dl className="mt-[32px] grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border-default bg-border-default sm:grid-cols-2 lg:grid-cols-4">
          {moldedAdvantages.map((item) => (
            <div key={item.label} className="bg-white px-[20px] py-[16px]">
              <dt className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{item.label}</dt>
              <dd className="mt-[6px] text-f18 font-bold text-t1">{item.value}</dd>
              <dd className="mt-[6px] text-f14 leading-golden text-t2">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection
        id="molded-grating-specifications"
        title="Molded grating mesh, depth, panel size, weight and open area"
        count={`${moldedGratingSpecGroups.reduce((sum, group) => sum + group.rows.length, 0)} configurations`}
        tone="muted"
        intro="Compare all 26 square-mesh and mini-mesh configurations below. Dimensions are millimeters; weight is nominal kg/m². Approximate inch depths are for reference. Choose a row to prefill your quotation request, then confirm final dimensions, tolerances and load data for the project."
      >
        <div className="space-y-[12px]">
          {moldedGratingSpecGroups.map((group, index) => (
            <details key={group.mesh} open={index < 2} className="group rounded-card border border-border-default bg-white">
              <summary className="cursor-pointer list-none px-[20px] py-[14px] sm:px-[24px]">
                <div className="flex items-center justify-between gap-[12px]">
                  <div>
                    <h3 className="text-f18 font-bold text-t1">{group.mesh}</h3>
                    {group.note && <p className="mt-[2px] text-f14 leading-golden text-t3">{group.note}</p>}
                  </div>
                  <span aria-hidden="true" className="text-f18 font-bold text-teal-text transition-transform group-open:rotate-45">+</span>
                </div>
              </summary>
              <div className="border-t border-border-default">
                <div className="overflow-x-auto" role="region" aria-label="Molded specifications, scroll horizontally" tabIndex={0}>
                  <table className="w-full min-w-[820px] border-collapse text-left text-f14 tabular-nums">
                    <caption className="sr-only">Molded grating nominal selection specifications</caption>
                    <thead>
                      <tr className="border-b border-border-default bg-bg2">
                        <th scope="col" className={th}>Depth (mm)</th>
                        <th scope="col" className={th}>Bar top / bottom (mm)</th>
                        <th scope="col" className={th}>Standard panel sizes (mm)</th>
                        <th scope="col" className={th}>Weight (kg/m²)</th>
                        <th scope="col" className={th}>Open area</th>
                        <th scope="col" className={th}><span className="sr-only">Quotation</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map((row) => (
                        <tr key={`${group.mesh}-${row.depth}-${row.barThickness}`} className="border-b border-border-default last:border-b-0">
                          <th scope="row" className="px-[14px] py-[8px] font-semibold text-t1">{row.depth}<span className="block whitespace-nowrap text-f12 font-normal text-t3">≈ {approximateInches(parseFloat(row.depth))} in</span></th>
                          <td className="px-[14px] py-[8px] text-t2">{row.barThickness}</td>
                          <td className="px-[14px] py-[8px] text-t2">{row.panelSizes}</td>
                          <td className="px-[14px] py-[8px] text-t2">{row.weight}</td>
                          <td className="px-[14px] py-[8px] text-t2">{row.openArea}</td>
                          <td className="px-[14px] py-[8px] text-right"><Link href={gratingInquiryHref("molded", moldedGratingSelection(group.mesh, row), "grating-spec-row")} className="relative inline-flex min-h-[44px] items-center whitespace-nowrap text-f14 font-bold text-teal-text underline underline-offset-4">Quote this spec<span className="sr-only">: { group.mesh + ", " + row.depth + " mm, bar " + row.barThickness }</span></Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-[24px] rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
          <h3 className="text-f18 font-bold text-t1">Additional catalog mesh families</h3>
          <p className="mt-[6px] text-f14 leading-golden text-t2">Further mesh and depth options are listed below. Request the exact configuration and project load table before specifying.</p>
          <ul className="mt-[14px] grid grid-cols-1 gap-[8px] sm:grid-cols-2 lg:grid-cols-3">
            {moldedAdditionalMeshFamilies.map((item) => (
              <li key={item.mesh} className="rounded-control border border-border-default bg-bg2 px-[14px] py-[10px]">
                <p className="text-f14 font-semibold text-t1">{item.mesh}</p>
                <p className="mt-[2px] text-f14 text-t3">Catalog depths: {item.depths}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[16px] max-w-[640px]">
          <CoverLink href="/products/frp-gratings" cover={productCovers["/products/frp-gratings"]} title="Need longer one-way spans or I-bar / T-bar panels?" text="View pultruded FRP grating: bearing-bar series, one-way spans and M/J/T fixing options." />
        </div>
      </PageSection>

      <PageSection id="hardware" title="Molded grating connectors and hold-down hardware">
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[48px]">
          <p className="text-f16 leading-golden text-t2">
            The catalog hardware photograph shows the wider grating-fastener family. For this molded-grating page, F1 publishes only the applicable M hold-down, C panel connector and J support-hook functions below. The photograph is a visual reference, not a promise that every pictured geometry is a stocked F1 SKU.
          </p>
          <Figure number={3} title="Grating fastener family" note="Catalog photo" caption="Hardware-family reference. Match the clip assembly to panel geometry and support access." bleed>
            <div className="relative aspect-[167/61]">
              <Image
                src={moldedGratingManualImageAssets.hardware}
                alt="Reference layout of stainless-steel grating clip and clamp geometries"
                fill
                sizes="(max-width: 1024px) 94vw, 55vw"
                className="object-cover"
              />
            </div>
          </Figure>
        </div>
      </PageSection>

      <GratingVisualGuide firstFigure={4} tone="muted" />
      <GratingSelectionCriteria figure={6} tone="white" />
      <GratingClipGuide family="molded" tone="muted" />
      <GratingBuyingGuide family="molded" tones={["white", "muted"]} />

      <PageSection id="grating-faq" title="Molded FRP grating questions">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks
        groups={[
          {
            title: "Related FRP products",
            links: [
              { href: "/products/frp-gratings", label: "Pultruded FRP grating" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
              { href: "/products/frp-stair-treads", label: "Molded grating stair treads" },
              { href: "/products/frp-handrail-systems", label: "Fiberglass handrail systems" },
              { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "FRP I-beam supports" },
              { href: "/products/frp-fasteners-fittings", label: "FRP fasteners and fittings" },
            ],
          },
          {
            title: "Applications",
            links: [
              { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant platforms" },
              { href: "/industries/industrial", label: "Industrial and wastewater access" },
              { href: "/industries/marine", label: "Marine and coastal walkways" },
              { href: "/regions/frp-grating-supplier-saudi-arabia", label: "FRP grating supply for Saudi Arabia" },
            ],
          },
          {
            title: "Technical resources",
            links: [
              { href: "/products/grating", label: "Molded vs pultruded grating" },
              { href: "/technology/frp-vs-steel-gratings", label: "FRP grating vs steel" },
              { href: "/resources/blog/how-to-read-frp-grating-load-table", label: "How to read a grating load table" },
              { href: "/resources/blog/how-to-install-frp-grating", label: "How to install FRP grating" },
            ],
          },
        ]}
      />

      <PageSection id="quote" title="Need molded FRP grating panels and matched 316SS clip kits?" tone="deep">
        <ProductRfq
          product="Molded FRP grating"
          productPath={pagePath}
          quoteHref={gratingInquiryHref("molded", undefined, "grating-footer")}
          items={gratingRequestItems}
          links={[{ label: "Build a panel schedule", href: "#grating-quote" }]}
          intro="Choose a row in the specification table or send a drawing. Quantities, cutting, clip kits and delivery scope are confirmed with the quotation."
          advisorPrompt="I need molded FRP grating for [application]. Mesh/depth [mm], panel quantity or layout [details], clear support spacing [mm], design load [kN/m² or point load], resin/chemical exposure [details], surface [concave/fine grit/coarse grit], support flange and underside access [details]. Please confirm the catalog row, M/C/J 316SS clips, panel layout and required approval documents."
        />
      </PageSection>
    </>
  );
}
