import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { loadProjectModule } from "./load-project-module.mjs";

const analytics = loadProjectModule("lib/analytics.ts");
const consent = loadProjectModule("lib/consent.ts");
const nativeRequire = createRequire(import.meta.url);

function browser(t, choice = { analytics: true, ads: false }) {
  const previous = globalThis.window;
  const calls = [];
  const store = new Map();
  globalThis.window = {
    location: new URL("https://www.f1composite.com/tools/profile-finder?email=private%40buyer.test#context=private-drawing"),
    localStorage: { getItem: key => store.get(key) ?? null },
    history: { replaceState: (_state, _unused, href) => { window.location = new URL(href, window.location); } },
    dispatchEvent: () => {},
    gtag: (...args) => calls.push(args),
  };
  consent.setVisitConsent(choice);
  t.after(() => { globalThis.window = previous; consent.setVisitConsent(null); });
  return { calls, store };
}

// Exercise compiled JSX event handlers with deterministic hook state. Effects
// are not run: server/render/hydration must not themselves emit these events.
function componentHarness(file) {
  const state = [];
  let cursor = 0;
  const hooks = {
    useMemo: fn => fn(),
    useState: initial => {
      const index = cursor++;
      if (!(index in state)) state[index] = typeof initial === "function" ? initial() : initial;
      return [state[index], value => { state[index] = typeof value === "function" ? value(state[index]) : value; }];
    },
    useEffect: () => {},
    useRef: value => ({ current: value }),
    useSyncExternalStore: (_subscribe, snapshot) => snapshot(),
  };
  const { outputText } = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  const moduleRecord = { exports: {} };
  const require = name => {
    if (name === "react") return { ...nativeRequire("react"), ...hooks };
    if (name === "next/link") return { default: "a", __esModule: true };
    if (name.startsWith("@/components/")) return { default: () => null, __esModule: true };
    return name.startsWith("@/") ? loadProjectModule(name.slice(2)) : nativeRequire(name);
  };
  new Function("require", "module", "exports", outputText)(require, moduleRecord, moduleRecord.exports);
  return props => { cursor = 0; return moduleRecord.exports.default(props); };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== "object" || !tree.props) return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.props.children, predicate)];
}

test("procurement payloads retain only approved enums/counts and fixed page context", () => {
  const privateData = { source: "private@buyer.test", count: 2, categoryCount: 1, saving: 12345, nominal: 987.65, datum: "private-drawing", message: "private-quote", page_location: "https://bad.test/?quote=private#drawing", page_referrer: "https://bad.test/private" };
  for (const input of [
    { action: "shortlist_add", category: "tube" }, { action: "shortlist_remove", category: "shs" },
    { action: "compare" }, { action: "profile_rfq" },
    { action: "machining_rfq", feature: "Hole diameter" },
    { action: "lcc_rfq", steelType: "other" },
    { action: "lcc_scenario", corrosivity: "C4" },
    { action: "lcc_share", steelType: "galvanized", corrosivity: "C5" },
  ]) {
    const result = analytics.procurementEvent({ ...privateData, ...input });
    assert.ok(result);
    assert.doesNotMatch(JSON.stringify(result), /private|12345|987\.65|bad\.test/);
    assert.equal(new URL(result.params.page_location).search, "");
    assert.equal(new URL(result.params.page_location).hash, "");
    assert.equal(result.params.page_referrer, "");
    assert.ok(!("saving" in result.params));
  }
  assert.deepEqual(analytics.procurementEvent({ action: "lcc_share", steelType: "other", corrosivity: "stale private value" }).params, {
    steel_type: "other", source: "life-cycle-cost-calculator", page_location: "https://www.f1composite.com/tools/frp-life-cycle-cost-calculator", page_title: "FRP Life-Cycle Cost Calculator", page_referrer: "",
  });
});

test("unknown actions/enums and impossible selection counts cannot become analytics", () => {
  for (const input of [
    null, { action: "conversion" }, { action: "machining_rfq", feature: "private drawing" },
    { action: "machining_rfq", feature: "__proto__" }, { action: "machining_rfq", feature: { toString: () => "Cut length" } },
    { action: "lcc_rfq", steelType: "private" }, { action: "lcc_scenario", corrosivity: "private" },
    { action: "shortlist_add", category: "private", count: 1 },
    ...[NaN, Infinity, -1, 0, 1.5, 5, "2"].map(count => ({ action: "shortlist_add", category: "tube", count })),
    { action: "shortlist_remove", category: "tube", count: 4 },
    { action: "compare", count: 1, categoryCount: 1 },
    { action: "profile_rfq", count: 0, categoryCount: 0 },
    { action: "compare", count: 2, categoryCount: 3 },
  ]) assert.equal(analytics.procurementEvent(input), null);
});

test("explicit analytics denial suppresses procurement; consent is never granted by an event", t => {
  const { calls, store } = browser(t, { analytics: false, ads: true });
  const event = { action: "lcc_rfq", steelType: "galvanized" };
  analytics.trackProcurement(event);
  assert.equal(calls.length, 0);
  consent.setVisitConsent(null);
  store.set(consent.CONSENT_STORAGE_KEY, consent.serializeConsent({ analytics: false, ads: true }));
  analytics.trackProcurement(event);
  assert.equal(calls.length, 0);
  consent.setVisitConsent({ analytics: true, ads: false });
  analytics.trackProcurement(event);
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "event");
  assert.equal(calls[0][1], "lcc_quote_click");
  assert.ok(!calls.some(args => ["consent", "config"].includes(args[0])));
});

