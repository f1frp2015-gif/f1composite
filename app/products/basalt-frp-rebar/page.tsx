import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Figure from "@/components/ui/Figure";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import ProductPageNav from "@/components/products/ProductPageNav";
import ProductRfq from "@/components/products/ProductRfq";
import ProductSection from "@/components/products/ProductSection";
import { basaltCatalog as catalog, basaltScenePhotos as basalt, barAreaMm2, BFRP_MASS_DENSITY_GCM3 } from "@/content/data/basaltRebar";
import { rebarScenePhotos as concrete, type ScenePhoto } from "@/content/data/frpRebar";
import { basaltRebarManual } from "@/content/data/downloads";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ title: catalog.title, description: catalog.description, path: catalog.path, image: catalog.images.cutPieces });

// One inquiry route, the same as the GFRP family: the site contact form with the product named.
const quoteHref = buildRfqHref({ source: "product-rfq", product: "Basalt FRP rebar", productPath: catalog.path, message: "Please quote basalt FRP (BFRP) rebar against my bar schedule: diameters, cut lengths or coils, quantities, the standard my project cites and the reports required, and the delivery destination." });

const requestItems = [
  { title: "Bar schedule", text: "Diameters, cut lengths or coils, quantities and bar marks, or your BOQ and drawings." },
  { title: "Standard and documents", text: "ASTM D8505, CSA S807 or the specification your project cites, and the reports your engineer requires." },
  { title: "Shapes, if any", text: "Bends, hooks or mesh are raised as an inquiry; the standard product is straight bars and coils." },
  { title: "Destination and timing", text: "Delivery country or port, target date, shipment phases and any sample evaluation." },
];

// The reasons a specification picks a basalt bar, each tied to the property that delivers it.
const reasons = [
  { title: "It cannot rust", lead: "No corrosion cell, so chlorides, de-icing salt and wet-dry cycling stop being a reinforcement problem.", proof: "The manufacturer states 75–80% of tensile strength retained after 900 days in alkali and seawater; ask for the method and report." },
  { title: "The highest tensile class of the three", lead: "1,100 MPa published up to Ø12 mm and 1,000 MPa at Ø25 mm, against about 900 MPa for a GFRP 45 bar and 420 MPa yield for Grade 60 steel.", proof: "Basalt filament is stronger and stiffer than E-glass; the bar inherits part of that as a 50 GPa modulus class in one grade." },
  { title: "A quarter of the weight", lead: "A Ø16 mm bar is about 0.38 kg/m against 1.58 kg/m in steel. Bundles are carried by hand; small sizes ship as coils.", proof: "Density 1.9–2.1 g/cm³ against 7.85; the published unit masses reconcile to 1.9 g/cm³." },
  { title: "Nonmagnetic, non-conductive, one raw material", lead: "The bar disappears from MRI fields and rail detection loops, and the fiber is drawn from crushed rock with no other ingredient.", proof: "Basalt fiber and vinyl ester or epoxy resin carry no current and no magnetic signature; thermal conductivity stays below 1 W/m·K." },
];

// Design limits beside the benefits, so the page reads like a specification rather than a brochure.
const limits = [
  { title: "Stiffness, not strength, sizes the bar", text: "At a 50 GPa class the bar is a quarter as stiff as steel. Crack width, deflection and bond govern, so the design is redone to the FRP code, not substituted size for size." },
  { title: "No yield plateau", text: "BFRP is linear to rupture at about 2.6% strain. Sections are proportioned so the concrete crushes first and the bar stays elastic." },
  { title: "A narrower code path than glass", text: "ASTM D8505 and CSA S807 cover basalt bars; ACI CODE-440.11-22 does not. A US building project needs the engineer's design and the authority's acceptance." },
  { title: "Straight bars and coils are the product", text: "Bends, hooks and mesh are raised as an inquiry. Where a project needs shapes now, the GFRP family's factory bends can be paired with straight basalt bars if the designer allows." },
];

