import { motion } from 'framer-motion';
import { 
  Book, 
  Layers, 
  Cpu, 
  Zap, 
  Monitor, 
  CreditCard,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
const docSections = [
  {
    icon: Layers,
    title: 'Getting Started',
    description: 'Version 0.7.0 - AI-powered architectural visualization',
    items: [
      'Download & Install (Windows)',
      'System Requirements',
      'Node.js 18+ Required',
      'Quick Start: npm run dev'
    ]
  },
  {
    icon: Cpu,
    title: 'Builder Workflow',
    description: 'Node-based AI image generation system',
    items: [
      'Create Nodes',
      'Connect Workflows',
      'AI Model Selection',
      'Real-time Preview'
    ]
  },
  {
    icon: Zap,
    title: 'AI Engines',
    description: 'Multi-engine support with exact credit costs',
    items: [
      'FLUX 2 Pro (1 credit)',
      'Seedream 4.5 (1 credit)',
      'GPT Image 2: Low (1cr), High (2cr)',
      'Nano Banana 2 16K (3 credits)'
    ]
  },
  {
    icon: CreditCard,
    title: 'Credits & Billing',
    description: 'Credit-based system with Stripe payments',
    items: [
      '$10 → 105 credits | $20 → 215 credits',
      '$50 → 550 credits | $100 → 1,150 credits',
      '$1000 → 12,000 credits | Custom $5+',
      'Video: 480p (14cr/sec), 720p (38cr/sec)',
      'Upscale: 1-2 credits'
    ]
  },
  {
    icon: Monitor,
    title: 'Features',
    description: 'Complete feature set v0.7.0',
    items: [
      'History System - Track all generations',
      'Library - Organize images',
      'Generate - AI chat for architecture',
      'Integrations - 3ds Max, Revit, SketchUp, ArchiCAD, AutoCAD'
    ]
  },
  {
    icon: Book,
    title: 'Keyboard Shortcuts',
    description: 'Quick actions for productivity',
    items: [
      'Ctrl + S: Save project',
      'Ctrl + Shift + S: Save as...',
      'Ctrl + O: Open project',
      'All data stored in localStorage'
    ]
  }
];

export function Documentation() {
  
  return (
    <div className="min-h-screen bg-anarchy-dark pt-32 pb-20 px-6">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-anarchy-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-anarchy-red/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Book size={16} className="text-anarchy-red" />
            <span className="text-anarchy-red text-sm font-medium">Documentation</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How to Use <span className="text-anarchy-red">Anarchy AI</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to know to create stunning AI-powered architectural renders
          </p>
        </motion.div>

        {/* Doc Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(230,48,48,0.3)' }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-anarchy-red/10 border border-anarchy-red/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-anarchy-red" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{section.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{section.description}</p>

                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <ArrowRight size={14} className="text-anarchy-red" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Download CTA */}
        <motion.div 
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-anarchy-red/10 to-transparent border border-anarchy-red/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Start?</h3>
          <p className="text-gray-400 mb-6">Download Anarchy AI and create your first render today</p>
          <motion.a
            href="#download"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-anarchy-red text-white font-medium hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Now
            <ExternalLink size={18} />
          </motion.a>
        </motion.div>

        {/* Help Section */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500">
            Need more help? Contact us at{' '}
            <a href="mailto:anarchy.lat@gmail.com" className="text-anarchy-red hover:underline">
              anarchy.lat@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
