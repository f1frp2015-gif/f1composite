import Image from "next/image";
import Link from "next/link";
import type { Cover } from "@/lib/covers";

/**
 * A card that leads to another page: the page's cover image, then a small
 * label, the title, a line of text and optional facts. One size and one
 * treatment everywhere a grid of destinations appears (product families,
 * industries, applications, markets, tools), so a grid reads as a set.
 *
 * Photos fill the 16:10 frame; product cut-outs and drawings sit whole on
 * white (`fit: "contain"`). Renderings and illustrative photos keep their
 * label in the corner of the image, as on the page itself.
 */
export default function CoverCard({
  href,
  cover,
  label,
  title,
  text,
  facts,
  action,
  footer,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px",
}: {
  href: string;
  cover: Cover;
  /** A small label over the title: a product line, a region, a tool type. */
  label?: React.ReactNode;
  title: string;
  text?: string;
  /** Short key figures shown as chips. */
  facts?: string[];
  /** The link text at the foot of the card, e.g. "Explore range". */
  action?: string;
  /** Extra links under the card body, outside the main link. */
  footer?: React.ReactNode;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-border-default bg-white transition-[border-color,box-shadow] duration-200 hover:border-teal-border hover:shadow-card">
      <Link href={href} className="flex flex-1 flex-col">
        <span className={`relative block aspect-[16/10] overflow-hidden border-b border-border-default ${cover.fit === "contain" ? "bg-white" : "bg-bg2"}`}>
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={sizes}
            preload={priority}
            className={`${cover.fit === "contain" ? "object-contain p-[16px]" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.02]`}
            style={cover.position ? { objectPosition: cover.position } : undefined}
          />
          {cover.note ? (
            <span className="absolute right-[8px] top-[8px] rounded-tag bg-white/90 px-[6px] py-[2px] font-mono text-f12 uppercase tracking-[0.06em] text-t2">
              {cover.note}
            </span>
          ) : null}
        </span>
        <span className="flex flex-1 flex-col p-[18px] sm:p-[20px]">
          {label ? <span className="block">{label}</span> : null}
          <span className={`${label ? "mt-[8px]" : ""} text-f18 font-bold leading-snug text-t1 transition-colors group-hover:text-teal-text`}>{title}</span>
          {text ? <span className="mt-[6px] text-f14 leading-golden text-t2">{text}</span> : null}
          {facts?.length ? (
            <span className="mt-[12px] flex flex-wrap gap-[6px]">
              {facts.map((fact) => (
                <span key={fact} className="rounded-tag border border-border-default bg-bg2 px-[8px] py-[3px] text-f12 font-medium text-t1">
                  {fact}
                </span>
              ))}
            </span>
          ) : null}
          {action ? <span className="mt-auto pt-[14px] text-f14 font-semibold text-teal-text">{action} <span aria-hidden>→</span></span> : null}
        </span>
      </Link>
      {footer}
    </article>
  );
}
