import { Suspense } from "react";
import KnowHowWorkflow, { KnowHowAcceptance, KnowHowHandover } from "@/components/sourcing/KnowHowWorkflow";
import KnowHowProjectBrief from "@/components/sourcing/KnowHowProjectBrief";
import SourcingLinks from "@/components/sourcing/SourcingLinks";
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
  "Pultrusion know-how from tooling, preforming and materials to line setup, resin injection, trials, operator training and production handover.";
const pagePath = "/technology/knowhow-services";
const publishedAt = "2024-04-12";
const updatedAt = "2026-10-02";
const standards = ["ISO 9001:2015", "EN 13706", "ASTM D3917", "EN 10204 Type 3.1"];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/technology/knowhow-services/opengraph-image",
});

const faqItems = [
  { question: "Can the engagement cover a complete production package?", answer: "The agreed scope can connect product development, material qualification, dies and preforming, equipment selection, injection, fabrication, trials and operator handover. The proposal names deliverables and responsibilities for F1, the suppliers and the receiving factory." },
  { question: "Can we use our existing machines, molds or material suppliers?", answer: "Yes, start with an interface and capability review. Share the current line, tool drawings, material grades and quality records. The project can focus on an upgrade, a new section or local material qualification instead of a new line." },
  { question: "How are timing, warranty and aftercare agreed?", answer: "The proposal sets milestones around design release, procurement, trials and site readiness. Support duration, on-site work, spare parts and equipment warranties are stated by responsible party; they depend on the purchased scope." },
  { question: "Who owns drawings, process documents and recipes?", answer: "Ownership, permitted use, confidentiality and any supplier licensing are agreed before design and procurement. The handover list identifies the editable records and operating documents included in the engagement." },
  { question: "Does accepting a line also certify our profiles?", answer: "No. Factory and site acceptance establish that the agreed equipment package performs as specified. Product qualification uses the exact profile, material and process against the project’s test requirements." },
];

const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

const tiers = [
  {
    name: "Consulting",
    duration: "Scope-based plan",
    support: "Agreed in proposal",
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
    duration: "Trial-based milestones",
    support: "Agreed in proposal",
    text: "The complete knowledge package (die design, process recipes, quality systems and operator training) for independent production.",
    deliverables: [
      "Complete die design package (CAD, tolerances, chrome plating specifications)",
      "Resin formulation and mixing procedures with a qualified supplier list",
      "Validated process recipes (pull speed, die temperatures, injection pressure, fiber lay-up)",
      "Operator training with agreed classroom and practical competency checks",
      "Quality control procedures, test methods and acceptance criteria",
      "Production validation run with mechanical testing",
      "Remote support schedule and escalation contacts agreed for handover",
    ],
  },
  {
    name: "Turnkey",
    duration: "Project schedule",
    support: "Agreed in proposal",
    text: "End-to-end delivery, from the business case through equipment installation to production ramp-up at target volumes.",
    deliverables: [
      "Market analysis and product range definition",
      "Equipment specification, vendor evaluation and procurement support",
      "Factory layout design (material flow, utilities, safety zoning)",
      "The full technology transfer package (all tier 2 deliverables)",
      "On-site installation supervision and equipment commissioning",
      "Production ramp-up until the target output rate and quality are reached",
      "Agreed remote/on-site support and equipment-supplier warranty responsibilities",
    ],
  },
];

const steps = [
  {
    title: "Assessment",
    meta: "Define the baseline",
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
    meta: "Agreed support plan",
    text: "Formal handover with the complete documentation, a production validation report and a defined support schedule, confirmed in a review meeting. The support period and escalation process are agreed for the receiving team.",
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
    title: "Clear document ownership",
    text: "Drawing, recipe and procedure rights are defined before work starts, including any supplier licensing and confidentiality requirements.",
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
              <Image src="/images/f1-photos/f1-composite-pultrusion-hall-krauss-maffei-lines.webp" alt="Pultrusion lines in an F1 Composite production hall" fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        title="Pultrusion expertise, transferred to your operation"
        description="Connect your product requirements to materials, dies, preforming, equipment, trials and operator handover. Build a defined support package for a new line, a new profile or an existing production process."
        actions={{ primary: { label: "Build a project brief", href: "#project-brief" }, secondary: { label: "Explore the support modules", href: "#delivery-chain", variant: "secondary" }, stickyMobile: true }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Know-How & Services" },
        ]}
      />
      <PageNav items={[{ id: "delivery-chain", label: "Support modules" }, { id: "service-tiers", label: "Engagement" }, { id: "acceptance", label: "Acceptance" }, { id: "handover", label: "Handover" }, { id: "faq", label: "FAQ" }, { id: "sourcing", label: "Equipment & materials" }, { id: "project-brief", label: "Project brief" }]} />
      <KnowHowWorkflow />
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

      <KnowHowAcceptance />
      <KnowHowHandover />

      <PageSection id="faq" title="Frequently asked questions" tone="muted">
        <FAQList items={faqItems} />
      </PageSection>

      <SourcingLinks />
      <PageSection id="project-brief" title="Build your Know-How project brief" intro="Choose the support you need and add the information you already have. Review the generated brief before continuing to the contact form.">
        <Suspense fallback={<p className="text-f16 text-t2">Loading project brief…</p>}><KnowHowProjectBrief /></Suspense>
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

      <InnerCTA title="Ready to define your production project?" quoteHref="#project-brief" />
    </>
  );
}
