import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import Button from "@/components/ui/Button";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import type { ApplicationPage } from "@/lib/applicationPages";
import { buildRfqHref } from "@/lib/rfq";

const rfqHref = buildRfqHref({
  source: "cable-tray-application",
  product: "FRP cable trays and cable ladders",
  productPath: "/applications/frp-cable-tray-supports",
  message: "Please review my FRP cable tray / cable ladder enquiry. Scope (tray, ladder, supports, or complete package): __. Width, depth and route length: __. Tray base / perforations or ladder rung spacing: __. Cable mass and future allowance: __. Support spacing and fixing structure: __. Chemicals and operating temperature: __. Fire / electrical / project standards: __. Fittings, covers and fasteners: __. Quantity, destination and required date: __. Drawings can follow.",
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
];

function familyRfqHref(family: typeof productFamilies[number]) {
  return buildRfqHref({ source: "cable-tray-application", product: family.title, productPath: "/applications/frp-cable-tray-supports", message: family.message });
}

const sources = {
  profiles: { label: "BSI · EN 13706 profile specifications", href: "https://landingpage.bsigroup.com/LandingPage/Series?UPI=BS+EN+13706" },
  tolerances: { label: "ASTM D3917 · pultruded shape tolerances", href: "https://store.astm.org/d3917-23.html" },
  eaton: { label: "Eaton · fiberglass cable ladder & channel tray", href: "https://www.eaton.com/us/en-us/catalog/support-systems/fiberglass-cable-channel-tray.html" },
  saiLadder: { label: "Sai Seeya · ladder-type FRP cable trays", href: "https://www.frpcabletrays.com/ladder-type-frp-cable-trays.html" },
  saiTray: { label: "Sai Seeya · perforated cable trays", href: "https://www.frpcabletrays.com/perforated-cable-trays.html" },
  oglaend: { label: "Øglænd · FOE system and load data", href: "https://www.oglaend-system.com/products/cableladders/foe/" },
  enduro: { label: "Enduro / CCG · cable management resources", href: "https://www.creativecompositesgroup.com/industries-products/electrical-cable-management" },
  mita: { label: "Mita · installation guidance", href: "https://wibe-group.com/storage/F64D7FB7D1BD9F1508EDB6BF414E0695504492403D9B917B803B2D5A34E42BF6/5d542bd1a3634fa085951e197d189cc2/pdf/media/3a3a9d7f7bae48a596a25149080d862a/MitaFlex_Installation_Guidelines.pdf" },
  niedax: { label: "Niedax Ebo · GRP product families", href: "https://www.niedax-group.com/en/products-solutions/" },
  iec: { label: "IEC 61537 · cable tray and ladder systems", href: "https://webstore.iec.ch/en/publication/31963" },
  ul: { label: "UL · nonmetallic tray evaluation", href: "https://www.ul.com/services/mechanical-support-and-assembly-services" },
  cti: { label: "Cable Tray Institute · standards status", href: "https://www.cabletrays.org/codes-and-standards/" },
  fire: { label: "ASTM E84 · surface burning test scope", href: "https://store.astm.org/e0084-24.html" },
  cleats: { label: "IEC 61914 · cable cleats", href: "https://webstore.iec.ch/en/publication/64504" },
};

const navigation = [
  ["system-types", "Tray vs ladder"], ["frp-cable-trays", "Cable trays"], ["frp-cable-ladders", "Cable ladders"], ["applications", "Applications"], ["supports", "Supports & fittings"],
  ["materials", "Materials"], ["engineering", "Loads & spans"], ["standards", "Standards"],
  ["installation", "Installation"], ["specification", "Specification"], ["questions", "FAQs"],
];

function Section({ id, tag, title, children, muted = false }: { id: string; tag: string; title: string; children: ReactNode; muted?: boolean }) {
  return <section id={id} className={`scroll-mt-[110px] py-[55px] md:py-[72px] ${muted ? "bg-bg2" : "bg-white"}`}>
    <div className="site-container">
      <SectionTag>{tag}</SectionTag>
      <h2 className="mt-[12px] max-w-[950px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.16] tracking-[-0.02em] text-t1">{title}</h2>
      <div className="mt-[26px] space-y-[24px] text-f16 leading-golden text-t2">{children}</div>
    </div>
  </section>;
}

function Source({ source }: { source: { label: string; href: string } }) {
  return <a href={source.href} className="text-f14 font-medium text-teal-text underline decoration-teal-border underline-offset-4 hover:decoration-teal">{source.label} ↗</a>;
}

function Table({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) {
  return <div role="region" aria-label={caption} tabIndex={0} className="overflow-x-auto rounded-card border border-border-default focus-visible:outline-2 focus-visible:outline-teal">
    <table className="w-full min-w-[680px] border-collapse text-left text-f14">
      <caption className="bg-white px-[20px] py-[14px] text-left font-semibold text-t1">{caption}</caption>
      <thead className="bg-deep text-white"><tr>{headers.map(h => <th key={h} scope="col" className="px-[20px] py-[15px] font-semibold">{h}</th>)}</tr></thead>
      <tbody>{rows.map(row => <tr key={row[0]} className="border-t border-border-default odd:bg-white even:bg-bg2">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="w-[22%] px-[20px] py-[18px] align-top font-semibold text-t1">{cell}</th> : <td key={index} className="px-[20px] py-[18px] align-top">{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

const faqs = [
  { question: "What is the difference between a cable tray and a cable ladder?", answer: "A channel or trough tray has a supporting base, which may be solid or ventilated. A cable ladder has two side rails joined by spaced rungs and an open bottom. Manufacturers also use ‘ladder-type cable tray’ for the latter. Specify the construction, not just the name; select it against cable support needs, ventilation, restraints and the system’s load data." },
  { question: "Are FRP, GRP and fiberglass cable trays the same?", answer: "In this application, these terms usually describe glass-fiber-reinforced polymer cable supports. The name alone does not define the resin, reinforcement, construction, load rating or fire performance. Compare the offered system and its documentation." },
  { question: "Can F1 quote a complete cable tray system?", answer: "Tell us whether you need profile lengths, cut and drilled support components, fabricated supports or a complete tray package. F1 supplies pultruded profiles and agreed components; complete trays, bends, covers, hardware and system test evidence must be confirmed in the quotation against your specification." },
  { question: "What support spacing should I use?", answer: "There is no universal FRP support span. Use the supplied system’s load table with the actual cable load, temperature, deflection criteria, splice layout and end-span arrangement. Check wall brackets, crossarms, connections and anchors separately. A length supplied from the factory is not an allowable span." },
  { question: "Does a fiberglass cable tray need grounding?", answer: "Glass FRP is electrically insulating, but this does not remove the project’s earthing, bonding or lightning-protection requirements. Metallic components and connected equipment need assessment by the electrical designer. FRP is not an equipment grounding conductor or an electromagnetic shield." },
  { question: "Is vinyl ester always better than polyester?", answer: "No. Compare the exact resin and laminate with the chemicals, concentration, exposure mode, operating temperature and mechanical loads. Vinyl ester is often considered for more demanding chemical service; it is not a guarantee of compatibility with every chemical or process." },
  { question: "Does fire-retardant FRP provide fire resistance?", answer: "A flame-spread or flammability result does not establish structural endurance, circuit integrity, smoke or toxicity performance. State the required test, classification, duration and tested assembly. Tunnel, rail and offshore requirements need their own evidence." },
  { question: "Can I add covers or extra cables later?", answer: "Only after reviewing cable fill, heat dissipation, added mass, support capacity and access. Covers also introduce fixing and wind-uplift demands outdoors. Keep the original design allowance and accepted changes in the route records." },
  { question: "What information is needed for an initial quotation?", answer: "Start with your name, email and project scope. A route sketch, cable schedule, tray dimensions, support spacing, environment, required standards, quantities and destination help refine the quote. Drawings and technical details can follow after the first enquiry." },
];

export default function CableTrayApplication({ page }: { page: ApplicationPage }) {
  return <>
    <PageHeader tag="Cable management · application & selection guide" title={page.h1} description={page.description}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applications", href: "/applications" }, { label: "FRP cable trays & cable ladders" }]}
      actions={{ primary: { label: "Discuss your cable route", href: rfqHref }, secondary: { label: "View specification checklist", href: "#specification", variant: "secondary" }, note: "Start with your name and email. Route drawings and details can follow." }} />

    <section className="bg-white pt-[34px] pb-[42px]">
      <div className="site-container">
        <div className="grid gap-[24px] md:grid-cols-2">
          {productFamilies.map((family, index) => <article key={family.id} className="overflow-hidden rounded-card border border-border-default bg-white">
            <a href={`#${family.id}`} aria-label={`Explore ${family.title}`}><Image src={family.image} alt={family.alt} width={1536} height={1024} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 594px" className="h-auto w-full" preload={index === 0} /></a>
            <div className="p-[24px] sm:p-[28px]"><SectionTag>{family.label}</SectionTag><h2 className="mt-[10px] text-f24 font-extrabold tracking-[-0.02em] text-t1">{family.title}</h2><p className="mt-[12px] text-f16 leading-golden text-t2">{family.description}</p><p className="mt-[10px] text-f14 leading-relaxed text-t3">{family.selection}</p><a href={`#${family.id}`} className="mt-[18px] inline-block font-bold text-teal-text hover:underline">Explore {index === 0 ? "cable trays" : "cable ladders"} →</a></div>
          </article>)}
        </div>
        <p className="mt-[12px] text-f14 leading-relaxed text-t3">AI-generated product illustrations informed by supplier references. Profiles, slot patterns and connections are illustrative; confirm the offered configuration in the quotation.</p>
        <div className="mt-[30px] grid gap-[28px] lg:grid-cols-[1.35fr_1fr]">
          <div><SectionTag>From cable route to component schedule</SectionTag><p className="mt-[14px] text-f18 leading-golden text-t2">FRP cable trays and ladders carry power, control and instrumentation cables through wet, coastal and chemically aggressive environments. Their support channels, brackets and frames complete the load path into the structure.</p><p className="mt-[14px] text-f16 leading-golden text-t2">F1 Composite supplies pultruded fiberglass profiles and agreed fabricated components for these routes. Start with the cable arrangement and environment, then define the tray, supports, fittings and evidence needed for your project.</p></div>
          <aside className="rounded-card border border-teal-border bg-teal-bg p-[24px]"><h2 className="text-f18 font-bold text-t1">Define what goes in the quotation</h2><p className="mt-[12px] text-f16 leading-golden text-t2">Specify raw profiles, cut and drilled parts, assembled supports, or a complete cable-management package. Confirm tray-system availability, accessories, test documentation and engineering responsibilities for the offered scope.</p><Link href={rfqHref} className="mt-[16px] inline-block font-bold text-teal-text">Send your scope →</Link></aside>
        </div>
      </div>
    </section>

    <nav aria-label="Cable tray guide sections" className="border-y border-border-default bg-bg2">
      <div className="site-container flex flex-wrap gap-x-[24px] gap-y-[12px] py-[20px]">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} className="text-f14 font-semibold text-teal-text hover:underline">{label}</a>)}</div>
    </nav>

    <Section id="system-types" tag="01 / Select the system" title="Cable tray or cable ladder? Start with the cable arrangement">
      <p className="max-w-[920px]">A tray provides a supporting base; a ladder carries cables on spaced rungs. “Ladder-type cable tray” is another name for a cable ladder. Here, cable tray refers to channel and trough configurations so the two constructions are easy to compare.</p>
      <Table caption="Cable-management configurations to define in your enquiry" headers={["Configuration", "Useful starting point", "Check before selection"]} rows={[
        ["Open cable ladder", "Power cables and larger cable runs where ventilation, drainage and access matter.", "Rung spacing, cable support requirements, cleat attachment, rail depth and bend radius."],
        ["Ventilated / perforated tray", "Control and instrumentation routes that need more frequent cable support.", "Cable diameter, opening pattern, drainage, fill allowance and declared load capacity."],
        ["Solid-bottom / covered tray", "Routes requiring a continuous base or protection from falling debris and sunlight.", "Heat dissipation, cover retention, drainage, inspection access and outdoor uplift."],
        ["Trunking / wireway", "Enclosed routing where access control and cable containment are specified.", "The applicable enclosure / trunking requirements; do not infer an IP rating from appearance."],
      ]} />
      <div className="flex flex-wrap gap-x-[24px] gap-y-[10px]"><Source source={sources.eaton} /><Source source={sources.enduro} /><Source source={sources.niedax} /></div>
    </Section>

    <Section id="frp-cable-trays" tag="Cable tray / channel & trough" title="FRP cable trays: specify the base as well as the width" muted>
      <p className="max-w-[920px]">A fiberglass channel or trough combines side walls with a supporting base. A ventilated version has openings for airflow and drainage; a solid-bottom version provides a continuous surface. Choose the opening pattern against cable size and support requirements. Small cables still need a suitable contact surface at joints and route changes.</p>
      <div className="grid gap-[22px] md:grid-cols-3">{[
        ["Ventilated / perforated", "Define opening size, pattern and usable base width. Check cable bearing, drainage and the load rating of the perforated section."],
        ["Solid bottom", "Specify a continuous base where the cable arrangement requires it. Review heat dissipation and drainage for the route conditions."],
        ["With removable covers", "Schedule cover sections and retaining hardware separately. Covers add protection from debris or sunlight; they do not establish an IP rating."],
      ].map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-white p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px]">{body}</p></article>)}</div>
      <p><strong className="text-t1">Specify:</strong> usable width, loading depth, wall / base thickness, straight-section length, base configuration, bend radius, resin and any cover requirements. Dimensions and available tooling are confirmed for the offered product.</p>
      <div className="flex flex-wrap items-center gap-[22px]"><Button href={familyRfqHref(productFamilies[0])}>Enquire about cable trays</Button><Source source={sources.saiTray} /></div>
    </Section>

    <Section id="frp-cable-ladders" tag="Cable ladder / rails & rungs" title="FRP cable ladders: coordinate the rails, rungs and cable restraints">
      <p className="max-w-[920px]">A fiberglass cable ladder uses two longitudinal rails connected by transverse rungs. Its open construction leaves access for cable fixing and allows air and water to pass between rungs. Suitability for a power-cable route depends on the actual rail section, rung design, joints and tested load arrangement.</p>
      <div className="grid gap-[22px] md:grid-cols-3">{[
        ["Side rails", "Specify usable width and rail depth, then check the complete section against cable mass, span and deflection limits."],
        ["Rungs & connections", "Agree rung pitch, cable contact surface and the manufacturer’s connection detail. Fastening and bonding must follow the offered system."],
        ["Cleats & route changes", "Coordinate cable cleats, separation, bend radius and fitting supports. Short-circuit restraint requires its own cable and cleat assessment."],
      ].map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-bg2 p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px]">{body}</p></article>)}</div>
      <p className="rounded-card border border-teal-border bg-teal-bg px-[22px] py-[18px]"><strong className="text-t1">Rung spacing and support span are different dimensions.</strong> Rung spacing is the distance between cable-bearing cross members. Support span is the distance between brackets or frames carrying the complete ladder. Neither can be inferred from the supplied section length.</p>
      <div className="flex flex-wrap items-center gap-[22px]"><Button href={familyRfqHref(productFamilies[1])}>Enquire about cable ladders</Button><Source source={sources.saiLadder} /></div>
    </Section>

    <Section id="applications" tag="02 / Application fit" title="Design around the exposure along the route" muted>
      <div className="grid gap-[20px] md:grid-cols-2">{[
        ["Water & wastewater", "Humid galleries, treatment basins and dosing areas", "Provide washdown chemicals, splash conditions, temperature and local gas exposure. Keep brackets accessible for inspection and avoid liquid traps."],
        ["Chemical & process plants", "Process areas, utilities and corrosive service corridors", "Identify each chemical and concentration, continuous versus occasional exposure, and cleaning conditions. Specify compatible resin and connection hardware."],
        ["Coastal & offshore facilities", "Salt spray, exposed pipe racks and marine utilities", "Consider UV, wind on covers, vibration, temperature and the full fastener system. Offshore approval requirements must match the actual product and project."],
        ["Power, tunnels & infrastructure", "Substations, service tunnels and instrument routes", "Coordinate cable separation, cleat forces and electrical clearances. Tunnel and transit routes need project-specific fire, smoke and toxicity criteria."],
      ].map(([title, subtitle, body]) => <article key={title} className="rounded-card border border-border-default bg-white p-[26px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[8px] text-f14 font-semibold text-teal-text">{subtitle}</p><p className="mt-[12px]">{body}</p></article>)}</div>
      <p className="max-w-[920px]">The environment can change along one cable route. Treat a chemical dosing bay, a sheltered gallery and an exposed roof as separate selection conditions where necessary.</p>
    </Section>

    <Section id="supports" tag="03 / Complete the load path" title="The support and connection deserve as much attention as the tray">
      <div className="grid gap-[24px] md:grid-cols-3">{[
          ["Wall-mounted cantilevers", "Channel or angle crossarms connect to a wall rail or base plate. Check bracket projection, eccentric loading, bolt bearing and anchor forces in the actual substrate."],
          ["Suspended trapezes", "A cross-channel carries the tray between suspension points. Specify rod and hardware materials, overhead attachment, lateral restraint and any seismic requirements."],
          ["Floor-mounted frames", "Square-tube posts, channels and bracing support independent routes. Check frame stability, base fixings, impact exposure and access around equipment."],
        ].map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-bg2 p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[8px]">{body}</p></article>)}</div>
      <Table caption="Include fittings and accessories in the bill of materials" headers={["Group", "Items to schedule", "Coordination question"]} rows={[
        ["Route changes", "Horizontal bends, tees, crosses, reducers and vertical risers", "Does every fitting respect the cable’s minimum bending radius and have the required local support?"],
        ["Connections", "Splice plates, bolts, washers, expansion connections and hold-downs", "Do joints and fixed / sliding points follow the offered system’s tested arrangement?"],
        ["Cable organisation", "Dividers, cable ties, cleats and identification", "Are segregation, cable restraint and short-circuit duties specified separately?"],
        ["Protection & interfaces", "Covers, cover clamps, end treatments, support brackets and anchors", "Are wind exposure, cut edges, substrate and dissimilar-material interfaces addressed?"],
      ]} />
      <Source source={sources.oglaend} />
    </Section>

    <Section id="materials" tag="04 / Material selection" title="Choose a resin for the service conditions" muted>
      <p className="max-w-[920px]">Chemical resistance belongs to a particular resin and laminate under defined exposure conditions. Ask for a compatibility review covering concentration, temperature, contact duration and mechanical loading.</p>
      <div className="grid gap-[20px] md:grid-cols-3">{[
        ["Isophthalic polyester", "A candidate for many humid and outdoor industrial routes. Confirm compatibility with the actual chemicals, cleaning regime and temperature."],
        ["Vinyl ester", "A candidate for more demanding chemical service. Specify the resin grade and check the complete exposure profile before approval."],
        ["Fire & surface requirements", "Define flame, smoke and toxicity tests separately. Outdoor routes also need an agreed UV protection strategy and cut-edge treatment."],
      ].map(([title, body]) => <article key={title} className="rounded-card border border-border-default bg-white p-[24px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[12px]">{body}</p></article>)}</div>
      <Table caption="FRP versus metal: compare the installed solution" headers={["Material", "Why it may fit", "Tradeoff to review"]} rows={[
        ["Glass FRP", "Corrosion resistance in compatible chemical service; insulating structural material; manageable component weight.", "Stiffness, sustained-load behaviour, temperature, fire criteria and connection detailing."],
        ["Galvanized steel", "High stiffness and familiar support details for many industrial routes.", "Coating suitability, damaged or cut surfaces, corrosion exposure and maintenance access."],
        ["Stainless steel", "Mechanical robustness and corrosion resistance where a suitable grade is selected.", "Specific chemical and chloride exposure, weight, installed cost and bonding requirements."],
        ["Aluminum", "Low weight and useful corrosion resistance in suitable environments.", "Chemical compatibility, galvanic interfaces, thermal movement and electrical bonding."],
      ]} />
      <p>Compare supply, fittings, installation access, shutdowns and maintenance over the project’s intended service period. A universal price saving or service-life claim is not a sound basis for choosing the material.</p>
      <Source source={sources.eaton} />
    </Section>

    <Section id="engineering" tag="05 / Engineering review" title="A tray width is not a load rating">
      <p className="max-w-[920px]">Select the complete load path: cables → tray rungs and rails → crossarm or bracket → frame and connections → anchors and supporting structure. Each part needs appropriate evidence.</p>
      <div className="grid gap-[20px] md:grid-cols-2">{[
        ["01", "Build the load schedule", "List installed cable mass per metre, future allowance, tray and cover self-weight, and any concentrated or installation loads. Define wind, ice, seismic and other site actions where applicable."],
        ["02", "Match the tested arrangement", "Read load capacity together with support spacing, deflection, splice position and end-span conditions. A multi-span result cannot automatically be used for a single span or a cantilever."],
        ["03", "Check sustained service", "Review creep, temperature effects and environmental reduction factors using the offered laminate and system data. Ask which factors are already included in the published allowable load."],
        ["04", "Verify local and electrical actions", "Check bracket bending, bolt bearing, connection slip, pull-out and substrate anchorage. Cleat forces and cable short-circuit restraint need their own assessment."],
      ].map(([number, title, body]) => <article key={number} className="rounded-card border border-border-default p-[24px]"><span className="text-f14 font-bold text-teal-text">{number}</span><h3 className="mt-[8px] text-f18 font-bold text-t1">{title}</h3><p className="mt-[12px]">{body}</p></article>)}</div>
      <div className="rounded-card border-l-4 border-teal bg-bg2 p-[24px]"><h3 className="font-bold text-t1">Read the conditions beneath a load table</h3><p className="mt-[10px]">For example, Øglænd’s FOE page states that its IEC load-test arrangement uses an end span reduced to three-quarters of the support spacing, with no splices in that end span. This is a condition attached to that manufacturer’s data, not an F1 installation rule.</p><div className="mt-[12px]"><Source source={sources.oglaend} /></div></div>
      <CalculatorCTA href="/frp-profile-calculator#shape=channel" eyebrow="Preliminary profile check" title="Screen a support channel with your own project inputs" sub="The calculator checks an individual profile. It does not qualify the cable tray system, cantilever connection, anchors, cable cleats or fire performance. Enter the actual support geometry, loads and material data." />
    </Section>

    <Section id="standards" tag="06 / Evidence & acceptance" title="Tie each requirement to the correct test or system" muted>
      <p className="max-w-[920px]">Agree the destination-market requirements, applicable edition and acceptance documents before procurement. The standards below describe different scopes; their appearance here is not a claim that every F1 component holds a system approval.</p>
      <Table caption="Standards and evidence to discuss in the project specification" headers={["Reference", "What it addresses", "What to request"]} rows={[
        ["IEC 61537", "Cable tray and cable ladder systems for supporting cables; its scope excludes trunking and ducting.", "System identification, applicable edition, test configuration and load / deflection evidence."],
        ["UL 568", "Nonmetallic cable tray evaluation for the relevant market.", "If required, a verifiable listing or certification record covering the exact offered system."],
        ["EN 13706 / ASTM D3917", "Pultruded-profile requirements / dimensional tolerances, respectively.", "Profile and laminate documentation; these do not replace cable-system testing."],
        ["ASTM E84 / specified fire tests", "Surface burning or other explicitly specified fire behaviour.", "The actual specimen, method and result. A surface-burning test does not establish circuit integrity or structural fire endurance."],
        ["IEC 61914", "Cable cleats and intermediate restraints, including declared electromechanical duties.", "Evidence for the cable arrangement, cleat spacing and relevant short-circuit forces."],
        ["Legacy NEMA FG 1 references", "Historical fiberglass cable-tray classifications still seen in catalogues.", "Clarify the contractual requirement: FG 1 was rescinded in November 2017. Do not present it as a current standard."],
      ]} />
      <div className="flex flex-wrap gap-x-[24px] gap-y-[12px]"><Source source={sources.iec} /><Source source={sources.ul} /><Source source={sources.fire} /><Source source={sources.cleats} /><Source source={sources.cti} /></div>
      <p className="max-w-[920px]">Non-conductive FRP does not provide electromagnetic shielding and is not a grounding conductor. The electrical designer must resolve bonding of metallic parts, cable segregation, static and lightning risks for the installation.</p>
    </Section>

    <Section id="installation" tag="07 / Installation & maintenance" title="Make the installation details part of the order">
      <div className="grid gap-[24px] md:grid-cols-3">{[
        ["Before fabrication", "Freeze the route drawing, fitting schedule, support positions and connection details. Check cable pulling access, replacement access and clearances around equipment."],
        ["During installation", "Follow the supplied system’s instructions for cutting, drilling, dust control, edge sealing, tightening and splice placement. Do not apply steelwork torque values or improvise field holes."],
        ["At handover", "Record the installed configuration and approved load allowance. Inspect for loose fasteners, damaged fibers, missing clamps, cover movement and unauthorized additions; set inspection intervals for the site."],
      ].map(([title, body]) => <article key={title} className="border-t-2 border-teal-border pt-[20px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[12px]">{body}</p></article>)}</div>
      <p className="rounded-card bg-bg2 px-[22px] py-[18px] font-semibold text-t1">Cable trays and cable ladders support cables. Do not use them as walkways, climbing ladders or personnel supports.</p>
      <Link href="/resources/blog/how-to-install-frp-cable-tray" className="inline-block font-bold text-teal-text">Read the step-by-step FRP cable tray installation guide →</Link>
      <Source source={sources.mita} />
    </Section>

    <Section id="specification" tag="08 / Quote-ready scope" title="Turn a route drawing into a comparable quotation" muted>
      <Table caption="Project information for FRP cable trays and cable ladders" headers={["Input", "Information to send", "Why it matters"]} rows={[
        ["Supply boundary", "Raw profiles, fabricated supports, tray sections or complete system; engineering and installation responsibilities.", "Makes the offered package and exclusions explicit."],
        ["Geometry", "Tray base / opening pattern or ladder rung spacing; route drawing, width, loading depth, length, bends, risers, reducers and minimum cable bend radius.", "Defines straight sections, fittings and usable space."],
        ["Cable and support loads", "Cable schedule, mass per metre, future allowance, point loads, spans and support arrangement.", "Sets system capacity and individual support checks."],
        ["Exposure", "Chemicals and concentrations, splash or immersion, temperature range, UV and coastal exposure.", "Guides resin, surface protection and hardware selection."],
        ["Interfaces", "Wall / floor / overhead structure, bracket projection, anchors, hole patterns and access restrictions.", "Defines connection loads and fabrication details."],
        ["Acceptance evidence", "Project standards and editions, fire / smoke requirements, electrical criteria and inspection documents.", "Aligns the proposed configuration with the approval process."],
        ["Delivery", "Quantities, destination, required date, transport length limits, kit marking and packing needs.", "Supports a practical production and logistics scope."],
      ]} />
      <div className="flex flex-col items-start gap-[18px] sm:flex-row sm:items-center"><Button href={rfqHref}>Request a project review</Button><a href="/downloads/frp-cable-tray-rfq-checklist.txt" download className="font-bold text-teal-text hover:underline">Download the RFQ checklist (.txt) ↓</a></div>
      <p className="text-f14">You can start with your name and email. This checklist helps refine the technical scope; it is not a requirement to complete every field before contacting us.</p>
    </Section>

    <section id="questions" className="scroll-mt-[110px] bg-white pt-[5px] pb-[55px]"><div className="site-container"><FAQ title="FRP cable tray & cable ladder questions, answered" items={faqs} /></div></section>

    <Section id="references" tag="Technical references" title="Further reading for engineers and specifiers" muted>
      <p className="max-w-[900px]">This guide draws on public system documentation from Eaton, Enduro / Creative Composites Group, Øglænd, Mita / Wibe Group and Niedax Ebo, plus the tray and ladder product examples from Sai Seeya Composite. Standards publishers provide the separate test-scope references. Their product ratings and approvals apply to their own systems. References checked September 21, 2026.</p>
      <div className="grid gap-[12px] md:grid-cols-2">{Object.values(sources).map(source => <Source key={source.href} source={source} />)}</div>
      <Link href="/resources/blog/frp-cable-tray-trunking-ladder-vs-metal" className="inline-block font-bold text-teal-text">Read the detailed cable tray, trunking and ladder comparison →</Link>
    </Section>

    <RelatedLinks groups={[{ title: "Support profiles & components", links: page.related.filter(link => !link.href.startsWith("/case-studies/")) }, { title: "Related engineering resources", links: [{ href: "/pultruded-frp-profiles", label: "Pultruded FRP profiles" }, { href: "/industries/water-wastewater", label: "Water & wastewater applications" }, { href: "/technology/quality-testing", label: "Quality testing & documentation" }, { href: "/resources/technical-data", label: "Technical data" }] }]} />
    <InnerCTA title="Planning an FRP cable route?" quoteHref={rfqHref} />
  </>;
}
