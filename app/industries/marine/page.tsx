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

const pageTitle = "FRP for Marine Docks, Walkways & Access Platforms";
const pageDescription =
  "Explore FRP grating, decking, structural profiles and access systems for marinas, coastal boardwalks, offshore platforms and seawater facilities.";
const pagePath = "/industries/marine";
const heroImage = "/images/industries/marine-marina-access-concept.webp";
const quoteHref = buildRfqHref({
  source: "marine-industry",
  product: "FRP components for a marine project",
  productPath: pagePath,
});
const heading = "mt-[13px] text-[clamp(26px,3vw,36px)] font-bold leading-tight tracking-[-0.02em] text-t1";

const applications = [
  {
    id: "marinas",
    number: "01",
    title: "Marinas & finger piers",
    heading: "Plan the route from shore ramp to berth",
    intro: "A marina route changes from a moving gangway to the main dock and then to narrow finger piers. Each part needs its own walking surface, support and edge detail.",
    paragraphs: [
      "Open FRP grating gives rain and spray a path through the deck. Molded square or mini mesh can suit short panels with frequent utility cutouts; pultruded bearing-bar grating is a candidate when a defined one-way span governs. A closed FRP deck panel may suit a continuous walking surface, but its joints, slope and drainage need separate design.",
      "For a floating dock, show how panels bear on the frame, how hold-downs fit the supports, and how the deck meets hinged gangways, cleats, service pedestals and removable access covers. Gangway slope, heel and wheel openings, wet slip resistance, edge protection and maintenance access all affect the finished route.",
      "Where habitat rules apply, ask the permitting authority for the required light-transmitting deck area. Panel open area is only one input: joists, floats and service equipment also shade the water below. The open mesh still needs a load and accessibility check for the actual pier layout.",
    ],
    checks: [
      "Gangway movement, transitions and berth-side clear width",
      "Pedestrian, trolley and concentrated service loads",
      "Mesh opening, wet slip surface and accessibility rules",
      "Panel bearing, hold-downs, cutouts and permit conditions",
    ],
    products: [
      { label: "Molded FRP grating", href: "/products/molded-frp-grating" },
      { label: "Pultruded FRP grating", href: "/products/frp-gratings" },
      { label: "Structural FRP deck panels", href: "/products/frp-deck-panels" },
    ],
  },
  {
    id: "boardwalks",
    number: "02",
    title: "Coastal boardwalks",
    heading: "Coordinate the deck with the shoreline below it",
    intro: "Tidal trails, viewing platforms and waterfront promenades put public access above salt spray, windblown sand and sensitive ground or water.",
    image: "/images/industries/marine-coastal-boardwalk-concept.webp",
    imageAlt: "Conceptual raised coastal boardwalk with open fiberglass grating and edge rails beside a tidal shoreline",
    paragraphs: [
      "Open grating can shed water and allow some light through the walkway. The effect beneath a real boardwalk depends on its height, width, direction, support framing and surroundings, so habitat and permit requirements belong in the early layout.",
      "Match the panel to the route: a public promenade may need smaller openings or a continuous surface where mobility aids, narrow wheels or dropped-object concerns govern. A maintenance-only branch may use a different mesh and access arrangement. On either route, check the grit surface, panel edges, transitions and replaceable sections.",
      "Pultruded beams, channels or tubes can form an engineered support frame; FRP handrail components can complete the edge. The project engineer must check wind, pedestrian loads, deflection, connections, foundations and any flood or wave action at the site.",
    ],
    checks: [
      "Public-access loads, wheel paths and permitted openings",
      "Flood level, tidal splash, UV and cleaning exposure",
      "Under-deck shading, supports and local habitat conditions",
      "Guardrail loads, anchorage and replaceable deck details",
    ],
    products: [
      { label: "Molded FRP grating", href: "/products/molded-frp-grating" },
      { label: "Fiberglass structural shapes", href: "/products/fiberglass-structural-shapes" },
      { label: "FRP handrail systems", href: "/products/frp-handrail-systems" },
    ],
  },
  {
    id: "offshore",
    number: "03",
    title: "Offshore secondary access",
    heading: "Specify walkways around the actual hazard area",
    intro: "Offshore wind and energy facilities need routes to equipment, inspection points and service landings that remain usable in exposed, wet conditions.",
    image: "/images/industries/marine-offshore-access-concept.webp",
    imageAlt: "Conceptual offshore service platform with open fiberglass walkway grating, handrails and a ladder near equipment",
    paragraphs: [
      "FRP grating, stair treads, ladders, handrails and pultruded members can be considered as a coordinated secondary access package. Identify the bearing direction and support spacing for each panel, then check personnel and equipment loads, deflection, fastening, dropped-object risk and the route to a safe exit.",
      "Fire and blast exposure, emergency escape function and platform rules can govern material choice. A resin description or a generic flame-spread result does not approve an installed offshore assembly. Request evidence for the proposed product and have the platform designer or relevant authority review it against the project's acceptance basis.",
      "On a vessel, a removable service grating or maintenance access member is a separate design case. Shipboard location, fire zone, flag-state and class requirements must be established before offering a part for that duty. Passenger spaces, primary escape routes and ship structures require their own approval path.",
    ],
    checks: [
      "Access function, personnel and equipment loading, escape route",
      "Fire scenario and project or class acceptance basis",
      "Wind uplift, vibration, support spacing and fixing inspection",
      "Product-specific reports for the proposed resin and assembly",
    ],
    products: [
      { label: "Pultruded FRP grating", href: "/products/frp-gratings" },
      { label: "FRP stair treads", href: "/products/frp-stair-treads" },
      { label: "Fiberglass fixed ladders", href: "/products/frp-ladders" },
    ],
  },
  {
    id: "seawater",
    number: "04",
    title: "Seawater & aquaculture facilities",
    heading: "Keep pumps, tanks and feeding equipment accessible",
    intro: "Intake structures, pump stations and aquaculture service areas need removable access around pipes and equipment, often with frequent washdown.",
    image: "/images/industries/marine-seawater-pump-platform-concept.webp",
    imageAlt: "Conceptual seawater pump service platform with fiberglass grating, structural supports and edge protection",
    paragraphs: [
      "Molded grating is useful to evaluate where the plan contains multiple pipe penetrations or irregular panels; pultruded grating can be evaluated where one-way span or stiffness is the primary driver. Mark cutouts and lifting points on the panel drawing so each removable piece retains bearing and a defined hold-down pattern.",
      "A complete access package may combine structural channels or beams, grating, stairs, ladders and handrails. Lay out valve reach, pump withdrawal, hose routes and safe cleaning access before choosing panel widths or post positions. Equipment handling loads need their own check; a pedestrian grating selection does not establish machine support capacity.",
      "Specify the actual liquid and cleaning chemicals, concentration, temperature, immersion or splash frequency, outdoor exposure and fastener environment. Resin, surfacing veil, cut-edge sealing and metal hardware are then reviewed for the service conditions and documented in the approved order data.",
    ],
    checks: [
      "Pipe penetrations, removable panels and maintenance clearances",
      "Foot traffic versus equipment and lifting loads",
      "Seawater, cleaning chemicals, temperature and UV exposure",
      "Resin selection, cut-edge treatment and fastener material",
    ],
    products: [
      { label: "Molded FRP grating", href: "/products/molded-frp-grating" },
      { label: "Fiberglass structural shapes", href: "/products/fiberglass-structural-shapes" },
      { label: "FRP handrail systems", href: "/products/frp-handrail-systems" },
    ],
  },
] as const;

