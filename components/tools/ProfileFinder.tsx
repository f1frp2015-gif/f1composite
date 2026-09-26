"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import SectionSvg from "@/components/datasheets/SectionSvg";
import SectionGlyph from "@/components/ui/SectionGlyph";
import { FAMILY_ORDER, PROFILE_FAMILIES } from "@/lib/catalog/profileFamilies";
import type { ShapeId } from "@/lib/catalog/shapes";
import type { FinderRow } from "@/lib/profileFinder";
import { buildRfqHref } from "@/lib/rfq";

const MAX_COMPARE = 4;

const SORTS = {
  size: "Catalog order",
  mass: "Mass (kg/m)",
  A: "Area A",
  Ix: "Stiffness Ix",
  Wx: "Section modulus Wx",
} as const;
type SortKey = keyof typeof SORTS;

interface Filters {
  shapes: ShapeId[];
  /** Raw text of the number fields, kept as typed ("2." stays "2."). */
  dMin: string;
  dMax: string;
  massMax: string;
  ixMin: string;
  sort: SortKey;
  desc: boolean;
  compare: string[];
}

// The query string is the finder's state, so a filtered list or a comparison
// can be bookmarked and shared. history.replaceState keeps it off the back
// button; the event tells useSyncExternalStore to read it again.
const URL_EVENT = "profile-finder:url";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_EVENT, onChange);
  };
}

function parse(search: string): Filters {
  const params = new URLSearchParams(search);
  const text = (name: string) => (params.get(name) ?? "").slice(0, 12);
  const [sort, direction] = (params.get("sort") ?? "").split("-");
  return {
    shapes: (params.get("shape") ?? "").split(",").filter((shape): shape is ShapeId => FAMILY_ORDER.includes(shape as ShapeId)),
    dMin: text("dmin"),
    dMax: text("dmax"),
    massMax: text("kg"),
    ixMin: text("ix"),
    sort: sort in SORTS ? (sort as SortKey) : "size",
    desc: direction === "desc",
    compare: (params.get("cmp") ?? "").split(",").filter(Boolean).slice(0, MAX_COMPARE),
  };
}

function serialize(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.shapes.length) params.set("shape", filters.shapes.join(","));
  if (filters.dMin) params.set("dmin", filters.dMin);
  if (filters.dMax) params.set("dmax", filters.dMax);
  if (filters.massMax) params.set("kg", filters.massMax);
  if (filters.ixMin) params.set("ix", filters.ixMin);
  if (filters.sort !== "size" || filters.desc) params.set("sort", `${filters.sort}${filters.desc ? "-desc" : ""}`);
  if (filters.compare.length) params.set("cmp", filters.compare.join(","));
  return params.toString().replaceAll("%2C", ",");
}

const toNumber = (text: string) => {
  const value = Number.parseFloat(text);
  return Number.isFinite(value) ? value : null;
};

const dimension = (value: number | null) => (value == null ? "—" : value.toLocaleString("en-US", { maximumFractionDigits: 1 }));
const mass = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
const property = (value: number) =>
  value >= 10
    ? value.toLocaleString("en-US", { maximumFractionDigits: 1 })
    : value >= 1
      ? value.toLocaleString("en-US", { maximumFractionDigits: 2 })
      : value.toLocaleString("en-US", { maximumSignificantDigits: 3 });

// Chip labels; tubes use the model prefixes buyers know them by. Full names are in the title.
const CHIP_LABELS: Record<ShapeId, string> = { i_beam: "I-beam", channel: "Channel", angle: "Angle", shs: "SHS", rhs: "RHS", tube: "CHS", rod: "Rod", flat: "Flat bar" };

const inputClass = "min-h-[40px] w-full rounded-control border border-border-default bg-white px-[10px] text-f14 text-t1 placeholder:text-t3";
const labelClass = "font-mono text-f12 text-t3";

