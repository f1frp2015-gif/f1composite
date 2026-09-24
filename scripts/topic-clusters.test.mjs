import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";

const { blogPostsBySlug } = loadProjectModule("content/data/blogPosts.ts");
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

// Each guide links to its commercial page, and that page (or its comparison page) links back.
const clusters = [
  { slug: "frp-handrail-guardrail-requirements-osha-ibc-iso-14122", owner: "/products/frp-handrail-systems", backlinks: ["app/products/frp-handrail-systems/page.tsx", "app/products/frp-ladders/page.tsx"] },
  { slug: "fixed-ladder-requirements-osha-iso-14122-4", owner: "/products/frp-ladders", backlinks: ["app/products/frp-ladders/page.tsx", "app/products/frp-handrail-systems/page.tsx"] },
  { slug: "gfrp-rebar-specification-guide-aci-440-astm-d7957", owner: "/products/frp-rebar", backlinks: ["app/products/frp-rebar/page.tsx", "app/technology/fiberglass-rebar-vs-steel/page.tsx"] },
  { slug: "gfrp-bent-bars-stirrups-mesh-ordering-guide", owner: "/products/frp-rebar", backlinks: ["app/products/frp-rebar/page.tsx", "app/technology/fiberglass-rebar-vs-steel/page.tsx"] },
  { slug: "how-to-install-frp-grating", owner: "/products/grating", backlinks: ["app/products/frp-gratings/page.tsx", "app/products/molded-frp-grating/page.tsx"] },
  { slug: "how-to-read-frp-grating-load-table", owner: "/products/grating", backlinks: ["app/products/frp-gratings/page.tsx", "app/products/molded-frp-grating/page.tsx"] },
];

test("topic-cluster guides meet the article metadata rules", () => {
  for (const { slug } of clusters) {
    const post = blogPostsBySlug[slug];
    assert.ok(post, `${slug} is missing`);
    assert.ok(post.seoTitle.length <= 60, `${slug} seoTitle`);
    assert.ok(post.ogDescription.length >= 120 && post.ogDescription.length <= 160, `${slug} ogDescription`);
    assert.ok(post.answerBox && post.faq?.items.length >= 3, `${slug} answer box and FAQ`);
    assert.ok((post.sourceLinks ?? []).length >= 2, `${slug} sources`);
    assert.equal(post.authorName, "F1 Composite Editorial Team");
  }
});

test("guides and their product pages link to each other", () => {
  for (const { slug, owner, backlinks } of clusters) {
    const post = blogPostsBySlug[slug];
    assert.ok(post.relatedLinks.some((link) => link.href === owner || link.href.startsWith(`${owner}#`)), `${slug} does not link ${owner}`);
    for (const file of backlinks) {
      assert.ok(read(file).includes(`/resources/blog/${slug}`), `${file} does not link ${slug}`);
    }
    for (const link of post.relatedLinks.filter((item) => item.href.startsWith("/resources/blog/"))) {
      assert.ok(blogPostsBySlug[link.href.replace("/resources/blog/", "")], `${slug} links a missing post ${link.href}`);
    }
  }
});
