import Image from "next/image";
import Link from "next/link";

export interface ApplicationCard {
  href: string;
  /** "Case study", "Application", "Design guide" … */
  kind: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  /** Diagrams sit whole on white; photos fill the frame. */
  fit?: "cover" | "contain";
  /** What kind of image this is ("AI concept", "Rendering"), as its page labels it. */
  note?: string;
  /** The profiles the project used, as its case study states them. */
  used?: string;
}

/**
 * Projects and applications that use the product, each with its image. A
 * rendering or concept keeps its label: on the image from tablet width, beside
 * the card type on phones, where the thumbnail is too small for a badge.
 */
export default function ApplicationCards({ cards }: { cards: ApplicationCard[] }) {
  return (
    <ul className="grid gap-[16px] md:grid-cols-3">
      {cards.map((card) => (
        <li key={card.href}>
          <Link href={card.href} className="group grid h-full grid-cols-[104px_minmax(0,1fr)] overflow-hidden rounded-card border border-border-default bg-white transition-colors hover:border-teal-border md:flex md:flex-col">
            <span className="relative block min-h-[104px] bg-bg2 md:aspect-[16/10] md:min-h-0">
              <Image src={card.image} alt={card.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className={card.fit === "contain" ? "bg-white object-contain p-[8px]" : "object-cover"} />
              {card.note ? <span className="absolute right-[8px] top-[8px] hidden rounded-tag bg-white/90 px-[6px] py-[2px] font-mono text-f12 uppercase tracking-[0.06em] text-t2 md:block">{card.note}</span> : null}
            </span>
            <span className="flex flex-1 flex-col p-[14px] md:p-[18px]">
              <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">
                {card.kind}
                {card.note ? <span className="md:hidden"> · {card.note}</span> : null}
              </span>
              <span className="mt-[4px] text-f16 font-bold text-t1 group-hover:text-teal-text md:mt-[6px] md:text-f18">{card.title}</span>
              <span className="mt-[6px] text-f14 leading-golden text-t2">{card.text}</span>
              {card.used ? (
                <span className="mt-[10px] block border-t border-border-default pt-[10px] text-f14 text-t2">
                  <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Profiles used </span>
                  {card.used}
                </span>
              ) : null}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
