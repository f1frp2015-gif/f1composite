"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
type CaseItem = { slug: string; title: string; industry: string; location: string; year: string; image: string; excerpt: string };
export default function CaseStudyGrid({ items }: { items: CaseItem[] }) {
  const [selected, setSelected] = useState("All");
  const category = (item: CaseItem) => item.year === "Reference" ? "Engineering references" : item.industry;
  const industries = ["All", ...new Set(items.map(category))];
  const filtered = selected === "All" ? items : items.filter((item) => category(item) === selected);
  return <>
          {/* Filter tabs */}
          <div className="mb-[34px] flex flex-wrap gap-[8px]">
            {industries.map((ind) => (
              <button
                type="button"
                aria-pressed={selected === ind}
                onClick={() => setSelected(ind)}
                key={ind}
                className="cursor-pointer rounded-[4px] border border-border-default px-[13px] py-[5px] text-f11 font-bold uppercase tracking-[2px] text-t3 transition-colors hover:border-teal-border hover:text-teal-text aria-pressed:border-teal-text aria-pressed:bg-teal-text aria-pressed:text-white"
              >
                {ind}
              </button>
            ))}
          </div>

          <p role="status" className="mb-[16px] text-f13 text-t2">{filtered.length} project and engineering references</p>
          {/* Grid */}
          <div className="grid gap-[21px] md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group rounded-[8px] border border-border-default bg-white transition-all duration-[0.34s] hover:-translate-y-[2px] hover:border-teal-border hover:shadow-[0_8px_30px_rgba(0,161,153,0.05)]"
              >
                {/* Case study image */}
                <div className="relative aspect-[1.618] overflow-hidden bg-bg2">
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[0.34s] group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-[13px] top-[13px] z-10 rounded-[4px] bg-teal-text px-[8px] py-[3px] text-f11 font-bold uppercase tracking-[1px] text-white">
                    {cs.industry}
                  </span>
                </div>
                <div className="p-[21px]">
                  <h3 className="line-clamp-2 text-[17px] font-bold text-t1 group-hover:text-teal-text">
                    {cs.title}
                  </h3>
                  <p className="mt-[8px] line-clamp-3 text-f13 leading-golden text-t2">{cs.excerpt}</p>
                  <div className="mt-[13px] flex gap-[13px] text-f11 text-t3">
                    <span>{cs.location}</span>
                    <span>•</span>
                    <span>{cs.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
</>;
}
