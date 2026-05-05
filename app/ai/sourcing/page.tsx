import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import SourcingWizard from "./SourcingWizard";

export const metadata: Metadata = buildPageMetadata({
  title: "Free FRP Sourcing Assistant — Get China Factory Pricing & Spec in 60 Seconds",
  description:
    "Free AI-powered FRP sourcing tool. Describe your application — environment, load, standards, geography — and get an instant FRP specification, recommended resin system, applicable certifications, similar case studies, and a direct path to a 48-hour quote from F1 Composite (China factory). No login.",
  path: "/ai/sourcing",
});

const intentExamples = [
  {
    label: "Coastal walkway in marine environment",
    prompt:
      "I need to spec FRP for a 200m coastal walkway in a saltwater marina environment. UK coast, pedestrian + light service vehicle load. Need anti-slip surface, 25-year design life, low maintenance. Recommend profile family, resin, surface treatment, and any similar case studies.",
  },
  {
    label: "Chemical plant access platform",
    prompt:
      "Petrochemical plant in Saudi Arabia needs replacement access platforms. Existing galvanized steel corroded under acid splash + 50°C+ ambient. Need: structural beams, gratings, handrails. Recommend FRP grade, resin (vinyl ester?), what testing data should I ask for, and quote process.",
  },
  {
    label: "Passivhaus residential window",
    prompt:
      "Architect specifying windows for a Passivhaus-certified residential project in Germany. Need U_w ≤ 0.8 W/m²K, casement and tilt-turn types, 40+ unit project. Which FRP series fits, what PHI certification do you hold, and what's typical lead time for Germany delivery?",
  },
  {
    label: "Solar farm mounting structure",
    prompt:
      "50MW solar installation in Australia. Need lightweight, UV-stable mounting profiles. Aluminum currently spec'd but considering FRP for foundation cost savings. What's the weight delta vs Al 6063, recommended cross-section, and how does FRP handle 25-year UV exposure?",
  },
  {
    label: "Custom profile, low quantity",
    prompt:
      "I need a custom pultruded cross-section ~80×40mm, wall 4mm, for cable management in a corrosive industrial environment. First order ~500m, then potentially recurring. What's the tooling cost, lead time, and minimum economic quantity?",
  },
];

export default function SourcingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free FRP Sourcing Assistant — F1 Composite",
    url: absoluteUrl("/ai/sourcing"),
    description:
      "Free AI-powered FRP profile sourcing assistant — describe application, get spec recommendation, certifications, case studies, and direct factory-quote path in one response. No login required.",
    applicationCategory: "EngineeringApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@id": "https://www.f1composite.com/#organization",
      "@type": "Organization",
      name: "F1 Composite",
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[900px] px-[21px]">
          <div className="text-center">
            <span className="inline-block rounded-full bg-teal-bg px-[13px] py-[5px] text-f11 font-bold uppercase tracking-[2px] text-teal-text">
              Free · AI-Native Sourcing · No Login
            </span>
            <h1 className="mt-[13px] text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">
              Free FRP Sourcing Assistant
              <br />
              <span className="text-teal-text">Get a spec + China factory price path.</span>
            </h1>
            <p className="mt-[16px] mx-auto max-w-[640px] text-f15 leading-golden text-t2">
              Skip the brochure-browsing. Tell our AI what you&rsquo;re building, and it returns —
              free, in seconds — the recommended FRP profile family, resin system, applicable
              standards (EN 13706 / ASTM / GB), comparable case studies, and a direct path to a
              48-hour quote from F1 Composite&rsquo;s China factory.
            </p>
          </div>

          <SourcingWizard examples={intentExamples} />

          <div className="mt-[55px] grid gap-[21px] sm:grid-cols-3">
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step 1</div>
              <h3 className="mt-[5px] text-f15 font-bold text-t1">Describe</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">
                Application, environment, load, standards, geography. The more specific, the better
                the spec.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step 2</div>
              <h3 className="mt-[5px] text-f15 font-bold text-t1">AI recommends</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">
                Profile family + resin + certifications + similar projects we&rsquo;ve delivered,
                generated from F1&rsquo;s full product knowledge base.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <div className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Step 3</div>
              <h3 className="mt-[5px] text-f15 font-bold text-t1">Hand off</h3>
              <p className="mt-[5px] text-f13 leading-golden text-t2">
                Routed to Doris (sales) for quote, or to engineering for drawing review — based on
                where you are in the process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
