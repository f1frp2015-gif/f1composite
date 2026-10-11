"use client";

import { useState } from "react";
import Link from "next/link";
import { resinSystems } from "./resinSystems";

export default function ResinSelector() {
  const [activeKey, setActiveKey] = useState<string>(resinSystems[0].key);
  const active = resinSystems.find((system) => system.key === activeKey) ?? resinSystems[0];
  return (
    <div>
      <div className="flex flex-wrap gap-[6px]" role="group" aria-label="Resin family to review">
        {resinSystems.map((system) => (
          <button key={system.key} type="button" aria-pressed={system.key === active.key} onClick={() => setActiveKey(system.key)} className={`min-h-[44px] rounded-control border px-[12px] text-f14 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal ${system.key === active.key ? "border-teal bg-teal-bg2 font-semibold text-teal-text" : "border-border-default bg-white text-t2 hover:border-teal-border"}`}>
            {system.shortName}
          </button>
        ))}
      </div>
      <div className="mt-[16px] rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]" aria-live="polite">
        <h3 className="text-f18 font-bold text-t1">{active.name}</h3>
        <p className="mt-[8px] text-f16 leading-golden text-t2">{active.use}</p>
        <dl className="mt-[16px] divide-y divide-border-default text-f14">
          {[["Chemical review", active.chemical], ["Temperature", active.thermal], ["Fire evidence", active.fire], ["Before release", active.release]].map(([label, value]) => (
            <div key={label} className="grid gap-[4px] py-[12px] sm:grid-cols-[160px_1fr]">
              <dt className="font-semibold text-t1">{label}</dt><dd className="leading-golden text-t2">{value}</dd>
            </div>
          ))}
        </dl>
        <Link href={active.href} className="mt-[12px] inline-flex min-h-[44px] items-center font-semibold text-teal-text underline underline-offset-4">{active.label}</Link>
      </div>
    </div>
  );
}
