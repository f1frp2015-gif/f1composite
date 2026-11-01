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
import { carbonFigures, carbonScenePhotos as scenes } from "@/content/data/carbonFiberScenes";
import type { ScenePhoto } from "@/content/data/frpRebar";
import { getPultrusionGuide } from "@/content/data/pultrusionGuides";
import { formatShortDate } from "@/lib/dates";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

// The specialist component page for CFRP strengthening strips, picture-led (2026-10-31). The
// sourced specification sections, standards, sources and brief items stay in the shared guide
// data (content/data/pultrusionAdvancedGuides.ts) and render through the shared components; this
// page adds the performance, placement, product and delivery material in front of them.
const page = getPultrusionGuide("product", "pultruded-cfrp-strengthening-strips")!;
const path = "/products/pultruded-cfrp-strengthening-strips";
const updated = "2026-10-31";
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
// Short section-bar labels for the guide's sourced specification sections.
const sectionLabels: Record<string, string> = { "geometry-and-delivery": "Drawing & delivery", "laminate-data": "Material data", "surface-and-kit": "Face & kit", "acceptance-and-traceability": "Acceptance" };

export const metadata: Metadata = buildPageMetadata({ title: page.title, description: page.description, path, image: `${path}/opengraph-image` });

const quoteHref = buildRfqHref({
  source: "pultrusion-guide-pultruded-cfrp-strengthening-strips",
  product: page.name,
  productPath: path,
  message: "Please review pultruded CFRP strengthening strips for my project.\nStrip schedule: width × thickness × length, quantity, tolerances:\nExternally bonded or near-surface-mounted; the member and the capacity to add:\nAdhesive system, bonding face and surface preparation required:\nMaterial data basis, test methods and acceptance evidence:\nDesign code and the engineer of record or kit supplier:\nDelivery format (cut lengths or coils), destination and date:",
});

// Why the strengthening market moved from bonded steel plates and section enlargement to CFRP strips.
const reasons = [
  { title: "A steel plate's tension at a tenth of the weight", lead: "A 50 × 1.4 mm strip carries about the ultimate tension of a 50 × 8 mm mild-steel plate. Two people carry a 10 m length; it goes up by hand from a scaffold and is pressed into fresh epoxy.", proof: "Strengthening-grade strips: 150–170 GPa modulus, 2,500–3,000 MPa tensile strength at 65–70% fiber volume. 70 mm² × 2,800 MPa ≈ 400 mm² × 490 MPa." },
  { title: "No added depth, no lost headroom", lead: "The strip adds 1.4 mm plus a 1–3 mm bond line to the soffit. The floor-to-ceiling height, the services and the finishes stay where they are; a steel plate or a concrete overlay would not allow that.", proof: "EB strips sit on the surface; NSM strips sit inside the existing cover in a 15–25 mm groove and add nothing at all." },
  { title: "It never rusts at the bond line", lead: "A bonded steel plate corrodes behind the adhesive where no inspection can see it. A carbon strip does not corrode, does not fatigue under traffic cycles, and keeps its stiffness for the life of the repair.", proof: "No electrochemical corrosion; high fatigue limit in tension along the fibers; creep rupture is checked on the adhesive, not the carbon." },
  { title: "Installed overnight, on a live building", lead: "Grind, prime, bond, cure: no welding, no bolting into tensioned bars, no crane, no shutdown. A strengthening crew can do a floor of beams between one working day and the next.", proof: "Hand tools and an epoxy that cures in hours; the structure keeps carrying its dead load throughout." },
];

// What the strip will not do on its own.
const limits = [
  { title: "The bond is the capacity", text: "The strip almost never breaks. The joint fails by peeling at a square-cut end, delaminating off weak or dusty concrete, or softening above the adhesive's glass transition. Substrate pull-off strength, surface preparation, anchorage length and end detail are the design." },
  { title: "Fire and impact are not the strip's job", text: "An EB strip is exposed. Fire rating comes from the existing member and any applied protection, and the strengthened capacity is usually limited so the member survives without the strip. NSM strips are inside the cover and better protected." },
  { title: "Strain is limited, so is the gain", text: "Codes cap the strip strain to stop debonding well before rupture, and cap the total strengthening so the unstrengthened member still carries a set share of the load. A strip typically adds tens of percent of flexural capacity, not multiples." },
  { title: "It is one part of an assessed kit", text: "The adhesive, the primer, the strip and the method are assessed together. A strip with the right numbers is still only a candidate until the system supplier and the engineer of record accept it; F1 supplies the strip to their specification, not the kit." },
];

