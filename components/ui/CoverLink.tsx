import Image from "next/image";
import Link from "next/link";
import type { Cover } from "@/lib/covers";

/**
 * A compact link with a cover thumbnail, for secondary lists of destinations
 * (application products, guides, industries) where full cover cards would
 * crowd the page. The cover comes from the same registry as CoverCard; its
 * note ("Project photo", "Illustrative photo") runs as a small label over the
 * title, because a badge would hide a thumbnail this size.
 */
export default function CoverLink({ href, cover, title, text }: { href: string; cover: Cover; title: string; text?: string }) {
  return (
    <Link
      href={href}
      className="group flex h-full items-center gap-[14px] rounded-card border border-border-default bg-white p-[10px] pr-[16px] transition-[border-color,box-shadow] duration-200 hover:border-teal-border hover:shadow-card"
    >
      <span className="relative block aspect-[16/10] w-[88px] shrink-0 overflow-hidden rounded-tag bg-bg2 sm:w-[104px]">
        <Image src={cover.src} alt="" fill sizes="104px" className="object-cover" style={cover.position ? { objectPosition: cover.position } : undefined} />
      </span>
      <span className="min-w-0 flex-1">
        {cover.note ? <span className="block font-mono text-f12 uppercase tracking-[0.06em] text-t3">{cover.note}</span> : null}
        <span className="block text-f16 font-bold leading-snug text-t1 transition-colors group-hover:text-teal-text">{title}</span>
        {text ? <span className="mt-[2px] line-clamp-2 block text-f14 leading-snug text-t2">{text}</span> : null}
      </span>
      <span aria-hidden className="text-teal-text transition-transform group-hover:translate-x-[2px]">→</span>
    </Link>
  );
}
