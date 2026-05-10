import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import SectionTag from "@/components/ui/SectionTag";
import InnerCTA from "@/components/sections/InnerCTA";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { authors, authorsBySlug } from "@/lib/authors";
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
  return buildPageMetadata({
    title: `${author.fullName} — F1 Composite`,
    description: `${author.fullName}. ${author.jobTitle}. ${author.bio.slice(0, 80)}...`,
    path: `/about/authors/${author.slug}`,
  });
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = authorsBySlug[slug];
  if (!author) notFound();

  const posts = blogPosts
    .filter((p) => p.authorName === author.fullName)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  const sameAs = [author.linkedinUrl, author.orcidUrl].filter(
    (v): v is string => Boolean(v && v.trim()),
  );

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.fullName,
    jobTitle: author.jobTitle,
    description: author.bio,
    url: absoluteUrl(`/about/authors/${author.slug}`),
    worksFor: {
      "@id": "https://www.f1composite.com/#organization",
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
    },
    knowsAbout: author.knowsAbout,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <PageHeader
        tag={author.bucketLabel}
        title={author.fullName}
        description={author.jobTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Authors", href: "/about/authors" },
          { label: author.name },
        ]}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto max-w-[900px] px-[34px]">
          <p className="text-f17 leading-golden text-t2">{author.bio}</p>

          <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
            <div>
              <SectionTag>Expertise</SectionTag>
              <ul className="mt-[13px] space-y-[8px] text-f15 leading-golden text-t2">
                {author.expertise.map((item) => (
                  <li key={item} className="flex gap-[8px]">
                    <span
                      className="mt-[8px] inline-block h-[6px] w-[6px] flex-none rounded-full"
                      style={{ backgroundColor: author.accent }}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionTag>Knows about</SectionTag>
              <div className="mt-[13px] flex flex-wrap gap-[8px]">
                {author.knowsAbout.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-border-default bg-bg2 px-[10px] py-[5px] text-f13 text-t2"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {sameAs.length > 0 && (
            <div className="mt-[34px]">
              <SectionTag>Verifiable profiles</SectionTag>
              <ul className="mt-[13px] flex flex-wrap gap-[13px] text-f13 font-semibold text-teal-text">
                {sameAs.map((url) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-teal">
                      {url.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="bg-bg2 py-[55px]">
        <div className="mx-auto max-w-[900px] px-[34px]">
          <SectionTag>Articles by {author.name}</SectionTag>
          <h2 className="mt-[8px] text-[clamp(20px,2.5vw,28px)] font-extrabold leading-[1.2] text-t1">
            {posts.length} published article{posts.length === 1 ? "" : "s"}
          </h2>
          {posts.length === 0 ? (
            <p className="mt-[13px] text-f15 text-t2">No articles attributed yet.</p>
          ) : (
            <ul className="mt-[21px] space-y-[13px]">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="rounded-[8px] border border-border-default bg-white p-[16px]"
                >
                  <Link
                    href={`/resources/blog/${post.slug}`}
                    className="text-f15 font-bold text-t1 hover:text-teal-text"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-[5px] text-f13 text-t3">
                    {post.category} · Updated {post.updatedAt} · {post.readTime}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <InnerCTA title={`Reach the ${author.bucketLabel.toLowerCase()} desk — engineering responds within one business day.`} />
    </>
  );
}
