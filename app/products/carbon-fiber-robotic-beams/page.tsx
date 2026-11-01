import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { GuideSection, GuideSources, GuideStandards } from "@/components/sections/PultrusionGuidePage";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { carbonFigures, carbonProperties, carbonScenePhotos as scenes } from "@/content/data/carbonFiberScenes";
import type { ScenePhoto } from "@/content/data/frpRebar";
import { getPultrusionGuide } from "@/content/data/pultrusionGuides";
import { formatShortDate } from "@/lib/dates";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

// The specialist component page for carbon-fiber robotic beams and struts, picture-led
// (2026-11-01). The sourced specification sections, standards, sources and brief items stay in
// the shared guide data (content/data/pultrusionPrecisionGuides.ts) and render through the shared
// components; this page adds the performance, machine-type, joint and delivery material in front.
const page = getPultrusionGuide("product", "carbon-fiber-robotic-beams")!;
const path = "/products/carbon-fiber-robotic-beams";
const updated = "2026-11-01";
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
// Short section-bar labels for the guide's sourced specification sections.
const sectionLabels: Record<string, string> = { "supply-boundary": "Delivered condition", "section-and-laminate": "Laminate", "interfaces-and-datums": "Interfaces & datums", "prototype-and-lot-release": "Prototype release", "production-control": "Production control" };

export const metadata: Metadata = buildPageMetadata({ title: page.title, description: page.description, path, image: `${path}/opengraph-image` });

const quoteHref = buildRfqHref({
  source: "pultrusion-guide-carbon-fiber-robotic-beams",
  product: page.name,
  productPath: path,
  message: "Please review carbon-fiber beams or struts for my machine.\nMember: gantry beam / Z column / parallel-robot rod / arm link / strut:\nSection, length, stiffness target and allowable tip deflection:\nMoving mass budget, acceleration, cycle rate and payload:\nEnd interfaces: bore or OD fit, bonded sleeves, inserts, datums:\nTorsion, clamp and side loads; environment and temperature:\nDelivered condition: cut blank / machined / with fittings; quantities and date:",
});

// Why a moving member in a machine ends up in pultruded carbon.
const reasons = [
  { title: "A quarter of the moving mass at the same stiffness", lead: "A 1 m carbon beam sized for the same tip stiffness as a steel tube weighs 23% as much; the same motor and gearbox accelerate it faster, or a smaller drive does the same cycle.", proof: "70 × 70 × 3 carbon at 130 GPa class: EI 1.05 × the 60 × 60 × 3 steel reference at 1.25 kg/m against 5.4 kg/m. Class values; the offered laminate governs." },
  { title: "Twice the first natural frequency", lead: "Stiffness per unit mass sets how fast an arm stops ringing after a move. The carbon beam settles in about half the time of steel, which is the settling time the controller is waiting for before the next pick.", proof: "f₁ ∝ √(EI/m): 2.1 × steel, 1.6 × aluminium for the sections in Figure 2, uniform cantilever without tip mass." },
  { title: "It keeps its length through the shift", lead: "Near-zero thermal expansion along the fibers means a long gantry beam or Z column does not grow as the hall warms up, so the repeatability measured in the morning holds in the afternoon.", proof: "About −1 to +1 ×10⁻⁶/°C along the fibers against 23.6 for aluminium: a 3 m aluminium beam grows 0.7 mm over 10 °C; the carbon beam, a few hundredths." },
  { title: "No fatigue allowance for millions of cycles", lead: "A pick-and-place member sees millions of load reversals a year. Carbon in axial tension and bending keeps its stiffness where aluminium needs a fatigue allowance that grows the section and the mass.", proof: "High fatigue limit in tension along the fibers; the bonded end fitting, not the beam, usually sets the fatigue life of the member." },
];

// What the member will not do on its own.
const limits = [
  { title: "Pultrusion puts every fiber along the beam", text: "Torsion, side loads at the gripper, clamp pressure and cross-holes act on resin-dominated directions. A gantry beam that twists under an offset payload needs off-axis plies, a pull-wound wall or a sleeve, not just a thicker pultrusion." },
  { title: "The joint is the member", text: "A carbon beam almost never fails in the span. It fails at a clamp that crushes a thin wall, a hole that cuts fibers or a bonded fitting that was never qualified. The fitting design, the bond and the test on the assembled member are where the engineering goes." },
  { title: "Thin walls buckle before they break", text: "Equal stiffness at a quarter of the mass means a thinner wall. Local buckling, crushing under a clamp and bearing at an insert govern long before the laminate's strength does; the specification has to say what the wall carries." },
  { title: "Conductive, noble, and no insulator", text: "Carbon conducts and sits cathodic to aluminium and steel. A carbon beam bolted between aluminium carriages in a wet or washdown cell needs isolation at the interface; it is never an electrical insulator." },
];

