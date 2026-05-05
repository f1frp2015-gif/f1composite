import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AskAICard from "@/components/ai/AskAICard";
import { prefillForCalculator } from "@/lib/aiPrefill";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import UValueCalculator from "./UValueCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Window U-Value Calculator — FRP Frame & Glass Configuration (Passive House Ready)",
  description:
    "Free online whole-window U-value calculator per EN ISO 10077-1. Compare FRP, aluminium, PVC, and timber frames with double / triple / quadruple glazing. Passive House (U_w ≤ 0.80) and PHI compliance check. No login required.",
  path: "/technology/u-value-calculator",
});

const uValueFaqs = [
  {
    question: "Is this U-value calculator free, and does it follow PHI / Passive House standards?",
    answer:
      "Yes — the calculator is fully free, runs in your browser, and follows EN ISO 10077-1 for whole-window U-value (U_w). It supports the Passive House U_w ≤ 0.80 W/m²·K target check used by Passivhaus Institut (PHI) climate-class certification. F1 Composite's PHI-certified 90 Series fenestration achieves U_w 0.78 W/m²·K — verifiable in the calculator using a typical 90 mm FRP frame and triple-glazing input.",
  },
  {
    question: "Why do FRP frames out-perform thermally broken aluminium on U-value?",
    answer:
      "FRP thermal conductivity is approximately 0.3 W/m·K — roughly 1/170 of aluminium (160 W/m·K) and 1/3 of PVC. Even thermally broken aluminium with polyamide isolators retains a metallic continuous path that limits frame U-value to roughly 1.6–2.5 W/m²·K. Pultruded FRP frames achieve frame U-value of 0.9–1.4 W/m²·K with no thermal break required, because the entire frame is intrinsically insulating.",
  },
  {
    question: "What inputs does the calculator need?",
    answer:
      "Frame type (FRP, aluminium, PVC, timber), frame depth (65/70/80/90/140 mm series), glazing configuration (double / triple / quadruple, glass thickness, gas fill), spacer type (aluminium or warm-edge), frame/glass area ratio, and unit dimensions. The calculator returns U_w whole-window, frame and glass component U-values, and a Passive House compliance check.",
  },
  {
    question: "Can the calculator help me select a window for my climate zone?",
    answer:
      "Yes. PHI climate classes (Arctic, Cold, Cool-Temperate, Warm-Temperate, Warm) have different U_w requirements. The calculator flags whether the configuration meets the standard target for each PHI class. For Passive House certification specifically, F1 Composite's 90 Series is PHI Component-ID 2491wi03 at U_w 0.78 — the calculator confirms this against EN ISO 10077-1 inputs.",
  },
  {
    question: "How does this compare with NFRC simulation in the US/Canada?",
    answer:
      "NFRC 100 (US) and CSA A440.2 (Canada) use 2D thermal simulation with WINDOW/THERM rather than the simplified EN ISO 10077-1 approach. Results typically agree within ±5% for symmetric frame profiles. For NFRC certification, F1 Composite supplies frames with NFRC-compliant simulations on request.",
  },
];

