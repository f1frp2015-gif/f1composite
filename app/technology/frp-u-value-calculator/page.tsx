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
  title: "Free Window U-Value Calculator — EN ISO 10077-1",
  description:
    "Free EN ISO 10077-1 U-value calculator. Compare FRP, aluminum, PVC and timber against numeric targets, or load a locked PHI certificate reference.",
  path: "/technology/frp-u-value-calculator",
});

const uValueFaqs = [
  {
    question: "Is this U-value calculator free, and does it follow PHI / Passive House standards?",
    answer:
      "The calculator is free and uses the EN ISO 10077-1 simplified whole-window formula. It can compare a result numerically with the PHI cool-temperate U_w ≤ 0.80 W/m²·K criterion, but that comparison is not certification. A separate locked preset reproduces the published inputs for PHI Component-ID 2491wi03: Fengdu Passive GFRP 90 Series, 1.23 × 1.48 m, Uf 0.78, Ug 0.70 and ψg 0.023, giving the certified Uw 0.78 after rounding.",
  },
  {
    question: "Why do FRP frames out-perform thermally broken aluminum on U-value?",
    answer:
      "FRP thermal conductivity is approximately 0.3–0.4 W/m·K — hundreds of times lower than aluminum (~160 W/m·K) and of the same order as PVC (~0.17 W/m·K). FRP frames reach low U_f not through wall conductivity alone: slim, stiff pultruded walls allow deep multi-chamber (and foam-fillable) profiles with no metal reinforcement bridging the section, whereas PVC of equal stiffness needs a steel core that short-circuits its chambers. Thermally broken aluminum retains a continuous metallic path and typically lands at U_f ≈ 2.8–3.4 W/m²·K for standard polyamide-break systems (premium multi-break systems ≈ 1.6–2.5). Pultruded FRP frames achieve U_f of 0.85–1.4 W/m²·K with no thermal break required.",
  },
  {
    question: "What inputs does the calculator need?",
    answer:
      "Frame system (FRP 65/70/80/90 mm series, aluminum, PVC, timber), glazing configuration (double / triple / quadruple with gas fill), spacer type (aluminum, steel, or warm-edge), window type (fixed, casement, sliding, or entrance door), and unit dimensions. The calculator resolves frame and glass areas automatically and returns the whole-window U_w, the area and component breakdown, and clearly labeled numeric target comparisons.",
  },
  {
    question: "Can the calculator help me select a window for my climate zone?",
    answer:
      "Yes, for numerical screening. The target panel compares U_w with the PHI cool-temperate criterion, typical EU nZEB levels, US ENERGY STAR v7.0 and IECC 2024 U-factor limits, the Canadian NRCan target, and selected Chinese GB limits. It does not determine compliance: NFRC/NRCan use different rating procedures, ENERGY STAR also requires SHGC, and Chinese acceptance depends on the project zone, window-to-wall ratio, and test evidence.",
  },
  {
    question: "How does this compare with NFRC simulation in the US/Canada?",
    answer:
      "NFRC 100 (US) and CSA A440.2 (Canada) use 2D thermal simulation with WINDOW/THERM at fixed model sizes and different boundary conditions, rather than the simplified EN ISO 10077-1 approach. For symmetric frame profiles results typically agree within ±0.1–0.2 W/m²·K, but the ratings are not interchangeable — an EN ISO 10077-1 value cannot be quoted as an NFRC U-factor. For NFRC certification, F1 Composite supplies frames with NFRC-compliant simulations on request.",
  },
];

