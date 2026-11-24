import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import KeyFacts from "@/components/sections/KeyFacts";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ProductRfq from "@/components/products/ProductRfq";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import Figure from "@/components/ui/Figure";
import JsonLd from "@/components/seo/JsonLd";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { STAIR_CODES, WALKWAY_LOADS, checkStair, type StairCode } from "@/lib/accessGeometry";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/frp-access-platforms-stairs";
const seoTarget = getSeoQueryTarget(pagePath);
const LAST_UPDATED = "2026-11-24";
const heroImage = "/images/f1-photos/frp-factory-access-staircase-hero.webp";
const heroAlt = "FRP access staircase and platform with orange handrails inside F1 Composite's Chongqing plant";

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
  image: `${pagePath}/opengraph-image`,
});

const link = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
const cell = "px-[12px] py-[10px] align-top";

const structureTypes = [
  { title: "Work platforms", body: "A deck at a fixed height beside equipment, valves or tanks: columns, beams, grating, handrail and toe board, reached by a stair or ladder.", parts: "WF or square-tube columns · I-beam or channel framing · grating · handrail system" },
  { title: "Crossovers", body: "A short stair up, a walkway across and a stair down, used to step over pipes, conveyors, trenches or cable runs instead of climbing over them.", parts: "Channel stringers · stair treads · grating walkway · handrails both sides" },
  { title: "Stairs and stair towers", body: "Straight flights between levels, or several flights with landings stacked in a tower where the height or footprint calls for it.", parts: "I-beam or channel stringers · stair treads · landings in grating · stair rail and guardrail" },
  { title: "Walkways and catwalks", body: "Long, narrow walking routes along process lines, roofs or tank tops, often on existing steel or concrete supports.", parts: "Pultruded grating on I-beam or channel bearers · grating clips · edge guardrail" },
  { title: "Fixed ladder access", body: "Vertical access where a stair does not fit, with a cage or ladder safety system as the code requires.", parts: "FRP ladder rails and rungs · cage or safety system · platform landing" },
];

const componentMap = [
  { element: "Columns and posts", products: [{ label: "Wide flange (WF) beams", href: "/products/fiberglass-structural-shapes/frp-wide-flange-beam" }, { label: "Square tubes", href: "/products/fiberglass-structural-shapes/frp-square-tube" }] },
  { element: "Beams, bearers and stringers", products: [{ label: "I-beams", href: "/products/fiberglass-structural-shapes/frp-i-beam" }, { label: "Channels", href: "/products/fiberglass-structural-shapes/frp-channel" }] },
  { element: "Bracing and brackets", products: [{ label: "Angles", href: "/products/fiberglass-structural-shapes/frp-angle" }, { label: "Flat bars", href: "/products/fiberglass-structural-shapes/frp-flat-bar" }] },
  { element: "Deck and landings", products: [{ label: "Pultruded grating", href: "/products/frp-gratings" }, { label: "Molded grating", href: "/products/molded-frp-grating" }] },
  { element: "Grating hold-downs", products: [{ label: "Grating clips", href: "/products/frp-grating-clips" }] },
  { element: "Stair treads", products: [{ label: "FRP stair treads and covers", href: "/products/frp-stair-treads" }] },
  { element: "Edge protection", products: [{ label: "Industrial handrail systems", href: "/products/frp-handrail-systems" }] },
  { element: "Vertical access", products: [{ label: "Fixed ladders", href: "/products/frp-ladders" }] },
  { element: "Connections", products: [{ label: "FRP bolts, nuts and threaded rod", href: "/products/frp-fasteners-fittings" }] },
];

const stairCodes: StairCode[] = ["osha-standard", "iso14122-3", "as1657", "ibc"];
// A neutral sample only to read each rule's published requirement text; no result is shown.
const sample = { riserMm: 200, goingMm: 250, widthMm: 900, headroomMm: 2300, flightRiseMm: 3000 };
const stairRules = stairCodes.map((code) => ({
  code,
  name: STAIR_CODES[code],
  rows: checkStair({ code, ...sample }).map((check) => ({ label: check.label, requirement: check.requirement, clause: check.clause })),
}));

const steps = [
  { title: "Layout and levels", body: "Plan and section with the deck level, obstacles to clear, stair start and landing points, and existing supports." },
  { title: "Code and loads", body: "The stair, guardrail and floor-load rules the project uses, plus equipment, wind or maintenance loads." },
  { title: "Member check and drawing", body: "Members, connections and bases are sized by the project engineer; F1 supplies section and laminate data for the check." },
  { title: "Marked kit", body: "Profiles cut and drilled to the approved drawing, grating cut to the panel plan, every part marked against the BOM." },
  { title: "Bolted assembly", body: "Assembly with bolts and hand tools on site; anchors and the supporting structure are by others unless agreed." },
];

