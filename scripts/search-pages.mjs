// Reads the title and description of every static page, and of each case
// study, for the site search index (lib/search/buildIndex.ts). Page metadata
// lives inside the page files, which cannot be imported outside Next, so the
// TypeScript parser reads the literal strings instead.
//
//   node scripts/search-pages.mjs    rewrites lib/search/pages.generated.json
//
// scripts/site-search.test.mjs fails when the committed file is out of date.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import { loadTestData } from "./load-test-data.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
export const OUTPUT = "lib/search/pages.generated.json";

// Not destinations of their own: dynamic templates (indexed from their data),
// embeddable tool shells and the search results page itself.
const skipRoute = (route) => route.includes("[") || route.split("/").includes("embed") || route === "/search";

function pageFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return pageFiles(path);
    return entry.name === "page.tsx" ? [path] : [];
  });
}

function routeOf(file) {
  const dir = relative(join(root, "app"), dirname(file)).split(sep).join("/");
  return dir ? `/${dir}` : "/";
}

// Import-free data modules under content/data, loaded once, so that a page
// using `page.description` from `import { doorThresholds as page }` resolves.
const dataModules = new Map();

async function loadDataModules(files) {
  for (const file of files) {
    for (const statement of readSource(file).statements) {
      if (!ts.isImportDeclaration(statement)) continue;
      const specifier = statement.moduleSpecifier.text;
      if (!specifier.startsWith("@/content/data/") || dataModules.has(specifier)) continue;
      try {
        dataModules.set(specifier, await loadTestData(`${specifier.slice(2)}.ts`));
      } catch {
        dataModules.set(specifier, null); // imports other modules; its values stay unresolved
      }
    }
  }
}

/** Local name → exported value, for named imports from loaded data modules. */
function importedValues(source) {
  const values = new Map();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const exports = dataModules.get(statement.moduleSpecifier.text);
    const bindings = statement.importClause?.namedBindings;
    if (!exports || !bindings || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements) values.set(element.name.text, exports[(element.propertyName ?? element.name).text]);
  }
  return values;
}

/** Top-level `const name = …` initialisers, for resolving identifiers. */
function topLevelConstants(source) {
  const constants = new Map([...importedValues(source)].map(([name, value]) => [name, { imported: value }]));
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) constants.set(declaration.name.text, declaration.initializer);
    }
  }
  return constants;
}

/** A string built only from literals, `+`, templates and top-level constants; otherwise null. */
function resolveString(node, constants, depth = 0) {
  if (!node || depth > 10) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isJsxExpression(node)) {
    return resolveString(node.expression, constants, depth + 1);
  }
  if (ts.isIdentifier(node)) {
    const value = constants.get(node.text);
    if (value && "imported" in value) return typeof value.imported === "string" ? value.imported : null;
    return resolveString(value, constants, depth + 1);
  }
  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)) {
    const value = constants.get(node.expression.text);
    const property = value && "imported" in value ? value.imported?.[node.name.text] : undefined;
    return typeof property === "string" ? property : null;
  }
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = resolveString(node.left, constants, depth + 1);
    const right = resolveString(node.right, constants, depth + 1);
    return left === null || right === null ? null : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) {
      const value = resolveString(span.expression, constants, depth + 1);
      if (value === null) return null;
      text += value + span.literal.text;
    }
    return text;
  }
  return null;
}

function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))) node = node.expression;
  return node;
}

/** Property initialisers of an object literal; shorthand `{ title }` maps to the identifier. */
function objectProperties(node) {
  const properties = new Map();
  for (const property of unwrap(node)?.properties ?? []) {
    if (ts.isPropertyAssignment(property)) {
      const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : null;
      if (name) properties.set(name, property.initializer);
    } else if (ts.isShorthandPropertyAssignment(property)) {
      properties.set(property.name.text, property.name);
    }
  }
  return properties;
}

function find(node, predicate) {
  if (predicate(node)) return node;
  let found = null;
  ts.forEachChild(node, (child) => {
    found ??= find(child, predicate);
  });
  return found;
}

const isCall = (name) => (node) => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name;

