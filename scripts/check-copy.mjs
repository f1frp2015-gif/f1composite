// Copy lint for rendered site text.
//
// Fails on claims the site has retracted (so they cannot creep back in through
// new pages or copied text), and warns on writing patterns that read as
// machine-generated: dense em-dashes and "not X — it is Y" reveals.
//
// Scope: page, component, content and lib sources. API routes are excluded
// because the assistant prompts quote forbidden claims in order to forbid them.
// Add "copy-lint-ignore" in a comment on the same line to allow a reviewed exception.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIRS = ["app", "components", "content", "lib"];
const EXCLUDE = [/^app\/api\//, /\.test\./, /^content\/data\/faq-100\.md$/];

const FORBIDDEN = [
  // Upper-case PHIUS is how the retracted claims were written; "Phius Certified Windows" is the program's own name.
  [/PHIUS[- ]certified/, "The PHI certificate 2491wi03 is not a PHIUS certification."],
  [/Aramco[- ](approved|approval|qualified)|(approved|qualified) (by|for) (Saudi )?Aramco/i, "Operator approvals are not held; say documents are provided on request."],
  [/(F1|our|we are|we're)[^.]{0,40}ISO 9001(:\d{4})?[- ]certified/i, "Certificates are provided on request with holder, number and scope."],
  [/FM 4910 approv/i, "The FM 4910 approval claim was retracted."],
  [/maintenance[- ]free (design |service )?life|zero maintenance|\b0 maintenance\b/i, "Use no-rust/no-recoating wording instead of maintenance-free claims."],
  // Generic "50+ year" marketing claims. Datasheet values for a named product (e.g. "≥ 25-year") are allowed.
  [/\b(50|75|100)\+[- ]?years?\b/i, "Product service-life claims are project-specific."],
  [/\b(50|75|100)\+ years? (with|of) zero/i, "Product service-life claims are project-specific."],
  [/(quotes?|response|respond|reply)[^.]{0,30}within 48 (business )?hours|48-hour quote|quote within 24 hours/i, "The reply commitment is one business day (company.ts supplyTerms)."],
  [/ships from inventory/i, "Standard sections are not stock; catalog sections ship in 2–4 weeks."],
  [/Review Board|Advisory Board|Review Group|Comparison Desk/, "Credit a real team or person, not an invented review body."],
];

// Files the owner asked to keep unchanged for now; checked once they are revised.
const FORBIDDEN_EXEMPT = [];
// Reviewed sentences that mention a retracted claim without making it.
const ALLOWED_PHRASES = [
  // Negation in the Pengshui bridge commentary.
  "or a maintenance-free service life",
  // Client requirement in the european-bridge-deck case study, kept unchanged at the owner's request (2026-09).
  "would provide a design life of 75+ years",
];

const CONTRAST = /\bnot\b[^.!?—\n]{1,70}—\s*(?:it|they|this|that)\s*(?:is|are|'s|’s)\b/gi;
const EM_DASH_WARN_PER_1K = 6;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.(tsx?|mdx?)$/.test(name)) out.push(path);
  }
  return out;
}

const files = DIRS.flatMap((dir) => walk(join(ROOT, dir)))
  .map((path) => relative(ROOT, path))
  .filter((path) => !EXCLUDE.some((re) => re.test(path)));

const errors = [];
const warnings = [];
for (const file of files) {
  const text = readFileSync(join(ROOT, file), "utf8");
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    if (line.includes("copy-lint-ignore") || ALLOWED_PHRASES.some((phrase) => line.includes(phrase))) return;
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
    if (!FORBIDDEN_EXEMPT.includes(file)) {
      for (const [pattern, why] of FORBIDDEN) {
        const match = line.match(pattern);
        if (match) errors.push(`${file}:${index + 1}: "${match[0]}". ${why}`);
      }
    }
    for (const match of line.matchAll(CONTRAST)) {
      warnings.push(`${file}:${index + 1}: contrast reveal "${match[0].slice(0, 80)}"`);
    }
  });
  const words = (text.match(/[A-Za-z]{2,}/g) || []).length;
  const dashes = (text.match(/ — |—(?=[a-z])/g) || []).length;
  if (words > 400 && (dashes / words) * 1000 > EM_DASH_WARN_PER_1K) {
    warnings.push(`${file}: ${dashes} em-dashes in about ${words} words (${((dashes / words) * 1000).toFixed(1)} per 1,000; aim for under ${EM_DASH_WARN_PER_1K})`);
  }
}

for (const warning of warnings) console.warn(`warning  ${warning}`);
for (const error of errors) console.error(`error    ${error}`);
console.log(`Copy check: ${files.length} files, ${errors.length} errors, ${warnings.length} warnings.`);
if (errors.length) process.exit(1);
