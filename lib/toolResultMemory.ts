/**
 * The latest tool result of this browser tab. A visitor who finishes a calculation
 * and then opens the contact form through a general link still sends that result.
 * Session storage only: it never leaves the tab unless the visitor submits it.
 */
export interface ToolResultMemory {
  source: string;
  summary: string;
  context: Record<string, unknown>;
  path: string;
  savedAt: number;
}

export const TOOL_RESULT_KEY = "f1c_tool_result";
export const TOOL_RESULT_MAX_AGE_MS = 2 * 60 * 60 * 1000;
const SUMMARY_MAX = 6000;
const CONTEXT_MAX = 12_000;

export function rememberToolResult(result: Omit<ToolResultMemory, "savedAt" | "path">, now = Date.now()): void {
  if (typeof window === "undefined" || !result.summary.trim()) return;
  try {
    const context = JSON.stringify(result.context).length <= CONTEXT_MAX ? result.context : {};
    window.sessionStorage.setItem(TOOL_RESULT_KEY, JSON.stringify({ source: result.source, summary: result.summary.slice(0, SUMMARY_MAX), context, path: window.location.pathname, savedAt: now }));
  } catch { /* Storage blocked: the tool's own send button still works. */ }
}

export function parseToolResult(raw: string | null, now = Date.now()): ToolResultMemory | null {
  try {
    const value: unknown = JSON.parse(raw || "null");
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const { source, summary, context, path, savedAt } = value as Record<string, unknown>;
    if (typeof source !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(source)) return null;
    if (typeof summary !== "string" || !summary.trim() || summary.length > SUMMARY_MAX) return null;
    if (typeof savedAt !== "number" || savedAt > now + 60_000 || now - savedAt > TOOL_RESULT_MAX_AGE_MS) return null;
    if (!context || typeof context !== "object" || Array.isArray(context) || JSON.stringify(context).length > CONTEXT_MAX) return null;
    return { source, summary, context: context as Record<string, unknown>, path: typeof path === "string" && /^\/[a-zA-Z0-9/_-]*$/.test(path) ? path.slice(0, 180) : "", savedAt };
  } catch { return null; }
}

export function recallToolResult(): ToolResultMemory | null {
  if (typeof window === "undefined") return null;
  try { return parseToolResult(window.sessionStorage.getItem(TOOL_RESULT_KEY)); } catch { return null; }
}

export function forgetToolResult(): void {
  try { window.sessionStorage.removeItem(TOOL_RESULT_KEY); } catch { /* Storage blocked. */ }
}
