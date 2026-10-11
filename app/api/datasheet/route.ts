// PDF selection uses published catalog keys and formulation codes:
// ?profiles=f1-rt-001&materials=VE-E23&reference=1&revision=catalog-...
// Legacy database ?ids=...&f=... is accepted only for real database records.
// Unknown selections fail explicitly; unverified alternatives require reference mode.

import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { getPublishedCatalog } from "@/lib/catalog/published";
import { selectDatasheetConfigurations, CatalogSelectionError } from "@/lib/catalog/datasheetSelection";
import { DatasheetDocument, type DatasheetPage } from "@/lib/pdf/datasheet";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  try {
    const catalog = await getPublishedCatalog();
    const selected = selectDatasheetConfigurations(catalog, params);
    const pages: DatasheetPage[] = selected.map(({ profile, formulation, configuration }) => ({
      product: profile.product, formulation, configuration,
    }));
    const categories = catalog.categories;

    // DatasheetDocument renders a <Document> root; the cast bridges react-pdf's
    // DocumentProps-typed API to a component whose props are our data payload.
    const element = React.createElement(DatasheetDocument, {
      data: {
        pages,
        categories: new Map(categories.map((c) => [c.id, c])),
      },
    }) as unknown as Parameters<typeof renderToBuffer>[0];
    const buffer = await renderToBuffer(element);

    const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const name =
      pages.length === 1
        ? `f1composite-tds-${slug(pages[0].product.model)}${pages[0].formulation ? `-${slug(pages[0].formulation.code)}` : ""}.pdf`
        : `f1composite-catalog-extract-${pages.length}-pages.pdf`;

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${name}"`,
        "Cache-Control": "private, max-age=0, must-revalidate",
      },
    });
  } catch (e) {
    if (e instanceof CatalogSelectionError) return NextResponse.json({ ok: false, error: e.message }, { status: e.status });
    console.error("[datasheet] render failed:", e);
    return NextResponse.json({ ok: false, error: "datasheet generation failed" }, { status: 500 });
  }
}
