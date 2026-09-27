// The working panel of a tool page, straight under the header. It has no
// heading of its own (the page title names the tool) but keeps an anchor for
// the section bar and the white ground the sections below alternate from.
export default function ToolSection({
  id = "tool",
  label,
  children,
}: {
  id?: string;
  /** Accessible name of the region, e.g. "Thermal expansion calculator". */
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-label={label} data-tone="white" className="scroll-mt-[40px] bg-white py-[32px] md:py-[40px]">
      <div className="site-container">{children}</div>
    </section>
  );
}
