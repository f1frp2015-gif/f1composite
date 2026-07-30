import Link from "next/link";
import { SPANS_MM, type SpanFamily } from "@/lib/spanTables";

function formatLoad(w: number): string {
  if (w < 0.05) return "—";
  if (w < 1) return w.toFixed(2);
  return w.toFixed(1);
}

const GOVERNS_MARK = { deflection: "d", bending: "b", shear: "v" } as const;

export default function SpanTablesContent({ families }: { families: SpanFamily[] }) {
  return families.map((family) => (
    <section key={family.id} id={family.id} className="bg-white py-[34px]">
      <div className="mx-auto max-w-[1280px] px-[20px] sm:px-[34px]">
        <h2 className="text-f24 font-bold text-t1">{family.title}</h2>
        <p className="mt-[8px] max-w-[800px] text-f15 leading-golden text-t2">{family.intro}</p>
        <div className="mt-[21px] overflow-x-auto rounded-[8px] border border-border-default">
          <table className="w-full min-w-[880px] border-collapse text-f13">
            <thead>
              <tr className="bg-slate-50 text-left text-t1">
                <th className="whitespace-nowrap px-[13px] py-[10px] font-semibold">Section (mm)</th>
                <th className="whitespace-nowrap px-[13px] py-[10px] font-semibold">kg/m</th>
                <th className="whitespace-nowrap px-[13px] py-[10px] font-semibold">Ix ×10⁶ mm⁴</th>
                {SPANS_MM.map((L) => (
                  <th key={L} className="whitespace-nowrap px-[13px] py-[10px] text-right font-semibold">
                    {(L / 1000).toFixed(1).replace(/\.0$/, "")} m
                  </th>
                ))}
                <th className="px-[13px] py-[10px]" />
              </tr>
            </thead>
            <tbody>
              {family.rows.map((row) => (
                <tr key={row.model} className="border-t border-border-default/70 text-t2">
                  <td className="whitespace-nowrap px-[13px] py-[8px] font-medium text-t1">{row.model}</td>
                  <td className="whitespace-nowrap px-[13px] py-[8px]">{row.weightKgPerM}</td>
                  <td className="whitespace-nowrap px-[13px] py-[8px]">{(row.IxMm4 / 1e6).toFixed(2)}</td>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="whitespace-nowrap px-[13px] py-[8px] text-right tabular-nums">
                      {formatLoad(cell.w)}
                      {cell.w >= 0.05 && <sup className="text-t3">{GOVERNS_MARK[cell.governs]}</sup>}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-[13px] py-[8px] text-right">
                    <Link
                      href={row.calculatorHref}
                      target="_blank"
                      rel="noopener"
                      className="text-teal-text hover:underline"
                    >
                      Check →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  ));
}
