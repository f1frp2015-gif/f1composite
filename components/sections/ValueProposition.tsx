import SectionTag from "@/components/ui/SectionTag";

const advantages = [
  {
    metric: "75%",
    unit: "lighter",
    title: "Weight Reduction",
    description: "vs steel — lower transport cost, smaller foundations, faster installation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[32px] w-[32px]">
        <path d="M12 2v20M2 12h20" strokeLinecap="round" />
        <path d="M17 7l-5 5-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    metric: "0",
    unit: "corrosion",
    title: "Zero Maintenance",
    description: "No rust, no painting, no cathodic protection — ever.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[32px] w-[32px]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    metric: "0",
    unit: "conductivity",
    title: "Dielectric & Thermal Break",
    description: "Electrically insulating. Thermal conductivity 1/200th of steel.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[32px] w-[32px]">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    metric: "±0.25",
    unit: "mm",
    title: "Dimensional Precision",
    description: "CNC dies + in-process monitoring. Consistent across any volume.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[32px] w-[32px]">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    metric: "4",
    unit: "resin systems",
    title: "Engineered for Environment",
    description: "Polyester, vinyl ester, epoxy, phenolic — matched to your chemical and thermal exposure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[32px] w-[32px]">
        <path d="M9 3h6v8l4 8H5l4-8V3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 3h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    metric: "100",
    unit: "year life",
    title: "Extreme Durability",
    description: "UV-stabilized, non-rotting. Eliminates lifecycle replacement costs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[32px] w-[32px]">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ValueProposition() {
  return (
    <section className="bg-white py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="text-center">
          <SectionTag>Why FRP</SectionTag>
          <h2 className="mx-auto mt-[8px] max-w-[520px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
            Material advantages over steel and aluminium
          </h2>
        </div>

        <div className="mt-[34px] grid gap-[13px] sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="group rounded-[8px] border border-border-default bg-bg2 p-[21px] transition-all duration-[0.21s] hover:border-teal-border hover:shadow-sm"
            >
              <div className="flex items-start gap-[13px]">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[8px] bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-[5px]">
                    <span className="text-f24 font-extrabold text-teal">{item.metric}</span>
                    <span className="text-f13 font-bold text-teal-text">{item.unit}</span>
                  </div>
                  <h3 className="text-f13 font-bold text-t1">{item.title}</h3>
                </div>
              </div>
              <p className="mt-[8px] text-f13 leading-golden text-t2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
