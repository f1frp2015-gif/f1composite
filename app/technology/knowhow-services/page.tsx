import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
import FAQ from "@/components/ui/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

const pageTitle = "Pultrusion Technology Transfer & Consulting — Turnkey FRP Line Setup";
const pageDescription =
  "Pultrusion technology transfer, consulting, and turnkey FRP line installation. Feasibility study, die design, production commissioning, ISO 9001 / EN 13706 quality system handover. 30+ years operations expertise.";
const pagePath = "/technology/knowhow-services";
const publishedAt = "2024-04-12";
const updatedAt = "2026-04-02";
const authorName = "F1 Composite Consulting Team";
const authorRole = "Pultrusion startup, transfer, and commissioning specialists";
const reviewedBy = "Operations Advisory Board";
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
      "The duration depends on the scope. A focused consulting engagement — such as optimizing an existing production line, troubleshooting a specific quality issue, or evaluating the feasibility of a new profile design — typically requires 2–4 weeks of on-site and remote work. A full technology transfer program, covering die design, recipe development, operator training, and production validation for a new pultrusion line, typically spans 3–6 months from kickoff to handover. A complete turnkey project, including equipment specification, procurement support, factory layout, installation supervision, and production commissioning, runs 8–14 months depending on equipment lead times and facility readiness.",
  },
  {
    question: "Can F1 Composite help us start a new pultrusion operation from scratch?",
    answer:
      "Yes. Our Turnkey tier is specifically designed for organizations entering the pultrusion industry for the first time. We guide you through every step: market and product feasibility analysis, business case development, equipment specification and vendor selection, factory layout and utility planning, die design and procurement, raw material supplier qualification, operator recruitment support, hands-on training, process recipe development and validation, quality system setup, and production ramp-up to target volumes. We have successfully delivered turnkey pultrusion programs on four continents and can adapt the scope to your specific market, product range, and investment level.",
  },
  {
    question: "What ongoing support is available after project handover?",
    answer:
      "Every engagement includes a defined post-handover support period — typically 3 months for Consulting, 6 months for Technology Transfer, and 12 months for Turnkey projects. During this period, our engineers are available for remote troubleshooting, recipe adjustments, and quality review via video conference and email. After the support period ends, we offer annual retainer agreements for ongoing technical assistance, as well as on-demand consulting for new product development, process optimization, or capacity expansion projects. Many of our technology transfer clients maintain a long-term advisory relationship as they expand their product range and production capacity.",
  },
];

/* ── SVG Icons ── */

function IconConsulting() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" className="fill-teal-bg" />
      <path d="M13 14h14M13 19h10M13 24h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-teal" />
      <circle cx="28" cy="24" r="3" stroke="currentColor" strokeWidth="2" className="text-teal" />
    </svg>
  );
}

function IconTransfer() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" className="fill-teal-bg" />
      <path d="M12 20h16M24 16l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal" />
      <rect x="12" y="13" width="6" height="14" rx="1" stroke="currentColor" strokeWidth="2" className="text-teal" />
    </svg>
  );
}

function IconTurnkey() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" className="fill-teal-bg" />
      <path d="M20 12v5M20 17l4 3v6H16v-6l4-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal" />
      <path d="M14 28h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-teal" />
      <circle cx="20" cy="12" r="2" stroke="currentColor" strokeWidth="2" className="text-teal" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Collapsible Block ── */

function Collapsible({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group mt-[13px]">
      <summary className="flex cursor-pointer select-none items-center gap-[8px] text-f13 font-bold text-teal-text transition-colors hover:text-teal">
        <ChevronDown className="h-[16px] w-[16px] shrink-0 transition-transform duration-200 group-open:rotate-180" />
        {label}
      </summary>
      <div className="mt-[13px] pl-[24px] text-f15 leading-golden text-t2">
        {children}
      </div>
    </details>
  );
}

/* ── Deliverable Item ── */

function Deliverable({ text }: { text: string }) {
  return (
    <li className="flex gap-[8px]">
      <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-teal" />
      <span>{text}</span>
    </li>
  );
}

