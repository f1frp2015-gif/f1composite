import { readFile } from "node:fs/promises";
import ts from "typescript";

/** Load import-free repository data in Node 20 CI as well as current Node. */
export async function loadTestData(relativePath) {
  const source = await readFile(new URL(`../${relativePath}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  new Function("exports", outputText)(exports);
  return exports;
}
