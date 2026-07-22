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

      <div className="mx-auto grid min-h-[610px] max-w-[1320px] items-center gap-[42px] px-[20px] py-[64px] sm:px-[28px] md:py-[76px] lg:grid-cols-[1.04fr_0.96fr] lg:px-[36px]">
        <div className="relative z-10 max-w-[690px]">
          <div className="inline-flex items-center gap-[9px] rounded-full border border-white/15 bg-white/5 px-[12px] py-[6px] text-f11 font-bold uppercase tracking-[0.12em] text-white/75">
            <span className="h-[7px] w-[7px] rounded-full bg-teal" aria-hidden />
            Factory direct · Engineering supported
          </div>

          <h1 className="mt-[22px] text-[clamp(40px,5.6vw,68px)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white">
            Pultruded FRP profiles for demanding projects
          </h1>

          <p className="mt-[22px] max-w-[650px] text-[clamp(17px,1.8vw,20px)] leading-[1.55] text-white/76">
            Structural profiles, gratings, window systems, and custom sections — manufactured in China with documented quality control and global delivery support.
          </p>

          <div className="mt-[30px] flex flex-wrap gap-[11px]">
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

          <div className="mt-[32px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] border-t border-white/12 pt-[19px]">
            <span className="text-f11 font-bold uppercase tracking-[0.12em] text-white/45">Built to project standards</span>
            {standards.map((standard) => (
              <span key={standard} className="text-f13 font-semibold text-white/78">
                {standard}
              </span>
            ))}
          </div>
        </div>

        <div className="relative lg:pl-[10px]">
          <div className="relative aspect-[1.08] overflow-hidden rounded-[16px] border border-white/15 bg-[#17284b] shadow-[0_28px_70px_rgba(0,0,0,0.28)]">
            <Image
              src="/images/technology/f1-composite-pultrusion-production-line-aerial.webp"
              alt="Rows of pultrusion production lines at the F1 Composite manufacturing base in Chongqing"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
            <div className="absolute inset-x-[18px] bottom-[18px] flex items-end justify-between gap-[16px] rounded-[10px] border border-white/15 bg-deep/78 px-[17px] py-[14px] backdrop-blur-md">
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
