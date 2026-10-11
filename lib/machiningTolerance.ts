/** Drawing-limit arithmetic only; it does not assess manufacturability. */
export function machiningLimits(nominal: number, lowerDeviation: number, upperDeviation: number) {
  if (![nominal, lowerDeviation, upperDeviation].every(Number.isFinite) || nominal <= 0 || nominal > 100_000 || lowerDeviation > upperDeviation || nominal + lowerDeviation <= 0) return null;
  const round = (value: number) => Number(value.toPrecision(12));
  const result = { lower: round(nominal + lowerDeviation), upper: round(nominal + upperDeviation), band: round(upperDeviation - lowerDeviation) };
  if (!Object.values(result).every(Number.isFinite) || (upperDeviation > lowerDeviation && result.upper <= result.lower)) return null;
  return result;
}
