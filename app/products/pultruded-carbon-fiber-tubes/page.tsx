import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { carbonProfileLinks } from "@/content/data/carbonFiberPultrusion";
import { carbonFigures, carbonProperties, carbonScenePhotos as scenes } from "@/content/data/carbonFiberScenes";
import type { ScenePhoto } from "@/content/data/frpRebar";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/pultruded-carbon-fiber-tubes";
const seoTarget = getSeoQueryTarget(pagePath);
const pageTitle = seoTarget.title;
const pageDescription = seoTarget.description;
const roundTubes = "/products/fiberglass-structural-shapes/frp-tube";
const squareTubes = "/products/fiberglass-structural-shapes/frp-square-tube";
const solidRods = "/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod";
const updated = "2026-10-28";
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/pultruded-carbon-fiber-tubes/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "pultruded-carbon-fiber-tubes",
  product: "Pultruded carbon fiber tubes",
  productPath: pagePath,
  message: "Please review my pultruded carbon fiber tube requirements.\nSection / OD / ID / wall thickness (with units):\nFinished length, tolerance and quantity:\nApplication, span, loads and deflection limit:\nFiber / resin requirements and service temperature:\nBore tolerance, insert diameter, engagement length and required clearance:\nClamps, bonded fittings, holes or inserts:\nRequired inspection and test evidence:\nDestination and target delivery date:",
});

// The four reasons a straight member ends up in pultruded carbon, each tied to the property behind it.
const reasons = [
  { title: "Three times the stiffness per kilogram", lead: "Along the fibers a unidirectional carbon tube is about 3.4 times as stiff as aluminium or steel for the same mass, and seven times a fiberglass tube.", proof: "Longitudinal modulus 120–150 GPa class at 1.55 g/cm³, against 69 GPa at 2.70 for aluminium and 200 GPa at 7.85 for steel." },
  { title: "It stays the length it was cut", lead: "Thermal expansion along the fibers is close to zero, so a boom, an optical bench or a metrology frame holds its dimensions through a day's temperature swing.", proof: "About −1 to +1 ×10⁻⁶/°C along the fibers (ACI 440.1R class values); aluminium moves 23.6 ×10⁻⁶/°C." },
  { title: "No corrosion, no fatigue allowance", lead: "Carbon does not rust or pit, and under cyclic axial load it keeps its strength where aluminium needs a larger section to survive the same cycles.", proof: "High fatigue limit in tension along the fibers; the resin and any off-axis stress set the limit, not the carbon." },
  { title: "Straight, constant and continuous", lead: "Pultrusion makes the tube in one continuous pull: a constant section, straight to the die, cut to any length, at the lowest cost per metre carbon is made for.", proof: "The process fixes the laminate along the axis, which is also its limit: torsion, pressure and clamp loads need another architecture or a designed joint." },
];

// What the material will not do, stated beside the benefits.
const limits = [
  { title: "It breaks instead of bending", text: "Unidirectional carbon is linear to rupture at about 1.2–1.8% strain. There is no yield to warn you; a tube is designed to a strain limit, protected from impact, and never used where a dent would be accepted in metal." },
  { title: "Weak across the fibers", text: "Transverse and shear properties are resin-dominated. A clamp that bites the wall, a cross-drilled hole, torque or a side impact loads the weak direction; sleeves, bonded inserts and local wraps carry those loads." },
  { title: "It conducts and it is noble", text: "Carbon fiber is electrically conductive and sits cathodic to aluminium and steel. A wet carbon-to-aluminium joint corrodes the aluminium; isolate it with a glass ply, a sleeve or sealed adhesive, and use fiberglass where insulation is the point." },
  { title: "The resin sets the temperature", text: "Epoxy and vinyl ester matrices soften past their glass transition, typically 100–150 °C. Service temperature, fire exposure and hot bonding cycles belong in the brief, not in an assumption." },
];

const specifications = [
  ["Cross-section", "Round hollow tubing; submit square, rectangular or other constant sections for tooling review."],
  ["Diameter & wall", "Specify outside diameter, inside diameter and nominal wall in mm or inches. Identify the dimensions that control fit."],
  ["Length & quantity", "Finished length and piece count per item, plus trial quantity and expected repeat demand."],
  ["Dimensional controls", "Agree OD / ID tolerances, wall variation, ovality, straightness and end squareness on the drawing."],
  ["Fiber & resin", "Define carbon grade, reinforcement architecture and resin against stiffness, exposure and temperature requirements."],
  ["Surface & fabrication", "State bonding zones, surface finish, coating, end preparation, holes and fitting requirements for review."],
  ["Acceptance evidence", "Agree inspection method, sampling, material identification and any mechanical or assembly tests before ordering."],
];

