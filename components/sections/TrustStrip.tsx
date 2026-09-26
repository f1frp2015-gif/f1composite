import { company } from "@/content/data/company";

const signals = [
  { value: String(company.production.lines), label: "Pultrusion lines" },
  { value: String(company.production.bases), label: "Manufacturing bases" },
  { value: company.production.annualTonnes.toLocaleString("en-US"), label: "Tonnes annual capacity" },
  { value: company.exportCountries, label: "Countries supplied" },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-border-default bg-white" aria-label="F1 Composite and FengDu manufacturing and export capacity">
      <div className="site-container grid grid-cols-2 md:grid-cols-4">
        {signals.map((signal, index) => (
          <div
            key={signal.label}
            className={`py-[22px] md:px-[24px] md:py-[26px] ${
              index > 0 ? "md:border-l md:border-border-default" : ""
            } ${index % 2 === 1 ? "pl-[18px] sm:pl-[24px] md:pl-[24px]" : ""}`}
          >
            <p className="text-[clamp(22px,2vw,28px)] font-extrabold leading-none tracking-[-0.02em] text-t1">
              {signal.value}
            </p>
            <p className="mt-[6px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">
              {signal.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
