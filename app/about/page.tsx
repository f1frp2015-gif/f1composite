import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import InnerCTA from "@/components/sections/InnerCTA";
import LinkArrow from "@/components/ui/LinkArrow";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { company, companyStatements, supplyTerms } from "@/content/data/company";

const PAGE_TITLE = "About F1 Composite — FengDu's FRP Export Company, China";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description:
    "F1 Composite (Chongqing F1 Composites Co., Ltd.) is the export company of FengDu New Material, supplying pultruded FRP profiles to 30+ countries.",
  path: "/about",
});

const milestones = [
  { year: "2015", event: "F1 Composite founded in Chongqing" },
  { year: "2017", event: "First export shipment: profiles to Southeast Asia" },
  { year: "2019", event: "KNOWHOW technical services start for custom profile development" },
  { year: "2021", event: "Catalog passes 100 standard pultruded profile types" },
  { year: "2023", event: "Window and door systems division set up; PHI component certificate issued for the 90 series" },
  { year: "2024", event: "90-series windows supplied for Qinling Station, Antarctica" },
  { year: "2025", event: "More than 200 engineered profiles, with customers on five continents" },
];

const publishedReports = [
  "PHI component certificate 2491wi03 for the Fengdu Passive GFRP 90 Series window",
  "SGS full-section modulus tests to EN 13706-2 Annex D",
  "Intertek AS 2047 tests on a turn-and-tilt window and a lift-sliding door",
  "CABR 3-star green building material certificate and EPD for the window range",
];

const ORG_ID = "https://www.f1composite.com/#organization";

