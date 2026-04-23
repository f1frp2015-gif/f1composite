import Link from "next/link";

interface AskAICardProps {
  title?: string;
  description?: string;
  prefill: string;
  ctaLabel?: string;
}

/**
 * Renders a teal card that deep-links to /ask?prefill=... so the FRP
 * Engineering Advisor opens with a context-rich question already typed
 * and auto-sent. Used at the bottom of product / technology pages to
 * convert "I have a question" into a tracked AI conversation.
 */
export default function AskAICard({
  title = "Have a question about this product?",
  description = "Our FRP Engineering Advisor answers spec, sizing, and chemical-compatibility questions instantly — and routes complex ones to the right human.",
  prefill,
  ctaLabel = "Ask the AI advisor →",
}: AskAICardProps) {
  const href = `/ask?prefill=${encodeURIComponent(prefill)}`;
  return (
    <section className="bg-bg2 py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <div className="rounded-[12px] border border-teal-border bg-teal-bg p-[34px]">
          <div className="flex flex-col items-start gap-[21px] md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-[16px]">
              <div className="mt-[2px] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="10" cy="10" r="3" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="text-f19 font-bold text-t1">{title}</h3>
                <p className="mt-[5px] max-w-[640px] text-f13 leading-golden text-t2">
                  {description}
                </p>
                <p className="mt-[8px] text-f11 italic text-t3">
                  Pre-filled question: &ldquo;{prefill}&rdquo;
                </p>
              </div>
            </div>
            <Link
              href={href}
              className="shrink-0 rounded-[8px] bg-teal px-[21px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