export default function UValueCalculatorPage() {
  const quoteHref = `/contact?${new URLSearchParams({
    source: "u-value-header",
    inquiry_type: "rfq",
    message:
      "I need an FRP window or profile quotation. Project country/climate: [...]. Window type and opening size: [...]. Target whole-window U-value: [...] W/m²·K. Supply model: [finished units / profiles for local fabrication].",
  }).toString()}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Window U-Value Calculator",
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Web",
          url: absoluteUrl("/technology/frp-u-value-calculator"),
          browserRequirements: "Requires JavaScript. Requires HTML5.",
          inLanguage: "en",
          isAccessibleForFree: true,
          description:
            "Whole-window thermal transmittance calculator using EN ISO 10077-1. Compare FRP, aluminum, PVC, and timber frames, screen against numeric targets, and load a read-only PHI certificate reference.",
          featureList: [
            "Whole-window U-value (Uw) calculation per EN ISO 10077-1",
            "Frame comparison: FRP, aluminum, PVC, timber",
            "Glazing configurations: double, triple, quadruple",
            "Spacer type selection (aluminum, warm-edge)",
            "Frame/glass area ratio handling",
            "Passive House U_w ≤ 0.80 numeric target comparison",
            "EU, US, Canadian and Chinese reference targets with method caveats",
          ],
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          creator: { "@id": "https://www.f1composite.com/#organization" },
          softwareVersion: "1.0",
          applicationSubCategory: "Thermal Analysis Tool",
          keywords: "U-value calculator, window thermal performance, EN ISO 10077-1, Passive House, energy efficiency, thermal transmittance",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to calculate a whole-window U-value (Uw) per EN ISO 10077-1",
          description:
            "Work out whole-window thermal transmittance and compare the number with Passive House, nZEB, ENERGY STAR, IECC and GB reference targets without treating unlike rating methods as certifications.",
          totalTime: "PT2M",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Choose frame, glass, and spacer",
              text: "Select the frame system (FRP, aluminum, PVC, or timber), the glazing build-up (double / triple / quadruple), and the edge spacer — or load a quick-start preset.",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Enter window type and dimensions",
              text: "Choose the window type (fixed, casement, sliding, or door), then enter the width and height in millimeters. The calculator determines the frame and glass areas automatically.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Read the Uw and target comparison",
              text: "The calculator returns the whole-window Uw using EN ISO 10077-1, the component breakdown, improvement over an aluminum baseline, and numeric comparisons whose certification-method limitations are stated beside the results.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Match an F1 FRP frame and request a quote",
              text: "Use the matching F1 fenestration series and request a quote against your Uw spec, or email the result to F1 Composite for a tailored fenestration proposal.",
            },
          ],
        }}
      />
      <PageHeader
        tag="Free Engineering Tool"
        title="Free Window U-Value Calculator"
        description="Calculate whole-window U-value (U_w) with the EN ISO 10077-1 simplified method. Compare FRP, aluminum, PVC and timber frames against clearly labeled numeric targets, or load the locked PHI certificate reference."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "U-Value Calculator" },
        ]}
        actions={{
          primary: { label: "Start Calculator", href: "#u-value-calculator" },
          secondary: { label: "Quote FRP Windows", href: quoteHref, variant: "secondary" },
          note: "Calculate first, then send the U-value result with the project dimensions and climate target.",
          stickyMobile: true,
        }}
      />

      <div id="u-value-calculator" className="scroll-mt-[88px]">
        <UValueCalculator />
      </div>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="text-f24 font-bold text-t1 md:text-f31">
            How to use the U-value calculator
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Whole-window U-value (U<sub>w</sub>) quantifies heat loss through a window assembly in W/m²·K. It combines frame U<sub>f</sub>, glazing U<sub>g</sub>, and the frame-glass edge term ψ. This tool implements the EN ISO 10077-1 simplified formula. Its result must not be relabeled as an NFRC, NRCan, GB/T 8484, or project-certification result; those procedures have their own model sizes, boundary conditions, additional properties, or physical tests.
          </p>

          <div className="mt-[55px] grid gap-[34px] lg:grid-cols-2">
            <div>
              <h3 className="text-f19 font-bold text-t1">Input example — passive house window</h3>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                A passive house project specifies a 1230 × 1480 mm fixed window. The designer compares three frame options: a 70 mm aluminum frame with thermal break (U<sub>f</sub> ≈ 1.8 W/m²·K), a 70 mm PVC frame (U<sub>f</sub> ≈ 1.3 W/m²·K), and an F1 Composite 90-series FRP frame (U<sub>f</sub> = 0.85 W/m²·K). All three are paired with Ug = 0.6 triple glazing, warm-edge spacer (ψ = 0.035 W/m·K), and a frame-area ratio typical of fenestration profiles.
              </p>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                The calculator returns U<sub>w</sub> ≈ 1.05 W/m²·K (aluminum), 0.85 W/m²·K (PVC), and 0.72 W/m²·K (FRP 90-series). The FRP example is numerically below 0.80; that alone does not make the selected assembly PHI-certified. The result also shows why realistic dimensions and frame area matter.
              </p>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">How to interpret the results</h3>
              <ul className="mt-[13px] space-y-[13px] text-f15 leading-golden text-t2">
                <li>
                  <strong className="text-t1">Frame dominates on small windows.</strong> A 600 × 900 mm sash has 35–40% of its area covered by the frame, so frame U<sub>f</sub> drives U<sub>w</sub> more than glazing. On a 2400 × 2400 mm picture window, frame area is under 15% and Ug dominates. Always compute with realistic dimensions.
                </li>
                <li>
                  <strong className="text-t1">Warm-edge spacer matters more than people think.</strong> Switching from an aluminum spacer (ψ ≈ 0.065) to a warm-edge stainless or composite spacer (ψ ≈ 0.035) reduces U<sub>w</sub> by roughly 0.05–0.12 W/m²·K depending on window size — often the cheapest single improvement.
                </li>
                <li>
                  <strong className="text-t1">Triple glazing without a good frame is wasteful.</strong> Upgrading from Ug = 1.0 double to Ug = 0.6 triple only delivers its full benefit if the frame U<sub>f</sub> is below about 1.2 W/m²·K. Pairing Ug = 0.6 glass with an aluminum frame at U<sub>f</sub> = 2.0 wastes most of the glass upgrade.
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
                  <strong className="text-t1">Assuming aluminum with thermal break is &quot;good enough.&quot;</strong> Even premium thermally-broken aluminum frames rarely reach U<sub>f</sub> below 1.4 W/m²·K. For passive house or net-zero buildings, aluminum cannot meet the target without resorting to oversized glazing cavities — FRP, fiberglass, or triple-chamber PVC become the only viable frame choices.
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
            href="/products/frp-window-frames"
            className="mt-[21px] inline-block rounded-[8px] bg-teal px-[34px] py-[13px] text-f13 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-text"
          >
            Explore FRP windows &amp; doors →
          </Link>
          <div className="mt-[21px] flex flex-wrap justify-center gap-[21px]">
            <Link href="/regions/frp-passive-house-windows-canada" className="text-f13 font-semibold text-teal-text hover:underline">
              → FRP passive house windows for Canada
            </Link>
            <Link href="/regions/frp-passive-house-windows-germany" className="text-f13 font-semibold text-teal-text hover:underline">
              → FRP passive house windows for Germany
            </Link>
            <Link href="/regions/frp-pultrusion-supplier-usa" className="text-f13 font-semibold text-teal-text hover:underline">
              → FRP for US projects (PHIUS, ASTM)
            </Link>
            <Link href="/what-is-frp" className="text-f13 font-semibold text-teal-text hover:underline">
              → FRP material &amp; properties guide
            </Link>
          </div>
        </div>
      </section>

      <AskAICard
        title="Want help spec'ing a passive house window?"
        description="Open the FRP Engineering Advisor with your climate zone and U-value target — it will match an F1 Composite series, suggest glazing, and outline the certification path."
        prefill={prefillForCalculator({ name: "U-Value Calculator", path: "/technology/frp-u-value-calculator" })}
      />

      <InnerCTA title="Need help selecting the right frame and glass for your project?" />
    </>
  );
}
