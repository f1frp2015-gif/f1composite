import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import AskAICard from "@/components/ai/AskAICard";
import { prefillForCalculator } from "@/lib/aiPrefill";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import ProfileCalculator from "./ProfileCalculator";
import { BeamDeflection } from "@/components/sections/ConceptAnimations";
import EmbedCode from "@/components/tools/EmbedCode";
import RelatedLinks from "@/components/sections/RelatedLinks";

// publishedAt = the LRFD/ASD + CN/EU/US-standards rewrite that produced the
// current feature set (git: "Rewrite FRP profile calculator with LRFD/ASD
// and CN/EU/US standards", 2026-05-16). Bump updatedAt by hand alongside
// real calculator changes — it's a freshness signal, so it must track
// actual edits, not just get stamped on every deploy.
const publishedAt = "2026-05-16";
const updatedAt = "2026-07-30";
const pagePath = "/frp-profile-calculator";
const seoTarget = getSeoQueryTarget(pagePath);

export const metadata: Metadata = buildPageMetadata({
  title: seoTarget.title,
  description: seoTarget.description,
  path: pagePath,
});

const calculatorFaqs = [
  {
    question: "Is this FRP profile calculator free?",
    answer:
      "Yes. The FRP profile calculator is fully free, runs in your browser without login or sign-up, and is available worldwide. F1 Composite publishes it as an engineering reference for specifiers selecting pultruded FRP profiles.",
  },
  {
    question: "Which standards does the FRP calculator follow?",
    answer:
      "The calculator supports four design frameworks: LRFD per ASCE/SEI 74-23 (US official FRP standard, published 2023 — superseding the 2010 ACMA Pre-Standard); the partial-factor method per CEN/TS 19101:2022 (the Eurocode-track Technical Specification for FRP structures); LRFD per GB 50608-2020 (China FRP application code) together with T/CECS 692-2020 for pultruded profiles; and legacy ASD using a 2.5 bending / 3.0 shear factor of safety. Load factors use each code's variable-action value (γ_Q = 1.6 / 1.5 / 1.5) since the tool's scenarios are live-load governed. Material specifications include EN 13706-3 (E17/E23 minimum-modulus grades) and ASTM D3917 (dimensional tolerance).",
  },
  {
    question: "Does the calculator handle orthotropic FRP properties?",
    answer:
      "Yes. For every FRP grade the calculator reports the longitudinal modulus E_L (fiber direction), transverse modulus E_T (typically 0.25–0.35 × E_L for E-glass pultruded), in-plane shear modulus G_LT (typically 3–4 GPa), and both tensile and compressive strengths (bending is checked against the lower of the two). Deflection includes a load-case-matched Timoshenko shear correction driven by the E_L / G_LT ratio — typically adding 5–15% at common span-to-depth ratios, and more on very short spans (L/h ≲ 10).",
  },
  {
    question: "How are environmental knockdowns applied?",
    answer:
      "FRP characteristic strengths are multiplied by an environmental factor selected from the dropdown: 1.00 indoor dry, 0.85 outdoor exposed (UV + humidity), 0.80 wet / immersion, 0.75 mild chemical exposure (per T/CECS 692-2020 Annex), and 0.70 elevated temperature 30–60°C (approaching glass transition per ASCE/SEI 74-23 §3.5.4). Metals are unaffected. For acid resistance class selection, see T/CECS 692-2020 Annex.",
  },
  {
    question: "Can I use this calculator for vinyl ester, polyurethane, or phenolic FRP profiles?",
    answer:
      "The EN 13706 E17/E23 and GB 50608 Class I/II material properties reflect E-glass / polyester pultruded profiles. Vinyl ester and polyurethane FRP have similar modulus and slightly different strength; phenolic FRP has lower modulus and significantly better fire performance. For non-default resin systems, contact F1 Composite engineering for project-specific characteristic values.",
  },
  {
    question: "Does this calculator handle local buckling, lateral-torsional buckling, and connections?",
    answer:
      "Not as full design checks. The calculator flags a wall-slenderness advisory per shape — outstanding flanges and angle legs at b/t > 18, box flat widths and tube D/t at > 40 (E-glass pultruded typical) — prompting a dedicated local-buckling review per ASCE/SEI 74-23 Ch.3 or CEN/TS 19101 §6. Lateral-torsional buckling, web crippling, single-angle principal-axis bending, long-term creep, and bolted/bonded connection design (ASCE/SEI 74-23 Ch.8) are out of scope — these need a dedicated tool such as PulCalc 3.x or project-specific engineering. F1 Composite engineering supports these checks on request.",
  },
  {
    question: "Why does FRP need a deeper section than steel for the same deflection?",
    answer:
      "FRP elastic modulus is 17–28 GPa versus steel's 200 GPa — about 1/8 to 1/10 of steel. To match steel's deflection, the FRP section needs roughly 8–10× the second moment of area, achieved by going deeper (stiffness scales with depth cubed). The FRP replacement is still lighter because FRP density is 1.9 g/cm³ versus 7.85 g/cm³ for steel: ~25–30% lighter under uniform geometric scaling (the calculator's conservative figure), and 40–60% lighter when the section goes deeper rather than uniformly larger.",
  },
];

