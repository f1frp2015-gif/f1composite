import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { ENV_FACTORS } from "@/lib/frpDesignBasis";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const MARKET_CODES = [
  { market: "United States", loads: "ASCE 7-22 through the IBC: 1.4D; 1.2D + 1.6L", design: "ASCE/SEI 74-23 (LRFD for pultruded GFRP shapes and connections)", related: "OSHA 29 CFR 1910 Subpart D for workplace access; ASTM D3917 dimensional tolerances" },
  { market: "European Union", loads: "EN 1990:2023 and EN 1991: 1.35·k_F·G; 1.5·k_F·Q (k_F = 1.0 for CC2), national annexes", design: "CEN/TS 19101:2022, Eurocode expected by 2028", related: "EN 13706 product specification; EN ISO 14122 for machinery access" },
  { market: "United Kingdom", loads: "BS EN 1990 and BS EN 1991 with UK National Annexes", design: "PD CEN/TS 19101:2022", related: "BS EN 13706; BS EN ISO 14122 for machinery access" },
  { market: "Canada", loads: "NBC Part 4 (NBC 2020; NBC 2025 published December 2025 and adopted by each province): 1.4D; 1.25D + 1.5L", design: "No standard specific to pultruded shapes; CSA S806 covers FRP in buildings, mainly as reinforcement and strengthening", related: "CSA S6:25 for bridges; CSA S807 for FRP bars" },
  { market: "Australia", loads: "AS/NZS 1170.0 and 1170.1: 1.35G; 1.2G + 1.5Q", design: "No Australian standard for pultruded shapes; published Australian design guides use the ASCE LRFD approach with AS/NZS 1170 loads", related: "AS 1657:2018 for platforms, walkways, stairs and ladders; AS 5204:2023 for FRP bars" },
  { market: "New Zealand", loads: "AS/NZS 1170.0 and 1170.1 through NZBC B1: 1.35G; 1.2G + 1.5Q", design: "No New Zealand standard for pultruded shapes; the resistance model is agreed with the building consent authority", related: "NZBC D1 and F4 for access routes and barriers" },
] as const;

