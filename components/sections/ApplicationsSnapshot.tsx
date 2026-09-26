import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";
import { applicationGroups } from "@/content/data/productTaxonomy";

export default function ApplicationsSnapshot() {
  return (
    <section className="bg-bg2 py-[54px] md:py-[68px]">
      <div className="site-container">
        <SectionTag>Applications</SectionTag>
        <h2 className="mt-[12px] text-[clamp(28px,3vw,40px)] font-bold text-t1">
          FRP profiles in use
        </h2>
        <p className="mt-[12px] max-w-[760px] text-f16 leading-relaxed text-t2">
          Find the profiles and grating used in your project. Each application
          explains the components, service conditions and information needed for
          selection.
        </p>
        <div className="mt-[26px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
          {applicationGroups.slice(0, 6).map((group) => (
            <Link
              key={group.href}
              href={group.href}
              className="rounded-card border border-border-default bg-white p-[22px] hover:border-teal"
            >
              <h3 className="text-f18 font-bold text-t1">{group.label}</h3>
              <p className="mt-[8px] text-f14 leading-relaxed text-t2">
                {group.description}
              </p>
              <span className="mt-[16px] block text-f14 font-bold text-teal-text">
                Explore application →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-[22px] flex flex-wrap gap-[24px] text-f14 font-bold text-teal-text">
          <Link href="/applications">View all applications →</Link>
          <Link href="/industries">Browse by industry →</Link>
        </div>
      </div>
    </section>
  );
}
