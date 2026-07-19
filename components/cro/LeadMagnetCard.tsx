"use client";

import { useState, useId } from "react";
import { trackEvent } from "@/lib/analytics";

export type LeadMagnetId =
  | "pocket-spec-card"
  | "frp-vs-steel-lcc"
  | "en13706-d-sample-report"
  | "profile-selector-flowchart";

interface LeadMagnetCardProps {
  magnetId: LeadMagnetId;
  title: string;
  description: string;
  /** Page slug for analytics, e.g. "what-is-frp". */
  pageId: string;
  /** Section anchor that hosts this card. */
  sectionId?: string;
  /** Optional bullet list of what's inside the PDF. */
  highlights?: string[];
  /** Button label override. */
  ctaLabel?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Inline lead-magnet capture — short form (email-only by default) that posts to
 * `/api/lead-magnet`. Used at section boundaries on long-form pages.
 */
export default function LeadMagnetCard({
  magnetId,
  title,
  description,
  pageId,
  sectionId,
  highlights,
  ctaLabel = "Email me the PDF",
}: LeadMagnetCardProps) {
  const formId = useId();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleOpen = () => {
    if (status === "idle") {
      trackEvent("lead_magnet_form_open", {
        magnet_id: magnetId,
        cta_location: `${pageId}:lead-magnet`,
        page_section: sectionId,
        intent_layer: "explore",
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          magnet_id: magnetId,
          email,
          name,
          page_context: `${pageId}${sectionId ? ":" + sectionId : ""}`,
        }),
      });
      const data = (await res.json()) as { message: string; downloadUrl?: string | null };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      setDownloadUrl(data.downloadUrl ?? null);
      trackEvent("lead_magnet_email_submit", {
        magnet_id: magnetId,
        cta_location: `${pageId}:lead-magnet`,
        page_section: sectionId,
        intent_layer: "explore",
        value: 5,
      });
    } catch {
      setStatus("error");
      setMessage("Network error — please retry, or email Doris.li@f1composite.com directly.");
    }
  };

  return (
    <aside
      className="my-[34px] rounded-[12px] border border-teal-border bg-teal-bg p-[29px]"
      data-magnet={magnetId}
      onMouseEnter={handleOpen}
    >
      <div className="grid gap-[21px] md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <p className="text-f11 font-bold uppercase tracking-wide text-teal-text">
            Free download
          </p>
          <h3 className="mt-[8px] text-f19 font-bold text-t1">{title}</h3>
          <p className="mt-[8px] text-f13 leading-golden text-t2">{description}</p>
          {highlights ? (
            <ul className="mt-[13px] space-y-[5px] text-f13 text-t2">
              {highlights.map((h) => (
                <li key={h} className="flex gap-[8px]">
                  <span aria-hidden className="text-teal-text">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="space-y-[8px]" aria-label={`Get ${title}`}>
          {status !== "success" ? (
            <>
              <label htmlFor={`${formId}-name`} className="block text-f11 font-semibold uppercase tracking-wide text-t3">
                Your name
              </label>
              <input
                id={`${formId}-name`}
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={handleOpen}
                placeholder="Engineering Manager"
                className="w-full rounded-[8px] border border-border-default bg-white px-[13px] py-[8px] text-f13 text-t1 focus:border-teal focus:outline-none"
              />
              <label htmlFor={`${formId}-email`} className="mt-[8px] block text-f11 font-semibold uppercase tracking-wide text-t3">
                Work email <span className="text-teal-text">*</span>
              </label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleOpen}
                placeholder="you@company.com"
                className="w-full rounded-[8px] border border-border-default bg-white px-[13px] py-[8px] text-f13 text-t1 focus:border-teal focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-[8px] w-full rounded-[8px] bg-teal px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : ctaLabel}
              </button>
              <p className="mt-[8px] text-f11 leading-golden text-t3">
                We email the PDF + a short note. No newsletter, no resale of your address.
              </p>
              {status === "error" ? (
                <p className="text-f11 text-red-600" role="alert">
                  {message}
                </p>
              ) : null}
            </>
          ) : (
            <div className="rounded-[8px] bg-white p-[21px]" role="status">
              <p className="text-f15 font-bold text-teal-text">Sent to {email}.</p>
              <p className="mt-[5px] text-f13 leading-golden text-t2">{message}</p>
              {downloadUrl ? (
                <a
                  href={downloadUrl}
                  onClick={() =>
                    trackEvent("lead_magnet_download", {
                      magnet_id: magnetId,
                      cta_location: `${pageId}:lead-magnet`,
                      page_section: sectionId,
                      intent_layer: "explore",
                      value: 6,
                    })
                  }
                  className="mt-[13px] inline-block text-f13 font-bold text-teal-text hover:text-teal"
                >
                  Direct download link →
                </a>
              ) : null}
            </div>
          )}
        </form>
      </div>
    </aside>
  );
}
