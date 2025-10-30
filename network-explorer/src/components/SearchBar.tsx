import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useNetworkStore } from '../store/networkStore';
import type { Node } from '../types/network';

export const SearchBar = () => {
  const {
    originalData,
    searchQuery,
    setSearchQuery,
    setSelectedNode,
  } = useNetworkStore();

  const [results, setResults] = useState<Node[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Setup Fuse.js for fuzzy search
  const fuse = new Fuse(originalData.nodes, {
    keys: [
      { name: 'name', weight: 2 },
      { name: 'institution', weight: 1.5 },
      { name: 'keywords', weight: 1 },
      { name: 'category', weight: 0.5 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  });

  useEffect(() => {
    if (localQuery.length >= 2) {
      const searchResults = fuse.search(localQuery).map((result) => result.item);
      setResults(searchResults.slice(0, 8)); // Limit to 8 results
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [localQuery]);

  const handleSearch = (query: string) => {
    setLocalQuery(query);
    setSearchQuery(query);
  };

  const handleSelectResult = (node: Node) => {
    setSelectedNode(node);
    setShowResults(false);
    setLocalQuery(node.name);
  };

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={localQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => localQuery.length >= 2 && setShowResults(true)}
          placeholder="Search researchers, institutions, keywords..."
          className="input-field w-full pl-10 pr-10"
          aria-label="Search network"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={showResults}
        />

        {/* Search icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Clear button */}
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {showResults && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          className="absolute z-50 w-full mt-2 card max-h-96 overflow-y-auto"
        >
          <div className="text-xs text-slate-400 px-3 py-2 border-b border-slate-800">
            {results.length} result{results.length !== 1 && 's'} found
          </div>
          {results.map((node) => (
            <button
              key={node.id}
              onClick={() => handleSelectResult(node)}
              className="w-full px-3 py-3 text-left hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-b-0"
              role="option"
              aria-selected={false}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 truncate">
                    {node.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {node.institution} • {node.category}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {node.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="badge bg-slate-800 text-slate-300 text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500 whitespace-nowrap">
                  <div>h-index: {node.hIndex}</div>
                  <div>{node.publications} pubs</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
