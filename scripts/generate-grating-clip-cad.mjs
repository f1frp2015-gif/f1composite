import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");

export const OUTPUT_PATH = path.join(
  repositoryRoot,
  "public/cad/f1-grid-grating-clips-m-c-j-t-316ss.dxf",
);

export const FAMILY_OUTPUT_PATHS = {
  molded: path.join(repositoryRoot, "public/cad/f1-molded-grating-clips-m-c-j-316ss.dxf"),
  pultruded: path.join(repositoryRoot, "public/cad/f1-pultruded-grating-clips-m-j-t-316ss.dxf"),
};

export const REQUIRED_LAYERS = [
  "M_CLIP",
  "C_CLIP",
  "J_CLIP",
  "T_CLIP",
  "SUPPORT",
  "NOTES",
];

export const CLIP_DRAWINGS = [
  {
    code: "M",
    layer: "M_CLIP",
    sku: "F1-GRID-CLIP-M-316",
    title: "M CLIP HOLD-DOWN",
    compatibility: "MOLDED OR PULTRUDED - SERIES SELECTION REQUIRED",
  },
  {
    code: "C",
    layer: "C_CLIP",
    sku: "F1-GRID-CLIP-C-316",
    title: "C CLIP PANEL CONNECTOR",
    compatibility: "MOLDED GRATING ONLY - ADJACENT PANEL EDGES",
  },
  {
    code: "J",
    layer: "J_CLIP",
    sku: "F1-GRID-CLIP-J-316",
    title: "J CLIP HOOK HOLD-DOWN",
    compatibility: "MOLDED OR PULTRUDED - SERIES SELECTION REQUIRED",
  },
  {
    code: "T",
    layer: "T_CLIP",
    sku: "F1-GRID-CLIP-T-316",
    title: "T CLIP F1 SERIES-SPECIFIC HOLD-DOWN",
    compatibility: "PULTRUDED GRATING ONLY - F1 SERIES-SPECIFIC DEFINITION",
  },
];

export const FAMILY_CLIP_CODES = {
  molded: ["M", "C", "J"],
  pultruded: ["M", "J", "T"],
};

function group(code, value) {
  return `${code}\n${value}\n`;
}

function entity(type, values) {
  let output = group(0, type);
  for (const [code, value] of values) output += group(code, value);
  return output;
}

function line(layer, x1, y1, x2, y2) {
  return entity("LINE", [
    [8, layer],
    [10, x1],
    [20, y1],
    [30, 0],
    [11, x2],
    [21, y2],
    [31, 0],
  ]);
}

function circle(layer, x, y, radius) {
  return entity("CIRCLE", [
    [8, layer],
    [10, x],
    [20, y],
    [30, 0],
    [40, radius],
  ]);
}

function text(layer, x, y, height, value) {
  if (!/^[\x20-\x7e]+$/.test(value)) {
    throw new Error(`DXF text must be printable ASCII: ${value}`);
  }

  return entity("TEXT", [
    [8, layer],
    [10, x],
    [20, y],
    [30, 0],
    [40, height],
    [1, value],
    [50, 0],
  ]);
}

function polyline(layer, points, closed = false) {
  const segments = [];
  const limit = closed ? points.length : points.length - 1;
  for (let index = 0; index < limit; index += 1) {
    const start = points[index];
    const end = points[(index + 1) % points.length];
    segments.push(line(layer, start[0], start[1], end[0], end[1]));
  }
  return segments.join("");
}

function rectangle(layer, x, y, width, height) {
  return polyline(
    layer,
    [
      [x, y],
      [x + width, y],
      [x + width, y + height],
      [x, y + height],
    ],
    true,
  );
}

function viewFrame(x, y, drawing) {
  return [
    rectangle("NOTES", x, y, 165, 96),
    text("NOTES", x + 5, y + 88, 4, `${drawing.code} CLIP INSTALLATION SCHEMATIC`),
    text("NOTES", x + 5, y + 82, 2.6, "NOT FOR FABRICATION - NOT TO SCALE"),
    text(drawing.layer, x + 5, y + 75, 3.1, `SKU: ${drawing.sku}`),
    text(drawing.layer, x + 5, y + 69, 2.8, `${drawing.title} - 316 STAINLESS STEEL`),
    text("NOTES", x + 5, y + 7, 2.4, drawing.compatibility),
  ].join("");
}

