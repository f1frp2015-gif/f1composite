import JsonLd from "@/components/seo/JsonLd";
import SectionTag from "@/components/ui/SectionTag";

export interface AnswerBlockItem {
  question: string;
  answer: string;
}

interface AnswerBlocksProps {
  tag?: string;
  title: string;
  description?: string;
  items: AnswerBlockItem[];
}

export default function AnswerBlocks({
  tag = "Quick Answers",
  title,
  description,
  items,
}: AnswerBlocksProps) {
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
    <section className="bg-white py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <JsonLd data={schema} />
        <SectionTag>{tag}</SectionTag>
        <h2 className="mt-[13px] max-w-[900px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
          {title}
        </h2>
        {description ? (
          <p className="mt-[13px] max-w-[800px] text-f15 leading-golden text-t2">
            {description}
          </p>
        ) : null}

        <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.question}
              className="rounded-[8px] border border-border-default bg-bg2 p-[29px]"
            >
              <h3 className="text-f19 font-bold text-t1">{item.question}</h3>
              <p className="mt-[13px] text-f15 leading-golden text-t2">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
