"use client";

import { useState } from "react";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";

const items = [
  {
    question: "What are pultruded FRP profiles used for?",
    answer:
      "Pultruded FRP profiles (also called pultruded fiberglass or GRP profiles) are used in bridges, walkways, cooling towers, chemical plant platforms, marine gratings, substation equipment, solar farm mounting, rail interiors, and passive-house window frames — any application where corrosion resistance, weight reduction, or electrical non-conductivity is critical. F1 Composite manufactures the full product range to EN 13706 and ASTM D3917.",
  },
  {
    question: "How do FRP profiles compare with steel and aluminum?",
    answer:
      "Pultruded FRP is approximately 75% lighter than steel (density 1.9 vs 7.85 g/cm³) and 30% lighter than aluminum. Tensile strength is comparable to A36 steel (240–400 MPa vs 400 MPa) but elastic modulus is about 1/10 of steel's (17–28 GPa vs 200 GPa), so stiffness and deflection often govern design. FRP does not rust, is electrically non-conductive, and has thermal conductivity 170× lower than steel.",
  },
  {
    question: "Can F1 Composite develop custom pultrusion profiles?",
    answer:
      "Yes. F1 Composite designs and manufactures custom pultrusion dies in-house, with cross-sections up to 600×300 mm and minimum wall thickness 1.5 mm. Typical tooling lead time is 3–6 weeks; total first-production turnaround is 6–10 weeks. Minimum order quantity is 500 linear meters for the first run, 200 m for repeats.",
  },
  {
    question: "Which resin systems are available?",
    answer:
      "Isophthalic polyester (general structural, default), vinyl ester (marine, chemical, wastewater), polyurethane (3–5× toughness of polyester, rail interiors and EV battery trays), phenolic (fire-critical per BS 476 Part 7 / EN 45545-2), and epoxy (highest mechanical performance, typically with carbon fiber).",
  },
  {
    question: "Do you supply FRP window frames and FRP window profiles?",
    answer:
      "Yes. F1 Composite manufactures pultruded FRP window frames and FRP window profiles in five frame depths — 65 / 70 / 80 / 90 / 140-series — for residential, commercial, passive-house, and extreme-climate buildings. Whole-window U-values down to 0.78 W/m²·K are achieved without thermal breaks or steel reinforcement. The 90-series is PHI (Passive House Institute) certified. Both fenestration window profiles (individual sections) and fully engineered window-frame systems are available.",
  },
  {
    question: "How does F1 Composite compare with Strongwell, Fiberline, and Creative Pultrusions?",
    answer:
      "F1 Composite manufactures to the same EN 13706 E17/E23 and ASTM D3917 specifications as Strongwell (EXTREN®, USA), Fiberline Composites (Denmark), and Creative Pultrusions (USA). Differentiators are scale (370 pultrusion lines, 150,000 t/year), direct-from-factory export pricing without regional distributor markups, and 3–6 week custom tooling turnaround.",
  },
  {
    question: "What certifications does F1 Composite hold?",
    answer:
      "ISO 9001:2015 (quality management), EN 13706 (pultruded profiles, E17 and E23 grades), ASTM D3917 (dimensional tolerance ±0.25 mm), PHI (Passive House Institute) for 90-series fenestration, and project-specific certifications for BS 476 fire, ASTM E84, EN 45545-2, AS 4586 slip resistance, and DNV marine.",
  },
  {
    question: "What should buyers prepare before requesting a quote?",
    answer:
      "The most useful RFQ inputs are profile type or drawing, dimensions, quantity, application environment, required resin system or standard, delivery schedule, and destination port. Quotes are typically returned within 48 hours to Doris.li@f1composite.com.",
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
        <h2 className="mt-[8px] max-w-[800px] text-f24 font-bold tracking-[-0.02em] text-t1 md:text-f31">
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
