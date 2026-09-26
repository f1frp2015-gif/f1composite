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

const pagePath = "/industries/vehicle";
const pageTitle = "FRP Profiles for Vehicle & Transport Components";
const pageDescription =
  "FRP profiles for bus bodies, refrigerated trailer walls, railcar interiors and specialty vehicles. See component locations, design checks and product options.";
const quoteHref = buildRfqHref({
  source: "vehicle-industry",
  product: "Pultruded FRP profiles for a vehicle or transport project",
  productPath: pagePath,
});
const container = "site-container";
const heading = "mt-[13px] text-[clamp(26px,3vw,36px)] font-bold leading-tight tracking-[-0.02em] text-t1";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/images/industries/vehicle-bus-body-concept.webp",
});

const products = [
  {
    label: "Custom pultruded profiles",
    href: "/products/custom-pultruded-profiles",
    description: "Develop an OEM-specific section with the flange, return, channel or finished face needed at the assembly interface.",
  },
  {
    label: "FRP channels",
    href: "/products/fiberglass-structural-shapes/frp-channel",
    description: "A starting geometry for selected support rails and frames when the section and connections meet the duty cycle.",
  },
  {
    label: "FRP square tubes",
    href: "/products/fiberglass-structural-shapes/frp-square-tube",
    description: "Closed sections for selected brackets, rails and equipment surrounds where torsion and fixing details are checked.",
  },
  {
    label: "FRP angles",
    href: "/products/fiberglass-structural-shapes/frp-angle",
    description: "Simple edge or attachment members outside the crash load path, after local bearing checks.",
  },
];

