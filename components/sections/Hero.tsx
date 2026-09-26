import Image from "next/image";
import Link from "next/link";
import { buildRfqHref } from "@/lib/rfq";
import { buildProducts } from "@/lib/catalog/standardProfiles";
import { mainNav } from "@/content/data/navigation";
import Button from "@/components/ui/Button";
import SectionGlyph from "@/components/ui/SectionGlyph";
import SearchButton from "@/components/search/SearchButton";

// The standard profile families, drawn and linked as in the Products menu,
// with short labels that fit a tile.
const SHORT_LABELS: Record<string, string> = {
  i_beam: "I-beam",
  channel: "Channel",
  angle: "Angle",
  shs: "Square tube",
  tube: "Round tube",
  rod: "Rod",
  flat: "Flat bar",
};
const shapes = mainNav[0].sections[0].links.filter((link) => link.href.startsWith("/products/fiberglass-structural-shapes/") && link.glyph);

export default function Hero() {
  const sizes = buildProducts().length;
  return (
    <section className="relative isolate overflow-hidden bg-deep">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 78% 20%, rgba(10,155,145,0.22), transparent 34%), radial-gradient(circle at 12% 100%, rgba(10,155,145,0.12), transparent 35%)",
        }}
      />

      {/* Phones: text, then the shapes, then the photograph; wide screens put the photograph beside the text and the shapes underneath. */}
      <div className="site-container grid gap-x-[48px] gap-y-[28px] pt-[40px] md:pt-[56px] lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <div className="relative z-10 min-w-0 max-w-[690px] lg:col-start-1 lg:row-start-1">
          <p className="inline-flex items-center gap-[8px] rounded-tag bg-white/10 px-[8px] py-[3px] font-mono text-f12 uppercase tracking-[0.06em] text-white/80">
            <span className="size-[7px] rounded-tag bg-lime" aria-hidden />
            Industrial-scale pultrusion · Factory-direct
          </p>

          <h1 className="mt-[18px] text-[clamp(36px,9.8vw,56px)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white">
            Standard & Custom Pultruded FRP Profiles
          </h1>

          <p className="mt-[18px] max-w-[650px] text-[clamp(16px,1.8vw,18px)] leading-[1.6] text-white/76">
            F1 Composite brings FengDu’s manufacturing network to international projects: 370 pultrusion lines across five production bases, with 150,000 tonnes of annual capacity. Choose standard or custom profiles, with grating and window and door products available.
          </p>

          <p className="mt-[12px] text-f14 leading-golden text-white/75">
            Specifying glass-reinforced plastic? Explore our{" "}
            <Link href="/pultruded-frp-profiles" className="font-semibold text-white underline underline-offset-4 hover:text-teal">GRP profiles</Link>
            {" "}by shape, application and resin system.
          </p>

          <div className="mt-[22px] max-w-[560px]">
            <SearchButton variant="hero" />
          </div>

          <div className="mt-[16px] flex flex-wrap gap-[11px]">
            <Button href="/pultruded-frp-profiles" className="!bg-teal-text !text-white hover:!bg-teal">
              Explore Pultruded Profiles
            </Button>
            <Button
              href={buildRfqHref({ source: "homepage-custom", product: "Custom Pultruded Profiles", productPath: "/products/custom-pultruded-profiles", message: "Please review my custom profile.\nDrawing / cross-section:\nMaterial or service environment:\nLength and quantity:\nDelivery country:" })}
              variant="secondary"
              className="!border-white/25 !bg-transparent !text-white hover:!border-white/45 hover:!bg-white/10"
            >
              Send Your Drawing
            </Button>
          </div>
        </div>

        {/* Products on the first screen: the standard families by their section, and every size. */}
        <nav aria-label="Standard profiles by shape" className="border-t border-white/10 py-[18px] lg:col-span-2 lg:row-start-2 lg:mt-[8px] lg:py-[22px]">
          <p className="font-mono text-f12 uppercase tracking-[0.06em] text-white/60">Standard profiles by shape</p>
          <ul className="mt-[10px] grid grid-cols-4 gap-[8px] sm:grid-cols-8">
            {shapes.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex h-full flex-col items-center gap-[6px] rounded-control border border-white/12 px-[4px] py-[10px] text-center text-f12 font-semibold text-white/85 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white">
                  <SectionGlyph shape={link.glyph!} size={36} className="!text-white" />
                  {SHORT_LABELS[link.glyph!] ?? link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tools/profile-finder" className="flex h-full flex-col items-center justify-center gap-[2px] rounded-control border border-teal/40 bg-teal/15 px-[4px] py-[10px] text-center text-f12 font-semibold text-white transition-colors hover:bg-teal/25">
                <span className="font-mono text-f18 font-medium leading-none text-lime">{sizes}</span>
                sizes · finder
              </Link>
            </li>
          </ul>
        </nav>

        <figure className="relative pb-[28px] lg:col-start-2 lg:row-start-1 lg:pb-0 lg:pl-[10px]">
          <div className="relative aspect-[1.38] overflow-hidden rounded-card border border-white/15 bg-deep shadow-pop sm:aspect-[1.5] lg:aspect-[1.2]">
            <Image
              src="/images/technology/f1-composite-pultrusion-production-line-aerial.webp"
              alt="Rows of pultrusion production lines at the FengDu manufacturing base in Chongqing"
              width={2000}
              height={788}
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 56px), 48vw"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-[8px] font-mono text-f12 uppercase tracking-[0.06em] text-white/60">
            Pultrusion lines · FengDu base, Chongqing
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
