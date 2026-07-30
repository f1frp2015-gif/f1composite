import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import SourcingWizard from "./SourcingWizard";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    // Drop the "AI Tools" intermediate — there is no /ai hub page, so it had
    // no `item` URL and GSC flagged "Missing field item in itemListElement".
    // Last item may omit `item` per schema.org spec.
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "AI FRP Sourcing Assistant" },
  ],
};

export const metadata: Metadata = buildPageMetadata({
  title: "AI FRP Sourcing Assistant — Free 48-Hour Quote",
  description:
    "Use the AI FRP sourcing assistant to match profiles, resin systems, standards, and case studies, then prepare a factory-direct quote request within 48 hours.",
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
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[900px] px-[21px]">
          <div className="text-center">
            <span className="inline-block rounded-full bg-teal-bg px-[13px] py-[5px] text-f11 font-bold uppercase tracking-[2px] text-teal-text">
              Free · AI-Native Sourcing · No Login
            </span>
            <h1 className="mt-[13px] text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
              AI FRP Sourcing Assistant
              <br />
              <span className="text-teal-text">Turn project requirements into a quote-ready specification.</span>
            </h1>
            <p className="mt-[16px] mx-auto text-f15 leading-golden text-t2">
              Skip the brochure search. Describe the structure, exposure, loads, standards, and
              destination to our AI FRP sourcing assistant. It organizes those inputs into a
              recommended profile family, resin system, applicable EN, ASTM, or GB standards,
              comparable case studies, and the information needed for a factory-direct quote from
              F1 Composite within 48 hours.
            </p>
          </div>

          <section className="mt-[34px] rounded-[10px] border border-border-default bg-bg2 p-[21px] md:p-[29px]">
            <h2 className="text-f24 font-bold text-t1">
              Use AI FRP sourcing to narrow the specification before the RFQ
            </h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              FRP sourcing is rarely a catalog lookup. The correct section depends on load path,
              span, connection design, chemical exposure, fire requirements, temperature, UV,
              fabrication, and the standards named by the project. The assistant helps buyers turn
              that scattered context into a structured first-pass specification instead of sending
              a supplier only a profile name and quantity.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The result is a starting point for engineering and commercial review, not an
              automatically approved structural design. F1 Composite checks the proposed family,
              material system, documentation, manufacturability, packing, and delivery terms before
              issuing a formal quotation.
            </p>
          </section>

          <SourcingWizard examples={intentExamples} />

          <section className="mt-[55px]">
            <h2 className="text-f24 font-bold text-t1">How the AI FRP sourcing workflow works</h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              Three steps connect an early application question to a reviewable sourcing brief.
            </p>
            <div className="mt-[21px] grid gap-[21px] sm:grid-cols-3">
              <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step 1</div>
                <h3 className="mt-[5px] text-f15 font-bold text-t1">Describe the application</h3>
                <p className="mt-[5px] text-f13 leading-golden text-t2">
                  Describe the service environment, loads, geometry, required standards, order
                  volume, destination, and project stage. More detail produces a more useful answer.
                </p>
              </div>
              <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step 2</div>
                <h3 className="mt-[5px] text-f15 font-bold text-t1">AI organizes the options</h3>
                <p className="mt-[5px] text-f13 leading-golden text-t2">
                  Receive a profile-family and resin recommendation, relevant standards,
                  documentation requests, and similar work from F1&rsquo;s product knowledge base.
                </p>
              </div>
              <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
                <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step 3</div>
                <h3 className="mt-[5px] text-f15 font-bold text-t1">Hand off for review</h3>
                <p className="mt-[5px] text-f13 leading-golden text-t2">
                  Send the structured result to sales for pricing or to engineering for a drawing,
                  span, connection, tolerance, or compliance review before ordering.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-[55px]">
            <h2 className="text-f24 font-bold text-t1">What the AI recommendation evaluates</h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The assistant is grounded in F1 Composite&rsquo;s published product families, technical
              data, standards, tools, and delivered projects. It does not invent products outside
              the current manufacturing scope.
            </p>
            <div className="mt-[21px] grid gap-[16px] sm:grid-cols-2">
              {[
                {
                  title: "Profile family and geometry",
                  body: "It distinguishes stock structural shapes, gratings, window systems, and custom pultrusions, then identifies the dimensions and load information still needed for selection.",
                },
                {
                  title: "Resin and service environment",
                  body: "It relates general-purpose polyester, vinyl ester, polyurethane, epoxy, and fire-retardant options to corrosion, temperature, UV, electrical, and fire exposure.",
                },
                {
                  title: "Standards and evidence",
                  body: "It surfaces relevant EN 13706, ASTM D3917, fire, slip, fenestration, or project standards and points to test reports, certifications, and comparable case studies.",
                },
                {
                  title: "Quote-ready commercial inputs",
                  body: "It identifies drawings, quantities, lengths, tolerances, finish, inspection, Incoterms, destination, and schedule details that affect tooling, production, packing, and landed cost.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                  <h3 className="text-f15 font-bold text-t1">{item.title}</h3>
                  <p className="mt-[8px] text-f13 leading-golden text-t2">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-[55px] rounded-[10px] border border-border-default bg-bg2 p-[21px] md:p-[29px]">
            <h2 className="text-f24 font-bold text-t1">
              What to include for a useful AI FRP sourcing answer
            </h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              Include the application and location, dimensions or drawing, support spacing and
              loads, chemicals and temperatures, fire or slip requirements, standards, quantity,
              preferred delivery terms, and required date. If information is unknown, state that
              clearly—the assistant can turn the gaps into a checklist rather than assuming values.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              For structural work, confirm the recommendation with the{" "}
              <Link href="/frp-profile-calculator" className="font-semibold text-teal-text hover:underline">
                FRP profile calculator
              </Link>{" "}
              and published{" "}
              <Link href="/frp-span-tables" className="font-semibold text-teal-text hover:underline">
                FRP span tables
              </Link>
              . Buyers can also compare the proposed documentation against the{" "}
              <Link href="/resources/how-to-choose-frp-pultrusion-supplier" className="font-semibold text-teal-text hover:underline">
                FRP pultrusion supplier checklist
              </Link>{" "}
              before sending the result for formal review.
            </p>
          </section>

          <section className="mt-[55px]">
            <h2 className="text-f24 font-bold text-t1">
              Common projects for the AI FRP sourcing assistant
            </h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              The same sourcing workflow applies across product families, but each project type
              needs different evidence. These examples show the information the AI looks for and
              the decisions that still require engineering or commercial confirmation.
            </p>
            <div className="mt-[21px] grid gap-[16px] sm:grid-cols-2">
              {[
                {
                  title: "Walkways, platforms, and bridge components",
                  body: "State clear span, support condition, pedestrian or vehicle loads, deflection limit, slip requirement, environment, and design code. The output can connect beams, channels, gratings, handrails, and deck panels while flagging the calculations and connections that require project review.",
                },
                {
                  title: "Chemical and wastewater facilities",
                  body: "List chemicals, concentration, splash or immersion, temperature, cleaning regime, fire requirement, and expected service life. The recommendation can distinguish polyester from vinyl ester or specialty systems and identify corrosion, fire, and fabrication evidence to request.",
                },
                {
                  title: "Passive House and high-performance windows",
                  body: "Provide climate, opening type, dimensions, glazing, spacer, target whole-window U-value, certification route, quantity, and destination. The assistant can narrow the frame series and link certification, thermal calculation, comparable projects, and fabrication questions.",
                },
                {
                  title: "Solar mounting and lightweight structures",
                  body: "Include module geometry, wind and snow criteria, support spacing, roof or ground interface, UV and temperature exposure, grounding strategy, target life, and installation constraints. The result can organize section, resin, testing, and logistics questions for engineering review.",
                },
                {
                  title: "Custom pultruded profiles",
                  body: "Attach or describe the cross-section, tolerance, material, glass architecture, finish, drilling or cutting, annual volume, first order, tooling ownership, and schedule. The assistant can identify manufacturability gaps before a die quotation and first-article plan are prepared.",
                },
                {
                  title: "Regional import and DDP sourcing",
                  body: "Name the delivery country, port or site, order lengths, packing limits, Incoterm, tariff concerns, inspection needs, and required arrival date. The sourcing answer can prepare the commercial inputs while sales verifies classification, freight, duty, and final landed pricing.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-[8px] border border-border-default bg-white p-[21px]">
                  <h3 className="text-f15 font-bold text-t1">{item.title}</h3>
                  <p className="mt-[8px] text-f13 leading-golden text-t2">{item.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-[21px] text-f15 leading-golden text-t2">
              In every case, a useful answer starts with constraints rather than a preferred
              product name. That lets the AI FRP sourcing assistant explain why a family may fit,
              show what is still unknown, and create a cleaner handoff to the people responsible
              for design acceptance, manufacturing, inspection, and purchasing.
            </p>
          </section>

          <section className="mt-[55px] border-t border-border-default pt-[34px]">
            <h2 className="text-f24 font-bold text-t1">AI-assisted screening, followed by human review</h2>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              Powered by AI and constrained to F1 Composite&rsquo;s known capabilities, the tool is
              designed for early sourcing decisions. Final profile sizing, connection design,
              safety factors, regulatory acceptance, and installation remain the responsibility of
              the project&rsquo;s qualified professionals. F1 engineering reviews drawings and stated
              design criteria; sales confirms tooling, MOQ, lead time, packing, freight, and price.
            </p>
            <p className="mt-[13px] text-f15 leading-golden text-t2">
              That division keeps the fast part fast without presenting an automated answer as an
              approved design. Start with the free AI FRP sourcing tool, then use the generated
              checklist to request the evidence and quotation your project actually needs.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
