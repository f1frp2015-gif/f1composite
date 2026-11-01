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

// The specialist component page for carbon-fiber roller tubes, picture-led (2026-11-01). The
// sourced specification sections, standards, sources and brief items stay in the shared guide
// data (content/data/pultrusionPrecisionGuides.ts) and render through the shared components; this
// page adds the performance, which-roll, anatomy and delivery material in front.
const page = getPultrusionGuide("product", "carbon-fiber-roller-tubes")!;
const path = "/products/carbon-fiber-roller-tubes";
const updated = "2026-11-01";
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";
// Short section-bar labels for the guide's sourced specification sections.
const sectionLabels: Record<string, string> = { "shell-drawing": "Shell drawing", "construction-and-inputs": "Duty & construction", "finishing-and-assembly": "Finishing scope", "acceptance-stages": "Acceptance" };

export const metadata: Metadata = buildPageMetadata({ title: page.title, description: page.description, path, image: `${path}/opengraph-image` });

const quoteHref = buildRfqHref({
  source: "pultrusion-guide-carbon-fiber-roller-tubes",
  product: page.name,
  productPath: path,
  message: "Please review a carbon-fiber roller shell for my machine.\nRoll type: idler / guide / spreader / driven; web material and width:\nShell OD, wall or ID, face length, bearing span:\nSpeed, radial load, torque if driven, temperature and cleaning exposure:\nEnd fittings and journals: who designs and fits them; bonded or clamped:\nSurface: bare, coated, ground; static control requirements:\nDelivered condition (shell blank / machined / with fittings), quantities and date:",
});

// Why a long, fast roll ends up as a carbon shell.
const reasons = [
  { title: "A fifth of the mass, so it starts and stops with the web", lead: "An idler has to be spun by the web passing over it. A shell at a fifth of steel's mass accelerates on a lighter web, slips less at speed changes and scuffs the surface less.", proof: "Mass goes with density: 1.55 g/cm³ against 7.85 for steel and 2.70 for aluminium, same shell geometry. Class values; the offered laminate governs." },
  { title: "Twice the critical speed, or twice the length", lead: "A roller's first critical speed goes with √(E/ρ). Carbon is the only shell material that raises it: a wider machine at the same speed, or the same roll faster, without a bigger diameter.", proof: "√(130/1.55) against √(200/7.85): 1.8 × steel. Aluminium's E/ρ is the same as steel's, so an aluminium roll saves mass and changes nothing else." },
  { title: "A third of the sag under its own weight", lead: "A long undriven roll bends under its own mass and the web tracks the low point. Carbon's ρ/E is a third of steel's: a straighter face across the width, fewer wrinkles, less steering.", proof: "Self-weight deflection ∝ ρ/E: (1.55/130) against (7.85/200) = 0.30. Same for aluminium as for steel." },
  { title: "Dimensionally stable, and it does not rust", lead: "Near-zero expansion along the shell holds the face length and the journal fits through a warm hall; the laminate does not corrode in a damp paper machine or a washdown converting line.", proof: "About −1 to +1 ×10⁻⁶/°C along the fibers; no electrochemical corrosion. The journals, fittings and coating still need their own corrosion review." },
];

// What a carbon shell will not do on its own.
const limits = [
  { title: "The shell is not the roller", text: "A carbon tube becomes a roller only with journals, end flanges, a bond or a clamp, a surface and a balance. Each of those is designed, supplied and accepted separately; a tube inspection report says nothing about the rotor." },
  { title: "Fibers along the shell, not around it", text: "A pultruded shell has every fiber along its length. Torque in a driven roll, nip pressure, a clamped journal and local crushing load the resin-dominated directions. Driven and nip rolls need a pull-wound wall or a hybrid construction, not a thicker pultrusion." },
  { title: "The face is the process", text: "Web contact, static, heat and cleaning chemicals act on the surface, not the laminate. Bare carbon is rarely the working face; a coating, a sleeve or a ground finish is specified with the roll, and it changes the shell's dimensions and balance." },
  { title: "Balance is measured on the rotor", text: "ISO 21940 balance grades apply to the assembled rotor with its journals, fittings and coating at service speed. A bare shell cannot be balanced to a grade, and a balanced shell is unbalanced again after fittings are bonded on." },
];