test("regional/unknown defaults mirror existing consent and missing tags fail quietly", t => {
  const { calls } = browser(t, null);
  const event = { action: "machining_rfq", feature: "Cut length" };
  for (const zone of ["Europe/London", undefined]) {
    const mock = t.mock.method(Intl, "DateTimeFormat", () => ({ resolvedOptions: () => ({ timeZone: zone }) }));
    analytics.trackProcurement(event);
    mock.mock.restore();
  }
  assert.equal(calls.length, 0);
  t.mock.method(Intl, "DateTimeFormat", () => ({ resolvedOptions: () => ({ timeZone: "America/Los_Angeles" }) }));
  analytics.trackProcurement(event);
  assert.equal(calls.length, 1);
  window.gtag = undefined;
  assert.doesNotThrow(() => analytics.trackProcurement(event));
  window.gtag = () => { throw new Error("tag unavailable"); };
  assert.doesNotThrow(() => analytics.trackProcurement(event));
  globalThis.window = undefined;
  assert.doesNotThrow(() => analytics.trackProcurement(event));
});

test("finder emits only actual shortlist transitions and deliberate compare/RFQ actions", t => {
  const { calls } = browser(t);
  const { buildPublishedCatalog } = loadProjectModule("lib/catalog/published.ts");
  const { finderRows } = loadProjectModule("lib/profileFinder.ts");
  const rows = finderRows(buildPublishedCatalog().profiles).slice(0, 5);
  const render = componentHarness("components/tools/ProfileFinder.tsx");
  const checkbox = (tree, row) => nodes(tree, n => n.type === "input" && n.props["aria-label"] === `Compare ${row.model}`)[0];
  let tree = render({ rows });
  render({ rows });
  assert.equal(calls.length, 0);
  for (const row of rows.slice(0, 4)) {
    checkbox(tree, row).props.onChange();
    tree = render({ rows });
  }
  assert.deepEqual(calls.map(call => call[2].selection_count), [1, 2, 3, 4]);
  assert.ok(calls.every(call => call[1] === "profile_shortlist_add"));
  assert.equal(checkbox(tree, rows[4]).props.disabled, true);
  checkbox(tree, rows[4]).props.onChange(); // Capacity guard also handles stale/programmatic events.
  assert.equal(calls.length, 4);
  nodes(tree, n => n.props.href === "#finder-compare")[0].props.onClick();
  nodes(tree, n => typeof n.props.href === "string" && n.props.href.startsWith("/contact") && n.props.onClick)[0].props.onClick();
  assert.deepEqual(calls.slice(-2).map(call => call[1]), ["profile_compare_open", "profile_rfq_handoff"]);
  checkbox(tree, rows[0]).props.onChange();
  tree = render({ rows });
  assert.equal(calls.at(-1)[1], "profile_shortlist_remove");
  assert.equal(calls.at(-1)[2].selection_count, 3);
  const before = calls.length;
  nodes(tree, n => n.type === "input" && n.props.placeholder === "From")[0].props.onChange({ target: { value: "123.456" } });
  render({ rows });
  assert.equal(calls.length, before, "typing/filter rerender must stay silent");
  assert.doesNotMatch(JSON.stringify(calls), /private|123\.456|catalog-|sectionId/);
});

test("machining typing stays silent; valid handoff reports feature but preserves detail only in RFQ", t => {
  const { calls } = browser(t);
  const render = componentHarness("components/tools/MachiningTolerancePlanner.tsx");
  let tree = render();
  nodes(tree, n => n.type === "select")[0].props.onChange({ target: { value: "Hole diameter" } });
  nodes(tree, n => n.type === "input" && n.props.maxLength === 180)[0].props.onChange({ target: { value: "private-drawing datum" } });
  nodes(tree, n => n.type === "input" && n.props.max === "100000")[0].props.onChange({ target: { value: "123.456" } });
  tree = render();
  assert.equal(calls.length, 0);
  const link = nodes(tree, n => n.props.href?.startsWith("/contact"))[0];
  const url = new URL(link.props.href, "https://www.f1composite.com");
  assert.match(decodeURIComponent(url.hash), /private-drawing/);
  link.props.onClick();
  assert.equal(calls.length, 1);
  assert.equal(calls[0][1], "machining_rfq_handoff");
  assert.equal(calls[0][2].feature, "hole_diameter");
  assert.doesNotMatch(JSON.stringify(calls), /private|123\.456|nominal|datum/);
  nodes(tree, n => n.type === "input" && n.props.max === "100000")[0].props.onChange({ target: { value: "" } });
  tree = render();
  assert.equal(nodes(tree, n => n.props.href?.startsWith("/contact")).length, 0);
  assert.equal(calls.length, 1);
});

test("LCC quote retains full private assumptions in RFQ and emits one compatible event without saving", t => {
  const { calls } = browser(t);
  const render = componentHarness("components/tools/LifeCycleCostCalculator.tsx");
  let tree = render();
  const option = nodes(tree, n => n.props.option?.label === "FRP")[0];
  assert.ok(option);
  option.props.setOption({ ...option.props.option, initial: 12345.67 });
  nodes(tree, n => n.props.id === "lcc-steel-type")[0].props.onChange({ target: { value: "other" } });
  tree = render();
  const resultNode = nodes(tree, n => typeof n.props.rfqHref === "string")[0];
  const result = resultNode.type(resultNode.props);
  assert.equal(calls.length, 0);
  const quote = nodes(result, n => n.type === "a" && n.props.href === resultNode.props.rfqHref)[0];
  assert.match(decodeURIComponent(new URL(quote.props.href, window.location).hash), /12345\.67/);
  quote.props.onClick();
  assert.equal(calls.length, 1);
  assert.equal(calls[0][1], "lcc_quote_click");
  assert.equal(calls[0][2].steel_type, "other");
  assert.doesNotMatch(JSON.stringify(calls), /12345|saving|initial|private|conversion|submit_success/);
});
