import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { carbonProfileLinks } from "@/content/data/carbonFiberPultrusion";
import { buildRfqHref } from "@/lib/rfq";
import { buildPageMetadata, buildProductFamilyPageSchema } from "@/lib/seo";

const pagePath = "/products/pultruded-carbon-fiber-tubes";
const pageTitle = "Pultruded Carbon Fiber Tubes | Custom CFRP Tubing";
const pageDescription = "Pultruded carbon fiber tubes for lightweight components. Review custom dimensions, fiber direction and CFRP vs fiberglass tubing with F1 Composite.";
const diagram = "/images/products/carbon-fiber-tubes/pultruded-carbon-fiber-tube.svg";
const roundTubes = "/products/fiberglass-structural-shapes/frp-tube";
const squareTubes = "/products/fiberglass-structural-shapes/frp-square-tube";
const updated = "2026-10-25";
const linkStyle = "font-semibold text-teal-text underline underline-offset-4 hover:text-teal";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/products/pultruded-carbon-fiber-tubes/opengraph-image",
});

const quoteHref = buildRfqHref({
  source: "pultruded-carbon-fiber-tubes",
  product: "Pultruded carbon fiber tubes",
  productPath: pagePath,
  message: "Please review my pultruded carbon fiber tube requirements.\nSection / OD / ID / wall thickness (with units):\nFinished length, tolerance and quantity:\nApplication, span, loads and deflection limit:\nFiber / resin requirements and service temperature:\nClamps, bonded fittings, holes or inserts:\nRequired inspection and test evidence:\nDestination and target delivery date:",
});

const specifications = [
  ["Cross-section", "Round hollow tubing; submit square, rectangular or other constant sections for tooling review."],
  ["Diameter & wall", "Specify outside diameter, inside diameter and nominal wall in mm or inches. Identify the dimensions that control fit."],
  ["Length & quantity", "Finished length and piece count per item, plus trial quantity and expected repeat demand."],
  ["Dimensional controls", "Agree OD / ID tolerances, wall variation, ovality, straightness and end squareness on the drawing."],
  ["Fiber & resin", "Define carbon grade, reinforcement architecture and resin against stiffness, exposure and temperature requirements."],
  ["Surface & fabrication", "State bonding zones, surface finish, coating, end preparation, holes and fitting requirements for review."],
  ["Acceptance evidence", "Agree inspection method, sampling, material identification and any mechanical or assembly tests before ordering."],
];

const comparisons = [
  ["Selection priority", "Low moving mass and high longitudinal stiffness.", "A balance of structural performance and material cost."],
  ["Electrical behavior", "Carbon reinforcement conducts electricity; do not specify as electrical insulation.", "Glass reinforcement suits insulating designs; qualify the resin, part and assembly for the duty."],
  ["Load direction", "Predominantly axial reinforcement; assess torque, local crushing and joints separately.", "Roving, mat and fabric content also govern directional properties and connection behavior."],
  ["Environment & interfaces", "Review resin exposure and isolate carbon from susceptible metals where moisture is present.", "Review resin, weathering and connection materials for the exposure."],
  ["Commercial decision", "Justify the material premium through mass, deflection or equipment performance.", "Often the starting point for cost-led frames, rails and general structural members."],
];

const applications = [
  { number: "01", title: "Automation & robotics", text: "Moving links, lightweight supports and end-effector members where lower moving mass matters.", check: "Send acceleration, reach, payload and joint details." },
  { number: "02", title: "Instrumentation", text: "Sensor supports and positioning structures where deflection and dimensional stability guide material selection.", check: "Define alignment tolerance and the temperature cycle." },
  { number: "03", title: "Lightweight frames & booms", text: "Straight members in portable equipment and small UAV structures, subject to the complete assembly design.", check: "Identify bending, vibration, torsion and impact cases." },
];

