import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Zap, Download, Check, 
  Headphones, BookOpen, FileText,
  ArrowLeft, Sparkles,
  Box
} from 'lucide-react';
// Build: v2.1.3
import { ChatWidget } from './components/ChatWidget';
import { Pricing } from './components/Pricing';
import { Features } from './components/Features';
import { PrivacyPolicy, TermsOfService, Disclaimer } from './components/LegalPages';
import EarlyAccess from './components/EarlyAccess';

function App() {
  const [showBilling, setShowBilling] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms' | 'disclaimer'>('home');

  // Read URL on mount to determine initial page
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/privacy') setCurrentPage('privacy');
    else if (path === '/terms') setCurrentPage('terms');
    else if (path === '/disclaimer') setCurrentPage('disclaimer');
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/privacy') setCurrentPage('privacy');
      else if (path === '/terms') setCurrentPage('terms');
      else if (path === '/disclaimer') setCurrentPage('disclaimer');
      else setCurrentPage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigate function that updates URL
  const navigateTo = (page: 'home' | 'privacy' | 'terms' | 'disclaimer') => {
    setCurrentPage(page);
    if (page === 'home') {
      window.history.pushState({}, '', '/');
    } else {
      window.history.pushState({}, '', `/${page}`);
    }
  };

  if (currentPage === 'privacy') return <PrivacyPolicy onBack={() => navigateTo('home')} />;
  if (currentPage === 'terms') return <TermsOfService onBack={() => navigateTo('home')} />;
  if (currentPage === 'disclaimer') return <Disclaimer onBack={() => navigateTo('home')} />;

  if (showBilling) {
    return (
      <div className="min-h-screen bg-anarchy-dark p-6 noise-overlay">
        <div className="max-w-4xl mx-auto pt-20">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowBilling(false)} 
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 glass px-4 py-2 rounded-full"
          >
            <ArrowLeft size={20} />
            Back to Home
          </motion.button>

          <Pricing />
        </div>

        <ChatWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-anarchy-dark noise-overlay overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-black/75 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="text-2xl font-bold text-white flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <img src="/logo.png" alt="Anarchy AI" className="w-8 h-8 rounded-lg" />
            Anarchy<span className="text-anarchy-red">AI</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Philosophy', 'Pricing'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-gray-400 hover:text-white transition-colors text-sm relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-anarchy-red transition-all group-hover:w-full" />
              </motion.a>
            ))}
            <motion.a 
              href="#download" 
              className="border border-[#E63030] text-[#E63030] hover:bg-[#E63030] hover:text-white transition-colors duration-200 px-4 py-2 rounded-md text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2740%27%20height%3D%2740%27%20viewBox%3D%270%200%2040%2040%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27none%27%20stroke%3D%27rgba(230%2C48%2C48%2C0.04)%27%20stroke-width%3D%271%27%3E%3Cpath%20d%3D%27M40%200H0v40%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="hero-glow" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-sm mb-8"
            >
              <Sparkles size={16} />
              AI-Powered Architecture Workflow
            </motion.span>
            
            <h1 className="text-display text-white mb-6">
              <span className="word-reveal" style={{animationDelay:'0.3s'}}>The</span>{' '}
              <span className="word-reveal" style={{animationDelay:'0.42s'}}>Intelligence</span>{' '}
              <span className="word-reveal" style={{animationDelay:'0.54s'}}>Layer</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red via-red-400 to-anarchy-red animate-gradient">
                <span className="word-reveal" style={{animationDelay:'0.66s'}}>for</span>{' '}
                <span className="word-reveal" style={{animationDelay:'0.78s'}}>Architectural</span>{' '}
                <span className="word-reveal" style={{animationDelay:'0.90s'}}>Visualization</span>
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
              Node-based AI workflows — designed for architects, built for scale.
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <motion.a 
                href="#download" 
                className="btn-shimmer bg-[#E63030] hover:bg-[#c42828] text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Early Access
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a 
                href="#features" 
                className="border border-white/20 text-white/80 hover:border-white/40 px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.a>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, y: 60, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }} 
            className="mt-20 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-anarchy-red/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
            <div className="glass rounded-3xl p-3 relative">
              <div className="bg-anarchy-dark rounded-2xl aspect-video overflow-hidden border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop" 
                  alt="Anarchy AI Dashboard" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
                {/* Overlay UI Elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-anarchy-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {['flux-schnell', 'flux-dev', 'ideogram'].map((model, i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-anarchy-gray border-2 border-anarchy-dark flex items-center justify-center text-xs font-medium text-gray-400">
                          {model.slice(0, 2).toUpperCase()}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">AI Models Ready</span>
                  </div>
                  <div className="flex items-center gap-2 text-anarchy-red">
                    <div className="w-2 h-2 rounded-full bg-anarchy-red animate-pulse" />
                    <span className="text-sm">Live Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <Features />

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-anarchy-dark via-anarchy-gray to-anarchy-dark" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-sm mb-6">
              <Box size={16} />
              Our Vision
            </span>
            <h2 className="text-headline text-white mb-6">The Master Builder Philosophy</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Merging design and execution into a seamless creative process
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Design Meets Execution</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Traditional architectural tools separate design from execution. Anarchy AI bridges this gap with an integrated workflow that transforms ideas into reality.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Visual Workflow Design', desc: 'Intuitive node-based interface' },
                  { title: 'Real-time AI Processing', desc: 'Instant feedback and iteration' },
                  { title: 'Iterative Refinement', desc: 'Continuous improvement cycles' },
                  { title: 'Seamless Integration', desc: 'Works with your existing tools' }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-anarchy-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-anarchy-red/20 transition-colors">
                      <Check size={16} className="text-anarchy-red" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-anarchy-red/20 to-purple-500/20 rounded-3xl blur-2xl" />
              <div className="glass rounded-3xl p-4 relative">
                <div className="relative rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop" 
                    alt="Architecture Workflow" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-anarchy-dark via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-anarchy-red/20 flex items-center justify-center">
                          <Zap size={20} className="text-anarchy-red" />
                        </div>
                        <div>
                          <div className="text-white font-medium">Workflow Active</div>
                          <div className="text-sm text-gray-400">Processing 4 nodes simultaneously</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* Early Access CTA */}
      <EarlyAccess />

      {/* Download Section */}
      <section id="download" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-anarchy-gray via-anarchy-dark to-anarchy-dark" />
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-sm mb-6">
              <Download size={16} />
              Free Download
            </span>
            <h2 className="text-headline text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Download Anarchy AI and transform your architectural workflow today. Free to start, pay-as-you-go for AI generation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-anarchy-red to-red-600 text-white px-10 py-4 rounded-xl font-medium hover:shadow-[0_0_40px_rgba(225,29,72,0.4)] transition-all flex items-center gap-2 group"
              >
                <Download size={20} />
                Download for Windows
                <span className="text-white/60 text-sm">v2.1.0</span>
              </motion.button>
              <button className="glass text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all border border-white/10">
                System Requirements
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Check size={14} className="text-anarchy-red" />
                Windows 10/11
              </span>
              <span className="flex items-center gap-2">
                <Check size={14} className="text-anarchy-red" />
                8GB RAM minimum
              </span>
              <span className="flex items-center gap-2">
                <Check size={14} className="text-anarchy-red" />
                GPU Recommended
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-anarchy-dark to-anarchy-gray" />
        <div className="absolute inset-0 grid-pattern opacity-5" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-sm mb-6">
              <Headphones size={16} />
              We're Here to Help
            </span>
            <h2 className="text-headline text-white mb-6">Support & Resources</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to master Anarchy AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Headphones, title: '24/7 Support', description: 'Get help whenever you need it with our dedicated support team. Response within hours.', gradient: 'from-blue-500/20 to-cyan-500/20' },
              { icon: BookOpen, title: 'Documentation', description: 'Comprehensive guides and tutorials. From basics to advanced workflow design.', gradient: 'from-green-500/20 to-emerald-500/20' },
              { icon: FileText, title: 'Blueprints', description: 'Professional workflow templates created by experts. Import and customize instantly.', gradient: 'from-purple-500/20 to-pink-500/20' }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl p-8 hover:border-anarchy-red/30 transition-all group cursor-pointer"
              >
                <div className={`
                  w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient}
                  flex items-center justify-center mb-6 group-hover:scale-110 transition-transform
                `}>
                  <item.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-anarchy-red transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 bg-anarchy-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Anarchy AI" className="w-8 h-8 rounded-lg" />
                <span className="text-xl font-bold text-white">Anarchy<span className="text-anarchy-red">AI</span></span>
              </div>
              <p className="text-gray-500 max-w-sm">
                Designed for architects. Powered by AI.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#features" className="hover:text-anarchy-red transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-anarchy-red transition-colors">Pricing</a></li>
                <li><a href="#download" className="hover:text-anarchy-red transition-colors">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-500">
                <li><button onClick={() => navigateTo('privacy')} className="hover:text-anarchy-red transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigateTo('terms')} className="hover:text-anarchy-red transition-colors">Terms of Service</button></li>
                <li><button onClick={() => navigateTo('disclaimer')} className="hover:text-anarchy-red transition-colors">Disclaimer</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-gray-600 text-sm">
                © 2025 Anarchy AI. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <a href="#" className="hover:text-gray-400 transition-colors">Twitter/X</a>
                <a href="#" className="hover:text-gray-400 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-gray-400 transition-colors">GitHub</a>
                <a href="#" className="hover:text-gray-400 transition-colors">Discord</a>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <button onClick={() => navigateTo('privacy')} className="hover:text-gray-400 transition-colors">Privacy</button>
              <button onClick={() => navigateTo('terms')} className="hover:text-gray-400 transition-colors">Terms</button>
              <button onClick={() => navigateTo('disclaimer')} className="hover:text-gray-400 transition-colors">Disclaimer</button>
            </div>
          </div>
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
