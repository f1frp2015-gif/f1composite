/**
 * Cut-list nesting for pultruded profiles: required pieces are packed into
 * stock bars of one length (one-dimensional cutting stock problem).
 *
 * Bar model: each end is trimmed by `trimMm` (the trim includes its own saw
 * cut), which leaves a usable length U = stock − 2 · trim. Pieces are cut one
 * after another with one saw kerf between neighbours, so n pieces need
 * Σl + (n − 1) · kerf ≤ U. Written as a packing problem, every piece takes
 * l + kerf out of a capacity of U + kerf.
 *
 * Three heuristics run and the one with the fewest bars wins: repeated
 * best-fill (a bounded knapsack picks the fullest bar from the pieces still to
 * cut, and that pattern is repeated while the quantities last), the same with
 * the longest remaining piece placed first on every bar, and best-fit
 * decreasing. The result carries the lower bound ⌈Σ(l + kerf) / (U + kerf)⌉,
 * so the page can say when the plan is proven to use the fewest bars.
 */

export interface CutPiece {
  /** Optional mark from the drawing, e.g. "Post" or "A3". */
  label?: string;
  lengthMm: number;
  qty: number;
}

export interface CutListInput {
  stockLengthMm: number;
  kerfMm: number;
  /** Trimmed from each end of every bar, including the trim cut. */
  trimMm: number;
  pieces: CutPiece[];
}

export interface BarPattern {
  /** Piece lengths on the bar, longest first. */
  cuts: number[];
  /** Number of bars cut to this pattern. */
  count: number;
  /** Σ piece lengths on one bar. */
  piecesMm: number;
  /** Length left after the last piece and its separating cut (0 when the last piece ends the usable length). */
  offcutMm: number;
}

export interface CutListResult {
  bars: number;
  lowerBound: number;
  /** True when the bar count equals the lower bound, so no plan can use fewer bars. */
  provenMinimum: boolean;
  patterns: BarPattern[];
  pieceCount: number;
  requiredMm: number;
  orderedMm: number;
  /** Ordered length that does not end up in a piece: trims, kerfs and offcuts. */
  wasteMm: number;
  wastePercent: number;
  usableMm: number;
  method: "best-fill" | "longest-first-fill" | "best-fit-decreasing";
}

export const CUT_LIST_LIMITS = {
  maxStockMm: 24000,
  maxPieces: 2000,
  maxDistinctLengths: 60,
  maxKerfMm: 10,
  maxTrimMm: 500,
} as const;

/**
 * Stock lengths to compare. 20 ft and 40 ft ISO containers have internal
 * lengths of about 5.90 m and 12.03 m, which is why export bars are often cut
 * to 5.8 m or 11.8 m.
 */
export const STOCK_OPTIONS = [
  { id: "5800", lengthMm: 5800, label: "5.8 m", note: "Fits a 20 ft container (inside length about 5.90 m)." },
  { id: "6000", lengthMm: 6000, label: "6 m", note: "F1 standard length. Longer than a 20 ft container, so it ships in a 40 ft container." },
  { id: "11800", lengthMm: 11800, label: "11.8 m", note: "Usual export length for a 40 ft container." },
  { id: "12000", lengthMm: 12000, label: "12 m", note: "Leaves about 30 mm in a 40 ft container (inside length about 12.03 m)." },
] as const;

export function cutListError(input: CutListInput): string | null {
  const { stockLengthMm, kerfMm, trimMm, pieces } = input;
  if (!Number.isFinite(stockLengthMm) || stockLengthMm <= 0 || stockLengthMm > CUT_LIST_LIMITS.maxStockMm) {
    return `Enter a stock length between 1 and ${CUT_LIST_LIMITS.maxStockMm} mm.`;
  }
  if (!Number.isFinite(kerfMm) || kerfMm < 0 || kerfMm > CUT_LIST_LIMITS.maxKerfMm) {
    return `Enter a saw kerf from 0 to ${CUT_LIST_LIMITS.maxKerfMm} mm.`;
  }
  if (!Number.isFinite(trimMm) || trimMm < 0 || trimMm > CUT_LIST_LIMITS.maxTrimMm) {
    return `Enter an end trim from 0 to ${CUT_LIST_LIMITS.maxTrimMm} mm.`;
  }
  const usable = stockLengthMm - 2 * trimMm;
  if (usable <= 0) return "The end trims use up the whole bar.";
  const active = pieces.filter((piece) => piece.qty > 0 || piece.lengthMm > 0);
  if (active.length === 0) return "Add at least one piece length and quantity.";
  for (const piece of active) {
    const name = piece.label?.trim() ? `"${piece.label.trim()}"` : `${piece.lengthMm} mm`;
    if (!Number.isFinite(piece.lengthMm) || piece.lengthMm <= 0) {
      return piece.label?.trim() ? `Enter a length for piece ${name}.` : "Enter a length for every line that has a quantity.";
    }
    if (!Number.isInteger(piece.qty) || piece.qty <= 0) return `Enter a whole-number quantity for piece ${name}.`;
    if (piece.lengthMm > usable) {
      return `Piece ${name} is longer than the usable ${round1(usable)} mm of a ${stockLengthMm} mm bar. Choose a longer stock length or order it cut to length.`;
    }
  }
  const total = active.reduce((sum, piece) => sum + piece.qty, 0);
  if (total > CUT_LIST_LIMITS.maxPieces) return `Up to ${CUT_LIST_LIMITS.maxPieces} pieces per list; split the list by profile or by area.`;
  if (new Set(active.map((piece) => piece.lengthMm)).size > CUT_LIST_LIMITS.maxDistinctLengths) {
    return `Up to ${CUT_LIST_LIMITS.maxDistinctLengths} different lengths per list.`;
  }
  return null;
}

