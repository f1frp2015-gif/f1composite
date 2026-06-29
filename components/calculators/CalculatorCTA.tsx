import Link from "next/link";

/* Server-rendered deep-link banner into one of the engineering calculators.
   `href` carries pre-filled query params (?shape&span&load… / ?frame&glass…) so
   the visitor lands on a calc already scoped to the page they came from. */
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
  return (
    <Link
      href={href}
      className="group block rounded-[8px] border border-teal-border bg-teal-bg p-[21px] transition-colors hover:border-teal"
    >
      <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">{eyebrow}</div>
      <div className="mt-[6px] text-f17 font-bold text-t1">
        {title} <span aria-hidden>→</span>
      </div>
      {sub ? <p className="mt-[4px] text-f13 leading-golden text-t2">{sub}</p> : null}
    </Link>
  );
}
