import SectionTag from "@/components/ui/SectionTag";
import FAQDisclosure from "@/components/ui/FAQDisclosure";

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
  return (
    <section className="bg-white py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <SectionTag>{tag}</SectionTag>
        <h2 className="mt-[13px] max-w-[900px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
          {title}
        </h2>
        {description ? (
          <p className="mt-[13px] text-f15 leading-golden text-t2">
            {description}
          </p>
        ) : null}

        <div className="mt-[34px] grid items-start gap-[21px] md:grid-cols-2">
          {items.map((item) => (
            <FAQDisclosure
              key={item.question}
              question={item.question}
              answer={item.answer}
              surface="muted"
              size="large"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
