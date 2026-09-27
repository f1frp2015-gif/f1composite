import { createElement, type ReactNode } from "react";

// A capital letter hyphenated to a word, as in U-value, I-beam or E-glass. A
// line may otherwise break after "U-", which strands the letter. DM Sans has
// no non-breaking hyphen, so the compound is held with a no-wrap span instead.
const LETTER_COMPOUND = /\b([A-Z]-[A-Za-z]+)/;

/**
 * Keeps a spaced dash on the line of the word before it, so a wrapped heading
 * never starts a line with "—" or "–", and keeps letter compounds such as
 * "U-value" whole. Display only: metadata, search and JSON-LD keep the plain
 * string.
 */
export function holdDash(text: string): ReactNode {
  const held = text.replace(/ ([—–]) /g, " $1 ");
  const parts = held.split(LETTER_COMPOUND);
  if (parts.length === 1) return held;
  return parts.map((part, index) =>
    index % 2 === 1 ? createElement("span", { key: index, className: "whitespace-nowrap" }, part) : part,
  );
}
