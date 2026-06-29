import { motion } from 'framer-motion';
import { Workflow, Layers, FolderOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const getTrustBlocks = (t: any) => [
  {
    icon: Workflow,
    title: t.trust.workflowTitle,
    description: t.trust.workflowDesc,
  },
  {
    icon: Layers,
    title: t.trust.multiEngineTitle,
    description: t.trust.multiEngineDesc,
  },
  {
    icon: FolderOpen,
    title: t.trust.projectLibraryTitle,
    description: t.trust.projectLibraryDesc,
  },
];

export function TrustSection() {
  const { t } = useLanguage();
  const trustBlocks = getTrustBlocks(t);
  return (
    <section className="relative py-20 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-anarchy-dark" />

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
            {t.trust.badge}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {t.trust.title}
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
