import { useState } from 'react';
import { useNetworkStore } from '../store/networkStore';
import clsx from 'clsx';

const CATEGORIES = [
  'Computer Science',
  'Biology',
  'Physics',
  'Mathematics',
  'Chemistry',
];

export const FilterPanel = () => {
  const { filters, updateFilters, applyFilters, resetFilters } = useNetworkStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCategoryToggle = (category: string) => {
    const newCategories = new Set(filters.categories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    updateFilters({ categories: newCategories });
    applyFilters();
  };

  const handleStrengthChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.strengthRange];
    newRange[index] = value;
    updateFilters({ strengthRange: newRange });
    applyFilters();
  };

  const handlePublicationChange = (value: number) => {
    updateFilters({ minPublications: value });
    applyFilters();
  };

  const handleHIndexChange = (value: number) => {
    updateFilters({ minHIndex: value });
    applyFilters();
  };

  const handleReset = () => {
    resetFilters();
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-200">Filters</h2>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            aria-label="Reset all filters"
          >
            Reset
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-slate-300 transition-colors"
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
            aria-expanded={isExpanded}
          >
            <svg
              className={clsx('w-5 h-5 transition-transform', {
                'rotate-180': !isExpanded,
              })}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Category filters */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Research Areas
            </label>
            <div className="space-y-2">
              {CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer hover:bg-slate-800 px-2 py-1 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.has(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-slate-900"
                    aria-label={`Filter by ${category}`}
                  />
                  <span className="text-sm text-slate-300">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Collaboration strength */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Collaboration Strength
              <span className="text-xs text-slate-500 ml-2">
                ({filters.strengthRange[0]} - {filters.strengthRange[1]})
              </span>
            </label>
            <div className="space-y-3">
              <div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={filters.strengthRange[0]}
                  onChange={(e) => handleStrengthChange(0, Number(e.target.value))}
                  className="w-full accent-primary-500"
                  aria-label="Minimum collaboration strength"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Min: {filters.strengthRange[0]}</span>
                </div>
              </div>
              <div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={filters.strengthRange[1]}
                  onChange={(e) => handleStrengthChange(1, Number(e.target.value))}
                  className="w-full accent-primary-500"
                  aria-label="Maximum collaboration strength"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Max: {filters.strengthRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Minimum publications */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Minimum Publications
              <span className="text-xs text-slate-500 ml-2">
                ({filters.minPublications}+)
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="200"
              step="10"
              value={filters.minPublications}
              onChange={(e) => handlePublicationChange(Number(e.target.value))}
              className="w-full accent-primary-500"
              aria-label="Minimum number of publications"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0</span>
              <span>200</span>
            </div>
          </div>

          {/* Minimum h-index */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Minimum h-index
              <span className="text-xs text-slate-500 ml-2">
                ({filters.minHIndex}+)
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="70"
              step="5"
              value={filters.minHIndex}
              onChange={(e) => handleHIndexChange(Number(e.target.value))}
              className="w-full accent-primary-500"
              aria-label="Minimum h-index"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0</span>
              <span>70</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
