export interface FiberglassPlateSpec {
  profile: string;
  catalogId: string;
  a: string;
  b: string;
  t1t2: string;
  drawing: string;
  drawingGroup?: string;
}

/**
 * Values transcribed from the user-supplied plate profile table.
 * The visible source does not state a measurement unit, tolerance, material,
 * tooling status or structural capacity, so none is inferred here.
 */
export const fiberglassPlateSpecs = [
  { profile: "Plate 01", catalogId: "KF-0665", a: "634", b: "60", t1t2: "3.2 / 3.5", drawing: "/images/products/fiberglass-plates/plate-01.webp" },
  { profile: "Plate 02", catalogId: "KF-0307", a: "600", b: "80", t1t2: "4 / 3.5", drawing: "/images/products/fiberglass-plates/plate-02.webp" },
  { profile: "Plate 03", catalogId: "KF-0706", a: "617", b: "60", t1t2: "3.2 / 3.5", drawing: "/images/products/fiberglass-plates/plate-03.webp" },
  { profile: "Plate 04", catalogId: "KF-0664", a: "600", b: "60", t1t2: "3.2 / 3.5", drawing: "/images/products/fiberglass-plates/plate-04.webp" },
  { profile: "Plate 05", catalogId: "KF-0707", a: "600", b: "60", t1t2: "2.8 / 3.5", drawing: "/images/products/fiberglass-plates/plate-05.webp" },
  { profile: "Plate 06", catalogId: "KF-0704", a: "317", b: "60", t1t2: "3.2 / 3.5", drawing: "/images/products/fiberglass-plates/plate-06.webp" },
  { profile: "Plate 07", catalogId: "KF-0705", a: "300", b: "60", t1t2: "2.8 / 3.5", drawing: "/images/products/fiberglass-plates/plate-07-09.webp", drawingGroup: "Shared source schematic for Plates 07–09" },
  { profile: "Plate 08", catalogId: "KF-0883", a: "200", b: "50", t1t2: "2.8", drawing: "/images/products/fiberglass-plates/plate-07-09.webp", drawingGroup: "Shared source schematic for Plates 07–09" },
  { profile: "Plate 09", catalogId: "KF-1019", a: "380", b: "140", t1t2: "15 / 10", drawing: "/images/products/fiberglass-plates/plate-07-09.webp", drawingGroup: "Shared source schematic for Plates 07–09" },
  { profile: "Plate 10", catalogId: "KF-0790", a: "140", b: "20", t1t2: "2.5", drawing: "/images/products/fiberglass-plates/plate-10.webp" },
  { profile: "Plate 11", catalogId: "KX-0510", a: "1000", b: "90", t1t2: "4", drawing: "/images/products/fiberglass-plates/plate-11.webp" },
  { profile: "Plate 12", catalogId: "KF-0645", a: "491", b: "49.1", t1t2: "5 / 3.8", drawing: "/images/products/fiberglass-plates/plate-12.webp" },
  { profile: "Plate 13", catalogId: "KF-0669", a: "241", b: "49.1", t1t2: "5 / 3.8", drawing: "/images/products/fiberglass-plates/plate-13.webp" },
  { profile: "Plate 14", catalogId: "KX-0899", a: "97.2", b: "16", t1t2: "2.5", drawing: "/images/products/fiberglass-plates/plate-14.webp" },
  { profile: "Plate 15", catalogId: "JB-0416", a: "400", b: "220", t1t2: "11 / 6.5", drawing: "/images/products/fiberglass-plates/plate-15-17.webp", drawingGroup: "Shared source schematic for Plates 15–17" },
  { profile: "Plate 16", catalogId: "JB-0294-B", a: "301", b: "160", t1t2: "6 / 4", drawing: "/images/products/fiberglass-plates/plate-15-17.webp", drawingGroup: "Shared source schematic for Plates 15–17" },
  { profile: "Plate 17", catalogId: "JB-0775", a: "500", b: "40", t1t2: "4", drawing: "/images/products/fiberglass-plates/plate-15-17.webp", drawingGroup: "Shared source schematic for Plates 15–17" },
  { profile: "Plate 18", catalogId: "J-0846", a: "800", b: "300", t1t2: "3.5 / 10", drawing: "/images/products/fiberglass-plates/plate-18.webp" },
  { profile: "Plate 19", catalogId: "CB-0839", a: "90.2", b: "28.4", t1t2: "3", drawing: "/images/products/fiberglass-plates/plate-19.webp" },
] as const satisfies readonly FiberglassPlateSpec[];

export const fiberglassPlateSourceNote =
  "The supplied table labels A, B and t1/t2 but does not show a measurement unit, tolerance, material, tooling status, span or capacity. Values and source IDs are reproduced as provided; the approved quotation drawing controls the order.";
