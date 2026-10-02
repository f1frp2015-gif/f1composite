"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { knowHowGoals, knowHowModules, buildKnowHowMessage, buildKnowHowRfqHref } from "@/lib/knowhowInquiry";

const field = "mt-[8px] w-full rounded-control border border-border-default bg-white px-[12px] py-[12px] text-f16 text-t1 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20";

export default function KnowHowProjectBrief() {
  const params = useSearchParams();
  const requested = params.get("module");
  const initialModule = knowHowModules.find(item => item.id === requested)?.id;
  return <BriefForm key={initialModule ?? "general"} initialModule={initialModule} />;
}

function BriefForm({ initialModule }: { initialModule?: string }) {
  const [goal, setGoal] = useState<string>("new-profile");
  const [moduleIds, setModuleIds] = useState<string[]>(initialModule ? [initialModule] : []);
  const [product, setProduct] = useState("");
  const [situation, setSituation] = useState("");
  const [destination, setDestination] = useState("");
  const brief = { goal, moduleIds, product, situation, destination };
  return (
    <div className="space-y-[24px] rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[28px]">
      <fieldset>
        <legend className="text-f18 font-bold text-t1">1. What are you planning?</legend>
        <div className="mt-[12px] grid gap-[10px] sm:grid-cols-2">{knowHowGoals.map(item => <label key={item.id} className="flex min-h-[48px] cursor-pointer items-center gap-[10px] rounded-control border border-border-default bg-white p-[12px] text-f14 text-t1"><input type="radio" name="knowhow-goal" value={item.id} checked={goal === item.id} onChange={() => setGoal(item.id)} className="h-[18px] w-[18px] accent-teal-text" />{item.label}</label>)}</div>
      </fieldset>
      <fieldset>
        <legend className="text-f18 font-bold text-t1">2. Choose the support modules</legend>
        <p className="mt-[6px] text-f14 text-t2">Select what you need, or leave this open for an engineering review.</p>
        <div className="mt-[12px] grid gap-[12px] md:grid-cols-2">{knowHowModules.map(item => <div key={item.id} className="rounded-control border border-border-default bg-white p-[16px]"><label className="flex min-h-[32px] cursor-pointer items-center gap-[10px] text-f16 font-semibold text-t1"><input type="checkbox" checked={moduleIds.includes(item.id)} onChange={event => setModuleIds(current => event.target.checked ? [...current, item.id] : current.filter(id => id !== item.id))} className="h-[18px] w-[18px] accent-teal-text" />{item.label}</label><p className="mt-[6px] text-f14 leading-golden text-t2">{item.detail}</p><Link href={item.href} target="_blank" rel="noopener noreferrer" className="mt-[8px] inline-flex min-h-[36px] items-center text-f14 font-semibold text-teal-text">Review module details <span className="sr-only">for {item.label} (opens in a new tab)</span><span aria-hidden className="ml-[6px]">↗</span></Link></div>)}</div>
      </fieldset>
      <fieldset>
        <legend className="text-f18 font-bold text-t1">3. Add the context you have</legend>
        <div className="mt-[12px] grid gap-[16px] md:grid-cols-2">
          <label className="text-f14 font-semibold text-t1">Product / output target (optional)<input className={field} value={product} onChange={event => setProduct(event.target.value)} maxLength={160} placeholder="e.g. hollow profile, drawing and target output" /></label>
          <label className="text-f14 font-semibold text-t1">Factory location / destination (optional)<input className={field} value={destination} onChange={event => setDestination(event.target.value)} maxLength={100} placeholder="Country and factory location" /></label>
          <label className="md:col-span-2 text-f14 font-semibold text-t1">Existing equipment / issue (optional)<textarea className={field} rows={3} value={situation} onChange={event => setSituation(event.target.value)} maxLength={320} placeholder="Existing line, tooling, material or quality issue" /></label>
        </div>
      </fieldset>
      <details className="rounded-control border border-border-default bg-white p-[16px]"><summary className="cursor-pointer text-f14 font-semibold text-t1">Review the inquiry brief</summary><pre className="mt-[12px] whitespace-pre-wrap break-words font-sans text-f14 leading-golden text-t2">{buildKnowHowMessage(brief)}</pre></details>
      <div className="flex flex-wrap items-center gap-[16px]"><Button href={buildKnowHowRfqHref(brief)}>Continue to contact</Button><p className="text-f14 text-t2">Your selections carry over. Add your name and email, then review and send.</p></div>
    </div>
  );
}
