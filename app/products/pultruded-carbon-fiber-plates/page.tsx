import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import JsonLd from "@/components/seo/JsonLd";
import CoverCard from "@/components/ui/CoverCard";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { carbonPlateFaqs, carbonPlateRfqItems, carbonPlateSpecifications } from "@/content/data/carbonFiberPlates";
import { carbonProfileLinks } from "@/content/data/carbonFiberPultrusion";
import { carbonFigures, carbonProperties, carbonScenePhotos as scenes } from "@/content/data/carbonFiberScenes";
import type { ScenePhoto } from "@/content/data/frpRebar";
import { coverFor } from "@/lib/covers";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/pultruded-carbon-fiber-plates";
const pageTitle = "Pultruded Carbon Fiber Plates | CFRP Strips & Flat Bars";
const pageDescription = "Pultruded carbon fiber plates, strips and flat bars for bonded reinforcement and lightweight stiffeners. Specify dimensions and surfaces with F1 Composite.";
const imageRoot = "/images/products/carbon-fiber-plates";
const updated = "2026-10-31";
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle, description: pageDescription, path: pagePath,
  image: "/products/pultruded-carbon-fiber-plates/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "pultruded-carbon-fiber-plates", product: "Pultruded carbon fiber plates", productPath: pagePath,
  message: "Please review my pultruded carbon fiber plate requirements.\nWidth × thickness × cut length (with units):\nTolerances and quantity:\nApplication, span, load direction and deflection limit:\nFiber / resin requirements and service environment:\nBonding face, adhesive / substrate, holes and edge finish:\nInspection and test requirements:\nDestination and target delivery date:",
});

// Why a flat reinforcement ends up as a pultruded carbon plate, each reason tied to the property behind it.
const reasons = [
  { title: "The stiffest thing you can bond on", lead: "A 1.4 mm carbon strip bonded to a concrete beam adds the tensile capacity of a steel plate many times its weight, and it goes on with a trowel instead of a crane.", proof: "Longitudinal modulus 150–170 GPa class for strengthening-grade strips at 1.55 g/cm³; strength 2,500–3,000 MPa. A 50 × 1.4 mm strip carries about the same ultimate tension as a 50 × 8 mm mild-steel plate." },
  { title: "Thin, flat and continuous", lead: "Pultrusion makes the plate as one continuous laminate with every fiber along its length, in any cut length and in coils for the long ones. No ply drops, no joints, no mandrel.", proof: "Thickness is held to a tenth of a millimetre over the run; a wind-blade spar cap is stacked from tens of identical planks because each one is the same." },
  { title: "It does not fatigue, rust or creep", lead: "Under millions of load cycles a carbon strip keeps its stiffness where steel plates and bolts would need a fatigue allowance; it does not corrode, and under sustained load the fibers do not creep.", proof: "High fatigue limit in tension along the fibers; creep rupture is checked on the resin and the bond, not the carbon. Chloride, de-icing salt and wet-dry cycling do nothing to it." },
  { title: "A broad face for the adhesive", lead: "A plate puts its material where a bond can reach it. The whole underside is bond area, so the adhesive, not the carbon, sets the capacity of the joint and can be designed to.", proof: "Bond-line thickness 1–3 mm with a thixotropic epoxy; a peel-ply or abraded face on one side is specified with the plate." },
];

// What the material will not do, stated beside the benefits.
const limits = [
  { title: "Flat is not stiff on its own", text: "A 50 × 3 mm strip bent the easy way has an I of 113 mm⁴; on edge it is 278 times stiffer. Flat plates are reinforcement bonded to something that supplies the lever arm; a plate used as a beam is turned on edge or stacked." },
  { title: "The joint fails before the plate", text: "Strips almost never break. Bond lines peel at a square-cut end, delaminate off weak concrete, or soften above the adhesive's glass transition. The substrate preparation, anchorage length and end detail are the design." },
  { title: "Weak across and through the thickness", text: "Transverse and interlaminar strengths are resin-dominated. Holes, bolts through the plate, side loads and prying act on the weak direction; use bonded connections and keep fasteners out of the strip where you can." },
  { title: "Conductive, and noble to steel", text: "Carbon fiber conducts and sits cathodic to steel and aluminium. A strip bonded across a steel flange in wet service needs a glass ply or sealed adhesive line between them; it is never an electrical insulator." },
];

