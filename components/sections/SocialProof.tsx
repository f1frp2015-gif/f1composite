import Image from "next/image";
import Link from "next/link";
import LinkArrow from "@/components/ui/LinkArrow";
import SectionTag from "@/components/ui/SectionTag";
import { industries } from "@/content/data/industries";

const featuredCases = [
  {
    slug: "qinling-station-antarctic-passive-windows",
    title: "Qinling Antarctic Research Station",
    meta: "Construction · Ross Sea, Antarctica",
    image: "/images/case-studies/frp-qinling-station-antarctic-ross-sea-aerial.webp",
    outcome: "PHI-certified GFRP windows engineered for an arctic climate.",
    metrics: ["−60°C design", "45 m/s wind", "phA / A+"],
  },
  {
    slug: "factory-access-staircase",
    title: "FRP Factory Access Staircase",
    meta: "Industrial · Chongqing, China",
    image: "/images/case-studies/frp-factory-access-staircase-hero.webp",
    outcome: "A complete profile, grating, and handrail system installed in three days.",
    metrics: ["68% lighter", "0 repainting", "3-day install"],
  },
  {
    slug: "yancheng-talent-apartment-fenestration",
    title: "Yancheng Talent Apartment",
    meta: "Construction · Jiangsu, China",
    image: "/images/case-studies/frp-talent-apartment-yancheng-aerial-view.webp",
    outcome: "Complete FRP fenestration packages across a multi-building development.",
    metrics: ["~20 buildings", "1.6 U-value", "65 + 90 series"],
  },
];

export default function SocialProof() {
  return (
    <section className="bg-bg2 py-[58px] md:py-[78px]">
      <div className="mx-auto max-w-[1320px] px-[20px] sm:px-[28px] lg:px-[36px]">
        <div className="flex flex-col gap-[16px] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionTag>Applications &amp; proof</SectionTag>
            <h2 className="mt-[12px] max-w-[760px] text-[clamp(28px,3.2vw,42px)] font-bold leading-[1.12] tracking-[-0.035em] text-t1">
              Engineered for real operating environments
            </h2>
            <p className="mt-[10px] max-w-[740px] text-f15 leading-relaxed text-t2">
              Explore the market first, then verify the solution through a comparable delivered project.
            </p>
          </div>
          <LinkArrow href="/industries" className="shrink-0">All applications</LinkArrow>
        </div>

        <nav aria-label="Industries" className="mt-[26px] grid gap-[8px] sm:grid-cols-2 lg:grid-cols-6">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={industry.href}
              className="group flex min-h-[48px] items-center justify-between rounded-[7px] border border-border-default bg-white px-[14px] text-f13 font-bold text-t1 transition-colors hover:border-teal-border hover:text-teal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              {industry.title}
              <span className="text-teal-text transition-transform group-hover:translate-x-[2px]" aria-hidden>→</span>
            </Link>
          ))}
        </nav>

        <div className="mt-[26px] grid gap-[18px] lg:grid-cols-3">
          {featuredCases.map((item) => (
            <Link
              key={item.slug}
              href={`/case-studies/${item.slug}`}
              className="group overflow-hidden rounded-[10px] border border-border-default bg-white transition-all duration-[0.24s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_12px_32px_rgba(11,24,56,0.08)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#dfe5e7]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </div>
              <div className="p-[20px]">
                <p className="text-f11 font-bold uppercase tracking-[0.08em] text-teal-text">{item.meta}</p>
                <h3 className="mt-[7px] text-f19 font-bold tracking-[-0.015em] text-t1 group-hover:text-teal-text">
                  {item.title}
                </h3>
                <p className="mt-[7px] text-f13 leading-relaxed text-t2">{item.outcome}</p>
                <div className="mt-[14px] flex flex-wrap gap-x-[12px] gap-y-[5px] border-t border-border-default pt-[12px]">
                  {item.metrics.map((metric) => (
                    <span key={metric} className="text-f11 font-bold text-t1">{metric}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-[18px]">
          <LinkArrow href="/case-studies">View all case studies</LinkArrow>
        </div>
      </div>
    </section>
  );
}
