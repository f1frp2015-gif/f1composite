import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Figure from "@/components/ui/Figure";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import { prefillForProduct } from "@/lib/aiPrefill";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import ResinSelector from "./ResinSelector";
import LaminateMicrograph from "./LaminateMicrograph";
import { MatrixFormationFigure, LoadTransferFigure } from "./MatrixFigures";
import { resinSystems, resinSelectionSources } from "./resinSystems";

const publishedAt = "2026-07-08";
const updatedAt = "2026-10-26";
const pagePath = "/technology/pultrusion-resin-systems";
const description = "Vinyl ester vs polyester resin for pultruded FRP, plus PU, epoxy and phenolic: define chemical exposure, UV protection, temperature and formulation evidence.";
export const metadata: Metadata = buildPageMetadata({ title: "Vinyl Ester vs Polyester Resin: Pultrusion Resin Guide", description, path: pagePath });

const resinFaqs = [
  { question: "What is the difference between polyester and vinyl ester in pultrusion?", answer: "They are different resin families with many formulations. Isophthalic polyester is a starting option for general structural service; vinyl ester is often considered for chemical exposure. Select between actual offered formulations using the chemical, concentration, temperature and exposure conditions. Neither the family name nor a higher resin price establishes compatibility." },
  { question: "Which resin system should I specify for corrosive environments?", answer: "Send the chemical name or mixture, concentration range, operating and upset temperatures, splash or immersion exposure, duration, cleaning process and structural loads. The supplier can then review a named formulation and corrosion-barrier construction against its documented limits. A blank chemical-guide entry means evidence is missing, not that the resin is suitable." },
  { question: "Is vinyl ester automatically more UV resistant than polyester?", answer: "No family-wide ranking establishes outdoor performance. Review the resin formulation, UV additives, veil, pigment, coating, exposed edges and maintenance plan together. Weathering evidence should identify the specimen, exposure cycle and retained property or appearance criterion." },
  { question: "Does HDT or Tg define the maximum working temperature?", answer: "No. HDT and Tg come from different test methods and describe different responses. A working temperature also depends on load, time, chemical exposure and retained laminate properties. Use formulation and product data for the stated conditions; do not substitute a generic family range for a service rating." },
  { question: "Which resin is best for fire performance?", answer: "Compare the offered formulations against the project's flame, smoke, toxicity and assembly requirements. Polyester, vinyl ester, PU, epoxy or phenolic labels alone establish no fire classification. Match the original report to its material, reinforcement, thickness and test arrangement." },
  { question: "Can I choose a different resin for a catalog section?", answer: "Ask for a review of the section, reinforcement, process and required quantity. A new resin may change processing, dimensions, mass and performance. The catalog's default material values and evidence do not transfer automatically; confirm the offered formulation and records in the quotation." },
];

const vinylEsterVsPolyester = [
  ["Typical role", "General structural service and the default resin of many catalog sections.", "Shortlisted for wet, chemical and more aggressive exposures."],
  ["Water and chemicals", "Adequate for many outdoor and mild exposures; confirm aggressive chemicals against the formulation.", "Fewer ester groups give better resistance to hydrolysis; confirm each chemical, concentration and temperature."],
  ["Toughness", "Lower fracture toughness than vinyl ester as a family.", "Tougher as a family, which helps at holes, connections and impact."],
  ["Cost", "Lower material cost.", "Higher material cost; compare in quotations for the same section and quantity."],
  ["What to request", "Formulation name, laminate properties and any exposure data for the service.", "Formulation name, chemical-guide entry or test data for each exposure, plus laminate properties."],
];

const exposureInputs = [
  ["Chemical", "Name, composition or mixture, concentration range and contaminants.", "Supplier compatibility entry for the named formulation; clarify missing entries."],
  ["Temperature", "Normal and upset temperatures, duration and cycling.", "Compatibility limit plus retained laminate properties under the intended load."],
  ["Contact", "Immersion, splash, fumes or intermittent contact; duration and cleaning.", "Applicable exposure category, barrier construction and any inspection conditions."],
  ["Outdoor surface", "Sunlight, moisture, color and finish requirements; exposed cuts and holes.", "Veil / additive / coating specification and relevant weathering evidence."],
  ["Mechanical duty", "Section, reinforcement, sustained load, connections and acceptance criteria.", "Product-specific properties and factors; a resin TDS alone does not rate a member."],
];

