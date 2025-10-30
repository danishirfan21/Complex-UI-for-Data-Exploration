import type { Node, Cluster } from '../types/network';

/**
 * Simple k-means clustering algorithm for network nodes
 * Groups nodes based on their spatial position in the force-directed layout
 */
export function kMeansClustering(nodes: Node[], k: number = 5): Cluster[] {
  if (nodes.length === 0) return [];

  // Filter nodes that have position data
  const positionedNodes = nodes.filter((n) => n.x !== undefined && n.y !== undefined);
  if (positionedNodes.length < k) {
    k = Math.max(1, positionedNodes.length);
  }

  // Initialize centroids randomly from existing nodes
  let centroids = positionedNodes
    .sort(() => Math.random() - 0.5)
    .slice(0, k)
    .map((n, i) => ({ id: i, x: n.x!, y: n.y! }));

  let assignments: number[] = new Array(positionedNodes.length).fill(0);
  let changed = true;
  let iterations = 0;
  const maxIterations = 100;

  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;

    // Assignment step: assign each node to nearest centroid
    positionedNodes.forEach((node, i) => {
      const distances = centroids.map((c) =>
        Math.sqrt(Math.pow(node.x! - c.x, 2) + Math.pow(node.y! - c.y, 2))
      );
      const nearestCentroid = distances.indexOf(Math.min(...distances));

      if (assignments[i] !== nearestCentroid) {
        assignments[i] = nearestCentroid;
        changed = true;
      }
    });

    // Update step: recalculate centroids
    centroids = centroids.map((_, clusterId) => {
      const clusterNodes = positionedNodes.filter((_, i) => assignments[i] === clusterId);

      if (clusterNodes.length === 0) {
        return centroids[clusterId];
      }

      const avgX = clusterNodes.reduce((sum, n) => sum + n.x!, 0) / clusterNodes.length;
      const avgY = clusterNodes.reduce((sum, n) => sum + n.y!, 0) / clusterNodes.length;

      return { id: clusterId, x: avgX, y: avgY };
    });
  }

  // Build cluster objects
  const clusters: Cluster[] = centroids.map((centroid) => {
    const clusterNodes = positionedNodes.filter((_, i) => assignments[i] === centroid.id);

    // Determine dominant category for this cluster
    const categoryCount: Record<string, number> = {};
    clusterNodes.forEach((node) => {
      categoryCount[node.category] = (categoryCount[node.category] || 0) + 1;
    });

    const dominantCategory = Object.entries(categoryCount).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0] || 'Mixed';

    return {
      id: centroid.id,
      nodes: clusterNodes,
      centroid: { x: centroid.x, y: centroid.y },
      category: dominantCategory,
      size: clusterNodes.length,
    };
  });

  return clusters.filter((c) => c.size > 0);
}

/**
 * Calculate clustering coefficient for a node
 * Measures how tightly connected a node's neighbors are
 */
export function calculateClusteringCoefficient(
  nodeId: string,
  _nodes: Node[],
  links: { source: string | Node; target: string | Node }[]
): number {
  // Find neighbors
  const neighbors = new Set<string>();
  links.forEach((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;

    if (sourceId === nodeId) neighbors.add(targetId);
    if (targetId === nodeId) neighbors.add(sourceId);
  });

  const k = neighbors.size;
  if (k < 2) return 0;

  // Count links between neighbors
  let neighborLinks = 0;
  const neighborArray = Array.from(neighbors);

  for (let i = 0; i < neighborArray.length; i++) {
    for (let j = i + 1; j < neighborArray.length; j++) {
      const hasLink = links.some((link) => {
        const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
        const targetId = typeof link.target === 'string' ? link.target : link.target.id;

        return (
          (sourceId === neighborArray[i] && targetId === neighborArray[j]) ||
          (sourceId === neighborArray[j] && targetId === neighborArray[i])
        );
      });

      if (hasLink) neighborLinks++;
    }
  }

  const maxPossibleLinks = (k * (k - 1)) / 2;
  return neighborLinks / maxPossibleLinks;
}
