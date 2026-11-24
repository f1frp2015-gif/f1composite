/**
 * Starting clip quantity for an FRP grating layout, from the general
 * coordination values in content/data/gratingClips.ts:
 *   - at least 2 panel-to-support hold-downs on each support line,
 *   - at least 4 hold-downs per panel,
 *   - no more than 1200 mm between hold-downs along a support,
 *   - C connectors about every 600–900 mm along a molded panel-to-panel joint.
 * Clips are assumed at both ends of each run, so a run of length L at maximum
 * spacing s needs ceil(L / s) + 1 clips. The result is a starting quantity for
 * a quotation, never a fastening design.
 */

export const MAX_HOLD_DOWN_SPACING_MM = 1200;
export const MIN_HOLD_DOWNS_PER_SUPPORT_LINE = 2;
export const MIN_HOLD_DOWNS_PER_PANEL = 4;
export const C_CONNECTOR_SPACING_MM = { closest: 600, widest: 900 } as const;

export interface GratingClipEstimateInput {
  family: "molded" | "pultruded";
  panels: number;
  /** Panel dimension measured along each support line, mm. */
  widthAlongSupportMm: number;
  /** Support lines under each panel. */
  supportLinesPerPanel: number;
  /** Total length of molded panel-to-panel joints to be connected, mm. Ignored for pultruded grating. */
  jointLengthMm: number;
}

export interface GratingClipEstimate {
  holdDownsPerSupportLine: number;
  holdDownsPerPanel: number;
  holdDownsTotal: number;
  /** C connector range for molded joints, or null when not applicable. */
  connectors: { low: number; high: number } | null;
}

const runCount = (lengthMm: number, spacingMm: number) => (lengthMm > 0 ? Math.ceil(lengthMm / spacingMm) + 1 : 0);

export function estimateGratingClips(input: GratingClipEstimateInput): GratingClipEstimate | null {
  const panels = Math.floor(input.panels);
  const lines = Math.floor(input.supportLinesPerPanel);
  if (!(panels >= 1 && lines >= 1 && input.widthAlongSupportMm > 0)) return null;
  const holdDownsPerSupportLine = Math.max(MIN_HOLD_DOWNS_PER_SUPPORT_LINE, runCount(input.widthAlongSupportMm, MAX_HOLD_DOWN_SPACING_MM));
  const holdDownsPerPanel = Math.max(MIN_HOLD_DOWNS_PER_PANEL, holdDownsPerSupportLine * lines);
  const joint = input.family === "molded" && input.jointLengthMm > 0 ? input.jointLengthMm : 0;
  return {
    holdDownsPerSupportLine,
    holdDownsPerPanel,
    holdDownsTotal: holdDownsPerPanel * panels,
    connectors: joint > 0 ? { low: runCount(joint, C_CONNECTOR_SPACING_MM.widest), high: runCount(joint, C_CONNECTOR_SPACING_MM.closest) } : null,
  };
}
