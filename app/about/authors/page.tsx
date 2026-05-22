import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { authors } from "@/lib/authors";

const pagePath = "/about/authors";

export const metadata: Metadata = buildPageMetadata({
  title: "F1 Composite Authors — Engineering, R&D, Research",
  description:
    "Named experts behind F1 Composite content: application engineers, R&D leads, industry researchers writing articles, case studies, procurement guides.",
  path: pagePath,
});

const authorsCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.f1composite.com/about/authors#collection",
  url: "https://www.f1composite.com/about/authors",
  name: "F1 Composite Authors",
  description:
    "Named experts who author F1 Composite engineering content across application engineering, R&D, and industry research.",
  isPartOf: { "@id": "https://www.f1composite.com/#website" },
  publisher: { "@id": "https://www.f1composite.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.f1composite.com/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://www.f1composite.com/about" },
      { "@type": "ListItem", position: 3, name: "Authors", item: "https://www.f1composite.com/about/authors" },
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: authors.length,
    itemListElement: authors.map((author, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        "@id": `https://www.f1composite.com/about/authors/${author.slug}#person`,
        name: author.fullName,
        jobTitle: author.jobTitle,
        knowsAbout: author.knowsAbout,
        url: `https://www.f1composite.com/about/authors/${author.slug}`,
        worksFor: { "@id": "https://www.f1composite.com/#organization" },
        ...(author.linkedinUrl || author.orcidUrl
          ? { sameAs: [author.linkedinUrl, author.orcidUrl].filter(Boolean) as string[] }
          : {}),
      },
    })),
  },
};

export default function AuthorsIndexPage() {
  return (
    <>
      <JsonLd data={authorsCollectionSchema} />
      <PageHeader
        tag="Authors"
        title="The named experts behind F1 Composite content"
        description="Application engineering, materials R&D, and industry research — three named expertise tracks driving every technical article, comparison, case study, and procurement guide on this site."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Authors" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="mx-auto max-w-[1280px] px-[34px]">
          <SectionTag>Author roster</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Three expertise tracks. One engineering source.
          </h2>
          <p className="mt-[13px] max-w-[760px] text-f15 leading-golden text-t2">
            Every blog post, comparison, and case-study article on F1 Composite is attributed to a named author with a specific area of accountability. That keeps the content honest about who is responsible for the conclusions and where the underlying expertise sits.
          </p>

          <div className="mt-[34px] grid gap-[21px] md:grid-cols-3">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/about/authors/${author.slug}`}
                className="group flex flex-col rounded-[8px] border border-border-default bg-white p-[21px] transition-all duration-300 hover:border-teal hover:shadow-lg"
              >
                <span
                  className="inline-block self-start rounded-full px-[10px] py-[4px] text-f11 font-bold uppercase tracking-[0.16em] text-white"
                  style={{ backgroundColor: author.accent }}
                >
                  {author.bucketLabel}
                </span>
                <h3 className="mt-[13px] text-f19 font-bold text-t1">{author.fullName}</h3>
                <p className="mt-[5px] text-f13 font-medium text-teal-text">{author.jobTitle}</p>
                <p className="mt-[13px] text-f13 leading-golden text-t2">{author.bio}</p>
                <span className="mt-[21px] inline-block text-f13 font-bold text-teal-text transition-colors group-hover:text-teal">
                  View profile and articles →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InnerCTA title="Have a question for one of our authors? Engineering responds within one business day." />
    </>
  );
}