// Where the strip is specified, with the photograph of the element and what to send.
const applications: Array<{ title: string; photo: ScenePhoto; why: string; typical: string; send: string }> = [
  { title: "Beams and slabs under a new load", photo: scenes.stripBonding, why: "A change of use, heavier equipment, a mezzanine, a new partition: the member needs more flexural capacity and the floor cannot get thicker. Strips on the tension face are the standard answer.", typical: "50–100 mm × 1.2–1.4 mm strips along the span, one to three per beam, lengths to the member", send: "The member and its drawings, the existing capacity, the new load case and the design code the engineer of record works to." },
  { title: "New openings in slabs and walls", photo: scenes.strengthening, why: "Cutting a stair or a service opening removes reinforcement. Strips bonded around the opening restore the load path across it without a steel frame.", typical: "50–80 mm strips along both edges of the opening, lapped past the corners", send: "The opening position and size, the slab reinforcement, and whether the strips can run on the top face, the soffit or both." },
  { title: "Corroded or missing reinforcement", photo: scenes.slabStrips, why: "Where chlorides or carbonation have taken bars out of service, strips replace the lost tensile steel on the face after the concrete is repaired, without breaking out the member.", typical: "Strips sized to the lost steel area; concrete repair mortar first, then the bond", send: "The condition survey, the repaired substrate's pull-off strength and the exposure the repair must survive." },
  { title: "Near-surface-mounted strips and bars", photo: scenes.nsmBars, why: "Where the surface will be trafficked, exposed to fire or impact, or where the member is a slab top rather than a soffit, the strip or a bar goes into a sawn groove and is bonded on three sides, inside the cover.", typical: "10–20 × 2–3 mm strips or Ø6–Ø10 bars in 15–25 mm grooves; 2–3 times the bond of an EB strip", send: "Cover depth and bar positions from a scan, the groove layout, and the adhesive the system specifies for grooves." },
];

/** A schematic plate at the 8:5 ratio the drawn figures are made in. */
function Plate({ src, alt }: { src: string; alt: string }) {
  return <div className="relative aspect-[8/5] bg-white"><Image src={src} alt={alt} fill sizes="(max-width: 1024px) 94vw, 50vw" className="object-contain" /></div>;
}

/** An openly licensed photograph that fills its plate; the credit is listed at the end of the page. */
function Photo({ photo, sizes = "(max-width: 1024px) 94vw, 33vw", preload = false }: { photo: ScenePhoto; sizes?: string; preload?: boolean }) {
  return <div className="relative aspect-[8/5] bg-bg2"><Image src={photo.src} alt={photo.alt} fill sizes={sizes} preload={preload} className="object-cover" /></div>;
}

const creditedPhotos: ScenePhoto[] = [scenes.stripBonding, scenes.strip14, scenes.slabStrips, ...applications.map(item => item.photo), scenes.plate5PeelPly, scenes.udFabricRoll, scenes.stripCoil].filter((photo, i, all) => all.findIndex(other => other.src === photo.src) === i);

