import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import CalculatorCTA from "@/components/calculators/CalculatorCTA";
import ProductRfq from "@/components/products/ProductRfq";
import AgricultureStakesApplication from "@/components/sections/AgricultureStakesApplication";
import CableTrayApplication from "@/components/sections/CableTrayApplication";
import UtilityCrossarmApplication from "@/components/sections/UtilityCrossarmApplication";
import PedestrianBridgeGuide, { bridgeFaqs, bridgeRfqHref } from "@/components/sections/PedestrianBridgeGuide";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import CoverLink from "@/components/ui/CoverLink";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import { applicationPages, getApplicationPage } from "@/lib/applicationPages";
import { coverFor } from "@/lib/covers";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

/* Pre-filled FRP profile calculator deep links — a typical span / load /
   environment per application so each page opens the tool already scoped. */
const PROFILE_CALC_LINK: Record<string, string> = {
  "frp-cable-tray-supports": "/frp-profile-calculator#shape=channel&span=1500&load=2&env=chemical&material=frp-e23&load_type=udl&defl=200",
  "frp-cooling-tower-profiles": "/frp-profile-calculator#shape=square-tube&span=2000&load=3&env=chemical&material=frp-e23&load_type=udl&defl=200",
  "frp-bridge-deck-panels": "/frp-profile-calculator#shape=i-beam&span=3000&load=5&env=outdoor&material=frp-e23&load_type=udl&defl=360",
  "frp-solar-mounting-profiles": "/frp-profile-calculator#shape=square-tube&span=2200&load=2.5&env=outdoor&material=frp-e23&load_type=udl&defl=180",
  "frp-chemical-plant-platforms": "/frp-profile-calculator#shape=i-beam&span=1800&load=10&env=chemical&material=frp-e23&load_type=udl&defl=360",
  "frp-pedestrian-bridge-superstructures": "/frp-profile-calculator#shape=i-beam",
};

const BRIDGE = "frp-pedestrian-bridge-superstructures";
const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