const comparisons = [
  ["Selection priority", "Low moving mass and high longitudinal stiffness.", "A balance of structural performance and material cost."],
  ["Electrical behavior", "Carbon reinforcement conducts electricity; do not specify as electrical insulation.", "Glass reinforcement suits insulating designs; qualify the resin, part and assembly for the duty."],
  ["Load direction", "Predominantly axial reinforcement; assess torque, local crushing and joints separately.", "Roving, mat and fabric content also govern directional properties and connection behavior."],
  ["Environment & interfaces", "Review resin exposure and isolate carbon from susceptible metals where moisture is present.", "Review resin, weathering and connection materials for the exposure."],
  ["Commercial decision", "Justify the material premium through mass, deflection or equipment performance.", "Often the starting point for cost-led frames, rails and general structural members."],
];

// Where a pultruded carbon tube is specified, with a photograph of the element and what to send.
const applications: Array<{ title: string; photo: ScenePhoto; why: string; typical: string; send: string }> = [
  { title: "Drone and UAV arms, booms and landing gear", photo: scenes.fpvQuad, why: "Every gram on a multirotor costs flight time and agility; the arms are straight tubes loaded in bending by the motors. Pultruded tubes give the stiffness, the repeat length and the bore for wiring.", typical: "Ø8–Ø30 mm, walls 1–2 mm, cut lengths 150–1,200 mm", send: "Motor thrust and arm length, the clamp or bonded fitting at each end, and the bore for cables." },
  { title: "Pick-and-place and parallel robots", photo: scenes.deltaConveyor, why: "A delta or SCARA arm accelerates at several g thousands of times an hour. Lower moving mass means a smaller motor, a faster cycle and less vibration at the end effector.", typical: "Ø10–Ø40 mm tubes and Ø4–Ø12 mm rods, 200–1,500 mm", send: "Acceleration, reach, payload, joint type and the deflection you can accept at the tool." },
  { title: "Optical, metrology and instrument structures", photo: scenes.telescope, why: "A telescope tube, a camera boom or a coordinate-measuring frame must hold alignment while the temperature changes. Near-zero expansion along the fibers and fast vibration damping are the reasons.", typical: "Ø20–Ø120 mm, lengths to 3 m, tight straightness", send: "Alignment tolerance, the temperature cycle, the mounted mass and the mounting interfaces." },
  { title: "Booms, masts, outriggers and poles", photo: scenes.boom, why: "The longest members gain the most: a carbon boom reaches further for the same tip deflection, or carries the same load at a fraction of the mass. Survey poles, antenna masts, camera cranes and inspection booms all follow this logic.", typical: "Ø30–Ø150 mm, 2–12 m, often telescoping sections", send: "Cantilever length, tip load, allowable deflection, wind or motion loads and how the sections join." },
  { title: "Research, model and light aircraft", photo: scenes.glider, why: "Spars, tail booms, pushrods and struts in research gliders, UAV airframes and model aircraft use carbon tubes where a metal tube would be too heavy and a wrapped tube too costly for a straight part.", typical: "Ø4–Ø40 mm, thin walls, long cut lengths", send: "The load case, the span between supports, the fittings and any impact or ground-handling loads." },
  { title: "Lightweight frames and chassis", photo: scenes.heliFrame, why: "A space frame of straight carbon members bonded into nodes gives a stiff, light structure for vehicles, equipment enclosures and exhibition or stage rigs. The tubes are the easy part; the node design decides the frame.", typical: "Ø15–Ø60 mm round or 20–60 mm square, bonded or sleeved nodes", send: "The frame geometry, node loads, the adhesive or fitting system and the stiffness target." },
  { title: "Flexible poles that spring back", photo: scenes.windWand, why: "Where a member must bend a long way and return, a composite pole stays elastic where metal would yield. Carbon adds stiffness to fiberglass in a hybrid pole, or carries the job alone in a lighter one.", typical: "Hybrid carbon and glass laminates, tapered or stepped sections", send: "Deflection range, cycles, wind or impact loading, and whether the pole is tapered or stepped." },
  { title: "Replacing a fiberglass or aluminium tube", photo: scenes.wovenTube, why: "When an existing part is too heavy or deflects too much, a carbon tube of the same outside diameter usually fixes it, provided the joints are redesigned for a material that cannot be welded, threaded or clamped hard.", typical: "Same OD as the metal part, often a thinner wall", send: "The current drawing, what is wrong with it, and the fittings you want to keep." },
];

