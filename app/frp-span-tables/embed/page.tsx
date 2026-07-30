import type { Metadata } from "next";
import EmbedShell from "@/components/tools/EmbedShell";
import SpanTablesContent from "@/components/tools/SpanTablesContent";
import { buildSpanTables, DESIGN_BASIS } from "@/lib/spanTables";

export const metadata: Metadata = {
  title: { absolute: "Embed FRP Span Tables | F1 Composite" },
  description: "Embeddable pultruded FRP beam span tables and allowable uniform-load charts by F1 Composite.",
  alternates: { canonical: "https://www.f1composite.com/frp-span-tables" },
  robots: { index: false, follow: true },
};

export default function SpanTablesEmbedPage() {
  const families = buildSpanTables();

  return (
    <EmbedShell toolName="FRP Span Tables" canonicalPath="/frp-span-tables">
      <section className="bg-white px-[20px] py-[21px] sm:px-[34px]">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-f11 font-bold uppercase tracking-[2px] text-teal-text">Free engineering data</p>
          <h1 className="mt-[8px] text-f24 font-bold text-t1">FRP Span Tables & Load Charts</h1>
          <p className="mt-[8px] max-w-[920px] text-f14 leading-golden text-t2">
            {DESIGN_BASIS.material}; {DESIGN_BASIS.method}; {DESIGN_BASIS.environment}; {DESIGN_BASIS.loadCase};{" "}
            {DESIGN_BASIS.deflectionLimit}. Values are allowable service UDL in kN/m. Superscripts identify the
            governing check: d deflection, b bending, v shear.
          </p>
        </div>
      </section>
      <SpanTablesContent families={families} />
    </EmbedShell>
  );
}
