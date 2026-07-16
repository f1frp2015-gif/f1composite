import SectionTag from "@/components/ui/SectionTag";

const routes = [
  {
    name: "Molded grating",
    process: "Alternating rovings → resin wet-out → thermal cure → one-piece mesh",
    fit: "Multi-directional loads, chemical exposure, frequent cutouts and short-to-medium spans.",
  },
  {
    name: "Pultruded grating",
    process: "Pultruded bearing bars → cut and drill → cross-rods → bonded panel",
    fit: "Long clear spans, stiffness-led design, high open area and directional loads.",
  },
] as const;

const comparisons = [
  ["Fiber architecture", "Bi-directional", "Bearing-direction dominant"],
  ["Typical glass content", "30–35%", "60–65%"],
  ["Best structural fit", "Short/medium spans", "Long clear spans"],
  ["Field cutouts", "Flexible in either direction", "Preserve bearing-bar direction"],
  ["Chemical exposure", "Highest resin-rich protection", "High, with veil protection"],
  ["Typical choice", "Wet process areas", "Elevated walkways and bridges"],
] as const;

export default function GratingSelectionGuide() {
  return (
    <section className="bg-white py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <SectionTag>Molded vs Pultruded</SectionTag>
        <h2 className="mt-[13px] text-f24 font-bold text-t1">Choose the manufacturing route from the load path</h2>
        <div className="mt-[21px] grid gap-[13px] md:grid-cols-2">
          {routes.map((route) => (
            <article key={route.name} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <h3 className="text-f17 font-bold text-t1">{route.name}</h3>
              <p className="mt-[8px] text-f13 font-semibold leading-golden text-teal-text">{route.process}</p>
              <p className="mt-[8px] text-f13 leading-golden text-t2">{route.fit}</p>
            </article>
          ))}
        </div>
        <div className="mt-[21px] overflow-x-auto rounded-[8px] border border-border-default">
          <table className="w-full min-w-[620px] text-left text-f13">
            <thead className="bg-deep text-white">
              <tr><th className="p-[13px]">Decision</th><th className="p-[13px]">Molded</th><th className="p-[13px]">Pultruded</th></tr>
            </thead>
            <tbody>
              {comparisons.map((row) => (
                <tr key={row[0]} className="border-t border-border-default">
                  {row.map((cell, index) => <td key={cell} className={`p-[13px] ${index === 0 ? "font-semibold text-t1" : "text-t2"}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
