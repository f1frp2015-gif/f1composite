import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";

const covers = loadProjectModule("lib/covers.ts");
const { blogPosts } = loadProjectModule("content/data/blogPosts.ts");
const onDisk = (src) => existsSync(new URL(`../public${src.split("?")[0]}`, import.meta.url));

const REGISTRIES = [
  "productCovers",
  "industryCovers",
  "applicationCovers",
  "toolCovers",
  "caseStudyCovers",
  "technologyCovers",
  "regionCovers",
  "resourceCovers",
];

test("every registered card cover is a file in public/ with real alt text", () => {
  for (const name of REGISTRIES) {
    for (const [href, cover] of Object.entries(covers[name])) {
      assert.ok(cover.src.startsWith("/"), `${name} ${href}: ${cover.src} is not a site path`);
      assert.ok(onDisk(cover.src), `${name} ${href}: ${cover.src} is missing`);
      assert.ok(cover.alt && cover.alt.trim().length >= 12, `${name} ${href}: alt text is missing or too short`);
      assert.equal(covers.coverFor(href), cover, `coverFor("${href}") does not return the ${name} entry`);
    }
  }
});

test("every blog post has its own cover, not shared with another post or a card", () => {
  const cardCovers = new Set(REGISTRIES.flatMap((name) => Object.values(covers[name]).map((cover) => cover.src)));
  const seen = new Map();
  for (const post of blogPosts) {
    const cover = covers.blogCover(post);
    assert.ok(onDisk(cover.src), `${post.slug}: ${cover.src} is missing`);
    assert.ok(!seen.has(cover.src), `${post.slug} and ${seen.get(cover.src)} share ${cover.src}`);
    assert.ok(!cardCovers.has(cover.src), `${post.slug} reuses the card cover ${cover.src}`);
    seen.set(cover.src, post.slug);
  }
});
