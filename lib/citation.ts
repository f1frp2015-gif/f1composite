// Reference-list entries for F1 Composite articles, in the styles engineering
// students and design reports use (IEEE, APA, BibTeX). The citation names the
// article's own URL, so a reference points at the page that holds the fact
// rather than at the home page.

const SITE_NAME = "F1 Composite";
const SITE_URL = "https://www.f1composite.com";

export type CitationInput = {
  title: string;
  /** Site path, e.g. "/resources/blog/frp-vs-steel". */
  path: string;
  /** Byline as printed on the page, e.g. "Haifeng Gong, Ph.D." */
  authorName: string;
  /** ISO date (YYYY-MM-DD) the article was first published. */
  publishedAt: string;
};

export type ArticleCitations = {
  IEEE: string;
  APA: string;
  BibTeX: string;
};

type Author = { kind: "person"; given: string[]; family: string } | { kind: "organization"; name: string };

const MONTHS_IEEE = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
const MONTHS_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "Haifeng Gong, Ph.D." → person; "F1 Composite Editorial Team" → organization. */
export function parseAuthor(byline: string): Author {
  const name = byline.split(",")[0].trim();
  if (/\b(team|composite|editorial|staff)\b/i.test(name) || name.split(/\s+/).length < 2) {
    return { kind: "organization", name };
  }
  const parts = name.split(/\s+/);
  return { kind: "person", given: parts.slice(0, -1), family: parts[parts.length - 1] };
}

function initials(given: string[]) {
  return given.map((part) => `${part[0].toUpperCase()}.`).join(" ");
}

function dateParts(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

function slugKey(path: string) {
  const last = path.split("/").filter(Boolean).pop() ?? "article";
  return last.replace(/[^a-z0-9]+/gi, "-").slice(0, 40).replace(/-+$/, "");
}

export function articleUrl(path: string) {
  return `${SITE_URL}${path}`;
}

/** Highwire-style tags reference managers (Zotero, Mendeley) read from the page head. */
export function citationMetaTags({ title, authorName, publishedAt }: Omit<CitationInput, "path">) {
  const author = parseAuthor(authorName);
  const { year, month, day } = dateParts(publishedAt);
  const pad = (value: number) => String(value).padStart(2, "0");
  return {
    citation_title: title,
    citation_author: author.kind === "person" ? `${author.family}, ${author.given.join(" ")}` : author.name,
    citation_publication_date: `${year}/${pad(month)}/${pad(day)}`,
    citation_publisher: SITE_NAME,
  };
}

export function buildArticleCitations({ title, path, authorName, publishedAt }: CitationInput): ArticleCitations {
  const author = parseAuthor(authorName);
  const url = articleUrl(path);
  const { year, month, day } = dateParts(publishedAt);

  const ieeeAuthor = author.kind === "person" ? `${initials(author.given)} ${author.family}` : author.name;
  const apaAuthor = author.kind === "person" ? `${author.family}, ${initials(author.given)}` : `${author.name}.`;
  const bibAuthor = author.kind === "person" ? `${author.family}, ${author.given.join(" ")}` : `{${author.name}}`;

  return {
    IEEE: `${ieeeAuthor}, “${title},” ${SITE_NAME}, ${MONTHS_IEEE[month - 1]} ${day}, ${year}. [Online]. Available: ${url}`,
    APA: `${apaAuthor} (${year}, ${MONTHS_FULL[month - 1]} ${day}). ${title}. ${SITE_NAME}. ${url}`,
    BibTeX: [
      `@misc{f1composite-${slugKey(path)}-${year},`,
      `  author       = {${bibAuthor}},`,
      `  title        = {${title}},`,
      `  year         = {${year}},`,
      `  month        = {${MONTHS_FULL[month - 1].slice(0, 3).toLowerCase()}},`,
      `  howpublished = {\\url{${url}}},`,
      `  organization = {${SITE_NAME}}`,
      `}`,
    ].join("\n"),
  };
}