// The machine types, with the photograph of the machine and which member on it is the carbon one.
const machines: Array<{ title: string; photo: ScenePhoto; member: string; why: string; typical: string; send: string }> = [
  { title: "Gantry and portal robots", photo: scenes.gantryCrates, member: "The cross beam and the Z column", why: "The longest moving members on the factory floor. A lighter cross beam lets the X drives accelerate faster for the same motor; a lighter Z column lets the Y carriage carry it without a bigger rail.", typical: "Square or rectangular beam blanks 60–200 mm, 2–6 m; Z columns 50–120 mm", send: "Span, carriage and payload mass, acceleration, tip deflection allowed, the carriage interface and the datums." },
  { title: "Delta and parallel robots", photo: scenes.deltaRow, member: "The parallelogram rods and the upper arms", why: "Rods loaded only along their axis, accelerated at several g thousands of times an hour. Carbon tubes with bonded ball-joint ends are the standard answer in every fast picker on the market.", typical: "Ø10–Ø40 mm tubes and Ø4–Ø12 mm rods, 200–1,500 mm, bonded end fittings", send: "Acceleration, payload, reach, the ball-joint or fitting type and the stiffness you need at the tool." },
  { title: "Palletising and handling cells", photo: scenes.palletizingCell, member: "Gantry beams, telescopic forks and extended-reach arms", why: "Payload is fixed by the product; the only mass the designer can take out is the machine's own. Carbon members in the long axes buy cycle time without a bigger drive or foundation.", typical: "Beam blanks and tubes 80–250 mm, to 8 m, machined interface zones", send: "The cycle you need, the axis that limits it today, and the interface drawing of the member you want to replace." },
  { title: "Extended-reach and articulated arms", photo: scenes.polishingArm, member: "The forearm and wrist extension", why: "An articulated arm's castings stay metal; the gain is in a long forearm or a reach extension, where every kilogram at the elbow costs payload at the tool and a steady path under side load.", typical: "Round or rectangular tubes 60–160 mm, 0.5–2 m, bonded or bolted sleeves", send: "Payload at the tool, reach, the side loads from the process, and the flange interfaces at both ends." },
  { title: "Linear axes and machine beams", photo: scenes.portalRobot, member: "Moving beams and columns on linear guides", why: "Machine builders use carbon beams where a moving axis would otherwise need a foundation-sized drive: inspection gantries, dispensing and screwing portals, large-format printers and cutters.", typical: "Custom sections with a flat guide face, 1–6 m, drilled and bushed to the rail pattern", send: "The guide and carriage pattern, the moving mass budget and the straightness over the stroke." },
  { title: "Metrology and clean-room handling", photo: scenes.telescope, member: "Measuring arms, probe columns and wafer-handling blades", why: "Dimensional stability through temperature change and fast settling after a move are what a measuring machine or a wafer handler pays for; carbon's near-zero expansion and high damping ratio deliver both.", typical: "Small precision sections and plates, tight straightness, often with a glass or peel-ply surface", send: "The temperature band, the settling time allowed, the stiffness at the probe and any cleanliness or outgassing requirement." },
];

/** A schematic plate at the 8:5 ratio the drawn figures are made in. */
function Plate({ src, alt }: { src: string; alt: string }) {
  return <div className="relative aspect-[8/5] bg-white"><Image src={src} alt={alt} fill sizes="(max-width: 1024px) 94vw, 50vw" className="object-contain" /></div>;
}

/** An openly licensed photograph that fills its plate; the credit is listed at the end of the page. */
function Photo({ photo, sizes = "(max-width: 1024px) 94vw, 33vw", preload = false }: { photo: ScenePhoto; sizes?: string; preload?: boolean }) {
  return <div className="relative aspect-[8/5] bg-bg2"><Image src={photo.src} alt={photo.alt} fill sizes={sizes} preload={preload} className="object-cover" /></div>;
}

