import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { timingSafeEqual } from "node:crypto";
import ts from "typescript";
import { loadProjectModule } from "./load-project-module.mjs";

function evaluate(path, mocks) {
  const code = ts.transpileModule(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const moduleRecord = { exports: {} };
  new Function("require", "module", "exports", code)((id) => { if (!(id in mocks)) throw Error(`Unexpected dependency ${id}`); return mocks[id]; }, moduleRecord, moduleRecord.exports);
  return moduleRecord.exports;
}

test("qualification writes stay independent of outcome and use idempotent additive columns", async () => {
  const previous = process.env.DATABASE_URL;
  process.env.DATABASE_URL = "postgres://offline-mock.invalid/test";
  const queries = [];
  const sql = async (parts, ...values) => {
    queries.push({ text: parts.join("?"), values });
    return /UPDATE|INSERT/.test(parts.join("")) ? [{ id: 1000001 }] : [];
  };
  try {
    const db = evaluate("lib/db.ts", { postgres: () => sql, "@/lib/acquisition": loadProjectModule("lib/acquisition.ts") });
    assert.equal((await db.setInquiryQualification(1000001, "quotable", " ")).ok, false);
    assert.equal(queries.length, 0);
    assert.equal((await db.setInquiryQualification(1000001, "bogus", "note")).ok, false);
    assert.deepEqual(await db.setInquiryQualification(1000001, "qualified", "Real corrosion project; length to confirm"), { ok: true });
    const update = queries.find(q => q.text.includes("UPDATE"));
    assert.match(update.text, /qualification_status/);
    assert.doesNotMatch(update.text, /outcome|realized_margin/);
    assert.ok(update.values.includes(1000001));
    for (const column of ["acquisition", "qualification_status", "qualification_at", "qualification_note"]) {
      assert.ok(queries.some(q => q.text.includes(`ADD COLUMN IF NOT EXISTS ${column}`)), column);
    }
    const calls = queries.length;
    assert.deepEqual(await db.setInquiryQualification(1000001, "quotable", "Drawing R2, resin, 200 pieces × 6 m, destination and scope confirmed"), { ok: true });
    assert.equal(queries.length, calls + 1, "table initialization is not rerun for every update");
  } finally {
    if (previous === undefined) delete process.env.DATABASE_URL; else process.env.DATABASE_URL = previous;
  }
});

test("authenticated inquiry API preserves acquisition/ID and supports qualification without changing old outcome payload", async () => {
  const previous = process.env.INQUIRY_API_TOKEN;
  process.env.INQUIRY_API_TOKEN = "offline-test-token";
  const row = { id: 1000001, acquisition: { version: 1, firstTouch: { landingPath: "/frp-profile-calculator" } }, qualification_status: null, outcome: null };
  let outcomeUpdate = null;
  const route = evaluate("app/api/inquiries/route.ts", {
    "next/server": { NextResponse: { json: (body, options) => Response.json(body, options) } },
    "node:crypto": { timingSafeEqual },
    "@/lib/db": {
      dbConfigured: () => true, listInquiries: async () => [row], inquiryMetrics: async () => ({}),
      QUALIFICATION_STATUSES: ["unreviewed", "qualified", "quotable", "not-fit"],
      setInquiryQualification: async (id, status, note) => { assert.equal(id, row.id); row.qualification_status = status; row.qualification_note = note; return { ok: true }; },
      setInquiryOutcome: async (id, value) => { assert.equal(id, row.id); outcomeUpdate = value; row.outcome = value.outcome; return { ok: true }; },
    },
  });
  const patch = (body, authorized = true) => new Request("https://local.test/api/inquiries", { method: "PATCH", headers: { "content-type": "application/json", ...(authorized ? { authorization: "Bearer offline-test-token" } : {}) }, body: JSON.stringify(body) });
  try {
    assert.equal((await route.PATCH(patch({ id: row.id, qualificationStatus: "quotable" }, false))).status, 401);
    assert.equal(row.qualification_status, null);
    for (const body of [null, [], { id: 1.2 }, { id: row.id, qualificationStatus: "made-up" }, { id: row.id, qualificationStatus: "qualified", outcome: "won" }]) {
      assert.equal((await route.PATCH(patch(body))).status, 400);
    }
    const qualified = await route.PATCH(patch({ id: row.id, qualificationStatus: "qualified", qualificationNote: "Project fit reviewed" }));
    assert.equal(qualified.status, 200);
    assert.equal(row.outcome, null);
    assert.equal((await route.PATCH(patch({ id: row.id, outcome: "won", realized_margin: 28, note: "PO received" }))).status, 200);
    assert.deepEqual(outcomeUpdate, { outcome: "won", realizedMargin: 28, lossReason: null, note: "PO received" });
    assert.equal(row.qualification_status, "qualified");
    const req = new Request("https://local.test/api/inquiries?since=1000000", { headers: { authorization: "Bearer offline-test-token" } });
    req.nextUrl = new URL(req.url);
    const exported = await (await route.GET(req)).json();
    assert.equal(exported.cursor, row.id);
    assert.equal(exported.inquiries[0].acquisition.firstTouch.landingPath, "/frp-profile-calculator");
    assert.equal(exported.inquiries[0].qualification_status, "qualified");
    assert.equal(exported.inquiries[0].outcome, "won");
  } finally {
    if (previous === undefined) delete process.env.INQUIRY_API_TOKEN; else process.env.INQUIRY_API_TOKEN = previous;
  }
});