const faqItems = [
  {
    question: "What is an FRP crossover?",
    answer: "An FRP crossover is a small fiberglass structure with a stair or ladder on each side and a short walkway between them, built so people step over pipes, conveyors, trenches or cable runs. It is assembled from pultruded profiles, grating, stair treads and handrails and bolted together.",
  },
  {
    question: "Can FRP stairs and platforms meet OSHA requirements?",
    answer: "They can be designed to a stated rule such as OSHA 1910.25 for stairs, 1910.29 for guardrails and 1910.22 for walking surfaces. Compliance belongs to the finished structure: geometry, members, connections and anchors checked by the project engineer, not to a material or a catalog part.",
  },
  {
    question: "Are fiberglass platforms welded?",
    answer: "No. Pultruded FRP is a thermoset and is not welded; platforms are bolted, with FRP or stainless steel fasteners. That is why an FRP access structure can be assembled without hot work, which matters on many chemical and energy sites.",
  },
  {
    question: "What load can an FRP platform carry?",
    answer: "As much as it is designed for. The floor load comes from the governing rule, for example 40 psf with a 300 lb concentrated load for catwalks or 60 psf for elevated platforms under ASCE 7-22, and the members, grating and connections are sized for it. F1 does not publish a single rating for an access structure.",
  },
  {
    question: "Does F1 design the platform?",
    answer: "F1 supplies the profiles, grating, treads, handrails, ladders and fasteners, with section and laminate data, and cuts and drills them to an approved drawing. Structural design and approval stay with the project engineer unless an engineering scope is agreed in the quotation.",
  },
  {
    question: "How does an FRP platform compare with steel or aluminum?",
    answer: "Compare complete structures designed for the same loads and geometry. FRP does not rust and is non-conductive in many exposures, and the parts are light to handle; steel and aluminum are stiffer per section. The material comparison page and the life-cycle calculator help set up a fair comparison.",
  },
];

