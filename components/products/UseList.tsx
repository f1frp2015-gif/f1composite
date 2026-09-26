import Link from "next/link";

/** A short list of where a product is used, each item linking to its page. */
export default function UseList({ title = "Typical uses", items }: { title?: string; items: { label: string; href: string }[] }) {
  return (
    <div className="rounded-card border border-border-default bg-white p-[18px]">
      <h3 className="text-f16 font-bold text-t1">{title}</h3>
      <ul className="mt-[8px] divide-y divide-border-default">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link href={item.href} className="flex min-h-[44px] items-center justify-between gap-[12px] text-f14 font-semibold text-t1 hover:text-teal-text">
              {item.label}
              <span aria-hidden className="text-teal-text">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
