import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";

const acquisition = loadProjectModule("lib/acquisition.ts");
const consent = loadProjectModule("lib/consent.ts");
const client = loadProjectModule("lib/acquisitionClient.ts");
const rfq = loadProjectModule("lib/rfq.ts");
const originalNow = Date.now;
let now = originalNow();

function storage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key), clear: () => data.clear() };
}
function browser(path, referrer = "", allowed = true) {
  globalThis.window = { location: { href: `https://www.f1composite.com${path}` }, localStorage: storage(), sessionStorage: storage() };
  globalThis.document = { referrer };
  consent.setVisitConsent({ analytics: allowed, ads: false });
  client.clearAcquisition();
  now = originalNow();
  Date.now = () => now;
}
test.after(() => { Date.now = originalNow; delete globalThis.window; delete globalThis.document; consent.setVisitConsent(null); });

test("four acquisition paths: campaign, observed referrer, internal transition, unavailable source", () => {
  browser("/frp-profile-calculator?utm_source=chatgpt.com&utm_medium=referral&email=person%40example.com", "https://chatgpt.com/c/private-conversation");
  const tagged = client.getAcquisition();
  assert.deepEqual(tagged.firstTouch.utm, { source: "chatgpt.com", medium: "referral" });
  assert.equal(tagged.firstTouch.landingPath, "/frp-profile-calculator");
  assert.equal(tagged.firstTouch.referrerOrigin, "https://chatgpt.com");
  assert.doesNotMatch(JSON.stringify(tagged), /person|private-conversation|email|\?/);

  browser("/products/frp-gratings", "https://www.google.com/search?q=private+engineering+request");
  const referred = client.getAcquisition();
  assert.equal(referred.sessionTouch.referrerOrigin, "https://www.google.com");
  assert.deepEqual(referred.sessionTouch.utm, {});

  browser("/products?utm_source=bing&utm_campaign=structural_profiles", "https://www.bing.com/search?q=frp");
  const before = client.getAcquisition();
  // Once a page has been observed, internal navigation/redirects retain its touch.
  now += 1000;
  window.location.href = "https://www.f1composite.com/products/product-lines";
  client.getAcquisition();
  window.location.href = "https://www.f1composite.com/contact?source=calculator#context=private";
  const fd = new FormData(); client.appendAcquisition(fd);
  const submitted = JSON.parse(fd.get("acquisition"));
  assert.deepEqual(submitted.firstTouch, before.firstTouch);
  assert.deepEqual(submitted.sessionTouch, before.sessionTouch);

  browser("/contact");
  const missing = client.getAcquisition();
  assert.equal(missing.sessionTouch.referrerOrigin, null);
  assert.deepEqual(missing.sessionTouch.utm, {});
  assert.doesNotMatch(JSON.stringify(missing), /AI|chatgpt|direct|organic/);
});

test("session expiration preserves first touch; first touch expires at 90 days", () => {
  browser("/resources/technical-data?utm_source=google");
  const first = client.getAcquisition().firstTouch;
  now += acquisition.SESSION_IDLE_MS + 1;
  window.location.href = "https://www.f1composite.com/contact";
  let current = client.getAcquisition();
  assert.deepEqual(current.firstTouch, first);
  assert.equal(current.sessionTouch.landingPath, "/contact");
  now += acquisition.FIRST_TOUCH_MAX_AGE_MS + 1;
  current = client.getAcquisition();
  assert.equal(current.firstTouch.landingPath, "/contact");
});

test("rejection and withdrawal remove attribution; blocked storage cannot override rejection", () => {
  browser("/frp-profile-calculator?utm_source=google", "", false);
  const fd = new FormData(); fd.set("acquisition", "stale");
  client.appendAcquisition(fd);
  assert.equal(fd.get("acquisition"), null);
  assert.equal(window.localStorage.getItem(client.ACQUISITION_FIRST_KEY), null);
  consent.setVisitConsent({ analytics: true, ads: false });
  assert.ok(client.getAcquisition());
  consent.setVisitConsent({ analytics: false, ads: true });
  assert.equal(client.getAcquisition(), null);
  assert.equal(window.localStorage.getItem(client.ACQUISITION_FIRST_KEY), null);
  assert.equal(window.sessionStorage.getItem(client.ACQUISITION_SESSION_KEY), null);
  const blocked = { getItem() { throw Error("blocked"); }, setItem() { throw Error("blocked"); }, removeItem() { throw Error("blocked"); } };
  window.localStorage = blocked; window.sessionStorage = blocked;
  assert.equal(client.getAcquisition(), null);
  consent.setVisitConsent({ analytics: true, ads: false });
  assert.ok(client.getAcquisition());
  window.location.href = "https://www.f1composite.com/contact";
  assert.equal(client.getAcquisition().firstTouch.landingPath, "/frp-profile-calculator");
});