const fixed = (value: number, digits: number) => value.toFixed(digits);
const sizeRows = catalog.diameters.map(d => { const area = barAreaMm2(d); const cls = catalog.strengthClassMPa(d); return { d, area, mass: (area * BFRP_MASS_DENSITY_GCM3) / 1000, cls, capacity: (area * cls) / 1000, coil: d <= 10 }; });

/** A schematic or photo plate at the 8:5 ratio every drawing on this page is made in. */
function Plate({ src, alt, preload = false }: { src: string; alt: string; preload?: boolean }) {
  return <div className="relative aspect-[8/5] bg-white"><Image src={src} alt={alt} fill sizes="(max-width: 1024px) 94vw, 50vw" preload={preload} className="object-contain" /></div>;
}

/** An openly licensed photograph that fills its plate; the credit is listed at the end of the page. */
function Photo({ photo, sizes = "(max-width: 1024px) 94vw, 33vw" }: { photo: ScenePhoto; sizes?: string }) {
  return <div className="relative aspect-[8/5] bg-bg2"><Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" /></div>;
}

// Every third-party photograph on the page, in the order it appears, for the credits list.
const creditedPhotos: ScenePhoto[] = [concrete.spallingBridge, basalt.quarryBlocks, basalt.crushedBasalt, basalt.basaltFiber, basalt.fabricFireTest, basalt.crushingPlant, ...catalog.segments.map(segment => concrete[segment.photo]), concrete.deckPour];

