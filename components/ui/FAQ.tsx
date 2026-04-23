import JsonLd from "@/components/seo/JsonLd";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  suppressSchema?: boolean;
}

export default function FAQ({ items, suppressSchema = false }: FAQProps) {
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
    <div className="mt-[55px]">
      {!suppressSchema && <JsonLd data={schema} />}
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