const pagePath = "/frp-profile-calculator/methodology";
const publishedAt = "2026-07-30";
const updatedAt = "2026-09-26";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Profile Calculator Methodology | F1 Composite",
  description:
    "See the equations, design assumptions, material inputs, load factors, shear correction, standards scope, and limits behind F1 Composite's FRP calculator.",
  path: pagePath,
});

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
        tag="Calculation White Paper"
        title="FRP Profile Calculator Methodology"
        description="A reproducible account of the geometry equations, load cases, resistance factors, shear-deflection correction, material assumptions, standards boundaries, and exclusions behind the free calculator."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FRP Profile Calculator", href: "/frp-profile-calculator" },
          { label: "Methodology" },
        ]}
      />

      <article className="bg-white py-[55px]">
        <div className="mx-auto max-w-[960px] px-[34px] text-f16 leading-golden text-t2">
          <div className="rounded-card border-l-4 border-teal bg-bg2 p-[21px]">
            <p>
              <strong className="text-t1">Scope in one sentence:</strong> the tool checks a prismatic pultruded FRP
              member under one idealized load case for strong-axis bending stress, average web shear stress, and
              service deflection; it is a transparent preliminary-sizing aid, not a sealed structural design.
            </p>
          </div>

          <h2 className="mt-[55px] text-f24 font-bold text-t1">1. Calculation sequence and units</h2>
          <p className="mt-[13px]">
            Inputs are converted to a consistent N–mm system. The engine first validates the wall geometry, then
            computes gross area A, strong-axis second moment Ix, elastic section modulus Wx, and an effective shear
            area Av. It applies the selected load-case coefficients to service moment and shear, applies the chosen
            load factor only to strength demand, and compares those factored stresses with reduced material
            resistance. Deflection remains a service-load calculation. Keeping strength and serviceability paths
            separate prevents a load factor from being applied twice.
          </p>
          <p className="mt-[13px]">
            The interactive calculator and the crawlable <Link href="/frp-span-tables" className="text-teal-text hover:underline">FRP span tables</Link>{" "}
            import the same section-property functions. A geometry update therefore changes both outputs together,
            and the <Link href="/frp-profile-calculator/validation" className="text-teal-text hover:underline">validation benchmarks</Link>{" "}
            are recomputed from that shared engine during the site build.
          </p>

          <h2 className="mt-[55px] text-f24 font-bold text-t1">2. Section-property equations</h2>
          <p className="mt-[13px]">
            I-beams and channels use the outer rectangle minus the web-side voids: Ix = [B·H³ − (B − tw)·(H −
            2tf)³] / 12. Rectangular tubes use the outer rectangle minus the concentric inner rectangle. Round tubes
            use Ix = π·(Ro⁴ − Ri⁴) / 4 and A = π·(Ro² − Ri²). Angles are resolved as two non-overlapping rectangles;
            the centroid is found first and the parallel-axis theorem is applied to both legs. Wx equals Ix divided
            by the farthest extreme-fiber distance. For unsymmetrical angles, that distance is measured from the
            calculated centroid rather than assumed to be H/2.
          </p>
          <p className="mt-[13px]">
            These are classical geometry identities, not equations supplied by EN 13706 or ASTM D3917. The tool uses
            the clear web area for I-beam/channel shear, the two side walls between the flanges for a box section
            (2·(H − 2t)·t), half the gross annular area for a round tube, and the vertical leg for an angle. That Av model is intentionally simple and is one
            reason the result remains a preliminary check.
          </p>

          <h2 className="mt-[55px] text-f24 font-bold text-t1">3. Load effects, stress, and deflection</h2>
          <div className="mt-[21px] overflow-x-auto rounded-card border border-border-default">
            <table className="w-full min-w-[720px] border-collapse text-f14">
              <thead className="bg-bg2 text-left text-t1">
                <tr><th className="p-[13px]">Load case</th><th className="p-[13px]">Maximum moment</th><th className="p-[13px]">Bending deflection</th><th className="p-[13px]">Shear correction coefficient c</th></tr>
              </thead>
              <tbody>
                <tr className="border-t border-border-default"><td className="p-[13px]">Simple span, UDL</td><td className="p-[13px]">wL²/8</td><td className="p-[13px]">5wL⁴/(384EIx)</td><td className="p-[13px]">9.6</td></tr>
                <tr className="border-t border-border-default"><td className="p-[13px]">Simple span, mid-point load</td><td className="p-[13px]">PL/4</td><td className="p-[13px]">PL³/(48EIx)</td><td className="p-[13px]">12</td></tr>
                <tr className="border-t border-border-default"><td className="p-[13px]">Cantilever, tip load</td><td className="p-[13px]">PL</td><td className="p-[13px]">PL³/(3EIx)</td><td className="p-[13px]">3</td></tr>
                <tr className="border-t border-border-default"><td className="p-[13px]">Cantilever, UDL</td><td className="p-[13px]">wL²/2</td><td className="p-[13px]">wL⁴/(8EIx)</td><td className="p-[13px]">4</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-[13px]">
            Bending stress is M/Wx and the average shear check is V/Av. Total deflection uses a load-case-matched
            Timoshenko correction: δtotal = δbending·[1 + c·E·Ix/(G·Av·L²)]. This matters for pultruded GFRP because
            longitudinal E and in-plane G are very different. The selected L/n criterion is then applied to the
            service-load deflection. For wet service both moduli are reduced by the stiffness factor of that
            environment (0.90) before the deflection is calculated.
          </p>

          <h2 className="mt-[55px] text-f24 font-bold text-t1">3a. Resistance, load duration and environment</h2>
          <p className="mt-[13px]">
            The design strength is φ · λ · F<sub>k</sub> · C<sub>env</sub>, compared with the factored stress. F<sub>k</sub> is
            min(F<sub>tL</sub>, F<sub>cL</sub>) for bending and the shear strength for shear. On the ASCE path, λ is the
            time-effect factor of the selected load duration (0.8 occupancy live load, 0.6 storage, 0.4 permanent,
            1.0 wind or earthquake, from the ASCE LRFD Pre-Standard of 2010 on which ASCE/SEI 74-23 builds), and
            the load factor follows ASCE 7-22 (1.6 live, 1.4 permanent, 1.0 strength-level wind or earthquake).
            The CEN path uses γ<sub>M</sub> = 1.5 with the EN 1990:2023 variable-action factor 1.5 for consequence class
            CC2; the creep conversion factor for permanent loads is not applied, so permanent loads need a separate
            check. The EN 13706 E17 and E23 datasets use the standard&apos;s minimum modulus, tensile strength and
            interlaminar shear strength (15 and 25 MPa, standing in for the in-plane shear strength that EN 13706
            does not give); G<sub>LT</sub> and F<sub>cL</sub> are stated assumptions.
          </p>
          <div className="mt-[21px] overflow-x-auto rounded-card border border-border-default">
            <table className="w-full min-w-[720px] border-collapse text-f14">
              <thead className="bg-bg2 text-left text-t1">
                <tr><th className="p-[13px]">Environment</th><th className="p-[13px]">Strength</th><th className="p-[13px]">Stiffness</th><th className="p-[13px]">Basis</th></tr>
              </thead>
              <tbody>
                {ENV_FACTORS.map((env) => (
                  <tr key={env.id} className="border-t border-border-default"><td className="p-[13px]">{env.label}</td><td className="p-[13px]">{env.factor.toFixed(2)}</td><td className="p-[13px]">{env.stiffness.toFixed(2)}</td><td className="p-[13px] text-f12">{env.note}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-[55px] text-f24 font-bold text-t1">4. What each standard contributes</h2>
          <ul className="mt-[13px] space-y-[13px]">
            <li>
              <strong className="text-t1">ASCE/SEI 74-23</strong> supplies a US LRFD framework for structures made
              with pultruded GFRP shapes, connections, and prefabricated products. The calculator exposes this as a
              preliminary flexural/shear resistance path; it does not implement the standard chapter by chapter. See
              the <a href="https://sp360.asce.org/personifyebusiness/Merchandise/Product-Details/productId/309903818" target="_blank" rel="noopener noreferrer" className="text-teal-text hover:underline">official ASCE scope</a>.
            </li>
            <li>
              <strong className="text-t1">EN 13706</strong> is a pultruded-profile product specification series:
              designation, test/general requirements, and specific requirements. E17/E23 material presets use its
              grade language; the series is not presented here as the source of the beam equations. See the
              <a href="https://landingpage.bsigroup.com/LandingPage/Series?UPI=BS+EN+13706" target="_blank" rel="noopener noreferrer" className="ml-[4px] text-teal-text hover:underline">BSI series record</a>.
            </li>
            <li>
              <strong className="text-t1">ASTM D3917-23</strong> covers dimensional tolerances for thermosetting
              glass-reinforced pultruded shapes. It supports dimensional acceptance, not structural resistance or
              section-property formulas. See the <a href="https://store.astm.org/standards/d3917" target="_blank" rel="noopener noreferrer" className="text-teal-text hover:underline">official ASTM record</a>.
            </li>
            <li>
              <strong className="text-t1">CEN/TS 19101:2022</strong> is the European technical specification for
              fibre-polymer composite structures. CEN has agreed to turn it into a Eurocode, expected by 2028; until
              then it is a technical specification that a project has to adopt explicitly. Its actions come from
              EN 1990, now in its second generation (EN 1990:2023), where the partial factors are 1.35 k<sub>F</sub> and
              1.5 k<sub>F</sub> with k<sub>F</sub> = 1.0 for consequence class CC2.
            </li>
            <li>
              <strong className="text-t1">GB 50608-2020 and T/CECS 692-2020</strong> provide the Chinese design path.
              The interface keeps each method&apos;s load and resistance factors together so users do not silently mix one
              code family&apos;s demand factors with another family&apos;s resistance factors.
            </li>
          </ul>

          <h2 className="mt-[55px] text-f24 font-bold text-t1">4a. Codes by market</h2>
          <p className="mt-[13px]">
            Loads always come from the code adopted where the structure is built. Only the United States and Europe
            have a design document for pultruded FRP shapes; elsewhere the engineer adopts one of them as the
            resistance model and justifies it to the authority having jurisdiction.
          </p>
          <div className="mt-[21px] overflow-x-auto rounded-card border border-border-default">
            <table className="w-full min-w-[820px] border-collapse text-f14">
              <thead className="bg-bg2 text-left text-t1">
                <tr><th className="p-[13px]">Market</th><th className="p-[13px]">Loads and main combinations</th><th className="p-[13px]">Pultruded FRP design</th><th className="p-[13px]">Related documents</th></tr>
              </thead>
              <tbody>
                {MARKET_CODES.map((row) => (
                  <tr key={row.market} className="border-t border-border-default align-top">
                    <td className="p-[13px] font-semibold text-t1">{row.market}</td>
                    <td className="p-[13px]">{row.loads}</td>
                    <td className="p-[13px]">{row.design}</td>
                    <td className="p-[13px] text-f12">{row.related}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-[13px]">
            The calculator&apos;s ASCE option applies 1.6 to live load, which is conservative against the 1.5 used by
            AS/NZS 1170.0 and the NBC. Use the CEN option for European and UK projects.
          </p>

          <h2 className="mt-[55px] text-f24 font-bold text-t1">5. Boundaries and required engineering review</h2>
          <p className="mt-[13px]">
            The tool does not complete lateral-torsional buckling, local plate buckling, web crippling, bearing,
            connection, fatigue, fire, creep deflection, creep rupture, vibration, combined axial and
            flexural loading, biaxial bending, principal-axis angle design, continuous beams, frames, or second-order
            effects. Environmental factors are screening inputs, not project-specific durability predictions.
            Catalog dimensions also require tolerance review before final capacity is accepted.
          </p>
          <p className="mt-[13px]">
            Use the result to compare candidate shapes, reproduce assumptions, and prepare an RFQ. A qualified
            engineer must establish governing loads, combinations, restraint, code edition, material qualification,
            connection details, and final limit states for the actual project.
          </p>
        </div>
      </article>

      <RelatedLinks
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
    </>
  );
}
