"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { renderMarkdown } from "@/components/chat/ChatPanel";

interface ProjectOption {
  project_ref: string;
  title: string;
  customer: string;
}

interface WorkbenchStatus {
  configured: boolean;
  model: string;
  projects: ProjectOption[];
}

const STARTERS = [
  "Summarise this RFQ and list every missing input before we can issue a firm quote.",
  "Compare the requested sections with catalogue matches and flag tooling decisions still needed.",
  "Draft an internal quotation checklist covering BOM, machining, testing and commercial assumptions.",
  "Review the naming and section data for conflicts or ambiguous dimensions.",
];

function WorkbenchChat({ projectRef }: { projectRef: string }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/admin/ai",
        prepareSendMessagesRequest: ({ messages }) => ({
          body: { messages, projectRef },
        }),
      }),
    [projectRef],
  );
  const { messages, sendMessage, status, stop, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    void sendMessage({ text });
    setInput("");
  }

  return (
    <div className="overflow-hidden rounded-[8px] border border-border-default bg-white">
      <div ref={scrollRef} className="h-[520px] space-y-[13px] overflow-y-auto p-[17px]">
        {messages.length === 0 && (
          <div className="mx-auto flex h-full max-w-[760px] flex-col justify-center text-center">
            <h2 className="text-f17 font-bold text-t1">Ask TradeOS about {projectRef}</h2>
            <p className="mt-[5px] text-f13 text-t3">
              Gemini receives the saved project and section rows. Missing commercial or engineering data stays missing.
            </p>
            <div className="mt-[21px] grid gap-[8px] md:grid-cols-2">
              {STARTERS.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => void sendMessage({ text: starter })}
                  className="rounded-[6px] border border-border-default p-[13px] text-left text-f13 text-t2 hover:border-teal-border hover:bg-teal-bg"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[88%] rounded-[8px] px-[13px] py-[9px] text-f13 leading-golden ${
                message.role === "user" ? "bg-teal-text text-white" : "bg-bg2 text-t1"
              }`}
            >
              {message.parts.map((part, index) =>
                part.type === "text" ? (
                  message.role === "assistant" ? (
                    <div
                      key={`${message.id}-${index}`}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(part.text) }}
                    />
                  ) : (
                    <span key={`${message.id}-${index}`}>{part.text}</span>
                  )
                ) : null,
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="rounded-[6px] bg-red-50 p-[13px] text-f13 text-red-700">
            Gemini request failed. Confirm the server API key, model access and quota, then retry.
          </div>
        )}
      </div>

      <form onSubmit={submit} className="flex gap-[8px] border-t border-border-default p-[13px]">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(e);
            }
          }}
          placeholder="Ask for RFQ review, catalogue matching, BOM gaps, tooling analysis or a quote checklist…"
          className="min-h-[52px] flex-1 resize-none rounded-[6px] border border-border-default p-[10px] text-f13 text-t1"
        />
        {busy ? (
          <button type="button" onClick={stop} className="rounded-[6px] bg-bg2 px-[17px] text-f13 font-semibold text-t2">
            Stop
          </button>
        ) : (
          <button type="submit" disabled={!input.trim()} className="rounded-[6px] bg-teal-text px-[17px] text-f13 font-semibold text-white disabled:opacity-40">
            Send
          </button>
        )}
      </form>
    </div>
  );
}

export default function AIWorkbench() {
  const [status, setStatus] = useState<WorkbenchStatus | null>(null);
  const [projectRef, setProjectRef] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/admin/ai")
      .then(async (response) => {
        if (!response.ok) throw new Error(`AI workbench status failed: ${response.status}`);
        return response.json();
      })
      .then((data: WorkbenchStatus) => {
        if (!active) return;
        const next = {
          configured: Boolean(data.configured),
          model: data.model || "unavailable",
          projects: Array.isArray(data.projects) ? data.projects : [],
        };
        setStatus(next);
        setProjectRef((current) => current || next.projects[0]?.project_ref || "");
      })
      .catch(() => {
        if (active) setStatus({ configured: false, model: "unavailable", projects: [] });
      });
    return () => { active = false; };
  }, []);

  if (!status) return <div className="py-[55px] text-center text-f13 text-t3">Loading AI workbench…</div>;

  return (
    <div>
      <div className="mb-[13px] flex flex-wrap items-end justify-between gap-[13px] rounded-[8px] border border-border-default bg-white p-[17px]">
        <div>
          <div className="text-f17 font-bold text-t1">AI Workbench</div>
          <div className="mt-[2px] text-f12 text-t3">
            Provider: Google Gemini · Model: {status.model} · Server-side access only
          </div>
        </div>
        <label className="text-f12 text-t2">
          Project context
          <select
            value={projectRef}
            onChange={(e) => setProjectRef(e.target.value)}
            className="ml-[8px] min-w-[280px] rounded-[4px] border border-border-default p-[8px] text-f13 text-t1"
          >
            {status.projects.map((project) => (
              <option key={project.project_ref} value={project.project_ref}>
                {project.project_ref} · {project.customer}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!status.configured && (
        <div className="mb-[13px] rounded-[8px] border border-amber-300 bg-amber-50 p-[13px] text-f13 text-amber-900">
          Gemini is wired but not active. Add GEMINI_API_KEY to the server environment; never use a NEXT_PUBLIC_ variable.
        </div>
      )}

      {projectRef ? (
        <WorkbenchChat key={projectRef} projectRef={projectRef} />
      ) : (
        <div className="rounded-[8px] border border-border-default bg-white p-[34px] text-center text-f13 text-t3">
          No RFQ project is available yet.
        </div>
      )}
    </div>
  );
}
