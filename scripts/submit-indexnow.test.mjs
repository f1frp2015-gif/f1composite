import assert from "node:assert/strict";
import test from "node:test";
import {
  changedSlugs,
  normalizeUrls,
  parseSlugBlocks,
  routeFromPageFile,
} from "./submit-indexnow.mjs";

test("maps static App Router page files to canonical paths", () => {
  assert.equal(routeFromPageFile("app/page.tsx"), "/");
  assert.equal(routeFromPageFile("app/products/frp-gratings/page.tsx"), "/products/frp-gratings");
  assert.equal(routeFromPageFile("app/(marketing)/about/page.tsx"), "/about");
  assert.equal(routeFromPageFile("app/resources/blog/[slug]/page.tsx"), null);
});

test("extracts stable slug records from content data", () => {
  const source = `export const records = [\n  {\n    slug: "first",\n    title: "First",\n  },\n  {\n    slug: "second",\n    title: "Second",\n  },\n];\n`;
  assert.deepEqual([...parseSlugBlocks(source).keys()], ["first", "second"]);
});

test("normalizes only canonical-host URLs", () => {
  assert.deepEqual(normalizeUrls("/one, https://www.f1composite.com/two#section /one"), [
    "https://www.f1composite.com/one",
    "https://www.f1composite.com/two",
  ]);
  assert.throws(() => normalizeUrls("https://example.com/not-ours"), /must belong/);
});

test("detects added, edited, and removed slug records", () => {
  const before = `export const records = [\n  {\n    slug: "edited",\n    title: "Old",\n  },\n  {\n    slug: "removed",\n    title: "Removed",\n  },\n];\n`;
  const after = `export const records = [\n  {\n    slug: "edited",\n    title: "New",\n  },\n  {\n    slug: "added",\n    title: "Added",\n  },\n];\n`;
  assert.deepEqual([...changedSlugs(before, after)].sort(), ["added", "edited", "removed"]);
});
