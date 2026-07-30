import LinkArrow from "@/components/ui/LinkArrow";
import SectionTag from "@/components/ui/SectionTag";
import SolutionCard from "@/components/ui/SolutionCard";
import { productCategories } from "@/content/data/products";

const advantages = [
  { value: "Up to 75%", label: "lighter than steel" },
  { value: "No rust", label: "or repainting cycles" },
  { value: "Dielectric", label: "electrical insulation" },
  { value: "4+ resins", label: "matched to exposure" },
];

export default function SolutionsSnapshot() {
  return (
    <section className="bg-white py-[58px] md:py-[78px]">
      <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
        <div className="mb-[30px] flex flex-col gap-[16px] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionTag>Product systems</SectionTag>
            <h2 className="mt-[12px] max-w-[760px] text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-t1">
              Our product lines for structural and engineered FRP
            </h2>
            <p className="mt-[10px] max-w-[720px] text-f15 leading-relaxed text-t2">
              Start with a stocked profile family or develop a project-specific section with tooling, material, and documentation support.
            </p>
          </div>
          <LinkArrow href="/pultruded-frp-profiles" className="shrink-0">
            Browse all products
          </LinkArrow>
        </div>

        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((product) => (
            <SolutionCard
              key={product.slug}
              title={product.title}
              description={product.description}
              href={product.href}
              image={product.image}
              imageAlt={product.imageAlt ?? `${product.title} manufactured by F1 Composite`}
              imageScale={product.imageScale}
              imageFit={product.imageFit}
            />
          ))}
        </div>

        <div className="mt-[24px] grid overflow-hidden rounded-[10px] border border-border-default bg-bg2 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.label}
              className={`px-[18px] py-[17px] ${index > 0 ? "lg:border-l lg:border-border-default" : ""}`}
            >
              <p className="text-f15 font-extrabold text-t1">{advantage.value}</p>
              <p className="mt-[2px] text-f13 text-t2">{advantage.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-[14px] flex flex-wrap gap-x-[24px] gap-y-[10px]">
          <LinkArrow href="/what-is-frp">
            What is glass fiber reinforced plastic (FRP)?
          </LinkArrow>
          <LinkArrow href="/technology/frp-vs-traditional-materials">
            Compare FRP with steel and aluminum
          </LinkArrow>
        </div>
      </div>
    </section>
  );
}
