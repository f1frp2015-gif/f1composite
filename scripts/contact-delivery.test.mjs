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
  };
  const exports = {};
  new Function("require", "exports", compiled)((id) => { if (!mocks[id]) throw new Error(`Unmocked dependency ${id}`); return mocks[id]; }, exports);
  return { state, POST: exports.POST };
}
function request(attachment = false) {
  const form = new FormData();
  for (const [key, value] of Object.entries({ name: "QA", email: "test@example.invalid", country: "Test", inquiry_type: "rfq", message: "Drawing review", source: "evidence-library", context: JSON.stringify({ product: "I-beam", specification: "152×76×6.4", evidenceId: "structural-design" }) })) form.set(key, value);
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
