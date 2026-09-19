import Link from "next/link";
import { buildRfqHref } from "@/lib/rfq";

export const bridgeRfqHref = buildRfqHref({
  source: "pedestrian-bridge-guide",
  product: "FRP pedestrian bridge components",
  productPath: "/applications/frp-pedestrian-bridge-superstructures",
  message: "Please review my FRP pedestrian bridge component enquiry. Clear span / width / structural depth: __. Location and governing bridge criteria: __. Pedestrian and maintenance vehicle loads: __. Deck and parapet requirements: __. Exposure and design life: __. Module transport and lifting limits: __. Supply scope, quantity and destination: __. Drawings and engineering responsibilities: __.",
});

const sources = {
  fhwa: { label: "FHWA: FRP composite bridge technology", href: "https://www.fhwa.dot.gov/bridge/composite/" },
  asce: { label: "ASCE/SEI 74-23: scope and material applicability", href: "https://sp360.asce.org/personifyebusiness/Merchandise/Product-Details/productId/309903818" },
  joints: { label: "ASCE: research on bolted FRP connections", href: "https://www.asce.org/publications-and-news/civil-engineering-source/article/2024/04/16/how-to-make-fiber-reinforced-polymers-steel-bolted-connections-stronger" },
  forest: { label: "USDA Forest Service: FRP trail bridge guide (historical guidance)", href: "https://www.fs.usda.gov/eng/pubs/pdfpubs/pdf06232824/pdf06232824dpi72.pdf" },
};

const sections = [
  {
    id: "system-selection", title: "Choose the load path before choosing a profile",
    paragraphs: [
      "An FRP footbridge, fiberglass pedestrian bridge or GRP pedestrian bridge can describe similar glass-fiber composite construction. The useful distinction for procurement is whether FRP forms the main structure, only the walking deck, or a combination of members within a hybrid bridge. State this in the enquiry so competing quotations cover the same scope.",
      "Start the concept review with a cross-section showing the walking surface, main supports, parapets and available clearance. Ask how loads pass from the deck to cross-members, main girders or trusses, bearings and abutments. A handrail profile is not automatically a structural truss chord, and a deck attachment should not be assumed to provide lateral restraint without a designed connection.",
    ],
  },
  {
    id: "loads-and-vibration", title: "Separate strength, deflection and pedestrian comfort",
    paragraphs: [
      "Pultruded glass FRP is direction-dependent and typically less stiff than steel. Passing a stress check does not establish acceptable bridge deflection or walking comfort. The design review should address bending and shear deformation, member and system buckling, connection flexibility, and dynamic response. The Forest Service guide discusses serviceability concerns; its historical criteria should not be treated as the current specification for a new crossing.",
      "Give the engineer the intended users: occasional walkers, groups, runners, cyclists, or an authorised maintenance vehicle. Request a documented load schedule and acceptance criteria for the complete bridge. Identify which assumptions cover occupancy, wind, temperature and other site actions. Ask for the dynamic assessment to state the mass, stiffness, damping assumptions and comfort criteria used, rather than accepting a static profile calculator as evidence of bridge vibration performance.",
    ], source: sources.forest,
  },
  {
    id: "connections", title: "Detail joints as part of the structural system",
    paragraphs: [
      "Connection resistance can control pultruded FRP framing. The design needs to consider local bearing at holes, rupture through the reduced section and other relevant connection failure modes. Bolt size alone is insufficient: reinforcement direction, plate thickness, hole geometry, edge distances, washer arrangement and load direction all belong on the connection detail. ASCE's connection research explains why these checks deserve explicit attention.",
      "Ask the fabricator to identify shop joints, site splices and the inspection access each requires. Confirm hole tolerances, fastener materials, tightening instructions and any sleeves or local reinforcement. Bonded or hybrid joints need their own qualified procedure and acceptance criteria. Do not substitute a steelwork torque setting or alter a hole in the field without an approved FRP detail.",
    ], source: sources.joints,
  },
  {
    id: "deck-and-interfaces", title: "Specify the deck, parapets and approaches together",
    paragraphs: [
      "A deck enquiry should define the walking surface, support direction and spacing, permitted openings, drainage, panel joints and attachment method. Request slip-test evidence relevant to the installed finish and expected wet conditions. Include accessibility requirements for wheelchairs, walking aids and cycles where applicable; an open grating selected for industrial access may need a different review for public use.",
      "Trace parapet forces into the main structure. Request details for posts, end zones, transitions and replaceable panels. At the bridge ends, coordinate bearing seats, anchors, movement allowance, drainage and approach levels with the civil design. If existing abutments are retained, require an assessment of their condition and reactions rather than assuming that a lighter bridge makes them adequate.",
    ],
  },
  {
    id: "durability", title: "Turn corrosion resistance into a durability specification",
    paragraphs: [
      "FHWA identifies low weight and corrosion resistance as advantages of FRP bridge components. Neither property establishes a service life for an unspecified laminate. Define the exposure and request evidence for the proposed material system, including surface protection and the design properties used under service conditions.",
      "For a coastal or waterside project, ask the supplier to address persistent moisture, salt exposure, sunlight, temperature and any cleaning chemicals. Record how cut edges and drilled holes will be finished. Specify metal fittings separately, and make protective finishes and deck wear surfaces accessible for inspection and renewal. Any fire-performance requirement must refer to the proposed assembly and the owner's acceptance criteria.",
    ], source: sources.fhwa,
  },
  {
    id: "installation-maintenance", title: "Plan transport, installation and inspection before ordering",
    paragraphs: [
      "Compare delivery as individual members, trial-assembled modules or a larger assembly against the actual access route. Request a packing list, member identification, module weights, approved lifting points and temporary support requirements. Agree who checks bearing levels and anchors, who assembles the bridge, and who signs off the completed installation. A low component weight does not itself establish a safe manual-handling or lifting method.",
      "The Forest Service guide covers transport, assembly and maintenance, including the need to avoid damaging FRP by overtightening connections. Set the inspection programme with the bridge engineer and supplier. Include joints, surface damage, deck condition and supports; retain baseline photographs and installation records so later changes can be assessed. Obtain an approved repair process rather than treating the bridge as maintenance-free.",
    ], source: sources.forest,
  },
  {
    id: "design-basis", title: "Agree the bridge design basis and evidence package",
    paragraphs: [
      "ASCE/SEI 74-23 addresses pultruded glass FRP shapes and connections within its stated scope. It is not, on its own, approval of a complete pedestrian bridge. The appointed engineer must check applicability to the proposed material and structure, alongside the bridge owner's adopted loading, serviceability and other requirements. Listing a standard in a brochure does not demonstrate that a particular component or bridge complies.",
      "Before fabrication, agree the drawings, material property records, calculation responsibilities, inspection records and acceptance process. Require the supplier to identify any exclusions: foundations, bearings, anchors, civil works, lifting, installation and final design certification may sit with different parties. Compare offers against that responsibility schedule so a profile-only quote is not mistaken for a complete installed bridge.",
    ], source: sources.asce,
  },
];