function readSource(file) {
  return ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

function pageEntry(file, route) {
  const source = readSource(file);
  const constants = topLevelConstants(source);

  let metadata = null;
  const call = find(source, isCall("buildPageMetadata"));
  if (call?.arguments[0]) metadata = objectProperties(call.arguments[0]);
  if (!metadata) {
    const declaration = find(source, (node) => ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "metadata");
    if (declaration?.initializer) metadata = objectProperties(declaration.initializer);
  }
  let seoTitle = metadata ? resolveString(metadata.get("title"), constants) : null;
  if (seoTitle === null && metadata?.get("title")) seoTitle = resolveString(objectProperties(metadata.get("title")).get("absolute"), constants);

  const header = find(source, (node) => (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(source) === "PageHeader");
  const headerProp = (name) => {
    const attribute = header?.attributes.properties.find((property) => ts.isJsxAttribute(property) && property.name.getText(source) === name);
    return attribute?.initializer ? resolveString(attribute.initializer, constants) : null;
  };

  return {
    path: route,
    title: headerProp("title") ?? seoTitle,
    seoTitle,
    description: (metadata ? resolveString(metadata.get("description"), constants) : null) ?? headerProp("description"),
  };
}

/** Case studies are one template over a literal record in the page file. */
function caseStudyEntries() {
  const file = join(root, "app/case-studies/[slug]/page.tsx");
  const source = readSource(file);
  const constants = topLevelConstants(source);
  const record = unwrap(constants.get("caseStudyData"));
  if (!record || !ts.isObjectLiteralExpression(record)) throw new Error("app/case-studies/[slug]/page.tsx: caseStudyData is no longer an object literal");
  return record.properties.filter(ts.isPropertyAssignment).map((property) => {
    const slug = property.name.text;
    const fields = objectProperties(property.initializer);
    const text = (name) => resolveString(fields.get(name), constants);
    const title = text("title");
    const description = text("seoDescription") ?? `${text("industry")} case study in ${text("location")}.`;
    if (!title) throw new Error(`case study ${slug}: no literal title`);
    return { path: `/case-studies/${slug}`, title, description, keywords: [text("industry"), text("location"), text("focusKeyphrase")].filter(Boolean).join(" ") };
  });
}

/** Pages that take their metadata from seoQueryTargets fall back to that record. */
async function seoTargets() {
  const { seoQueryTargets } = await loadTestData("content/data/seoQueryTargets.ts");
  return new Map(seoQueryTargets.map((target) => [target.targetUrl, target]));
}

// Result titles use the SEO title, which names the topic ("FRP Test Reports &
// Product Evidence"), where an H1 may be conversational ("Find the document
// that matches your product"). The H1 and any "| …" tail stay searchable.
const displayTitle = (title) => title.replace(/\s*[|—–-]\s*F1 Composite$/, "").split(" | ")[0].trim();

export async function extractSearchPages() {
  const targets = await seoTargets();
  const files = pageFiles(join(root, "app"))
    .map((file) => ({ file, route: routeOf(file) }))
    .filter(({ route }) => !skipRoute(route));
  await loadDataModules(files.map(({ file }) => file));
  const pages = files
    .map(({ file, route }) => {
      const page = pageEntry(file, route);
      const target = targets.get(route);
      const seoTitle = page.seoTitle ?? target?.title ?? null;
      const title = seoTitle ?? page.title;
      const entry = { path: route, title: title && displayTitle(title), description: page.description ?? target?.description ?? null };
      const aliases = [...new Set([page.title, seoTitle].filter((alias) => alias && alias !== entry.title))];
      if (aliases.length) entry.aliases = aliases;
      return { file, entry };
    });

  const incomplete = pages.filter(({ entry }) => !entry.title || !entry.description);
  if (incomplete.length) {
    throw new Error(`Search index: no literal title or description in\n${incomplete.map(({ file }) => `  ${relative(root, file)}`).join("\n")}\nUse string constants in buildPageMetadata or PageHeader, or add the page to content/data/seoQueryTargets.ts.`);
  }
  return [...pages.map(({ entry }) => entry), ...caseStudyEntries()].sort((a, b) => a.path.localeCompare(b.path));
}

export function serialize(pages) {
  return `${JSON.stringify(pages, null, 2)}\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const pages = await extractSearchPages();
  writeFileSync(join(root, OUTPUT), serialize(pages));
  console.log(`Wrote ${pages.length} pages to ${OUTPUT}`);
}
