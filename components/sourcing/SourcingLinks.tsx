import Link from "next/link";
import PageSection from "@/components/layout/PageSection";

export default function SourcingLinks() {
  return (
    <PageSection id="sourcing" title="Planning composite production?" intro="Prepare a sourcing brief for the equipment, tooling and materials your process needs.">
      <div className="grid gap-[16px] md:grid-cols-2">
        <Link href="/sourcing/equipment" className="rounded-card border border-border-default bg-bg2 p-[24px] hover:border-teal-border">
          <h3 className="text-f20 font-bold text-t1">Equipment & tooling sourcing</h3>
          <p className="mt-[10px] text-f16 leading-golden text-t2">Pultrusion lines, dies, resin mixing, pullwinding, slitters and molding equipment. Define the modules, interfaces and acceptance plan.</p>
          <span className="mt-[16px] inline-block text-f14 font-semibold text-teal-text">Browse equipment specifications →</span>
        </Link>
        <Link href="/sourcing/materials" className="rounded-card border border-border-default bg-bg2 p-[24px] hover:border-teal-border">
          <h3 className="text-f20 font-bold text-t1">Composite material sourcing</h3>
          <p className="mt-[10px] text-f16 leading-golden text-t2">Glass roving, mats, veils, stitched fabrics and gelcoat. Match the grade to your resin, process and delivery requirements.</p>
          <span className="mt-[16px] inline-block text-f14 font-semibold text-teal-text">Browse material specifications →</span>
        </Link>
      </div>
    </PageSection>
  );
}