test("API sanitizer rejects unsupported consent and strips PII-like campaign values and unknown fields", () => {
  browser("/contact");
  const payload = client.getAcquisition();
  payload.firstTouch.utm = { source: "google", term: "person@example.com", content: "+8613812345678", campaign: "project_123456789", unknown: "leak" };
  payload.firstTouch.landingPath = "/contact?email=secret@example.com#private";
  payload.firstTouch.referrerOrigin = "https://www.google.com/search?q=secret";
  payload.email = "secret@example.com";
  const clean = acquisition.parseAcquisition(payload, now);
  assert.deepEqual(clean.firstTouch.utm, { source: "google" });
  assert.equal(clean.firstTouch.landingPath, "/contact");
  assert.equal(clean.firstTouch.referrerOrigin, "https://www.google.com");
  assert.doesNotMatch(JSON.stringify(clean), /secret|leak|1234567/);
  assert.equal(acquisition.parseAcquisition({ ...payload, consent: "denied" }), null);
  assert.equal(acquisition.parseAcquisition("{broken"), null);
  assert.equal(acquisition.acquisitionReferrer("https://person:password@example.com/path"), null);
  assert.equal(acquisition.acquisitionPath("/people/person%40example.com"), null);
});

test("RFQ snapshot uses fragment and safely round-trips; legacy query links remain supported", () => {
  const context = { catalogSelections: [{ sectionId: "section-1", model: "I152" }], calculatorSnapshot: { version: 1 } };
  const href = rfq.buildRfqHref({ source: "catalog", product: "FRP I-beam", context, message: "Please review this selection" });
  const url = new URL(href, "https://www.f1composite.com");
  assert.equal(url.searchParams.has("context"), false);
  assert.equal(url.searchParams.has("message"), false);
  assert.deepEqual(rfq.parseRfqFragment(url.hash), { context, message: "Please review this selection" });
  const legacy = new URL(rfq.buildRfqHref({ source: "product", message: "Legacy prefill" }), url.origin);
  assert.equal(legacy.searchParams.get("message"), "Legacy prefill");
  for (const raw of ['{"__proto__":{"polluted":true}}', '[]', '"not an object"', '{broken']) {
    assert.equal(rfq.parseRfqFragment(`#context=${encodeURIComponent(raw)}`).context, null);
  }
  assert.equal(rfq.parseRfqFragment(`#context=${"x".repeat(100001)}`).context, null);
});

test("RFQ UTF-8 budgets agree between builder and parser for multilingual and boundary payloads", () => {
  const urlFor = (context, message) => new URL(rfq.buildRfqHref({ source: "test", context, message }), "https://www.f1composite.com");
  // Regression: this previously produced a 117,044-character hash that was silently dropped.
  assert.throws(() => urlFor({ notes: "中".repeat(8000) }, "中".repeat(5000)), /UTF-8/);
  assert.throws(() => urlFor({ notes: "中".repeat(8000) }, "Short message"), /UTF-8/);
  const multilingual = { notes: "中".repeat(6000) };
  const longMessage = "中".repeat(3000);
  const encoded = urlFor(multilingual, longMessage).hash;
  assert.ok(encoded.length - 1 <= rfq.RFQ_FRAGMENT_MAX_LENGTH);
  assert.deepEqual(rfq.parseRfqFragment(encoded), { context: multilingual, message: longMessage });
  const overhead = Buffer.byteLength(JSON.stringify({ notes: "" }));
  const boundary = { notes: "a".repeat(rfq.RFQ_CONTEXT_MAX_BYTES - overhead) };
  const atLimit = urlFor(boundary, "m".repeat(rfq.RFQ_MESSAGE_MAX_BYTES));
  assert.deepEqual(rfq.parseRfqFragment(atLimit.hash).context, boundary);
  assert.throws(() => urlFor({ notes: `${boundary.notes}a` }, "m"), /UTF-8/);
  assert.throws(() => urlFor({}, "m".repeat(rfq.RFQ_MESSAGE_MAX_BYTES + 1)), /UTF-8/);
  for (const hash of [
    `#context=${encodeURIComponent(JSON.stringify({ notes: "中".repeat(8000) }))}&message=short`,
    `#context=%7B%7D&message=${encodeURIComponent("中".repeat(5000))}`,
    `#context=${"x".repeat(rfq.RFQ_FRAGMENT_MAX_LENGTH)}`,
    "#context=%7Bbroken",
  ]) {
    const parsed = rfq.parseRfqFragment(hash);
    assert.equal(parsed.context, null);
    assert.ok(parsed.error, "invalid RFQ payload returns a visible error reason");
  }
});

