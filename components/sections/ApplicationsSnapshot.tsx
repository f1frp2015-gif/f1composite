import Link from "next/link";
import ProductSection from "@/components/products/ProductSection";
import { industries } from "@/content/data/industries";
import { applicationGroups } from "@/content/data/productTaxonomy";

/** The industry pages, then the application guides as a row of links. */
export default function ApplicationsSnapshot() {
  return (
    <ProductSection
      id="industries"
      title="FRP by industry"
      intro="Each industry page sets out where FRP is used, what to check in each area, the products and projects, and what to send for a quotation."
      aside={
        <Link href="/industries" className="font-bold text-teal-text">
          All industries →
        </Link>
      }
      tone="muted"
    >
      <ul className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => (
          <li key={industry.href}>
            <Link href={industry.href} className="group flex h-full flex-col rounded-card border border-border-default bg-white p-[18px] transition-colors hover:border-teal-border">
              <span className="text-f16 font-bold text-t1 group-hover:text-teal-text">{industry.title}</span>
              <span className="mt-[6px] text-f14 leading-relaxed text-t2">{industry.description}</span>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/applications" className="flex h-full flex-col justify-center rounded-card border border-teal-border bg-teal-bg p-[18px] text-f16 font-bold text-teal-text transition-colors hover:bg-teal-bg2">
            All applications →
          </Link>
        </li>
      </ul>
      <p className="mt-[20px] flex flex-wrap items-baseline gap-x-[20px] gap-y-[8px] text-f14">
        <span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Applications</span>
        {applicationGroups.map((group) => (
          <Link key={group.href} href={group.href} className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            {group.label}
          </Link>
        ))}
      </p>
    </ProductSection>
  );
}
