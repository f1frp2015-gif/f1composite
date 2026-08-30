import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import FAQ from "@/components/ui/FAQ";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/frp-rebar";
const pageTitle = "FRP Rebar Manufacturer | GFRP, BFRP & CFRP Bars";
const pageDescription =
  "FRP rebar in 10–32 mm standard diameters with sand-coated or helically wrapped surfaces. GFRP, BFRP and CFRP options for bridges, marine and tunnels.";
const heroImage =
  "/images/products/frp-rebar/f1-frp-rebar-sand-coated-helical.webp";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: heroImage,
});

const portfolioFacts = [
  {
    value: "10–32 mm",
    label: "standard diameter range",
  },
  {
    value: "≈2.1 g/cm³",
    label: "supplier-published density baseline",
  },
  {
    value: "700–3000 MPa",
    label: "published FRP family tensile range",
  },
  {
    value: "2 surfaces",
    label: "sand-coated or helically wrapped",
  },
];

const specificationRows = [
  {
    item: "Fiber system",
    standard: "GFRP for mainstream concrete reinforcement",
    options: "BFRP and CFRP by project specification",
  },
  {
    item: "Nominal diameter",
    standard: "10, 12, 14, 16, 18, 20, 22, 25, 28 and 32 mm",
    options: "Other bar designations subject to tooling and MOQ",
  },
  {
    item: "Surface profile",
    standard: "Sand-coated or helically wrapped / ribbed",
    options: "Bond pattern matched to qualification data",
  },
  {
    item: "Matrix",
    standard: "Vinyl ester or project-qualified resin system",
    options: "Chemistry selected for alkali, chloride and temperature exposure",
  },
  {
    item: "Supply form",
    standard: "Straight cut lengths",
    options: "Factory-formed bends, stirrups and custom shapes by drawing",
  },
  {
    item: "Color",
    standard: "Natural, yellow, gray or project color",
    options: "Color is not a substitute for fiber / resin identification",
  },
  {
    item: "Documentation",
    standard: "Dimensional and batch inspection records",
    options: "Project test reports, certificates and bar schedule traceability",
  },
];

const materialOptions = [
  {
    name: "GFRP rebar",
    bestFor: "Marine, bridge decks, wastewater and electrically sensitive concrete",
    body: "The standard starting point for corrosion-resistant reinforcement. Glass-fiber bars are lightweight, non-magnetic and electrically insulating, but their modulus and failure mode differ from steel.",
    status: "Standard inquiry route",
  },
  {
    name: "BFRP rebar",
    bestFor: "Projects that specify basalt reinforcement or ASTM D8505 qualification",
    body: "Basalt-fiber bars can share the corrosion and electrical-isolation advantages of GFRP. The offered grade still requires its own qualification and guaranteed design properties.",
    status: "Confirm grade and qualification",
  },
  {
    name: "CFRP rebar",
    bestFor: "High-modulus, weight-critical and specialty reinforcement",
    body: "Carbon-fiber bars can provide substantially higher stiffness, but they are electrically conductive and carry a different cost and design basis. Do not group them under a generic non-conductive FRP claim.",
    status: "Project-specific supply",
  },
];

const applications = [
  {
    title: "Bridge decks and approach slabs",
    body: "Remove steel-corrosion risk where de-icing salts and chloride splash drive cracking, delamination and repair cycles.",
  },
  {
    title: "Marine and coastal concrete",
    body: "Reinforce seawalls, piers, quay structures and flood defenses without creating an electrochemical corrosion path.",
  },
  {
    title: "Tunnels and rail infrastructure",
    body: "Use non-magnetic, electrically insulating reinforcement around traction power, signaling and sensitive equipment where the specified fiber system allows it.",
  },
  {
    title: "Water and wastewater facilities",
    body: "Match the resin system and cover design to chlorides, treatment chemicals, wet-dry cycles and the project service temperature.",
  },
  {
    title: "MRI and electrical facilities",
    body: "GFRP and BFRP reinforcement avoid magnetic-field distortion and electrical conduction; CFRP is not suitable when electrical insulation is the controlling requirement.",
  },
  {
    title: "Slabs, foundations and precast",
    body: "Straight bars, dowels and factory-formed shapes can be scheduled for foundations, barriers, panels and other reinforced-concrete elements.",
  },
];

