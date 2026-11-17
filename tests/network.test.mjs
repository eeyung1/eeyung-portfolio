import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync("lib/network.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports });
const { createNetwork, advanceNetwork, networkEdges } = exports;
test("density is bounded on phones and large displays", () => {
  for (const [width, height, cap] of [[390, 844, 32], [760, 2000, 32], [3840, 2160, 90]]) {
    const nodes = createNetwork(width, height);
    assert.ok(nodes.length >= 18 && nodes.length <= cap);
    assert.ok(nodes.every(n => n.x >= 0 && n.x <= width && n.y >= 0 && n.y <= height));
  }
});
test("long frame gaps are capped and particles bounce inside the viewport", () => {
  const nodes = [{ x: 99.9, y: .1, vx: 12, vy: -12, radius: 2 }];
  advanceNetwork(nodes, 100, 100, 120);
  assert.equal(nodes[0].x, 100); assert.equal(nodes[0].y, 0);
  assert.equal(nodes[0].vx, -12); assert.equal(nodes[0].vy, 12);
  advanceNetwork(nodes, 100, 100, -1);
  assert.equal(nodes[0].x, 100); assert.equal(nodes[0].y, 0);
});
test("local connections have no self edges, duplicates or more than four neighbours", () => {
  const nodes = createNetwork(390, 844, () => .5);
  const edges = networkEdges(nodes, 150);
  const keys = new Set(); const degree = new Map();
  for (const { from, to, opacity } of edges) {
    assert.ok(from < to); assert.ok(opacity > 0 && opacity <= 1);
    const key = `${from}:${to}`; assert.ok(!keys.has(key)); keys.add(key);
    for (const id of [from, to]) degree.set(id, (degree.get(id) || 0) + 1);
  }
  assert.ok(edges.length > 0); assert.ok([...degree.values()].every(n => n <= 4));
  assert.equal(networkEdges([{ x: 0, y: 0 }, { x: 500, y: 500 }], 150).length, 0);
});
