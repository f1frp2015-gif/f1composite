import { buildLlmsContent } from "@/lib/llmsContent";

// Some AI crawlers probe /llms-full.txt for the complete machine-readable
// brief. We serve the same comprehensive document as /llms.txt from one
// source of truth (lib/llmsContent.ts).
export async function GET() {
  return new Response(buildLlmsContent(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
