import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { loadProjectModule } from "./load-project-module.mjs";

const contact = loadProjectModule("lib/contact.ts");
const { company } = loadProjectModule("content/data/company.ts");
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("WhatsApp links use the sales number and carry an encoded first message", () => {
  assert.equal(contact.whatsappHref(), `https://wa.me/${company.contact.whatsapp}`);
  assert.equal(company.contact.whatsapp, company.contact.phone.replace(/\D/g, ""));
  const href = contact.whatsappHref(contact.whatsappMessage("FRP I-Beams", "https://www.f1composite.com/products/x"));
  const text = new URL(href).searchParams.get("text");
  assert.equal(text, "Hello F1 Composite, I'm interested in FRP I-Beams. https://www.f1composite.com/products/x");
  assert.equal(contact.whatsappMessage(), "Hello F1 Composite, I have a question.");
  // Page titles become product names: subtitles and a trailing "manufacturer" are dropped.
  assert.equal(contact.whatsappMessage("FRP solar profiles — module frames, rails and supports"), "Hello F1 Composite, I'm interested in FRP solar profiles.");
  assert.equal(contact.whatsappMessage("Fiberglass sheets manufacturer — solid FRP sheet cut to size"), "Hello F1 Composite, I'm interested in Fiberglass sheets.");
  assert.equal(contact.whatsappMessage("FRP Rebar for Concrete Reinforcement"), "Hello F1 Composite, I'm interested in FRP Rebar for Concrete Reinforcement.");
});

test("contact clicks are classified for analytics", () => {
  assert.equal(contact.contactMethod("https://wa.me/8613883338993?text=hi"), "whatsapp");
  assert.equal(contact.contactMethod("mailto:inquiry@f1composite.com"), "email");
  assert.equal(contact.contactMethod("tel:+8613883338993"), "phone");
  assert.equal(contact.contactMethod("/contact"), null);
  assert.equal(contact.contactMethod(null), null);
  assert.deepEqual(Object.values(contact.CONTACT_CLICK_EVENTS), ["whatsapp_click", "email_click", "phone_click"]);
});

test("WhatsApp and click tracking are wired into the shared layout and CTAs", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /<ContactClickTracker \/>/);
  assert.match(layout, /<MobileContactBar \/>/);
  assert.match(read("app/globals.css"), /body:has\(\[data-page-bottom-bar\]\) \[data-site-contact-bar\]/);
  const productBar = read("components/layout/MobileActionBar.tsx");
  assert.match(productBar, /data-page-bottom-bar/);
  // Some pages put the quote link in the secondary action. The phone bar keeps the quote link
  // wherever it sits, and WhatsApp is added beside it, never in its place.
  assert.match(productBar, /pickBarAction\(primary, secondary\)/);
  const { pickBarAction } = loadProjectModule("lib/mobileBar.ts");
  const quote = { label: "Request a quote", href: "/contact?source=x&inquiry_type=rfq" };
  const tool = { label: "Start Calculator", href: "#calculator" };
  const ai = { label: "Ask the AI Assistant", href: "/ask?prefill=x" };
  assert.equal(pickBarAction(quote, ai), quote);
  assert.equal(pickBarAction(tool, quote), quote);
  assert.equal(pickBarAction(tool, ai), tool);
  assert.equal(pickBarAction(tool), tool);
  assert.match(productBar, /<WhatsAppButton [^>]*location="mobile-product-bar"/);
  assert.match(read("components/layout/PageHeader.tsx"), /secondary=\{resolvedActions\.secondary\}/);
  const header = read("components/layout/PageHeader.tsx");
  assert.match(header, /const whatsappTopic = isProductPage \? title : undefined/);
  assert.match(header, /<WhatsAppButton topic=\{whatsappTopic\}/);
  assert.match(read("components/sections/InnerCTA.tsx"), /<WhatsAppButton/);
});

test("the WhatsApp number is not hard-coded outside company.ts", () => {
  const hits = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(tsx?|mjs)$/.test(name) && !path.endsWith("content/data/company.ts") && readFileSync(path, "utf8").includes("wa.me/8613883338993")) hits.push(path);
    }
  };
  for (const dir of ["app", "components", "lib"]) walk(new URL(`../${dir}`, import.meta.url).pathname);
  assert.deepEqual(hits, []);
});
