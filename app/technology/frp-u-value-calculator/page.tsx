import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import { REFERENCE_TARGETS, TARGET_COMPARISON, frameSystems, thermalBreakNote } from "@/lib/windowUValueData";
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
      "The calculator is free and uses the EN ISO 10077-1 simplified whole-window formula. It can compare a result numerically with the PHI cool-temperate Uw ≤ 0.80 W/m²·K criterion, but that comparison is not certification. A separate locked preset reproduces the published inputs for PHI Component-ID 2491wi03: Fengdu Passive GFRP 90 Series, 1.23 × 1.48 m, Uf 0.78, Ug 0.70 and Ψg 0.023, giving the certified Uw 0.78 after rounding.",
  },
  {
    question: "Why do FRP frames out-perform thermally broken aluminum on U-value?",
    answer:
      "FRP thermal conductivity is approximately 0.3–0.4 W/m·K: hundreds of times lower than aluminum (~160 W/m·K) and of the same order as PVC (~0.17 W/m·K). FRP frames reach low Uf not through wall conductivity alone: slim, stiff pultruded walls allow deep multi-chamber (and foam-fillable) profiles with no metal reinforcement bridging the section, whereas PVC of equal stiffness needs a steel core that short-circuits its chambers. Thermally broken aluminum retains a continuous metallic path and typically lands at Uf ≈ 2.8–3.4 W/m²·K for standard polyamide-break systems (premium multi-break systems ≈ 1.6–2.5). Pultruded FRP frames achieve Uf of 0.85–1.4 W/m²·K with no thermal break required.",
  },
  {
    question: "What inputs does the calculator need?",
    answer:
      "Frame system (FRP 65/70/80/90 mm series, aluminum, PVC, timber), glazing configuration (double / triple / quadruple with gas fill), spacer type (aluminum, steel, or warm-edge), window type (fixed, casement, sliding, or entrance door), and unit dimensions. The calculator resolves frame and glass areas automatically and returns the whole-window Uw, the area and component breakdown, and clearly labeled numeric target comparisons.",
  },
  {
    question: "Can the calculator help me select a window for my climate zone?",
    answer:
      "Yes, for numerical screening. The target panel compares Uw with the PHI criteria, the England Approved Document L 2021 limits, the German limit for replaced windows, US ENERGY STAR v7.0 and IECC 2024 U-factor limits, ENERGY STAR Canada and the NBC 2020 prescriptive values, the New Zealand H1/AS1 values and selected Chinese GB limits. The EU itself sets no window U-value; member states do. The panel does not determine compliance: NFRC, CSA A440.2 and AFRC use different rating procedures, ENERGY STAR also requires SHGC, and Chinese acceptance depends on the project zone, window-to-wall ratio, and test evidence.",
  },
  {
    question: "How does this compare with NFRC simulation in the US/Canada?",
    answer:
      "NFRC 100 (US) and CSA A440.2 (Canada) use 2D thermal simulation with WINDOW/THERM at fixed model sizes and their own boundary conditions, rather than the simplified EN ISO 10077-1 approach. The two results can differ by more than rounding and the ratings are not interchangeable: an EN ISO 10077-1 value cannot be quoted as an NFRC U-factor. For NFRC certification, F1 Composite supplies frames with NFRC-compliant simulations on request.",
  },
];

const interpretation = [
  {
    title: "The frame dominates on small windows.",
    text: <>On a 600 × 900 mm fixed light the frame covers 35–40% of the area, and more with an opening sash, so the frame U<sub>f</sub> drives U<sub>w</sub> more than the glazing does. On a 2400 × 2400 mm picture window the frame is under 15% of the area and U<sub>g</sub> dominates. Calculate with the real dimensions.</>,
  },
  {
    title: "The spacer matters more than it looks.",
    text: <>Switching from an aluminum spacer (Ψ<sub>g</sub> 0.08) to a warm-edge spacer (Ψ<sub>g</sub> 0.03–0.04) lowers U<sub>w</sub> by about 0.05–0.2 W/m²·K, more on small windows. It is often the cheapest single improvement.</>,
  },
  {
    title: "Triple glazing needs a frame to match.",
    text: <>With U<sub>g</sub> 0.6 glass in an aluminum frame (U<sub>f</sub> 3.2), the frame of a 1230 × 1480 mm fixed light loses as much heat as all of the glass. An insulating frame keeps the glazing upgrade visible in U<sub>w</sub>.</>,
  },
];

