import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import { gratingInquiryHref, type GratingFamily } from "@/lib/gratingInquiry";

export default function GratingLoadDataRequirements({ family }: { family: GratingFamily }) {
  return <PageSection id="load-data" title="FRP grating load and span tables: match the evidence to the panel" intro="The dimensions and weights on this page are selection data. A product-specific numeric load/span table is not published here. Ask for the available evidence for your exact configuration before design approval.">
    <div className="grid gap-[16px] md:grid-cols-3">{[
      ["Identify the specimen", "Panel type, depth, mesh or bearing-bar geometry, resin, reinforcement, surface and manufacturing reference. Do not transfer a molded-panel result to pultruded grating."],
      ["Match the test or calculation", "Clear span, support width and arrangement, bearing direction, uniform or point load, footprint, deflection criterion, temperature and duration. Distinguish ultimate test load from an allowable design value."],
      ["Check the finished layout", "Cut edges, penetrations, local supports, clip layout and access loads can change the application. Request the report or calculation reference and the approval scope for the finished panel."],
    ].map(([title, body]) => <div key={title} className="rounded-card border border-border-default bg-bg2 p-[20px]"><h3 className="text-f18 font-bold text-t1">{title}</h3><p className="mt-[8px] text-f14 leading-relaxed text-t2">{body}</p></div>)}</div>
    <p className="mt-[16px] text-f14 leading-relaxed text-t2">A generic FRP beam calculator or structural-profile span table cannot establish a grating panel rating. If applicable data are unavailable, the quotation review must identify the additional testing or engineering work required.</p>
    <div className="mt-[20px] flex flex-wrap gap-[20px] text-f14 font-semibold text-teal-text"><Link className="underline underline-offset-4" href={gratingInquiryHref(family, undefined, "grating-load-data")}>Request a configuration and load-data review →</Link><Link className="underline underline-offset-4" href="/resources/blog/how-to-read-frp-grating-load-table">Read the load-table checklist</Link></div>
  </PageSection>;
}
