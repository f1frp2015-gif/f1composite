import type { Metadata } from "next";
import ChatPanel from "@/components/chat/ChatPanel";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Engineering Advisor",
  description:
    "Ask our AI advisor about FRP profile selection, material comparison, specifications, and applications. Get instant engineering guidance for pultruded composite projects.",
  path: "/ask",
});

export default function AskPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "F1 Composite FRP Engineering Advisor",
    url: absoluteUrl("/ask"),
    description:
      "AI-powered engineering advisor for pultruded FRP composite profiles — material selection, specifications, and application guidance.",
    applicationCategory: "Engineering Tool",
    provider: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="mx-auto max-w-[800px] px-[21px] pt-[34px] pb-[21px]">
        <div className="mb-[21px] text-center">
          <div className="mx-auto mb-[13px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-teal">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="white" strokeWidth="1.5" fill="none" />
              <circle cx="10" cy="10" r="3" fill="white" />
            </svg>
          </div>
          <h1 className="text-f24 font-extrabold text-t1">FRP Engineering Advisor</h1>
          <p className="mt-[5px] text-f15 text-t2">
            Ask anything about FRP profiles, material selection, specifications, and applications.
          </p>
        </div>

        <div className="overflow-hidden rounded-[12px] border border-border-default bg-white shadow-sm">
          <ChatPanel fullPage />
        </div>
      </div>
    </>
  );
}
