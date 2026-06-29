import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, MapPin, ChevronUp } from 'lucide-react';

export function ScrollProgressTerminal() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentSection, setCurrentSection] = useState('Hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        setScrollPercent(Math.min(100, Math.max(0, scrolled)));
        
        // Detect current section
        const sections = ['Hero', 'Features', 'SubjectProfile', 'MissionReport', 'Pricing', 'Contact'];
        const sectionElements = sections.map(id => document.getElementById(id.toLowerCase()));
        
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const element = sectionElements[i];
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
              setCurrentSection(sections[i]);
              break;
            }
          }
        }

        // Show/hide based on scroll
        setIsVisible(window.scrollY > 100);
        
        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 left-6 z-40 hidden md:block"
    >
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-3 font-mono text-xs shadow-lg">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-2">
          <Terminal size={14} className="text-anarchy-red" />
          <div className="flex-1">
            <div className="h-1 w-32 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-anarchy-red"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>
          </div>
          <span className="text-gray-400 w-10 text-right">{Math.round(scrollPercent)}%</span>
        </div>

        {/* Current Section */}
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <MapPin size={12} className="text-green-400" />
          <span className="text-gray-300">SECT: {currentSection}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 text-gray-500">
          <Activity size={12} className="text-blue-400" />
          <span>SCROLL_ACTIVE</span>
        </div>

        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 bg-anarchy-red/10 border border-anarchy-red/30 rounded hover:bg-anarchy-red/20 transition-colors text-anarchy-red"
        >
          <ChevronUp size={12} />
          <span>[RETURN_TOP]</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