const round1 = (value: number) => Math.round(value * 10) / 10;

type Demand = Map<number, number>;

function demandOf(pieces: CutPiece[]): Demand {
  const demand: Demand = new Map();
  for (const piece of pieces) {
    if (piece.qty > 0 && piece.lengthMm > 0) demand.set(piece.lengthMm, (demand.get(piece.lengthMm) ?? 0) + piece.qty);
  }
  return demand;
}

/** Integer size in 0.1 mm, rounded up so a plan never needs more than the bar. */
const units = (mm: number) => Math.ceil(mm * 10 - 1e-6);

// Resolution of the knapsack grid. 1 mm keeps a 24 m bar at 24 000 cells;
// sizes are rounded up to the grid, then every pattern is re-checked exactly.
const GRID = 10;

function fits(cuts: number[], capacityUnits: number, kerfUnits: number) {
  return cuts.reduce((sum, length) => sum + units(length) + kerfUnits, 0) <= capacityUnits;
}

/**
 * The fullest single bar that can be cut from the remaining demand. With
 * `anchor`, that piece is placed first and the rest of the bar is filled.
 */
function bestFill(demand: Demand, capacityUnits: number, kerfUnits: number, anchor?: number): number[] {
  if (anchor !== undefined) {
    const rest = new Map(demand);
    rest.set(anchor, (rest.get(anchor) ?? 0) - 1);
    if ((rest.get(anchor) ?? 0) <= 0) rest.delete(anchor);
    return [anchor, ...bestFill(rest, capacityUnits - units(anchor) - kerfUnits, kerfUnits)].sort((a, b) => b - a);
  }
  const cap = Math.floor(capacityUnits / GRID);
  if (cap <= 0) return [];
  const lengths = [...demand.keys()].sort((a, b) => b - a);
  // Binary-split bounded quantities into 0/1 items.
  const items: { length: number; count: number; size: number }[] = [];
  for (const length of lengths) {
    const each = Math.ceil((units(length) + kerfUnits) / GRID);
    const maxOnBar = Math.min(demand.get(length) ?? 0, Math.floor(cap / each));
    let left = maxOnBar;
    for (let chunk = 1; left > 0; chunk *= 2) {
      const take = Math.min(chunk, left);
      items.push({ length, count: take, size: take * each });
      left -= take;
    }
  }
  const from = new Int32Array(cap + 1).fill(-1);
  const reached = new Uint8Array(cap + 1);
  reached[0] = 1;
  for (let index = 0; index < items.length; index += 1) {
    const size = items[index].size;
    for (let c = cap; c >= size; c -= 1) {
      if (!reached[c] && reached[c - size]) {
        reached[c] = 1;
        from[c] = index;
      }
    }
  }
  let best = cap;
  while (best > 0 && !reached[best]) best -= 1;
  const cuts: number[] = [];
  for (let c = best; c > 0; ) {
    const item = items[from[c]];
    for (let k = 0; k < item.count; k += 1) cuts.push(item.length);
    c -= item.size;
  }
  cuts.sort((a, b) => b - a);
  // Grid rounding is conservative, so a pattern that passes on the grid also
  // passes exactly; the check guards the invariant.
  return fits(cuts, capacityUnits, kerfUnits) ? cuts : cuts.slice(0, 1);
}

function planBestFill(demand: Demand, capacityUnits: number, kerfUnits: number, longestFirst: boolean): number[][] {
  const left = new Map(demand);
  const bars: number[][] = [];
  while ([...left.values()].some((qty) => qty > 0)) {
    for (const [length, qty] of left) if (qty <= 0) left.delete(length);
    let pattern = bestFill(left, capacityUnits, kerfUnits, longestFirst ? Math.max(...left.keys()) : undefined);
    // A piece within 1 mm of the usable length can miss the 1 mm grid; it still
    // fits exactly (cutListError checked every piece), so it gets a bar of its own.
    if (pattern.length === 0) pattern = [Math.max(...left.keys())];
    const need = new Map<number, number>();
    for (const length of pattern) need.set(length, (need.get(length) ?? 0) + 1);
    let repeat = Infinity;
    for (const [length, count] of need) repeat = Math.min(repeat, Math.floor((left.get(length) ?? 0) / count));
    for (let r = 0; r < repeat; r += 1) bars.push(pattern);
    for (const [length, count] of need) left.set(length, (left.get(length) ?? 0) - count * repeat);
  }
  return bars;
}

