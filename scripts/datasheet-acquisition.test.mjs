import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { loadProjectModule } from "./load-project-module.mjs";

test("datasheet downloads store optional sanitized acquisition on their inquiry and preserve legacy request compatibility", async () => {
  const acquisition = loadProjectModule("lib/acquisition.ts");
  const rows = [];
  const mocks = {
    "next/server": { NextResponse: { json: (body, options) => Response.json(body, options) } },
    "@/lib/db": { insertInquiry: async (row) => { rows.push(row); return 55; } },
    "@/lib/acquisition": acquisition,
  };
  const source = readFileSync(new URL("../app/api/datasheet-lead/route.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  new Function("require", "exports", compiled)((id) => { if (!mocks[id]) throw Error(id); return mocks[id]; }, exports);
  const touch = acquisition.createAcquisitionTouch("https://www.f1composite.com/downloads?utm_source=bing", "https://www.bing.com/search?q=private");
  const supplied = { version: 1, consent: "explicit", firstTouch: touch, sessionTouch: touch };
  for (const metadata of [supplied, undefined, { version: 1, consent: "denied" }]) {
    const req = new Request("https://local.test/api/datasheet-lead", { method: "POST", headers: { "content-type": "application/json", referer: "https://www.f1composite.com/downloads?email=secret@example.com" }, body: JSON.stringify({ email: "buyer@example.invalid", models: ["I152"], ids: [1], acquisition: metadata }) });
    assert.equal((await exports.POST(req)).status, 200);
  }
  assert.deepEqual(rows[0].acquisition, supplied);
  assert.equal(rows[0].source, "datasheet-builder");
  assert.equal(rows[0].referer, null);
  assert.equal(rows[1].acquisition, null);
  assert.equal(rows[2].acquisition, null);
});
