import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const APP_DIR = path.resolve("app");
const ALLOWED_ROUTE_PREFIXES = [
  "app/resources/blog/[slug]/",
  "app/case-studies/[slug]/",
  "app/case-studies/beam-bridge/",
];
const SOURCE_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx"]);

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return sourceFiles(entryPath);
      return SOURCE_EXTENSIONS.has(path.extname(entry.name)) ? [entryPath] : [];
    }),
  );
  return files.flat();
}

const matches = [];
for (const file of await sourceFiles(APP_DIR)) {
  const source = await readFile(file, "utf8");
  if (!/\bArticleSignals\b/.test(source)) continue;
  matches.push(path.relative(process.cwd(), file).split(path.sep).join("/"));
}

const unexpected = matches.filter(
  (file) => !ALLOWED_ROUTE_PREFIXES.some((prefix) => file.startsWith(prefix)),
);

if (unexpected.length > 0) {
  console.error("Editorial article signals may only appear on blog and case-study detail routes:");
  for (const file of unexpected) console.error(`- ${file}`);
  process.exitCode = 1;
} else {
  console.log(`Editorial signal scope OK: ${matches.length} allowed route source file(s).`);
}
