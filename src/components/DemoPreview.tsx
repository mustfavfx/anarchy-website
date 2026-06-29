import { motion } from 'framer-motion';
import { Upload, GitBranch, Layers, Save, Play } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const getSteps = (t: any) => [
  {
    icon: Upload,
    title: t.demo.step1.title,
    description: t.demo.step1.body,
    image: 'https://placehold.co/600x400/1a1a1e/E63030?text=Import+Step',
  },
  {
    icon: GitBranch,
    title: t.demo.step2.title,
    description: t.demo.step2.body,
    image: 'https://placehold.co/600x400/1a1a1e/E63030?text=Connect+Step',
  },
  {
    icon: Layers,
    title: t.demo.step3.title,
    description: t.demo.step3.body,
    image: 'https://placehold.co/600x400/1a1a1e/E63030?text=Generate+Step',
  },
  {
    icon: Save,
    title: t.demo.step4.title,
    description: t.demo.step4.body,
    image: 'https://placehold.co/600x400/1a1a1e/E63030?text=Export+Step',
  },
];

export function DemoPreview() {
  const { t } = useLanguage();
  const steps = getSteps(t);
  const [activeStep, setActiveStep] = useState(0);
  const [showVideoPlaceholder, setShowVideoPlaceholder] = useState(false);

  return (
    <section id="demo" className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-anarchy-dark" />
      {/* Smooth fade transition from Hero section - Extended gradient */}
      <div
        className="absolute -top-48 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,12,0) 0%, rgba(10,10,12,0.3) 40%, rgba(10,10,12,0.7) 70%, #0a0a0c 100%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-anarchy-red text-sm font-medium uppercase tracking-widest mb-3 block">
            {t.demo.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.demo.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.demo.description}
          </p>
        </motion.div>

        {/* Video Placeholder Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-16"
        >
          <div className="relative glass rounded-2xl overflow-hidden ring-1 ring-white/[0.08]">
            {showVideoPlaceholder ? (
              <div className="aspect-video bg-anarchy-dark flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-anarchy-red/20 flex items-center justify-center mx-auto mb-4">
                    <Play size={24} className="text-anarchy-red ml-1" />
                  </div>
                  <p className="text-gray-400 text-sm">Video coming soon</p>
                  <button
                    onClick={() => setShowVideoPlaceholder(false)}
                    className="text-anarchy-red text-xs mt-2 hover:underline"
                  >
                    Back to workflow preview
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-anarchy-dark relative overflow-hidden">
                {/* Windows Frame Header */}
                <div className="h-8 bg-[#1e1e1e] border-b border-white/10 flex items-center px-3 gap-2">
                  {/* Window controls - Windows style (right side) */}
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                  </div>
                  {/* Window title */}
                  <span className="text-xs text-gray-500">Anarchy AI Builder</span>
                  <div className="flex-1" />
                </div>
                
                {/* Active Step Screenshot */}
                <div className="absolute inset-8 top-8">
                  <img
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    className="w-full h-full object-cover object-top opacity-90 transition-all duration-500 rounded-b-lg"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay with step info */}
                <div className="absolute inset-x-8 bottom-8 bg-gradient-to-t from-anarchy-dark via-anarchy-dark/80 to-transparent pt-20 pb-6 px-6 rounded-b-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-anarchy-red/20 flex items-center justify-center">
                      {(() => {
                        const IconComponent = steps[activeStep].icon;
                        return <IconComponent size={20} className="text-anarchy-red" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-anarchy-red text-xs font-medium uppercase tracking-wider">
                        Step {activeStep + 1} of {steps.length}
                      </span>
                      <h3 className="text-white font-semibold">{steps[activeStep].title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{steps[activeStep].description}</p>
                </div>

                {/* Play button for video */}
                <button
                  onClick={() => setShowVideoPlaceholder(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-anarchy-red/90 hover:bg-anarchy-red flex items-center justify-center transition-all hover:scale-110 group"
                  aria-label="Play video walkthrough"
                >
                  <Play size={24} className="text-white ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-anarchy-red/10 via-purple-500/5 to-transparent rounded-3xl blur-2xl -z-10" />
        </motion.div>

        {/* Step Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            
            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(index)}
                className={`text-left p-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-anarchy-red/10 ring-1 ring-anarchy-red/30'
                    : 'bg-white/[0.02] hover:bg-white/[0.04] ring-1 ring-white/[0.05]'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  isActive ? 'bg-anarchy-red/20' : 'bg-white/[0.05]'
                }`}>
                  <Icon size={20} className={isActive ? 'text-anarchy-red' : 'text-gray-500'} />
                </div>
                <h4 className={`font-medium mb-1 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {step.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                
                {/* Progress indicator */}
                <div className="mt-3 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isActive ? 'bg-anarchy-red w-full' : 'w-0'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
