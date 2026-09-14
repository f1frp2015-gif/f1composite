import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";

const { approximateInches, tubeInquiryHref, sheetInquiry } = loadProjectModule("lib/productInquiry.ts");
const { buildRfqHref } = loadProjectModule("lib/rfq.ts");

test("metric catalog sizes are converted without rounding 25 mm to a one-inch stock size", () => {
  assert.equal(approximateInches(25), "0.984");
  assert.equal(approximateInches(25.4), "1.000");
  assert.equal(approximateInches(6.4), "0.252");
  for (const value of [0, -1, NaN, Infinity]) assert.equal(approximateInches(value), "—");
});

test("tube selections retain the exact metric wall, model, product and attribution through the contact URL", () => {
  for (const [productPath, product, specification] of [
    ["/products/fiberglass-structural-shapes/frp-tube", "Round tubing", "CHS 63.5×6.4; OD (mm): 63.5, Wall (mm): 6.4"],
    ["/products/fiberglass-structural-shapes/frp-square-tube", "Square & rectangular tubing", "RHS 100×60×8; H (mm): 100, B (mm): 60, Wall (mm): 8"],
  ]) {
    const url = new URL(tubeInquiryHref(productPath, product, specification), "https://www.f1composite.com");
    assert.equal(url.pathname, "/contact");
    assert.equal(url.searchParams.get("source"), "tube-size-selection");
    assert.equal(url.searchParams.get("inquiry_type"), "rfq");
    assert.equal(url.searchParams.get("product_path"), productPath);
    assert.equal(url.searchParams.get("product"), product);
    assert.equal(url.searchParams.get("specification"), specification);
    assert.ok(url.searchParams.get("message").includes(specification));
    assert.ok(url.searchParams.get("message").includes("Cut length and pieces:"));
  }
});

test("sheet inquiry preserves entered units, length/width/thickness order, surface and piece count", () => {
  for (const unit of ["mm", "in"]) {
    const inquiry = sheetInquiry({ length: "48", width: "24", thickness: "0.25", quantity: "12", unit, surface: "Gritted anti-slip" });
    const params = new URL(buildRfqHref({ source: "sheet-specification", ...inquiry }), "https://www.f1composite.com").searchParams;
    assert.ok(params.get("specification").includes(`48 × 24 × 0.25 ${unit} (length × width × thickness)`));
    assert.ok(params.get("specification").includes("12 pieces; surface: Gritted anti-slip"));
    assert.ok(params.get("message").includes("Please confirm feasibility"));
    assert.equal(params.get("message"), inquiry.message);
  }
});
