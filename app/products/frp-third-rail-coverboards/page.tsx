import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { GuideSection, GuideSources, GuideStandards, SourceRefs } from "@/components/sections/PultrusionGuidePage";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { supplyTerms, usdRange, weeks } from "@/content/data/company";
import { getPultrusionGuide } from "@/content/data/pultrusionGuides";
import { formatShortDate } from "@/lib/dates";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

// The custom-component page for pultruded third-rail coverboards (2026-11-18). The sourced
// specification sections, standards, sources and brief items stay in the shared guide data
// (content/data/pultrusionElectricalGuides.ts) and render through the shared components; this page
// adds the arrangement, section, cover-family, material, evidence and supply material in front.
// Figures are F1's own schematics (scripts/covers/draw-third-rail-coverboard-figures.mjs). No
// fire class, dielectric rating, railway approval or stock section is claimed anywhere on it.
const page = getPultrusionGuide("product", "frp-third-rail-coverboards")!;
const path = "/products/frp-third-rail-coverboards";
const updated = "2026-11-18";
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const sectionLabels: Record<string, string> = { "component-definition": "Define the part", "geometry-and-tolerances": "Datums & fit", "material-package": "Tested package", "fabrication-and-acceptance": "Acceptance", "supply-and-qualification": "Qualification" };
const figureDir = "/images/products/third-rail-coverboards";
const figures = {
  run: { src: `${figureDir}/frp-third-rail-coverboard-run.webp`, alt: "Oblique view of a conductor rail on insulators with yellow pultruded FRP coverboards on brackets, a joint sleeve between two cover lengths and the cover cut away to show the rail and collector shoe" },
  arrangements: { src: `${figureDir}/third-rail-contact-arrangements-cover-position.webp`, alt: "Cross-sections of top-contact, bottom-contact and side-contact conductor rails showing where the FRP coverboard sits and which side stays open for the collector shoe" },
  anatomy: { src: `${figureDir}/pultruded-coverboard-section-anatomy.webp`, alt: "Pultruded coverboard hood section with callouts for outside width and depth, constant wall, shoulder chamfer, corner radii, bracket seat, returned lips and the envelope kept clear" },
  family: { src: `${figureDir}/third-rail-cover-family-pultruded-molded.webp`, alt: "Side elevation of a conductor-rail run with pultruded straight coverboards and joint sleeve, and molded end-approach, expansion-joint and cable-connection covers" },
};

export const metadata: Metadata = buildPageMetadata({ title: page.title, description: page.description, path, image: `${path}/opengraph-image` });

const quoteHref = buildRfqHref({
  source: "pultrusion-guide-frp-third-rail-coverboards",
  product: page.name,
  productPath: path,
  message: "Please review a third-rail coverboard for my project.\nOperator / line, and who approves the component:\nContact arrangement: top / bottom / side contact; rail type:\nSection drawing or sample available (drawing number / revision):\nCover length, bracket pitch, holes, slots and notches:\nMaterial requirements: fire and smoke tests, electrical tests, color, UV / tunnel exposure:\nAccessory covers needed (joint sleeves, end approach, expansion joint, cable connection):\nQuantity for the first order and per year; destination and target date:",
});

const { firstRun, repeat } = supplyTerms.customMoqMeters;

// Who orders a coverboard, and what each of them usually has in hand.
const buyers = [
  { title: "Contact-rail system suppliers", text: "You design the rail, insulators, brackets and covers as one package and need a profile maker for the cover section. Send the section drawing and the material specification; we return die feasibility, a first-article plan and a price per metre." },
  { title: "Transit agencies and maintainers", text: "You need replacement covers that fit brackets already on the track. Send the standard drawing, or a sample length and a bracket. The replacement is quoted to that geometry, and release for service stays with your engineering group." },
  { title: "Track and electrification contractors", text: "You hold a project specification that names the tests and the color. Send the specification section and the quantities by cut length; the material evidence it asks for is scoped into the first article before any series metre is made." },
];

