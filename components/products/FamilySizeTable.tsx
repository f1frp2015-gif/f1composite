"use client";

import Link from "next/link";
import { useState } from "react";
import { approximateInches, sizeInquiryHref } from "@/lib/productInquiry";

type NumericKey = "d" | "b" | "t" | "mass" | "A" | "Ix" | "Wx" | "Iy" | "Wy";

export interface SizeTableRow {
  model: string;
  slug: string;
  d: number;
  b: number | null;
  t: number | null;
  mass: number | null;
  A: number;
  Ix: number;
  Iy: number;
  Wx: number;
  Wy: number;
  dxf: boolean;
  datasheet: string | null;
  /** Page-specific columns, such as the steel section at the same depth. */
  extra?: Record<string, string>;
}

export interface SizeColumn {
  key: NumericKey;
  label: string;
  unit: string;
  /** Show approximate inches under a millimetre value. */
  inches?: boolean;
}

export interface ExtraColumn {
  key: string;
  label: string;
  unit?: string;
}

type Sort = { key: string; direction: 1 | -1 } | null;

const format = (value: number | null, key?: NumericKey) =>
  value == null ? "—" : value.toLocaleString("en-US", { minimumFractionDigits: key === "mass" ? 1 : 0, maximumFractionDigits: 3 });

function sortValue(row: SizeTableRow, key: string): number {
  const value = key in row ? row[key as NumericKey] : Number.parseFloat(row.extra?.[key] ?? "");
  return typeof value === "number" && Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
}

/**
 * A family's catalog sizes. The model links to its datasheet; each row offers
 * the DXF drawing and a quote request for that size. Column headers sort.
 */
export default function FamilySizeTable({
  rows,
  columns,
  extras = [],
  product,
  productPath,
  quoteSource = "size-table",
  caption,
}: {
  rows: SizeTableRow[];
  columns: SizeColumn[];
  extras?: ExtraColumn[];
  /** Product name for the quote request, e.g. "FRP I-beam". */
  product: string;
  productPath: string;
  quoteSource?: string;
  caption: string;
}) {
  const [sort, setSort] = useState<Sort>(null);
  const shown = sort ? [...rows].sort((a, b) => (sortValue(a, sort.key) - sortValue(b, sort.key)) * sort.direction) : rows;
  const toggle = (key: string) =>
    setSort((current) => (current?.key !== key ? { key, direction: 1 } : current.direction === 1 ? { key, direction: -1 } : null));

  const header = (key: string, label: string, unit?: string) => {
    const active = sort?.key === key;
    return (
      <th key={key} scope="col" aria-sort={active ? (sort.direction === 1 ? "ascending" : "descending") : "none"} className="px-[12px] py-[6px] font-semibold">
        <button type="button" onClick={() => toggle(key)} className="inline-flex min-h-[36px] items-center gap-[4px] whitespace-nowrap text-t1 hover:text-teal-text">
          {label}
          {unit ? <span className="font-mono text-f12 font-normal text-t3">{unit}</span> : null}
          <span aria-hidden className={active ? "text-teal-text" : "text-t3"}>
            {active ? (sort.direction === 1 ? "↑" : "↓") : "↕"}
          </span>
        </button>
      </th>
    );
  };

  return (
    <div className="relative overflow-x-auto rounded-card border border-border-default bg-white" role="region" aria-label={caption} tabIndex={0}>
      <table className="spec-table w-full border-collapse text-left text-f14">
        <caption className="sr-only">{caption}. Select a column heading to sort.</caption>
        <thead>
          <tr className="border-b border-border-default bg-bg2">
            <th scope="col" className="sticky left-0 z-10 bg-bg2 px-[12px] py-[6px] font-semibold text-t1">
              Model
            </th>
            {columns.map((column) => header(column.key, column.label, column.unit))}
            {extras.map((column) => header(column.key, column.label, column.unit))}
            <th scope="col" className="px-[12px] py-[6px] font-semibold text-t1">
              <span className="sr-only">Drawing and quote</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {shown.map((row) => {
            const specification = `${row.model}; ${columns
              .filter((column) => column.unit === "mm" && row[column.key] != null)
              .map((column) => `${column.label} (mm): ${row[column.key]}`)
              .join(", ")}`;
            return (
              <tr key={row.slug} className="group border-b border-border-default last:border-b-0">
                <th scope="row" className="sticky left-0 z-10 bg-white px-[12px] py-[10px] font-semibold text-t1 group-hover:bg-bg2">
                  {row.datasheet ? (
                    <Link href={row.datasheet} prefetch={false} className="text-teal-text underline decoration-teal-border underline-offset-4 hover:text-teal">
                      {row.model}
                    </Link>
                  ) : (
                    row.model
                  )}
                </th>
                {columns.map((column) => (
                  <td key={column.key} className={`px-[12px] py-[10px] group-hover:bg-bg2 ${column.key === "mass" ? "font-semibold text-t1" : "text-t2"}`}>
                    {format(row[column.key], column.key)}
                    {column.inches && row[column.key] != null ? (
                      <span className="block whitespace-nowrap text-f12 text-t3">≈ {approximateInches(row[column.key] as number)} in</span>
                    ) : null}
                  </td>
                ))}
                {extras.map((column) => (
                  <td key={column.key} className="whitespace-nowrap px-[12px] py-[10px] text-t2 group-hover:bg-bg2">
                    {row.extra?.[column.key] ?? "—"}
                  </td>
                ))}
                <td className="whitespace-nowrap px-[12px] py-[6px] group-hover:bg-bg2">
                  <span className="inline-flex items-center gap-[6px]">
                    {row.dxf ? (
                      <a
                        href={`/cad/${row.slug}.dxf`}
                        download
                        aria-label={`DXF drawing of ${row.model}`}
                        className="inline-flex min-h-[36px] items-center rounded-control border border-border-default px-[10px] font-mono text-f12 uppercase tracking-[0.06em] text-t2 hover:border-teal-border hover:text-teal-text"
                      >
                        DXF
                      </a>
                    ) : null}
                    <Link
                      href={sizeInquiryHref(productPath, product, specification, quoteSource)}
                      prefetch={false}
                      aria-label={`Quote ${row.model}`}
                      className="inline-flex min-h-[36px] items-center rounded-control border border-teal-border px-[10px] text-f14 font-semibold text-teal-text hover:bg-teal-bg"
                    >
                      Quote
                    </Link>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
