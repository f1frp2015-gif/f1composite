import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import Figure from "@/components/ui/Figure";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import { FAQList } from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { company } from "@/content/data/company";

const pageTitle = "Pultrusion Tech Transfer & Consulting: Turnkey Lines";
const pageDescription =
  "Pultrusion technology transfer and consulting: feasibility, die design, line setup, commissioning and EN 13706 quality handover, backed by FengDu's 370 lines.";
const pagePath = "/technology/knowhow-services";
const publishedAt = "2024-04-12";
const updatedAt = "2026-07-07";
const standards = ["ISO 9001:2015", "EN 13706", "ASTM D3917", "EN 10204 Type 3.1"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/technology/knowhow-services/opengraph-image",
});

const faqItems = [
  {
    question: "What is pultrusion technology transfer?",
    answer:
      "Pultrusion technology transfer is the structured delivery of the complete knowledge package required to operate a pultrusion production line and manufacture fiber-reinforced polymer profiles to commercial quality standards. It encompasses die design methodology, resin formulation selection, process parameter development (pull speed, die temperatures, injection pressure), fiber architecture design, quality control procedures, and operator training. The goal is to enable the receiving organization to independently produce conforming FRP profiles without ongoing reliance on the technology provider. Our technology transfer programs include on-site commissioning support, recipe validation, and a defined post-handover technical assistance period.",
  },
  {
    question: "How long does a typical pultrusion consulting engagement take?",
    answer:
      "The duration depends on the scope. A focused consulting engagement (such as optimizing an existing production line, troubleshooting a specific quality issue, or evaluating the feasibility of a new profile design) typically requires 2–4 weeks of on-site and remote work. A full technology transfer program, covering die design, recipe development, operator training, and production validation for a new pultrusion line, typically spans 3–6 months from kickoff to handover. A complete turnkey project, including equipment specification, procurement support, factory layout, installation supervision, and production commissioning, runs 8–14 months depending on equipment lead times and facility readiness.",
  },
  {
    question: "Can F1 Composite help us start a new pultrusion operation from scratch?",
    answer:
      "Yes. Our Turnkey tier is specifically designed for organizations entering the pultrusion industry for the first time. We guide you through every step: market and product feasibility analysis, business case development, equipment specification and vendor selection, factory layout and utility planning, die design and procurement, raw material supplier qualification, operator recruitment support, hands-on training, process recipe development and validation, quality system setup, and production ramp-up to target volumes. We have successfully delivered turnkey pultrusion programs on four continents and can adapt the scope to your specific market, product range, and investment level.",
  },
  {
    question: "What ongoing support is available after project handover?",
    answer:
      "Every engagement includes a defined post-handover support period, typically 3 months for Consulting, 6 months for Technology Transfer, and 12 months for Turnkey projects. During this period, our engineers are available for remote troubleshooting, recipe adjustments, and quality review via video conference and email. After the support period ends, we offer annual retainer agreements for ongoing technical assistance, as well as on-demand consulting for new product development, process optimization, or capacity expansion projects. Many of our technology transfer clients maintain a long-term advisory relationship as they expand their product range and production capacity.",
  },
];

const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

const tiers = [
  {
    name: "Consulting",
    duration: "2–4 weeks",
    support: "3 months",
    text: "Targeted advice for an existing operation or a new-market evaluation: recommendations you can act on, with no ongoing implementation commitment.",
    deliverables: [
      "Feasibility assessment for new profile designs or market applications",
      "Production line audit with an efficiency and quality improvement plan",
      "Root cause analysis for recurring quality defects",
      "Resin system selection for specific chemical or thermal environments",
      "Fiber architecture optimization for target mechanical properties",
      "Written report with findings, recommendations and a priority matrix",
    ],
  },
  {
    name: "Technology transfer",
    duration: "3–6 months",
    support: "6 months",
    text: "The complete knowledge package (die design, process recipes, quality systems and operator training) for independent production.",
    deliverables: [
      "Complete die design package (CAD, tolerances, chrome plating specifications)",
      "Resin formulation and mixing procedures with a qualified supplier list",
      "Validated process recipes (pull speed, die temperatures, injection pressure, fiber lay-up)",
      "Operator training: classroom theory plus 2–3 weeks hands-on",
      "Quality control procedures, test methods and acceptance criteria",
      "Production validation run with mechanical testing",
      "Six months of remote technical support after handover",
    ],
  },
  {
    name: "Turnkey",
    duration: "8–14 months",
    support: "12 months",
    text: "End-to-end delivery, from the business case through equipment installation to production ramp-up at target volumes.",
    deliverables: [
      "Market analysis and product range definition",
      "Equipment specification, vendor evaluation and procurement support",
      "Factory layout design (material flow, utilities, safety zoning)",
      "The full technology transfer package (all tier 2 deliverables)",
      "On-site installation supervision and equipment commissioning",
      "Production ramp-up until the target output rate and quality are reached",
      "Twelve months of remote and on-call support after handover",
    ],
  },
];

