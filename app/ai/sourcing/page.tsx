import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import ToolSection from "@/components/layout/ToolSection";
import RelatedLinks from "@/components/sections/RelatedLinks";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { supplyTerms } from "@/content/data/company";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import SourcingWizard from "./SourcingWizard";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Tools", item: absoluteUrl("/tools") },
    { "@type": "ListItem", position: 3, name: "FRP sourcing assistant" },
  ],
};

export const metadata: Metadata = buildPageMetadata({
  title: "AI FRP Sourcing Assistant — Free Project Specification",
  description:
    "Use the free AI FRP sourcing assistant to match profiles, resin systems, standards and case studies to your project, then send the result as a quote request.",
  path: "/ai/sourcing",
});

const intentExamples = [
  {
    label: "Coastal walkway in marine environment",
    prompt:
      "I need to specify FRP for a 200 m coastal walkway at a saltwater marina on the UK coast. It will carry pedestrians and light service vehicles. I need a slip-resistant surface, a 25-year design life, and minimal maintenance. Please recommend a profile family, resin system, surface treatment, and relevant case studies.",
  },
  {
    label: "Chemical plant access platform",
    prompt:
      "A petrochemical plant in Saudi Arabia needs replacement access platforms. The existing galvanized steel corroded under acid splash and ambient temperatures above 50°C. We need structural beams, grating, and handrails. Please recommend an FRP grade and resin system, explain which test data to request, and outline the quotation process.",
  },
  {
    label: "Passivhaus residential window",
    prompt:
      "I am specifying windows for a Passivhaus-certified residential project in Germany. The project needs a U_w of 0.8 W/m²K or less, casement and tilt-and-turn configurations, and more than 40 units. Which FRP series fits, which PHI certification do you hold, and what is the typical lead time for delivery to Germany?",
  },
  {
    label: "Solar farm mounting structure",
    prompt:
      "I am evaluating a 50 MW solar installation in Australia that needs lightweight, UV-stable mounting profiles. Aluminum is currently specified, but we are considering FRP to reduce foundation costs. How much lighter is FRP than 6063 aluminum, which cross-section do you recommend, and how does FRP perform after 25 years of UV exposure?",
  },
  {
    label: "Custom profile, low quantity",
    prompt:
      "I need a custom pultruded cross-section approximately 80 × 40 mm with a 4 mm wall for cable management in a corrosive industrial environment. The first order will be about 500 m, with possible repeat orders. What are the tooling cost, lead time, and minimum economical order quantity?",
  },
];

const steps = [
  { title: "Describe the application", text: "Give the service environment, loads, geometry, required standards, order volume, destination and project stage. More detail gives a more useful answer." },
  { title: "The assistant organizes the options", text: "It returns a profile family and resin recommendation, the relevant standards, the documents to request and similar work from F1 Composite's product knowledge." },
  { title: "Hand off for review", text: "Send the structured result to sales for pricing, or to engineering for a drawing, span, connection, tolerance or compliance review before ordering." },
];

const evaluates = [
  { title: "Profile family and geometry", text: "It tells stock structural shapes, gratings, window systems and custom pultrusions apart, then names the dimensions and load information still needed for selection." },
  { title: "Resin and service environment", text: "It relates general-purpose polyester, vinyl ester, polyurethane, epoxy and fire-retardant options to corrosion, temperature, UV, electrical and fire exposure." },
  { title: "Standards and evidence", text: "It surfaces EN 13706, ASTM D3917, fire, slip, fenestration or project standards and points to test reports, certificates and comparable case studies." },
  { title: "Quote-ready commercial inputs", text: "It lists the drawings, quantities, lengths, tolerances, finish, inspection, Incoterms, destination and schedule details that affect tooling, production, packing and landed cost." },
];

const projects = [
  { title: "Walkways, platforms and bridge components", text: "State the clear span, support condition, pedestrian or vehicle loads, deflection limit, slip requirement, environment and design code. The answer can connect beams, channels, gratings, handrails and deck panels while leaving final sizing to the engineer." },
  { title: "Chemical and wastewater facilities", text: "List the chemicals, concentration, splash or immersion, temperature, cleaning regime, fire requirement and expected service life. The answer can tell polyester from vinyl ester or specialty systems and name the evidence to request." },
  { title: "Passive House and high-performance windows", text: "Give the climate, opening type, dimensions, glazing, spacer, target whole-window U-value, certification route, quantity and destination. The assistant can narrow the frame series and link the certificate and the thermal calculation." },
  { title: "Solar mounting and lightweight structures", text: "Include the module geometry, wind and snow criteria, support spacing, roof or ground interface, UV and temperature exposure, grounding, target life and installation constraints. The answer can organize section options for engineering review." },
  { title: "Custom pultruded profiles", text: "Attach or describe the cross-section, tolerance, material, glass architecture, finish, drilling or cutting, annual volume, first order, tooling ownership and schedule. The assistant can flag manufacturability questions before tooling." },
  { title: "Regional import and DDP sourcing", text: "Name the delivery country, port or site, order lengths, packing limits, Incoterm, tariff concerns, inspection needs and required arrival date. The answer prepares the commercial inputs while sales confirms freight and duty." },
];

const link = "font-semibold text-teal-text hover:underline";