export default function CalculatorPage() {
  const quoteHref = `/contact?${new URLSearchParams({
    source: "profile-calculator-header",
    inquiry_type: "rfq",
    message:
      "I need an FRP structural profile quotation. Shape and target dimensions: [...]. Span/load case: [...]. Service environment and required standard: [...]. Quantity and destination: [...].",
  }).toString()}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Profile Engineering Calculator",
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Web",
          url: absoluteUrl("/frp-profile-calculator"),
          browserRequirements: "Requires JavaScript. Requires HTML5.",
          inLanguage: "en",
          isAccessibleForFree: true,
          description:
            "Structural calculator for pultruded FRP profiles with LRFD and ASD support. Aligned to EN 13706, GB 50608-2020 / T/CECS 692-2020, ASCE/SEI 74-23, and CEN/TS 19101:2022. Bending, shear, Timoshenko-corrected deflection, orthotropic E_L/E_T/G_LT properties, environmental knockdown, and steel/aluminum equivalence.",
          featureList: [
            "LRFD design method — ASCE/SEI 74-23, CEN/TS 19101:2022, GB 50608-2020",
            "ASD legacy allowable-stress method (FS 2.5 bending / 3.0 shear)",
            "Orthotropic FRP properties — E_L, E_T, G_LT, F_tL, F_cL, F_vLT",
            "Environmental knockdown factor — indoor / outdoor / wet / chemical / hot",
            "Bending stress check with resistance factor vs min(F_tL, F_cL)",
            "Shear stress check (V / A_web)",
            "Load-case-matched Timoshenko deflection (bending + shear)",
            "Wall-slenderness local-buckling advisory (flange b/t, box flat, tube D/t)",
            "Simply supported, cantilever, UDL, point load support",
            "FRP-to-steel and FRP-to-aluminum equivalent section finder",
            "Weight comparison across materials",
            "Interactive 3D cross-section preview with dimension callouts and 2D drawing view",
          ],
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          creator: { "@id": "https://www.f1composite.com/#organization" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to size a pultruded FRP profile with the F1 Composite calculator",
          description:
            "Check bending, shear, and Timoshenko-corrected deflection of a pultruded FRP beam, or find the FRP section that replaces a steel or aluminum member at equal stiffness.",
          totalTime: "PT3M",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Pick a design framework and environment",
              text: "Select LRFD (ASCE/SEI 74-23, CEN/TS 19101:2022, or GB 50608-2020) or legacy ASD, and the service environment, so the calculator applies the right resistance factor and FRP environmental knockdown.",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Enter span, load, and section",
              text: "Enter the span, the service load (UDL or point), and the FRP grade and cross-section (I-beam, channel, angle, square tube, or round tube) — or load a quick-start preset.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Read the bending, shear, and deflection checks",
              text: "The calculator returns factored bending and shear stress versus allowable, plus Timoshenko-corrected deflection versus the L/n limit. Deflection usually governs for FRP.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Match an F1 profile and request a quote",
              text: "Use the closest-standard-size suggestion and matching product link, then email the result to F1 Composite engineering for a quote against your spec.",
            },
          ],
        }}
      />
      <PageHeader
        tag="Free Engineering Tool"
        title="Free FRP Profile Calculator"
        description="LRFD and ASD design checks for pultruded FRP — bending, shear, Timoshenko-corrected deflection, orthotropic E_L/E_T/G_LT, environmental knockdown, and steel/aluminum equivalence. Switch between EN 13706, GB 50608-2020 / T/CECS 692-2020, ASCE/SEI 74-23, and CEN/TS 19101:2022. Free, no login."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "FRP Profile Calculator" },
        ]}
        actions={{
          primary: { label: "Start Calculator", href: "#profile-calculator" },
          secondary: { label: "Send Profile RFQ", href: quoteHref, variant: "secondary" },
          note: "Run the section check, then carry the shape, load case, environment, and destination into the RFQ.",
          stickyMobile: true,
        }}
      />
      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName="Yifan Liu"
        authorRole="Senior Application Engineer — pultruded FRP structural design"
        authorHref="/about/authors/yifan-liu"
        reviewedBy="Yifan Liu, Application Engineer"
        standards={["ASCE/SEI 74-23", "CEN/TS 19101:2022", "GB 50608-2020", "EN 13706-3", "ASTM D3917"]}
      />

      <section className="bg-white pt-[34px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <BeamDeflection />
        </div>
      </section>

      <div id="profile-calculator" className="scroll-mt-[88px]">
        <ProfileCalculator />
      </div>

      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="text-f24 font-bold text-t1 md:text-f31">
            How to use the FRP profile calculator
          </h2>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Prefer precomputed numbers? The{" "}
            <Link href="/frp-span-tables" className="text-teal-text hover:underline">FRP span tables</Link>{" "}
            publish the allowable uniform load for every standard I-beam, channel, and tube over 1–6 m
            spans on the same design basis — each row opens here pre-loaded for verification.
            And once a section passes, the{" "}
            <Link href="/fiberglass-pultruded-profile-price" className="text-teal-text hover:underline">
              pultruded profile price estimator
            </Link>{" "}
            gives you its budgetary USD/meter range before you send the RFQ. Compare the passing section with our{" "}
            <Link href="/products/standard-profiles" className="text-teal-text hover:underline">
              fiberglass structural shapes
            </Link>{" "}
            catalog before specifying the final size.
          </p>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            This calculator solves three recurring questions in FRP structural selection: whether a pultruded FRP beam satisfies bending and shear at factored load, whether deflection at service load meets the L/n limit (including the Timoshenko shear correction that matters for short-span FRP beams), and what cross-section is needed to replace a steel or aluminum member at equal stiffness or equal strength — whichever governs. Select the design framework (ASCE/SEI 74-23 LRFD, CEN/TS 19101:2022 partial-factor, GB 50608-2020 LRFD, or legacy ASD) and an environmental class; the calculator applies the appropriate resistance factor and FRP environmental knockdown to characteristic strengths.
          </p>

          <div className="mt-[55px] grid gap-[34px] lg:grid-cols-2">
            <div>
              <h3 className="text-f19 font-bold text-t1">Input example — walkway beam</h3>
              <p className="mt-[13px] text-f15 leading-golden text-t2">
                A pedestrian walkway requires a 3 m simply-supported FRP beam carrying 5 kN/m service UDL (live-load governed). With LRFD ASCE/SEI 74-23 (γ_Q = 1.6, φ_b = 0.65) and outdoor exposure (Ω_E = 0.85), an EN 13706 E23 I-beam 240×120×12 (I ≈ 4.75×10⁷ mm⁴) returns factored bending stress near 23 MPa vs ~110 MPa allowable (min(F_tL, F_cL) = 200 MPa × 0.65 × 0.85), and service deflection near 5.4 mm = L/550 with a Timoshenko shear contribution of ~13% — within the L/360 walkway limit per IBC 1604.3 / GB 50352. Comfortable margin on strength, deflection-governed as expected — this is the calculator&apos;s Walkway preset, so you can reproduce it in one click.
              </p>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">How to interpret the results</h3>
              <ul className="mt-[13px] space-y-[13px] text-f15 leading-golden text-t2">
                <li>
                  <strong className="text-t1">Deflection almost always governs.</strong> FRP E_L is 17–28 GPa — roughly 1/10 of steel. Members sized for steel-equivalent strength deflect about 10× more. Check L/240 or L/360 first; if it passes, the bending and shear checks usually pass too. The Timoshenko shear-deflection share (shown below the load summary) is non-trivial for short-span beams because FRP G_LT is only ~1/6 of E_L.
                </li>
                <li>
                  <strong className="text-t1">Equivalent section is deeper, not heavier.</strong> Replacing a W6×12 (152×76) steel beam at equal stiffness needs roughly ×1.7 on every dimension under geometric scaling (≈ 265 mm deep) and still lands ~25–30% lighter. Practical replacements deepen the web instead of scaling every wall, which is how optimized FRP substitutions reach 40–60% weight savings — the equivalence tab shows the conservative geometric-scaling figure.
                </li>
                <li>
                  <strong className="text-t1">Why allowables look low.</strong> Allowable strength = φ × min(F_tL, F_cL) × Ω_E — pultruded FRP typically fails on the compression face first, so the lower compressive strength governs bending. The resistance factor (φ_b = 0.65 in ASCE/SEI 74-23, 1/γ_M ≈ 0.67 in CEN/TS 19101, 1/γ_R ≈ 0.63 in GB 50608) covers material and manufacturing variability; Ω_E (0.70–1.00) adds long-term environmental knockdown for outdoor/wet/hot/chemical service. Long-term creep and the ASCE 74-23 time-effect factor λ are separate checks the calculator does not model. Together these explain why the design allowable is 25–40% of the characteristic strength reported by the material spec.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-f19 font-bold text-t1">Common specification mistakes</h3>
              <ul className="mt-[13px] space-y-[13px] text-f15 leading-golden text-t2">
                <li>
                  <strong className="text-t1">Using steel allowables for FRP.</strong> FRP must never be designed using AISC 360, Eurocode 3, or GB 50017 steel allowables. Pultruded profiles follow ASCE/SEI 74-23 (US), CEN/TS 19101:2022 (Europe), or GB 50608-2020 with T/CECS 692-2020 (China). All three use distinctly different resistance factors and explicitly cap long-term stress at 20–35% of ultimate.
                </li>
                <li>
                  <strong className="text-t1">Ignoring local buckling.</strong> Thin-walled FRP sections can buckle locally before reaching calculated bending capacity. The calculator flags an outstanding-flange b/t advisory (limit ≈ 18 for E-glass pultruded), but a full check per ASCE/SEI 74-23 Ch.3 or CEN/TS 19101 §6 is still required — for compression-governed members the limit tightens further.
                </li>
                <li>
                  <strong className="text-t1">Treating FRP as isotropic.</strong> Pultruded FRP is strongly orthotropic: longitudinal tensile strength (F_tL) is 4–5× the transverse value, and E_T is only 25–35% of E_L. Connections that load in the transverse direction (drilled holes, notches, brackets) need special detailing per ASCE/SEI 74-23 Ch.8 or T/CECS 692-2020 §7.
                </li>
                <li>
                  <strong className="text-t1">Skipping shear deflection.</strong> Because G_LT is only ~3 GPa, FRP shear deflection typically contributes 5–15% of total mid-span deflection at common span-to-depth ratios — and over 20% on very short spans (L/h ≲ 10). The calculator applies a load-case-matched Timoshenko correction on the shear area automatically and reports the shear share — pure Euler-Bernoulli (Δ = 5wL⁴/384EI) under-predicts.
                </li>
              </ul>

              <h3 className="mt-[34px] text-f19 font-bold text-t1">Referenced standards</h3>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                <li><strong>EN 13706-2/-3:2002</strong> — Reinforced plastic composites — Pultruded profiles — General requirements and Specific requirements (E17 / E23 minimum-modulus grades)</li>
                <li><strong>ASTM D3917</strong> — Standard Specification for Dimensional Tolerance of Thermosetting Glass-Reinforced Plastic Pultruded Shapes</li>
                <li><strong>ASCE/SEI 74-23</strong> — Standard for the Load and Resistance Factor Design of Pultruded Fiber Reinforced Polymer Structures (2023, supersedes the 2010 ACMA Pre-Standard)</li>
                <li><strong>CEN/TS 19101:2022</strong> — Design of fibre-polymer composite structures (Eurocode-track Technical Specification preparing prEN 19101)</li>
                <li><strong>GB 50608-2020</strong> — Technical Standard for the Engineering Application of Fiber-Reinforced Composite Materials</li>
                <li><strong>T/CECS 692-2020</strong> — Technical Regulation for Structures of Pultruded Profiles</li>
                <li><strong>Eurocomp Design Code and Handbook</strong> — Structural Design of Polymer Composites (companion to CEN/TS 19101)</li>
              </ul>
            </div>
          </div>

          <FAQ items={calculatorFaqs} />
        </div>
      </section>

      <RelatedLinks
        background="white"
        groups={[
          {
            title: "Calculation record",
            links: [
              { href: "/frp-profile-calculator/methodology", label: "Calculator methodology and equations" },
              { href: "/frp-profile-calculator/validation", label: "Reproducible validation benchmarks" },
              { href: "/frp-span-tables", label: "FRP span tables and load charts" },
            ],
          },
          {
            title: "From result to specification",
            links: [
              { href: "/products/standard-profiles", label: "Fiberglass structural shapes" },
              { href: "/datasheets", label: "Profile datasheets and drawings" },
              { href: "/fiberglass-pultruded-profile-price", label: "Pultruded profile price estimator" },
            ],
          },
        ]}
      />

      <section className="bg-white pb-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <EmbedCode
            toolName="FRP Profile Calculator"
            embedPath="/frp-profile-calculator/embed"
            canonicalPath="/frp-profile-calculator"
            height={840}
            attribution="F1 Composite — Pultruded FRP Profiles Manufacturer"
          />
        </div>
      </section>

      <AskAICard
        title="Want the AI to walk you through the inputs?"
        description="Open the FRP Engineering Advisor — describe your span, load, and exposure, and it will recommend a profile, deflection check approach, and standards path."
        prefill={prefillForCalculator({ name: "FRP Profile Calculator", path: "/frp-profile-calculator" })}
      />

      <InnerCTA title="Need engineering support for your FRP profile selection?" />
    </>
  );
}
