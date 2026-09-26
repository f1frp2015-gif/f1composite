import type { Metadata } from "next";
import ChatPanel from "@/components/chat/ChatPanel";
import LegalEntityNote from "@/components/sections/LegalEntityNote";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { supplyTerms } from "@/content/data/company";

const exampleQuestions = [
  "Vinyl ester or polyester for a walkway over chlorinated wastewater?",
  "Which FRP I-beam should I check for a 3 m span, and how do I verify deflection?",
  "What does PHI certificate 2491wi03 cover, and does it apply to my window size?",
  "Which documents come with a grating order shipped to Saudi Arabia?",
  "How long does a new custom die take, and what is the minimum first run?",
];

interface AskPageProps {
  searchParams: Promise<{ prefill?: string; q?: string }>;
}

// /ask is reached several ways:
//   • Bare /ask — the canonical, indexable advisor landing page.
//   • /ask?prefill=... — context-rich CTAs from product/blog/calculator pages.
//   • /ask?q=... — the sitewide SearchAction target (potentialAction in the
//     Organization/WebSite JSON-LD advertises /ask?q={search_term_string}).
// Any query-parametered variant is a transient deep link, not a unique page
// worth indexing. We return noindex (follow) on ALL param variants so Google
// stops listing them (incl. the literal {search_term_string} template) under
// "Alternate page with proper canonical tag". Canonical still points at the
// bare /ask so any signal consolidates correctly.
export async function generateMetadata({
  searchParams,
}: AskPageProps): Promise<Metadata> {
  const base = buildPageMetadata({
    title: "FRP Engineering Advisor & Profile Selection Assistant",
    description:
      "Ask the F1 Composite AI advisor about FRP profile selection, resins, standards and documents. Answers link to catalog data and published test reports.",
    path: "/ask",
  });
  const { prefill, q } = await searchParams;
  if (prefill || q) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "FRP Engineering Advisor" },
  ],
};

export default async function AskPage({ searchParams }: AskPageProps) {
  const { prefill } = await searchParams;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "F1 Composite FRP Engineering Advisor",
    url: absoluteUrl("/ask"),
    description:
      "AI-powered engineering advisor for pultruded FRP composite profiles — material selection, specifications, and application guidance.",
    applicationCategory: "Engineering Tool",
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto max-w-[800px] px-[21px] pt-[34px] pb-[21px]">
        <div className="mb-[21px] text-center">
          <div className="mx-auto mb-[13px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-teal">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="white" strokeWidth="1.5" fill="none" />
              <circle cx="10" cy="10" r="3" fill="white" />
            </svg>
          </div>
          <h1 className="text-f24 font-extrabold text-t1">FRP Engineering Advisor</h1>
          <p className="mt-[5px] text-f16 text-t2">
            Ask anything about FRP profiles, material selection, specifications, and applications.
          </p>
        </div>

        <div className="overflow-hidden rounded-[12px] border border-border-default bg-white shadow-sm">
          <ChatPanel fullPage initialPrompt={prefill} />
        </div>

        <div className="mt-[21px]">
          <LegalEntityNote variant="compact" />
        </div>

        <section className="mt-[34px] space-y-[21px] text-f16 leading-golden text-t2">
          <div>
            <h2 className="text-f18 font-bold text-t1">What the advisor can help with</h2>
            <p className="mt-[8px]">
              It answers questions about pultruded FRP profiles using the data published on this
              site: catalog sections and weights, resin systems, test reports, window certificates
              and our supply terms. Answers link to the page or document they come from, so you can
              check the source.
            </p>
          </div>
          <div>
            <h2 className="text-f18 font-bold text-t1">Questions people ask</h2>
            <ul className="mt-[8px] list-disc space-y-[6px] pl-[21px]">
              {exampleQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-f18 font-bold text-t1">What it does not do</h2>
            <p className="mt-[8px]">
              The advisor gives preliminary guidance. It is not an engineer&apos;s approval, a
              quotation or a certificate. Prices, lead times and documents are confirmed in writing
              by our team, who reply within {supplyTerms.responseTime}. Chats are processed by a
              third-party AI model, so send confidential drawings by email instead.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
