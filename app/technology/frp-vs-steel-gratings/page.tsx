import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import CoverCard from "@/components/ui/CoverCard";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { productCovers } from "@/lib/covers";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";

const pagePath = "/technology/frp-vs-steel-gratings";
const seoTarget = getSeoQueryTarget(pagePath);
const updatedAt = "2026-10-11";
const slipSource = "https://www.hse.gov.uk/pubns/geis2.pdf";
export const metadata: Metadata = buildPageMetadata({ title: seoTarget.title, description: seoTarget.description, path: pagePath, image: `${pagePath}/opengraph-image` });

const comparisonData = [
  ["Load and deflection", "Match a load table to the exact molded mesh or pultruded bearing-bar series, resin, span and support arrangement.", "Match the bearing-bar size, spacing, grade, span and support arrangement to the supplier's load table."],
  ["Installed weight", "Use the published panel mass for the selected row, then add clips, framing and accessories.", "Use the selected panel and support mass, including coating and accessories."],
  ["Chemical exposure", "Check the formulation, concentration, temperature, contact mode, barrier and cut edges.", "Check coating or alloy compatibility, damage and corrosion exposure."],
  ["Wet slip resistance", "Use a report for the offered grit or surface under the specified contamination and test directions.", "Use a report for the offered serration or surface under the same conditions."],
  ["Electrical duty", "Qualify the actual laminate and installation, including moisture, conductive additives and metal fixings.", "Coordinate bonding and grounding for the metal assembly."],
  ["Fire", "Match the required reaction-to-fire or fire-resistance evidence to the product and assembly.", "Steel is non-combustible; fire resistance of the installed structure still requires review."],
  ["Installation", "Plan cutting, dust control, sealing, handling and panel hold-downs.", "Plan handling, fabrication, fixings and coating repair; hot work depends on the installation method."],
  ["Whole-life cost", "Use project quotes, inspections, surface care, access and replacement assumptions.", "Use project quotes, inspections, protection repairs, access and replacement assumptions."],
];
const faqs = [
  { question: "Can FRP gratings carry the same loads as steel bar gratings?", answer: "An FRP option can be evaluated for the same project loads, but equal panel depth does not establish equivalent capacity. Compare the exact panel series, clear span, bearing width, load footprint and allowable deflection using the applicable supplier table. Wheel loads, impact and vehicle duty require specific review. This page publishes no universal FRP grating load rating." },
  { question: "Where can I find F1 grating load tables?", answer: "The molded and pultruded product pages publish nominal configurations, dimensions and weights. Send the selected row, support arrangement, loads, deflection limit, resin and service conditions for a review of available product-specific load evidence. Do not use a structural-profile beam table or the specification CSV as a grating load table." },
  { question: "Why consider FRP in a corrosive environment?", answer: "Glass FRP avoids steel-like rusting and may reduce protection work when the offered formulation and surface are compatible with the exposure. Review chemical concentration, temperature, contact and cleaning conditions. No resin family covers every chemical, and no universal maintenance interval applies." },
  { question: "Are FRP gratings automatically safe around electrical equipment?", answer: "No material label establishes electrical safety for an installation. Check the proposed material's electrical evidence and service conditions, including moisture, contamination, conductive additives, supports and fixings. The project electrical design controls insulation, bonding and grounding requirements." },
  { question: "How should I compare wet slip resistance?", answer: "Compare test results for the actual surface under the same wet or contaminated conditions and relevant directions. HSE classifies a pendulum test value of 36 or more as low slip potential within its assessment method. That threshold is not a test result for an F1 surface, and it does not guarantee that every installation is slip-free." },
  { question: "Is FRP always cheaper over its service life?", answer: "No. Compare installed quotes and site-specific maintenance, inspection, access, downtime, replacement and disposal assumptions over the same period. The life-cycle calculator accepts either material as the lower-cost outcome; its starting costs are illustrative index values, not market prices." },
];
const cell = "px-[14px] py-[12px] align-top text-t2";

