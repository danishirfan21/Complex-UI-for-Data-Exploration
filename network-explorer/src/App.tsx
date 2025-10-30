import { useState } from 'react';
import { NetworkGraph } from './components/NetworkGraph';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { StatsPanel } from './components/StatsPanel';
import { NodeDetail } from './components/NodeDetail';
import { ClusteringControl } from './components/ClusteringControl';
import { useNetworkStore } from './store/networkStore';
import clsx from 'clsx';

function App() {
  const { sidebarOpen, toggleSidebar } = useNetworkStore();
  const [activeTab, setActiveTab] = useState<'filters' | 'stats' | 'clustering'>('filters');

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="flex-shrink-0 bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-slate-400 hover:text-slate-300 transition-colors"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div>
              <h1 className="text-2xl font-bold text-slate-100">Research Network Explorer</h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Interactive visualization of research collaborations
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="text-xs text-slate-500">
              <kbd className="px-2 py-1 bg-slate-800 rounded">Ctrl</kbd>
              <span className="mx-1">+</span>
              <kbd className="px-2 py-1 bg-slate-800 rounded">F</kbd>
              <span className="ml-2">to search</span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-4 max-w-2xl">
          <SearchBar />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={clsx(
            'flex-shrink-0 w-80 bg-slate-900 border-r border-slate-800 overflow-y-auto transition-transform duration-300',
            {
              '-translate-x-full lg:translate-x-0': !sidebarOpen,
              'translate-x-0': sidebarOpen,
            },
            'absolute lg:relative z-30 h-full lg:h-auto'
          )}
        >
          <div className="p-4 space-y-4">
            {/* Tabs */}
            <div className="flex gap-2 bg-slate-800 rounded p-1">
              <button
                onClick={() => setActiveTab('filters')}
                className={clsx(
                  'flex-1 px-3 py-2 rounded text-sm font-medium transition-colors',
                  {
                    'bg-primary-600 text-white': activeTab === 'filters',
                    'text-slate-400 hover:text-slate-300': activeTab !== 'filters',
                  }
                )}
                aria-current={activeTab === 'filters' ? 'page' : undefined}
              >
                Filters
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={clsx(
                  'flex-1 px-3 py-2 rounded text-sm font-medium transition-colors',
                  {
                    'bg-primary-600 text-white': activeTab === 'stats',
                    'text-slate-400 hover:text-slate-300': activeTab !== 'stats',
                  }
                )}
                aria-current={activeTab === 'stats' ? 'page' : undefined}
              >
                Statistics
              </button>
              <button
                onClick={() => setActiveTab('clustering')}
                className={clsx(
                  'flex-1 px-3 py-2 rounded text-sm font-medium transition-colors',
                  {
                    'bg-primary-600 text-white': activeTab === 'clustering',
                    'text-slate-400 hover:text-slate-300': activeTab !== 'clustering',
                  }
                )}
                aria-current={activeTab === 'clustering' ? 'page' : undefined}
              >
                Clustering
              </button>
            </div>

            {/* Tab content */}
            {activeTab === 'filters' && <FilterPanel />}
            {activeTab === 'stats' && <StatsPanel />}
            {activeTab === 'clustering' && <ClusteringControl />}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        {/* Main visualization area */}
        <main className="flex-1 relative overflow-hidden">
          <NetworkGraph />
        </main>

        {/* Right Sidebar - Node Detail */}
        <aside className="flex-shrink-0 w-96 bg-slate-900 border-l border-slate-800 overflow-y-auto hidden xl:block">
          <div className="p-4">
            <NodeDetail />
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 bg-slate-900 border-t border-slate-800 px-6 py-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div>
            Built with React, D3.js, TypeScript, and Tailwind CSS
          </div>
          <div className="flex items-center gap-4">
            <span>Data-dense UI showcase</span>
            <a
              href="https://github.com"
              className="text-primary-400 hover:text-primary-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
