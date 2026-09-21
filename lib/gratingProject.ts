import { moldedGratingSpecGroups } from '@/content/data/moldedGratingSpecs';
import { pultrudedGratingSpecGroups } from '@/content/data/pultrudedGratingSpecs';
import { moldedGratingSelection, pultrudedGratingSelection } from '@/lib/gratingInquiry';

export { PROJECT_KEY, SUMMARY_KEY } from '@/lib/gratingProjectStorage';
export const gratingCatalog = [
  ...moldedGratingSpecGroups.flatMap((g, gi) => g.rows.map((r, ri) => ({ id: `m-${gi}-${ri}`, family: 'molded', title: `${r.depth} mm · ${g.mesh}`, geometry: g.mesh, depth: r.depth, weight: r.weight, openArea: r.openArea, panels: r.panelSizes, specification: moldedGratingSelection(g.mesh, r) }))),
  ...pultrudedGratingSpecGroups.flatMap(g => g.rows.map(r => ({ id: r.type, family: 'pultruded', title: r.type, geometry: `${r.bearingBarCenter} mm bearing-bar centers`, depth: r.depth, weight: r.weight, openArea: r.openArea, panels: 'Confirm finished panel dimensions', specification: pultrudedGratingSelection(r) }))),
];
export type PanelLine = { key: string; spec: string; mark: string; length: string; width: string; quantity: string; unit: string; direction: string; notes: string };
export const projectFields = ['stage', 'application', 'support', 'environment', 'surface', 'resin', 'color', 'destination', 'date', 'supply', 'clips', 'documents', 'loads'] as const;
export type ProjectField = typeof projectFields[number];
export type GratingProject = { version: 1; fields: Record<ProjectField, string>; lines: PanelLine[] };
export function emptyProject(): GratingProject {
  return { version: 1, fields: Object.fromEntries(projectFields.map(k => [k, k === 'stage' ? 'Budget estimate' : ''])) as Record<ProjectField, string>, lines: [] };
}
export function readProject(raw: string | null): GratingProject {
  const clean = emptyProject();
  try {
    const data = JSON.parse(raw || 'null');
    if (data?.version !== 1) return clean;
    for (const key of projectFields) if (typeof data.fields?.[key] === 'string') clean.fields[key] = data.fields[key].slice(0, 1000);
    if (Array.isArray(data.lines)) clean.lines = data.lines.slice(0, 30).filter((r: PanelLine) => r && typeof r.key === 'string' && (r.spec === '' || gratingCatalog.some(s => s.id === r.spec))).map((r: PanelLine) => Object.fromEntries(['key', 'spec', 'mark', 'length', 'width', 'quantity', 'unit', 'direction', 'notes'].map(k => [k, typeof r[k as keyof PanelLine] === 'string' ? r[k as keyof PanelLine].slice(0, 1000) : ''])) as PanelLine);
  } catch { /* A damaged or older draft must not break the product page. */ }
  return clean;
}
export function panelArea(line: PanelLine): number | null {
  const l = Number(line.length), w = Number(line.width), q = Number(line.quantity);
  if (![l, w, q].every(n => Number.isFinite(n) && n > 0) || !Number.isInteger(q) || !['mm', 'in'].includes(line.unit)) return null;
  return l * w * q * (line.unit === 'in' ? 0.00064516 : 0.000001);
}
export function projectSummary(project: GratingProject) {
  const labels: Record<ProjectField, string> = { stage: 'Inquiry stage', application: 'Application', support: 'Clear span / support width / layout', environment: 'Exposure / chemicals / concentration / temperature', surface: 'Surface / wet or dry / footwear', resin: 'Resin requirement', color: 'Color', destination: 'Delivery country / port / postcode', date: 'Required on-site date', supply: 'Supply scope', clips: 'Fixing kit requirements', documents: 'Required drawings / tests / standards', loads: 'Uniform / point / wheel load, footprint and deflection limit (include units)' };
  return ['F1 COMPOSITE — GRATING RFQ SUMMARY v1', 'Selection request; engineering suitability and commercial scope require confirmation.', '', ...projectFields.map(k => `${labels[k]}: ${project.fields[k] || 'To confirm'}`), '', 'PANEL SCHEDULE', ...(project.lines.length ? project.lines.flatMap((line, i) => {
    const spec = gratingCatalog.find(s => s.id === line.spec);
    const area = panelArea(line);
    return [`${i + 1}. ${line.mark || 'Panel mark to confirm'} — ${spec ? `${spec.family}: ${spec.specification}` : 'Specification per drawing / to confirm'}`, `Finished size: ${line.length || '?'} × ${line.width || '?'} ${line.unit || 'mm'}; quantity: ${line.quantity || '?'} panels`, `Bearing direction: ${line.direction || 'To confirm'}; cutting / openings: ${line.notes || 'To confirm'}`, `Net area: ${area === null ? 'To confirm' : `${area.toFixed(3)} m² (excludes nesting waste)`}`, ''];
  }) : ['Specification and quantities per attached drawing / to confirm.']), '', 'Please confirm applicable load data, resin/surface availability, panel sizes, clips, cutting, packing, production timing, freight scope and agreed Incoterm.'].join('\n');
}
