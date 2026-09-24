import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { loadProjectModule } from "./load-project-module.mjs";

const consent = loadProjectModule("lib/consent.ts");
const DAY = 24 * 60 * 60 * 1000;

function stored(fields) {
  return JSON.stringify({ v: consent.CONSENT_VERSION, t: Date.now(), analytics: false, ads: false, ...fields });
}

// Run the inline <head> script against a fake browser and return the gtag queue.
function runBootstrap(storedValue) {
  const sandbox = {
    Date,
    JSON,
    localStorage: { getItem: (key) => (key === consent.CONSENT_STORAGE_KEY ? storedValue : null) },
  };
  sandbox.window = sandbox;
  vm.runInNewContext(consent.consentBootstrapScript(["G-TEST", "AW-TEST"]), sandbox);
  // Round-trip through JSON so the arrays belong to this realm, not the sandbox.
  return JSON.parse(JSON.stringify(Array.from(sandbox.dataLayer, (entry) => Array.from(entry))));
}

test("stored consent is honoured only while current and unexpired", () => {
  assert.deepEqual(consent.parseConsent(stored({ analytics: true })), { analytics: true, ads: false });
  assert.equal(consent.parseConsent(null), null);
  assert.equal(consent.parseConsent("not json"), null);
  assert.equal(consent.parseConsent(stored({ v: consent.CONSENT_VERSION + 1 })), null);
  assert.equal(consent.parseConsent(stored({ t: Date.now() - 366 * DAY })), null);
  assert.deepEqual(consent.parseConsent(stored({ analytics: "yes", ads: 1 })), { analytics: false, ads: false });
  const roundTrip = consent.serializeConsent({ analytics: false, ads: true });
  assert.deepEqual(consent.parseConsent(roundTrip), { analytics: false, ads: true });
});

test("banner asks European time zones and unknown ones", () => {
  for (const zone of ["Europe/Berlin", "Europe/London", "Europe/Zurich", "Atlantic/Canary", "Asia/Nicosia", "Indian/Reunion", undefined]) {
    assert.equal(consent.isConsentTimeZone(zone), true, zone);
  }
  for (const zone of ["America/New_York", "Asia/Shanghai", "Asia/Dubai", "Australia/Sydney"]) {
    assert.equal(consent.isConsentTimeZone(zone), false, zone);
  }
});

test("consent regions cover the EEA, UK and Switzerland", () => {
  const regions = consent.CONSENT_REGIONS;
  assert.equal(new Set(regions).size, 32);
  for (const code of ["DE", "FR", "IE", "NO", "IS", "LI", "GB", "CH"]) assert.ok(regions.includes(code), code);
});

test("consent defaults are queued before the tag config", () => {
  const queue = runBootstrap(null);
  assert.deepEqual(queue.map((entry) => entry.slice(0, 2)), [
    ["consent", "default"],
    ["consent", "default"],
    ["set", "ads_data_redaction"],
    ["js", queue[3][1]],
    ["config", "G-TEST"],
    ["config", "AW-TEST"],
  ]);
  const [regional, global] = [queue[0][2], queue[1][2]];
  assert.equal(regional.analytics_storage, "denied");
  assert.equal(regional.ad_user_data, "denied");
  assert.deepEqual(regional.region, [...consent.CONSENT_REGIONS]);
  assert.equal(global.ad_storage, "granted");
  assert.equal(global.region, undefined);
});

test("a stored choice updates consent before the tag config", () => {
  const queue = runBootstrap(stored({ analytics: true, ads: false }));
  assert.deepEqual(queue[3], ["consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  }]);
  assert.deepEqual(queue.slice(-2).map((entry) => entry[0]), ["config", "config"]);
  const expired = runBootstrap(stored({ analytics: true, t: Date.now() - 400 * DAY }));
  assert.ok(!expired.some((entry) => entry[1] === "update"));
});

test("layout initialises gtag only through the consent bootstrap and mounts the banner", () => {
  // React hoists the async gtag.js loader, so HTML order is not guaranteed.
  // gtag.js replays the dataLayer in order, which is why the queue is tested above.
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /__html: consentBootstrapScript\(\[GA4_MEASUREMENT_ID, GOOGLE_ADS_ID\]\)/);
  assert.doesNotMatch(layout, /gtag\('config'/);
  assert.match(layout, /<CookieConsent \/>/);
  const footer = readFileSync(new URL("../components/layout/Footer.tsx", import.meta.url), "utf8");
  assert.match(footer, /<CookieSettingsButton/);
  const privacy = readFileSync(new URL("../app/privacy/page.tsx", import.meta.url), "utf8");
  assert.match(privacy, /id="cookies"/);
});
