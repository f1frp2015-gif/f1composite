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
import AccessGeometryChecker from "@/components/tools/AccessGeometryChecker";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const pagePath = "/tools/access-geometry-checker";
const pageDescription =
  "Check ladder, stair and walkway dimensions against OSHA 1910, EN ISO 14122, AS 1657 and IBC 2024: rung spacing, clear width, fall protection, risers, openings.";

export const metadata: Metadata = buildPageMetadata({
  title: "Ladder, Stair & Walkway Checker | OSHA, ISO 14122",
  description: pageDescription,
  path: pagePath,
});

const faqs = [
  {
    question: "Which rules does the checker cover?",
    answer:
      "Fixed ladders to OSHA 1910.23 and 1910.28(b)(9), EN ISO 14122-4 or AS 1657:2018; stairs to OSHA 1910.25 (standard and ship stairs), EN ISO 14122-3, AS 1657:2018 or IBC 2024 §1011; walkways to EN ISO 14122-2, with the ASCE 7-22 and OSHA floor-load references for the grating. The AS 1657 limits come from state-regulator and designer summaries of the standard, and the ladder cage height is left as advice because those summaries disagree. Canadian provincial rules are named but not encoded, so check their limits on the drawing.",
  },
  {
    question: "Do cages still count as fall protection on US fixed ladders?",
    answer:
      "Only on existing ladders. A fixed ladder more than 24 ft above the lower level that was installed on or after 19 November 2018 needs a ladder safety system or a personal fall arrest system. Existing cages remain acceptable until the ladder or cage is replaced and until 18 November 2036. OSHA proposed in April 2026 to remove the 2036 date; until a final rule is published, plan for it.",
  },
  {
    question: "Why does one ladder design rarely fit both the US and Europe?",
    answer:
      "OSHA spaces rungs 10 to 14 in apart and requires at least 16 in clear width, while EN ISO 14122-4 uses a 225–300 mm rung pitch and a 400–600 mm clear width, and it still accepts a cage above a 3 m fall height where OSHA does not for new ladders. State the destination rule on the drawing before the side rails are cut.",
  },
  {
    question: "How is the grating opening checked?",
    answer:
      "EN ISO 14122-2 does not let a 35 mm ball pass through the walking surface, or a 20 mm ball where people or workstations are below. For a square-mesh molded grating the clear opening is the mesh pitch minus the top bar width, about 32 mm for the 38.1 mm mesh. Where the smaller ball applies, a solid top or cover plate closes the openings.",
  },
];

export default function AccessGeometryCheckerPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Ladder, Stair and Walkway Checker",
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
        title="Ladder, stair and walkway checker"
        description="Enter the dimensions of a fixed ladder, a stair or a walkway and see each requirement of the chosen rule, with its clause, before the FRP ladder, stair treads or grating are detailed."
        facts={[
          { label: "Ladders", value: "OSHA · EN ISO 14122-4 · AS 1657" },
          { label: "Stairs", value: "OSHA · EN ISO 14122-3 · AS 1657 · IBC" },
          { label: "Walkways", value: "EN ISO 14122-2" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Ladder, stair and walkway checker" }]}
      />

      <PageNav items={[{ id: "tool", label: "Checker" }, { id: "before-detailing", label: "Before detailing" }, { id: "faq", label: "FAQ" }]} />

      <ToolSection label="Ladder, stair and walkway checker">
        <AccessGeometryChecker />
      </ToolSection>

      <PageSection id="before-detailing" title="Before you detail an FRP access system" tone="muted">
        <p className="max-w-[860px] text-f16 leading-golden text-t2">
          Geometry is only one part. The fall protection concept, the loads on rungs, treads and grating, the fixings and
          the substrate are designed for the same rule. The{" "}
          <Link href="/resources/blog/fixed-ladder-requirements-osha-iso-14122-4" className="font-semibold text-teal-text hover:underline">fixed ladder requirements guide</Link>{" "}
          explains the OSHA timeline and the EN ISO 14122-4 cage rules, and the{" "}
          <Link href="/tools/handrail-load-calculator" className="font-semibold text-teal-text hover:underline">handrail load check</Link>{" "}
          covers the guardrails at platform edges and stairs.
        </p>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="white">
        <FAQList items={faqs} />
      </PageSection>

      <RelatedLinks
        background="bg2"
        groups={[
          { title: "Products", links: [
            { href: "/products/frp-ladders", label: "FRP fixed ladders" },
            { href: "/products/frp-stair-treads", label: "FRP stair treads" },
            { href: "/products/grating", label: "Fiberglass grating" },
          ] },
          { title: "Other tools", links: [
            { href: "/tools/handrail-load-calculator", label: "Handrail and guardrail load check" },
            { href: "/frp-span-tables", label: "FRP span tables" },
            { href: "/tools", label: "All engineering tools" },
          ] },
          { title: "Guides", links: [
            { href: "/resources/blog/fixed-ladder-requirements-osha-iso-14122-4", label: "Fixed ladder requirements: OSHA and ISO 14122-4" },
            { href: "/resources/blog/frp-handrail-guardrail-requirements-osha-ibc-iso-14122", label: "Guardrail requirements: OSHA, IBC and ISO 14122-3" },
            { href: "/resources/blog/how-to-install-frp-grating", label: "How to install FRP grating" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the access layout with your RFQ"
        quoteHref="/contact?source=tool-access-geometry&inquiry_type=rfq"
        text="Send the ladder heights, stair runs or walkway lengths, the rule that applies and the fixing substrate."
      />
    </>
  );
}
