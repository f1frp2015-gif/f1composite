const signals = [
  { value: "30+", label: "Countries supplied" },
  { value: "150K", label: "Tons annual capacity" },
  { value: "800+", label: "Custom geometries" },
  { value: "1 day", label: "RFQ response target" },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-border-default bg-white" aria-label="F1 Composite capability summary">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 px-[20px] sm:px-[28px] md:grid-cols-4 lg:px-[36px]">
        {signals.map((signal, index) => (
          <div
            key={signal.label}
            className={`py-[22px] md:px-[24px] md:py-[26px] ${
              index > 0 ? "md:border-l md:border-border-default" : ""
            } ${index % 2 === 1 ? "pl-[18px] sm:pl-[24px] md:pl-[24px]" : ""}`}
          >
            <p className="text-[clamp(22px,2vw,28px)] font-extrabold leading-none tracking-[-0.025em] text-t1">
              {signal.value}
            </p>
            <p className="mt-[6px] text-f11 font-bold uppercase tracking-[0.08em] text-t3">
              {signal.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
