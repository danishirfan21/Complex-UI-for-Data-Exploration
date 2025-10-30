import { useEffect } from 'react';
import { useNetworkStore } from '../store/networkStore';

export const StatsPanel = () => {
  const { stats, calculateStats } = useNetworkStore();

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  if (!stats) {
    return (
      <div className="card">
        <div className="text-sm text-slate-400">No data available</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">Network Statistics</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Total Nodes */}
        <div className="bg-slate-800 rounded p-3">
          <div className="text-xs text-slate-400 uppercase tracking-wide">Researchers</div>
          <div className="text-2xl font-bold text-primary-400 mt-1">
            {stats.totalNodes}
          </div>
        </div>

        {/* Total Links */}
        <div className="bg-slate-800 rounded p-3">
          <div className="text-xs text-slate-400 uppercase tracking-wide">
            Collaborations
          </div>
          <div className="text-2xl font-bold text-primary-400 mt-1">
            {stats.totalLinks}
          </div>
        </div>

        {/* Average Degree */}
        <div className="bg-slate-800 rounded p-3">
          <div className="text-xs text-slate-400 uppercase tracking-wide">Avg. Connections</div>
          <div className="text-2xl font-bold text-primary-400 mt-1">
            {stats.avgDegree}
          </div>
        </div>

        {/* Density */}
        <div className="bg-slate-800 rounded p-3">
          <div className="text-xs text-slate-400 uppercase tracking-wide">Network Density</div>
          <div className="text-2xl font-bold text-primary-400 mt-1">
            {(stats.density * 100).toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Top Researchers */}
      {stats.topResearchers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-slate-300 mb-3">
            Top Researchers (by h-index)
          </h3>
          <div className="space-y-2">
            {stats.topResearchers.map((researcher, index) => (
              <div
                key={researcher.id}
                className="flex items-start gap-3 p-2 bg-slate-800 rounded hover:bg-slate-700 transition-colors"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 truncate">
                    {researcher.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {researcher.institution}
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-sm font-semibold text-primary-400">
                    h: {researcher.hIndex}
                  </div>
                  <div className="text-xs text-slate-500">
                    {researcher.publications} pubs
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
