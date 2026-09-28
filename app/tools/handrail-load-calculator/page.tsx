import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { FAQList } from "@/components/ui/FAQ";
import RelatedLinks from "@/components/sections/RelatedLinks";
import HandrailLoadCalculator from "@/components/tools/HandrailLoadCalculator";
import { GUARD_LOAD_CASES } from "@/lib/guardrailLoads";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools/handrail-load-calculator";
const pageDescription =
  "Check FRP handrail posts and rails against OSHA 1910.29, IBC 2024, EN ISO 14122-3, BS 6180, NBC 2020 and AS 1657 guard loads, with base reactions for anchors.";

export const metadata: Metadata = buildPageMetadata({
  title: "FRP Handrail & Guardrail Load Calculator",
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Which guardrail loads does the calculator use?",
    answer:
      "OSHA 1910.29: 200 lb (0.89 kN) outward or downward at the top rail. IBC 2024 with ASCE 7-22: 50 lb/ft (0.73 kN/m) or 200 lb, not together, and 20 lb/ft in non-public industrial areas with fewer than 50 occupants. EN ISO 14122-3: 300 N/m multiplied by the post spacing with 30 mm maximum deflection. UK buildings: 0.74 kN/m in industrial and storage areas and 0.36 kN/m on light industrial routes (BS 6180 and the UK National Annex). Canada, NBC 4.1.5.14: 1.0 kN at any point on access to equipment platforms, otherwise 0.75 kN/m or 1.0 kN. Australia, AS 1657:2018: 0.35 kN/m or 0.6 kN with 100 mm maximum deflection; AS/NZS 1170.1 work areas in Australia and New Zealand: 0.75 kN/m or 0.6 kN. The UK, Canadian and Australian values were checked against published summaries rather than the code text, so confirm the row in your copy; for other occupancies you enter the value from the named clause.",
  },
  {
    question: "Why can a rail meet OSHA and still exceed the screen?",
    answer:
      "OSHA asks the system to withstand 200 lb without failure, which is usually shown by testing the assembled rail. The screen applies design factors on top: a load factor of 1.6, a resistance factor of 0.65, the time-effect factor 0.8 and the outdoor knockdown. The result panel shows both: the utilization with design factors, and the characteristic capacity without them. Use a larger post, a closer spacing or test evidence when the screen is exceeded.",
  },
  {
    question: "What does the calculation leave out?",
    answer:
      "The base plate, anchors and substrate, the fittings and splices, local buckling of thin walls, and the stiffness of the connections. Posts are treated as fully fixed, so a real rail deflects more. The base reactions are given so the anchors and the supporting steel or concrete can be designed.",
  },
  {
    question: "Which height and post spacing should I use?",
    answer:
      "OSHA sets the top edge at 42 in ± 3 in, the IBC at 42 in minimum, EN ISO 14122-3 at 1,100 mm minimum with posts no more than 1,500 mm apart, and AS 1657 at 900 to 1,100 mm. The F1 catalog handrail systems list a 1,500 mm maximum post spacing and a 1,220 mm maximum height; the project drawing sets both for the rule that applies.",
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
        description="Pick the rule for the site, the post and rail tubes and the spacing. The check returns the post and rail utilization, the top-rail deflection and the base reactions for the anchors."
        facts={[
          { label: "Load rules", value: String(GUARD_LOAD_CASES.length) },
          { label: "Markets", value: "US, EU, UK, CA, AU, NZ" },
          { label: "Post model", value: "Fixed-base cantilever" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Handrail load check" }]}
      />

      <PageNav items={[{ id: "tool", label: "Load check" }, { id: "method", label: "How it works" }, { id: "faq", label: "FAQ" }]} />

      <ToolSection label="Handrail and guardrail load check">
        <HandrailLoadCalculator />
      </ToolSection>

      <PageSection id="method" title="How the check works" tone="muted">
        <ol className="grid gap-[12px] md:grid-cols-3">
          {[
            {
              title: "Post",
              body: "The larger of the line load times the post spacing and the concentrated load acts at the top rail. The post is a cantilever fixed at its base, so the base moment is that force times the rail height.",
            },
            {
              title: "Rail",
              body: "The top rail spans simply between posts under the line load (wL²/8) or a concentrated load at mid-span (PL/4). Continuous rails do better, so this is conservative.",
            },
            {
              title: "Strength and deflection",
              body: "Stresses use the same section properties, material data and design factors as the FRP profile calculator, and deflection includes the shear term that FRP needs.",
            },
          ].map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-[16px] max-w-[860px] text-f14 leading-golden text-t2">
          The requirements behind the load rules are compared in the{" "}
          <Link href="/resources/blog/frp-handrail-guardrail-requirements-osha-ibc-iso-14122" className="font-semibold text-teal-text hover:underline">guardrail requirements guide</Link>. Post and rail tubes are listed with the{" "}
          <Link href="/products/frp-handrail-systems" className="font-semibold text-teal-text hover:underline">FRP handrail systems</Link>, and the design factors are set out in the{" "}
          <Link href="/frp-profile-calculator/methodology" className="font-semibold text-teal-text hover:underline">calculator methodology</Link>.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="bg2"
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
      <InnerCTA
        title="Send the handrail layout with your RFQ"
        quoteHref="/contact?source=tool-handrail-load&inquiry_type=rfq"
        text="Send the run lengths, post spacing, load rule and the substrate the base plates fix to."
      />
    </>
  );
}
