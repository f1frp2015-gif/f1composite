import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import Figure from "@/components/ui/Figure";
import RelatedLinks from "@/components/sections/RelatedLinks";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { materialComparisonContext as comparison, equalStiffnessExample as example, equalStiffnessResults as result } from "@/content/data/materialComparison";

const pagePath = "/technology/frp-vs-traditional-materials";
const seoTarget = getSeoQueryTarget(pagePath);
const updatedAt = "2026-10-11";
export const metadata: Metadata = buildPageMetadata({ title: seoTarget.title, description: seoTarget.description, path: pagePath, image: `${pagePath}/opengraph-image` });

const materials = ["Pultruded glass FRP", "Steel", "Aluminum", "Timber", "Concrete"];
const comparisonRows = [
  ["Structural behavior", "Directional laminate properties; review deflection, creep and connections.", "Review grade, section, stability and connection design.", "Review alloy, temper, section and welded-zone properties.", "Review species, grade, moisture, grain direction and connection details.", "Review concrete and reinforcement grades, cracking, creep and detailing."],
  ["Weight", "Use the selected section's published mass and complete BOM.", "Use the selected section, coating and connections.", "Use the selected section and fabrication details.", "Use the designed member size and moisture basis.", "Use the designed volume, reinforcement and connections."],
  ["Exposure", "Match resin, surface and cut-edge treatment to chemical and outdoor duty.", "Specify a compatible protection system and inspect damaged areas.", "Review chloride, galvanic and surface-finish conditions.", "Review moisture, decay, insects and required treatment.", "Review permeability, cracking, chemicals and reinforcement corrosion."],
  ["Electrical and thermal duty", "Use evidence for the offered material and assembly; conductive additives or hardware matter.", "Conductive metal; coordinate thermal breaks, bonding and grounding.", "Conductive metal; coordinate thermal breaks, bonding and grounding.", "Properties depend on moisture and build-up; qualify the assembly.", "Properties depend on moisture, reinforcement and build-up."],
  ["Fire", "Tested formulation and assembly determine applicable performance.", "Non-combustible material; member fire resistance still requires design.", "Non-combustible material; strength retention and assembly still require design.", "Combustibility, charring and assembly design require review.", "Section, cover, moisture and assembly determine fire resistance."],
  ["Whole-life cost", "Quote the same function and include inspection, surface care and replacement assumptions.", "Include protection, inspection, access and future repair assumptions.", "Include finish, connections, inspection and repair assumptions.", "Include treatment, inspection, repair and replacement assumptions.", "Include inspection, crack repair and access assumptions."],
];
const reference = comparison.frpReference;
const grade = reference.gradeMinimums;
const faqItems = [
  { question: "Is FRP stronger than steel?", answer: "There is no universal member-level ranking. FRP tensile strength is directional, while steel design may be governed by yielding, stability or deflection. Compare design values and the complete section for the same loads, spans, deflection and connection requirements. A tensile-strength-to-density ratio is not a replacement-member check." },
  { question: "What are the advantages of fiberglass over aluminum?", answer: "Glass FRP can offer low thermal conductivity and a compatible nonmetallic solution for some chemical or electrical duties. Aluminum may suit other stiffness, fabrication or fire requirements. Check the actual laminate or alloy, surface, connections and assembly; glass FRP does not resist every acid or alkali." },
  { question: "Can an FRP beam replace a steel beam of the same dimensions?", answer: "Only after structural review. Lower elastic modulus can make deflection govern even when a strength comparison looks favorable. Review shear deformation, creep, local buckling, environmental factors and connections as well as bending. The example on this page isolates bending stiffness and does not approve a substitution." },
  { question: "How should I compare FRP with timber or concrete?", answer: "Define the same installed function first, then compare designed member sizes, foundations, connections, exposure, fire requirements and maintenance. Material density alone cannot establish the weight or cost of an equivalent structure. Timber grade and moisture, and concrete reinforcement and cracking, belong in the comparison." },
  { question: "Does FRP always have the lowest life-cycle cost or carbon footprint?", answer: "No. Cost depends on actual quotations, installation, inspection, maintenance, access, replacement and discount assumptions. Carbon comparisons need compatible EPD or LCA boundaries for the same function and service period. Neither result follows from the material name." },
];
const cell = "px-[14px] py-[12px] align-top text-t2";

