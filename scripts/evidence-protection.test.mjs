import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadProjectModule } from "./load-project-module.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const { isSameOriginRequest } = loadProjectModule("lib/browserRequest.ts");
const { POST: pricePost } = loadProjectModule("app/api/profile-price/route.ts");
const { engineeringEvidence } = loadProjectModule("content/data/engineeringEvidence.ts");
const verification = loadProjectModule("content/data/reportVerification.ts");
const { publishedFileFacts } = loadProjectModule("lib/publishedFile.ts");

const priceBody = JSON.stringify({ geometry: { type: "square", side: 100, t: 8 }, fiber: "e_glass", resin: "up", totalMeters: 1000 });
let ipCounter = 0;
function priceRequest(headers, ip = `198.51.100.${++ipCounter}`) {
  return new Request("https://www.f1composite.com/api/profile-price", {
    method: "POST",
    headers: { "content-type": "application/json", host: "www.f1composite.com", "x-forwarded-for": ip, ...headers },
    body: priceBody,
  });
}

test("same-origin check accepts the site's own pages and refuses bare scripts", () => {
  const request = (headers) => new Request("https://www.f1composite.com/api/profile-price", { method: "POST", headers: { host: "www.f1composite.com", ...headers } });
  assert.equal(isSameOriginRequest(request({ "sec-fetch-site": "same-origin" })), true);
  assert.equal(isSameOriginRequest(request({ "sec-fetch-site": "cross-site" })), false);
  assert.equal(isSameOriginRequest(request({ "sec-fetch-site": "none" })), false);
  // Browsers without Fetch Metadata still send Origin on POST.
  assert.equal(isSameOriginRequest(request({ origin: "https://www.f1composite.com" })), true);
  assert.equal(isSameOriginRequest(request({ origin: "https://copycat.example" })), false);
  assert.equal(isSameOriginRequest(request({ origin: "https://preview.vercel.app", "x-forwarded-host": "preview.vercel.app" })), true);
  assert.equal(isSameOriginRequest(request({})), false, "curl sends neither header");
});

test("price API serves the estimator page and refuses direct calls", async () => {
  const direct = await pricePost(priceRequest({}));
  assert.equal(direct.status, 403);
  const page = await pricePost(priceRequest({ "sec-fetch-site": "same-origin", origin: "https://www.f1composite.com" }));
  assert.equal(page.status, 200);
  const data = await page.json();
  assert.ok(data.usdPerMeterLow > 0 && data.usdPerMeterHigh > data.usdPerMeterLow);
});

test("price API caps estimates per address", async () => {
  const ip = "203.0.113.77";
  const headers = { "sec-fetch-site": "same-origin" };
  let status = 200;
  let calls = 0;
  while (status === 200 && calls < 200) {
    status = (await pricePost(priceRequest(headers, ip))).status;
    calls += 1;
  }
  assert.equal(status, 429);
  assert.ok(calls > 60, `a person trying sizes needs dozens of estimates; blocked after ${calls - 1}`);
  // Another address is unaffected.
  assert.equal((await pricePost(priceRequest(headers))).status, 200);
});