function supportContext(x, y) {
  return [
    rectangle("SUPPORT", x + 30, y + 21, 105, 9),
    line("SUPPORT", x + 30, y + 25.5, x + 135, y + 25.5),
  ].join("");
}

function moldedBar(layer, x, y, width = 14, height = 28) {
  return rectangle(layer, x, y, width, height);
}

function pultrudedIBar(layer, x, y) {
  return [
    rectangle(layer, x, y, 18, 4),
    rectangle(layer, x + 7, y + 4, 4, 20),
    rectangle(layer, x, y + 24, 18, 4),
  ].join("");
}

function drawMClip(x, y) {
  const layer = "M_CLIP";
  return [
    supportContext(x, y),
    moldedBar("SUPPORT", x + 47, y + 30),
    moldedBar("SUPPORT", x + 87, y + 30),
    polyline(layer, [
      [x + 43, y + 58],
      [x + 47, y + 63],
      [x + 61, y + 63],
      [x + 66, y + 68],
      [x + 82, y + 68],
      [x + 87, y + 63],
      [x + 101, y + 63],
      [x + 105, y + 58],
    ]),
    line(layer, x + 74, y + 68, x + 74, y + 22),
    circle(layer, x + 74, y + 68, 2.5),
    text("NOTES", x + 108, y + 49, 2.3, "CLIP OVER TWO ADJACENT BARS"),
  ].join("");
}

function drawCClip(x, y) {
  const layer = "C_CLIP";
  return [
    supportContext(x, y),
    rectangle("SUPPORT", x + 38, y + 30, 42, 28),
    rectangle("SUPPORT", x + 84, y + 30, 42, 28),
    line("SUPPORT", x + 59, y + 30, x + 59, y + 58),
    line("SUPPORT", x + 105, y + 30, x + 105, y + 58),
    polyline(layer, [
      [x + 70, y + 60],
      [x + 79, y + 65],
      [x + 87, y + 65],
      [x + 94, y + 60],
      [x + 94, y + 45],
      [x + 89, y + 40],
      [x + 76, y + 40],
      [x + 70, y + 45],
      [x + 70, y + 60],
    ]),
    line(layer, x + 82, y + 65, x + 82, y + 39),
    circle(layer, x + 82, y + 65, 2.5),
    text("NOTES", x + 5, y + 13, 2.3, "DOES NOT REPLACE SUPPORT OR PANEL HOLD-DOWNS"),
  ].join("");
}

function drawJClip(x, y) {
  const layer = "J_CLIP";
  return [
    supportContext(x, y),
    moldedBar("SUPPORT", x + 48, y + 30),
    moldedBar("SUPPORT", x + 84, y + 30),
    line(layer, x + 74, y + 62, x + 74, y + 20),
    polyline(layer, [
      [x + 74, y + 20],
      [x + 74, y + 15],
      [x + 129, y + 15],
      [x + 136, y + 22],
      [x + 136, y + 30],
    ]),
    polyline(layer, [
      [x + 62, y + 58],
      [x + 68, y + 64],
      [x + 80, y + 64],
      [x + 86, y + 58],
    ]),
    circle(layer, x + 74, y + 64, 2.5),
    text("NOTES", x + 105, y + 42, 2.3, "HOOKS TO SUPPORT"),
  ].join("");
}

function drawTClip(x, y) {
  const layer = "T_CLIP";
  return [
    supportContext(x, y),
    pultrudedIBar("SUPPORT", x + 42, y + 30),
    pultrudedIBar("SUPPORT", x + 96, y + 30),
    line(layer, x + 70, y + 61, x + 90, y + 61),
    line(layer, x + 80, y + 61, x + 80, y + 21),
    line(layer, x + 71, y + 57, x + 89, y + 57),
    circle(layer, x + 80, y + 61, 2.5),
    polyline(layer, [
      [x + 72, y + 31],
      [x + 72, y + 26],
      [x + 88, y + 26],
      [x + 88, y + 31],
    ]),
    text("NOTES", x + 5, y + 13, 2.3, "LETTER DESIGNATIONS VARY BY PRODUCT SERIES"),
  ].join("");
}

