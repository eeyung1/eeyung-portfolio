export type NetworkNode = { x: number; y: number; vx: number; vy: number; radius: number };

/** A bounded viewport-sized field; phones render fewer nodes, never a tall page canvas. */
export function createNetwork(width: number, height: number, random = Math.random): NetworkNode[] {
  const limit = width < 761 ? 32 : 90;
  const count = Math.min(limit, Math.max(18, Math.floor(width * height / 12500)));
  return Array.from({ length: count }, () => ({
    x: random() * width, y: random() * height,
    vx: (random() - .5) * 16, vy: (random() - .5) * 16,
    radius: 1.2 + random() * 1.7,
  }));
}

export function advanceNetwork(nodes: NetworkNode[], width: number, height: number, seconds: number) {
  const delta = Math.max(0, Math.min(seconds, .05));
  for (const node of nodes) {
    node.x += node.vx * delta;
    node.y += node.vy * delta;
    if (node.x < 0 || node.x > width) { node.vx *= -1; node.x = Math.max(0, Math.min(width, node.x)); }
    if (node.y < 0 || node.y > height) { node.vy *= -1; node.y = Math.max(0, Math.min(height, node.y)); }
  }
}

/** Distance-faded local edges create branches and small constellations. */
export function networkEdges(nodes: NetworkNode[], reach: number) {
  const edges: { from: number; to: number; opacity: number }[] = [];
  const degree = new Uint8Array(nodes.length);
  for (let from = 0; from < nodes.length; from++) {
    for (let to = from + 1; to < nodes.length; to++) {
      if (degree[from] >= 4 || degree[to] >= 4) continue;
      const distance = Math.hypot(nodes[from].x - nodes[to].x, nodes[from].y - nodes[to].y);
      if (distance < reach) {
        edges.push({ from, to, opacity: 1 - distance / reach });
        degree[from]++; degree[to]++;
      }
    }
  }
  return edges;
}
