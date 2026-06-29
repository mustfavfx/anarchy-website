import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Layers, 
  Sparkles, 
  Zap,
  Cpu,
  ChevronRight,
  X,
  GitBranch,
  ArrowRight
} from 'lucide-react';

interface RoadmapNode {
  id: string;
  version: string;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
  icon: React.ElementType;
  description: string;
  features: string[];
  position: { x: number; y: number };
  connections: string[];
}

const nodes: RoadmapNode[] = [
  {
    id: 'v0.1',
    version: '0.1.0',
    title: 'Foundation',
    date: 'Q4 2024',
    status: 'completed',
    icon: Rocket,
    description: 'Initial release with core AI rendering',
    features: [
      'Builder Workflow - Node-based AI',
      'History System',
      'Library Management',
      'AI Chat Interface',
      'Windows Desktop App'
    ],
    position: { x: 0, y: 0 },
    connections: ['v0.5']
  },
  {
    id: 'v0.5',
    version: '0.5.0',
    title: 'Enhanced',
    date: 'Q1 2025',
    status: 'completed',
    icon: Layers,
    description: 'Workflow templates & batch processing',
    features: [
      'Workflow Templates',
      'Batch Processing',
      'Performance Optimized',
      'UI/UX Improvements',
      'Storage Management'
    ],
    position: { x: 300, y: 0 },
    connections: ['v0.7']
  },
  {
    id: 'v0.7',
    version: '0.7.0',
    title: 'Professional',
    date: 'Q2 2025',
    status: 'completed',
    icon: Sparkles,
    description: 'Auth, Billing & Multi-Engine',
    features: [
      'Supabase Auth',
      'Stripe Billing',
      'FLUX 2 Pro',
      'Video Generation',
      '16K Support'
    ],
    position: { x: 600, y: 0 },
    connections: ['v0.8']
  },
  {
    id: 'v0.8',
    version: '0.8.0',
    title: 'Optimization',
    date: 'Q3 2025',
    status: 'in-progress',
    icon: Zap,
    description: 'Performance boost & automation',
    features: [
      'Performance +300%',
      'Workflow Automation',
      'Mobile Support',
      'Export/Import',
      'Enhanced Video'
    ],
    position: { x: 900, y: 0 },
    connections: ['v1.0']
  },
  {
    id: 'v1.0',
    version: '1.0.0',
    title: 'Enterprise',
    date: 'Q4 2025',
    status: 'planned',
    icon: Cpu,
    description: 'Full production release',
    features: [
      'Team Collaboration',
      'Cloud Storage',
      'API Access',
      'Enterprise Support',
      'macOS & Linux'
    ],
    position: { x: 1200, y: 0 },
    connections: []
  }
];

const statusConfig = {
  completed: { color: '#22c55e', bg: 'bg-green-500/20', border: 'border-green-500/50', glow: 'shadow-green-500/30' },
  'in-progress': { color: '#E63030', bg: 'bg-anarchy-red/20', border: 'border-anarchy-red/50', glow: 'shadow-anarchy-red/30' },
  planned: { color: '#6b7280', bg: 'bg-gray-500/20', border: 'border-gray-500/50', glow: 'shadow-gray-500/30' }
};

