import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import EmbedCode from "@/components/tools/EmbedCode";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import PassiveHouseWizard from "./PassiveHouseWizard";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    // Drop the "AI Tools" intermediate — there is no /ai hub page, so it had
    // no `item` URL and GSC flagged "Missing field item in itemListElement".
    // Last item may omit `item` per schema.org spec.
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "AI Passive House Window Selector" },
  ],
};

export const metadata: Metadata = buildPageMetadata({
  title: "AI Passive House Window Selector — PHIUS FRP Tool",
  description:
    "Free AI tool for Passive House windows: match climate, target U-value, and opening type to PHI-certified FRP frame series, calculators, and case studies.",
  path: "/ai/passive-house",
});

export default function PassiveHousePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Passive House Window Selector — F1 Composite",
    url: absoluteUrl("/ai/passive-house"),
    description:
      "Free AI-powered passive house fenestration selector — matches PHI climate class, target U-value, and building typology to F1 Composite PHI-certified FRP window series. No login required.",
    applicationCategory: "EngineeringApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: { "@id": "https://www.f1composite.com/#organization" },
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[900px] px-[21px]">
          <div className="text-center">
            <span className="inline-block rounded-full bg-teal-bg px-[13px] py-[5px] text-f11 font-bold uppercase tracking-[2px] text-teal-text">
              Free · PHI Component-ID 2491wi03 · Class A+ / phA · No Login
            </span>
            <h1 className="mt-[13px] text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
              AI Passive House Window Selector
              <br />
              <span className="text-teal-text">Match climate and U-value targets to an FRP frame.</span>
            </h1>
            <p className="mt-[16px] mx-auto text-f15 leading-golden text-t2">
              Passive House fenestration has strict thermal, acoustic, airtightness, and climate
              requirements. Answer four questions and this free AI tool will match the project to
              an appropriate F1 Composite FRP frame series, explain the role of PHI Component-ID
              2491wi03, and reference relevant calculation resources and delivered projects.
            </p>
          </div>

          <section className="mt-[34px] rounded-[10px] border border-border-default bg-bg2 p-[21px] md:p-[29px]">
            <h2 className="text-f24 font-bold text-t1">
              Match Passive House climate, opening type, and target U-value
            </h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              A frame series cannot be selected from U-value alone. Climate class changes the
              interior-surface-temperature requirement; opening type changes reinforcement,
              hardware, air seals, and practical sash dimensions; the glazing and spacer determine
              how much of the whole-window thermal target remains for the frame. Project quantity,
              certification route, fabrication model, and destination also affect the recommendation.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The AI Passive House window selector organizes those early inputs before a detailed
              EN ISO 10077 calculation or project-specific review. It is useful for architects,
              facade consultants, window fabricators, energy modelers, and procurement teams
              comparing frame depths and certification evidence at concept or tender stage.
            </p>
          </section>

          <PassiveHouseWizard />

          <section className="mt-[55px]">
            <h2 className="text-f24 font-bold text-t1">How the AI Passive House selector works</h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The tool converts four project inputs into a structured prompt for F1 Composite&rsquo;s
              engineering advisor. The response explains the likely series fit and the evidence
              that should be confirmed before specification.
            </p>
            <div className="mt-[21px] grid gap-[16px] md:grid-cols-3">
              {[
                {
                  title: "1. Define the thermal context",
                  body: "Choose the PHI climate class and target whole-window U-value so the recommendation starts from the correct performance envelope rather than a generic frame claim.",
                },
                {
                  title: "2. Add the opening configuration",
                  body: "Select casement, tilt-turn, sliding, or fixed facade. The selector uses the configuration to narrow the practical 65, 70, 80, 90, or 140 series range.",
                },
                {
                  title: "3. Review evidence and next steps",
                  body: "Receive a series recommendation, certification context, comparable project, and a path to U-value calculation, drawings, fabrication review, and quotation.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                  <h3 className="text-f15 font-bold text-t1">{item.title}</h3>
                  <p className="mt-[8px] text-f13 leading-golden text-t2">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-[55px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
            <h2 className="text-f24 font-bold text-t1">
              Why FRP instead of thermally broken aluminum for passive house?
            </h2>
            <div className="mt-[13px] grid gap-[13px] sm:grid-cols-2">
              <div>
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                  Thermal bridging
                </div>
                <p className="mt-[4px] text-f13 leading-golden text-t2">
                  FRP has no metallic path. Pultruded GFRP thermal conductivity ≈ 0.3 W/m·K vs steel
                  52, aluminum 160. No &ldquo;thermal break insert&rdquo; to fail at cold.
                </p>
              </div>
              <div>
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                  PHI Arctic certification
                </div>
                <p className="mt-[4px] text-f13 leading-golden text-t2">
                  Our 90-series is certified by Passive House Institute Darmstadt at phA (arctic)
                  climate class — the ceiling of the standard. Deployed at{" "}
                  <Link href="/case-studies/qinling-station-antarctic-passive-windows" className="font-semibold text-teal-text hover:underline">
                    Qinling Station, Antarctic Ross Sea
                  </Link>
                  .
                </p>
              </div>
              <div>
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                  No repainting
                </div>
                <p className="mt-[4px] text-f13 leading-golden text-t2">
                  Pigment is in-profile, not applied. UV-stable across a 25+ year service life in
                  coastal and high-altitude exposure.
                </p>
              </div>
              <div>
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">
                  Coastal durability
                </div>
                <p className="mt-[4px] text-f13 leading-golden text-t2">
                  Salt-air corrosion-free. Validated at{" "}
                  <Link href="/case-studies/yancheng-talent-apartment-fenestration" className="font-semibold text-teal-text hover:underline">
                    Yancheng Talent Apartment
                  </Link>{" "}
                  (Jiangsu coast, ~20 buildings).
                </p>
              </div>
            </div>
          </div>

          <section className="mt-[55px]">
            <h2 className="text-f24 font-bold text-t1">Selection methodology and technical references</h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The selector uses climate class, opening type, target U-value, and project scale as
              screening inputs. It does not calculate a certified whole-window value by itself.
              Whole-window performance depends on frame U-value, glazing U-value, spacer linear
              transmittance, frame and glass areas, and the exact test or reference dimensions.
              Those terms should be checked using the EN ISO 10077-1 method and confirmed for the
              proposed glass build, spacer, sash, hardware, and installation interface.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              PHI Component-ID 2491wi03 supports the certified 90-series configuration; it does not
              automatically certify every project size or glazing combination. Use the certificate
              and published data as evidence for the matching build, then document any variation
              through the project&rsquo;s energy model, window schedule, supplier calculation, and
              required certification process.
            </p>
            <div className="mt-[21px] grid gap-[10px] sm:grid-cols-2">
              <Link href="/technology/frp-u-value-calculator" className="rounded-[7px] border border-border-default p-[13px] font-semibold text-teal-text hover:border-teal">
                Calculate whole-window U-value to EN ISO 10077-1 →
              </Link>
              <Link href="/resources/blog/en-iso-10077-window-u-value-calculation" className="rounded-[7px] border border-border-default p-[13px] font-semibold text-teal-text hover:border-teal">
                Read the U-value calculation methodology →
              </Link>
              <Link href="/technology/polyurethane-pultrusion-windows" className="rounded-[7px] border border-border-default p-[13px] font-semibold text-teal-text hover:border-teal">
                Review GFRP-PU window technology →
              </Link>
              <Link href="/resources/blog/passive-house-window-u-value-requirements" className="rounded-[7px] border border-border-default p-[13px] font-semibold text-teal-text hover:border-teal">
                Compare Passive House U-value requirements →
              </Link>
            </div>
          </section>

          <section className="mt-[55px] rounded-[10px] border border-border-default bg-bg2 p-[21px] md:p-[29px]">
            <h2 className="text-f24 font-bold text-t1">
              Inputs to verify before accepting a frame-series recommendation
            </h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The selector can only be as specific as the project information supplied. Before a
              series is placed on the window schedule, confirm the following inputs and record the
              source of each value so the architect, energy modeler, fabricator, and supplier are
              working from the same basis.
            </p>
            <ul className="mt-[21px] grid gap-[13px] sm:grid-cols-2">
              <li className="rounded-[7px] border border-border-default bg-white p-[16px] text-f13 leading-golden text-t2">
                <strong className="text-t1">Climate and certification route:</strong> identify PHI,
                PHIUS, local energy code, project-specific modeling, and the required climate or
                performance class instead of treating the programs as interchangeable.
              </li>
              <li className="rounded-[7px] border border-border-default bg-white p-[16px] text-f13 leading-golden text-t2">
                <strong className="text-t1">Reference size and opening type:</strong> document the
                tested or calculated window dimensions, sash configuration, frame fraction,
                mullions, transoms, reinforcement, hardware, and allowable operating size.
              </li>
              <li className="rounded-[7px] border border-border-default bg-white p-[16px] text-f13 leading-golden text-t2">
                <strong className="text-t1">Glazing and spacer:</strong> record Ug, pane build,
                coatings, gas fill, spacer linear transmittance, edge conditions, and the supplier
                data used in the whole-window calculation.
              </li>
              <li className="rounded-[7px] border border-border-default bg-white p-[16px] text-f13 leading-golden text-t2">
                <strong className="text-t1">Installation interface:</strong> review rough opening,
                anchors, support blocks, membranes, insulation continuity, sill drainage, and the
                linear thermal bridge between frame and wall construction.
              </li>
              <li className="rounded-[7px] border border-border-default bg-white p-[16px] text-f13 leading-golden text-t2">
                <strong className="text-t1">Non-thermal performance:</strong> confirm structural
                wind pressure, water penetration, air leakage, acoustic target, security, fire,
                durability, condensation, hardware cycling, and local fenestration standards.
              </li>
              <li className="rounded-[7px] border border-border-default bg-white p-[16px] text-f13 leading-golden text-t2">
                <strong className="text-t1">Supply and fabrication model:</strong> state whether
                the project needs finished windows or pultruded lineals, who fabricates and glazes,
                quantity, colors, quality plan, certification labels, packing, and destination.
              </li>
            </ul>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              When these inputs are not yet fixed, keep the recommendation conditional. A useful
              concept-stage result may say that the 90 series is the likely baseline subject to an
              exact Uw calculation, opening-size check, installation detail, and certificate-scope
              review. That is more defensible than presenting one nominal frame value as the
              performance of every finished window.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              After the AI returns a candidate, compare it with the published 65, 70, 80, 90, and
              140 series rather than treating the first result as the only option. Request section
              drawings, frame and sash dimensions, reinforcement limits, glazing range, hardware
              compatibility, drainage details, available finishes, and the exact certificate pages
              that support the proposed build. Run at least one representative window through the
              U-value calculator, then repeat the check for unusually small, large, subdivided, or
              operable units because frame fraction and linear edges can change the result. Record
              the accepted configuration in the window schedule so later substitutions are reviewed
              against the same thermal, structural, airtightness, and certification basis.
            </p>
          </section>

          <section className="mt-[55px] border-t border-border-default pt-[34px]">
            <h2 className="text-f24 font-bold text-t1">What this AI tool can and cannot decide</h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The AI tool can narrow the series range, explain why climate and opening type matter,
              locate relevant certification and case-study evidence, and prepare the questions for
              a supplier review. It cannot replace a certified U-value calculation, structural and
              hardware verification, condensation analysis, airtightness detailing, local code
              review, or approval by the project&rsquo;s responsible professional.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              Treat the output as an auditable selection brief: verify every stated input, retain
              the calculation record, confirm the exact frame and glazing build, and request the
              drawings, certificate scope, test reports, lead time, packing, and commercial terms
              that apply to the project.
            </p>
          </section>

          <div className="mt-[21px] flex flex-wrap gap-[21px]">
            <Link href="/products/fenestration-systems" className="text-f13 font-semibold text-teal-text hover:underline">
              → FRP windows and doors (65–140 series)
            </Link>
            <Link href="/technology/frp-u-value-calculator" className="text-f13 font-semibold text-teal-text hover:underline">
              → U-Value calculator (EN ISO 10077-1)
            </Link>
            <Link href="/regions/frp-passive-house-windows-canada" className="text-f13 font-semibold text-teal-text hover:underline">
              → FRP passive house windows for Canada
            </Link>
            <Link href="/regions/frp-pultrusion-supplier-usa" className="text-f13 font-semibold text-teal-text hover:underline">
              → Sourcing FRP for US projects
            </Link>
            <Link href="/what-is-frp" className="text-f13 font-semibold text-teal-text hover:underline">
              → What is FRP? Material guide
            </Link>
            <Link href="/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf" className="text-f13 font-semibold text-teal-text hover:underline" target="_blank" rel="noopener noreferrer">
              → Download PHI certificate (PDF)
            </Link>
          </div>

          <div className="mt-[55px]">
            <EmbedCode
              toolName="AI Passive House Window Selector"
              embedPath="/ai/passive-house/embed"
              canonicalPath="/ai/passive-house"
              height={760}
              attribution="F1 Composite — Pultruded FRP Window Frames Manufacturer"
            />
          </div>
        </div>
      </section>
    </>
  );
}
