import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";

const checkpoints = [
  {
    title: "Tooling and cross-section development",
    description:
      "Support from profile geometry review and die design through sampling and validation.",
  },
  {
    title: "Resin and fiber architecture selection",
    description:
      "Isophthalic polyester, vinyl ester, polyurethane, and application-specific reinforcement schedules.",
  },
  {
    title: "In-process quality control",
    description:
      "Dimensional control, surface inspection, cure monitoring, and batch-level production checks.",
  },
  {
    title: "Export-ready delivery",
    description:
      "Project labeling, protective packaging, and documentation prepared for international shipments.",
  },
];

export default function FactoryQuality() {
  return (
    <section className="bg-bg2 py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="grid gap-[34px] lg:grid-cols-2">
          {/* Left: text — use flex column to stretch full height */}
          <div className="flex flex-col">
            <SectionTag>Factory &amp; Quality</SectionTag>
            <h2 className="mt-[8px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
              Manufacturing discipline for export projects
            </h2>
            <p className="mt-[8px] text-f15 leading-golden text-t2">
              From CNC-machined tooling to batch-level testing and export-grade packaging,
              every step is controlled and traceable.
            </p>

            <div className="mt-[13px] grid flex-1 gap-[8px] sm:grid-cols-2">
              {checkpoints.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[8px] border border-border-default bg-white p-[13px]"
                >
                  <h3 className="text-f13 font-bold text-t1">{item.title}</h3>
                  <p className="mt-[5px] text-f11 leading-golden text-t2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-[13px] flex flex-wrap gap-[13px]">
              <Button href="/technology/quality-testing">Quality testing</Button>
              <Button href="/contact" variant="secondary">
                Send specification
              </Button>
            </div>
          </div>

          {/* Right: video — aspect-video on mobile, stretch to match left on desktop */}
          <div className="flex items-stretch">
            <div className="aspect-video w-full overflow-hidden rounded-[8px] lg:aspect-auto">
              <iframe
                src="https://www.youtube.com/embed/JNcU9LUEMLU"
                title="F1 Composite pultrusion manufacturing facility"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
