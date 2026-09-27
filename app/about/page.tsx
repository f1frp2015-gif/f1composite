import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import Figure from "@/components/ui/Figure";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
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

const services = [
  {
    title: "Export sales, engineering support and documents",
    text: `We check your drawing or specification against the existing dies, quote a new die when the section does not exist yet, and prepare the test reports, packing lists and export paperwork for your order. Enquiries get a reply within ${supplyTerms.responseTime}.`,
  },
  {
    title: "Distributors, fabricators, contractors and OEMs",
    text: "We sell to distributors and fabricators who stock or process FRP profiles, to contractors buying for a single project, and to manufacturers developing their own section. Window and door fabricators can buy profiles only or finished units.",
  },
];

const productionStats = [
  { value: String(company.production.bases), label: "Manufacturing bases", detail: "In China" },
  { value: String(company.production.lines), label: "Pultrusion lines", detail: "Across the five bases" },
  { value: company.production.annualTonnes.toLocaleString("en-US"), label: "Tonnes per year", detail: "Annual capacity" },
  { value: `${company.production.dieSets.toLocaleString("en-US")}+`, label: "Existing dies", detail: "Catalog and custom sections" },
];

const link = "font-semibold text-teal-text hover:underline";

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
        tag="Company"
        title="About F1 Composite"
        description="Chongqing F1 Composites Co., Ltd. is the export company of FengDu New Material. We sell FengDu's pultruded FRP profiles, grating and window systems to buyers outside China."
        facts={[
          { label: "Founded", value: company.foundingYear },
          { label: "Pultrusion lines", value: String(company.production.lines) },
          { label: "Export countries", value: company.exportCountries },
        ]}
        figure={
          <Figure number={1} title="Pultrusion lines at a FengDu plant" note="Production photo" bleed>
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/technology/f1-composite-pultrusion-production-line-aerial.webp"
                alt="Rows of blue pultrusion machines pulling profiles in a FengDu production hall"
                fill
                sizes="(max-width: 1023px) 94vw, 44vw"
                className="object-cover"
                preload
              />
            </div>
          </Figure>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <PageNav
        items={[
          { id: "who-we-are", label: "Who we are" },
          { id: "what-we-do", label: "What we do" },
          { id: "production", label: "Production" },
          { id: "milestones", label: "Milestones" },
          { id: "documents", label: "Documents and reach" },
        ]}
      />

      {/* Entity disambiguation first: an industrial FRP exporter, not motorsport. */}
      <PageSection
        id="who-we-are"
        title="One export team in front of FengDu's factories"
        intro={
          <>
            <strong className="font-semibold text-t1">F1 Composite is the export company of FengDu New Material.</strong> We supply
            pultruded fiberglass (FRP/GRP) structural shapes, custom sections, window and door profiles and grating to projects
            outside China.
          </>
        }
        tone="white"
      >
        <div className="grid gap-x-[32px] gap-y-[16px] text-f16 leading-golden text-t2 md:grid-cols-2">
          <div className="space-y-[16px]">
            <p>
              Chongqing F1 Composites Co., Ltd. was founded in {company.foundingYear}. FengDu New Material is the parent company
              and runs the factories: {company.production.bases} production bases with {company.production.lines} pultrusion
              lines. Its subsidiary {company.manufacturer.name} is named on several of our test documents, including PHI
              certificate 2491wi03.
            </p>
            <p>
              F1 is the part of the group that works with overseas buyers in English. We sign the contract and handle engineering
              review, quality documents, export paperwork, logistics and after-sales questions for every international order.
            </p>
          </div>
          <div className="space-y-[16px]">
            <p>
              Because F1 and the factories belong to one group, questions about a drawing, a die or an inspection plan go straight
              to the production team before an order is released.
            </p>
            <p>
              The &ldquo;F1&rdquo; stands for <strong className="font-semibold text-t1">&ldquo;Fiber One&rdquo;</strong> (fiberglass).
              We are not affiliated with Formula 1, Formula One motorsport or the FIA.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="what-we-do" title="What we do and who we work with" tone="muted">
        <ul className="grid gap-[12px] md:grid-cols-2">
          {services.map((item) => (
            <li key={item.title} className="rounded-card border border-border-default bg-white p-[20px] sm:p-[24px]">
              <h3 className="text-f18 font-bold text-t1">{item.title}</h3>
              <p className="mt-[8px] text-f16 leading-golden text-t2">{item.text}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="production"
        title="FengDu's production network"
        intro={`${companyStatements.production} Plants include Chongqing and Yancheng in Jiangsu province.`}
        tone="white"
      >
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border-default bg-border-default lg:grid-cols-4">
          {productionStats.map((stat) => (
            <div key={stat.label} className="bg-white px-[20px] py-[16px]">
              <dt className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">{stat.label}</dt>
              <dd className="mt-[4px] text-[clamp(28px,3vw,36px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-t1">{stat.value}</dd>
              <dd className="mt-[2px] text-f14 text-t3">{stat.detail}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-[20px] grid gap-[20px] md:grid-cols-2">
          <Figure number={2} title="A hall of pultrusion lines" note="Production photo" bleed>
            <div className="relative aspect-[3/2]">
              <Image
                src="/images/technology/f1-composite-pultrusion-hall-krauss-maffei-lines.webp"
                alt="Rows of KraussMaffei pultrusion lines with creels and cutting tables in a FengDu hall"
                fill
                sizes="(max-width: 767px) 94vw, 45vw"
                className="object-cover"
              />
            </div>
          </Figure>
          <Figure number={3} title="Quality testing laboratory" note="Production photo" bleed>
            <div className="relative aspect-[3/2]">
              <Image
                src="/images/technology/f1-composite-quality-testing-laboratory.webp"
                alt="Technician at work in the group's quality testing laboratory"
                fill
                sizes="(max-width: 767px) 94vw, 45vw"
                className="object-cover object-[70%_50%]"
              />
            </div>
          </Figure>
        </div>
      </PageSection>

      <PageSection id="milestones" title="Milestones" tone="muted">
        <ol className="max-w-[820px] border-l border-border-default">
          {milestones.map((m) => (
            <li key={m.year} className="relative pb-[20px] pl-[24px] last:pb-0">
              <span aria-hidden className="absolute left-[-5px] top-[6px] h-[9px] w-[9px] rounded-full border-2 border-teal-text bg-bg2" />
              <p className="font-mono text-f14 font-medium text-teal-text">{m.year}</p>
              <p className="mt-[2px] text-f16 leading-golden text-t1">{m.event}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="documents" title="Documents and reach" tone="white">
        <div className="grid gap-[32px] md:grid-cols-2">
          <div>
            <h3 className="text-f18 font-bold text-t1">Published reports, other documents on request</h3>
            <ul className="mt-[12px] space-y-[8px] text-f16 leading-golden text-t2">
              {publishedReports.map((report) => (
                <li key={report} className="flex gap-[12px]">
                  <span aria-hidden className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-teal" />
                  {report}
                </li>
              ))}
            </ul>
            <p className="mt-[16px] text-f16 leading-golden text-t2">{companyStatements.certificates}</p>
            <p className="mt-[12px] text-f16">
              <Link href="/resources/evidence" className={link}>See the published reports →</Link>
            </p>
          </div>
          <div>
            <h3 className="text-f18 font-bold text-t1">Customers in {company.exportCountries} countries</h3>
            <p className="mt-[12px] text-f16 leading-golden text-t2">
              We ship from China to customers in Asia-Pacific, Europe, the Middle East, Africa and the Americas. Documents are
              prepared in English, and we quote FOB or DDP depending on how you want to handle import. See the{" "}
              <Link href="/resources/frp-pultrusion-fob-ddp-export-guide" className={link}>FOB and DDP guide</Link> and the{" "}
              <Link href="/regions" className={link}>market pages</Link>.
            </p>
            <p className="mt-[12px] text-f16 leading-golden text-t2">
              Production and project videos are on the{" "}
              <a href={company.sameAs[0]} target="_blank" rel="noopener noreferrer" className={link}>
                F1 Composite YouTube channel
              </a>
              .
            </p>
          </div>
        </div>
      </PageSection>

      <RelatedLinks
        background="bg2"
        title="More about the company"
        groups={[
          { title: "Company", links: [
            { href: "/about/authors", label: "Technical authors" },
            { href: "/contact", label: "Contact the export team" },
          ] },
          { title: "Manufacturing", links: [
            { href: "/products/frp-pultrusion-manufacturer-factory-direct", label: "Factory-direct manufacturing" },
            { href: "/technology/pultrusion-process", label: "Pultrusion process" },
            { href: "/technology/quality-testing", label: "Quality and testing" },
          ] },
          { title: "Evidence", links: [
            { href: "/resources/evidence", label: "Published test reports" },
            { href: "/case-studies", label: "Case studies" },
            { href: "/resources/downloads", label: "Downloads and CAD" },
          ] },
        ]}
      />
      <InnerCTA title="Send us your drawing or specification" />
    </>
  );
}
