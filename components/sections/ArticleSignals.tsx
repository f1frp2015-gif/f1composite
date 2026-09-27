import Link from "next/link";
import { formatShortDate as formatDate } from "@/lib/dates";

type ArticleSignalsProps = {
  publishedAt: string;
  updatedAt: string;
  /** e.g. "14 min" */
  readTime?: string;
  authorName: string;
  authorRole: string;
  authorHref?: string;
  reviewedBy?: string;
  standards?: string[];
};

const label = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";
const value = "mt-[2px] text-f14 font-semibold text-t1";

/**
 * The article's editorial record under its header: dates, author, reviewer and
 * the standards it cites, set like the page header's key figures.
 */
export default function ArticleSignals({
  publishedAt,
  updatedAt,
  readTime,
  authorName,
  authorRole,
  authorHref,
  reviewedBy,
  standards = [],
}: ArticleSignalsProps) {
  return (
    <section aria-label="Article details" className="border-b border-border-default bg-white">
      <div className="site-container py-[16px]">
        <dl className="grid grid-cols-2 gap-x-[24px] gap-y-[12px] sm:grid-cols-4 lg:gap-x-[40px]">
          <div>
            <dt className={label}>Published</dt>
            <dd className={value}>
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
              {readTime ? <span className="font-normal text-t3"> · {readTime} read</span> : null}
            </dd>
          </div>
          <div>
            <dt className={label}>Updated</dt>
            <dd className={value}>
              <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
            </dd>
          </div>
          <div>
            <dt className={label}>Author</dt>
            <dd className={value}>
              {authorHref ? (
                <Link href={authorHref} className="text-teal-text hover:underline">
                  {authorName}
                </Link>
              ) : (
                authorName
              )}
              <span className="block text-f12 font-normal text-t3">{authorRole}</span>
            </dd>
          </div>
          <div>
            <dt className={label}>Technical review</dt>
            <dd className={value}>
              {reviewedBy ?? authorName}
              <span className="block text-f12 font-normal text-t3">Standards and application check</span>
            </dd>
          </div>
          {standards.length ? (
            <div className="col-span-2 sm:col-span-4">
              <dt className={label}>Standards and references</dt>
              <dd className="mt-[4px] flex flex-wrap gap-[6px]">
                {standards.map((standard) => (
                  <span key={standard} className="rounded-tag border border-border-default bg-bg2 px-[8px] py-[3px] text-f12 font-medium text-t1">
                    {standard}
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </section>
  );
}
