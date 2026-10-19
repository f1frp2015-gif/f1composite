import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { auditBlog, keywordMapCsv } from "./blog-seo-audit.mjs";
import { loadProjectModule } from "./load-project-module.mjs";
import { loadOwnershipTargets } from "./seo-query-review.mjs";

const { blogPosts } = loadProjectModule("content/data/blogPosts.ts");
const { blogKeywordTargets, blogTopics, getRelatedBlogPosts, getBlogTopic, getBlogTarget } = loadProjectModule("content/data/blogStrategy.ts");

test("published articles have valid unique query ownership, metadata and destinations", () => {
  assert.deepEqual(auditBlog().errors, []);
  const owners = loadOwnershipTargets();
  for (const post of blogPosts) {
    assert.equal(owners.filter(target => target.targetUrl === `/resources/blog/${post.slug}`).length, 1);
  }
  assert.equal(readFileSync("docs/seo/blog-keyword-map.csv", "utf8"), keywordMapCsv(), "Regenerate keyword map after changes");
});

test("audit prevents orphaned content, duplicate query ownership and invalid reading paths", () => {
  assert.ok(auditBlog({ targets: blogKeywordTargets.slice(1) }).errors.some(error => error.includes("no keyword/topic target")));
  const duplicate = structuredClone(blogKeywordTargets);
  duplicate[0].primaryQuery = duplicate[1].primaryQuery;
  assert.ok(auditBlog({ targets: duplicate }).errors.some(error => error.includes("Primary query collision")));
  const topics = structuredClone(blogTopics);
  topics[0].startHere[0] = "not-an-article";
  assert.ok(auditBlog({ topics }).errors.some(error => error.includes("Reading path outside topic")));
  assert.ok(auditBlog({ linkExists: () => false }).errors.some(error => error.includes("Missing next step")));
});

test("recommendations stay relevant, deduplicated and exclude the current article", () => {
  for (const post of blogPosts) {
    const related = getRelatedBlogPosts(post.slug);
    assert.ok(related.length > 0 && related.length <= 3);
    assert.equal(new Set(related.map(item => item.slug)).size, related.length);
    for (const candidate of related) {
      assert.notEqual(candidate.slug, post.slug);
      assert.ok(getBlogTarget(candidate.slug).topic === getBlogTarget(post.slug).topic || post.relatedLinks.some(link => link.href.split(/[?#]/)[0] === `/resources/blog/${candidate.slug}`));
    }
  }
  assert.deepEqual(getRelatedBlogPosts("missing"), []);
  assert.equal(getBlogTopic("missing"), undefined);
});
