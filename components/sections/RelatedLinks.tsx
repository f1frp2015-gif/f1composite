import LinkArrow from "@/components/ui/LinkArrow";

export interface RelatedGroup {
  title: string;
  links: Array<{ href: string; label: string }>;
}

interface RelatedLinksProps {
  groups: RelatedGroup[];
  background?: "white" | "bg2";
}

export default function RelatedLinks({
  groups,
  background = "bg2",
}: RelatedLinksProps) {
  const bgClass = background === "white" ? "bg-white" : "bg-bg2";

  return (
    <section className={`${bgClass} py-[55px]`}>
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="grid gap-[34px] md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-[13px] text-f13 font-bold uppercase tracking-wide text-t1">
                {group.title}
              </h2>
              <div className="flex flex-col items-start gap-[8px]">
                {group.links.map((link) => (
                  <LinkArrow key={link.href} href={link.href}>
                    {link.label}
                  </LinkArrow>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
