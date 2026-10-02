// Same-origin check for endpoints that only this site's own pages call, such
// as the price estimator. Browsers label every fetch with Sec-Fetch-Site and
// send Origin on POST, so a request from a page on this site always passes.
// A script that calls the endpoint directly sends neither header unless it
// forges them: this raises the cost of bulk harvesting without stopping a
// determined scraper, which is what the rate limits are for.

export function isSameOriginRequest(req: Request): boolean {
  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite) return fetchSite === "same-origin";
  const origin = req.headers.get("origin");
  const host = (req.headers.get("x-forwarded-host") ?? req.headers.get("host"))?.split(",")[0].trim();
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
