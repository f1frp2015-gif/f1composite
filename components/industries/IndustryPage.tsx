import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import { GuideAdjacent, GuideApplications, GuideReferences, GuideSelection } from "@/components/industries/IndustryGuide";
import ApplicationCards from "@/components/products/ApplicationCards";
import ProductDocuments from "@/components/products/ProductDocuments";
import ProductRfq from "@/components/products/ProductRfq";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import CoverCard from "@/components/ui/CoverCard";
import { FAQList } from "@/components/ui/FAQ";
import Figure from "@/components/ui/Figure";
import SectionGlyph from "@/components/ui/SectionGlyph";
import type { IndustryGuide } from "@/content/data/industryGuides";
import { industryPages, type IndustryPageData } from "@/content/data/industryPages";
import { coverFor } from "@/lib/covers";
import { buildRfqHref } from "@/lib/rfq";
import { absoluteUrl } from "@/lib/seo";

type Tone = "white" | "muted";

interface Section {
  id: string;
  /** The section bar label; sections without one stay off the bar. */
  label?: string;
  title: string;
  count?: string;
  intro?: React.ReactNode;
  aside?: React.ReactNode;
  content: (tone: Tone) => React.ReactNode;
}

// Every industry links to the others at the foot of the page.
const otherIndustries = [
  ...Object.values(industryPages).map((page) => ({ href: page.path, label: page.name })),
  { href: "/industries/construction", label: "Buildings & construction" },
];

const dataLinks = [
  { label: "Test reports and their scope", href: "/resources/evidence" },
  { label: "Technical data", href: "/resources/technical-data" },
  { label: "Downloads and CAD", href: "/resources/downloads" },
];

/**
 * An industry page in the template from the redesign proposal: the scene,
 * where FRP is used area by area and what to check there, the products,
 * projects and applications, documents, questions and the quote block.
 *
 * Industries with a long-form guide (marine, industrial, vehicle) pass it as
 * `guide`: the application articles and the selection table follow the areas
 * table, the references follow the projects. Sections alternate white and
 * pale grounds in whatever order they end up; the quote block is dark.
 */
