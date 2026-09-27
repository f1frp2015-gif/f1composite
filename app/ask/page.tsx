import type { Metadata } from "next";
import Link from "next/link";
import ChatPanel from "@/components/chat/ChatPanel";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import LegalEntityNote from "@/components/sections/LegalEntityNote";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { supplyTerms } from "@/content/data/company";
import { engineeringEvidence } from "@/content/data/engineeringEvidence";

const exampleQuestions = [
  "Vinyl ester or polyester for a walkway over chlorinated wastewater?",
  "Which FRP I-beam should I check for a 3 m span, and how do I verify deflection?",
  "What does PHI certificate 2491wi03 cover, and does it apply to my window size?",
  "Which documents come with a grating order shipped to Saudi Arabia?",
  "How long does a new custom die take, and what is the minimum first run?",
];

const include = [
  "Application, site and service environment",
  "Chemicals, temperatures, UV and fire exposure",
  "Spans, loads and support conditions",
  "Standards named in the specification",
  "Quantity, destination and required date",
];

const topics = [
  {
    title: "Profile selection",
    text: "Which catalog section to check for a span or load, its weight and section properties, and how to verify deflection before the drawing goes to review.",
    links: [
      { href: "/frp-span-tables", label: "FRP span tables" },
      { href: "/frp-profile-calculator", label: "Profile calculator" },
    ],
  },
  {
    title: "Resins and service environments",
    text: "Polyester, vinyl ester, polyurethane and epoxy compared for chemicals, temperature, UV, fire and electrical exposure, with the compatibility questions to settle before ordering.",
    links: [{ href: "/technology/pultrusion-resin-systems", label: "Pultrusion resin systems" }],
  },
  {
    title: "Standards and documents",
    text: `What EN 13706 and ASTM D3917 specify, and what each of the ${engineeringEvidence.length} public documents covers, from the PHI window certificate to the SGS, Intertek and CPVT test reports, including where each one stops.`,
    links: [{ href: "/resources/evidence", label: "Evidence library" }],
  },
  {
    title: "Supply terms",
    text: "New die lead times, first-run and repeat quantities, packing, Incoterms and the documents to request with an order, taken from F1 Composite's published supply terms.",
    links: [
      { href: "/products/custom-pultruded-profiles", label: "Custom pultrusions" },
      { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "FOB and DDP guide" },
    ],
  },
];

const link = "font-semibold text-teal-text hover:underline";

interface AskPageProps {
  searchParams: Promise<{ prefill?: string; q?: string }>;
}

// /ask is reached several ways:
//   • Bare /ask — the canonical, indexable advisor landing page.
//   • /ask?prefill=... — context-rich CTAs from product/blog/calculator pages
//     and the site search's no-results exit.
//   • /ask?q=... — older links from when the WebSite SearchAction pointed
//     here; it now points to /search.
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
    { "@type": "ListItem", position: 2, name: "Tools", item: absoluteUrl("/tools") },
    { "@type": "ListItem", position: 3, name: "FRP engineering assistant" },
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
      <PageHeader
        tag="Tools"
        title="FRP engineering assistant"
        description="Ask about FRP profile selection, resins, standards, documents and supply terms. Answers link to the catalog page, test report or certificate they draw on."
        facts={[
          { label: "Public documents", value: String(engineeringEvidence.length) },
          { label: "Reply to requests", value: supplyTerms.responseTime.replace(/^./, (c) => c.toUpperCase()) },
          { label: "Login", value: "Not needed" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Engineering assistant" }]}
      />

      <PageNav
        items={[
          { id: "tool", label: "Assistant" },
          { id: "answers", label: "What it answers" },
          { id: "limits", label: "What it does not do" },
        ]}
      />

      <ToolSection label="FRP engineering assistant">
        <div className="grid gap-[20px] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-[24px]">
          <div className="min-h-[440px] overflow-clip rounded-card border border-border-default bg-white">
            <ChatPanel fullPage initialPrompt={prefill} suggestions={exampleQuestions} />
          </div>
          <aside aria-label="Before you ask" className="space-y-[12px] lg:self-start">
            <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
              <h2 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">A useful question gives</h2>
              <ul className="mt-[12px] space-y-[8px] text-f14 leading-snug text-t1">
                {include.map((item) => (
                  <li key={item} className="flex gap-[8px]">
                    <span aria-hidden className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
              <h2 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Drawings and confidential data</h2>
              <p className="mt-[12px] text-f14 leading-golden text-t2">
                Chats are processed by a third-party AI model. Send drawings and project data to the engineering team instead.
              </p>
              <Link href="/contact?source=tool-ask&inquiry_type=technical" className={`mt-[8px] inline-block text-f14 ${link}`}>
                Send to engineering →
              </Link>
            </div>
          </aside>
        </div>
      </ToolSection>

      <PageSection
        id="answers"
        title="What the assistant answers"
        intro="It works from the data published on this site: catalog sections and weights, resin systems, test reports, the window certificate and the supply terms. Each answer links to its source, so you can check the page or document before relying on it."
        tone="muted"
      >
        <ul className="grid gap-[12px] sm:grid-cols-2">
          {topics.map((topic) => (
            <li key={topic.title} className="flex flex-col rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">{topic.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{topic.text}</p>
              <p className="mt-auto flex flex-wrap gap-x-[16px] gap-y-[4px] pt-[12px] text-f14">
                {topic.links.map((item) => (
                  <Link key={item.href} href={item.href} className={link}>
                    {item.label} →
                  </Link>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="limits" title="What it does not do" tone="white">
        <div className="max-w-[820px] space-y-[16px] text-f16 leading-golden text-t2">
          <p>
            The assistant gives preliminary guidance. It is not an engineer&apos;s approval, a quotation or a certificate.
            Prices, lead times and documents are confirmed in writing by our team, who reply within {supplyTerms.responseTime}.
          </p>
          <p>
            Final profile sizing, connection design, safety factors and code acceptance stay with the project&apos;s qualified
            engineer. Treat an answer as a starting point for that review, and send the drawings to{" "}
            <Link href="/contact?source=tool-ask&inquiry_type=technical" className={link}>our engineers</Link> when the design needs
            a checked reply.
          </p>
          <LegalEntityNote variant="compact" />
        </div>
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "Check an answer", links: [
            { href: "/resources/evidence", label: "Evidence library" },
            { href: "/frp-span-tables", label: "FRP span tables" },
            { href: "/resources/glossary", label: "FRP glossary" },
          ] },
          { title: "Guided assistants", links: [
            { href: "/ai/sourcing", label: "FRP sourcing assistant" },
            { href: "/ai/passive-house", label: "Passive House window selector" },
          ] },
          { title: "More tools", links: [
            { href: "/tools", label: "All engineering tools" },
            { href: "/frp-profile-calculator", label: "FRP profile calculator" },
            { href: "/fiberglass-pultruded-profile-price", label: "Profile price estimator" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the question to an engineer"
        quoteHref="/contact?source=tool-ask&inquiry_type=technical"
        text="Send the question with the drawings, loads, service environment and quantity."
      />
    </>
  );
}
