import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useNetworkStore } from '../store/networkStore';
import type { Node, Link } from '../types/network';

const CATEGORY_COLORS: Record<string, string> = {
  'Computer Science': '#3b82f6', // blue
  'Biology': '#10b981', // green
  'Physics': '#8b5cf6', // purple
  'Mathematics': '#f59e0b', // amber
  'Chemistry': '#ec4899', // pink
};

export const NetworkGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const {
    filteredData,
    selectedNode,
    hoveredNode,
    setSelectedNode,
    setHoveredNode,
    showClusters,
    clusters,
  } = useNetworkStore();

  // Handle resize
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !filteredData) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    // Clear previous content
    svg.selectAll('*').remove();

    // Create container group for zoom/pan
    const g = svg.append('g');

    // Setup zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create a copy of the data for D3 to mutate
    const nodes: Node[] = filteredData.nodes.map((d) => ({ ...d }));
    const links: Link[] = filteredData.links.map((d) => ({
      ...d,
      source: typeof d.source === 'string' ? d.source : d.source.id,
      target: typeof d.target === 'string' ? d.target : d.target.id,
    }));

    // Create force simulation
    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        'link',
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance((d) => 100 - d.strength * 5) // Stronger connections = shorter distance
          .strength((d) => d.strength / 10)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // Draw cluster backgrounds if enabled
    if (showClusters && clusters.length > 0) {
      g
        .selectAll('.cluster-background')
        .data(clusters)
        .join('circle')
        .attr('class', 'cluster-background')
        .attr('cx', (d) => d.centroid.x)
        .attr('cy', (d) => d.centroid.y)
        .attr('r', (d) => Math.sqrt(d.size) * 20)
        .attr('fill', (d) => CATEGORY_COLORS[d.category] || '#64748b')
        .attr('opacity', 0.1)
        .attr('stroke', (d) => CATEGORY_COLORS[d.category] || '#64748b')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.3)
        .attr('stroke-dasharray', '5,5');
    }

    // Draw links
    const link = g
      .selectAll<SVGLineElement, Link>('.link')
      .data(links)
      .join('line')
      .attr('class', 'network-link')
      .attr('stroke', '#475569')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', (d) => Math.sqrt(d.strength))
      .style('pointer-events', 'none');

    // Draw nodes
    const node = g
      .selectAll<SVGCircleElement, Node>('.node')
      .data(nodes)
      .join('circle')
      .attr('class', 'network-node')
      .attr('r', (d) => 5 + Math.sqrt(d.publications) / 2)
      .attr('fill', (d) => CATEGORY_COLORS[d.category] || '#64748b')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .call(
        d3
          .drag<SVGCircleElement, Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(selectedNode?.id === d.id ? null : d);
      })
      .on('mouseenter', (event, d) => {
        setHoveredNode(d);
        d3.select(event.currentTarget)
          .attr('stroke', '#facc15')
          .attr('stroke-width', 3);
      })
      .on('mouseleave', (event) => {
        setHoveredNode(null);
        d3.select(event.currentTarget)
          .attr('stroke', '#1e293b')
          .attr('stroke-width', 2);
      });

    // Add labels for selected/hovered nodes
    const label = g
      .selectAll<SVGTextElement, Node>('.label')
      .data(nodes)
      .join('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .attr('dy', -15)
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#e2e8f0')
      .attr('opacity', 0)
      .attr('pointer-events', 'none')
      .text((d) => d.name);

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as Node).x || 0)
        .attr('y1', (d) => (d.source as Node).y || 0)
        .attr('x2', (d) => (d.target as Node).x || 0)
        .attr('y2', (d) => (d.target as Node).y || 0);

      node.attr('cx', (d) => d.x || 0).attr('cy', (d) => d.y || 0);

      label.attr('x', (d) => d.x || 0).attr('y', (d) => d.y || 0);
    });

    // Update label visibility based on selected/hovered state
    const updateLabels = () => {
      label.attr('opacity', (d) => {
        if (selectedNode?.id === d.id || hoveredNode?.id === d.id) return 1;
        return 0;
      });
    };

    updateLabels();

    // Highlight selected node and connections
    const updateHighlight = () => {
      if (selectedNode) {
        const connectedNodeIds = new Set<string>();
        connectedNodeIds.add(selectedNode.id);

        links.forEach((l) => {
          const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
          const targetId = typeof l.target === 'object' ? l.target.id : l.target;

          if (sourceId === selectedNode.id) connectedNodeIds.add(targetId);
          if (targetId === selectedNode.id) connectedNodeIds.add(sourceId);
        });

        node
          .attr('opacity', (d) => (connectedNodeIds.has(d.id) ? 1 : 0.2))
          .attr('stroke-width', (d) =>
            d.id === selectedNode.id ? 4 : connectedNodeIds.has(d.id) ? 2 : 2
          )
          .attr('stroke', (d) => (d.id === selectedNode.id ? '#facc15' : '#1e293b'));

        link
          .attr('stroke-opacity', (d) => {
            const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
            const targetId = typeof d.target === 'object' ? d.target.id : d.target;
            return sourceId === selectedNode.id || targetId === selectedNode.id
              ? 0.8
              : 0.1;
          })
          .attr('stroke', (d) => {
            const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
            const targetId = typeof d.target === 'object' ? d.target.id : d.target;
            return sourceId === selectedNode.id || targetId === selectedNode.id
              ? '#3b82f6'
              : '#475569';
          });
      } else {
        node.attr('opacity', 1).attr('stroke', '#1e293b').attr('stroke-width', 2);
        link.attr('stroke-opacity', 0.4).attr('stroke', '#475569');
      }
    };

    updateHighlight();

    // Click on background to deselect
    svg.on('click', () => setSelectedNode(null));

    return () => {
      simulation.stop();
    };
  }, [
    filteredData,
    dimensions,
    selectedNode,
    hoveredNode,
    showClusters,
    clusters,
    setSelectedNode,
    setHoveredNode,
  ]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="bg-slate-950"
      />

      {/* Legend */}
      <div className="absolute top-4 left-4 card p-3 space-y-2">
        <h3 className="text-sm font-semibold text-slate-300">Categories</h3>
        {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
          <div key={category} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-slate-400">{category}</span>
          </div>
        ))}
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 card p-2 text-xs text-slate-400 space-y-1">
        <div>🖱️ Drag to pan • Scroll to zoom</div>
        <div>🎯 Click node to select • Drag node to move</div>
      </div>
    </div>
  );
};
