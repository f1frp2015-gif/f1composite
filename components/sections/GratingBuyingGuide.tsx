import Link from "next/link";
import { moldedGratingSpecGroups } from "@/content/data/moldedGratingSpecs";
import { pultrudedGratingSpecGroups } from "@/content/data/pultrudedGratingSpecs";
import { commercialFacts } from "@/content/data/engineeringEvidence";
import { gratingInquiryHref, gratingProducts, type GratingFamily } from "@/lib/gratingInquiry";

const supply = [
  { title: "Quantity & samples", body: "Send panel quantities or total area, your preferred configuration and sample needs. Minimum production quantity and sample arrangements are confirmed with the quotation." },
  { title: "Whole panels or a cut plan", body: "State the required finished sizes, openings, edge treatment, panel identification and fixing kits. We confirm the drawing and fabrication scope before order release." },
  { title: "Packing & destination", body: "Give the delivery country, port or postcode and site handling constraints. The quotation defines packing, freight scope and the agreed Incoterm." },
  { title: "Production & transit", body: "Share your required-on-site date. Production timing and transport time are confirmed separately after specification, quantity and destination review." },
];

export default function GratingBuyingGuide({ family }: { family?: GratingFamily }) {
  const families: GratingFamily[] = family ? [family] : ["molded", "pultruded"];
  return <>
    <section id="grating-engineering" className="scroll-mt-[100px] bg-bg2 py-[44px] md:py-[60px]">
      <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
        <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">Engineering & downloads</p>
        <h2 className="mt-[10px] text-f31 font-bold text-t1">Match the documents to your panel</h2>
        <p className="mt-[12px] max-w-[850px] text-f15 leading-relaxed text-t2">Download the current selection data and clip drawings. For a load/deflection table or test report, identify the panel and service conditions so the documents match the proposed supply.</p>
        <div className="mt-[24px] grid gap-[18px] lg:grid-cols-3">
          <article className="rounded-[10px] border border-border-default bg-white p-[24px]">
            <div aria-label="Selection data preview" className="mb-4 overflow-hidden rounded-md border border-border-default bg-bg2 p-3 text-xs"><p className="mb-2 font-bold uppercase tracking-wide text-teal-text">Inside the selection CSV</p><table className="w-full text-left"><thead><tr><th>Depth</th><th>Weight</th><th>Open area</th></tr></thead><tbody>{(family === 'pultruded' ? pultrudedGratingSpecGroups[0].rows : moldedGratingSpecGroups[0].rows).slice(0,3).map((r,i) => <tr key={i} className="border-t border-border-default"><td className="py-2">{r.depth} mm</td><td>{r.weight} kg/m²</td><td>{r.openArea}</td></tr>)}</tbody></table><p className="mt-2 text-t3">Nominal selection data · not a load table</p></div><h3 className="text-f19 font-bold">Panel selection data</h3>
            <p className="mt-[10px] text-f13 leading-relaxed text-t2">Spreadsheet-ready CSV with the same dimensions, nominal weights and open areas shown on our product pages. Selection reference, not a load table.</p>
            {families.map(item => <a key={item} className="mt-[14px] block min-h-[36px] text-f14 font-bold text-teal-text underline underline-offset-4" href={`/api/grating-specifications?family=${item}`} download>Download {item} specifications (CSV) ↓</a>)}
          </article>
          <article className="rounded-[10px] border border-border-default bg-white p-[24px]">
            <h3 className="text-f19 font-bold">Fixing clips & CAD</h3>
            <p className="mt-[10px] text-f13 leading-relaxed text-t2">Select 316SS hold-downs against the mesh or bearing bar, panel depth, support flange and underside access. Confirm the complete assembly on the drawing.</p>
            {families.map(item => <div key={item} className="mt-[14px]"><Link className="block text-f14 font-bold text-teal-text underline underline-offset-4" href={`${gratingProducts[item].path}#grating-clips`}>{gratingProducts[item].clips} clip selection →</Link><a className="mt-[8px] block text-f13 text-teal-text underline underline-offset-4" href={gratingProducts[item].cad} download>Download {item} clip DXF ↓</a></div>)}
          </article>
          <article className="rounded-[10px] border border-teal-border bg-teal-bg p-[24px]">
            <h3 className="text-f19 font-bold">Project load & test data</h3>
            <p className="mt-[10px] text-f13 leading-relaxed text-t2">Include series or mesh, clear span, support width, uniform/point load, load footprint and deflection limit. State resin, chemical exposure, temperature and any fire or slip-test requirement.</p>
            <Link className="mt-[18px] inline-flex min-h-[44px] items-center text-f14 font-bold text-teal-text underline underline-offset-4" href={gratingInquiryHref(family, "Request applicable grating load/deflection data and product test documents", "grating-engineering")}>Request matching engineering data →</Link>
          </article>
        </div>
      </div>
    </section>
    <section id="grating-supply" className="scroll-mt-[100px] bg-white py-[44px] md:py-[60px]">
      <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
        <p className="text-f11 font-bold uppercase tracking-[0.12em] text-teal-text">Project & bulk procurement</p>
        <h2 className="mt-[10px] text-f31 font-bold text-t1">Plan the supply as well as the panel</h2>
        <p className="mt-[12px] max-w-[880px] text-f15 leading-relaxed text-t2">For US, Canadian, Australian, New Zealand and UK enquiries, include the destination and required units. Panel specification, quantity, cutting, fixing kits, packing and freight determine the quoted scope.</p>
        <div className="mt-[24px] grid gap-[20px] sm:grid-cols-2 lg:grid-cols-4">{supply.map((item, index) => <article key={item.title}><span className="text-f13 font-bold text-teal-text">0{index + 1}</span><h3 className="mt-[10px] text-f17 font-bold text-t1">{item.title}</h3><p className="mt-[10px] text-f14 leading-relaxed text-t2">{item.body}</p></article>)}</div>
        <div className="mt-[28px] flex flex-col gap-[18px] rounded-[10px] bg-deep p-[24px] text-white md:flex-row md:items-center md:justify-between">
          <div><h3 className="text-f19 font-bold">Have a drawing, or still choosing?</h3><p className="mt-[8px] max-w-[740px] text-f13 leading-relaxed text-white/80">{commercialFacts.response} Attach your layout to the enquiry, or describe the application and ask us to help shortlist a configuration.</p></div>
          <Link className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-[6px] bg-white px-[20px] text-f14 font-bold text-deep" href="#grating-quote">Quote a drawing or schedule →</Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-teal-text"><Link className="inline-flex min-h-11 items-center underline" href="#grating-budget">Get a budget estimate</Link><Link className="inline-flex min-h-11 items-center underline" href="#grating-review">Prepare a specification review</Link><Link className="inline-flex min-h-11 items-center underline" href={gratingInquiryHref(family, 'Sample request: please confirm the configuration, finish, sample cost and shipping arrangements.', 'grating-sample')}>Request a sample</Link></div>
        <p className="mt-[12px] text-f12 leading-relaxed text-t3">{commercialFacts.availability}</p>
      </div>
    </section>
  </>;
}
