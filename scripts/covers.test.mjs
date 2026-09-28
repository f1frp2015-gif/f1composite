import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
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

// WEBSITE.md (封面图): a note names where a photo comes from, and captions and
// alt text describe what an image shows, never that it is AI-generated or
// rendered.
test("image labels never announce AI generation or rendering", () => {
  const made = /\bAI\b|generated|\brender|visuali[sz]/i;
  const leading = /^(Concept|Illustrative|Illustration|Rendering)\b/;
  const images = [
    ...REGISTRIES.flatMap((name) => Object.entries(covers[name]).map(([href, cover]) => [`${name} ${href}`, cover])),
    ...blogPosts.map((post) => [`${post.slug} cover`, covers.blogCover(post)]),
    ...blogPosts.map((post) => [`${post.slug} supporting image`, { alt: post.supportingAlt, caption: post.supportingCaption }]),
  ];
  for (const [where, image] of images) {
    for (const text of [image.note, image.caption]) assert.ok(!made.test(text ?? ""), `${where}: "${text}"`);
    assert.ok(!made.test(image.alt ?? "") && !leading.test(image.alt ?? ""), `${where}: alt "${image.alt}"`);
  }
  const labels = /AI concept|AI[- ]generated (?:product|concept|application|image|illustration)|note[=:]\s*"(?:Rendering|Visualization|Drawing and rendering|Supplier rendering)"|· render"/;
  const root = fileURLToPath(new URL("..", import.meta.url));
  for (const dir of ["app", "components", "lib", "content"]) {
    for (const entry of readdirSync(join(root, dir), { recursive: true, withFileTypes: true })) {
      if (!entry.isFile() || !/\.(tsx?|json)$/.test(entry.name)) continue;
      const file = join(entry.parentPath, entry.name);
      const line = readFileSync(file, "utf8").split("\n").findIndex((text) => labels.test(text));
      assert.equal(line, -1, `${relative(root, file)}:${line + 1} labels an image as AI-generated or rendered`);
    }
  }
});