const scenarios = [
  {
    id: "bus",
    number: "01",
    label: "Bus & coach",
    title: "Repeatable body details around a metal vehicle structure",
    lead: "Long, consistent sections make pultrusion a useful option for selected bus and coach parts. A custom profile can combine a mounting land, an edge return and a finished face, reducing the number of small pieces in an assembly.",
    details: [
      "Candidate locations include roof-edge and ceiling rails, luggage-door frames, interior panel supports, HVAC duct supports and service-hatch surrounds. These are component opportunities, not a claim that a standard FRP section can replace a complete bus frame. An OEM may retain metal members for the primary load path and crash structure while evaluating composites in the surrounding details.",
      "A ceiling rail sees vibration, temperature changes and loads from fixtures over many service cycles. A luggage-door frame adds repeated opening, latch and hinge forces. Define these load cases and the allowable movement before setting the section thickness or fastening pattern. Bonded joints need substrate preparation and production controls; bolted joints need bearing, edge-distance and clamp-load checks.",
    ],
    components: [
      "Roof-edge, ceiling and interior-panel support rails",
      "Luggage-door, hatch and HVAC duct framing",
      "Custom flanges or channels matched to metal interfaces",
    ],
    checks: [
      "Attachment loads, fatigue, vibration and allowable deflection",
      "Joint design, differential movement and production tolerances",
      "Impact, surface finish and any vehicle-specific fire requirement",
    ],
    image: null,
    alt: "",
  },
  {
    id: "reefer",
    number: "02",
    label: "Refrigerated truck & trailer",
    title: "Wall sideposts that support the body without creating an obvious metal heat path",
    lead: "A refrigerated body is an assembly of outer skin, insulation, internal liner, posts, doors and fasteners. A pultruded GFRP sidepost can provide a repeatable fixing surface within that wall while reducing the conductive path associated with a metal post.",
    details: [
      "The geometry must suit the panel spacing, insulation thickness and liner fastening method. At high-impact positions, the post may need a different section or a reinforced local attachment. Door-edge and corner details also depend on gasket compression, drainage and repair access; they should be designed as part of the body rather than copied from a metal section.",
      "The lower thermal conductivity of a fiberglass profile does not establish the energy use of the finished trailer. Compare complete wall or body assemblies with the same insulation, joints and test method. Validate fastener strength, cargo impact, washdown, moisture ingress and temperature cycling alongside thermal performance.",
    ],
    components: [
      "Insulated-wall sideposts and liner fixing rails",
      "Door-edge, corner and panel-support details",
      "Custom sections integrated with the foam and skin build-up",
    ],
    checks: [
      "Wall-level heat transfer and condensation risk",
      "Cargo impact, fastener pull-through and joint sealing",
      "Washdown, moisture ingress and repair procedure",
    ],
    image: "/images/industries/vehicle-reefer-body-concept.webp",
    alt: "Concept cutaway of a refrigerated trailer wall showing fiberglass sideposts, insulated panels and an interior liner",
  },
  {
    id: "rail",
    number: "03",
    label: "Rail vehicle",
    title: "Exterior and interior secondary parts with a defined fire test route",
    lead: "Railcar body details need repeatable dimensions, a durable surface and clear installation interfaces. Pultruded profiles can be evaluated for roof-edge and skirt details, window reveals, interior ceiling supports, luggage-rack elements and cable covers.",
    details: [
      "These parts may be bonded or mechanically fixed to a metal carbody. The joint must transfer the specified service loads and accommodate tolerances, temperature movement, vibration and maintenance access. For exterior pieces, review weathering, cleaning agents and finish repair. For interior pieces, include passenger contact, fixture loads and the complete installed configuration in the design review.",
      "Fire performance is assigned to the particular component and its operating context. The rail customer should state the applicable requirement set and hazard level under EN 45545-2 or the governing local standard. Ask for test evidence for the offered resin, reinforcement, surface veil, coating and assembly; a generic statement about phenolic or fire-retardant resin is not product approval.",
    ],
    components: [
      "Roof-edge, sidewall and skirt support details",
      "Interior ceiling, luggage-rack and window-surround profiles",
      "Cable-cover and equipment-enclosure sections",
    ],
    checks: [
      "Applicable fire requirement set, hazard level and tested configuration",
      "Bonded or bolted joint evidence and fatigue loads",
      "Exterior weathering or interior wear and cleaning regime",
    ],
    image: "/images/industries/vehicle-rail-interior-concept.webp",
    alt: "Concept unfinished railcar body with light-colored ceiling support rails inside a metal shell",
  },
  {
    id: "specialty",
    number: "04",
    label: "Specialty commercial vehicle",
    title: "Equipment enclosures and service-body details exposed to hard use",
    lead: "Utility, maintenance and other specialty fleets carry equipment in wet, dirty and frequently washed compartments. FRP profiles can be considered for equipment-door frames, removable panel edges, cable-protection covers and secondary mounting rails.",
    details: [
      "The useful boundary is the component and its function. A profile that supports an access panel is different from a crash member, occupant restraint anchor or lifting point. The vehicle designer must identify those safety-critical load paths and approve any material change before supply.",
      "Define the actual exposure: road salt, detergents, oil mist, sunlight, standing water or chemical splash. Resin selection, finish, drainage and compatible hardware follow from that service profile. Where field repair matters, agree a replaceable joint and inspection method early in the design.",
    ],
    components: [
      "Equipment-door and removable-panel frames",
      "Cable-protection covers and compartment edging",
      "Secondary rails for approved equipment attachments",
    ],
    checks: [
      "Equipment mass, local loads and access-door cycles",
      "Chemical, UV and road-salt exposure",
      "Inspection, replacement and compatible fasteners",
    ],
    image: "/images/industries/vehicle-specialty-body-concept.webp",
    alt: "Concept service vehicle equipment compartment with fiberglass panel edging and secondary support rails",
  },
];

const selectionRows = [
  ["Bus ceiling or luggage-door detail", "Custom flange, channel or hollow section", "Fixture and latch loads; deflection; joint fatigue; finish"],
  ["Refrigerated wall sidepost", "Custom insulating sidepost matched to the wall stack", "Panel fastening; cargo impact; whole-wall thermal test; sealing"],
  ["Rail exterior or interior profile", "Custom rail, cover or formed edge profile", "Fire requirement set; joint and fatigue test; finish and access"],
  ["Specialty body compartment", "Custom section or checked standard tube/angle", "Equipment loads; exposure; service replacement"],
];

