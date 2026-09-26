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
    "Who writes F1 Composite's technical articles and guides: our application engineer, R&D lead and industry researcher, with their fields and articles.",
  path: pagePath,
});

const authorsCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.f1composite.com/about/authors#collection",
  url: "https://www.f1composite.com/about/authors",
  name: "F1 Composite Authors",
  description:
    "The people who write F1 Composite's technical articles: application engineering, materials R&D and industry research.",
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
        title="Who writes our technical content"
        description="The articles, comparisons and guides on this site are written by an application engineer, our R&D lead and an industry researcher."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Authors" },
        ]}
      />

      <section className="bg-bg2 py-[89px]">
        <div className="site-container">
          <SectionTag>Author roster</SectionTag>
          <h2 className="mt-[8px] text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.15] text-t1">
            Authors
          </h2>
          <p className="mt-[13px] text-f16 leading-golden text-t2">
            Each article names the person responsible for it. News commentary and sourcing guides without a single author are published under the company name.
          </p>

          <div className="mt-[34px] grid gap-[21px] md:grid-cols-3">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/about/authors/${author.slug}`}
                className="group flex flex-col rounded-[8px] border border-border-default bg-white p-[21px] transition-all duration-300 hover:border-teal hover:shadow-lg"
              >
                <span
                  className="inline-block self-start rounded-full px-[10px] py-[4px] text-f12 font-bold uppercase tracking-[0.16em] text-white"
                  style={{ backgroundColor: author.accent }}
                >
                  {author.bucketLabel}
                </span>
                <h3 className="mt-[13px] text-f18 font-bold text-t1">{author.fullName}</h3>
                <p className="mt-[5px] text-f14 font-medium text-teal-text">{author.jobTitle}</p>
                <p className="mt-[13px] text-f14 leading-golden text-t2">{author.bio}</p>
                <span className="mt-[21px] inline-block text-f14 font-bold text-teal-text transition-colors group-hover:text-teal">
                  View profile and articles →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InnerCTA title="Questions about an article? Send them to our engineering team." />
    </>
  );
}
