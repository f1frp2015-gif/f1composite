import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import ProductPageNav from "@/components/products/ProductPageNav";
import ProductRfq from "@/components/products/ProductRfq";
import ProductSection from "@/components/products/ProductSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import FAQDisclosure from "@/components/ui/FAQDisclosure";
import Figure from "@/components/ui/Figure";
import { carbonFiberRod as page } from "@/content/data/carbonFiberRod";
import { carbonProfileLinks } from "@/content/data/carbonFiberPultrusion";
import { carbonFigures, carbonProperties, carbonScenePhotos as scenes } from "@/content/data/carbonFiberScenes";
import type { ScenePhoto } from "@/content/data/frpRebar";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  image: `${page.path}/opengraph-image`,
});

const quoteHref = buildRfqHref({ source: "carbon-fiber-rod", product: "Solid pultruded carbon fiber rod", productPath: page.path });
const tubesPath = "/products/pultruded-carbon-fiber-tubes";
const linkStyle = "font-semibold text-teal-text underline underline-offset-4";

// Why a small straight member ends up as a solid carbon rod.
const reasons = [
  { title: "Stiff for its weight, in one direction", lead: "Every fiber in a pultruded rod runs along its length, so a 6 mm carbon rod is about 3.4 times as stiff as a 6 mm aluminium rod for the same mass, and seven times a fiberglass one.", proof: "Longitudinal modulus 120–150 GPa class at about 1.55 g/cm³, against 69 GPa at 2.70 for aluminium and 23 GPa at 1.9 for E23 fiberglass." },
  { title: "It stays straight and the same length", lead: "Thermal expansion along the fibers is close to zero and the rod does not creep under sustained load the way a plastic rod does, so a linkage or a locating member keeps its geometry.", proof: "About −1 to +1 ×10⁻⁶/°C along the fibers; the rod is sized to a strain limit, so sustained-load creep is a resin check, not a carbon problem." },
  { title: "No rust, no fatigue allowance", lead: "A push rod or a tie that cycles millions of times does not need the oversizing an aluminium part needs to survive fatigue, and it never corrodes.", proof: "High fatigue limit in axial tension; the bonded end fitting, not the rod, usually sets the fatigue life of the part." },
  { title: "The cheapest carbon there is", lead: "Pultrusion makes a solid rod continuously, with no mandrel and no lay-up: the lowest cost per metre of any carbon product, in any cut length, in diameters from 1 mm to 40 mm and more.", proof: "A solid section is the simplest die; small diameters that cannot be made hollow are made this way." },
];

// What a solid carbon rod will not do, beside the benefits.
const limits = [
  { title: "It snaps rather than bends", text: "Unidirectional carbon is linear to rupture at about 1.2–1.8% strain, with no yield to warn you. Size the rod to a strain limit, keep bending elastic and protect it from impact; a tent pole that over-bends breaks, it does not kink." },
  { title: "Weak across the fibers", text: "Transverse strength and shear are resin-dominated. Cross-holes, set screws, hard clamps and side loads act on the weak direction; use bonded end fittings, sleeves and designed joints instead." },
  { title: "Conductive and noble", text: "Carbon conducts electricity and is cathodic to aluminium and steel. A wet carbon-to-aluminium joint corrodes the metal; isolate it, and use a fiberglass rod wherever insulation is the point." },
  { title: "Buckling sets compression capacity", text: "A slender rod in compression fails by buckling long before the material does. Unsupported length and end restraint, not tensile strength, size a push rod or strut." },
];