const arrangements = [
  { type: "Top contact (over-running)", sits: "A hood above the rail head on field-side brackets, open toward the track for the shoe arm.", clear: "Shoe and arm travel under the hood, including shoe lift at gaps and ramps.", loads: "Snow and ice on the top face where the line is outdoors; a maintainer leaning or stepping on it only if the operator says so.", send: "Rail section, bracket drawing and pitch, collector envelope." },
  { type: "Bottom contact (under-running)", sits: "A hood that wraps the top and both sides of a rail hung from insulating brackets; the underside stays open.", clear: "The lower edges against the shoe from below, and the cover over rail joints and feeder lugs.", loads: "Wind on the tall side faces, bracket notches along the top, handling of long thin-walled lengths.", send: "Bracket and insulator assembly drawing, notch pattern, lower-edge position." },
  { type: "Side contact (side-running)", sits: "A board over the top and field side of the rail; the contact face stays open to the track.", clear: "Shoe sweep at the open side through curves and switches.", loads: "A long free edge: returns or a deeper leg keep it straight between brackets.", send: "Rail and insulator bracket drawing, shoe sweep, free-edge limits." },
];

// What the die can and cannot do for an open hood section.
const sectionRules = [
  { title: "One wall, all the way round", text: "The section is drawn with one wall thickness that follows every bend, chamfer and return. Thick pads next to thin lips cure unevenly and bow the length; where a seat needs more bearing, it is made wider, not thicker." },
  { title: "Radii, not sharp corners", text: "Glass mat has to turn each corner inside the die. An inside radius about equal to the wall keeps the reinforcement in the corner, which is where a cover cracks first when it is dropped or clipped on." },
  { title: "Returns on every free edge", text: "A short inward or downward lip stiffens the long free edge, gives a retaining clip something to hold and forms a drip line. It is also the feature that most often decides whether a bracket from an existing system still fits." },
  { title: "Notches and holes after pultrusion", text: "Bracket notches, slotted holes for thermal movement and drain holes are machined into the cut length. The drawing gives their positions from one datum end, so a cover from any batch lands on the same brackets." },
];

// The parts of a cover system, by how they are made and who F1 treats as the maker.
const family = [
  { part: "Straight coverboard", made: "Pultruded", scope: "F1 die and production. Cut to length, notched, drilled, identified by length.", note: "The bulk of every run and the reason to pultrude: one die, any length." },
  { part: "Joint sleeve or splice cover", made: "Pultruded", scope: "A second, slightly larger section from a second die; cut to short lengths.", note: "Laps two cover ends and leaves a gap for the covers to expand." },
  { part: "Cover bracket blanks and packers", made: "Pultruded and machined", scope: "Machined from flat bar, angle or a custom section where the bracket is a constant shape.", note: "Molded and steel brackets are the system supplier's parts; send the drawing to see which it is." },
  { part: "End-approach (ramp) cover", made: "Molded", scope: "Quoted as a separate line item from a molding source, to your drawing.", note: "The shape changes along its length, so it cannot come out of a pultrusion die." },
  { part: "Expansion-joint cover", made: "Molded", scope: "Separate line item, to your drawing.", note: "Bridges the rail gap; often ribbed or stepped." },
  { part: "Cable-connection cover", made: "Molded or fabricated", scope: "Separate line item, to your drawing; simple boxes can be fabricated from pultruded sheet.", note: "Covers the feeder lug and its fasteners." },
  { part: "Clips, fasteners, steelwork", made: "By others", scope: "Not F1 supply unless a drawing-defined FRP fastener is asked for.", note: "Keep them on the system bill of materials." },
];

const materials = [
  { title: "Resin: chosen by the fire and exposure specification", points: ["Flame-retardant isophthalic polyester for general outdoor track", "Flame-retardant vinyl ester for wet tunnels, de-icing salt and washdown chemicals", "Low-smoke filled systems where the specification limits smoke as well as flame spread"], note: "The resin name does not carry a fire class. The class comes from a test on the offered laminate at the offered wall thickness." },
  { title: "Reinforcement: built for a thin open section", points: ["Glass roving along the length for stiffness between brackets", "Continuous-strand mat through every wall and corner for transverse strength and notch toughness", "Layup fixed on the die drawing and kept the same from first article to series"], note: "A cover is loaded across its section when it is clipped on, stepped on or struck, so the mat content matters more here than in a beam." },
  { title: "Surface and color: molded in, not painted on", points: ["Polyester surface veil over the whole perimeter for a resin-rich, fiber-free face", "UV stabiliser in the resin for outdoor track", "Pigmented through the wall to the operator's color; safety yellow, grey and orange are the usual requests"], note: "A through-color does not peel or chip at a cut edge. A coating can be added, and then becomes part of the tested fire package." },
];

