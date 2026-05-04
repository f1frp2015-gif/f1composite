import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import AskAICard from "@/components/ai/AskAICard";
import { prefillForCalculator } from "@/lib/aiPrefill";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import ProfileCalculator from "./ProfileCalculator";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profile Engineering Calculator",
  description:
    "Calculate FRP beam deflection, stress, and equivalent strength vs steel and aluminium. Based on EN 13706 and ASTM D3917 standards.",
  path: "/technology/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Profile Engineering Calculator",
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Web",
          url: absoluteUrl("/technology/calculator"),
          browserRequirements: "Requires JavaScript. Requires HTML5.",
          inLanguage: "en",
          isAccessibleForFree: true,
          description:
            "Structural calculator for pultruded FRP profiles. EN 13706 / ASTM D3917 compliant. Beam deflection, bending stress, and steel/aluminium equivalence.",
          featureList: [
            "Beam deflection calculation (simply supported, cantilever)",
            "Bending stress check per EN 13706",
            "FRP-to-steel equivalent section finder",
            "FRP-to-aluminium equivalent section finder",
            "Weight comparison across materials",
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
        tag="Engineering Tool"
        title="FRP Profile Calculator"
        description="Calculate beam deflection, bending stress, and find equivalent FRP replacements for steel and aluminium sections. Based on EN 13706, ASTM D3917, and ASCE Pre-Standard for FRP composites."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Calculator" },
        ]}
      />

      <ProfileCalculator />

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="text-f24 font-bold text-t1 md:text-f31">
            How to use the FRP profile calculator
          </h2>
          <p className="mt-[21px] max-w-[900px] text-f15 leading-golden text-t2">
            This calculator solves three recurring questions in FRP structural selection: how much a pultruded FRP beam will deflect under a given load, whether bending stress stays within design allowables, and what cross-section is needed to replace a steel or aluminium member at the same deflection. All formulas follow Euler-Bernoulli beam theory with E and σ values typical for pultruded E-glass / isophthalic polyester profiles manufactured to EN 13706 E23 and ASTM D3917.
          </p>

          <div className="mt-[55px] grid gap-[34px] lg:grid-cols-2">
            <div>
              <h3 className="text-f19 font-bold text-t1">Input example — walkway beam</h3>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                A pedestrian walkway requires a 3 m simply-supported FRP beam carrying 5 kN/m uniformly distributed live load plus 1 kN/m self-weight. Engineers typically select an FRP I-beam and check two limits: deflection under service load (usually L/360 = 8.3 mm for walkways per IBC 1604.3) and bending stress under factored load (usually ≤ 70 MPa for pultruded FRP E23, which incorporates creep and moisture safety factors beyond the EN 13706 minimum of 170 MPa tensile).
              </p>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                Enter span = 3000 mm, load = 6 kN/m (combined), and select an FRP I-beam with second moment of area I ≈ 1.8 × 10⁷ mm⁴ (typical for 152×76 pultruded section). The calculator returns maximum deflection near 7 mm and maximum bending stress near 55 MPa — both within allowables, confirming the section is adequate.
              </p>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">How to interpret the results</h3>
              <ul className="mt-[13px] space-y-[13px] text-f15 leading-golden text-t2">
                <li>
                  <strong className="text-t1">Deflection governs most FRP designs.</strong> FRP has tensile strength comparable to structural steel but elastic modulus is only 17–28 GPa — roughly 1/10 of steel&apos;s 200 GPa. Members sized to match steel on strength will therefore deflect about 10× more. Always check the L/240 or L/360 limit first; if deflection passes, stress almost always passes too.
                </li>
                <li>
                  <strong className="text-t1">Equivalent section is deeper, not heavier.</strong> When replacing a W6×12 steel beam with FRP at equal deflection, expect a deeper FRP section (e.g. 203×102 instead of 152×76) but installed weight still drops by 70–75% because FRP density is 1.9 g/cm³ versus 7.85 g/cm³ for steel.
                </li>
                <li>
                  <strong className="text-t1">Allowable stress is low for a reason.</strong> The 70 MPa allowable used here includes combined safety factors for creep rupture (≈ 0.3× short-term strength), moisture absorption, UV degradation, and temperature sensitivity. These are built into ASCE/SEI 74-23 Pre-Standard for Pultruded FRP Structures.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-f19 font-bold text-t1">Common specification mistakes</h3>
              <ul className="mt-[13px] space-y-[13px] text-f15 leading-golden text-t2">
                <li>
                  <strong className="text-t1">Using steel allowables for FRP.</strong> FRP must never be designed using AISC 360 allowable stresses. Pultruded profiles follow ASCE/SEI 74-23 (North America) or EN 13706 / Eurocomp Design Code (Europe), which use different resistance factors and explicitly cap long-term stress at 20–30% of ultimate.
                </li>
                <li>
                  <strong className="text-t1">Ignoring local buckling.</strong> Thin-walled FRP sections can buckle locally under compression well before reaching the calculated bending capacity. Web and flange slenderness limits from EN 13706 Annex G or ASCE 74-23 Chapter 3 must be checked separately — this calculator does not include local buckling.
                </li>
                <li>
                  <strong className="text-t1">Treating FRP as isotropic.</strong> Pultruded FRP is strongly orthotropic: longitudinal (fiber direction) tensile strength is 4–5× the transverse value. Any connection transferring load in the transverse direction (drilled holes, notches, brackets) needs special detailing per ASCE 74-23 Chapter 8.
                </li>
              </ul>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Referenced standards</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li>EN 13706-2: Reinforced plastic composites — Specifications for pultruded profiles — Methods of test and general requirements</li>
                <li>EN 13706-3: Reinforced plastic composites — Pultruded profiles — Specific requirements (E17 and E23 grades)</li>
                <li>ASTM D3917: Standard Specification for Dimensional Tolerance of Thermosetting Glass-Reinforced Plastic Pultruded Shapes</li>
                <li>ASCE/SEI 74-23: Pre-Standard for LRFD of Pultruded FRP Structures</li>
                <li>Eurocomp Design Code and Handbook — Structural Design of Polymer Composites</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <AskAICard
        title="Want the AI to walk you through the inputs?"
        description="Open the FRP Engineering Advisor — describe your span, load, and exposure, and it will recommend a profile, deflection check approach, and standards path."
        prefill={prefillForCalculator({ name: "FRP Profile Calculator", path: "/technology/calculator" })}
      />

      <InnerCTA title="Need engineering support for your FRP profile selection?" />
    </>
  );
}
