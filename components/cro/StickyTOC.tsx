"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface TocEntry {
  id: string;
  label: string;
}

interface StickyTOCProps {
  entries: TocEntry[];
  /** Page slug used in event params, e.g. "what-is-frp". */
  pageId: string;
}

/**
 * Sticky left-rail table of contents with active-section highlighting.
 *
 * Renders nothing on mobile (`lg:` breakpoint). Uses IntersectionObserver to
 * track which `<section id="...">` is currently in the viewport and fires a
 * `section_view` event the first time each section enters.
 */
export default function StickyTOC({ entries, pageId }: StickyTOCProps) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? "");

  useEffect(() => {
    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (intersections) => {
        // Pick the entry closest to the top among intersecting ones.
        const visible = intersections
          .filter((i) => i.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const topId = visible[0].target.id;
          setActiveId(topId);
          if (!seen.has(topId)) {
            seen.add(topId);
            trackEvent("section_view", { page_section: topId, cta_location: pageId });
          }
        }
      },
      {
        // Trigger when section title enters the upper third of the viewport.
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    entries.forEach((entry) => {
      const el = document.getElementById(entry.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entries, pageId]);

  const handleJump = (id: string, label: string) => {
    trackEvent("toc_jump", {
      page_section: id,
      cta_label: label,
      cta_location: `${pageId}:sticky-toc`,
      intent_layer: "info",
    });
  };

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[89px] hidden max-h-[calc(100vh-89px)] overflow-y-auto pl-[13px] lg:block"
    >
      <p className="text-f11 font-bold uppercase tracking-wide text-t3">On this page</p>
      <ul className="mt-[13px] space-y-[5px]">
        {entries.map((entry) => {
          const isActive = entry.id === activeId;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                onClick={() => handleJump(entry.id, entry.label)}
                className={
                  isActive
                    ? "block border-l-2 border-teal pl-[13px] text-f13 font-semibold text-teal-text"
                    : "block border-l-2 border-transparent pl-[13px] text-f13 text-t3 transition-colors hover:border-border-default hover:text-t2"
                }
              >
                {entry.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
