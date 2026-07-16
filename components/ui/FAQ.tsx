export interface FAQItem {
  question: string;
  answer: string;
}

// Presentation only. Google retired FAQ rich results in May 2026, so emitting
// FAQPage JSON-LD sitewide adds duplicate entities without a Search feature.

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  return (
    <div className="mt-[55px]">
      <h2 className="mb-[21px] text-f24 font-bold text-t1">Frequently Asked Questions</h2>
      <div className="space-y-[13px]">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-[8px] border border-border-default bg-white p-[21px]"
          >
            <summary className="cursor-pointer text-f15 font-bold text-t1 marker:text-teal">
              {item.question}
            </summary>
            <p className="mt-[13px] text-f15 leading-golden text-t2">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