const productDirectory = [
  { label: "Molded FRP grating", href: "/products/molded-frp-grating", detail: "Two-way mesh for cutouts and varied panel layouts." },
  { label: "Pultruded FRP grating", href: "/products/frp-gratings", detail: "One-way bearing bars for defined spans and load direction." },
  { label: "Structural FRP deck panels", href: "/products/frp-deck-panels", detail: "Closed deck profiles with project-specific joints and drainage." },
  { label: "Fiberglass structural shapes", href: "/products/fiberglass-structural-shapes", detail: "Beams, channels, angles and tubes for engineered supports." },
  { label: "FRP handrail systems", href: "/products/frp-handrail-systems", detail: "Posts, rails and fittings for project-checked edge protection." },
  { label: "FRP stair treads", href: "/products/frp-stair-treads", detail: "Treads for access routes, coordinated with landings and rails." },
  { label: "Fiberglass fixed ladders", href: "/products/frp-ladders", detail: "Ladder systems with project-specific attachment and safety details." },
] as const;

const selectionRows = [
  ["Frequent cutouts or changing panel direction", "Molded grating", "Mesh opening, local bearing at cuts, surface and hold-downs"],
  ["Defined one-way grating span", "Pultruded grating", "Bearing-bar direction, load table, deflection and support width"],
  ["Continuous walking surface", "Closed deck panels", "Joint load transfer, drainage, slip surface and edge closure"],
  ["Framing and edge protection", "Structural shapes + handrails", "Member and connection loads, anchors, hardware and inspection access"],
];

