import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";

interface ExploreCard {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}

const cards: ExploreCard[] = [
  {
    eyebrow: "Guide",
    title: "What is FRP? Complete guide",
    description:
      "Fiberglass reinforced polymer composites explained — materials, pultrusion process, properties, standards, and how FRP compares with steel and aluminum.",
    href: "/what-is-frp",
  },
  {
    eyebrow: "Comparison",
    title: "FRP vs steel, aluminum, and timber",
    description:
      "Side-by-side mechanical, thermal, corrosion, and lifecycle cost comparison across the most common structural materials.",
    href: "/technology/frp-vs-traditional-materials",
  },
  {
    eyebrow: "Case studies",
    title: "Projects delivered in 30+ countries",
    description:
      "Bridge decks, marine walkways, chemical plant platforms, passive-house fenestration, solar farms — real F1 Composite deployments.",
    href: "/case-studies",
  },
  {
    eyebrow: "Technical blog",
    title: "Engineering articles & field notes",
    description:
      "Design guidance, standards explainers, and case data from our pultrusion engineering team — updated regularly.",
    href: "/resources/blog",
  },
  {
    eyebrow: "AI assistant",
    title: "Ask the F1 engineering assistant",
    description:
      "Get fast, specific answers to FRP design, specification, or procurement questions — powered by our full product knowledge base.",
    href: "/ask",
  },
];

export default function ExploreSection() {
  return (
    <section className="bg-white py-[89px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <SectionTag>Explore</SectionTag>
        <h2 className="mt-[13px] max-w-[800px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
          Dig into the F1 Composite knowledge base
        </h2>
        <p className="mt-[13px] max-w-[720px] text-f15 leading-golden text-t2">
          Hub pages, technical guides, case studies, and engineering resources — everything
          you need to specify, compare, or source pultruded FRP.
        </p>

        <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex h-full flex-col rounded-[8px] border border-border-default bg-bg2 p-[29px] transition-all duration-[0.21s] hover:border-teal hover:shadow-lg"
            >
              <p className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                {card.eyebrow}
              </p>
              <h3 className="mt-[8px] text-f19 font-bold text-t1 group-hover:text-teal-text">
                {card.title}
              </h3>
              <p className="mt-[13px] flex-1 text-f15 leading-golden text-t2">
                {card.description}
              </p>
              <span className="mt-[21px] inline-block text-f13 font-bold text-teal-text">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
