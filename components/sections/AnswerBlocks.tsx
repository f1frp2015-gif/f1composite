import PageSection from "@/components/layout/PageSection";
import FAQDisclosure from "@/components/ui/FAQDisclosure";

export interface AnswerBlockItem {
  question: string;
  answer: string;
}

interface AnswerBlocksProps {
  title: string;
  description?: string;
  items: AnswerBlockItem[];
  id?: string;
  tone?: "white" | "muted";
}

/** Questions and answers as a page section, laid out like the product pages' FAQ. */
export default function AnswerBlocks({ title, description, items, id = "faq", tone = "white" }: AnswerBlocksProps) {
  return (
    <PageSection id={id} title={title} intro={description} tone={tone}>
      <div className="grid items-start gap-[12px] md:grid-cols-2">
        {items.map((item) => (
          <FAQDisclosure key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    </PageSection>
  );
}
