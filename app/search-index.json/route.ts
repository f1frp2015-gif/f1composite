import { buildSearchIndex } from "@/lib/search/buildIndex";

// Built once at build time; the search palette fetches it on first open.
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
