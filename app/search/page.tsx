import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import SearchResult from "@/components/search/SearchResult";
import { buildRfqHref } from "@/lib/rfq";
import { buildSearchIndex } from "@/lib/search/buildIndex";
import { isFileUrl, prepareIndex, search, sizeMatchText, type PreparedIndex } from "@/lib/search/query";
import { buildPageMetadata } from "@/lib/seo";

// Full results for the search palette's "All results" link, and a search form
// that works without JavaScript. Result pages repeat the pages they list, so
// every variant is noindex; the canonical is the bare form.
export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Search F1 Composite",
    description: "Search the F1 Composite catalog by size (100x100, I152), and find products, test reports, certificates, tools and technical articles.",
    path: "/search",
  }),
  robots: { index: false, follow: true },
};

let prepared: PreparedIndex | null = null;
const siteIndex = () => (prepared ??= prepareIndex(buildSearchIndex()));

const EXAMPLES = ["100x100", "I152", "grating", "vinyl ester", "AS 2047"];

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : (q ?? "")).trim().slice(0, 120);
  const results = query ? search(siteIndex(), query, 50) : null;

  return (
    <>
      <PageHeader
        tag="Search"
        title={query ? `Results for “${query}”` : "Search the site"}
        description={
          results
            ? results.total
              ? `${results.total} ${results.total === 1 ? "result" : "results"} across catalog sizes, products, documents, tools and articles.`
              : "Nothing on the site matches this search yet."
            : "Search catalog sizes such as 100x100 or I152, products, test reports, tools and technical articles."
        }
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />

      <section className="bg-white py-[40px]">
        <div className="site-container">
          <form action="/search" role="search" className="flex max-w-[720px] gap-[8px]">
            <label htmlFor="site-search-query" className="sr-only">
              Search the site
            </label>
            <input
              id="site-search-query"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search sizes, products, documents"
              autoComplete="off"
              className="min-h-[48px] min-w-0 flex-1 rounded-control border border-border-default px-[14px] text-f16 text-t1 placeholder:text-t3"
            />
            <button type="submit" className="rounded-control bg-deep px-[18px] text-f14 font-bold text-white hover:bg-teal-text">
              Search
            </button>
          </form>

          {!results ? (
            <p className="mt-[20px] text-f14 text-t2">
              Try{" "}
              {EXAMPLES.map((example, index) => (
                <span key={example}>
                  {index ? ", " : ""}
                  <Link href={`/search?q=${encodeURIComponent(example)}`} className="font-semibold text-teal-text underline underline-offset-4">
                    {example}
                  </Link>
                </span>
              ))}
              .
            </p>
          ) : results.total === 0 ? (
            <div className="mt-[28px] max-w-[720px] rounded-card border border-border-default bg-bg2 p-[20px]">
              <p className="text-f16 text-t1">Tell us the size or send a drawing, and an engineer will reply. The engineering assistant can also answer questions about materials, standards and documents.</p>
              <div className="mt-[14px] flex flex-wrap gap-[8px]">
                <Link
                  href={buildRfqHref({ source: "site-search", message: `I searched the website for "${query}" and could not find it. Here is what I need:` })}
                  className="rounded-control bg-deep px-[16px] py-[10px] text-f14 font-bold text-white hover:bg-teal-text"
                >
                  Send your size or drawing
                </Link>
                <Link href={`/ask?prefill=${encodeURIComponent(query)}`} className="rounded-control border border-border-default bg-white px-[16px] py-[10px] text-f14 font-bold text-t1 hover:border-teal-border hover:text-teal-text">
                  Ask the engineering assistant
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-[28px] grid gap-[28px]">
              {results.closest && results.size ? (
                <p className="text-f16 text-t2">No catalog size is exactly {results.size.dims.join(" × ")} mm. These are the closest sizes.</p>
              ) : null}
              {results.groups.map((group) => (
                <section key={group.kind} aria-labelledby={`results-${group.kind}`}>
                  <h2 id={`results-${group.kind}`} className="font-mono text-f12 uppercase tracking-[0.06em] text-t3">
                    {group.label} · {group.total}
                  </h2>
                  <ul className="mt-[8px] divide-y divide-border-default rounded-card border border-border-default">
                    {group.hits.map((hit) => {
                      const content = <SearchResult entry={hit.entry} highlight={hit.entry.size ? sizeMatchText(hit.entry.title, results.size) : null} />;
                      const className = "block px-[14px] py-[10px] hover:bg-teal-bg";
                      return (
                        <li key={hit.entry.id}>
                          {isFileUrl(hit.entry.url) ? (
                            <a href={hit.entry.url} target="_blank" rel="noopener" className={className}>
                              {content}
                            </a>
                          ) : (
                            <Link href={hit.entry.url} prefetch={false} className={className}>
                              {content}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