// Which rolls on which machine go to carbon, with the photograph of the machine.
const rolls: Array<{ title: string; photo: ScenePhoto; member: string; why: string; typical: string; send: string }> = [
  { title: "Paper machines and winders", photo: scenes.paperReel, member: "Guide, lead and spreader rolls between the reel and the winder", why: "The widest and fastest webs in industry. A carbon guide roll spans 8–10 m at a fraction of the sag and a higher critical speed, which is the only way to keep the diameter down at the width.", typical: "Ø150–Ø400 mm shells, 4–10 m face, bonded steel journals", send: "Face length, bearing span, web tension and speed, wrap angle, the journal interface and the mill's balance grade." },
  { title: "Web offset and gravure presses", photo: scenes.pressFolder, member: "Idlers, turner bars and guide rolls in the web path", why: "A newspaper or magazine press threads a web over dozens of undriven rolls on its way to the folder. Light carbon idlers follow speed changes without slipping and leave the register alone.", typical: "Ø80–Ø200 mm, 1–3 m face, often with a ground or coated surface", send: "Web width and speed, the roll positions that smear or slip today, the surface the ink needs, and the frame interface." },
  { title: "Film, foil and converting lines", photo: scenes.pressCylinders, member: "Idler, dancer and layon rolls between unwind and rewind", why: "Thin films and foils are the most sensitive to roll inertia and sag: a heavy idler stretches or scuffs the web at every speed change. Carbon idlers are the standard answer in slitters, laminators and coaters.", typical: "Ø60–Ø250 mm, 0.5–4 m face, static-dissipative or chrome-finished surfaces", send: "Web material, thickness and tension, line speed and acceleration, surface and static requirements, bearing arrangement." },
  { title: "Textile, nonwoven and battery lines", photo: scenes.steelCalender, member: "Guide and spreader rolls, not the calender nip", why: "Where the roll carries the web, carbon pays; where the roll carries the process force, it stays steel. The seven-tonne calender rolls in the picture press the electrode; the rolls that lead the web in and out of them are the carbon case.", typical: "Ø100–Ø300 mm, 1–4 m face, with or without a bowed or grooved spreader surface", send: "Which rolls carry web only, the web width and speed, cleanroom or dry-room conditions and the surface spec." },
];

/** A schematic plate at the 8:5 ratio the drawn figures are made in. */
function Plate({ src, alt }: { src: string; alt: string }) {
  return <div className="relative aspect-[8/5] bg-white"><Image src={src} alt={alt} fill sizes="(max-width: 1024px) 94vw, 50vw" className="object-contain" /></div>;
}

/** An openly licensed photograph that fills its plate; the credit is listed at the end of the page. */
function Photo({ photo, sizes = "(max-width: 1024px) 94vw, 33vw", preload = false }: { photo: ScenePhoto; sizes?: string; preload?: boolean }) {
  return <div className="relative aspect-[8/5] bg-bg2"><Image src={photo.src} alt={photo.alt} fill sizes={sizes} preload={preload} className="object-cover" /></div>;
}

const creditedPhotos: ScenePhoto[] = [scenes.pressFolder, scenes.rubberMill, scenes.brokenPole, ...rolls.map(item => item.photo), scenes.rollerAnatomy, scenes.drilledHole, scenes.plateEdge].filter((photo, i, all) => all.findIndex(other => other.src === photo.src) === i);

