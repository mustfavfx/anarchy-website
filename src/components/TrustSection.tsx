import { motion } from 'framer-motion';
import { Workflow, Layers, FolderOpen } from 'lucide-react';

const trustBlocks = [
  {
    icon: Workflow,
    title: 'Built around real architectural workflows',
    description: 'Designed with input from visualization studios and design teams who need reliable, repeatable render pipelines.',
  },
  {
    icon: Layers,
    title: 'Multi-engine generation from one canvas',
    description: 'Connect GPT Image, FLUX, Seedream, and more — all from the same node workflow without switching tools.',
  },
  {
    icon: FolderOpen,
    title: 'Project library for every render iteration',
    description: 'Every generation is saved with full context. Compare versions, restore prompts, and build on past work.',
  },
];

export function TrustSection() {
  return (
    <section className="relative py-20 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-anarchy-dark" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-anarchy-red text-sm font-medium uppercase tracking-widest mb-3 block">
            Why Anarchy AI
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Built for production workflows
          </h2>
        </motion.div>

        {/* Trust Blocks */}
        <div className="grid md:grid-cols-3 gap-6">
          {trustBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-anarchy-red/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-anarchy-red" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {block.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {block.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Beta disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-gray-500 mt-10"
        >
          Anarchy AI is currently in beta. Features and pricing may change based on user feedback.
        </motion.p>
      </div>
    </section>
  );
}
