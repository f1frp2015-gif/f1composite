interface SectionTagProps {
  children: React.ReactNode;
  /** "dark" on the deep ground. */
  tone?: "light" | "dark";
}

// A small label over a group of content, in the mono face used for figure
// numbers and data labels. Section titles on template pages (PageSection) go
// without one; use it only where a group needs naming apart from its heading.
export default function SectionTag({ children, tone = "light" }: SectionTagProps) {
  return (
    <div className={`font-mono text-f12 uppercase tracking-[0.06em] ${tone === "dark" ? "text-white/60" : "text-t3"}`}>
      {children}
    </div>
  );
}
