import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function GlitchScanEffect() {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;
    let scanTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Trigger scan effect on fast scroll
      if (scrollDelta > 150 && !isScanning) {
        setIsScanning(true);
        
        scanTimeout = setTimeout(() => {
          setIsScanning(false);
        }, 600);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scanTimeout);
    };
  }, [isScanning]);

  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          initial={{ top: '-10%' }}
          animate={{ top: '110%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'linear' }}
          className="fixed left-0 right-0 h-24 pointer-events-none z-50"
          style={{
            background: `linear-gradient(180deg, 
              transparent 0%, 
              rgba(230, 48, 48, 0.3) 20%, 
              rgba(230, 48, 48, 0.6) 50%, 
              rgba(230, 48, 48, 0.3) 80%, 
              transparent 100%)`,
            boxShadow: '0 0 40px rgba(230, 48, 48, 0.5)',
          }}
        >
          {/* Scan line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/80" />
          
          {/* Glitch text overlay */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-anarchy-red"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.2 }}
          >
            [SCANNING...]
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Section transition component
export function SectionGlitchTransition() {
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setShowGlitch(true);
            setTimeout(() => setShowGlitch(false), 500);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {showGlitch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.8, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(230, 48, 48, 0.03) 2px,
              rgba(230, 48, 48, 0.03) 4px
            )`,
          }}
        />
      )}
    </AnimatePresence>
  );
}
