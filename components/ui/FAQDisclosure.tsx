import type { ReactNode } from "react";

interface FAQDisclosureProps {
  question: string;
  answer: ReactNode;
  surface?: "white" | "muted";
  size?: "standard" | "large";
}

export default function FAQDisclosure({
  question,
  answer,
  surface = "white",
  size = "standard",
}: FAQDisclosureProps) {
  const questionRow = (
    <>
      <span>{question}</span>
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
      className={`group self-start rounded-[8px] border border-border-default transition-colors duration-200 open:border-teal-border ${
        surface === "muted" ? "bg-bg2" : "bg-white"
      } ${size === "large" ? "p-[29px]" : "px-[21px] py-[16px]"}`}
    >
      <summary className="cursor-pointer list-none text-t1 transition-colors hover:text-teal-text [&::-webkit-details-marker]:hidden">
        {size === "large" ? (
          <h3 className="flex items-start justify-between gap-[13px] text-f19 font-bold">
            {questionRow}
          </h3>
        ) : (
          <span className="flex items-start justify-between gap-[13px] text-f15 font-bold">
            {questionRow}
          </span>
        )}
      </summary>
      <p className="mt-[13px] text-f15 leading-golden text-t2">{answer}</p>
    </details>
  );
}
