import SupplierImageFigure from "@/components/sourcing/SupplierImageFigure";
import { frpzsImages } from "@/content/data/sourcingImages";
import Link from "next/link";
import PageSection from "@/components/layout/PageSection";

export default function SourcingLinks() {
  return (
    <PageSection id="sourcing" title="Equipment, tooling & material support" intro="As part of a Know-How engagement, we help define equipment specifications, tooling requirements and material qualification. These guides support technology transfer and production setup.">
      <div className="grid gap-[16px] md:grid-cols-2">
        <Link href="/sourcing/equipment" className="rounded-card border border-border-default bg-bg2 p-[24px] hover:border-teal-border">
          <h3 className="text-f20 font-bold text-t1">Equipment & tooling support</h3>
          <p className="mt-[10px] text-f16 leading-golden text-t2">Profile, rebar and mesh lines; dies, mandrels, preformers, fixtures and resin injection. Define the modules, interfaces and acceptance plan.</p>
          <span className="mt-[16px] inline-block text-f14 font-semibold text-teal-text">Browse equipment specifications →</span>
        </Link>
        <Link href="/sourcing/materials" className="rounded-card border border-border-default bg-bg2 p-[24px] hover:border-teal-border">
          <h3 className="text-f20 font-bold text-t1">Material qualification & sourcing support</h3>
          <p className="mt-[10px] text-f16 leading-golden text-t2">Resins, cure systems, roving, mats, veils, fabrics, release agents and additives. Qualify the complete material package with the tooling and process.</p>
          <span className="mt-[16px] inline-block text-f14 font-semibold text-teal-text">Browse material specifications →</span>
        </Link>
      </div>
      <div className="mt-[24px] grid items-start gap-[16px] lg:grid-cols-3">
        {[
          { photo: frpzsImages.channelDie, href: "/sourcing/pultrusion-dies" },
          { photo: frpzsImages.hydraulicLine, href: "/sourcing/pultrusion-machines" },
          { photo: frpzsImages.injectionUnit, href: "/sourcing/resin-mixing-injection" },
        ].map((item, index) => <Link key={item.href} href={item.href} className="block rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"><SupplierImageFigure photo={item.photo} number={index + 2} sizes="(max-width: 1023px) 94vw, 30vw" /></Link>)}
      </div>
    </PageSection>
  );
}
