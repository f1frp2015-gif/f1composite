export interface FrpDeckPanelSpec {
  profile: string;
  a: string;
  b: string;
  t1t2: string;
  drawing: string;
  geometryNote: string;
}

/**
 * Nominal values transcribed from the user-supplied deck section sheet.
 * The source sheet does not state a measurement unit; no unit is inferred here.
 * Supplier logos and internal drawing IDs are intentionally excluded.
 */
export const frpDeckPanelSpecs = [
  { profile: "Profile 01", a: "609.6", b: "28.58", t1t2: "4.5 / 4.5", drawing: "/images/products/frp-deck-panels/deck-01.webp", geometryNote: "Wide shallow panel with repeated underside webs and an edge joint." },
  { profile: "Profile 02", a: "540", b: "28", t1t2: "4 (single value shown)", drawing: "/images/products/frp-deck-panels/deck-02.webp", geometryNote: "Shallow panel with repeated underside webs and a formed edge return." },
  { profile: "Profile 03", a: "500", b: "40", t1t2: "4 / 5", drawing: "/images/products/frp-deck-panels/deck-03.webp", geometryNote: "Deep multi-web section with closely spaced internal ribs." },
  { profile: "Profile 04", a: "500", b: "40", t1t2: "4 (single value shown)", drawing: "/images/products/frp-deck-panels/deck-04.webp", geometryNote: "Multi-cell section with interlocking edge geometry." },
  { profile: "Profile 05", a: "309", b: "26", t1t2: "3.5 / 3.5", drawing: "/images/products/frp-deck-panels/deck-05.webp", geometryNote: "Narrow shallow panel with repeated webs and a stepped edge." },
  { profile: "Profile 06", a: "304.8", b: "54.15", t1t2: "6.3 / 6.3", drawing: "/images/products/frp-deck-panels/deck-06-07.webp", geometryNote: "Deep narrow section; shares the source outline with Profile 07 but uses a different thickness set." },
  { profile: "Profile 07", a: "304.8", b: "54.15", t1t2: "5 / 4.5", drawing: "/images/products/frp-deck-panels/deck-06-07.webp", geometryNote: "Deep narrow section; distinct thickness variant from Profile 06." },
  { profile: "Profile 08", a: "500", b: "40", t1t2: "2.8 / 4", drawing: "/images/products/frp-deck-panels/deck-08-09.webp", geometryNote: "Wide multi-web section; shares the source outline with Profile 09 at a different width." },
  { profile: "Profile 09", a: "450", b: "40", t1t2: "2.8 / 4", drawing: "/images/products/frp-deck-panels/deck-08-09.webp", geometryNote: "Width variant of the Profile 08 source geometry." },
  { profile: "Profile 10", a: "462", b: "40", t1t2: "2.8 / 4", drawing: "/images/products/frp-deck-panels/deck-10.webp", geometryNote: "Asymmetric closed-edge section with internal webs." },
  { profile: "Profile 11", a: "450", b: "40", t1t2: "2.8 / 4", drawing: "/images/products/frp-deck-panels/deck-11.webp", geometryNote: "Interlocking-edge geometry distinct from Profiles 09 and 12 despite matching nominal values." },
  { profile: "Profile 12", a: "450", b: "40", t1t2: "2.8 / 4", drawing: "/images/products/frp-deck-panels/deck-12.webp", geometryNote: "Flat-edge geometry distinct from Profiles 09 and 11 despite matching nominal values." },
] as const satisfies readonly FrpDeckPanelSpec[];

export const frpDeckPanelSourceNote =
  "The source sheet labels A, B and t1/t2 but does not state their engineering definitions, unit, tolerance, material, capacity or span. Treat these as nominal drawing values only; the approved F1 drawing controls the project.";