export default function AccessPlatformsPage() {
  const keyFacts = [
    { label: "What they are", value: "FRP access platforms, crossovers, stairs and walkways are bolted fiberglass structures assembled from pultruded profiles, grating, stair treads, handrails and ladders." },
    { label: "What F1 supplies", value: "Catalog profiles, molded and pultruded grating, stair treads, handrail systems, fixed ladders and FRP fasteners, cut and drilled to an approved drawing and marked against a bill of materials." },
    { label: "Stair geometry", value: "OSHA 1910.25 standard stairs: 30° to 50°, risers no more than 9.5 in (241 mm), treads at least 9.5 in. EN ISO 14122-3: 20° to 45° with g + 2h between 600 and 660 mm." },
    { label: "Walkway rules", value: "EN ISO 14122-2: clear width at least 600 mm and 2,100 mm headroom. ASCE 7-22: 40 psf plus 300 lb for catwalks, 60 psf for elevated platforms." },
    { label: "Assembly", value: "Bolted, with no welding or hot work. F1's own factory stair was assembled by four people with hand tools." },
    { label: "Design responsibility", value: "The project engineer sizes members, connections and anchors under the governing code; F1 provides the section and laminate data for that check." },
  ];

  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP access platforms, stairs and crossovers",
          description: seoTarget.description,
          path: pagePath,
          image: heroImage,
          imageAlt: heroAlt,
          category: "Fiberglass access structures",
          material: ["Glass-fiber-reinforced thermoset"],
          productLine: "F1-STRUX",
          datePublished: LAST_UPDATED,
          dateModified: LAST_UPDATED,
        })}
      />
      <PageHeader
        tag="Access structures"
        updated={LAST_UPDATED}
        title="FRP access platforms, stairs and crossovers"
        description="Bolted fiberglass work platforms, crossovers, stair towers and walkways, built from pultruded profiles, grating, treads, handrails and ladders. Check the stair and walkway rules, then send a layout for a cut-and-drilled kit."
        facts={[
          { label: "Structures", value: "Platforms · crossovers · stairs" },
          { label: "Joints", value: "Bolted, no hot work" },
          { label: "Stair codes", value: "OSHA · ISO · AS · IBC" },
          { label: "Supply", value: "Marked kit to drawing" },
        ]}
        actions={{
          primary: { label: "Send a layout", href: buildRfqHref({ source: "product-header", product: "FRP access platform or stair", productPath: pagePath }) },
          secondary: { label: "Check stair geometry", href: "/tools/access-geometry-checker", variant: "secondary" },
          stickyMobile: true,
        }}
        figure={
          <Figure number={1} title="Stair and platform, F1 factory" note="Project photo" bleed>
            <div className="relative aspect-[16/10]">
              <Image src={heroImage} alt={heroAlt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "Access Platforms & Stairs" },
        ]}
      />
      <PageNav
        items={[
          { id: "key-facts", label: "Key facts" },
          { id: "structures", label: "Structures" },
          { id: "components", label: "Components" },
          { id: "stair-rules", label: "Stair rules" },
          { id: "walkway-loads", label: "Floor loads" },
          { id: "process", label: "From layout to kit" },
          { id: "faq", label: "FAQ" },
          { id: "quote", label: "Quote" },
        ]}
      />

      <KeyFacts
        title="FRP access platforms and stairs: key facts"
        tone="muted"
        summary="FRP access platforms, crossovers and stairs are bolted fiberglass structures made from pultruded profiles, grating, stair treads, handrails and ladders. F1 Composite supplies the components cut and drilled to an approved drawing, with the section data the project engineer needs for the design check."
        facts={keyFacts}
      />

      <PageSection id="structures" title="Five access structures, one set of components">
        <ul className="grid gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {structureTypes.map((item) => (
            <li key={item.title} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px]">
              <h3 className="text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
              <p className="mt-auto pt-[12px] font-mono text-f12 uppercase tracking-[0.04em] text-t3">{item.parts}</p>
            </li>
          ))}
        </ul>
        <div className="mt-[28px] grid gap-[12px] md:grid-cols-3">
          {[
            { src: "/images/f1-photos/frp-factory-staircase-structural-view.webp", title: "Stringers and frame", alt: "Side view of FRP I-beam stringers and pultruded structural profiles forming the staircase frame inside F1 Composite's Chongqing factory" },
            { src: "/images/f1-photos/frp-factory-staircase-platform-handrail.webp", title: "Stair flight from below", alt: "Underside of the stair flight: FRP I-beam stringers carrying the treads, with the orange FRP handrail alongside" },
            { src: "/images/f1-photos/frp-factory-staircase-grating-treads.webp", title: "Beam-to-post connection", alt: "Bolted connection between the platform beams and a post, all pultruded FRP profiles with stainless steel bolts" },
          ].map((photo, index) => (
            <Figure key={photo.src} number={index + 2} title={photo.title} note="Project photo">
              <div className="relative aspect-[4/3]">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 94vw, 30vw" className="object-cover" />
              </div>
            </Figure>
          ))}
        </div>
        <p className="mt-[14px] text-f14 leading-golden text-t2">
          Photos from the <Link href="/case-studies/factory-access-staircase" className={link}>F1 factory access staircase</Link>: I-beam stringers, pultruded posts, grating landings and an FRP handrail, bolted together without welding or a crane.
        </p>
      </PageSection>

      <PageSection id="components" title="Which F1 product makes which part" tone="muted">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">Access structure elements and the F1 products used for them</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Element", "F1 product"].map((heading) => <th key={heading} scope="col" className={`${cell} font-semibold text-t1`}>{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {componentMap.map((row) => (
                <tr key={row.element} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className={`${cell} font-semibold text-t1`}>{row.element}</th>
                  <td className={`${cell} text-t2`}>
                    {row.products.map((product, index) => (
                      <span key={product.href}>
                        {index > 0 ? " · " : ""}
                        <Link href={product.href} className={link}>{product.label}</Link>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="stair-rules" title="Stair geometry by code" intro="Requirement text from the access geometry checker, which applies the same rules to your riser, going, width and headroom.">
        <div className="grid gap-[16px] lg:grid-cols-2">
          {stairRules.map((rule) => (
            <div key={rule.code} className="overflow-hidden rounded-card border border-border-default bg-white">
              <h3 className="border-b border-border-default bg-bg2 px-[16px] py-[12px] text-f16 font-bold text-t1">{rule.name}</h3>
              <table className="w-full border-collapse text-left text-f14 leading-golden">
                <caption className="sr-only">{rule.name} stair requirements</caption>
                <tbody>
                  {rule.rows.map((row) => (
                    <tr key={row.label} className="border-b border-border-default align-top last:border-b-0">
                      <th scope="row" className={`${cell} w-[34%] font-semibold text-t1`}>{row.label}</th>
                      <td className={`${cell} text-t2`}>{row.requirement} <span className="text-t3">({row.clause})</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <p className="mt-[16px] text-f14 leading-golden text-t2">
          Check a proposed stair, ladder or walkway with the <Link href="/tools/access-geometry-checker" className={link}>access geometry checker</Link>; guardrail heights and loads are on the <Link href="/products/frp-handrail-systems#code-requirements" className={link}>industrial handrail systems</Link> page, and ladder rules in the <Link href="/resources/blog/fixed-ladder-requirements-osha-iso-14122-4" className={link}>fixed ladder requirements guide</Link>.
        </p>
      </PageSection>

      <PageSection id="walkway-loads" title="Floor loads for platforms and walkways" tone="muted" intro="Reference values the grating and framing are designed for. The code in force for the project governs.">
        <div className="overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[680px] border-collapse text-left text-f14 leading-golden">
            <caption className="sr-only">Reference floor loads for walkways and platforms</caption>
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Rule", "Use", "Load"].map((heading) => <th key={heading} scope="col" className={`${cell} font-semibold text-t1`}>{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {WALKWAY_LOADS.map((row) => (
                <tr key={`${row.rule}-${row.use}`} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className={`${cell} font-semibold text-t1`}>{row.rule}</th>
                  <td className={`${cell} text-t2`}>{row.use}</td>
                  <td className={`${cell} text-t2`}>{row.load}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[14px] text-f14 leading-golden text-t2">
          Choosing the deck: <Link href="/technology/molded-vs-pultruded-frp-grating" className={link}>molded vs pultruded grating</Link> and the <Link href="/tools/frp-grating-selector" className={link}>FRP grating selector</Link>. Sizing columns: <Link href="/tools/frp-column-calculator" className={link}>FRP column calculator</Link>.
        </p>
      </PageSection>

      <PageSection id="process" title="From layout to a marked, bolted kit">
        <ol className="grid gap-[12px] md:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-bg2 p-[16px]">
              <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</span>
              <h3 className="mt-[4px] text-f16 font-bold text-t1">{step.title}</h3>
              <p className="mt-[6px] text-f14 leading-golden text-t2">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-[16px] text-f14 leading-golden text-t2">
          Chemical and wastewater sites: <Link href="/applications/frp-chemical-plant-platforms" className={link}>FRP chemical plant platforms</Link>. Comparing materials: <Link href="/technology/frp-vs-traditional-materials" className={link}>FRP vs steel, aluminum and timber</Link> and the <Link href="/tools/frp-life-cycle-cost-calculator" className={link}>life-cycle cost calculator</Link>.
        </p>
      </PageSection>

      <PageSection id="faq" title="Access platform and stair questions" tone="muted">
        <div className="grid items-start gap-[12px] md:grid-cols-2">
          {faqItems.map((item) => (
            <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </PageSection>

      <PageSection id="quote" title="Quote an FRP platform, stair or crossover" tone="deep">
        <ProductRfq
          product="FRP access platform or stair"
          productPath={pagePath}
          intro="Send a plan and section with levels, the obstacle to clear, the stair or ladder positions, the code and loads, and the site exposure. Existing drawings or photos help."
          items={[
            { title: "Layout", text: "Plan, section, deck level, stair start and landing points, obstacles and existing supports." },
            { title: "Code and loads", text: "Stair, guardrail and floor-load rules, equipment and maintenance loads." },
            { title: "Scope", text: "Components only, a cut-and-drilled kit, or a kit with agreed engineering support." },
            { title: "Site", text: "Chemicals, outdoor exposure, fire requirements, anchors and delivery destination." },
          ]}
        />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "Components", links: [{ href: "/products/fiberglass-structural-shapes", label: "FRP structural shapes" }, { href: "/products/frp-gratings", label: "Pultruded grating" }, { href: "/products/frp-stair-treads", label: "Stair treads" }] },
          { title: "Safety", links: [{ href: "/products/frp-handrail-systems", label: "Industrial handrail systems" }, { href: "/products/frp-ladders", label: "Fixed ladders" }, { href: "/tools/handrail-load-calculator", label: "Handrail load calculator" }] },
          { title: "Projects", links: [{ href: "/case-studies/factory-access-staircase", label: "Factory access staircase" }, { href: "/applications/frp-chemical-plant-platforms", label: "Chemical plant platforms" }, { href: "/applications/frp-pedestrian-bridge-superstructures", label: "Pedestrian bridges" }] },
        ]}
      />
    </>
  );
}
