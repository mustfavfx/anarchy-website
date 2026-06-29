import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const getRows = (t: any) => [
  { feature: t.comparison.nodeBased, anarchy: true, traditional: false, others: false },
  { feature: t.comparison.direct3ds, anarchy: true, traditional: false, others: false },
  { feature: t.comparison.aiEngines, anarchy: true, traditional: false, others: false },
  { feature: t.comparison.batchGeneration, anarchy: true, traditional: false, others: t.comparison.limited },
  { feature: t.comparison.runsOffline, anarchy: true, traditional: false, others: false },
  { feature: 'Pay-as-you-go pricing', anarchy: true, traditional: false, others: true },
  { feature: 'Client presentation mode', anarchy: true, traditional: false, others: false },
  { feature: 'Architectural preset library', anarchy: true, traditional: false, others: 'Partial' },
];

type CellValue = boolean | string;

function Cell({ value }: Readonly<{ value: CellValue }>) {
  if (value === true)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-anarchy-red/15">
        <Check size={14} className="text-anarchy-red" />
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5">
        <X size={14} className="text-gray-600" />
      </span>
    );
  return <span className="text-xs text-gray-500">{value}</span>;
}

export function Comparison() {
  const { t } = useLanguage();
  const rows = getRows(t);
  return (
    <section id="comparison" className="py-28 px-6 relative" aria-labelledby="comparison-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-anarchy-gray/20 via-anarchy-dark to-anarchy-dark" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-5">
            {t.comparison.badge}
          </span>
          <h2 id="comparison-heading" className="text-headline text-white mb-4">
            {t.comparison.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red to-red-400">
              {t.comparison.highlight}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {t.comparison.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl overflow-hidden border border-white/[0.07]"
        >
          {/* Header */}
          <div className="grid grid-cols-4 text-sm font-medium border-b border-white/[0.07]">
            <div className="px-6 py-4 text-gray-500">{t.comparison.feature}</div>
            <div className="px-6 py-4 text-center text-white bg-anarchy-red/5 border-x border-anarchy-red/10">
              <span className="text-anarchy-red font-semibold">{t.comparison.anarchyAI}</span>
            </div>
            <div className="px-6 py-4 text-center text-gray-500">{t.comparison.traditionalRender}</div>
            <div className="px-6 py-4 text-center text-gray-500">{t.comparison.genericAI}</div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-4 text-sm border-b border-white/[0.04] last:border-0 ${
                i % 2 === 0 ? 'bg-white/[0.01]' : ''
              }`}
            >
              <div className="px-6 py-4 text-gray-300 font-medium">{row.feature}</div>
              <div className="px-6 py-4 flex items-center justify-center bg-anarchy-red/[0.03] border-x border-anarchy-red/[0.07]">
                <Cell value={row.anarchy} />
              </div>
              <div className="px-6 py-4 flex items-center justify-center">
                <Cell value={row.traditional} />
              </div>
              <div className="px-6 py-4 flex items-center justify-center">
                <Cell value={row.others} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
