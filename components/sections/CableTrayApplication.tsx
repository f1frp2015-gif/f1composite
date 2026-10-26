import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import Button from "@/components/ui/Button";
import CoverCard from "@/components/ui/CoverCard";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import type { ApplicationPage } from "@/lib/applicationPages";
import { buildRfqHref } from "@/lib/rfq";

const rfqHref = buildRfqHref({
  source: "cable-tray-application",
  product: "FRP cable trays and cable ladders",
  productPath: "/applications/frp-cable-tray-supports",
  message: "Please review my FRP cable tray / cable ladder inquiry. Scope (raw support profiles, fabricated components, tray / ladder sections, or complete package): __. Width, depth and route length: __. Tray base / perforations or ladder rung spacing: __. Cable mass and future allowance: __. Support spacing and fixing structure: __. Chemicals and operating temperature: __. Fire / electrical / project standards and required evidence: __. Fittings, covers and fasteners, including items supplied by others: __. Drawing / BOM revision: __. Quantity, destination and required date: __. Please confirm availability, included documents and design responsibility for the offered configuration. Drawings can follow.",
});

const productFamilies = [
  {
    id: "frp-cable-trays", title: "FRP cable trays", label: "Continuous cable support",
    image: "/images/applications/frp-cable-tray-gray-product.webp",
    alt: "Gray fiberglass channel tray with a continuous base, ventilation slots and integral side walls",
    description: "Ventilated or solid-bottom channels for control, instrumentation and cable routes that need a supporting base.",
    selection: "Specify usable width, loading depth, base configuration and covers.",
    message: "Please quote FRP cable trays. Base (ventilated / solid): __. Width and loading depth: __. Section and route lengths: __. Cable mass, support span and environment: __. Covers and fittings: __. Quantity and destination: __.",
  },
  {
    id: "frp-cable-ladders", title: "FRP cable ladders", label: "Open rails and rungs",
    image: "/images/applications/frp-cable-ladder-gray-product.webp",
    alt: "Gray fiberglass cable ladder with two pultruded channel side rails and regularly spaced transverse rungs",
    description: "Open ladder sections for power cable routes where ventilation, drainage and access to cable restraints matter.",
    selection: "Specify rail depth, usable width, rung spacing and the load / span requirement.",
    message: "Please quote FRP cable ladders. Width and rail depth: __. Rung spacing and cable cleats: __. Section and route lengths: __. Cable mass, support span and environment: __. Fittings and covers: __. Quantity and destination: __.",
  },
  {
    id: "trunking", title: "Covered trays & trunking", label: "Base, lid and retention",
    image: "/images/applications/cable-management/covered-cable-trunking.svg",
    alt: "Exploded schematic of a solid-bottom fiberglass trough, removable cover and cover retention",
    description: "Solid-base routes with removable lids for small cables, instrumentation and specified containment duties.",
    selection: "Define cover retention, drainage, access and the required enclosure performance.",
    message: "Please review a covered FRP tray / trunking package. Internal width and depth: __. Cover and retention: __. Drainage / enclosure requirement: __. Cable load, supports, environment, quantity and destination: __.",
  },
  {
    id: "supports", title: "Fittings, covers & supports", label: "Complete the cable route",
    image: "/images/applications/frp-cable-tray-wall-support-pultruded-texture.webp",
    alt: "Illustration of a fiberglass cable ladder supported on a wall-mounted bracket",
    description: "Bends, tees, reducers, splice kits, cover clamps and structural support components.",
    selection: "Coordinate every interface in one route drawing and bill of materials.",
    message: "Please review FRP cable route accessories. Tray / ladder series and dimensions: __. Bend radius and fitting schedule: __. Splice kits, covers and clamps: __. Brackets, projection, anchors and loads: __. Quantity and destination: __.",
  },
];

function familyRfqHref(family: typeof productFamilies[number]) {
  return buildRfqHref({ source: "cable-tray-application", product: family.title, productPath: "/applications/frp-cable-tray-supports", message: family.message });
}

const sources = {
  nhc: { label: "NHC · tray, ladder, cover and fitting families", href: "https://www.nhcfrp.com/Cable-Tray-and-Ladder.html" },
  nhcSupports: { label: "NHC · CRS / CRZ support dimensions", href: "https://www.nhcfrp.com/grp-cable-trunking.html" },
  ercon: { label: "Ercon · ladder and instrument-tray dimensions", href: "https://ercon-india.com/GRP-FRP_Cable_Trays.php" },
  eae: { label: "EAE · KCA GRP ladder range", href: "https://www.eaeusa.us/products/grp-cable-trays/kca-grp-cable-tray" },
  fibretek: { label: "FibreTek · GRP cable ladder construction", href: "https://www.fibretek.co.za/portfolio/grp-cable-ladder/" },
  profiles: { label: "BSI · EN 13706 profile specifications", href: "https://landingpage.bsigroup.com/LandingPage/Series?UPI=BS+EN+13706" },
  tolerances: { label: "ASTM D3917 · pultruded shape tolerances", href: "https://store.astm.org/d3917-23.html" },
  eaton: { label: "Eaton · fiberglass cable ladder & channel tray", href: "https://www.eaton.com/mx/en-us/catalog/support-systems/fiberglass-cable-channel-tray.html" },
  saiLadder: { label: "Sai Seeya · ladder-type FRP cable trays", href: "https://www.frpcabletrays.com/ladder-type-frp-cable-trays.html" },
  saiTray: { label: "Sai Seeya · perforated cable trays", href: "https://www.frpcabletrays.com/perforated-cable-trays.html" },
  oglaend: { label: "Øglænd · FOE system and load data", href: "https://www.oglaend-system.com/products/cableladders/foe/" },
  enduro: { label: "Enduro / CCG · cable management resources", href: "https://www.creativecompositesgroup.com/industries-products/electrical-cable-management" },
  mita: { label: "Mita · installation guidance", href: "https://wibe-group.com/storage/F64D7FB7D1BD9F1508EDB6BF414E0695504492403D9B917B803B2D5A34E42BF6/5d542bd1a3634fa085951e197d189cc2/pdf/media/3a3a9d7f7bae48a596a25149080d862a/MitaFlex_Installation_Guidelines.pdf" },
  niedax: { label: "Niedax Ebo · GRP product families", href: "https://www.niedax-group.com/en/products-solutions/" },
  iec: { label: "IEC 61537 · cable tray and ladder systems", href: "https://webstore.iec.ch/en/publication/31963" },
  trunking: { label: "IEC 61084-1 · trunking and ducting scope", href: "https://webstore.iec.ch/en/publication/92096" },
  ul: { label: "UL · nonmetallic tray evaluation", href: "https://www.ul.com/services/mechanical-support-and-assembly-services" },
  cti: { label: "Cable Tray Institute · standards status", href: "https://www.cabletrays.org/codes-and-standards/" },
  fire: { label: "ASTM E84 · surface burning test scope", href: "https://store.astm.org/standards/e84" },
  cleats: { label: "IEC 61914 · cable cleats", href: "https://webstore.iec.ch/en/publication/64504" },
};

