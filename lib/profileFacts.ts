// Page-header facts for a standard profile family, derived from the page's own
// size table so the header can never disagree with the table below it.

type Fact = { label: string; value: string };

const trim = (value: number) => String(Number(value.toFixed(2)));

export function profileFamilyFacts({
  count,
  rangeLabel,
  values,
  unit = "mm",
  prefix = "",
  weights,
}: {
  count: number;
  /** What the range measures: "Depth", "Leg", "Outside diameter" … */
  rangeLabel: string;
  values: number[];
  unit?: string;
  prefix?: string;
  weights: (string | number)[];
}): Fact[] {
  const dims = values.filter((value) => Number.isFinite(value) && value > 0);
  const masses = weights.map(Number).filter((value) => Number.isFinite(value) && value > 0);
  const facts: Fact[] = [{ label: "Catalog sizes", value: String(count) }];
  if (dims.length) facts.push({ label: rangeLabel, value: `${prefix}${trim(Math.min(...dims))}–${trim(Math.max(...dims))} ${unit}` });
  if (masses.length) facts.push({ label: "Mass", value: `${trim(Math.min(...masses))}–${trim(Math.max(...masses))} kg/m` });
  return facts;
}