const faqItems = [
  { question: "Is a hollow carbon fiber rod the same as a carbon fiber tube?", answer: "Yes. A hollow carbon fiber rod is commonly called a carbon fiber tube because it has an internal bore. A solid rod has no bore. Specify outside diameter (OD), inside diameter (ID), wall thickness and finished length so the quoted section is unambiguous; the name alone does not define its reinforcement or load capacity." },
  { question: "Is a hollow carbon fiber rod stiffer than a solid rod?", answer: "At the same outside diameter, length and longitudinal modulus, a solid rod has greater bending stiffness and more mass. At the same mass and length, a larger-diameter hollow section provides greater bending stiffness: a Ø14 × Ø10 mm tube has the mass of a Ø10 mm rod and 2.8 times its second moment of area. Neither comparison establishes strength or a safe load: wall stability, reinforcement and connections still need review." },
  { question: "How stiff and how light is a pultruded carbon tube?", answer: "Class values for unidirectional pultruded carbon at about 60% fiber volume are a longitudinal modulus of 120–150 GPa at a density of about 1.55 g/cm³. That is 3.4 times the stiffness per unit mass of aluminium or steel and about seven times that of an E23 fiberglass tube. These are published ranges, not an F1 datasheet; the qualification report of the offered laminate states what a delivered tube achieves." },
  { question: "What is a pultruded carbon fiber tube?", answer: "It is a hollow, constant-section composite made by pulling resin-impregnated carbon reinforcement through a heated die. The main fibers run along the tube. This architecture supports longitudinal stiffness, while the resin and any off-axis reinforcement govern other aspects of performance." },
  { question: "How does pultruded tubing differ from roll-wrapped carbon tubing?", answer: "Pultrusion pulls reinforcement continuously through a die, so the fibers lie along the tube and the cost per metre is the lowest carbon offers. Roll wrapping places prepreg plies around a mandrel at chosen angles, which adds torsional and hoop capacity at a higher price and in batch lengths. A mainly unidirectional pultrusion suits axial and bending duties; significant torque or circumferential loads need an architecture with off-axis plies. Compare the actual laminate and test data, not just the process name." },
  { question: "Which carbon tube sizes and tolerances can I order?", answer: "Send the required outside and inside dimensions, wall, finished length, fit and quantity. F1 reviews the section, tooling and inspection requirements before confirming dimensions and tolerances. This page does not represent a fixed stock-size list; sample timing, MOQ and production lead time are quoted for the proposed configuration." },
  { question: "Is a carbon fiber tube electrically insulating?", answer: "No. Carbon fibers are electrically conductive, and in a wet joint with aluminium they drive galvanic corrosion of the aluminium. If electrical isolation is required, start with a suitable fiberglass tube specification and qualify the complete part under the required electrical and environmental conditions. A surface coating alone should not be assumed to provide dependable insulation." },
  { question: "Can I drill, clamp or bond pultruded carbon tubing?", answer: "These details require joint design. Drilling interrupts fibers and can delaminate the exit side, and concentrated clamp pressure can split or crush a thin wall. Define load transfer, bond preparation, supported inserts or sleeves, adhesive and environmental exposure; validate the finished connection. Do not apply a universal clamp torque or bond length." },
  { question: "Can these tubes carry internal pressure?", answer: "A structural carbon tube has no implied pressure rating. Pressure service requires a purpose-designed hoop reinforcement system, end connections and qualification. Include pressure, temperature and medium in the brief so the manufacturing route can be reviewed." },
  { question: "How does the price of a pultruded carbon tube compare?", answer: "Per metre a carbon tube costs several times a fiberglass tube of the same size and more than an aluminium one; pultrusion is the cheapest way to make a carbon tube because it is continuous. The premium is justified where mass, deflection or cycle time has a value: a lighter arm needs a smaller motor, a stiffer boom reaches further. Prices are quoted per drawing and quantity; there is no price list for a custom section." },
];

/** A schematic plate at the 8:5 ratio the drawn figures are made in. */
function Plate({ src, alt }: { src: string; alt: string }) {
  return <div className="relative aspect-[8/5] bg-white"><Image src={src} alt={alt} fill sizes="(max-width: 1024px) 94vw, 50vw" className="object-contain" /></div>;
}

