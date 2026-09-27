import Link from "next/link";

export interface RelatedGroup {
  title: string;
  links: Array<{ href: string; label: string }>;
}

interface RelatedLinksProps {
  groups: RelatedGroup[];
  /** Section title; the groups are named with small labels under it. */
  title?: string;
  id?: string;
  background?: "white" | "bg2";
}

/**
 * Related pages as short directories: a mono label per group and a ruled list
 * of links. Rendered as a page section with the same spacing and title as
 * PageSection, so it can sit anywhere in a page's run of sections.
 */
export default function RelatedLinks({
  groups,
  title = "Related products and guides",
  id = "related",
  background = "bg2",
}: RelatedLinksProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-[40px] py-[48px] md:py-[64px] ${background === "white" ? "bg-white" : "bg-bg2"}`}>
      <div className="site-container">
        <h2 id={`${id}-title`} className="text-[clamp(26px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
          {title}
        </h2>
        <div className="mt-[24px] grid gap-x-[32px] gap-y-[28px] md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{group.title}</h3>
              <ul className="mt-[10px] divide-y divide-border-default border-y border-border-default">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex min-h-[44px] items-center justify-between gap-[12px] py-[10px] text-f14 font-semibold text-t1 transition-colors hover:text-teal-text">
                      {link.label}
                      <span aria-hidden className="text-teal-text transition-transform group-hover:translate-x-[2px]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
