import type { ReactNode } from "react";
import FAQDisclosure from "@/components/ui/FAQDisclosure";

export interface FAQItem {
  question: string;
  answer: ReactNode;
}

// Presentation only. Google retired FAQ rich results in May 2026, so emitting
// FAQPage JSON-LD sitewide adds duplicate entities without a Search feature.

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

// Sized like a PageSection title: on older pages the questions close the last
// content section, so they read as a section of their own.
export default function FAQ({ items, title = "Frequently asked questions" }: FAQProps) {
  return (
    <div className="mt-[48px]">
      <h2 className="text-[clamp(26px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">{title}</h2>
      <div className="mt-[24px] grid items-start gap-[12px] md:grid-cols-2">
        {items.map((item, i) => (
          <FAQDisclosure
            key={`${i}-${item.question}`}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}
