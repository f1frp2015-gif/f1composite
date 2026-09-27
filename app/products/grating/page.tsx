import GratingApplicationCards from "@/components/sections/GratingApplicationCards";
import type { Metadata } from "next";
import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import GratingHero from "@/components/sections/GratingHero";
import GratingProjectPlanner from "@/components/sections/GratingProjectPlanner";
import GratingVisualGuide from "@/components/sections/GratingVisualGuide";
import GratingSelectionCriteria from "@/components/sections/GratingSelectionCriteria";
import GratingBuyingGuide from "@/components/sections/GratingBuyingGuide";
import CollectionSchema from "@/components/seo/CollectionSchema";
import CoverCard from "@/components/ui/CoverCard";
import CoverLink from "@/components/ui/CoverLink";
import { FAQList } from "@/components/ui/FAQ";
import { coverFor, productCovers } from "@/lib/covers";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata } from "@/lib/seo";
import { gratingInquiryHref, gratingRequestItems } from "@/lib/gratingInquiry";

const path = "/products/grating";
const seo = getSeoQueryTarget(path);
const links = [
  { label: "Molded FRP Grating", href: "/products/molded-frp-grating", image: "/images/products/molded-frp-grating/molded-grating-grit-mesh-closeup.webp", tag: "One-piece mesh", body: "Square, mini and rectangular mesh panels with reinforcement in both directions. Start here for layouts with frequent cutouts or multidirectional support requirements.", details: "13–65 mm listed depths · M/C/J clips" },
  { label: "Pultruded FRP Grating", href: "/products/frp-gratings", image: "/images/products/pultruded-frp-grating/pultruded-grating-t-bar-closeup.webp", tag: "Directional bearing bars", body: "I-bar and T-bar panels assembled with cross-rods. Start here for span-led layouts, directional stiffness and high-open-area requirements.", details: "25–76 mm listed depths · M/J/T clips" },
];
const comparisons = [
  ["How is it made?", "Glass reinforcement and resin form an integral grid in a mold.", "Continuous pultruded bearing bars are joined with cross-rods."],
  ["Which direction spans?", "Square-mesh panels can support two-direction layouts; check the selected panel's load data.", "Bearing bars carry the main span. Cross-rods are not an equivalent load-bearing direction."],
  ["What geometry is specified?", "Mesh, clear opening, panel depth, panel size and support around cutouts.", "Bar shape, depth, spacing, cross-rod layout, panel size and bearing direction."],
  ["What controls the final choice?", "Loads, supports, deflection, openings, resin and surface.", "The same project checks, with the bearing bars aligned to the designed span."],
];
const faq = [
  { question: "Are fiberglass, fibreglass, FRP and GRP grating the same?", answer: "For the glass-reinforced panels in F1's range, these names describe the same material family. Fiberglass is the common US spelling; fibreglass and GRP are also used in the UK, Australia and New Zealand. Specify molded or pultruded construction, resin, geometry and project requirements rather than relying on the name alone." },
  { question: "How do I choose molded or pultruded grating?", answer: "Begin with the support layout and openings. Molded mesh suits many irregular cutouts and two-direction layouts; pultruded bearing bars provide a directional span. Compare the selected panel's load and deflection data before confirming thickness. Neither construction is automatically suitable for every load." },
  { question: "Which panel sizes and thicknesses are available?", answer: "The molded page lists mesh groups, depths, panel-size options, weights and open area. The pultruded page lists I-bar and T-bar series, depths and bar spacing. Download the current selection CSV or choose a row for quotation. Listed configurations are selection references, not a live-stock promise." },
  { question: "Can I request inch dimensions and US units?", answer: "Yes. State the required units and whether a dimension is nominal or exact. The page shows metric catalog values; inch equivalents are approximate conversions. A 25 mm panel is approximately 0.984 inches, not an exact one-inch stock specification." },
  { question: "What affects the price and minimum order?", answer: "Panel type, geometry, resin, surface, quantity, cutting, fixing kits, packing and destination affect the quotation. Send panel quantities or total area and the delivery port or postcode. Minimum quantity, sample arrangements, production timing and delivery scope are confirmed against that requirement." },
  { question: "Can I get load tables and a drawing review?", answer: "Send the series or mesh, clear span, support width, load type and footprint, deflection limit, resin and service conditions. Request the applicable grating load/deflection table and product documents. The CSV contains geometry and nominal weights; it is not an allowable-load table." },
];
export const metadata: Metadata = buildPageMetadata({ title: seo.title, description: seo.description, path, image: "/images/products/grating/grating-panel-comparison.webp" });