export default function KnowhowServicesPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pultrusion Consulting and Technology Transfer",
    description: pageDescription,
    url: absoluteUrl(pagePath),
    provider: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
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
        title="Pultrusion Expertise, Transferred to Your Operation"
        description="We do more than manufacture FRP profiles — we transfer the engineering knowledge, process recipes, and quality systems that enable our partners to build their own pultrusion capability."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: "Know-How & Services" },
        ]}
      />
      <ArticleSignals
        publishedAt={publishedAt}
        updatedAt={updatedAt}
        authorName={authorName}
        authorRole={authorRole}
        reviewedBy={reviewedBy}
        standards={standards}
      />

      {/* ═══ Service Tiers ═══ */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Service Tiers</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Three Levels of Engagement
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Choose the depth that matches your needs. Every engagement is led by a senior
            pultrusion engineer with 15+ years of production experience.
          </p>

          <div className="mt-[55px] grid gap-[21px] lg:grid-cols-3">
            {/* ── Tier 1: Consulting ── */}
            <div className="group relative flex flex-col overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[34px] transition-all duration-[0.34s] hover:border-teal-border">
              <div className="card-topbar absolute left-0 right-0 top-0" />
              <div className="flex items-center gap-[13px]">
                <IconConsulting />
                <div>
                  <span className="text-f11 font-bold uppercase tracking-[0.08em] text-teal-text">Tier 1</span>
                  <h3 className="text-f24 font-bold text-t1">Consulting</h3>
                </div>
              </div>

              {/* Key stats */}
              <div className="mt-[21px] flex gap-[21px] border-b border-border-default pb-[21px]">
                <div>
                  <span className="text-f24 font-extrabold text-teal">2–4</span>
                  <span className="ml-[5px] text-f11 text-t3">weeks</span>
                </div>
                <div>
                  <span className="text-f24 font-extrabold text-teal">3</span>
                  <span className="ml-[5px] text-f11 text-t3">mo support</span>
                </div>
              </div>

              <p className="mt-[21px] text-f15 leading-golden text-t2">
                Targeted advisory for existing operations or new-market evaluation.
                Actionable recommendations without ongoing implementation obligations.
              </p>

              <Collapsible label="View deliverables">
                <ul className="space-y-[8px]">
                  <Deliverable text="Feasibility assessment for new profile designs or market applications" />
                  <Deliverable text="Production line audit with efficiency and quality improvement plan" />
                  <Deliverable text="Root cause analysis for recurring quality defects" />
                  <Deliverable text="Resin system selection for specific chemical or thermal environments" />
                  <Deliverable text="Fiber architecture optimization for target mechanical properties" />
                  <Deliverable text="Written report with findings, recommendations, and priority matrix" />
                </ul>
              </Collapsible>
            </div>

            {/* ── Tier 2: Technology Transfer ── */}
            <div className="group relative flex flex-col overflow-hidden rounded-[8px] border-2 border-teal bg-bg2 p-[34px] shadow-[0_0_0_1px_theme(colors.teal/0.1)] transition-all duration-[0.34s]">
              <div className="card-topbar absolute left-0 right-0 top-0" />
              <div className="flex items-center gap-[13px]">
                <IconTransfer />
                <div>
                  <div className="flex items-center gap-[8px]">
                    <span className="text-f11 font-bold uppercase tracking-[0.08em] text-teal-text">Tier 2</span>
                    <span className="rounded-[4px] bg-teal px-[8px] py-[2px] text-[10px] font-bold uppercase text-white">Most Popular</span>
                  </div>
                  <h3 className="text-f24 font-bold text-t1">Technology Transfer</h3>
                </div>
              </div>

              <div className="mt-[21px] flex gap-[21px] border-b border-border-default pb-[21px]">
                <div>
                  <span className="text-f24 font-extrabold text-teal">3–6</span>
                  <span className="ml-[5px] text-f11 text-t3">months</span>
                </div>
                <div>
                  <span className="text-f24 font-extrabold text-teal">6</span>
                  <span className="ml-[5px] text-f11 text-t3">mo support</span>
                </div>
              </div>

              <p className="mt-[21px] text-f15 leading-golden text-t2">
                Complete knowledge transfer — die design, process recipes, quality systems,
                and operator training — for independent production capability.
              </p>

              <Collapsible label="View deliverables">
                <ul className="space-y-[8px]">
                  <Deliverable text="Complete die design package (CAD, tolerances, chrome plating specs)" />
                  <Deliverable text="Resin formulation and mixing procedures with qualified supplier list" />
                  <Deliverable text="Validated process recipes (pull speed, die temps, injection pressure, fiber lay-up)" />
                  <Deliverable text="Operator training program — classroom theory + 2–3 weeks hands-on" />
                  <Deliverable text="Quality control procedures, test methods, and acceptance criteria" />
                  <Deliverable text="Production validation run with mechanical testing" />
                  <Deliverable text="6-month post-handover remote technical support" />
                </ul>
              </Collapsible>
            </div>

            {/* ── Tier 3: Turnkey ── */}
            <div className="group relative flex flex-col overflow-hidden rounded-[8px] border border-border-default bg-bg2 p-[34px] transition-all duration-[0.34s] hover:border-teal-border">
              <div className="card-topbar absolute left-0 right-0 top-0" />
              <div className="flex items-center gap-[13px]">
                <IconTurnkey />
                <div>
                  <span className="text-f11 font-bold uppercase tracking-[0.08em] text-teal-text">Tier 3</span>
                  <h3 className="text-f24 font-bold text-t1">Turnkey</h3>
                </div>
              </div>

              <div className="mt-[21px] flex gap-[21px] border-b border-border-default pb-[21px]">
                <div>
                  <span className="text-f24 font-extrabold text-teal">8–14</span>
                  <span className="ml-[5px] text-f11 text-t3">months</span>
                </div>
                <div>
                  <span className="text-f24 font-extrabold text-teal">12</span>
                  <span className="ml-[5px] text-f11 text-t3">mo support</span>
                </div>
              </div>

              <p className="mt-[21px] text-f15 leading-golden text-t2">
                End-to-end project delivery — from business case through equipment
                installation to production ramp-up at target volumes.
              </p>

              <Collapsible label="View deliverables">
                <ul className="space-y-[8px]">
                  <Deliverable text="Market analysis and product range definition" />
                  <Deliverable text="Equipment specification, vendor evaluation, and procurement support" />
                  <Deliverable text="Factory layout design (material flow, utilities, safety zoning)" />
                  <Deliverable text="Full Technology Transfer package (all Tier 2 deliverables)" />
                  <Deliverable text="On-site installation supervision and equipment commissioning" />
                  <Deliverable text="Production ramp-up until target output rate and quality achieved" />
                  <Deliverable text="12-month post-handover remote and on-call support" />
                </ul>
              </Collapsible>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Engagement Process — Visual Flow ═══ */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Engagement Process</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            How We Work Together
          </h2>
          <p className="mt-[13px] max-w-[640px] text-f15 leading-golden text-t2">
            Every engagement follows a structured four-phase process. The depth of each
            phase scales with the service tier.
          </p>

          {/* ── Timeline ── */}
          <div className="relative mt-[55px]">
            {/* Connector line — desktop */}
            <div className="absolute left-[20px] top-[20px] hidden h-[calc(100%-40px)] w-[2px] bg-gradient-to-b from-teal via-teal/60 to-teal/20 lg:left-0 lg:right-0 lg:top-[19px] lg:mx-auto lg:block lg:h-[2px] lg:w-[calc(100%-200px)]" />
            {/* Connector line — mobile */}
            <div className="absolute left-[19px] top-[20px] h-[calc(100%-40px)] w-[2px] bg-gradient-to-b from-teal via-teal/60 to-teal/20 lg:hidden" />

            <div className="grid gap-[34px] lg:grid-cols-4 lg:gap-[21px]">
              {/* Phase 1 */}
              <div className="relative pl-[55px] lg:pl-0 lg:text-center">
                <div className="absolute left-[6px] top-0 flex h-[28px] w-[28px] items-center justify-center rounded-full border-[3px] border-teal bg-white text-f13 font-extrabold text-teal lg:relative lg:left-auto lg:mx-auto">
                  1
                </div>
                <h3 className="mt-0 text-f19 font-bold text-t1 lg:mt-[21px]">Assessment</h3>
                <p className="mt-[5px] text-f13 font-bold text-teal-text">1–2 weeks</p>
                <Collapsible label="Details">
                  <p className="lg:text-left">
                    Thorough evaluation of your situation, objectives, and constraints. For new
                    operations: market analysis, product range, investment scoping. For existing
                    operations: production audit, quality data review, equipment assessment.
                    Concludes with a documented scope definition and feasibility statement.
                  </p>
                </Collapsible>
              </div>

              {/* Phase 2 */}
              <div className="relative pl-[55px] lg:pl-0 lg:text-center">
                <div className="absolute left-[6px] top-0 flex h-[28px] w-[28px] items-center justify-center rounded-full border-[3px] border-teal bg-white text-f13 font-extrabold text-teal lg:relative lg:left-auto lg:mx-auto">
                  2
                </div>
                <h3 className="mt-0 text-f19 font-bold text-t1 lg:mt-[21px]">Proposal</h3>
                <p className="mt-[5px] text-f13 font-bold text-teal-text">Project-based pricing</p>
                <Collapsible label="Details">
                  <p className="lg:text-left">
                    Detailed technical and commercial proposal with scope, deliverables,
                    timeline, milestones, and fixed fee structure. Each work package has
                    measurable completion criteria. Presented in a working session for
                    alignment before contract execution.
                  </p>
                </Collapsible>
              </div>

              {/* Phase 3 */}
              <div className="relative pl-[55px] lg:pl-0 lg:text-center">
                <div className="absolute left-[6px] top-0 flex h-[28px] w-[28px] items-center justify-center rounded-full border-[3px] border-teal bg-white text-f13 font-extrabold text-teal lg:relative lg:left-auto lg:mx-auto">
                  3
                </div>
                <h3 className="mt-0 text-f19 font-bold text-t1 lg:mt-[21px]">Implementation</h3>
                <p className="mt-[5px] text-f13 font-bold text-teal-text">Core delivery phase</p>
                <Collapsible label="Details">
                  <p className="lg:text-left">
                    On-site engineering, die design and procurement, process recipe development
                    and validation, operator training, equipment commissioning, and trial runs.
                    Weekly progress reports against milestone schedule. All documentation
                    delivered in editable format for your team to maintain independently.
                  </p>
                </Collapsible>
              </div>

              {/* Phase 4 */}
              <div className="relative pl-[55px] lg:pl-0 lg:text-center">
                <div className="absolute left-[6px] top-0 flex h-[28px] w-[28px] items-center justify-center rounded-full border-[3px] border-teal bg-white text-f13 font-extrabold text-teal lg:relative lg:left-auto lg:mx-auto">
                  4
                </div>
                <h3 className="mt-0 text-f19 font-bold text-t1 lg:mt-[21px]">Handover</h3>
                <p className="mt-[5px] text-f13 font-bold text-teal-text">3–12 mo support included</p>
                <Collapsible label="Details">
                  <p className="lg:text-left">
                    Formal handover with complete documentation, production validation report,
                    and defined post-handover support schedule. Review meeting to confirm
                    deliverable acceptance. Post-handover support period (3–12 months by tier)
                    provides a safety net as your team builds independent confidence.
                  </p>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Why Partner — Compact with visual highlights ═══ */}
      <section className="bg-white py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Our Advantage</SectionTag>
          <h2 className="mt-[21px] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-t1">
            Why Partner With F1 Composite
          </h2>

          <div className="mt-[55px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[34px]">
              <span className="text-[32px] leading-none">4</span>
              <p className="mt-[5px] text-f11 font-bold uppercase tracking-[0.08em] text-teal-text">Continents Delivered</p>
              <p className="mt-[13px] text-f13 leading-golden text-t2">
                Commissioned pultrusion operations across Asia, Europe, the Middle East, and Africa.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[34px]">
              <span className="text-[32px] leading-none">15+</span>
              <p className="mt-[5px] text-f11 font-bold uppercase tracking-[0.08em] text-teal-text">Years Experience</p>
              <p className="mt-[13px] text-f13 leading-golden text-t2">
                Every engagement led by senior engineers with real production floor experience — not theory.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[34px]">
              <span className="text-[32px] leading-none">100%</span>
              <p className="mt-[5px] text-f11 font-bold uppercase tracking-[0.08em] text-teal-text">Clean IP Transfer</p>
              <p className="mt-[13px] text-f13 leading-golden text-t2">
                Recipes, die designs, and procedures become your property upon handover. No royalties, no licensing.
              </p>
            </div>
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[34px]">
              <span className="text-[32px] leading-none">&quot;Why&quot;</span>
              <p className="mt-[5px] text-f11 font-bold uppercase tracking-[0.08em] text-teal-text">Not Just &quot;What&quot;</p>
              <p className="mt-[13px] text-f13 leading-golden text-t2">
                We transfer the reasoning behind every parameter — so your team can troubleshoot, optimize, and innovate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Cross-links and FAQ ═══ */}
      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Related Resources</SectionTag>
          <h2 className="mt-[21px] text-f24 font-bold text-t1">
            Explore Further
          </h2>
          <div className="mt-[21px] flex flex-wrap gap-[21px]">
            <LinkArrow href="/contact">Get in Touch</LinkArrow>
            <LinkArrow href="/case-studies">Case Studies</LinkArrow>
            <LinkArrow href="/technology/pultrusion-process">Pultrusion Process Details</LinkArrow>
            <LinkArrow href="/technology/quality-testing">Quality & Testing Standards</LinkArrow>
          </div>

          <FAQ items={faqItems} />
        </div>
      </section>

      <InnerCTA title="Ready to explore a know-how partnership?" />
    </>
  );
}