const faqs = [
  {
    question: "Which FRP deck is best for a marina finger pier?",
    answer: "Start with the pier's clear span, support layout, pedestrian or trolley loads, allowable deck openings, wet slip requirement and local overwater permit. Molded grating, pultruded grating and closed deck panels solve different layout problems; select the panel and its fixings as one assembly.",
  },
  {
    question: "Does open FRP grating satisfy a dock light-transmission permit?",
    answer: "An open panel may help transmit light, but compliance depends on the local permit and the complete dock. Framing, floats and equipment can block light below a panel. Submit the proposed panel open area and full overwater layout for permitting review.",
  },
  {
    question: "Can a marine FRP grating carry carts or equipment?",
    answer: "Only after the selected panel, support spacing and load footprint are checked. Wheel and leg loads can govern differently from pedestrian loading. Request load and deflection data for the exact grating configuration and show any equipment route on the drawing.",
  },
  {
    question: "Are these FRP products approved for offshore or shipboard use?",
    answer: "Application and approval depend on the proposed product, fire scenario, location and governing project, flag-state or class rules. Ask for the relevant test reports and have the responsible designer or approval authority review the finished assembly. No general offshore or shipboard approval is claimed here.",
  },
  {
    question: "What should a marine FRP RFQ include?",
    answer: "Send a marked plan, component schedule, support spans, pedestrian and concentrated loads, location and exposure, required surface and openings, connection details, governing standards, documentation needs, quantities and delivery destination. Include any overwater permit or ship/class requirement at the start.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: heroImage,
});

