export type GratingClipCode = "M" | "C" | "J" | "T";

export type GratingFamily = "Molded grating" | "Pultruded grating";

export type GratingClipAttachment =
  | "Panel to support"
  | "Panel edge to panel edge";

export interface GratingClipSpec {
  code: GratingClipCode;
  sku: string;
  name: string;
  material: typeof GRATING_CLIP_MATERIAL;
  attachment: GratingClipAttachment;
  compatibleWith: readonly GratingFamily[];
  purpose: string;
  installation: string;
  caution: string;
  figureAlt: string;
}

export const GRATING_CLIP_MATERIAL = "316 stainless steel (316SS)" as const;

export const GRATING_CLIP_DXF_HREF =
  "/cad/f1-grid-grating-clips-m-c-j-t-316ss.dxf" as const;

export const GRATING_CLIP_DXF_NAME =
  "F1-GRID Grating Clips — M/C/J/T (316SS)" as const;

export const GRATING_CLIP_DXF_BY_FAMILY = {
  molded: {
    href: "/cad/f1-molded-grating-clips-m-c-j-316ss.dxf",
    name: "F1 Molded Grating Clips — M/C/J (316SS)",
    codes: "M/C/J",
  },
  pultruded: {
    href: "/cad/f1-pultruded-grating-clips-m-j-t-316ss.dxf",
    name: "F1 Pultruded Grating Clips — M/J/T (316SS)",
    codes: "M/J/T",
  },
} as const;

export const gratingClipNamingNote =
  "M, C, J, and T are F1-GRID product definitions. Letter names are not standardized across manufacturers, so compatibility must be checked against the selected F1 grating series and its approved project drawing.";

export const gratingClipInstallationPrinciples = [
  "Select the clip from the grating family, panel depth, bearing-bar or mesh geometry, support detail, and installation access — not from the letter alone.",
  "Locate panel-to-support hold-downs at supporting members. A C panel connector aligns adjacent molded-panel edges but does not replace support or a hold-down.",
  "Review the support and hold-down layout again after field cuts, penetrations, or unsupported panel edges are introduced.",
  "The approved project drawing governs final clip geometry, bolt and washer selection, quantity, spacing, edge clearances, and tightening requirements.",
] as const;

export const gratingClipTypicalStartingLayout = [
  {
    label: "Each support line",
    value: "Minimum 2 panel-to-support hold-downs",
  },
  {
    label: "Each panel",
    value: "Minimum 4 panel-to-support hold-downs",
  },
  {
    label: "Along a support",
    value: "1200 mm / 4 ft maximum between hold-downs",
  },
  {
    label: "C connectors",
    value: "Typically 600–900 mm / 2–3 ft along an adjacent molded-panel joint",
  },
  {
    label: "Bearing at support",
    value: "38 mm / 1.5 in minimum bearing length",
  },
] as const;

export const gratingClipLayoutDisclaimer =
  "These are general starting coordination values, not a final fastening design. The approved project drawing, project engineer, grating series, support condition, and applicable manufacturer requirements control the final layout.";

export const gratingClips = [
  {
    code: "M",
    sku: "F1-GRID-CLIP-M-316",
    name: "M hold-down clip",
    material: GRATING_CLIP_MATERIAL,
    attachment: "Panel to support",
    compatibleWith: ["Molded grating", "Pultruded grating"],
    purpose:
      "Seats across two adjacent grating bars to hold an open-mesh panel to its supporting member.",
    installation:
      "Use only where the clip seats fully on the selected mesh or bearing-bar profile and the approved support attachment can be installed and inspected.",
    caution:
      "Panel depth, bar profile, support geometry, and access determine the final hardware arrangement.",
    figureAlt:
      "Schematic section of an M hold-down spanning two adjacent grating bars and fastening the panel to a support",
  },
  {
    code: "C",
    sku: "F1-GRID-CLIP-C-316",
    name: "C panel connector",
    material: GRATING_CLIP_MATERIAL,
    attachment: "Panel edge to panel edge",
    compatibleWith: ["Molded grating"],
    purpose:
      "Connects adjacent molded-grating panel edges to control relative movement and maintain alignment at the joint.",
    installation:
      "Install only between compatible molded-panel edges at locations shown on the approved panel-layout drawing.",
    caution:
      "A C connector is not structural support and is not a panel-to-support hold-down. Each panel must remain independently supported and secured.",
    figureAlt:
      "Schematic plan detail of a C connector joining the edges of two adjacent molded-grating panels",
  },
  {
    code: "J",
    sku: "F1-GRID-CLIP-J-316",
    name: "J support-hook clamp",
    material: GRATING_CLIP_MATERIAL,
    attachment: "Panel to support",
    compatibleWith: ["Molded grating", "Pultruded grating"],
    purpose:
      "Pairs a lower J hook with an approved upper clip and fastener to clamp the panel to a support flange without drilling the support frame.",
    installation:
      "Match the approved variant to the molded mesh or pultruded open area and to the support-flange geometry, with the lower hook fully engaged below the flange.",
    caution:
      "The J hook and upper clip are not universal; the approved drawing must match the grating opening, support flange, fastener, and installation access.",
    figureAlt:
      "Schematic section of an upper grating clip and lower J hook clamping a panel around a support flange without drilling the support",
  },
  {
    code: "T",
    sku: "F1-GRID-CLIP-T-316",
    name: "T pultruded-grating clip",
    material: GRATING_CLIP_MATERIAL,
    attachment: "Panel to support",
    compatibleWith: ["Pultruded grating"],
    purpose:
      "F1 series-specific hold-down definition for fastening selected F1 pultruded-grating bearing-bar series to a support frame.",
    installation:
      "Use only with the F1 pultruded series and support arrangement identified on the approved project drawing.",
    caution:
      "The T designation is not standardized across manufacturers and must not be treated as a generic cross-brand geometry or fit claim.",
    figureAlt:
      "Schematic section of an F1 T clip between pultruded-grating bearing bars and fastened to a support frame",
  },
] as const satisfies readonly GratingClipSpec[];
