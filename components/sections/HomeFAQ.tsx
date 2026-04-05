"use client";

import { useState } from "react";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";

const items = [
  {
    question: "What are pultruded FRP profiles used for?",
    answer:
      "Pultruded FRP profiles are used in bridges, platforms, cooling towers, chemical plants, marine structures, electrical systems, and window or door frame applications where corrosion resistance and weight reduction matter.",
  },
  {
    question: "How do FRP profiles compare with steel?",
    answer:
      "FRP profiles are significantly lighter than steel, resist corrosion, provide electrical and thermal insulation, and can reduce maintenance in aggressive environments. Design checks often focus on stiffness and deflection rather than only strength.",
  },
  {
    question: "Can F1 Composite develop custom pultrusion profiles?",
    answer:
      "Yes. F1 Composite supports custom cross-section development, tooling, resin-system selection, and production planning for replacement programs and new structural designs.",
  },
  {
    question: "Which resin systems are available?",
    answer:
      "Typical options include isophthalic polyester for general structural use, vinyl ester for chemically aggressive or marine environments, and phenolic systems where fire performance is a key requirement.",
  },
  {
    question: "What should buyers prepare before requesting a quote?",
    answer:
      "The most useful RFQ inputs are profile type or drawing, dimensions, quantity, application environment, required resin system or standard, and target delivery schedule.",
  },
];

export default function HomeFAQ() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0, 1]));

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <JsonLd data={schema} />
        <SectionTag>FAQ</SectionTag>
        <h2 className="mt-[8px] max-w-[540px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
          Common questions from engineers and buyers
        </h2>

        <div className="mt-[21px] space-y-[8px]">
          {items.map((item, index) => {
            const isOpen = openIndices.has(index);
            return (
              <div
                key={item.question}
                className="rounded-[8px] border border-border-default bg-bg2 overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between px-[21px] py-[16px] text-left"
                >
                  <h3 className="text-f15 font-bold text-t1 pr-[13px]">{item.question}</h3>
                  <svg
                    className={`h-[18px] w-[18px] shrink-0 text-t3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-[21px] pb-[16px]">
                    <p className="text-f15 leading-golden text-t2">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
