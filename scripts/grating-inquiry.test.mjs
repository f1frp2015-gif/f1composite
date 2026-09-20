import assert from 'node:assert/strict';
import test from 'node:test';
import { loadProjectModule } from './load-project-module.mjs';
const inquiry = loadProjectModule('lib/gratingInquiry.ts');
const molded = loadProjectModule('content/data/moldedGratingSpecs.ts').moldedGratingSpecGroups;
const pultruded = loadProjectModule('content/data/pultrudedGratingSpecs.ts').pultrudedGratingSpecGroups;
const { GET } = loadProjectModule('app/api/grating-specifications/route.ts');

for (const family of ['molded', 'pultruded']) {
  test(`${family}: every current configuration preserves its exact specification and product through the RFQ URL`, () => {
    const selections = family === 'molded'
      ? molded.flatMap(group => group.rows.map(row => inquiry.moldedGratingSelection(group.mesh, row)))
      : pultruded.flatMap(group => group.rows.map(inquiry.pultrudedGratingSelection));
    assert.equal(selections.length, family === 'molded' ? 26 : 36);
    assert.equal(new Set(selections).size, selections.length, 'similar depths must retain differentiating bar dimensions');
    for (const selection of selections) {
      const url = new URL(inquiry.gratingInquiryHref(family, selection, 'grating-spec-row'), 'https://www.f1composite.com');
      assert.equal(url.pathname, '/contact');
      assert.equal(url.searchParams.get('product'), inquiry.gratingProducts[family].name);
      assert.equal(url.searchParams.get('product_path'), inquiry.gratingProducts[family].path);
      assert.equal(url.searchParams.get('specification'), selection);
      assert.equal(url.searchParams.get('source'), 'grating-spec-row');
      assert.equal(url.searchParams.get('inquiry_type'), 'rfq');
      assert.ok(url.searchParams.get('message').includes(selection));
      assert.ok(selection.includes('kg/m²'));
    }
  });
  test(`${family}: downloadable CSV contains every website row with unchanged fields`, async () => {
    const response = GET(new Request(`https://www.f1composite.com/api/grating-specifications?family=${family}`));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'text/csv; charset=utf-8');
    assert.equal(response.headers.get('x-robots-tag'), 'noindex');
    assert.match(response.headers.get('content-disposition'), new RegExp(`f1-${family}-grating-selection.csv`));
    const csv = await response.text();
    const expected = family === 'molded'
      ? molded.flatMap(group => group.rows.map(row => [group.mesh, row.depth, row.barThickness, row.panelSizes, row.weight, row.openArea]))
      : pultruded.flatMap(group => group.rows.map(row => [group.name, row.type, row.depth, row.bearingBarCenter, row.crossBarCenter, row.weight, row.openArea]));
    for (const row of expected) assert.ok(csv.includes(row.map(cell => `"${cell.replaceAll('"', '""')}"`).join(',')));
    assert.equal(csv.trim().split('\r\n').length, expected.length + 5);
    assert.match(csv, /not a load table/);
  });
}
test('CSV rejects missing, unknown and header-injection family inputs', () => {
  for (const family of ['', 'steel', 'molded%0D%0AX-Bad:1']) {
    assert.equal(GET(new Request(`https://www.f1composite.com/api/grating-specifications?family=${family}`)).status, 400);
  }
});
