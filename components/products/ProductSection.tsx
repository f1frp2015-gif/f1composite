// One section of a product page: an anchor target for the section bar, a
// heading with an optional count and side link, and the content. Sections
// alternate white and pale grounds so the page reads in blocks; the closing
// quote block is dark, in place of the footer's generic one. The page keeps
// 88 px of scroll padding for the header; the extra 40 px clears the section bar.
export default function ProductSection({
  id,
  title,
  count,
  intro,
  aside,
  tone = "white",
  children,
}: {
  id: string;
  title: string;
  /** A small figure after the heading, e.g. "9 sizes". */
  count?: string;
  intro?: React.ReactNode;
  /** A link or control at the right of the heading. */
  aside?: React.ReactNode;
  tone?: "white" | "muted" | "deep";
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-[40px] py-[48px] md:py-[64px] ${tone === "deep" ? "bg-deep" : tone === "muted" ? "bg-bg2" : "bg-white"}`}>
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-x-[24px] gap-y-[10px]">
          <h2 id={`${id}-title`} className={`text-[clamp(26px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-0.02em] ${tone === "deep" ? "text-white" : "text-t1"}`}>
            {title}
            {count ? <span className="ml-[10px] align-middle font-mono text-f12 font-normal uppercase tracking-[0.06em] text-t3">{count}</span> : null}
          </h2>
          {aside ? <div className="text-f14">{aside}</div> : null}
        </div>
        {intro ? <div className={`mt-[12px] max-w-[820px] text-f16 leading-relaxed ${tone === "deep" ? "text-white/80" : "text-t2"}`}>{intro}</div> : null}
        <div className="mt-[24px]">{children}</div>
      </div>
    </section>
  );
}
