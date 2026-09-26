// The phone's sticky product bar keeps one action beside WhatsApp: the quote
// link, wherever the page header placed it (some pages lead with a calculator
// or a drawing and put the quote second). Every inquiry builder in lib/ returns
// a /contact URL.

export interface BarAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

const isQuote = (action?: BarAction) => Boolean(action?.href.startsWith("/contact"));

export function pickBarAction(primary: BarAction, secondary?: BarAction): BarAction {
  if (isQuote(primary)) return primary;
  if (secondary && isQuote(secondary)) return secondary;
  return primary;
}
