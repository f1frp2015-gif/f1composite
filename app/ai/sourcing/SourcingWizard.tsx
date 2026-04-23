"use client";

import Link from "next/link";
import { useState } from "react";

interface Example {
  label: string;
  prompt: string;
}

interface SourcingWizardProps {
  examples: Example[];
}

export default function SourcingWizard({ examples }: SourcingWizardProps) {
  const [value, setValue] = useState("");

  const handleLaunch = () => {
    if (!value.trim()) return;
    const prefill = `[Sourcing wizard] ${value.trim()}`;
    window.location.href = `/ask?prefill=${encodeURIComponent(prefill)}`;
  };

  return (
    <div className="mt-[34px]">
      <label className="block text-f13 font-bold uppercase tracking-[2px] text-t3">
        Describe your project
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        placeholder="e.g. I need FRP structural beams and gratings for a coastal walkway in Saudi Arabia. 300m long, pedestrian load, salt/chlorine splash, 25-year design life. Want lightweight + zero maintenance. What do you recommend?"
        className="mt-[8px] w-full rounded-[8px] border border-border-default bg-white px-[16px] py-[13px] text-f15 leading-golden text-t1 outline-none focus:border-teal"
      />

      <div className="mt-[13px] flex flex-col gap-[8px] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-f11 text-t3">
          Your description will open in the Engineering Advisor with full context.
        </p>
        <button
          type="button"
          onClick={handleLaunch}
          disabled={!value.trim()}
          className="rounded-[8px] bg-teal px-[21px] py-[10px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text disabled:cursor-not-allowed disabled:opacity-40"
        >
          Get AI recommendation →
        </button>
      </div>

      <div className="mt-[34px]">
        <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Or pick a starting point</div>
        <div className="mt-[13px] grid gap-[8px]">
          {examples.map((ex) => (
            <Link
              key={ex.label}
              href={`/ask?prefill=${encodeURIComponent(`[Sourcing wizard] ${ex.prompt}`)}`}
              className="group rounded-[8px] border border-border-default bg-white p-[16px] transition-all hover:border-teal hover:bg-teal-bg"
            >
              <div className="flex items-center justify-between gap-[13px]">
                <span className="text-f13 font-semibold text-t1">{ex.label}</span>
                <span className="text-f13 text-teal-text opacity-0 transition-opacity group-hover:opacity-100">
                  Ask →
                </span>
              </div>
              <p className="mt-[5px] text-f11 leading-golden text-t2 line-clamp-2">{ex.prompt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
