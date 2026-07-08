"use client";

// Back-office single-page app: password login → CRUD over the four catalog
// tables via /api/admin/catalog/[table]. Auth state is discovered by probing
// the API (401 → login form); every mutation goes through the same API, so
// the cookie is the single source of truth.

import { useCallback, useEffect, useMemo, useState } from "react";
import { SHAPES, type ShapeId } from "@/lib/catalog/shapes";

type Row = Record<string, unknown>;

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "checkbox" | "select";
  options?: { value: string; label: string }[];
  required?: boolean;
  hint?: string;
}

const RESOURCES = [
  { key: "products", label: "Products" },
  { key: "formulations", label: "Formulations" },
  { key: "categories", label: "Categories" },
  { key: "downloads", label: "Downloads" },
] as const;

type ResourceKey = (typeof RESOURCES)[number]["key"];

const FIELDS: Record<ResourceKey, FieldDef[]> = {
  categories: [
    { key: "slug", label: "Slug", type: "text", required: true },
    { key: "name", label: "Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "sort", label: "Sort order", type: "number" },
  ],
  formulations: [
    { key: "code", label: "Code", type: "text", required: true, hint: "e.g. E23-ISO" },
    { key: "name", label: "Name", type: "text", required: true },
    { key: "resin_family", label: "Resin family", type: "select", options: [
      { value: "", label: "— none —" },
      { value: "unsaturated_polyester", label: "Unsaturated polyester 不饱和聚酯" },
      { value: "vinyl_ester", label: "Vinyl ester 乙烯基酯" },
      { value: "epoxy", label: "Epoxy 环氧" },
      { value: "polyurethane", label: "Polyurethane 聚氨酯" },
      { value: "phenolic", label: "Phenolic 酚醛" },
    ]},
    { key: "resin", label: "Resin system (display)", type: "text", hint: "e.g. Isophthalic unsaturated polyester" },
    { key: "glass_content", label: "Glass content", type: "text", hint: "e.g. 65–70% by weight" },
    { key: "density_g_cm3", label: "Density (g/cm³)", type: "number" },
    { key: "en13706_grade", label: "Grade", type: "select", options: [
      { value: "", label: "— none —" },
      { value: "E17", label: "E17 (EN 13706)" },
      { value: "E23", label: "E23 (EN 13706)" },
      { value: "E30", label: "E30 (vendor tier — not an EN grade)" },
      { value: "E40", label: "E40 (ATS 5880 tier — not an EN grade)" },
    ]},
    { key: "fire_rating", label: "Fire rating", type: "text", hint: "e.g. ASTM E84 Class A" },
    { key: "e_l_gpa", label: "E_L (GPa)", type: "number" },
    { key: "e_t_gpa", label: "E_T (GPa)", type: "number" },
    { key: "tensile_l_mpa", label: "Tensile strength L (MPa)", type: "number" },
    { key: "tensile_t_mpa", label: "Tensile strength T (MPa)", type: "number" },
    { key: "flexural_l_mpa", label: "Flexural strength L (MPa)", type: "number" },
    { key: "flexural_t_mpa", label: "Flexural strength T (MPa)", type: "number" },
    { key: "shear_mpa", label: "Interlaminar shear ILSS (MPa)", type: "number" },
    { key: "compressive_l_mpa", label: "Compressive strength L (MPa)", type: "number" },
    { key: "pin_bearing_l_mpa", label: "Pin-bearing strength L (MPa)", type: "number" },
    { key: "pin_bearing_t_mpa", label: "Pin-bearing strength T (MPa)", type: "number" },
    { key: "barcol", label: "Barcol hardness", type: "number" },
    { key: "water_abs_pct", label: "Water absorption (%)", type: "number" },
    { key: "notes", label: "Notes", type: "textarea" },
  ],
  products: [
    { key: "model", label: "Model", type: "text", required: true, hint: "e.g. I 240×120×12" },
    { key: "name", label: "Display name", type: "text" },
    { key: "weight_per_m", label: "Published weight (kg/m)", type: "number", hint: "authoritative vendor value — leave blank if unverified" },
    { key: "standards", label: "Standards", type: "text", hint: "e.g. EN 13706 E23 · ASTM E84 Class A" },
    { key: "tolerances", label: "Tolerances", type: "text" },
    { key: "applications", label: "Typical applications", type: "textarea" },
    { key: "status", label: "Status", type: "select", options: [
      { value: "active", label: "active" },
      { value: "draft", label: "draft" },
    ]},
    { key: "sort", label: "Sort order", type: "number" },
  ],
  downloads: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "format", label: "Format", type: "text", hint: "PDF / DWG/STEP / XLSX" },
    { key: "size", label: "Size", type: "text", hint: "e.g. 2.8 MB" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "file_url", label: "File URL", type: "text", hint: "/downloads/… or full URL; blank = 'Request download'" },
    { key: "category", label: "Category", type: "text", hint: "catalog / certification / cad / approval / sustainability" },
    { key: "sort", label: "Sort order", type: "number" },
    { key: "published", label: "Published", type: "checkbox" },
  ],
};

