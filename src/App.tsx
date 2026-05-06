import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Layers, Cpu, Shield, Download, Mail, Check, FileText, Headphones, BookOpen, CreditCard, Coins, ArrowLeft } from 'lucide-react';
import { ChatWidget } from './ChatWidget';

function App() {
  const [showBilling, setShowBilling] = useState(false);

  if (showBilling) {
    return (
      <div className="min-h-screen bg-anarchy-dark p-6">
        <div className="max-w-3xl mx-auto pt-20">
          <button onClick={() => setShowBilling(false)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
            <ArrowLeft size={20} />
            Back to Home
          </button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Billing</h1>
            <p className="text-gray-400">Add credits to your account</p>
          </div>

          {/* Current Balance */}
          <div className="bg-anarchy-gray border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-anarchy-red/10 flex items-center justify-center">
                <Coins size={28} className="text-anarchy-red" />
              </div>
              <div>
                <div className="text-gray-400 text-sm">Available Credits</div>
                <div className="text-3xl font-bold text-white">0 Credits</div>
              </div>
            </div>
          </div>

          {/* Credit Packages */}
          <div className="bg-anarchy-gray border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Credit Amount</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { amount: 5, credits: 525 },
                { amount: 10, credits: 1050 },
                { amount: 20, credits: 2150 },
                { amount: 50, credits: 5500 },
                { amount: 100, credits: 11500 },
                { amount: 1000, credits: 125000 },
              ].map((pkg, index) => (
                <button key={index} className="bg-anarchy-dark border border-white/10 rounded-lg p-4 hover:border-anarchy-red/30 transition-colors">
                  <div className="text-xl font-bold text-white">${pkg.amount}</div>
                  <div className="text-gray-400 text-xs">{pkg.credits.toLocaleString()}</div>
                </button>
              ))}
              <button className="bg-anarchy-dark border border-white/10 rounded-lg p-4 hover:border-anarchy-red/30 transition-colors">
                <div className="text-xl font-bold text-white">Custom</div>
              </button>
            </div>
          </div>

          {/* Generation Costs */}
          <div className="bg-anarchy-gray border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Generation Costs (Credits)</h3>
            <div className="space-y-3">
              {[
                { name: 'Standard (flux-schnell)', cost: 3 },
                { name: 'HD (flux-dev)', cost: 25 },
                { name: '4K (flux-1.1-pro)', cost: 40 },
                { name: 'Premium (ideogram-v3)', cost: 90 },
                { name: 'Video 480p (per sec)', cost: 90 },
                { name: 'Video 720p (per sec)', cost: 250 },
                { name: 'Upscale', cost: 5 },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-anarchy-dark rounded-lg p-3">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-white font-semibold">{item.cost} Credits</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-anarchy-gray border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Payment Method
            </h3>
            <div className="bg-anarchy-dark rounded-lg p-4">
              <div className="flex items-center gap-4 text-gray-400">
                <span>Credit Card</span>
                <span>•</span>
                <span>PayPal</span>
                <span>•</span>
                <span>Bank Transfer</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Secure payments powered by Stripe</p>
            </div>
          </div>

          <button className="w-full bg-anarchy-red text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors">
            Purchase Credits
          </button>

          <p className="text-gray-500 text-sm mt-4 text-center">Credits expire after 1 year from purchase date</p>
        </div>

        <ChatWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-anarchy-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-anarchy-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            Anarchy<span className="text-anarchy-red">AI</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
            <a href="#philosophy" className="text-gray-400 hover:text-white transition-colors text-sm">Philosophy</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a>
            <a href="#download" className="bg-anarchy-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
              Download
            </a>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Node-based AI Automation<br />
              <span className="text-anarchy-red">for Architecture</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Build intelligent workflows with visual nodes. Automate your architectural design process with AI.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="#download" className="bg-anarchy-red text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
                Get Started <ArrowRight size={18} />
              </a>
              <a href="#features" className="border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/5 transition-colors">
                Learn More
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-16">
            <div className="bg-anarchy-gray border border-white/10 rounded-2xl p-4 max-w-5xl mx-auto">
              <div className="bg-anarchy-dark rounded-xl aspect-video flex items-center justify-center border border-white/5 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop" 
                  alt="Dashboard" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to automate your architectural workflow</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Visual Node Editor', description: 'Build complex workflows with an intuitive drag-and-drop interface.' },
              { icon: Layers, title: 'Multi-Stage Processing', description: 'Chain multiple AI operations together for complete automation.' },
              { icon: Cpu, title: 'AI-Powered Generation', description: 'Leverage state-of-the-art AI models for image generation.' },
              { icon: Shield, title: 'Secure & Private', description: 'Your data stays yours with local processing options.' },
              { icon: Download, title: 'Batch Processing', description: 'Process multiple images simultaneously to save time.' },
              { icon: Mail, title: 'Collaboration Ready', description: 'Share workflows with your team seamlessly.' }
            ].map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-anarchy-gray border border-white/10 rounded-2xl p-8 hover:border-anarchy-red/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-anarchy-red/10 flex items-center justify-center mb-6">
                  <feature.icon size={24} className="text-anarchy-red" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="philosophy" className="py-32 px-6 bg-gradient-to-b from-anarchy-dark to-anarchy-gray">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Master Builder Philosophy</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">Merging design and execution into a seamless creative process</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-2xl font-semibold text-white mb-6">Design Meets Execution</h3>
              <p className="text-gray-400 mb-6">Traditional architectural tools separate design from execution. Anarchy AI bridges this gap.</p>
              <ul className="space-y-4">
                {['Visual workflow design', 'Real-time AI processing', 'Iterative refinement', 'Seamless integration'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <Check size={18} className="text-anarchy-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-anarchy-dark border border-white/10 rounded-2xl p-8 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop" 
                alt="Architecture Workflow" 
                className="w-full h-full object-cover rounded-xl opacity-70"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Pay As You Go</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              No monthly subscriptions. Pay only for what you use. Purchase credits and use them whenever you need.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setShowBilling(true)} className="bg-anarchy-red text-white px-8 py-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
                <Coins size={20} />
                Purchase Credits
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="download" className="py-32 px-6 bg-gradient-to-b from-anarchy-gray to-anarchy-dark">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">Download Anarchy AI and transform your architectural workflow today.</p>
            <div className="flex items-center justify-center gap-4">
              <button className="bg-anarchy-red text-white px-8 py-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
                <Download size={20} />
                Download for Windows
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="support" className="py-32 px-6 bg-gradient-to-b from-anarchy-dark to-anarchy-gray">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Support & Resources</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to master Anarchy AI</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Headphones, title: '24/7 Support', description: 'Get help whenever you need it with our dedicated support team.' },
              { icon: BookOpen, title: 'Documentation', description: 'Comprehensive guides and tutorials to help you get started.' },
              { icon: FileText, title: 'Blueprints', description: 'Professional workflow templates created by experts.' }
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-anarchy-dark border border-white/10 rounded-2xl p-8 hover:border-anarchy-red/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-anarchy-red/10 flex items-center justify-center mb-6">
                  <item.icon size={24} className="text-anarchy-red" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2026 Anarchy AI. All rights reserved.</p>
        </div>
      </footer>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatWidget />
      </div>
    </div>
  );
}

export default App;
