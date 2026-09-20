import Link from "next/link";
import { moldedGratingSpecGroups } from "@/content/data/moldedGratingSpecs";
import { pultrudedGratingSpecGroups } from "@/content/data/pultrudedGratingSpecs";
import { gratingInquiryHref, gratingProducts, moldedGratingSelection, pultrudedGratingSelection, type GratingFamily } from "@/lib/gratingInquiry";
import { approximateInches } from "@/lib/productInquiry";

export default function GratingQuickSpecifications({ family }: { family?: GratingFamily }) {
  const molded = [
    { group: moldedGratingSpecGroups[0], depth: "25", use: "Square mesh · compare for general access" },
    { group: moldedGratingSpecGroups[0], depth: "38", use: "Square mesh · compare a deeper panel" },
    { group: moldedGratingSpecGroups[4], depth: "38", use: "Mini mesh · review the top opening" },
  ].map(({ group, depth, use }) => {
    const row = group.rows.find(item => item.depth === depth)!;
    return { family: "molded" as const, title: `${row.depth} mm molded`, use, detail: group.mesh, depth: row.depth, weight: row.weight, area: row.openArea, selection: moldedGratingSelection(group.mesh, row) };
  });
  const pultruded = [
    { type: "T-1210", use: "T-bar · pedestrian series" },
    { type: "I-4015", use: "I-bar · industrial series" },
    { type: "SI-8315", use: "High-open series · airflow-led layouts" },
  ].map(({ type, use }) => {
    const row = pultrudedGratingSpecGroups.flatMap(group => group.rows).find(item => item.type === type)!;
    return { family: "pultruded" as const, title: row.type, use, detail: `${row.bearingBarCenter} mm bearing-bar centers`, depth: row.depth, weight: row.weight, area: row.openArea, selection: pultrudedGratingSelection(row) };
  });
  const options = family === "molded" ? molded : family === "pultruded" ? pultruded : [...molded, ...pultruded];
  return <section id="grating-configurations" className="scroll-mt-[100px] bg-white py-[40px] md:py-[56px]">
    <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
      <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">Configuration starting points</p>
      <h2 className="mt-[10px] text-f31 font-bold text-t1">Start with a panel configuration</h2>
      <p className="mt-[12px] max-w-[880px] text-f15 leading-relaxed text-t2">Compare these examples from our current range, then review the complete specifications. Dimensions and weights are nominal; confirm the clear opening, load table, resin and delivery schedule for your project.</p>
      <div className="mt-[24px] grid gap-[16px] md:grid-cols-3">
        {options.map(option => <article key={`${option.family}-${option.title}-${option.detail}`} className="flex flex-col rounded-[10px] border border-border-default bg-bg2 p-[22px]">
          <p className="text-f11 font-bold uppercase tracking-wide text-teal-text">{option.use}</p>
          <h3 className="mt-[12px] text-f24 font-bold text-t1">{option.title}</h3>
          <p className="mt-[8px] text-f13 text-t2">{option.detail}</p>
          <dl className="my-[18px] space-y-[7px] text-f13">
            <div className="flex justify-between gap-[8px]"><dt>Depth</dt><dd className="font-semibold">{option.depth} mm · ≈ {approximateInches(Number(option.depth))} in</dd></div>
            <div className="flex justify-between gap-[8px]"><dt>Nominal weight</dt><dd className="font-semibold">{option.weight} kg/m²</dd></div>
            <div className="flex justify-between gap-[8px]"><dt>Open area</dt><dd className="font-semibold">{option.area}</dd></div>
          </dl>
          <Link className="mt-auto inline-flex min-h-[44px] items-center font-bold text-teal-text underline underline-offset-4" href={gratingInquiryHref(option.family, option.selection, "grating-configuration")}>Quote this configuration →</Link>
          <Link className="mt-[8px] text-f12 text-t2 underline underline-offset-4" href={`${gratingProducts[option.family].path}#${gratingProducts[option.family].specifications}`}>All {option.family} specifications</Link>
        </article>)}
      </div>
      <p className="mt-[14px] text-f12 text-t3">Inch values are approximate conversions, not nominal US stock sizes. None of these configurations establishes an allowable span by itself.</p>
    </div>
  </section>;
}
