import Image from "next/image";
import Link from "next/link";
import { coverFor } from "@/lib/covers";

/* Server-rendered deep-link banner into one of the engineering calculators.
   `href` carries pre-filled query params (?shape&span&load… / ?frame&glass…) so
   the visitor lands on a calc already scoped to the page they came from. The
   tool's cover (a crop of its working panel) shows beside the text from tablet
   width, as on the tool cards. */
export default function CalculatorCTA({
  href,
  eyebrow,
  title,
  sub,
}: {
  href: string;
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  const cover = coverFor(href);
  return (
    <Link
      href={href}
      className="group flex items-center gap-[20px] rounded-card border border-teal-border bg-teal-bg p-[20px] transition-colors hover:border-teal sm:p-[12px] sm:pr-[24px]"
    >
      {cover ? (
        <span className="relative hidden aspect-[16/10] w-[176px] shrink-0 overflow-hidden rounded-tag border border-border-default bg-white sm:block">
          <Image src={cover.src} alt="" fill sizes="176px" className="object-cover" style={cover.position ? { objectPosition: cover.position } : undefined} />
        </span>
      ) : null}
      <span className="block min-w-0 flex-1">
        <span className="block font-mono text-f12 uppercase tracking-[0.06em] text-t3">{eyebrow}</span>
        <span className="mt-[6px] block text-f18 font-bold text-t1 transition-colors group-hover:text-teal-text">
          {title} <span aria-hidden>→</span>
        </span>
        {sub ? <span className="mt-[4px] block text-f14 leading-golden text-t2">{sub}</span> : null}
      </span>
    </Link>
  );
}
