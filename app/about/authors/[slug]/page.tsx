import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import PageNav from "@/components/layout/PageNav";
import PageSection from "@/components/layout/PageSection";
import BlogCard from "@/components/blog/BlogCard";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { authorField, authorInitials, authors, authorsBySlug } from "@/lib/authors";
import { formatShortDate } from "@/lib/dates";
import { blogPosts } from "@/content/data/blogPosts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = authorsBySlug[slug];
  if (!author) return {};
  const desc = author.seoDescription
    ?? `${author.name}, ${author.jobTitle.slice(0, 110)}`.slice(0, 155);
  return buildPageMetadata({
    title: `${author.fullName} — F1 Composite`,
    description: desc,
    path: `/about/authors/${author.slug}`,
  });
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = authorsBySlug[slug];
  if (!author) notFound();

  const posts = blogPosts
    .filter((p) => p.authorName === author.fullName)
    // Newest first, by the publication date each card shows.
    .sort((a, b) => b.date.localeCompare(a.date));
  const latestUpdate = posts.reduce<string | null>((latest, post) => (latest && latest > post.updatedAt ? latest : post.updatedAt), null);

  const sameAs = [author.linkedinUrl, author.orcidUrl].filter(
    (v): v is string => Boolean(v && v.trim()),
  );

  const profileUrl = absoluteUrl(`/about/authors/${author.slug}`);
  const personId = `${profileUrl}#person`;
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${profileUrl}#profilepage`,
    url: profileUrl,
    name: `${author.fullName} — F1 Composite author profile`,
    isPartOf: { "@id": "https://www.f1composite.com/#website" },
    mainEntity: {
      "@type": "Person",
      "@id": personId,
      name: author.name,
      ...(author.credentials === "Ph.D." ? { honorificSuffix: "Ph.D." } : {}),
      jobTitle: author.jobTitle,
      description: author.bio,
      url: profileUrl,
      worksFor: { "@id": "https://www.f1composite.com/#organization" },
      knowsAbout: author.knowsAbout,
      ...(sameAs.length > 0 ? { sameAs } : {}),
    },
    hasPart: posts.map((post) => ({
      "@type": "TechArticle",
      headline: post.title,
      url: absoluteUrl(`/resources/blog/${post.slug}`),
      dateModified: post.updatedAt,
      author: { "@id": personId },
    })),
  };

  return (
    <>
      <JsonLd data={profilePageSchema} />
      <PageHeader
        tag="Author"
        title={author.fullName}
        description={author.jobTitle}
        facts={[
          { label: "Field", value: authorField(author) },
          { label: "Signed articles", value: String(posts.length) },
          ...(latestUpdate ? [{ label: "Latest update", value: formatShortDate(latestUpdate) }] : []),
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Authors", href: "/about/authors" },
          { label: author.name },
        ]}
      />

      <PageNav
        items={[
          { id: "profile", label: "Profile" },
          { id: "articles", label: "Articles", count: posts.length },
        ]}
      />

      <PageSection id="profile" title="Profile" tone="white">
        <div className="grid gap-[32px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-[56px]">
          <div className="flex items-start gap-[16px]">
            <span aria-hidden className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-teal-bg2 font-mono text-f18 font-medium text-teal-text">
              {authorInitials(author)}
            </span>
            <div>
              <p className="text-f18 leading-golden text-t1">{author.bio}</p>
              {sameAs.length > 0 && (
                <ul className="mt-[16px] flex flex-wrap gap-x-[16px] gap-y-[4px] text-f14">
                  {sameAs.map((url) => (
                    <li key={url}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-text hover:underline">
                        {url.replace(/^https?:\/\//, "")}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="space-y-[24px]">
            <div>
              <h3 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Expertise</h3>
              <ul className="mt-[8px] space-y-[6px] text-f16 leading-golden text-t1">
                {author.expertise.map((item) => (
                  <li key={item} className="flex gap-[12px]">
                    <span aria-hidden className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">Knows about</h3>
              <ul className="mt-[8px] flex flex-wrap gap-[6px]">
                {author.knowsAbout.map((topic) => (
                  <li key={topic} className="rounded-tag border border-border-default bg-bg2 px-[8px] py-[3px] text-f12 font-medium text-t1">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="articles"
        title={`Articles by ${author.name}`}
        count={`${posts.length} ${posts.length === 1 ? "article" : "articles"}`}
        intro="Newest first."
        tone="muted"
      >
        {posts.length === 0 ? (
          <p className="text-f16 text-t2">No articles attributed yet.</p>
        ) : (
          <ul className="grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[16px]">
            {posts.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </PageSection>

      <InnerCTA
        title={`Questions for ${author.name}? Send them to our engineering team.`}
        text="Send the article, your question and the project it concerns."
      />
    </>
  );
}
