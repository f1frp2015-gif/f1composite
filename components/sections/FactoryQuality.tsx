import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import FactoryVideo from "@/components/sections/FactoryVideo";

const checkpoints = [
  {
    number: "01",
    title: "Profile and tooling review",
    description: "Geometry, tolerances, die design, sampling, and validation before production release.",
  },
  {
    number: "02",
    title: "Material architecture",
    description: "Resin chemistry and fiber schedule matched to load, exposure, fire, and thermal requirements.",
  },
  {
    number: "03",
    title: "Controlled production",
    description: "Dimensional, surface, cure, and batch checks with project-level traceability.",
  },
  {
    number: "04",
    title: "Export-ready delivery",
    description: "Cutting, machining, labeling, packaging, documentation, and global freight coordination.",
  },
];

const standards = ["ISO 9001:2015", "EN 13706", "ASTM D3917", "CE project support"];

export default function FactoryQuality() {
  return (
    <section className="bg-white py-[58px] md:py-[78px]">
      <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
        <div className="grid items-stretch gap-[32px] lg:grid-cols-[0.94fr_1.06fr] lg:gap-[52px]">
          <div className="flex flex-col">
            <SectionTag>Manufacturing &amp; quality</SectionTag>
            <h2 className="mt-[12px] text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-t1">
              A controlled path from drawing to delivery
            </h2>
            <p className="mt-[10px] max-w-[660px] text-f15 leading-relaxed text-t2">
              F1 Composite combines manufacturing capacity with the engineering, documentation, and export support international projects require.
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
              <Button href="/about" variant="secondary">About the Company</Button>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[12px] border border-border-default bg-bg2 shadow-[0_14px_38px_rgba(11,24,56,0.08)] lg:min-h-0">
            <FactoryVideo />
          </div>
        </div>

        <div className="mt-[28px] flex flex-col gap-[10px] rounded-[9px] border border-border-default bg-bg2 px-[18px] py-[15px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-f13 font-bold text-t1">Documented standards and project compliance</p>
          <div className="flex flex-wrap gap-x-[16px] gap-y-[5px]">
            {standards.map((standard) => (
              <span key={standard} className="text-f11 font-bold uppercase tracking-[0.07em] text-t3">
                {standard}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