type Tone = "white" | "muted";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return applicationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getApplicationPage(slug);

  if (!page) {
    return {};
  }

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: `/applications/${page.slug}`,
    ...(page.slug === "agriculture-horticulture-stakes" ? { image: page.image } : {}),
  });
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getApplicationPage(slug);

  if (!page) {
    notFound();
  }

  const path = `/applications/${page.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.title,
    description: page.description,
    url: absoluteUrl(path),
    about: page.shortTitle,
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    mainEntityOfPage: absoluteUrl(path),
    dateModified: page.lastModified,
    image: absoluteUrl(page.image),
  };

  if (page.slug === "frp-cable-tray-supports") {
    return <><JsonLd data={schema} /><CableTrayApplication page={page} /></>;
  }

  if (page.slug === "frp-utility-crossarms") {
    return <><JsonLd data={schema} /><UtilityCrossarmApplication page={page} /></>;
  }

  if (page.slug === "agriculture-horticulture-stakes") {
    return <><JsonLd data={schema} /><AgricultureStakesApplication page={page} /></>;
  }

  const bridge = page.slug === BRIDGE;
  const quoteHref = bridge ? bridgeRfqHref : buildRfqHref({ source: `application-${page.slug}`, product: page.shortTitle, productPath: path });
  const calculator = PROFILE_CALC_LINK[page.slug] ?? "/frp-profile-calculator";
  const products = page.related.filter((link) => coverFor(link.href));

  const sections: { id: string; label: string; title: string; intro?: React.ReactNode; count?: string; content: (tone: Tone) => React.ReactNode }[] = [
    {
      id: "fit",
      label: "Where it fits",
      title: "Where it fits and what we supply",
      intro: page.environment,
      content: () => (
        <div className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[48px]">
          <div className="text-f16 leading-golden text-t2">
            <p>
              {page.supplyScope ?? "Identify raw profile lengths, cut or drilled components, grating panels and any agreed assemblies. The quotation states who is responsible for fasteners, engineering and installation."}
            </p>
            <p className="mt-[12px]">This page describes how the products are used; design and installation are included only where the quotation says so.</p>
            <p className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-f14">
              <Link href="/products/product-lines" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">All product families</Link>
              <Link href="/industries" className="font-semibold text-teal-text underline underline-offset-4 hover:text-teal">Industries</Link>
            </p>
          </div>
          {products.length ? (
            <div>
              <h3 className="text-f16 font-bold text-t1">Products for this application</h3>
              <ul className="mt-[12px] grid grid-cols-1 gap-[10px]">
                {products.map((link) => (
                  <li key={link.href}>
                    <CoverLink href={link.href} cover={coverFor(link.href)!} title={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      id: "profiles",
      label: "Profiles & resin",
      title: "Recommended profiles and resin",
      content: (tone) => (
        <div className="grid grid-cols-1 items-start gap-[16px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-[24px]">
          <ol className={`divide-y divide-border-default rounded-card border border-border-default ${tone === "muted" ? "bg-white" : "bg-bg2"}`}>
            {page.recommendedProfiles.map((item, index) => (
              <li key={item} className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-[8px] px-[20px] py-[14px] text-f16 leading-golden text-t1">
                <span className="font-mono text-f12 leading-[2.1] text-teal-text">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
          <div className={`rounded-card border border-border-default p-[20px] sm:p-[24px] ${tone === "muted" ? "bg-white" : "bg-bg2"}`}>
            <h3 className="text-f18 font-bold text-t1">Resin</h3>
            <p className="mt-[8px] text-f16 leading-golden text-t2">{page.resinSystem}</p>
            <h3 className="mt-[20px] border-t border-border-default pt-[16px] text-f16 font-bold text-t1">{page.standards.length ? "Standards commonly referenced" : "Project acceptance criteria"}</h3>
            <ul className="mt-[10px] flex flex-wrap gap-[6px]">
              {page.standards.map((standard) => (
                <li key={standard} className="rounded-tag border border-border-default bg-white px-[8px] py-[3px] text-f12 font-medium text-t1">
                  {standard}
                </li>
              ))}
            </ul>
            <p className="mt-[10px] text-f14 leading-golden text-t3">{page.standards.length ? "Specification and test references, not certifications of a product." : "Provide the governing project specification and required test methods. Agree the evidence and acceptance criteria for the offered grade and complete assembly."}</p>
          </div>
        </div>
      ),
    },
    {
      id: "checks",
      label: "Design checks",
      title: "Design and specification checks",
      content: (tone) => (
        <>
          <ol className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
            {page.designChecks.map((item, index) => (
              <li key={item.title} className={`rounded-card border border-border-default p-[20px] sm:p-[24px] ${tone === "muted" ? "bg-white" : "bg-bg2"}`}>
                <p className={mono}>Check {index + 1}</p>
                <h3 className="mt-[4px] text-f16 font-bold text-t1">{item.title}</h3>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{item.body}</p>
              </li>
            ))}
          </ol>
          {page.calculator !== false ? <div className="mt-[16px]">
            <CalculatorCTA
              href={calculator}
              eyebrow={bridge ? "Free tool · preliminary member screening" : "Free tool · pre-filled for this application"}
              title={`Size an FRP profile for ${page.shortTitle}`}
              sub={bridge ? "Enter your own member span, loads and material data. This calculator screens individual profiles; it does not verify a complete bridge, its connections, stability or pedestrian vibration." : "Opens the FRP profile calculator with a typical span, load and environment for this application: bending, shear and shear-corrected deflection on one screen."}
            />
          </div> : null}
        </>
      ),
    },
  ];

  if (page.deepDive) {
    const deepDive = page.deepDive;
    sections.push({
      id: "in-depth",
      label: "In depth",
      title: deepDive.heading,
      content: () => (
        <div className="max-w-[820px] space-y-[14px] text-f16 leading-golden text-t2">
          {deepDive.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      ),
    });
  }

  if (bridge) {
    sections.push(
      { id: "bridge-guide", label: "Specification guide", title: "FRP pedestrian bridge specification guide", content: () => <PedestrianBridgeGuide /> },
      { id: "faq", label: "FAQ", title: "FRP pedestrian bridge questions", content: () => <FAQList items={bridgeFaqs} /> },
    );
  }

  const tone = (index: number): Tone => (index % 2 === 0 ? "white" : "muted");
  const otherApplications = applicationPages.filter((other) => other.slug !== page.slug).map((other) => ({ href: `/applications/${other.slug}`, label: other.shortTitle }));

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        tag="Applications"
        line={{ name: "Application", label: page.shortTitle, mark: false }}
        updated={page.lastModified}
        title={page.h1}
        description={page.intro}
        figure={
          <Figure number={1} title={page.shortTitle} note={page.imageNote} caption={page.imageCaption ?? `Application context for ${page.shortTitle}. Final member sizes, laminate, connections and code checks remain project-specific.`} bleed>
            <div className="relative aspect-[3/2]">
              <Image src={page.image} alt={page.imageAlt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request a quote", href: quoteHref },
          secondary: page.calculator === false ? { label: "Review design checks", href: "#checks", variant: "secondary" } : { label: "Size a profile", href: calculator, variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Applications", href: "/applications" },
          { label: page.shortTitle },
        ]}
      />
      <PageNav items={[...sections.map((section) => ({ id: section.id, label: section.label })), { id: "quote", label: "Quote" }]} />

      {sections.map((section, index) => (
        <PageSection key={section.id} id={section.id} title={section.title} intro={section.intro} count={section.count} tone={tone(index)}>
          {section.content(tone(index))}
        </PageSection>
      ))}

      <RelatedLinks
        background={tone(sections.length) === "white" ? "white" : "bg2"}
        groups={[
          { title: "Related product pages", links: page.related },
          {
            title: "Core resources",
            links: [
              { href: "/pultruded-frp-profiles", label: "Pultruded FRP profiles hub" },
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel and aluminum" },
              { href: "/technology/quality-testing", label: "Quality testing and standards" },
              { href: "/resources/technical-data", label: "Technical data" },
            ],
          },
          { title: "Other application guides", links: otherApplications },
        ]}
      />

      <PageSection id="quote" title={`Quote ${page.shortTitle}`} tone="deep">
        <ProductRfq
          product={page.shortTitle}
          productPath={path}
          quoteHref={quoteHref}
          items={page.rfqInputs.map((input) => ({ title: input }))}
          intro={bridge ? "Start with the span, width, site conditions and a sketch, with the owner's design criteria, the delivery scope you want and the destination." : "Send the inputs below with a drawing or sketch, and the destination."}
          advisorPrompt={`I am evaluating ${page.shortTitle}. Please recommend profile families, resin system, standards, and RFQ details for my project.`}
        />
      </PageSection>
    </>
  );
}
