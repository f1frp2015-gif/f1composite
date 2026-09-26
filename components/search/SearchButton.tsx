"use client";

import { useSyncExternalStore } from "react";
import { openSiteSearch } from "@/lib/search/events";

const subscribe = () => () => {};
// Apple keyboards show ⌘ K; the server render and other systems show Ctrl K.
const appleKeyboard = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

function MagnifierIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Opens the site search palette. "header" is the desktop field in the
 * navigation bar, "icon" the phone header button and "field" the search box
 * at the top of the phone menu.
 */
export default function SearchButton({ variant, onOpen }: { variant: "header" | "icon" | "field"; onOpen?: () => void }) {
  const apple = useSyncExternalStore(subscribe, appleKeyboard, () => false);
  const open = () => {
    onOpen?.();
    openSiteSearch();
  };

  if (variant === "icon") {
    return (
      <button type="button" onClick={open} aria-label="Search the site" className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-control text-t1 hover:bg-bg2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal">
        <MagnifierIcon className="h-[22px] w-[22px]" />
      </button>
    );
  }

  if (variant === "field") {
    return (
      <button type="button" onClick={open} className="flex min-h-[46px] w-full items-center gap-[10px] rounded-control border border-border-default bg-bg2 px-[14px] text-left text-f16 text-t3">
        <MagnifierIcon className="h-[20px] w-[20px] shrink-0" />
        Search sizes, products, documents
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Search the site"
      aria-keyshortcuts={apple ? "Meta+K" : "Control+K"}
      className="inline-flex min-h-[40px] items-center gap-[8px] rounded-control border border-border-default bg-bg2 px-[10px] text-f14 text-t3 transition-colors hover:border-teal-border hover:text-t1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal xl:min-w-[210px]"
    >
      <MagnifierIcon className="h-[18px] w-[18px] shrink-0" />
      <span className="xl:hidden">Search</span>
      <span className="hidden xl:inline">Search sizes, products…</span>
      <kbd className="ml-auto rounded-tag border border-border-default bg-white px-[5px] font-mono text-f12 text-t3">{apple ? "⌘K" : "Ctrl K"}</kbd>
    </button>
  );
}
