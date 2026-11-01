import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import CollectionSchema from "@/components/seo/CollectionSchema";
import Button from "@/components/ui/Button";
import Figure from "@/components/ui/Figure";
import { FAQList } from "@/components/ui/FAQ";
import { carbonProfileFormats, carbonProcessSteps, carbonRfqItems, carbonPultrusionFaqs, carbonPultrusionPath } from "@/content/data/carbonFiberPultrusion";
import { carbonFigures, carbonProperties, carbonScenePhotos as scenes } from "@/content/data/carbonFiberScenes";
import type { ScenePhoto } from "@/content/data/frpRebar";
import { buildPageMetadata } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

const title = "Pultrusion Carbon Fiber: Plates, Tubes & Rods";
const description = "Explore carbon fiber pultrusion for plates, strips, tubes and rods. Compare profiles, applications and custom specifications with F1 Composite.";
const updated = "2026-10-31";

export const metadata: Metadata = buildPageMetadata({
  title, description, path: carbonPultrusionPath,
  image: "/products/pultrusion-carbon-fiber/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "pultrusion-carbon-fiber", product: "Pultruded carbon fiber profiles", productPath: carbonPultrusionPath,
  message: "Please review my carbon fiber pultrusion project.\nProfile: plate / strip / tube / rod / custom\nSection and tolerances (with units):\nCut length and quantity:\nApplication, loads, span and connections:\nFiber, resin and service conditions:\nInspection and test requirements:\nDestination and delivery date:",
});
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

/** The photograph and the one-line case for each profile form, keyed by the shared format id. */
const formPhotos: Record<(typeof carbonProfileFormats)[number]["id"], { photo: ScenePhoto; when: string; typical: string }> = {
  plates: { photo: scenes.plateEdge, when: "Reinforcement bonded to something stiffer than itself: spar caps, strengthening strips, bonded stiffeners. The flat face is for the adhesive.", typical: "10–200 mm wide, 1–12 mm thick, cut lengths or coils" },
  tubes: { photo: scenes.hexacopter, when: "A member loaded in bending or axially on its own, where there is room for a larger diameter and a bore is useful: arms, booms, masts, struts.", typical: "Ø6–Ø150 mm, walls 1–5 mm, to 12 m" },
  rods: { photo: scenes.deltaLinkages, when: "A compact axial member, a pin, a spar or a core: linkages, push rods, model spars, cores for flexible poles. The only carbon form below about Ø6 mm.", typical: "Ø1–Ø40 mm, any cut length" },
};

// The decision in one table: what the load case asks for, and which form answers it.
const decision = [
  { load: "Bend something that already exists: a beam, a slab, a panel", form: "Plate or strip, bonded flat", href: "/products/pultruded-carbon-fiber-plates", why: "The member supplies the depth; the strip supplies tension at the face." },
  { load: "A straight member in bending on its own, lightest possible", form: "Tube", href: "/products/pultruded-carbon-fiber-tubes", why: "Material at the outside of the section; a Ø14 × Ø10 tube is 2.8 × stiffer than a Ø10 rod of the same mass." },
  { load: "A member in pure tension or compression between two joints", form: "Rod", href: "/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod", why: "All the stiffness in the one direction it is loaded; bonded fittings at each end." },
  { load: "Small diameter, a pin, a spar, a clamp that must not crush a wall", form: "Rod", href: "/products/fiberglass-structural-shapes/frp-rod/carbon-fiber-rod", why: "Solid sections survive set screws and sockets; tubes under Ø6 mm are not practical." },
  { load: "A spring or a flexible pole that must return without taking a set", form: "Strip, or a rod core", href: "/products/pultruded-carbon-fiber-plates", why: "A flat laminate bends far and stays elastic; a rod stiffens a hybrid pole." },
  { load: "Torque, internal pressure, a hard clamp or side impact", form: "Not a plain pultrusion", href: "/products/custom-pultruded-profiles", why: "Add off-axis plies, a sleeve or a wrapped laminate; pultrusion alone puts every fiber along the axis." },
  { load: "Electrical insulation, or the lowest cost", form: "Fiberglass instead", href: "/pultruded-frp-profiles", why: "Carbon conducts and costs several times glass; glass is the answer when stiffness per kilogram is not the point." },
];

