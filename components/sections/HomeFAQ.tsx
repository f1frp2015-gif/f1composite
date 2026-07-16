import SectionTag from "@/components/ui/SectionTag";

const items = [
  {
    question: "What does F1 Composite manufacture?",
    answer:
      "F1 Composite manufactures four product lines: F1-STRUX structural shapes, F1-GRID gratings and deck panels, F1-THERM window and door systems, and F1-FORM custom pultrusions. The product pages contain the application, size and performance detail for each family.",
  },
  {
    question: "Is F1 Composite related to Formula One motorsport?",
    answer:
      "No. F1 stands for Fiber One. F1 Composite is an industrial fiberglass and FRP manufacturer based in Chongqing, China, with no connection to Formula One, the FIA or motorsport.",
  },
  {
    question: "Which standards and quality controls are available?",
    answer:
      "Production operates under ISO 9001:2015. Depending on the product and project, documentation can cover EN 13706, ASTM D3917, ASTM E84, BS 476, EN 45545-2, AS 4586 and Passive House component requirements. Confirm the exact test and certificate package in the RFQ.",
  },
  {
    question: "What should an international buyer include in an RFQ?",
    answer:
      "Send the profile or system type, drawing and dimensions, quantity, service environment, required standard or resin, destination and delivery target. This lets the engineering and export teams return a scoped quotation without avoidable follow-up.",
  },
];

export default function HomeFAQ() {
  return (
    <section className="bg-white py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[34px]">
        <SectionTag>About F1 Composite</SectionTag>
        <h2 className="mt-[8px] max-w-[800px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
          Common questions about the company and supply process
        </h2>
        <div className="mt-[21px] space-y-[8px]">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-[8px] border border-border-default bg-bg2 px-[21px] py-[16px]"
            >
              <summary className="cursor-pointer text-f15 font-bold text-t1 marker:text-teal">
                {item.question}
              </summary>
              <p className="mt-[13px] text-f15 leading-golden text-t2">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
