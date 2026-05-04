"use client";

import Link from "next/link";
import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { sourcingRecommendationSchema } from "@/lib/sourcingSchema";

interface Example {
  label: string;
  prompt: string;
}

interface SourcingWizardProps {
  examples: Example[];
}

export default function SourcingWizard({ examples }: SourcingWizardProps) {
  const [value, setValue] = useState("");
  const { object, submit, isLoading, stop, error } = useObject({
    api: "/api/sourcing",
    schema: sourcingRecommendationSchema,
  });

  const handleSubmit = (prompt: string) => {
    if (prompt.trim().length < 10) return;
    submit({ prompt: prompt.trim() });
  };

  const hasResult = !!object && Object.keys(object).length > 0;

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
          AI returns a structured recommendation: profile family, resin, standards, RFQ inputs, and next steps.
        </p>
        <div className="flex items-center gap-[8px]">
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="rounded-[8px] bg-neutral-200 px-[21px] py-[10px] text-f13 font-bold uppercase tracking-wide text-t2 transition-colors hover:bg-neutral-300"
            >
              Stop
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit(value)}
              disabled={value.trim().length < 10}
              className="rounded-[8px] bg-teal px-[21px] py-[10px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text disabled:cursor-not-allowed disabled:opacity-40"
            >
              Get AI recommendation →
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-[21px] rounded-[8px] border border-red-300 bg-red-50 p-[16px] text-f13 text-red-700">
          The recommendation failed to load. Try again, or open the{" "}
          <Link href="/ask" className="underline">
            full FRP advisor
          </Link>
          .
        </div>
      )}

      {(isLoading || hasResult) && (
        <div className="mt-[34px] space-y-[21px]">
          {object?.summary && (
            <section className="rounded-[12px] border border-teal-border bg-teal-bg p-[24px]">
              <h3 className="text-f13 font-bold uppercase tracking-[2px] text-teal-text">
                AI recommendation
              </h3>
              <p className="mt-[10px] text-f15 leading-golden text-t1">{object.summary}</p>
            </section>
          )}

          {object?.profileFamily?.name && (
            <section className="rounded-[12px] border border-border-default bg-white p-[24px]">
              <h3 className="text-f13 font-bold uppercase tracking-[2px] text-t3">
                Profile family
              </h3>
              <p className="mt-[5px] text-f19 font-bold text-t1">{object.profileFamily.name}</p>
              {object.profileFamily.why && (
                <p className="mt-[8px] text-f15 leading-golden text-t2">
                  {object.profileFamily.why}
                </p>
              )}
              {object.profileFamily.products && object.profileFamily.products.length > 0 && (
                <ul className="mt-[16px] grid gap-[8px] sm:grid-cols-2">
                  {object.profileFamily.products
                    .filter(
                      (p): p is { name: string; path: string } =>
                        !!p && typeof p.name === "string" && typeof p.path === "string",
                    )
                    .map((p) => (
                      <li key={`${p.name}-${p.path}`}>
                        <Link
                          href={p.path}
                          className="block rounded-[8px] border border-border-default bg-bg2 p-[13px] text-f13 text-t1 transition-colors hover:border-teal"
                        >
                          <span className="font-semibold">{p.name}</span>
                          <span className="ml-[8px] text-f11 text-t3">{p.path}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </section>
          )}

          <div className="grid gap-[21px] md:grid-cols-2">
            {object?.resinSystem?.recommended && (
              <section className="rounded-[12px] border border-border-default bg-white p-[24px]">
                <h3 className="text-f13 font-bold uppercase tracking-[2px] text-t3">
                  Resin system
                </h3>
                <p className="mt-[5px] text-f19 font-bold text-t1">
                  {object.resinSystem.recommended}
                </p>
                {object.resinSystem.why && (
                  <p className="mt-[8px] text-f13 leading-golden text-t2">
                    {object.resinSystem.why}
                  </p>
                )}
                {object.resinSystem.alternatives &&
                  object.resinSystem.alternatives.length > 0 && (
                    <p className="mt-[10px] text-f11 text-t3">
                      Alternatives: {object.resinSystem.alternatives.filter(Boolean).join(", ")}
                    </p>
                  )}
              </section>
            )}

            {object?.standards && object.standards.length > 0 && (
              <section className="rounded-[12px] border border-border-default bg-white p-[24px]">
                <h3 className="text-f13 font-bold uppercase tracking-[2px] text-t3">
                  Applicable standards
                </h3>
                <div className="mt-[10px] flex flex-wrap gap-[6px]">
                  {object.standards.filter(Boolean).map((s) => (
                    <span
                      key={s}
                      className="rounded-[4px] bg-bg2 px-[8px] py-[4px] text-f13 font-medium text-t2"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {object?.caseStudyMatches && object.caseStudyMatches.length > 0 && (
            <section className="rounded-[12px] border border-border-default bg-white p-[24px]">
              <h3 className="text-f13 font-bold uppercase tracking-[2px] text-t3">
                Similar case studies
              </h3>
              <ul className="mt-[10px] space-y-[10px]">
                {object.caseStudyMatches
                  .filter(
                    (cs): cs is { title: string; slug: string; why: string } =>
                      !!cs && typeof cs.title === "string" && typeof cs.slug === "string",
                  )
                  .map((cs) => (
                    <li key={cs.slug} className="border-b border-border-default pb-[10px] last:border-b-0">
                      <Link
                        href={`/case-studies/${cs.slug}`}
                        className="font-semibold text-teal-text hover:text-teal"
                      >
                        {cs.title} →
                      </Link>
                      {cs.why && (
                        <p className="mt-[4px] text-f13 leading-golden text-t2">{cs.why}</p>
                      )}
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {object?.rfqInputs && object.rfqInputs.length > 0 && (
            <section className="rounded-[12px] border border-border-default bg-white p-[24px]">
              <h3 className="text-f13 font-bold uppercase tracking-[2px] text-t3">
                Quote-ready inputs
              </h3>
              <ul className="mt-[10px] space-y-[6px]">
                {object.rfqInputs.filter(Boolean).map((input) => (
                  <li key={input} className="text-f13 leading-golden text-t2">
                    <span className="font-bold text-teal-text">·</span> {input}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {object?.nextSteps && object.nextSteps.length > 0 && (
            <section className="flex flex-wrap gap-[10px]">
              {object.nextSteps
                .filter(
                  (s): s is { label: string; href: string } =>
                    !!s && typeof s.label === "string" && typeof s.href === "string",
                )
                .map((step) => (
                  <Link
                    key={`${step.label}-${step.href}`}
                    href={step.href}
                    className="rounded-[8px] bg-teal px-[21px] py-[10px] text-f13 font-bold text-white transition-colors hover:bg-teal-text"
                  >
                    {step.label} →
                  </Link>
                ))}
            </section>
          )}

          {hasResult && !isLoading && (
            <p className="text-center text-f11 italic text-t3">
              AI-generated. Verify critical engineering data with the F1 Composite team.
            </p>
          )}
        </div>
      )}

      <div className="mt-[34px]">
        <div className="text-f11 font-bold uppercase tracking-[2px] text-t3">Or pick a starting point</div>
        <div className="mt-[13px] grid gap-[8px]">
          {examples.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => {
                setValue(ex.prompt);
                handleSubmit(ex.prompt);
              }}
              disabled={isLoading}
              className="group rounded-[8px] border border-border-default bg-white p-[16px] text-left transition-all hover:border-teal hover:bg-teal-bg disabled:opacity-50"
            >
              <div className="flex items-center justify-between gap-[13px]">
                <span className="text-f13 font-semibold text-t1">{ex.label}</span>
                <span className="text-f13 text-teal-text opacity-0 transition-opacity group-hover:opacity-100">
                  Run →
                </span>
              </div>
              <p className="mt-[5px] text-f11 leading-golden text-t2 line-clamp-2">{ex.prompt}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
