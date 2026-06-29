import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  Image as ImageIcon, 
  Folder, 
  Puzzle, 
  Library, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function ProductShowcase() {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<number | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  const slides = [
    {
      id: 'canvas',
      icon: GitBranch,
      label: t.showcase.canvasLabel,
      heading: t.showcase.canvasHeading,
      body: t.showcase.canvasBody,
      image: '/screenshots/1.png',
      badge: t.showcase.canvasBadge,
    },
    {
      id: 'renders',
      icon: ImageIcon,
      label: t.showcase.rendersLabel,
      heading: t.showcase.rendersHeading,
      body: t.showcase.rendersBody,
      image: '/screenshots/2.png',
      badge: t.showcase.rendersBadge,
    },
    {
      id: 'projects',
      icon: Folder,
      label: t.showcase.projectsLabel,
      heading: t.showcase.projectsHeading,
      body: t.showcase.projectsBody,
      image: '/screenshots/3.png',
      badge: t.showcase.projectsBadge,
    },
    {
      id: 'extensions',
      icon: Puzzle,
      label: t.showcase.extensionsLabel,
      heading: t.showcase.extensionsHeading,
      body: t.showcase.extensionsBody,
      image: '/screenshots/4.png',
      badge: t.showcase.extensionsBadge,
    },
    {
      id: 'library',
      icon: Library,
      label: t.showcase.libraryLabel,
      heading: t.showcase.libraryHeading,
      body: t.showcase.libraryBody,
      image: '/screenshots/5.png',
      badge: t.showcase.libraryBadge,
    },
  ];

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
    lastInteractionRef.current = Date.now();
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
    lastInteractionRef.current = Date.now();
  };

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setProgress(0);
    lastInteractionRef.current = Date.now();
  };

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Autoplay and progress bar logic
  useEffect(() => {
    const intervalTime = 50; // Update progress bar every 50ms
    const totalDuration = 6000; // 6 seconds per slide
    const increment = (intervalTime / totalDuration) * 100;

    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        // Pause briefly if there was a very recent manual interaction
        if (Date.now() - lastInteractionRef.current < 2000) {
          return;
        }
        
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveIndex((idx) => (idx + 1) % slides.length);
            setDirection(1);
            return 0;
          }
          return prev + increment;
        });
      }, intervalTime);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, slides.length]);

  const activeSlide = slides[activeIndex];
  const isRtl = lang === 'ar';

  // Animation variants for the 3D page flip effect on the raw image (softer 35deg rotation)
  const pageFlipVariants = {
    initial: (dir: number) => ({
      rotateY: dir > 0 ? (isMobile ? 0 : 35) : (isMobile ? 0 : -35),
      opacity: 0,
      scale: 0.97,
      z: -50,
      x: isMobile ? (dir > 0 ? 30 : -30) : 0
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1], // easeOutQuart
      }
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? (isMobile ? 0 : -35) : (isMobile ? 0 : 35),
      opacity: 0,
      scale: 0.97,
      z: -50,
      x: isMobile ? (dir > 0 ? -30 : 30) : 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1]
      }
    })
  };

  const textVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  return (
    <section id="showcase" className="py-16 md:py-28 px-4 md:px-6 relative overflow-hidden bg-[#09090b]" aria-labelledby="showcase-heading">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(230,48,48,0.08),rgba(0,0,0,0))]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-anarchy-red/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-5 uppercase">
            {t.showcase.badge}
          </span>
          <h2 id="showcase-heading" className="text-headline text-white mb-4">
            {t.showcase.title1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red to-red-400">
              {t.showcase.highlight}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {t.showcase.description}
          </p>
        </motion.div>

        {/* Showcase Content Layout: Image on top, details underneath (pauses on hover) */}
        <div 
          className="max-w-4xl mx-auto flex flex-col items-center space-y-10"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          
          {/* Top: Large Borderless Image with 3D Page Flip (fixed height to prevent layout shifts) */}
          <div 
            className="w-full h-[320px] sm:h-[450px] md:h-[560px] relative flex items-center justify-center select-none" 
            style={{ perspective: 1200 }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeSlide.id}
                custom={direction}
                variants={pageFlipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ 
                  transformOrigin: isMobile ? 'center center' : (isRtl ? 'right center' : 'left center'), 
                  transformStyle: 'preserve-3d' 
                }}
                className="w-full h-full flex items-center justify-center"
              >
                {/* Borderless screenshot image - fits inside fixed-height parent */}
                <img
                  src={activeSlide.image}
                  alt={activeSlide.heading}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/[0.05] transition-all duration-300 hover:scale-[1.005]"
                  loading="eager"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom: Details Card */}
          <div className="w-full max-w-3xl bg-[#111113] rounded-2xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-6 md:p-8 flex flex-col space-y-6">
            
            {/* Slide Information */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-[10px] font-semibold uppercase tracking-wider">
                    {activeSlide.badge}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">
                    {isRtl ? `صفحة 0${activeIndex + 1} / 0${slides.length}` : `PAGE 0${activeIndex + 1} / 0${slides.length}`}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-anarchy-red/10 flex items-center justify-center">
                    <activeSlide.icon size={14} className="text-anarchy-red" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    {activeSlide.label}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {activeSlide.heading}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed min-h-[50px]">
                  {activeSlide.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Strip */}
            <div className="pt-4 border-t border-white/[0.05] flex flex-col sm:flex-row gap-4 justify-between items-center">
              
              {/* Clickable Chapter Tabs */}
              <div className={`flex flex-wrap gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                {slides.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => handleSelect(index)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                        isActive 
                          ? 'bg-anarchy-red text-white shadow-[0_0_12px_rgba(230,48,48,0.4)]' 
                          : 'bg-white/[0.02] border border-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {slide.label}
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next & Play / Pause Controls */}
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={handlePrev}
                    className="w-8 h-8 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-95"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-8 h-8 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-95"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-95"
                  aria-label={isPlaying ? "Pause auto-play" : "Start auto-play"}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>
            </div>

            {/* Auto-play Progress Bar */}
            <div className="h-[2px] w-full bg-white/[0.03] rounded-full overflow-hidden">
              <div 
                className="h-full bg-anarchy-red transition-all duration-75"
                style={{ width: `${isPlaying ? progress : 0}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