const LIST_COLUMNS: Record<ResourceKey, string[]> = {
  products: ["id", "model", "name", "weight_per_m", "status"],
  formulations: ["id", "code", "resin_family", "en13706_grade", "density_g_cm3"],
  categories: ["id", "slug", "name", "sort"],
  downloads: ["id", "title", "format", "category", "published"],
};

async function api(path: string, init?: RequestInit) {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

// ── geometry editor ─────────────────────────────────────────────────────────

type GeoState =
  | { kind: "none" }
  | { kind: "parametric"; shape: ShapeId; dims: Record<string, string> }
  | { kind: "polygon"; json: string };

function geoFromRow(row: Row | null): GeoState {
  const g = row?.geometry as Record<string, unknown> | null | undefined;
  if (!g || typeof g !== "object") return { kind: "none" };
  if (g.kind === "parametric" && typeof g.shape === "string" && g.shape in SHAPES) {
    const dims: Record<string, string> = {};
    const d = (g.dims ?? {}) as Record<string, unknown>;
    for (const f of SHAPES[g.shape as ShapeId].fields) dims[f.key] = String(d[f.key] ?? "");
    return { kind: "parametric", shape: g.shape as ShapeId, dims };
  }
  if (g.kind === "polygon") {
    return { kind: "polygon", json: JSON.stringify({ outer: g.outer, holes: g.holes ?? [] }, null, 1) };
  }
  return { kind: "none" };
}

function geoToValue(geo: GeoState): { value: unknown; error?: string } {
  if (geo.kind === "none") return { value: null };
  if (geo.kind === "parametric") {
    const dims: Record<string, number> = {};
    for (const f of SHAPES[geo.shape].fields) {
      const n = Number(geo.dims[f.key]);
      if (!Number.isFinite(n) || n <= 0) return { value: null, error: `Dimension ${f.label} must be a positive number` };
      dims[f.key] = n;
    }
    return { value: { kind: "parametric", shape: geo.shape, dims } };
  }
  try {
    const parsed = JSON.parse(geo.json);
    return { value: { kind: "polygon", outer: parsed.outer, holes: parsed.holes ?? [], ...(parsed.J ? { J: parsed.J } : {}) } };
  } catch {
    return { value: null, error: "Polygon JSON is invalid" };
  }
}

function GeometryEditor({ geo, onChange }: { geo: GeoState; onChange: (g: GeoState) => void }) {
  return (
    <div className="rounded-[6px] border border-border-default p-[13px]">
      <div className="mb-[8px] text-f13 font-semibold text-t1">Cross-section geometry</div>
      <div className="mb-[8px] flex gap-[13px] text-f13">
        {(["none", "parametric", "polygon"] as const).map((k) => (
          <label key={k} className="flex items-center gap-[4px]">
            <input
              type="radio"
              checked={geo.kind === k}
              onChange={() => {
                if (k === "none") onChange({ kind: "none" });
                else if (k === "parametric") onChange({ kind: "parametric", shape: "i_beam", dims: {} });
                else onChange({ kind: "polygon", json: '{\n "outer": [[0,0],[100,0],[100,10],[0,10]],\n "holes": []\n}' });
              }}
            />
            {k === "none" ? "none" : k === "parametric" ? "standard shape" : "custom polygon (from DXF)"}
          </label>
        ))}
      </div>
      {geo.kind === "parametric" && (
        <div>
          <select
            className="mb-[8px] w-full rounded-[4px] border border-border-default p-[8px] text-f13"
            value={geo.shape}
            onChange={(e) => onChange({ kind: "parametric", shape: e.target.value as ShapeId, dims: {} })}
          >
            {Object.values(SHAPES).map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-[8px]">
            {SHAPES[geo.shape].fields.map((f) => (
              <label key={f.key} className="text-f12 text-t2">
                {f.label} ({f.symbol}, mm)
                <input
                  type="number"
                  step="0.1"
                  className="mt-[2px] w-full rounded-[4px] border border-border-default p-[6px] text-f13 text-t1"
                  value={geo.dims[f.key] ?? ""}
                  onChange={(e) => onChange({ ...geo, dims: { ...geo.dims, [f.key]: e.target.value } })}
                />
              </label>
            ))}
          </div>
        </div>
      )}
      {geo.kind === "polygon" && (
        <div>
          <textarea
            rows={8}
            className="w-full rounded-[4px] border border-border-default p-[8px] font-mono text-f12"
            value={geo.json}
            onChange={(e) => onChange({ kind: "polygon", json: e.target.value })}
          />
          <p className="mt-[4px] text-f11 text-t3">
            Coordinates in mm, y-up. outer = [[x,y],…] counter-clockwise; holes = array of rings.
            Optional &quot;J&quot; (mm⁴) if computed offline (FEM). Digitised from customer DXF via the
            offline ingestion pipeline.
          </p>
        </div>
      )}
    </div>
  );
}

// ── main app ────────────────────────────────────────────────────────────────

export default function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<ResourceKey>("products");
  const [rows, setRows] = useState<Row[]>([]);
  const [lookups, setLookups] = useState<{ categories: Row[]; formulations: Row[] }>({ categories: [], formulations: [] });
  const [editing, setEditing] = useState<Row | null>(null); // null = closed, {} = new
  const [form, setForm] = useState<Record<string, string>>({});
  const [geo, setGeo] = useState<GeoState>({ kind: "none" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pwPanel, setPwPanel] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async (resource: ResourceKey) => {
    const { status, json } = await api(`/api/admin/catalog/${resource}`);
    if (status === 401) { setAuthed(false); return; }
    setAuthed(true);
    setRows(Array.isArray(json.rows) ? json.rows : []);
    if (resource === "products") {
      const [c, f] = await Promise.all([
        api("/api/admin/catalog/categories"),
        api("/api/admin/catalog/formulations"),
      ]);
      setLookups({ categories: c.json.rows ?? [], formulations: f.json.rows ?? [] });
    }
  }, []);

  // Data fetch on tab change — setState happens after the awaited fetch, not
  // synchronously in the effect body; the lint rule can't see through `load`.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(tab); }, [tab, load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const { status, json } = await api("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    if (status === 200) { setPassword(""); setAuthed(true); void load(tab); }
    else setLoginError(json.error ?? "Login failed");
  }

  function openEditor(row: Row | null) {
    setError("");
    setEditing(row ?? {});
    const f: Record<string, string> = {};
    for (const fd of FIELDS[tab]) {
      const v = row?.[fd.key];
      f[fd.key] = v == null ? (fd.key === "status" ? "active" : fd.type === "checkbox" ? "true" : "") : String(v);
    }
    if (tab === "products") {
      f.category_id = row?.category_id == null ? "" : String(row.category_id);
      f.formulation_id = row?.formulation_id == null ? "" : String(row.formulation_id);
      setGeo(geoFromRow(row));
    }
    setForm(f);
  }

  async function save() {
    setError("");
    const values: Record<string, unknown> = {};
    for (const fd of FIELDS[tab]) {
      const raw = form[fd.key] ?? "";
      if (fd.required && !raw.trim()) { setError(`${fd.label} is required`); return; }
      if (fd.type === "number") values[fd.key] = raw.trim() === "" ? null : Number(raw);
      else if (fd.type === "checkbox") values[fd.key] = form[fd.key] === "true";
      else values[fd.key] = raw.trim() === "" ? null : raw;
    }
    if (tab === "products") {
      values.category_id = form.category_id ? Number(form.category_id) : null;
      values.formulation_id = form.formulation_id ? Number(form.formulation_id) : null;
      const g = geoToValue(geo);
      if (g.error) { setError(g.error); return; }
      values.geometry = g.value;
    }
    setBusy(true);
    const id = editing && editing.id != null ? Number(editing.id) : null;
    const { status, json } = id
      ? await api(`/api/admin/catalog/${tab}`, { method: "PUT", body: JSON.stringify({ id, values }) })
      : await api(`/api/admin/catalog/${tab}`, { method: "POST", body: JSON.stringify(values) });
    setBusy(false);
    if (status === 200 && json.ok) {
      setEditing(null);
      setNotice(id ? `#${id} updated` : `created #${json.id}`);
      setTimeout(() => setNotice(""), 3000);
      void load(tab);
    } else setError(json.error ?? "Save failed");
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    if (pwForm.next !== pwForm.confirm) {
      setPwMsg({ ok: false, text: "New passwords do not match" });
      return;
    }
    const { status, json } = await api("/api/admin/password", {
      method: "POST",
      body: JSON.stringify({ current: pwForm.current, next: pwForm.next }),
    });
    if (status === 200 && json.ok) {
      setPwForm({ current: "", next: "", confirm: "" });
      setPwMsg({ ok: true, text: "Password changed. Use the new password from your next sign-in." });
    } else {
      setPwMsg({ ok: false, text: json.error ?? "Change failed" });
    }
  }

  async function remove(row: Row) {
    if (!window.confirm(`Delete ${tab} #${row.id}? This cannot be undone.`)) return;
    const { status, json } = await api(`/api/admin/catalog/${tab}?id=${row.id}`, { method: "DELETE" });
    if (status === 200) void load(tab);
    else setError(json.error ?? "Delete failed");
  }

  const lookupName = useMemo(() => {
    const cats = new Map(lookups.categories.map((c) => [Number(c.id), String(c.name)]));
    const forms = new Map(lookups.formulations.map((f) => [Number(f.id), String(f.code)]));
    return { cats, forms };
  }, [lookups]);

  if (authed === null) {
    return <div className="py-[89px] text-center text-f15 text-t3">Loading…</div>;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-[400px] py-[89px]">
        <h1 className="mb-[21px] text-f24 font-bold text-t1">Admin sign-in</h1>
        <form onSubmit={login} className="space-y-[13px]">
          <input
            type="password"
            autoFocus
            placeholder="Admin password"
            className="w-full rounded-[6px] border border-border-default p-[13px] text-f15"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p className="text-f13 text-red-600">{loginError}</p>}
          <button
            type="submit"
            className="w-full rounded-[6px] bg-teal-text p-[13px] text-f15 font-semibold text-white"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-[34px] py-[55px]">
      <div className="mb-[21px] flex items-center justify-between">
        <h1 className="text-f24 font-bold text-t1">Catalog Admin</h1>
        <div className="flex items-center gap-[13px]">
          <button
            className="text-f13 text-t3 hover:underline"
            onClick={() => { setPwPanel(!pwPanel); setPwMsg(null); }}
          >
            Change password
          </button>
          <button
            className="text-f13 text-t3 hover:underline"
            onClick={async () => { await api("/api/admin/logout", { method: "POST" }); setAuthed(false); }}
          >
            Sign out
          </button>
        </div>
      </div>

      {pwPanel && (
        <form
          onSubmit={changePassword}
          className="mb-[21px] flex flex-wrap items-end gap-[13px] rounded-[8px] border border-border-default bg-white p-[21px]"
        >
          {([
            ["current", "Current password"],
            ["next", "New password (min 10 chars)"],
            ["confirm", "Confirm new password"],
          ] as const).map(([key, label]) => (
            <label key={key} className="text-f12 text-t2">
              {label}
              <input
                type="password"
                required
                className="mt-[2px] block w-[220px] rounded-[4px] border border-border-default p-[8px] text-f13 text-t1"
                value={pwForm[key]}
                onChange={(e) => setPwForm({ ...pwForm, [key]: e.target.value })}
              />
            </label>
          ))}
          <button
            type="submit"
            className="rounded-[6px] bg-teal-text px-[21px] py-[8px] text-f13 font-semibold text-white"
          >
            Update password
          </button>
          {pwMsg && (
            <p className={`w-full text-f13 ${pwMsg.ok ? "text-green-700" : "text-red-600"}`}>
              {pwMsg.text}
            </p>
          )}
        </form>
      )}

      <div className="mb-[21px] flex gap-[8px]">
        {RESOURCES.map((r) => (
          <button
            key={r.key}
            onClick={() => { setTab(r.key); setEditing(null); }}
            className={`rounded-[6px] px-[13px] py-[8px] text-f13 font-semibold ${
              tab === r.key ? "bg-teal-text text-white" : "bg-bg2 text-t2 hover:bg-teal-bg"
            }`}
          >
            {r.label}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={() => openEditor(null)}
          className="rounded-[6px] bg-blue-700 px-[13px] py-[8px] text-f13 font-semibold text-white"
        >
          + New
        </button>
      </div>

      {notice && <p className="mb-[13px] text-f13 text-green-700">{notice}</p>}
      {error && !editing && <p className="mb-[13px] text-f13 text-red-600">{error}</p>}

      {editing !== null && (
        <div className="mb-[34px] rounded-[8px] border border-border-default bg-white p-[21px]">
          <h2 className="mb-[13px] text-f17 font-bold text-t1">
            {editing.id != null ? `Edit #${editing.id}` : `New ${tab.slice(0, -1)}`}
          </h2>
          <div className="grid gap-[13px] md:grid-cols-2">
            {FIELDS[tab].map((fd) => (
              <label key={fd.key} className={`text-f12 text-t2 ${fd.type === "textarea" ? "md:col-span-2" : ""}`}>
                {fd.label}{fd.required ? " *" : ""}
                {fd.type === "textarea" ? (
                  <textarea
                    rows={3}
                    className="mt-[2px] w-full rounded-[4px] border border-border-default p-[8px] text-f13 text-t1"
                    value={form[fd.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [fd.key]: e.target.value })}
                  />
                ) : fd.type === "checkbox" ? (
                  <div className="mt-[6px]">
                    <input
                      type="checkbox"
                      checked={form[fd.key] === "true"}
                      onChange={(e) => setForm({ ...form, [fd.key]: e.target.checked ? "true" : "false" })}
                    />
                  </div>
                ) : fd.type === "select" ? (
                  <select
                    className="mt-[2px] w-full rounded-[4px] border border-border-default p-[8px] text-f13 text-t1"
                    value={form[fd.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [fd.key]: e.target.value })}
                  >
                    {(fd.options ?? []).map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={fd.type === "number" ? "number" : "text"}
                    step="any"
                    className="mt-[2px] w-full rounded-[4px] border border-border-default p-[8px] text-f13 text-t1"
                    value={form[fd.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [fd.key]: e.target.value })}
                  />
                )}
                {fd.hint && <span className="block text-f11 text-t3">{fd.hint}</span>}
              </label>
            ))}
            {tab === "products" && (
              <>
                <label className="text-f12 text-t2">
                  Category
                  <select
                    className="mt-[2px] w-full rounded-[4px] border border-border-default p-[8px] text-f13 text-t1"
                    value={form.category_id ?? ""}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  >
                    <option value="">— none —</option>
                    {lookups.categories.map((c) => (
                      <option key={String(c.id)} value={String(c.id)}>{String(c.name)}</option>
                    ))}
                  </select>
                </label>
                <label className="text-f12 text-t2">
                  Formulation
                  <select
                    className="mt-[2px] w-full rounded-[4px] border border-border-default p-[8px] text-f13 text-t1"
                    value={form.formulation_id ?? ""}
                    onChange={(e) => setForm({ ...form, formulation_id: e.target.value })}
                  >
                    <option value="">— none —</option>
                    {lookups.formulations.map((f) => (
                      <option key={String(f.id)} value={String(f.id)}>{String(f.code)} — {String(f.name)}</option>
                    ))}
                  </select>
                </label>
                <div className="md:col-span-2">
                  <GeometryEditor geo={geo} onChange={setGeo} />
                </div>
              </>
            )}
          </div>
          {error && <p className="mt-[13px] text-f13 text-red-600">{error}</p>}
          <div className="mt-[13px] flex gap-[8px]">
            <button
              disabled={busy}
              onClick={save}
              className="rounded-[6px] bg-teal-text px-[21px] py-[8px] text-f13 font-semibold text-white disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="rounded-[6px] bg-bg2 px-[21px] py-[8px] text-f13 font-semibold text-t2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-[8px] border border-border-default bg-white">
        <table className="w-full text-left text-f13">
          <thead>
            <tr className="border-b border-border-default bg-bg2 text-t2">
              {LIST_COLUMNS[tab].map((c) => (
                <th key={c} className="px-[13px] py-[8px] font-semibold">{c}</th>
              ))}
              {tab === "products" && <th className="px-[13px] py-[8px] font-semibold">category</th>}
              {tab === "products" && <th className="px-[13px] py-[8px] font-semibold">formulation</th>}
              <th className="px-[13px] py-[8px]" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={String(row.id)} className="border-b border-border-default last:border-0">
                {LIST_COLUMNS[tab].map((c) => (
                  <td key={c} className="px-[13px] py-[8px] text-t1">
                    {row[c] == null ? "—" : typeof row[c] === "boolean" ? (row[c] ? "✓" : "✗") : String(row[c])}
                  </td>
                ))}
                {tab === "products" && (
                  <td className="px-[13px] py-[8px] text-t2">
                    {lookupName.cats.get(Number(row.category_id)) ?? "—"}
                  </td>
                )}
                {tab === "products" && (
                  <td className="px-[13px] py-[8px] text-t2">
                    {lookupName.forms.get(Number(row.formulation_id)) ?? "—"}
                  </td>
                )}
                <td className="whitespace-nowrap px-[13px] py-[8px] text-right">
                  {tab === "products" && (
                    <a
                      href={`/api/datasheet?ids=${row.id}`}
                      target="_blank"
                      rel="noopener"
                      className="mr-[13px] text-teal-text hover:underline"
                    >
                      TDS
                    </a>
                  )}
                  <button onClick={() => openEditor(row)} className="mr-[13px] text-blue-700 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => remove(row)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-[13px] py-[21px] text-center text-t3">
                  No rows yet — click &quot;+ New&quot; or run the seed script.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