function ConnectionLine({ from, to, status }: { from: { x: number; y: number }; to: { x: number; y: number }; status: string }) {
  const color = status === 'completed' ? '#22c55e' : status === 'in-progress' ? '#E63030' : '#6b7280';
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id={`gradient-${status}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
        <marker id={`arrow-${status}`} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill={color} />
        </marker>
      </defs>
      <motion.path
        d={`M${from.x + 120},${from.y + 60} L${to.x},${to.y + 60}`}
        stroke={`url(#gradient-${status})`}
        strokeWidth="2"
        fill="none"
        markerEnd={`url(#arrow-${status})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </svg>
  );
}

function NodeCard({ node, isSelected, onClick }: { node: RoadmapNode; isSelected: boolean; onClick: () => void }) {
  const Icon = node.icon;
  const config = statusConfig[node.status];
  
  return (
    <motion.div
      className="absolute"
      style={{ left: node.position.x, top: node.position.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: parseFloat(node.version) * 0.2, type: "spring" }}
    >
      <motion.div
        className={`relative w-[240px] cursor-pointer ${isSelected ? 'z-50' : 'z-10'}`}
        onClick={onClick}
        whileHover={{ scale: 1.05, y: -10 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Node Card */}
        <div className={`
          p-5 rounded-2xl border-2 backdrop-blur-sm
          ${config.bg} ${config.border}
          ${isSelected ? `shadow-lg ${config.glow}` : 'shadow-md'}
          transition-all duration-300
        `}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <motion.div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center`}
              style={{ backgroundColor: `${config.color}20`, border: `2px solid ${config.color}50` }}
              animate={node.status === 'in-progress' ? { 
                boxShadow: [`0 0 0px ${config.color}`, `0 0 20px ${config.color}`, `0 0 0px ${config.color}`]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon size={24} style={{ color: config.color }} />
            </motion.div>
            <div className="text-right">
              <div className="text-xs text-gray-500 font-mono">{node.date}</div>
              <div className="text-lg font-bold text-white">v{node.version}</div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-1">{node.title}</h3>
          <p className="text-xs text-gray-400 mb-3">{node.description}</p>

          {/* Status Badge */}
          <div className={`
            inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
            ${config.bg} border ${config.border}
          `}>
            <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: config.color }} />
            {node.status === 'completed' ? 'Completed' : node.status === 'in-progress' ? 'In Progress' : 'Planned'}
          </div>

          {/* Connection Points */}
          <div className="absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-anarchy-red border-2 border-anarchy-dark" />
          <div className="absolute -left-2 top-1/2 w-4 h-4 rounded-full border-2 border-anarchy-dark"
            style={{ backgroundColor: config.color }} 
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailPanel({ node, onClose }: { node: RoadmapNode; onClose: () => void }) {
  const Icon = node.icon;
  const config = statusConfig[node.status];
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-lg p-6 rounded-3xl bg-anarchy-dark border-2 overflow-hidden"
        style={{ borderColor: config.color }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${config.color}20`, border: `2px solid ${config.color}` }}
          >
            <Icon size={32} style={{ color: config.color }} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs text-gray-500 font-mono">{node.date}</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-medium
                ${config.bg} border ${config.border}
              `}>
                {node.status}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{node.title}</h2>
            <p className="text-anarchy-red font-mono">v{node.version}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 mb-6">{node.description}</p>

        {/* Features */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <GitBranch size={16} className="text-anarchy-red" />
            Features
          </h3>
          {node.features.map((feature, i) => (
            <motion.div
              key={feature}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ChevronRight size={16} style={{ color: config.color }} />
              <span className="text-sm text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Flow Indicator */}
        {node.connections.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-gray-500">Leads to</span>
            <div className="flex items-center gap-2 text-anarchy-red">
              <span className="text-sm">v{nodes.find(n => n.id === node.connections[0])?.version}</span>
              <ArrowRight size={16} />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Roadmap() {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  return (
    <div className="min-h-screen bg-anarchy-dark pt-32 pb-20 px-6 overflow-x-auto">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-anarchy-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-anarchy-red/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <GitBranch size={16} className="text-anarchy-red" />
            <span className="text-anarchy-red text-sm font-medium">Development Timeline</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Product <span className="text-anarchy-red">Evolution</span>
          </h1>
          <p className="text-gray-400">Click nodes to explore each version</p>
        </motion.div>

        {/* Legend */}
        <motion.div 
          className="flex justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Object.entries(statusConfig).map(([status, config]) => (
            <div key={status} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: config.color }} />
              <span className="text-sm text-gray-400 capitalize">{status.replace('-', ' ')}</span>
            </div>
          ))}
        </motion.div>

        {/* Node Workflow Canvas */}
        <div className="relative h-[400px] min-w-[1400px] mx-auto">
          {/* Connection Lines */}
          {nodes.map((node) => 
            node.connections.map((targetId) => {
              const target = nodes.find(n => n.id === targetId);
              if (!target) return null;
              return (
                <ConnectionLine 
                  key={`${node.id}-${targetId}`}
                  from={node.position}
                  to={target.position}
                  status={node.status}
                />
              );
            })
          )}

          {/* Nodes */}
          {nodes.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              isSelected={selectedNode?.id === node.id}
              onClick={() => setSelectedNode(node)}
            />
          ))}
        </div>

        {/* Timeline Stats */}
        <motion.div 
          className="grid grid-cols-5 gap-4 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
              whileHover={{ scale: 1.05, borderColor: statusConfig[node.status].color }}
            >
              <div className="text-2xl font-bold mb-1" style={{ color: statusConfig[node.status].color }}>
                v{node.version}
              </div>
              <div className="text-xs text-gray-500">{node.date}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
          <DetailPanel 
            node={selectedNode} 
            onClose={() => setSelectedNode(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
