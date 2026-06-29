import { motion } from 'framer-motion';
import { 
  Workflow, 
  Layers, 
  Zap, 
  Maximize2, 
  GitBranch, 
  Cpu,
  ArrowUpRight
} from 'lucide-react';

const features = [
  {
    icon: Workflow,
    title: 'Node-Based Canvas',
    description: 'Visual workflow editor. Drag, connect, and orchestrate AI nodes without writing code.',
    stat: 'pro',
    statLabel: 'nodes',
    color: 'red'
  },
  {
    icon: Layers,
    title: 'Multi-Engine Support',
    description: 'Switch between GPT Image 2, FLUX, Seedream, Grok, Nano Banana, and 6 more instantly.',
    stat: '11',
    statLabel: 'AI Engines',
    color: 'purple'
  },
  {
    icon: Zap,
    title: 'Batch Processing',
    description: 'Generate hundreds of renders in parallel. Queue management with priority control.',
    stat: '∞',
    statLabel: 'Batch Size',
    color: 'red'
  },
  {
    icon: Maximize2,
    title: '16K Upscaling',
    description: 'Built-in super-resolution. Upscale to 16K without quality loss or external tools.',
    stat: '16K',
    statLabel: 'Max Output',
    color: 'blue'
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    description: 'Every workflow change tracked. Branch, merge, and rollback visual experiments.',
    stat: 'Git',
    statLabel: 'Integration',
    color: 'green'
  },
  {
    icon: Cpu,
    title: 'Plugin System',
    description: 'Extend with custom nodes. Python SDK for power users and teams.',
    stat: 'API',
    statLabel: 'Extensible',
    color: 'orange'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export function FeaturesEnhanced() {
  return (
    <section id="features" className="py-32 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      {/* Geometric Decorations */}
      <div className="absolute top-40 left-10 geometric-square" />
      <div className="absolute bottom-40 right-20 geometric-circle" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-anarchy-red rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-1 h-20 bg-gradient-to-b from-anarchy-red to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - Brutalist Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-anarchy-red/30 mb-6">
            <span className="w-2 h-2 bg-anarchy-red animate-pulse" />
            <span className="text-anarchy-red text-sm font-bold tracking-widest uppercase">
              Capabilities
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            <span className="block">BUILT FOR</span>
            <span className="block text-anarchy-red neon-text">ARCHITECTS</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every feature designed for the workflow of professional visualization teams.
            No bloat. Pure utility.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card with brutalist border */}
              <div className="relative h-full bg-anarchy-dark/60 backdrop-blur-sm border border-white/10 p-8 hover:border-anarchy-red/30 transition-all duration-500 hover-lift">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-anarchy-red/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon with glow */}
                <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-anarchy-red/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <feature.icon 
                    size={28} 
                    className="relative text-anarchy-red group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-anarchy-red transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Stat with brutalist style */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{feature.stat}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{feature.statLabel}</span>
                  </div>
                  <ArrowUpRight 
                    size={20} 
                    className="text-gray-600 group-hover:text-anarchy-red group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
                  />
                </div>

                {/* Hover scan line effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-anarchy-red to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 border border-white/10 hover:border-anarchy-red/30 transition-colors cursor-pointer group">
            <span className="text-gray-400 group-hover:text-white transition-colors">
              Explore all features
            </span>
            <ArrowUpRight 
              size={18} 
              className="text-anarchy-red group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
