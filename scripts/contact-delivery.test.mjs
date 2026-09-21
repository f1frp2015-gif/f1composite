import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { loadProjectModule } from "./load-project-module.mjs";
const { inquiryReceipt } = loadProjectModule("lib/inquiryReceipt.ts");

const routeSource = readFileSync(new URL("../app/api/contact/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(routeSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

function mockRoute({ db = null, mail = null, dbThrows = false, mailThrows = false } = {}) {
  const state = { stored: null, mailed: null, marked: null };
  const mocks = {
    "next/server": { NextResponse: { json: (body, options) => Response.json(body, options) } },
    "resend": { Resend: class { emails = { send: async (payload) => { state.mailed = payload; if (mailThrows) throw new Error("mock provider unavailable"); return { data: mail ? { id: mail } : null, error: mail ? null : { message: "mock rejected" } }; } }; } },
    "@/lib/db": { insertInquiry: async (row) => { state.stored = row; if (dbThrows) throw new Error("mock DB unavailable"); return db; }, markInquiryEmailed: async (id) => { state.marked = id; } },
    "@/lib/notify": { NOTIFY_EMAILS: ["test@example.invalid"] },
    "@/lib/rateLimit": { rateLimit: () => ({ ok: true }) },
    "@/lib/inquiryReceipt": { inquiryReceipt },
    "@/lib/windowInquiry": loadProjectModule("lib/windowInquiry.ts"),
    "@/lib/contactAttachment": loadProjectModule("lib/contactAttachment.ts"),
  };
  const exports = {};
  new Function("require", "exports", compiled)((id) => { if (!mocks[id]) throw new Error(`Unmocked dependency ${id}`); return mocks[id]; }, exports);
  return { state, POST: exports.POST };
}
function request(attachment = false, extra = {}) {
  const form = new FormData();
  for (const [key, value] of Object.entries({ name: "QA", email: "test@example.invalid", country: "Test", inquiry_type: "rfq", message: "Drawing review", source: "evidence-library", context: JSON.stringify({ product: "I-beam", specification: "152×76×6.4", evidenceId: "structural-design" }) })) form.set(key, value);
  for (const [key, value] of Object.entries(extra)) form.set(key, value);
  if (attachment) form.set("attachment", new File(["test"], "drawing.pdf", { type: "application/pdf" }));
  return new Request("http://local.test/api/contact", { method: "POST", body: form });
}

test("contact endpoint never acknowledges a submission lost by both channels", async () => {
  const route = mockRoute({ dbThrows: true, mailThrows: true });
  const response = await route.POST(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).accepted, false);
});
test("contact endpoint preserves drawing context and warns when only attachment delivery fails", async () => {
  const route = mockRoute({ db: 42 });
  const response = await route.POST(request(true));
  const receipt = await response.json();
  assert.equal(response.status, 200);
  assert.equal(receipt.receiptId, "F1-42");
  assert.equal(receipt.attachmentReceived, false);
  assert.equal(route.state.stored.context.specification, "152×76×6.4");
  assert.equal(route.state.stored.source, "evidence-library");
  assert.equal(route.state.marked, null);
});
test("contact endpoint accepts email-only delivery and marks persisted successful notification", async () => {
  for (const db of [null, 42]) {
    const route = mockRoute({ db, mail: "mock-mail" });
    const response = await route.POST(request(true));
    const receipt = await response.json();
    assert.equal(receipt.accepted, true);
    assert.equal(receipt.attachmentReceived, true);
    assert.equal(route.state.marked, db);
    assert.ok(Buffer.isBuffer(route.state.mailed.attachments[0].content));
  }
});

for (const mode of ["profiles", "finished"]) {
  test(`window ${mode}: early lead preserves context, series and requirements in both delivery channels`, async () => {
    const route = mockRoute({ db: 42, mail: "mock-mail" });
    const response = await route.POST(request(false, { message: "", window_inquiry: JSON.stringify({ mode, series: "140", stage: "sample", dimensionBasis: "unknown", sections: "CP006: 6 m × 20 pieces" }) }));
    assert.equal(response.status, 200);
    assert.equal(route.state.stored.context.specification, "152×76×6.4");
    assert.equal(route.state.stored.context.windowInquiry.series, "140");
    assert.equal(route.state.stored.context.windowInquiry.mode, mode);
    assert.match(route.state.stored.message, /System series: 140/);
    assert.match(route.state.mailed.html, /System series: 140/);
    assert.equal(mode === "profiles" ? route.state.stored.context.windowInquiry.dimensionBasis : route.state.stored.context.windowInquiry.sections, undefined);
  });
}
test("invalid window mode is rejected before persistence or email", async () => {
  const route = mockRoute({ db: 42, mail: "mock-mail" });
  const response = await route.POST(request(false, { window_inquiry: JSON.stringify({ mode: "unsafe" }) }));
  assert.equal(response.status, 400);
  assert.equal(route.state.stored, null);
  assert.equal(route.state.mailed, null);
});
test("CSV file reaches sales unchanged; renamed binary CSV never reaches delivery", async () => {
  const valid = mockRoute({ db: 42, mail: "mock-mail" });
  const attachment = new File(["opening,width,height\nW1,1200,1500"], "schedule.csv", { type: "text/csv" });
  assert.equal((await valid.POST(request(false, { attachment }))).status, 200);
  assert.equal(valid.state.mailed.attachments[0].filename, "schedule.csv");
  const invalid = mockRoute({ db: 42, mail: "mock-mail" });
  assert.equal((await invalid.POST(request(false, { attachment: new File([new Uint8Array([0, 1, 44])], "schedule.csv") }))).status, 400);
  assert.equal(invalid.state.stored, null);
  assert.equal(invalid.state.mailed, null);
});
test("discuss project first accepts only buying intent with empty optional message", async () => {
  const route = mockRoute({ db: 42, mail: "mock-mail" });
  const response = await route.POST(request(false, { message: "", window_inquiry: JSON.stringify({ mode: "profiles" }) }));
  assert.equal(response.status, 200);
  assert.match(route.state.stored.message, /Profiles for fabrication/);
  assert.deepEqual(route.state.stored.context.windowInquiry, { mode: "profiles" });
});
