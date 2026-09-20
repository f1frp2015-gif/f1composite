import { gratingSpecificationsCsv } from "@/lib/gratingInquiry";

export function GET(request: Request) {
  const family = new URL(request.url).searchParams.get("family");
  if (family !== "molded" && family !== "pultruded") {
    return Response.json({ error: "Choose molded or pultruded grating." }, { status: 400 });
  }
  return new Response(gratingSpecificationsCsv(family), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="f1-${family}-grating-selection.csv"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Robots-Tag": "noindex",
    },
  });
}
