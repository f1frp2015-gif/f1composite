import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";
import { zipSync, strToU8 } from "fflate";
const { parseWindowInquiry, buildWindowRfqHref, windowInquirySummary, mergeWindowContext } = loadProjectModule("lib/windowInquiry.ts");
const { validateContactAttachment } = loadProjectModule("lib/contactAttachment.ts");

for (const mode of ["profiles", "finished"]) test(`${mode} RFQ links preserve intent and series without private data`, () => {
  const url = new URL(buildWindowRfqHref({ mode, series: "90-sliding", stage: "budget", role: "contractor", source: "window-series", productPath: "/products/frp-windows?email=private" }), "https://example.com");
  assert.equal(url.searchParams.get("window_mode"), mode);
  assert.equal(url.searchParams.get("window_series"), "90-sliding");
  assert.equal(url.searchParams.get("window_stage"), "budget");
  assert.equal(url.searchParams.get("window_role"), "contractor");
  assert.equal(url.searchParams.get("product_path"), "/products/frp-windows");
  assert.ok(!url.href.includes("private"));
});
test("unknown requirements are valid, invalid enum and oversized payload are rejected", () => {
  assert.equal(parseWindowInquiry({ mode: "finished", dimensionBasis: "unknown" }).dimensionBasis, "unknown");
  assert.deepEqual(parseWindowInquiry({ mode: "profiles", injected: "bad", schedule: "stale" }), { mode: "profiles" });
  for (const value of [{ mode: "bad" }, { mode: "profiles", series: "140-lift" }, { mode: "profiles", sections: "x".repeat(3001) }, { mode: "profiles", stage: {} }]) assert.throws(() => parseWindowInquiry(value));
  const inquiry = parseWindowInquiry({ mode: "profiles", series: "140", stage: "technical" });
  assert.match(windowInquirySummary(inquiry), /System series: 140/);
  assert.deepEqual(mergeWindowContext({ evidenceId: "existing" }, inquiry), { evidenceId: "existing", windowInquiry: inquiry });
});
test("XLSX verifies workbook structure and content; renamed archives and macros are rejected", () => {
  const files = { "[Content_Types].xml": strToU8('<Types xmlns="test"/>'), "xl/workbook.xml": strToU8('<workbook xmlns="test"/>'), "xl/worksheets/sheet1.xml": strToU8("<worksheet/>") };
  const xlsx = Buffer.from(zipSync(files));
  assert.doesNotThrow(() => validateContactAttachment("schedule.xlsx", xlsx));
  assert.throws(() => validateContactAttachment("fake.xlsx", Buffer.from("fake")));
  assert.throws(() => validateContactAttachment("renamed.xlsx", Buffer.from(zipSync({ "drawing.pdf": strToU8("PDF") }))));
  assert.throws(() => validateContactAttachment("macro.xlsx", Buffer.from(zipSync({ ...files, "xl/vbaProject.bin": strToU8("macro") }))));
  assert.doesNotThrow(() => validateContactAttachment("bundle.zip", Buffer.from(zipSync({ "schedule.csv": strToU8("width,height\n100,200") }))));
  assert.throws(() => validateContactAttachment("bundle.zip", Buffer.from("not zip")));
});
test("CSV requires UTF-8 delimited content and attachments stay within 4 MB", () => {
  assert.doesNotThrow(() => validateContactAttachment("schedule.csv", Buffer.from("id,width,height\nW1,1200,1500")));
  for (const content of [Buffer.from("<html>bad,file</html>"), Buffer.from([0, 1, 44]), Buffer.from([255, 44]), Buffer.from("not a schedule")]) assert.throws(() => validateContactAttachment("file.csv", content));
  assert.throws(() => validateContactAttachment("file.csv", Buffer.alloc(4 * 1024 * 1024 + 1, 44)));
  assert.throws(() => validateContactAttachment("file.xlsm", Buffer.from("data")));
});
test("archive expansion limits reject oversized ZIP metadata without extraction", () => {
  const bytes = Buffer.from(zipSync({ "schedule.csv": strToU8("a,b\n1,2") }));
  const central = bytes.indexOf(Buffer.from([0x50, 0x4b, 0x01, 0x02]));
  bytes.writeUInt32LE(65 * 1024 * 1024, central + 24);
  assert.throws(() => validateContactAttachment("bundle.zip", bytes), /uncompressed archive/);
});
test("analytics emits only allowed window dimensions and deduplicates successful receipts", () => {
  const { trackInquirySuccess } = loadProjectModule("lib/analytics.ts");
  const original = globalThis.window;
  const events = [];
  globalThis.window = { location: { pathname: "/contact" }, gtag: (...args) => events.push(args) };
  try {
    trackInquirySuccess("test-window-1", "window-series", "/products/frp-windows", "rfq", { mode: "finished", series: "140", stage: "quote", email: "private" });
    const success = events.find(event => event[1] === "rfq_submit_success")[2];
    assert.equal(success.window_mode, "finished");
    assert.equal(success.window_series, "140");
    assert.equal(success.window_stage, "quote");
    assert.ok(!JSON.stringify(events).includes("private"));
    const count = events.length;
    trackInquirySuccess("test-window-1", "window-series");
    assert.equal(events.length, count);
    trackInquirySuccess("test-window-2", "contact", "", "general", { mode: "finished", series: "malicious", stage: "private" });
    const last = events.at(-1)[2];
    assert.equal(last.window_series, undefined);
    assert.equal(last.window_stage, undefined);
  } finally { globalThis.window = original; }
});
test("mode attribution defaults, additional profile requirements and readable labels survive review", () => {
  for (const [mode, path] of [["profiles", "/products/window-door-profiles"], ["finished", "/products/fiberglass-windows-doors"]]) {
    assert.equal(new URL(buildWindowRfqHref({ mode }), "https://example.com").searchParams.get("product_path"), path);
  }
  const inquiry = parseWindowInquiry({ mode: "profiles", series: "140", role: "fabricator", sampleType: "corner-sample", fabricationScope: "Machined profiles and gaskets", interfaces: "Glass groove per drawing", demand: "First 500 m; annual 6000 m", performance: "Thermal report" });
  const summary = windowInquirySummary(inquiry);
  for (const expected of ["140 compression-seal sliding door (CP006–CP011)", "Fabricator", "Fabricated corner sample", "Machined profiles and gaskets", "Glass groove per drawing", "First 500 m; annual 6000 m", "Thermal report"]) assert.ok(summary.includes(expected), expected);
  const finished = parseWindowInquiry({ ...inquiry, mode: "finished", dimensionUnit: "mm" });
  assert.equal(finished.performance, "Thermal report");
  assert.equal(finished.fabricationScope, undefined);
  assert.match(windowInquirySummary(finished), /Millimetres/);
});
test("review remains renderable for invalid pasted text while server validation still rejects it", () => {
  const input = { mode: "profiles", sections: "CP006\u000b20 pieces", schedule: "stale finished requirements" };
  assert.doesNotThrow(() => windowInquirySummary(input));
  assert.ok(!windowInquirySummary(input).includes("stale finished requirements"));
  assert.throws(() => parseWindowInquiry(input), /check profile section list/);
});
