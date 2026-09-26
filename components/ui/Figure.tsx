// Numbered figure plate for drawings and diagrams: FIG. number and title on
// the left of the head, the drawing status on the right, caption underneath.
export default function Figure({
  number,
  title,
  note = "Schematic · not to scale",
  caption,
  children,
  className = "",
}: {
  number: number | string;
  title: string;
  note?: string;
  caption?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  // Unpadded: the label face (DM Mono) draws zero with a slash.
  const label = String(number);
  return (
    <figure className={`overflow-hidden rounded-card border border-border-default bg-white ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-[12px] gap-y-[2px] border-b border-border-default px-[14px] py-[8px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">
        <span>
          FIG. {label} <span className="font-sans text-f14 font-semibold normal-case tracking-normal text-t1">{title}</span>
        </span>
        <span>{note}</span>
      </div>
      <div className="bg-[linear-gradient(var(--color-bg2)_1px,transparent_1px),linear-gradient(90deg,var(--color-bg2)_1px,transparent_1px)] bg-[size:24px_24px] p-[16px]">
        {children}
      </div>
      {caption ? <figcaption className="border-t border-border-default px-[14px] py-[10px] text-f14 text-t2">{caption}</figcaption> : null}
    </figure>
  );
}
