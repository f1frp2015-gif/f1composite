import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import PageSection from "@/components/layout/PageSection";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { authorField, authorInitials, authors } from "@/lib/authors";
import { blogPosts } from "@/content/data/blogPosts";

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

// Articles signed by each author; the rest carry the company name.
const articleCounts = new Map(authors.map((author) => [author.slug, blogPosts.filter((post) => post.authorName === author.fullName).length]));
const signedArticles = [...articleCounts.values()].reduce((sum, count) => sum + count, 0);

export default function AuthorsIndexPage() {
  return (
    <>
      <JsonLd data={authorsCollectionSchema} />
      <PageHeader
        tag="Company"
        title="Who writes our technical content"
        description="The articles, comparisons and guides on this site are written by an application engineer, our R&D lead and an industry researcher."
        facts={[
          { label: "Authors", value: String(authors.length) },
          { label: "Signed articles", value: String(signedArticles) },
          { label: "Company-signed", value: String(blogPosts.length - signedArticles) },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Authors" },
        ]}
      />

      <PageSection
        id="authors"
        title="The authors"
        intro="Each article names the person responsible for it. News commentary and sourcing guides without a single author are published under the company name."
        tone="muted"
      >
        <ul className="grid gap-[12px] md:grid-cols-3 lg:gap-[16px]">
          {authors.map((author) => {
            const count = articleCounts.get(author.slug) ?? 0;
            return (
              <li key={author.slug}>
                <Link
                  href={`/about/authors/${author.slug}`}
                  className="group flex h-full flex-col rounded-card border border-border-default bg-white p-[20px] transition-[border-color,box-shadow] duration-200 hover:border-teal-border hover:shadow-card sm:p-[24px]"
                >
                  <span className="flex items-center gap-[12px]">
                    <span aria-hidden className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-teal-bg2 font-mono text-f16 font-medium text-teal-text">
                      {authorInitials(author)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-f12 uppercase tracking-[0.06em] text-t3">{authorField(author)}</span>
                      <h3 className="mt-[2px] text-f18 font-bold leading-snug text-t1 transition-colors group-hover:text-teal-text">{author.fullName}</h3>
                    </span>
                  </span>
                  <span className="mt-[12px] block text-f14 font-medium text-t1">{author.jobTitle}</span>
                  <span className="mt-[8px] block text-f14 leading-golden text-t2">{author.bio}</span>
                  <span className="mt-auto pt-[16px] text-f14 font-semibold text-teal-text">
                    {count} {count === 1 ? "article" : "articles"} · View profile <span aria-hidden>→</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <InnerCTA
        title="Questions about an article? Send them to our engineering team."
        text="Send the article, your question and the project it concerns."
      />
    </>
  );
}
