import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// Tailwind silently emits nothing for a class that names a theme token that
// does not exist: `bg-navy` left a section white on white and 406 `text-f12` /
// `text-f14` style sizes fell back to 16px. These tests fail on such classes.

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const globals = read("app/globals.css");

function sourceFiles(dir) {
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) && !entry.name.endsWith(".d.ts") ? [path] : [];
  });
}
const files = ["app", "components", "lib", "content"].flatMap(sourceFiles);

const themeTokens = (namespace) => new Set([...globals.matchAll(new RegExp(`--${namespace}-([a-z0-9-]+):`, "g"))].map((m) => m[1]).filter((name) => !name.includes("--")));
const colors = themeTokens("color");
const sizes = themeTokens("text");
const radii = themeTokens("radius");
const shadows = themeTokens("shadow");

const PALETTE = /^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|[1-9]00|950)$/;
const isColor = (value) => colors.has(value) || PALETTE.test(value) || ["white", "black", "transparent", "current", "inherit"].includes(value);
const KEYWORDS = {
  text: /^(xs|sm|base|lg|[2-9]?xl|left|center|right|justify|start|end|wrap|nowrap|balance|pretty|ellipsis|clip)$/,
  bg: /^(fixed|local|scroll|clip-(border|padding|content|text)|origin-(border|padding|content)|no-repeat|repeat(-x|-y|-round|-space)?|auto|cover|contain|center|top|bottom|left|right|(left|right)-(top|bottom)|none|radial|conic|(gradient|linear)-to-(t|tr|r|br|b|bl|l|tl)|blend-.+)$/,
  border: /^(solid|dashed|dotted|double|hidden|none|collapse|separate|spacing)$|^(x|y|t|r|b|l|s|e)$/,
  outline: /^(none|hidden|solid|dashed|dotted|double|offset)$/,
  ring: /^(inset)$/,
  decoration: /^(solid|double|dotted|dashed|wavy|auto|from-font|clone|slice)$/,
  divide: /^(x|y|x-reverse|y-reverse|solid|dashed|dotted|double|none)$/,
  shadow: /^none$/,
  fill: /^none$/,
  // SVG attribute names such as attributeName="stroke-dashoffset" are not classes.
  stroke: /^(none|dash(array|offset)|line(cap|join)|miterlimit|opacity|width)$/,
  accent: /^auto$/,
};
const COLOR_UTILITY = /^(text|bg|border|outline|ring|decoration|divide|shadow|fill|stroke|from|via|to|placeholder|caret|accent)-([a-z][a-z0-9-]*)$/;

// Single words that can stand alone in a class list. A string holding any other
// plain word is prose (a sentence, an alt text) and is not checked.
const STANDALONE = new Set(["flex", "grid", "block", "inline", "hidden", "relative", "absolute", "fixed", "sticky", "static", "uppercase", "lowercase", "capitalize", "italic", "underline", "truncate", "group", "peer", "contents", "table", "visible", "invisible", "isolate", "antialiased", "border", "rounded", "shadow", "transition", "transform", "outline", "ring", "grow", "shrink", "collapse", "prose", "blur", "invert", "grayscale", "resize", "container"]);
const isClassList = (text) => text.split(/\s+/).filter(Boolean).every((token) => !/^[a-z]+$/.test(token) || STANDALONE.has(token));

/** The utility part of a class token: variants, `!`, and an opacity modifier removed. */
function utilityOf(token) {
  let depth = 0;
  let start = 0;
  for (let i = 0; i < token.length; i += 1) {
    const char = token[i];
    if (char === "[" || char === "(") depth += 1;
    else if (char === "]" || char === ")") depth -= 1;
    else if (char === ":" && depth === 0) start = i + 1;
  }
  let utility = token.slice(start).replace(/^!|!$/g, "");
  if (!utility.endsWith("]")) utility = utility.replace(/\/[\w.[\]]+$/, "");
  return utility;
}

