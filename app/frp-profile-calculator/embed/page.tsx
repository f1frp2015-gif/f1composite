import type { Metadata } from "next";
import EmbedShell from "@/components/tools/EmbedShell";
import ProfileCalculator from "../ProfileCalculator";

export const metadata: Metadata = {
  title: { absolute: "Embed FRP Profile Calculator | F1 Composite" },
  description: "Embeddable FRP profile section and beam design calculator by F1 Composite.",
  alternates: { canonical: "https://www.f1composite.com/frp-profile-calculator" },
  robots: { index: false, follow: true },
};

export default function ProfileCalculatorEmbedPage() {
  return (
    <EmbedShell toolName="FRP Profile Calculator" canonicalPath="/frp-profile-calculator">
      <div id="profile-calculator">
        <ProfileCalculator />
      </div>
    </EmbedShell>
  );
}
