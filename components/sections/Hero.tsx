import Button from "@/components/ui/Button";

const stats = [
  { value: "5", label: "Manufacturing Bases" },
  { value: "370", label: "Pultrusion Lines" },
  { value: "150K", label: "Tons / Year" },
  { value: "30+", label: "Countries" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-deep">
      {/* Full-bleed background image — static file with preload to eliminate LCP waterfall */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/frp-composite-material-hero.webp"
          alt="Fiber reinforced polymer composite material texture"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/80 to-deep/50" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1280px] px-[34px] py-[120px] md:py-[160px]">
        <div className="max-w-[720px]">
          <h1
            className="font-extrabold tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.08 }}
          >
            Pultrusion Technology{" "}
            <span className="text-teal">Empowering Global Projects</span>
          </h1>

          <p className="mt-[21px] max-w-[800px] text-f19 leading-golden text-white/75">
            Integrated fiber reinforcement, resin engineering, and precision tooling — delivering FRP profiles that replace steel and aluminium worldwide.
          </p>

          <div className="mt-[34px] flex flex-wrap gap-[13px]">
            <Button href="/contact" className="bg-teal !text-white hover:!bg-teal-text">
              Get a Quote
            </Button>
            <Button href="/products" className="border border-white/30 bg-transparent !text-white hover:!bg-white/10">
              Explore Products
            </Button>
          </div>

          {/* Stats bar */}
          <div className="mt-[55px] flex flex-wrap gap-[34px] border-t border-white/15 pt-[21px]">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block text-f24 font-extrabold text-teal">{stat.value}</span>
                <span className="text-f11 font-bold uppercase tracking-[2px] text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
