import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { loadProjectModule } from "./load-project-module.mjs";

const { parseBlogContent, parseArticleInline, safeArticleLink } = loadProjectModule("lib/blogContent.ts");
const { default: ArticleContent } = loadProjectModule("components/blog/ArticleContent.tsx");
const render = content => renderToStaticMarkup(createElement(ArticleContent, { blocks: parseBlogContent(content).blocks }));

test("mixed paragraphs, bullets and numbered steps remain separate semantic blocks", () => {
  const content = "Introductory paragraph.\n- **Load:** record the load.\n- Span: record supports.\nAfter the list.\n3. Review [the guide](/resources).\n4. Confirm the drawing.\n  Include the current revision.\nFinal paragraph.";
  const { blocks } = parseBlogContent(content);
  assert.deepEqual(blocks.map(block => block.type), ["paragraph", "list", "paragraph", "list", "paragraph"]);
  assert.equal(blocks[1].items.length, 2);
  assert.equal(blocks[3].start, 3);
  assert.equal(blocks[3].items[1], "Confirm the drawing. Include the current revision.");
  const html = render(content);
  assert.match(html, /<ul[^>]*>[\s\S]*<li/);
  assert.match(html, /<ol start="3"/);
  assert.match(html, /<strong[^>]*>Load:<\/strong>/);
  assert.match(html, /href="\/resources"/);
  assert.equal((html.match(/<li /g) ?? []).length, 4);
  assert.equal((html.match(/<p /g) ?? []).length, 3);
});

test("headings share unique IDs with contents even when labels and suffixes collide", () => {
  const content = "## **Loads & spans**\nParagraph without a blank line.\n### Loads & spans\n## Loads and spans-2\n## Loads & spans\n### 材料\n**Legacy subheading**";
  const { headings } = parseBlogContent(content);
  assert.deepEqual(headings.map(heading => heading.id), ["loads-and-spans", "loads-and-spans-2", "loads-and-spans-2-2", "loads-and-spans-3", "section", "legacy-subheading"]);
  assert.deepEqual(headings.map(heading => heading.level), [2, 3, 2, 2, 3, 3]);
  assert.equal(headings[0].text, "Loads & spans");
  const html = render(content);
  for (const { id } of headings) assert.equal(html.split(`id="${id}"`).length - 1, 1);
  assert.match(html, /<h3 id="loads-and-spans-2"/);
  assert.match(html, /<p[^>]*>Paragraph without a blank line\.<\/p>/);
});

test("tables retain empty cells and escaped pipes instead of shifting column meaning", () => {
  const content = "| Property | FRP | Steel |\n| --- | :---: | ---: |\n| Density | | 7.85 |\n| Scope \\| direction | Longitudinal | |";
  const { blocks } = parseBlogContent(content);
  assert.equal(blocks.length, 1);
  assert.deepEqual(blocks[0].rows, [["Density", "", "7.85"], ["Scope | direction", "Longitudinal", ""]]);
  const html = render(content);
  assert.equal((html.match(/scope="col"/g) ?? []).length, 3);
  assert.equal((html.match(/scope="row"/g) ?? []).length, 2);
  assert.equal((html.match(/<td /g) ?? []).length, 4);
});

test("safe article links work inline and as download blocks; unsafe targets remain text", () => {
  for (const href of ["javascript:alert(1)", "data:text/html,payload", "//other.example/file", "/\\other.example", "https://example.com/\npath", "https://user:pass@example.com", " https://example.com"]) {
    assert.equal(safeArticleLink(href), undefined, href);
  }
  const content = "[Guide](/resources/guide.pdf)\n\n[Source](https://example.com/guide_(2026))\n\n[Unsafe](javascript:alert(1))\n\n[External disguise](//other.example/file)";
  const html = render(content);
  assert.match(html, /href="\/resources\/guide.pdf"/);
  assert.match(html, /href="https:\/\/example.com\/guide_\(2026\)" target="_blank" rel="noopener noreferrer"/);
  assert.doesNotMatch(html, /href="(?:javascript:|\/\/)/);
  assert.match(html, /\[Unsafe\]\(javascript:alert\(1\)\)/);
  assert.equal(parseArticleInline("[Section](#loads)")[0].external, false);
});

test("video and legacy subheading blocks survive extraction, while raw HTML stays text", () => {
  const content = "**A short subheading**\n\n[video:/images/test.mp4|Manufacturing demonstration]\n\n<script>alert('test')</script>";
  const html = render(content);
  assert.match(html, /<h3 id="a-short-subheading"/);
  assert.match(html, /<video src="\/images\/test.mp4" controls="" playsInline="" preload="metadata"/);
  assert.match(html, /Manufacturing demonstration<\/figcaption>/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test("published article lists and contents parse without losing list items or creating duplicate anchors", () => {
  const { blogPosts } = loadProjectModule("content/data/blogPosts.ts");
  let postsWithLists = 0;
  for (const post of blogPosts) {
    const { blocks, headings } = parseBlogContent(post.content);
    assert.equal(new Set(headings.map(heading => heading.id)).size, headings.length, post.slug);
    const sourceItems = post.content.split(/\r?\n/).filter(line => /^\s*(?:[-+*]|\d+[.)])\s+/.test(line)).length;
    if (sourceItems) {
      postsWithLists++;
      assert.equal(blocks.filter(block => block.type === "list").reduce((count, block) => count + block.items.length, 0), sourceItems, post.slug);
    }
  }
  assert.ok(postsWithLists > 0, "exercise the published article list regression");
});