export default function BasaltRebarPage() {
  const diameters = `Ø${Math.min(...catalog.diameters)}–${Math.max(...catalog.diameters)} mm`;
  return <>
    <JsonLd data={buildProductFamilyPageSchema({ name: "Basalt FRP Rebar for Concrete Reinforcement", description: catalog.description, path: catalog.path, image: catalog.images.cutPieces, category: "Concrete reinforcement", material: "Basalt fiber reinforced polymer (BFRP)", productLine: "BFRP reinforcement", dateModified: catalog.revision })} />
    <PageHeader
      updated={catalog.revision}
      tag="Concrete reinforcement"
      line={{ name: "BFRP reinforcement", mark: false }}
      title="Basalt FRP rebar: 1,100 MPa class bars drawn from rock, for concrete that must not rust"
      description="Basalt fiber reinforced polymer (BFRP) rebar is pultruded from continuous basalt filament, which is melted and drawn from crushed basalt rock with no other ingredient. The bar does not corrode, weighs a quarter of steel, carries no current and no magnetic signature, and comes in a 50 GPa modulus class with the highest tensile class of the FRP bars we supply. Eleven inquiry diameters from Ø3 to Ø25 mm, straight or coiled, with an F1 product manual to download."
      facts={[
        { label: "Straight bars", value: `${catalog.diameters.length} diameters, ${diameters}` },
        { label: "Classes", value: "1,100 MPa · 50 GPa (published)" },
        { label: "Weight", value: "About ¼ of steel, size for size" },
        { label: "Forms", value: "Bars to length; Ø≤10 mm coiled" },
      ]}
      figure={
        <Figure number={1} title="Basalt FRP bars" note="Supplier photo" caption="Cut pieces with the helical bond surface; the bronze-grey colour is the fiber's own.">
          <Image src={catalog.images.cutPieces} alt="Supplier photograph of short basalt fiber reinforced polymer rebar pieces with a helically wrapped bond surface" width={750} height={330} sizes="(max-width: 768px) 85vw, 360px" preload className="mx-auto h-auto w-full max-w-[360px] object-contain" />
        </Figure>
      }
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "FRP Rebar", href: "/products/frp-rebar" }, { label: "Basalt FRP Rebar" }]}
      actions={{ primary: { label: "Request a quote", href: quoteHref }, secondary: { label: "Download the manual", href: basaltRebarManual.file }, note: "Send a bar schedule, BOQ or drawing through the contact form. Unspecified details can follow.", stickyMobile: true }}
    />
    <ProductPageNav
      items={[
        { id: "performance", label: "Why basalt" },
        { id: "rock", label: "From rock to bar" },
        { id: "segments", label: "Where it is used" },
        { id: "specifications", label: "Sizes & values", count: catalog.diameters.length },
        { id: "standards", label: "Standards" },
        { id: "manual", label: "Manual" },
        { id: "pricing", label: "Price basis" },
        { id: "delivery", label: "Export & delivery" },
        { id: "installation", label: "On site" },
        { id: "faq", label: "FAQ" },
      ]}
    />

    <ProductSection id="performance" title="What basalt rebar does that steel cannot, and where it differs from fiberglass" intro="Steel reinforcement fails one way in exposed concrete: chlorides or carbonation reach the bar, it rusts, and the rust pushes the cover off. A basalt bar has no corrosion cell to start, like a glass bar, and adds a higher tensile class and a 50 GPa modulus class in one grade. It is still a quarter as stiff as steel and still linear to rupture, so the design is redone to an FRP code rather than swapped size for size.">
      <div className="grid gap-5 md:grid-cols-3">
        <Figure number={2} title="Rust pushes the cover off" note="Photo · see credits" caption={concrete.spallingBridge.shows} bleed><Photo photo={concrete.spallingBridge} /></Figure>
        <Figure number={3} title="The bar, close up" note="Supplier photo" caption="Helical fiber wrap over a dense basalt-fiber core; a sand coating is applied on request." bleed><div className="relative aspect-[8/5] bg-bg2"><Image src={catalog.images.surface} alt="Close-up of basalt fiber reinforced polymer bars with a helical fiber wrap" fill sizes="(max-width: 1024px) 94vw, 33vw" className="object-cover" /></div></Figure>
        <Figure number={4} title="Solid fiber to the edge" note="Supplier photo" caption="Bar ends of a Ø20 mm class bundle: continuous basalt filament through the full section, no core-and-shell construction." bleed><div className="relative aspect-[8/5] bg-bg2"><Image src={catalog.images.barEnds} alt="Cut ends of bundled basalt FRP rebar showing the solid fiber section" fill sizes="(max-width: 1024px) 94vw, 33vw" className="object-cover" /></div></Figure>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{reasons.map((reason, i) => <article key={reason.title} className="flex flex-col rounded-card border border-border-default bg-bg2 p-5"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Reason {i + 1}</p><h3 className="mt-1 text-f18 font-bold text-t1">{reason.title}</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{reason.lead}</p><p className="mt-3 border-t border-border-default pt-3 text-f12 leading-relaxed text-t3">{reason.proof}</p></article>)}</div>
      <div className="mt-8 overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[860px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-5 py-4 text-left font-semibold text-t1">Basalt FRP against the GFRP classes and Grade 60 steel, property by property</caption><thead className="bg-bg2"><tr><th scope="col" className="px-4 py-3 font-semibold text-t1">Property</th><th scope="col" className="px-4 py-3 font-semibold text-t1">BFRP (published class)</th><th scope="col" className="px-4 py-3 font-semibold text-t1">GFRP 45 / 60</th><th scope="col" className="px-4 py-3 font-semibold text-t1">Steel Grade 60</th><th scope="col" className="px-4 py-3 font-semibold text-t1">What it means</th></tr></thead><tbody>{catalog.properties.map(row => <tr key={row.property} className="border-t border-border-default align-top"><th scope="row" className="px-4 py-3 font-semibold text-t1">{row.property}</th><td className="px-4 py-3 text-t2">{row.bfrp}</td><td className="px-4 py-3 text-t2">{row.gfrp}</td><td className="px-4 py-3 text-t2">{row.steel}</td><td className="px-4 py-3 text-t3">{row.note}</td></tr>)}</tbody></table></div><p className="border-t border-border-default px-5 py-3 text-f12 leading-relaxed text-t3">Class values, not a datasheet. BFRP values are the manufacturer&apos;s published typical values; GFRP values are ASTM D7957 minimums and the site&apos;s modulus classes; steel is ASTM A615 Grade 60. The qualification report for the offered size governs.</p></div>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Figure number={5} title="Stress and strain: basalt, glass and steel" caption="Both FRP bars are linear to rupture above steel's yield; the basalt line is steeper and ends higher. The slope is what sets crack widths and deflections." bleed><Plate src={catalog.images.stressStrain} alt="Schematic stress-strain chart comparing a 50 GPa class basalt FRP bar at 1,100 MPa, a 45 GPa class GFRP bar at about 900 MPa, and Grade 60 steel yielding at 420 MPa" /></Figure>
        <div className="grid gap-4 sm:grid-cols-2">{limits.map(limit => <article key={limit.title} className="rounded-card border border-border-default bg-white p-5"><h3 className="text-f16 font-bold text-t1">{limit.title}</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{limit.text}</p></article>)}</div>
      </div>
      <div className="mt-6 flex flex-wrap gap-x-6 text-f14 font-bold text-teal-text"><Link href="/resources/blog/basalt-rebar-vs-fiberglass-rebar" className="inline-flex min-h-10 items-center">Basalt vs fiberglass rebar: when to use each →</Link><Link href="/products/frp-rebar" className="inline-flex min-h-10 items-center">GFRP rebar, stirrups and mesh →</Link><Link href="/technology/fiberglass-rebar-vs-steel" className="inline-flex min-h-10 items-center">FRP rebar vs steel: test data →</Link></div>
    </ProductSection>

    <ProductSection id="rock" title="From basalt rock to a reinforcing bar" tone="muted" intro="Basalt fiber is the only reinforcement fiber made from one raw material: volcanic rock is crushed, washed, melted at about 1,450 °C and drawn into continuous filament, with no batch chemistry to formulate. The manufacturer behind this bar melts its own rock and pultrudes the bar in the same group, so the fiber lot and the bar lot stay traceable to each other.">
      <div className="grid gap-5 md:grid-cols-3">
        <Figure number={6} title="The raw material" note="Photo · see credits" caption={basalt.quarryBlocks.shows} bleed><Photo photo={basalt.quarryBlocks} /></Figure>
        <Figure number={7} title="Crushed and graded" note="Photo · see credits" caption={basalt.crushedBasalt.shows} bleed><Photo photo={basalt.crushedBasalt} /></Figure>
        <Figure number={8} title="The fiber" note="Photo · see credits" caption={basalt.basaltFiber.shows} bleed><Photo photo={basalt.basaltFiber} /></Figure>
      </div>
      <div className="mt-8">
        <Figure number={9} title="Seven stations from quarry to bundle" caption="Stations 1 to 4 are the fiber producer's, 5 to 7 the pultruder's; this manufacturer runs both. Bends and mesh are not on the line and are raised as an inquiry." bleed><Plate src={catalog.images.rockToBar} alt="Schematic of the seven stations from quarried basalt rock through melting, fiber drawing and roving to pultrusion, surface wrapping and the finished cut or coiled bar" /></Figure>
      </div>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
        <Figure number={10} title="The fiber takes heat the resin cannot" note="Photo · see credits" caption={basalt.fabricFireTest.shows} bleed><Photo photo={basalt.fabricFireTest} sizes="(max-width: 1024px) 94vw, 50vw" /></Figure>
        <div className="grid gap-4">
          <article className="rounded-card border border-border-default bg-white p-5"><h3 className="text-f16 font-bold text-t1">Why a rock fiber is stronger than a glass fiber</h3><p className="mt-2 text-f14 leading-relaxed text-t2">Basalt filament is stiffer and stronger than E-glass filament and keeps its properties to a higher temperature, which is where the bar&apos;s 1,100 MPa and 50 GPa classes come from. Fiber volume, resin, surface and process decide how much of that reaches the bar; the qualification report per size, not the fiber, is what the engineer designs with.</p></article>
          <article className="rounded-card border border-border-default bg-white p-5"><h3 className="text-f16 font-bold text-t1">Why the resin sets the temperature limit</h3><p className="mt-2 text-f14 leading-relaxed text-t2">The matrix softens above its glass transition temperature (100 °C class for a vinyl ester bar) long before the fiber is affected, so fire-rated members are designed by cover and detailing, exactly as for GFRP. A basalt bar is not a fire-rated bar.</p></article>
          <article className="rounded-card border border-border-default bg-white p-5"><h3 className="text-f16 font-bold text-t1">Scale behind the bar</h3><p className="mt-2 text-f14 leading-relaxed text-t2">The manufacturer draws basalt fiber at a published capacity of about 30,000 tonnes a year with a second phase under way, and pultrudes bars, meshes and profiles from it. Capacity is not stock: every size is quoted to a schedule.</p></article>
        </div>
      </div>
      <Figure number={11} title="A basalt quarry's crushing plant" note="Photo · see credits" caption={basalt.crushingPlant.shows} bleed className="mt-8"><Photo photo={basalt.crushingPlant} sizes="(max-width: 1024px) 94vw, 100vw" /></Figure>
    </ProductSection>

    <ProductSection id="segments" title="Where basalt rebar is specified, element by element" intro="Eight kinds of concrete buy a basalt bar for one of the reasons above. Each card says why, which sizes the element usually takes, and honestly where an imported bar fits. The photographs show steel-reinforced work and illustrate the element, not a basalt installation.">
      <div className="grid gap-6 md:grid-cols-2">{catalog.segments.map((item, i) => { const photo = concrete[item.photo]; return <article key={item.title} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white"><Photo photo={photo} sizes="(max-width: 768px) 94vw, 47vw" /><div className="flex flex-1 flex-col p-5"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Fig. {12 + i} · {photo.shows}</p><h3 className="mt-2 text-f18 font-bold text-t1">{item.title}</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{item.why}</p><p className="mt-3 text-f14 text-t2"><span className="font-semibold text-t1">Sizes: </span>{item.sizes}</p><p className="mt-2 border-t border-border-default pt-3 text-f12 leading-relaxed text-t3"><span className="font-semibold">Route: </span>{item.route}</p></div></article>; })}</div>
      <div className="mt-6 rounded-card border border-border-default bg-white p-5"><p className="text-f14 leading-relaxed text-t2">The detailing changes, reference projects and approval route for each market are on the <Link href="/resources/gfrp-rebar-applications" className="font-semibold text-teal-text underline">GFRP rebar applications</Link> page; the same logic applies to a basalt bar with the standards swapped for ASTM D8505 and CSA S807.</p></div>
    </ProductSection>

    <ProductSection id="specifications" title="One modulus class, 11 sizes, and the published values" tone="muted" count={`${catalog.diameters.length} diameters`} intro="One grade covers the range: a 50 GPa modulus class with a 1,100 MPa strength class up to Ø12 mm and 1,000 MPa at Ø25 mm. The size ladder and the table are inquiry sizes; the nominal capacities are area multiplied by the published class, not guaranteed forces. The offered size's qualification report states what a delivered bar actually guarantees.">
      <div className="grid items-start gap-7 lg:grid-cols-[1.35fr_1fr]">
        <Figure number={20} title="11 diameters to one scale" caption="Ø3 to Ø25 mm with the calculated unit mass; Ø6–Ø10 mm bars also ship as coils." bleed><Plate src={catalog.images.sizeLadder} alt="Eleven basalt FRP rebar diameters from 3 to 25 mm drawn to one scale with calculated unit mass in kilograms per metre" /></Figure>
        <div className="overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[320px] text-left text-f14"><caption className="border-b border-border-default px-5 py-4 text-left font-semibold text-t1">Manufacturer&apos;s published values, as classes</caption><tbody>{catalog.published.map(row => <tr key={row.property} className="border-t border-border-default align-top"><th scope="row" className="px-4 py-3 font-semibold text-t1">{row.property}</th><td className="px-4 py-3 text-t2">{row.value}<span className="mt-1 block text-f12 text-t3">{row.basis}</span></td></tr>)}</tbody></table></div></div>
      </div>
      <div className="mt-7 grid items-start gap-7 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[520px] text-left text-f14"><caption className="border-b border-border-default px-5 py-4 text-left font-semibold text-t1">Inquiry sizes with nominal area, calculated mass and nominal tensile capacity</caption><thead className="bg-bg2"><tr><th scope="col" className="px-4 py-2 font-semibold text-t1">Ø mm</th><th scope="col" className="px-4 py-2 font-semibold text-t1">Area mm²</th><th scope="col" className="px-4 py-2 font-semibold text-t1">Mass kg/m</th><th scope="col" className="px-4 py-2 font-semibold text-t1">Class MPa</th><th scope="col" className="px-4 py-2 font-semibold text-t1">Nominal kN</th><th scope="col" className="px-4 py-2 font-semibold text-t1">Form</th></tr></thead><tbody>{sizeRows.map(row => <tr key={row.d} className="border-t border-border-default"><th scope="row" className="px-4 py-2 font-semibold text-t1">{row.d}</th><td className="px-4 py-2 text-t2">{fixed(row.area, 1)}</td><td className="px-4 py-2 text-t2">{fixed(row.mass, 3)}</td><td className="px-4 py-2 text-t2">{row.cls.toLocaleString("en-US")}</td><td className="px-4 py-2 text-t2">{fixed(row.capacity, 0)}</td><td className="px-4 py-2 text-t3">{row.coil ? "Bar or coil" : "Straight bar"}</td></tr>)}</tbody></table></div><p className="border-t border-border-default px-5 py-3 text-f12 leading-relaxed text-t3">Mass calculated at {BFRP_MASS_DENSITY_GCM3} g/cm³, which matches the manufacturer&apos;s published g/m. Nominal kN is area × published class (1,000 MPa taken for Ø14 and above pending the size report). ASTM D8505 and CSA S807 guarantee per size from the qualification report; a nominal value is not a design value.</p></div>
        <div className="grid gap-5">
          <div className="overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[280px] text-left text-f14"><caption className="border-b border-border-default px-5 py-4 text-left font-semibold text-t1">Manufacturer&apos;s strength-equivalent substitution guide</caption><thead className="bg-bg2"><tr><th scope="col" className="px-4 py-2 font-semibold text-t1">Steel bar</th><th scope="col" className="px-4 py-2 font-semibold text-t1">BFRP bar of equal tensile capacity</th></tr></thead><tbody>{catalog.substitution.map(row => <tr key={row.steel} className="border-t border-border-default"><th scope="row" className="px-4 py-2 font-semibold text-t1">{row.steel}</th><td className="px-4 py-2 text-t2">{row.bfrp}</td></tr>)}</tbody></table></div><p className="border-t border-border-default px-5 py-3 text-f12 leading-relaxed text-warn">Equates ultimate tensile capacity only. FRP designs are governed by crack width, deflection, bond and sustained load under ACI 440.1R, CSA S806 or the adopted code, which usually need more bar area than this table gives. The project designer decides; do not substitute from this table.</p></div>
          <div className="rounded-card border border-border-default bg-white p-5"><h3 className="text-f16 font-bold text-t1">Confirm with the quotation</h3><p className="mt-2 text-f14 leading-relaxed text-t2">Surface type (helical wrap or sand coating), resin, measured area, tolerance, unit mass, straight length or coil, and the guaranteed tensile force and modulus per size with the standard and edition tested.</p></div>
        </div>
      </div>
    </ProductSection>

    <ProductSection id="standards" title="Standards by market: what to name in the specification" intro="The product standard fixes the bar, the design code fixes how it is used, and an approval names one producer. Basalt has a product standard in the United States and Canada but not a building code of its own in the US, which is the difference from glass that decides most projects.">
      <div className="grid gap-5 md:grid-cols-3">{catalog.standards.map((item, i) => <div key={item.layer} className="rounded-card border border-border-default bg-bg2 p-5"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Layer {i + 1}</p><h3 className="mt-1 text-f16 font-bold text-t1">{item.layer}</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{item.text}</p></div>)}</div>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{catalog.documents.map((item, i) => <article key={item.title} className="rounded-card border border-border-default bg-white p-5"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">0{i + 1}</p><h3 className="mt-1 text-f16 font-bold text-t1">{item.title}</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{item.detail}</p></article>)}</div>
      <div className="mt-5 flex flex-wrap gap-x-6 text-f14 font-bold text-teal-text"><Link href="/resources/gfrp-rebar-standards" className="inline-flex min-h-10 items-center">FRP rebar standards crosswalk →</Link><Link href="/resources/blog/basalt-rebar-vs-fiberglass-rebar" className="inline-flex min-h-10 items-center">Which standards cover basalt and glass →</Link></div>
    </ProductSection>

    <ProductSection id="manual" title="Download the F1 basalt FRP rebar product manual" tone="deep">
      <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-f16 leading-relaxed text-white/90">{basaltRebarManual.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4"><a href={basaltRebarManual.file} className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-f14 font-bold text-teal-text" download>Download the manual ({basaltRebarManual.format}, {basaltRebarManual.size})</a><Link href="/resources/downloads" className="inline-flex min-h-11 items-center text-f14 font-bold text-white underline underline-offset-4">All downloads</Link></div>
          <p className="mt-4 text-f12 leading-relaxed text-white/70">The manual restates this page: published values as classes, the size table, the substitution guide with its caveats, standards, handling and the ordering checklist. It is not a qualification report; the report for the offered size travels with the quotation.</p>
        </div>
        <ul className="grid gap-2 text-f14 text-white/90">{["Published properties and what they mean", "11 sizes: area, mass, nominal capacity, coils", "Steel substitution guide and why not to use it alone", "ASTM D8505, CSA S807, ISO 10406-1 and the US code gap", "Handling, cutting, placing and the ordering checklist"].map(item => <li key={item} className="rounded-card border border-white/20 bg-white/5 px-4 py-2">{item}</li>)}</ul>
      </div>
    </ProductSection>

    <ProductSection id="pricing" title="How basalt rebar is priced, and what moves the number" intro="Quotations are built per metre or per bar for a schedule, and per tonne or per container for a repeating program. Price per kilogram alone misleads: a tonne of BFRP is about four times the length of a tonne of steel.">
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-card border border-border-default bg-bg2 p-6"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Reference range · observed {catalog.pricing.observed}</p><p className="mt-3 text-f16 leading-relaxed text-t1">{catalog.pricing.range}</p><p className="mt-3 text-f14 leading-relaxed text-t2">These are public references on one date, not quotations. The project price is the one in the RFQ response, built from the drivers on the right.</p></div>
        <ol className="grid gap-4 sm:grid-cols-2">{catalog.pricing.drivers.map((driver, i) => <li key={driver.title} className="rounded-card border border-border-default bg-bg2 p-5"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Driver {i + 1}</p><h3 className="mt-1 text-f16 font-bold text-t1">{driver.title}</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{driver.text}</p></li>)}</ol>
      </div>
    </ProductSection>

    <ProductSection id="delivery" title="Export packing, container loading and documents" tone="muted" intro="Compare quotations by the required bars and the agreed delivery scope. Freight is bought per container: diameter and packing decide how many tonnes fit, and bar length decides the equipment.">
      <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Figure number={21} title="40 ft high-cube loading" caption="Straight bars up to about 11.8 m, roughly 12 to 20 t per container depending on diameter and packing; Ø6–Ø10 mm bars travel as coils." bleed><Plate src="/images/covers/blog/gfrp-rebar-container-loading.webp" alt="Side-view schematic of a 40 ft high-cube container loaded with strapped FRP rebar bundles and a coil at the door end" /></Figure>
        <div className="grid gap-4">
          <article className="rounded-card border border-border-default bg-white p-5"><h3 className="text-f16 font-bold text-t1">Lengths and equipment</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{catalog.export.lengths}</p></article>
          <article className="rounded-card border border-border-default bg-white p-5"><h3 className="text-f16 font-bold text-t1">Coils for small diameters</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{catalog.export.coils}</p></article>
          <article className="rounded-card border border-border-default bg-white p-5"><h3 className="text-f16 font-bold text-t1">Bundles and labels</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{catalog.export.packing}</p></article>
        </div>
      </div>
      <div className="mt-6 rounded-card border border-border-default bg-white p-6"><h3 className="text-f18 font-bold text-t1">Documents that travel with the order</h3><ul className="mt-3 grid gap-2 text-f14 leading-relaxed text-t2 md:grid-cols-2">{catalog.export.documents.map(doc => <li key={doc} className="border-b border-border-default pb-2">{doc}</li>)}</ul></div>
    </ProductSection>

    <ProductSection id="installation" title="On site: lighter to place, cut with a blade, poured like steel" intro="A basalt mat goes down on the same chairs and the same grid as steel, with three differences the crew notices: a bundle is carried by one person, nothing is bent or welded on site, and the mat is tied down because it is light enough to float.">
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.1fr]">
        <ol className="grid gap-4">{catalog.installation.map((item, i) => <li key={item.title} className="flex gap-4 rounded-card border border-border-default bg-bg2 p-5"><span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {i + 1}</span><div><h3 className="text-f16 font-bold text-t1">{item.title}</h3><p className="mt-2 text-f14 leading-relaxed text-t2">{item.body}</p></div></li>)}</ol>
        <div className="grid gap-5">
          <Figure number={22} title="Pouring over the mat" note="Photo · see credits" caption={concrete.deckPour.shows} bleed><Photo photo={concrete.deckPour} sizes="(max-width: 1024px) 94vw, 50vw" /></Figure>
          <div className="grid gap-5 sm:grid-cols-2">
            <Figure number={23} title="Placing an FRP mat" caption="Nonmetallic chairs set the cover, ties hold the light mat against flotation; cover and laps come from the FRP design." bleed><Plate src="/images/covers/blog/gfrp-rebar-placement.webp" alt="Section schematic of FRP bars on nonmetallic chairs above formwork with cover, lap and a tie, and an arrow showing that untied mats can float" /></Figure>
            <Figure number={24} title="Cutting on site" caption="Diamond or abrasive blade with the bar supported on both sides; no shears, bolt cutters, heat or field bends." bleed><Plate src="/images/covers/blog/gfrp-rebar-cutting-tools.webp" alt="Schematic of an FRP bar supported on two blocks being cut with an abrasive blade, listing the tools and protection to use" /></Figure>
          </div>
        </div>
      </div>
    </ProductSection>

    <ProductSection id="faq" title="Basalt rebar purchasing questions" tone="muted" intro="Short answers to what buyers ask before a schedule exists: what it is, sizes, strength against fiberglass, substitution, standards, cost and the manual.">
      <FAQList items={[...catalog.faqs]} />
      <div className="mt-5 flex flex-wrap gap-x-6 text-f14"><Link href="/products/frp-rebar" className="inline-flex min-h-11 items-center font-bold text-teal-text">GFRP rebar, stirrups and mesh →</Link><Link href="/resources/gfrp-rebar-size-chart" className="inline-flex min-h-11 items-center font-bold text-teal-text">FRP rebar size chart →</Link></div>
      <aside id="photo-credits" className="mt-8 rounded-card border border-border-default bg-white p-5 text-f12 leading-relaxed text-t3">
        <h3 className="text-f14 font-bold text-t1">Photo credits</h3>
        <p className="mt-1">Figures 1, 3 and 4 are the manufacturer&apos;s photographs of the bar; Figures 5, 9, 20, 21, 23 and 24 are F1 Composite&apos;s own drawings. The quarry, fiber, construction and corrosion photographs are openly licensed works from Wikimedia Commons, cropped and re-encoded for this page; none shows an F1 project or the manufacturer&apos;s quarry, and the reinforcement in the construction scenes is steel.</p>
        <ul className="mt-2 columns-1 gap-6 md:columns-2">{creditedPhotos.map(photo => <li key={photo.src} className="break-inside-avoid"><a href={photo.credit.sourceHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.title}</a> by {photo.credit.author}, {photo.credit.licenseHref ? <a href={photo.credit.licenseHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.license}</a> : photo.credit.license}.</li>)}</ul>
      </aside>
    </ProductSection>

    <ProductSection id="quote" title="Quote basalt FRP rebar" tone="deep">
      <ProductRfq product="Basalt FRP rebar" productPath={catalog.path} quoteHref={quoteHref} items={requestItems} intro="Send your bar schedule or BOQ, the standard your project cites, the documents required and the destination." links={[{ label: "GFRP rebar", href: "/products/frp-rebar" }, { label: "Basalt vs fiberglass rebar", href: "/resources/blog/basalt-rebar-vs-fiberglass-rebar" }, { label: "Product manual (PDF)", href: basaltRebarManual.file }]} />
    </ProductSection>
  </>;
}
