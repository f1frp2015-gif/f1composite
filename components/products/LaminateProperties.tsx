import Link from "next/link";
import { E23_ISO_PUBLISHED, PROPERTY_ROWS } from "@/lib/catalog/en13706";

// The longitudinal values a designer checks first, from the laminate every
// datasheet publishes; the full table lives on /resources/technical-data.
const KEY_ROWS = ["e_l_gpa", "e_t_gpa", "tensile_l_mpa", "flexural_l_mpa", "shear_mpa", "pin_bearing_l_mpa"] as const;

// Resin systems declared to EN 13706 E23, as in lib/catalog/seed.ts.
const RESINS = [
  { name: "Isophthalic polyester", use: "Standard laminate for general structural use. Not fire-retardant." },
  { name: "Fire-retardant polyester", use: "For an ASTM E84 Class 1 requirement in mild chemistry; the test report is issued per profile." },
  { name: "Vinyl ester", use: "Chemicals, seawater and wastewater; fire-retardant with low smoke." },
  { name: "Polyurethane", use: "Tough matrix for thin walls and impact." },
  { name: "Phenolic", use: "Fire-critical enclosed spaces: low flame spread, smoke and toxicity." },
];

/** The standard E23 laminate's key values with test methods, and the resin options. */
export default function LaminateProperties({ note }: { note?: React.ReactNode }) {
  const rows = [
    ...KEY_ROWS.map((key) => {
      const row = PROPERTY_ROWS.find((item) => item.key === key)!;
      return { label: row.label, value: `${E23_ISO_PUBLISHED[key]} ${row.unit}`, method: row.method };
    }),
    { label: "Density", value: `${E23_ISO_PUBLISHED.density_g_cm3} g/cm³`, method: "EN ISO 1183" },
    { label: "Glass content", value: E23_ISO_PUBLISHED.glass_content, method: "EN ISO 1172" },
  ];
  return (
    <div className="grid grid-cols-1 gap-[28px] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-[48px]">
      <div>
        <h3 className="text-f18 font-bold text-t1">Standard laminate · EN 13706 E23</h3>
        <div className="relative mt-[12px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[12px] py-[8px] font-semibold text-t1">Property</th>
                <th scope="col" className="px-[12px] py-[8px] text-right font-semibold text-t1">Value</th>
                <th scope="col" className="px-[12px] py-[8px] font-semibold text-t1 max-sm:hidden">Test method</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border-default last:border-b-0">
                  <th scope="row" className="px-[12px] py-[8px] font-normal text-t2">
                    {row.label}
                    <span className="block text-f12 text-t3 sm:hidden">{row.method}</span>
                  </th>
                  <td className="whitespace-nowrap px-[12px] py-[8px] text-right font-semibold tabular-nums text-t1">{row.value}</td>
                  <td className="whitespace-nowrap px-[12px] py-[8px] text-t3 max-sm:hidden">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[10px] text-f14 leading-golden text-t3">
          Values of the isophthalic polyester laminate every datasheet lists. Moduli and strengths are the EN 13706-3 E23 minimums; ILSS is published above the 25 MPa minimum. Transverse strength is much lower than longitudinal, so connections need their own check.{" "}
          <Link href="/resources/technical-data" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Full property table and test methods
          </Link>
        </p>
        {note ? <p className="mt-[10px] rounded-card border border-teal-border bg-teal-bg px-[14px] py-[10px] text-f14 leading-golden text-t2">{note}</p> : null}
      </div>
      <div>
        <h3 className="text-f18 font-bold text-t1">Resin options</h3>
        <ul className="mt-[12px] divide-y divide-border-default rounded-card border border-border-default bg-white">
          {RESINS.map((resin) => (
            <li key={resin.name} className="px-[14px] py-[10px]">
              <span className="block text-f14 font-bold text-t1">{resin.name}</span>
              <span className="block text-f14 text-t2">{resin.use}</span>
            </li>
          ))}
        </ul>
        <p className="mt-[10px] text-f14 leading-golden text-t3">
          All are declared to grade E23. Resin decides chemical and fire performance, not stiffness.{" "}
          <Link href="/technology/pultrusion-resin-systems" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Compare resin systems
          </Link>
        </p>
      </div>
    </div>
  );
}
