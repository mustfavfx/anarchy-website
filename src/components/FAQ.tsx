import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const getFaqs = (t: any) => [
  { q: t.faq.q1, a: t.faq.a1 },
  { q: t.faq.q2, a: t.faq.a2 },
  { q: t.faq.q3, a: t.faq.a3 },
  { q: t.faq.q4, a: t.faq.a4 },
  { q: t.faq.q5, a: t.faq.a5 },
  { q: t.faq.q6, a: t.faq.a6 },
  { q: t.faq.q7, a: t.faq.a7 },
];

export function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  const faqs = getFaqs(t);

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
            {t.faq.badge}
          </span>
          <h2 id="faq-heading" className="text-headline text-white mb-4">
            {t.faq.title}
          </h2>
          <p className="text-gray-400 text-lg">
            {t.faq.subtitle}
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
