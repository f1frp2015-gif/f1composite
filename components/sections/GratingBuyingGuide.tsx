import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
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

/** Documents for the selected panel, then the supply plan. Tones alternate with the page around them. */
export default function GratingBuyingGuide({ family, tones = ["muted", "white"] }: { family?: GratingFamily; tones?: ["white" | "muted", "white" | "muted"] }) {
  const families: GratingFamily[] = family ? [family] : ["molded", "pultruded"];
  return <>
    <PageSection id="grating-engineering" title="Match the documents to your panel" tone={tones[0]} intro="Download the current selection data and clip drawings. For a load/deflection table or test report, identify the panel and service conditions so the documents match the proposed supply.">
        <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
          <article className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <div aria-label="Selection data preview" className="mb-4 overflow-hidden rounded-control border border-border-default bg-bg2 p-3 text-f12"><p className="mb-2 font-mono text-f12 uppercase tracking-[0.06em] text-t3">Inside the selection CSV</p><table className="w-full text-left"><thead><tr><th>Depth</th><th>Weight</th><th>Open area</th></tr></thead><tbody>{(family === 'pultruded' ? pultrudedGratingSpecGroups[0].rows : moldedGratingSpecGroups[0].rows).slice(0,3).map((r,i) => <tr key={i} className="border-t border-border-default"><td className="py-2">{r.depth} mm</td><td>{r.weight} kg/m²</td><td>{r.openArea}</td></tr>)}</tbody></table><p className="mt-2 text-t3">Nominal selection data · not a load table</p></div><h3 className="text-f18 font-bold">Panel selection data</h3>
            <p className="mt-[10px] text-f14 leading-relaxed text-t2">Spreadsheet-ready CSV with the same dimensions, nominal weights and open areas shown on our product pages. Selection reference, not a load table.</p>
            {families.map(item => <a key={item} className="mt-[14px] block min-h-[36px] text-f14 font-bold text-teal-text underline underline-offset-4" href={`/api/grating-specifications?family=${item}`} download>Download {item} specifications (CSV) ↓</a>)}
          </article>
          <article className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">Fixing clips & CAD</h3>
            <p className="mt-[10px] text-f14 leading-relaxed text-t2">Select 316SS hold-downs against the mesh or bearing bar, panel depth, support flange and underside access. Confirm the complete assembly on the drawing.</p>
            {families.map(item => <div key={item} className="mt-[14px]"><Link className="block text-f14 font-bold text-teal-text underline underline-offset-4" href={`${gratingProducts[item].path}#grating-clips`}>{gratingProducts[item].clips} clip selection →</Link><a className="mt-[8px] block text-f14 text-teal-text underline underline-offset-4" href={gratingProducts[item].cad} download>Download {item} clip DXF ↓</a></div>)}
          </article>
          <article className="rounded-card border border-teal-border bg-teal-bg p-[20px] sm:p-[24px]">
            <h3 className="text-f18 font-bold text-t1">Project load & test data</h3>
            <p className="mt-[10px] text-f14 leading-relaxed text-t2">Include series or mesh, clear span, support width, uniform/point load, load footprint and deflection limit. State resin, chemical exposure, temperature and any fire or slip-test requirement.</p>
            <Link className="mt-[18px] inline-flex min-h-[44px] items-center text-f14 font-bold text-teal-text underline underline-offset-4" href={gratingInquiryHref(family, "Request applicable grating load/deflection data and product test documents", "grating-engineering")}>Request matching engineering data →</Link>
          </article>
        </div>
    </PageSection>
    <PageSection id="grating-supply" title="Plan the supply as well as the panel" tone={tones[1]} intro="For US, Canadian, Australian, New Zealand and UK enquiries, include the destination and required units. Panel specification, quantity, cutting, fixing kits, packing and freight determine the quoted scope.">
        <ol className="grid grid-cols-1 gap-x-[32px] gap-y-[20px] sm:grid-cols-2 lg:grid-cols-4">{supply.map((item, index) => <li key={item.title} className="border-t border-border-default pt-[14px]"><p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p><h3 className="mt-[4px] text-f18 font-bold text-t1">{item.title}</h3><p className="mt-[6px] text-f14 leading-golden text-t2">{item.body}</p></li>)}</ol>
        <p className="mt-[24px] max-w-[820px] text-f14 leading-golden text-t2">{commercialFacts.response} Attach your layout to the enquiry, or describe the application and ask us to help shortlist a configuration.</p>
        <div className="mt-[8px] flex flex-wrap gap-x-[24px] gap-y-[4px] text-f14 font-semibold text-teal-text"><Link className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-teal" href="#grating-quote">Quote a drawing or schedule</Link><Link className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-teal" href="#grating-budget">Get a budget estimate</Link><Link className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-teal" href="#grating-review">Prepare a specification review</Link><Link className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-teal" href={gratingInquiryHref(family, 'Sample request: please confirm the configuration, finish, sample cost and shipping arrangements.', 'grating-sample')}>Request a sample</Link></div>
        <p className="mt-[12px] text-f14 leading-golden text-t3">{commercialFacts.availability}</p>
    </PageSection>
  </>;
}
