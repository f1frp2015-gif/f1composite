import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";

test("CSP allows the Google Ads conversion requests sent by gtag", async () => {
  const config = loadProjectModule("next.config.ts").default;
  const rules = await config.headers();
  const csp = rules.find((rule) => rule.source === "/(.*)").headers.find((h) => h.key === "Content-Security-Policy").value;
  const directives = Object.fromEntries(csp.split("; ").map((d) => [d.split(" ")[0], d.split(" ").slice(1)]));
  const required = {
    "script-src": ["https://www.googletagmanager.com", "https://www.googleadservices.com", "https://www.google.com"],
    "img-src": ["https://www.googleadservices.com", "https://*.google.com", "https://*.g.doubleclick.net"],
    "connect-src": ["https://www.googleadservices.com", "https://*.google.com", "https://pagead2.googlesyndication.com", "https://*.google-analytics.com"],
    "frame-src": ["https://td.doubleclick.net", "https://bid.g.doubleclick.net", "https://www.googletagmanager.com"],
  };
  for (const [directive, hosts] of Object.entries(required)) {
    for (const host of hosts) assert.ok(directives[directive]?.includes(host), `${directive} is missing ${host}`);
  }
  assert.ok(!directives["script-src"].some((host) => host.includes("*.google.com")), "script-src must not allow every google.com subdomain");
});