export default function AboutPage() {
  // Reference the single canonical Organization entity (emitted on every page
  // by app/layout.tsx with @id #organization) instead of emitting a second, weaker
  // Organization node here — two Organization nodes on one page fragment the
  // entity in knowledge graphs. AboutPage points at that one entity and carries
  // the explicit Formula 1 disambiguation so the page AI cites for
  // "what is F1 Composite" resolves to the right company.
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": absoluteUrl("/about") + "#aboutpage",
    url: absoluteUrl("/about"),
    name: PAGE_TITLE,
    description: `${companyStatements.relationship} ${companyStatements.disambiguation}`,
    inLanguage: "en",
    isPartOf: { "@id": "https://www.f1composite.com/#website" },
    mainEntity: { "@id": ORG_ID },
    about: { "@id": ORG_ID },
  };

  return (
    <>
      <JsonLd data={aboutPageSchema} />
      <PageHeader
        tag="About"
        title="About F1 Composite"
        description="Chongqing F1 Composites Co., Ltd. is the export company of FengDu New Material. We sell FengDu's pultruded FRP profiles, grating and window systems to buyers outside China."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      {/* What F1 Composite is — entity disambiguation (industrial FRP, not motorsport) */}
      <section className="border-b border-border-default bg-white py-[55px]">
        <div className="site-container">
          <SectionTag>What F1 Composite Is</SectionTag>
          <p className="mt-[21px] text-f18 leading-golden text-t1">
            <strong>F1 Composite is the export company of FengDu New Material.</strong> We
            supply pultruded fiberglass (FRP/GRP) structural shapes, custom sections, window
            and door profiles and grating to projects outside China.
          </p>
          <p className="mt-[13px] text-f16 leading-golden text-t2">
            FengDu New Material is the parent company and runs the factories. Its subsidiary{" "}
            {company.manufacturer.name} is named on several of our test documents,
            including PHI certificate 2491wi03.
          </p>
          <p className="mt-[13px] text-f16 leading-golden text-t2">
            The &ldquo;F1&rdquo; stands for <strong>&ldquo;Fiber One&rdquo;</strong> (fiberglass). We are{" "}
            <strong>not affiliated with Formula 1, Formula One motorsport or the FIA</strong>.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-bg2 py-[89px]">
        <div className="site-container">
          <div className="grid gap-[34px] md:grid-cols-2">
            <div>
              <SectionTag>What we do</SectionTag>
              <h2 className="mt-[21px] text-f32 font-extrabold leading-[1.2] text-t1">
                Export sales, engineering support and documents
              </h2>
              <p className="mt-[13px] text-f16 leading-golden text-t2">
                We check your drawing or specification against the existing dies, quote a new
                die when the section does not exist yet, and prepare the test reports, packing
                lists and export paperwork for your order. Enquiries get a reply within{" "}
                {supplyTerms.responseTime}.
              </p>
            </div>
            <div>
              <SectionTag>Who we work with</SectionTag>
              <h2 className="mt-[21px] text-f32 font-extrabold leading-[1.2] text-t1">
                Distributors, fabricators, contractors and OEMs
              </h2>
              <p className="mt-[13px] text-f16 leading-golden text-t2">
                We sell to distributors and fabricators who stock or process FRP profiles, to
                contractors buying for a single project, and to manufacturers developing their
                own section. Window and door fabricators can buy profiles only or finished units.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-white py-[89px]">
        <div className="site-container">
          <SectionTag>Background</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-f32 font-extrabold leading-[1.2] text-t1">
            One export team in front of FengDu&apos;s factories
          </h2>
          <div className="mt-[34px] grid gap-[34px] md:grid-cols-[1fr_1fr]">
            <div className="space-y-[21px] text-f16 leading-golden text-t2">
              <p>
                Chongqing F1 Composites Co., Ltd. was founded in {company.foundingYear} and is
                FengDu New Material&apos;s export company. FengDu runs {company.production.bases}{" "}
                production bases with {company.production.lines} pultrusion lines. F1 is the
                part of the group that works with overseas buyers in English.
              </p>
              <p>
                We sign the contract and handle engineering review, quality documents,
                export paperwork, logistics and after-sales questions for every international
                order.
              </p>
            </div>
            <div className="space-y-[21px] text-f16 leading-golden text-t2">
              <p>
                We now ship to more than 30 countries. The range runs from catalog I-beams and
                tubes to the Fengdu Passive GFRP 90 Series window, which holds Passive House
                Institute component certificate 2491wi03.
              </p>
              <p>
                Because F1 and the factories belong to one group, questions about a drawing,
                a die or an inspection plan go straight to the production team before an order
                is released.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Capacity */}
      <section className="bg-bg2 py-[89px]">
        <div className="site-container">
          <SectionTag>Production</SectionTag>
          <h2 className="mt-[21px] max-w-[900px] text-f32 font-extrabold leading-[1.2] text-t1">
            FengDu&apos;s production network
          </h2>
          <p className="mt-[13px] text-f16 leading-golden text-t2">
            {companyStatements.production} Plants include Chongqing and Yancheng in Jiangsu
            province.
          </p>
          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: String(company.production.bases), label: "Manufacturing bases", detail: "In China" },
              { value: String(company.production.lines), label: "Pultrusion lines", detail: "Across the five bases" },
              { value: company.production.annualTonnes.toLocaleString("en-US"), label: "Tonnes per year", detail: "Annual capacity" },
              { value: `${company.production.dieSets.toLocaleString("en-US")}+`, label: "Existing dies", detail: "Catalog and custom sections" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[8px] border border-border-default bg-white p-[34px] text-center"
              >
                <span className="text-[clamp(32px,4vw,48px)] font-extrabold text-teal">{stat.value}</span>
                <p className="mt-[5px] text-f16 font-bold text-t1">{stat.label}</p>
                <p className="mt-[4px] text-f14 text-t3">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="bg-bg2 py-[89px]">
        <div className="site-container">
          <SectionTag>Milestones</SectionTag>
          <h2 className="mt-[21px] text-f32 font-extrabold leading-[1.2] text-t1">
            Company timeline
          </h2>
          <div className="mt-[34px] grid gap-[21px] sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="rounded-[8px] border border-border-default bg-white p-[34px] transition-all duration-[0.34s] hover:border-teal-border"
              >
                <span className="text-f24 font-extrabold text-teal-text">{m.year}</span>
                <p className="mt-[13px] text-f16 leading-golden text-t2">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Global Reach */}
      <section className="bg-white py-[89px]">
        <div className="site-container">
          <div className="grid gap-[34px] md:grid-cols-2">
            <div>
              <SectionTag>Certificates and reports</SectionTag>
              <h2 className="mt-[21px] text-f32 font-extrabold leading-[1.2] text-t1">
                Published reports and documents on request
              </h2>
              <ul className="mt-[21px] space-y-[13px]">
                {publishedReports.map((report) => (
                  <li key={report} className="flex items-start gap-[13px] text-f16 leading-golden text-t2">
                    <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-teal" />
                    {report}
                  </li>
                ))}
              </ul>
              <p className="mt-[21px] text-f16 leading-golden text-t2">{companyStatements.certificates}</p>
              <div className="mt-[13px]">
                <LinkArrow href="/resources/evidence">See the published reports</LinkArrow>
              </div>
            </div>
            <div>
              <SectionTag>Where we ship</SectionTag>
              <h2 className="mt-[21px] text-f32 font-extrabold leading-[1.2] text-t1">
                More than 30 countries
              </h2>
              <p className="mt-[13px] text-f16 leading-golden text-t2">
                We ship from China to customers in Asia-Pacific, Europe, the Middle East, Africa
                and the Americas. Documents are prepared in English, and we quote FOB or DDP
                depending on how you want to handle import.
              </p>
              <div className="mt-[21px] flex flex-wrap gap-[13px]">
                <LinkArrow href="/technology">Explore Our Technology</LinkArrow>
                <LinkArrow href="/contact">Get in Touch</LinkArrow>
                <a
                  href="https://www.youtube.com/@F1Composites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[5px] text-f16 font-semibold text-teal-text transition-colors hover:text-teal"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch on YouTube →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InnerCTA title="Send us your drawing or specification" />
    </>
  );
}