const comparisonRows = [
  {
    topic: "Corrosion mechanism",
    frp: "No electrochemical rusting; durability still depends on fiber, resin, moisture, alkali and temperature",
    steel: "Can corrode after chlorides or carbonation reach the reinforcement",
  },
  {
    topic: "Weight",
    frp: "Roughly one quarter of steel by density for the published 2.1 g/cm³ baseline",
    steel: "Approximately 7.85 g/cm³",
  },
  {
    topic: "Stress-strain response",
    frp: "Linear-elastic to rupture; no steel-like yield plateau",
    steel: "Ductile yielding is normally part of the design model",
  },
  {
    topic: "Stiffness",
    frp: "Fiber-dependent and usually lower than steel for GFRP / BFRP",
    steel: "About 200 GPa elastic modulus",
  },
  {
    topic: "Bending and detailing",
    frp: "No field bending; order bends and stirrups factory-formed to the approved schedule",
    steel: "Can be bent within code and fabrication limits",
  },
  {
    topic: "Electrical behavior",
    frp: "GFRP / BFRP are insulating; CFRP is conductive",
    steel: "Conductive",
  },
];

const standards = [
  {
    code: "ASTM D7957/D7957M-25",
    title: "GFRP bars for concrete reinforcement",
    note: "Qualification, production-lot control, geometry, physical properties and mechanical requirements for surface-enhanced GFRP bars.",
    href: "https://store.astm.org/d7957_d7957m-25.html",
  },
  {
    code: "ASTM D8505/D8505M-25",
    title: "Basalt and glass FRP bars",
    note: "Specification for straight, solid-round BFRP and GFRP bars with surface enhancement for internal concrete reinforcement.",
    href: "https://store.astm.org/d8505_d8505m-25.html",
  },
  {
    code: "ASTM D7205/D7205M-26",
    title: "Tensile testing of FRP bars",
    note: "Test method for tensile force, strength, strain, chord modulus and the stress-strain curve of FRP composite bars.",
    href: "https://store.astm.org/d7205_d7205m-26.html",
  },
  {
    code: "ACI CODE-440.11-22",
    title: "Structural concrete design with GFRP bars",
    note: "Building-code requirements for structural systems, members and connections reinforced with qualified GFRP bars.",
    href: "https://www.concrete.org/store/productdetail.aspx?ItemID=44011U22&Language=English&Units=US_Units",
  },
  {
    code: "ACI SPEC-440.5-22",
    title: "Construction with GFRP reinforcing bars",
    note: "Project specification covering submittals, delivery, storage, handling, placement, tolerances and inspection.",
    href: "https://www.concrete.org/store/productdetail.aspx?Format=PROTECTED_PDF&ItemID=4405U22&Language=English&Units=US_Units",
  },
];

const faqItems = [
  {
    question: "What is FRP rebar?",
    answer:
      "FRP rebar is a solid composite reinforcing bar made from continuous fibers held in a polymer matrix. The bar normally has sand coating, ribs or a helical wrap to transfer force into concrete. GFRP uses glass fiber, BFRP uses basalt fiber, and CFRP uses carbon fiber; they are not interchangeable material grades.",
  },
  {
    question: "Can FRP rebar replace steel rebar one-for-one?",
    answer:
      "No. FRP reinforcement has a different modulus, bond behavior, creep-rupture basis, temperature response and linear-elastic rupture mode. A qualified engineer must redesign the member and detailing under the applicable code instead of substituting the same bar area automatically.",
  },
  {
    question: "Can FRP rebar be bent on site?",
    answer:
      "No. Thermoset FRP bars must not be field bent after cure. Bends, hooks, stirrups and other shapes are manufactured to an approved bending schedule, with bend radius and retained tensile capacity tied to the qualified product.",
  },
  {
    question: "Is every type of FRP rebar non-conductive?",
    answer:
      "No. GFRP and BFRP bars are electrically insulating and non-magnetic, while carbon fibers conduct electricity. If electrical isolation, MRI compatibility or radio-frequency transparency controls the project, state it in the RFQ and do not accept a generic FRP substitution.",
  },
  {
    question: "Which FRP rebar sizes are available?",
    answer:
      "The standard supplier range is 10 to 32 mm nominal diameter, with straight cut lengths and sand-coated or helically wrapped surfaces. Bar designation, measured cross-sectional area, tolerance, unit weight and available factory-formed shapes are confirmed on the project data sheet before order release.",
  },
  {
    question: "What should I include in an FRP rebar RFQ?",
    answer:
      "Send the governing standard and edition, bar or metric designation, straight-length schedule, bend schedule, surface type, fiber and resin requirements, exposure class, design values, testing and certificate requirements, quantity by diameter, packing limits, destination and Incoterm.",
  },
];

