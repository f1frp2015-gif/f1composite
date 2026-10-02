import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface PublishedFileFacts {
  bytes: number;
  sha256: string;
  /** The file contains a PDF signature dictionary (every one carries /ByteRange). */
  digitallySigned: boolean;
}

/**
 * Size, SHA-256 and signature presence of a file under /public. Pages read it
 * at build time, so the published values always describe the deployed copy.
 */
export function publishedFileFacts(publicPath: string): PublishedFileFacts {
  const buffer = readFileSync(join(process.cwd(), "public", publicPath));
  return {
    bytes: buffer.length,
    sha256: createHash("sha256").update(buffer).digest("hex"),
    digitallySigned: buffer.includes("/ByteRange"),
  };
}

export function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}
