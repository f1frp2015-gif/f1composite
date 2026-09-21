import GratingApplicationCards from "@/components/sections/GratingApplicationCards";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GratingHero from "@/components/sections/GratingHero";
import GratingProjectPlanner from "@/components/sections/GratingProjectPlanner";
import GratingVisualGuide from "@/components/sections/GratingVisualGuide";
import GratingSelectionCriteria from "@/components/sections/GratingSelectionCriteria";
import GratingBuyingGuide from "@/components/sections/GratingBuyingGuide";
import CollectionSchema from "@/components/seo/CollectionSchema";
import FAQ from "@/components/ui/FAQ";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata } from "@/lib/seo";
import { gratingInquiryHref } from "@/lib/gratingInquiry";

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

export default function GratingPage() {
  return <>
    <CollectionSchema name="Fiberglass & FRP Grating" description={seo.description} path={path} links={links} />
    <GratingHero title="Fiberglass Grating for Industrial Projects" description="Choose molded mesh or pultruded bearing-bar panels for walkways, platforms and access systems. Compare configurations, review the engineering inputs and send a panel schedule for quotation." image="/images/products/grating/grating-panel-comparison.webp" imageAlt="Illustrative green molded square-mesh and yellow pultruded grating samples side by side" caption="AI-generated product illustration showing two constructions; not a dimensioned specification or project photograph." facts={[{ label: "Constructions", value: "Molded & pultruded" }, { label: "Selection data", value: "Dimensions & weights" }, { label: "Fixing systems", value: "Matched 316SS clips" }, { label: "Procurement", value: "Project & bulk enquiries" }]} />
    <GratingApplicationCards />
    <section id="grating-types" className="bg-white py-[40px] md:py-[56px]">
      <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
        <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">Choose the construction</p>
        <h2 className="mt-[10px] text-f31 font-bold text-t1">Two ways to build your walking surface</h2>
        <p className="mt-[12px] max-w-[850px] text-f15 leading-relaxed text-t2">Fiberglass grating is also called fibreglass or GRP grating. The important choice is how the panel carries the load and fits the layout.</p>
        <div className="mt-[24px] grid gap-[24px] md:grid-cols-2">
          {links.map(item => <article key={item.href} className="overflow-hidden rounded-[12px] border border-border-default">
            <Link href={item.href} className="relative block aspect-[5/2]"><Image src={item.image} alt={`${item.label}: close-up of the open walking surface`} fill sizes="(max-width: 767px) 94vw, 46vw" className="object-cover" /></Link>
            <div className="p-[24px]"><p className="text-f11 font-bold uppercase tracking-wide text-teal-text">{item.tag}</p><h3 className="mt-[10px] text-f24 font-bold text-t1">{item.label}</h3><p className="mt-[12px] text-f15 leading-relaxed text-t2">{item.body}</p><p className="mt-[16px] text-f13 font-semibold text-t1">{item.details}</p><Link href={item.href} className="mt-[16px] inline-flex min-h-[44px] items-center font-bold text-teal-text">View specifications →</Link></div>
          </article>)}
        </div>
        <div id="molded-vs-pultruded" className="mt-[32px] scroll-mt-[100px] overflow-x-auto rounded-[10px] border border-border-default" role="region" aria-label="Molded and pultruded grating comparison" tabIndex={0}>
          <table className="w-full min-w-[660px] text-left text-f14"><caption className="p-[20px] text-left text-f24 font-bold text-t1">Molded vs pultruded grating</caption><thead className="bg-bg2"><tr>{["Selection question", "Molded grating", "Pultruded grating"].map(label => <th key={label} scope="col" className="p-[16px]">{label}</th>)}</tr></thead><tbody>{comparisons.map(([question, molded, pultruded]) => <tr key={question} className="border-t border-border-default"><th scope="row" className="p-[16px] font-semibold">{question}</th><td className="p-[16px] text-t2">{molded}</td><td className="p-[16px] text-t2">{pultruded}</td></tr>)}</tbody></table>
        </div>
      </div>
    </section>
    <GratingProjectPlanner />
    <GratingVisualGuide />
    <GratingSelectionCriteria />
    <GratingBuyingGuide />
    <section className="bg-bg2 py-[44px] md:py-[60px]">
      <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
        <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">Plan the complete access system</p>
        <h2 className="mt-[10px] text-f31 font-bold text-t1">Connect the panel to the application</h2>
        <div className="mt-[24px] grid gap-[20px] md:grid-cols-3">
          {[
            { title: "Process platforms", body: "Identify chemical exposure, support spacing and service access around equipment.", href: "/applications/frp-chemical-plant-platforms", label: "Platform requirements" },
            { title: "Water & coastal access", body: "Coordinate wet surfaces, drainage, supports and the inspection environment.", href: "/industries/water-wastewater", label: "Water and wastewater applications" },
            { title: "Steps, handrails & decks", body: "Match stair treads and guarding to the layout. Closed structural decks have separate specifications.", href: "/products/frp-stair-treads", label: "Grating stair treads" },
          ].map(item => <article key={item.title} className="rounded-[10px] border border-border-default bg-white p-[24px]"><h3 className="text-f19 font-bold">{item.title}</h3><p className="mt-[10px] text-f14 leading-relaxed text-t2">{item.body}</p><Link className="mt-[16px] inline-block text-f13 font-bold text-teal-text" href={item.href}>{item.label} →</Link></article>)}
        </div>
        <div className="mt-[22px] flex flex-wrap gap-x-[24px] gap-y-[12px] text-f13 font-semibold text-teal-text"><Link href="/case-studies/coastal-marina-walkway">Coastal walkway reference →</Link><Link href="/products/frp-handrail-systems">Handrail systems →</Link><Link href="/products/frp-deck-panels">Structural deck profiles →</Link><Link href="/technology/frp-vs-steel-gratings">FRP vs steel grating →</Link></div>
      </div>
    </section>
    <section id="grating-faq" className="scroll-mt-[100px] bg-white px-[20px] pb-[50px] sm:px-[28px]"><div className="mx-auto max-w-[1280px]"><FAQ title="Fiberglass grating: selection & purchasing questions" items={faq} /></div></section>
    <section className="border-t border-border-default bg-white px-[20px] py-[30px] text-center"><Link className="inline-flex min-h-[48px] items-center rounded-[7px] bg-teal-text px-[24px] font-bold text-white" href={gratingInquiryHref(undefined, undefined, "grating-footer")}>Send your grating requirements →</Link></section>
  </>;
}