// Three things carbon gives and three it takes, stated once for the family.
const tradeoffs = {
  gives: [
    { title: "Stiffness per kilogram", text: "About 3.4 × aluminium or steel along the fibers, 7 × an E23 fiberglass profile. The reason every carbon part exists." },
    { title: "Dimensional stability", text: "Near-zero thermal expansion along the fibers and no creep in the carbon: optics, metrology, long booms, bonded reinforcement." },
    { title: "No fatigue allowance, no corrosion", text: "A carbon member under cyclic load keeps its stiffness without the oversizing aluminium needs, and nothing rusts, pits or stains." },
  ],
  takes: [
    { title: "Everything points one way", text: "Pultrusion puts the fibers along the profile. Transverse, shear and interlaminar strengths are resin-dominated: holes, clamps, torque and side impact load the weak direction." },
    { title: "No yield, no warning", text: "Linear to rupture at 1.2–1.8% strain. Design to a strain limit, protect from impact, and never accept a dent where metal would." },
    { title: "Conductive and noble", text: "Carbon conducts and is cathodic to aluminium and steel. Wet joints need a glass ply, a sleeve or a sealed adhesive line; it is never an insulator." },
  ],
};

const applications = [
  { title: "Wind-blade spar caps", photo: scenes.bladeFactory, text: "Stacks of pultruded carbon planks bonded in the mould carry the bending load of blades beyond 60 m.", href: "/products/wind-turbine-blade-panels" },
  { title: "Strengthening concrete and masonry", photo: scenes.strengthening, text: "Strips bonded to the tension face add capacity to slabs, beams and walls without depth or weight.", href: "/products/pultruded-cfrp-strengthening-strips" },
  { title: "Drones, arms and booms", photo: scenes.fpvQuad, text: "Tubes and plates where every gram of moving mass costs flight time, cycle time or reach.", href: "/products/pultruded-carbon-fiber-tubes" },
  { title: "Parallel robots and linkages", photo: scenes.deltaConveyor, text: "Slender rods and tubes accelerated at several g, thousands of times an hour.", href: "/products/carbon-fiber-robotic-beams" },
  { title: "Optics, metrology and instruments", photo: scenes.telescope, text: "Tubes and frames that hold alignment through a temperature swing and damp vibration fast.", href: "/products/pultruded-carbon-fiber-tubes" },
  { title: "Lightweight frames and chassis", photo: scenes.heliFrame, text: "Straight carbon members bonded into nodes: vehicles, equipment enclosures, rigs.", href: "/products/carbon-fiber-roller-tubes" },
];

/** A schematic plate at the 8:5 ratio the drawn figures are made in. */
function Plate({ src, alt }: { src: string; alt: string }) {
  return <div className="relative aspect-[8/5] bg-white"><Image src={src} alt={alt} fill sizes="(max-width: 1024px) 94vw, 50vw" className="object-contain" /></div>;
}

/** An openly licensed photograph that fills its plate; the credit is listed at the end of the page. */
function Photo({ photo, sizes = "(max-width: 1024px) 94vw, 33vw", preload = false }: { photo: ScenePhoto; sizes?: string; preload?: boolean }) {
  return <div className="relative aspect-[8/5] bg-bg2"><Image src={photo.src} alt={photo.alt} fill sizes={sizes} preload={preload} className="object-cover" /></div>;
}

const creditedPhotos: ScenePhoto[] = [scenes.roving, ...carbonProfileFormats.map(format => formPhotos[format.id].photo), scenes.brokenPole, scenes.carbonization, scenes.tows, ...applications.map(item => item.photo)].filter((photo, i, all) => all.findIndex(other => other.src === photo.src) === i);