// The evidence a coverboard specification usually asks for, and where each number comes from.
const evidence: Array<{ ask: string; method: string; from: string }> = [
  { ask: "Surface burning: flame spread and smoke developed", method: "ASTM E84", from: "Test on the offered laminate; both indices and the mounting reported." },
  { ask: "Smoke density", method: "ASTM E662", from: "Test on the offered laminate at the supplied thickness." },
  { ask: "Oxygen index", method: "ISO 4589-2 / ASTM D2863", from: "Test on the offered laminate; a comparison value, not an end-use class." },
  { ask: "Small-flame classification", method: "UL 94", from: "Classification with the tested thickness and color stated." },
  { ask: "Dielectric strength", method: "ASTM D149 / IEC 60243-1", from: "Test with specimen direction, thickness and dry or wet conditioning stated." },
  { ask: "Volume and surface resistivity", method: "IEC 62631-3-1 and -3-2 / ASTM D257", from: "Test dry and after conditioning; surface and volume reported separately." },
  { ask: "Tracking and arc resistance", method: "IEC 60112 / ASTM D495", from: "Test where the specification names it; the two are different phenomena." },
  { ask: "Flexural strength and modulus, both directions", method: "ISO 14125 / ASTM D790", from: "Coupons cut from the profile wall, lengthwise and crosswise." },
  { ask: "Water absorption and Barcol hardness", method: "ISO 62 / ASTM D570; ASTM D2583", from: "Batch record; hardness is a cure check, not a strength value." },
  { ask: "Dimensions, straightness and visual quality", method: "Approved drawing; ASTM D3917; ASTM D4385", from: "Inspection record for each batch against the drawing datums." },
];

// Planning mass per metre: developed width of the section (its girth) × wall × density.
const density = 1.9;
const girths = [300, 400, 500, 600];
const walls = [3, 4, 5, 6];
const mass = (girth: number, wall: number) => ((girth * wall * density) / 1000).toFixed(2);

const steps = [
  { title: "Drawing review", duration: `Reply in ${supplyTerms.responseTime}`, text: "We check the section against the die rules above, mark what has to change and say which parts of the cover family are pultruded. You get a budget price per metre and a tooling charge." },
  { title: "Die and first article", duration: `Die ${weeks(supplyTerms.dieManufactureWeeks)}, trial 1–2 weeks`, text: "The die is cut to the approved section. First-article lengths are measured against the drawing datums and sent with the inspection record; a fit check on your brackets is done on these lengths." },
  { title: "Material tests", duration: "Set by the laboratory", text: "Fire, smoke and electrical tests named in your specification are run on first-article material at an agreed laboratory. Until they pass and you release the part, every length is marked as a development sample." },
  { title: "Series production", duration: `${weeks(supplyTerms.newDieLeadTimeWeeks)} from approved drawing to first delivery`, text: `Lengths are cut, notched, drilled and identified, then packed flat and nested with edge protection. Planning quantities are ${firstRun} m for a first run and ${repeat} m for a repeat order.` },
  { title: "Repeat orders and spares", duration: `Existing die: ${weeks(supplyTerms.existingDieVariantLeadTimeWeeks)}`, text: "Repeat orders reference the released drawing revision, layup and color. A change to any of them is raised with you before production, because your qualification rests on that configuration." },
];

function Plate({ figure, preload = false, sizes = "(max-width: 1024px) 94vw, 56vw" }: { figure: { src: string; alt: string }; preload?: boolean; sizes?: string }) {
  return <div className="relative aspect-[8/5] bg-white"><Image src={figure.src} alt={figure.alt} fill sizes={sizes} preload={preload} className="object-contain" /></div>;
}