export default function MarinePage() {
  return (
    <>
      <CollectionSchema name={pageTitle} description={pageDescription} path={pagePath} links={productDirectory} />
      <PageHeader
        tag="Industries / Marine & Offshore"
        title={pageTitle}
        description="From marina finger piers to offshore service routes, choose the walking surface, supports and access components around the real loads, exposure and approval path."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Marine & Offshore" },
        ]}
        actions={{
          primary: { label: "Explore applications", href: "#applications" },
          secondary: { label: "Discuss your project", href: quoteHref },
        }}
      />
      <JumpNav items={[
        { label: "Where FRP fits", href: "#application-map" },
        { label: "Marine applications", href: "#applications" },
        { label: "Product selection", href: "#product-selection" },
        { label: "Project brief", href: "#project-brief" },
        { label: "Resources & FAQ", href: "#resources" },
      ]} />

      <section id="application-map" className="scroll-mt-28 bg-white py-[40px] md:py-[55px]">
        <div className="site-container">
          <SectionTag>Marine application map</SectionTag>
          <h2 className={heading}>Design the route, not just the panel</h2>
          <p className="mt-[16px] max-w-[900px] text-f16 leading-relaxed text-t2">
            Salt-laden air, splash and washdown make marine access a system decision. Open grating drains; closed decking changes the walking surface and water path; pultruded shapes support a designed span. Resin, hardware, fire exposure and inspection requirements follow the site and component duty.
          </p>
          <figure className="mt-[28px]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-border-default bg-bg2">
              <Image src={heroImage} alt="Conceptual marina finger piers with fiberglass grating walkways, mooring cleats, piles and boats alongside" fill sizes="(max-width: 1280px) 100vw, 1212px" className="object-cover" preload />
            </div>
            <figcaption className="mt-[10px] text-f14 leading-relaxed text-t3">
              Conceptual AI visualization of a marina access route. It is not an installed F1 Composite project or an approved structural detail.
            </figcaption>
          </figure>
          <nav aria-label="Marine application areas" className="mt-[24px] grid gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((application) => (
              <a key={application.id} href={`#${application.id}`} className="rounded-card border border-border-default bg-bg2 p-[18px] transition-colors hover:border-teal-border hover:bg-teal-bg">
                <span className="text-f13 font-bold tracking-widest text-teal-text">{application.number}</span>
                <span className="mt-[7px] block text-f16 font-bold text-t1">{application.title} <span aria-hidden="true" className="text-teal-text">↗</span></span>
                <span className="mt-[7px] block text-f13 leading-relaxed text-t2">{application.intro}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="applications" className="scroll-mt-28 border-y border-border-default bg-bg2 py-[55px]">
        <div className="site-container">
          <SectionTag>Application & design guide</SectionTag>
          <h2 className={heading}>Four places to put the specification to work</h2>
          <p className="mt-[16px] max-w-[900px] text-f16 leading-relaxed text-t2">
            Each setting has a different load path and maintenance routine. Use these application notes to prepare an engineering discussion, then confirm the final assembly against project drawings and test evidence.
          </p>
          <div className="mt-[30px] divide-y divide-border-default">
            {applications.map((application) => (
              <article key={application.id} id={application.id} className="scroll-mt-28 py-[40px] first:pt-0">
                <div className="grid gap-[28px] lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-[50px]">
                  <div>
                    <p className="text-f14 font-bold uppercase tracking-wider text-teal-text">{application.number} / {application.title}</p>
                    <h3 className="mt-[10px] text-f24 font-bold leading-snug text-t1">{application.heading}</h3>
                    <p className="mt-[16px] text-f17 font-medium leading-relaxed text-t1">{application.intro}</p>
                    <div className="mt-[18px] space-y-[16px] text-f16 leading-[1.8] text-t2">
                      {application.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    <div className="mt-[23px] flex flex-wrap gap-x-[22px] gap-y-[10px]">
                      {application.products.map((product) => (
                        <Link key={product.href} href={product.href} className="text-f14 font-semibold text-teal-text underline decoration-teal-border underline-offset-4 hover:text-teal">
                          {product.label} <span aria-hidden="true">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <aside className="self-start rounded-card border border-border-default bg-white p-[22px]" aria-label={`${application.title} design inputs`}>
                    <h4 className="text-f16 font-bold text-t1">Bring to the specification</h4>
                    <ul className="mt-[15px] list-disc space-y-[11px] pl-[18px] text-f14 leading-relaxed text-t2">
                      {application.checks.map((check) => <li key={check}>{check}</li>)}
                    </ul>
                  </aside>
                </div>
                {"image" in application ? (
                  <figure className="mt-[28px] max-w-[850px]">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-border-default bg-white">
                      <Image src={application.image} alt={application.imageAlt} fill sizes="(max-width: 1280px) 100vw, 850px" className="object-cover" />
                    </div>
                    <figcaption className="mt-[9px] text-f13 leading-relaxed text-t3">
                      Conceptual AI visualization of {application.title.toLowerCase()}. It is not an installed F1 Composite project or an approved structural detail.
                    </figcaption>
                  </figure>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="product-selection" className="scroll-mt-28 bg-white py-[55px]">
        <div className="site-container">
          <SectionTag>Marine product selection</SectionTag>
          <h2 className={heading}>Choose the component by its job</h2>
          <p className="mt-[16px] max-w-[900px] text-f16 leading-relaxed text-t2">
            Molded grating, pultruded grating and closed deck panels are different constructions. Compare the proposed part with its supports, connections and surface treatment before selecting a fiberglass deck.
          </p>
          <div role="region" aria-label="Marine FRP product selection comparison" tabIndex={0} className="mt-[25px] overflow-x-auto rounded-card border border-border-default">
            <table className="w-full min-w-[760px] text-left text-f14">
              <caption className="sr-only">Marine application condition, likely product and design checks</caption>
              <thead className="bg-deep text-white"><tr>{["Design condition", "Product to evaluate", "Check before release"].map((label) => <th key={label} scope="col" className="px-[20px] py-[15px] font-semibold">{label}</th>)}</tr></thead>
              <tbody>{selectionRows.map(([condition, choice, check]) => <tr key={condition} className="border-t border-border-default"><th scope="row" className="px-[20px] py-[17px] font-semibold text-t1">{condition}</th><td className="px-[20px] py-[17px] text-t2">{choice}</td><td className="px-[20px] py-[17px] text-t2">{check}</td></tr>)}</tbody>
            </table>
          </div>
          <h3 className="mt-[38px] text-f24 font-bold text-t1">Explore the available product families</h3>
          <div className="mt-[18px] grid gap-[15px] sm:grid-cols-2 lg:grid-cols-3">
            {productDirectory.map((product) => (
              <Link key={product.href} href={product.href} className="rounded-card border border-border-default bg-bg2 p-[20px] transition-colors hover:border-teal-border hover:bg-teal-bg">
                <h4 className="text-f16 font-bold text-t1">{product.label} <span aria-hidden="true" className="text-teal-text">→</span></h4>
                <p className="mt-[8px] text-f14 leading-relaxed text-t2">{product.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="project-brief" className="scroll-mt-28 border-y border-border-default bg-bg2 py-[55px]">
        <div className="site-container">
          <SectionTag>From concept to marine RFQ</SectionTag>
          <h2 className={heading}>Send the conditions that determine the assembly</h2>
          <div className="mt-[24px] grid gap-[20px] md:grid-cols-2">
            <div className="rounded-card border border-border-default bg-white p-[24px]">
              <h3 className="text-f18 font-bold text-t1">Location, loads and geometry</h3>
              <ul className="mt-[14px] list-disc space-y-[10px] pl-[18px] text-f15 leading-relaxed text-t2">
                <li>Mark each deck, support, stair, ladder and rail on the layout.</li>
                <li>Show spans, support width, openings, steps and access clearances.</li>
                <li>State pedestrian, cart, equipment, wheel and maintenance loads separately.</li>
                <li>Identify moving dock joints, flood or wave action, and any shipboard duty.</li>
              </ul>
            </div>
            <div className="rounded-card border border-border-default bg-white p-[24px]">
              <h3 className="text-f18 font-bold text-t1">Exposure, approval and supply</h3>
              <ul className="mt-[14px] list-disc space-y-[10px] pl-[18px] text-f15 leading-relaxed text-t2">
                <li>Describe immersion, splash, salt air, UV, temperature and cleaning media.</li>
                <li>Provide slip, opening, accessibility and overwater permit requirements.</li>
                <li>Name fire, offshore, flag-state or class requirements where applicable.</li>
                <li>List resin, color, fixings, reports, drawings, quantities and destination needed for quotation.</li>
              </ul>
            </div>
          </div>
          <p className="mt-[22px] max-w-[900px] text-f15 leading-relaxed text-t2">
            Ask for load and deflection data tied to the selected panel and span, compatible resin and fastener details, and any required fire or slip reports for the offered assembly. A catalog section or generic material claim alone does not define project capacity or approval.
          </p>
          <Link href={quoteHref} className="mt-[18px] inline-flex rounded-[7px] bg-teal-text px-[20px] py-[12px] text-f14 font-bold text-white transition-colors hover:bg-teal">
            Send a marine project brief <span aria-hidden="true" className="ml-[8px]">→</span>
          </Link>
        </div>
      </section>

      <section id="resources" className="scroll-mt-28 bg-white py-[55px]">
        <div className="site-container">
          <SectionTag>Evidence & further reading</SectionTag>
          <h2 className={heading}>Review the applicable design and approval basis</h2>
          <p className="mt-[16px] max-w-[900px] text-f16 leading-relaxed text-t2">
            These references explain why deck layout, composite component design and shipboard fire context need separate checks. They do not certify any F1 product or replace local project requirements.
          </p>
          <div className="mt-[24px] grid gap-[14px] md:grid-cols-2">
            <a href="https://www.fisheries.noaa.gov/west-coast/habitat-conservation/seagrass-west-coast" target="_blank" rel="noopener noreferrer" className="rounded-card border border-border-default p-[20px] hover:border-teal-border">
              <h3 className="font-bold text-t1">NOAA: seagrass and overwater structures <span aria-hidden="true" className="text-teal-text">↗</span></h3>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">Shading and habitat considerations for docks and marinas.</p>
            </a>
            <a href="https://www.dnv.com/energy/standards-guidelines/dnv-st-c501-composite-components/" target="_blank" rel="noopener noreferrer" className="rounded-card border border-border-default p-[20px] hover:border-teal-border">
              <h3 className="font-bold text-t1">DNV-ST-C501: composite components <span aria-hidden="true" className="text-teal-text">↗</span></h3>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">A framework covering composite design, fabrication and installation.</p>
            </a>
            <a href="https://store.astm.org/f3059-24.html" target="_blank" rel="noopener noreferrer" className="rounded-card border border-border-default p-[20px] hover:border-teal-border">
              <h3 className="font-bold text-t1">ASTM F3059-24: marine FRP grating <span aria-hidden="true" className="text-teal-text">↗</span></h3>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">Marine construction and shipbuilding grating specification; confirm whether it applies to your installation.</p>
            </a>
            <a href="https://www.imo.org/en/mediacentre/meetingsummaries/pages/sdc-12.aspx" target="_blank" rel="noopener noreferrer" className="rounded-card border border-border-default p-[20px] hover:border-teal-border">
              <h3 className="font-bold text-t1">IMO: FRP in ship structures <span aria-hidden="true" className="text-teal-text">↗</span></h3>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">Fire-safety context for evaluating FRP elements onboard ships.</p>
            </a>
          </div>
          <FAQ items={faqs} title="Questions about marine FRP applications" />
        </div>
      </section>
      <InnerCTA title="Bring your marine drawings to the discussion" quoteHref={quoteHref} />
    </>
  );
}
