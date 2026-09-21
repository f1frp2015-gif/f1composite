import assert from 'node:assert/strict';
import test from 'node:test';
import { loadProjectModule } from './load-project-module.mjs';
const p = loadProjectModule('lib/gratingProject.ts');
test('catalog has all 62 distinct specifications', () => {
 assert.equal(p.gratingCatalog.length,62);
 assert.equal(new Set(p.gratingCatalog.map(s=>s.id)).size,62);
 assert.equal(p.gratingCatalog.filter(s=>s.family==='molded').length,26);
});
test('multi-line RFQ preserves exact specifications, units, directions and unknowns', () => {
 const project=p.emptyProject(); project.fields.destination='New Zealand';
 project.lines=p.gratingCatalog.map((s,i)=>({key:String(i),spec:s.id,mark:`P${i}`,length:'48',width:'24',quantity:'2',unit:'in',direction:'Along length',notes:'Opening per drawing A'}));
 const summary=p.projectSummary(project);
 for(const s of p.gratingCatalog) assert.ok(summary.includes(s.specification));
 assert.match(summary,/48 × 24 in; quantity: 2 panels/); assert.match(summary,/Along length/); assert.match(summary,/New Zealand/); assert.match(summary,/To confirm/);
});
test('area converts units and rejects partial, invalid or fractional panel counts',()=>{
 const row={length:'1000',width:'1000',quantity:'2',unit:'mm'};
 assert.equal(p.panelArea(row),2);
 assert.ok(Math.abs(p.panelArea({...row,length:'48',width:'24',unit:'in'})-1.48644864)<1e-8);
 for(const quantity of ['', '-1','0','1.5','Infinity']) assert.equal(p.panelArea({...row,quantity}),null);
});
test('draft restoration rejects corrupt versions and unknown specs, preserves editable fields',()=>{
 assert.deepEqual(p.readProject('{broken'),p.emptyProject());
 assert.deepEqual(p.readProject('{"version":2}'),p.emptyProject());
 const project=p.emptyProject(); project.fields.loads='5 kPa; 1000 mm clear span';
 project.lines=[{key:'a',spec:p.gratingCatalog[0].id,mark:'P01',length:'800',width:'600',quantity:'4',unit:'mm',direction:'Per drawing',notes:'Cutout'}, {key:'bad',spec:'invented'}];
 const restored=p.readProject(JSON.stringify(project)); assert.equal(restored.lines.length,1);assert.equal(restored.fields.loads,project.fields.loads); assert.deepEqual(restored.lines[0],project.lines[0]);
});
