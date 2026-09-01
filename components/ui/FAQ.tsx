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

export default function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  return (
    <div className="mt-[55px]">
      <h2 className="mb-[21px] text-f24 font-bold text-t1">{title}</h2>
      <div className="grid items-start gap-[13px] md:grid-cols-2">
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
