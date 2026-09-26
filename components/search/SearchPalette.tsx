"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import SearchResult from "@/components/search/SearchResult";
import { trackEvent } from "@/lib/analytics";
import { buildRfqHref } from "@/lib/rfq";
import { SEARCH_OPEN_EVENT } from "@/lib/search/events";
import { isFileUrl, prepareIndex, search, sizeMatchText, type PreparedIndex } from "@/lib/search/query";
import type { SearchEntry } from "@/lib/search/types";

const EXAMPLES = ["100x100", "I152", "rod Ø25", "grating", "AS 2047"];
const SHORTCUTS = [
  { label: "Profile finder", href: "/tools/profile-finder" },
  { label: "All datasheets", href: "/datasheets" },
  { label: "Test reports & certificates", href: "/resources/evidence" },
  { label: "Downloads & CAD", href: "/resources/downloads" },
];
const PER_GROUP = 5;

// The index is fetched on the first open and kept for the rest of the visit.
let indexRequest: Promise<PreparedIndex> | null = null;
function loadIndex(): Promise<PreparedIndex> {
  indexRequest ??= fetch("/search-index.json")
    .then((response) => {
      if (!response.ok) throw new Error(`search index: HTTP ${response.status}`);
      return response.json() as Promise<SearchEntry[]>;
    })
    .then(prepareIndex)
    .catch((error: unknown) => {
      indexRequest = null; // the next open retries
      throw error;
    });
  return indexRequest;
}

const searchHref = (query: string) => `/search?q=${encodeURIComponent(query.trim())}`;

function MagnifierIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] shrink-0 text-t3" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

