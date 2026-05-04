import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import AskAICard from "@/components/ai/AskAICard";
import ArticleSummarizer from "@/components/ai/ArticleSummarizer";
import JsonLd from "@/components/seo/JsonLd";
import { blogPosts, blogPostsBySlug } from "@/content/data/blogPosts";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { prefillForBlog } from "@/lib/aiPrefill";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    return { title: "Blog Post" };
  }

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/resources/blog/${slug}`,
    image: `/resources/blog/${slug}/opengraph-image`,
  });
}

function renderArticleContent(content: string) {
  const blocks = content.split("\n\n");
  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const paragraph = blocks[i];
    const index = i;

    // Table: collect consecutive blocks that start with |
    if (paragraph.startsWith("|")) {
      const tableLines: string[] = [];
      let j = i;
      while (j < blocks.length) {
        const block = blocks[j];
        if (block.startsWith("|")) {
          block.split("\n").forEach((line) => {
            if (line.trim()) tableLines.push(line.trim());
          });
          j++;
        } else {
          break;
        }
      }
      i = j;

      // Parse: first line = headers, second = separator (skip), rest = rows
      const headerCells = tableLines[0].split("|").filter((c) => c.trim()).map((c) => c.trim());
      const dataRows = tableLines.slice(2).map((line) =>
        line.split("|").filter((c) => c.trim()).map((c) => c.trim())
      );

      result.push(
        <div key={index} className="my-[21px] overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-border-default">
                {headerCells.map((cell, ci) => (
                  <th key={ci} className="py-[13px] pr-[21px] text-f13 font-bold uppercase tracking-wide text-t1">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, ri) => (
                <tr key={ri} className="border-b border-border-default">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`py-[13px] pr-[21px] text-f15 ${ci === 0 ? "font-medium text-t1" : "text-t2"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    i++;

    if (paragraph.startsWith("## ")) {
      result.push(
        <h2 key={index} className="mb-[13px] mt-[34px] text-f24 font-bold text-t1">
          {paragraph.replace("## ", "")}
        </h2>
      );
      continue;
    }

    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
      result.push(
        <h3 key={index} className="mb-[8px] mt-[21px] text-f15 font-bold text-t1">
          {paragraph.replace(/\*\*/g, "")}
        </h3>
      );
      continue;
    }

    if (paragraph.startsWith("**")) {
      const parts = paragraph.split("**");
      result.push(
        <p key={index} className="mb-[13px] text-f15 leading-golden text-t2">
          <strong className="text-t1">{parts[1]}</strong>
          {parts.slice(2).join("**")}
        </p>
      );
      continue;
    }

    const linkBlockMatch = paragraph.match(/^\[(.+?)\]\((.+?)\)$/);
    if (linkBlockMatch) {
      result.push(
        <p key={index} className="my-[21px]">
          <a
            href={linkBlockMatch[2]}
            target={linkBlockMatch[2].startsWith("/") ? undefined : "_blank"}
            rel={linkBlockMatch[2].startsWith("/") ? undefined : "noopener noreferrer"}
            className="inline-flex items-center gap-[8px] rounded-[6px] border border-teal bg-teal/5 px-[16px] py-[12px] text-f14 font-semibold text-teal-text transition-colors hover:bg-teal/10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M4 14V2h8l2 3v9H4z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M6 9h4M6 11h3" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {linkBlockMatch[1]}
          </a>
        </p>
      );
      continue;
    }

    const videoMatch = paragraph.match(/^\[video:(.+?)(?:\|(.+?))?\]$/);
    if (videoMatch) {
      result.push(
        <figure key={index} className="my-[21px] overflow-hidden rounded-[8px] border border-border-default bg-black">
          <video
            src={videoMatch[1]}
            controls
            playsInline
            preload="metadata"
            className="w-full"
          />
          {videoMatch[2] && (
            <figcaption className="border-t border-border-default bg-bg2 px-[21px] py-[13px] text-f13 leading-golden text-t2">
              {videoMatch[2]}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    result.push(
      <p key={index} className="mb-[13px] text-f15 leading-golden text-t2">
        {paragraph}
      </p>
    );
  }

  return result;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPostsBySlug[slug];

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.updatedAt,
    image: [
      absoluteUrl(post.coverImage),
      absoluteUrl(`/resources/blog/${slug}/opengraph-image`),
    ],
    author: {
      "@type": "Organization",
      name: post.authorName,
    },
    editor: {
      "@type": "Organization",
      name: post.reviewedBy,
    },
    publisher: {
      "@type": "Organization",
      name: "F1 Composite",
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/f1-logo.png") },
    },
    description: post.excerpt,
    mainEntityOfPage: absoluteUrl(`/resources/blog/${slug}`),
    citation: [...post.standards, ...(post.sourceLinks?.map((link) => link.href) ?? [])],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        tag="Blog"
        title={post.title}
        description={`${post.date} · ${post.readTime} read`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Blog", href: "/resources/blog" },
          { label: post.title },
        ]}
      />

      <ArticleSignals
        publishedAt={post.date}
        updatedAt={post.updatedAt}
        authorName={post.authorName}
        authorRole={post.authorRole}
        reviewedBy={post.reviewedBy}
        standards={post.standards}
      />

      <section className="bg-white py-[55px]">
        <div className="mx-auto grid max-w-[1280px] gap-[34px] px-[34px] lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <figure className="overflow-hidden rounded-[8px] border border-border-default bg-white">
              <div className="relative aspect-[1.618] bg-bg2">
                <Image
                  src={post.coverImage}
                  alt={post.coverAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 960px"
                  className="object-cover"
                  style={
                    post.coverImagePosition
                      ? { objectPosition: post.coverImagePosition }
                      : undefined
                  }
                  priority
                />
              </div>
              <figcaption className="border-t border-border-default bg-bg2 px-[21px] py-[13px] text-f13 leading-golden text-t2">
                <p>{post.excerpt}</p>
                {post.coverAttribution ? (
                  <p className="mt-[8px] text-f12 text-t3">
                    Image by{" "}
                    <a
                      href={post.coverAttribution.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-text hover:underline"
                    >
                      {post.coverAttribution.creator}
                    </a>{" "}
                    via {post.coverAttribution.source} ·{" "}
                    <a
                      href={post.coverAttribution.licenseHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-text hover:underline"
                    >
                      {post.coverAttribution.license}
                    </a>
                  </p>
                ) : null}
              </figcaption>
            </figure>

            <div className="mt-[21px] rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <p className="text-f12 font-semibold uppercase tracking-[0.08em] text-t3">
                Why This Article Matters
              </p>
              <div className="mt-[13px] grid gap-[8px] sm:grid-cols-3">
                {post.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-[6px] border border-border-default bg-white px-[13px] py-[13px] text-f13 leading-golden text-t2"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-[34px] max-w-[800px]">
              <ArticleSummarizer title={post.title} content={post.content} />
            </div>

            <article className="prose-f1 mt-[34px] max-w-[800px]">
              {renderArticleContent(post.content)}
            </article>

            <figure className="mt-[34px] overflow-hidden rounded-[8px] border border-border-default bg-white max-w-[800px]">
              <div className="relative aspect-[1.618] bg-bg2">
                <Image
                  src={post.supportingImage}
                  alt={post.supportingAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                  style={
                    post.supportingImagePosition
                      ? { objectPosition: post.supportingImagePosition }
                      : undefined
                  }
                />
              </div>
              <figcaption className="border-t border-border-default px-[21px] py-[13px] text-f13 leading-golden text-t2">
                <p>{post.supportingCaption}</p>
                {post.supportingAttribution ? (
                  <p className="mt-[8px] text-f12 text-t3">
                    Image by{" "}
                    <a
                      href={post.supportingAttribution.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-text hover:underline"
                    >
                      {post.supportingAttribution.creator}
                    </a>{" "}
                    via {post.supportingAttribution.source} ·{" "}
                    <a
                      href={post.supportingAttribution.licenseHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-text hover:underline"
                    >
                      {post.supportingAttribution.license}
                    </a>
                  </p>
                ) : null}
              </figcaption>
            </figure>

            {post.sourceLinks?.length ? (
              <div className="mt-[34px] max-w-[800px] border-t border-border-default pt-[21px]">
                <h3 className="mb-[13px] text-f15 font-bold text-t1">Referenced Signals</h3>
                <div className="space-y-[10px]">
                  {post.sourceLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-f13 leading-golden text-teal-text hover:underline"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-[55px] max-w-[800px] border-t border-border-default pt-[21px]">
              <h3 className="mb-[13px] text-f15 font-bold text-t1">Related Pages</h3>
              <div className="flex flex-wrap gap-[13px]">
                {post.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-f13 text-teal-text hover:underline"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-[21px] lg:sticky lg:top-[34px] lg:self-start">
            <div className="rounded-[8px] border border-border-default bg-bg2 p-[21px]">
              <p className="text-f12 font-semibold uppercase tracking-[0.08em] text-t3">
                Quick Signals
              </p>
              <div className="mt-[13px] space-y-[13px]">
                {post.highlights.map((highlight) => (
                  <div key={highlight} className="flex gap-[8px] text-f13 leading-golden text-t2">
                    <span className="mt-[5px] h-[6px] w-[6px] rounded-full bg-teal" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[8px] border border-border-default bg-white p-[21px]">
              <p className="text-f12 font-semibold uppercase tracking-[0.08em] text-t3">
                Need Project Support
              </p>
              <p className="mt-[8px] text-f13 leading-golden text-t2">
                If you need section sizing, specification language, or qualification support,
                our engineering team can help define the shortest path from idea to approved
                pultruded solution.
              </p>
              <Link
                href="/contact"
                className="mt-[13px] inline-flex rounded-[6px] bg-teal px-[13px] py-[8px] text-f12 font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-teal-text"
              >
                Talk to Engineering
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <AskAICard
        title={`Have questions about "${post.title}"?`}
        description="Open the FRP Engineering Advisor with the article context already loaded. Ask about specs, standards, profile families, or how to apply this to your project."
        prefill={prefillForBlog({ title: post.title, slug: post.slug })}
      />

      <InnerCTA />
    </>
  );
}
