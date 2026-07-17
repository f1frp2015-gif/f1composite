import { buildLlmsContent } from "@/lib/llmsContent";

export async function GET() {
  return new Response(buildLlmsContent(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
