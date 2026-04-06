import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";

const downloads = [
  {
    title: "Product Catalog",
    description:
      "Standard profile families, custom pultrusions, fenestration systems, and application snapshots.",
    href: "/resources/downloads",
  },
  {
    title: "FRP vs Steel Guide",
    description:
      "Comparison points for weight, corrosion resistance, thermal behavior, and lifecycle cost.",
    href: "/technology/frp-vs-traditional-materials",
  },
  {
    title: "Technical Data",
    description:
      "Mechanical properties, resin options, and reference information for engineering review.",
    href: "/resources/technical-data",
  },
];

export default function DownloadsSnapshot() {
  return (
    <section className="bg-white py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="flex flex-col gap-[21px] md:flex-row md:items-end md:justify-between">
          <div>
            <SectionTag>Downloads &amp; Resources</SectionTag>
            <h2 className="mt-[13px] max-w-[800px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
              Technical resources for engineers and procurement teams
            </h2>
          </div>
          <Button href="/resources" variant="text">
            Visit knowledge hub
          </Button>
        </div>

        <div className="mt-[34px] grid gap-[21px] md:grid-cols-3">
          {downloads.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group rounded-[8px] border border-border-default bg-bg2 p-[34px] transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border"
            >
              <div className="text-f11 font-bold uppercase tracking-[3px] text-teal-text">
                Recommended asset
              </div>
              <h3 className="mt-[13px] text-f19 font-bold text-t1 group-hover:text-teal-text">
                {item.title}
              </h3>
              <p className="mt-[8px] text-f15 leading-golden text-t2">
                {item.description}
              </p>
              <span className="mt-[21px] inline-flex text-f13 font-semibold text-teal-text">
                Open resource →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