const faqs = [
  {
    question: "Can an FRP profile replace a steel vehicle frame member?",
    answer: "Only after the vehicle engineer checks that specific member and its connections against the full load and safety requirements. The applications here focus on selected secondary components. A primary crash structure, occupant restraint anchor or other safety-critical member needs an OEM-led validation program.",
  },
  {
    question: "How much vehicle weight will a fiberglass profile save?",
    answer: "Material density is only the starting point. A lower-modulus material may need a deeper or differently shaped section to meet the same stiffness target. Compare the installed part, including joints and supporting hardware, against the same loads, deflection limits and production scope before quoting a weight reduction.",
  },
  {
    question: "Will fiberglass sideposts reduce a refrigerated trailer's energy use?",
    answer: "They can reduce a conductive path through the wall when designed into an insulated assembly. The trailer's actual heat loss also depends on foam, skins, doors, joints and air leakage. Request a wall- or body-level thermal comparison using the same test conditions; profile data alone cannot establish refrigeration energy savings.",
  },
  {
    question: "Are FRP profiles automatically compliant with EN 45545-2?",
    answer: "No. The rail buyer must identify the component's requirement set and hazard level. Compliance depends on the tested formulation and end-use configuration, including any surface treatment or coating. Request relevant reports for the proposed profile before treating it as qualified.",
  },
  {
    question: "Can FRP provide electrical insulation in an electric vehicle?",
    answer: "A suitable glass-fiber profile can help separate selected components electrically, but the finished vehicle still requires its own high-voltage architecture, insulation and safety validation. State the voltage, environment, creepage and clearance needs in the enquiry so the proposed part can be evaluated in context.",
  },
];

const resources = [
  { label: "Custom pultrusion process", href: "/products/custom-pultruded-profiles", description: "See how an application-specific section moves from drawing and tooling to production." },
  { label: "Technical data", href: "/resources/technical-data", description: "Review available profile properties and identify the tests needed for your part." },
  { label: "Product evidence", href: "/resources/evidence", description: "Check the scope of published reports and request evidence for the offered formulation." },
  { label: "Design guides", href: "/resources/design-guides", description: "Continue into member sizing, fabrication and connection details." },
];

