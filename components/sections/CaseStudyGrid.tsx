"use client";
import { useState } from "react";
import CoverCard from "@/components/ui/CoverCard";
import type { Cover } from "@/lib/covers";

export type CaseItem = {
  slug: string;
  /** The short name on the card; the case page carries the full title. */
  title: string;
  industry: string;
  location: string;
  year: string;
  cover: Cover;
  excerpt: string;
};

const ALL = "All";

export default function CaseStudyGrid({ items }: { items: CaseItem[] }) {
  const [selected, setSelected] = useState(ALL);
  const category = (item: CaseItem) => (item.year === "Reference" ? "Engineering references" : item.industry);
  const categories = [ALL, ...new Set(items.map(category))];
  const filtered = selected === ALL ? items : items.filter((item) => category(item) === selected);
  return (
    <>
      <fieldset>
        <legend className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Filter by sector</legend>
        <div className="mt-[8px] flex flex-wrap gap-[6px]">
          {categories.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={selected === value}
              onClick={() => setSelected(value)}
              className={`min-h-[36px] rounded-control border px-[10px] text-f14 transition-colors ${selected === value ? "border-teal bg-teal-bg2 font-semibold text-teal-text" : "border-border-default bg-white text-t2 hover:border-teal-border"}`}
            >
              {value === ALL ? "All sectors" : value}
            </button>
          ))}
        </div>
      </fieldset>

      <p role="status" className="mt-[20px] text-f14 text-t2">
        {filtered.length} {filtered.length === 1 ? "reference" : "project and engineering references"}
      </p>
      <ul className="mt-[12px] grid gap-[20px] md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cs) => (
          <li key={cs.slug}>
            <CoverCard
              href={`/case-studies/${cs.slug}`}
              cover={cs.cover}
              label={<span className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{cs.industry}</span>}
              title={cs.title}
              text={cs.excerpt}
              clampText
              facts={cs.year === "Reference" ? [cs.location] : [cs.location, cs.year]}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