// Where a solid pultruded carbon rod is specified, with a photograph of the element and what to send.
const applications: Array<{ title: string; photo: ScenePhoto; why: string; typical: string; send: string }> = [
  { title: "Linkages, push rods and ties", photo: scenes.deltaLinkages, why: "A rod loaded along its axis between two ball joints is the pure case for pultruded carbon: all the stiffness in the one direction it is loaded, almost no mass to accelerate, and a bonded fitting at each end.", typical: "Ø3–Ø12 mm, 100–1,500 mm, bonded or sleeved end fittings", send: "Axial load in tension and compression, unsupported length, end fitting type and the stiffness you need at the joint." },
  { title: "Pick-and-place and parallel robots", photo: scenes.deltaConveyor, why: "Delta robots move their parallel arms at several g, thousands of times an hour. Carbon rods cut the moving mass, which cuts motor size, cycle time and vibration at the gripper.", typical: "Ø4–Ø12 mm rods in parallelogram arms; tubes for the upper arms", send: "Acceleration, payload, reach, joint design and the allowable deflection at the tool." },
  { title: "Model and research aircraft", photo: scenes.glider, why: "Wing spars, tail booms, pushrods and struts in research gliders, UAV airframes and model aircraft use carbon rod where a metal part is too heavy and a hollow section too small to make or too fragile to clamp.", typical: "Ø1–Ø10 mm spars and pushrods, long cut lengths", send: "Span, bending load, the fittings, and any impact or ground-handling loads." },
  { title: "Drone frames and small UAVs", photo: scenes.fpvQuad, why: "Small multirotors and fixed-wing UAVs use carbon rods for standoffs, landing gear, antenna masts and spars where a plate or tube would be heavier or harder to join.", typical: "Ø2–Ø8 mm, short cut lengths, often bonded into plates", send: "The frame drawing, the loads on each rod and how it is fixed." },
  { title: "Poles, spars and springs", photo: scenes.windWand, why: "Kite spars, tent and shelter poles, antenna whips and the stiffening core of a flexible pole use carbon rod for the combination of stiffness and elastic return that no metal rod gives at the same weight.", typical: "Ø2–Ø16 mm, tapered or stepped by sleeving, hybrid carbon and glass", send: "Deflection range, cycles, wind or impact loading and whether the pole is tapered or stepped." },
  { title: "Concrete and masonry strengthening", photo: scenes.strengthening, why: "Near-surface-mounted carbon rods and bonded pultruded strips add tensile capacity to a slab, beam or wall without adding depth or weight; the rod goes into a sawn groove and is bonded with epoxy.", typical: "Ø6–Ø12 mm rods and 50 × 1.2 mm strips, cut to the member", send: "The member, the capacity to add, the exposure and the design code the engineer of record works to." },
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
const creditedPhotos: ScenePhoto[] = [scenes.deltaLinkages, scenes.plateEdge, scenes.carbonization, scenes.brokenPole, ...applications.map(item => item.photo), scenes.drilledHole].filter((photo, i, all) => all.findIndex(other => other.src === photo.src) === i);

export default function CarbonFiberRodPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({
        name: "Solid pultruded carbon fiber rods",
        description: page.description,
        path: page.path,
        image: scenes.deltaLinkages.src,
        category: "Solid composite rods",
        material: "Carbon-fiber-reinforced polymer (CFRP)",
        dateModified: page.updated,
      })} />
      <PageHeader
        tag="Solid rods · Carbon fiber"
        title="Carbon fiber rods: solid pultruded CFRP round bars, stiff for their weight and straight for life"
        description="A solid pultruded carbon fiber rod puts every fiber along its length: about 3.4 times the stiffness of aluminium for the same mass, near-zero thermal expansion, no corrosion and no fatigue allowance, in diameters from 1 mm up and any cut length. F1 Composite supplies CFRP round bars to your drawing, including 3/8 inch (9.525 mm) and metric sizes, and reviews the loads, end fittings and evidence with you before quoting."
        updated={page.updated}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/product-lines" },
          { label: "Solid rods", href: page.parentPath },
          { label: "Carbon fiber rods" },
        ]}
        facts={[
          { label: "Section", value: "Solid round bar, Ø1 mm and up" },
          { label: "Stiffness per kg", value: "≈ 3.4 × aluminium · 7 × fiberglass" },
          { label: "Expansion along the rod", value: "≈ 0 ×10⁻⁶/°C" },
          { label: "Supply", value: "To drawing, any cut length" },
        ]}
        actions={{ primary: { label: "Quote carbon fiber rods", href: quoteHref }, secondary: { label: "See the numbers", href: "#performance", variant: "secondary" }, stickyMobile: true }}
        figure={
          <Figure number={1} title="Carbon rod linkages on a delta robot" note="Photo · see credits" bleed caption={scenes.deltaLinkages.shows}>
            <Photo photo={scenes.deltaLinkages} sizes="(min-width: 1024px) 45vw, 100vw" preload />
          </Figure>
        }
      />
      <ProductPageNav items={[
        { id: "performance", label: "Why carbon" },
        { id: "rod-vs-tube", label: "Rod or tube" },
        { id: "applications", label: "Applications" },
        { id: "sizes", label: "Sizes & specification" },
        { id: "comparison", label: "Carbon vs glass" },
        { id: "fabrication", label: "Ends & holes" },
        { id: "faq", label: "FAQ" },
        { id: "quote", label: "Quote" },
      ]} />

      <ProductSection id="performance" title="What a solid carbon rod does that a metal or fiberglass rod cannot, and what it will not do" intro="A pultruded carbon rod is the simplest carbon product: continuous fibers, one direction, a resin to hold them, pulled through a round die. That simplicity is where its performance comes from and where its limits sit. The numbers below are published class values for unidirectional carbon; the qualification report of the offered rod is what you design with.">
        <div className="grid gap-[20px] md:grid-cols-3">
          <Figure number={2} title="What a pultruded rod is made of" note="Photo · see credits" caption={scenes.plateEdge.shows} bleed><Photo photo={scenes.plateEdge} /></Figure>
          <Figure number={3} title="Where the fiber comes from" note="Photo · see credits" caption={scenes.carbonization.shows} bleed><Photo photo={scenes.carbonization} /></Figure>
          <Figure number={4} title="Stiffness per unit mass" caption="Unidirectional pultruded carbon against aluminium, steel and E23 fiberglass. Same mass, about 3.4 times the stiffness of the metals along the fibers." bleed><Plate src={carbonFigures.specificStiffness.src} alt={carbonFigures.specificStiffness.alt} /></Figure>
        </div>
        <div className="mt-[32px] grid gap-[20px] md:grid-cols-2 xl:grid-cols-4">{reasons.map((reason, i) => <article key={reason.title} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Reason {i + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{reason.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{reason.lead}</p><p className="mt-[12px] border-t border-border-default pt-[12px] text-f12 leading-relaxed text-t3">{reason.proof}</p></article>)}</div>
        <div className="mt-[32px] overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-[20px] py-[16px] text-left font-semibold text-t1">Unidirectional pultruded carbon against the materials it replaces, property by property</caption><thead className="bg-bg2"><tr><th scope="col" className="px-[16px] py-[12px]">Property</th><th scope="col" className="px-[16px] py-[12px] text-teal-text">Pultruded CFRP</th><th scope="col" className="px-[16px] py-[12px]">Pultruded GFRP (E23)</th><th scope="col" className="px-[16px] py-[12px]">Aluminium 6061-T6</th><th scope="col" className="px-[16px] py-[12px]">Structural steel</th><th scope="col" className="px-[16px] py-[12px]">What it means for a rod</th></tr></thead><tbody>{carbonProperties.map(row => <tr key={row.property} className="border-t border-border-default align-top"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{row.property}</th><td className="px-[16px] py-[12px] leading-relaxed text-t1">{row.cfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.gfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.aluminium}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.steel}</td><td className="px-[16px] py-[12px] leading-relaxed text-t3">{row.note}</td></tr>)}</tbody></table></div><p className="border-t border-border-default p-[20px] text-f12 leading-relaxed text-t3">CFRP values are published class ranges for standard-modulus carbon at about 60% fiber volume (ACI 440.1R Table 3.1 and supplier datasheets); fiberglass is the EN 13706 E23 minimum F1 publishes for its glass profiles; metals are handbook values. Values and certificates published for F1 fiberglass profiles or other carbon products do not transfer to this rod; request CFRP-specific data for the offered grade, diameter and test direction.</p></div>
        <div className="mt-[32px] grid items-start gap-[24px] lg:grid-cols-[1fr_1.6fr]">
          <Figure number={5} title="No yield, no warning" note="Photo · see credits" caption={scenes.brokenPole.shows} bleed><Photo photo={scenes.brokenPole} sizes="(max-width: 1024px) 94vw, 36vw" /></Figure>
          <div className="grid gap-[16px] sm:grid-cols-2">{limits.map(limit => <article key={limit.title} className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">{limit.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{limit.text}</p></article>)}</div>
        </div>
      </ProductSection>

      <ProductSection id="rod-vs-tube" title="Solid rod or hollow tube?" tone="muted" intro="Bending stiffness is E × I, and I grows with the fourth power of the diameter, so a tube puts its material where it counts. A solid rod wins where the diameter is too small to make hollow, where a clamp or a set screw would crush a wall, where the member is a pin or an axle, or where the rod is bonded into a groove or a socket.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={6} title="Three sections, one laminate, one scale" caption="A Ø14 × Ø10 mm tube weighs the same as a Ø10 mm solid rod and is 2.8 times as stiff in bending; a Ø10 × Ø7 mm tube keeps the rod's outside diameter at half the mass and three quarters of the stiffness. Below about Ø6 mm the tube stops being practical and the rod takes over." bleed><Plate src={carbonFigures.hollowVsSolid.src} alt={carbonFigures.hollowVsSolid.alt} /></Figure>
          <div className="grid gap-[16px]">
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Choose a solid rod when</h3><ul className="mt-[8px] space-y-[6px] text-f14 leading-relaxed text-t2">{["The diameter is under about 6 mm, or the part is a pin, axle, spar or stiffening core.", "The load is axial: a linkage, a tie, a push rod with bonded ends.", "A clamp, a set screw or a hard socket would crush a tube wall.", "The rod is bonded into a groove, a sleeve or a socket along its length."].map(item => <li key={item}>· {item}</li>)}</ul></div>
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Choose a tube when</h3><ul className="mt-[8px] space-y-[6px] text-f14 leading-relaxed text-t2">{["Bending stiffness per kilogram is the target and there is room for a larger diameter.", "A bore is needed for cables, a telescoping section or a bonded insert.", "The member is long: a boom, an arm, a mast."].map(item => <li key={item}>· {item}</li>)}</ul><Link href={tubesPath} className={`mt-[12px] inline-flex min-h-10 items-center text-f14 ${linkStyle}`}>Hollow carbon fiber rods and pultruded tubes →</Link></div>
          </div>
        </div>
      </ProductSection>

      <ProductSection id="applications" title="Where a solid carbon rod is specified" intro="Six kinds of part buy pultruded carbon rod, each for one of the four reasons above. The photographs show the element, not an F1 part; some of the carbon in them was made by other processes, and a pultruded rod is the straight-member answer to the same brief.">
        <div className="grid gap-[24px] md:grid-cols-2 xl:grid-cols-3">{applications.map(item => <article key={item.title} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white"><Photo photo={item.photo} sizes="(max-width: 768px) 94vw, (max-width: 1280px) 47vw, 31vw" /><div className="flex flex-1 flex-col p-[20px]"><p className="text-f12 leading-relaxed text-t3">{item.photo.shows}</p><h3 className="mt-[12px] text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{item.why}</p><dl className="mt-[16px] grid gap-[10px] text-f14 leading-relaxed"><dt className="font-semibold text-teal-text">Typical sizes</dt><dd className="text-t2">{item.typical}</dd><dt className="font-semibold text-t1">What to send</dt><dd className="text-t2">{item.send}</dd></dl></div></article>)}</div>
        <p className="mt-[24px] text-f14 leading-relaxed text-t2">For glass-fiber rods, fabricated blanks and insulating duties, use the <Link href={page.parentPath} className={linkStyle}>fiberglass solid round rod</Link> catalog; for a solid section with flat locating faces, compare <Link href="/products/fiberglass-square-rods" className={linkStyle}>fiberglass square rods</Link>.</p>
      </ProductSection>

      <ProductSection id="sizes" title="Carbon fiber rod sizes and specification" tone="muted" intro="Send metric or imperial dimensions with a drawing. The quotation confirms the available diameter, material, length, tolerance and production scope.">
        <div className="mb-[24px] border-l-4 border-teal bg-white p-[24px]">
          <h3 className="text-f20 font-bold text-t1">3/8 inch carbon fiber rod: 9.525 mm nominal diameter</h3>
          <p className="mt-[10px] max-w-[900px] text-f16 leading-relaxed text-t2">A 3/8 inch solid carbon fiber rod is a specific imperial size. Keep 9.525 mm on the drawing when fit matters; 9.5 mm and 10 mm are different nominal diameters. Include cut length, diameter tolerance and quantity in your inquiry.</p>
          <Link href={buildRfqHref({ source: "carbon-fiber-rod-3-8", product: "3/8 inch (9.525 mm) solid carbon fiber rod", productPath: page.path })} className={`mt-[14px] inline-block text-f14 ${linkStyle}`}>Request a 3/8 inch rod quotation →</Link>
        </div>
        <dl className="divide-y divide-border-default overflow-hidden rounded-card border border-border-default bg-white">
          {page.specifications.map(([label, description]) => (
            <div key={label} className="grid gap-[8px] px-[20px] py-[16px] md:grid-cols-[180px_1fr] md:gap-[24px]">
              <dt className="text-f16 font-semibold text-t1">{label}</dt>
              <dd className="text-f16 leading-relaxed text-t2">{description}</dd>
            </div>
          ))}
        </dl>
      </ProductSection>

      <ProductSection id="comparison" title="Carbon fiber rod vs fiberglass rod" intro="Choose using the required stiffness, mass, electrical behavior and finished-part cost. The property table above gives the numbers; this table gives the decision.">
        <div className="overflow-x-auto rounded-card border border-border-default">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14 leading-relaxed">
            <caption className="sr-only">Material selection for carbon fiber and fiberglass solid rods</caption>
            <thead className="bg-bg2 text-t1"><tr>{["Selection point", "Carbon fiber rod (CFRP)", "Fiberglass rod (GFRP)"].map((heading) => <th key={heading} scope="col" className="px-[20px] py-[16px] font-semibold">{heading}</th>)}</tr></thead>
            <tbody className="divide-y divide-border-default">
              {page.comparison.map(([label, carbon, glass]) => <tr key={label}><th scope="row" className="px-[20px] py-[16px] font-semibold text-t1">{label}</th><td className="px-[20px] py-[16px] text-t2">{carbon}</td><td className="px-[20px] py-[16px] text-t2">{glass}</td></tr>)}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[900px] text-f14 leading-relaxed text-t2">Request CFRP-specific strength, modulus and temperature data for your design. Values and certificates published for F1 fiberglass profiles or other carbon composite products do not transfer to this rod.</p>
      </ProductSection>

      <ProductSection id="fabrication" title="Ends, holes and joints: where a carbon rod is won or lost" tone="muted" intro="A pultruded rod almost never fails in the span. It fails at a cross-drilled hole, under a set screw, or in an end fitting that was never qualified. The rules are short.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1fr_1.4fr]">
          <Figure number={7} title="A hole is a wound" note="Photo · see credits" caption={scenes.drilledHole.shows} bleed><Photo photo={scenes.drilledHole} sizes="(max-width: 1024px) 94vw, 40vw" /></Figure>
          <div className="grid gap-[16px] sm:grid-cols-2">
            {[
              ["Cut it clean", "Cut with a fine abrasive or diamond wheel and support both sides; a shear or a dull blade splinters the fibers. Seal cut ends where moisture or handling matters."],
              ["Bond the ends", "Bonded end fittings, threaded inserts in a bonded sleeve, or a rod bonded into a socket carry load into the fibers. Define adhesive, surface preparation, bond length and cure; qualify the joint, not the rod."],
              ["Avoid cross-holes and set screws", "A hole cuts the fibers that carry the load and delaminates on the exit side; a set screw crushes them. Where a pin is unavoidable, use a bonded bush and keep the hole small and far from the end."],
              ["Isolate from aluminium", "Carbon is cathodic to aluminium and steel. In wet service put a glass ply, a plastic sleeve or a sealed adhesive line between them, and keep the rod out of any circuit it should not be in."],
            ].map(([title, text]) => <div key={title} className="border-t-2 border-teal pt-[16px]"><h3 className="text-f16 font-bold text-t1">{title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{text}</p></div>)}
          </div>
        </div>
        <p className="mt-[20px] text-f14 leading-relaxed text-t2">Tools and surface preparation for pultruded sections are in <Link href="/technology/frp-profile-machining" className={linkStyle}>machining and fabrication</Link>; the tests F1 can run or arrange for a rod and its fitting are on the <Link href="/technology/quality-testing" className={linkStyle}>quality and testing</Link> page.</p>
      </ProductSection>

      <ProductSection id="faq" title="Carbon fiber rod questions">
        <div className="grid items-start gap-[12px] md:grid-cols-2">{page.faq.map((item) => <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />)}</div>
        <aside id="photo-credits" className="mt-[32px] rounded-card border border-border-default bg-bg2 p-[20px] text-f12 leading-relaxed text-t3">
          <h3 className="text-f14 font-bold text-t1">Photo credits</h3>
          <p className="mt-[4px]">Figures 4 and 6 are F1 Composite&apos;s own drawings. The photographs are openly licensed works from Wikimedia Commons, cropped and re-encoded for this page; none shows an F1 part or project, and some of the carbon parts in them were made by processes other than pultrusion.</p>
          <ul className="mt-[8px] columns-1 gap-[24px] md:columns-2">{creditedPhotos.map(photo => <li key={photo.src} className="break-inside-avoid"><a href={photo.credit.sourceHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.title}</a> by {photo.credit.author}, {photo.credit.licenseHref ? <a href={photo.credit.licenseHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.license}</a> : photo.credit.license}.</li>)}</ul>
        </aside>
      </ProductSection>
      <RelatedLinks groups={[
        { title: "Carbon fiber profiles", links: carbonProfileLinks.filter((item) => item.href !== page.path) },
        { title: "Rod and bar products", links: [
          { label: "Solid fiberglass round rods", href: page.parentPath },
          { label: "Fiberglass square rods", href: "/products/fiberglass-square-rods" },
          { label: "Fiberglass flat bars", href: "/products/fiberglass-structural-shapes/frp-flat-bar" },
        ] },
        { title: "Other section and connection options", links: [
          { label: "Custom pultruded profile development", href: "/products/custom-pultruded-profiles" },
          { label: "Hollow fiberglass round tubes", href: "/products/fiberglass-structural-shapes/frp-tube" },
          { label: "Fiberglass threaded rods and fittings", href: "/products/frp-fasteners-fittings" },
        ] },
        { title: "Material and fabrication planning", links: [
          { label: "Pultrusion resin systems", href: "/technology/pultrusion-resin-systems" },
          { label: "Fabrication and engineering services", href: "/technology/knowhow-services" },
          { label: "Product evidence library", href: "/resources/evidence" },
        ] },
      ]} />
      <ProductSection id="quote" title="Request a carbon fiber rod quotation" tone="deep">
        <ProductRfq product="Solid pultruded carbon fiber rods" productPath={page.path} quoteHref={quoteHref} intro="Send your rod drawing, diameter, cut lengths and quantity, with the application and destination." items={[
          { title: "Size and quantity", text: "Metric or imperial diameter, tolerance, cut lengths, sample quantity and expected repeat demand." },
          { title: "Loads and connections", text: "Unsupported length, load direction, deflection limits, fittings, holes and bonding details." },
          { title: "Material and evidence", text: "Carbon fiber and resin requirements, exposure conditions and the tests needed for acceptance." },
          { title: "Delivery requirements", text: "Destination, required date, packaging constraints and responsibility for final fabrication." },
        ]} />
      </ProductSection>
    </>
  );
}
