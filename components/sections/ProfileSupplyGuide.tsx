import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";
import { supplyTerms, weeks } from "@/content/data/company";

interface ProfileSupplyGuideProps {
  sheet?: boolean;
  /** Plural product name used in the heading, e.g. "angles" or "tubing". */
  product?: string;
}

export default function ProfileSupplyGuide({ sheet = false, product = "tubing" }: ProfileSupplyGuideProps) {
  const items = [
    sheet
      ? {
          title: "Part sizes & cutting",
          text: "Send the finished length, width, thickness and part count, with any holes or edge details. We check the cutting layout and tolerances against your drawing.",
        }
      : {
          title: "Lengths & tolerances",
          text: `Catalog sections come in ${supplyTerms.standardLengthM} m lengths or cut to your length. Give the piece length and count, say whether ASTM D3917 or EN 13706 tolerances apply, and mark any tighter tolerances, holes or end cuts on the drawing.`,
        },
    {
      title: "Resin & surface",
      text: "Polyester suits general structural use; vinyl ester is the usual choice for chemicals, seawater and wastewater. Tell us the chemicals, concentration, temperature, outdoor exposure, colour and any fire requirement, and we will confirm the resin and surface veil.",
    },
    {
      title: "Quantity & samples",
      text: `Catalog sections ship in ${weeks(supplyTerms.catalogLeadTimeWeeks)}. Give the trial quantity and the expected repeat demand; minimum quantities and samples are confirmed for the section and resin you choose.`,
    },
    {
      title: "Documents & delivery",
      text: "Each production batch ships with a mill test certificate. Include the destination and target date, and we will quote FOB or DDP with the packing method and shipping schedule.",
    },
  ];
  return (
    <section id="supply-options" className="scroll-mt-[100px] bg-white py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
        <SectionTag>Specify & buy</SectionTag>
        <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">{sheet ? "Specify your cut-to-size fiberglass sheet" : `Ordering pultruded fiberglass ${product}`}</h2>
        <div className="mt-[24px] grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <h3 className="text-f15 font-bold text-t1">{item.title}</h3>
              <p className="mt-[10px] text-f13 leading-golden text-t2">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-[24px] flex flex-wrap gap-x-[24px] gap-y-[12px] text-f13 font-semibold text-teal-text">
          <Link className="underline underline-offset-4" href="/technology/pultrusion-resin-systems">Compare resin systems</Link>
          <Link className="underline underline-offset-4" href="/resources/evidence">Review supporting documents and scope</Link>
          <Link className="underline underline-offset-4" href="/resources/frp-pultrusion-fob-ddp-export-guide">Plan export and delivery terms</Link>
        </div>
      </div>
    </section>
  );
}
