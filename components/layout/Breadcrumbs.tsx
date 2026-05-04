import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.f1composite.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-[21px]">
        <ol className="flex flex-wrap items-center gap-[5px] text-f11 text-t3">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-[5px]">
              {i > 0 && <span aria-hidden>/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-teal-text transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-t2">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
