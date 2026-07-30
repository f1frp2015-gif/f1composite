import type { Metadata } from "next";
import EmbedShell from "@/components/tools/EmbedShell";
import PassiveHouseWizard from "../PassiveHouseWizard";

export const metadata: Metadata = {
  title: { absolute: "Embed AI Passive House Window Selector | F1 Composite" },
  description:
    "Embeddable AI Passive House window selector for matching climate, U-value targets, and opening types to FRP frame series.",
  alternates: { canonical: "https://www.f1composite.com/ai/passive-house" },
  robots: { index: false, follow: true },
};

export default function PassiveHouseEmbedPage() {
  return (
    <EmbedShell
      toolName="AI Passive House Window Selector"
      canonicalPath="/ai/passive-house"
    >
      <section className="bg-white px-[20px] py-[21px] sm:px-[34px]">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
            Free AI selection tool
          </p>
          <h1 className="mt-[8px] text-f24 font-bold text-t1">
            AI Passive House Window Selector
          </h1>
          <p className="mt-[8px] max-w-[920px] text-f14 leading-golden text-t2">
            Match PHI climate class, target whole-window U-value, opening type, and project size to
            an F1 Composite FRP frame-series recommendation and supporting evidence.
          </p>
          <PassiveHouseWizard embedded />
        </div>
      </section>
    </EmbedShell>
  );
}
