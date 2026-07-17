import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import InnerCTA from "@/components/sections/InnerCTA";
import SectionTag from "@/components/ui/SectionTag";
import LinkArrow from "@/components/ui/LinkArrow";
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

      {/* Table of Contents */}
      <section className="bg-white py-[34px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <div className="rounded-[8px] border border-border-default bg-bg2 p-[29px]">
            <h2 className="text-f13 font-bold uppercase tracking-wide text-t2">On this page</h2>
            <ul className="mt-[13px] grid gap-[8px] sm:grid-cols-2 lg:grid-cols-3">
              {glossaryCategories.map((category) => (
                <li key={category}>
                  <a
                    href={`#${slugifyCategory(category)}`}
                    className="text-f13 text-teal-text hover:text-teal"
                  >
                    → {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {glossaryCategories.map((category, categoryIndex) => {
        const terms = glossaryTerms.filter((t) => t.category === category);
        if (terms.length === 0) return null;
        return (
          <section
            key={category}
            id={slugifyCategory(category)}
            className={categoryIndex % 2 === 0 ? "bg-white py-[55px]" : "bg-bg2 py-[55px]"}
          >
            <div className="mx-auto max-w-[1280px] px-[34px]">
              <SectionTag>{category}</SectionTag>
              <h2 className="mt-[13px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
                {category}
              </h2>
              <dl className="mt-[34px] max-w-[900px] space-y-[29px]">
                {terms.map((t) => (
                  <div key={t.id} id={t.id} className="scroll-mt-[100px]">
                    <dt className="text-f19 font-bold text-t1">{t.term}</dt>
                    <dd className="mt-[8px] text-f15 leading-golden text-t2">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        );
      })}

      {/* Related */}
      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <h2 className="mb-[21px] text-f19 font-bold text-t1">Keep exploring</h2>
          <div className="flex flex-wrap gap-[13px]">
            <LinkArrow href="/what-is-frp">What is FRP? (complete guide)</LinkArrow>
            <LinkArrow href="/technology/pultrusion-process">Pultrusion process explained</LinkArrow>
            <LinkArrow href="/technology/frp-vs-traditional-materials">FRP vs steel vs aluminum</LinkArrow>
            <LinkArrow href="/pultruded-frp-profiles">Pultruded FRP profiles hub</LinkArrow>
            <LinkArrow href="/resources/technical-data">Technical data sheets</LinkArrow>
            <LinkArrow href="/ask">Ask the AI engineering assistant</LinkArrow>
          </div>
          <p className="mt-[21px] text-f15 leading-golden text-t2">
            Looking for a term that is not listed?{" "}
            <Link href="/contact" className="font-semibold text-teal-text hover:text-teal">
              Ask our engineering team
            </Link>{" "}
            — we will define it and add it here.
          </p>
        </div>
      </section>

      <InnerCTA title="Talk to our FRP engineers about your project" />
    </>
  );
}

function slugifyCategory(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