const creditedPhotos: ScenePhoto[] = [scenes.deltaConveyor, scenes.kukaBakery, scenes.brokenPole, ...machines.map(item => item.photo), scenes.deltaLinkages, scenes.drilledHole, scenes.plateEdge].filter((photo, i, all) => all.findIndex(other => other.src === photo.src) === i);

export default function CarbonFiberRoboticBeamsPage() {
  const nav = [
    { id: "performance", label: "Why carbon" },
    { id: "machines", label: "Which member" },
    { id: "joints", label: "Ends & joints" },
    { id: "forms", label: "Tube, beam or rod" },
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
        image: absoluteUrl(scenes.deltaConveyor.src),
        publisher: { "@id": "https://www.f1composite.com/#organization" },
        citation: page.sources.map((source) => source.url),
      }} />
      <PageHeader
        tag="Specialist component specification"
        title="Carbon-fiber beams and struts for robots: a quarter of the moving mass at the same stiffness"
        description="A pultruded carbon beam sized for the same tip stiffness as a steel tube weighs about a quarter as much and settles after a move in half the time. That is what a gantry cross beam, a delta-robot rod or a reach extension buys: a faster cycle from the same drive, or the same cycle from a smaller one, with no thermal growth through the shift and no fatigue allowance. F1 Composite pultrudes beam blanks, tubes and rods to the OEM's section and length, machines interface zones to the drawing, and supplies the laminate data and inspection records the qualification needs. The joint design, the assembled-member tests and the machine's safety validation remain the OEM's."
        updated={updated}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Carbon fiber pultrusion", href: "/products/pultrusion-carbon-fiber" }, { label: page.name }]}
        facts={[{ label: "Moving mass, same stiffness", value: "≈ 23% of steel · 38% of aluminium" }, { label: "First frequency", value: "≈ 2 × steel · 1.6 × aluminium" }, { label: "Expansion along the beam", value: "≈ 0 ×10⁻⁶/°C" }, { label: "Supply", value: "Blank, machined or with fittings, to drawing" }]}
        actions={{ primary: { label: "Discuss your member", href: quoteHref }, secondary: { label: "See the numbers", href: "#performance", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="Carbon rods on a delta picker" note="Photo · see credits" bleed caption={scenes.deltaConveyor.shows}><Photo photo={scenes.deltaConveyor} sizes="(max-width: 1023px) 94vw, 44vw" preload /></Figure>}
      />
      <PageNav items={nav} />

      <PageSection id="performance" title="What a carbon member does for a machine, and what it will not do" intro="A robot or a gantry is limited by the mass it has to move, not by the mass it carries. Taking three quarters of the mass out of the longest moving member is the biggest single gain a machine builder can make without a new drive train. The numbers are class values for unidirectional pultruded carbon; the laminate's qualification report is the design basis.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={2} title="One arm, three materials, the same stiffness" caption="A 1 m cantilever square tube sized for equal tip stiffness: steel 60 × 60 × 3 at 5.4 kg/m, aluminium 80 × 80 × 4 at 3.3 kg/m, pultruded carbon 70 × 70 × 3 at 1.25 kg/m with twice the first natural frequency." bleed><Plate src={carbonFigures.robotBeamStiffness.src} alt={carbonFigures.robotBeamStiffness.alt} /></Figure>
          <div className="grid gap-[16px]">
            <Figure number={3} title="Where the kilograms are" note="Photo · see credits" caption={scenes.kukaBakery.shows} bleed><Photo photo={scenes.kukaBakery} sizes="(max-width: 1024px) 94vw, 40vw" /></Figure>
            <Figure number={4} title="Stiffness per unit mass" caption="Unidirectional pultruded carbon against aluminium, steel and E23 fiberglass: same mass, about 3.4 times the stiffness of the metals along the fibers." bleed><Plate src={carbonFigures.specificStiffness.src} alt={carbonFigures.specificStiffness.alt} /></Figure>
          </div>
        </div>
        <div className="mt-[32px] grid gap-[20px] md:grid-cols-2 xl:grid-cols-4">{reasons.map((reason, i) => <article key={reason.title} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Reason {i + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{reason.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{reason.lead}</p><p className="mt-[12px] border-t border-border-default pt-[12px] text-f12 leading-relaxed text-t3">{reason.proof}</p></article>)}</div>
        <div className="mt-[32px] grid items-start gap-[24px] lg:grid-cols-[1fr_1.6fr]">
          <Figure number={5} title="No yield, no warning" note="Photo · see credits" caption={scenes.brokenPole.shows} bleed><Photo photo={scenes.brokenPole} sizes="(max-width: 1024px) 94vw, 36vw" /></Figure>
          <div className="grid gap-[16px] sm:grid-cols-2">{limits.map(limit => <article key={limit.title} className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">{limit.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{limit.text}</p></article>)}</div>
        </div>
        <div className="mt-[32px] overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-[20px] py-[16px] text-left font-semibold text-t1">Unidirectional pultruded carbon against the materials it replaces, property by property</caption><thead className="bg-bg2"><tr><th scope="col" className="px-[16px] py-[12px]">Property</th><th scope="col" className="px-[16px] py-[12px] text-teal-text">Pultruded CFRP</th><th scope="col" className="px-[16px] py-[12px]">Pultruded GFRP (E23)</th><th scope="col" className="px-[16px] py-[12px]">Aluminium 6061-T6</th><th scope="col" className="px-[16px] py-[12px]">Structural steel</th><th scope="col" className="px-[16px] py-[12px]">What it means for a machine member</th></tr></thead><tbody>{carbonProperties.map(row => <tr key={row.property} className="border-t border-border-default align-top"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{row.property}</th><td className="px-[16px] py-[12px] leading-relaxed text-t1">{row.cfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.gfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.aluminium}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.steel}</td><td className="px-[16px] py-[12px] leading-relaxed text-t3">{row.note}</td></tr>)}</tbody></table></div><p className="border-t border-border-default p-[20px] text-f12 leading-relaxed text-t3">CFRP values are published class ranges for standard-modulus carbon at about 60% fiber volume (ACI 440.1R Table 3.1 and supplier datasheets); fiberglass is the EN 13706 E23 minimum F1 publishes for its glass profiles; metals are handbook values. None is a guarantee for a particular member: the qualification report of the offered laminate, in the test direction that matters, is the number to design with.</p></div>
      </PageSection>

      <PageSection id="machines" title="Which member on which machine" tone="muted" intro="Six machine types buy carbon members, and on each it is one or two specific parts: the longest moving one, and the one that has to settle fastest. The photographs show the machine, not an F1 part; the caption names the member a carbon beam blank, tube or rod replaces.">
        <div className="grid gap-[24px] md:grid-cols-2 xl:grid-cols-3">{machines.map(item => <article key={item.title} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white"><Photo photo={item.photo} sizes="(max-width: 768px) 94vw, (max-width: 1280px) 47vw, 31vw" /><div className="flex flex-1 flex-col p-[20px]"><p className="text-f12 leading-relaxed text-t3">{item.photo.shows}</p><h3 className="mt-[12px] text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[4px] text-f14 font-semibold text-teal-text">{item.member}</p><p className="mt-[8px] text-f14 leading-relaxed text-t2">{item.why}</p><dl className="mt-[16px] grid gap-[10px] text-f14 leading-relaxed"><dt className="font-semibold text-t1">Typical</dt><dd className="text-t2">{item.typical}</dd><dt className="font-semibold text-t1">What to send</dt><dd className="text-t2">{item.send}</dd></dl></div></article>)}</div>
        <p className="mt-[24px] text-f14 leading-relaxed text-t2">The engineering guide, with the operating brief, beam stability, dynamic response, fatigue and the replacement-arm change process, is on the <Link href="/applications/cfrp-robotic-beams-struts" className={linkStyle}>robot beam and strut engineering guide</Link>. Rotating members are a different product: see <Link href="/products/carbon-fiber-roller-tubes" className={linkStyle}>carbon-fiber roller tubes</Link>.</p>
      </PageSection>

      <PageSection id="joints" title="The ends are the member" intro="A carbon beam almost never fails in the span. It fails at a clamp that crushes a thin wall, a hole that cuts the fibers or a bonded fitting that was never tested with the beam it sits in. Most of the engineering time, and all of the qualification, goes into the ends.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1fr_1fr_1.3fr]">
          <Figure number={6} title="Bonded ball-joint ends" note="Photo · see credits" caption={scenes.deltaLinkages.shows} bleed><Photo photo={scenes.deltaLinkages} /></Figure>
          <Figure number={7} title="A hole is a wound" note="Photo · see credits" caption={scenes.drilledHole.shows} bleed><Photo photo={scenes.drilledHole} /></Figure>
          <div className="grid gap-[12px]">
            {[
              ["Spread the load into the wall", "Bonded sleeves, supported inserts and load-spreading bushes carry the force over an area the thin wall can take. A set screw or a hard clamp on a bare tube crushes it; a sleeve under the clamp does not."],
              ["Bond, then bolt the fitting", "The carbon-to-fitting joint is adhesive; bolts go through the metal fitting, not through the laminate. Where a bolt must pass through the beam, a bonded bush and a checked net section."],
              ["Isolate aluminium carriages", "Carbon is cathodic to aluminium. A glass ply, an anodised and sealed fitting or a non-conductive adhesive layer at every carbon-to-aluminium face in a washdown or humid cell."],
              ["Test the member, not the coupon", "Static, fatigue and environmental tests on the beam with its fittings, loaded the way the machine loads it. A laminate coupon passing says nothing about the joint."],
            ].map(([title, text]) => <div key={title} className="border-t-2 border-teal pt-[10px]"><h3 className="text-f16 font-bold text-t1">{title}</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">{text}</p></div>)}
          </div>
        </div>
        <p className="mt-[20px] text-f14 leading-relaxed text-t2">Cutting, drilling and bonding of pultruded sections are covered in <Link href="/technology/frp-profile-machining" className={linkStyle}>machining and fabrication</Link>; the tests F1 can run or arrange on a member and its fittings are on the <Link href="/technology/quality-testing" className={linkStyle}>quality and testing</Link> page.</p>
      </PageSection>

      <PageSection id="forms" title="Tube, beam blank or rod" tone="muted" intro="The same unidirectional laminate, three sections. Which one a member needs follows from how it is loaded and how it is joined.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={8} title="Fiber direction: pultruded against roll-wrapped" caption="A 0° laminate carries axial load, bending and buckling at the highest modulus per kilogram; ±45° and 90° plies add torsion and hoop capacity. A gantry beam under an offset payload is the case where the wrap, or a sleeve, earns its cost." bleed><Plate src={carbonFigures.fiberDirection.src} alt={carbonFigures.fiberDirection.alt} /></Figure>
          <div className="grid gap-[12px]">
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Round tube</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">Parallel-robot rods, struts, reach extensions: bending in any direction, a bore for a bonded fitting or a cable. The highest stiffness per kilogram of the three.</p><Link href="/products/pultruded-carbon-fiber-tubes" className={`mt-[8px] inline-flex min-h-10 items-center text-f14 ${linkStyle}`}>Pultruded carbon fiber tubes →</Link></div>
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Square or rectangular beam blank</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">Gantry cross beams, Z columns and machine axes: a flat face for a linear guide, a deep section in the bending direction, machined interface zones. Custom sections to the drawing.</p><Link href="/products/custom-pultruded-profiles" className={`mt-[8px] inline-flex min-h-10 items-center text-f14 ${linkStyle}`}>Custom pultruded profiles →</Link></div>
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Solid rod</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">Small-diameter linkages, push rods and ties where a tube would be too thin to clamp or bond: all the stiffness along the axis, a solid section for the end fitting.</p><Link href="/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod" className={`mt-[8px] inline-flex min-h-10 items-center text-f14 ${linkStyle}`}>Carbon fiber rods →</Link></div>
          </div>
        </div>
        <div className="mt-[24px] grid items-start gap-[24px] lg:grid-cols-[1fr_1.6fr]">
          <Figure number={9} title="What the laminate looks like, cut" note="Photo · see credits" caption={scenes.plateEdge.shows} bleed><Photo photo={scenes.plateEdge} sizes="(max-width: 1024px) 94vw, 36vw" /></Figure>
          <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Delivered condition: choose one on the order</h3><ul className="mt-[8px] space-y-[8px] text-f14 leading-relaxed text-t2">{["Cut blank: the profile to section and length, ends square, laminate data and lot record", "Machined blank: interface zones, bores and faces machined to the drawing datums; holes only where the drawing allows", "With fittings: bonded sleeves or inserts fitted and inspected to the agreed procedure, the joint design and its qualification owned by the OEM or agreed as a joint program"].map(item => <li key={item}>· {item}</li>)}</ul><p className="mt-[12px] text-f12 leading-relaxed text-t3">Class values on this page are published ranges for unidirectional pultruded carbon; they are not an F1 datasheet, a stock arm series or a robot safety approval. The sections below say how to turn the member into a purchase specification.</p></div>
        </div>
      </PageSection>

      {page.sections.map((section, index) => <GuideSection key={section.id} page={page} section={section} tone={index % 2 === 0 ? "white" : "muted"} />)}

      <PageSection id="standards" title="Standards, regulations and acceptance evidence" tone="muted" intro="The machine builder and integrator determine the governing route. A carbon member is one design input; none of these documents certifies the profile, and none of them is closed by a profile inspection report.">
        <GuideStandards page={page} />
        <p className="mt-[20px] max-w-[880px] text-f14 leading-relaxed text-t3">Public source scopes were reviewed on <time dateTime={updated}>{formatShortDate(updated)}</time>. These references do not establish that any F1 product is approved for a particular robot, or that a replacement member keeps a machine&apos;s conformity.</p>
      </PageSection>

      <PageSection id="faq" title={`${page.name}: practical questions`}>
        <FAQList items={[
          { question: "How much faster does a carbon beam make the machine?", answer: "It depends on how much of the moving mass is the beam. For a gantry whose cross beam is most of the moving mass, cutting that mass to a quarter lets the same drive reach roughly twice the acceleration before torque limits, and the arm settles in about half the time, so the cycle gain is often 20–40%. For an articulated arm whose castings stay metal, the gain is in payload at the tool from a lighter forearm. Model the axis with the real masses; the class values on this page are the starting point." },
          { question: "Can a carbon beam simply replace the aluminium one on the same carriages?", answer: "Rarely as a drop-in. For the same stiffness the carbon section is a different size and its wall is thinner, so the carriage clamps, the bolt pattern and the end plates need sleeves or bonded inserts, and the beam needs isolation from the aluminium carriages. The engineering guide treats a replacement arm as an engineering change with its own validation; the member is designed with its ends." },
          { question: "Pultruded, pull-wound or roll-wrapped?", answer: "Pultruded for a straight member loaded along its axis or in bending: the highest modulus per kilogram, any length, the lowest cost. Pull-wound or roll-wrapped where the beam carries torsion from an offset payload or a hard clamp bites the wall; the off-axis plies cost stiffness along the beam and money per metre. A pultruded beam with bonded sleeves at the ends often does what a fully wrapped one would, for less; state the loads and F1 proposes the laminate." },
          ...page.faqs,
        ]} />
        <aside id="photo-credits" className="mt-[32px] rounded-card border border-border-default bg-bg2 p-[20px] text-f12 leading-relaxed text-t3">
          <h3 className="text-f14 font-bold text-t1">Photo credits</h3>
          <p className="mt-[4px]">Figures 2, 4 and 8 are F1 Composite&apos;s own drawings. The photographs are openly licensed works from Wikimedia Commons, cropped and re-encoded for this page; none shows an F1 part or project, and the machines shown are not claimed to use F1 members.</p>
          <ul className="mt-[8px] columns-1 gap-[24px] md:columns-2">{creditedPhotos.map(photo => <li key={photo.src} className="break-inside-avoid"><a href={photo.credit.sourceHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.title}</a> by {photo.credit.author}, {photo.credit.licenseHref ? <a href={photo.credit.licenseHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.license}</a> : photo.credit.license}.</li>)}</ul>
        </aside>
      </PageSection>

      <PageSection id="sources" title="Technical sources and further reading" tone="muted" intro="Industry sources establish where carbon members are used. Authority sources define the published scope of standards and regulations. The design responsibility stays with the machine builder and integrator.">
        <GuideSources page={page} />
      </PageSection>

      <PageSection id="quote" title="Prepare a member qualification brief" tone="deep">
        <ProductRfq
          product={page.name}
          productPath={path}
          quoteHref={quoteHref}
          quoteLabel="Send your member brief"
          intro="Send the member, the loads and motion, the interface drawing and the delivered condition you want, so we can confirm the section, the laminate data, the machining scope and what qualification evidence is still needed."
          items={page.specification.map((item, index) => ({ title: `${String(index + 1).padStart(2, "0")} · ${item}` }))}
          links={page.related.slice(0, 3)}
        />
      </PageSection>
      <RelatedLinks title="Continue the specification" groups={[{ title: "Products and application guidance", links: [...page.related, { href: "/products/pultruded-carbon-fiber-tubes", label: "Pultruded carbon fiber tubes" }, { href: "/products/pultrusion-carbon-fiber", label: "Carbon fiber pultrusion overview" }] }]} />
    </>
  );
}