function planBestFitDecreasing(demand: Demand, capacityUnits: number, kerfUnits: number): number[][] {
  const pieces = [...demand.entries()].sort((a, b) => b[0] - a[0]).flatMap(([length, qty]) => Array<number>(qty).fill(length));
  const bars: { cuts: number[]; free: number }[] = [];
  for (const length of pieces) {
    const size = units(length) + kerfUnits;
    let target: { cuts: number[]; free: number } | undefined;
    for (const bar of bars) if (bar.free >= size && (!target || bar.free < target.free)) target = bar;
    if (!target) {
      target = { cuts: [], free: capacityUnits };
      bars.push(target);
    }
    target.cuts.push(length);
    target.free -= size;
  }
  return bars.map((bar) => bar.cuts);
}

export function calculateCutList(input: CutListInput): CutListResult | null {
  if (cutListError(input)) return null;
  const { stockLengthMm, kerfMm, trimMm } = input;
  const usableMm = stockLengthMm - 2 * trimMm;
  const kerfUnits = units(kerfMm);
  const capacityUnits = Math.floor((usableMm + kerfMm) * 10 + 1e-6);
  const demand = demandOf(input.pieces);

  // Fewest bars wins; on a tie, the plan with fewer different patterns is
  // quicker to cut.
  const candidates: { method: CutListResult["method"]; bars: number[][] }[] = [
    { method: "best-fill", bars: planBestFill(demand, capacityUnits, kerfUnits, false) },
    { method: "longest-first-fill", bars: planBestFill(demand, capacityUnits, kerfUnits, true) },
    { method: "best-fit-decreasing", bars: planBestFitDecreasing(demand, capacityUnits, kerfUnits) },
  ];
  const patternCount = (bars: number[][]) => new Set(bars.map((bar) => [...bar].sort((a, b) => b - a).join("|"))).size;
  const chosen = candidates.reduce((best, next) =>
    next.bars.length < best.bars.length || (next.bars.length === best.bars.length && patternCount(next.bars) < patternCount(best.bars)) ? next : best,
  );
  const plan = chosen.bars;

  const groups = new Map<string, BarPattern>();
  for (const bar of plan) {
    const cuts = [...bar].sort((a, b) => b - a);
    const key = cuts.join("|");
    const existing = groups.get(key);
    if (existing) {
      existing.count += 1;
      continue;
    }
    const piecesMm = cuts.reduce((sum, length) => sum + length, 0);
    const afterLast = usableMm - piecesMm - (cuts.length - 1) * kerfMm;
    groups.set(key, { cuts, count: 1, piecesMm: round1(piecesMm), offcutMm: round1(Math.max(0, afterLast > 1e-6 ? afterLast - kerfMm : 0)) });
  }
  const patterns = [...groups.values()].sort((a, b) => b.count - a.count || b.piecesMm - a.piecesMm);

  let pieceCount = 0;
  let requiredMm = 0;
  let sizeUnits = 0;
  for (const [length, qty] of demand) {
    pieceCount += qty;
    requiredMm += length * qty;
    sizeUnits += (units(length) + kerfUnits) * qty;
  }
  const lowerBound = Math.ceil(sizeUnits / capacityUnits - 1e-9);
  const orderedMm = plan.length * stockLengthMm;
  const wasteMm = orderedMm - requiredMm;
  return {
    bars: plan.length,
    lowerBound,
    provenMinimum: plan.length === lowerBound,
    patterns,
    pieceCount,
    requiredMm: round1(requiredMm),
    orderedMm,
    wasteMm: round1(wasteMm),
    wastePercent: orderedMm > 0 ? (wasteMm / orderedMm) * 100 : 0,
    usableMm: round1(usableMm),
    method: chosen.method,
  };
}

/**
 * Parse a pasted list, one piece per line: "2400 12", "2400 x 12", "2400,12"
 * or tab-separated from a spreadsheet, optionally followed by a mark.
 * Lines that do not start with two numbers are skipped and reported.
 */
export function parsePieceList(text: string): { pieces: CutPiece[]; skipped: string[] } {
  const pieces: CutPiece[] = [];
  const skipped: string[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const match = line.match(/^(\d+(?:[.,]\d+)?)\s*(?:mm)?\s*(?:[x×*,;\t]|\s)\s*(\d+)\s*(?:pcs|pc|no\.?)?\s*(?:[,;\t]\s*)?(.*)$/i);
    if (!match) {
      skipped.push(line);
      continue;
    }
    const lengthMm = Number(match[1].replace(",", "."));
    const qty = Number(match[2]);
    if (!(lengthMm > 0) || !Number.isInteger(qty) || qty <= 0) {
      skipped.push(line);
      continue;
    }
    const label = match[3]?.trim();
    pieces.push(label ? { lengthMm, qty, label } : { lengthMm, qty });
  }
  return { pieces, skipped };
}
