import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("FAQ cards use native, initially collapsed disclosures", async () => {
  const disclosure = await readSource("components/ui/FAQDisclosure.tsx");

  assert.match(disclosure, /<details/);
  assert.match(disclosure, /<summary/);
  assert.doesNotMatch(disclosure, /<details[^>]*\sopen(?:\s|=|>)/);
  assert.match(disclosure, /aria-hidden="true"/);
  assert.match(disclosure, /group-open:rotate-45/);
});

test("every reusable FAQ surface is one column on mobile and two columns from md", async () => {
  const paths = [
    "components/ui/FAQ.tsx",
    "components/sections/AnswerBlocks.tsx",
    "components/sections/HomeFAQ.tsx",
  ];
  const sources = await Promise.all(paths.map(readSource));

  for (const [index, source] of sources.entries()) {
    const classTokens = [...source.matchAll(/className="([^"]+)"/g)]
      .flatMap((match) => match[1].split(/\s+/));

    assert.match(
      source,
      /grid items-start/,
      `${paths[index]} should align collapsed cards to the top`,
    );
    assert.match(source, /md:grid-cols-2/, `${paths[index]} should become a two-column grid`);
    assert.match(source, /FAQDisclosure/, `${paths[index]} should use the shared disclosure card`);
    assert.equal(
      classTokens.includes("grid-cols-2"),
      false,
      `${paths[index]} should remain one column below md`,
    );
  }

  assert.doesNotMatch(sources[1], /<article/);
});

test("the standalone FRP meaning FAQ uses the same structured disclosure UI", async () => {
  const [posts, blogPage] = await Promise.all([
    readSource("content/data/blogPosts.ts"),
    readSource("app/resources/blog/[slug]/page.tsx"),
  ]);
  const frpMeaningStart = posts.indexOf('slug: "frp-meaning"');
  const nextPostStart = posts.indexOf("\n  {\n    slug:", frpMeaningStart + 1);
  const frpMeaning = posts.slice(frpMeaningStart, nextPostStart);
  const faqBlock = frpMeaning.slice(
    frpMeaning.indexOf("    faq: {"),
    frpMeaning.indexOf("    content: `"),
  );
  const expectedQuestions = [
    "What is the FRP full form in civil engineering?",
    "What is the FRP material full form?",
    "Is FRP the same as fiberglass?",
    "What is the difference between fiber and fibre reinforced polymer?",
    "Which page should an engineer use next?",
  ];
  const expectedLinks = [
    "/what-is-frp",
    "/resources/blog/frp-material",
    "/pultruded-frp-profiles",
  ];

  assert.match(posts, /faq\?:\s*\{/);
  assert.match(posts, /title: "Frequently asked questions about the FRP full form"/);
  assert.doesNotMatch(posts, /## Frequently asked questions about the FRP full form/);
  assert.equal((faqBlock.match(/question:/g) ?? []).length, 5);
  assert.equal((faqBlock.match(/answer:/g) ?? []).length, 5);
  for (const question of expectedQuestions) {
    assert.match(faqBlock, new RegExp(question.replace(/[?]/g, "\\?")));
  }
  for (const href of expectedLinks) {
    assert.match(faqBlock, new RegExp(`\\]\\(${href.replaceAll("/", "\\/")}\\)`));
  }
  assert.match(blogPage, /<FAQ/);
  assert.match(blogPage, /renderInlineMarkdown\(item\.answer/);
  assert.match(blogPage, /post\.faq\.items\.map/);
  assert.match(blogPage, /content=\{summarizerContent\}/);
});
