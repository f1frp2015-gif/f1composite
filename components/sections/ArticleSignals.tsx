type ArticleSignalsProps = {
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  authorRole: string;
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
  reviewedBy,
  standards = [],
}: ArticleSignalsProps) {
  return (
    <section className="bg-white py-[34px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
          <div className="grid gap-[21px] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-[13px] sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-f12 font-semibold uppercase tracking-[0.08em] text-t3">
                  Published
                </p>
                <p className="mt-[5px] text-f15 font-semibold text-t1">
                  {formatDate(publishedAt)}
                </p>
              </div>
              <div>
                <p className="text-f12 font-semibold uppercase tracking-[0.08em] text-t3">
                  Updated
                </p>
                <p className="mt-[5px] text-f15 font-semibold text-t1">
                  {formatDate(updatedAt)}
                </p>
              </div>
              <div>
                <p className="text-f12 font-semibold uppercase tracking-[0.08em] text-t3">
                  Author
                </p>
                <p className="mt-[5px] text-f15 font-semibold text-t1">{authorName}</p>
                <p className="mt-[3px] text-f13 text-t2">{authorRole}</p>
              </div>
              <div>
                <p className="text-f12 font-semibold uppercase tracking-[0.08em] text-t3">
                  Technical Review
                </p>
                <p className="mt-[5px] text-f15 font-semibold text-t1">
                  {reviewedBy ?? authorName}
                </p>
                <p className="mt-[3px] text-f13 text-t2">Standards and application check</p>
              </div>
            </div>

            <div>
              <p className="text-f12 font-semibold uppercase tracking-[0.08em] text-t3">
                Standards and References
              </p>
              <div className="mt-[8px] flex flex-wrap gap-[8px]">
                {standards.map((standard) => (
                  <span
                    key={standard}
                    className="rounded-full border border-border-default bg-white px-[10px] py-[6px] text-f12 font-medium text-t2"
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