const navigation = [
  ["overview", "Product range"], ["system-types", "Tray vs ladder"], ["frp-cable-trays", "Cable trays"], ["frp-cable-ladders", "Cable ladders"], ["trunking", "Trunking & covers"], ["dimensions", "Sizes"], ["applications", "Applications"], ["supports", "Supports & fittings"],
  ["materials", "Materials"], ["engineering", "Loads & spans"], ["standards", "Standards"],
  ["installation", "Installation"], ["specification", "Specification"], ["submittals", "Documents & QA"], ["questions", "FAQ"], ["quote", "Quote"],
];

// What a first cable-route request includes, for the closing quote block.
const requestItems = [
  { title: "Supply boundary", text: "Profiles, fabricated supports, tray sections or a complete package, and who does engineering and installation." },
  { title: "Route and geometry", text: "Route drawing, tray base or ladder rung spacing, width, loading depth, bends, risers and cable bend radius." },
  { title: "Loads and supports", text: "Cable schedule and mass per meter, future allowance, spans and the supporting structure." },
  { title: "Exposure and acceptance", text: "Chemicals, temperature, UV and coastal exposure; required fire, electrical and project evidence, with document availability confirmed in the offer." },
];

function Section({ id, title, children, muted = false }: { id: string; title: string; children: ReactNode; muted?: boolean }) {
  return <PageSection id={id} title={title} tone={muted ? "muted" : "white"}>
    <div className="space-y-[24px] text-f16 leading-golden text-t2">{children}</div>
  </PageSection>;
}

function Source({ source }: { source: { label: string; href: string } }) {
  return <a href={source.href} className="text-f14 font-medium text-teal-text underline decoration-teal-border underline-offset-4 hover:decoration-teal">{source.label} ↗</a>;
}

