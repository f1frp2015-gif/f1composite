// Site search index entries. The index is built once at build time
// (lib/search/buildIndex.ts, served as /search-index.json) and searched in the
// browser by the palette and on the server by /search (lib/search/query.ts).

export type SearchKind = "size" | "product" | "document" | "tool" | "article" | "industry" | "glossary" | "company";

/** Nominal size data for a catalog profile, in the order the model name gives it. */
export interface SearchSize {
  /** Section glyph id (lib/catalog/shapes.ts ShapeId). */
  glyph: string;
  family: string;
  /** "I 152×76×6.4" → [152, 76, 6.4]; "SHS 100×100×8" → [100, 100, 8]. */
  dims: number[];
  /** Published mass, kg/m. */
  mass: number;
  /** Family page, e.g. the square tube page. */
  familyUrl: string;
  /** DXF drawing, when one is published. */
  dxf?: string;
}

export interface SearchEntry {
  /** Unique across the index. */
  id: string;
  kind: SearchKind;
  title: string;
  url: string;
  /** One line under the title. */
  summary: string;
  /** Extra words to match that are not shown: synonyms, codes, standards. */
  keywords?: string;
  /** Short label on the right of a result: a product line, file type or report kind. */
  badge?: string;
  size?: SearchSize;
}
