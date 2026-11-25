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
import { citationMetaTags, type CitationInput } from "@/lib/citation";
import ArticleCitationBlock from "@/components/sections/ArticleCitationBlock";
import { materialComparisonContext as comparison, equalStiffnessExample as example, equalStiffnessResults as result } from "@/content/data/materialComparison";

const pagePath = "/technology/frp-vs-traditional-materials";
const seoTarget = getSeoQueryTarget(pagePath);
const updatedAt = "2026-11-24";
const citation: CitationInput = {
  title: "FRP vs steel, aluminum, timber and concrete",
  path: pagePath,
  authorName: "F1 Composite",
  publishedAt: "2024-03-22",
};

export const metadata: Metadata = {
  ...buildPageMetadata({ title: seoTarget.title, description: seoTarget.description, path: pagePath, image: `${pagePath}/opengraph-image` }),
  other: citationMetaTags(citation),
};

const reference = comparison.frpReference;
const materials = ["Pultruded glass FRP (EN 13706 E23)", "Steel S355", "Aluminum EN AW-6061 T6", "Softwood timber C24", "Concrete C30/37"];
// Typical design values from each material's own standard; FRP values from the E23 reference below and the EPTA comparison values on /resources/technical-data.
const comparisonRows = [
  ["Density, kg/m³", `${(reference.publishedDensityGPerCm3 * 1000).toLocaleString("en-US")} (published E23-ISO laminate)`, "7,850", "2,700", "420 mean", "2,400 plain; about 2,500 reinforced"],
  ["Elastic modulus along the member, GPa", "23 minimum", "210", "70", "11 (E0,mean)", "33 (Ecm)"],
  ["Strength used for comparison, MPa", "240 tensile, lengthwise (minimum)", "355 yield", "240 yield (0.2% proof)", "24 bending (characteristic)", "30 compressive (characteristic)"],
  ["Stiffness per kg, E/ρ, MN·m/kg", "12", "27", "26", "26", "14"],
  ["Strength per kg, MPa per t/m³", "126", "45", "89", "57", "13 (compression only)"],
  ["Thermal expansion, 10⁻⁶/K", "8–11 lengthwise", "12", "23", "about 4 along the grain", "10"],
  ["Thermal conductivity, W/(m·K)", "0.3", "50", "160", "0.13", "2.3 reinforced"],
  ["Electrical", "Insulator when dry and free of carbon or conductive fillers", "Conductor", "Conductor", "Insulates when dry, conducts when wet", "Conducts when moist; the rebar conducts"],
  ["Corrosion", "Does not rust; vinyl ester resin for acids, chlorides and hypochlorite", "Rusts; needs galvanizing or paint", "Pits in chlorides; galvanic attack in contact with steel", "Decays and is attacked by insects unless treated", "Rebar corrodes once chlorides reach it through the cover"],
  ["Fire", "Combustible; the flame-spread class comes from the fire-retardant resin (ASTM E84, EN 13501-1)", "Non-combustible (A1); keeps about half its yield strength at 600 °C", "Non-combustible (A1); melts from about 580 °C", "Combustible; chars at about 0.65 mm/min", "Non-combustible (A1); fire resistance set by cover"],
];
const grade = reference.gradeMinimums;
const faqItems = [
  { question: "Is FRP stronger than steel?", answer: "Per kilogram, yes; per section, usually not. An E23 laminate has a minimum lengthwise tensile strength of 240 MPa against a 355 MPa yield for S355 steel, but it weighs a quarter as much, so its strength per kilogram is about 2.8 times higher. Its modulus is 23 GPa against 210 GPa, so a section of the same size deflects about nine times as much under the same load. Size FRP members for deflection and local buckling first." },
  { question: "What are the advantages of fiberglass over aluminum?", answer: "Fiberglass conducts about 500 times less heat (0.3 against 160 W/(m·K)), expands about half as much (8–11 against 23 × 10⁻⁶/K), insulates electrically and does not pit in chlorides or corrode against steel fasteners. Aluminum is three times stiffer (70 against 23 GPa) and non-combustible, so it wins where stiffness or a non-combustible rating decides the member." },
  { question: "Can an FRP beam replace a steel beam of the same dimensions?", answer: "Only after structural review. Lower elastic modulus can make deflection govern even when a strength comparison looks favorable. Review shear deformation, creep, local buckling, environmental factors and connections as well as bending. The example on this page isolates bending stiffness and does not approve a substitution." },
  { question: "How should I compare FRP with timber or concrete?", answer: "Define the same installed function first, then compare designed member sizes, foundations, connections, exposure, fire requirements and maintenance. Material density alone cannot establish the weight or cost of an equivalent structure. Timber grade and moisture, and concrete reinforcement and cracking, belong in the comparison." },
  { question: "Does FRP always have the lowest life-cycle cost or carbon footprint?", answer: "No. Cost depends on actual quotations, installation, inspection, maintenance, access, replacement and discount assumptions. Carbon comparisons need compatible EPD or LCA boundaries for the same function and service period." },
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
    <PageSection id="properties-table" title="What changes when the material changes?" tone="muted" intro="Typical design values from each material\u2019s own standard. The per-kilogram rows explain most of the comparison: per kilogram, E23 FRP is about 2.8 times as strong as S355 steel but less than half as stiff, so deflection, not strength, usually sizes an FRP member.">
      <div className="overflow-x-auto rounded-card border border-border-default bg-white"><table className="w-full min-w-[1080px] border-collapse text-left text-f14"><thead><tr className="border-b border-border-default bg-bg2"><th scope="col" className={cell}>Review</th>{materials.map(material => <th key={material} scope="col" className={cell}>{material}</th>)}</tr></thead><tbody>{comparisonRows.map(([property, ...values]) => <tr key={property} className="border-b border-border-default last:border-b-0"><th scope="row" className={`${cell} font-semibold`}>{property}</th>{values.map((value, index) => <td key={index} className={cell}>{value}</td>)}</tr>)}</tbody></table></div>
      <p className="mt-[16px] text-f14 leading-golden text-t2">Sources: EN 13706-3 (E23 minimums), EN 1993-1-1 and EN 1993-1-2 (steel), EN 1999-1-1 (aluminum, extruded profiles), EN 338 (C24 timber) and EN 1995-1-2 (charring rate), EN 1992-1-1 (concrete), EN ISO 10456 (thermal conductivity). FRP expansion and conductivity are the EPTA comparison values listed on the <Link href="/resources/technical-data" className="font-semibold text-teal-text underline underline-offset-4">technical data</Link> page. A member still has to be designed for the same span and loads; the worked example below shows how far the stiffness gap moves the section.</p>
      <p className="mt-[12px] text-f14 leading-golden text-t2">For the fire row, read <Link href="/resources/blog/frp-fire-resistance-ratings-guide" className="font-semibold text-teal-text underline underline-offset-4">does fiberglass burn? FRP fire behavior and test ratings</Link> before comparing a resin-bonded profile with noncombustible steel or aluminum.</p>
      <p className="mt-[12px] text-f14 leading-golden text-t2">To run the comparison on real sections, start from the published sizes: <Link href="/products/fiberglass-structural-shapes/frp-i-beam" className="font-semibold text-teal-text underline underline-offset-4">FRP I-beams</Link>, <Link href="/products/fiberglass-structural-shapes/frp-channel" className="font-semibold text-teal-text underline underline-offset-4">channels</Link> and <Link href="/products/fiberglass-structural-shapes/frp-square-tube" className="font-semibold text-teal-text underline underline-offset-4">square tubes</Link> for frames and supports, and <Link href="/products/frp-gratings" className="font-semibold text-teal-text underline underline-offset-4">pultruded grating</Link>, <Link href="/products/frp-stair-treads" className="font-semibold text-teal-text underline underline-offset-4">stair treads</Link> and <Link href="/products/frp-handrail-systems" className="font-semibold text-teal-text underline underline-offset-4">handrails</Link> for platforms and walkways.</p>
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
    <ArticleCitationBlock variant="standalone" {...citation} />
    <RelatedLinks background="white" groups={[{ title: "By application", links: [{ href: "/technology/frp-vs-aluminum-windows", label: "Window assembly comparison" }, { href: "/technology/frp-vs-steel-gratings", label: "Grating selection and load evidence" }, { href: "/technology/fiberglass-rebar-vs-steel", label: "Reinforcement comparison" }] }, { title: "Material and evidence", links: [{ href: "/what-is-frp", label: "FRP, fiberglass and GRP explained" }, { href: "/technology/pultrusion-resin-systems", label: "Chemical and UV review" }, { href: "/resources/technical-data", label: "Published laminate data" }, { href: "/resources/evidence", label: "Report applicability" }] }, { title: "Choose an option", links: [{ href: "/products/fiberglass-structural-shapes", label: "Standard structural shapes" }, { href: "/tools/frp-life-cycle-cost-calculator", label: "Life-cycle cost assumptions" }, { href: "/products/custom-pultruded-profiles", label: "Custom section review" }] }]} />
    <InnerCTA title="Send the same loads, exposure and supply scope for a comparable quotation" />
  </>;
}