/** An openly licensed photograph that fills its plate; the credit is listed at the end of the page. */
function Photo({ photo, sizes = "(max-width: 1024px) 94vw, 33vw", preload = false }: { photo: ScenePhoto; sizes?: string; preload?: boolean }) {
  return <div className="relative aspect-[8/5] bg-bg2"><Image src={photo.src} alt={photo.alt} fill sizes={sizes} preload={preload} className="object-cover" /></div>;
}

// Every third-party photograph on the page, in the order it appears, for the credits list.
const creditedPhotos: ScenePhoto[] = [scenes.hexacopter, scenes.roving, scenes.brokenPole, scenes.drilledHole, ...applications.map(item => item.photo), scenes.plateEdge].filter((photo, i, all) => all.findIndex(other => other.src === photo.src) === i);

export default function PultrudedCarbonFiberTubesPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({
        name: "Hollow Carbon Fiber Rod & Pultruded Tubes",
        description: pageDescription,
        path: pagePath,
        image: scenes.hexacopter.src,
        category: "Custom pultruded carbon fiber tubing",
        material: "Carbon fiber reinforced polymer (CFRP)",
        productLine: "F1-FORM",
        dateModified: updated,
        additionalProperty: [
          { name: "Manufacturing process", value: "Continuous pultrusion" },
          { name: "Specification", value: "Section, laminate and acceptance requirements agreed to drawing" },
        ],
      })} />
      <PageHeader
        tag="Carbon fiber tubing"
        line={{ name: "F1-FORM", label: "Carbon fiber tubes" }}
        title="Hollow carbon fiber rod and pultruded tubes: three times the stiffness per kilogram of metal"
        description="A hollow carbon fiber rod is a carbon fiber tube: a straight, constant section with the fibers along its length, about 3.4 times as stiff as aluminium or steel for the same mass, dimensionally stable through temperature change, and free of corrosion and fatigue allowances. F1 Composite pultrudes custom CFRP tubing to your outside diameter, bore, wall and finished length, reviews the loads, laminate and connections with you, and quotes the section, tooling and evidence for the drawing."
        updated={updated}
        facts={[
          { label: "Material", value: "Unidirectional CFRP" },
          { label: "Stiffness per kg", value: "≈ 3.4 × aluminium or steel" },
          { label: "Mass, same section", value: "57% of aluminium · 20% of steel" },
          { label: "Supply", value: "To drawing, any cut length" },
        ]}
        actions={{ primary: { label: "Request a tube review", href: quoteHref }, secondary: { label: "See the numbers", href: "#performance", variant: "secondary" }, stickyMobile: true }}
        figure={
          <Figure number={1} title="Carbon tube arms on a camera hexacopter" note="Photo · see credits" bleed caption={scenes.hexacopter.shows}>
            <Photo photo={scenes.hexacopter} sizes="(max-width: 1023px) 94vw, 44vw" preload />
          </Figure>
        }
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/pultruded-frp-profiles" }, { label: "Custom profiles", href: "/products/custom-pultruded-profiles" }, { label: "Carbon fiber tubes" }]}
      />
      <PageNav items={[
        { id: "performance", label: "Why carbon" }, { id: "hollow-vs-solid", label: "Hollow vs solid" }, { id: "fiber-direction", label: "Fiber direction" },
        { id: "applications", label: "Applications" }, { id: "specifications", label: "Specifications" },
        { id: "carbon-vs-fiberglass", label: "Carbon vs glass" }, { id: "connections", label: "Connections" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" },
      ]} />

      <PageSection id="performance" title="What a pultruded carbon tube does that metal cannot, and what it will not do" intro="Carbon fiber is bought for one number: stiffness per kilogram along the fibers. Everything else on this page follows from where the fibers point. The benefits are real and measurable; so are the limits, and a tube that ignores them fails at the clamp, the hole or the first hard knock.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.2fr_1fr]">
          <Figure number={2} title="Stiffness per unit mass, along the fibers" caption="Specific stiffness of unidirectional pultruded carbon against aluminium, steel and E23 fiberglass. Same mass per metre, about 3.4 times the stiffness of the metals." bleed><Plate src={carbonFigures.specificStiffness.src} alt={carbonFigures.specificStiffness.alt} /></Figure>
          <Figure number={3} title="Where the stiffness comes from" note="Photo · see credits" caption={scenes.roving.shows} bleed><Photo photo={scenes.roving} sizes="(max-width: 1024px) 94vw, 40vw" /></Figure>
        </div>
        <div className="mt-[32px] grid gap-[20px] md:grid-cols-2 xl:grid-cols-4">{reasons.map((reason, i) => <article key={reason.title} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Reason {i + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{reason.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{reason.lead}</p><p className="mt-[12px] border-t border-border-default pt-[12px] text-f12 leading-relaxed text-t3">{reason.proof}</p></article>)}</div>
        <div className="mt-[32px] overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-[20px] py-[16px] text-left font-semibold text-t1">Unidirectional pultruded carbon against the materials it replaces, property by property</caption><thead className="bg-bg2"><tr><th scope="col" className="px-[16px] py-[12px]">Property</th><th scope="col" className="px-[16px] py-[12px] text-teal-text">Pultruded CFRP</th><th scope="col" className="px-[16px] py-[12px]">Pultruded GFRP (E23)</th><th scope="col" className="px-[16px] py-[12px]">Aluminium 6061-T6</th><th scope="col" className="px-[16px] py-[12px]">Structural steel</th><th scope="col" className="px-[16px] py-[12px]">What it means for a tube</th></tr></thead><tbody>{carbonProperties.map(row => <tr key={row.property} className="border-t border-border-default align-top"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{row.property}</th><td className="px-[16px] py-[12px] leading-relaxed text-t1">{row.cfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.gfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.aluminium}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.steel}</td><td className="px-[16px] py-[12px] leading-relaxed text-t3">{row.note}</td></tr>)}</tbody></table></div><p className="border-t border-border-default p-[20px] text-f12 leading-relaxed text-t3">CFRP values are published class ranges for standard-modulus carbon at about 60% fiber volume (ACI 440.1R Table 3.1 and supplier datasheets); fiberglass is the EN 13706 E23 minimum F1 publishes for its glass profiles; metals are handbook values. None of them is a guarantee for a particular tube: the qualification report of the offered laminate, in the test direction that matters, is the number to design with.</p></div>
        <div className="mt-[32px] grid items-start gap-[24px] lg:grid-cols-[1fr_1fr_1.3fr]">
          <Figure number={4} title="No yield, no warning" note="Photo · see credits" caption={scenes.brokenPole.shows} bleed><Photo photo={scenes.brokenPole} /></Figure>
          <Figure number={5} title="A hole is a wound" note="Photo · see credits" caption={scenes.drilledHole.shows} bleed><Photo photo={scenes.drilledHole} /></Figure>
          <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{limits.map(limit => <article key={limit.title} className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">{limit.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{limit.text}</p></article>)}</div>
        </div>
      </PageSection>

      <PageSection id="hollow-vs-solid" title="Hollow carbon fiber rod or solid rod?" tone="muted" intro="Choose the section around the available space, mass target and connection. Bending stiffness is E × I, and I grows with the fourth power of the diameter, so the material at the outside of a section does almost all the work. A hollow rod provides a bore and puts its material where it counts; a solid rod fills the entire circular section.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={6} title="Three sections, one laminate, one scale" caption="A Ø14 × Ø10 mm tube weighs the same as a Ø10 mm solid rod and is 2.8 times as stiff in bending; a Ø10 × Ø7 mm tube keeps the rod's outside diameter at half the mass and three quarters of the stiffness." bleed><Plate src={carbonFigures.hollowVsSolid.src} alt={carbonFigures.hollowVsSolid.alt} /></Figure>
          <div className="grid gap-[16px]">
            <div className="rounded-card border border-border-default bg-white p-[24px]">
              <h3 className="text-f20 font-bold text-t1">When the outside diameter is fixed</h3>
              <p className="mt-[12px] text-f16 leading-relaxed text-t2">At equal outside diameter, length and longitudinal modulus, a solid rod has greater bending stiffness. Removing the centre reduces mass faster than stiffness: the Ø10 × Ø7 tube above keeps 76% of the rod&apos;s stiffness at 51% of its mass. A hollow section is the choice when the bore is needed or the mass matters more than the last quarter of stiffness.</p>
            </div>
            <div className="rounded-card border border-border-default bg-white p-[24px]">
              <h3 className="text-f20 font-bold text-t1">When the mass is fixed</h3>
              <p className="mt-[12px] text-f16 leading-relaxed text-t2">At equal mass and length, a larger-diameter tube places the same material farther from the centre and multiplies the bending stiffness. The price is space for the larger outside diameter and a thinner wall, which brings wall stability, local crushing at clamps and the fittings into the design.</p>
            </div>
          </div>
        </div>
        <div className="mt-[24px] space-y-[12px] text-f16 leading-relaxed text-t2">
          <p>For a uniform round tube, wall thickness = (OD − ID) / 2. Identify whether the OD controls a clamp or housing fit, or the ID controls an insert or telescoping member. Specify the mating dimensions, tolerances, insertion depth and clearance or adhesive gap; a nominal bore size alone does not establish assembly fit.</p>
          <p>A bore can accommodate a bonded end fitting or a cable route, subject to connection and electrical-isolation requirements. If no bore is needed, or the diameter is under about 6 mm, compare <Link href={solidRods} className={linkStyle}>solid pultruded carbon fiber rods</Link>. For either section, confirm the actual laminate and finished assembly rather than inferring a load rating from shape.</p>
        </div>
      </PageSection>

      <PageSection id="fiber-direction" title="Fiber direction: what a pultruded tube is good at, and when to wrap instead" intro="The process fixes the laminate. Pultrusion pulls the fibers along the tube, which is the right architecture for a straight member in axial load or bending and the wrong one for torque, pressure or a hard clamp. Knowing which case you have is most of the specification.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={7} title="Pultruded against roll-wrapped" caption="A 0° laminate carries axial load, bending and buckling at the highest modulus per kilogram; ±45° and 90° plies add torsion and hoop capacity at a higher price. A pultruded tube can be sleeved, wrapped or bonded at the ends so the 0° laminate works in the span and the joint carries the rest." bleed><Plate src={carbonFigures.fiberDirection.src} alt={carbonFigures.fiberDirection.alt} /></Figure>
          <div className="grid gap-[16px]">
            <div className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f16 font-bold text-t1">Choose pultruded when</h3><ul className="mt-[8px] space-y-[6px] text-f14 leading-relaxed text-t2">{["The load runs along the tube or bends it: arms, booms, struts, spars, supports.", "The part is straight and the section constant, in a repeat length.", "Cost per metre matters and the quantity justifies a die.", "Torque, pressure and clamp loads are small or carried by designed end fittings."].map(item => <li key={item}>· {item}</li>)}</ul></div>
            <div className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f16 font-bold text-t1">Add off-axis plies or wrap when</h3><ul className="mt-[8px] space-y-[6px] text-f14 leading-relaxed text-t2">{["The tube transmits torque: drive shafts, steering columns, rollers under load.", "It is pressurised or loaded by a hoop stress.", "A clamp must bite the wall hard, or side impact is part of service.", "The part is short, tapered or one-off, where a mandrel beats a die."].map(item => <li key={item}>· {item}</li>)}</ul></div>
            <p className="text-f14 leading-relaxed text-t2">Both routes are quoted on the same drawing. State the loads and F1 proposes the laminate; a pultruded tube with a bonded sleeve at the joint often does what a fully wrapped tube would, for less.</p>
          </div>
        </div>
      </PageSection>

      <PageSection id="applications" title="Where a pultruded carbon tube earns its price" tone="muted" intro="Eight kinds of part specify carbon tubing, and each for one of the four reasons above. The photographs show the element, not an F1 part: most of the tubes in them were made by wrapping or winding, and a pultruded tube is the straight-member answer to the same brief.">
        <div className="grid gap-[24px] md:grid-cols-2">{applications.map(item => <article key={item.title} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white"><Photo photo={item.photo} sizes="(max-width: 768px) 94vw, 47vw" /><div className="flex flex-1 flex-col p-[20px]"><p className="text-f12 leading-relaxed text-t3">{item.photo.shows}</p><h3 className="mt-[12px] text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{item.why}</p><dl className="mt-[16px] grid gap-[10px] text-f14 leading-relaxed sm:grid-cols-[auto_1fr]"><dt className="font-semibold text-teal-text">Typical sections</dt><dd className="text-t2">{item.typical}</dd><dt className="font-semibold text-t1">What to send</dt><dd className="text-t2">{item.send}</dd></dl></div></article>)}</div>
        <p className="mt-[24px] text-f14 leading-relaxed text-t2">Pultruded carbon plates and strips cover the flat cases, from wind-blade spar caps to bonded stiffeners: see <Link href="/products/pultruded-carbon-fiber-plates" className={linkStyle}>pultruded carbon fiber plates</Link>. For general structural tubing where insulation or cost leads, compare <Link href={roundTubes} className={linkStyle}>fiberglass round tubes</Link> and <Link href={squareTubes} className={linkStyle}>fiberglass square and rectangular tubes</Link>.</p>
      </PageSection>

      <PageSection id="specifications" title="Define the tube you need" intro="Custom dimensions and processing are reviewed against your drawing. Tooling availability, achievable tolerances, sample timing and production quantity are confirmed in the quotation.">
        <dl className="divide-y divide-border-default overflow-hidden rounded-card border border-border-default bg-white">
          {specifications.map(([label, value]) => (
            <div key={label} className="grid gap-[6px] px-[20px] py-[16px] md:grid-cols-[200px_1fr] md:gap-[28px]">
              <dt className="text-f16 font-semibold text-t1">{label}</dt>
              <dd className="text-f16 leading-relaxed text-t2">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-[20px] grid gap-[16px] md:grid-cols-3">
          <div className="border-l-2 border-teal pl-[18px]">
            <h3 className="text-f16 font-bold text-t1">Geometry check</h3>
            <p className="mt-[6px] text-f14 leading-relaxed text-t2">For a uniform round section, ID = OD − 2 × wall. A nominal calculation does not establish bore fit; include the mating part and required clearance.</p>
          </div>
          <div className="border-l-2 border-teal pl-[18px]">
            <h3 className="text-f16 font-bold text-t1">Performance evidence</h3>
            <p className="mt-[6px] text-f14 leading-relaxed text-t2">Request data for the proposed tube laminate, test direction and conditioning. Numerical strength, modulus, temperature and tolerance guarantees belong in the agreed specification.</p>
          </div>
          <div className="border-l-2 border-teal pl-[18px]">
            <h3 className="text-f16 font-bold text-t1">Quantity and tooling</h3>
            <p className="mt-[6px] text-f14 leading-relaxed text-t2">A new section needs a die. Repeat demand, trial quantity and the tolerance band decide whether tooling is justified or an existing section can be adapted.</p>
          </div>
        </div>
      </PageSection>

      <PageSection id="carbon-vs-fiberglass" title="Carbon fiber or fiberglass tubing?" tone="muted" intro="Compare both materials against the same load case, deflection limit, environment and finished assembly. The property table above gives the numbers; this table gives the decision.">
        <div role="region" aria-label="Carbon fiber and fiberglass tube comparison" tabIndex={0} className="overflow-x-auto rounded-card border border-border-default bg-white focus-visible:outline-2 focus-visible:outline-teal">
          <table className="w-full min-w-[680px] border-collapse text-left text-f14 leading-relaxed">
            <caption className="sr-only">Qualitative selection guide for pultruded carbon fiber and fiberglass tubes</caption>
            <thead className="bg-deep text-white">
              <tr><th scope="col" className="w-1/5 p-[20px]">Decision</th><th scope="col" className="w-2/5 p-[20px]">Carbon fiber tubes · CFRP</th><th scope="col" className="w-2/5 p-[20px]">Fiberglass tubes · GFRP</th></tr>
            </thead>
            <tbody>{comparisons.map(([label, carbon, glass], i) => (
              <tr key={label} className={i % 2 ? "bg-bg2" : "bg-white"}>
                <th scope="row" className="border-t border-border-default p-[20px] align-top font-semibold text-t1">{label}</th>
                <td className="border-t border-border-default p-[20px] align-top text-t2">{carbon}</td>
                <td className="border-t border-border-default p-[20px] align-top text-t2">{glass}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="mt-[20px] grid gap-[16px] sm:grid-cols-2">
          {[{ href: roundTubes, title: "Fiberglass round tubes", text: "Compare circular sections, nominal walls and weights." }, { href: squareTubes, title: "Fiberglass square & rectangular tubes", text: "Explore flat mounting faces for frames and supports." }].map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-card border border-border-default bg-white p-[20px] transition-colors hover:border-teal">
              <span className="flex items-center justify-between gap-[12px] text-f18 font-bold text-t1">{item.title}<span aria-hidden="true" className="text-teal-text">→</span></span>
              <span className="mt-[8px] block text-f14 leading-relaxed text-t2">{item.text}</span>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection id="connections" title="Design the ends as carefully as the tube" intro="A carbon tube rarely fails in the span. It fails where a clamp crushes the wall, a hole cuts the fibers or a bonded fitting was never qualified. The three rules below are where most of the engineering time goes.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1fr_1.4fr]">
          <Figure number={8} title="What pultruded carbon looks like, cut" note="Photo · see credits" caption={scenes.plateEdge.shows} bleed><Photo photo={scenes.plateEdge} sizes="(max-width: 1024px) 94vw, 40vw" /></Figure>
          <div className="grid gap-[24px] md:grid-cols-3">
            {[
              ["Spread the load", "Review bonded fittings, sleeves or supported inserts to transfer load without concentrating pressure on a thin wall. Holes and cutouts interrupt fibers and need their own assessment; where a hole is unavoidable, a bonded bush and a backed, sharp drill limit the damage."],
              ["Specify the interface", "Define adhesive, bond preparation, fit, cure and inspection. Where carbon meets aluminium or other susceptible metals in wet service, use suitable electrical isolation and sealing: a glass ply, a plastic sleeve or a sealed adhesive line."],
              ["Validate the assembly", "Agree static, fatigue or environmental testing for the actual fitting and tube. Include service temperature, chemicals, UV exposure and impact in the requirements. A tube that passes in the span and fails at the fitting has not passed."],
            ].map(([title, text]) => <div key={title} className="border-t-2 border-teal pt-[16px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px] text-f14 leading-relaxed text-t2">{text}</p></div>)}
          </div>
        </div>
        <p className="mt-[20px] text-f14 leading-relaxed text-t2">Cutting, drilling and bonding of pultruded sections, with the tools and surface preparation that work, are covered in <Link href="/technology/frp-profile-machining" className={linkStyle}>machining and fabrication</Link>; the test methods F1 can run or arrange are on the <Link href="/technology/quality-testing" className={linkStyle}>quality and testing</Link> page.</p>
      </PageSection>

      <PageSection id="faq" title="Carbon fiber tubing questions" tone="muted">
        <FAQList items={faqItems} />
        <aside id="photo-credits" className="mt-[32px] rounded-card border border-border-default bg-white p-[20px] text-f12 leading-relaxed text-t3">
          <h3 className="text-f14 font-bold text-t1">Photo credits</h3>
          <p className="mt-[4px]">Figures 2, 6 and 7 are F1 Composite&apos;s own drawings. The photographs are openly licensed works from Wikimedia Commons, cropped and re-encoded for this page; none shows an F1 part or project, and most of the carbon parts in them were made by processes other than pultrusion.</p>
          <ul className="mt-[8px] columns-1 gap-[24px] md:columns-2">{creditedPhotos.map(photo => <li key={photo.src} className="break-inside-avoid"><a href={photo.credit.sourceHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.title}</a> by {photo.credit.author}, {photo.credit.licenseHref ? <a href={photo.credit.licenseHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.license}</a> : photo.credit.license}.</li>)}</ul>
        </aside>
      </PageSection>
      <RelatedLinks background="white" groups={[
        { title: "Carbon fiber profiles", links: carbonProfileLinks.filter((item) => item.href !== pagePath) },
        { title: "Compare tube materials", links: [{ label: "Fiberglass round tubes", href: roundTubes }, { label: "Fiberglass square & rectangular tubes", href: squareTubes }] },
        { title: "Develop your section", links: [{ label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles" }, { label: "Pultrusion process", href: "/technology/pultrusion-process" }] },
        { title: "Plan qualification", links: [{ label: "Quality & testing", href: "/technology/quality-testing" }, { label: "Machining & fabrication", href: "/technology/frp-profile-machining" }] },
      ]} />
      <PageSection id="quote" title="Send your carbon tube drawing" tone="deep">
        <ProductRfq product="Pultruded carbon fiber tubes" productPath={pagePath} quoteHref={quoteHref} quoteLabel="Request a tube review" intro="Start with your section, finished length, quantity and the job the tube needs to do." items={[
          { title: "Drawing & fit", text: "OD / ID, wall, cut length, bore tolerance, insert diameter, engagement length and clearance or adhesive gap." },
          { title: "Loads & service", text: "Span, axial and bending loads, torque, clamp loads, deflection and exposure." },
          { title: "Material & evidence", text: "Fiber, resin, surface preparation and the inspection or test plan." },
          { title: "Quantity & delivery", text: "Trial and repeat quantities, destination and required date." },
        ]} />
      </PageSection>
    </>
  );
}
