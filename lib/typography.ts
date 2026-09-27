/**
 * Keeps a spaced dash on the line of the word before it, so a wrapped heading
 * never starts a line with "—" or "–". Display only: metadata, search and
 * JSON-LD keep the plain string.
 */
export function holdDash(text: string): string {
  return text.replace(/ ([—–]) /g, " $1 ");
}