export default function ProfileFinder({ rows }: { rows: FinderRow[] }) {
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const filters = useMemo(() => parse(search), [search]);

  function update(patch: Partial<Filters>) {
    const query = serialize({ ...filters, ...patch });
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
    window.dispatchEvent(new Event(URL_EVENT));
  }

  const visible = useMemo(() => {
    const [dMin, dMax, massMax, ixMin] = [filters.dMin, filters.dMax, filters.massMax, filters.ixMin].map(toNumber);
    const matching = rows.filter(
      (row) =>
        (!filters.shapes.length || filters.shapes.includes(row.shape)) &&
        (dMin == null || row.d >= dMin) &&
        (dMax == null || row.d <= dMax) &&
        (massMax == null || row.mass <= massMax) &&
        (ixMin == null || row.Ix >= ixMin),
    );
    const key = filters.sort;
    const sorted = key === "size" ? matching : [...matching].sort((a, b) => a[key] - b[key]);
    return filters.desc ? [...sorted].reverse() : sorted;
  }, [rows, filters]);

  const bySlug = useMemo(() => new Map(rows.map((row) => [row.slug, row])), [rows]);
  const selected = filters.compare.map((slug) => bySlug.get(slug)).filter((row): row is FinderRow => Boolean(row));
  const full = selected.length >= MAX_COMPARE;
  const active = [filters.shapes.length > 0, filters.dMin, filters.dMax, filters.massMax, filters.ixMin].filter(Boolean).length;

  const toggle = (slug: string) =>
    update({ compare: filters.compare.includes(slug) ? filters.compare.filter((item) => item !== slug) : full ? filters.compare : [...filters.compare, slug] });
  const toggleShape = (shape: ShapeId) =>
    update({ shapes: filters.shapes.includes(shape) ? filters.shapes.filter((item) => item !== shape) : FAMILY_ORDER.filter((item) => item === shape || filters.shapes.includes(item)) });

  const quoteHref = buildRfqHref({
    source: "profile-finder",
    product: "Standard FRP profiles",
    specification: selected.map((row) => row.model).join(", "),
    message: `Please quote these standard profiles: ${selected.map((row) => row.model).join(", ")}. Length per piece, quantity, resin and colour:`,
  });

  const checkbox = (row: FinderRow) => (
    <input
      type="checkbox"
      checked={filters.compare.includes(row.slug)}
      disabled={full && !filters.compare.includes(row.slug)}
      onChange={() => toggle(row.slug)}
      aria-label={`Compare ${row.model}`}
      className="h-[18px] w-[18px] shrink-0 accent-teal"
    />
  );

  const files = (row: FinderRow) => (
    <>
      <Link href={`/datasheets/${row.slug}`} prefetch={false} className="font-semibold text-teal-text hover:underline">
        Datasheet
      </Link>
      {row.dxf ? (
        <>
          {" · "}
          <a href={`/cad/${row.slug}.dxf`} download className="font-semibold text-teal-text hover:underline">
            DXF
          </a>
        </>
      ) : null}
    </>
  );

  return (
    <div className={selected.length ? "pb-[96px]" : undefined}>
      <div className="grid gap-[28px] lg:grid-cols-[260px_minmax(0,1fr)]">
        <details open className="group self-start rounded-card border border-border-default bg-bg2 p-[16px] lg:sticky lg:top-[96px]">
          <summary className="cursor-pointer text-f16 font-bold text-t1 lg:pointer-events-none lg:list-none">
            Filters{active ? ` · ${active} active` : ""}
          </summary>
          <div className="mt-[14px] grid gap-[18px]">
            <fieldset>
              <legend className={labelClass}>Shape</legend>
              <div className="mt-[8px] grid grid-cols-4 gap-[6px]">
                {FAMILY_ORDER.map((shape) => {
                  const on = filters.shapes.includes(shape);
                  return (
                    <button
                      key={shape}
                      type="button"
                      aria-pressed={on}
                      title={PROFILE_FAMILIES[shape].label}
                      onClick={() => toggleShape(shape)}
                      className={`grid place-items-center gap-[2px] rounded-control border px-[2px] py-[6px] text-f12 ${on ? "border-teal bg-teal-bg2 text-teal-text" : "border-border-default bg-white text-t2 hover:border-teal-border"}`}
                    >
                      <SectionGlyph shape={shape} size={26} />
                      <span className="leading-tight">{CHIP_LABELS[shape]}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <fieldset>
              <legend className={labelClass}>Depth, leg, OD or width (mm)</legend>
              <div className="mt-[8px] grid grid-cols-2 gap-[8px]">
                <input aria-label="Smallest size, mm" inputMode="decimal" placeholder="From" value={filters.dMin} onChange={(event) => update({ dMin: event.target.value })} className={inputClass} />
                <input aria-label="Largest size, mm" inputMode="decimal" placeholder="To" value={filters.dMax} onChange={(event) => update({ dMax: event.target.value })} className={inputClass} />
              </div>
            </fieldset>
            <label className="grid gap-[8px]">
              <span className={labelClass}>Mass at most (kg/m)</span>
              <input inputMode="decimal" placeholder="Any" value={filters.massMax} onChange={(event) => update({ massMax: event.target.value })} className={inputClass} />
            </label>
            <label className="grid gap-[8px]">
              <span className={labelClass}>Ix at least (cm⁴)</span>
              <input inputMode="decimal" placeholder="Any" value={filters.ixMin} onChange={(event) => update({ ixMin: event.target.value })} className={inputClass} />
            </label>
            {active ? (
              <button type="button" onClick={() => update({ shapes: [], dMin: "", dMax: "", massMax: "", ixMin: "" })} className="justify-self-start text-f14 font-semibold text-teal-text hover:underline">
                Clear filters
              </button>
            ) : null}
          </div>
        </details>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-[12px]">
            <p role="status" className="text-f16 text-t1">
              <strong>{visible.length}</strong> of {rows.length} sizes
            </p>
            <label className="flex items-center gap-[8px] text-f14 text-t2">
              Sort by
              <select
                value={`${filters.sort}${filters.desc ? "-desc" : ""}`}
                onChange={(event) => {
                  const [sort, direction] = event.target.value.split("-");
                  update({ sort: sort as SortKey, desc: direction === "desc" });
                }}
                className="min-h-[40px] rounded-control border border-border-default bg-white px-[8px] text-f14 text-t1"
              >
                {Object.entries(SORTS).flatMap(([key, label]) =>
                  key === "size"
                    ? [<option key={key} value={key}>{label}</option>]
                    : [
                        <option key={key} value={key}>{`${label}, low to high`}</option>,
                        <option key={`${key}-desc`} value={`${key}-desc`}>{`${label}, high to low`}</option>,
                      ],
                )}
              </select>
            </label>
          </div>

          {visible.length === 0 ? (
            <p className="mt-[20px] rounded-card border border-border-default p-[20px] text-f16 text-t2">
              No catalog size matches all the filters. Widen a range, or{" "}
              <Link href={buildRfqHref({ source: "profile-finder", product: "Custom pultruded profile", message: "No standard size matched my requirement. My section, loads and quantity:" })} className="font-semibold text-teal-text underline">
                send the section you need
              </Link>{" "}
              for a custom profile.
            </p>
          ) : (
            <>
              <div className="mt-[14px] hidden overflow-x-auto rounded-card border border-border-default md:block">
                <table className="spec-table w-full min-w-[760px] border-collapse text-f14">
                  <caption className="sr-only">Standard FRP profile sizes matching the filters</caption>
                  <thead className="bg-bg2">
                    <tr className="border-b border-border-default font-mono text-f12 text-t3">
                      <th scope="col" className="px-[12px] py-[10px] text-left font-normal">Size</th>
                      <th scope="col" className="px-[10px] py-[10px] font-normal">D (mm)</th>
                      <th scope="col" className="px-[10px] py-[10px] font-normal">B (mm)</th>
                      <th scope="col" className="px-[10px] py-[10px] font-normal">t (mm)</th>
                      <th scope="col" className="px-[10px] py-[10px] font-normal">kg/m</th>
                      <th scope="col" className="px-[10px] py-[10px] font-normal">A (mm²)</th>
                      <th scope="col" className="px-[10px] py-[10px] font-normal">Ix (cm⁴)</th>
                      <th scope="col" className="px-[10px] py-[10px] font-normal">Wx (cm³)</th>
                      <th scope="col" className="px-[12px] py-[10px] font-normal">Files</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((row) => (
                      <tr key={row.slug} className={`border-b border-border-default last:border-0 ${filters.compare.includes(row.slug) ? "bg-teal-bg" : ""}`}>
                        <th scope="row" className="px-[12px] py-[8px] text-left font-normal">
                          <span className="flex items-center gap-[10px]">
                            {checkbox(row)}
                            <SectionGlyph shape={row.shape} size={22} />
                            <span>
                              <span className="block font-semibold text-t1">{row.model}</span>
                              <span className="block text-f12 text-t3">{row.family}</span>
                            </span>
                          </span>
                        </th>
                        <td className="px-[10px] py-[8px] text-t2">{dimension(row.d)}</td>
                        <td className="px-[10px] py-[8px] text-t2">{dimension(row.b)}</td>
                        <td className="px-[10px] py-[8px] text-t2">{dimension(row.t)}</td>
                        <td className="px-[10px] py-[8px] font-semibold text-t1">{mass(row.mass)}</td>
                        <td className="px-[10px] py-[8px] text-t2">{property(row.A)}</td>
                        <td className="px-[10px] py-[8px] text-t2">{property(row.Ix)}</td>
                        <td className="px-[10px] py-[8px] text-t2">{property(row.Wx)}</td>
                        <td className="px-[12px] py-[8px]">{files(row)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="mt-[14px] grid gap-[10px] md:hidden">
                {visible.map((row) => (
                  <li key={row.slug} className={`rounded-card border border-border-default p-[12px] ${filters.compare.includes(row.slug) ? "bg-teal-bg" : "bg-white"}`}>
                    <div className="flex items-center gap-[10px]">
                      {checkbox(row)}
                      <SectionGlyph shape={row.shape} size={26} />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-t1">{row.model}</p>
                        <p className="text-f12 text-t3">{row.family}</p>
                      </div>
                      <p className="text-f14">{files(row)}</p>
                    </div>
                    <dl className="mt-[10px] grid grid-cols-3 gap-[8px] text-f14">
                      <div>
                        <dt className={labelClass}>kg/m</dt>
                        <dd className="font-semibold text-t1">{mass(row.mass)}</dd>
                      </div>
                      <div>
                        <dt className={labelClass}>Ix cm⁴</dt>
                        <dd className="text-t1">{property(row.Ix)}</dd>
                      </div>
                      <div>
                        <dt className={labelClass}>Wx cm³</dt>
                        <dd className="text-t1">{property(row.Wx)}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {selected.length >= 2 ? (
        <section id="finder-compare" aria-labelledby="finder-compare-title" className="mt-[40px] scroll-mt-[96px]">
          <h2 id="finder-compare-title" className="text-f24 font-bold text-t1">
            Compare {selected.length} sizes
          </h2>
          <div className="mt-[14px] max-w-full overflow-x-auto rounded-card border border-border-default sm:w-fit">
            <table className="spec-table border-collapse text-f14">
              <thead>
                <tr className="border-b border-border-default">
                  <th scope="col" className="px-[12px] py-[10px] text-left font-mono text-f12 font-normal text-t3">Property</th>
                  {selected.map((row) => (
                    <th key={row.slug} scope="col" className="min-w-[150px] px-[16px] py-[10px] align-bottom font-normal">
                      <SectionSvg geometry={{ kind: "parametric", shape: row.shape, dims: row.dims }} size={96} className="ml-auto h-auto w-[96px]" />
                      <span className="mt-[6px] block font-semibold text-t1">{row.model}</span>
                      <button type="button" onClick={() => toggle(row.slug)} className="text-f12 text-teal-text hover:underline">
                        Remove
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Family", (row: FinderRow) => row.family],
                    ["D (mm)", (row: FinderRow) => dimension(row.d)],
                    ["B (mm)", (row: FinderRow) => dimension(row.b)],
                    ["t (mm)", (row: FinderRow) => dimension(row.t)],
                    ["Mass (kg/m)", (row: FinderRow) => mass(row.mass)],
                    ["A (mm²)", (row: FinderRow) => property(row.A)],
                    ["Ix (cm⁴)", (row: FinderRow) => property(row.Ix)],
                    ["Iy (cm⁴)", (row: FinderRow) => property(row.Iy)],
                    ["Wx (cm³)", (row: FinderRow) => property(row.Wx)],
                    ["Wy (cm³)", (row: FinderRow) => property(row.Wy)],
                    ["rx (mm)", (row: FinderRow) => property(row.rx)],
                    ["ry (mm)", (row: FinderRow) => property(row.ry)],
                  ] as const
                ).map(([label, value]) => (
                  <tr key={label} className="border-b border-border-default">
                    <th scope="row" className="px-[12px] py-[8px] text-left font-mono text-f12 font-normal text-t3">
                      {label}
                    </th>
                    {selected.map((row) => (
                      <td key={row.slug} className="px-[12px] py-[8px] text-t1">
                        {value(row)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="px-[12px] py-[8px] text-left font-mono text-f12 font-normal text-t3">
                    Files
                  </th>
                  {selected.map((row) => (
                    <td key={row.slug} className="px-[12px] py-[8px]">
                      {files(row)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-[10px] max-w-[820px] text-f14 text-t3">
            Mass is the published catalog value. Section properties are calculated for the nominal section with sharp corners; check the datasheet before design.
          </p>
        </section>
      ) : null}

      {selected.length ? (
        <div data-page-bottom-bar className="fixed inset-x-0 bottom-0 z-[56] border-t border-border-default bg-white/95 px-[12px] pb-[max(10px,env(safe-area-inset-bottom))] pt-[10px] shadow-bar backdrop-blur-md">
          <div className="site-container flex flex-wrap items-center gap-[8px]">
            <span className="font-mono text-f12 text-t3">
              Compare {selected.length} of {MAX_COMPARE}
            </span>
            {selected.map((row) => (
              <button key={row.slug} type="button" onClick={() => toggle(row.slug)} aria-label={`Remove ${row.model}`} className="rounded-tag border border-border-default bg-white px-[8px] py-[3px] text-f14 text-t1 hover:border-teal-border">
                {row.model} <span aria-hidden>×</span>
              </button>
            ))}
            <span className="ml-auto flex gap-[8px]">
              {selected.length >= 2 ? (
                <a href="#finder-compare" className="rounded-control border border-border-default bg-white px-[14px] py-[8px] text-f14 font-bold text-t1 hover:border-teal-border hover:text-teal-text">
                  Compare
                </a>
              ) : null}
              <Link href={quoteHref} className="rounded-control bg-teal-text px-[14px] py-[8px] text-f14 font-bold text-white hover:bg-teal">
                Quote {selected.length === 1 ? "this size" : "selected"}
              </Link>
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
