import Link from "next/link";

/**
 * A short, product-specific note on the FRP / GRP names buyers search with.
 * It sits inside the page's first section, beside or under the overview text,
 * rather than as a band of its own under the page header.
 */
export default function MaterialTerminologyNote({ title, children }: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside aria-label={title} className="rounded-card border border-border-default bg-white px-[16px] py-[14px]">
      <h3 className="text-f14 font-bold text-t1">{title}</h3>
      <p className="mt-[4px] text-f14 leading-golden text-t2">
        {children}{" "}
        <Link href="/what-is-frp#terminology" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
          FRP, GRP and GFRP explained
        </Link>.
      </p>
    </aside>
  );
}