export default function IndustryPage({ industry, description, guide }: { industry: IndustryPageData; description: string; guide?: IndustryGuide }) {
  const quote = buildRfqHref({ source: `industry-${industry.slug}`, product: `FRP for ${industry.name.toLowerCase()}`, productPath: industry.path });
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(industry.path)}#webpage`,
    name: industry.h1,
    description,
    url: absoluteUrl(industry.path),
    dateModified: industry.updated,
    about: { "@type": "Thing", name: `FRP profiles for ${industry.name.toLowerCase()}` },
    isPartOf: { "@id": "https://www.f1composite.com/#website" },
    provider: { "@id": "https://www.f1composite.com/#organization" },
  };

  const sections: Section[] = [
    {
      id: "areas",
      label: "Where FRP is used",
      title: "Where FRP is used, area by area",
      intro: industry.areasIntro,
      content: () => (
        <div className="relative overflow-x-auto rounded-card border border-border-default bg-white" role="region" aria-label={`Where FRP is used in ${industry.name.toLowerCase()}`} tabIndex={0}>
          <table className="w-full min-w-[760px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {["Area", "Conditions", "Typical FRP parts", "What to check"].map((heading) => (
                  <th key={heading} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {industry.areas.map((row) => (
                <tr key={row.area} className="border-b border-border-default align-top last:border-b-0">
                  <th scope="row" className="px-[14px] py-[12px] font-bold text-t1">{row.area}</th>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{row.exposure}</td>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{row.parts}</td>
                  <td className="px-[14px] py-[12px] leading-golden text-t2">{row.check}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  if (guide) {
    sections.push(
      {
        id: "applications",
        label: "Applications",
        title: guide.applications.title,
        count: `${guide.applications.items.length} applications`,
        intro: guide.applications.intro,
        content: () => <GuideApplications guide={guide} firstFigure={2} />,
      },
      {
        id: "selection",
        label: "Selection",
        title: guide.selection.title,
        intro: guide.selection.intro,
        content: (tone) => <GuideSelection selection={guide.selection} cardTone={tone} />,
      },
    );
    if (guide.adjacent) {
      const adjacent = guide.adjacent;
      sections.push({ id: "adjacent", title: adjacent.title, content: (tone) => <GuideAdjacent adjacent={adjacent} cardTone={tone} /> });
    }
  }

  sections.push({
    id: "products",
    label: "Products",
    title: "Products",
    count: `${industry.products.length} product families`,
    content: () => (
      <ul className="grid grid-cols-2 gap-[12px] lg:grid-cols-3 lg:gap-[16px]">
        {industry.products.map((product) => {
          const cover = coverFor(product.href);
          return (
            <li key={product.href}>
              {cover ? (
                <CoverCard href={product.href} cover={cover} title={product.label} text={product.reason} compact sizes="(max-width: 1023px) 46vw, 380px" />
              ) : (
                <Link href={product.href} className="flex h-full items-start gap-[14px] rounded-card border border-border-default bg-white p-[16px] transition-colors hover:border-teal-border">
                  <SectionGlyph shape={product.glyph} size={40} />
                  <span>
                    <span className="block text-f16 font-bold text-t1">{product.label}</span>
                    <span className="mt-[4px] block text-f14 leading-golden text-t2">{product.reason}</span>
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    ),
  });

  if (industry.projects.length) {
    sections.push({ id: "projects", label: "Projects", title: "Projects and applications", content: () => <ApplicationCards cards={industry.projects} /> });
  }

  if (guide?.references) {
    const references = guide.references;
    sections.push({ id: "references", label: "References", title: "Standards and references", intro: references.intro, content: () => <GuideReferences references={references} /> });
  }

  sections.push(
    { id: "documents", label: "Documents", title: "Documents", content: () => <ProductDocuments productPaths={industry.documentPaths} /> },
    { id: "faq", label: "FAQ", title: "Questions buyers ask", content: () => <FAQList items={industry.faqs} /> },
  );

  const tone = (index: number): Tone => (index % 2 === 0 ? "white" : "muted");
  const relatedGroups = [
    ...(industry.reading.length ? [{ title: "Guides and comparisons", links: industry.reading }] : []),
    { title: "Data and evidence", links: guide ? guide.resources : dataLinks },
    { title: "Other industries", links: otherIndustries.filter((link) => link.href !== industry.path) },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        tag="Industries"
        line={{ name: "Industry", label: industry.name, mark: false }}
        updated={industry.updated}
        title={industry.h1}
        description={industry.intro}
        figure={
          <Figure number={1} title={industry.name} note={industry.image.note} caption={industry.image.caption} bleed>
            <div className="relative aspect-[16/10]">
              <Image src={industry.image.src} alt={industry.image.alt} fill sizes="(max-width: 1023px) 94vw, 44vw" className="object-cover" preload />
            </div>
          </Figure>
        }
        actions={{
          primary: { label: "Request a quote", href: quote },
          secondary: { label: guide ? "See the applications" : "See the products", href: guide ? "#applications" : "#products", variant: "secondary" },
          stickyMobile: true,
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
      />
      <PageNav items={[...sections.flatMap((section) => (section.label ? [{ id: section.id, label: section.label }] : [])), { id: "quote", label: "Quote" }]} />

      {sections.map((section, index) => (
        <PageSection key={section.id} id={section.id} title={section.title} count={section.count} intro={section.intro} aside={section.aside} tone={tone(index)}>
          {section.content(tone(index))}
        </PageSection>
      ))}

      <RelatedLinks title="Related guides and industries" groups={relatedGroups} background={tone(sections.length) === "white" ? "white" : "bg2"} />

      <PageSection id="quote" title={`Quote FRP for ${industry.name.toLowerCase()}`} tone="deep">
        <ProductRfq product={`FRP for ${industry.name.toLowerCase()}`} productPath={industry.path} quoteHref={quote} items={industry.request} intro={industry.quoteIntro ?? "Send what the parts do, the loads and exposure, the requirements that apply and the destination."} />
      </PageSection>
    </>
  );
}