export default function CarbonFiberPultrusionPage() {
  return (
    <>
      <CollectionSchema {...{ name: title, description, path: carbonPultrusionPath, dateModified: updated, links: carbonProfileFormats.map((format) => ({ label: format.name, href: format.href })) }} />
      <PageHeader
        tag="Carbon fiber pultrusion"
        title="Pultrusion carbon fiber: plates, tubes and rods, and which one your load case needs"
        description="Carbon fiber pultrusion pulls continuous carbon tow through a heated die into a constant section with every fiber along its length: the stiffest material per kilogram that can be made by the metre. F1 Composite pultrudes it as flat plates and strips, hollow tubes and solid rods. This page says what the family does, what it will not do, and which of the three forms answers your load case; each form has its own page with sizes, figures and applications."
        updated={updated}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Carbon fiber pultrusion" }]}
        facts={[{ label: "Stiffness per kg", value: "≈ 3.4 × aluminium or steel" }, { label: "Forms", value: "Plates · tubes · rods" }, { label: "Fibers", value: "All along the profile" }, { label: "Supply", value: "To drawing, any cut length" }]}
        actions={{ primary: { label: "Request a carbon profile quote", href: quoteHref }, secondary: { label: "Which form do I need?", href: "#profiles", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="Where every carbon profile starts" note="Photo · see credits" bleed caption={scenes.roving.shows}><Photo photo={scenes.roving} sizes="(max-width: 1023px) 94vw, 44vw" preload /></Figure>}
      />
      <PageNav items={[{ id: "profiles", label: "Which form" }, { id: "performance", label: "Why carbon" }, { id: "plates", label: "Plates" }, { id: "tubes", label: "Tubes" }, { id: "rods", label: "Rods" }, { id: "process", label: "Process" }, { id: "selection", label: "Fiber direction" }, { id: "applications", label: "Applications" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" }]} />

      <PageSection id="profiles" title="Three forms, one laminate: which one your load case needs" intro="All three are the same unidirectional carbon laminate; the section decides what it is good for. Start from the load, not the shape.">
        <div className="grid gap-[20px] md:grid-cols-3">
          {carbonProfileFormats.map((format) => { const { photo, when, typical } = formPhotos[format.id]; return <article key={format.id} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white"><Photo photo={photo} /><div className="flex flex-1 flex-col p-[20px]"><p className="text-f12 leading-relaxed text-t3">{photo.shows}</p><h3 className="mt-[12px] text-f20 font-bold text-t1">{format.shortName}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{when}</p><p className="mt-[12px] text-f12 leading-relaxed text-t3"><strong className="text-t1">Typical:</strong> {typical}</p><Link href={format.href} className={`mt-auto inline-flex min-h-10 items-center pt-[12px] text-f14 ${linkStyle}`}>{format.name} →</Link></div></article>; })}
        </div>
        <div className="mt-[24px] overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-[20px] py-[16px] text-left font-semibold text-t1">From the load case to the form</caption><thead className="bg-bg2"><tr><th scope="col" className="px-[16px] py-[12px]">Your load case</th><th scope="col" className="px-[16px] py-[12px]">The form</th><th scope="col" className="px-[16px] py-[12px]">Why</th></tr></thead><tbody>{decision.map(row => <tr key={row.load} className="border-t border-border-default align-top"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{row.load}</th><td className="px-[16px] py-[12px] leading-relaxed"><Link href={row.href} className={linkStyle}>{row.form}</Link></td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.why}</td></tr>)}</tbody></table></div></div>
        <p className="mt-[20px] text-f16 leading-relaxed text-t2">Need a different section? <Link href="/products/custom-pultruded-profiles" className={linkStyle}>Discuss a custom carbon fiber profile</Link> with the drawing, material requirements and annual volume.</p>
      </PageSection>

      <PageSection id="performance" title="What the family gives, and what it takes" tone="muted" intro="Carbon is bought for one number, stiffness per kilogram along the fibers, and everything else follows from where the fibers point. The figure and the table below are shared by the three product pages; the class values are published ranges, and the qualification report of the offered laminate is the design basis.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.2fr_1fr]">
          <Figure number={2} title="Stiffness per unit mass, along the fibers" caption="Unidirectional pultruded carbon against aluminium, steel and E23 fiberglass. Same mass per metre, about 3.4 times the stiffness of the metals." bleed><Plate src={carbonFigures.specificStiffness.src} alt={carbonFigures.specificStiffness.alt} /></Figure>
          <Figure number={3} title="No yield, no warning" note="Photo · see credits" caption={scenes.brokenPole.shows} bleed><Photo photo={scenes.brokenPole} sizes="(max-width: 1024px) 94vw, 40vw" /></Figure>
        </div>
        <div className="mt-[24px] grid gap-[20px] lg:grid-cols-2">
          <div className="rounded-card border border-border-default bg-white p-[20px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-teal-text">What carbon gives</p><div className="mt-[8px] grid gap-[12px]">{tradeoffs.gives.map(item => <div key={item.title} className="border-t border-border-default pt-[10px]"><h3 className="text-f16 font-bold text-t1">{item.title}</h3><p className="mt-[4px] text-f14 leading-relaxed text-t2">{item.text}</p></div>)}</div></div>
          <div className="rounded-card border border-border-default bg-white p-[20px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">What it takes</p><div className="mt-[8px] grid gap-[12px]">{tradeoffs.takes.map(item => <div key={item.title} className="border-t border-border-default pt-[10px]"><h3 className="text-f16 font-bold text-t1">{item.title}</h3><p className="mt-[4px] text-f14 leading-relaxed text-t2">{item.text}</p></div>)}</div></div>
        </div>
        <div className="mt-[24px] overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-[20px] py-[16px] text-left font-semibold text-t1">Unidirectional pultruded carbon against the materials it replaces, property by property</caption><thead className="bg-bg2"><tr><th scope="col" className="px-[16px] py-[12px]">Property</th><th scope="col" className="px-[16px] py-[12px] text-teal-text">Pultruded CFRP</th><th scope="col" className="px-[16px] py-[12px]">Pultruded GFRP (E23)</th><th scope="col" className="px-[16px] py-[12px]">Aluminium 6061-T6</th><th scope="col" className="px-[16px] py-[12px]">Structural steel</th><th scope="col" className="px-[16px] py-[12px]">What it means</th></tr></thead><tbody>{carbonProperties.map(row => <tr key={row.property} className="border-t border-border-default align-top"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{row.property}</th><td className="px-[16px] py-[12px] leading-relaxed text-t1">{row.cfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.gfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.aluminium}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.steel}</td><td className="px-[16px] py-[12px] leading-relaxed text-t3">{row.note}</td></tr>)}</tbody></table></div><p className="border-t border-border-default p-[20px] text-f12 leading-relaxed text-t3">CFRP values are published class ranges for standard-modulus carbon at about 60% fiber volume (ACI 440.1R Table 3.1 and supplier datasheets); fiberglass is the EN 13706 E23 minimum F1 publishes for its glass profiles; metals are handbook values. None is a guarantee for a particular profile: the qualification report of the offered laminate, in the test direction that matters, is the number to design with.</p></div>
      </PageSection>

      {carbonProfileFormats.map((format, index) => { const { photo, typical } = formPhotos[format.id]; return (
        <PageSection key={format.id} id={format.id} title={format.name} tone={index % 2 === 0 ? "white" : "muted"}>
          <div className="grid items-start gap-[28px] lg:grid-cols-2 lg:gap-[48px]">
            <Figure number={index + 4} title={format.shortName} note="Photo · see credits" bleed caption={photo.shows}><Photo photo={photo} sizes="(max-width: 1023px) 94vw, 44vw" /></Figure>
            <div className="space-y-[18px] text-f16 leading-relaxed text-t2">
              <p>{format.detail}</p>
              <p className="text-f14 text-t3"><strong className="text-t1">Geometry:</strong> {format.geometry} · <strong className="text-t1">Typical:</strong> {typical}</p>
              <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f18 font-bold text-t1">What to specify</h3><p className="mt-[8px]">{format.checks}</p></div>
              <ul className="space-y-[10px]">{format.links.map((link) => <li key={link.href}><Link href={link.href} className={linkStyle}>{link.label} <span aria-hidden>→</span></Link></li>)}</ul>
              <Button href={buildRfqHref({ source: `carbon-pultrusion-${format.id}`, product: format.name, productPath: `${carbonPultrusionPath}#${format.id}`, message: `Please review ${format.name.toLowerCase()} for my project.\n${format.geometry} (with units and tolerances):\nQuantity:\nApplication, loads and connections:\nMaterial, service conditions and test requirements:\nDestination and delivery date:` })}>Quote {format.shortName.toLowerCase()}</Button>
            </div>
          </div>
        </PageSection>
      ); })}

      <PageSection id="process" title="How carbon fiber pultrusion works" tone="muted" intro="The fiber is made long before the profile. Precursor is oxidised and carbonised into tow; the tow is wound on bobbins; a pultrusion line pulls hundreds of those tows through a resin bath and a heated die, continuously, and cuts the cured profile to length.">
        <div className="grid gap-[20px] md:grid-cols-3">
          <Figure number={7} title="Making the fiber" note="Photo · see credits" caption={scenes.carbonization.shows} bleed><Photo photo={scenes.carbonization} /></Figure>
          <Figure number={8} title="Feeding the line" note="Photo · see credits" caption={scenes.tows.shows} bleed><Photo photo={scenes.tows} /></Figure>
          <Figure number={9} title="The pultrusion hall" note="Production photo" caption="KraussMaffei pultrusion lines, pullers and take-off tables in a FengDu hall. Glass profiles run on these lines; a carbon profile is pulled the same way, with a die and a resin system matched to the tow." bleed><div className="relative aspect-[8/5] bg-bg2"><Image src="/images/f1-photos/f1-composite-pultrusion-hall-krauss-maffei-rows.webp" alt="Rows of KraussMaffei pultrusion lines with pullers and profile take-off tables in a FengDu production hall" fill sizes="(max-width: 1024px) 94vw, 33vw" className="object-cover" /></div></Figure>
        </div>
        <Figure number={10} title="From carbon tow to finished profile" note="Process schematic" bleed className="mt-[24px]"><Image src="/images/products/pultrusion-carbon-fiber/process.svg" alt="Carbon fiber pultrusion sequence: tow alignment, resin impregnation, heated die, puller and cut to length" width={1400} height={500} sizes="94vw" className="h-auto w-full" /></Figure>
        <ol className="mt-[24px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-5">{carbonProcessSteps.map((step, i) => <li key={step.title} className="border-t-2 border-teal pt-[16px]"><span className="font-mono text-f12 text-teal-text">0{i + 1}</span><h3 className="mt-[6px] text-f18 font-bold text-t1">{step.title}</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">{step.text}</p></li>)}</ol>
        <p className="mt-[24px] text-f16"><Link href="/technology/pultrusion-process" className={linkStyle}>Explore the pultrusion process</Link>{" · "}<Link href="/technology/pultrusion-vs-extrusion-filament-winding" className={linkStyle}>Compare manufacturing methods</Link></p>
      </PageSection>

      <PageSection id="selection" title="Fiber direction: what pultrusion is good at, and when to wrap instead" intro="The process fixes the laminate. Pultrusion puts the fibers along the profile, which is right for axial load and bending and wrong for torque, pressure or a hard clamp. Knowing which case you have is most of the specification.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={11} title="Pultruded against roll-wrapped" caption="A 0° laminate carries axial load, bending and buckling at the highest modulus per kilogram; ±45° and 90° plies add torsion and hoop capacity at a higher price. A pultruded profile can be sleeved, wrapped or bonded at the ends so the 0° laminate works in the span and the joint carries the rest." bleed><Plate src={carbonFigures.fiberDirection.src} alt={carbonFigures.fiberDirection.alt} /></Figure>
          <div className="grid gap-[16px]">
            {[
              { title: "Axial and bending loads", text: "Mainly longitudinal carbon fibers suit stiffness-driven designs with low moving mass. Finished-part properties still depend on the fiber grade, resin, fiber content and section geometry." },
              { title: "Torque and transverse loads", text: "A unidirectional profile needs separate checks for shear, hoop loading and local bearing. Off-axis reinforcement, pull-winding or a wrapped laminate may better suit these loads." },
              { title: "Connections and exposure", text: "Specify bonded joints, inserts and clamps early. Carbon is electrically conductive; review electrical isolation and metal interfaces in wet service, together with resin, temperature and UV requirements." },
            ].map((item) => <article key={item.title} className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f16 font-bold text-t1">{item.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{item.text}</p></article>)}
          </div>
        </div>
        <p className="mt-[24px] text-f16 leading-relaxed text-t2">Comparing carbon with glass fiber? Review <Link href="/pultruded-frp-profiles" className={linkStyle}>pultruded fiberglass profiles</Link> when cost or electrical insulation drives the design. Compare actual laminate data and the complete assembly against the same load case.</p>
      </PageSection>

      <PageSection id="applications" title="Where pultruded carbon is specified" tone="muted" intro="Six kinds of part, each on one of the three forms. The photographs show the element, not an F1 part; some of the carbon in them was made by other processes, and the pultruded form is the straight-member answer to the same brief.">
        <div className="grid gap-[20px] md:grid-cols-2 lg:grid-cols-3">{applications.map(item => <Link key={item.title} href={item.href} className="group flex flex-col overflow-hidden rounded-card border border-border-default bg-white transition-colors hover:border-teal-border"><Photo photo={item.photo} /><div className="flex flex-1 flex-col p-[16px]"><h3 className="text-f16 font-bold text-teal-text">{item.title} <span aria-hidden>→</span></h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">{item.text}</p></div></Link>)}</div>
      </PageSection>

      <PageSection id="faq" title="Carbon fiber pultrusion: common questions">
        <FAQList items={carbonPultrusionFaqs} />
        <aside id="photo-credits" className="mt-[32px] rounded-card border border-border-default bg-bg2 p-[20px] text-f12 leading-relaxed text-t3">
          <h3 className="text-f14 font-bold text-t1">Photo credits</h3>
          <p className="mt-[4px]">Figures 2, 10 and 11 are F1 Composite&apos;s own drawings; Figure 9 is a FengDu production photograph. The other photographs are openly licensed works from Wikimedia Commons, cropped and re-encoded for this page; none shows an F1 part or project, and some of the carbon parts in them were made by processes other than pultrusion.</p>
          <ul className="mt-[8px] columns-1 gap-[24px] md:columns-2">{creditedPhotos.map(photo => <li key={photo.src} className="break-inside-avoid"><a href={photo.credit.sourceHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.title}</a> by {photo.credit.author}, {photo.credit.licenseHref ? <a href={photo.credit.licenseHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.license}</a> : photo.credit.license}.</li>)}</ul>
        </aside>
      </PageSection>
      <PageSection id="quote" title="Start with the section. Build the specification together." tone="deep"><ProductRfq product="Pultruded carbon fiber profiles" productPath={carbonPultrusionPath} quoteHref={quoteHref} items={carbonRfqItems} intro="Send your plate, tube, rod or custom profile drawing. F1 Composite will review the material, tooling, inspection and delivery requirements for a project quotation." /></PageSection>
    </>
  );
}
