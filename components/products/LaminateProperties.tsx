import Link from "next/link";
import { E23_ISO_PUBLISHED, PROPERTY_ROWS } from "@/lib/catalog/en13706";

// Shared E23-ISO reference values, not configuration-specific test results.
// The full material table lives on /resources/technical-data.
const KEY_ROWS = ["e_l_gpa", "e_t_gpa", "tensile_l_mpa", "flexural_l_mpa", "shear_mpa", "pin_bearing_l_mpa"] as const;

// Material routes for inquiry; availability and evidence depend on the profile.
const RESINS = [
  { name: "Isophthalic polyester", use: "The E23-ISO reference uses this resin family. Confirm its suitability for the profile and service conditions." },
  { name: "Fire-retardant polyester", use: "State the required fire test and classification, then confirm evidence for the offered formulation and specimen scope." },
  { name: "Vinyl ester", use: "A candidate for chemical exposure. Provide the chemicals, concentrations, temperatures and exposure duration; specify fire requirements separately." },
  { name: "Polyurethane", use: "Review the proposed profile, processing route and mechanical requirements with the supplier." },
  { name: "Phenolic", use: "A route to evaluate where fire, smoke or toxicity criteria apply. Confirm manufacturability and the relevant test evidence." },
];

/** Published material reference and inquiry routes, with their evidence scope. */
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
        <h3 className="text-f18 font-bold text-t1">Material reference · E23-ISO</h3>
        <p className="mt-[8px] text-f14 leading-golden text-t2">
          Published reference values for the general-purpose isophthalic polyester laminate. Match the section, formulation and supporting documents before selecting design values for an order.
        </p>
        <div className="relative mt-[12px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[12px] py-[8px] font-semibold text-t1">Property</th>
                <th scope="col" className="px-[12px] py-[8px] text-right font-semibold text-t1">Reference value</th>
                <th scope="col" className="px-[12px] py-[8px] font-semibold text-t1 max-sm:hidden">Method reference</th>
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
          The listed moduli, tensile and flexural strengths, and pin-bearing strength use EN 13706-3 E23 minimums. ILSS, density and glass content are the published E23-ISO material references. These values and method names do not constitute a test report for the selected profile.{" "}
          <Link href="/resources/technical-data" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Full property table and test methods
          </Link>
        </p>
        {note ? <p className="mt-[10px] rounded-card border border-teal-border bg-teal-bg px-[14px] py-[10px] text-f14 leading-golden text-t2">{note}</p> : null}
      </div>
      <div>
        <h3 className="text-f18 font-bold text-t1">Resin routes to review</h3>
        <ul className="mt-[12px] divide-y divide-border-default rounded-card border border-border-default bg-white">
          {RESINS.map((resin) => (
            <li key={resin.name} className="px-[14px] py-[10px]">
              <span className="block text-f14 font-bold text-t1">{resin.name}</span>
              <span className="block text-f14 text-t2">{resin.use}</span>
            </li>
          ))}
        </ul>
        <p className="mt-[10px] text-f14 leading-golden text-t3">
          A change of resin, reinforcement, pigment or surface finish can change the applicable properties and evidence. Confirm the grade and reports for the offered configuration.{" "}
          <Link href="/technology/pultrusion-resin-systems" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">
            Compare resin systems
          </Link>
        </p>
        <p className="mt-[8px] text-f14 font-semibold text-teal-text">
          <Link href="/resources/evidence" className="underline underline-offset-4 hover:text-teal">
            Review available documents and their scope
          </Link>
        </p>
      </div>
    </div>
  );
}
