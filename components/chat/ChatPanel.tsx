"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";

function renderMarkdown(text: string) {
  const out: string[] = [];

  for (const block of text.split("\n\n")) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    const lines = trimmed.split("\n");

    // Horizontal rule — a thin divider instead of literal dashes.
    if (/^([-*_])\1{2,}$/.test(trimmed)) {
      out.push('<hr class="my-[10px] border-t border-border-default" />');
      continue;
    }

    // GFM pipe table: header row followed by a | --- | --- | separator row.
    if (lines.length >= 2 && lines[0].includes("|") && lines[1].includes("-") && /^[\s|:-]+$/.test(lines[1])) {
      const toCells = (l: string) =>
        l.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
      const head = toCells(lines[0]);
      const body = lines.slice(2).filter((l) => l.includes("|")).map(toCells);
      const th = head
        .map(
          (c) =>
            `<th class="border-b border-border-default bg-bg2 px-[10px] py-[6px] text-left font-semibold text-t1">${inlineFormat(c)}</th>`,
        )
        .join("");
      const rows = body
        .map(
          (r) =>
            "<tr>" +
            head
              .map(
                (_, i) =>
                  `<td class="border-b border-border-default px-[10px] py-[6px] align-top text-t2">${inlineFormat(r[i] ?? "")}</td>`,
              )
              .join("") +
            "</tr>",
        )
        .join("");
      out.push(
        `<div class="my-[8px] overflow-x-auto rounded-control border border-border-default"><table class="w-full border-collapse bg-white text-f14"><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table></div>`,
      );
      continue;
    }

    // Headers
    if (trimmed.startsWith("### ")) {
      out.push(`<h4 class="mt-[12px] mb-[4px] text-f16 font-bold">${inlineFormat(trimmed.slice(4))}</h4>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      out.push(`<h3 class="mt-[12px] mb-[4px] text-f18 font-bold">${inlineFormat(trimmed.slice(3))}</h3>`);
      continue;
    }

    // Bullet list
    if (trimmed.match(/^[-*] /m)) {
      const items = trimmed
        .split("\n")
        .filter((l) => l.match(/^[-*] /))
        .map((l) => `<li class="ml-[20px] mb-[4px] list-disc">${inlineFormat(l.replace(/^[-*] /, ""))}</li>`)
        .join("");
      out.push(`<ul class="my-[8px]">${items}</ul>`);
      continue;
    }

    // Numbered list
    if (trimmed.match(/^\d+\. /m)) {
      const items = trimmed
        .split("\n")
        .filter((l) => l.match(/^\d+\. /))
        .map((l) => `<li class="ml-[20px] mb-[4px] list-decimal">${inlineFormat(l.replace(/^\d+\. /, ""))}</li>`)
        .join("");
      out.push(`<ol class="my-[8px]">${items}</ol>`);
      continue;
    }

    // Paragraph
    out.push(`<p class="mb-[8px]">${inlineFormat(trimmed).replace(/\n/g, "<br/>")}</p>`);
  }

  return out.join("");
}

function inlineFormat(text: string) {
  // Escape HTML first so technical values like "U < 0.8" render literally and
  // model output can't inject tags; then apply the small markdown subset.
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Escape quotes too, so a model-supplied link URL can never break out of the
    // href="" attribute to inject an event handler (e.g. onmouseover=).
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code class="bg-bg2 px-[4px] py-[1px] rounded-tag text-f14">$1</code>')
    // Validate the href scheme so model output can't smuggle a javascript:/data:
    // URI; quote-escaping above already blocks attribute breakout.
    .replace(/\[(.*?)\]\((.*?)\)/g, (_m, label: string, url: string) =>
      `<a href="${safeHref(url)}" class="text-teal-text underline" target="_blank" rel="noopener noreferrer">${label}</a>`);
}

// Allow only safe link schemes + same-origin relative/anchor links. By the time
// this runs, inlineFormat has already entity-escaped any quotes in `url`.
function safeHref(url: string): string {
  const u = url.trim();
  if (/^(https?:|mailto:|tel:)/i.test(u)) return u;
  if (/^[/#]/.test(u)) return u;
  return "#";
}

const SUGGESTIONS = [
  "Recommend an FRP profile for a 6 m pedestrian bridge",
  "Compare FRP and steel for marine walkways",
  "Which resin system suits a chemical plant?",
  "FRP window frame thermal performance data",
];

// Grows with the question up to about six lines, then scrolls.
const INPUT_MAX_HEIGHT = 168;

interface ChatPanelProps {
  /** The /ask page: a panel sized to the window that waits for the visitor before taking focus. */
  fullPage?: boolean;
  initialPrompt?: string;
  /** Starting questions shown before the first message. */
  suggestions?: string[];
}

export default function ChatPanel({ fullPage = false, initialPrompt, suggestions = SUGGESTIONS }: ChatPanelProps) {
  const [input, setInput] = useState("");
  // Touch usePathname so the panel re-renders on route changes; we read
  // the live pathname/title from window at send-time inside the transport,
  // which keeps the closure free of React refs.
  usePathname();

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ messages, body }) => ({
          body: {
            ...body,
            messages,
            pageContext:
              typeof window !== "undefined"
                ? {
                    path: window.location.pathname,
                    title: document.title || undefined,
                  }
                : undefined,
          },
        }),
      }),
    [],
  );

  const { messages, sendMessage, status, stop, error } = useChat({ transport });
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialPromptSentRef = useRef(false);
  const wasLoadingRef = useRef(false);
  const startedRef = useRef(false);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // The widget takes focus as it opens. The page waits until an answer has
  // finished, so a visitor still reading the page is not pulled to the input.
  useEffect(() => {
    if (!isLoading && (!fullPage || wasLoadingRef.current)) inputRef.current?.focus({ preventScroll: true });
    wasLoadingRef.current = isLoading;
  }, [isLoading, fullPage]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    // scrollHeight leaves out the 1px border on each side.
    el.style.height = `${Math.min(el.scrollHeight + 2, INPUT_MAX_HEIGHT)}px`;
  }, [input]);

  // Auto-send initialPrompt from URL ?prefill= once on mount.
  useEffect(() => {
    if (initialPrompt && !initialPromptSentRef.current && messages.length === 0) {
      initialPromptSentRef.current = true;
      sendMessage({ text: initialPrompt });
    }
  }, [initialPrompt, messages.length, sendMessage]);

  // Once a conversation starts, the page panel grows to the window; bring all
  // of it into view, at once for a question sent from another page.
  useEffect(() => {
    if (!fullPage || startedRef.current || messages.length === 0) return;
    startedRef.current = true;
    panelRef.current?.scrollIntoView({ block: "end", behavior: initialPromptSentRef.current ? "auto" : "smooth" });
  }, [fullPage, messages.length]);

  const send = () => {
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send();
  };

  const handleSuggestion = (text: string) => {
    sendMessage({ text });
  };

  // Before the first message the page panel is as tall as its questions (or
  // the column beside it); a conversation fills the window below the two
  // navigation bars (72 + 48 px) with room to spare. The widget keeps one height.
  const containerHeight = !fullPage
    ? "h-[480px]"
    : messages.length === 0
      ? "h-full"
      : "h-[clamp(480px,calc(100svh-200px),760px)] scroll-mb-[16px]";

  return (
    <div ref={panelRef} className={`flex flex-col ${containerHeight}`}>
      {/* Messages */}
      <div ref={scrollRef} className={`flex-1 space-y-[16px] overflow-y-auto ${fullPage ? "p-[12px] sm:p-[20px]" : "p-[16px]"}`}>
        {messages.length === 0 &&
          (fullPage ? (
            // The page header already names the assistant; the panel opens on questions.
            <div className="max-w-[640px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Start with a question</p>
              <div className="mt-[12px] grid gap-[8px]">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSuggestion(s)}
                    className="min-h-[44px] rounded-control border border-border-default bg-white px-[14px] py-[10px] text-left text-f14 leading-snug text-t1 transition-colors hover:border-teal-border hover:bg-teal-bg hover:text-teal-text"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-[16px] text-center">
              <div className="mb-[12px] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-teal-text">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="white" strokeWidth="1.5" fill="none" />
                  <circle cx="10" cy="10" r="3" fill="white" />
                </svg>
              </div>
              <h3 className="mb-[4px] text-f16 font-bold text-t1">FRP engineering assistant</h3>
              <p className="mb-[20px] max-w-[300px] text-f14 text-t3">
                Ask about FRP profiles, material selection, specifications and applications.
              </p>
              <div className="grid w-full max-w-[360px] grid-cols-1 gap-[8px]">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSuggestion(s)}
                    className="rounded-control border border-border-default px-[12px] py-[8px] text-left text-f14 text-t2 transition-colors hover:border-teal-border hover:text-teal-text"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-card px-[16px] py-[12px] text-f16 leading-golden ${
                msg.role === "user"
                  ? "max-w-[85%] bg-teal-text text-white"
                  : // Answers take the full width on a phone, where tables need the room.
                    "max-w-full bg-bg2 text-t1 sm:max-w-[85%]"
              }`}
            >
              {msg.parts?.map((part, i) => {
                if (part.type === "text") {
                  if (msg.role === "user") {
                    return <span key={i} className="whitespace-pre-wrap">{part.text}</span>;
                  }
                  return (
                    <div
                      key={i}
                      className="[&>:first-child]:mt-0 [&>:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(part.text) }}
                    />
                  );
                }
                return null;
              })}
              {msg.role === "assistant" && msg.id === messages[messages.length - 1]?.id && status === "streaming" && (
                <span className="ml-[2px] inline-block h-[16px] w-[6px] animate-pulse bg-teal align-middle" />
              )}
            </div>
          </div>
        ))}

        {error && (
          <p className="py-[8px] text-center text-f14 text-fail">
            The answer did not load. Try again, or{" "}
            <Link href="/contact?source=tool-ask&inquiry_type=technical" className="font-semibold underline">
              send the question to our engineers
            </Link>
            .
          </p>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border-default bg-white p-[12px]">
        <form onSubmit={handleSubmit} className="flex items-end gap-[8px]">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              // Enter sends, Shift+Enter starts a new line; Enter that confirms
              // an input-method composition (Chinese, Japanese) does neither.
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send();
              }
            }}
            aria-label="Your question"
            placeholder="Ask about FRP profiles…"
            rows={1}
            className="min-h-[46px] flex-1 resize-none rounded-control border border-border-default bg-white px-[12px] py-[10px] text-f16 leading-[24px] text-t1 outline-none placeholder:text-t3 focus:border-teal"
            disabled={isLoading}
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="min-h-[46px] shrink-0 rounded-control border border-border-default bg-white px-[20px] text-f14 font-bold text-t1 transition-colors hover:border-teal-border hover:text-teal-text"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="min-h-[46px] shrink-0 rounded-control bg-teal-text px-[20px] text-f14 font-bold text-white transition-colors hover:bg-teal disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          )}
        </form>
        <p className="mt-[8px] text-center text-f12 text-t3">
          AI-generated answers. Check critical engineering data with the F1 Composite team.
        </p>
      </div>
    </div>
  );
}
