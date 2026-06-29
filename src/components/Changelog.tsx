import { motion } from 'framer-motion';
import { 
  GitCommit, 
  Rocket, 
  Sparkles, 
  Layers,
  CreditCard
} from 'lucide-react';

interface Release {
  version: string;
  date: string;
  title: string;
  description: string;
  icon: React.ElementType;
  changes: {
    type: 'feature' | 'improvement' | 'fix';
    text: string;
  }[];
}

const releases: Release[] = [
  {
    version: '0.7.0',
    date: 'June 2025',
    title: 'Credit System & Multi-Engine Support',
    description: 'Major update with complete auth, billing, and multi-engine support',
    icon: CreditCard,
    changes: [
      { type: 'feature', text: 'Complete Auth & Billing system (Supabase + Stripe)' },
      { type: 'feature', text: 'Credit-based subscription with packages' },
      { type: 'feature', text: 'FLUX 2 Pro, Seedream 4.5, GPT Image 2, Nano Banana 2' },
      { type: 'feature', text: 'Video generation 480p (14cr/sec) & 720p (38cr/sec)' },
      { type: 'feature', text: '16K image generation support' },
      { type: 'improvement', text: 'React 18 + TypeScript 5.0 + Vite' },
      { type: 'improvement', text: 'Tauri desktop app integration' }
    ]
  },
  {
    version: '0.5.0',
    date: 'March 2025',
    title: 'Enhanced Workflow',
    description: 'Added batch processing and workflow improvements',
    icon: Layers,
    changes: [
      { type: 'feature', text: 'Batch processing mode' },
      { type: 'feature', text: 'Workflow templates system' },
      { type: 'feature', text: 'Enhanced node canvas' },
      { type: 'improvement', text: 'Performance optimizations' },
      { type: 'improvement', text: 'UI/UX improvements' }
    ]
  },
  {
    version: '0.1.0',
    date: 'December 2024',
    title: 'Initial Release',
    description: 'First release with core AI rendering capabilities',
    icon: Rocket,
    changes: [
      { type: 'feature', text: 'Node-based workflow builder' },
      { type: 'feature', text: 'History system with search & filter' },
      { type: 'feature', text: 'Image library management' },
      { type: 'feature', text: 'Generate - AI chat interface' },
      { type: 'feature', text: 'Integrations: 3ds Max, Revit, SketchUp, ArchiCAD, AutoCAD' },
      { type: 'feature', text: 'Windows desktop application' }
    ]
  }
];

const typeColors = {
  feature: 'bg-green-500/20 text-green-400 border-green-500/30',
  improvement: 'bg-anarchy-red/20 text-anarchy-red border-anarchy-red/30',
  fix: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

const typeLabels = {
  feature: 'New',
  improvement: 'Improved',
  fix: 'Fixed'
};

export function Changelog() {
  
  return (
    <div className="min-h-screen bg-anarchy-dark pt-32 pb-20 px-6">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-anarchy-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-anarchy-red/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <GitCommit size={16} className="text-anarchy-red" />
            <span className="text-anarchy-red text-sm font-medium">Changelog</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What's <span className="text-anarchy-red">New</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Track our development progress and see what's changed in each release
          </p>
        </motion.div>

        {/* Releases */}
        <div className="space-y-8">
          {releases.map((release, index) => {
            const Icon = release.icon;
            return (
              <motion.div
                key={release.version}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Version badge */}
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-anarchy-red/10 border border-anarchy-red/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon size={28} className="text-anarchy-red" />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white">v{release.version}</h2>
                      <span className="text-sm text-gray-500">{release.date}</span>
                    </div>
                    <p className="text-anarchy-red font-medium">{release.title}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-4 ml-[4.5rem]">{release.description}</p>

                {/* Changes */}
                <div className="ml-[4.5rem] space-y-2">
                  {release.changes.map((change, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${typeColors[change.type]}`}>
                        {typeLabels[change.type]}
                      </span>
                      <span className="text-gray-300">{change.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                {index < releases.length - 1 && (
                  <div className="mt-8 ml-[4.5rem] h-px bg-gradient-to-r from-anarchy-red/30 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <motion.div 
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-anarchy-red/10 to-transparent border border-anarchy-red/20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Sparkles size={32} className="text-anarchy-red mb-4" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">More Coming Soon</h3>
          <p className="text-gray-400">Stay tuned for v1.0 with team collaboration and API access</p>
        </motion.div>
      </div>
    </div>
  );
}
