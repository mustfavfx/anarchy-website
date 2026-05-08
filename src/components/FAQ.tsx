import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Is Anarchy AI free to use?',
    a: 'The app is free to download and use. You pay only for AI generation credits. Credits never expire and there are no monthly fees.',
  },
  {
    q: 'Does it work without an internet connection?',
    a: 'The core application runs offline via Tauri. An internet connection is only needed when you trigger AI generation to send requests to the AI engine APIs.',
  },
  {
    q: 'Which 3D software is supported?',
    a: '3ds Max, Revit, and AutoCAD are currently available via native plugins. SketchUp and ArchiCAD support is coming soon.',
  },
  {
    q: 'What AI engines are included?',
    a: 'Anarchy AI currently supports GPT Image 2, FLUX 2 Pro, Seedream 4.5, Grok Imagine, Nano Banana 2, and more. New engines are added regularly.',
  },
  {
    q: 'Can I batch process multiple renders at once?',
    a: 'Yes. You can queue unlimited render variations across your node graph. Each node can target a different engine, resolution, or prompt — all running in parallel.',
  },
  {
    q: 'How is this different from Midjourney or Stable Diffusion?',
    a: 'Anarchy AI is a workflow platform, not just an image generator. It integrates directly with your 3D tools, lets you build reusable pipelines, and manages your entire render library — not just individual prompts.',
  },
  {
    q: 'What operating systems are supported?',
    a: 'Currently Windows 10/11 is fully supported. macOS support is in active development.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 px-6 relative" aria-labelledby="faq-heading">
      <div className="absolute inset-0 bg-anarchy-dark" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-5">
            FAQ
          </span>
          <h2 id="faq-heading" className="text-headline text-white mb-4">
            Common Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        <ol className="space-y-3 list-none">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full text-left glass-card rounded-xl px-6 py-4 flex items-center justify-between gap-4 border transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-anarchy-red ${
                  open === i ? 'border-anarchy-red/25 bg-anarchy-red/[0.04]' : 'border-white/[0.06] hover:border-white/[0.12]'
                }`}
                aria-expanded={open === i}
              >
                <span className={`text-sm font-medium ${open === i ? 'text-white' : 'text-gray-300'}`}>
                  {faq.q}
                </span>
                <span className="flex-shrink-0 text-gray-500">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pt-3 pb-5 text-sm text-gray-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </ol>
      </div>
    </section>
  );
}