export default function FrpVsTraditionalPage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: seoTarget.title, description: seoTarget.description, url: absoluteUrl(pagePath), datePublished: "2024-03-22", dateModified: updatedAt, author: { "@id": "https://www.f1composite.com/#organization" }, publisher: { "@id": "https://www.f1composite.com/#organization" }, citation: [comparison.materialData, reference.evidenceUrl] }} />
    <PageHeader updated={updatedAt} tag="Material comparison" title="FRP vs steel, aluminum, timber and concrete" description="Compare materials for the same job: span, loads, deflection, exposure, connections and service period. Use the designed member and installed cost to choose an option; a material property or density ratio is only one input." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology", href: "/technology" }, { label: "FRP vs traditional materials" }]} />
    <PageNav items={[{ id: "why-frp", label: "Comparison basis" }, { id: "properties-table", label: "Material choices" }, { id: "visual-comparison", label: "E23 reference" }, { id: "detailed-analysis", label: "Worked example" }, { id: "lifecycle", label: "Cost and carbon" }, { id: "faq", label: "FAQ" }]} />
    <PageSection id="why-frp" title="Define an equivalent function before comparing materials" tone="white">
      <Figure number={1} title="Material surfaces" note="Illustrative photo" className="mb-[24px]" bleed><Image src="/images/technology/frp-vs-steel-aluminum-timber-concrete-material-comparison.jpg" alt="Metal, timber and composite material surfaces" width={1280} height={500} sizes="(max-width: 1280px) 94vw, 1216px" className="h-auto w-full" preload /></Figure>
      <ol className="grid gap-[12px] text-f16 leading-golden text-t2 md:grid-cols-2">{[
        ["1. Freeze the duty", "Use the same span, support conditions, loads, deflection limit, environment and required service period."],
        ["2. Design each option", "Let each material use an appropriate section and connection. Equal outer dimensions or equal mass do not mean equal capacity."],
        ["3. Compare the installed package", "Include supports, foundations, fabrication, fasteners, protection, transport and installation access."],
        ["4. Review evidence and future work", "Match material properties to their basis, then compare inspection, maintenance, replacement and end-of-life assumptions."],
      ].map(([title, body]) => <li key={title} className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="font-bold text-t1">{title}</h3><p className="mt-[8px]">{body}</p></li>)}</ol>
    </PageSection>
    <PageSection id="properties-table" title="What changes when the material changes?" tone="muted" intro="These are design and procurement checks, not a ranking of interchangeable members.">
      <div className="overflow-x-auto rounded-card border border-border-default bg-white"><table className="w-full min-w-[1080px] border-collapse text-left text-f14"><thead><tr className="border-b border-border-default bg-bg2"><th scope="col" className={cell}>Review</th>{materials.map(material => <th key={material} scope="col" className={cell}>{material}</th>)}</tr></thead><tbody>{comparisonRows.map(([property, ...values]) => <tr key={property} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} font-semibold`}>{property}</th>{values.map((value, index) => <td key={index} className={cell}>{value}</td>)}</tr>)}</tbody></table></div>
    </PageSection>
    <PageSection id="visual-comparison" title="A defined FRP reference: the published E23-ISO laminate" tone="white" intro="Keep grade requirements separate from measured product performance. These values come from the same material data used by the F1 technical-data page.">
      <div className="overflow-x-auto rounded-card border border-border-default"><table className="w-full min-w-[600px] border-collapse text-left text-f14"><thead><tr className="border-b border-border-default bg-bg2">{["Property", "Value", "Basis"].map(label => <th key={label} scope="col" className={cell}>{label}</th>)}</tr></thead><tbody>{[
        ["Density", `${reference.publishedDensityGPerCm3} g/cm³`, "Published nominal E23-ISO laminate value; not a batch result."],
        ["Longitudinal tensile modulus", `${grade.longitudinalTensileModulusGPa} GPa`, "EN 13706 E23 minimum; EN ISO 527-4 test reference."],
        ["Transverse tensile modulus", `${grade.transverseTensileModulusGPa} GPa`, "EN 13706 E23 minimum; EN ISO 527-4 test reference."],
        ["Longitudinal tensile strength", `${grade.longitudinalTensileStrengthMPa} MPa`, "EN 13706 E23 minimum; not an allowable design stress."],
        ["Transverse tensile strength", `${grade.transverseTensileStrengthMPa} MPa`, "EN 13706 E23 minimum; do not replace with the longitudinal value."],
      ].map(([property, value, basis]) => <tr key={property} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} font-semibold`}>{property}</th><td className={cell}>{value}</td><td className={cell}>{basis}</td></tr>)}</tbody></table></div>
      <p className="mt-[16px] text-f14 leading-golden text-t2">Source: EN 13706-3:2002 Table 1 as documented in <Link href="/resources/technical-data" className="font-semibold text-teal-text underline underline-offset-4">F1 technical data</Link>. Confirm the offered formulation and <Link href="/resources/evidence" className="font-semibold text-teal-text underline underline-offset-4">applicable reports</Link>; these reference values do not certify every catalog section.</p>
    </PageSection>
    <PageSection id="detailed-analysis" title="Worked example: equal bending stiffness, not equal outer dimensions" tone="muted" intro="This illustrative calculation compares a simply supported beam under the same uniform line load. It selects no commercial section and is not a completed design.">
      <div className="grid gap-[20px] lg:grid-cols-2"><div className="rounded-card border border-border-default bg-white p-[24px]"><h3 className="text-f18 font-bold text-t1">Chosen inputs</h3><ul className="mt-[12px] space-y-[8px] text-f16 text-t2"><li>Span L = {example.spanMm} mm; uniform load w = {example.uniformLoadNPerMm} N/mm (1 kN/m).</li><li>Steel E = {example.steelModulusGPa} GPa; I = {example.steelInertiaMm4.toLocaleString("en-US")} mm⁴. Both are example inputs.</li><li>FRP longitudinal E = {example.frpModulusGPa} GPa, using the E23 grade reference above.</li><li>Bending-only equation: δ = 5wL⁴ / (384EI).</li></ul></div><div className="rounded-card border border-teal-border bg-teal-bg p-[24px]"><h3 className="text-f18 font-bold text-t1">Calculated result</h3><p className="mt-[12px] text-f16 leading-golden text-t2">With the same I, bending deflection is {result.steelBendingDeflectionMm.toFixed(2)} mm for the steel input and {result.sameSectionFrpBendingDeflectionMm.toFixed(2)} mm for the FRP input. Matching EI requires FRP I = {Math.round(result.requiredFrpInertiaMm4).toLocaleString("en-US")} mm⁴, or {result.inertiaRatio.toFixed(2)} times the example steel I.</p><p className="mt-[12px] text-f16 leading-golden text-t2">A larger I does not identify a suitable section or determine its mass. The next step is to check actual candidate geometries, strength, connections and service conditions.</p></div></div>
      <p className="mt-[16px] text-f14 leading-golden text-t2">Excluded here: shear deflection, creep, local buckling, connections, temperature and durability factors, strength checks and self-weight differences. Use the <Link href="/frp-profile-calculator" className="font-semibold text-teal-text underline underline-offset-4">profile calculator</Link> for a broader preliminary screen, followed by project engineering review.</p>
    </PageSection>
    <PageSection id="lifecycle" title="Compare costs and environmental impacts for the same installed function" tone="white">
      <p className="text-f16 leading-golden text-t2">Use dated quotations in the same currency and scope. Include fabrication, supports, installation, inspection, surface care, access, downtime, replacement and disposal where relevant. Record the source of each maintenance interval; a generic coating life is not a site survey.</p>
      <p className="mt-[12px] text-f16 leading-golden text-t2">The <Link href="/tools/frp-life-cycle-cost-calculator" className="font-semibold text-teal-text underline underline-offset-4">life-cycle cost calculator</Link> discounts your assumptions over a common study period and can return either material as the lower-cost option. Its example costs are an index, not market prices.</p>
      <p className="mt-[12px] text-f16 leading-golden text-t2">For carbon, compare compatible EPD or LCA data per equivalent installed function, using the same boundaries and service period. Manufacturing, transport, replacement and end-of-life assumptions can change the outcome. This page assigns no generic carbon footprint or environmental winner.</p>
    </PageSection>
    <PageSection id="faq" title="Frequently asked questions" tone="muted"><FAQList items={faqItems} /></PageSection>
    <RelatedLinks background="white" groups={[{ title: "By application", links: [{ href: "/technology/frp-vs-aluminum-windows", label: "Window assembly comparison" }, { href: "/technology/frp-vs-steel-gratings", label: "Grating selection and load evidence" }, { href: "/technology/fiberglass-rebar-vs-steel", label: "Reinforcement comparison" }] }, { title: "Material and evidence", links: [{ href: "/what-is-frp", label: "FRP, fiberglass and GRP explained" }, { href: "/technology/pultrusion-resin-systems", label: "Chemical and UV review" }, { href: "/resources/technical-data", label: "Published laminate data" }, { href: "/resources/evidence", label: "Report applicability" }] }, { title: "Choose an option", links: [{ href: "/products/fiberglass-structural-shapes", label: "Standard structural shapes" }, { href: "/tools/frp-life-cycle-cost-calculator", label: "Life-cycle cost assumptions" }, { href: "/products/custom-pultruded-profiles", label: "Custom section review" }] }]} />
    <InnerCTA title="Send the same loads, exposure and supply scope for a comparable quotation" />
  </>;
}