export default function FrpVsSteelGratingsPage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: seoTarget.title, description: seoTarget.description, datePublished: "2026-04-15", dateModified: updatedAt, url: absoluteUrl(pagePath), author: { "@id": "https://www.f1composite.com/#organization" }, publisher: { "@id": "https://www.f1composite.com/#organization" }, citation: [slipSource, absoluteUrl("/products/frp-gratings"), absoluteUrl("/products/molded-frp-grating")] }} />
    <PageHeader updated={updatedAt} tag="Material comparison" title="FRP grating vs steel grating" description="Compare the same walkway duty, clear span, loads, deflection, surface and environment. Select the actual panel and support package before comparing weight, installation or whole-life cost." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology", href: "/technology" }, { label: "FRP vs steel gratings" }]} />
    <PageNav items={[{ id: "short-answer", label: "Selection basis" }, { id: "property-comparison", label: "Comparison" }, { id: "load-evidence", label: "Load evidence" }, { id: "where-frp-replaces-steel", label: "FRP review" }, { id: "where-steel-still-wins", label: "Steel review" }, { id: "faq", label: "FAQ" }, { id: "products", label: "Products" }]} />
    <PageSection id="short-answer" title="Start with the installed function and the exposure" tone="white">
      <p className="text-f16 leading-golden text-t2">FRP is a candidate where chemical compatibility, handling, thermal behavior or electrical requirements justify a composite solution. Steel is a candidate where its stiffness, fabrication options, fire requirements or installed cost suit the project. Both need a designed load path and evidence for the selected configuration.</p>
      <p className="mt-[12px] text-f16 leading-golden text-t2">For a fair comparison, keep the usable area, span, supports, load cases, deflection limit, opening requirements and installation scope the same. Allow each option to use its own appropriate panel depth and supporting structure.</p>
    </PageSection>
    <PageSection id="property-comparison" title="FRP and galvanized steel: what to compare" tone="muted" intro="A procurement checklist for two project options. These rows are not universal material ratings.">
      <div className="overflow-x-auto rounded-card border border-border-default bg-white"><table className="w-full min-w-[720px] border-collapse text-left text-f14"><thead><tr className="border-b border-border-default bg-bg2">{["Review", "Pultruded or molded FRP", "Steel bar grating"].map(label => <th key={label} scope="col" className={cell}>{label}</th>)}</tr></thead><tbody>{comparisonData.map(([property, frp, steel]) => <tr key={property} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} font-semibold`}>{property}</th><td className={`${cell} bg-teal-bg`}>{frp}</td><td className={cell}>{steel}</td></tr>)}</tbody></table></div>
      <p className="mt-[16px] text-f14 leading-golden text-t2">For wet slip assessment, see <a href={slipSource} className="font-semibold text-teal-text underline underline-offset-4">HSE&apos;s explanation of pendulum testing</a>. Its test conditions and interpretation are a method reference, not proof of the slip rating of either offered surface.</p>
    </PageSection>
    <PageSection id="load-evidence" title="Ask for a load table that identifies the panel" tone="white">
      <p className="text-f16 leading-golden text-t2">F1&apos;s <Link href="/products/frp-gratings#pultruded-grating-specifications" className="font-semibold text-teal-text underline underline-offset-4">pultruded</Link> and <Link href="/products/molded-frp-grating#molded-grating-specifications" className="font-semibold text-teal-text underline underline-offset-4">molded</Link> specification tables list nominal geometry and weight. They do not publish rated loads. Request an assessment of available load and deflection evidence for the candidate configuration.</p>
      <ul className="mt-[20px] grid gap-[12px] text-f16 leading-golden text-t2 md:grid-cols-2">{[
        ["Identify the product", "Series or mesh, bearing-bar depth and spacing, resin, surface, panel dimensions and document revision."],
        ["Define the supports", "Clear span, bearing width, span direction, single or multiple spans, overhangs, cutouts and fastening arrangement."],
        ["Define the loads", "Uniform, concentrated and wheel loads, contact footprint, impact and any installation or maintenance load."],
        ["Read the result basis", "Allowable load, deflection criterion, test or calculation method, factors, temperature and sustained-load conditions."],
      ].map(([title, body]) => <li key={title} className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="font-bold text-t1">{title}</h3><p className="mt-[8px]">{body}</p></li>)}</ul>
      <p className="mt-[16px] text-f14 leading-golden text-t2">A bare load value without its span and conditions cannot establish suitability. The <Link href="/resources/blog/how-to-read-frp-grating-load-table" className="font-semibold text-teal-text underline underline-offset-4">load-table reading guide</Link> explains the checks. Structural-profile calculators evaluate individual members and do not qualify a grating panel.</p>
    </PageSection>
    <PageSection id="where-frp-replaces-steel" title="When an FRP option merits review" tone="muted">
      <ul className="space-y-[16px] text-f16 leading-golden text-t2">{[
        ["Chemical and wastewater sites", "Identify the chemicals, concentration, operating and upset temperatures, splash or immersion and cleaning. Match those inputs to a named resin formulation and surface system."],
        ["Coastal and outdoor access", "Review salt, sunlight, standing water, surface wear and exposed cuts together. Confirm the proposed UV protection and inspection plan."],
        ["Electrical environments", "Use the actual material and assembly evidence to address insulation requirements. Include supports, clips and other conductive parts in the electrical design."],
        ["Difficult installation access", "Compare the actual panel and supporting-system masses, lifting plan, cut plan and fixing work. Material density alone does not determine crew size or installation time."],
      ].map(([title, body]) => <li key={title}><strong className="text-t1">{title}. </strong>{body}</li>)}</ul>
    </PageSection>
    <PageSection id="where-steel-still-wins" title="When to keep a steel option in the comparison" tone="white">
      <p className="text-f16 leading-golden text-t2">Review steel where stiffness, vehicle duty, familiar connection details, non-combustible material requirements or the installed quotation favor it. Check the exact wheel footprint and load arrangement instead of applying a universal wheel-load threshold. Steel&apos;s maintenance schedule also needs a defined coating, environment and inspection basis.</p>
      <p className="mt-[12px] text-f16 leading-golden text-t2">Compare future work with the <Link href="/tools/frp-life-cycle-cost-calculator" className="font-semibold text-teal-text underline underline-offset-4">life-cycle cost calculator</Link>. Use quoted costs and site assumptions; the tool does not predict a guaranteed service life or automatically favor FRP.</p>
    </PageSection>
    <PageSection id="faq" title="Frequently asked questions" tone="muted"><FAQList items={faqs} /></PageSection>
    <PageSection id="products" title="Select a candidate F1 grating configuration" tone="white" intro="Start with a published specification row, then confirm resin, surface, supports, clips and the available project evidence."><ul className="grid gap-[16px] md:grid-cols-2"><li><CoverCard href="/products/molded-frp-grating" cover={productCovers["/products/molded-frp-grating"]} title="Molded FRP grating" text="Compare mesh, depth, nominal panel sizes and weights; define cutouts and support requirements." action="View molded grating" sizes="(max-width: 767px) 94vw, 46vw" /></li><li><CoverCard href="/products/frp-gratings" cover={productCovers["/products/frp-gratings"]} title="Pultruded FRP grating" text="Compare bearing-bar series, depth, spacing and nominal weight for a defined span direction." action="View pultruded grating" sizes="(max-width: 767px) 94vw, 46vw" /></li></ul></PageSection>
    <RelatedLinks background="bg2" groups={[{ title: "Evidence and environment", links: [{ href: "/resources/evidence", label: "Published evidence and scope" }, { href: "/technology/quality-testing", label: "Inspection and release requirements" }, { href: "/technology/pultrusion-resin-systems", label: "Chemical and UV selection" }] }, { title: "Design and cost", links: [{ href: "/resources/blog/how-to-read-frp-grating-load-table", label: "Read a grating load table" }, { href: "/technology/frp-vs-traditional-materials", label: "Equivalent-function material comparison" }, { href: "/tools/frp-life-cycle-cost-calculator", label: "Compare life-cycle assumptions" }] }, { title: "Project scope", links: [{ href: "/applications/frp-chemical-plant-platforms", label: "Platform components and procurement" }, { href: "/products/fiberglass-structural-shapes/frp-i-beam", label: "Individual support beams" }, { href: "/products/fiberglass-structural-shapes/frp-channel", label: "Individual support channels" }] }]} />
    <InnerCTA title="Send a panel layout, load schedule and exposure conditions for review" />
  </>;
}
