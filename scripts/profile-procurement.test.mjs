import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { loadProjectModule } from './load-project-module.mjs';

const { buildPublishedCatalog } = loadProjectModule('lib/catalog/published.ts');
const { profileProcurementPack, resolveProcurementSelection, procurementRfqContext, firstArticleTemplatePath } = loadProjectModule('lib/catalog/procurement.ts');
const { catalogEvidenceHref } = loadProjectModule('lib/catalog/identity.ts');
const { catalogPublicPayload } = loadProjectModule('lib/catalog/publicPayload.ts');
const { buildPublicKnowledge } = loadProjectModule('lib/publicKnowledge.ts');
const { selectDatasheetConfigurations } = loadProjectModule('lib/catalog/datasheetSelection.ts');
const { buildRfqHref, parseRfqFragment } = loadProjectModule('lib/rfq.ts');
const ConfigurationReview = loadProjectModule('components/downloads/ConfigurationReview.tsx').default;
const catalog = buildPublishedCatalog();
const paramsFor = profile => Object.fromEntries(new URL(catalogEvidenceHref(profile.configuration, profile.category.slug), 'https://example.test').searchParams);

for (const family of ['round-tube', 'square-tube']) test(`${family} documents preserve exact identity through review, PDF, RFQ and AI snapshot`, () => {
  const profiles = catalog.profiles.filter(profile => profile.category.slug === family);
  assert.ok(profiles.length > 0);
  const api = catalogPublicPayload(catalog);
  assert.deepEqual(buildPublicKnowledge(catalog).catalogDiscovery.snapshot, api);
  for (const profile of profiles) {
    const selected = resolveProcurementSelection(catalog, paramsFor(profile));
    assert.equal(selected.status, 'selected');
    assert.deepEqual(selected.configuration, profile.configuration);
    const [pdf] = selectDatasheetConfigurations(catalog, new URL(selected.pack.datasheet.pdf, 'https://example.test').searchParams);
    assert.deepEqual(pdf.configuration, selected.configuration);
    const context = procurementRfqContext(selected.pack);
    const href = buildRfqHref({ source: 'configuration-evidence', context });
    const parsed = parseRfqFragment(new URL(href, 'https://example.test').hash);
    assert.deepEqual(parsed.context.catalogSelections[0].dimensionsMm, profile.configuration.dimensionsMm);
    assert.equal(parsed.context.catalogSelections[0].catalogKey, profile.catalogKey);
    assert.equal(parsed.context.catalogSelections[0].catalogRevision, catalog.revision);
    assert.equal(parsed.context.procurementReview.approvedDrawingRevision, null);
    assert.equal(parsed.context.procurementReview.firstArticleStatus, 'not-published');
    assert.equal(api.products.find(item => item.key === profile.catalogKey).procurement.reviewUrl, selected.pack.evidencePage);
    assert.notEqual(selected.configuration.evidence.status, 'direct-match');
  }
});

test('stale, unknown, conflicting, duplicated and inactive selections cannot silently substitute another profile', () => {
  const profile = catalog.profiles.find(item => item.category.slug === 'round-tube');
  const base = paramsFor(profile);
  for (const patch of [{ profile: 'unknown' }, { category: 'square-tube' }, { section: 'f1-rt-999' }, { formulation: 'UNKNOWN' }, { formulation: '' }, { profile: [profile.catalogKey, 'other'] }]) {
    assert.equal(resolveProcurementSelection(catalog, { ...base, ...patch }).status, 'invalid');
  }
  assert.equal(resolveProcurementSelection(catalog, { ...base, revision: 'outdated' }).status, 'stale');
  const missing = { ...catalog, profiles: catalog.profiles.filter(item => item.catalogKey !== profile.catalogKey) };
  assert.equal(resolveProcurementSelection(missing, base).status, 'invalid');
  assert.equal(resolveProcurementSelection(catalog, { category: 'round-tube' }).status, 'family');
  const legacy = resolveProcurementSelection(catalog, { category: 'round-tube', section: profile.sectionId, formulation: 'E23-ISO' });
  assert.equal(legacy.status, 'selected');
  assert.equal(legacy.profile.catalogKey, profile.catalogKey);
});

test('alternative formulation has explicitly scoped PDF and no inherited default mass or certificate', () => {
  const profile = catalog.profiles.find(item => item.category.slug === 'round-tube');
  const selected = resolveProcurementSelection(catalog, { ...paramsFor(profile), formulation: 'VE-E23' });
  assert.equal(selected.status, 'selected');
  assert.equal(selected.configuration.publishedMassKgPerM, null);
  assert.equal(selected.configuration.evidence.status, 'needs-review');
  assert.deepEqual(selected.configuration.evidence.matchedEvidenceIds, []);
  const [pdf] = selectDatasheetConfigurations(catalog, new URL(selected.pack.datasheet.pdf, 'https://example.test').searchParams);
  assert.equal(pdf.configuration.formulationCode, 'VE-E23');
  const html = renderToStaticMarkup(React.createElement(ConfigurationReview, { selection: selected, catalog, category: 'round-tube' }));
  assert.match(html, /HTML datasheet shows the profile/);
  assert.match(html, /default material dataset/);
});

