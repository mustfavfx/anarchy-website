import { motion } from 'framer-motion';
import { Building2, Presentation, Users, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const getCases = (t: any) => [
  {
    icon: Building2,
    title: t.useCases.designDevelopment,
    body: t.useCases.case1Body,
    tags: [t.useCases.batchRender, t.useCases.styleExploration, t.useCases.fastIteration],
  },
  {
    icon: Presentation,
    title: t.useCases.clientPresentations,
    body: t.useCases.case2Body,
    tags: [t.useCases.clientMode, t.useCases.presentationTag, t.useCases.hdExport],
  },
  {
    icon: Users,
    title: t.useCases.case3Title,
    body: t.useCases.case3Body,
    tags: [t.useCases.competitionGrade, t.useCases.multiEngine, t.useCases.moodBoards],
  },
  {
    icon: Briefcase,
    title: t.useCases.case4Title,
    body: t.useCases.case4Body,
    tags: [t.useCases.revitIntegration, t.useCases.marketingReady, t.useCases.offPlan],
  },
];

export function UseCases() {
  const { t } = useLanguage();
  const cases = getCases(t);
  return (
    <section id="usecases" className="py-16 md:py-28 px-4 md:px-6 relative" aria-labelledby="usecases-heading">
      <div className="absolute inset-0 bg-anarchy-dark" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 40% at 20% 50%, rgba(230,48,48,0.12) 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-5">
            {t.useCases.badge}
          </span>
          <h2 id="usecases-heading" className="text-headline text-white mb-4">
            {t.useCases.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red to-red-400">
              {t.useCases.highlight}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {t.useCases.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-8 border border-white/[0.06] hover:border-anarchy-red/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-anarchy-red/10 flex items-center justify-center mb-5 group-hover:bg-anarchy-red/20 transition-colors">
                <c.icon size={22} className="text-anarchy-red" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-anarchy-red transition-colors">
                {c.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">{c.body}</p>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 bg-white/[0.04] border border-white/[0.07] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
