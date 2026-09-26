// Search over the build-time index: text normalisation, size notation
// ("100x100", "100×100×8", "I152", "rod Ø25") and ranking. The palette runs it
// in the browser and /search runs it on the server, so it stays free of
// runtime imports (scripts/site-search.test.mjs loads it as plain data).

import type { SearchEntry, SearchKind, SearchSize } from "./types";

export const KIND_ORDER: readonly SearchKind[] = ["size", "product", "document", "tool", "article", "industry", "glossary", "company"];

export const KIND_LABEL: Record<SearchKind, string> = {
  size: "Sizes",
  product: "Products",
  document: "Documents",
  tool: "Tools",
  article: "Knowledge",
  industry: "Industries & applications",
  glossary: "Glossary",
  company: "Company",
};

/**
 * Lower case without accents, decimal commas as points, and dimensions joined
 * by "×": "SHS 100 x 100 x 8" → "shs 100×100×8", "I152" → "i 152",
 * "Rod Ø25" → "rod dia 25", "6,4 mm" → "6.4 mm". Lookbehind is avoided on purpose:
 * older Safari rejects the whole script when a regular expression uses it.
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ø⌀∅]/g, " dia ")
    .replace(/(\d),(?=\d)/g, "$1.")
    .replace(/[✕✖*]/g, "×")
    .replace(/(\d)\s*(?:×|x|by)\s*(?=\d)/g, "$1×")
    .replace(/([a-z])(?=\d)/g, "$1 ")
    .replace(/(\d)(?=[a-z])/g, "$1 ")
    .replace(/[^a-z0-9.×]+/g, " ")
    .replace(/(\d?)\.(\d?)/g, (match, before: string, after: string) => (before && after ? match : `${before} ${after}`))
    .replace(/\s+/g, " ")
    .trim();
}

/** Plural and simple -ies forms fold together: "gratings" → "grating", "properties" → "property". */
function stem(word: string): string {
  if (/\d/.test(word)) return word;
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

const words = (text: string) => normalize(text).split(" ").filter(Boolean).map(stem);

const STOP_WORDS = new Set(["a", "an", "and", "are", "can", "do", "for", "how", "i", "in", "is", "it", "of", "on", "or", "the", "to", "what", "which", "with"]);

// Present on nearly every page, so they rank results but never filter them.
const SOFT_WORDS = new Set(["frp", "fiberglass", "fibreglass", "grp", "gfrp", "composite", "f1"]);

// Query words (after plural folding) that should also find their usual synonyms.
const SYNONYMS = new Map<string, readonly string[]>([
  ["fibreglass", ["fiberglass"]],
  ["rebar", ["reinforcement", "reinforcing"]],
  ["railing", ["handrail", "guardrail"]],
  ["handrail", ["railing", "guardrail"]],
  ["guardrail", ["handrail", "railing"]],
  ["pipe", ["tube"]],
  ["stair", ["tread"]],
  ["step", ["tread", "stair"]],
  ["window", ["fenestration"]],
  ["versu", ["vs"]],
  ["cad", ["dxf", "drawing"]],
  ["dxf", ["cad", "drawing"]],
  ["drawing", ["dxf", "cad"]],
  ["certificate", ["certification", "certified"]],
  ["cost", ["price", "pricing"]],
  ["price", ["cost", "pricing"]],
  ["weight", ["mass", "density"]],
  ["mass", ["weight"]],
  ["datasheet", ["data"]],
  ["spec", ["specification", "datasheet"]],
]);

// Words that name a catalog shape. A size query keeps only the shapes that
// every such word allows: "square tube 100" → SHS, "round tube 76" → CHS.
const SHAPE_WORDS = new Map<string, readonly string[]>([
  ["i", ["i_beam"]],
  ["ibeam", ["i_beam"]],
  ["beam", ["i_beam"]],
  ["u", ["channel"]],
  ["c", ["channel"]],
  ["channel", ["channel"]],
  ["l", ["angle"]],
  ["angle", ["angle"]],
  ["shs", ["shs"]],
  ["square", ["shs"]],
  ["rhs", ["rhs"]],
  ["rectangular", ["rhs"]],
  ["rectangle", ["rhs"]],
  ["tube", ["shs", "rhs", "tube"]],
  ["tubing", ["shs", "rhs", "tube"]],
  ["chs", ["tube"]],
  ["round", ["tube", "rod"]],
  ["pipe", ["tube"]],
  ["od", ["tube"]],
  ["rod", ["rod"]],
  ["dia", ["rod", "tube"]],
  ["diameter", ["rod", "tube"]],
  ["fb", ["flat"]],
  ["flat", ["flat"]],
  ["strip", ["flat"]],
]);

export interface SizeQuery {
  /** The dimensions as typed, e.g. [100, 100] or [152]. */
  dims: number[];
  /** Shapes named in the query, or null when none was. */
  shapes: readonly string[] | null;
  /** A bare number such as "152" or "23": it is searched as text as well. */
  bare: boolean;
}

const DIMENSIONS = /^\d+(?:\.\d+)?(?:×\d+(?:\.\d+)?){0,2}$/;

/**
 * Reads a size from a query: "100x100", "100 × 100 × 8 mm", "I152", "SHS 100",
 * "rod Ø25". A lone number is a size beside a shape word or "mm", or on its own
 * inside the catalog's range: "152" is, "EN 13706" and "grating 38" are not.
 */
export function parseSizeQuery(query: string): SizeQuery | null {
  const tokens = normalize(query).split(" ").filter(Boolean);
  const dimensionToken = tokens.find((token) => DIMENSIONS.test(token));
  if (!dimensionToken) return null;
  const dims = dimensionToken.split("×").map(Number);

  const hints = tokens.map(stem).flatMap((token) => {
    const shapesForWord = SHAPE_WORDS.get(token);
    return shapesForWord ? [shapesForWord] : [];
  });
  let shapes: readonly string[] | null = null;
  if (hints.length) {
    const common = hints.reduce((kept, hint) => kept.filter((shape) => hint.includes(shape)));
    shapes = common.length ? common : [...new Set(hints.flat())];
  }

  const unit = tokens.includes("mm");
  if (dims.length === 1 && !shapes && !unit) {
    const otherWords = tokens.filter((token) => token !== dimensionToken && token.length > 1 && !STOP_WORDS.has(token));
    if (otherWords.length || dims[0] < 3 || dims[0] > 400) return null;
    return { dims, shapes, bare: true };
  }
  return { dims, shapes, bare: false };
}

const same = (a: number, b: number) => Math.abs(a - b) < 0.001;

/** Score for a size whose dimensions start with the query's; rectangular tubes and angles also match with the first two swapped. */
function sizeScore(size: SearchSize, query: SizeQuery): number {
  if (query.shapes && !query.shapes.includes(size.glyph)) return 0;
  const orders = [size.dims];
  if ((size.glyph === "rhs" || size.glyph === "angle") && !same(size.dims[0], size.dims[1])) {
    orders.push([size.dims[1], size.dims[0], ...size.dims.slice(2)]);
  }
  for (const [swapped, dims] of orders.entries()) {
    if (query.dims.length > dims.length) continue;
    if (query.dims.every((value, index) => same(value, dims[index]))) {
      return 60 + query.dims.length * 10 + (query.dims.length === dims.length ? 20 : 0) + (query.shapes ? 10 : 0) - swapped * 8;
    }
  }
  return 0;
}

/**
 * Weighted mean relative difference over the typed dimensions, for "closest
 * size" suggestions. The last dimension of a multi-dimension size is its wall
 * or thickness, which buyers adjust more readily than the outside size.
 */
function sizeDistance(size: SearchSize, query: SizeQuery): number {
  if (query.shapes && !query.shapes.includes(size.glyph)) return Infinity;
  if (query.dims.length > size.dims.length) return Infinity;
  const weight = (index: number) => (size.dims.length > 1 && index === size.dims.length - 1 ? 0.3 : 1);
  let total = 0;
  let weights = 0;
  query.dims.forEach((value, index) => {
    total += (weight(index) * Math.abs(value - size.dims[index])) / Math.max(value, size.dims[index]);
    weights += weight(index);
  });
  return total / weights;
}

interface PreparedEntry {
  entry: SearchEntry;
  /** Title, keywords, summary and URL words; weights in FIELD_WEIGHTS. */
  fields: string[][];
  title: string;
}

/** Codes typed as one word, such as "E23", "D7957" or "ISO9001", split into their letter and number parts. */
function codes(query: string): [string, string][] {
  return (query.toLowerCase().match(/\b[a-z]{1,3}\d+(?:\.\d+)?\b/g) ?? []).map((code) => {
    const [, letters, number] = code.match(/^([a-z]+)(.+)$/)!;
    return [letters, number];
  });
}

/** Field score for two words that must appear next to each other, as a code's parts do. */
function pairScore(first: string, second: string, fields: string[][]): number {
  let best = 0;
  fields.forEach((fieldWords, field) => {
    for (let index = 0; index < fieldWords.length - 1; index += 1) {
      if (fieldWords[index] === first && fieldWords[index + 1] === second) best = Math.max(best, FIELD_WEIGHTS[field]);
    }
  });
  return best;
}

export interface PreparedIndex {
  entries: PreparedEntry[];
}

const FIELD_WEIGHTS = [10, 6, 3, 2];

const KIND_BOOST: Record<SearchKind, number> = { product: 6, tool: 5, document: 3, industry: 2, article: 2, glossary: 1, company: 0, size: 0 };

export function prepareIndex(entries: readonly SearchEntry[]): PreparedIndex {
  return {
    entries: entries.map((entry) => ({
      entry,
      fields: [entry.title, entry.keywords ?? "", entry.summary, entry.url.replace(/[/#?=&_-]+/g, " ")].map(words),
      title: normalize(entry.title),
    })),
  };
}

/** Best field score for one query word or any of its synonyms. Numbers must match whole words. */
function tokenScore(alternatives: readonly string[], fields: string[][]): number {
  let best = 0;
  fields.forEach((fieldWords, field) => {
    for (const word of fieldWords) {
      for (const alternative of alternatives) {
        const exact = word === alternative;
        const prefix = !exact && alternative.length >= 2 && !/\d/.test(alternative) && word.startsWith(alternative);
        if (exact || prefix) best = Math.max(best, FIELD_WEIGHTS[field] * (exact ? 1 : 0.7));
      }
    }
  });
  return best;
}

export interface SearchHit {
  entry: SearchEntry;
  score: number;
}

export interface SearchGroup {
  kind: SearchKind;
  label: string;
  hits: SearchHit[];
  /** Matches before the per-group limit. */
  total: number;
}

export interface SearchResults {
  query: string;
  size: SizeQuery | null;
  /** No catalog size has exactly these dimensions; the size hits are the nearest ones. */
  closest: boolean;
  groups: SearchGroup[];
  total: number;
}

export function search(index: PreparedIndex, query: string, limitPerGroup = Infinity): SearchResults {
  const size = parseSizeQuery(query);
  // A recognised size is matched on dimensions; only a bare number is also text.
  const sizeWords = (token: string) => Boolean(size && !size.bare && (DIMENSIONS.test(token) || token === "mm"));
  // "E23" must match "E23", not any "23": its parts become one adjacent pair.
  const pairs = codes(query).filter(([, number]) => !sizeWords(number));
  const paired = new Set(pairs.flat());
  const tokens = normalize(query)
    .split(" ")
    .filter((token) => token && !sizeWords(token) && !paired.has(token) && !STOP_WORDS.has(token) && (token.length > 1 || /\d/.test(token)))
    .map(stem);
  const hard = tokens.filter((token) => !SOFT_WORDS.has(token));
  const required = hard.length || pairs.length ? hard : tokens;
  const optional = hard.length || pairs.length ? tokens.filter((token) => SOFT_WORDS.has(token)) : [];
  const queryWords = new Set([...tokens, ...paired]);
  const phrase = normalize(query);

  const hits: SearchHit[] = [];
  const sizeHits: SearchHit[] = [];
  for (const prepared of index.entries) {
    const { entry } = prepared;
    if (entry.kind === "size" && size && entry.size) {
      const score = sizeScore(entry.size, size);
      if (score) sizeHits.push({ entry, score });
      continue;
    }
    if (!required.length && !pairs.length) continue;
    let score = 0;
    let matchedAll = true;
    for (const token of required) {
      const tokenValue = tokenScore([token, ...(SYNONYMS.get(token) ?? [])], prepared.fields);
      if (!tokenValue) {
        matchedAll = false;
        break;
      }
      score += tokenValue;
    }
    for (const [first, second] of matchedAll ? pairs : []) {
      const pairValue = pairScore(first, second, prepared.fields);
      if (!pairValue) {
        matchedAll = false;
        break;
      }
      score += pairValue;
    }
    if (!matchedAll) continue;
    for (const token of optional) score += tokenScore([token], prepared.fields) / 2;
    if (phrase.length > 2 && prepared.title.includes(phrase)) score += 8;
    // Prefer the page the query describes best: "FRP Rebar" over a hub that also lists rebar.
    const titleWords = prepared.fields[0];
    if (titleWords.length) score += (6 * titleWords.filter((word) => [...queryWords].some((token) => word === token || (token.length > 1 && word.startsWith(token)))).length) / titleWords.length;
    score += KIND_BOOST[entry.kind];
    // A family word ("square tube") matches every size in the family; keep them below the family page.
    if (entry.kind === "size") score *= 0.4;
    hits.push({ entry, score });
  }

  let closest = false;
  if (size && !sizeHits.length && !size.bare) {
    const nearest = index.entries
      .filter((prepared) => prepared.entry.kind === "size" && prepared.entry.size)
      .map((prepared) => ({ entry: prepared.entry, distance: sizeDistance(prepared.entry.size!, size) }))
      .filter((candidate) => candidate.distance <= 0.1)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4);
    closest = nearest.length > 0;
    for (const candidate of nearest) sizeHits.push({ entry: candidate.entry, score: 50 - candidate.distance * 100 });
  }
  hits.push(...sizeHits);

  const groups = KIND_ORDER.map((kind): SearchGroup => {
    const kindHits = hits.filter((hit) => hit.entry.kind === kind).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, "en", { numeric: true }));
    return { kind, label: KIND_LABEL[kind], hits: kindHits.slice(0, limitPerGroup), total: kindHits.length };
  })
    .filter((group) => group.total > 0)
    .sort((a, b) => b.hits[0].score - a.hits[0].score || KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind));

  return { query, size, closest, groups, total: hits.length };
}

/** The part of a size title the query named, for highlighting: [152] in "I 152×76×6.4" → "152". */
export function sizeMatchText(title: string, size: SizeQuery | null): string | null {
  if (!size) return null;
  const text = size.dims.join("×");
  return title.includes(text) ? text : null;
}
