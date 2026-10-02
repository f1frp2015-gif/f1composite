import Link from "next/link";

const routes = [
  {
    number: "01",
    title: "Long, repeatable section",
    method: "Pultruded profile",
    fit: "Start here when the part can keep one cross-section along its length: a rail, edge frame, hollow member or panel stiffener. Define the installation envelope, the load direction and every joint before drawing the die.",
    examples: "Bus roof and duct rails, luggage-bay edges, body panel stiffeners and battery enclosure perimeter details.",
  },
  {
    number: "02",
    title: "Profile integrated into a panel",
    method: "Assembly design",
    fit: "A pultruded edge or stiffener can be evaluated with a sandwich panel or molded part. The adhesive, fasteners, local inserts and panel skins then become part of the load path and the test article.",
    examples: "Honeycomb panel edges, access covers and insulated vehicle walls.",
  },
  {
    number: "03",
    title: "Large three-dimensional surface",
    method: "Molded part route",
    fit: "A roof shell, front or rear cover with changing section and compound curvature normally needs a molding route such as resin transfer molding (RTM). Specify the shell separately, then decide whether a pultruded rail has a useful interface role.",
    examples: "Body covers, large exterior skins and complex battery covers.",
  },
] as const;

const decisions = [
  {
    topic: "Reinforcement and direction",
    question: "Where do the bending, axial, transverse and local bearing loads enter the part?",
    evidence: "Longitudinal and transverse material data, local joint specimens and full-section tests where the component requires them.",
  },
  {
    topic: "Resin and surface",
    question: "What are the heat, moisture, salt, cleaning, fire, electrical and finish requirements?",
    evidence: "A named resin and laminate build, finish specification and reports for the proposed formulation and test configuration.",
  },
  {
    topic: "Geometry and assembly",
    question: "Will the section fit the mounting envelope after cutting, drilling, coating and temperature cycling?",
    evidence: "A datum-based drawing, first-article dimensions, curvature fit where needed, coating bake distortion checks and an approved fastening or bonding procedure.",
  },
  {
    topic: "Service life and approval",
    question: "Which loads repeat, which failures matter, and who accepts the finished component?",
    evidence: "Part-level fatigue, vibration, impact or creep evidence as specified by the OEM, plus an agreed production inspection plan.",
  },
] as const;

const stages = [
  {
    number: "01",
    title: "Freeze the duty and interface",
    text: "Mark the part on the vehicle drawing. Set loads, support points, allowable movement, temperature range, surface class and the OEM's applicable acceptance requirements.",
  },
  {
    number: "02",
    title: "Build a representative profile",
    text: "Review the die concept, wall and corner geometry, fiber architecture, resin and finish. Produce samples with the intended material and process.",
  },
  {
    number: "03",
    title: "Test the installed detail",
    text: "Measure fit and tolerances, then test the load path through the actual bond or fastener layout. Add cyclic, impact, thermal, fire or dielectric testing according to the component's duty.",
  },
  {
    number: "04",
    title: "Agree the supply control",
    text: "Set drawing revision, critical dimensions, inspection frequency, material traceability, finish limits and change control before repeat orders. The vehicle maker owns final part and vehicle approval.",
  },
] as const;

export default function VehicleEngineering() {
  return (
    <div className="space-y-[32px]">
      <div>
        <h3 className="text-f20 font-bold text-t1">Choose the process from the part geometry</h3>
        <p className="mt-[8px] max-w-[880px] text-f16 leading-golden text-t2">
          Pultrusion is a route for repeated lineal geometry. A panel or three-dimensional shell may need another process, even when a pultruded edge or stiffener remains useful.
        </p>
        <ol className="mt-[16px] grid grid-cols-1 gap-[12px] lg:grid-cols-3">
          {routes.map((route) => (
            <li key={route.number} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{route.number} · {route.method}</p>
              <h4 className="mt-[6px] text-f18 font-bold text-t1">{route.title}</h4>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{route.fit}</p>
              <p className="mt-[12px] border-t border-border-default pt-[12px] text-f14 leading-golden text-t2"><span className="font-semibold text-t1">Candidate parts:</span> {route.examples}</p>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="text-f20 font-bold text-t1">Define the laminate and the evidence together</h3>
        <p className="mt-[8px] max-w-[880px] text-f16 leading-golden text-t2">
          Automotive qualification uses the offered laminate and finished detail. E-glass, carbon or a hybrid layup; resin family; transverse reinforcement; surface veil and coating are choices to evaluate against the same drawing and duty cycle. Test values belong to the specified construction and specimen.
        </p>
        <div className="relative mt-[16px] overflow-x-auto rounded-card border border-border-default bg-white" role="region" aria-label="Vehicle profile design and validation matrix" tabIndex={0}>
          <table className="w-full min-w-[760px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Design decision", "Question for the vehicle program", "Evidence to request"].map((heading) => (
                  <th key={heading} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {decisions.map((decision) => (
                <tr key={decision.topic} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[12px] font-semibold text-t1">{decision.topic}</th>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{decision.question}</td>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{decision.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-f20 font-bold text-t1">Move from concept to a controlled part</h3>
        <ol className="mt-[16px] grid grid-cols-1 gap-[12px] md:grid-cols-2">
          {stages.map((stage) => (
            <li key={stage.number} className="grid grid-cols-[auto_minmax(0,1fr)] gap-[14px] rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <span className="font-mono text-f14 text-teal-text">{stage.number}</span>
              <div>
                <h4 className="text-f16 font-bold text-t1">{stage.title}</h4>
                <p className="mt-[6px] text-f14 leading-golden text-t2">{stage.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-[16px] text-f14 leading-golden text-t2">
          Start with a marked drawing and the acceptance basis. We can review the profile and test scope through our <Link href="/products/custom-pultruded-profiles" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">custom pultrusion process</Link>; any vehicle-level certification or production approval remains with the responsible vehicle program.
        </p>
      </div>
    </div>
  );
}
