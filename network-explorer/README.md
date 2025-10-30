# Research Network Explorer

A complex, data-dense interactive dashboard for exploring research collaboration networks. Built with React, D3.js, TypeScript, and Tailwind CSS.

![Network Explorer](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![D3.js](https://img.shields.io/badge/D3.js-7.9-orange) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## Features

### 🎯 Interactive Network Visualization
- **Force-directed graph** powered by D3.js with realistic physics simulation
- **Pan and zoom** capabilities for exploring large networks
- **Drag nodes** to reposition and explore connections
- **Dynamic highlighting** of selected nodes and their connections
- **Color-coded categories** for easy identification of research fields

### 🔍 Advanced Search & Filtering
- **Semantic fuzzy search** using Fuse.js
  - Search by researcher name, institution, or keywords
  - Real-time suggestions with ranked results
  - Keyboard navigation support
- **Multi-dimensional filtering**
  - Filter by research area/category
  - Collaboration strength range
  - Publication count threshold
  - H-index threshold
  - Date range for collaborations
- **Real-time updates** - filters apply instantly to visualization

### 📊 Statistical Analysis
- **Network metrics**
  - Total researchers and collaborations
  - Average degree (connections per node)
  - Network density calculation
- **Top researchers** ranked by h-index
- **Dynamic recalculation** based on active filters

### 🎨 Clustering Analysis
- **K-means clustering algorithm** to identify research communities
- **Adjustable cluster count** (2-10 clusters)
- **Visual cluster boundaries** overlaid on network
- **Cluster composition** showing dominant research areas
- **Real-time clustering** as network changes

### 📱 Responsive Design
- **Mobile-first approach** with collapsible sidebars
- **Adaptive layout** for desktop, tablet, and mobile
- **Touch-friendly** controls and interactions
- **Keyboard shortcuts** for power users

### ♿ Accessibility Features
- **ARIA labels** on all interactive elements
- **Keyboard navigation** throughout the interface
- **Semantic HTML** structure
- **Focus management** for modal interactions
- **Screen reader compatible**

## Architecture

### State Management

Uses **Zustand** for lightweight, performant state management:

```typescript
// Centralized store with computed values
interface NetworkStore {
  // Data
  originalData: NetworkData;
  filteredData: NetworkData;

  // Selection state
  selectedNode: Node | null;
  hoveredNode: Node | null;

  // Filters
  filters: FilterState;

  // Clustering
  clusters: Cluster[];
  showClusters: boolean;

  // Actions
  applyFilters: () => void;
  calculateStats: () => void;
}
```

### Component Structure

```
src/
├── components/
│   ├── NetworkGraph.tsx        # D3.js force-directed visualization
│   ├── SearchBar.tsx           # Fuzzy search with autocomplete
│   ├── FilterPanel.tsx         # Multi-dimensional filters
│   ├── StatsPanel.tsx          # Network statistics display
│   ├── NodeDetail.tsx          # Detailed node information
│   └── ClusteringControl.tsx   # Clustering configuration
├── store/
│   └── networkStore.ts         # Zustand state management
├── types/
│   └── network.ts              # TypeScript type definitions
├── data/
│   └── sampleData.ts           # Sample network dataset
├── utils/
│   └── clustering.ts           # K-means clustering algorithm
└── App.tsx                     # Main layout and routing
```

### Data Model

```typescript
interface Node {
  id: string;
  name: string;
  category: 'Computer Science' | 'Biology' | 'Physics' | 'Mathematics' | 'Chemistry';
  publications: number;
  hIndex: number;
  institution: string;
  keywords: string[];
  joinDate: string;
}

interface Link {
  source: string | Node;
  target: string | Node;
  strength: number;           // 1-10 collaboration strength
  publications: number;       // Co-authored papers
  firstCollaboration: string;
  lastCollaboration: string;
}
```

## Performance Optimizations

1. **Virtual scrolling** for long lists of results
2. **Debounced search** to reduce computation
3. **Memoized calculations** for statistics
4. **D3 force simulation** with alpha decay for smooth animations
5. **ResizeObserver** for efficient responsive updates
6. **Efficient filtering** using Set data structures

## Data Handling

### Sample Dataset
- **20+ researchers** across 5 disciplines
- **40+ collaboration links** with varying strengths
- **Realistic metadata** including publications, h-index, institutions
- **Time-series data** for collaboration history

### Data Flow
1. Original data stored immutably in store
2. Filters applied to create filtered dataset
3. Statistics calculated from filtered data
4. D3 creates local copy for force simulation
5. UI updates reactively via Zustand subscriptions

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd network-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` directory to Netlify

### Environment Variables

No environment variables required for basic deployment.

## Usage Guide

### Exploring the Network
1. **Pan**: Click and drag the background
2. **Zoom**: Scroll wheel or pinch gesture
3. **Select node**: Click on any researcher node
4. **Move node**: Drag a node to reposition

### Filtering Data
1. Open the **Filters** tab in the left sidebar
2. Toggle research areas to show/hide
3. Adjust collaboration strength sliders
4. Set minimum thresholds for publications and h-index
5. Filters apply instantly

### Searching
1. Use the search bar at the top
2. Type researcher name, institution, or keyword
3. Select from autocomplete suggestions
4. Or press Enter to filter the network

### Clustering Analysis
1. Switch to the **Clustering** tab
2. Adjust the number of clusters (2-10)
3. Toggle "Show Cluster Boundaries" to visualize
4. View cluster composition below

### Viewing Details
1. Click on any researcher node
2. View detailed information in the right sidebar (desktop)
3. See all collaborations and their strengths
4. Click X to close the detail panel

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technology Stack

- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **D3.js 7.9** - Data visualization
- **Tailwind CSS 3.4** - Styling
- **Zustand 5.0** - State management
- **Fuse.js 7.0** - Fuzzy search
- **Vite 6.0** - Build tool

## License

MIT License - feel free to use this project for learning and portfolio purposes.

## Contributing

This is a portfolio project, but suggestions and improvements are welcome via issues or pull requests.

## Acknowledgments

- Sample data inspired by real research collaboration networks
- D3.js force simulation examples from Observable
- Design patterns from modern data visualization best practices
