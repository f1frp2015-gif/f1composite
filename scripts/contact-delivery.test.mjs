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
    "@/lib/rebarInquiry": loadProjectModule("lib/rebarInquiry.ts"),
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

test("contact endpoint rejects the spam trap and sub-second submissions before storing anything", async () => {
  for (const extra of [{ company_website: "https://spam.example" }, { form_elapsed_ms: "250" }]) {
    const route = mockRoute({ db: 42, mail: "mock-mail" });
    const response = await route.POST(request(false, extra));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).accepted, false);
    assert.equal(route.state.stored, null);
    assert.equal(route.state.mailed, null);
  }
  const person = mockRoute({ db: 42, mail: "mock-mail" });
  const response = await person.POST(request(false, { company_website: "", form_elapsed_ms: "8000" }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).accepted, true);
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

for (const mode of [null, "profiles", "finished"]) {
  test(`minimal inquiry (${mode || "general"}) accepts name and email without optional fields`, async () => {
    const route = mockRoute({ db: 42, mail: "mock-mail" });
    const form = new FormData();
    form.set("name", "First-time buyer");
    form.set("email", "buyer@example.invalid");
    if (mode) {
      form.set("window_inquiry", JSON.stringify({ mode, series: "90-sliding", stage: "sample" }));
      form.set("source", "window-series");
      form.set("context", JSON.stringify({ productPath: "/products/frp-window-frames" }));
    }
    const response = await route.POST(new Request("http://local.test/api/contact", { method: "POST", body: form }));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).accepted, true);
    assert.equal(route.state.stored.country, null);
    assert.equal(route.state.stored.inquiryType, "rfq");
    if (mode) {
      assert.equal(route.state.stored.context.windowInquiry.mode, mode);
      assert.equal(route.state.stored.context.windowInquiry.series, "90-sliding");
      assert.equal(route.state.stored.source, "window-series");
      assert.match(route.state.mailed.html, /90-sliding/);
    } else {
      assert.match(route.state.stored.message, /no requirements provided yet/);
    }
  });
}

test("minimal inquiry still rejects missing name and invalid email without delivering", async () => {
  for (const fields of [{ email: "buyer@example.invalid" }, { name: "Buyer", email: "invalid" }, { name: "Buyer" }]) {
    const route = mockRoute({ db: 42, mail: "mock-mail" });
    const form = new FormData();
    for (const [key, value] of Object.entries(fields)) form.set(key, value);
    const response = await route.POST(new Request("http://local.test/api/contact", { method: "POST", body: form }));
    assert.equal(response.status, 400);
    assert.equal(route.state.stored, null);
    assert.equal(route.state.mailed, null);
  }
});

for (const stage of ["quote", "technical", "sample", "distributor"]) {
  test(`rebar ${stage}: optional schedule is retained in database and escaped email`, async () => {
    const { emptyRebarInquiry, emptyRebarLine } = loadProjectModule("lib/rebarInquiry.ts");
    const inquiry = emptyRebarInquiry(stage);
    inquiry.lines = [{ ...emptyRebarLine("bends"), mark: "<B01>", diameter: "12 mm", quantity: "40", details: "200 × 300 mm; inside radius 48 mm" }];
    const route = mockRoute({ db: 42, mail: "mock-mail" });
    const response = await route.POST(request(false, { rebar_inquiry: JSON.stringify(inquiry), source: "rebar-procurement" }));
    assert.equal(response.status, 200);
    assert.equal(route.state.stored.context.specification, "152×76×6.4");
    assert.deepEqual(route.state.stored.context.rebarInquiry, inquiry);
    assert.match(route.state.stored.message, /40 pieces/);
    assert.match(route.state.mailed.html, /&lt;B01&gt;/);
    assert.match(route.state.mailed.html, /inside radius 48 mm/);
  });
}
test("invalid rebar data is rejected before database or email side effects", async () => {
  const route = mockRoute({ db: 42, mail: "mock-mail" });
  const response = await route.POST(request(false, { rebar_inquiry: JSON.stringify({ stage: "unsafe", lines: [] }) }));
  assert.equal(response.status, 400);
  assert.equal(route.state.stored, null);
  assert.equal(route.state.mailed, null);
});
test("rebar technical inquiry can be submitted before any bar size is known", async () => {
  const route = mockRoute({ db: 42, mail: "mock-mail" });
  const response = await route.POST(request(false, { message: "", rebar_inquiry: JSON.stringify({ stage: "technical", lines: [] }) }));
  assert.equal(response.status, 200);
  assert.match(route.state.stored.message, /Technical review/);
});
