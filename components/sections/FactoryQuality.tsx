import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import FactoryVideo from "@/components/sections/FactoryVideo";

const checkpoints = [
  { number: "01", title: "Materials and production", description: "Match the resin and reinforcement schedule to the agreed profile specification." },
  { number: "02", title: "Dimensional inspection", description: "Check section dimensions, straightness, surface condition and cut length against the approved drawing." },
  { number: "03", title: "Technical documentation", description: "Review the applicable material data, test scope and batch inspection documents." },
  { number: "04", title: "Fabrication and packing", description: "Confirm cutting, drilling, labeling, protective packing and shipment documents for the order." },
];
const standards = [
  { label: "Design references", href: "/resources/design-guides" },
  { label: "Material data", href: "/resources/technical-data" },
  { label: "Test reports & certificates", href: "/resources/evidence" },
];

export default function FactoryQuality() {
  return (
    <section className="bg-white py-[58px] md:py-[78px]">
      <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
        <div className="grid items-stretch gap-[32px] lg:grid-cols-[0.94fr_1.06fr] lg:gap-[52px]">
          <div className="flex flex-col">
            <SectionTag>Manufacturing &amp; quality</SectionTag>
            <h2 className="mt-[12px] text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-t1">
              Manufacturing & quality control
            </h2>
            <p className="mt-[10px] max-w-[660px] text-f15 leading-relaxed text-t2">
              F1 Composite coordinates international supply with manufacturing partner FengDu New Material. Review the production process, inspection scope and documents available for your product.
            </p>

            <ol className="mt-[24px] divide-y divide-border-default border-y border-border-default">
              {checkpoints.map((item) => (
                <li key={item.number} className="grid grid-cols-[34px_1fr] gap-[12px] py-[13px]">
                  <span className="pt-[2px] text-f11 font-extrabold text-teal-text">{item.number}</span>
                  <div>
                    <h3 className="text-f13 font-bold text-t1">{item.title}</h3>
                    <p className="mt-[2px] text-f13 leading-relaxed text-t2">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-[20px] flex flex-wrap gap-[10px]">
              <Button href="/technology/quality-testing">Review Quality System</Button>
              <Button href="/products/frp-pultrusion-manufacturer-factory-direct" variant="secondary">
                Factory-Direct Supply
              </Button>
            </div>
          </div>

          <div className="relative aspect-video self-center overflow-hidden rounded-[12px] border border-border-default bg-bg2 shadow-[0_14px_38px_rgba(11,24,56,0.08)]">
            <FactoryVideo />
          </div>
        </div>

        <div className="mt-[28px] flex flex-col gap-[10px] rounded-[9px] border border-border-default bg-bg2 px-[18px] py-[15px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-f13 font-bold text-t1">Technical documents for your specification</p>
          <div className="flex flex-wrap gap-x-[16px] gap-y-[5px]">
            {standards.map((standard) => (
              <Link href={standard.href} key={standard.href} className="text-f11 font-bold uppercase tracking-[0.07em] text-t3">
                {standard.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
