import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

// Evaluate project data modules without a Next server, preserving path aliases.
const root = resolve(import.meta.dirname, "..");
const cache = new Map();
export function loadProjectModule(file) {
  let absolute = resolve(root, file);
  if (!extname(absolute)) absolute += existsSync(`${absolute}.ts`) ? ".ts" : ".tsx";
  if (cache.has(absolute)) return cache.get(absolute).exports;
  const moduleRecord = { exports: {} };
  cache.set(absolute, moduleRecord);
  const nativeRequire = createRequire(absolute);
  const projectRequire = (specifier) => specifier.startsWith("@/")
    ? loadProjectModule(specifier.slice(2))
    : specifier.startsWith(".") ? loadProjectModule(resolve(dirname(absolute), specifier)) : nativeRequire(specifier);
  const { outputText } = ts.transpileModule(readFileSync(absolute, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
  new Function("require", "module", "exports", outputText)(projectRequire, moduleRecord, moduleRecord.exports);
  return moduleRecord.exports;
}

// Existing source-boundary tests now inspect the generated public payloads.
export function publicSurface(relativePath) {
  if (relativePath.endsWith("app/api/ai-context/route.ts")) return JSON.stringify(loadProjectModule("lib/publicKnowledge.ts").buildPublicKnowledge());
  if (relativePath.endsWith("lib/llmsContent.ts")) return loadProjectModule("lib/llmsContent.ts").buildLlmsContent();
  return null;
}
