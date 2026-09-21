import { inflateRawSync } from "node:zlib";

export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
export const ALLOWED_ATTACHMENT_EXTENSIONS = new Set(["pdf", "dwg", "dxf", "step", "stp", "iges", "igs", "zip", "jpg", "jpeg", "png", "xlsx", "csv"]);

/** Inspect the ZIP directory without extracting user-controlled paths. */
function zipDirectory(bytes: Buffer) {
  let end = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
    if (bytes.readUInt32LE(i) === 0x06054b50 && i + 22 + bytes.readUInt16LE(i + 20) === bytes.length) { end = i; break; }
  }
  if (end < 0 || bytes.readUInt16LE(end + 4) || bytes.readUInt16LE(end + 6)) throw new Error("Use a standard, unencrypted ZIP or XLSX file.");
  const count = bytes.readUInt16LE(end + 10);
  let offset = bytes.readUInt32LE(end + 16);
  const directoryEnd = offset + bytes.readUInt32LE(end + 12);
  if (!count || count > 2000 || directoryEnd !== end || bytes.readUInt16LE(end + 8) !== count) throw new Error("Invalid or unsupported ZIP directory.");
  const entries = new Map<string, { offset: number; size: number; packed: number; method: number }>();
  let total = 0;
  for (let i = 0; i < count; i++) {
    if (offset + 46 > end || bytes.readUInt32LE(offset) !== 0x02014b50) throw new Error("Invalid ZIP entry.");
    const flags = bytes.readUInt16LE(offset + 8), method = bytes.readUInt16LE(offset + 10);
    const packed = bytes.readUInt32LE(offset + 20), size = bytes.readUInt32LE(offset + 24);
    const nameLength = bytes.readUInt16LE(offset + 28);
    const next = offset + 46 + nameLength + bytes.readUInt16LE(offset + 30) + bytes.readUInt16LE(offset + 32);
    const local = bytes.readUInt32LE(offset + 42);
    if (next > end || local + 30 > bytes.length || bytes.readUInt32LE(local) !== 0x04034b50 || flags & 1 || ![0, 8].includes(method)) throw new Error("Use a standard, unencrypted ZIP or XLSX file.");
    const name = bytes.subarray(offset + 46, offset + 46 + nameLength).toString("utf8");
    if (!name || entries.has(name) || /(^\/|\\|(^|\/)\.\.(\/|$)|\0)/.test(name)) throw new Error("Invalid ZIP filename.");
    const start = local + 30 + bytes.readUInt16LE(local + 26) + bytes.readUInt16LE(local + 28);
    if (start + packed > bytes.readUInt32LE(end + 16)) throw new Error("Invalid ZIP content range.");
    total += size;
    if (total > 64 * 1024 * 1024) throw new Error("The uncompressed archive exceeds 64 MB. Please reduce the bundle.");
    entries.set(name, { offset: start, size, packed, method });
    offset = next;
  }
  if (offset !== directoryEnd) throw new Error("Invalid ZIP directory size.");
  return entries;
}

/** New spreadsheet formats are checked by content, never by browser MIME alone. */
export function validateContactAttachment(name: string, bytes: Buffer): void {
  const extension = name.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_ATTACHMENT_EXTENSIONS.has(extension)) throw new Error("Unsupported attachment type. Please send PDF, DWG, DXF, STEP, IGES, XLSX, CSV, ZIP, JPG, or PNG.");
  if (!bytes.length || bytes.length > MAX_ATTACHMENT_BYTES) throw new Error("The attachment must be non-empty and no larger than 4 MB.");
  if (extension === "csv") {
    let text: string;
    try { text = new TextDecoder("utf-8", { fatal: true }).decode(bytes); } catch { throw new Error("Save the CSV as UTF-8 text and try again."); }
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text) || /^\s*</.test(text) || !text.trim() || !/[,;\t]/.test(text)) throw new Error("The CSV must contain UTF-8 delimited text, not binary or HTML content.");
  }
  if (extension === "zip" || extension === "xlsx") {
    const entries = zipDirectory(bytes);
    if (extension === "xlsx") {
      if ([...entries.keys()].some(key => /vbaProject\.bin$/i.test(key))) throw new Error("Please send a macro-free XLSX workbook.");
      for (const [key, marker] of [["[Content_Types].xml", /<Types[\s>]/], ["xl/workbook.xml", /<workbook[\s>]/]] as const) {
        const entry = entries.get(key);
        if (!entry || entry.size > 2 * 1024 * 1024) throw new Error("The attachment is not a supported XLSX workbook.");
        const packed = bytes.subarray(entry.offset, entry.offset + entry.packed);
        const content = entry.method === 0 ? packed : inflateRawSync(packed, { maxOutputLength: 2 * 1024 * 1024 });
        if (content.length !== entry.size || !marker.test(content.toString("utf8"))) throw new Error("The XLSX workbook content is invalid.");
      }
      if (![...entries.keys()].some(key => /^xl\/worksheets\/[^/]+\.xml$/.test(key))) throw new Error("The XLSX workbook has no worksheet.");
    }
  }
}
