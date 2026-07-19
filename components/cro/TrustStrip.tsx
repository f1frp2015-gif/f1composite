/**
 * Trust strip rendered directly under PageHeader on high-traffic pages.
 *
 * Single horizontal row of 6 hard credentials — counters the "China small
 * factory" SERP prior. Visible on first scroll without crowding the H1.
 *
 * Server component (no client hooks). Re-used on /what-is-frp and
 * /pultruded-frp-profiles; safe to drop on any other page.
 */

interface TrustMetric {
  label: string;
  /** Optional value rendered in teal above the label. */
  value?: string;
}

const defaultMetrics: TrustMetric[] = [
  { value: "370", label: "pultrusion lines" },
  { value: "30+", label: "countries shipped" },
  { value: "150,000 t", label: "annual capacity" },
  { value: "EN 13706 D", label: "structural grade" },
  { value: "PHI", label: "passive-house certified" },
  { value: "ISO 9001", label: "quality system" },
];

interface TrustStripProps {
  metrics?: TrustMetric[];
  /** Override the default "Since 2015" tagline shown at the right end. */
  tagline?: string;
}

export default function TrustStrip({
  metrics = defaultMetrics,
  tagline = "Direct from China factory — since 2015",
}: TrustStripProps) {
  return (
    <section className="border-y border-border-default bg-white" aria-label="Manufacturer credentials">
      <div className="mx-auto max-w-[1280px] px-[34px] py-[21px]">
        <div className="flex flex-wrap items-center justify-between gap-x-[34px] gap-y-[13px]">
          <ul className="flex flex-wrap items-center gap-x-[29px] gap-y-[13px]">
            {metrics.map((m) => (
              <li key={m.label} className="flex items-baseline gap-[8px]">
                {m.value ? (
                  <span className="text-f15 font-bold text-teal-text">{m.value}</span>
                ) : null}
                <span className="text-f13 text-t2">{m.label}</span>
              </li>
            ))}
          </ul>
          <p className="text-f11 uppercase tracking-wide text-t3">{tagline}</p>
        </div>
      </div>
    </section>
  );
}