test("a loaded RFQ survives Skip to main and later anchors without replacing the form instance", () => {
  const first = new URL(rfq.buildRfqHref({ source: "calculator", context: { calculationId: "A" }, message: "First requirement" }), "https://example.test").hash;
  let state = rfq.applyRfqFragment({ fragment: "", formKey: "" }, first);
  const loaded = state;
  const draftByFormInstance = new Map([[state.formKey, { name: "Buyer", attachment: new File(["drawing"], "drawing.pdf") }]]);
  for (const hash of ["#main", "#requirements", "", "#footer"]) {
    state = rfq.applyRfqFragment(state, hash);
    assert.equal(state, loaded);
    assert.equal(rfq.parseRfqFragment(state.fragment).context.calculationId, "A");
    assert.equal(draftByFormInstance.get(state.formKey).name, "Buyer");
    assert.equal(draftByFormInstance.get(state.formKey).attachment.name, "drawing.pdf");
  }
  const invalid = rfq.applyRfqFragment(state, "#context=%7Bbroken");
  assert.equal(invalid.formKey, loaded.formKey, "invalid payload shows an error without resetting typed fields");
  assert.ok(rfq.parseRfqFragment(invalid.fragment).error);
  const second = new URL(rfq.buildRfqHref({ source: "calculator", context: { calculationId: "B" }, message: "New requirement" }), "https://example.test").hash;
  assert.notEqual(rfq.applyRfqFragment(state, second).formKey, loaded.formKey);
  assert.equal(rfq.contactPrefillKey(new URLSearchParams("source=calculator&utm_source=google")), rfq.contactPrefillKey(new URLSearchParams("utm_source=bing&source=calculator")));
  assert.notEqual(rfq.contactPrefillKey(new URLSearchParams("product=A")), rfq.contactPrefillKey(new URLSearchParams("product=B")));
});

test("canonical aliases and the current Preview origin never become external referrals", () => {
  for (const referrer of ["https://www.f1composite.com/products", "https://f1composite.com/contact", "http://www.f1composite.com./old"]) {
    assert.equal(acquisition.acquisitionReferrer(referrer), null);
    assert.equal(acquisition.createAcquisitionTouch("https://www.f1composite.com/contact", referrer).referrerOrigin, null);
  }
  assert.equal(acquisition.createAcquisitionTouch("https://f1-preview.vercel.app/contact", "https://f1-preview.vercel.app/calculator").referrerOrigin, null);
  assert.equal(acquisition.createAcquisitionTouch("http://localhost:3000/contact", "http://localhost:3000/calculator").referrerOrigin, null);
  assert.equal(acquisition.createAcquisitionTouch("https://f1-preview.vercel.app/contact", "https://chatgpt.com/c/private").referrerOrigin, "https://chatgpt.com");
  const touch = acquisition.createAcquisitionTouch("https://www.f1composite.com/contact", "");
  const spoofed = { ...touch, referrerOrigin: "https://f1composite.com/products" };
  const api = acquisition.parseAcquisition({ version: 1, consent: "explicit", firstTouch: spoofed, sessionTouch: spoofed });
  assert.equal(api.firstTouch.referrerOrigin, null);
  assert.equal(api.sessionTouch.referrerOrigin, null);
});
