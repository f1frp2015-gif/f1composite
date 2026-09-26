import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import RelatedLinks from "@/components/sections/RelatedLinks";
import HandrailLoadCalculator from "@/components/tools/HandrailLoadCalculator";
import { GUARD_LOAD_CASES } from "@/lib/guardrailLoads";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools/handrail-load-calculator";
const pageDescription =
  "Check FRP handrail posts and rails against OSHA 1910.29, IBC 2024 and EN ISO 14122-3 loads, or enter AS/NZS 1170.1, NBC or UK values. Free, no login.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Handrail & Guardrail Load Calculator",
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Which guardrail loads does the calculator use?",
    answer:
      "OSHA 1910.29: 200 lb (0.89 kN) outward or downward at the top rail. IBC 2024 with ASCE 7-22: 50 lb/ft (0.73 kN/m) or 200 lb, not together, and 20 lb/ft in non-public industrial areas with fewer than 50 occupants. EN ISO 14122-3: 300 N/m multiplied by the post spacing with 30 mm maximum deflection. For UK buildings, Canada, Australia and New Zealand you enter the value from the named clause, because it depends on the occupancy category.",
  },
  {
    question: "Why can a rail meet OSHA and still exceed the screen?",
    answer:
      "OSHA asks the system to withstand 200 lb without failure, which is usually shown by testing the assembled rail. The screen applies design factors on top: a load factor of 1.6, a resistance factor of 0.65, the time-effect factor 0.8 and the outdoor knockdown. The result panel shows both: the utilisation with design factors, and the characteristic capacity without them. Use a larger post, a closer spacing or test evidence when the screen is exceeded.",
  },
  {
    question: "What does the calculation leave out?",
    answer:
      "The base plate, anchors and substrate, the fittings and splices, local buckling of thin walls, and the stiffness of the connections. Posts are treated as fully fixed, so a real rail deflects more. The base reactions are given so the anchors and the supporting steel or concrete can be designed.",
  },
  {
    question: "Which height and post spacing should I use?",
    answer:
      "OSHA sets the top edge at 42 in ± 3 in, the IBC at 42 in minimum and EN ISO 14122-3 at 1,100 mm minimum with posts no more than 1,500 mm apart. The F1 catalog handrail systems list a 1,500 mm maximum post spacing and a 1,220 mm maximum height; the project drawing sets both for the rule that applies.",
  },
];

export default function HandrailLoadCalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "FRP Handrail and Guardrail Load Calculator",
          url: absoluteUrl(pagePath),
          description: pageDescription,
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          publisher: { "@id": "https://www.f1composite.com/#organization" },
        }}
      />
      <PageHeader
        tag="Tools"
        title="FRP handrail and guardrail load check"
        description="Pick the rule for the site, the post and rail tubes and the spacing. The check returns the post and rail utilisation, the top-rail deflection and the base reactions for the anchors."
        facts={[
          { label: "Load rules", value: String(GUARD_LOAD_CASES.length) },
          { label: "Markets", value: "US, EU, UK, CA, AU, NZ" },
          { label: "Post model", value: "Fixed-base cantilever" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Handrail load check" }]}
      />

      <section className="bg-white py-[40px]">
        <div className="site-container">
          <HandrailLoadCalculator />
        </div>
      </section>

      <section className="bg-bg2 py-[48px]">
        <div className="site-container">
          <h2 className="text-f24 font-bold text-t1">How the check works</h2>
          <div className="mt-[13px] grid gap-[21px] text-f14 text-t2 md:grid-cols-3">
            <p>
              <strong className="text-t1">Post.</strong> The larger of the line load times the post spacing and the
              concentrated load acts at the top rail. The post is a cantilever fixed at its base, so the base moment is
              that force times the rail height.
            </p>
            <p>
              <strong className="text-t1">Rail.</strong> The top rail spans simply between posts under the line load
              (wL²/8) or a concentrated load at mid-span (PL/4). Continuous rails do better, so this is conservative.
            </p>
            <p>
              <strong className="text-t1">Strength and deflection.</strong> Stresses use the same section properties,
              material data and design factors as the{" "}
              <Link href="/frp-profile-calculator" className="font-semibold text-teal-text underline">FRP profile calculator</Link>, and deflection includes the
              shear term that FRP needs.
            </p>
          </div>
          <p className="mt-[21px] max-w-[860px] text-f14 text-t2">
            The requirements behind the load rules are compared in the{" "}
            <Link href="/resources/blog/frp-handrail-guardrail-requirements-osha-ibc-iso-14122" className="font-semibold text-teal-text underline">guardrail requirements guide</Link>. Post and rail tubes are listed with the{" "}
            <Link href="/products/frp-handrail-systems" className="font-semibold text-teal-text underline">FRP handrail systems</Link>.
          </p>
          <FAQ items={faqs} />
        </div>
      </section>

      <RelatedLinks
        groups={[
          { title: "Access systems", links: [
            { href: "/products/frp-handrail-systems", label: "FRP handrail systems" },
            { href: "/products/frp-ladders", label: "FRP fixed ladders" },
            { href: "/products/frp-stair-treads", label: "FRP stair treads" },
          ] },
          { title: "Other tools", links: [
            { href: "/tools/access-geometry-checker", label: "Ladder, stair and walkway checker" },
            { href: "/tools/thermal-expansion-calculator", label: "Thermal expansion calculator" },
            { href: "/frp-profile-calculator", label: "FRP profile calculator" },
          ] },
          { title: "Guides", links: [
            { href: "/resources/blog/frp-handrail-guardrail-requirements-osha-ibc-iso-14122", label: "Guardrail requirements: OSHA, IBC and ISO 14122-3" },
            { href: "/resources/blog/how-to-install-frp-handrail", label: "How to install FRP handrail" },
            { href: "/frp-profile-calculator/methodology", label: "Calculator methodology" },
          ] },
        ]}
      />
    </>
  );
}
