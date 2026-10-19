import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProjectModule } from "./load-project-module.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { blogPosts } = loadProjectModule("content/data/blogPosts.ts");
const { blogTopics, blogKeywordTargets, getRelatedBlogPosts } = loadProjectModule("content/data/blogStrategy.ts");
const { seoQueryTargets } = loadProjectModule("content/data/seoQueryTargets.ts");
const { applicationPages } = loadProjectModule("lib/applicationPages.ts");
const normalize = value => value.trim().replace(/\s+/g, " ").toLowerCase();

function internalDestinationExists(href) {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  const path = href.split(/[?#]/)[0];
  if (path.startsWith("/resources/blog/topics/")) return blogTopics.some(topic => path === `/resources/blog/topics/${topic.slug}`);
  if (path.startsWith("/resources/blog/")) return blogPosts.some(post => path === `/resources/blog/${post.slug}`);
  if (path.startsWith("/applications/")) return applicationPages.some(page => path === `/applications/${page.slug}`);
  return existsSync(resolve(root, `app${path}/page.tsx`)) || existsSync(resolve(root, `public${path}`));
}

export function auditBlog({ posts = blogPosts, topics = blogTopics, targets = blogKeywordTargets, owners = seoQueryTargets, linkExists = internalDestinationExists } = {}) {
  const errors = [], warnings = [];
  const postSlugs = new Set(posts.map(post => post.slug));
  const topicSlugs = new Set(topics.map(topic => topic.slug));
  if (postSlugs.size !== posts.length) errors.push("Duplicate article slugs");
  if (topicSlugs.size !== topics.length) errors.push("Duplicate topic slugs");
  const queries = new Map(owners.map(owner => [normalize(owner.primaryQuery), owner.targetUrl]));
  const seen = new Set();
  for (const target of targets) {
    if (seen.has(target.slug)) errors.push(`Duplicate target: ${target.slug}`);
    seen.add(target.slug);
    if (!postSlugs.has(target.slug)) errors.push(`Unknown article target: ${target.slug}`);
    if (!topicSlugs.has(target.topic)) errors.push(`Unknown topic: ${target.slug} -> ${target.topic}`);
    if (!target.primaryQuery.trim()) errors.push(`Empty primary query: ${target.slug}`);
    const query = normalize(target.primaryQuery), url = `/resources/blog/${target.slug}`;
    if (queries.has(query) && queries.get(query) !== url) errors.push(`Primary query collision: ${target.primaryQuery} -> ${queries.get(query)} / ${url}`);
    queries.set(query, url);
    const owner = owners.find(item => item.targetUrl === url);
    if (owner && normalize(owner.primaryQuery) !== query) errors.push(`Existing query owner changed: ${target.slug}`);
    if (!target.secondaryQueries.length || !target.nextStep.label.trim()) errors.push(`Incomplete editorial target: ${target.slug}`);
    if (!linkExists(target.nextStep.href)) errors.push(`Missing next step: ${target.slug} -> ${target.nextStep.href}`);
  }
  for (const post of posts) {
    if (!seen.has(post.slug)) errors.push(`Article has no keyword/topic target: ${post.slug}`);
    const title = post.seoTitle ?? post.title;
    if (!title || title.length > 60) errors.push(`Article title exceeds limit: ${post.slug}`);
    if (!post.ogDescription || post.ogDescription.length < 120 || post.ogDescription.length > 160) errors.push(`Article description outside 120–160 chars: ${post.slug}`);
    if (!post.sourceLinks?.length) warnings.push(`Source review needed: ${post.slug}`);
  }
  for (const topic of topics) {
    const members = targets.filter(target => target.topic === topic.slug);
    if (members.length < 3) errors.push(`Topic needs at least 3 distinct articles: ${topic.slug}`);
    if (!topic.title || topic.title.length > 60 || topic.description.length < 120 || topic.description.length > 160) errors.push(`Topic metadata outside limits: ${topic.slug}`);
    if (!topic.intro.trim() || topic.questions.length < 3 || topic.startHere.length < 3 || !topic.nextLinks.length) errors.push(`Incomplete reading path: ${topic.slug}`);
    if (new Set(topic.startHere).size !== topic.startHere.length) errors.push(`Duplicate reading path: ${topic.slug}`);
    for (const slug of topic.startHere) if (!postSlugs.has(slug) || !members.some(target => target.slug === slug)) errors.push(`Reading path outside topic: ${topic.slug} -> ${slug}`);
    for (const link of topic.nextLinks) if (!linkExists(link.href)) errors.push(`Missing topic destination: ${topic.slug} -> ${link.href}`);
  }
  return { errors, warnings };
}

export function keywordMapCsv() {
  const cell = value => `"${String(value).replaceAll('"', '""')}"`;
  const header = ["url", "topic", "primary_query", "secondary_queries", "intent", "next_step", "seo_title", "published", "updated", "source_links", "evidence_status", "priority_basis"];
  const rows = blogKeywordTargets.map(target => {
    const post = blogPosts.find(post => post.slug === target.slug);
    return [`https://www.f1composite.com/resources/blog/${target.slug}`, target.topic, target.primaryQuery, target.secondaryQueries.join("; "), target.intent, target.nextStep.href, post.seoTitle ?? post.title, post.date, post.updatedAt, post.sourceLinks?.length ?? 0, post.sourceLinks?.length ? "sources listed; verify claims individually" : "source review needed", "business relevance and intent; search demand unverified"];
  });
  return [header, ...rows].map(row => row.map(cell).join(",")).join("\n") + "\n";
}

export function runAudit(args) {
  if (args.length && (args.length !== 1 || args[0] !== "--write-map")) throw new Error("Usage: node scripts/blog-seo-audit.mjs [--write-map]");
  const { errors, warnings } = auditBlog();
  for (const post of blogPosts) {
    const related = getRelatedBlogPosts(post.slug);
    if (related.some(item => item.slug === post.slug) || new Set(related.map(item => item.slug)).size !== related.length) errors.push(`Invalid related articles: ${post.slug}`);
  }
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(`Blog SEO: ${blogPosts.length} articles, ${blogTopics.length} topics, ${blogKeywordTargets.length} unique query targets; metadata, destinations and reading paths passed.`);
  console.log(`${warnings.length} articles need an explicit source review. Source presence is not factual verification; see docs/seo/blog-keyword-map.csv.`);
  if (args[0] === "--write-map") {
    const output = resolve(root, "docs/seo/blog-keyword-map.csv");
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, keywordMapCsv());
    console.log("Wrote docs/seo/blog-keyword-map.csv");
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { runAudit(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
