export type ArticleInline =
  | { type: "text" | "strong"; text: string }
  | { type: "link"; text: string; href: string; external: boolean };

export type ArticleHeading = { id: string; text: string; level: 2 | 3 };

export type ArticleBlock =
  | ({ type: "heading"; content: string } & ArticleHeading)
  | { type: "paragraph"; content: string }
  | { type: "list"; ordered: boolean; start: number; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "link"; label: string; href: string; external: boolean }
  | { type: "video"; src: string; caption?: string };

/** Only site paths, fragment links and HTTP(S) URLs are navigable in article copy. */
export function safeArticleLink(href: string): { href: string; external: boolean } | undefined {
  if (href !== href.trim() || /[\\\u0000-\u0020\u007f]/.test(href)) return undefined;
  if ((href.startsWith("/") && !href.startsWith("//")) || href.startsWith("#")) {
    return { href, external: false };
  }
  if (!/^https?:\/\//i.test(href)) return undefined;
  try {
    const url = new URL(href);
    if (!url.hostname || url.username || url.password) return undefined;
    return { href, external: true };
  } catch {
    return undefined;
  }
}

export function parseArticleInline(text: string): ArticleInline[] {
  // The content format supports bold and links, including one balanced pair in a URL.
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:[^()\s]|\([^()]*\))+\))/g;
  const nodes: ArticleInline[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push({ type: "text", text: text.slice(cursor, match.index) });
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push({ type: "strong", text: token.slice(2, -2) });
    } else {
      const separator = token.indexOf("](");
      const safe = safeArticleLink(token.slice(separator + 2, -1));
      nodes.push(safe
        ? { type: "link", text: token.slice(1, separator), ...safe }
        : { type: "text", text: token });
    }
    cursor = pattern.lastIndex;
  }
  if (cursor < text.length) nodes.push({ type: "text", text: text.slice(cursor) });
  return nodes;
}

function tableCells(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((cell) => cell.trim().replace(/\\\|/g, "|"));
}

function isTableStart(lines: string[], index: number): boolean {
  return lines[index]?.trim().startsWith("|") === true
    && lines[index + 1]?.trim().startsWith("|") === true
    && tableCells(lines[index + 1]).every((cell) => /^:?-{3,}:?$/.test(cell));
}

const listPattern = /^\s*(?:([-+*])|(\d+)[.)])\s+(.+)$/;
const headingPattern = /^(#{2,3})\s+(.+)$/;
const legacyHeadingPattern = /^\*\*([^*]+)\*\*$/;
const videoPattern = /^\[video:([^|\]]+)(?:\|([^\]]+))?\]$/;

/** Parse the site's deliberately small Markdown format once for both body and contents. */
export function parseBlogContent(content: string): { blocks: ArticleBlock[]; headings: ArticleHeading[] } {
  const lines = content.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ArticleBlock[] = [];
  const headings: ArticleHeading[] = [];
  const usedIds = new Set<string>();
  let index = 0;

  const startsBlock = (at: number) => {
    const line = lines[at]?.trim() ?? "";
    return !line || headingPattern.test(line) || legacyHeadingPattern.test(line)
      || listPattern.test(line) || videoPattern.test(line) || isTableStart(lines, at);
  };

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index++; continue; }

    const headingMatch = line.match(headingPattern);
    const legacyHeading = line.match(legacyHeadingPattern);
    if (headingMatch || legacyHeading) {
      const raw = headingMatch ? headingMatch[2] : legacyHeading![1];
      const text = parseArticleInline(raw).map((node) => node.text).join("");
      const base = text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "section";
      let id = base;
      for (let suffix = 2; usedIds.has(id); suffix++) id = `${base}-${suffix}`;
      usedIds.add(id);
      const heading: ArticleHeading = { id, text, level: headingMatch?.[1] === "##" ? 2 : 3 };
      headings.push(heading);
      blocks.push({ type: "heading", content: raw, ...heading });
      index++;
      continue;
    }

    if (isTableStart(lines, index)) {
      const headers = tableCells(lines[index]);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(tableCells(lines[index++]));
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    const listMatch = line.match(listPattern);
    if (listMatch) {
      const ordered = Boolean(listMatch[2]);
      const items: string[] = [];
      const start = ordered ? Number(listMatch[2]) : 1;
      while (index < lines.length) {
        const item = lines[index].match(listPattern);
        if (!item || Boolean(item[2]) !== ordered) break;
        let text = item[3];
        index++;
        while (index < lines.length && /^\s+\S/.test(lines[index]) && !startsBlock(index)) {
          text += ` ${lines[index++].trim()}`;
        }
        items.push(text);
      }
      blocks.push({ type: "list", ordered, start, items });
      continue;
    }

    const video = line.match(videoPattern);
    if (video && safeArticleLink(video[1]) && !video[1].startsWith("#")) {
      blocks.push({ type: "video", src: video[1], ...(video[2] ? { caption: video[2] } : {}) });
      index++;
      continue;
    }

    const paragraph = [line];
    index++;
    while (index < lines.length && !startsBlock(index)) paragraph.push(lines[index++].trim());
    const text = paragraph.join(" ");
    const inline = parseArticleInline(text);
    if (inline.length === 1 && inline[0].type === "link") {
      blocks.push({ type: "link", label: inline[0].text, href: inline[0].href, external: inline[0].external });
    } else {
      blocks.push({ type: "paragraph", content: text });
    }
  }
  return { blocks, headings };
}
