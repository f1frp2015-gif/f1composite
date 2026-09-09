import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { loadProjectModule } from "./load-project-module.mjs";
const { inquiryReceipt } = loadProjectModule("lib/inquiryReceipt.ts");
const { buildRfqHref, attributionPath, attributionToken } = loadProjectModule("lib/rfq.ts");

test("submission receipt requires persistence or acknowledged email and identifies attachment failure", () => {
  for (const inquiryId of [null, 42]) for (const emailId of [null, "mail-42"]) for (const hasAttachment of [false, true]) {
    const result = inquiryReceipt({ inquiryId, emailId, hasAttachment });
    const accepted = inquiryId !== null || emailId !== null;
    assert.equal(result.accepted, accepted);
    assert.equal(result.status, accepted ? 200 : 503);
    assert.equal(Boolean(result.receiptId), accepted);
    assert.equal(result.attachmentReceived, hasAttachment ? emailId !== null : null);
    if (inquiryId && !emailId && hasAttachment) assert.match(result.message, /attachment could not be delivered/);
    if (!accepted) assert.match(result.message, /could not be recorded or emailed/);
  }
});

test("RFQ preserves section, product and evidence without leaking free text into attribution", () => {
  const selection = { source: "product-next-steps", product: "I-beam & channel", productPath: "/products/fiberglass-structural-shapes", specification: "152×76×6.4 mm", evidenceId: "structural-design" };
  const url = new URL(buildRfqHref(selection), "https://www.f1composite.com");
  assert.equal(url.pathname, "/contact");
  assert.equal(url.searchParams.get("product"), selection.product);
  assert.equal(url.searchParams.get("specification"), selection.specification);
  assert.equal(url.searchParams.get("evidence_id"), selection.evidenceId);
  assert.equal(attributionPath("/contact?email=private@example.org&message=secret"), "/contact");
  assert.equal(attributionToken("private@example.org"), "other");
  assert.equal(attributionPath("/private%40example.org"), "");
});

test("public machine surfaces share document scopes and quotation boundaries", () => {
  const { engineeringEvidence, commercialFacts } = loadProjectModule("content/data/engineeringEvidence.ts");
  const knowledge = loadProjectModule("lib/publicKnowledge.ts").buildPublicKnowledge();
  const llms = loadProjectModule("lib/llmsContent.ts").buildLlmsContent();
  const serialized = JSON.stringify(knowledge);
  for (const doc of engineeringEvidence) {
    assert.ok(existsSync(new URL(`../public${doc.file}`, import.meta.url)));
    assert.ok(serialized.includes(doc.scope));
    assert.ok(llms.includes(doc.scope));
    assert.ok(llms.includes(doc.file));
  }
  for (const key of ["pricing", "availability", "thermal", "serviceLife", "response"]) {
    assert.ok(serialized.includes(commercialFacts[key]));
    assert.ok(llms.includes(commercialFacts[key]));
  }
  assert.match(serialized, /cool-temperate/);
  assert.match(serialized, /phB/);
  assert.doesNotMatch(serialized + llms, /phA arctic|PHI Class A\+/);
  assert.doesNotMatch(serialized + llms, /priceBandUSDPerMeter|priceBandUSDPerM2|recoatingCycleYears/);
});
