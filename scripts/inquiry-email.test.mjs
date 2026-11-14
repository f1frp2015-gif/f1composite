import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";

const { inquirySourceLabel, inquiryContextRows, inquiryAcquisitionLines } = loadProjectModule("lib/inquiryEmail.ts");
const { parseToolResult, TOOL_RESULT_MAX_AGE_MS } = loadProjectModule("lib/toolResultMemory.ts");
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("a product-page inquiry reads as labelled lines, not JSON", () => {
  const { rows, omitted } = inquiryContextRows({ inheritedContext: null, product: "Basalt FRP rebar", productPath: "/products/basalt-frp-rebar", specification: "", evidenceId: "" });
  assert.deepEqual(rows, [["Product", "Basalt FRP rebar"], ["Product page", "https://www.f1composite.com/products/basalt-frp-rebar"]]);
  assert.equal(omitted, 0);
  assert.equal(inquirySourceLabel("product-rfq"), "Product page quote form");
  assert.equal(inquirySourceLabel("tool-life-cycle-cost"), "Life cycle cost tool page");
  assert.equal(inquirySourceLabel(""), "Contact page form");
});

test("nested tool context flattens with readable labels and a row cap", () => {
  const { rows } = inquiryContextRows({ version: "v1", input: { spanMm: 3000, loads: [{ kind: "udl", value: 2.5 }], tags: ["a", "b"], ok: true, empty: null } });
  assert.deepEqual(rows, [["Input › Span mm", "3000"], ["Input › Loads 1 › Kind", "udl"], ["Input › Loads 1 › Value", "2.5"], ["Input › Tags", "a, b"], ["Input › Ok", "Yes"]]);
  const many = inquiryContextRows(Object.fromEntries(Array.from({ length: 70 }, (_, i) => [`k${i}`, i])));
  assert.equal(many.rows.length, 40);
  assert.equal(many.omitted, 30);
  assert.deepEqual(inquiryContextRows(null).rows, []);
  assert.deepEqual(inquiryContextRows({ raw: "free text" }).rows, [["Details", "free text"]]);
});

test("acquisition reads as channel and visits", () => {
  const lines = inquiryAcquisitionLines({
    version: 1, consent: "regional_default",
    firstTouch: { capturedAt: "2026-11-12T18:26:13.964Z", landingPath: "/products/basalt-frp-rebar", referrerOrigin: null, utm: { source: "chatgpt.com" } },
    sessionTouch: { capturedAt: "2026-11-12T18:28:29.967Z", landingPath: "/contact", referrerOrigin: null, utm: {} },
  });
  assert.equal(lines[0], "First found us through: AI assistant (chatgpt.com)");
  assert.match(lines[1], /13 Nov 2026, 02:26 \(China time\) · landed on https:\/\/www\.f1composite\.com\/products\/basalt-frp-rebar · tagged source chatgpt\.com/);
  assert.match(lines[2], /^This visit: Direct visit/);
  assert.doesNotMatch(lines.join("\n"), /[{}"]/);
  assert.match(inquiryAcquisitionLines(null)[0], /^Not recorded/);
  const touch = { capturedAt: "2026-11-12T18:26:13.964Z", landingPath: "/", referrerOrigin: "https://www.google.com", utm: {} };
  assert.deepEqual(inquiryAcquisitionLines({ version: 1, consent: "explicit", firstTouch: touch, sessionTouch: touch }).map(line => line.split(":")[0]), ["Channel", "Visit"]);
});

test("the contact email no longer prints stored JSON", () => {
  const route = read("app/api/contact/route.ts");
  assert.doesNotMatch(route, /JSON\.stringify\((context|acquisition)\)/);
  assert.match(route, /inquiryContextRows\(context\)/);
  assert.match(route, /inquiryAcquisitionLines\(acquisition\)/);
});

test("a remembered tool result is validated and expires", () => {
  const now = Date.now();
  const stored = JSON.stringify({ source: "column-calculator", summary: "FRP column screen", context: { product: "I152" }, path: "/tools/frp-column-calculator", savedAt: now });
  assert.equal(parseToolResult(stored, now).summary, "FRP column screen");
  assert.equal(parseToolResult(stored, now + TOOL_RESULT_MAX_AGE_MS + 1), null);
  assert.equal(parseToolResult(JSON.stringify({ source: "bad source!", summary: "x", context: {}, savedAt: now }), now), null);
  assert.equal(parseToolResult("not json", now), null);
});

test("every calculator and AI tool can send its result as an inquiry directly", () => {
  const files = [
    ...readdirSync(new URL("../components/tools/", import.meta.url)).filter(name => /(Calculator|Checker|Optimizer|Converter|Planner)\.tsx$/.test(name)).map(name => `components/tools/${name}`),
    "app/frp-profile-calculator/ProfileCalculator.tsx", "app/fiberglass-pultruded-profile-price/PriceEstimator.tsx", "app/technology/frp-u-value-calculator/UValueCalculator.tsx",
    "app/ai/sourcing/SourcingWizard.tsx", "app/ai/passive-house/PassiveHouseWizard.tsx", "components/chat/ChatPanel.tsx",
  ];
  assert.ok(files.length >= 14);
  for (const file of files) assert.match(read(file), /<ResultLeadCapture/, file);
  const form = read("components/ContactForm.tsx");
  assert.match(form, /recallToolResult\(\)/);
  assert.match(form, /Do not include it/);
});