test('changed geometry cannot inherit a nominal DXF by its old slug', () => {
  const profile = catalog.profiles.find(item => item.category.slug === 'round-tube');
  assert.ok(profileProcurementPack(profile).drawing.href);
  const changed = { ...profile, product: { ...profile.product, geometry: { ...profile.product.geometry, dims: { OD: 26, t: 3 } } } };
  assert.equal(profileProcurementPack(changed).drawing.href, null);
});

test('selected server HTML keeps revision and draws one truthful review path; invalid link has no quote or evidence award', () => {
  const profile = catalog.profiles.find(item => item.category.slug === 'square-tube');
  const selection = resolveProcurementSelection(catalog, paramsFor(profile));
  const html = renderToStaticMarkup(React.createElement(ConfigurationReview, { selection, catalog, category: 'square-tube' }));
  assert.ok(html.includes(profile.catalogKey));
  assert.ok(html.includes(catalog.revision));
  assert.match(html, /No public test report currently binds/);
  const links = [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&'));
  const href = links.find(link => link.startsWith('/contact?') && link.includes('#context='));
  assert.ok(href);
  const rfq = parseRfqFragment(new URL(href, 'https://example.test').hash);
  assert.equal(rfq.context.catalogSelections[0].catalogKey, profile.catalogKey);
  assert.equal(rfq.context.procurementReview.firstArticleStatus, 'not-published');
  const invalidHtml = renderToStaticMarkup(React.createElement(ConfigurationReview, { selection: { status: 'invalid', message: 'Unknown profile' }, catalog, category: 'square-tube' }));
  assert.ok(!invalidHtml.includes('source=configuration-evidence'));
  assert.match(invalidHtml, /role="alert"/);
});

test('blank inspection CSV contains no filled results or release signatures', () => {
  assert.ok(existsSync(`public${firstArticleTemplatePath}`));
  const csv = readFileSync(`public${firstArticleTemplatePath}`, 'utf8');
  assert.match(csv, /BLANK - NOT INSPECTED/);
  assert.match(csv, /measurement_uncertainty,measured_result,visual_observation,disposition/);
  assert.ok(csv.trimEnd().endsWith(','.repeat(29)));
});

test('published profile without default material remains reviewable without substituting a formulation', () => {
  const profile = catalog.profiles.find(item => item.category.slug === 'round-tube');
  const blank = { ...profile, formulation: null };
  const fixture = { ...catalog, profiles: [blank] };
  const result = resolveProcurementSelection(fixture, { category: 'round-tube', profile: profile.catalogKey, formulation: 'default' });
  assert.equal(result.status, 'selected');
  assert.equal(result.configuration.formulationCode, null);
  assert.equal(result.configuration.evidence.status, 'needs-review');
  const [pdf] = selectDatasheetConfigurations(fixture, new URL(result.pack.datasheet.pdf, 'https://example.test').searchParams);
  assert.equal(pdf.configuration.formulationCode, null);
});

test('material selector preserves a viewed alternative and per-report RFQs retain square-tube identity', () => {
  const profile = catalog.profiles.find(item => item.category.slug === 'square-tube');
  const selection = resolveProcurementSelection(catalog, { ...paramsFor(profile), formulation: 'VE-E23' });
  const html = renderToStaticMarkup(React.createElement(ConfigurationReview, { selection, catalog, category: 'square-tube' }));
  assert.match(html, /<option value="VE-E23" selected="">/);
  const Explorer = loadProjectModule('components/downloads/EvidenceExplorer.tsx').default;
  const reports = renderToStaticMarkup(React.createElement(Explorer, { target: { categorySlug: 'square-tube', sectionId: null, formulationCode: 'VE-E23' }, configuration: selection.configuration, asOf: '2026-10-11' }));
  const links = [...reports.matchAll(/href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&')).filter(link => link.startsWith('/contact?'));
  assert.equal(links.length, 13);
  for (const href of links) {
    const context = parseRfqFragment(new URL(href, 'https://example.test').hash).context;
    assert.equal(context.catalogSelections[0].catalogKey, profile.catalogKey);
    assert.equal(context.catalogSelections[0].formulationCode, 'VE-E23');
    assert.equal(context.evidenceRequest.catalogRevision, catalog.revision);
  }
});