export default function SourcingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI FRP Sourcing Assistant — F1 Composite",
    url: absoluteUrl("/ai/sourcing"),
    description:
      "Free AI-powered FRP profile sourcing assistant. Describe your application and receive a specification recommendation, certification guidance, relevant case studies, and a direct path to factory pricing in one response. No login required.",
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
      <PageHeader
        tag="Tools"
        title="FRP sourcing assistant"
        description="Describe the structure, exposure, loads, standards and destination. The assistant turns them into a recommended profile family, resin system, the applicable EN, ASTM or GB standards, comparable projects and the information F1 Composite needs to quote."
        facts={[
          { label: "Starting examples", value: String(intentExamples.length) },
          { label: "Reply to requests", value: supplyTerms.responseTime.replace(/^./, (c) => c.toUpperCase()) },
          { label: "Login", value: "Not needed" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Sourcing assistant" }]}
      />

      <PageNav
        items={[
          { id: "tool", label: "Assistant" },
          { id: "how-it-works", label: "How it works" },
          { id: "evaluates", label: "What it evaluates" },
          { id: "include", label: "What to include" },
          { id: "projects", label: "Project types" },
          { id: "review", label: "Human review" },
        ]}
      />

      <ToolSection label="FRP sourcing assistant">
        <SourcingWizard examples={intentExamples} />
      </ToolSection>

      <PageSection
        id="how-it-works"
        title="How the sourcing workflow works"
        intro="FRP sourcing is rarely a catalog lookup: the right section depends on load path, span, connections, chemical exposure, fire requirements, temperature, UV, fabrication and the standards the project names. The assistant turns that scattered context into a structured first-pass specification. It is a starting point for engineering and commercial review, not an approved design; F1 Composite checks the family, material, documents, manufacturability, packing and delivery terms before a formal quotation."
        tone="muted"
      >
        <ol className="grid gap-[12px] md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Step {index + 1}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{step.text}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        id="evaluates"
        title="What the recommendation evaluates"
        intro="The assistant works from F1 Composite's published product families, technical data, standards, tools and delivered projects, and does not invent products outside the current manufacturing scope."
        tone="white"
      >
        <ul className="grid gap-[12px] sm:grid-cols-2">
          {evaluates.map((item) => (
            <li key={item.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.text}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="include" title="What to include for a useful answer" tone="muted">
        <div className="max-w-[820px] space-y-[16px] text-f16 leading-golden text-t2">
          <p>
            Include the application and location, dimensions or drawing, support spacing and loads, chemicals and temperatures, fire
            or slip requirements, standards, quantity, preferred delivery terms and the required date. If something is unknown, say
            so: the assistant turns the gaps into a checklist rather than assuming values.
          </p>
          <p>
            For structural work, confirm the recommendation with the{" "}
            <Link href="/frp-profile-calculator" className={link}>FRP profile calculator</Link> and the published{" "}
            <Link href="/frp-span-tables" className={link}>FRP span tables</Link>. Buyers can also compare the proposed documents
            against the <Link href="/resources/how-to-choose-frp-pultrusion-supplier" className={link}>supplier checklist</Link>{" "}
            before sending the result for formal review.
          </p>
        </div>
      </PageSection>

      <PageSection
        id="projects"
        title="Common projects for the assistant"
        intro="The workflow is the same across product families, but each project type needs different evidence. These notes show what the assistant looks for and what still needs engineering or commercial confirmation."
        tone="white"
      >
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((item) => (
            <li key={item.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-[20px] max-w-[820px] text-f16 leading-golden text-t2">
          In every case a useful answer starts from constraints rather than a preferred product name. That lets the assistant explain
          why a family may fit, show what is still unknown and hand over cleanly to the people responsible for design acceptance,
          manufacturing, inspection and purchasing.
        </p>
      </PageSection>

      <PageSection id="review" title="AI-assisted screening, then human review" tone="muted">
        <div className="max-w-[820px] space-y-[16px] text-f16 leading-golden text-t2">
          <p>
            The assistant is constrained to F1 Composite&rsquo;s known capabilities and is built for early sourcing decisions. Final
            profile sizing, connection design, safety factors, regulatory acceptance and installation stay with the project&rsquo;s
            qualified professionals. F1 engineering reviews drawings and stated design criteria; sales confirms tooling, MOQ, lead
            time, packing, freight and price.
          </p>
          <p>
            That keeps the fast part fast without presenting an automated answer as an approved design: start with the assistant,
            then use its checklist to request the evidence and quotation the project needs.
          </p>
        </div>
      </PageSection>

      <RelatedLinks
        background="white"
        groups={[
          { title: "Size and price", links: [
            { href: "/frp-profile-calculator", label: "FRP profile calculator" },
            { href: "/frp-span-tables", label: "FRP span tables" },
            { href: "/fiberglass-pultruded-profile-price", label: "Profile price estimator" },
          ] },
          { title: "Sourcing guides", links: [
            { href: "/resources/how-to-choose-frp-pultrusion-supplier", label: "How to choose a pultrusion supplier" },
            { href: "/resources/blog/how-to-source-pultruded-frp-profiles-from-china-2026-buyers-guide", label: "Sourcing FRP from China" },
            { href: "/resources/frp-pultrusion-fob-ddp-export-guide", label: "DDP, tariffs and HS codes" },
          ] },
          { title: "More tools", links: [
            { href: "/tools", label: "All engineering tools" },
            { href: "/ask", label: "Engineering assistant" },
            { href: "/ai/passive-house", label: "Passive House window selector" },
          ] },
        ]}
      />
      <InnerCTA
        title="Send the sourcing brief with your RFQ"
        quoteHref="/contact?source=tool-sourcing&inquiry_type=rfq"
        text="Send the assistant's brief with the drawings, quantities, destination and required date."
      />
    </>
  );
}