export default function PultrusionResinSystemsPage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: "Vinyl ester vs polyester and other pultrusion resin systems", description, url: absoluteUrl(pagePath), datePublished: publishedAt, dateModified: updatedAt, author: { "@type": "Person", name: "Haifeng Gong", url: absoluteUrl("/about/authors/haifeng-gong") }, publisher: { "@id": "https://www.f1composite.com/#organization" }, citation: resinSelectionSources.map(source => source.href) }} />
    <PageHeader updated={updatedAt} tag="Materials science" title="Vinyl ester vs polyester and other pultrusion resins" description="Start with the service conditions, then compare named formulations and the evidence for the offered laminate. A resin-family label helps organize the review; it does not establish a chemical, fire or temperature rating." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology", href: "/technology" }, { label: "Resin systems" }]} figure={<Figure number={1} title="Resin formulation" note="Illustrative photo" caption="Illustrative laboratory scene. The offered formulation and required records are agreed for the order." bleed><div className="relative aspect-[16/10]"><Image src="/images/technology/resin-formulation-laboratory-testing.jpg" alt="Resin samples dispensed into test tubes in a laboratory" fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload /></div></Figure>} />
    <PageNav items={[{ id: "resin-matrix", label: "Matrix" }, { id: "vinyl-ester-vs-polyester", label: "Vinyl ester vs polyester" }, { id: "resin-selector", label: "Compare families" }, { id: "five-resin-systems", label: "Selection table" }, { id: "how-to-choose", label: "Exposure review" }, { id: "uv-protection", label: "UV protection" }, { id: "faq", label: "FAQ" }]} />
    <PageSection id="resin-matrix" title="What does the resin matrix do?" tone="white">
      <p className="text-f16 leading-golden text-t2">The cured matrix binds the reinforcement and transfers load between fibers. The reinforcement, matrix, fiber architecture, cure and section geometry work together: changing resin can affect processing, transverse properties, connections and durability. Axial properties also need confirmation for the new laminate.</p>
      <div className="mt-[32px] grid gap-[20px] lg:grid-cols-2"><MatrixFormationFigure /><LoadTransferFigure /></div>
    </PageSection>
    <PageSection id="laminate" title="Inside the laminate" tone="muted" intro="Explore how reinforcement and matrix share a section. This teaching illustration does not define a production recipe or qualify a catalog product."><LaminateMicrograph /></PageSection>
    <PageSection id="vinyl-ester-vs-polyester" title="Vinyl ester vs polyester resin in a pultruded profile" tone="white" intro="The two families most often compared for pultruded FRP. Family chemistry explains the usual pattern; the offered formulation and its evidence decide the specification.">
      <div className="relative overflow-x-auto rounded-card border border-border-default bg-white"><table className="w-full min-w-[760px] border-collapse text-left text-f14"><thead><tr className="border-b border-border-default bg-bg2"><th scope="col" className="px-[14px] py-[10px]">Question</th><th scope="col" className="px-[14px] py-[10px]">Isophthalic polyester</th><th scope="col" className="px-[14px] py-[10px]">Vinyl ester</th></tr></thead><tbody>{vinylEsterVsPolyester.map(([question, polyester, vinylEster]) => <tr key={question} className="border-b border-border-default align-top last:border-b-0"><th scope="row" className="px-[14px] py-[12px] font-semibold text-t1">{question}</th><td className="px-[14px] py-[12px] text-t2">{polyester}</td><td className="px-[14px] py-[12px] text-t2">{vinylEster}</td></tr>)}</tbody></table></div>
      <p className="mt-[16px] text-f16 leading-golden text-t2">Vinyl ester molecules carry fewer ester groups than polyester and react only at the chain ends, which is the usual explanation for their better resistance to hydrolysis and higher toughness. That pattern is a reason to shortlist vinyl ester for wet chemical service, not proof that a given formulation suits your chemical: check the named resin against the exposure schedule below. The same reasoning applies to <Link href="/products/frp-gratings" className="font-semibold text-teal-text underline underline-offset-4">grating</Link> and <Link href="/products/fiberglass-structural-shapes" className="font-semibold text-teal-text underline underline-offset-4">structural profiles</Link>.</p>
    </PageSection>
    <PageSection id="resin-selector" title="Compare the questions each resin family raises" tone="muted" intro="Choose a family to review candidate uses and the information needed before release. This selector makes no numerical performance ranking."><ResinSelector /></PageSection>
    <PageSection id="five-resin-systems" title="Polyester, vinyl ester, PU, epoxy and phenolic" tone="white" intro="Family-level purchasing guidance. The named formulation, reinforcement and production route still need confirmation.">
      <div className="overflow-x-auto rounded-card border border-border-default bg-white"><table className="w-full min-w-[760px] border-collapse text-left text-f14"><thead><tr className="border-b border-border-default bg-bg2"><th scope="col" className="px-[14px] py-[10px]">Resin family</th><th scope="col" className="px-[14px] py-[10px]">When to review it</th><th scope="col" className="px-[14px] py-[10px]">Release question</th></tr></thead><tbody>{resinSystems.map(system => <tr key={system.key} className="border-b border-border-default align-top last:border-b-0"><th scope="row" className="px-[14px] py-[12px] font-semibold text-t1">{system.name}</th><td className="px-[14px] py-[12px] text-t2">{system.use}</td><td className="px-[14px] py-[12px] text-t2">{system.release}</td></tr>)}</tbody></table></div>
      <p className="mt-[16px] text-f14 leading-golden text-t2">Compare material and processing costs in quotations for the same drawing, reinforcement, quantity, finishing and testing. This page does not assign a universal price multiplier or temperature range to a resin family.</p>
    </PageSection>
    <PageSection id="how-to-choose" title="Turn chemical exposure into a formulation review" tone="muted" intro="Provide the complete exposure schedule, including cleaning and upset conditions. A candidate is ready for specification only when the relevant evidence and its limits are resolved.">
      <div className="overflow-x-auto rounded-card border border-border-default"><table className="w-full min-w-[760px] border-collapse text-left text-f14"><thead><tr className="border-b border-border-default bg-bg2">{["Input", "What the buyer supplies", "What to match"].map(label => <th key={label} scope="col" className="px-[14px] py-[10px]">{label}</th>)}</tr></thead><tbody>{exposureInputs.map(([input, buyer, evidence]) => <tr key={input} className="border-b border-border-default align-top last:border-b-0"><th scope="row" className="px-[14px] py-[12px] text-t1">{input}</th><td className="px-[14px] py-[12px] text-t2">{buyer}</td><td className="px-[14px] py-[12px] text-t2">{evidence}</td></tr>)}</tbody></table></div>
      <p className="mt-[16px] text-f16 leading-golden text-t2">A supplier chemical guide is useful only within its stated resin, construction and exposure scope. For example, the Derakane resin selection guide from <a href={resinSelectionSources[0].href} className="font-semibold text-teal-text underline underline-offset-4">the resin supplier</a> distinguishes missing data from a recommendation against use and attaches conditions to individual entries. Its equipment and barrier assumptions must be checked before applying an entry to a pultruded section.</p>
    </PageSection>
    <PageSection id="uv-protection" title="Specify UV protection separately from chemical compatibility" tone="white">
      <p className="text-f16 leading-golden text-t2">Outdoor performance depends on the complete surface system: resin, UV additives, veil, pigment, coating and exposed cut edges. Define whether acceptance concerns color, gloss, fiber exposure, retained strength or another property, then request evidence for that criterion and the proposed surface.</p>
      <p className="mt-[12px] text-f16 leading-golden text-t2">A veil alone does not establish a fixed outdoor life. Agree inspection and any surface renewal for the environment. Strongwell&apos;s <a href={resinSelectionSources[1].href} className="font-semibold text-teal-text underline underline-offset-4">custom-pultrusion guidance</a> describes these protection choices as an industry reference; it does not qualify F1 products.</p>
      <p className="mt-[12px] text-f16 leading-golden text-t2">For the offered configuration, use the <Link href="/resources/evidence" className="font-semibold text-teal-text underline underline-offset-4">F1 evidence index</Link> to distinguish a technical reference from a matching report. Confirm the report identity, sample, method and applicable limits before release.</p>
    </PageSection>
    <PageSection id="faq" title="Frequently asked questions" tone="muted">
      <FAQList items={resinFaqs} />
      <p className="mt-[20px] text-f16 leading-golden text-t2">For the difference between noncombustible glass fibres and a resin-bonded product, read <Link href="/resources/blog/frp-fire-resistance-ratings-guide" className="font-semibold text-teal-text hover:underline">Is fibreglass flammable? Glass, resin and fire-test scope</Link>.</p>
    </PageSection>
    <RelatedLinks background="white" groups={[{ title: "Evidence and process", links: [{ href: "/resources/evidence", label: "Product evidence and applicability" }, { href: "/technology/quality-testing", label: "Inspection and release records" }, { href: "/technology/pultrusion-process", label: "Pultrusion process" }] }, { title: "Select a product", links: [{ href: "/products/fiberglass-sheets", label: "Solid fiberglass sheets" }, { href: "/products/fiberglass-structural-shapes", label: "Standard structural profiles" }, { href: "/products/custom-pultruded-profiles", label: "Custom formulation and section review" }, { href: "/products/frp-gratings", label: "Pultruded grating" }, { href: "/products/molded-frp-grating", label: "Molded grating" }] }, { title: "Compare alternatives", links: [{ href: "/technology/frp-vs-traditional-materials", label: "FRP, steel and aluminum" }, { href: "/tools/frp-life-cycle-cost-calculator", label: "Life-cycle cost assumptions" }] }]} />
    <InnerCTA title="Send the exposure schedule and the part drawing for a material review" advisorPrompt={prefillForProduct({ name: "Pultrusion resin systems", path: pagePath, question: "Review a candidate formulation for my section and chemical composition, concentration, normal/upset temperatures, contact mode, duration, cleaning, loads and UV/fire requirements. Identify applicable evidence and unresolved inputs before recommending it." })} />
  </>;
}
