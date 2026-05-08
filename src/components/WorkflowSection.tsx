import { motion } from 'framer-motion';
import { Upload, Cpu, Sliders, Download } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Import Your Scene',
    body: 'Connect 3ds Max, Revit, or AutoCAD via our native plugin. Or drop any reference image directly onto the canvas.',
    color: 'from-blue-500/20 to-cyan-500/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'Build Your Node Graph',
    body: 'Chain AI nodes together — upscaler, renderer, style transfer, inpainter. Design your own pipeline or start from a preset.',
    color: 'from-purple-500/20 to-violet-500/10',
    iconColor: 'text-purple-400',
  },
  {
    icon: Sliders,
    step: '03',
    title: 'Tune & Batch Generate',
    body: 'Adjust prompts, engine settings, and resolution per node. Hit Generate and let all variations run in parallel.',
    color: 'from-anarchy-red/20 to-orange-500/10',
    iconColor: 'text-anarchy-red',
  },
  {
    icon: Download,
    step: '04',
    title: 'Export & Present',
    body: 'Export full-resolution renders, switch to Client Mode for presentations, or sync outputs back to your 3D file.',
    color: 'from-green-500/20 to-emerald-500/10',
    iconColor: 'text-green-400',
  },
];

export function WorkflowSection() {
  return (
    <section id="workflow" className="py-28 px-6 relative" aria-labelledby="workflow-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-anarchy-dark via-anarchy-gray/40 to-anarchy-dark" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-5">
            How It Works
          </span>
          <h2 id="workflow-heading" className="text-headline text-white mb-4">
            From Reference to Final Render{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red to-red-400">
              in Minutes
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A four-step workflow that replaces days of manual rendering iteration.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative"
              >
                <div className={`glass-card rounded-2xl p-7 border border-white/[0.06] hover:border-anarchy-red/20 transition-all duration-300 h-full`}>
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <step.icon size={22} className={step.iconColor} />
                    </div>
                    <span className="text-3xl font-bold text-white/[0.06] tabular-nums">{step.step}</span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