export default function ThirdRailCoverboardsPage() {
  const nav = [
    { id: "role", label: "What we supply" },
    { id: "arrangements", label: "Rail arrangements" },
    { id: "section", label: "Section design" },
    { id: "family", label: "Cover family" },
    { id: "material", label: "Material" },
    { id: "evidence", label: "Test evidence" },
    { id: "supply", label: "Die to delivery" },
    ...page.sections.map((section) => ({ id: section.id, label: sectionLabels[section.id] ?? section.title })),
    { id: "standards", label: "Standards" },
    { id: "faq", label: "Questions" },
    { id: "sources", label: "Sources" },
    { id: "quote", label: "Project brief" },
  ];
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: page.heading,
        name: page.name,
        description: page.description,
        url: absoluteUrl(path),
        mainEntityOfPage: absoluteUrl(path),
        dateModified: updated,
        image: absoluteUrl(figures.run.src),
        publisher: { "@id": "https://www.f1composite.com/#organization" },
        citation: page.sources.map((source) => source.url),
      }} />
      <PageHeader
        tag="Custom pultruded component"
        title="FRP third-rail coverboards, pultruded to your contact-rail drawing"
        description="A third-rail coverboard keeps people, tools, snow and debris off an energized conductor rail. Most of a cover system is one constant section repeated for kilometres, which is what pultrusion makes: a flame-retardant fiberglass hood, the same shape and wall in every length. F1 Composite cuts a die to your section drawing, pultrudes the cover in the resin and color your specification names, then cuts, notches and drills each length to the bracket pitch. The rail, insulators, brackets and the approval of the cover for service stay with the contact-rail supplier and the operator."
        updated={updated}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles" }, { label: page.name }]}
        facts={[{ label: "Made by", value: "Pultrusion, to your section" }, { label: "Delivered as", value: "Cut, notched, drilled lengths" }, { label: "New die to first delivery", value: weeks(supplyTerms.newDieLeadTimeWeeks) }, { label: "First run", value: `From ${firstRun} m` }]}
        actions={{ primary: { label: "Send your cover drawing", href: quoteHref }, secondary: { label: "See the section rules", href: "#section", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="A covered conductor-rail run" caption="The straight coverboard and its joint sleeve are the pultruded parts. Brackets, insulators and the rail are the system supplier's." ><Plate figure={figures.run} preload sizes="(max-width: 1023px) 94vw, 44vw" /></Figure>}
      />
      <PageNav items={nav} />

      <PageSection id="role" title="What F1 supplies, and to whom" intro="Coverboard systems are designed by contact-rail suppliers and approved by the transit operator. Those suppliers describe the covers as predominantly fiberglass composite with low-smoke, flame-resistant materials, designed to each agency's criteria and local wind, snow and ice. F1's place in that chain is the profile: the cover section, made to the drawing, with the records the approver asks for.">
        <div className="grid gap-[20px] md:grid-cols-3">{buyers.map((buyer) => <article key={buyer.title} className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f18 font-bold text-t1">{buyer.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{buyer.text}</p></article>)}</div>
        <div className="mt-[24px] grid gap-[16px] md:grid-cols-2">
          <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Inside F1&apos;s scope</h3><ul className="mt-[8px] space-y-[6px] text-f14 leading-relaxed text-t2">{["Die design and manufacture for your cover section and joint sleeve", "Pultrusion in the specified flame-retardant resin, layup and through-color", "Cutting, notching, slotting and drilling to the fabrication drawing", "First-article measurement, batch inspection records and the agreed material tests", "Export packing and delivery of long thin-walled lengths"].map((item) => <li key={item}>· {item}</li>)}</ul></div>
          <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Outside it</h3><ul className="mt-[8px] space-y-[6px] text-f14 leading-relaxed text-t2">{["The conductor rail, insulators, steel brackets, anchors and end approaches", "The collector envelope and electrical clearances the cover has to respect", "The load cases: wind, snow, ice and any foot load are the operator's to state", "Approval of the cover for service on a railway", "Installation, track access and isolation procedures"].map((item) => <li key={item}>· {item}</li>)}</ul></div>
        </div>
        <SourceRefs page={page} ids={["foster-coverboards", "foster-catalog"]} />
      </PageSection>

      <PageSection id="arrangements" title="Three contact arrangements, three cover sections" tone="muted" intro="Where the collector shoe touches the rail decides which side of the cover stays open, and that decides the section. There is no universal coverboard: a hood for a top-contact line does not fit a bottom-contact rail hung from brackets.">
        <Figure number={2} title="Where the cover sits on each kind of rail" caption="The open side follows the shoe. Brackets for over-running, under-running and side-running rails are different parts, and the cover seat is drawn to the bracket."><Plate figure={figures.arrangements} sizes="(max-width: 1024px) 94vw, 80vw" /></Figure>
        <div className="mt-[24px] overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-[20px] py-[16px] text-left font-semibold text-t1">What the arrangement means for the cover, and what to send</caption><thead className="bg-bg2"><tr>{["Arrangement", "Where the cover sits", "What it must clear", "What loads it", "Send with the inquiry"].map((head) => <th key={head} scope="col" className="px-[16px] py-[12px]">{head}</th>)}</tr></thead><tbody>{arrangements.map((row) => <tr key={row.type} className="border-t border-border-default align-top"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{row.type}</th><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.sits}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.clear}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.loads}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.send}</td></tr>)}</tbody></table></div></div>
        <SourceRefs page={page} ids={["foster-catalog", "en-fixed-rail"]} />
        <p className="mt-[16px] text-f14 leading-relaxed text-t2">How the cover works with clearances, brackets, weather and the operator&apos;s electrical-safety arrangement is covered in the <Link href="/applications/frp-third-rail-protection" className={linkStyle}>third-rail protection design guide</Link>.</p>
      </PageSection>

      <PageSection id="section" title="Designing a section the die can make" intro="A pultrusion die makes one cross-section continuously, so every feature of a coverboard runs its full length. The four rules below decide whether a cover drawn for another process can be pultruded as it stands or needs a small change first.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.35fr_1fr]">
          <Figure number={3} title="Anatomy of a pultruded coverboard section" caption="A hood for a top- or bottom-contact rail. The wall is constant around the chamfer, the corners and the returned lips."><Plate figure={figures.anatomy} /></Figure>
          <div className="grid gap-[12px]">{sectionRules.map((rule) => <div key={rule.title} className="border-t-2 border-teal pt-[10px]"><h3 className="text-f16 font-bold text-t1">{rule.title}</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">{rule.text}</p></div>)}</div>
        </div>
        <div className="mt-[32px] grid items-start gap-[24px] lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[520px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-[20px] py-[16px] text-left font-semibold text-t1">Planning mass of a coverboard, kg per metre</caption><thead className="bg-bg2"><tr><th scope="col" className="px-[16px] py-[12px]">Developed width</th>{walls.map((wall) => <th key={wall} scope="col" className="px-[16px] py-[12px]">{wall} mm wall</th>)}</tr></thead><tbody>{girths.map((girth) => <tr key={girth} className="border-t border-border-default"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{girth} mm</th>{walls.map((wall) => <td key={wall} className="px-[16px] py-[12px] font-mono text-t2">{mass(girth, wall)}</td>)}</tr>)}</tbody></table></div><p className="border-t border-border-default p-[20px] text-f12 leading-relaxed text-t3">Developed width is the length of the section&apos;s centreline: top, both legs, chamfer and lips added together. Mass = developed width × wall × {density} g/cm³, a planning density for glass-reinforced pultrusion with flame-retardant filler. The quoted mass comes from the approved section and the first article.</p></div>
          <div className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f16 font-bold text-t1">Limits to plan around</h3><dl className="mt-[10px] grid gap-[10px] text-f14 leading-relaxed sm:grid-cols-[auto_1fr]"><dt className="font-semibold text-t1">Section envelope</dt><dd className="text-t2">Up to 600 × 300 mm outside dimensions; feasibility is confirmed on the drawing.</dd><dt className="font-semibold text-t1">Length</dt><dd className="text-t2">{supplyTerms.standardLengthM} m standard; longer by agreement. Lengths over about 11.8 m do not fit a standard container.</dd><dt className="font-semibold text-t1">Tolerances</dt><dd className="text-t2">Agreed on the drawing, feature by feature, with the bracket seat and the lip opening as the fit dimensions.</dd><dt className="font-semibold text-t1">Span</dt><dd className="text-t2">Bracket pitch comes from your load cases and deflection limit. A delivered length is not an allowable span.</dd></dl><p className="mt-[12px] text-f14 leading-relaxed text-t2">Process limits and how tolerances are stated are on the <Link href="/products/custom-pultruded-profiles" className={linkStyle}>custom pultruded profiles</Link> page.</p></div>
        </div>
      </PageSection>

      <PageSection id="family" title="The cover family: which parts are pultruded" tone="muted" intro="A cover system is more than straight lengths. Contact-rail suppliers list end approaches, expansion joints and cable connections as separate parts, each with its own cover. Pultrusion makes the ones with a constant section; the rest are molded and go on the quotation as separate lines.">
        <Figure number={4} title="The covers along one conductor-rail run" caption="Yellow parts come out of a pultrusion die. Grey-blue parts change shape along their length and are molded."><Plate figure={figures.family} sizes="(max-width: 1024px) 94vw, 80vw" /></Figure>
        <div className="mt-[24px] overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[820px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-[20px] py-[16px] text-left font-semibold text-t1">Cover system parts and how F1 quotes each</caption><thead className="bg-bg2"><tr>{["Part", "How it is made", "How F1 quotes it", "Why"].map((head) => <th key={head} scope="col" className="px-[16px] py-[12px]">{head}</th>)}</tr></thead><tbody>{family.map((row) => <tr key={row.part} className="border-t border-border-default align-top"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{row.part}</th><td className={`px-[16px] py-[12px] font-semibold ${row.made.startsWith("Pultruded") ? "text-teal-text" : "text-t2"}`}>{row.made}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.scope}</td><td className="px-[16px] py-[12px] leading-relaxed text-t3">{row.note}</td></tr>)}</tbody></table></div></div>
        <SourceRefs page={page} ids={["foster-catalog", "roechling-rail"]} />
      </PageSection>

      <PageSection id="material" title="Material: resin, glass and color to the specification" intro="A coverboard specification usually fixes three things: how the laminate behaves in fire, how it insulates, and what color it is after years outdoors. Each maps to a choice made before the die is cut.">
        <div className="grid gap-[20px] lg:grid-cols-3">{materials.map((item) => <article key={item.title} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f18 font-bold text-t1">{item.title}</h3><ul className="mt-[10px] space-y-[6px] text-f14 leading-relaxed text-t2">{item.points.map((point) => <li key={point}>· {point}</li>)}</ul><p className="mt-auto border-t border-border-default pt-[12px] text-f12 leading-relaxed text-t3">{item.note}</p></article>)}</div>
        <p className="mt-[20px] max-w-[880px] text-f14 leading-relaxed text-t2">Coupon values for standard glass-reinforced pultrusion, and the method behind each, are on the <Link href="/technology/pultruded-profile-performance" className={linkStyle}>pultruded profile performance</Link> page. A flame-retardant formulation changes several of them, which is why the offered laminate is tested instead of quoted from a table.</p>
      </PageSection>

      <PageSection id="evidence" title="Test evidence: what the specification asks for and where it comes from" tone="muted" intro="Send the specification clause and we match each requirement to a method and a report. No fire class, dielectric rating or railway approval is stated on this page, because none exists apart from a tested formulation, wall thickness and color.">
        <div className="overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left text-f14"><thead className="bg-bg2"><tr>{["Requirement", "Usual method", "Where the result comes from"].map((head) => <th key={head} scope="col" className="px-[16px] py-[12px]">{head}</th>)}</tr></thead><tbody>{evidence.map((row) => <tr key={row.ask} className="border-t border-border-default align-top"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{row.ask}</th><td className="px-[16px] py-[12px] font-mono text-f12 text-t2">{row.method}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.from}</td></tr>)}</tbody></table></div><p className="border-t border-border-default p-[20px] text-f12 leading-relaxed text-t3">The methods listed are the ones cover specifications commonly name; your specification and the adopted edition of its standards decide which apply and what the limits are. Reports are issued for the tested configuration and are supplied with their laboratory, date and specimen description.</p></div>
      </PageSection>

      <PageSection id="supply" title="From drawing to delivered covers" intro={`A new cover section needs a new die. Tooling is a one-time charge: small single-cavity dies run about ${usdRange(supplyTerms.dieCostUsd.singleCavity)}, and a wide hood section sits above that. These are planning ranges; the quotation follows the drawing.`}>
        <ol className="grid gap-[16px] md:grid-cols-2 xl:grid-cols-5">{steps.map((step, index) => <li key={step.title} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3><p className="mt-[4px] text-f14 font-semibold text-teal-text">{step.duration}</p><p className="mt-[8px] text-f14 leading-relaxed text-t2">{step.text}</p></li>)}</ol>
      </PageSection>

      {page.sections.map((section, index) => <GuideSection key={section.id} page={page} section={section} tone={index % 2 === 0 ? "muted" : "white"} />)}

      <PageSection id="standards" title="Standards, regulations and acceptance evidence" intro="The operator and the authority having jurisdiction decide which standards apply to a cover and in which edition. A profile maker's report is evidence for the laminate; it is not approval of the installation.">
        <GuideStandards page={page} />
        <p className="mt-[20px] max-w-[880px] text-f14 leading-relaxed text-t3">Public source scopes were reviewed on <time dateTime={updated}>{formatShortDate(updated)}</time>. These references do not establish that any F1 section holds a fire classification, an insulation rating or a railway approval.</p>
      </PageSection>

      <PageSection id="faq" title="Third-rail coverboards: practical questions" tone="muted">
        <FAQList items={[
          { question: "What is a third-rail coverboard made of?", answer: "Most are a glass-fiber-reinforced thermoset: glass roving and mat in a flame-retardant polyester or vinyl ester resin, pigmented through the wall. Contact-rail suppliers describe their covers as predominantly fiberglass composite with low-smoke, flame-resistant materials. Fiberglass is used because it insulates, does not rust next to the track and is light enough to lift on and off by hand." },
          { question: "Can you make a replacement for a cover already in service?", answer: "Yes, from the operator's standard drawing or from a sample length and a bracket. We measure the sample, draw the section, confirm the fit dimensions with you and cut a die to it. The replacement matches the geometry; whether it may be installed is the operator's decision, usually after a fit check and the material tests their specification names." },
          { question: "What are the minimum quantity and lead time?", answer: `Planning figures are ${firstRun} m for the first run on a new die and ${repeat} m for a repeat order. A new section takes ${weeks(supplyTerms.newDieLeadTimeWeeks)} from approved drawing to first delivery, of which ${weeks(supplyTerms.dieManufactureWeeks)} is die manufacture. Laboratory fire and electrical tests run on first-article material and add the laboratory's own schedule.` },
          { question: "Do you supply brackets and the molded end covers as well?", answer: "Brackets that are a constant section can be machined from pultruded stock. End-approach, expansion-joint and cable-connection covers are molded parts; with your drawings they are quoted as separate line items alongside the pultruded covers, so you receive one shipment. Steel brackets, clips and fasteners stay on the system supplier's bill of materials." },
          { question: "Which color and finish can a cover have?", answer: "The color is pigmented through the laminate to the reference in your specification; safety yellow, grey and orange are the usual requests. A polyester surface veil gives a smooth, fiber-free face, and a UV stabiliser is added for outdoor track. If a coating is required it is applied before testing, because it becomes part of the fire package." },
          ...page.faqs,
        ]} />
      </PageSection>

      <PageSection id="sources" title="Technical sources and further reading" intro="Industry sources show how contact-rail suppliers describe coverboards and their accessories. Authority sources give the published scope of the standards an operator may adopt. None of them is evidence for an F1 section.">
        <GuideSources page={page} />
      </PageSection>

      <PageSection id="quote" title="Prepare a coverboard brief" tone="deep">
        <ProductRfq
          product={page.name}
          productPath={path}
          quoteHref={quoteHref}
          quoteLabel="Send your cover drawing"
          intro="Send the section drawing or a sample, the contact arrangement, the material clause of your specification and the quantities by cut length. We reply with die feasibility, the test plan and a price per metre."
          items={page.specification.map((item, index) => ({ title: `${String(index + 1).padStart(2, "0")} · ${item}` }))}
          links={page.related.slice(0, 3)}
        />
      </PageSection>
      <RelatedLinks title="Continue the specification" groups={[{ title: "Products and application guidance", links: [...page.related, { href: "/industries/infrastructure", label: "Infrastructure and rail industry" }, { href: "/technology/pultruded-profile-performance", label: "Pultruded profile performance data" }] }]} />
    </>
  );
}