const mistakes = [
  {
    title: <>Quoting U<sub>f</sub> instead of U<sub>w</sub></>,
    text: <>Datasheets often give the frame-only U<sub>f</sub> or the center-of-glass U<sub>g</sub>. Energy codes and PHI certification use the whole-window U<sub>w</sub>, so ask for U<sub>w</sub> at the size being installed.</>,
  },
  {
    title: <>Leaving out the installation Ψ</>,
    text: <>The joint between window and wall adds another linear thermal bridge, typically 0.02–0.10 W/m·K. Strict certification schemes count it separately. This calculator gives the assembly U<sub>w</sub>, not the installed U<sub>w,inst</sub>.</>,
  },
  {
    title: <>Assuming thermally broken aluminum is good enough</>,
    text: <>Even premium multi-break aluminum frames rarely reach U<sub>f</sub> below 1.4 W/m²·K, so passive house targets need deep, insulated aluminum systems. FRP, timber and multi-chamber PVC reach them with simpler sections.</>,
  },
];

const standards = [
  <>EN ISO 10077-1: thermal transmittance of windows, doors and shutters, general method</>,
  <>EN ISO 10077-2: numerical method for frames</>,
  <>ISO 15099: detailed calculation of windows, doors and shading devices</>,
  <>NFRC 100: fenestration product U-factors (North America)</>,
  <>Passive House Institute certified components: U<sub>w</sub> ≤ 0.80 W/m²·K, cool-temperate</>,
];

const cell = "px-[14px] py-[10px]";
const head = "px-[14px] py-[8px] font-semibold text-t1";

