import { buildLlmsContent } from "@/lib/llmsContent";

// /llms.txt is the short index; /llms-full.txt carries the complete brief with
// specifications and document scope. Both come from lib/llmsContent.ts.
export async function GET() {
  return new Response(buildLlmsContent(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
