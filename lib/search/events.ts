// Opens the site search palette (components/search/SearchPalette.tsx, mounted
// once in the root layout) from any trigger without shared React state.

export const SEARCH_OPEN_EVENT = "site-search:open";

export function openSiteSearch(query = "") {
  window.dispatchEvent(new CustomEvent(SEARCH_OPEN_EVENT, { detail: { query } }));
}