const faqItems = [
  { question: "What is a pultruded carbon fiber tube?", answer: "It is a hollow, constant-section composite made by pulling resin-impregnated carbon reinforcement through a heated die. The main fibers typically run along the tube. This architecture supports longitudinal stiffness, while the resin and any off-axis reinforcement govern other aspects of performance." },
  { question: "How does pultruded tubing differ from roll-wrapped carbon tubing?", answer: "Pultrusion pulls reinforcement continuously through a die. Roll wrapping places prepreg plies around a mandrel, allowing selected fiber angles. A mainly unidirectional pultrusion can suit axial and bending duties; significant torque or circumferential loads may need an architecture with off-axis plies. Compare the actual laminate and test data, not just the process name." },
  { question: "Which carbon tube sizes and tolerances can I order?", answer: "Send the required outside and inside dimensions, wall, finished length, fit and quantity. F1 reviews the section, tooling and inspection requirements before confirming dimensions and tolerances. This page does not represent a fixed stock-size list; sample timing, MOQ and production lead time are quoted for the proposed configuration." },
  { question: "Is a carbon fiber tube electrically insulating?", answer: "No. Carbon fibers are electrically conductive. If electrical isolation is required, start with a suitable fiberglass tube specification and qualify the complete part under the required electrical and environmental conditions. A surface coating alone should not be assumed to provide dependable insulation." },
  { question: "Can I drill, clamp or bond pultruded carbon tubing?", answer: "These details require joint design. Drilling interrupts fibers, and concentrated clamp pressure can split or crush a thin wall. Define load transfer, bond preparation, supported inserts or sleeves, adhesive and environmental exposure; validate the finished connection. Do not apply a universal clamp torque or bond length." },
  { question: "Can these tubes carry internal pressure?", answer: "A structural carbon tube has no implied pressure rating. Pressure service requires a purpose-designed hoop reinforcement system, end connections and qualification. Include pressure, temperature and medium in the brief so the manufacturing route can be reviewed." },
];

