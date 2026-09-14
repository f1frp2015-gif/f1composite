import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";

export default function ProfileSupplyGuide({ sheet = false }: { sheet?: boolean }) {
  const items = [
    { title: sheet ? "Part sizes & cutting" : "Cut lengths & tolerances", text: sheet
      ? "Send finished length, width, thickness, part count and any holes or edge details. We review the cutting layout and dimensional requirements against your drawing."
      : "Specify length per piece, piece count, dimensional tolerances and any drilling or end cuts. Exact inch dimensions should be stated on the drawing." },
    { title: "Resin & surface", text: "Polyester and vinyl ester are material options. State chemicals, concentration, temperature, outdoor exposure, color and fire requirements so we can review the laminate and finish." },
    { title: "Quantity & samples", text: "Send the trial quantity and expected repeat demand. Minimum production quantity, tooling and sample arrangements are confirmed for the selected section and material." },
    { title: "Packing & delivery", text: "Include the destination and target date. Confirm bundle or part protection, transport length, production timing and shipping terms in the quotation." },
  ];
  return (
    <section id="supply-options" className="scroll-mt-[100px] bg-white py-[55px]">
      <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[28px] lg:px-[34px]">
        <SectionTag>Specify & buy</SectionTag>
        <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">{sheet ? "Specify your cut-to-size fiberglass sheet" : "Ordering pultruded fiberglass tubing"}</h2>
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
          <Link className="underline underline-offset-4" href={sheet ? "/resources/evidence" : "/resources/evidence#structural-design"}>Review supporting documents and scope</Link>
          <Link className="underline underline-offset-4" href="/resources/frp-pultrusion-fob-ddp-export-guide">Plan export and delivery terms</Link>
        </div>
      </div>
    </section>
  );
}