export default function UValueCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Window U-Value Calculator",
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Web",
          url: absoluteUrl("/technology/u-value-calculator"),
          browserRequirements: "Requires JavaScript. Requires HTML5.",
          inLanguage: "en",
          isAccessibleForFree: true,
          description:
            "Whole-window thermal transmittance calculator per EN ISO 10077-1. Compare FRP, aluminium, PVC, and timber frames with common glass configurations.",
          featureList: [
            "Whole-window U-value (Uw) calculation per EN ISO 10077-1",
            "Frame comparison: FRP, aluminium, PVC, timber",
            "Glazing configurations: double, triple, quadruple",
            "Spacer type selection (aluminium, warm-edge)",
            "Frame/glass area ratio handling",
          ],
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          creator: {
            "@type": "Organization",
            name: "F1 Composite",
            url: absoluteUrl("/"),
          },
        }}
      />
      <PageHeader
        tag="Free Engineering Tool"
        title="Free Window U-Value Calculator"
        description="Calculate whole-window U-value (U_w) per EN ISO 10077-1 — instantly, free, no login. Compare FRP, aluminium, PVC, and timber frames against Passive House (U_w ≤ 0.80) targets."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "U-Value Calculator" },
        ]}
      />

      <UValueCalculator />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="text-f24 font-bold text-t1 md:text-f31">
            How to use the U-value calculator
          </h2>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            Whole-window U-value (U<sub>w</sub>) quantifies heat loss through a window assembly in W/m²·K. It combines the frame U<sub>f</sub>, glazing U<sub>g</sub>, and linear thermal bridging ψ at the frame-glass junction, weighted by the respective surface areas. This calculator follows EN ISO 10077-1, the international reference used for CE marking, Passive House certification, and most national energy codes. Lower U<sub>w</sub> means better insulation — passive house targets are typically U<sub>w</sub> ≤ 0.80 W/m²·K.
          </p>

          <div className="mt-[55px] grid gap-[34px] lg:grid-cols-2">
            <div>
              <h3 className="text-f19 font-bold text-t1">Input example — passive house window</h3>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                A passive house project specifies a 1230 × 1480 mm fixed window. The designer compares three frame options: a 70 mm aluminium frame with thermal break (U<sub>f</sub> ≈ 1.8 W/m²·K), a 70 mm PVC frame (U<sub>f</sub> ≈ 1.3 W/m²·K), and an F1 Composite 90-series FRP frame (U<sub>f</sub> = 0.85 W/m²·K). All three are paired with Ug = 0.6 triple glazing, warm-edge spacer (ψ = 0.035 W/m·K), and a frame-area ratio typical of fenestration profiles.
              </p>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                The calculator returns U<sub>w</sub> ≈ 1.05 W/m²·K (aluminium), 0.85 W/m²·K (PVC), and 0.72 W/m²·K (FRP 90-series). Only the FRP frame meets the PHI passive house limit. The result also shows that on this window size roughly 25% of U<sub>w</sub> comes from the frame — which is why frame choice dominates above Ug = 0.7.
              </p>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">How to interpret the results</h3>
              <ul className="mt-[13px] space-y-[13px] text-f15 leading-golden text-t2">
                <li>
                  <strong className="text-t1">Frame dominates on small windows.</strong> A 600 × 900 mm sash has 35–40% of its area covered by the frame, so frame U<sub>f</sub> drives U<sub>w</sub> more than glazing. On a 2400 × 2400 mm picture window, frame area is under 15% and Ug dominates. Always compute with realistic dimensions.
                </li>
                <li>
                  <strong className="text-t1">Warm-edge spacer matters more than people think.</strong> Switching from an aluminium spacer (ψ ≈ 0.065) to a warm-edge stainless or composite spacer (ψ ≈ 0.035) reduces U<sub>w</sub> by roughly 0.10–0.15 W/m²·K — often the cheapest single improvement.
                </li>
                <li>
                  <strong className="text-t1">Triple glazing without a good frame is wasteful.</strong> Upgrading from Ug = 1.0 double to Ug = 0.6 triple only delivers its full benefit if the frame U<sub>f</sub> is below about 1.2 W/m²·K. Pairing Ug = 0.6 glass with an aluminium frame at U<sub>f</sub> = 2.0 wastes most of the glass upgrade.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-f19 font-bold text-t1">Common specification mistakes</h3>
              <ul className="mt-[13px] space-y-[13px] text-f15 leading-golden text-t2">
                <li>
                  <strong className="text-t1">Quoting U<sub>f</sub> instead of U<sub>w</sub>.</strong> Manufacturer datasheets often advertise frame-only U<sub>f</sub> or center-of-glass Ug. Energy codes and PHI certification are based on whole-window U<sub>w</sub>. Always ask for the U<sub>w</sub> at the specific size being installed.
                </li>
                <li>
                  <strong className="text-t1">Ignoring installation psi (ψ<sub>inst</sub>).</strong> The window-to-wall joint adds another linear thermal bridge typically worth 0.02–0.10 W/m·K. Under strict certification schemes this must be included separately — this calculator gives the assembly U<sub>w</sub>, not the installed U<sub>w,inst</sub>.
                </li>
                <li>
                  <strong className="text-t1">Assuming aluminium with thermal break is &quot;good enough.&quot;</strong> Even premium thermally-broken aluminium frames rarely reach U<sub>f</sub> below 1.4 W/m²·K. For passive house or net-zero buildings, aluminium cannot meet the target without resorting to oversized glazing cavities — FRP, fiberglass, or triple-chamber PVC become the only viable frame choices.
                </li>
              </ul>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Referenced standards</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li>EN ISO 10077-1: Thermal performance of windows, doors and shutters — Calculation of thermal transmittance — Part 1: General</li>
                <li>EN ISO 10077-2: Numerical method for frames</li>
                <li>ISO 15099: Thermal performance of windows, doors and shading devices — Detailed calculations</li>
                <li>NFRC 100: Procedure for Determining Fenestration Product U-factors (North America)</li>
                <li>Passive House Institute (PHI) certified components database — U<sub>w</sub> ≤ 0.80 W/m²·K target</li>
              </ul>
            </div>
          </div>

          <FAQ items={uValueFaqs} />
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px] text-center">
          <p className="text-f15 leading-golden text-t2">
            Explore our complete range of pultruded FRP window and door frame systems —
            65/70/80/90-series with U<sub>f</sub> values from 0.85 to 1.5 W/m²K.
          </p>
          <Link
            href="/products/fenestration-systems"
            className="mt-[21px] inline-block rounded-[8px] bg-teal px-[34px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
          >
            View Fenestration Systems →
          </Link>
        </div>
      </section>

      <AskAICard
        title="Want help spec'ing a passive house window?"
        description="Open the FRP Engineering Advisor with your climate zone and U-value target — it will match an F1 Composite series, suggest glazing, and outline the certification path."
        prefill={prefillForCalculator({ name: "U-Value Calculator", path: "/technology/u-value-calculator" })}
      />

      <InnerCTA title="Need help selecting the right frame and glass for your project?" />
    </>
  );
}