export default function PultrudedCarbonFiberTubesPage() {
  return (
    <>
      <JsonLd data={buildProductFamilyPageSchema({
        name: "Pultruded Carbon Fiber Tubes",
        description: pageDescription,
        path: pagePath,
        image: diagram,
        category: "Custom pultruded carbon fiber tubing",
        material: "Carbon fiber reinforced polymer (CFRP)",
        productLine: "F1-FORM",
        dateModified: updated,
        additionalProperty: [
          { name: "Manufacturing process", value: "Continuous pultrusion" },
          { name: "Specification", value: "Section, laminate and acceptance requirements agreed to drawing" },
        ],
      })} />
      <PageHeader
        tag="Carbon fiber tubing"
        line={{ name: "F1-FORM", label: "Carbon fiber tubes" }}
        title="Pultruded carbon fiber tubes"
        description="Longitudinal stiffness. Less moving mass. Develop CFRP tubing around your component’s dimensions, loads and connections, with F1 review of the laminate, tooling and finished-part requirements."
        updated={updated}
        facts={[
          { label: "Material", value: "CFRP" },
          { label: "Process", value: "Pultrusion" },
          { label: "Primary fibers", value: "Longitudinal" },
          { label: "Supply", value: "To drawing" },
        ]}
        actions={{ primary: { label: "Request a tube review", href: quoteHref }, secondary: { label: "Compare with fiberglass", href: "#carbon-vs-fiberglass", variant: "secondary" }, stickyMobile: true }}
        figure={
          <Figure number={1} title="Fibers follow the tube axis" note="Concept diagram" bleed caption="Illustrative round section and fiber direction. Final geometry and reinforcement follow the approved drawing.">
            <Image src={diagram} alt="Schematic of a hollow carbon fiber tube with longitudinal fibers and a circular end section" width={840} height={700} preload sizes="(max-width: 1023px) 94vw, 44vw" className="h-auto w-full" />
          </Figure>
        }
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/pultruded-frp-profiles" }, { label: "Custom profiles", href: "/products/custom-pultruded-profiles" }, { label: "Carbon fiber tubes" }]}
      />
      <PageNav items={[
        { id: "overview", label: "Why carbon" }, { id: "specifications", label: "Specifications" },
        { id: "carbon-vs-fiberglass", label: "Carbon vs glass" }, { id: "applications", label: "Applications" },
        { id: "connections", label: "Connections" }, { id: "faq", label: "FAQ" }, { id: "quote", label: "Quote" },
      ]} />

      <PageSection id="overview" title="Put stiffness in the direction of the load" intro="A constant cross-section and continuous longitudinal reinforcement make pultrusion a useful route for straight, repeatable components. Start with the load path and allowable deflection.">
        <div className="grid gap-[24px] lg:grid-cols-[1.2fr_1fr] lg:gap-[48px]">
          <div className="space-y-[16px] text-f16 leading-relaxed text-t2">
            <p>Carbon reinforcement can make a compact, lightweight member attractive when movement, reach or alignment drives the design. The finished tube’s bending stiffness depends on both its longitudinal modulus and section geometry; fiber grade alone cannot establish component performance.</p>
            <p>During pultrusion, continuous reinforcement is impregnated with resin, formed and cured through a heated die, then pulled and cut. The fiber arrangement, cure and dimensional controls must be defined together. <Link href="/technology/pultrusion-process" className={linkStyle}>Explore the pultrusion process</Link>.</p>
            <p>For general structural tubing, compare our <Link href={roundTubes} className={linkStyle}>fiberglass round tubes</Link> and <Link href={squareTubes} className={linkStyle}>fiberglass square and rectangular tubes</Link> alongside the carbon option.</p>
          </div>
          <aside className="rounded-card bg-deep p-[24px] sm:p-[32px]">
            <p className="font-mono text-f12 uppercase tracking-[0.08em] text-white/70">Design around the architecture</p>
            <h3 className="mt-[12px] text-f24 font-bold leading-tight text-white">Axial stiffness is only one part of the specification.</h3>
            <p className="mt-[16px] text-f16 leading-relaxed text-white/85">Torque, clamp pressure, impact and pressure service need separate review. Specify these loads early so the reinforcement and manufacturing route can be matched to the component.</p>
          </aside>
        </div>
      </PageSection>

      <PageSection id="specifications" title="Define the tube you need" tone="muted" intro="Custom dimensions and processing are reviewed against your drawing. Tooling availability, achievable tolerances, sample timing and production quantity are confirmed in the quotation.">
        <dl className="divide-y divide-border-default overflow-hidden rounded-card border border-border-default bg-white">
          {specifications.map(([label, value]) => (
            <div key={label} className="grid gap-[6px] px-[20px] py-[16px] md:grid-cols-[200px_1fr] md:gap-[28px]">
              <dt className="text-f16 font-semibold text-t1">{label}</dt>
              <dd className="text-f16 leading-relaxed text-t2">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-[20px] grid gap-[16px] md:grid-cols-2">
          <div className="border-l-2 border-teal pl-[18px]">
            <h3 className="text-f16 font-bold text-t1">Geometry check</h3>
            <p className="mt-[6px] text-f14 leading-relaxed text-t2">For a uniform round section, ID = OD − 2 × wall. A nominal calculation does not establish bore fit; include the mating part and required clearance.</p>
          </div>
          <div className="border-l-2 border-teal pl-[18px]">
            <h3 className="text-f16 font-bold text-t1">Performance evidence</h3>
            <p className="mt-[6px] text-f14 leading-relaxed text-t2">Request data for the proposed tube laminate, test direction and conditioning. Numerical strength, modulus, temperature and tolerance guarantees belong in the agreed specification.</p>
          </div>
        </div>
      </PageSection>

      <PageSection id="carbon-vs-fiberglass" title="Carbon fiber or fiberglass tubing?" intro="Compare both materials against the same load case, deflection limit, environment and finished assembly. Neither material name by itself defines the right tube.">
        <div role="region" aria-label="Carbon fiber and fiberglass tube comparison" tabIndex={0} className="overflow-x-auto rounded-card border border-border-default focus-visible:outline-2 focus-visible:outline-teal">
          <table className="w-full min-w-[680px] border-collapse text-left text-f14 leading-relaxed">
            <caption className="sr-only">Qualitative selection guide for pultruded carbon fiber and fiberglass tubes</caption>
            <thead className="bg-deep text-white">
              <tr><th scope="col" className="w-1/5 p-[20px]">Decision</th><th scope="col" className="w-2/5 p-[20px]">Carbon fiber tubes · CFRP</th><th scope="col" className="w-2/5 p-[20px]">Fiberglass tubes · GFRP</th></tr>
            </thead>
            <tbody>{comparisons.map(([label, carbon, glass], i) => (
              <tr key={label} className={i % 2 ? "bg-bg2" : "bg-white"}>
                <th scope="row" className="border-t border-border-default p-[20px] align-top font-semibold text-t1">{label}</th>
                <td className="border-t border-border-default p-[20px] align-top text-t2">{carbon}</td>
                <td className="border-t border-border-default p-[20px] align-top text-t2">{glass}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="mt-[20px] grid gap-[16px] sm:grid-cols-2">
          {[{ href: roundTubes, title: "Fiberglass round tubes", text: "Compare circular sections, nominal walls and weights." }, { href: squareTubes, title: "Fiberglass square & rectangular tubes", text: "Explore flat mounting faces for frames and supports." }].map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-card border border-border-default p-[20px] transition-colors hover:border-teal hover:bg-bg2">
              <span className="flex items-center justify-between gap-[12px] text-f18 font-bold text-t1">{item.title}<span aria-hidden="true" className="text-teal-text">→</span></span>
              <span className="mt-[8px] block text-f14 leading-relaxed text-t2">{item.text}</span>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection id="applications" title="Where a lighter, stiffer member can help" tone="muted" intro="These are application starting points. Suitability depends on the tube, connections and validation of the complete assembly.">
        <div className="grid gap-[20px] lg:grid-cols-3">
          {applications.map((item) => (
            <article key={item.number} className="flex flex-col rounded-card border border-border-default bg-white p-[24px]">
              <p className="font-mono text-f14 text-teal-text">{item.number} / CFRP</p>
              <h3 className="mt-[16px] text-f24 font-bold leading-tight text-t1">{item.title}</h3>
              <p className="mt-[12px] text-f16 leading-relaxed text-t2">{item.text}</p>
              <p className="mt-auto pt-[24px] text-f14 font-semibold leading-relaxed text-t1">{item.check}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="connections" title="Design the ends as carefully as the tube">
        <div className="grid gap-[24px] md:grid-cols-3">
          {[
            ["Spread the load", "Review bonded fittings, sleeves or supported inserts to transfer load without concentrating pressure on a thin wall. Holes and cutouts interrupt fibers and need their own assessment."],
            ["Specify the interface", "Define adhesive, bond preparation, fit, cure and inspection. Where carbon meets aluminum or other susceptible metals in wet service, use suitable electrical isolation and sealing."],
            ["Validate the assembly", "Agree static, fatigue or environmental testing for the actual fitting and tube. Include service temperature, chemicals, UV exposure and impact in the requirements."],
          ].map(([title, text]) => <div key={title} className="border-t-2 border-teal pt-[16px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[10px] text-f16 leading-relaxed text-t2">{text}</p></div>)}
        </div>
      </PageSection>
      <PageSection id="faq" title="Carbon fiber tubing questions" tone="muted"><FAQList items={faqItems} /></PageSection>
      <RelatedLinks background="white" groups={[
        { title: "Carbon fiber profiles", links: carbonProfileLinks.filter((item) => item.href !== pagePath) },
        { title: "Compare tube materials", links: [{ label: "Fiberglass round tubes", href: roundTubes }, { label: "Fiberglass square & rectangular tubes", href: squareTubes }] },
        { title: "Develop your section", links: [{ label: "Custom pultruded profiles", href: "/products/custom-pultruded-profiles" }, { label: "Pultrusion process", href: "/technology/pultrusion-process" }] },
        { title: "Plan qualification", links: [{ label: "Quality & testing", href: "/technology/quality-testing" }, { label: "Machining & fabrication", href: "/technology/frp-profile-machining" }] },
      ]} />
      <PageSection id="quote" title="Send your carbon tube drawing" tone="deep">
        <ProductRfq product="Pultruded carbon fiber tubes" productPath={pagePath} quoteHref={quoteHref} quoteLabel="Request a tube review" intro="Start with your section, finished length, quantity and the job the tube needs to do." items={[
          { title: "Drawing & fit", text: "OD / ID, wall, cut length, tolerances and mating components." },
          { title: "Loads & service", text: "Span, axial and bending loads, torque, clamp loads, deflection and exposure." },
          { title: "Material & evidence", text: "Fiber, resin, surface preparation and the inspection or test plan." },
          { title: "Quantity & delivery", text: "Trial and repeat quantities, destination and required date." },
        ]} />
      </PageSection>
    </>
  );
}
