import type { Metadata } from "next";
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
    { "@type": "ListItem", position: 2, name: "FRP Sourcing Assistant" },
  ],
};

export const metadata: Metadata = buildPageMetadata({
  title: "Free FRP Sourcing Assistant — Quote in 48 Hours",
  description:
    "Describe your FRP project and get a recommended profile, resin system, certifications, case studies, and a DDP USA quote within 48 hours.",
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
    name: "Free FRP Sourcing Assistant — F1 Composite",
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
              Free FRP Sourcing Assistant
              <br />
              <span className="text-teal-text">Get a specification and factory-direct pricing.</span>
            </h1>
            <p className="mt-[16px] mx-auto text-f15 leading-golden text-t2">
              Skip the brochure search. Tell our AI what you&rsquo;re building, and within seconds it
              will recommend an FRP profile family, resin system, applicable EN, ASTM, or GB
              standards, and relevant case studies. You can then request a factory-direct quote
              from F1 Composite within 48 hours.
            </p>
          </div>

          <SourcingWizard examples={intentExamples} />

          <div className="mt-[55px] grid gap-[21px] sm:grid-cols-3">
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step 1</div>
              <h3 className="mt-[5px] text-f15 font-bold text-t1">Describe</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">
                Describe the application, service environment, loads, required standards, and
                destination. More detail produces a more useful recommendation.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step 2</div>
              <h3 className="mt-[5px] text-f15 font-bold text-t1">AI recommends</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">
                Receive a recommended profile family, resin system, certifications, and examples
                of similar projects from F1&rsquo;s product knowledge base.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step 3</div>
              <h3 className="mt-[5px] text-f15 font-bold text-t1">Hand off</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">
                Send the result to Doris in sales for a quote or to our engineering team for a
                drawing review, depending on your project stage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
