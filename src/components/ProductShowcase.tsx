import { motion } from 'framer-motion';
import { Layers, Eye, GitBranch } from 'lucide-react';

const tabs = [
  {
    id: 'canvas',
    icon: GitBranch,
    label: 'Node Canvas',
    heading: 'Visual AI Workflow Editor',
    body: 'Build complex AI pipelines visually. Connect input nodes, processing steps, and output targets with drag-and-drop simplicity. Every connection is live — changes propagate instantly.',
    image: '/screenshots/builder.png',
    badge: 'Core Feature',
  },
  {
    id: 'library',
    icon: Layers,
    label: 'Asset Library',
    heading: 'All Your Renders in One Place',
    body: 'Every generated image, upscale, and video export is automatically catalogued. Filter by project, engine, prompt, or resolution. One-click re-run or export to any format.',
    image: '/screenshots/library.png',
    badge: 'Included',
  },
  {
    id: 'preview',
    icon: Eye,
    label: 'Live Preview',
    heading: 'Instant Side-by-Side Comparison',
    body: 'Compare before/after renders, mask regions for inpainting, and preview at up to 2K resolution — all inside the app without switching windows.',
    image: '/screenshots/builder.png',
    badge: 'No Export Needed',
  },
];

export function ProductShowcase() {
  return (
    <section id="showcase" className="py-28 px-6 relative overflow-hidden" aria-labelledby="showcase-heading">
      <div className="absolute inset-0 bg-anarchy-gray/30" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-5">
            Product Tour
          </span>
          <h2 id="showcase-heading" className="text-headline text-white mb-4">
            Everything You Need,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red to-red-400">
              In One App
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            From first prompt to final render — Anarchy AI handles the full architectural visualization pipeline.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {tabs.map((tab, i) => (
            <motion.article
              key={tab.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-white/[0.06] hover:border-anarchy-red/20 transition-all duration-300 group"
            >
              {/* Screenshot */}
              <div className="relative aspect-video overflow-hidden bg-anarchy-dark">
                <img
                  src={tab.image}
                  alt={tab.heading}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anarchy-dark/80 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 text-xs bg-anarchy-red/90 text-white px-2.5 py-1 rounded-full font-medium">
                  {tab.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-anarchy-red/10 flex items-center justify-center">
                    <tab.icon size={16} className="text-anarchy-red" />
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">{tab.label}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-anarchy-red transition-colors">
                  {tab.heading}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{tab.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
