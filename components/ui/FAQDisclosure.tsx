import type { ReactNode } from "react";
import { holdDash } from "@/lib/typography";

interface FAQDisclosureProps {
  question: string;
  answer: ReactNode;
  /** "auto" takes the ground opposite the PageSection it sits in: pale on white, white on pale. */
  surface?: "auto" | "white" | "muted";
  size?: "standard" | "large";
}

export default function FAQDisclosure({
  question,
  answer,
  surface = "auto",
  size = "standard",
}: FAQDisclosureProps) {
  const questionRow = (
    <>
      <span>{holdDash(question)}</span>
      <span
        aria-hidden="true"
        className="mt-[1px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-teal-border bg-white text-f16 leading-none text-teal-text transition-transform duration-200 group-open:rotate-45"
      >
        +
      </span>
    </>
  );

  return (
    <details
      className={`group self-start rounded-card border border-border-default transition-colors duration-200 open:border-teal-border ${
        surface === "muted" ? "bg-bg2" : surface === "white" ? "bg-white" : "bg-white in-data-[tone=white]:bg-bg2"
      } ${size === "large" ? "p-[28px]" : "px-[20px] py-[16px]"}`}
    >
      <summary className="cursor-pointer list-none text-t1 transition-colors hover:text-teal-text [&::-webkit-details-marker]:hidden">
        {size === "large" ? (
          <h3 className="flex items-start justify-between gap-[12px] text-f18 font-bold">
            {questionRow}
          </h3>
        ) : (
          <span className="flex items-start justify-between gap-[12px] text-f16 font-bold">
            {questionRow}
          </span>
        )}
      </summary>
      <p className="mt-[12px] text-f16 leading-golden text-t2">{answer}</p>
    </details>
  );
}
