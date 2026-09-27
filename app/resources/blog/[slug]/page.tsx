import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import ArticleSignals from "@/components/sections/ArticleSignals";
import InnerCTA from "@/components/sections/InnerCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import ArticleSummarizer from "@/components/ai/ArticleSummarizer";
import JsonLd from "@/components/seo/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { blogPosts, blogPostsBySlug } from "@/content/data/blogPosts";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { authorSlugByName, authorsBySlug } from "@/lib/authors";
import { prefillForBlog } from "@/lib/aiPrefill";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function renderInlineMarkdown(text: string, keyPrefix: string): React.ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  let part = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-${part++}`;
    if (token.startsWith("**")) {
      nodes.push(<strong key={key} className="text-t1">{token.slice(2, -2)}</strong>);
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        if (href.startsWith("/")) {
          nodes.push(
            <Link key={key} href={href} className="font-semibold text-teal-text hover:underline">
              {label}
            </Link>,
          );
        } else if (/^https?:\/\//.test(href)) {
          nodes.push(
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-text hover:underline"
            >
              {label}
            </a>,
          );
        } else {
          nodes.push(token);
        }
      }
    }
    cursor = pattern.lastIndex;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }
  return nodes;
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
    title: post.seoTitle ?? post.title,
    description: post.ogDescription ?? post.excerpt,
    path: `/resources/blog/${slug}`,
    image: `/resources/blog/${slug}/opengraph-image`,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      section: post.category,
    },
  });
}

// Anchors for the article's own headings, used by the contents list beside it.
function headingId(text: string) {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

// The article's related links, grouped by where they lead.
function relatedGroups(links: Array<{ label: string; href: string }>) {
  const kind = (href: string) =>
    /^\/(products|pultruded-frp-profiles)/.test(href) ? "Products"
      : /^\/(industries|applications|case-studies)/.test(href) ? "Applications"
        : /^\/(technology|resources|what-is-frp)/.test(href) && !href.startsWith("/technology/frp-u-value-calculator") ? "Guides"
          : "Tools and help";
  const order = ["Products", "Applications", "Guides", "Tools and help"];
  return order
    .map((title) => ({ title, links: links.filter((link) => kind(link.href) === title) }))
    .filter((group) => group.links.length > 0);
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
        <div key={index} className="relative my-[24px] overflow-x-auto rounded-card border border-border-default bg-white">
          <table className="w-full min-w-[520px] border-collapse text-left text-f14">
            <thead>
              <tr className="border-b border-border-default bg-bg2">
                {headerCells.map((cell, ci) => (
                  <th key={ci} scope="col" className="px-[14px] py-[8px] font-semibold text-t1">
                    {renderInlineMarkdown(cell, `table-head-${index}-${ci}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, ri) => (
                <tr key={ri} className="border-b border-border-default align-top last:border-b-0">
                  {row.map((cell, ci) =>
                    ci === 0 ? (
                      <th key={ci} scope="row" className="px-[14px] py-[10px] font-semibold text-t1">
                        {renderInlineMarkdown(cell, `table-cell-${index}-${ri}-${ci}`)}
                      </th>
                    ) : (
                      <td key={ci} className="px-[14px] py-[10px] leading-golden text-t2">
                        {renderInlineMarkdown(cell, `table-cell-${index}-${ri}-${ci}`)}
                      </td>
                    ),
                  )}
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
      const heading = paragraph.replace("## ", "");
      result.push(
        <h2 key={index} id={headingId(heading)} className="mb-[12px] mt-[40px] text-f24 font-bold leading-[1.25] text-t1 first:mt-0">
          {heading}
        </h2>
      );
      continue;
    }

    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
      result.push(
        <h3 key={index} className="mb-[8px] mt-[24px] text-f18 font-bold text-t1">
          {paragraph.replace(/\*\*/g, "")}
        </h3>
      );
      continue;
    }

    const linkBlockMatch = paragraph.match(/^\[(.+?)\]\((.+?)\)$/);
    if (linkBlockMatch) {
      result.push(
        <p key={index} className="my-[24px]">
          <a
            href={linkBlockMatch[2]}
            target={linkBlockMatch[2].startsWith("/") ? undefined : "_blank"}
            rel={linkBlockMatch[2].startsWith("/") ? undefined : "noopener noreferrer"}
            className="inline-flex min-h-[46px] items-center gap-[8px] rounded-control border border-teal-border bg-teal-bg px-[16px] text-f14 font-semibold text-teal-text transition-colors hover:bg-teal-bg2"
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
        <figure key={index} className="my-[24px] overflow-hidden rounded-card border border-border-default bg-black">
          <video
            src={videoMatch[1]}
            controls
            playsInline
            preload="metadata"
            className="w-full"
          />
          {videoMatch[2] && (
            <figcaption className="border-t border-border-default bg-white px-[14px] py-[10px] text-f14 leading-golden text-t2">
              {videoMatch[2]}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    result.push(
      <p key={index} className="mb-[16px] text-f16 leading-golden text-t2">
        {renderInlineMarkdown(paragraph, `paragraph-${index}`)}
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

  const authorSlug = authorSlugByName(post.authorName);
  const authorHref = authorSlug ? `/about/authors/${authorSlug}` : undefined;
  const authorRecord = authorSlug ? authorsBySlug[authorSlug] : undefined;
  const summarizerContent = post.faq
    ? [
        post.content,
        `## ${post.faq.title}`,
        ...post.faq.items.map(
          (item) => `**${item.question}**\n\n${item.answer}`,
        ),
      ].join("\n\n")
    : post.content;

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
    author: post.authorType === "Organization" ? {
      "@type": "Organization",
      name: post.authorName,
      url: absoluteUrl("/about"),
    } : {
      "@type": "Person",
      name: authorRecord?.name ?? post.authorName,
      ...(authorRecord?.credentials === "Ph.D."
        ? { honorificSuffix: "Ph.D." }
        : {}),
      jobTitle: post.authorRole,
      ...(authorHref
        ? {
            "@id": `${absoluteUrl(authorHref)}#person`,
            url: absoluteUrl(authorHref),
          }
        : {}),
      worksFor: { "@id": "https://www.f1composite.com/#organization" },
    },
    publisher: { "@id": "https://www.f1composite.com/#organization" },
    description: post.excerpt,
    mainEntityOfPage: absoluteUrl(`/resources/blog/${slug}`),
    citation: [...post.standards, ...(post.sourceLinks?.map((link) => link.href) ?? [])],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "aside[aria-label='Article summary'] blockquote", ".prose-f1 p:first-of-type"],
    },
    ...(post.answerBox
      ? {
          abstract: post.answerBox,
        }
      : {}),
  };

  const headings = post.content
    .split("\n\n")
    .filter((block) => block.startsWith("## "))
    .map((block) => block.replace("## ", ""));
  const mono = "font-mono text-f12 uppercase tracking-[0.06em] text-t3";

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHeader
        tag={post.category}
        title={post.title}
        description={post.excerpt}
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
        readTime={post.readTime}
        authorName={post.authorName}
        authorRole={post.authorRole}
        authorHref={authorHref}
        reviewedBy={post.reviewedBy}
        standards={post.standards}
      />

      <section className="bg-white py-[40px] md:py-[56px]">
        <div className="site-container grid gap-[40px] lg:grid-cols-[minmax(0,800px)_minmax(0,1fr)] lg:gap-[56px]">
          <div className="min-w-0">
            <figure className="overflow-hidden rounded-card border border-border-default bg-white">
              <div className="relative aspect-[1.618] bg-bg2">
                <Image
                  src={post.coverImage}
                  alt={post.coverAlt}
                  fill
                  sizes="(max-width: 1023px) 94vw, 800px"
                  className={post.coverImageFit === "contain" ? "object-contain" : "object-cover"}
                  style={
                    post.coverImagePosition && post.coverImageFit !== "contain"
                      ? { objectPosition: post.coverImagePosition }
                      : undefined
                  }
                  preload
                />
                <span className="absolute right-[8px] top-[8px] rounded-tag bg-white/90 px-[6px] py-[2px] font-mono text-f12 uppercase tracking-[0.06em] text-t2">
                  {post.coverNote}
                </span>
              </div>
              {post.coverAttribution ? (
                <figcaption className="border-t border-border-default px-[14px] py-[10px] text-f12 leading-golden text-t3">
                  Image by{" "}
                  <a href={post.coverAttribution.href} target="_blank" rel="noopener noreferrer" className="text-teal-text hover:underline">
                    {post.coverAttribution.creator}
                  </a>{" "}
                  via {post.coverAttribution.source} ·{" "}
                  <a href={post.coverAttribution.licenseHref} target="_blank" rel="noopener noreferrer" className="text-teal-text hover:underline">
                    {post.coverAttribution.license}
                  </a>
                </figcaption>
              ) : null}
            </figure>

            {post.answerBox ? (
              <aside aria-label="Article summary" className="mt-[24px] rounded-card border-l-4 border-l-teal bg-teal-bg px-[20px] py-[16px]">
                <p className={mono}>Short answer</p>
                <blockquote className="mt-[8px] text-f16 leading-golden text-t1">{post.answerBox}</blockquote>
              </aside>
            ) : null}

            {post.masterComparison ? (
              <aside aria-label="Master comparison page" className="mt-[12px] rounded-card border border-teal-border bg-white p-[20px]">
                <p className={mono}>Part of a larger comparison</p>
                <p className="mt-[8px] text-f14 leading-golden text-t2">{post.masterComparison.note}</p>
                <Link href={post.masterComparison.href} className="mt-[4px] inline-flex min-h-[44px] items-center text-f16 font-bold text-teal-text hover:underline">
                  {post.masterComparison.label} <span aria-hidden="true" className="ml-[4px]">→</span>
                </Link>
              </aside>
            ) : null}

            <div className="mt-[12px] rounded-card border border-border-default bg-bg2 p-[20px]">
              <p className={mono}>Key points</p>
              <ul className="mt-[8px] space-y-[8px]">
                {post.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-[10px] text-f14 leading-golden text-t2">
                    <span aria-hidden="true" className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-teal" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-[24px]">
              <ArticleSummarizer title={post.title} content={summarizerContent} />
            </div>

            <article className="prose-f1 mt-[40px]">
              {renderArticleContent(post.content)}
              {post.faq ? (
                <FAQ
                  title={post.faq.title}
                  items={post.faq.items.map((item, index) => ({
                    question: item.question,
                    answer: renderInlineMarkdown(item.answer, `faq-${slug}-${index}`),
                  }))}
                />
              ) : null}
            </article>

            <figure className="mt-[40px] overflow-hidden rounded-card border border-border-default bg-white">
              <div className="relative aspect-[1.618] bg-bg2">
                <Image
                  src={post.supportingImage}
                  alt={post.supportingAlt}
                  fill
                  sizes="(max-width: 1023px) 94vw, 800px"
                  className={post.supportingImageFit === "contain" ? "object-contain" : "object-cover"}
                  style={
                    post.supportingImagePosition && post.supportingImageFit !== "contain"
                      ? { objectPosition: post.supportingImagePosition }
                      : undefined
                  }
                />
              </div>
              <figcaption className="border-t border-border-default px-[14px] py-[10px] text-f14 leading-golden text-t2">
                <p>{post.supportingCaption}</p>
                {post.supportingAttribution ? (
                  <p className="mt-[4px] text-f12 text-t3">
                    Image by{" "}
                    <a href={post.supportingAttribution.href} target="_blank" rel="noopener noreferrer" className="text-teal-text hover:underline">
                      {post.supportingAttribution.creator}
                    </a>{" "}
                    via {post.supportingAttribution.source} ·{" "}
                    <a href={post.supportingAttribution.licenseHref} target="_blank" rel="noopener noreferrer" className="text-teal-text hover:underline">
                      {post.supportingAttribution.license}
                    </a>
                  </p>
                ) : null}
              </figcaption>
            </figure>

            {post.sourceLinks?.length ? (
              <div className="mt-[40px] border-t border-border-default pt-[20px]">
                <h2 className="text-f18 font-bold text-t1">Sources</h2>
                <ul className="mt-[8px] space-y-[4px]">
                  {post.sourceLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[32px] items-center text-f14 leading-golden text-teal-text hover:underline">
                        {link.label} <span aria-hidden="true" className="ml-[4px]">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-[112px] space-y-[16px]">
              {headings.length >= 2 ? (
                <nav aria-label="Article contents" className="border-l border-border-default pl-[16px]">
                  <p className={mono}>On this page</p>
                  <ol className="mt-[8px] space-y-[2px]">
                    {headings.map((heading) => (
                      <li key={heading}>
                        <a href={`#${headingId(heading)}`} className="block py-[4px] text-f14 leading-golden text-t2 hover:text-teal-text">
                          {heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <div className="rounded-card border border-border-default bg-bg2 p-[20px]">
                <p className={mono}>Project support</p>
                <p className="mt-[8px] text-f14 leading-golden text-t2">
                  Need a section sized, specification wording checked, or test documents for an
                  approval? Send the details to our engineering team.
                </p>
                <Link href="/contact?source=blog-aside&inquiry_type=technical" className="mt-[12px] inline-flex min-h-[40px] items-center rounded-control bg-teal-text px-[16px] text-f14 font-bold text-white transition-colors hover:bg-teal">
                  Talk to engineering
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <RelatedLinks title="Related products, applications and tools" background="bg2" groups={relatedGroups(post.relatedLinks)} />

      <InnerCTA advisorPrompt={prefillForBlog({ title: post.title, slug: post.slug })} />
    </>
  );
}
