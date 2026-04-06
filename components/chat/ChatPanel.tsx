"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";

function renderMarkdown(text: string) {
  return text
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      // Headers
      if (trimmed.startsWith("### "))
        return `<h4 class="font-bold text-f14 mt-[10px] mb-[4px]">${trimmed.slice(4)}</h4>`;
      if (trimmed.startsWith("## "))
        return `<h3 class="font-bold text-f15 mt-[12px] mb-[4px]">${trimmed.slice(3)}</h3>`;

      // List blocks
      if (trimmed.match(/^[-*] /m)) {
        const items = trimmed
          .split("\n")
          .filter((l) => l.match(/^[-*] /))
          .map((l) => `<li class="ml-[16px] mb-[3px] list-disc">${inlineFormat(l.replace(/^[-*] /, ""))}</li>`)
          .join("");
        return `<ul class="my-[6px]">${items}</ul>`;
      }

      // Numbered list
      if (trimmed.match(/^\d+\. /m)) {
        const items = trimmed
          .split("\n")
          .filter((l) => l.match(/^\d+\. /))
          .map((l) => `<li class="ml-[16px] mb-[3px] list-decimal">${inlineFormat(l.replace(/^\d+\. /, ""))}</li>`)
          .join("");
        return `<ol class="my-[6px]">${items}</ol>`;
      }

      // Paragraph
      return `<p class="mb-[8px]">${inlineFormat(trimmed.replace(/\n/g, "<br/>"))}</p>`;
    })
    .join("");
}

function inlineFormat(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code class="bg-neutral-100 px-[4px] py-[1px] rounded text-f13">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-teal-text underline" target="_blank" rel="noopener">$1</a>');
}

const SUGGESTIONS = [
  "Recommend an FRP profile for a 6m pedestrian bridge",
  "Compare FRP vs steel for marine walkways",
  "What resin system for chemical plant environments?",
  "FRP window frame thermal performance data",
];

const transport = new DefaultChatTransport({ api: "/api/chat" });

interface ChatPanelProps {
  fullPage?: boolean;
}

export default function ChatPanel({ fullPage = false }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop, error } = useChat({ transport });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleSuggestion = (text: string) => {
    sendMessage({ text });
  };

  const containerHeight = fullPage ? "h-[calc(100vh-55px-120px)]" : "h-[480px]";

  return (
    <div className={`flex flex-col ${containerHeight}`}>
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-[16px] py-[16px] space-y-[16px]">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-[16px]">
            <div className="w-[40px] h-[40px] rounded-full bg-teal flex items-center justify-center mb-[13px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="10" cy="10" r="3" fill="white" />
              </svg>
            </div>
            <h3 className="text-f15 font-bold text-t1 mb-[5px]">FRP Engineering Advisor</h3>
            <p className="text-f13 text-t3 mb-[21px] max-w-[300px]">
              Ask anything about FRP profiles, material selection, specifications, and applications.
            </p>
            <div className="grid grid-cols-1 gap-[8px] w-full max-w-[360px]">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSuggestion(s)}
                  className="text-left text-f13 text-t2 px-[13px] py-[8px] rounded-[6px] border border-border-default hover:border-teal-border hover:text-teal-text transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-[8px] px-[13px] py-[8px] text-f14 leading-golden ${
                msg.role === "user"
                  ? "bg-teal text-white"
                  : "bg-bg2 text-t1"
              }`}
            >
              {msg.parts?.map((part, i) => {
                if (part.type === "text") {
                  if (msg.role === "user") {
                    return <span key={i}>{part.text}</span>;
                  }
                  return (
                    <div
                      key={i}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(part.text) }}
                    />
                  );
                }
                return null;
              })}
              {msg.role === "assistant" && msg.id === messages[messages.length - 1]?.id && status === "streaming" && (
                <span className="inline-block w-[6px] h-[14px] bg-teal animate-pulse ml-[2px]" />
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="text-center text-f13 text-red-500 py-[8px]">
            Something went wrong. Please try again.
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border-default p-[12px] bg-white">
        <form onSubmit={handleSubmit} className="flex gap-[8px]">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim() && !isLoading) {
                  sendMessage({ text: input });
                  setInput("");
                }
              }
            }}
            placeholder="Ask about FRP profiles..."
            rows={1}
            className="flex-1 resize-none rounded-[6px] border border-border-default px-[13px] py-[8px] text-f14 text-t1 placeholder:text-t3 focus:border-teal-border focus:outline-none"
            disabled={isLoading}
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="shrink-0 rounded-[6px] bg-neutral-200 px-[16px] py-[8px] text-f13 font-medium text-t2 hover:bg-neutral-300 transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="shrink-0 rounded-[6px] bg-teal px-[16px] py-[8px] text-f13 font-medium text-white hover:bg-teal/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Send
            </button>
          )}
        </form>
        <p className="mt-[6px] text-center text-[11px] text-t3">
          AI-generated answers. Verify critical engineering data with F1 Composite team.
        </p>
      </div>
    </div>
  );
}
