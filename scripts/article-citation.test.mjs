import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";

const { buildArticleCitations, citationMetaTags, parseAuthor } = loadProjectModule("lib/citation.ts");

const article = {
  title: "Pultrusion vs Extrusion vs Filament Winding",
  path: "/technology/pultrusion-vs-extrusion-filament-winding",
  authorName: "Haifeng Gong, Ph.D.",
  publishedAt: "2026-07-03",
};

test("citations name the article URL, author and date, not the home page", () => {
  const { IEEE, APA, BibTeX } = buildArticleCitations(article);
  const url = "https://www.f1composite.com/technology/pultrusion-vs-extrusion-filament-winding";
  assert.equal(IEEE, `H. Gong, “Pultrusion vs Extrusion vs Filament Winding,” F1 Composite, Jul. 3, 2026. [Online]. Available: ${url}`);
  assert.equal(APA, `Gong, H. (2026, July 3). Pultrusion vs Extrusion vs Filament Winding. F1 Composite. ${url}`);
  assert.match(BibTeX, /^@misc\{f1composite-pultrusion-vs-extrusion-filament-winding-2026,/);
  assert.match(BibTeX, /author\s+= \{Gong, Haifeng\}/);
  assert.ok(BibTeX.includes(`\\url{${url}}`));
});

test("a team byline is cited as an organization", () => {
  assert.deepEqual(parseAuthor("F1 Composite Editorial Team"), { kind: "organization", name: "F1 Composite Editorial Team" });
  assert.deepEqual(parseAuthor("Yifan Liu, Application Engineer"), { kind: "person", given: ["Yifan"], family: "Liu" });
  const { IEEE } = buildArticleCitations({ ...article, authorName: "F1 Composite Editorial Team" });
  assert.ok(IEEE.startsWith("F1 Composite Editorial Team, “"));
});

test("reference-manager tags use Highwire names and slash dates", () => {
  assert.deepEqual(citationMetaTags(article), {
    citation_title: article.title,
    citation_author: "Gong, Haifeng",
    citation_publication_date: "2026/07/03",
    citation_publisher: "F1 Composite",
  });
});

test("every blog article and the process comparison page render the citation block", () => {
  for (const file of ["app/resources/blog/[slug]/page.tsx", "app/technology/pultrusion-vs-extrusion-filament-winding/page.tsx"]) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.match(source, /<ArticleCitationBlock/, `${file} lost its citation block`);
    assert.match(source, /citationMetaTags\(/, `${file} lost its citation meta tags`);
  }
});
