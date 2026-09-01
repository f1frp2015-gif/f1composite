import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

function extractHrefs(source) {
  return [...source.matchAll(/href: "([^"]+)"/g)].map((match) => match[1]);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

test("primary navigation follows a product-to-project buyer journey", async () => {
  const navigation = await read("content/data/navigation.ts");
  const mainNavigation = navigation.slice(
    navigation.indexOf("export const mainNav"),
    navigation.indexOf("export const footerNav"),
  );

  const topLevel = [
    ["products", "Products", "/pultruded-frp-profiles"],
    ["applications", "Applications", "/applications"],
    ["engineering", "Engineering", "/technology"],
    ["resources", "Resources", "/resources"],
    ["company", "Company", "/about"],
  ];

  let previousIndex = -1;
  for (const [id, label, href] of topLevel) {
    const pattern = new RegExp(`id: "${id}",[\\s\\S]{0,80}label: "${label}",[\\s\\S]{0,80}href: "${href.replaceAll("/", "\\/")}"`);
    assert.match(mainNavigation, pattern);
    const itemIndex = mainNavigation.indexOf(`id: "${id}"`);
    assert.ok(itemIndex > previousIndex, `${label} should follow the intended buyer-journey order`);
    previousIndex = itemIndex;
  }

  for (const section of [
    "Profiles & materials",
    "Grating, decking & access",
    "Building & infrastructure",
    "Energy & specialty",
    "By application",
    "By industry",
    "Proof & markets",
    "Technology & validation",
    "Engineering tools",
    "Specification resources",
    "Learn",
    "Buyer guides",
  ]) {
    assert.match(mainNavigation, new RegExp(`label: "${section.replace(/[&]/g, "&")}"`));
  }

  const requiredRoutes = [
    "/products/fiberglass-structural-shapes",
    "/products/frp-rebar",
    "/products/fiberglass-sheets",
    "/products/fiberglass-plates",
    "/products/custom-pultruded-profiles",
    "/products/frp-gratings",
    "/products/molded-frp-grating",
    "/products/frp-deck-panels",
    "/products/frp-stair-treads",
    "/products/frp-ladders",
    "/products/frp-handrail-systems",
    "/products/frp-window-frames",
    "/products/frp-window-reinforcement",
    "/products/frp-facade-panels",
    "/products/frp-sound-barrier-wall",
    "/products/frp-solar-mounting-systems",
    "/products/wind-turbine-blade-panels",
    "/products/fiberglass-snow-markers",
    "/products/fiberglass-stakes",
    "/applications/frp-cooling-tower-profiles",
    "/applications/frp-pedestrian-bridge-superstructures",
    "/technology/quality-testing",
    "/resources/technical-data",
    "/resources/downloads",
    "/about/authors",
  ];
  for (const route of requiredRoutes) {
    assert.match(mainNavigation, new RegExp(route.replaceAll("/", "\\/")));
  }

  const hrefs = extractHrefs(mainNavigation);
  assert.equal(new Set(hrefs).size, hrefs.length, "global navigation routes should not be duplicated");
  assert.ok(hrefs.length <= 65, "global navigation should retain a bounded link budget");
  assert.equal([...mainNavigation.matchAll(/label: "Case Studies"/g)].length, 1);
  assert.doesNotMatch(mainNavigation, /label: "All Products"/);
  assert.doesNotMatch(mainNavigation, /label: "About F1 Composite"/);
  assert.doesNotMatch(mainNavigation, /label: "F1 Product Lines"/);
});

test("footer is a concise set of hubs instead of a second mega menu", async () => {
  const [navigation, footer] = await Promise.all([
    read("content/data/navigation.ts"),
    read("components/layout/Footer.tsx"),
  ]);
  const footerNavigation = navigation.slice(navigation.indexOf("export const footerNav"));
  const hrefs = extractHrefs(footerNavigation);

  for (const key of ["products", "applications", "resources", "company"]) {
    assert.match(footerNavigation, new RegExp(`  ${key}: \\[`));
  }
  for (const title of ["Products", "Applications", "Resources", "Company"]) {
    assert.match(footer, new RegExp(`title: "${title}"`));
  }

  assert.equal(new Set(hrefs).size, hrefs.length, "footer routes should be unique");
  assert.ok(hrefs.length <= 20, `footer should stay at 20 navigation links or fewer, found ${hrefs.length}`);
  for (const route of [
    "/pultruded-frp-profiles",
    "/applications",
    "/industries",
    "/case-studies",
    "/resources",
    "/resources/technical-data",
    "/technology/quality-testing",
    "/about",
    "/contact",
  ]) {
    assert.match(footerNavigation, new RegExp(route.replaceAll("/", "\\/")));
  }

  assert.doesNotMatch(footer, /^"use client"/);
  assert.doesNotMatch(footer, /useState|FooterAccordion|ISO 9001:2015|EN 13706|ASTM D3917|CE Marking/);
  assert.doesNotMatch(footer, /href="\/sitemap\.xml"|href="tel:/);
  assert.match(footer, /source=footer-cta&inquiry_type=rfq/);
  assert.match(footer, /mailto:inquiry@f1composite\.com/);
  assert.match(footer, /WhatsApp sales/);
  assert.match(footer, /Customer login/);
  assert.match(footer, /prefetch=\{false\}/);
  assert.match(footer, /grid grid-cols-2/);
  assert.match(footer, /lg:grid-cols-\[1\.4fr_repeat\(4,minmax\(0,1fr\)\)\]/);
});

test("desktop and mobile navigation use controlled, route-aware disclosures", async () => {
  const navbar = await read("components/layout/Navbar.tsx");

  assert.match(navbar, /usePathname/);
  assert.match(navbar, /aria-current=/);
  assert.match(navbar, /aria-expanded=\{expanded\}/);
  assert.match(navbar, /aria-controls=\{menuId\}/);
  assert.match(navbar, /aria-controls=\{sectionId\}/);
  assert.match(navbar, /event\.key !== "Escape"/);
  assert.match(navbar, /document\.addEventListener\("pointerdown"/);
  assert.match(navbar, /document\.body\.style\.overflow = "hidden"/);
  assert.equal([...navbar.matchAll(/hidden=\{!expanded\}/g)].length, 2);
  assert.doesNotMatch(navbar, /item\.sections && expanded &&/);
  assert.match(navbar, /prefetch=\{false\}/);
  assert.match(navbar, /pointerType !== "mouse"/);
  assert.match(navbar, /desktopOpenCauseRef\.current === "hover"/);
  assert.match(navbar, /hoverSuppressedForRef\.current = itemId/);
  assert.match(navbar, /max-h-\[calc\(100dvh-96px\)\]/);
  assert.match(navbar, /max-h-\[calc\(100dvh-72px\)\] overflow-y-auto overscroll-contain/);
  assert.match(navbar, /width=\{58\}[\s\S]{0,80}height=\{40\}/);
  assert.doesNotMatch(navbar, /onFocus=\{\(\) => setDesktopOpen/);
  assert.doesNotMatch(navbar, /onMouseEnter|onMouseLeave/);
  assert.doesNotMatch(navbar, /invisible absolute|group-hover:visible|group-focus-within:visible/);
});

test("every navigation data route resolves to a real page or registered application", async () => {
  const [navigation, applications] = await Promise.all([
    read("content/data/navigation.ts"),
    read("lib/applicationPages.ts"),
  ]);
  const routes = [...new Set(extractHrefs(navigation))];

  for (const route of routes) {
    assert.match(route, /^\/[a-z0-9/?=&.-]+$/i, `unexpected navigation route format: ${route}`);
    const pathname = route.split("?")[0];
    const directPage = path.join(root, "app", pathname.slice(1), "page.tsx");
    if (await fileExists(directPage)) continue;

    if (pathname.startsWith("/applications/")) {
      const slug = pathname.slice("/applications/".length);
      assert.match(applications, new RegExp(`slug: "${slug}"`), `unregistered application route: ${route}`);
      continue;
    }

    assert.fail(`navigation route has no page: ${route}`);
  }
});
