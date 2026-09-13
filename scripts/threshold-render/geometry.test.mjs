import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { sections, buildGeometry } from './geometry.mjs';

for (const section of sections) {
  test(`${section.id}: identical ends, watertight walls and unobstructed through chambers`, () => {
    const geometry = buildGeometry(section);
    const positions = geometry.getAttribute('position');
    const front = new Set(), back = new Set(), edges = new Map();
    const vertex = i => [positions.getX(i), positions.getY(i), positions.getZ(i)].map(n => n.toFixed(4)).join(',');
    for (let i = 0; i < positions.count; i++) {
      const z = positions.getZ(i);
      assert.ok(z === -90 || z === 90, 'No shortened or intermediate geometry');
      (z === 90 ? front : back).add(`${positions.getX(i)},${positions.getY(i)}`);
    }
    assert.deepEqual(front, back, 'Both ends have the same complete section');
    for (let i = 0; i < positions.count; i += 3) {
      for (const [a, b] of [[i, i + 1], [i + 1, i + 2], [i + 2, i]]) {
        const key = [vertex(a), vertex(b)].sort().join('|');
        edges.set(key, (edges.get(key) || 0) + 1);
      }
    }
    assert.ok([...edges.values()].every(count => count === 2), 'Every mesh edge joins exactly two faces');
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
    mesh.updateMatrixWorld();
    const shoot = (x, y) => new THREE.Raycaster(new THREE.Vector3(x - 60, y, 120), new THREE.Vector3(0, 0, -1), 0, 240).intersectObject(mesh);
    assert.equal(shoot(45, 28).length, 0, 'Left chamber is open through the entire profile');
    assert.equal(shoot(99, 37).length, 0, 'Right chamber is open through the entire profile');
    assert.ok(shoot(118, 30).length >= 2, 'Outer wall has material at both ends');
    assert.equal(shoot(50, 3).length === 0, section.hook, 'Hook remains open; closed base retains its bottom wall');
    geometry.dispose();
    mesh.material.dispose();
  });
}