const systems = [
  ["Beam-and-deck", "Review where structural depth below the walking surface is available.", "Check girder restraint, deck support spacing, torsion and bearing details."],
  ["Truss", "Review where depth alongside the path can form part of the main structure.", "Check compression-chord restraint, diagonal connections, portal clearance and site splices."],
  ["FRP deck on another structure", "Review where the main girders are retained or specified in another material.", "Check deck attachments, movement compatibility and the condition and capacity of the supporting bridge."],
];

const faqs = [
  ["What span can an FRP pedestrian bridge achieve?", "There is no single span rating for FRP. Request a concept matched to clear span, width, structural depth, loading, vibration criteria and transport constraints. A profile table or photograph cannot establish the capacity of a complete bridge."],
  ["Is an FRP bridge cheaper than a steel bridge?", "Compare quoted installed and ownership costs for the same requirements. Include engineering, foundations, transport, lifting, closures, protective treatments, inspections and future deck work. Low weight may help access logistics, but it does not guarantee a lower project price."],
  ["Can maintenance vehicles use a fiberglass footbridge?", "Only where the bridge is designed and accepted for the specified vehicle. Supply axle loads, wheel arrangement and the intended access controls. Do not infer vehicle capacity from a pedestrian loading statement."],
  ["Does F1 supply a complete bridge or components?", "Define the required scope in the RFQ: raw profiles, cut and drilled parts, deck panels, handrail components, fittings or agreed assemblies. Engineering, transport and installation responsibilities must be confirmed in the quotation."],
];

export default function PedestrianBridgeGuide() {
  return (
    <section className="bg-white py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[24px] sm:px-[34px]">
        <nav aria-label="Bridge guide contents" className="rounded-lg border border-border-default bg-bg2 p-6">
          <h2 className="text-f19 font-bold text-t1">FRP pedestrian bridge specification guide</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="text-f15 text-teal-text underline underline-offset-4">{section.title}</a></li>)}
            <li><a href="#bridge-faq" className="text-f15 text-teal-text underline underline-offset-4">Common procurement questions</a></li>
          </ul>
        </nav>
        <div className="mt-10 max-w-[900px] space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-f24 font-bold text-t1">{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 45)} className="mt-4 text-f15 leading-relaxed text-t2">{paragraph}</p>)}
              {section.source && <p className="mt-3 text-f13 text-t3">Reference: <a className="text-teal-text underline underline-offset-4" href={section.source.href}>{section.source.label}</a>.</p>}
              {section.id === "system-selection" && (
                <div className="mt-6 overflow-x-auto rounded-lg border border-border-default">
                  <table className="w-full min-w-[580px] text-left text-f13 leading-relaxed">
                    <caption className="p-4 text-left font-bold text-t1">Concept comparison — selection prompts, not span ratings</caption>
                    <thead className="bg-bg2"><tr>{["System", "Concept review", "Details to resolve"].map((label) => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead>
                    <tbody>{systems.map(([name, use, checks]) => <tr key={name} className="border-t border-border-default"><th scope="row" className="p-4 text-t1">{name}</th><td className="p-4 text-t2">{use}</td><td className="p-4 text-t2">{checks}</td></tr>)}</tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
          <section id="bridge-faq" className="scroll-mt-28">
            <h2 className="text-f24 font-bold text-t1">FRP pedestrian bridge questions</h2>
            <dl className="mt-5 space-y-6">{faqs.map(([question, answer]) => <div key={question}><dt className="text-f19 font-bold text-t1">{question}</dt><dd className="mt-2 text-f15 leading-relaxed text-t2">{answer}</dd></div>)}</dl>
          </section>
          <div className="rounded-lg border border-border-default bg-bg2 p-6">
            <h2 className="text-f24 font-bold text-t1">Send a bridge component brief</h2>
            <p className="mt-3 text-f15 leading-relaxed text-t2">Start with the span, width, site conditions and a sketch. Include the owner’s design criteria, proposed delivery scope and destination so the component schedule and quotation can be reviewed together.</p>
            <Link href={bridgeRfqHref} className="mt-5 inline-block font-bold text-teal-text underline underline-offset-4">Prepare an FRP pedestrian bridge enquiry →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
