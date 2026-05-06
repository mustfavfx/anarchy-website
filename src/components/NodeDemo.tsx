import { motion } from 'framer-motion';
import { Image, Sparkles, Wand2, Download, ArrowRight } from 'lucide-react';

interface Node {
  id: string;
  type: 'input' | 'process' | 'output';
  icon: typeof Image;
  label: string;
  position: { x: number; y: number };
  connected?: boolean;
}

const nodes: Node[] = [
  { id: '1', type: 'input', icon: Image, label: 'Input Image', position: { x: 50, y: 50 }, connected: true },
  { id: '2', type: 'process', icon: Sparkles, label: 'AI Generate', position: { x: 250, y: 50 }, connected: true },
  { id: '3', type: 'process', icon: Wand2, label: 'Enhance', position: { x: 450, y: 50 }, connected: true },
  { id: '4', type: 'output', icon: Download, label: 'Export', position: { x: 650, y: 50 }, connected: false },
];

export const NodeDemo = () => {
  return (
    <section id="demo" className="py-32 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-sm mb-6">
            <Sparkles size={16} />
            Interactive Demo
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Visual Node Workflow
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Drag, connect, and orchestrate AI operations with our intuitive node editor
          </p>
        </motion.div>

        {/* Node Canvas Demo */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Canvas Container */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            
            {/* Animated Grid Lines */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-anarchy-red/30 to-transparent"
                  style={{ top: `${(i + 1) * 16}%` }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              ))}
            </div>

            {/* Nodes Container */}
            <div className="relative flex flex-wrap md:flex-nowrap items-center justify-center gap-8 md:gap-4 min-h-[200px]">
              {nodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative z-10"
                >
                  {/* Node Card */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`
                      w-32 h-32 rounded-xl flex flex-col items-center justify-center gap-3
                      glass-card cursor-pointer transition-all duration-300
                      ${node.connected ? 'border-anarchy-red/30' : 'border-white/10'}
                      hover:border-anarchy-red/50 hover:shadow-[0_0_30px_rgba(225,29,72,0.2)]
                    `}
                  >
                    {/* Node Icon with Glow */}
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center
                      ${node.type === 'input' ? 'bg-blue-500/20 text-blue-400' : ''}
                      ${node.type === 'process' ? 'bg-anarchy-red/20 text-anarchy-red animate-pulse-glow' : ''}
                      ${node.type === 'output' ? 'bg-green-500/20 text-green-400' : ''}
                    `}>
                      <node.icon size={24} />
                    </div>
                    
                    {/* Node Label */}
                    <span className="text-xs text-gray-400 font-medium">{node.label}</span>
                    
                    {/* Connection Points */}
                    {index < nodes.length - 1 && (
                      <div className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight size={20} className="text-anarchy-red/50" />
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Pulse Effect for Active Nodes */}
                  {node.connected && node.type === 'process' && (
                    <div className="absolute inset-0 rounded-xl animate-ping bg-anarchy-red/20" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Data Flow Animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(225, 29, 72, 0)" />
                  <stop offset="50%" stopColor="rgba(225, 29, 72, 0.8)" />
                  <stop offset="100%" stopColor="rgba(225, 29, 72, 0)" />
                </linearGradient>
              </defs>
              
              {/* Animated Connection Lines */}
              {[0, 1, 2].map((i) => (
                <motion.path
                  key={i}
                  d={`M ${150 + i * 200} 100 Q ${250 + i * 200} 100 ${200 + i * 200} 100`}
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 10"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              ))}
            </svg>
          </div>

          {/* Feature Callouts */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { title: 'Drag & Drop', desc: 'Intuitive visual interface' },
              { title: 'Live Preview', desc: 'See changes in real-time' },
              { title: 'Export Anywhere', desc: 'Multiple format support' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-white font-semibold mb-1">{feature.title}</div>
                <div className="text-gray-500 text-sm">{feature.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