test("catalog feed is rate limited", () => {
  const source = readFileSync(join(root, "app/api/catalog/route.ts"), "utf8");
  assert.match(source, /rateLimit\(req, "catalog"/);
});

test("every test report and certificate has a verification page", () => {
  const { reportVerifications, verificationTitle, verificationDescription } = verification;
  const thirdParty = engineeringEvidence.filter((record) => record.kind !== "Technical reference");
  for (const record of thirdParty) assert.ok(verification.verificationForEvidence(record.id), `${record.id} has no verification page`);
  const slugs = new Set();
  for (const item of reportVerifications) {
    assert.ok(engineeringEvidence.some((record) => record.id === item.evidenceId), `${item.slug} points at no evidence record`);
    assert.match(item.slug, /^[a-z0-9-]+$/);
    assert.ok(!slugs.has(item.slug), `duplicate slug ${item.slug}`);
    slugs.add(item.slug);
    assert.ok(verificationTitle(item).length <= 60, `${item.slug} title too long`);
    const description = verificationDescription(item).length;
    assert.ok(description >= 120 && description <= 160, `${item.slug} description is ${description} chars`);
    assert.ok(item.holder && item.steps.length > 0 && item.restrictions, `${item.slug} is missing holder, steps or restrictions`);
    assert.ok(item.issued || item.validUntil, `${item.slug} needs a date`);
    for (const file of item.files) assert.ok(existsSync(join(root, "public", file.path)), `${file.path} is missing`);
    const evidenceFile = engineeringEvidence.find((record) => record.id === item.evidenceId).file;
    assert.ok(item.files.some((file) => file.path === evidenceFile), `${item.slug} does not list the file the evidence card opens`);
  }
});

// Laboratory files must stay exactly as issued: several are digitally signed,
// and Intertek and the Wuxi centre state that altered reports are invalid. If a
// laboratory reissues a report, replace the file and update its hash here.
const LAB_ORIGINALS = {
  "/downloads/sgs-full-section-modulus-shin2608002943cm01-en.pdf": "d4310f5fb2f19e9db29e85d26b62bf791f7eea3d6314a659f4b80da42aea1a0e",
  "/downloads/sgs-full-section-modulus-shin2608002943cm02-en.pdf": "c5da3bf2bf06629d686244b9aa98571ac822bd7478fbc0a5c250b84ee6527475",
  "/downloads/phi-certificate-gfrp-90-series-2491wi03.pdf": "f5d68bd4bc5f6019e77758e6a3991c3c2fd18abbb236b1cc18981a4a0f00bf1e",
  "/downloads/intertek-report-240821010SHF-001-turn-tilt-window.pdf": "d2d2fb6194516479df391c4ad10f2cce9c0af56b30aadee31508a00cd9c01bbf",
  "/downloads/intertek-report-240821010SHF-002-lift-sliding-door.pdf": "b14cb98ade80348ff3989f948a6a0d243403bbbe83eec09808fe22e21ec067ab",
  "/downloads/frp-pv-module-frame-material-performance-test-report-2025dacs20319-original-zh.pdf": "86c37a8406a61188cc883365f47e658edd3c2c10352759fdf4da49c4cfcd4ddc",
  "/downloads/frp-pv-module-frame-jotun-coating-tuv-test-report-cn24kz3a-002.pdf": "a8afcbdae59837ad010b1541c172486f5f8c192b7b5061b47aab06d28f9b7880",
  "/downloads/frp-pv-module-frame-b9986s-coating-tuv-test-report-cn24kz3a-003.pdf": "7b11c4e091bdded752ad1e1d7de4a95eaef5ca279b68b4218416d24155ed67e9",
  "/downloads/frp-composite-profile-sgs-ul94-v0-test-report-gzmr260702529004-original-zh.pdf": "ab6dc6827f98ae02dad31a1d221d9cb98fb14931a91c527e3b91a50de22ec283",
};

test("laboratory originals are published unaltered", () => {
  const originals = verification.reportVerifications.flatMap((item) => item.files).filter((file) => file.role !== "F1 copy with English notes");
  assert.deepEqual(originals.map((file) => file.path).sort(), Object.keys(LAB_ORIGINALS).sort());
  for (const [path, sha256] of Object.entries(LAB_ORIGINALS)) {
    const actual = createHash("sha256").update(readFileSync(join(root, "public", path))).digest("hex");
    assert.equal(actual, sha256, `${path} changed; laboratory files must stay as issued`);
    assert.equal(publishedFileFacts(path).sha256, sha256);
  }
  // The signed originals are the ones a buyer can check in Acrobat Reader.
  assert.equal(publishedFileFacts("/downloads/intertek-report-240821010SHF-001-turn-tilt-window.pdf").digitallySigned, true);
  assert.equal(publishedFileFacts("/downloads/frp-pv-module-frame-jotun-coating-tuv-test-report-cn24kz3a-002.pdf").digitallySigned, false);
});

test("verification pages reach the sitemap, search, llms.txt and the AI context", async () => {
  const { reportVerifications, verificationPath } = verification;
  const sitemap = (await loadProjectModule("app/sitemap.ts").default()).map((entry) => entry.url);
  const search = loadProjectModule("lib/search/buildIndex.ts").buildSearchIndex().map((entry) => entry.url);
  const llms = loadProjectModule("lib/llmsContent.ts").buildLlmsContent();
  const context = JSON.stringify(loadProjectModule("lib/publicKnowledge.ts").buildPublicKnowledge());
  for (const item of reportVerifications) {
    const path = verificationPath(item.slug);
    assert.ok(sitemap.includes(`https://www.f1composite.com${path}`), `${path} missing from sitemap`);
    assert.ok(search.includes(path), `${path} missing from site search`);
    assert.ok(llms.includes(path), `${path} missing from llms.txt`);
    assert.ok(context.includes(path), `${path} missing from the AI context`);
  }
});
