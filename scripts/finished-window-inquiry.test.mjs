import test from "node:test";
import assert from "node:assert/strict";
import { loadProjectModule } from "./load-project-module.mjs";
const { FINISHED_WINDOW_SERIES, PROFILE_WINDOW_SERIES, WINDOW_OPTION_LABELS, windowSeriesOptions, buildWindowRfqHref, windowInquiryFromSearchParams, parseWindowInquiry, windowInquirySummary } = loadProjectModule("lib/windowInquiry.ts");
const { default: WindowInquiryFields } = loadProjectModule("components/WindowInquiryFields.tsx");
function nodes(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(nodes);
  return [node, ...nodes(node.props?.children)];
}
for (const series of FINISHED_WINDOW_SERIES) test(`${series}: link, prefill, hidden submission and readable review preserve selected product`, () => {
  const url = new URL(buildWindowRfqHref({ mode: "finished", series, stage: "quote" }), "https://example.com");
  const prefill = windowInquiryFromSearchParams(url.searchParams);
  assert.equal(prefill.series, series);
  const rendered = nodes(WindowInquiryFields({ value: prefill, onChange() {} }));
  const hidden = rendered.find(node => node.props?.name === "window_inquiry");
  const formData = new FormData();
  formData.set("window_inquiry", hidden.props.value);
  const accepted = parseWindowInquiry(JSON.parse(formData.get("window_inquiry")));
  assert.equal(accepted.series, series);
  assert.ok(windowInquirySummary(accepted).includes(`System series: ${WINDOW_OPTION_LABELS[series]}`));
  const select = rendered.find(node => node.type === "select" && node.props.value === series);
  assert.ok(nodes(select).some(node => node.type === "option" && node.props.value === series));
});
test("finished and legacy 65 have distinct identity; all nine legacy links remain accepted", () => {
  assert.equal(PROFILE_WINDOW_SERIES.length, 9);
  assert.equal(FINISHED_WINDOW_SERIES.length, 11);
  for (const series of PROFILE_WINDOW_SERIES) for (const mode of ["profiles", "finished"]) {
    const url = new URL(buildWindowRfqHref({ mode, series }), "https://example.com");
    assert.equal(parseWindowInquiry(windowInquiryFromSearchParams(url.searchParams)).series, series);
  }
  assert.notEqual(buildWindowRfqHref({ mode: "finished", series: "65" }), buildWindowRfqHref({ mode: "finished", series: "pu-65" }));
  assert.notEqual(windowInquirySummary({ mode: "finished", series: "65" }), windowInquirySummary({ mode: "finished", series: "pu-65" }));
});
test("finished IDs cannot enter profile links, prefill, validation, review or dropdown", () => {
  for (const series of FINISHED_WINDOW_SERIES) {
    assert.ok(!windowSeriesOptions("profiles").includes(series));
    assert.throws(() => parseWindowInquiry({ mode: "profiles", series }));
    const url = new URL(buildWindowRfqHref({ mode: "profiles", series }), "https://example.com");
    assert.equal(url.searchParams.get("window_series"), null);
    url.searchParams.set("window_series", series);
    assert.equal(windowInquiryFromSearchParams(url.searchParams).series, undefined);
    assert.ok(!windowInquirySummary({ mode: "profiles", series }).includes(WINDOW_OPTION_LABELS[series]));
  }
  const options = nodes(WindowInquiryFields({ value: { mode: "profiles" }, onChange() {} })).filter(node => node.type === "option").map(node => node.props.value);
  assert.ok(!options.some(value => FINISHED_WINDOW_SERIES.includes(value)));
});
test("switching modes clears incompatible selection and preserves shared requirements", () => {
  let changed;
  const rendered = nodes(WindowInquiryFields({ value: { mode: "finished", series: "pu-65", city: "Project city" }, onChange(value) { changed = value; } }));
  const radio = rendered.find(node => node.props?.name === "window_mode_ui" && !node.props.checked);
  radio.props.onChange();
  assert.deepEqual(changed, { mode: "profiles", city: "Project city" });
  const rerendered = nodes(WindowInquiryFields({ value: changed, onChange() {} }));
  assert.equal(JSON.parse(rerendered.find(node => node.props?.name === "window_inquiry").props.value).series, undefined);
});
test("new series analytics only emit eligible identifiers and exclude arbitrary fields", () => {
  const { trackInquirySuccess } = loadProjectModule("lib/analytics.ts");
  const original = globalThis.window;
  const events = [];
  globalThis.window = { location: { pathname: "/contact" }, gtag: (...args) => events.push(args) };
  try {
    for (const series of FINISHED_WINDOW_SERIES) {
      trackInquirySuccess(`new-${series}`, "window-series", "", "general", { mode: "finished", series, email: "private@example.com", schedule: "private schedule" });
      assert.equal(events.at(-1)[2].window_series, series);
    }
    trackInquirySuccess("invalid-profile-pu", "window-series", "", "general", { mode: "profiles", series: "pu-65" });
    assert.equal(events.at(-1)[2].window_series, undefined);
    assert.ok(!JSON.stringify(events).includes("private"));
  } finally { globalThis.window = original; }
});
