import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import { prefillForCalculator } from "@/lib/aiPrefill";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import { getSeoQueryTarget } from "@/content/data/seoQueryTargets";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import ProfileCalculator from "./ProfileCalculator";
import { BeamDeflection } from "@/components/sections/ConceptAnimations";
import Figure from "@/components/ui/Figure";
import EmbedCode from "@/components/tools/EmbedCode";
import ToolCitationBlock from "@/components/tools/ToolCitationBlock";
import RelatedLinks from "@/components/sections/RelatedLinks";

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
      "It is a preliminary global-beam screening tool, not a complete standards compliance calculation. The method selector applies simplified resistance and load factors oriented to ASCE/SEI 74-23 with ASCE 7-22 (including the time-effect factor λ for the selected load duration), CEN/TS 19101:2022 with EN 1990:2023, or GB 50608-2020, plus a legacy ASD screen. EN 13706 grade minimums can be used with the ASCE or CEN screens; GB datasets stay with GB factors. The tool does not perform local or lateral-torsional buckling, creep deflection or creep rupture, web crippling, connections, full load combinations, system stability, or project-specific qualification checks, so a licensed engineer must complete the applicable code design. Australia, New Zealand and Canada have no design standard of their own for pultruded shapes; the methodology page lists the load standards to pair with either screen.",
  },
  {
    question: "Does the calculator handle orthotropic FRP properties?",
    answer:
      "Yes. For every FRP grade the calculator reports the longitudinal modulus E_L (fiber direction), transverse modulus E_T (typically 0.25–0.35 × E_L for E-glass pultruded), in-plane shear modulus G_LT (typically 3–4 GPa), and both tensile and compressive strengths (bending is checked against the lower of the two). Deflection includes a load-case-matched Timoshenko shear correction driven by the E_L / G_LT ratio — typically adding 5–15% at common span-to-depth ratios, and more on very short spans (L/h ≲ 10).",
  },
  {
    question: "How are environmental knockdowns applied?",
    answer:
      "FRP characteristic strengths are multiplied by a screening factor for the service environment: 1.00 indoor dry; 0.85 outdoor exposed, in line with the moisture conversion factor CEN/TS 19101 uses outdoors; 0.75 on strength and 0.90 on stiffness for wet service, the ASCE/SEI 74-23 adjustment for a polyester matrix; 0.75 for mild chemical exposure and 0.70 for 32–60 °C, both F1 screening values that need resin-specific data. ASCE/SEI 74-23 also limits the service temperature to T_g − 22 °C. Metals are unaffected.",
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
            "Preliminary global-beam screening tool for pultruded FRP profiles. It calculates bending, average shear and Timoshenko-corrected deflection using method-specific ASCE-, CEN- or GB-oriented factors, with explicit exclusions and no compliance claim.",
          featureList: [
            "Preliminary strength-factor screens oriented to ASCE/SEI 74-23, CEN/TS 19101:2022 and GB 50608-2020",
            "ASD legacy allowable-stress method (FS 2.5 bending / 3.0 shear)",
            "Orthotropic FRP properties — E_L, E_T, G_LT, F_tL, F_cL, F_vLT",
            "Environmental knockdown factor (indoor, outdoor, wet, chemical, hot), with a stiffness reduction for wet service",
            "ASCE time-effect factor λ by load duration (occupancy, storage, permanent, wind or earthquake)",
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
              text: "Select a preliminary ASCE-, CEN- or GB-oriented screening basis, or the legacy ASD screen. The calculator restricts the material choices to the dataset paired with that method and applies the selected environmental reduction.",
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
              name: "Read the preliminary bending, shear, and deflection screens",
              text: "The calculator returns global bending and average shear demand versus its simplified screening limits, plus Timoshenko-corrected deflection versus L/n. These outputs do not replace a complete code design.",
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
        tag="Tools"
        title="FRP calculator for beam, load and section properties"
        description="Preliminary global-beam screening for pultruded FRP: bending, average shear, Timoshenko-corrected deflection, environmental reductions, and steel or aluminum equivalence. Method-specific datasets prevent incompatible combinations of standards. Free, no login."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Profile calculator" },
        ]}
        actions={{
          primary: { label: "Start the calculator", href: "#profile-calculator" },
          secondary: { label: "Send a profile RFQ", href: quoteHref, variant: "secondary" },
          note: "Run the section check, then carry the shape, load case, environment and destination into the RFQ.",
          stickyMobile: true,
        }}
      />
      <PageNav items={[{ id: "profile-calculator", label: "Calculator" }, { id: "how-to-use", label: "How to use" }, { id: "mistakes", label: "Mistakes to avoid" }, { id: "standards", label: "Standards" }, { id: "embed", label: "Embed and cite" }, { id: "faq", label: "FAQ" }]} />

      <div id="profile-calculator" className="scroll-mt-[40px]">
        <ProfileCalculator />
      </div>

      <PageSection
        id="how-to-use"
        title="How to use the FRP calculator for profile sizing"
        intro="The calculator screens the recurring questions in FRP profile selection: global bending, average shear, service-load deflection and a first-pass steel or aluminum equivalence. The ASCE-, CEN- and GB-oriented options apply a limited subset of factors to compatible input datasets; they are not full implementations of those standards. The ASCE option includes the time-effect factor λ for the chosen load duration. Local and lateral-torsional buckling, creep deflection and creep rupture, web crippling, connections, complete load combinations, bracing and system stability remain outside the model."
        tone="muted"
      >
        <div className="grid gap-[32px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
          <div>
            <Figure number={1} title="Beam deflection" caption="Deflection, not strength, usually governs FRP design. The calculator solves δ, the bending stress and the check against your deflection limit for F1 sections.">
              <BeamDeflection bare />
            </Figure>
            <h3 className="mt-[24px] text-f18 font-bold text-t1">Input example: walkway beam</h3>
            <p className="mt-[8px] text-f16 leading-golden text-t2">
              The Walkway preset loads a 3 m simply supported I-section with a 5 kN/m service UDL. It uses the illustrative balanced-GFRP dataset paired with the ASCE-oriented preliminary factors and outdoor exposure. The result is useful for eliminating clearly inadequate trial sections and seeing whether global strength or deflection governs; it is not an ASCE design release, and the material properties must be replaced with project qualification data.
            </p>
          </div>
          <div>
            <h3 className="text-f18 font-bold text-t1">How to interpret the results</h3>
            <ul className="mt-[12px] space-y-[12px] text-f16 leading-golden text-t2">
              <li>
                <strong className="text-t1">Deflection almost always governs.</strong> FRP E_L is 17–28 GPa, roughly a tenth of steel, so members sized for steel-equivalent strength deflect about ten times more. Check L/240 or L/360 first; if it passes, the bending and shear checks usually pass too. The Timoshenko shear-deflection share (shown below the load summary) matters on short spans because FRP G_LT is only about a sixth of E_L.
              </li>
              <li>
                <strong className="text-t1">The equivalent section is deeper, not heavier.</strong> Replacing a W6×12 (152×76) steel beam at equal stiffness needs roughly ×1.7 on every dimension under geometric scaling (about 265 mm deep) and still lands 25–30% lighter. Practical replacements deepen the web instead of scaling every wall, which is how optimized FRP substitutions reach 40–60% weight savings; the equivalence tab shows the conservative geometric-scaling figure.
              </li>
              <li>
                <strong className="text-t1">Why the allowables look low.</strong> Allowable strength = φ × min(F_tL, F_cL) × Ω_E. Pultruded FRP typically fails on the compression face first, so the lower compressive strength governs bending. The resistance factor (φ_b = 0.65 in ASCE/SEI 74-23, 1/γ_M ≈ 0.67 in CEN/TS 19101, 1/γ_R ≈ 0.63 in GB 50608) covers material and manufacturing variability, and Ω_E (0.70–1.00) adds the long-term environmental knockdown for outdoor, wet, hot or chemical service. Long-term creep and the ASCE 74-23 time-effect factor λ are separate checks. Together these explain why the design allowable is 25–40% of the characteristic strength in the material specification.
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-[24px] max-w-[860px] text-f16 leading-golden text-t2">
          Prefer precomputed numbers? The{" "}
          <Link href="/frp-span-tables" className="font-semibold text-teal-text hover:underline">FRP span tables</Link>{" "}
          publish the allowable uniform load for every standard I-beam, channel and tube over 1–6 m spans on the same design basis, and each row opens here pre-loaded. Once a section passes, the{" "}
          <Link href="/fiberglass-pultruded-profile-price" className="font-semibold text-teal-text hover:underline">price estimator</Link>{" "}
          gives its budgetary USD/meter range, and the{" "}
          <Link href="/products/fiberglass-structural-shapes" className="font-semibold text-teal-text hover:underline">fiberglass structural shapes</Link>{" "}
          catalog lists the sizes to specify.
        </p>
      </PageSection>

      <PageSection id="mistakes" title="Common specification mistakes" tone="white">
        <ul className="grid gap-[12px] md:grid-cols-2">
          {[
            {
              title: "Using steel allowables for FRP",
              body: "FRP must not be designed with AISC 360, Eurocode 3 or GB 50017 steel allowables. Pultruded profiles follow ASCE/SEI 74-23 (US), CEN/TS 19101:2022 (Europe) or GB 50608-2020 with T/CECS 692-2020 (China). All three use their own resistance factors and cap long-term stress at 20–35% of ultimate.",
            },
            {
              title: "Ignoring local buckling",
              body: "Thin-walled FRP sections can buckle locally before they reach the calculated bending capacity. The calculator flags an outstanding-flange b/t advisory (limit about 18 for E-glass pultruded), but a full check to ASCE/SEI 74-23 Ch. 3 or CEN/TS 19101 §6 is still required, and the limit tightens for compression members.",
            },
            {
              title: "Treating FRP as isotropic",
              body: "Pultruded FRP is strongly orthotropic: the longitudinal tensile strength F_tL is four to five times the transverse value, and E_T is only 25–35% of E_L. Connections that load the transverse direction (drilled holes, notches, brackets) need detailing to ASCE/SEI 74-23 Ch. 8 or T/CECS 692-2020 §7.",
            },
            {
              title: "Skipping shear deflection",
              body: "Because G_LT is only about 3 GPa, shear deflection typically adds 5–15% to the mid-span deflection at common span-to-depth ratios, and over 20% on very short spans (L/h ≲ 10). The calculator applies a load-case-matched Timoshenko correction and reports the shear share; pure Euler-Bernoulli (Δ = 5wL⁴/384EI) under-predicts.",
            },
          ].map((item) => (
            <li key={item.title} className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="standards" title="Referenced standards" tone="muted">
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Standard</th>
                <th scope="col" className="px-[14px] py-[8px] font-semibold text-t1">Title and role</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["EN 13706-2/-3:2002", "Reinforced plastic composites, pultruded profiles: general and specific requirements (E17 / E23 minimum-modulus grades)"],
                ["ASTM D3917", "Dimensional tolerance of thermosetting glass-reinforced plastic pultruded shapes"],
                ["ASCE/SEI 74-23", "Load and resistance factor design of pultruded FRP structures (2023, supersedes the 2010 ACMA pre-standard)"],
                ["CEN/TS 19101:2022", "Design of fibre-polymer composite structures (Eurocode-track technical specification preparing prEN 19101)"],
                ["GB 50608-2020", "Technical standard for the engineering application of fiber-reinforced composite materials"],
                ["T/CECS 692-2020", "Technical regulation for structures of pultruded profiles"],
                ["Eurocomp Design Code and Handbook", "Structural design of polymer composites (companion to CEN/TS 19101)"],
              ].map(([code, title]) => (
                <tr key={code} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-[14px] py-[10px] font-semibold text-t1">{code}</th>
                  <td className="px-[14px] py-[10px] leading-golden text-t2">{title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="embed" title="Embed and cite this tool" tone="white">
        <EmbedCode
          toolName="FRP Profile Calculator"
          embedPath="/frp-profile-calculator/embed"
          canonicalPath="/frp-profile-calculator"
          height={840}
          attribution="F1 Composite — Pultruded FRP Profiles Manufacturer"
        />
        <div className="mt-[16px]">
          <ToolCitationBlock
            toolTitle="FRP Profile Engineering Calculator"
            canonicalPath="/frp-profile-calculator"
            bibtexKey="f1composite_frp_calculator_2026"
            medium="Web application"
          />
        </div>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={calculatorFaqs} />
      </PageSection>

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
              { href: "/products/fiberglass-structural-shapes", label: "Fiberglass structural shapes" },
              { href: "/datasheets", label: "Profile datasheets and drawings" },
              { href: "/fiberglass-pultruded-profile-price", label: "Pultruded profile price estimator" },
            ],
          },
          {
            title: "Other tools",
            links: [
              { href: "/tools/profile-finder", label: "Profile finder" },
              { href: "/tools/frp-column-calculator", label: "Column buckling calculator" },
              { href: "/tools/handrail-load-calculator", label: "Handrail load check" },
              { href: "/tools", label: "All engineering tools" },
            ],
          },
        ]}
      />

      <InnerCTA
        title="Need engineering support for your FRP profile selection?"
        quoteHref={quoteHref}
        text="Send the shape and target dimensions, the span and load case, the service environment and standard, and the quantity and destination."
        advisorPrompt={prefillForCalculator({ name: "FRP Profile Calculator", path: "/frp-profile-calculator" })}
      />
    </>
  );
}