export default function VehiclePage() {
  return (
    <>
      <CollectionSchema name={pageTitle} description={pageDescription} path={pagePath} links={products} />
      <PageHeader
        tag="Industries / Vehicle & Transport"
        title={pageTitle}
        description="Explore where continuous fiberglass profiles fit in buses, refrigerated bodies, railcars and specialty fleets—and what the vehicle engineer needs to verify before approval."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Vehicle & Transport" },
        ]}
        actions={{
          primary: { label: "Explore applications", href: "#applications" },
          secondary: { label: "Discuss a vehicle part", href: quoteHref },
        }}
      />
      <JumpNav items={[
        { label: "Applications", href: "#applications" },
        { label: "Profile selection", href: "#products" },
        { label: "Design & RFQ", href: "#specification" },
        { label: "Resources & FAQ", href: "#resources" },
      ]} />

      <section className="bg-white py-[40px] md:py-[55px]">
        <div className={container}>
          <div className="grid gap-[24px] lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <SectionTag>Design the component, then select the material</SectionTag>
              <h2 className={heading}>Four vehicle settings, different reasons to specify FRP</h2>
              <p className="mt-[18px] text-f16 leading-relaxed text-t2">
                Pultrusion makes long profiles with a constant cross-section. That suits repeatable rails, posts, frames and covers, especially where low mass, corrosion resistance or an insulating section helps a defined assembly. The finished part still needs its own load, connection, durability and regulatory review.
              </p>
            </div>
            <figure>
              <div className="overflow-hidden rounded-card border border-border-default bg-bg2">
                <Image
                  src="/images/industries/vehicle-bus-body-concept.webp"
                  alt="Concept bus body assembly showing fiberglass roof-edge and ceiling profiles attached to a metal frame"
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="h-auto w-full"
                  preload
                />
              </div>
              <figcaption className="mt-[10px] text-f14 text-t3">
                AI-generated application concept. Profile placement and connections are illustrative, not an F1 installation or approved vehicle design.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="applications" className="scroll-mt-28 border-y border-border-default bg-bg2 py-[55px]">
        <div className={container}>
          <SectionTag>Application guide</SectionTag>
          <h2 className={heading}>Start with the part&apos;s job inside the vehicle</h2>
          <p className="mt-[16px] max-w-[810px] text-f16 leading-relaxed text-t2">
            Each application below separates a plausible profile location from the evidence needed to use it. Treat the listed components as design candidates; dimensions, material system and approval belong to the vehicle program.
          </p>
          <nav aria-label="Vehicle application sections" className="mt-[24px] grid gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
            {scenarios.map((scenario) => (
              <a key={scenario.id} href={"#application-" + scenario.id} className="flex items-center gap-[12px] rounded-card border border-border-default bg-white px-[16px] py-[13px] text-f14 font-semibold text-t1 hover:border-teal-border hover:text-teal-text">
                <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-deep text-white">{scenario.number}</span>
                {scenario.label}<span aria-hidden="true" className="ml-auto">↗</span>
              </a>
            ))}
          </nav>
          <div className="mt-[30px] space-y-[22px]">
            {scenarios.map((scenario) => (
              <article key={scenario.id} id={"application-" + scenario.id} className="scroll-mt-28 rounded-card border border-border-default bg-white p-[24px] md:p-[34px]">
                <div className="grid gap-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:gap-[46px]">
                  <div>
                    <p className="text-f14 font-bold uppercase tracking-wider text-teal-text">{scenario.number} / {scenario.label}</p>
                    <h3 className="mt-[10px] text-f24 font-bold leading-snug text-t1">{scenario.title}</h3>
                    <p className="mt-[17px] text-f16 font-medium leading-[1.75] text-t1">{scenario.lead}</p>
                    <div className="mt-[18px] space-y-[15px] text-f16 leading-[1.8] text-t2">
                      {scenario.details.map((detail) => <p key={detail}>{detail}</p>)}
                    </div>
                  </div>
                  <div className="self-start">
                    {scenario.image ? (
                      <figure className="mb-[20px]">
                        <div className="overflow-hidden rounded-card border border-border-default bg-bg2">
                          <Image src={scenario.image} alt={scenario.alt} width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 470px" className="h-auto w-full" />
                        </div>
                        <figcaption className="mt-[9px] text-f14 text-t3">AI-generated application concept, not an F1 installation or approved vehicle detail.</figcaption>
                      </figure>
                    ) : null}
                    <div className="rounded-card border border-border-default bg-bg2 p-[22px]">
                      <h4 className="font-bold text-t1">Candidate components</h4>
                      <ul className="mt-[12px] list-disc space-y-[9px] pl-[18px] text-f14 leading-relaxed text-t2">
                        {scenario.components.map((component) => <li key={component}>{component}</li>)}
                      </ul>
                      <h4 className="mt-[22px] font-bold text-t1">Design and approval checks</h4>
                      <ul className="mt-[12px] list-disc space-y-[9px] pl-[18px] text-f14 leading-relaxed text-t2">
                        {scenario.checks.map((check) => <li key={check}>{check}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-28 bg-white py-[55px]">
        <div className={container}>
          <SectionTag>Profile selection</SectionTag>
          <h2 className={heading}>Match the cross-section to its installation</h2>
          <p className="mt-[16px] max-w-[820px] text-f16 leading-relaxed text-t2">
            A direct copy of a steel or aluminum section may miss the stiffness or joint performance required of a composite. Start with the mounting envelope and loads, then develop the fiber layout, wall thickness and connection detail around the actual vehicle duty cycle.
          </p>
          <div role="region" aria-label="Vehicle component profile selection" tabIndex={0} className="mt-[25px] overflow-x-auto rounded-card border border-border-default">
            <table className="w-full min-w-[740px] text-left text-f14">
              <caption className="sr-only">Vehicle component, starting profile and design evidence</caption>
              <thead className="bg-deep text-white"><tr>{["Vehicle component", "Starting profile", "What decides the specification"].map((label) => <th key={label} scope="col" className="px-[22px] py-[16px] font-semibold">{label}</th>)}</tr></thead>
              <tbody>{selectionRows.map(([component, profile, decision]) => <tr key={component} className="border-t border-border-default"><th scope="row" className="px-[22px] py-[18px] font-semibold text-t1">{component}</th><td className="px-[22px] py-[18px] text-t2">{profile}</td><td className="px-[22px] py-[18px] text-t2">{decision}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="mt-[26px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link key={product.href} href={product.href} className="rounded-card border border-border-default p-[21px] transition-colors hover:border-teal-border">
                <h3 className="font-bold text-t1">{product.label} <span aria-hidden="true" className="text-teal-text">→</span></h3>
                <p className="mt-[9px] text-f14 leading-relaxed text-t2">{product.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="specification" className="scroll-mt-28 border-y border-border-default bg-bg2 py-[55px]">
        <div className={container}>
          <SectionTag>Design & RFQ</SectionTag>
          <h2 className={heading}>Make the enquiry specific enough to engineer</h2>
          <p className="mt-[16px] max-w-[820px] text-f16 leading-relaxed text-t2">
            The useful comparison is an installed component under the same service conditions. Submit the vehicle interface and acceptance basis with the drawing so a proposed profile can be assessed for manufacturing and test scope.
          </p>
          <div className="mt-[25px] grid gap-[18px] lg:grid-cols-2">
            <div className="rounded-card border border-border-default bg-white p-[25px]">
              <h3 className="text-f18 font-bold text-t1">Send with your RFQ</h3>
              <ol className="mt-[17px] list-decimal space-y-[12px] pl-[21px] text-f16 leading-relaxed text-t2">
                <li>Vehicle type, production program and marked location of each proposed part.</li>
                <li>Section envelope, 2D drawing or CAD, cut lengths, tolerances and quantity forecast.</li>
                <li>Static, impact and cyclic loads; support spacing; deflection and fatigue targets.</li>
                <li>Mating materials, fastener or bond pattern, access for installation and repair.</li>
                <li>Temperature, water, salt, cleaners, UV and electrical exposure at the part.</li>
                <li>Applicable fire, electrical or vehicle standards and required test reports.</li>
              </ol>
            </div>
            <div className="rounded-card border border-border-default bg-white p-[25px]">
              <h3 className="text-f18 font-bold text-t1">Agree how the proposed part will be accepted</h3>
              <p className="mt-[17px] text-f16 leading-relaxed text-t2">
                Identify whether the order covers raw profiles, cut and drilled parts, coated pieces or an assembly. Confirm prototype fit, test method, witness samples, appearance, dimensional inspection and batch traceability before series production.
              </p>
              <p className="mt-[15px] text-f16 leading-relaxed text-t2">
                For rail, the customer defines the component&apos;s fire requirement set and hazard level. For refrigerated bodies, compare the finished wall or vehicle assembly for thermal performance. For road vehicles, the OEM retains responsibility for crash, restraint and high-voltage safety approval.
              </p>
              <Link href={quoteHref} className="mt-[22px] inline-block text-f14 font-semibold text-teal-text underline decoration-teal-border underline-offset-4">Discuss your part and test plan →</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="scroll-mt-28 bg-white py-[55px]">
        <div className={container}>
          <SectionTag>Continue the evaluation</SectionTag>
          <h2 className={heading}>Product data and independent references</h2>
          <div className="mt-[24px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <Link key={resource.href} href={resource.href} className="rounded-card border border-border-default p-[21px] transition-colors hover:border-teal-border">
                <h3 className="font-bold text-t1">{resource.label} <span aria-hidden="true" className="text-teal-text">→</span></h3>
                <p className="mt-[9px] text-f14 leading-relaxed text-t2">{resource.description}</p>
              </Link>
            ))}
          </div>
          <p className="mt-[23px] max-w-[900px] text-f14 leading-relaxed text-t2">
            For broader context, see the <a href="https://www.energy.gov/cmei/vehicles/lightweight-materials-cars-and-trucks" className="font-semibold text-teal-text underline decoration-teal-border underline-offset-4">U.S. Department of Energy&apos;s vehicle lightweighting overview</a> and the <a href="https://www.nen.nl/en/nen-en-45545-2-2020-a1-2023-en-316338" className="font-semibold text-teal-text underline decoration-teal-border underline-offset-4">EN 45545-2 standard description</a>. Neither is a certification of an F1 product or a prediction of vehicle-level savings.
          </p>
          <FAQ items={faqs} title="Vehicle profile questions" />
        </div>
      </section>
      <InnerCTA title="Bring the vehicle drawing and duty cycle to the discussion" quoteHref={quoteHref} />
    </>
  );
}
