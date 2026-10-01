import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { BEAM_LOAD_CASES, ENV_FACTORS, MARKET_CODES } from "@/lib/frpDesignBasis";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/frp-profile-calculator/methodology";
const publishedAt = "2026-07-30";
const updatedAt = "2026-09-26";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profile Calculator Methodology | F1 Composite",
  description:
    "See the equations, design assumptions, material inputs, load factors, shear correction, standards scope, and limits behind F1 Composite's FRP calculator.",
  path: pagePath,
});

const prose = "max-w-[820px] space-y-[16px] text-f16 leading-golden text-t2";
const link = "font-semibold text-teal-text hover:underline";
const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const tableWrap = "relative overflow-x-auto rounded-card border border-border-default bg-white";
const th = "px-[14px] py-[8px] font-semibold text-t1";
const td = "px-[14px] py-[10px]";

export default function CalculatorMethodologyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "FRP Profile Calculator Methodology",
          description: "Equations, design assumptions, standards scope, and limits behind the F1 Composite FRP profile calculator.",
          url: absoluteUrl(pagePath),
          datePublished: publishedAt,
          dateModified: updatedAt,
          author: { "@type": "Person", name: "Yifan Liu", url: absoluteUrl("/about/authors/yifan-liu") },
          publisher: { "@id": "https://www.f1composite.com/#organization" },
          about: ["Pultruded FRP structural design", "Section properties", "Timoshenko beam theory"],
        }}
      />
      <PageHeader
        tag="Tools"
        title="FRP profile calculator methodology"
        description="A reproducible account of the geometry equations, load cases, resistance factors, shear-deflection correction, material assumptions, standards boundaries and exclusions behind the free calculator."
        updated={updatedAt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "FRP profile calculator", href: "/frp-profile-calculator" },
          { label: "Methodology" },
        ]}
      />

      <PageNav
        items={[
          { id: "sequence", label: "Calculation" },
          { id: "section-properties", label: "Section properties" },
          { id: "load-effects", label: "Load effects" },
          { id: "resistance", label: "Resistance" },
          { id: "standards", label: "Standards" },
          { id: "markets", label: "Codes by market" },
          { id: "limits", label: "Limits" },
        ]}
      />

      <PageSection id="sequence" title="Calculation sequence and units" tone="white">
        <div className="mb-[24px] max-w-[820px] rounded-card border-l-4 border-l-teal bg-bg2 p-[20px] text-f16 leading-golden text-t2">
          <strong className="text-t1">Scope in one sentence:</strong> the tool checks a prismatic pultruded FRP member under one
          idealized load case for strong-axis bending stress, average web shear stress and service deflection; it is a transparent
          preliminary-sizing aid, not a sealed structural design.
        </div>
        <div className={prose}>
          <p>
            Inputs are converted to a consistent N–mm system. The engine first validates the wall geometry, then computes gross
            area A, strong-axis second moment Ix, elastic section modulus Wx, and an effective shear area Av. It applies the
            selected load-case coefficients to service moment and shear, applies the chosen load factor only to strength demand,
            and compares those factored stresses with reduced material resistance. Deflection remains a service-load calculation.
            Keeping strength and serviceability paths separate prevents a load factor from being applied twice.
          </p>
          <p>
            The interactive calculator and the crawlable <Link href="/frp-span-tables" className={link}>FRP span tables</Link>{" "}
            import the same section-property functions. A geometry update therefore changes both outputs together, and the{" "}
            <Link href="/frp-profile-calculator/validation" className={link}>validation benchmarks</Link> are recomputed from
            that shared engine during the site build.
          </p>
        </div>
      </PageSection>

      <PageSection id="section-properties" title="Section-property equations" tone="muted">
        <div className={prose}>
          <p>
            I-beams and channels use the outer rectangle minus the web-side voids: Ix = [B·H³ − (B − tw)·(H − 2tf)³] / 12.
            Rectangular tubes use the outer rectangle minus the concentric inner rectangle. Round tubes use
            Ix = π·(Ro⁴ − Ri⁴) / 4 and A = π·(Ro² − Ri²). Angles are resolved as two non-overlapping rectangles; the centroid
            is found first and the parallel-axis theorem is applied to both legs. Wx equals Ix divided by the farthest
            extreme-fiber distance. For unsymmetrical angles, that distance is measured from the calculated centroid rather than
            assumed to be H/2.
          </p>
          <p>
            These are classical geometry identities, not equations supplied by EN 13706 or ASTM D3917. The tool uses the clear
            web area for I-beam and channel shear, the two side walls between the flanges for a box section (2·(H − 2t)·t),
            half the gross annular area for a round tube, and the vertical leg for an angle. That Av model is intentionally
            simple and is one reason the result remains a preliminary check.
          </p>
        </div>
      </PageSection>

      <PageSection id="load-effects" title="Load effects, stress and deflection" tone="white">
        <div className={tableWrap}>
          <table className="w-full min-w-[720px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={th}>Load case</th>
                <th scope="col" className={th}>Maximum moment</th>
                <th scope="col" className={th}>Bending deflection</th>
                <th scope="col" className={`${th} text-right`}>Shear correction c</th>
              </tr>
            </thead>
            <tbody>
              {BEAM_LOAD_CASES.map((row) => (
                <tr key={row.name} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className={`${td} font-semibold text-t1`}>{row.name}</th>
                  <td className={`${td} font-mono text-t2`}>{row.moment}</td>
                  <td className={`${td} font-mono text-t2`}>{row.deflection}</td>
                  <td className={`${td} text-right tabular-nums text-t2`}>{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[820px] text-f16 leading-golden text-t2">
          Bending stress is M/Wx and the average shear check is V/Av. Total deflection uses a load-case-matched Timoshenko
          correction: δtotal = δbending·[1 + c·E·Ix/(G·Av·L²)]. This matters for pultruded GFRP because longitudinal E and
          in-plane G are very different. The selected L/n criterion is then applied to the service-load deflection. For wet
          service both moduli are reduced by the stiffness factor of that environment (0.90) before the deflection is calculated.
        </p>
      </PageSection>

      <PageSection id="resistance" title="Resistance, load duration and environment" tone="muted">
        <p className="max-w-[820px] text-f16 leading-golden text-t2">
          The design strength is φ · λ · F<sub>k</sub> · C<sub>env</sub>, compared with the factored stress. F<sub>k</sub> is
          min(F<sub>tL</sub>, F<sub>cL</sub>) for bending and the shear strength for shear. On the ASCE path, λ is the time-effect
          factor of the selected load duration (0.8 occupancy live load, 0.6 storage, 0.4 permanent, 1.0 wind or earthquake, from
          the ASCE LRFD Pre-Standard of 2010 on which ASCE/SEI 74-23 builds), and the load factor follows ASCE 7-22 (1.6 live,
          1.4 permanent, 1.0 strength-level wind or earthquake). The CEN path uses γ<sub>M</sub> = 1.5 with the EN 1990:2023
          variable-action factor 1.5 for consequence class CC2; the creep conversion factor for permanent loads is not applied,
          so permanent loads need a separate check. The EN 13706 E17 and E23 datasets use the standard&apos;s minimum modulus,
          tensile strength and interlaminar shear strength (15 and 25 MPa, standing in for the in-plane shear strength that
          EN 13706 does not give); G<sub>LT</sub> and F<sub>cL</sub> are stated assumptions.
        </p>
        <div className={`mt-[20px] ${tableWrap}`}>
          <table className="w-full min-w-[720px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={th}>Environment</th>
                <th scope="col" className={`${th} text-right`}>Strength</th>
                <th scope="col" className={`${th} text-right`}>Stiffness</th>
                <th scope="col" className={th}>Basis</th>
              </tr>
            </thead>
            <tbody>
              {ENV_FACTORS.map((env) => (
                <tr key={env.id} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className={`${td} font-semibold text-t1`}>{env.label}</th>
                  <td className={`${td} text-right tabular-nums text-t2`}>{env.factor.toFixed(2)}</td>
                  <td className={`${td} text-right tabular-nums text-t2`}>{env.stiffness.toFixed(2)}</td>
                  <td className={`${td} text-f12 leading-golden text-t3`}>{env.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection id="standards" title="What each standard contributes" tone="white">
        <ul className="grid gap-[12px] md:grid-cols-2">
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px] text-f14 leading-golden text-t2">
            <h3 className="text-f18 font-bold text-t1">ASCE/SEI 74-23</h3>
            <p className="mt-[8px]">
              A US LRFD framework for structures made with pultruded GFRP shapes, connections and prefabricated products. The
              calculator exposes it as a preliminary flexural and shear resistance path; it does not implement the standard chapter
              by chapter.{" "}
              <a href="https://sp360.asce.org/personifyebusiness/Merchandise/Product-Details/productId/309903818" className={link} {...external}>
                Official ASCE scope
              </a>
            </p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px] text-f14 leading-golden text-t2">
            <h3 className="text-f18 font-bold text-t1">EN 13706</h3>
            <p className="mt-[8px]">
              A product specification series for pultruded profiles: designation, test and general requirements, and specific
              requirements. The E17 and E23 material presets use its grade language; the series is not the source of the beam
              equations.{" "}
              <a href="https://landingpage.bsigroup.com/LandingPage/Series?UPI=BS+EN+13706" className={link} {...external}>
                BSI series record
              </a>
            </p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px] text-f14 leading-golden text-t2">
            <h3 className="text-f18 font-bold text-t1">ASTM D3917-23</h3>
            <p className="mt-[8px]">
              Dimensional tolerances for thermosetting glass-reinforced pultruded shapes. It supports dimensional acceptance, not
              structural resistance or section-property formulas.{" "}
              <a href="https://store.astm.org/standards/d3917" className={link} {...external}>
                Official ASTM record
              </a>
            </p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px] text-f14 leading-golden text-t2">
            <h3 className="text-f18 font-bold text-t1">CEN/TS 19101:2022</h3>
            <p className="mt-[8px]">
              The European technical specification for fibre-polymer composite structures. CEN has agreed to turn it into a
              Eurocode, expected by 2028; until then a project has to adopt it explicitly. Its actions come from EN 1990, now in
              its second generation (EN 1990:2023), where the partial factors are 1.35 k<sub>F</sub> and 1.5 k<sub>F</sub> with
              k<sub>F</sub> = 1.0 for consequence class CC2.
            </p>
          </li>
          <li className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px] text-f14 leading-golden text-t2 md:col-span-2">
            <h3 className="text-f18 font-bold text-t1">GB 50608-2020 and T/CECS 692-2020</h3>
            <p className="mt-[8px]">
              The Chinese design path. The interface keeps each method&apos;s load and resistance factors together, so a user does
              not silently mix one code family&apos;s demand factors with another family&apos;s resistance factors.
            </p>
          </li>
        </ul>
      </PageSection>

      <PageSection
        id="markets"
        title="Codes by market"
        intro="Loads always come from the code adopted where the structure is built. Only the United States and Europe have a design document for pultruded FRP shapes; elsewhere the engineer adopts one of them as the resistance model and justifies it to the authority having jurisdiction."
        tone="muted"
      >
        <div className={tableWrap}>
          <table className="w-full min-w-[820px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                <th scope="col" className={th}>Market</th>
                <th scope="col" className={th}>Loads and main combinations</th>
                <th scope="col" className={th}>Pultruded FRP design</th>
                <th scope="col" className={th}>Related documents</th>
              </tr>
            </thead>
            <tbody>
              {MARKET_CODES.map((row) => (
                <tr key={row.market} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className={`${td} font-semibold text-t1`}>{row.market}</th>
                  <td className={`${td} text-t2`}>{row.loads}</td>
                  <td className={`${td} text-t2`}>{row.design}</td>
                  <td className={`${td} text-f12 leading-golden text-t3`}>{row.related}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[16px] max-w-[820px] text-f16 leading-golden text-t2">
          The calculator&apos;s ASCE option applies 1.6 to live load, which is conservative against the 1.5 used by AS/NZS 1170.0
          and the NBC. Use the CEN option for European and UK projects.
        </p>
      </PageSection>

      <PageSection id="limits" title="Boundaries and required engineering review" tone="white">
        <div className={prose}>
          <p>
            The tool does not complete lateral-torsional buckling, local plate buckling, web crippling, bearing, connection,
            fatigue, fire, creep deflection, creep rupture, vibration, combined axial and flexural loading, biaxial bending,
            principal-axis angle design, continuous beams, frames, or second-order effects. Environmental factors are screening
            inputs, not project-specific durability predictions. Catalog dimensions also require tolerance review before final
            capacity is accepted.
          </p>
          <p>
            Use the result to compare candidate shapes, reproduce assumptions and prepare an RFQ. A qualified engineer must
            establish governing loads, combinations, restraint, code edition, material qualification, connection details and
            final limit states for the actual project.
          </p>
        </div>
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "Run and verify", links: [
            { href: "/frp-profile-calculator", label: "Open the FRP profile calculator" },
            { href: "/frp-profile-calculator/validation", label: "Review validation benchmarks" },
            { href: "/frp-span-tables", label: "Compare published span tables" },
          ] },
          { title: "Specify and source", links: [
            { href: "/products/fiberglass-structural-shapes", label: "Fiberglass structural shapes" },
            { href: "/datasheets", label: "Profile datasheets and drawings" },
            { href: "/fiberglass-pultruded-profile-price", label: "Estimate profile price" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the member and loads for a checked section"
        quoteHref="/contact?source=calculator-methodology&inquiry_type=technical"
        text="Send the span, loads, support conditions and design code with the candidate section."
      />
    </>
  );
}