export default function CfrpStrengtheningStripsPage() {
  const nav = [
    { id: "performance", label: "Why a strip" },
    { id: "placement", label: "EB or NSM" },
    { id: "bond", label: "The bond" },
    { id: "applications", label: "Applications" },
    { id: "product", label: "The strip" },
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
        image: absoluteUrl(scenes.stripBonding.src),
        publisher: { "@id": "https://www.f1composite.com/#organization" },
        citation: page.sources.map((source) => source.url),
      }} />
      <PageHeader
        tag="Specialist component specification"
        title="Pultruded CFRP strengthening strips: a steel plate's tension at a tenth of the weight, bonded on by hand"
        description="A pultruded carbon strip bonded to the tension face of a concrete beam, slab or wall adds flexural capacity without adding depth, weight or a crane: 150–170 GPa class stiffness and 2,500–3,000 MPa strength in a 1.2–1.4 mm laminate that two people carry and press into fresh epoxy. F1 Composite pultrudes strips to the width, thickness and cut length the strengthening system and the engineer of record specify, with the laminate data, bonding face and batch records they ask for. The system, the adhesive and the design remain theirs."
        updated={updated}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Carbon fiber pultrusion", href: "/products/pultrusion-carbon-fiber" }, { label: page.name }]}
        facts={[{ label: "EB strips", value: "50–120 × 1.2–1.4 mm class" }, { label: "Stiffness along the fibers", value: "150–170 GPa class" }, { label: "Weight, same tension", value: "≈ 1/10 of a steel plate" }, { label: "Supply", value: "Cut lengths or coils, to the schedule" }]}
        actions={{ primary: { label: "Discuss your strip specification", href: quoteHref }, secondary: { label: "See the numbers", href: "#performance", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="A strip going onto a beam" note="Photo · see credits" bleed caption={scenes.stripBonding.shows}><Photo photo={scenes.stripBonding} sizes="(max-width: 1023px) 94vw, 44vw" preload /></Figure>}
      />
      <PageNav items={nav} />

      <PageSection id="performance" title="What a bonded carbon strip does that a steel plate cannot, and what it will not do" intro="Externally bonded strengthening used to mean a steel plate, bolted and glued to the soffit, rusting where nobody could see it. A pultruded carbon strip does the same job at a tenth of the weight, without corrosion, from a scaffold with hand tools. The numbers are class values for strengthening-grade strips; the strip's qualification report is what the designer uses.">
        <div className="grid gap-[20px] md:grid-cols-3">
          <Figure number={2} title="The strip" note="Photo · see credits" caption={scenes.strip14.shows} bleed><Photo photo={scenes.strip14} /></Figure>
          <Figure number={3} title="Stiffness per unit mass" caption="Unidirectional pultruded carbon against aluminium, steel and E23 fiberglass. Same mass, about 3.4 times the stiffness of the metals along the fibers; a strengthening-grade strip sits at the top of the carbon range." bleed><Plate src={carbonFigures.specificStiffness.src} alt={carbonFigures.specificStiffness.alt} /></Figure>
          <Figure number={4} title="On the slab" note="Photo · see credits" caption={scenes.slabStrips.shows} bleed><Photo photo={scenes.slabStrips} /></Figure>
        </div>
        <div className="mt-[32px] grid gap-[20px] md:grid-cols-2 xl:grid-cols-4">{reasons.map((reason, i) => <article key={reason.title} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Reason {i + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{reason.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{reason.lead}</p><p className="mt-[12px] border-t border-border-default pt-[12px] text-f12 leading-relaxed text-t3">{reason.proof}</p></article>)}</div>
        <div className="mt-[32px] grid gap-[16px] sm:grid-cols-2 xl:grid-cols-4">{limits.map(limit => <article key={limit.title} className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">{limit.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{limit.text}</p></article>)}</div>
      </PageSection>

      <PageSection id="placement" title="Externally bonded, near-surface-mounted, or a steel plate" tone="muted" intro="The same beam can be strengthened three ways. The strip's numbers are the same in two of them; where it sits decides the bond, the protection and the site work.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={5} title="Three ways to add tension to a beam" caption="An externally bonded strip on the soffit, a near-surface-mounted strip or bar in a sawn groove, and the bonded steel plate CFRP replaced. Sizes are the ranges strengthening systems publish; the design is to ACI 440.2R / 440.13, fib Bulletin 90 or TR55 by the engineer of record." bleed><Plate src={carbonFigures.strengtheningSections.src} alt={carbonFigures.strengtheningSections.alt} /></Figure>
          <div className="grid gap-[16px]">
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Externally bonded (EB)</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">The default. No groove, fastest to install, the whole strip face is bond area. Exposed, so fire and impact are handled by the member and the design limits, and the ends need a taper, a clamp or a U-wrap to stop peel.</p></div>
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Near-surface-mounted (NSM)</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">A narrow strip or a bar in a sawn groove, bonded on three sides, inside the cover: two to three times the bond of an EB strip, protected from traffic and fire, and the only option on a slab top that will be walked on. Needs 15–25 mm of sound concrete below the existing bars.</p></div>
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Wet lay-up fabric instead</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">Dry unidirectional fabric laid on site with epoxy follows a curved surface, wraps a column or forms a U-jacket. For a flat tension face a pultruded strip is the same fiber at a higher, more uniform fiber content with none of the site lay-up risk.</p></div>
          </div>
        </div>
      </PageSection>

      <PageSection id="bond" title="The bond is the design" intro="A strip adds capacity only through its bond line. The strip almost never fails; the adhesive peels off a square-cut end, delaminates from weak concrete or softens above its glass transition. The drawing, the surface preparation and the end detail are where the engineering goes.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={6} title="A strip bonded to a member" caption="Fibers along the member, prepared face down, a 1–3 mm thixotropic epoxy bond line, anchorage past the point where the strip is needed, tapered or clamped ends. The seven items the joint needs on the drawing are listed on the figure." bleed><Plate src={carbonFigures.bondLine.src} alt={carbonFigures.bondLine.alt} /></Figure>
          <div className="grid gap-[16px]">
            <Figure number={7} title="The bonding face" note="Photo · see credits" caption={scenes.plate5PeelPly.shows} bleed><Photo photo={scenes.plate5PeelPly} sizes="(max-width: 1024px) 94vw, 40vw" /></Figure>
            <div className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f16 font-bold text-t1">Who owns what</h3><ul className="mt-[8px] space-y-[6px] text-f14 leading-relaxed text-t2">{["Engineer of record: the capacity to add, strain limits, anchorage, the code", "System supplier: the adhesive, primer, method statement and the assessed kit", "Installer: substrate preparation, pull-off tests, bond-line thickness, records", "F1 Composite: the strip to the specified width, thickness, face and length, with laminate data and batch records"].map(item => <li key={item}>· {item}</li>)}</ul></div>
          </div>
        </div>
      </PageSection>

      <PageSection id="applications" title="Where a strengthening strip is specified" tone="muted" intro="Four cases account for most strip orders. The photographs show the element, not an F1 project; the strips in them were supplied by the strengthening contractors who took the pictures.">
        <div className="grid gap-[24px] md:grid-cols-2">{applications.map(item => <article key={item.title} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white"><Photo photo={item.photo} sizes="(max-width: 768px) 94vw, 47vw" /><div className="flex flex-1 flex-col p-[20px]"><p className="text-f12 leading-relaxed text-t3">{item.photo.shows}</p><h3 className="mt-[12px] text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{item.why}</p><dl className="mt-[16px] grid gap-[10px] text-f14 leading-relaxed sm:grid-cols-[auto_1fr]"><dt className="font-semibold text-teal-text">Typical</dt><dd className="text-t2">{item.typical}</dd><dt className="font-semibold text-t1">What to send</dt><dd className="text-t2">{item.send}</dd></dl></div></article>)}</div>
        <p className="mt-[24px] text-f14 leading-relaxed text-t2">The application guide, with the intervention logic, reinforcement position, installation planning and acceptance records, is on the <Link href="/applications/cfrp-concrete-strengthening" className={linkStyle}>CFRP concrete strengthening</Link> page. Wider flat laminates for spar caps and stiffeners are on the <Link href="/products/pultruded-carbon-fiber-plates" className={linkStyle}>pultruded carbon fiber plates</Link> page.</p>
      </PageSection>

      <PageSection id="product" title="The strip itself: what F1 pultrudes and how it ships" intro="A strengthening strip is the simplest carbon profile: unidirectional tow, an epoxy or vinyl ester matrix, pulled flat through a die at the highest fiber content pultrusion reaches, with the bonding face finished as the system specifies.">
        <div className="grid gap-[20px] md:grid-cols-3">
          <Figure number={8} title="Pultruded strip, not laid-up fabric" note="Photo · see credits" caption={scenes.udFabricRoll.shows} bleed><Photo photo={scenes.udFabricRoll} /></Figure>
          <Figure number={9} title="Coiled for transport" note="Photo · see credits" caption={scenes.stripCoil.shows} bleed><Photo photo={scenes.stripCoil} /></Figure>
          <div className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f16 font-bold text-t1">On the order</h3><ul className="mt-[8px] space-y-[6px] text-f14 leading-relaxed text-t2">{["Width and thickness to the schedule: 50–120 × 1.2–1.4 mm class for EB, 10–20 × 2–3 mm for NSM; other sections to drawing", "Bonding face: peel ply, abraded or as pultruded, on the face you name", "Laminate data in the fiber direction to ISO 10406-3 or ASTM D7205, with the basis stated", "Cut lengths labelled by mark, or coils for long strips; packed flat or coiled", "Batch records linking each strip to its laminate and inspection evidence"].map(item => <li key={item}>· {item}</li>)}</ul></div>
        </div>
        <p className="mt-[20px] text-f14 leading-relaxed text-t2">Class values on this page are published ranges for strengthening-grade unidirectional carbon strips (ACI 440.2R, supplier datasheets); they are not an F1 datasheet, stock list or kit approval. The sections below say how to turn them into a purchase specification.</p>
      </PageSection>

      {page.sections.map((section, index) => <GuideSection key={section.id} page={page} section={section} tone={index % 2 === 0 ? "muted" : "white"} />)}

      <PageSection id="standards" title="Standards, regulations and acceptance evidence" intro="The project authority determines the governing jurisdiction and adopted edition. The scope of each reference matters: a material test method, a design guide and an assessment route each cover a different part of the strengthening system.">
        <GuideStandards page={page} />
        <p className="mt-[20px] max-w-[880px] text-f14 leading-relaxed text-t3">Public source scopes were reviewed on <time dateTime={updated}>{formatShortDate(updated)}</time>. These references do not establish that any F1 product is approved, listed or part of an assessed kit.</p>
      </PageSection>

      <PageSection id="faq" title={`${page.name}: practical questions`} tone="muted">
        <FAQList items={[
          { question: "How much capacity does a strip add?", answer: "Typically tens of percent of flexural capacity, not multiples. Codes cap the strip strain to stop debonding well before rupture and cap the total strengthening so the unstrengthened member still carries a set share of the load (ACI 440.2R limits the strengthened member to a fraction of the new load without the strip). The engineer of record sets the number; the strip's modulus and the bond decide whether it is reachable." },
          { question: "Externally bonded or near-surface-mounted?", answer: "EB on a soffit or a wall face where nothing touches it: fastest, cheapest, the whole face is bond area. NSM where the surface is trafficked, exposed to fire or impact, or is a slab top: a narrow strip or a bar in a sawn groove, bonded on three sides inside the cover, with two to three times the bond of an EB strip. NSM needs 15–25 mm of sound concrete below the existing bars." },
          { question: "Why a pultruded strip rather than wet lay-up fabric?", answer: "For a flat tension face the strip is the same carbon at a higher and more uniform fiber content, already cured, with a controlled thickness and bonding face; the site crew bonds a finished laminate instead of impregnating fabric overhead. Fabric wins on curved surfaces, column wraps and U-jackets, where a strip cannot follow the shape." },
          ...page.faqs,
        ]} />
        <aside id="photo-credits" className="mt-[32px] rounded-card border border-border-default bg-white p-[20px] text-f12 leading-relaxed text-t3">
          <h3 className="text-f14 font-bold text-t1">Photo credits</h3>
          <p className="mt-[4px]">Figures 3, 5 and 6 are F1 Composite&apos;s own drawings. The photographs are openly licensed works from Wikimedia Commons, cropped and re-encoded for this page; none shows an F1 part or project. The site and product photographs were taken by a strengthening contractor of its own work and products.</p>
          <ul className="mt-[8px] columns-1 gap-[24px] md:columns-2">{creditedPhotos.map(photo => <li key={photo.src} className="break-inside-avoid"><a href={photo.credit.sourceHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.title}</a> by {photo.credit.author}, {photo.credit.licenseHref ? <a href={photo.credit.licenseHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.license}</a> : photo.credit.license}.</li>)}</ul>
        </aside>
      </PageSection>

      <PageSection id="sources" title="Technical sources and further reading" intro="Industry sources establish where the strip is used. Authority sources define the published scope of standards and assessment routes. The design responsibility stays with the engineer of record and the system supplier.">
        <GuideSources page={page} />
      </PageSection>

      <PageSection id="quote" title="Prepare a strip qualification brief" tone="deep">
        <ProductRfq
          product={page.name}
          productPath={path}
          quoteHref={quoteHref}
          quoteLabel="Send your strip schedule"
          intro="Send the strip schedule, the placement, the adhesive system and the evidence the designer needs so we can confirm the section, the laminate data, the bonding face and the supply scope."
          items={page.specification.map((item, index) => ({ title: `${String(index + 1).padStart(2, "0")} · ${item}` }))}
          links={page.related.slice(0, 3)}
        />
      </PageSection>
      <RelatedLinks title="Continue the specification" groups={[{ title: "Products and application guidance", links: [...page.related, { href: "/products/pultruded-carbon-fiber-plates", label: "Pultruded carbon fiber plates" }, { href: "/products/pultrusion-carbon-fiber", label: "Carbon fiber pultrusion overview" }] }]} />
    </>
  );
}