export default function UValueCalculatorPage() {
  const quoteHref = `/contact?${new URLSearchParams({
    source: "tool-u-value",
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
            "Passive House Uw ≤ 0.80 numeric target comparison",
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
            "Work out whole-window thermal transmittance and compare the number with Passive House, England, Germany, ENERGY STAR, IECC, NBC and GB reference targets without treating unlike rating methods as certifications.",
          totalTime: "PT2M",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Choose frame, glass, and spacer",
              text: "Select the frame system (FRP, aluminum, PVC, or timber), the glazing build-up (double / triple / quadruple), and the edge spacer, or load a quick-start preset.",
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
        tag="Tools"
        title="Window U-value calculator"
        description="Calculate the whole-window U-value (Uw) with the EN ISO 10077-1 simplified method. Compare FRP, aluminum, PVC and timber frames against clearly labeled numeric targets, or load the locked PHI certificate reference."
        facts={[
          { label: "Method", value: "EN ISO 10077-1" },
          { label: "Frames compared", value: String(frameSystems.length) },
          { label: "Numeric targets", value: String(TARGET_COMPARISON.length) },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Window U-value" }]}
      />

      <PageNav
        items={[
          { id: "tool", label: "Calculator" },
          { id: "how-to", label: "How to use" },
          { id: "mistakes", label: "Specification mistakes" },
          { id: "frames", label: "Frame values" },
          { id: "targets", label: "Reference targets" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      <ToolSection label="Window U-value calculator">
        <UValueCalculator />
      </ToolSection>

      <PageSection
        id="how-to"
        title="How to use the U-value calculator"
        intro={<>The whole-window U-value (U<sub>w</sub>) is the heat loss through a window assembly in W/m²·K. It combines the frame U<sub>f</sub>, the glazing U<sub>g</sub> and the edge term Ψ<sub>g</sub> where the frame meets the glass. This tool uses the EN ISO 10077-1 simplified formula; its result must not be relabeled as an NFRC, NRCan, GB/T 8484 or project certification result, since those procedures use their own model sizes, boundary conditions or physical tests.</>}
        tone="muted"
      >
        <div className="grid gap-[24px] lg:grid-cols-2">
          <div className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Worked example</p>
            <h3 className="mt-[4px] text-f18 font-bold text-t1">A passive house window</h3>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              A project specifies a 1230 × 1480 mm fixed window with triple glazing (U<sub>g</sub> 0.6) and a standard warm-edge
              spacer (Ψ<sub>g</sub> 0.04). With the calculator&rsquo;s frame values, aluminum with a polyamide thermal break (U<sub>f</sub> 3.2
              W/m²·K) gives U<sub>w</sub> ≈ 1.12, multi-chamber PVC (U<sub>f</sub> 1.5) gives ≈ 0.87 and the F1 FRP 90-series
              (U<sub>f</sub> 0.85) gives ≈ 0.76 W/m²·K.
            </p>
            <p className="mt-[8px] text-f14 leading-golden text-t2">
              The FRP result is numerically below 0.80, but that alone does not make the assembly PHI-certified; the certified
              reference is the locked PHI preset. At this size the frame covers 16–20% of the window, which is why realistic
              dimensions matter.
            </p>
          </div>
          <div>
            <h3 className="text-f18 font-bold text-t1">Reading the result</h3>
            <ul className="mt-[12px] space-y-[12px] text-f16 leading-golden text-t2">
              {interpretation.map((item) => (
                <li key={item.title}>
                  <strong className="text-t1">{item.title}</strong> {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection id="mistakes" title="Common specification mistakes" tone="white">
        <ul className="grid gap-[12px] md:grid-cols-3">
          {mistakes.map((item, index) => (
            <li key={index} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-[24px] max-w-[820px] rounded-card border-l-4 border-l-teal bg-bg2 p-[20px]">
          <p className="text-f16 font-bold text-t1">Referenced standards</p>
          <ul className="mt-[8px] space-y-[4px] text-f14 leading-golden text-t2">
            {standards.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection
        id="frames"
        title="Frame values used"
        intro={<>The frame U<sub>f</sub> values behind the calculator. FRP, timber and multi-chamber PVC insulate without a thermal break; aluminum needs one, and a steel core in PVC bridges the chambers.</>}
        tone="muted"
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={head}>Frame</th>
                <th scope="col" className={`${head} text-right`}>U<sub>f</sub> (W/m²·K)</th>
                <th scope="col" className={`${head} text-right`}>Depth (mm)</th>
                <th scope="col" className={`${head} text-right`}>Face width (mm)</th>
                <th scope="col" className={head}>Thermal break</th>
              </tr>
            </thead>
            <tbody>
              {frameSystems.map((frame) => (
                <tr key={frame.id} className={`border-b border-border-default align-top last:border-b-0 ${frame.id.startsWith("frp") ? "bg-teal-bg" : ""}`}>
                  <th scope="row" className={`${cell} font-semibold text-t1`}>{frame.label}</th>
                  <td className={`${cell} text-right tabular-nums text-t1`}>{frame.Uf.toFixed(2)}</td>
                  <td className={`${cell} text-right tabular-nums text-t2`}>{frame.depth}</td>
                  <td className={`${cell} text-right tabular-nums text-t2`}>{frame.faceWidth}</td>
                  <td className={`${cell} text-t2`}>{thermalBreakNote(frame)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        id="targets"
        title="Window U-value reference targets"
        intro="Published U-factor limits and program targets, for orientation. Calculation and certification methods differ by jurisdiction, so this table is not a compliance determination."
        tone="white"
      >
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[900px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={head}>Region</th>
                <th scope="col" className={head}>Standard</th>
                <th scope="col" className={head}>Climate zone or tier</th>
                <th scope="col" className={`${head} whitespace-nowrap`}>Max U<sub>w</sub> (W/m²·K)</th>
                <th scope="col" className={head}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {REFERENCE_TARGETS.map((row, index) => (
                <tr key={index} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className={`${cell} font-semibold text-t1`}>{row.region}</th>
                  <td className={`${cell} text-t2`}>{row.std}</td>
                  <td className={`${cell} text-t2`}>{row.zone}</td>
                  <td className={`${cell} whitespace-nowrap font-semibold tabular-nums text-t1`}>{row.uw}</td>
                  <td className={`${cell} text-f12 leading-golden text-t3`}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[820px] text-f14 leading-golden text-t2">
          This calculator uses the EN ISO 10077-1:2017 simplified method. US ratings follow NFRC 100 and Canadian ratings CSA
          A440.2, both by simulation (THERM and WINDOW) at fixed model sizes and boundary conditions; Australian ratings come from
          AFRC, which uses NFRC-based methods. Their values are not interchangeable with EN ISO 10077-1 results. From March 2027
          the Future Homes Standard in England asks for U-values calculated at the actual window size. For Chinese compliance,
          U-values are verified by the GB/T 8484-2020 hot-box test against the limits of the mandatory GB 55015-2021. The values
          are indicative; confirm the edition in force with the local authority.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={uValueFaqs} />
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "FRP windows", links: [
            { href: "/products/frp-window-frames", label: "FRP window frames" },
            { href: "/products/window-door-profiles", label: "Window and door profiles" },
            { href: "/ai/passive-house", label: "Passive House window selector" },
          ] },
          { title: "Markets", links: [
            { href: "/regions/frp-passive-house-windows-canada", label: "Passive house windows: Canada" },
            { href: "/regions/frp-passive-house-windows-germany", label: "Passive house windows: Germany" },
            { href: "/regions/grp-windows-uk", label: "GRP windows: UK" },
          ] },
          { title: "Guides", links: [
            { href: "/resources/blog/en-iso-10077-window-u-value-calculation", label: "How the whole-window U-value is calculated" },
            { href: "/resources/blog/window-u-value-vs-shgc-climate", label: "U-value vs SHGC by climate" },
            { href: "/technology/frp-vs-aluminum-windows", label: "FRP vs aluminum windows" },
          ] },
        ]}
      />

      <InnerCTA
        title="Send the window sizes and U-value target with your RFQ"
        quoteHref={quoteHref}
        text="Send the project climate, window types and sizes, the target U-value and whether you need finished units or profiles for local fabrication."
        advisorPrompt="Help me specify a passive house window: climate zone [...], target Uw [...] W/m²·K, window type and size [...]. Which F1 FRP series and glazing fit, and what is the certification path?"
      />
    </>
  );
}