const applicationLinks = [
  { title: "Process platforms", text: "Chemical exposure, support spacing and service access around equipment.", href: "/applications/frp-chemical-plant-platforms" },
  { title: "Water & coastal access", text: "Wet surfaces, drainage, supports and the inspection environment.", href: "/industries/water-wastewater" },
  { title: "Steps, handrails & decks", text: "Stair treads and guarding matched to the layout. Closed structural decks have separate specifications.", href: "/products/frp-stair-treads" },
];

const th = "px-[14px] py-[8px] font-semibold text-t1";
const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export default function GratingPage() {
  return <>
    <CollectionSchema name="Fiberglass & FRP Grating" description={seo.description} path={path} links={links} />
    <GratingHero title="Fiberglass grating for industrial projects" description="Choose molded mesh or pultruded bearing-bar panels for walkways, platforms and access systems. Compare configurations, review the engineering inputs and send a panel schedule for quotation." image="/images/products/grating/grating-panel-comparison.webp" imageAlt="Illustrative green molded square-mesh and yellow pultruded grating samples side by side" caption="AI-generated product illustration showing two constructions; not a dimensioned specification or project photograph." facts={[{ label: "Constructions", value: "Molded & pultruded" }, { label: "Selection data", value: "Dimensions & weights" }, { label: "Fixing systems", value: "Matched 316SS clips" }, { label: "Procurement", value: "Project & bulk enquiries" }]} />
    <GratingApplicationCards />

    <PageSection id="grating-types" title="Two ways to build your walking surface" tone="muted" intro="Fiberglass grating is also called fibreglass or GRP grating. The important choice is how the panel carries the load and fits the layout.">
      <ul className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
        {links.map((item) => (
          <li key={item.href}>
            <CoverCard
              href={item.href}
              cover={productCovers[item.href as keyof typeof productCovers]}
              label={<span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{item.tag}</span>}
              title={item.label}
              text={item.body}
              facts={[item.details]}
              action="View specifications"
              sizes="(max-width: 767px) 94vw, 46vw"
            />
          </li>
        ))}
      </ul>
      <h3 id="molded-vs-pultruded" className="mt-[40px] scroll-mt-[128px] text-f20 font-bold text-t1">Molded vs pultruded grating</h3>
      <div className="relative mt-[16px] overflow-x-auto rounded-card border border-border-default bg-white" role="region" aria-label="Molded and pultruded grating comparison" tabIndex={0}>
        <table className="w-full min-w-[660px] border-collapse text-left text-f14">
          <caption className="sr-only">Molded vs pultruded grating</caption>
          <thead>
            <tr className="border-b border-border-default bg-bg2">{["Selection question", "Molded grating", "Pultruded grating"].map((label) => <th key={label} scope="col" className={th}>{label}</th>)}</tr>
          </thead>
          <tbody>
            {comparisons.map(([question, molded, pultruded]) => (
              <tr key={question} className="border-b border-border-default align-top last:border-b-0">
                <th scope="row" className="px-[14px] py-[12px] font-semibold text-t1">{question}</th>
                <td className="px-[14px] py-[12px] leading-golden text-t2">{molded}</td>
                <td className="px-[14px] py-[12px] leading-golden text-t2">{pultruded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageSection>

    <GratingProjectPlanner tone="white" />
    <GratingVisualGuide firstFigure={2} tone="muted" />
    <GratingSelectionCriteria figure={4} tone="white" />
    <GratingBuyingGuide tones={["muted", "white"]} />

    <PageSection id="grating-applications" title="Connect the panel to the application" tone="muted">
      <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
        {applicationLinks.map((item) => (
          <li key={item.href}>
            <CoverLink href={item.href} cover={coverFor(item.href)!} title={item.title} text={item.text} />
          </li>
        ))}
      </ul>
      <p className="mt-[20px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14">
        <Link className={link} href="/case-studies/coastal-marina-walkway">Coastal walkway reference</Link>
        <Link className={link} href="/products/frp-handrail-systems">Handrail systems</Link>
        <Link className={link} href="/products/frp-deck-panels">Structural deck profiles</Link>
        <Link className={link} href="/technology/frp-vs-steel-gratings">FRP vs steel grating</Link>
      </p>
    </PageSection>

    <PageSection id="grating-faq" title="Fiberglass grating: selection & purchasing questions">
      <FAQList items={faq} />
    </PageSection>

    <PageSection id="quote" title="Send your grating requirements" tone="deep">
      <ProductRfq
        product="FRP grating"
        productPath={path}
        quoteHref={gratingInquiryHref(undefined, undefined, "grating-footer")}
        items={gratingRequestItems}
        links={[{ label: "Build a panel schedule", href: "#grating-quote" }]}
        intro="Whole panels or drawing-based requirements. Send what you know; quantities, fabrication and delivery scope are confirmed with the quotation."
      />
    </PageSection>
  </>;
}