// Where a pultruded carbon plate is specified, with a photograph of the element and what to send.
const applications: Array<{ title: string; photo: ScenePhoto; why: string; typical: string; send: string; href?: string; label?: string }> = [
  { title: "Wind-blade spar caps", photo: scenes.bladeFactory, why: "The spar cap carries the bending load of a blade along its whole length. In blades beyond about 60 m it is built from stacks of pultruded carbon planks bonded together in the mould, because a pultruded plank has a higher, more uniform fiber content than an infused laminate and comes in any length.", typical: "Planks 100–200 mm wide, 3–6 mm thick, in coils or 20–80 m cut lengths, peel ply both faces", send: "Plank section, length, stacking plan, the resin system the blade is infused with, fatigue duty and the qualification program.", href: "/products/wind-turbine-blade-panels", label: "Wind-blade panel program" },
  { title: "Strengthening concrete, masonry and timber", photo: scenes.strengthening, why: "A strip bonded to the tension face of a slab, beam or wall adds flexural capacity without adding depth or weight: a new opening, a heavier floor load, corroded reinforcement, a change of use. Installed with hand tools, overnight, on a live building.", typical: "Strips 50–120 mm wide, 1.2–1.4 mm thick, cut to the member; NSM strips 10–20 mm in sawn grooves", send: "The member and its drawings, the capacity to add, the exposure, the adhesive system and the design code the engineer of record works to.", href: "/products/pultruded-cfrp-strengthening-strips", label: "CFRP strengthening strips" },
  { title: "Springs, orthoses and flexible members", photo: scenes.runningBlades, why: "A flat carbon laminate bends a long way, stores the energy and returns it without taking a set. Prosthetic feet, orthoses, leaf springs and compliant mechanisms use that; a pultruded strip is the simple, repeatable version of the laid-up blade.", typical: "Strips 10–60 mm wide, 1–4 mm thick, often tapered by sleeving or stacking", send: "Deflection range, cycles to design for, the load-deflection curve you need and the end fixings." },
  { title: "Bonded stiffeners and spars", photo: scenes.chassisBeams, why: "A strip bonded along a panel, a beam web or a frame member raises its stiffness for a few grams: equipment rails, model and UAV wing spars, display and stage structures, lightweight vehicle frames.", typical: "Flat bars 10–50 mm wide, 2–10 mm thick, bonded on edge or into a slot", send: "The bending direction, span, the stiffness target and how the strip is fixed along its length.", href: "/products/carbon-fiber-robotic-beams", label: "Lightweight carbon members" },
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
const creditedPhotos: ScenePhoto[] = [scenes.plateEdge, scenes.tows, scenes.bladeTransport, scenes.brokenPole, scenes.wovenFabric, ...applications.map(item => item.photo), scenes.drilledHole].filter((photo, i, all) => all.findIndex(other => other.src === photo.src) === i);

export default function PultrudedCarbonFiberPlatesPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({
        name: "Pultruded Carbon Fiber Plates", description: pageDescription, path: pagePath,
        image: scenes.plateEdge.src,
        category: "Pultruded carbon fiber plates, strips and flat bars", material: "Carbon fiber reinforced polymer (CFRP)",
        productLine: "F1-FORM", dateModified: updated,
      })} />
      <PageHeader
        tag="Carbon fiber plates"
        line={{ name: "F1-FORM", label: "Plates & flat strips" }}
        title="Pultruded carbon fiber plates: the stiffest reinforcement you can bond on"
        description="A pultruded carbon fiber plate is a flat, continuous CFRP laminate with every fiber along its length: 150 GPa class stiffness at a fifth of the weight of steel, no fatigue allowance, no corrosion, and a whole face for the adhesive. F1 Composite pultrudes plates, strips and flat bars to your width, thickness and cut length, from 1.2 mm strengthening strips to spar-cap planks, and reviews the bond, the loads and the evidence with you before quoting."
        updated={updated}
        facts={[{ label: "Section", value: "Flat, 10–200 mm wide, 1–12 mm thick" }, { label: "Stiffness along the fibers", value: "150–170 GPa class" }, { label: "Weight, same section", value: "20% of steel" }, { label: "Supply", value: "Cut lengths or coils, to drawing" }]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Carbon fiber pultrusion", href: "/products/pultrusion-carbon-fiber" }, { label: "Carbon fiber plates" }]}
        actions={{ primary: { label: "Request a plate quote", href: quoteHref }, secondary: { label: "See the numbers", href: "#performance", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="A pultruded carbon plate, cut" note="Photo · see credits" bleed caption={scenes.plateEdge.shows}><Photo photo={scenes.plateEdge} sizes="(max-width: 1023px) 94vw, 44vw" preload /></Figure>}
      />
      <PageNav items={[{ id: "performance", label: "Why carbon" }, { id: "orientation", label: "Flat, on edge, stacked" }, { id: "bonding", label: "The bond" }, { id: "applications", label: "Applications" }, { id: "specifications", label: "Specifications" }, { id: "construction", label: "Plate vs sheet" }, { id: "related", label: "Carbon profiles" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" }]} />

      <PageSection id="performance" title="What a pultruded carbon plate does that a steel plate cannot, and what it will not do" intro="A plate is the simplest carbon product after a rod: continuous tows, one direction, pulled flat through a die. That gives it the highest fiber content and the most uniform thickness of any carbon laminate, which is why spar caps and strengthening strips are made this way. It also means everything it is good at points along its length.">
        <div className="grid gap-[20px] md:grid-cols-3">
          <Figure number={2} title="Where the stiffness comes from" note="Photo · see credits" caption={scenes.tows.shows} bleed><Photo photo={scenes.tows} /></Figure>
          <Figure number={3} title="Stiffness per unit mass" caption="Unidirectional pultruded carbon against aluminium, steel and E23 fiberglass. Same mass, about 3.4 times the stiffness of the metals along the fibers." bleed><Plate src={carbonFigures.specificStiffness.src} alt={carbonFigures.specificStiffness.alt} /></Figure>
          <Figure number={4} title="What the plate reinforces" note="Photo · see credits" caption={scenes.bladeTransport.shows} bleed><Photo photo={scenes.bladeTransport} /></Figure>
        </div>
        <div className="mt-[32px] grid gap-[20px] md:grid-cols-2 xl:grid-cols-4">{reasons.map((reason, i) => <article key={reason.title} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Reason {i + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{reason.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{reason.lead}</p><p className="mt-[12px] border-t border-border-default pt-[12px] text-f12 leading-relaxed text-t3">{reason.proof}</p></article>)}</div>
        <div className="mt-[32px] overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-[20px] py-[16px] text-left font-semibold text-t1">Unidirectional pultruded carbon against the materials it replaces, property by property</caption><thead className="bg-bg2"><tr><th scope="col" className="px-[16px] py-[12px]">Property</th><th scope="col" className="px-[16px] py-[12px] text-teal-text">Pultruded CFRP</th><th scope="col" className="px-[16px] py-[12px]">Pultruded GFRP (E23)</th><th scope="col" className="px-[16px] py-[12px]">Aluminium 6061-T6</th><th scope="col" className="px-[16px] py-[12px]">Structural steel</th><th scope="col" className="px-[16px] py-[12px]">What it means for a plate</th></tr></thead><tbody>{carbonProperties.map(row => <tr key={row.property} className="border-t border-border-default align-top"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{row.property}</th><td className="px-[16px] py-[12px] leading-relaxed text-t1">{row.cfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.gfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.aluminium}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.steel}</td><td className="px-[16px] py-[12px] leading-relaxed text-t3">{row.note}</td></tr>)}</tbody></table></div><p className="border-t border-border-default p-[20px] text-f12 leading-relaxed text-t3">CFRP values are published class ranges for standard-modulus carbon at about 60% fiber volume (ACI 440.1R Table 3.1 and supplier datasheets); strengthening-grade strips at 65–70% fiber volume reach 150–170 GPa and 2,500–3,000 MPa (ACI 440.2R, supplier data). Fiberglass is the EN 13706 E23 minimum F1 publishes for its glass profiles; metals are handbook values. None is a guarantee for a particular plate: the qualification report of the offered laminate, in the test direction that matters, is the number to design with.</p></div>
        <div className="mt-[32px] grid items-start gap-[24px] lg:grid-cols-[1fr_1.6fr]">
          <Figure number={5} title="No yield, no warning" note="Photo · see credits" caption={scenes.brokenPole.shows} bleed><Photo photo={scenes.brokenPole} sizes="(max-width: 1024px) 94vw, 36vw" /></Figure>
          <div className="grid gap-[16px] sm:grid-cols-2">{limits.map(limit => <article key={limit.title} className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">{limit.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{limit.text}</p></article>)}</div>
        </div>
      </PageSection>

      <PageSection id="orientation" title="Flat, on edge or stacked: orientation is the first decision" tone="muted" intro="Bending stiffness is E × I, and I grows with the cube of the depth in the bending direction. The same strip is a bonded reinforcement when it lies flat, a beam when it stands on edge, and a thick plank when several are bonded together. Decide which before the width and thickness.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={6} title="One strip, three stiffnesses" caption="A 50 × 3 mm strip flat (I = 113 mm⁴), on edge (31,250 mm⁴, 278 times) and three stacked and bonded into a 50 × 9 mm plank (3,038 mm⁴, 27 times). Flat, the substrate supplies the lever arm; stacked, the bond lines carry the shear." bleed><Plate src={carbonFigures.plateOrientation.src} alt={carbonFigures.plateOrientation.alt} /></Figure>
          <div className="grid gap-[16px]">
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Flat: reinforcement</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">Bonded to the tension face of something stiffer than itself. The plate adds tensile capacity; the member adds the depth. Strengthening strips, spar caps, bonded doublers.</p></div>
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">On edge: a beam</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">A flat bar standing up is a slender beam; it needs lateral restraint, a slot or a bonded web to keep it upright. Stiffening rails, spars, leaf springs.</p></div>
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Stacked: a plank</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">Several plates bonded face to face make a thick section that one die could not pultrude well. The bond lines carry the shear between layers, which is why spar caps are infused with the blade.</p></div>
          </div>
        </div>
        <p className="mt-[20px] text-f14 leading-relaxed text-t2">For a member loaded in bending on its own, with room for a larger section, compare a <Link href="/products/pultruded-carbon-fiber-tubes" className={linkStyle}>hollow carbon tube</Link>; for a compact axial member, a <Link href="/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod" className={linkStyle}>solid carbon rod</Link>.</p>
      </PageSection>

      <PageSection id="bonding" title="The bond is the design" intro="A pultruded strip adds capacity only through its bond line. The strip almost never fails; the adhesive peels off a square-cut end, delaminates from weak concrete or softens above its glass transition. Most of the engineering, and all of the site work, is in the joint.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={7} title="A strip bonded to a member" caption="Fibers along the member, prepared face down, a 1–3 mm thixotropic epoxy bond line, anchorage past the point where the strip is needed, tapered or clamped ends. The seven items the joint needs on the drawing are listed on the figure." bleed><Plate src={carbonFigures.bondLine.src} alt={carbonFigures.bondLine.alt} /></Figure>
          <div className="grid gap-[16px]">
            <Figure number={8} title="On the slab" note="Photo · see credits" caption={scenes.slabStrips.shows} bleed><Photo photo={scenes.slabStrips} sizes="(max-width: 1024px) 94vw, 40vw" /></Figure>
            <div className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f16 font-bold text-t1">What F1 supplies with the plate</h3><ul className="mt-[8px] space-y-[6px] text-f14 leading-relaxed text-t2">{["The bonding face as specified: peel ply, abraded or as pultruded", "Width, thickness and length with the agreed tolerances", "The laminate's modulus, strength and strain in the fiber direction", "Cut lengths or coils, labelled by mark, packed flat or coiled"].map(item => <li key={item}>· {item}</li>)}</ul><p className="mt-[12px] text-f12 leading-relaxed text-t3">The adhesive, the substrate preparation and the strengthening design belong to the system supplier and the engineer of record; F1 supplies the plate to their specification.</p></div>
          </div>
        </div>
      </PageSection>

      <PageSection id="applications" title="Where a pultruded carbon plate earns its price" tone="muted" intro="Four kinds of part specify flat carbon, each for one of the four reasons above. The photographs show the element, not an F1 part; the carbon in some of them was laid up rather than pultruded, and a pultruded plate is the flat-member answer to the same brief.">
        <div className="grid gap-[24px] md:grid-cols-2">{applications.map(item => <article key={item.title} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white"><Photo photo={item.photo} sizes="(max-width: 768px) 94vw, 47vw" /><div className="flex flex-1 flex-col p-[20px]"><p className="text-f12 leading-relaxed text-t3">{item.photo.shows}</p><h3 className="mt-[12px] text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{item.why}</p><dl className="mt-[16px] grid gap-[10px] text-f14 leading-relaxed sm:grid-cols-[auto_1fr]"><dt className="font-semibold text-teal-text">Typical sections</dt><dd className="text-t2">{item.typical}</dd><dt className="font-semibold text-t1">What to send</dt><dd className="text-t2">{item.send}</dd></dl>{item.href ? <Link href={item.href} className={`mt-auto inline-flex min-h-10 items-center pt-[12px] text-f14 ${linkStyle}`}>{item.label} →</Link> : null}</div></article>)}</div>
        <p className="mt-[24px] text-f14 leading-relaxed text-t2">Carbon fibers are electrically conductive. Include electrical isolation and wet metal interfaces in the design review, alongside temperature, chemical exposure and surface protection.</p>
      </PageSection>

      <PageSection id="specifications" title="Specify the section and the surface" intro="Start with width × thickness × cut length. Add the dimensional controls and interface details that make the plate work in your assembly.">
        <div className="grid items-start gap-[28px] lg:grid-cols-2 lg:gap-[40px]">
          <div className="space-y-[20px]">
            <Figure number={9} title="Read the plate drawing" note="Dimension schematic" bleed caption="Width and thickness define the section; length follows the main reinforcement direction. Identify the face that will be bonded."><Image src={`${imageRoot}/plate-dimensions-fiber-direction.svg`} alt="Carbon fiber plate showing width, thickness, length, bonding face and longitudinal fiber direction" width={1200} height={700} sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" /></Figure>
            <p className="text-f16 leading-relaxed text-t2">F1 reviews the requested geometry, material and tooling before confirming supply. Mechanical properties, available sizes, minimum order and lead time follow the proposed configuration; a new width needs a die, a new thickness often does not.</p>
          </div>
          <dl className="divide-y divide-border-default rounded-card border border-border-default bg-white px-[20px] sm:px-[24px]">
            {carbonPlateSpecifications.map(([label, value]) => <div key={label} className="py-[18px]"><dt className="text-f16 font-bold text-t1">{label}</dt><dd className="mt-[6px] text-f14 leading-relaxed text-t2">{value}</dd></div>)}
          </dl>
        </div>
      </PageSection>

      <PageSection id="construction" title="Pultruded plates vs. multidirectional sheets" tone="muted" intro="Choose by reinforcement direction and component geometry. A black surface or woven finish does not establish the structural layup.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={10} title="Two routes to a flat carbon composite" note="Construction schematic" bleed caption="The laminate on the right shows an example of selected ply directions. Actual layups and properties are specified for each product."><Image src={`${imageRoot}/pultruded-plate-vs-laminate.svg`} alt="Comparison of a pultruded flat profile with continuous longitudinal fibers and a laminated sheet with illustrative angled plies" width={1200} height={700} sizes="(max-width: 1023px) 94vw, 56vw" className="h-auto w-full" /></Figure>
          <div className="grid gap-[16px]">
            <Figure number={11} title="What a laminated sheet is made of" note="Photo · see credits" caption={scenes.wovenFabric.shows} bleed><Photo photo={scenes.wovenFabric} sizes="(max-width: 1024px) 94vw, 40vw" /></Figure>
            <div className="border-t-2 border-teal pt-[12px]"><h3 className="text-f16 font-bold text-t1">Pultruded plates & strips</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">Long, straight reinforcement with the main load along the fibers, at the highest fiber content and the lowest cost per metre. Review transverse loading, local bearing, torsion and connections separately.</p></div>
            <div className="border-t-2 border-teal pt-[12px]"><h3 className="text-f16 font-bold text-t1">Laminated sheets & panels</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">Selected ply angles carry loads in several directions across a panel. For broad machined parts, bolt patterns or complex load paths, include the layup and finished geometry in the material review.</p></div>
          </div>
        </div>
        <div className="mt-[24px] grid items-start gap-[24px] lg:grid-cols-[1fr_1.6fr]">
          <Figure number={12} title="A hole is a wound" note="Photo · see credits" caption={scenes.drilledHole.shows} bleed><Photo photo={scenes.drilledHole} sizes="(max-width: 1024px) 94vw, 36vw" /></Figure>
          <div className="grid gap-[16px] sm:grid-cols-2">
            {[
              ["Cut it clean", "Cut with a diamond or fine abrasive wheel, supported on both sides; shears splinter the edge. Seal cut edges where moisture or handling matters."],
              ["Keep holes out of the strip", "A hole cuts the fibers that carry the load and delaminates on the exit side. Where a fastener is unavoidable, use a bonded bush, keep it small and well in from the end, and check the net section."],
              ["Prepare the face, not the edge", "The bonding face is abraded or peel-plied, cleaned with solvent and bonded dry; the edges carry nothing. Specify which face at order."],
              ["Isolate from steel", "Carbon is cathodic to steel and aluminium. In wet service put a glass ply, a non-conductive adhesive layer or a sealant between them."],
            ].map(([title, text]) => <div key={title} className="border-t-2 border-teal pt-[12px]"><h3 className="text-f16 font-bold text-t1">{title}</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">{text}</p></div>)}
          </div>
        </div>
        <p className="mt-[20px] text-f14 leading-relaxed text-t2">Tools and surface preparation for pultruded sections are in <Link href="/technology/frp-profile-machining" className={linkStyle}>machining and fabrication</Link>; the tests F1 can run or arrange for a plate and its bond are on the <Link href="/technology/quality-testing" className={linkStyle}>quality and testing</Link> page.</p>
      </PageSection>

      <PageSection id="related" title="Explore the carbon fiber profile family" intro="Compare flat plates with hollow tubes and solid rods, or return to the pultrusion overview to select a profile.">
        <div className="grid gap-[20px] md:grid-cols-3">{carbonProfileLinks.filter((item) => item.href !== pagePath).map((item) => <CoverCard key={item.href} href={item.href} cover={coverFor(item.href)!} title={item.label} text={item.description} action="Explore product details" />)}</div>
      </PageSection>
      <PageSection id="faq" title="Pultruded carbon fiber plate questions" tone="muted">
        <FAQList items={[...carbonPlateFaqs]} />
        <aside id="photo-credits" className="mt-[32px] rounded-card border border-border-default bg-white p-[20px] text-f12 leading-relaxed text-t3">
          <h3 className="text-f14 font-bold text-t1">Photo credits</h3>
          <p className="mt-[4px]">Figures 3, 6, 7, 9 and 10 are F1 Composite&apos;s own drawings. The photographs are openly licensed works from Wikimedia Commons, cropped and re-encoded for this page; none shows an F1 part or project, and some of the carbon parts in them were made by processes other than pultrusion.</p>
          <ul className="mt-[8px] columns-1 gap-[24px] md:columns-2">{creditedPhotos.map(photo => <li key={photo.src} className="break-inside-avoid"><a href={photo.credit.sourceHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.title}</a> by {photo.credit.author}, {photo.credit.licenseHref ? <a href={photo.credit.licenseHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.license}</a> : photo.credit.license}.</li>)}</ul>
        </aside>
      </PageSection>
      <PageSection id="quote" title="Send your plate dimensions and application" tone="deep"><ProductRfq product="Pultruded carbon fiber plates" productPath={pagePath} quoteHref={quoteHref} quoteLabel="Request a plate quote" intro="Share your width, thickness, cut length and quantity, with a drawing or application brief. Include the bonding face and any finished-part machining." items={carbonPlateRfqItems} /></PageSection>
    </>
  );
}
