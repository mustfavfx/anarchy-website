import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

const engines = ['GPT Image 2', 'FLUX 2 Pro', 'Seedream 4.5', 'Grok Imagine', 'Nano Banana 2'];

const stats = [
  { value: '7+', label: 'AI Engines' },
  { value: '5', label: 'Integrations' },
  { value: '2K', label: 'Max Resolution' },
  { value: '∞', label: 'Batch Renders' },
];

export function Hero() {
  const scrollToFeatures = () => {
    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-anarchy-dark" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(230,48,48,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(99,102,241,0.08) 0%, transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-[0.04]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium mb-8 tracking-wide"
        >
          <Sparkles size={13} />
          Node-based AI Workflow Platform
        </motion.div>

        {/* Heading */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="text-display text-white mb-6 max-w-5xl mx-auto"
        >
          Build AI Render Workflows
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red via-red-400 to-anarchy-red animate-gradient">
            for Architecture
          </span>{' '}
          — Without Repeating Prompts
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          Upload a design screenshot, connect AI nodes, generate multiple render directions,
          upscale the best results, and save every output inside one visual workflow.
        </motion.p>

        {/* AI engine pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="flex items-center justify-center gap-2 flex-wrap mb-10"
          aria-label="Supported AI engines"
        >
          <span className="text-xs text-gray-600 uppercase tracking-widest mr-1">Powered by</span>
          {engines.map((engine) => (
            <span
              key={engine}
              className="text-xs text-gray-400 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full"
            >
              {engine}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <motion.a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-shimmer bg-anarchy-red text-white text-sm font-semibold px-7 py-3.5 rounded-xl hover:bg-anarchy-red/90 transition-colors flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            Request Early Access
            <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href="#demo"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm text-gray-300 border border-white/10 hover:border-white/25 px-7 py-3.5 rounded-xl transition-all hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-anarchy-red"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            Watch Workflow
          </motion.a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs text-gray-500 mt-4"
        >
          Built for architects, interior designers, and visualization teams.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center justify-center gap-10 flex-wrap mt-14 mb-16"
          aria-label="Product statistics"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-white tracking-tight">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Hero product screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Glow halo */}
          <div className="absolute -inset-6 bg-gradient-to-r from-anarchy-red/20 via-purple-500/15 to-blue-500/10 rounded-3xl blur-3xl" />
          <div className="relative glass rounded-2xl p-2 ring-1 ring-white/[0.08]">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 mb-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-4 bg-white/5 rounded-md h-6 flex items-center px-3">
                <span className="text-xs text-gray-600">anarchy.lat/builder</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-anarchy-dark aspect-video">
              <img
                  src="/screenshots/builder.png"
                  alt="Anarchy AI Builder — Node canvas with connected AI render workflow"
                  className="w-full h-full object-cover object-top opacity-95 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                  decoding="async"
                />
              {/* Overlay badges */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between pointer-events-none">
                <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-anarchy-red animate-pulse" />
                  <span className="text-xs text-gray-300 font-medium">Live Processing</span>
                </div>
                <div className="glass rounded-xl px-4 py-2.5">
                  <span className="text-xs text-gray-400">Seedream 4.5 · 2K · 1:1</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToFeatures}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-colors focus-visible:outline-none"
        aria-label="Scroll to features"
      >
        <ChevronDown size={24} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
