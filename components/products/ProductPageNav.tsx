"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

export interface PageNavItem {
  id: string;
  label: string;
  /** Shown after the label, e.g. the number of sizes or documents. */
  count?: number;
}

// The fixed site header (72 px) plus this bar, with a little air.
const ACTIVE_LINE = 140;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** The last section whose top has passed under the bar; the last one at the page end. */
function sectionInView(ids: string[]): string {
  const root = document.documentElement;
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= root.scrollHeight - 2) return ids[ids.length - 1];
  let current = "";
  for (const id of ids) {
    const element = document.getElementById(id);
    if (element && element.getBoundingClientRect().top <= ACTIVE_LINE) current = id;
  }
  return current;
}

/**
 * The product page's section bar: sticks under the site header, marks the
 * section being read and keeps that link in view when the bar scrolls sideways
 * on a phone. Plain anchor links, so it works before and without JavaScript.
 */
export default function ProductPageNav({ items }: { items: PageNavItem[] }) {
  const key = items.map((item) => item.id).join(" ");
  const active = useSyncExternalStore(
    subscribe,
    () => sectionInView(key.split(" ")),
    () => "",
  );
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const link = list.current?.querySelector<HTMLElement>('[aria-current="location"]');
    const scroller = list.current;
    if (!link || !scroller) return;
    const left = link.offsetLeft - 16;
    const right = link.offsetLeft + link.offsetWidth + 16;
    if (left < scroller.scrollLeft) scroller.scrollLeft = left;
    else if (right > scroller.scrollLeft + scroller.clientWidth) scroller.scrollLeft = right - scroller.clientWidth;
  }, [active]);

  return (
    <nav aria-label="On this page" className="sticky top-[72px] z-30 border-b border-border-default bg-white/95 backdrop-blur-xl">
      <div className="site-container">
        <ul ref={list} className="-mx-[10px] flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const current = item.id === active;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={current ? "location" : undefined}
                  className={`relative inline-flex min-h-[48px] items-center gap-[6px] whitespace-nowrap px-[10px] text-f14 font-semibold transition-colors ${current ? "text-t1" : "text-t2 hover:text-t1"}`}
                >
                  {item.label}
                  {item.count != null ? <span className="font-mono text-f12 font-normal text-t3">{item.count}</span> : null}
                  <span aria-hidden className={`absolute inset-x-[10px] bottom-0 h-[2px] rounded-full ${current ? "bg-teal-text" : "bg-transparent"}`} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
