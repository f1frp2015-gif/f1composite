"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Lazy-load the chat panel (which pulls in @ai-sdk/react + ai) only when the
// user actually opens the widget. Keeps the AI-SDK client code out of the
// initial bundle on every page where the panel is never opened.
const ChatPanel = dynamic(() => import("./ChatPanel"));

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-[13px] right-[13px] z-50 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-teal text-white shadow-lg transition-all duration-200 hover:bg-teal/90 sm:bottom-[21px] sm:right-[21px] sm:h-[52px] sm:w-[52px]"
        aria-label={open ? "Close FRP Advisor" : "Ask FRP Advisor"}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <path d="M6 6L16 16M16 6L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 3C7.03 3 3 6.58 3 11c0 2.4 1.2 4.55 3.05 6.05L5 21l4.2-1.8c.9.2 1.84.3 2.8.3 4.97 0 9-3.58 9-8s-4.03-8-9-8z" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <circle cx="8.5" cy="11" r="1" fill="currentColor" />
            <circle cx="12" cy="11" r="1" fill="currentColor" />
            <circle cx="15.5" cy="11" r="1" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-[67px] right-[13px] z-50 w-[380px] max-w-[calc(100vw-26px)] overflow-hidden rounded-[12px] border border-border-default bg-white shadow-2xl sm:bottom-[85px] sm:right-[21px] sm:max-w-[calc(100vw-42px)]">
          <div className="flex items-center justify-between border-b border-border-default bg-teal-text px-[16px] py-[10px]">
            <div className="flex items-center gap-[8px]">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="10" cy="10" r="3" fill="white" />
              </svg>
              <span className="text-f14 font-bold text-white">FRP Advisor</span>
            </div>
            <a
              href="/ask"
              className="text-[11px] text-white/80 hover:text-white transition-colors"
            >
              Full page →
            </a>
          </div>
          <ChatPanel />
        </div>
      )}
    </>
  );
}
