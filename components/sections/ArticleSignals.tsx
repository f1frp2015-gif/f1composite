import Link from "next/link";

type ArticleSignalsProps = {
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  authorRole: string;
  authorHref?: string;
  reviewedBy?: string;
  standards?: string[];
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));

export default function ArticleSignals({
  publishedAt,
  updatedAt,
  authorName,
  authorRole,
  authorHref,
  reviewedBy,
  standards = [],
}: ArticleSignalsProps) {
  return (
    <section className="bg-white py-[13px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="border-y border-border-default py-[10px]">
          <div className="grid gap-[10px] lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="grid gap-[6px] sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-f11 font-semibold uppercase tracking-[0.08em] text-t3">
                  Published
                </p>
                <p className="mt-[2px] text-f13 font-semibold text-t1">
                  {formatDate(publishedAt)}
                </p>
              </div>
              <div>
                <p className="text-f11 font-semibold uppercase tracking-[0.08em] text-t3">
                  Updated
                </p>
                <p className="mt-[2px] text-f13 font-semibold text-t1">
                  {formatDate(updatedAt)}
                </p>
              </div>
              <div>
                <p className="text-f11 font-semibold uppercase tracking-[0.08em] text-t3">
                  Author
                </p>
                {authorHref ? (
                  <Link
                    href={authorHref}
                    className="mt-[2px] block text-f13 font-semibold text-teal-text transition-colors hover:text-teal"
                  >
                    {authorName}
                  </Link>
                ) : (
                  <p className="mt-[2px] text-f13 font-semibold text-t1">{authorName}</p>
                )}
                <p className="mt-[1px] text-f11 text-t3">{authorRole}</p>
              </div>
              <div>
                <p className="text-f11 font-semibold uppercase tracking-[0.08em] text-t3">
                  Technical Review
                </p>
                <p className="mt-[2px] text-f13 font-semibold text-t1">
                  {reviewedBy ?? authorName}
                </p>
                <p className="mt-[1px] text-f11 text-t3">Standards and application check</p>
              </div>
            </div>

            <div>
              <p className="text-f11 font-semibold uppercase tracking-[0.08em] text-t3">
                Standards and References
              </p>
              <div className="mt-[5px] flex flex-wrap gap-[5px]">
                {standards.map((standard) => (
                  <span
                    key={standard}
                    className="rounded-full border border-border-default bg-bg2 px-[8px] py-[2px] text-f11 font-medium text-t2"
                  >
                    {standard}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