const steps = [
  {
    title: "Assessment",
    meta: "1–2 weeks",
    text: "An evaluation of your situation, objectives and constraints. For a new operation: market analysis, product range and investment scoping. For an existing one: production audit, quality data review and equipment assessment. It ends with a documented scope and feasibility statement.",
  },
  {
    title: "Proposal",
    meta: "Fixed fee",
    text: "A technical and commercial proposal with scope, deliverables, timeline, milestones and a fixed fee. Each work package has measurable completion criteria, and the proposal is reviewed with you in a working session before the contract.",
  },
  {
    title: "Implementation",
    meta: "Core delivery",
    text: "On-site engineering, die design and procurement, recipe development and validation, operator training, commissioning and trial runs, with weekly progress reports against the milestones. All documents are delivered in editable formats.",
  },
  {
    title: "Handover",
    meta: "3–12 months support",
    text: "Formal handover with the complete documentation, a production validation report and a defined support schedule, confirmed in a review meeting. The support period (3 to 12 months by tier) covers your team while it takes over.",
  },
];

const advantages = [
  {
    label: "Production background",
    title: `From a network of ${company.production.lines} lines`,
    text: `Our engineers come from FengDu's production network: ${company.production.bases} manufacturing bases and ${company.production.lines} pultrusion lines.`,
  },
  {
    label: "Ownership",
    title: "Your IP after handover",
    text: "Recipes, die designs and procedures become your property at handover. No royalties and no licensing.",
  },
  {
    label: "Method",
    title: "The reasoning, not only the recipe",
    text: "We explain why each parameter is set as it is, so your team can troubleshoot and improve the process on its own.",
  },
  {
    label: "Leadership",
    title: "Led by production engineers",
    text: "Every engagement is led by a senior engineer with production-floor experience, from assessment to handover.",
  },
];

export default function KnowhowServicesPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pultrusion Consulting and Technology Transfer",
    description: pageDescription,
    url: absoluteUrl(pagePath),
    provider: { "@id": "https://www.f1composite.com/#organization" },
    image: absoluteUrl("/technology/knowhow-services/opengraph-image"),
    serviceType: "Pultrusion consulting, technology transfer, and turnkey line installation",
    datePublished: publishedAt,
    dateModified: updatedAt,
    citation: standards,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        tag="Know-How & Services"
        figure={
          <Figure number={1} title="Production hall" note="Production photo" bleed>
            <div className="relative aspect-[16/10]">
              <Image src="/images/technology/f1-composite-pultrusion-hall-krauss-maffei-lines.webp" alt="Pultrusion lines in an F1 Composite production hall" fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        title="Pultrusion expertise, transferred to your operation"
        description="We do more than manufacture FRP profiles. We transfer the engineering knowledge, process recipes, and quality systems that enable our partners to build their own pultrusion capability."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Know-How & Services" },
        ]}
      />
      <PageNav items={[{ id: "service-tiers", label: "Service tiers" }, { id: "engagement-process", label: "Engagement process" }, { id: "our-advantage", label: "Our advantage" }, { id: "faq", label: "FAQ" }]} />
      <PageSection id="service-tiers" title="Three levels of engagement" tone="white" intro="Choose the depth that matches your needs. Each tier ends with a defined period of support after handover.">
        <ol className="grid gap-[12px] lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <li key={tier.name} className="flex flex-col rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <p className={mono}>Tier {index + 1}</p>
              <h3 className="mt-[4px] text-f24 font-bold text-t1">{tier.name}</h3>
              <dl className="mt-[16px] grid grid-cols-2 gap-[12px] border-y border-border-default py-[12px]">
                <div>
                  <dt className={mono}>Duration</dt>
                  <dd className="mt-[2px] text-f16 font-semibold text-t1">{tier.duration}</dd>
                </div>
                <div>
                  <dt className={mono}>Support after</dt>
                  <dd className="mt-[2px] text-f16 font-semibold text-t1">{tier.support}</dd>
                </div>
              </dl>
              <p className="mt-[16px] text-f16 leading-golden text-t2">{tier.text}</p>
              <p className={`mt-[20px] ${mono}`}>Deliverables</p>
              <ul className="mt-[8px] space-y-[8px] text-f14 leading-golden text-t2">
                {tier.deliverables.map((item) => (
                  <li key={item} className="flex gap-[10px]">
                    <span aria-hidden="true" className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full bg-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="engagement-process" title="How we work together" tone="muted" intro="Every engagement follows the same four steps. The depth of each step scales with the tier.">
        <ol className="grid gap-[12px] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <p className={mono}>Step {index + 1} · {step.meta}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{step.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{step.text}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="our-advantage" title="Why partner with F1 Composite" tone="white">
        <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => (
            <li key={item.title} className="rounded-card border border-border-default bg-bg2 p-[20px] sm:p-[24px]">
              <p className={mono}>{item.label}</p>
              <h3 className="mt-[4px] text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f14 leading-golden text-t2">{item.text}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={faqItems} />
      </PageSection>

      <RelatedLinks
        groups={[
          {
            title: "How we work",
            links: [
              { href: "/technology/pultrusion-process", label: "The pultrusion process, stage by stage" },
              { href: "/technology/quality-testing", label: "Quality testing and standards" },
              { href: "/case-studies", label: "Case studies" },
            ],
          },
          {
            title: "Industry reading",
            links: [
              { href: "/resources/blog/pultrusion-industry-questions-2026", label: "7 questions the industry cares about most" },
              { href: "/resources/blog/biggest-pain-point-pultrusion-qualification-speed", label: "The biggest pain point in pultrusion today" },
            ],
          },
          {
            title: "Contact",
            links: [{ href: "/contact", label: "Talk to a pultrusion engineer" }],
          },
        ]}
      />

      <InnerCTA title="Ready to explore a know-how partnership?" />
    </>
  );
}
