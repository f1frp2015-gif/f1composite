import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";
import { supplyTerms } from "@/content/data/company";

interface ProfileSupplyGuideProps {
  sheet?: boolean;
  /** Plural product name used in the heading, e.g. "angles" or "tubing". */
  product?: string;
}

/** What a profile or sheet quotation needs, with the supply terms from company.ts. */
export function profileSupplyItems({ sheet = false }: { sheet?: boolean } = {}) {
  return [
    sheet
      ? {
          title: "Part sizes & cutting",
          text: "Send the finished length, width, thickness and part count, with any holes or edge details. We check the cutting layout and tolerances against your drawing.",
        }
      : {
          title: "Lengths & tolerances",
          text: `Use ${supplyTerms.standardLengthM} m as the standard-length inquiry reference or specify cut lengths and counts. Identify the required tolerance standard, holes and end cuts on your drawing; available lengths and dimensional acceptance are confirmed for the selected section.`,
        },
    {
      title: "Resin & surface",
      text: "Give the chemicals, concentrations, temperature, outdoor exposure, color and fire requirements. Review the proposed resin, reinforcement and surface treatment against those conditions and the evidence for the offered material.",
    },
    {
      title: "Quantity & samples",
      text: "Give the trial quantity, expected repeat demand and target delivery date. Minimum quantities, sample arrangements and the production schedule are confirmed for the section, material and fabrication scope in the quotation.",
    },
    {
      title: "Documents & delivery",
      text: "List the required drawings, material reports and batch inspection records. Confirm which documents cover the offered product, any additional testing, the packing method and available delivery terms for your destination.",
    },
  ];
}

export default function ProfileSupplyGuide({ sheet = false, product = "tubing" }: ProfileSupplyGuideProps) {
  const items = profileSupplyItems({ sheet });
  return (
    <section id="supply-options" className="scroll-mt-[100px] bg-white py-[55px]">
      <div className="site-container">
        <SectionTag>Specify & buy</SectionTag>
        <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">{sheet ? "Specify your cut-to-size fiberglass sheet" : `Ordering pultruded fiberglass ${product}`}</h2>
        <div className="mt-[24px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-card border border-border-default bg-bg2 p-[21px]">
              <h3 className="text-f16 font-bold text-t1">{item.title}</h3>
              <p className="mt-[10px] text-f14 leading-golden text-t2">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-[24px] flex flex-wrap gap-x-[24px] gap-y-[12px] text-f14 font-semibold text-teal-text">
          <Link className="underline underline-offset-4" href="/technology/pultrusion-resin-systems">Compare resin systems</Link>
          <Link className="underline underline-offset-4" href="/technology/frp-profile-machining">Plan cutting, drilling and machining tolerances</Link>
          <Link className="underline underline-offset-4" href={sheet ? "/resources/evidence" : "/resources/evidence#structural-design"}>Review supporting documents and scope</Link>
          <Link className="underline underline-offset-4" href="/resources/frp-pultrusion-fob-ddp-export-guide">Plan export and delivery terms</Link>
        </div>
      </div>
    </section>
  );
}
