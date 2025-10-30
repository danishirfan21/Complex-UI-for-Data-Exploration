import { create } from 'zustand';
import type { Node, Link, NetworkData, FilterState, Cluster, NetworkStats } from '../types/network';
import { sampleData } from '../data/sampleData';

interface NetworkStore {
  // Data
  originalData: NetworkData;
  filteredData: NetworkData;

  // Selection
  selectedNode: Node | null;
  selectedLink: Link | null;
  hoveredNode: Node | null;

  // Filters
  filters: FilterState;

  // Clustering
  clusters: Cluster[];
  showClusters: boolean;

  // Stats
  stats: NetworkStats | null;

  // UI State
  searchQuery: string;
  sidebarOpen: boolean;

  // Actions
  setSelectedNode: (node: Node | null) => void;
  setSelectedLink: (link: Link | null) => void;
  setHoveredNode: (node: Node | null) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  applyFilters: () => void;
  setSearchQuery: (query: string) => void;
  setClusters: (clusters: Cluster[]) => void;
  toggleClusters: () => void;
  toggleSidebar: () => void;
  calculateStats: () => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  categories: new Set(['Computer Science', 'Biology', 'Physics', 'Mathematics', 'Chemistry']),
  strengthRange: [1, 10],
  dateRange: [new Date('2010-01-01'), new Date('2025-12-31')],
  searchQuery: '',
  minPublications: 0,
  minHIndex: 0,
};

export const useNetworkStore = create<NetworkStore>((set, get) => ({
  // Initial state
  originalData: sampleData,
  filteredData: sampleData,
  selectedNode: null,
  selectedLink: null,
  hoveredNode: null,
  filters: initialFilters,
  clusters: [],
  showClusters: false,
  stats: null,
  searchQuery: '',
  sidebarOpen: true,

  // Actions
  setSelectedNode: (node) => set({ selectedNode: node }),

  setSelectedLink: (link) => set({ selectedLink: link }),

  setHoveredNode: (node) => set({ hoveredNode: node }),

  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  applyFilters: () => {
    const { originalData, filters, searchQuery } = get();

    // Filter nodes
    let filteredNodes = originalData.nodes.filter((node) => {
      // Category filter
      if (!filters.categories.has(node.category)) return false;

      // Publication filter
      if (node.publications < filters.minPublications) return false;

      // H-Index filter
      if (node.hIndex < filters.minHIndex) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = node.name.toLowerCase().includes(query);
        const matchesInstitution = node.institution.toLowerCase().includes(query);
        const matchesKeywords = node.keywords.some((k) =>
          k.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesInstitution && !matchesKeywords) return false;
      }

      // Date filter (check if researcher joined within date range)
      const joinDate = new Date(node.joinDate);
      if (joinDate < filters.dateRange[0] || joinDate > filters.dateRange[1]) {
        return false;
      }

      return true;
    });

    const nodeIds = new Set(filteredNodes.map((n) => n.id));

    // Filter links
    let filteredLinks = originalData.links.filter((link) => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;

      // Both nodes must be in filtered set
      if (!nodeIds.has(sourceId) || !nodeIds.has(targetId)) return false;

      // Strength filter
      if (
        link.strength < filters.strengthRange[0] ||
        link.strength > filters.strengthRange[1]
      ) {
        return false;
      }

      // Date filter (check if collaboration is within date range)
      const firstCollab = new Date(link.firstCollaboration);
      const lastCollab = new Date(link.lastCollaboration);
      if (
        lastCollab < filters.dateRange[0] ||
        firstCollab > filters.dateRange[1]
      ) {
        return false;
      }

      return true;
    });

    set({
      filteredData: {
        nodes: filteredNodes,
        links: filteredLinks,
      },
    });

    // Recalculate stats after filtering
    get().calculateStats();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setClusters: (clusters) => set({ clusters }),

  toggleClusters: () => set((state) => ({ showClusters: !state.showClusters })),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  calculateStats: () => {
    const { filteredData } = get();
    const { nodes, links } = filteredData;

    if (nodes.length === 0) {
      set({ stats: null });
      return;
    }

    // Calculate degree for each node
    const degrees: Record<string, number> = {};
    nodes.forEach((node) => {
      degrees[node.id] = 0;
    });

    links.forEach((link) => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      if (degrees[sourceId] !== undefined) degrees[sourceId]++;
      if (degrees[targetId] !== undefined) degrees[targetId]++;
    });

    const totalDegree = Object.values(degrees).reduce((sum, d) => sum + d, 0);
    const avgDegree = nodes.length > 0 ? totalDegree / nodes.length : 0;

    // Calculate network density
    const maxPossibleLinks = (nodes.length * (nodes.length - 1)) / 2;
    const density = maxPossibleLinks > 0 ? links.length / maxPossibleLinks : 0;

    // Get top researchers by h-index
    const topResearchers = [...nodes]
      .sort((a, b) => b.hIndex - a.hIndex)
      .slice(0, 5);

    const stats: NetworkStats = {
      totalNodes: nodes.length,
      totalLinks: links.length,
      avgDegree: Number(avgDegree.toFixed(2)),
      density: Number(density.toFixed(4)),
      clusters: get().clusters.length,
      topResearchers,
    };

    set({ stats });
  },

  resetFilters: () => {
    set({
      filters: initialFilters,
      searchQuery: '',
      filteredData: sampleData
    });
    get().calculateStats();
  },
}));
