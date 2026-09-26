import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import JumpNav from "@/components/sections/JumpNav";
import SectionTag from "@/components/ui/SectionTag";
import FAQ from "@/components/ui/FAQ";
import CollectionSchema from "@/components/seo/CollectionSchema";
import { buildPageMetadata } from "@/lib/seo";
import { buildRfqHref } from "@/lib/rfq";

const pagePath = "/industries/industrial";
const pageTitle = "FRP for Chemical & Industrial Facilities";
const pageDescription =
  "FRP grating, platforms, handrails, cooling-tower profiles and cable supports for chemical plants. Match each assembly to process loads and exposure.";
const heroImage = "/images/industries/industrial-chemical-platform-concept.webp";
const quoteHref = buildRfqHref({
  source: "industrial-industry",
  product: "FRP components for an industrial facility",
  productPath: pagePath,
});
const heading =
  "mt-[13px] text-[clamp(26px,3vw,36px)] font-bold leading-tight tracking-[-0.02em] text-t1";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: heroImage,
});

const productLinks = [
  { label: "Molded FRP grating", href: "/products/molded-frp-grating" },
  { label: "Pultruded FRP grating", href: "/products/frp-gratings" },
  { label: "FRP structural profiles", href: "/products/fiberglass-structural-shapes" },
  { label: "FRP handrail systems", href: "/products/frp-handrail-systems" },
  { label: "FRP fixed ladders", href: "/products/frp-ladders" },
  { label: "FRP stair treads", href: "/products/frp-stair-treads" },
  { label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles" },
];

const applications = [
  {
    id: "tank-platforms",
    number: "01",
    title: "Chemical dosing and tank-access platforms",
    summary: "Valve operation, sampling and inspection above bunds and process equipment.",
    image: heroImage,
    alt: "Illustrated chemical tank access platform with FRP grating, structural beams, handrails and nearby process piping",
    paragraphs: [
      "A tank-side platform may be used for valve operation every shift, sampling at a fixed point and occasional replacement of an agitator or instrument. Its walking route, clearances and escape path need to work around the actual vessels and pipework. Splash, vapour, rain and washdown can reach different parts of the assembly at different frequencies.",
      "Pultruded I-beams or channels can form the support frame; molded or pultruded grating provides the walking surface; stair treads, guardrails and toe boards complete the access route. The guardrail posts transfer their loads into the platform frame, while base plates and anchors transfer all reactions into the existing structure. A replacement for steel therefore needs a new member and connection check, even when the footprint is unchanged.",
      "Start resin selection with a list of chemicals, concentrations, temperatures and exposure modes, including cleaning agents. Define where cuts, drilled holes and metal fasteners will be exposed. Supply can be limited to profiles and panels or expanded to a cut, drilled and labelled component package against approved drawings.",
    ],
    components: ["I-beams and channels", "Grating and stair treads", "Handrails, toe boards and fittings"],
    checks: ["Operating and maintenance loads, clear spans and deflection", "Guardrail layout, anchor substrate and local connection loads", "Chemical splash, washdown and fire requirements"],
    links: [
      { label: "Chemical platform application guide", href: "/applications/frp-chemical-plant-platforms" },
      { label: "Structural profiles", href: "/products/fiberglass-structural-shapes" },
      { label: "Handrail systems", href: "/products/frp-handrail-systems" },
    ],
  },
  {
    id: "plating-pickling",
    number: "02",
    title: "Plating and pickling-line walkways",
    summary: "Operator paths beside treatment baths, trenches and maintenance openings.",
    image: "/images/industries/industrial-plating-line-concept.webp",
    alt: "Illustrated plating line walkway with FRP grating panels alongside process baths and a guarded access route",
    paragraphs: [
      "An operator beside a plating or pickling line needs access to bath controls, hoists and inspection points without stepping around open channels or loose covers. Mist above the baths, drips from transferred parts and periodic cleaning create a different exposure from a dry production aisle. Set out the walkway width, removable sections, drainage path and barriers around every opening before selecting a panel.",
      "Molded grating is often a useful starting point for irregular layouts with several cutouts or support in two directions. Pultruded grating suits layouts organized around a defined bearing-bar direction and a checked span. In either case, the chosen mesh or bar opening, surface texture, edge supports, hold-down clips and the load from tools or carts belong on the panel schedule.",
      "Chemical compatibility is specific to the actual bath and cleaning chemistry. A resin family name alone cannot establish suitability for concentrated acids, oxidizers or elevated temperatures. Review the proposed laminate and any exposed cut edges with the material supplier before releasing the layout.",
    ],
    components: ["Molded or pultruded grating", "Stair treads and edge framing", "Guardrails and removable-panel hardware"],
    checks: ["Bath chemistry, mist, spills and washdown temperature", "Cutout positions, support bearing and grating orientation", "Slip surface, drainage, clips and safe removal sequence"],
    links: [
      { label: "Molded grating", href: "/products/molded-frp-grating" },
      { label: "Pultruded grating", href: "/products/frp-gratings" },
      { label: "Stair treads", href: "/products/frp-stair-treads" },
    ],
  },
  {
    id: "cooling-towers",
    number: "03",
    title: "Cooling-tower framing and wet-zone access",
    summary: "Service decks, support members and access around continually wet equipment.",
    image: "/images/industries/industrial-cooling-tower-concept.webp",
    alt: "Illustrated cooling tower wet zone with FRP grating walkway, beams, bracing and guardrails",
    paragraphs: [
      "Inside a cooling tower, the frame and access route see saturated air, water-treatment chemicals and repeated wet-dry cycles. Fan-deck maintenance, louver access and inspection around the fill require members that work as a connected structure. Pultruded beams, channels, square tubes and angles can form framing, bracing and edge supports; grating and rails complete the service route.",
      "The design must account for the tower's maximum expected water temperature, sustained loads, member buckling, service deflection and the stiffness of bolted joints. Water chemistry and the biocide program affect resin selection. CTI STD-137 addresses pultruded structural products for cooling towers, including material and quality requirements; its use still requires the offered product and project design to be checked.",
      "For refurbishment, provide the existing tower drawings, support positions and the replacement sequence. A lighter component may simplify handling, but the existing anchors, remaining structure and temporary support during change-out still need engineering review.",
    ],
    components: ["I-beams, channels and square tubes", "Angles, grating and louvers", "Guardrails and connection plates"],
    checks: ["Water chemistry, biocides and maximum temperature", "Long-duration loads, buckling and service deflection", "Connections, cut-edge treatment and replacement staging"],
    links: [
      { label: "Cooling tower application guide", href: "/applications/frp-cooling-tower-profiles" },
      { label: "FRP I-beams", href: "/products/fiberglass-structural-shapes/frp-i-beam" },
      { label: "FRP square tubes", href: "/products/fiberglass-structural-shapes/frp-square-tube" },
    ],
  },
  {
    id: "cable-routes",
    number: "04",
    title: "Cable routes through corrosive process areas",
    summary: "Ladders, brackets and supports beside pipe racks and dosing equipment.",
    image: "/images/industries/industrial-cable-support-concept.webp",
    alt: "Illustrated FRP cable ladder on wall brackets in a chemical processing corridor",
    paragraphs: [
      "Electrical and control cables often pass above chemical dosing skids, washdown aisles or outdoor pipe corridors. The support schedule needs more than a route length: cable mass, future fill, support spacing, fittings, turns and the location of each splice all affect deflection and connection demand.",
      "Pultruded channels and angles can form wall brackets and secondary supports; square tubes can serve as posts in a free-standing frame. A cable ladder or tray is a complete system with side rails, rungs or base, splices and fittings. Confirm whether the enquiry is for component profiles, fabricated supports or a qualified complete tray system before citing IEC 61537 or another system standard.",
      "FRP members are nonmetallic, but they do not settle the electrical design. Cable bonding, metallic fasteners, static control, fire and smoke requirements, and any hazardous-area rules remain with the project engineer. State these requirements separately from the chemical exposure specification.",
    ],
    components: ["Channels and angles for brackets", "Square tubes for support posts", "Agreed tray, ladder and fitting package"],
    checks: ["Cable load, future fill, route geometry and support spacing", "Bracket anchors, splices and concentrated maintenance loads", "Electrical, fire and hazardous-area requirements"],
    links: [
      { label: "Cable tray support guide", href: "/applications/frp-cable-tray-supports" },
      { label: "FRP channels", href: "/products/fiberglass-structural-shapes/frp-channel" },
      { label: "Custom profiles", href: "/products/custom-pultruded-profiles" },
    ],
  },
];

const selectionRows = [
  ["Walkway with cutouts", "Molded grating", "/products/molded-frp-grating", "Mesh opening, local supports, clips and removable panels"],
  ["Span-led walking surface", "Pultruded grating", "/products/frp-gratings", "Bearing direction, clear span, loads and deflection"],
  ["Platform or tower frame", "I-beams, channels, tubes and angles", "/products/fiberglass-structural-shapes", "Member stability, connections, temperature and anchors"],
  ["Platform edge protection", "Handrail systems", "/products/frp-handrail-systems", "Guardrail loads, toe boards, post spacing and substrate"],
  ["Vertical and stepped access", "Fixed ladders", "/products/frp-ladders", "Ladder layout, landing transition and anchorage"],
  ["Stair access", "Stair treads", "/products/frp-stair-treads", "Tread span, nosing, slip surface and fixings"],
  ["Cable route supports", "Channels, angles and custom sections", "/applications/frp-cable-tray-supports", "Cable load, support spacing, fittings and system scope"],
];

const faqs = [
  {
    question: "Which industrial chemicals can an FRP profile withstand?",
    answer: "Compatibility depends on the complete laminate and the chemical, concentration, temperature, exposure duration and cleaning cycle. Send the process-chemical list with the enquiry so the offered resin and surface construction can be reviewed for the actual service. Do not apply a generic vinyl-ester rating to every formulation or chemical mixture.",
  },
  {
    question: "When should a plant use molded rather than pultruded grating?",
    answer: "Molded panels are a useful starting point for layouts with frequent openings or multidirectional support. Pultruded panels have a defined bearing-bar direction and suit span-led layouts. Both need a panel-specific load and deflection check, suitable edge support, hold-downs, surface and openings.",
  },
  {
    question: "Can an FRP beam replace a steel beam of the same size?",
    answer: "A direct same-size substitution should not be assumed. Compare the complete assembly against its load cases, deflection limit, buckling, connection bearing and environmental exposure. Retrofitted anchors and the remaining supporting structure also need review.",
  },
  {
    question: "Is every FRP profile fire rated or suitable for a hazardous area?",
    answer: "No. Specify the applicable flame, smoke, structural fire, static-control and hazardous-area requirements for the installed component or assembly. Request reports for the offered laminate and relevant test configuration; a resin label or small-sample rating alone does not establish project acceptance.",
  },
  {
    question: "Can these products be used in food or pharmaceutical production areas?",
    answer: "FRP may be evaluated for non-product-contact access and service areas exposed to frequent washdown. Direct food contact, cleanroom use and validated hygiene performance require separate review of the finished product, surface, joints, cleaning chemicals and the site's acceptance criteria. Do not infer those approvals from a resin ingredient.",
  },
  {
    question: "What should an industrial FRP RFQ include?",
    answer: "Send the layout or marked-up drawings, component schedule, loads and support spacing, chemical and temperature exposure, fire and electrical criteria, fabrication scope, required evidence, quantity, destination and installation timetable. F1 can then confirm the proposed material and supply boundary in its quotation.",
  },
];

export default function IndustrialPage() {
  return (
    <>
      <CollectionSchema name={pageTitle} description={pageDescription} path={pagePath} links={productLinks} />
      <PageHeader
        tag="Industries / Industrial & Chemical"
        title={pageTitle}
        description="Specify the access system around the process: from a tank-side valve platform to a cooling-tower deck or cable corridor, match each FRP component to its loads, exposure and connection details."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Industrial & Chemical" },
        ]}
        actions={{
          primary: { label: "Explore applications", href: "#applications" },
          secondary: { label: "Discuss a plant project", href: quoteHref },
        }}
      />
      <JumpNav items={[
        { label: "Applications", href: "#applications" },
        { label: "Select products", href: "#product-selection" },
        { label: "Plan the RFQ", href: "#rfq" },
        { label: "Resources & FAQ", href: "#resources" },
      ]} />

      <section id="applications" className="scroll-mt-28 bg-white py-[40px] md:py-[55px]">
        <div className="site-container">
          <div className="grid gap-[20px] lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <SectionTag>Four process-area applications</SectionTag>
              <h2 className={heading}>Where FRP components do a specific job</h2>
            </div>
            <p className="max-w-[610px] text-f16 leading-relaxed text-t2">
              F1 supplies pultruded profiles and coordinated access components. The value of a lighter, corrosion-resistant material depends on the real operating route, the chemicals present and the full assembly, including its grating supports, connections and inspection plan.
            </p>
          </div>
          <figure className="mt-[28px]">
            <div className="relative aspect-[3/2] overflow-hidden rounded-card border border-border-default bg-bg2">
              <Image src={heroImage} alt={applications[0].alt} fill sizes="(max-width: 1280px) 100vw, 1212px" className="object-cover" preload />
            </div>
            <figcaption className="mt-[10px] text-f14 leading-relaxed text-t3">
              AI-generated application concept of a chemical tank-access platform, not a documented F1 installation. Member sizes, connections and resin specification require project drawings and engineering review.
            </figcaption>
          </figure>
          <nav aria-label="Industrial application guide" className="mt-[22px] grid gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((application) => (
              <a key={application.id} href={"#" + application.id} className="rounded-card border border-border-default bg-white p-[18px] transition-colors hover:border-teal-border hover:bg-teal-bg">
                <span className="text-f13 font-bold tracking-widest text-teal-text">{application.number}</span>
                <span className="mt-[8px] block text-f16 font-bold text-t1">{application.title}</span>
                <span className="mt-[7px] block text-f14 leading-relaxed text-t2">{application.summary}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg2 py-[55px]">
        <div className="site-container">
          <div className="divide-y divide-border-default">
            {applications.map((application, index) => (
              <article key={application.id} id={application.id} className="scroll-mt-28 py-[42px] first:pt-0 last:pb-0">
                <div className="grid gap-[30px] lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-[50px]">
                  <div>
                    <p className="text-f14 font-bold uppercase tracking-wider text-teal-text">{application.number} / {application.summary}</p>
                    <h2 className="mt-[12px] text-[clamp(24px,2.6vw,32px)] font-bold leading-tight text-t1">{application.title}</h2>
                    {index > 0 ? (
                      <figure className="mt-[22px]">
                        <div className="relative aspect-[3/2] overflow-hidden rounded-card border border-border-default bg-white">
                          <Image src={application.image} alt={application.alt} fill sizes="(max-width: 1024px) 100vw, 820px" className="object-cover" />
                        </div>
                        <figcaption className="mt-[9px] text-f13 leading-relaxed text-t3">AI-generated application concept, not a documented F1 installation. Final geometry and material depend on the project specification.</figcaption>
                      </figure>
                    ) : null}
                    <div className="mt-[20px] space-y-[16px] text-f16 leading-[1.8] text-t2">
                      {application.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    <div className="mt-[20px] flex flex-wrap gap-x-[22px] gap-y-[10px]">
                      {application.links.map((link) => (
                        <Link key={link.href} href={link.href} className="text-f14 font-semibold text-teal-text hover:underline">{link.label} →</Link>
                      ))}
                    </div>
                  </div>
                  <aside className="self-start rounded-card border border-border-default bg-white p-[22px]" aria-label={application.title + " specification summary"}>
                    <h3 className="text-f16 font-bold text-t1">Likely components</h3>
                    <ul className="mt-[12px] list-disc space-y-[8px] pl-[18px] text-f14 leading-relaxed text-t2">
                      {application.components.map((component) => <li key={component}>{component}</li>)}
                    </ul>
                    <h3 className="mt-[22px] border-t border-border-default pt-[18px] text-f16 font-bold text-t1">Confirm before selection</h3>
                    <ul className="mt-[12px] list-disc space-y-[8px] pl-[18px] text-f14 leading-relaxed text-t2">
                      {application.checks.map((check) => <li key={check}>{check}</li>)}
                    </ul>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[55px]">
        <div className="site-container">
          <SectionTag>More demanding plant routes</SectionTag>
          <h2 className={heading}>Extend the same selection method to adjacent equipment</h2>
          <div className="mt-[24px] grid gap-[20px] md:grid-cols-2">
            <article className="rounded-card border border-border-default p-[24px]">
              <h3 className="text-f20 font-bold text-t1">Pump rooms and scrubber access</h3>
              <p className="mt-[13px] text-f16 leading-relaxed text-t2">A maintenance route to pump seals, filter covers, scrubber nozzles or dampers may need removable grating, room for lifting a component and a guarded edge beside equipment. Check localized tool and equipment loads, clear headroom, panel removal sequence, support reactions and the cleaning or condensate chemistry. A grating panel should not obstruct drainage or access to a shut-off point.</p>
              <Link href="/applications/frp-chemical-plant-platforms" className="mt-[16px] inline-block text-f14 font-semibold text-teal-text hover:underline">Plan an access platform →</Link>
            </article>
            <article className="rounded-card border border-border-default p-[24px]">
              <h3 className="text-f20 font-bold text-t1">Wet production and washdown zones</h3>
              <p className="mt-[13px] text-f16 leading-relaxed text-t2">In beverage, food or other wet production buildings, FRP can be evaluated for non-product-contact mezzanines, service stairs and utility corridors exposed to repeated cleaning. Record the washdown temperature, detergents and sanitizers, drainage, slip-surface needs and cleanable joint details. Direct food contact or cleanroom use requires separate finished-product evidence and site approval.</p>
              <Link href="/products/frp-stair-treads" className="mt-[16px] inline-block text-f14 font-semibold text-teal-text hover:underline">Review stair treads and covers →</Link>
            </article>
          </div>
          <p className="mt-[22px] text-f15 leading-relaxed text-t2">For basin edges, treatment tanks and dosing rooms, continue to the dedicated <Link href="/industries/water-wastewater" className="font-semibold text-teal-text hover:underline">water and wastewater industry guide</Link>.</p>
        </div>
      </section>

      <section id="product-selection" className="scroll-mt-28 border-y border-border-default bg-bg2 py-[55px]">
        <div className="site-container">
          <SectionTag>Choose by function</SectionTag>
          <h2 className={heading}>Match the component to the load path</h2>
          <p className="mt-[14px] max-w-[790px] text-f16 leading-relaxed text-t2">Profiles, grating and access assemblies have different reinforcement layouts and design checks. Select a product family only after locating its supports, loads, openings and connections.</p>
          <div role="region" aria-label="Industrial FRP product selection" tabIndex={0} className="mt-[24px] overflow-x-auto rounded-card border border-border-default bg-white">
            <table className="w-full min-w-[760px] text-left text-f14">
              <caption className="sr-only">Industrial application, product family and key design decision</caption>
              <thead className="bg-deep text-white"><tr>{["Component function", "Start with", "What decides the specification"].map((label) => <th key={label} scope="col" className="px-[22px] py-[16px] font-semibold">{label}</th>)}</tr></thead>
              <tbody>
                {selectionRows.map(([functionName, product, href, decision]) => (
                  <tr key={functionName} className="border-t border-border-default">
                    <th scope="row" className="px-[22px] py-[18px] font-semibold text-t1">{functionName}</th>
                    <td className="px-[22px] py-[18px]"><Link href={href} className="font-semibold text-teal-text hover:underline">{product} →</Link></td>
                    <td className="px-[22px] py-[18px] text-t2">{decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-[26px] grid gap-[16px] md:grid-cols-3">
            <div className="rounded-card border border-border-default bg-white p-[22px]"><h3 className="font-bold text-t1">Chemical exposure</h3><p className="mt-[9px] text-f14 leading-relaxed text-t2">Review the complete resin, reinforcement and surface package against concentration, temperature and contact mode. Cut edges and connection hardware are part of the exposure.</p></div>
            <div className="rounded-card border border-border-default bg-white p-[22px]"><h3 className="font-bold text-t1">Structural performance</h3><p className="mt-[9px] text-f14 leading-relaxed text-t2">Check member and panel deflection, local loads, buckling, bearing and anchor reactions. An identical steel and FRP section size does not imply identical performance.</p></div>
            <div className="rounded-card border border-border-default bg-white p-[22px]"><h3 className="font-bold text-t1">Plant safety</h3><p className="mt-[9px] text-f14 leading-relaxed text-t2">Set fire, smoke, electrical, static, slip and fall-protection criteria for the location. Confirm the offered assembly and its evidence against those requirements.</p></div>
          </div>
        </div>
      </section>

      <section id="rfq" className="scroll-mt-28 bg-white py-[55px]">
        <div className="site-container">
          <SectionTag>From site survey to RFQ</SectionTag>
          <h2 className={heading}>Send the conditions that change the design</h2>
          <p className="mt-[14px] max-w-[810px] text-f16 leading-relaxed text-t2">A marked-up layout and a short exposure schedule let F1 define a useful component proposal and the boundary of its supply. For a replacement job, include the existing member and anchor drawings where available.</p>
          <div className="mt-[25px] grid gap-[18px] md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "01 / Process environment", items: ["Chemicals, concentration and cleaning agents", "Operating and cleaning temperatures", "Splash, mist, immersion, UV and washdown frequency"] },
              { title: "02 / Geometry and loads", items: ["Plan, elevations, openings and access route", "Spans, support spacing and load cases", "Deflection, grating direction and surface needs"] },
              { title: "03 / Interfaces and rules", items: ["Anchors, base material and connection details", "Guardrails, stairs, ladders and egress basis", "Fire, smoke, electrical and hygiene requirements"] },
              { title: "04 / Supply and evidence", items: ["Profiles, panels or fabricated component package", "Drawings, tests, samples and inspection records", "Quantity, destination and installation window"] },
            ].map((group) => (
              <div key={group.title} className="rounded-card border border-border-default bg-bg2 p-[22px]">
                <h3 className="text-f16 font-bold text-t1">{group.title}</h3>
                <ul className="mt-[13px] list-disc space-y-[9px] pl-[18px] text-f14 leading-relaxed text-t2">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="mt-[20px] text-f14 leading-relaxed text-t3">The engineer of record confirms the governing code, complete load path and acceptance of the installed system. F1&apos;s proposed resin, fabrication and evidence are confirmed for the quoted product.</p>
        </div>
      </section>

      <section id="resources" className="scroll-mt-28 border-t border-border-default bg-bg2 py-[55px]">
        <div className="site-container">
          <SectionTag>Continue the design</SectionTag>
          <h2 className={heading}>Product data and primary design references</h2>
          <div className="mt-[24px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Product evidence", href: "/resources/evidence", body: "Find the available records for the proposed material or assembly." },
              { label: "Technical data", href: "/resources/technical-data", body: "Review material properties and identify the required submittals." },
              { label: "Design guides", href: "/resources/design-guides", body: "Continue into structural and connection planning." },
              { label: "Downloads & CAD", href: "/resources/downloads", body: "Request drawings and reference documents for a defined package." },
            ].map((resource) => (
              <Link key={resource.href} href={resource.href} className="rounded-card border border-border-default bg-white p-[20px] hover:border-teal-border">
                <h3 className="font-bold text-t1">{resource.label} <span aria-hidden="true" className="text-teal-text">→</span></h3>
                <p className="mt-[8px] text-f14 leading-relaxed text-t2">{resource.body}</p>
              </Link>
            ))}
          </div>
          <div className="mt-[30px] rounded-card border border-border-default bg-white p-[24px]">
            <h3 className="text-f18 font-bold text-t1">Reference the relevant system standard</h3>
            <p className="mt-[9px] text-f14 leading-relaxed text-t2">These sources define design questions; they are not a certification claim for a particular F1 product. Use the edition and jurisdiction specified by the project.</p>
            <ul className="mt-[14px] grid gap-x-[25px] gap-y-[10px] text-f14 md:grid-cols-2">
              <li><a className="font-semibold text-teal-text hover:underline" href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.22">OSHA 1910.22 · walking-working surfaces ↗</a></li>
              <li><a className="font-semibold text-teal-text hover:underline" href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.29">OSHA 1910.29 · guardrail systems ↗</a></li>
              <li><a className="font-semibold text-teal-text hover:underline" href="https://webstore.ansi.org/standards/ansi/ansiacmafgmcfg01172025">ANSI/ACMA/FGMC · FRP grating manual ↗</a></li>
              <li><a className="font-semibold text-teal-text hover:underline" href="https://www.cti.org/blogs/posts/fiberglass-pultruded-structural-products-for-use-in-cooling-towers">CTI · cooling-tower pultrusions ↗</a></li>
              <li><a className="font-semibold text-teal-text hover:underline" href="https://webstore.iec.ch/en/publication/31963">IEC 61537 · cable tray and ladder systems ↗</a></li>
              <li><a className="font-semibold text-teal-text hover:underline" href="https://sp360.asce.org/personifyebusiness/Merchandise/Product-Details/productId/309903818">ASCE/SEI 74-23 · pultruded FRP structures ↗</a></li>
            </ul>
          </div>
          <FAQ items={faqs} title="Industrial FRP specification questions" />
        </div>
      </section>
      <InnerCTA title="Plan the FRP package around your plant drawings" quoteHref={quoteHref} />
    </>
  );
}
