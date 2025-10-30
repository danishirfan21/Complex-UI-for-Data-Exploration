export interface Node {
  id: string;
  name: string;
  category: 'Computer Science' | 'Biology' | 'Physics' | 'Mathematics' | 'Chemistry';
  publications: number;
  hIndex: number;
  institution: string;
  keywords: string[];
  joinDate: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface Link {
  source: string | Node;
  target: string | Node;
  strength: number; // 1-10, collaboration strength
  publications: number; // number of co-authored publications
  firstCollaboration: string; // date
  lastCollaboration: string; // date
  index?: number;
}

export interface NetworkData {
  nodes: Node[];
  links: Link[];
}

export interface FilterState {
  categories: Set<string>;
  strengthRange: [number, number];
  dateRange: [Date, Date];
  searchQuery: string;
  minPublications: number;
  minHIndex: number;
}

export interface Cluster {
  id: number;
  nodes: Node[];
  centroid: { x: number; y: number };
  category: string;
  size: number;
}

export interface NetworkStats {
  totalNodes: number;
  totalLinks: number;
  avgDegree: number;
  density: number;
  clusters: number;
  topResearchers: Node[];
}
