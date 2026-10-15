import Link from "next/link";

type ToolNextStepsProps = {
  id: string;
  title: string;
  intro?: string;
  items: readonly { href: string; title: string; description: string }[];
};

export function ToolNextSteps({ id, title, intro, items }: ToolNextStepsProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[40px] border-y border-border-default bg-bg2 py-[32px]">
      <div className="site-container">
        <h2 id={`${id}-title`} className="text-[22px] font-bold leading-tight text-t1">{title}</h2>
        {intro ? <p className="mt-[8px] max-w-[820px] text-f14 leading-golden text-t2">{intro}</p> : null}
        <ul className="mt-[16px] grid gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group block h-full rounded-card border border-border-default bg-white p-[20px] transition-colors hover:border-teal-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-text">
                <h3 className="flex items-start justify-between gap-[12px] text-f16 font-semibold text-t1 group-hover:text-teal-text">
                  {item.title}
                  <span aria-hidden="true" className="text-teal-text">→</span>
                </h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