function tablesSection() {
  const layerColors = new Map([
    ["0", 7],
    ["M_CLIP", 1],
    ["C_CLIP", 2],
    ["J_CLIP", 3],
    ["T_CLIP", 4],
    ["SUPPORT", 8],
    ["NOTES", 7],
  ]);

  let output = group(0, "SECTION") + group(2, "TABLES");
  output += group(0, "TABLE") + group(2, "LTYPE") + group(70, 1);
  output += entity("LTYPE", [
    [2, "CONTINUOUS"],
    [70, 0],
    [3, "Solid line"],
    [72, 65],
    [73, 0],
    [40, 0],
  ]);
  output += group(0, "ENDTAB");
  output += group(0, "TABLE") + group(2, "LAYER") + group(70, layerColors.size);

  for (const [name, color] of layerColors) {
    output += entity("LAYER", [
      [2, name],
      [70, 0],
      [62, color],
      [6, "CONTINUOUS"],
    ]);
  }

  output += group(0, "ENDTAB") + group(0, "ENDSEC");
  return output;
}

const DRAWING_RENDERERS = {
  M: drawMClip,
  C: drawCClip,
  J: drawJClip,
  T: drawTClip,
};

export function buildDxf({
  drawings = CLIP_DRAWINGS,
  title = "F1-GRID GRATING CLIP INSTALLATION SCHEMATICS - M / C / J / T",
  familyNote = "FAMILY SCOPE: MOLDED M/C/J; PULTRUDED M/J/T",
} = {}) {
  let output = group(0, "SECTION") + group(2, "HEADER");
  output += group(9, "$ACADVER") + group(1, "AC1009");
  output += group(0, "ENDSEC");
  output += tablesSection();
  output += group(0, "SECTION") + group(2, "ENTITIES");

  output += text("NOTES", 10, 247, 5, title);
  output += text("NOTES", 10, 239, 3.2, "NOT FOR FABRICATION - NOT TO SCALE - NO MANUFACTURING DIMENSIONS SHOWN");
  output += text("NOTES", 10, 232, 4, "APPROVED PROJECT DRAWING CONTROLS");
  output += text("NOTES", 10, 225, 2.8, "VERIFY GRATING FAMILY, CLIP SERIES, SUPPORT, LOADS, SPACING, TORQUE, AND FASTENER ASSEMBLY");
  output += text("NOTES", 10, 219, 2.8, "CLIPS: 316 STAINLESS STEEL; VERIFY COMPLETE FASTENER ASSEMBLY ALLOY");
  output += text("NOTES", 10, 213, 2.8, familyNote);

  const positions = [
    { x: 10, y: 117 },
    { x: 185, y: 117 },
    { x: 10, y: 11 },
    { x: 185, y: 11 },
  ];

  drawings.forEach((drawing, index) => {
    const position = positions[index];
    const render = DRAWING_RENDERERS[drawing.code];
    output += viewFrame(position.x, position.y, drawing);
    output += render(position.x, position.y);
  });

  output += group(0, "ENDSEC") + group(0, "EOF");

  if (!/^[\x09\x0a\x0d\x20-\x7e]+$/.test(output)) {
    throw new Error("Generated DXF must contain ASCII characters only");
  }

  return output;
}

export async function writeDxf(outputPath = OUTPUT_PATH, options) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buildDxf(options), "ascii");
  return outputPath;
}

export async function writeAllDxf() {
  const outputs = [await writeDxf()];

  for (const [family, codes] of Object.entries(FAMILY_CLIP_CODES)) {
    const drawings = codes.map((code) => CLIP_DRAWINGS.find((drawing) => drawing.code === code));
    const title = `F1 ${family.toUpperCase()} GRATING CLIPS - ${codes.join(" / ")} - 316SS`;
    const familyNote = `${family.toUpperCase()} GRATING FAMILY ONLY - USE APPROVED F1 SKU AND DRAWING`;
    outputs.push(await writeDxf(FAMILY_OUTPUT_PATHS[family], { drawings, title, familyNote }));
  }

  return outputs;
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  const outputPaths = await writeAllDxf();
  process.stdout.write(`${outputPaths.map((outputPath) => path.relative(repositoryRoot, outputPath)).join("\n")}\n`);
}
