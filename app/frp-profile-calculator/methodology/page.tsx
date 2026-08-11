import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/frp-profile-calculator/methodology";
const publishedAt = "2026-07-30";
const updatedAt = "2026-07-30";

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
        <div className="mx-auto max-w-[960px] px-[34px] text-f15 leading-golden text-t2">
          <div className="rounded-[8px] border-l-4 border-teal bg-bg2 p-[21px]">
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
            the web area for I-beam/channel shear, two longitudinal walls for a box section, half gross annular area
            for a round tube, and the vertical leg for an angle. That Av model is intentionally simple and is one
            reason the result remains a preliminary check.
          </p>

          <h2 className="mt-[55px] text-f24 font-bold text-t1">3. Load effects, stress, and deflection</h2>
          <div className="mt-[21px] overflow-x-auto rounded-[8px] border border-border-default">
            <table className="w-full min-w-[720px] border-collapse text-f13">
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
            service-load deflection.
          </p>

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
              <strong className="text-t1">CEN/TS 19101:2022, GB 50608-2020, and T/CECS 692-2020</strong> provide
              alternative regional design paths and application context. The interface keeps their load/resistance
              choices visible so users do not silently mix one region’s demand factors with another region’s
              material assumptions.
            </li>
          </ul>

          <h2 className="mt-[55px] text-f24 font-bold text-t1">5. Boundaries and required engineering review</h2>
          <p className="mt-[13px]">
            The tool does not complete lateral-torsional buckling, local plate buckling, web crippling, bearing,
            connection, fatigue, fire, creep rupture, sustained-load time effects, vibration, combined axial and
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
