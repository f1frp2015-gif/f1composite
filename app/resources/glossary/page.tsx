import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { glossaryCategories, glossaryTerms } from "@/content/data/glossary";

const pageTitle = "FRP & Pultrusion Glossary — Composite Terminology";
const pageDescription =
  "Plain-language definitions of key FRP and pultrusion terms: resins, reinforcements, mechanical properties, products, fenestration, and standards.";
const pagePath = "/resources/glossary";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

export default function GlossaryPage() {
  const glossarySchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": absoluteUrl(pagePath),
    name: "FRP & Pultrusion Glossary",
    description: pageDescription,
    url: absoluteUrl(pagePath),
    inLanguage: "en",
    hasDefinedTerm: glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": absoluteUrl(`${pagePath}#${t.id}`),
      name: t.term,
      description: t.definition,
      inDefinedTermSet: absoluteUrl(pagePath),
    })),
  };

  return (
    <>
      <JsonLd data={glossarySchema} />
      <PageHeader
        tag="Glossary"
        title="FRP & pultrusion glossary"
        description="Plain-language definitions of the materials, process, properties, products, and standards behind pultruded fiber reinforced polymer (FRP). Written for engineers, specifiers, and procurement professionals working with composites for the first time."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Glossary" },
        ]}
      />

      <PageNav items={glossaryCategories.map((category) => ({ id: slugifyCategory(category), label: shortLabel(category) }))} />

      {glossaryCategories.map((category, categoryIndex) => {
        const terms = glossaryTerms.filter((t) => t.category === category);
        if (terms.length === 0) return null;
        return (
          <PageSection key={category} id={slugifyCategory(category)} title={category} count={`${terms.length} terms`} tone={categoryIndex % 2 === 0 ? "white" : "muted"}>
            <dl className="divide-y divide-border-default border-y border-border-default">
              {terms.map((t) => (
                <div key={t.id} id={t.id} className="grid scroll-mt-[40px] gap-[4px] py-[16px] md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-[32px]">
                  <dt className="text-f16 font-bold text-t1">{t.term}</dt>
                  <dd className="max-w-[760px] text-f16 leading-golden text-t2">{t.definition}</dd>
                </div>
              ))}
            </dl>
          </PageSection>
        );
      })}

      <RelatedLinks
        title="Keep exploring"
        background={glossaryCategories.length % 2 === 0 ? "white" : "bg2"}
        groups={[
          {
            title: "Basics",
            links: [
              { href: "/resources/blog/frp-meaning", label: "FRP full form and meaning" },
              { href: "/what-is-frp", label: "What is FRP? The complete guide" },
              { href: "/technology/pultrusion-process", label: "The pultrusion process explained" },
            ],
          },
          {
            title: "Comparisons and data",
            links: [
              { href: "/technology/frp-vs-traditional-materials", label: "FRP vs steel and aluminum" },
              { href: "/pultruded-frp-profiles", label: "All pultruded FRP profiles" },
              { href: "/resources/technical-data", label: "Technical data" },
            ],
          },
          {
            title: "Missing a term?",
            links: [
              { href: "/ask", label: "Ask the engineering assistant" },
              { href: "/contact", label: "Ask our engineers to define it here" },
            ],
          },
        ]}
      />

      <InnerCTA title="Talk to our FRP engineers about your project" />
    </>
  );
}

// The section bar names each category in a word.
const navLabels: Record<string, string> = {
  "Materials & constituents": "Materials",
  "The pultrusion process": "Process",
  "Mechanical & physical properties": "Properties",
  "Products & forms": "Products",
  Fenestration: "Fenestration",
  "Standards & design codes": "Standards",
};

function shortLabel(category: string) {
  return navLabels[category] ?? category;
}

function slugifyCategory(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