export default function CarbonFiberRollerTubesPage() {
  const nav = [
    { id: "performance", label: "Why carbon" },
    { id: "rolls", label: "Which roll" },
    { id: "anatomy", label: "Shell to rotor" },
    { id: "construction", label: "Construction" },
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
        image: absoluteUrl(scenes.pressFolder.src),
        publisher: { "@id": "https://www.f1composite.com/#organization" },
        citation: page.sources.map((source) => source.url),
      }} />
      <PageHeader
        tag="Specialist component specification"
        title="Carbon-fiber roller tubes: a fifth of the mass, a third of the sag, 1.8 times the critical speed"
        description="A pultruded carbon shell at the same diameter and wall as a steel roll weighs a fifth as much, sags a third as much under its own weight and runs to 1.8 times the critical speed. That is what a long idler, guide or spreader roll in a paper machine, press or converting line buys: a wider or faster web without a bigger diameter, and a roll that follows the web instead of slipping on it. F1 Composite pultrudes roller shells and shell blanks to the drawing, with controlled machining allowances and the laminate data the roller builder needs; the journals, bond, surface, balance and finished-rotor acceptance remain the roller builder's."
        updated={updated}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, { label: "Carbon fiber pultrusion", href: "/products/pultrusion-carbon-fiber" }, { label: page.name }]}
        facts={[{ label: "Mass, same shell", value: "≈ 20% of steel · 60% of aluminium" }, { label: "Critical speed", value: "≈ 1.8 × steel or aluminium" }, { label: "Self-weight sag", value: "≈ 0.3 × steel or aluminium" }, { label: "Supply", value: "Shell blank or machined, to drawing" }]}
        actions={{ primary: { label: "Discuss your roll", href: quoteHref }, secondary: { label: "See the numbers", href: "#performance", variant: "secondary" }, stickyMobile: true }}
        figure={<Figure number={1} title="Webs over guide rolls on a newspaper press" note="Photo · see credits" bleed caption={scenes.pressFolder.shows}><Photo photo={scenes.pressFolder} sizes="(max-width: 1023px) 94vw, 44vw" preload /></Figure>}
      />
      <PageNav items={nav} />

      <PageSection id="performance" title="What a carbon shell does for a roll, and what it will not do" intro="A roll that only carries the web is limited by three things: how much it weighs, how much it sags across the width, and how fast it can spin before it whips. All three depend on the shell material's stiffness divided by its density, which is why aluminium, with the same E/ρ as steel, saves weight and nothing else, and carbon changes all three. The numbers are class values for unidirectional pultruded carbon; the laminate's qualification report is the design basis.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={2} title="The same roller shell in three materials" caption="Same outside diameter, wall and length. Mass 1.0 / 0.34 / 0.20, self-weight sag 1.0 / 1.0 / 0.30, first critical speed 1.0 / 1.0 / 1.81 for steel, aluminium and pultruded carbon." bleed><Plate src={carbonFigures.rollerShell.src} alt={carbonFigures.rollerShell.alt} /></Figure>
          <div className="grid gap-[16px]">
            <Figure number={3} title="The steel roll it does not replace" note="Photo · see credits" caption={scenes.rubberMill.shows} bleed><Photo photo={scenes.rubberMill} sizes="(max-width: 1024px) 94vw, 40vw" /></Figure>
            <Figure number={4} title="Stiffness per unit mass" caption="Unidirectional pultruded carbon against aluminium, steel and E23 fiberglass: same mass, about 3.4 times the stiffness of the metals along the fibers." bleed><Plate src={carbonFigures.specificStiffness.src} alt={carbonFigures.specificStiffness.alt} /></Figure>
          </div>
        </div>
        <div className="mt-[32px] grid gap-[20px] md:grid-cols-2 xl:grid-cols-4">{reasons.map((reason, i) => <article key={reason.title} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Reason {i + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{reason.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{reason.lead}</p><p className="mt-[12px] border-t border-border-default pt-[12px] text-f12 leading-relaxed text-t3">{reason.proof}</p></article>)}</div>
        <div className="mt-[32px] grid items-start gap-[24px] lg:grid-cols-[1fr_1.6fr]">
          <Figure number={5} title="No yield, no warning" note="Photo · see credits" caption={scenes.brokenPole.shows} bleed><Photo photo={scenes.brokenPole} sizes="(max-width: 1024px) 94vw, 36vw" /></Figure>
          <div className="grid gap-[16px] sm:grid-cols-2">{limits.map(limit => <article key={limit.title} className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">{limit.title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{limit.text}</p></article>)}</div>
        </div>
        <div className="mt-[32px] overflow-hidden rounded-card border border-border-default bg-white"><div className="relative overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-left text-f14"><caption className="border-b border-border-default px-[20px] py-[16px] text-left font-semibold text-t1">Unidirectional pultruded carbon against the materials it replaces, property by property</caption><thead className="bg-bg2"><tr><th scope="col" className="px-[16px] py-[12px]">Property</th><th scope="col" className="px-[16px] py-[12px] text-teal-text">Pultruded CFRP</th><th scope="col" className="px-[16px] py-[12px]">Pultruded GFRP (E23)</th><th scope="col" className="px-[16px] py-[12px]">Aluminium 6061-T6</th><th scope="col" className="px-[16px] py-[12px]">Structural steel</th><th scope="col" className="px-[16px] py-[12px]">What it means for a roller shell</th></tr></thead><tbody>{carbonProperties.map(row => <tr key={row.property} className="border-t border-border-default align-top"><th scope="row" className="px-[16px] py-[12px] font-semibold text-t1">{row.property}</th><td className="px-[16px] py-[12px] leading-relaxed text-t1">{row.cfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.gfrp}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.aluminium}</td><td className="px-[16px] py-[12px] leading-relaxed text-t2">{row.steel}</td><td className="px-[16px] py-[12px] leading-relaxed text-t3">{row.note}</td></tr>)}</tbody></table></div><p className="border-t border-border-default p-[20px] text-f12 leading-relaxed text-t3">CFRP values are published class ranges for standard-modulus carbon at about 60% fiber volume (ACI 440.1R Table 3.1 and supplier datasheets); fiberglass is the EN 13706 E23 minimum F1 publishes for its glass profiles; metals are handbook values. None is a guarantee for a particular shell: the qualification report of the offered laminate, in the test direction that matters, is the number to design with.</p></div>
      </PageSection>

      <PageSection id="rolls" title="Which rolls go to carbon, and which stay steel" tone="muted" intro="The rule is short: a roll that only carries the web goes to carbon; a roll that carries the process force stays steel. Four kinds of line account for most carbon roller shells. The photographs show the machines, not an F1 part; the caption names the rolls a carbon shell replaces.">
        <div className="grid gap-[24px] md:grid-cols-2">{rolls.map(item => <article key={item.title} className="flex flex-col overflow-hidden rounded-card border border-border-default bg-white"><Photo photo={item.photo} sizes="(max-width: 768px) 94vw, 47vw" /><div className="flex flex-1 flex-col p-[20px]"><p className="text-f12 leading-relaxed text-t3">{item.photo.shows}</p><h3 className="mt-[12px] text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[4px] text-f14 font-semibold text-teal-text">{item.member}</p><p className="mt-[8px] text-f14 leading-relaxed text-t2">{item.why}</p><dl className="mt-[16px] grid gap-[10px] text-f14 leading-relaxed sm:grid-cols-[auto_1fr]"><dt className="font-semibold text-t1">Typical</dt><dd className="text-t2">{item.typical}</dd><dt className="font-semibold text-t1">What to send</dt><dd className="text-t2">{item.send}</dd></dl></div></article>)}</div>
        <p className="mt-[24px] text-f14 leading-relaxed text-t2">The engineering guide, with the roller duty, reinforcement for more than bending, web loads and rotor dynamics, surfaces, commissioning and maintenance, is on the <Link href="/applications/carbon-fiber-industrial-rollers" className={linkStyle}>industrial-roller application guide</Link>. Non-rotating machine members are a different product: see <Link href="/products/carbon-fiber-robotic-beams" className={linkStyle}>carbon-fiber robotic beams</Link>.</p>
      </PageSection>

      <PageSection id="anatomy" title="From shell to rotor: who does what" intro="A roller is a shell, two journals, the joint between them, a surface and a balance. F1 supplies the first of those and machines it to the drawing; the rest is the roller builder's, and the acceptance stages have to say so.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={6} title="What is inside a roll" note="Photo · see credits" caption={scenes.rollerAnatomy.shows} bleed><Photo photo={scenes.rollerAnatomy} sizes="(max-width: 1024px) 94vw, 56vw" /></Figure>
          <div className="grid gap-[12px]">
            {[
              ["Shell: F1", "Pultruded to OD, wall and length; ends cut square; machining allowances on the insertion zones and the face held as the drawing says. Laminate data in the fiber direction, lot record, packing on supports."],
              ["Journals and fittings: roller builder", "Steel or aluminium journals with bonded or clamped insertion into the shell ends. The fit, the adhesive, the retention under torque and the galvanic isolation are designed with the shell and qualified on the joint."],
              ["Surface: roller builder or coater", "Ground, coated, sleeved or bare, to the web's needs: roughness, release, static dissipation, cleaning resistance. The coating adds mass and changes the balance; specify it before the shell's nominal dimensions are frozen."],
              ["Balance and acceptance: rotor owner", "Balanced as the assembled rotor at service speed to the grade the machine needs (ISO 21940-11 or -12), with journals, fittings and coating in place. Final acceptance is in the machine, not on the bench."],
            ].map(([title, text]) => <div key={title} className="border-t-2 border-teal pt-[10px]"><h3 className="text-f16 font-bold text-t1">{title}</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">{text}</p></div>)}
          </div>
        </div>
      </PageSection>

      <PageSection id="construction" title="Pultruded, pull-wound or hybrid: the construction follows the duty" tone="muted" intro="Pultrusion puts every fiber along the shell, which is exactly what an idler wants and exactly what a driven or nip roll does not. Say what the roll does and the construction follows.">
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.3fr_1fr]">
          <Figure number={7} title="Fiber direction: pultruded against wound" caption="A 0° laminate carries bending and keeps the critical speed high at the lowest mass; ±45° and 90° plies add torsion and hoop capacity for driven rolls and clamped journals. Many commercial carbon rollers combine a pultruded core with wound layers." bleed><Plate src={carbonFigures.fiberDirection.src} alt={carbonFigures.fiberDirection.alt} /></Figure>
          <div className="grid gap-[12px]">
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Pultruded shell: idlers, guides, spreaders</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">Undriven, web-loaded, long and fast. All the stiffness in bending, the lowest mass, any length. Journals bonded into the ends carry the small torque the web applies.</p></div>
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Pull-wound or hybrid: driven and clamped rolls</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">Drive torque, clamped journals and local pressure need off-axis fibers in the wall. F1 confirms whether the construction is within its manufacturing scope or needs a specialist partner before any tooling commitment.</p></div>
            <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Steel: nip, calender and heated rolls</h3><p className="mt-[6px] text-f14 leading-relaxed text-t2">Where the roll presses the product, is heated through the wall or carries tonnes of nip force, it stays steel. Carbon takes the rolls around it that only carry the web.</p></div>
          </div>
        </div>
        <div className="mt-[24px] grid items-start gap-[24px] lg:grid-cols-[1fr_1fr_1.3fr]">
          <Figure number={8} title="What the laminate looks like, cut" note="Photo · see credits" caption={scenes.plateEdge.shows} bleed><Photo photo={scenes.plateEdge} /></Figure>
          <Figure number={9} title="A hole is a wound" note="Photo · see credits" caption={scenes.drilledHole.shows} bleed><Photo photo={scenes.drilledHole} /></Figure>
          <div className="rounded-card border border-border-default bg-white p-[20px]"><h3 className="text-f16 font-bold text-t1">Delivered condition: choose one on the order</h3><ul className="mt-[8px] space-y-[8px] text-f14 leading-relaxed text-t2">{["Shell blank: the tube to OD, wall and length with the agreed machining allowance, ends square, packed on supports", "Machined shell: insertion zones and face machined to the drawing datums; no cross-drilling unless the drawing allows it", "With fittings: journals bonded to the agreed procedure and inspected before the surface goes on, the joint design and its qualification owned by the roller builder or agreed as a joint program"].map(item => <li key={item}>· {item}</li>)}</ul><p className="mt-[12px] text-f12 leading-relaxed text-t3">Class values on this page are published ranges for unidirectional pultruded carbon; they are not an F1 datasheet, a stock roller series or a balance guarantee. The sections below say how to turn the shell into a purchase specification.</p></div>
        </div>
      </PageSection>

      {page.sections.map((section, index) => <GuideSection key={section.id} page={page} section={section} tone={index % 2 === 0 ? "white" : "muted"} />)}

      <PageSection id="standards" title="Standards, regulations and acceptance evidence" tone="muted" intro="The roller builder and the machine owner determine the balance grade and the acceptance route. A balance standard applies to the assembled rotor, not to a bare shell, and no profile inspection report closes it.">
        <GuideStandards page={page} />
        <p className="mt-[20px] max-w-[880px] text-f14 leading-relaxed text-t3">Public source scopes were reviewed on <time dateTime={updated}>{formatShortDate(updated)}</time>. These references do not establish that any F1 shell is balanced to a grade, or that a replacement roll keeps a machine&apos;s vibration performance.</p>
      </PageSection>

      <PageSection id="faq" title={`${page.name}: practical questions`}>
        <FAQList items={[
          { question: "How much longer or faster can a carbon roll go?", answer: "For the same diameter and wall, the first critical speed scales with √(E/ρ): about 1.8 times steel or aluminium with a standard-modulus pultruded shell. Since critical speed also falls with the square of the bearing span, the same margin lets the roll be about 35% longer at the same speed. These are shell ratios; journal mass, fittings and the coating pull the real rotor down, and the roller builder's calculation on the assembled rotor is the number that counts." },
          { question: "Why not aluminium? It is lighter than steel too.", answer: "Aluminium has a third of steel's mass but also a third of its stiffness, so E/ρ is the same: an aluminium roll sags exactly as much under its own weight and has the same critical speed as a steel one of the same geometry. It helps only with inertia. Carbon has four times the E/ρ, so it changes sag and critical speed as well as mass." },
          { question: "Can the shell be the working face?", answer: "Sometimes, for a dry, clean web where a ground laminate surface is acceptable. Most rolls get a coating, a sleeve or a ground finish specified for the web: release, roughness, static dissipation, cleaning resistance. The coating adds mass and thickness, so it is specified before the shell's nominal dimensions are frozen, and the roll is balanced with it on." },
          ...page.faqs,
        ]} />
        <aside id="photo-credits" className="mt-[32px] rounded-card border border-border-default bg-bg2 p-[20px] text-f12 leading-relaxed text-t3">
          <h3 className="text-f14 font-bold text-t1">Photo credits</h3>
          <p className="mt-[4px]">Figures 2, 4 and 7 are F1 Composite&apos;s own drawings. The photographs are openly licensed works from Wikimedia Commons, cropped and re-encoded for this page; none shows an F1 part or project, and the machines shown are not claimed to use F1 shells.</p>
          <ul className="mt-[8px] columns-1 gap-[24px] md:columns-2">{creditedPhotos.map(photo => <li key={photo.src} className="break-inside-avoid"><a href={photo.credit.sourceHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.title}</a> by {photo.credit.author}, {photo.credit.licenseHref ? <a href={photo.credit.licenseHref} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.license}</a> : photo.credit.license}.</li>)}</ul>
        </aside>
      </PageSection>

      <PageSection id="sources" title="Technical sources and further reading" tone="muted" intro="Industry sources establish where carbon rollers are used. Authority sources define the published scope of the geometry and balancing standards. The design responsibility stays with the roller builder and the machine owner.">
        <GuideSources page={page} />
      </PageSection>

      <PageSection id="quote" title="Prepare a roller shell brief" tone="deep">
        <ProductRfq
          product={page.name}
          productPath={path}
          quoteHref={quoteHref}
          quoteLabel="Send your roll brief"
          intro="Send the roll's duty, the shell drawing, the journal interface and the delivered condition you want, so we can confirm the construction, the laminate data, the machining scope and what the roller builder still has to qualify."
          items={page.specification.map((item, index) => ({ title: `${String(index + 1).padStart(2, "0")} · ${item}` }))}
          links={page.related.slice(0, 3)}
        />
      </PageSection>
      <RelatedLinks title="Continue the specification" groups={[{ title: "Products and application guidance", links: [...page.related, { href: "/products/pultruded-carbon-fiber-tubes", label: "Pultruded carbon fiber tubes" }, { href: "/products/pultrusion-carbon-fiber", label: "Carbon fiber pultrusion overview" }] }]} />
    </>
  );
}
