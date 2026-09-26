import Link from "next/link";
import Button from "@/components/ui/Button";
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
    <section className="bg-bg2 py-[48px] md:py-[64px]" aria-labelledby="home-quality">
      <div className="site-container">
        <div className="grid items-stretch gap-[32px] lg:grid-cols-[0.94fr_1.06fr] lg:gap-[52px]">
          <div className="flex flex-col">
            <h2 id="home-quality" className="text-[clamp(26px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
              Manufacturing & quality control
            </h2>
            <p className="mt-[10px] max-w-[660px] text-f16 leading-relaxed text-t2">
              Profiles are made in the FengDu New Material production network, F1 Composite&apos;s parent group. These are the checks each order goes through before it ships.
            </p>

            <ol className="mt-[24px] divide-y divide-border-default border-y border-border-default">
              {checkpoints.map((item) => (
                <li key={item.number} className="grid grid-cols-[34px_1fr] gap-[12px] py-[13px]">
                  <span className="pt-[2px] text-f12 font-extrabold text-teal-text">{item.number}</span>
                  <div>
                    <h3 className="text-f14 font-bold text-t1">{item.title}</h3>
                    <p className="mt-[2px] text-f14 leading-relaxed text-t2">{item.description}</p>
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

          <div className="relative aspect-video self-center overflow-hidden rounded-card border border-border-default bg-bg2 shadow-card">
            <FactoryVideo />
          </div>
        </div>

        <div className="mt-[28px] flex flex-col gap-[10px] rounded-card border border-border-default bg-white px-[18px] py-[15px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-f14 font-bold text-t1">Technical documents for your specification</p>
          <div className="flex flex-wrap gap-x-[16px] gap-y-[5px]">
            {standards.map((standard) => (
              <Link href={standard.href} key={standard.href} className="text-f12 font-bold uppercase tracking-[0.07em] text-t3">
                {standard.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
