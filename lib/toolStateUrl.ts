type ToolStateValue = string | number;

/**
 * Keep interactive calculator state out of the query string so crawlers see a
 * single canonical document instead of one URL per preset. URL fragments stay
 * client-side and are still shareable and bookmarkable.
 */
export function buildToolStateHref(
  path: string,
  state: Record<string, ToolStateValue>,
): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(state)) {
    params.set(key, String(value));
  }
  return `${path}#${params.toString()}`;
}

/**
 * Read fragment state while retaining backwards compatibility with legacy
 * query-string deep links. When both exist, the fragment takes precedence.
 */
export function readToolStateParams(location: {
  search: string;
  hash: string;
}): URLSearchParams {
  const params = new URLSearchParams(location.search);
  const fragment = new URLSearchParams(location.hash.replace(/^#/, ""));
  fragment.forEach((value, key) => params.set(key, value));
  return params;
}
