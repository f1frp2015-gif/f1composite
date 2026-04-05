import SectionTag from "@/components/ui/SectionTag";

const trustMetrics = [
  {
    value: "4",
    label: "Continents Served",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[28px] w-[28px] text-teal">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    value: "800+",
    label: "Custom Geometries",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[28px] w-[28px] text-teal">
        <path d="M4 4h16v4H4zM4 12h8v8H4zM16 12h4v8h-4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "ISO 9001",
    label: "Quality System",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[28px] w-[28px] text-teal">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    value: "EN 13706",
    label: "Product Standard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[28px] w-[28px] text-teal">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

const regions = [
  { name: "Europe", countries: "UK, Germany, Netherlands, France, Italy" },
  { name: "North America", countries: "USA, Canada, Mexico" },
  { name: "Asia-Pacific", countries: "Australia, Singapore, Japan, South Korea" },
  { name: "Middle East", countries: "Saudi Arabia, UAE, Qatar" },
];

const certifications = ["EN 13706", "ASTM D3917", "CE Marking", "ISO 9001:2015"];

export default function GlobalTrust() {
  return (
    <section className="bg-bg2 py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="text-center">
          <SectionTag>Trusted Worldwide</SectionTag>
          <h2 className="mx-auto mt-[8px] max-w-[480px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
            Export-ready supply chain for global projects
          </h2>
        </div>

        {/* Key metrics */}
        <div className="mt-[34px] grid grid-cols-2 gap-[13px] lg:grid-cols-4">
          {trustMetrics.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-center rounded-[8px] border border-border-default bg-white p-[21px] text-center"
            >
              {m.icon}
              <span className="mt-[8px] text-f24 font-extrabold text-t1">{m.value}</span>
              <span className="text-f11 font-bold uppercase tracking-[2px] text-t3">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Regions + Certifications */}
        <div className="mt-[21px] grid gap-[13px] lg:grid-cols-[1fr_auto]">
          {/* Region map */}
          <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
            <div className="text-f11 font-bold uppercase tracking-[3px] text-teal-text">Export Regions</div>
            <div className="mt-[13px] grid gap-[8px] sm:grid-cols-2 lg:grid-cols-4">
              {regions.map((r) => (
                <div key={r.name}>
                  <div className="text-f15 font-bold text-t1">{r.name}</div>
                  <div className="text-f11 text-t3">{r.countries}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap items-center gap-[8px] rounded-[8px] border border-border-default bg-white p-[21px] lg:flex-col">
            <div className="w-full text-f11 font-bold uppercase tracking-[3px] text-teal-text">Standards</div>
            {certifications.map((c) => (
              <span
                key={c}
                className="rounded-full border border-teal-border bg-teal-bg px-[13px] py-[5px] text-f11 font-bold text-teal-text"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
