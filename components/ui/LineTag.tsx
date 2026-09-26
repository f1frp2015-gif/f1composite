// Product-line marker, e.g. "F1-STRUX · Standard profile". The lime square is
// the brand signal colour; the text stays teal on a pale ground for contrast.
// Families without a line name (rebar, fasteners) pass mark={false} and show
// the same label without the square.
export default function LineTag({ line, label, mark = true }: { line: string; label?: string; mark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-[8px] rounded-tag bg-teal-bg2 px-[8px] py-[3px] font-mono text-f12 font-medium uppercase tracking-[0.06em] text-teal-text">
      {mark ? <span className="size-[7px] rounded-tag bg-lime" aria-hidden /> : null}
      {line}
      {label ? <span className="text-t2">· {label}</span> : null}
    </span>
  );
}