export default function FrpRebarPage() {
  return (
    <>
      <JsonLd
        data={buildProductFamilyPageSchema({
          name: "FRP Rebar for Concrete Reinforcement",
          description: pageDescription,
          path: pagePath,
          image: heroImage,
          category: "FRP Concrete Reinforcement",
          material: [
            "Glass fiber reinforced polymer",
            "Basalt fiber reinforced polymer",
            "Carbon fiber reinforced polymer",
            "Vinyl ester resin",
          ],
          schemaType: "ItemPage",
          datePublished: "2026-08-30",
          dateModified: "2026-08-30",
        })}
      />

      <PageHeader
        tag="Concrete Reinforcement"
        title="FRP rebar for corrosion-resistant concrete"
        description="Straight bars and factory-formed shapes for concrete exposed to chlorides, chemicals, magnetic fields or weight constraints. Start with GFRP, then qualify the fiber, resin, surface and guaranteed design values against the project standard."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/pultruded-frp-profiles" },
          { label: "FRP Rebar" },
        ]}
      />

      <section className="bg-white py-[55px] lg:py-[89px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[34px] lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div>
            <SectionTag>GFRP · BFRP · CFRP</SectionTag>
            <h2 className="mt-[21px] max-w-[720px] text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.08] text-t1">
              Specify the bar system, not just “FRP”
            </h2>
            <p className="mt-[21px] max-w-[720px] text-f15 leading-golden text-t2">
              F1 Composite supplies FRP reinforcing bars against a project bar schedule.
              Diameter is only the first decision: fiber type, resin chemistry, surface
              enhancement, measured area, tensile modulus, guaranteed tensile force,
              bond performance and environmental reduction factors must remain tied to
              one qualified production grade.
            </p>
            <p className="mt-[13px] max-w-[720px] text-f15 leading-golden text-t2">
              Send the drawings and governing standard before pricing. We return a
              diameter-by-diameter offer with cut lengths, factory bends, packaging,
              inspection plan and the test evidence available for the proposed grade.
            </p>
            <div className="mt-[29px] flex flex-wrap gap-[13px]">
              <Link
                href="/contact"
                className="rounded-[4px] bg-teal px-[21px] py-[13px] text-f14 font-bold text-white transition-colors hover:bg-teal-text"
              >
                Request a rebar schedule quote
              </Link>
              <a
                href="#standards"
                className="rounded-[4px] border border-border-default bg-white px-[21px] py-[13px] text-f14 font-bold text-t1 transition-colors hover:border-teal hover:text-teal-text"
              >
                Review standards
              </a>
            </div>
          </div>

          <figure>
            <div className="relative aspect-square overflow-hidden rounded-[8px] border border-border-default bg-bg2">
              <Image
                src={heroImage}
                alt="Three real supplier FRP rebars with helically wrapped bond surfaces on a neutral industrial background"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-[8px] text-f12 leading-golden text-t3">
              Three-bar supplier product photograph with background replaced for the F1 catalog;
              final color, diameter and surface profile follow the approved submittal.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-border-default bg-bg2 py-[34px]">
        <div className="mx-auto grid max-w-[1280px] gap-[13px] px-[34px] sm:grid-cols-2 lg:grid-cols-4">
          {portfolioFacts.map((fact) => (
            <div key={fact.label} className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <p className="text-f24 font-extrabold text-teal-text">{fact.value}</p>
              <p className="mt-[5px] text-f13 leading-golden text-t2">{fact.label}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-[13px] max-w-[1280px] px-[34px] text-f12 leading-golden text-t3">
          Portfolio figures above are supplier-published screening values, not design
          allowables. Contract values must be stated for the exact fiber/resin/bar grade
          and supported by the required qualification and production-lot records.
        </p>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Supply scope</SectionTag>
          <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Standard range and project options
          </h2>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-border-default">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-bg2">
                <tr>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Specification item
                  </th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Standard starting point
                  </th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                    Project options / controls
                  </th>
                </tr>
              </thead>
              <tbody>
                {specificationRows.map((row) => (
                  <tr key={row.item} className="border-t border-border-default align-top">
                    <th className="px-[21px] py-[16px] text-f14 font-bold text-t1">{row.item}</th>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-t2">{row.standard}</td>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-t2">{row.options}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Material selection</SectionTag>
          <h2 className="mt-[21px] max-w-[860px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            GFRP, BFRP and CFRP do different jobs
          </h2>
          <div className="mt-[34px] grid gap-[21px] lg:grid-cols-3">
            {materialOptions.map((option) => (
              <article key={option.name} className="rounded-[8px] border border-border-default bg-white p-[29px]">
                <p className="text-f12 font-bold uppercase tracking-[0.12em] text-teal-text">{option.status}</p>
                <h3 className="mt-[8px] text-f19 font-extrabold text-t1">{option.name}</h3>
                <p className="mt-[13px] text-f13 font-semibold leading-golden text-t1">{option.bestFor}</p>
                <p className="mt-[13px] text-f14 leading-golden text-t2">{option.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="grid gap-[34px] lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionTag>Applications</SectionTag>
              <h2 className="mt-[21px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                Where nonmetallic reinforcement earns its place
              </h2>
              <p className="mt-[21px] text-f15 leading-golden text-t2">
                FRP rebar is most valuable where steel corrosion, magnetic response,
                electrical conduction or handling weight is a real project cost. The
                material is not an automatic upgrade when fire exposure, ductility or
                familiar steel detailing controls the design.
              </p>
            </div>
            <div className="grid gap-[13px] sm:grid-cols-2">
              {applications.map((application) => (
                <article key={application.title} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                  <h3 className="text-f15 font-bold text-t1">{application.title}</h3>
                  <p className="mt-[8px] text-f14 leading-golden text-t2">{application.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deep py-[89px] text-white">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <p className="text-f12 font-bold uppercase tracking-[0.14em] text-teal-300">Design difference</p>
          <h2 className="mt-[13px] max-w-[840px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15]">
            FRP rebar is not lightweight steel rebar
          </h2>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-white/75">
            Treating the two materials as interchangeable hides the decisions that
            control serviceability, anchorage, temperature exposure and failure mode.
          </p>
          <div className="mt-[34px] overflow-x-auto rounded-[8px] border border-white/15">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide">Topic</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide">FRP rebar</th>
                  <th className="px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide">Steel rebar</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.topic} className="border-t border-white/15 align-top">
                    <th className="px-[21px] py-[16px] text-f14 font-bold">{row.topic}</th>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-white/80">{row.frp}</td>
                    <td className="px-[21px] py-[16px] text-f14 leading-golden text-white/65">{row.steel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="standards" className="scroll-mt-[120px] bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Specification basis</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Put the standard and edition on the RFQ
          </h2>
          <p className="mt-[13px] max-w-[900px] text-f15 leading-golden text-t2">
            A web-page tensile number is not a material specification. State the
            governing product, test, design and construction documents, then require
            the offered bar grade to show how it qualifies.
          </p>
          <div className="mt-[34px] grid gap-[13px] lg:grid-cols-2">
            {standards.map((standard) => (
              <a
                key={standard.code}
                href={standard.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[8px] border border-border-default bg-white p-[21px] transition-colors hover:border-teal"
              >
                <p className="text-f13 font-bold text-teal-text">{standard.code}</p>
                <h3 className="mt-[5px] text-f15 font-bold text-t1 group-hover:text-teal-text">{standard.title} ↗</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{standard.note}</p>
              </a>
            ))}
          </div>
          <div className="mt-[21px] rounded-[8px] border border-teal-border bg-teal-bg p-[21px]">
            <p className="text-f14 font-bold text-t1">Minimum useful submittal set</p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              Bar identification and dimensions · fiber and resin declaration ·
              measured area · guaranteed tensile force and modulus · bond and shear
              results · cure / glass-transition evidence · alkali and moisture data ·
              bend qualification where applicable · lot traceability and inspection plan.
            </p>
          </div>
        </div>
      </section>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Related products",
            links: [
              { href: "/products/fiberglass-structural-shapes/frp-rod", label: "Pultruded FRP round rod" },
              { href: "/products/fiberglass-structural-shapes/frp-flat-bar", label: "Fiberglass flat bar" },
              { href: "/products/custom-pultruded-profiles", label: "Custom pultruded profiles" },
              { href: "/products/frp-deck-panels", label: "Structural FRP deck panels" },
              { href: "/pultruded-frp-profiles", label: "All FRP products" },
            ],
          },
          {
            title: "Application markets",
            links: [
              { href: "/industries/infrastructure", label: "Infrastructure and bridges" },
              { href: "/industries/marine", label: "Marine and coastal structures" },
              { href: "/industries/industrial", label: "Industrial and wastewater" },
              { href: "/industries/energy", label: "Energy and electrical facilities" },
              { href: "/applications/frp-bridge-deck-panels", label: "FRP bridge deck systems" },
            ],
          },
          {
            title: "Engineering resources",
            links: [
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel and aluminum" },
              { href: "/technology/pultrusion-process", label: "Pultrusion process" },
              { href: "/technology/quality-testing", label: "Quality testing" },
              { href: "/resources/technical-data", label: "Technical data" },
              { href: "/contact", label: "Submit a bar schedule" },
            ],
          },
        ]}
      />

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Send your FRP rebar schedule for a grade-specific quotation" />
    </>
  );
}
