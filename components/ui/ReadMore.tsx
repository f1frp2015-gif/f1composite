// The rest of a text block, one tap away, so a run of cards or guides scans
// as a list while the words stay in the page for readers and search.
export default function ReadMore({
  label = "Continue reading",
  className = "",
  children,
}: {
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <details className={`group/more ${className}`}>
      <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-[8px] text-f14 font-semibold text-teal-text [&::-webkit-details-marker]:hidden">
        <span className="group-open/more:hidden">{label}</span>
        <span className="hidden group-open/more:inline">Show less</span>
        <span aria-hidden="true" className="transition-transform group-open/more:rotate-45">+</span>
      </summary>
      <div className="mt-[4px] space-y-[12px]">{children}</div>
    </details>
  );
}