function problem(utility) {
  const size = utility.match(/^text-f(\d+)$/);
  if (size) return sizes.has(`f${size[1]}`) ? null : "no such --text size";
  // Corners and shadows come only from the theme tokens (rounded-card, shadow-pop …).
  const corner = utility.match(/^rounded(?:-(?:t|r|b|l|s|e|tl|tr|br|bl|ss|se|es|ee))?(?:-(.+))?$/);
  if (corner) return corner[1] === "full" || corner[1] === "none" || radii.has(corner[1]) ? null : "use rounded-tag, rounded-control or rounded-card";
  if (utility === "shadow" || /^shadow-(\[|\d)/.test(utility)) return "use shadow-card, shadow-pop or shadow-bar";
  if (utility.startsWith("shadow-") && shadows.has(utility.slice(7))) return null;
  const match = utility.match(COLOR_UTILITY);
  if (!match) return null;
  let [, prefix, value] = match;
  if (prefix === "border" || prefix === "outline" || prefix === "ring") {
    const side = value.match(/^(?:x|y|t|r|b|l|s|e|offset)-(.+)$/);
    if (side) value = side[1];
    if (/^\d/.test(value)) return null;
  }
  if (prefix === "text" && sizes.has(value)) return null;
  if (KEYWORDS[prefix]?.test(value)) return null;
  if (isColor(value)) return null;
  return prefix === "shadow" ? "use shadow-card, shadow-pop or shadow-bar" : "no such --color token";
}

/** Every string literal and template chunk in a file, with its line number. */
function strings(path) {
  const source = ts.createSourceFile(path, read(path), ts.ScriptTarget.Latest, true, path.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const found = [];
  const visit = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      found.push({ text: node.text, line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1 });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

test("class names only use theme tokens that exist", () => {
  const failures = [];
  for (const path of files) {
    for (const { text, line } of strings(path)) {
      if (!isClassList(text)) continue;
      for (const token of text.split(/\s+/)) {
        if (!/^[!\w[(&@*-]/.test(token) || /[A-Z]/.test(utilityOf(token)[0] ?? "")) continue;
        const reason = problem(utilityOf(token));
        if (reason) failures.push(`${relative(root, join(root, path))}:${line} ${token} (${reason})`);
      }
    }
  }
  assert.deepEqual(failures, [], `Undefined theme classes:\n${failures.join("\n")}`);
});

test("the font stacks go through the next/font variables", () => {
  const declared = [...read("app/layout.tsx").matchAll(/localFont\(\{[\s\S]*?variable:\s*"(--[\w-]+)"/g)].map((m) => m[1]);
  for (const [stack, variable] of [["--font-sans", "--font-dm-sans"], ["--font-mono", "--font-dm-mono"]]) {
    assert.ok(declared.includes(variable), `app/layout.tsx no longer declares ${variable} with next/font`);
    const value = globals.match(new RegExp(`${stack}:\\s*([^;]+);`))?.[1] ?? "";
    assert.ok(value.startsWith(`var(${variable})`), `${stack} is "${value}"; it must start with var(${variable}) or the self-hosted font never loads`);
  }
});

test("pages use the shared site container instead of their own width and gutters", () => {
  assert.match(globals, /@utility site-container\s*\{/);
  const embedShells = new Set(["components/tools/EmbedShell.tsx", "app/ai/passive-house/embed/page.tsx", "app/frp-span-tables/embed/page.tsx"]);
  const offenders = [];
  for (const path of files.filter((file) => file.endsWith(".tsx") && !embedShells.has(file))) {
    for (const { text, line } of strings(path)) {
      const tokens = text.split(/\s+/);
      const pageWidth = tokens.some((token) => /^max-w-\[(1[0-9]{3})px\]$/.test(token));
      if (pageWidth && tokens.includes("mx-auto") && tokens.some((token) => /^(?:\w+:)?px-/.test(token))) offenders.push(`${path}:${line} ${text}`);
    }
  }
  assert.deepEqual(offenders, [], `Use site-container for page-width containers:\n${offenders.join("\n")}`);
});
