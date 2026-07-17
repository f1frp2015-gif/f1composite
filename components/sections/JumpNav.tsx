/**
 * In-page anchor navigation for long pillar pages: a horizontal, scrollable
 * row of pill links right under the page header, so a buyer on mobile can
 * jump straight to the section they came for instead of scrolling 30 screens.
 * Server-rendered, no JS — plain anchor links; target sections carry
 * scroll-mt so the fixed header does not cover the heading.
 */
export default function JumpNav({ items }: { items: Array<{ href: string; label: string }> }) {
  return (
    <nav aria-label="On this page" className="border-b border-border-default bg-white">
      <div className="mx-auto max-w-[1280px] overflow-x-auto px-[34px]">
        <ul className="flex w-max gap-[8px] py-[13px]">
          {items.map((it) => (
            <li key={it.href}>
              <a
                href={it.href}
                className="block whitespace-nowrap rounded-full border border-border-default bg-bg2 px-[13px] py-[5px] text-f13 font-medium text-t2 transition-colors hover:border-teal-border hover:text-teal-text"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
