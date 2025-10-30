import { useState, useEffect } from 'react';
import { useNetworkStore } from '../store/networkStore';
import { kMeansClustering } from '../utils/clustering';

export const ClusteringControl = () => {
  const { filteredData, clusters, setClusters, showClusters, toggleClusters } =
    useNetworkStore();
  const [numClusters, setNumClusters] = useState(5);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculateClusters = () => {
    setIsCalculating(true);

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const newClusters = kMeansClustering(filteredData.nodes, numClusters);
      setClusters(newClusters);
      setIsCalculating(false);
    }, 100);
  };

  // Auto-calculate clusters when data changes
  useEffect(() => {
    if (filteredData.nodes.some((n) => n.x !== undefined && n.y !== undefined)) {
      const newClusters = kMeansClustering(filteredData.nodes, numClusters);
      setClusters(newClusters);
    }
  }, [filteredData, numClusters, setClusters]);

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">
        Clustering Analysis
      </h2>

      <div className="space-y-4">
        {/* Number of clusters slider */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Number of Clusters
            <span className="text-xs text-slate-500 ml-2">({numClusters})</span>
          </label>
          <input
            type="range"
            min="2"
            max="10"
            value={numClusters}
            onChange={(e) => setNumClusters(Number(e.target.value))}
            className="w-full accent-primary-500"
            aria-label="Number of clusters"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>2</span>
            <span>10</span>
          </div>
        </div>

        {/* Toggle visualization */}
        <div className="flex items-center justify-between p-3 bg-slate-800 rounded">
          <div>
            <div className="text-sm font-medium text-slate-300">
              Show Cluster Boundaries
            </div>
            <div className="text-xs text-slate-500">
              Visualize groupings in the network
            </div>
          </div>
          <button
            onClick={toggleClusters}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showClusters ? 'bg-primary-600' : 'bg-slate-700'
            }`}
            role="switch"
            aria-checked={showClusters}
            aria-label="Toggle cluster boundaries"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showClusters ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Calculate button */}
        <button
          onClick={handleCalculateClusters}
          disabled={isCalculating}
          className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCalculating ? 'Calculating...' : 'Recalculate Clusters'}
        </button>

        {/* Cluster info */}
        {clusters.length > 0 && (
          <div className="border-t border-slate-800 pt-4">
            <h3 className="text-sm font-medium text-slate-300 mb-3">
              Detected Clusters ({clusters.length})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {clusters
                .sort((a, b) => b.size - a.size)
                .map((cluster) => (
                  <div
                    key={cluster.id}
                    className="bg-slate-800 rounded p-3 hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary-500" />
                        <span className="text-sm font-medium text-slate-200">
                          Cluster {cluster.id + 1}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {cluster.size} node{cluster.size !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Dominant field: <strong>{cluster.category}</strong>
                    </div>

                    {/* Size bar */}
                    <div className="mt-2 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{
                          width: `${(cluster.size / filteredData.nodes.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="text-xs text-slate-500 bg-slate-800 rounded p-3">
          <strong>About clustering:</strong> This analysis uses k-means algorithm to
          group researchers based on their network position, revealing natural
          communities and collaboration patterns.
        </div>
      </div>
    </div>
  );
};