function Table({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) {
  return <div role="region" aria-label={caption} tabIndex={0} className="relative overflow-x-auto rounded-card border border-border-default bg-white">
    <table className="w-full min-w-[680px] border-collapse text-left text-f14">
      <caption className="border-b border-border-default px-[14px] py-[10px] text-left font-semibold text-t1">{caption}</caption>
      <thead><tr className="border-b border-border-default bg-bg2">{headers.map(h => <th key={h} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">{h}</th>)}</tr></thead>
      <tbody>{rows.map(row => <tr key={row[0]} className="border-b border-border-default align-top last:border-b-0">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="w-[22%] px-[14px] py-[12px] font-semibold text-t1">{cell}</th> : <td key={index} className="px-[14px] py-[12px] leading-golden text-t2">{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

const faqs = [
  { question: "What is the difference between a cable tray and a cable ladder?", answer: "A channel or trough tray has a supporting base, which may be solid or ventilated. A cable ladder has two side rails joined by spaced rungs and an open bottom. Manufacturers also use ‘ladder-type cable tray’ for the latter. Specify the construction, not just the name; select it against cable support needs, ventilation, restraints and the system’s load data." },
  { question: "Are FRP, GRP and fiberglass cable trays the same?", answer: "In this application, these terms usually describe glass-fiber-reinforced polymer cable supports. The name alone does not define the resin, reinforcement, construction, load rating or fire performance. Compare the offered system and its documentation." },
  { question: "Which cable tray sizes can I specify?", answer: "Start with usable width and loading depth, then rail or wall thickness, section length and rung pitch or base pattern. Published manufacturer examples on this page show metric and imperial systems; they are not a universal size standard or an F1 stock list. Send your preferred dimensions so tooling, tolerances, fittings and the complete load requirement can be checked together." },
  { question: "Is a covered tray the same as cable trunking?", answer: "A removable lid alone does not make a tray an enclosed trunking system or give it an IP rating. Agree the product classification, openings, joints, access method and required enclosure tests. IEC 61537 addresses trays and ladders; IEC 61084 addresses trunking and ducting, using the applicable parts together." },
  { question: "Can F1 quote a complete cable tray system?", answer: "Tell us whether you need profile lengths, cut and drilled support components, fabricated supports or a complete tray package. F1 supplies pultruded profiles and agreed components; complete trays, bends, covers, hardware and system test evidence must be confirmed in the quotation against your specification." },
  { question: "What support spacing should I use?", answer: "There is no universal FRP support span. Use the supplied system’s load table with the actual cable load, temperature, deflection criteria, splice layout and end-span arrangement. Check wall brackets, crossarms, connections and anchors separately. A length supplied from the factory is not an allowable span." },
  { question: "Does a fiberglass cable tray need grounding?", answer: "Glass FRP is electrically insulating, but this does not remove the project’s earthing, bonding or lightning-protection requirements. Metallic components and connected equipment need assessment by the electrical designer. FRP is not an equipment grounding conductor or an electromagnetic shield." },
  { question: "Is vinyl ester always better than polyester?", answer: "No. Compare the exact resin and laminate with the chemicals, concentration, exposure mode, operating temperature and mechanical loads. Vinyl ester is often considered for more demanding chemical service; it is not a guarantee of compatibility with every chemical or process." },
  { question: "Does fire-retardant FRP provide fire resistance?", answer: "A flame-spread or flammability result does not establish structural endurance, circuit integrity, smoke or toxicity performance. State the required test, classification, duration and tested assembly. Tunnel, rail and offshore requirements need their own evidence." },
  { question: "Can I add covers or extra cables later?", answer: "Only after reviewing cable fill, heat dissipation, added mass, support capacity and access. Covers also introduce fixing and wind-uplift demands outdoors. Keep the original design allowance and accepted changes in the route records." },
  { question: "What information is needed for an initial quotation?", answer: "Start with your name, email and project scope. A route sketch, cable schedule, tray dimensions, support spacing, environment, required standards, quantities and destination help refine the quote. Drawings and technical details can follow after the first inquiry." },
];

export default function CableTrayApplication({ page }: { page: ApplicationPage }) {
  return <>
    <PageHeader
      tag="FRP cable management · products & engineering"
      line={{ name: "Application", label: "Cable trays & ladders", mark: false }}
      updated={page.lastModified}
      title={page.h1}
      description={page.description}
      figure={<Figure number={1} title="Cable ladder at a treatment plant" note="Application illustration" caption="Illustrative route: cables bear on rungs; side rails transfer load through brackets into the supporting structure. Rung pitch, spans, splice positions and cable restraints follow the qualified system design." bleed><Image src="/images/applications/frp-cable-ladder-water-treatment-pultruded-texture.webp" alt="Illustration of cables resting on ladder rungs between pultruded side rails, supported beside treatment basins" width={1672} height={941} sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" preload /></Figure>}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applications", href: "/applications" }, { label: "FRP cable trays & cable ladders" }]}
      actions={{ primary: { label: "Discuss your cable route", href: rfqHref }, secondary: { label: "Specification checklist", href: "#specification", variant: "secondary" }, note: "Start with your name and email. Route drawings and details can follow.", stickyMobile: true }}
    />
    <PageNav items={navigation.map(([id, label]) => ({ id, label }))} />

    <PageSection id="overview" title="From cable route to component schedule">
      <ul className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
        {productFamilies.map((family) => <li key={family.id}>
          <CoverCard href={`#${family.id}`} cover={{ src: family.image, alt: family.alt, fit: "contain" }} label={<span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{family.label}</span>} title={family.title} text={`${family.description} ${family.selection}`} action={`Explore ${family.title.replace("FRP ", "")}`} sizes="(max-width: 767px) 94vw, 46vw" />
        </li>)}
      </ul>
      <p className="mt-[12px] text-f14 leading-golden text-t3">Product and application images are illustrations; dimension drawings are schematics. Confirm profiles, slot patterns, connections and availability against the offered configuration.</p>
      <div className="mt-[32px] grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-[48px]">
        <div className="space-y-[14px] text-f16 leading-golden text-t2">
          <p className="text-f18 text-t1">FRP cable trays and ladders carry power, control and instrumentation cables through wet, coastal and chemically aggressive environments. Their support channels, brackets and frames complete the load path into the structure.</p>
          <p>{page.intro}</p>
        </div>
        <aside className="self-start rounded-card border border-teal-border bg-teal-bg p-[20px] sm:p-[24px]">
          <h3 className="text-f18 font-bold text-t1">Define what goes in the quotation</h3>
          <p className="mt-[8px] text-f16 leading-golden text-t2">{page.supplyScope}</p>
          <Link href={rfqHref} className="mt-[8px] inline-flex min-h-[44px] items-center text-f14 font-semibold text-teal-text hover:text-teal">Send your scope <span aria-hidden className="ml-[4px]">→</span></Link>
        </aside>
      </div>
    </PageSection>

    <Section id="system-types" title="Cable tray or cable ladder? Start with the cable arrangement" muted>
      <p className="max-w-[920px]">A tray provides a supporting base; a ladder carries cables on spaced rungs. “Ladder-type cable tray” is another name for a cable ladder. Here, cable tray refers to channel and trough configurations so the two constructions are easy to compare.</p>
      <Table caption="Cable-management configurations to define in your inquiry" headers={["Configuration", "Useful starting point", "Check before selection"]} rows={[
        ["Open cable ladder", "Power cables and larger cable runs where ventilation, drainage and access matter.", "Rung spacing, cable support requirements, cleat attachment, rail depth and bend radius."],
        ["Ventilated / perforated tray", "Control and instrumentation routes that need more frequent cable support.", "Cable diameter, opening pattern, drainage, fill allowance and declared load capacity."],
        ["Solid-bottom / covered tray", "Routes requiring a continuous base or protection from falling debris and sunlight.", "Heat dissipation, cover retention, drainage, inspection access and outdoor uplift."],
        ["Trunking / wireway", "Enclosed routing where access control and cable containment are specified.", "The applicable enclosure / trunking requirements; do not infer an IP rating from appearance."],
      ]} />
      <div className="flex flex-wrap gap-x-[24px] gap-y-[10px]"><Source source={sources.eaton} /><Source source={sources.enduro} /><Source source={sources.niedax} /></div>
    </Section>

    <Section id="frp-cable-trays" title="FRP cable trays: specify the base as well as the width">
      <p className="max-w-[920px]">A fiberglass channel or trough combines side walls with a supporting base. A ventilated version has openings for airflow and drainage; a solid-bottom version provides a continuous surface. Choose the opening pattern against cable size and support requirements. Small cables still need a suitable contact surface at joints and route changes.</p>
      <div className="grid gap-[22px] md:grid-cols-3">{[
        ["Ventilated / perforated", "Define opening size, pattern and usable base width. Check cable bearing, drainage and the load rating of the perforated section."],
        ["Solid bottom", "Specify a continuous base where the cable arrangement requires it. Review heat dissipation and drainage for the route conditions."],
        ["With removable covers", "Schedule cover sections and retaining hardware separately. Covers add protection from debris or sunlight; they do not establish an IP rating."],
      ].map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-bg2 p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px]">{body}</p></article>)}</div>
      <p><strong className="text-t1">Specify:</strong> usable width, loading depth, wall / base thickness, straight-section length, base configuration, bend radius, resin and any cover requirements. Dimensions and available tooling are confirmed for the offered product.</p>
      <div className="flex flex-wrap items-center gap-[22px]"><Button href={familyRfqHref(productFamilies[0])}>Inquire about cable trays</Button><Source source={sources.saiTray} /></div>
    </Section>

    <Section id="frp-cable-ladders" title="FRP cable ladders: coordinate the rails, rungs and cable restraints" muted>
      <p className="max-w-[920px]">A fiberglass cable ladder uses two longitudinal rails connected by transverse rungs. Its open construction leaves access for cable fixing and allows air and water to pass between rungs. Suitability for a power-cable route depends on the actual rail section, rung design, joints and tested load arrangement.</p>
      <div className="grid gap-[22px] md:grid-cols-3">{[
        ["Side rails", "Specify usable width and rail depth, then check the complete section against cable mass, span and deflection limits."],
        ["Rungs & connections", "Agree rung pitch, cable contact surface and the manufacturer’s connection detail. Fastening and bonding must follow the offered system."],
        ["Cleats & route changes", "Coordinate cable cleats, separation, bend radius and fitting supports. Short-circuit restraint requires its own cable and cleat assessment."],
      ].map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-white p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px]">{body}</p></article>)}</div>
      <p className="rounded-card border border-teal-border bg-teal-bg px-[22px] py-[18px]"><strong className="text-t1">Rung spacing and support span are different dimensions.</strong> Rung spacing is the distance between cable-bearing cross members. Support span is the distance between brackets or frames carrying the complete ladder. Neither can be inferred from the supplied section length.</p>
      <div className="flex flex-wrap items-center gap-[22px]"><Button href={familyRfqHref(productFamilies[1])}>Inquire about cable ladders</Button><Source source={sources.saiLadder} /></div>
    </Section>

    <Section id="trunking" title="Covered trays and GRP trunking: specify the complete enclosure">
      <div className="grid items-start gap-[28px] lg:grid-cols-2">
        <Figure number={2} title="Trough, removable lid and retention" caption="A cover and its retaining hardware are separate BOM items. Agree joint treatment, drainage and access before assigning enclosure requirements.">
          <Image src="/images/applications/cable-management/covered-cable-trunking.svg" alt="Exploded schematic showing a solid-base trough, removable lid and cover retainers" width={800} height={520} sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" />
        </Figure>
        <div className="space-y-[16px]">
          <p>Solid-bottom trays provide a continuous cable-bearing surface. Adding a lid helps manage falling debris and direct sunlight, but also changes heat dissipation, access and outdoor wind loading. State whether the requirement is a covered tray or a classified trunking / wireway system.</p>
          <ul className="list-disc space-y-[10px] pl-[20px]">
            <li><strong className="text-t1">Lids:</strong> straight and fitting covers, overlaps, removable lengths and retention method.</li>
            <li><strong className="text-t1">Internal layout:</strong> dividers, usable depth below the lid and cable entry / exit protection.</li>
            <li><strong className="text-t1">Environment:</strong> drainage paths, condensation, UV exposure and compatible fasteners.</li>
            <li><strong className="text-t1">Enclosure duty:</strong> required ingress protection and evidence for the assembled joints, lids and penetrations.</li>
          </ul>
          <Button href={familyRfqHref(productFamilies[2])}>Inquire about covered routes</Button>
          <div><Source source={sources.trunking} /></div>
        </div>
      </div>
    </Section>

    <Section id="dimensions" title="Dimensions that turn a product name into a specification" muted>
      <p className="max-w-[920px]">Usable width, overall rail height and cable loading depth describe different spaces. Record each one. Factory section length determines handling and joint count; support span is set by the qualified load table and installation arrangement.</p>
      <Figure number={3} title="Tray and ladder dimension key" caption="W = usable width; H = overall depth; h = usable depth; t = wall / base thickness; P = rung pitch; L = factory section length; S = installed support span. Actual rail and rung profiles vary by series.">
        <a href="/images/applications/cable-management/cable-tray-dimensions.svg" target="_blank" rel="noopener noreferrer" aria-label="Open the tray and ladder dimension diagram at full size">
          <Image src="/images/applications/cable-management/cable-tray-dimensions.svg" alt="Tray section and ladder views explaining width, depth, thickness, rung pitch, section length and support span" width={1000} height={580} sizes="94vw" className="h-auto w-full" />
        </a>
      </Figure>
      <Table caption="Published manufacturer dimensions — reference examples, not an F1 stock list" headers={["Manufacturer / range", "Published geometry", "Length / rung or base detail"]} rows={[
        ["Eaton B-Line · US range", "Side heights: 3, 4, 6, 8 in (76.2, 101.6, 152.4, 203.2 mm). Widths: 6, 9, 12, 18, 24, 30, 36 in.", "10 / 20 ft (3.048 / 6.096 m) lengths. Series 13 excludes the 30 / 36 in widths; check the selected series."],
        ["Ercon · ladder, India", "Widths 150–1,000 mm. Standard bend radius 300 mm; 600 / 900 mm options.", "Standard length 3 m; 3–6 m options. Rung pitch 300 mm standard, 200 / 250 / 500 mm options."],
        ["Ercon · CT / CTF instrument tray", "Widths 50–600 mm; U-section or flanged construction.", "Standard length 3 m; 2–6 m options. Perforated or solid base."],
        ["Øglænd · FOE, Norway", "Widths 150–900 mm. FOE70 / 100 / 150 rail heights 70 / 100 / 150 mm; loading depths 46 / 71 / 119.7 mm.", "FOE70: 3 m. FOE100 / FOE150: 3 or 6 m. Rung width and pitch can be specified for review."],
        ["EAE · KCA, Türkiye", "Heights 100 / 150 mm; widths 150, 200, 300, 400, 450, 500, 600, 750, 900 mm.", "6 m straight section. Select the rail series and fittings as one system."],
        ["FibreTek · GRP ladder, South Africa", "75 × 5 mm E-profile side rails; 25 mm square rungs. A 102 mm-high option is listed.", "3 m straight section; 300 mm rung pitch."],
      ]} />
      <p className="text-f14">These examples show how regional product ranges differ. Dimensions alone do not establish interchangeability, stock availability or load capacity. Imperial conversions use 1 in = 25.4 mm and 1 ft = 0.3048 m.</p>
      <div className="flex flex-wrap gap-x-[24px] gap-y-[12px]"><Source source={sources.eaton} /><Source source={sources.ercon} /><Source source={sources.oglaend} /><Source source={sources.eae} /><Source source={sources.fibretek} /></div>
    </Section>

    <Section id="applications" title="Design around the exposure along the route">
      <div className="grid gap-[20px] md:grid-cols-2">{[
        ["Water & wastewater", "Humid galleries, treatment basins and dosing areas", "Provide washdown chemicals, splash conditions, temperature and local gas exposure. Keep brackets accessible for inspection and avoid liquid traps."],
        ["Chemical & process plants", "Process areas, utilities and corrosive service corridors", "Identify each chemical and concentration, continuous versus occasional exposure, and cleaning conditions. Specify compatible resin and connection hardware."],
        ["Coastal & offshore facilities", "Salt spray, exposed pipe racks and marine utilities", "Consider UV, wind on covers, vibration, temperature and the full fastener system. Offshore approval requirements must match the actual product and project."],
        ["Power, tunnels & infrastructure", "Substations, service tunnels and instrument routes", "Coordinate cable separation, cleat forces and electrical clearances. Tunnel and transit routes need project-specific fire, smoke and toxicity criteria."],
      ].map(([title, subtitle, body]) => <article key={title} className="rounded-card border border-border-default bg-bg2 p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[8px] text-f14 font-semibold text-teal-text">{subtitle}</p><p className="mt-[12px]">{body}</p></article>)}</div>
      <p className="max-w-[920px]">The environment can change along one cable route. Treat a chemical dosing bay, a sheltered gallery and an exposed roof as separate selection conditions where necessary.</p>
    </Section>

    <Section id="supports" title="The support and connection deserve as much attention as the tray" muted>
      <Figure number={4} title="Route fittings and connection schedule" caption="Specify angle, radius, width and orientation for every fitting. Inside / outside risers are defined by the route drawing; fitting supports and cable bend radii need separate checks.">
        <a href="/images/applications/cable-management/cable-route-fittings.svg" target="_blank" rel="noopener noreferrer" aria-label="Open the cable route fitting diagram at full size"><Image src="/images/applications/cable-management/cable-route-fittings.svg" alt="Cable route fitting schematics showing a horizontal bend, tee, cross, reducers, vertical risers and connection accessories" width={1000} height={620} sizes="94vw" className="h-auto w-full" /></a>
      </Figure>
      <div className="grid gap-[24px] md:grid-cols-3">{[
          ["Wall-mounted cantilevers", "Channel or angle crossarms connect to a wall rail or base plate. Check bracket projection, eccentric loading, bolt bearing and anchor forces in the actual substrate."],
          ["Suspended trapezes", "A cross-channel carries the tray between suspension points. Specify rod and hardware materials, overhead attachment, lateral restraint and any seismic requirements."],
          ["Floor-mounted frames", "Square-tube posts, channels and bracing support independent routes. Check frame stability, base fixings, impact exposure and access around equipment."],
        ].map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-white p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[8px]">{body}</p></article>)}</div>
      <Table caption="Include fittings and accessories in the bill of materials" headers={["Group", "Items to schedule", "Coordination question"]} rows={[
        ["Route changes", "Horizontal bends, tees, crosses, reducers and vertical risers", "Does every fitting respect the cable’s minimum bending radius and have the required local support?"],
        ["Connections", "Splice plates, bolts, washers, expansion connections and hold-downs", "Do joints and fixed / sliding points follow the offered system’s tested arrangement?"],
        ["Cable organization", "Dividers, cable ties, cleats and identification", "Are segregation, cable restraint and short-circuit duties specified separately?"],
        ["Protection & interfaces", "Covers, cover clamps, end treatments, support brackets and anchors", "Are wind exposure, cut edges, substrate and dissimilar-material interfaces addressed?"],
      ]} />
      <Table caption="NHC support-component examples — supplier model identifiers" headers={["Model", "Total length (mm)", "Effective length (mm)", "Published mass (kg)"]} rows={[
        ["CRS300 / CRS400 / CRS500", "300 / 400 / 500", "275 / 375 / 475", "0.55 / 0.70 / 0.95"],
        ["CRZ300 / CRZ400 / CRZ500", "300 / 400 / 500", "265 / 365 / 465", "0.65 / 0.80 / 0.95"],
      ]} />
      <p className="text-f14">NHC labels the usable projection as “Efficiency Length.” Confirm that dimension on the approved drawing. These masses and lengths do not establish bracket capacity; request the hole pattern, connection detail and permissible load at the required projection.</p>
      <div className="flex flex-wrap gap-x-[24px] gap-y-[12px]"><Source source={sources.nhcSupports} /><Source source={sources.oglaend} /></div>
      <Button href={familyRfqHref(productFamilies[3])}>Build an accessory schedule</Button>
    </Section>

    <Section id="materials" title="Choose a resin for the service conditions">
      <p className="max-w-[920px]">Chemical resistance belongs to a particular resin and laminate under defined exposure conditions. Ask for a compatibility review covering concentration, temperature, contact duration and mechanical loading.</p>
      <div className="grid gap-[20px] md:grid-cols-3">{[
        ["Isophthalic polyester", "A candidate for many humid and outdoor industrial routes. Confirm compatibility with the actual chemicals, cleaning regime and temperature."],
        ["Vinyl ester", "A candidate for more demanding chemical service. Specify the resin grade and check the complete exposure profile before approval."],
        ["Fire & surface requirements", "Define flame, smoke and toxicity tests separately. Outdoor routes also need an agreed UV protection strategy and cut-edge treatment."],
      ].map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-bg2 p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[12px]">{body}</p></article>)}</div>
      <Table caption="Define material, manufacture and finish separately" headers={["Specification field", "Options to discuss", "Evidence / decision"]} rows={[
        ["Manufacturing route", "Pultruded rails, channels and rungs; molded or fabricated fittings and brackets.", "Identify the process and laminate of each part. Profile properties do not automatically describe a molded fitting or an assembled joint."],
        ["Resin and reinforcement", "Polyester or vinyl ester; specialist low-smoke / halogen-free systems where required.", "Name the resin grade, reinforcement and exact fire tests. Low smoke, zero halogen and flame spread are separate requirements."],
        ["Surface and color", "Resin-rich surface veil, UV protection, specified pigmentation and sealed machined edges.", "Agree color reference, surface condition and outdoor exposure. Color is not a resin or fire classification."],
        ["Hardware", "Compatible stainless or qualified composite splice, fixing and cover hardware.", "Confirm grade, size, hole geometry, torque, corrosion exposure and electrical bonding requirements."],
      ]} />
      <Table caption="FRP versus metal: compare the installed solution" headers={["Material", "Why it may fit", "Tradeoff to review"]} rows={[
        ["Glass FRP", "Corrosion resistance in compatible chemical service; insulating structural material; manageable component weight.", "Stiffness, sustained-load behavior, temperature, fire criteria and connection detailing."],
        ["Galvanized steel", "High stiffness and familiar support details for many industrial routes.", "Coating suitability, damaged or cut surfaces, corrosion exposure and maintenance access."],
        ["Stainless steel", "Mechanical robustness and corrosion resistance where a suitable grade is selected.", "Specific chemical and chloride exposure, weight, installed cost and bonding requirements."],
        ["Aluminum", "Low weight and useful corrosion resistance in suitable environments.", "Chemical compatibility, galvanic interfaces, thermal movement and electrical bonding."],
      ]} />
      <p>Compare supply, fittings, installation access, shutdowns and maintenance over the project’s intended service period. A universal price saving or service-life claim is not a sound basis for choosing the material.</p>
      <Source source={sources.eaton} />
    </Section>

    <Section id="engineering" title="A tray width is not a load rating" muted>
      <p className="max-w-[920px]">Select the complete load path: cables → tray rungs and rails → crossarm or bracket → frame and connections → anchors and supporting structure. Each part needs appropriate evidence.</p>
      <div className="grid gap-[20px] md:grid-cols-2">{[
        ["01", "Build the load schedule", "List installed cable mass per meter, future allowance, tray and cover self-weight, and any concentrated or installation loads. Define wind, ice, seismic and other site actions where applicable."],
        ["02", "Match the tested arrangement", "Read load capacity together with support spacing, deflection, splice position and end-span conditions. A multi-span result cannot automatically be used for a single span or a cantilever."],
        ["03", "Check sustained service", "Review creep, temperature effects and environmental reduction factors using the offered laminate and system data. Ask which factors are already included in the published allowable load."],
        ["04", "Verify local and electrical actions", "Check bracket bending, bolt bearing, connection slip, pull-out and substrate anchorage. Cleat forces and cable short-circuit restraint need their own assessment."],
      ].map(([number, title, body]) => <article key={number} className="rounded-card border border-border-default bg-white p-[24px]"><span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {Number(number)}</span><h3 className="mt-[8px] text-f18 font-bold text-t1">{title}</h3><p className="mt-[12px]">{body}</p></article>)}</div>
      <div className="rounded-card border border-l-4 border-border-default border-l-teal bg-white p-[24px]"><h3 className="font-bold text-t1">Read the conditions beneath a load table</h3><p className="mt-[10px]">For example, Øglænd’s FOE page states that its IEC load-test arrangement uses an end span reduced to three-quarters of the support spacing, with no splices in that end span. This is a condition attached to that manufacturer’s data, not an F1 installation rule.</p><div className="mt-[12px]"><Source source={sources.oglaend} /></div></div>
      <Table caption="Øglænd FOE published safe working loads — manufacturer-specific examples" headers={["Series", "SWL at 2 m (kg/m)", "SWL at 3 m (kg/m)", "Rail / loading depth (mm)"]} rows={[
        ["FOE70", "263", "103", "70 / 46"],
        ["FOE100", "Not stated", "230", "100 / 71"],
        ["FOE150 GA", "Not stated", "402", "150 / 119.7"],
        ["FOE150 HD", "Not stated", "460", "150 / 119.7"],
      ]} />
      <p className="text-f14">The source specifies IEC 61537 testing with the shortened end span described above. Confirm the precise width, resin, temperature, deflection and joint configuration in the complete report. These values cannot be transferred to an F1 component or interpolated to an untested span. “Not stated” means no value is given in that source table.</p>
      <div className="rounded-card border border-teal-border bg-teal-bg p-[24px]">
        <h3 className="text-f18 font-bold text-t1">Worked example: assemble a load request</h3>
        <p className="mt-[12px]">Assume 24 kg/m of installed cables and a project-selected 25% future allowance: 24 × 1.25 = <strong>30 kg/m of cable load</strong>. If the assumed tray, cover and accessories add 6 kg/m, the support design starts from <strong>36 kg/m</strong>, or approximately <strong>0.353 kN/m</strong> under gravity.</p>
        <p className="mt-[10px]">An ideal interior support with a 2 m tributary length then carries approximately <strong>0.706 kN</strong> vertically. This is an illustrative load take-off, not a bracket rating: continuous-span reactions, concentrated loads, offsets and site actions still need analysis. Check whether tray self-weight is included in the manufacturer’s SWL basis before comparing values.</p>
      </div>
      <CalculatorCTA href="/frp-profile-calculator#shape=channel" eyebrow="Preliminary profile check" title="Screen a support channel with your own project inputs" sub="The calculator checks an individual profile. It does not qualify the cable tray system, cantilever connection, anchors, cable cleats or fire performance. Enter the actual support geometry, loads and material data." />
    </Section>

    <Section id="standards" title="Tie each requirement to the correct test or system">
      <p className="max-w-[920px]">Agree the destination-market requirements, applicable edition and acceptance documents before procurement. The standards below describe different scopes; their appearance here is not a claim that every F1 component holds a system approval.</p>
      <Table caption="Standards and evidence to discuss in the project specification" headers={["Reference", "What it addresses", "What to request"]} rows={[
        ["IEC 61537:2023", "Cable tray and cable ladder systems; includes support-device testing and excludes trunking and ducting.", "System identification, test type, support arrangement, splice positions and load / deflection evidence."],
        ["IEC 61084-1:2017 + AMD1:2024", "General requirements for cable trunking and ducting; Part 1 is used with the applicable specific part.", "System classification and tests for the complete enclosure, fittings and openings."],
        ["UL 568", "Nonmetallic cable tray evaluation for the relevant market.", "If required, a verifiable listing or certification record covering the exact offered system."],
        ["EN 13706 / ASTM D3917", "Pultruded-profile requirements / dimensional tolerances, respectively.", "Profile and laminate documentation; these do not replace cable-system testing."],
        ["ASTM E84 / specified fire tests", "Surface burning or other explicitly specified fire behavior.", "The actual specimen, method and result. A surface-burning test does not establish circuit integrity or structural fire endurance."],
        ["IEC 61914", "Cable cleats and intermediate restraints, including declared electromechanical duties.", "Evidence for the cable arrangement, cleat spacing and relevant short-circuit forces."],
        ["Legacy NEMA FG 1 references", "Historical fiberglass cable-tray classifications still seen in catalogues.", "Clarify the contractual requirement: FG 1 was rescinded in November 2017. Do not present it as a current standard."],
      ]} />
      <div className="flex flex-wrap gap-x-[24px] gap-y-[12px]"><Source source={sources.iec} /><Source source={sources.trunking} /><Source source={sources.ul} /><Source source={sources.fire} /><Source source={sources.cleats} /><Source source={sources.cti} /></div>
      <p className="max-w-[920px]">Non-conductive FRP does not provide electromagnetic shielding and is not a grounding conductor. The electrical designer must resolve bonding of metallic parts, cable segregation, static and lightning risks for the installation.</p>
    </Section>

    <Section id="installation" title="Make the installation details part of the order" muted>
      <div className="grid gap-[24px] md:grid-cols-3">{[
        ["Before fabrication", "Freeze the route drawing, fitting schedule, support positions and connection details. Check cable pulling access, replacement access and clearances around equipment."],
        ["During installation", "Follow the supplied system’s instructions for cutting, drilling, dust control, edge sealing, tightening and splice placement. Do not apply steelwork torque values or improvise field holes."],
        ["At handover", "Record the installed configuration and approved load allowance. Inspect for loose fasteners, damaged fibers, missing clamps, cover movement and unauthorized additions; set inspection intervals for the site."],
      ].map(([title, body]) => <article key={title} className="border-t-2 border-teal-border pt-[20px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[12px]">{body}</p></article>)}</div>
      <p className="rounded-card border border-border-default bg-white px-[22px] py-[18px] font-semibold text-t1">Cable trays and cable ladders support cables. Do not use them as walkways, climbing ladders or personnel supports.</p>
      <Link href="/resources/blog/how-to-install-frp-cable-tray" className="inline-block font-bold text-teal-text">Read the step-by-step FRP cable tray installation guide →</Link>
      <Source source={sources.mita} />
    </Section>

    <Section id="specification" title="Turn a route drawing into a comparable quotation">
      <Table caption="Project information for FRP cable trays and cable ladders" headers={["Input", "Information to send", "Why it matters"]} rows={[
        ["Supply boundary", "Raw profiles, fabricated supports, tray sections or complete system; engineering and installation responsibilities.", "Makes the offered package and exclusions explicit."],
        ["Geometry", "Tray base / opening pattern or ladder rung spacing; route drawing, width, loading depth, length, bends, risers, reducers and minimum cable bend radius.", "Defines straight sections, fittings and usable space."],
        ["Cable and support loads", "Cable schedule, mass per meter, future allowance, point loads, spans and support arrangement.", "Sets system capacity and individual support checks."],
        ["Exposure", "Chemicals and concentrations, splash or immersion, temperature range, UV and coastal exposure.", "Guides resin, surface protection and hardware selection."],
        ["Interfaces", "Wall / floor / overhead structure, bracket projection, anchors, hole patterns and access restrictions.", "Defines connection loads and fabrication details."],
        ["Acceptance evidence", "Project standards and editions, fire / smoke requirements, electrical criteria and inspection documents.", "Aligns the proposed configuration with the approval process."],
        ["Delivery", "Quantities, destination, required date, transport length limits, kit marking and packing needs.", "Supports a practical production and logistics scope."],
      ]} />
      <div className="flex flex-col items-start gap-[18px] sm:flex-row sm:items-center"><Button href={rfqHref}>Request a project review</Button><a href="/downloads/frp-cable-tray-rfq-checklist.txt" download className="font-bold text-teal-text hover:underline">Download the RFQ checklist (.txt) ↓</a></div>
      <p className="text-f14">You can start with your name and email. This checklist helps refine the technical scope; it is not a requirement to complete every field before contacting us.</p>
    </Section>

    <Section id="submittals" title="Agree the documents and inspection points before production" muted>
      <Table caption="Suggested project submittal and quality plan" headers={["Stage", "Deliverable to agree", "Acceptance point"]} rows={[
        ["Quotation", "Itemized BOM, proposed series / resin, dimensions, hardware, exclusions and lead time.", "Each straight, fitting, cover and support has a traceable item reference and quantity."],
        ["Engineering review", "General arrangement, support / splice layout, fitting drawings and system load evidence.", "Match width, rail / rung detail, span, joint arrangement, exposure and required test edition to the supplied configuration."],
        ["Material review", "Resin / laminate identification, chemical compatibility and required fire / electrical reports.", "Identify tested thickness, specimen, laboratory, report date and applicability; agree any additional testing."],
        ["Production inspection", "Dimensional report and visual / assembly checks to the agreed sampling plan.", "Check usable width, depth, wall thickness, rung pitch, length, hole spacing, joint fit and cut-edge finish."],
        ["Packing and handover", "Marked bundles, fitting kits, packing list, installation instructions and approved as-built records.", "Protect ends and covers, segregate small hardware, identify route / item numbers and retain batch traceability."],
      ]} />
      <p className="max-w-[920px]">Use one drawing and BOM revision for purchasing, fabrication and inspection. Ask for the documents available for the offered configuration during quotation so any project-specific testing can be planned.</p>
    </Section>

    <PageSection id="questions" title="FRP cable tray & cable ladder questions" tone="muted">
      <FAQList items={faqs} />
    </PageSection>

    <Section id="references" title="Further reading for engineers and specifiers">
      <p className="max-w-[900px]">Product coverage combines NHC’s tray, ladder, cover and fitting families with published system examples from North America, Europe, Türkiye, India and South Africa. Manufacturer dimensions and ratings remain identified by brand and series; the final F1 offer defines the supplied configuration. NHC, dimension / load examples and IEC scope references reviewed October 25, 2026; supporting reading retained from the September 2026 review.</p>
      <div className="grid gap-[12px] md:grid-cols-2">{Object.values(sources).map(source => <Source key={source.href} source={source} />)}</div>
      <Link href="/resources/blog/frp-cable-tray-trunking-ladder-vs-metal" className="inline-block font-bold text-teal-text">Read the detailed cable tray, trunking and ladder comparison →</Link>
    </Section>

    <RelatedLinks background="bg2" groups={[{ title: "Support profiles & components", links: page.related.filter(link => !link.href.startsWith("/case-studies/")) }, { title: "Related engineering resources", links: [{ href: "/pultruded-frp-profiles", label: "Pultruded FRP profiles" }, { href: "/industries/water-wastewater", label: "Water & wastewater applications" }, { href: "/technology/quality-testing", label: "Quality testing & documentation" }, { href: "/resources/technical-data", label: "Technical data" }] }]} />
    <PageSection id="quote" title="Plan an FRP cable route" tone="deep">
      <ProductRfq
        product="FRP cable trays and cable ladders"
        productPath="/applications/frp-cable-tray-supports"
        quoteHref={rfqHref}
        items={requestItems}
        intro="Start with your name, email and the supply scope; a route sketch and cable schedule help refine the quote. Confirm included components, design responsibility and available acceptance documents in the offer."
        links={[{ label: "Cable tray installation guide", href: "/resources/blog/how-to-install-frp-cable-tray" }, { label: "Tray, trunking and ladder vs metal", href: "/resources/blog/frp-cable-tray-trunking-ladder-vs-metal" }]}
        advisorPrompt="I am planning an FRP cable route: [tray / ladder], width [mm], route length [m], cable mass [kg/m], support spacing [m], environment [chemicals, coastal, temperature]. Scope: [raw support profiles / fabricated components / tray or ladder sections / complete package]. Which construction and support profiles fit? Confirm component availability, design responsibility and the acceptance evidence available for the offered configuration."
      />
    </PageSection>
  </>;
}
