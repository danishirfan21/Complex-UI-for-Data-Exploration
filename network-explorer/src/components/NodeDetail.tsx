import { useNetworkStore } from '../store/networkStore';

export const NodeDetail = () => {
  const { selectedNode, filteredData, setSelectedNode } = useNetworkStore();

  if (!selectedNode) {
    return (
      <div className="card text-center py-12">
        <div className="text-slate-400 text-sm">
          Select a researcher node to view details
        </div>
      </div>
    );
  }

  // Find all collaborations for this node
  const collaborations = filteredData.links.filter((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    return sourceId === selectedNode.id || targetId === selectedNode.id;
  });

  // Get collaborator details
  const collaborators = collaborations.map((link) => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    const collaboratorId = sourceId === selectedNode.id ? targetId : sourceId;
    const collaborator = filteredData.nodes.find((n) => n.id === collaboratorId);
    return { link, collaborator };
  });

  // Sort by collaboration strength
  collaborators.sort((a, b) => b.link.strength - a.link.strength);

  const totalCollabPublications = collaborations.reduce(
    (sum, link) => sum + link.publications,
    0
  );

  return (
    <div className="card relative">
      {/* Close button */}
      <button
        onClick={() => setSelectedNode(null)}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-300 transition-colors"
        aria-label="Close detail panel"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Header */}
      <div className="pr-8 mb-4">
        <h2 className="text-xl font-bold text-slate-100">{selectedNode.name}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="badge bg-primary-600 text-white">
            {selectedNode.category}
          </span>
          <span className="text-sm text-slate-400">{selectedNode.institution}</span>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-slate-800 rounded p-3 text-center">
          <div className="text-xs text-slate-400 uppercase">Publications</div>
          <div className="text-xl font-bold text-primary-400 mt-1">
            {selectedNode.publications}
          </div>
        </div>
        <div className="bg-slate-800 rounded p-3 text-center">
          <div className="text-xs text-slate-400 uppercase">h-index</div>
          <div className="text-xl font-bold text-primary-400 mt-1">
            {selectedNode.hIndex}
          </div>
        </div>
        <div className="bg-slate-800 rounded p-3 text-center">
          <div className="text-xs text-slate-400 uppercase">Collaborators</div>
          <div className="text-xl font-bold text-primary-400 mt-1">
            {collaborations.length}
          </div>
        </div>
      </div>

      {/* Research keywords */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-slate-300 mb-2">Research Areas</h3>
        <div className="flex flex-wrap gap-2">
          {selectedNode.keywords.map((keyword) => (
            <span key={keyword} className="badge bg-slate-800 text-slate-300">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Join date */}
      <div className="mb-4 text-sm text-slate-400">
        <strong>Joined:</strong>{' '}
        {new Date(selectedNode.joinDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      {/* Collaborations */}
      <div className="border-t border-slate-800 pt-4">
        <h3 className="text-sm font-medium text-slate-300 mb-3">
          Active Collaborations ({collaborations.length})
        </h3>

        {collaborators.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {collaborators.map(({ link, collaborator }) => {
              if (!collaborator) return null;

              return (
                <div
                  key={collaborator.id}
                  className="bg-slate-800 rounded p-3 hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-200 truncate">
                        {collaborator.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {collaborator.institution}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <div className="text-xs text-slate-500">Strength:</div>
                        <div className="text-sm font-semibold text-primary-400">
                          {link.strength}/10
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{link.publications} co-authored publications</span>
                    <span>
                      {new Date(link.firstCollaboration).getFullYear()} -{' '}
                      {new Date(link.lastCollaboration).getFullYear()}
                    </span>
                  </div>

                  {/* Strength bar */}
                  <div className="mt-2 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all"
                      style={{ width: `${(link.strength / 10) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-slate-400 text-center py-4">
            No active collaborations
          </div>
        )}

        {collaborations.length > 0 && (
          <div className="mt-3 p-3 bg-slate-800 rounded text-xs text-slate-400">
            Total co-authored publications: <strong>{totalCollabPublications}</strong>
          </div>
        )}
      </div>
    </div>
  );
};
