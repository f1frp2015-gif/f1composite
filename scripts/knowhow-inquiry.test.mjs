import test from 'node:test';
import assert from 'node:assert/strict';
import { loadProjectModule } from './load-project-module.mjs';
const { buildKnowHowMessage, buildKnowHowRfqHref } = loadProjectModule('lib/knowhowInquiry.ts');
const empty = { goal: 'new-line', moduleIds: [], product: '', situation: '', destination: '' };

test('a prospect can request scope review without knowing the equipment yet', () => {
  const message = buildKnowHowMessage(empty);
  assert.match(message, /Objective: Start a new production line/);
  assert.match(message, /Support modules: Please help define the scope/);
  assert.match(message, /Product \/ output target: To discuss/);
});

test('scope modules are deduplicated and unknown query values do not become quoted services', () => {
  const message = buildKnowHowMessage({ ...empty, moduleIds: ['injection', 'tooling', 'tooling', 'invented'] });
  assert.match(message, /Support modules: Dies, mandrels & fixtures; Mixing, metering & injection/);
  assert.doesNotMatch(message, /invented/);
  assert.equal(message.split('Dies, mandrels & fixtures').length, 2);
});

test('contact handoff preserves multiline scope and special characters with attribution', () => {
  const brief = { ...empty, goal: 'upgrade', moduleIds: ['preforming', 'materials'], product: 'Tube A&B + sample', situation: 'Line 1\nDry fiber near die entry', destination: 'España / EU' };
  const url = new URL(buildKnowHowRfqHref(brief), 'https://www.f1composite.com');
  assert.equal(url.pathname, '/contact');
  assert.equal(url.searchParams.get('source'), 'knowhow-project-brief');
  assert.equal(url.searchParams.get('product_path'), '/technology/knowhow-services');
  assert.equal(url.searchParams.get('message'), buildKnowHowMessage(brief));
  assert.match(url.searchParams.get('message'), /Tube A&B \+ sample/);
  assert.match(url.searchParams.get('message'), /Line 1\nDry fiber/);
  assert.equal(url.searchParams.get('inquiry_type'), 'rfq');
});

test('brief text remains bounded and an unsupported goal falls back to scope review', () => {
  const message = buildKnowHowMessage({ ...empty, goal: 'invalid', product: 'p'.repeat(2000), situation: 's'.repeat(3000), destination: 'd'.repeat(1000) });
  assert.match(message, /Objective: Confirm the project scope/);
  assert.ok(message.length < 1200);
  assert.doesNotMatch(message, /p{161}|s{321}|d{101}/);
});
