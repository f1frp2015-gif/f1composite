import assert from "node:assert/strict";
import test from "node:test";
import { loadProjectModule } from "./load-project-module.mjs";

const { buildAgricultureInquiry, agricultureStages, agriculturePath } = loadProjectModule("lib/agricultureInquiry.ts");

test("each buyer stage reaches contact with distinct intent and the correct product", () => {
  for (const [stage, label] of Object.entries(agricultureStages)) {
    const url = new URL(buildAgricultureInquiry(stage), "https://www.f1composite.com");
    assert.equal(url.pathname, "/contact");
    assert.equal(url.searchParams.get("source"), `agriculture-${stage}`);
    assert.equal(url.searchParams.get("product_path"), "/products/fiberglass-stakes");
    assert.equal(url.searchParams.get("inquiry_type"), "rfq");
    assert.ok(url.searchParams.get("message").includes(`Request: ${label}`));
    assert.ok(url.searchParams.get("message").includes("To be confirmed"));
  }
});

test("a filled planting brief survives URL encoding without losing field data", () => {
  const brief = {
    application: "Vineyards & young vine training",
    crop: "Pinot noir / first year",
    dimensions: "Ø 9.5 mm × 1.8 m; 0.3 m insertion",
    environment: "Clay + wind\nClip opening 10 mm & wire tie",
    quantity: "5,000 + 500 spares",
    destination: "France / Marseille",
    timing: "Before March 2027",
  };
  const url = new URL(buildAgricultureInquiry("sample", brief), "https://www.f1composite.com");
  const message = url.searchParams.get("message");
  for (const value of Object.values(brief)) assert.ok(message.includes(value), `Missing ${value}`);
  assert.equal(url.searchParams.get("specification"), brief.application);
  assert.match(message, /sample options, costs and a field-trial checklist/);
  assert.doesNotMatch(message, /To be confirmed/);
});

test("unknown and blank details stay open for sales follow-up", () => {
  const url = new URL(buildAgricultureInquiry("quote", { crop: "   ", quantity: " 2500 " }), "https://www.f1composite.com");
  assert.match(url.searchParams.get("message"), /growth stage: To be confirmed/);
  assert.match(url.searchParams.get("message"), /repeat order plan: 2500\n/);
  assert.match(url.searchParams.get("message"), /MOQ by SKU/);
});

test("the application is discoverable from the shared route and navigation registries", () => {
  const { applicationPages } = loadProjectModule("lib/applicationPages.ts");
  const { applicationGroups } = loadProjectModule("content/data/productTaxonomy.ts");
  const { mainNav } = loadProjectModule("content/data/navigation.ts");
  assert.equal(applicationPages.filter((page) => `/applications/${page.slug}` === agriculturePath).length, 1);
  assert.ok(applicationGroups.some((group) => group.href === agriculturePath));
  assert.ok(mainNav.flatMap((item) => item.sections ?? []).flatMap((section) => section.links).some((link) => link.href === agriculturePath));
});
