import Image from "next/image";
import Button from "@/components/ui/Button";

const standards = ["EN 13706", "ASTM D3917", "ISO 9001"];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-deep">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 78% 20%, rgba(10,155,145,0.22), transparent 34%), radial-gradient(circle at 12% 100%, rgba(31,73,151,0.35), transparent 35%)",
        }}
      />

      <div className="mx-auto grid max-w-[1320px] items-center gap-[28px] px-[20px] py-[44px] sm:px-[28px] md:py-[64px] lg:min-h-[610px] lg:grid-cols-[1.04fr_0.96fr] lg:gap-[42px] lg:px-[36px] lg:py-[76px]">
        <div className="relative z-10 max-w-[690px]">
          <div className="inline-flex items-center gap-[9px] rounded-full border border-white/15 bg-white/5 px-[12px] py-[6px] text-f11 font-bold uppercase tracking-[0.12em] text-white/75">
            <span className="h-[7px] w-[7px] rounded-full bg-teal" aria-hidden />
            Factory-direct · Engineering support
          </div>

          <h1 className="mt-[18px] text-[clamp(36px,9.8vw,68px)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:mt-[22px]">
            Pultruded FRP profiles for demanding projects
          </h1>

          <p className="mt-[18px] max-w-[650px] text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-white/76 sm:mt-[22px]">
            Structural profiles, gratings, window systems, and custom sections — manufactured in China with documented quality control and global delivery support.
          </p>

          <div className="mt-[24px] flex flex-wrap gap-[11px] sm:mt-[30px]">
            <Button
              href="/contact?source=homepage-hero&inquiry_type=rfq"
              className="!bg-teal-text !text-white hover:!bg-teal"
            >
              Get a Quote
            </Button>
            <Button
              href="/pultruded-frp-profiles"
              variant="secondary"
              className="!border-white/25 !bg-transparent !text-white hover:!border-white/45 hover:!bg-white/10"
            >
              Explore Products
            </Button>
          </div>

          <div className="mt-[26px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] border-t border-white/12 pt-[17px] sm:mt-[32px] sm:pt-[19px]">
            <span className="text-f11 font-bold uppercase tracking-[0.12em] text-white/55">Built to project standards</span>
            {standards.map((standard) => (
              <span key={standard} className="text-f13 font-semibold text-white/78">
                {standard}
              </span>
            ))}
          </div>
        </div>

        <div className="relative lg:pl-[10px]">
          <div className="relative aspect-[1.38] overflow-hidden rounded-[14px] border border-white/15 bg-[#17284b] shadow-[0_28px_70px_rgba(0,0,0,0.28)] sm:aspect-[1.2] lg:aspect-[1.08] lg:rounded-[16px]">
            <Image
              src="/images/technology/f1-composite-pultrusion-production-line-aerial.webp"
              alt="Rows of pultrusion production lines at the F1 Composite manufacturing base in Chongqing"
              fill
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 56px), 48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
            <div className="absolute inset-x-[12px] bottom-[12px] flex items-end justify-between gap-[12px] rounded-[9px] border border-white/15 bg-deep/82 px-[14px] py-[11px] backdrop-blur-md sm:inset-x-[18px] sm:bottom-[18px] sm:gap-[16px] sm:rounded-[10px] sm:px-[17px] sm:py-[14px]">
              <div>
                <p className="text-f11 font-bold uppercase tracking-[0.12em] text-white/55">Manufacturing capacity</p>
                <p className="mt-[2px] text-f15 font-bold text-white">370 pultrusion lines across 5 bases</p>
              </div>
              <span className="hidden rounded-full bg-teal px-[10px] py-[5px] text-f11 font-bold text-white sm:inline-flex">
                Chongqing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
