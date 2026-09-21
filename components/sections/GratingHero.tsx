import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Button from "@/components/ui/Button";
import { type GratingFamily } from "@/lib/gratingInquiry";

export default function GratingHero({ family, title, description, image, imageAlt, caption, facts }: {
  family?: GratingFamily;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  caption: string;
  facts: readonly { label: string; value: string }[];
}) {
  const primary = { label: "Get a Project Quote", href: "#grating-quote" };
  const secondary = { label: "View Specifications", href: family ? `#${family}-grating-specifications` : "#grating-configurations", variant: "secondary" as const };
  return <>
    <section className="border-b border-border-default bg-[linear-gradient(140deg,#f0f7f6_0%,#ffffff_65%)] py-[24px] md:py-[40px]">
      <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products/product-lines" }, ...(family ? [{ label: "FRP Grating", href: "/products/grating" }, { label: family === "molded" ? "Molded Grating" : "Pultruded Grating" }] : [{ label: "FRP Grating" }])]} />
        <div className="grid items-center gap-[24px] lg:grid-cols-[1fr_0.95fr] lg:gap-[44px]">
          <div>
            <p className="text-f11 font-bold uppercase tracking-[0.16em] text-teal-text">F1-GRID · {family ? `${family} grating` : "Industrial walking surfaces"}</p>
            <h1 className="mt-[14px] text-[clamp(30px,3.7vw,49px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-t1">{title}</h1>
            <p className="mt-[16px] max-w-[620px] text-f17 leading-relaxed text-t2">{description}</p>
            <div id="page-header-actions" className="mt-[22px] flex flex-wrap gap-[10px]">
              <Button href={primary.href}>{primary.label}</Button>
              <Button href="#grating-help" variant="secondary">Help Me Select</Button>
            </div>
            <p className="mt-[12px] text-f12 leading-relaxed text-t3">Whole panels or drawing-based requirements. Quantities, fabrication and delivery scope confirmed with your quote.</p>
          </div>
          <figure className="min-w-0">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[12px] border border-border-default bg-bg2">
              {family ? <Image src={image} alt={imageAlt} fill sizes="(max-width: 1023px) 94vw, 48vw" className="object-contain" preload /> : <div className="grid h-full grid-cols-2 gap-2 p-3">{[
                ["/images/products/molded-frp-grating/molded-grating-grit-mesh-closeup.webp", "Molded square mesh"],
                ["/images/products/pultruded-frp-grating/pultruded-grating-t-bar-closeup.webp", "Pultruded bearing bars"],
              ].map(([src, label]) => <div key={src} className="relative overflow-hidden rounded-lg"><Image src={src} alt={label} fill sizes="(max-width: 1023px) 44vw, 23vw" className="object-cover" preload /><span className="absolute inset-x-0 bottom-0 bg-deep/90 p-3 text-sm font-bold text-white">{label}</span></div>)}</div>}
            </div>
            <figcaption className="mt-[7px] text-f11 leading-relaxed text-t3">{family ? caption : "Product construction photographs. Compare the integral molded mesh with directional pultruded bars; images are not to a common scale."}</figcaption>
          </figure>
        </div>
        <dl className="mt-[24px] grid grid-cols-2 gap-[16px] border-t border-border-default pt-[20px] md:grid-cols-4">
          {facts.map(fact => <div key={fact.label}><dt className="text-f11 uppercase tracking-wide text-t3">{fact.label}</dt><dd className="mt-[4px] text-f14 font-bold text-t1">{fact.value}</dd></div>)}
        </dl>
      </div>
    </section>
    <nav aria-label="Grating page sections" className="border-b border-border-default bg-white">
      <div className="mx-auto flex max-w-[1320px] flex-wrap gap-x-[24px] gap-y-[4px] px-[20px] py-[10px] text-f13 font-semibold sm:px-[28px] lg:px-[36px]">
        <Link className="py-[9px] text-teal-text" href={secondary.href}>Specifications</Link>
        <Link className="py-[9px] text-teal-text" href="#grating-selection">Selection guide</Link>
        <Link className="py-[9px] text-teal-text" href="#grating-engineering">Engineering & downloads</Link>
        <Link className="py-[9px] text-teal-text" href="#grating-supply">Supply & delivery</Link>
        <Link className="py-[9px] text-teal-text" href="#grating-faq">FAQs</Link>
      </div>
    </nav>

  </>;
}
