import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

test("primary navigation follows buyer-oriented product and market taxonomy", async () => {
  const navigation = await read("content/data/navigation.ts");
  const mainNavigation = navigation.slice(
    navigation.indexOf("export const mainNav"),
    navigation.indexOf("export const footerNav"),
  );

  assert.match(mainNavigation, /label: "Products",\s*\n\s*href: "\/pultruded-frp-profiles"/);
  assert.match(mainNavigation, /label: "Industries",\s*\n\s*href: "\/industries"/);
  assert.doesNotMatch(mainNavigation, /label: "Applications",\s*\n\s*href: "\/industries"/);

  for (const group of [
    "Structural profiles",
    "Grating & decking",
    "Access systems",
    "Building & energy",
    "Browse",
    "By industry",
    "Application solutions",
    "Proof & markets",
    "Specify",
    "Tools & support",
    "Learn",
  ]) {
    assert.match(mainNavigation, new RegExp(`group: "${group.replace(/[&]/g, "&")}"`));
  }

  const requiredProductRoutes = [
    "/products/fiberglass-structural-shapes",
    "/products/fiberglass-sheets",
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
    "/products/frp-solar-mounting-systems",
  ];
  for (const route of requiredProductRoutes) assert.match(mainNavigation, new RegExp(route.replaceAll("/", "\\/")));

  assert.equal([...mainNavigation.matchAll(/label: "Case Studies"/g)].length, 1);
  assert.match(mainNavigation, /label: "Technical Authors", href: "\/about\/authors"/);
});

test("footer mirrors the main information architecture without fixed-height clipping", async () => {
  const [navigation, footer] = await Promise.all([
    read("content/data/navigation.ts"),
    read("components/layout/Footer.tsx"),
  ]);

  for (const key of ["profiles", "systems", "applications", "engineering", "company"]) {
    assert.match(navigation, new RegExp(`  ${key}: \\[`));
  }
  for (const title of ["Profiles & Materials", "Engineered Systems", "Applications", "Engineering", "Company"]) {
    assert.match(footer, new RegExp(title.replace("&", "&")));
  }

  assert.match(footer, /open && <FooterLinks/);
  assert.doesNotMatch(footer, /max-h-\[280px\]/);
  assert.match(footer, /lg:grid-cols-\[1\.35fr_repeat\(5,minmax\(0,1fr\)\)\]/);
});

test("desktop mega menus and mobile navigation retain responsive and accessible controls", async () => {
  const navbar = await read("components/layout/Navbar.tsx");

  assert.match(navbar, /w-\[min\(760px,calc\(100vw-48px\)\)\]/);
  assert.match(navbar, /aria-controls="mobile-navigation"/);
  assert.match(navbar, /max-h-\[calc\(100dvh-72px\)\] overflow-y-auto/);
  assert.match(navbar, /aria-label=\{`\$\{expanded \? "Collapse" : "Expand"\} \$\{item\.label\}`\}/);
  assert.match(navbar, /width=\{58\}[\s\S]{0,80}height=\{40\}/);
  assert.doesNotMatch(navbar, /className="h-\[40px\] w-auto"/);
});
