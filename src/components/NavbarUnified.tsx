import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronRight, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

const getNavLinks = (t: any) => [
  { label: t.nav.workflow, href: '#workflow' },
  { label: t.nav.pricing, href: '#pricing' },
  { label: t.nav.faq, href: '#faq' },
];

export function NavbarUnified() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t } = useLanguage();
  const navLinks = getNavLinks(t);
  
  const { scrollY } = useScroll();
  // Consistent background for all pages - no transparency
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 12, 0.95)', 'rgba(10, 10, 12, 0.98)']
  );
  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(230, 48, 48, 0.2)', 'rgba(230, 48, 48, 0.3)']
  );

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px',
    });
    
    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    if (!isHome) return;
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      dir="ltr"
    >
      <motion.nav
        style={{ 
          backgroundColor: navBackground,
          borderBottomColor: navBorder,
        }}
        className="border-b backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          {/* Logo with animation - Always on Left side */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="flex items-center gap-3 group"
              aria-label="Anarchy AI home"
            >
              {/* Animated logo mark */}
              <div className="relative w-10 h-10">
                <motion.div
                  className="absolute inset-0 bg-anarchy-red/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <img src="/logo.png" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white font-['Bebas_Neue']">
                  ANARCHY
                </span>
                <span className="text-xs text-anarchy-red font-bold tracking-widest -mt-1">
                  AI
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Links - Centered */}
          <ul className="hidden md:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2" role="list">
            {navLinks.map((link) => (
              <li key={link.label} className="relative">
                <motion.button
                  onClick={() => handleAnchor(link.href)}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${activeSection === link.href.slice(1) 
                      ? 'text-anarchy-red' 
                      : 'text-gray-400 hover:text-white'
                    }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                  
                  {/* Hover indicator */}
                  <AnimatePresence>
                    {hoveredLink === link.label && (
                      <motion.span
                        layoutId="hoverIndicator"
                        className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Active indicator */}
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-anarchy-red rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA with enhanced animation - Always on Right side */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0 ml-auto">
            {/* Language toggle */}
            <LanguageToggle />
            
            <motion.button
              onClick={() => handleAnchor('#download')}
              className="btn-brand group text-xs px-3 py-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={14} className="group-hover:animate-bounce" />
              {t.nav.download}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Mobile hamburger with animation */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu with slide animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden bg-anarchy-dark/98 backdrop-blur-xl border-t border-white/5"
            >
              <div className="px-6 py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleAnchor(link.href)}
                    className={`block w-full text-left px-4 py-3 text-base rounded-lg transition-all
                      ${activeSection === link.href.slice(1)
                        ? 'bg-anarchy-red/10 text-anarchy-red border-l-2 border-anarchy-red'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 border-t border-white/5 flex items-center gap-3"
                >
                  <LanguageToggle />
                  <button
                    onClick={() => handleAnchor('#download')}
                    className="flex-1 btn-brand justify-center"
                  >
                    <Download size={18} />
                    {t.nav.download}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}
