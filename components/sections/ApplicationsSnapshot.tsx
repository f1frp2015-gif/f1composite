import Link from "next/link";
import PageSection from "@/components/layout/PageSection";
import CoverCard from "@/components/ui/CoverCard";
import { industries } from "@/content/data/industries";
import { applicationGroups } from "@/content/data/productTaxonomy";
import { industryCovers } from "@/lib/covers";

/** The industry pages as cover cards, then the application guides as a row of links. */
export default function ApplicationsSnapshot() {
  return (
    <PageSection
      id="industries"
      title="FRP by industry"
      intro="Each industry page sets out where FRP is used, what to check in each area, the products and projects, and what to send for a quotation."
      aside={
        <Link href="/industries" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
          All industries
        </Link>
      }
      tone="muted"
    >
      <ul className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => (
          <li key={industry.href}>
            <CoverCard href={industry.href} cover={industryCovers[industry.href]} title={industry.title} text={industry.description} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px" />
          </li>
        ))}
        <li>
          <CoverCard
            href="/applications"
            cover={{ src: "/images/industries/industrial-plating-line-concept.webp", alt: "Concept walkway with FRP grating and yellow handrails beside process tanks", note: "AI concept" }}
            title="Browse by application"
            text="Platforms, cooling towers, solar, cable trays, bridges and stakes."
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          />
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
    </PageSection>
  );
}