/** Site search dialog: Ctrl/⌘ K, "/" or any openSiteSearch() trigger opens it. */
export default function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<PreparedIndex | null>(null);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const listId = useId();
  const optionId = (position: number) => `${listId}-option-${position}`;

  const show = useCallback((initial = "") => {
    if (openRef.current) {
      if (initial) setQuery(initial);
      inputRef.current?.focus();
      return;
    }
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery(initial);
    setActive(0);
    setFailed(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => returnFocus.current?.focus());
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => show((event as CustomEvent<{ query?: string }>).detail?.query ?? "");
    const onKey = (event: globalThis.KeyboardEvent) => {
      const typing = (event.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable='true']");
      // Autofill can dispatch keydown events without a key.
      if (event.key?.toLowerCase() === "k" && (event.metaKey || event.ctrlKey) && !event.altKey) {
        event.preventDefault();
        show();
      } else if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        show();
      }
    };
    window.addEventListener(SEARCH_OPEN_EVENT, onOpen);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(SEARCH_OPEN_EVENT, onOpen);
      document.removeEventListener("keydown", onKey);
    };
  }, [show]);

  // While open: load the index, lock page scroll and focus the field.
  useEffect(() => {
    openRef.current = open;
    if (!open) return;
    loadIndex().then(setIndex, () => setFailed(true));
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const trimmed = query.trim();
  const results = useMemo(() => (index && trimmed ? search(index, trimmed, PER_GROUP) : null), [index, trimmed]);
  const hits = useMemo(() => results?.groups.flatMap((group) => group.hits) ?? [], [results]);
  // Options: every hit, then "All results".
  const optionCount = hits.length ? hits.length + 1 : 0;

  useEffect(() => {
    document.getElementById(`${listId}-option-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  // Zero-result searches show what buyers look for that the site lacks.
  useEffect(() => {
    if (!results || results.total > 0 || trimmed.length < 2) return;
    const timer = window.setTimeout(() => trackEvent("search_no_results", { search_term: trimmed.slice(0, 100) }), 1200);
    return () => window.clearTimeout(timer);
  }, [results, trimmed]);

  function choose(kind: string) {
    trackEvent("search", { search_term: trimmed.slice(0, 100), result_kind: kind });
    setOpen(false);
  }

  function openOption(position: number) {
    if (position < hits.length) {
      const { entry } = hits[position];
      choose(entry.kind);
      if (isFileUrl(entry.url)) window.open(entry.url, "_blank", "noopener");
      else router.push(entry.url);
    } else if (trimmed) {
      choose("all");
      router.push(searchHref(trimmed));
    }
  }

  function onInputKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!optionCount) return;
      setActive((current) => (current + (event.key === "ArrowDown" ? 1 : optionCount - 1)) % optionCount);
    } else if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      event.preventDefault();
      openOption(optionCount ? active : hits.length);
    }
  }

  function onPanelKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    // Keep keyboard focus inside the dialog.
    const focusable = [...panelRef.current.querySelectorAll<HTMLElement>("input, button, a[href]")].filter((element) => element.tabIndex >= 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  if (!open) return null;

  const offsets = results?.groups.map((_, group) => results.groups.slice(0, group).reduce((sum, previous) => sum + previous.hits.length, 0)) ?? [];

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-deep/55" onClick={close} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        onKeyDown={onPanelKey}
        className="relative flex h-full w-full flex-col bg-white sm:mx-auto sm:mt-[10vh] sm:h-auto sm:max-h-[76vh] sm:w-[min(680px,calc(100vw-48px))] sm:overflow-hidden sm:rounded-card sm:shadow-pop"
      >
        <div className="flex items-center gap-[10px] border-b border-border-default px-[16px]">
          <MagnifierIcon />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-label="Search sizes, products and documents"
            aria-expanded={hits.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={hits.length ? optionId(active) : undefined}
            placeholder="Search sizes, products, documents"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            // The caret marks focus here; the site-wide focus outline (unlayered) needs the important modifier to yield.
            className="min-h-[58px] min-w-0 flex-1 bg-transparent text-f18 text-t1 outline-none! placeholder:text-t3 [&::-webkit-search-cancel-button]:hidden"
          />
          <button type="button" onClick={close} className="rounded-tag border border-border-default px-[8px] py-[2px] font-mono text-f12 text-t3 hover:text-t1">
            <span className="hidden sm:inline">Esc</span>
            <span className="sm:hidden">Close</span>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-[8px]">
          {failed ? (
            <p className="px-[10px] py-[16px] text-f14 text-t2">
              Search could not load. Press Enter to open the full results page, or browse the menus.
            </p>
          ) : !trimmed ? (
            <div className="px-[10px] py-[12px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Try</p>
              <div className="mt-[8px] flex flex-wrap gap-[8px]">
                {EXAMPLES.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => {
                      setQuery(example);
                      setActive(0);
                      inputRef.current?.focus();
                    }}
                    className="rounded-tag border border-border-default px-[10px] py-[4px] text-f14 text-t1 hover:border-teal-border hover:text-teal-text"
                  >
                    {example}
                  </button>
                ))}
              </div>
              <p className="mt-[20px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">Go to</p>
              <div className="mt-[6px] grid gap-[2px] sm:grid-cols-2">
                {SHORTCUTS.map((shortcut) => (
                  <Link key={shortcut.href} href={shortcut.href} prefetch={false} onClick={() => setOpen(false)} className="rounded-control px-[10px] py-[8px] text-f14 font-semibold text-t1 hover:bg-teal-bg2 hover:text-teal-text">
                    {shortcut.label} <span aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : !results ? (
            <p className="px-[10px] py-[16px] text-f14 text-t3">Loading search…</p>
          ) : results.total === 0 ? (
            <div className="px-[10px] py-[16px]">
              <p className="text-f16 text-t1">
                No results for <strong>“{trimmed}”</strong>.
              </p>
              <p className="mt-[6px] text-f14 text-t2">Tell us the size or send a drawing, and an engineer will reply, or ask the engineering assistant.</p>
              <div className="mt-[12px] flex flex-wrap gap-[8px]">
                <Link
                  href={buildRfqHref({ source: "site-search", message: `I searched the website for "${trimmed.slice(0, 100)}" and could not find it. Here is what I need:` })}
                  onClick={() => setOpen(false)}
                  className="rounded-control bg-deep px-[14px] py-[8px] text-f14 font-bold text-white hover:bg-teal-text"
                >
                  Send your size or drawing
                </Link>
                <Link href={`/ask?prefill=${encodeURIComponent(trimmed)}`} onClick={() => setOpen(false)} className="rounded-control border border-border-default px-[14px] py-[8px] text-f14 font-bold text-t1 hover:border-teal-border hover:text-teal-text">
                  Ask the engineering assistant
                </Link>
              </div>
            </div>
          ) : (
            <div id={listId} role="listbox" aria-label="Search results">
              {results.closest && results.size ? (
                <p className="px-[10px] pt-[8px] text-f14 text-t2">
                  No catalog size is exactly {results.size.dims.join(" × ")} mm. Closest sizes:
                </p>
              ) : null}
              {results.groups.map((group, groupIndex) => (
                <div key={group.kind} role="group" aria-labelledby={`${listId}-${group.kind}`}>
                  <p id={`${listId}-${group.kind}`} className="px-[10px] pb-[4px] pt-[12px] font-mono text-f12 uppercase tracking-[0.06em] text-t3">
                    {group.label} · {group.total}
                  </p>
                  {group.hits.map((hit, hitIndex) => {
                    const position = offsets[groupIndex] + hitIndex;
                    const className = `block rounded-control px-[10px] py-[8px] ${active === position ? "bg-teal-bg2" : ""}`;
                    const content = <SearchResult entry={hit.entry} highlight={hit.entry.size ? sizeMatchText(hit.entry.title, results.size) : null} />;
                    const shared = {
                      id: optionId(position),
                      role: "option",
                      "aria-selected": active === position,
                      tabIndex: -1,
                      onMouseMove: () => setActive(position),
                      onClick: () => choose(hit.entry.kind),
                      className,
                    } as const;
                    return isFileUrl(hit.entry.url) ? (
                      <a key={hit.entry.id} href={hit.entry.url} target="_blank" rel="noopener" {...shared}>
                        {content}
                      </a>
                    ) : (
                      <Link key={hit.entry.id} href={hit.entry.url} prefetch={false} {...shared}>
                        {content}
                      </Link>
                    );
                  })}
                </div>
              ))}
              <Link
                id={optionId(hits.length)}
                role="option"
                aria-selected={active === hits.length}
                tabIndex={-1}
                href={searchHref(trimmed)}
                onMouseMove={() => setActive(hits.length)}
                onClick={() => choose("all")}
                className={`mt-[6px] block rounded-control border-t border-border-default px-[10px] py-[10px] text-f14 font-semibold text-teal-text ${active === hits.length ? "bg-teal-bg2" : ""}`}
              >
                All {results.total} results for “{trimmed}” <span aria-hidden>→</span>
              </Link>
            </div>
          )}
        </div>

        <div className="hidden flex-wrap gap-x-[16px] gap-y-[4px] border-t border-border-default bg-bg2 px-[16px] py-[8px] text-f12 text-t3 sm:flex">
          <span className="font-mono">↑↓ select</span>
          <span className="font-mono">Enter open</span>
          <span className="font-mono">Esc close</span>
          {/* Sizes stay in DM Sans: DM Mono's slashed zero reads as Ø. */}
          <span className="ml-auto">Understands 100x100, 100×100×8 and I152</span>
        </div>
      </div>
    </div>
  );
}
