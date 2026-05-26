import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Use Cases', href: '#usecases' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    if (!isHome) return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-anarchy-dark/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/20' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label="Anarchy AI home"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-anarchy-red/40 transition-all">
            <img src="/logo.png" alt="" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Anarchy<span className="text-anarchy-red">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              {isHome ? (
                <button
                  onClick={() => handleAnchor(link.href)}
                  className="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-md hover:bg-white/5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-anarchy-red"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={`/${link.href}`}
                  className="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-md hover:bg-white/5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-anarchy-red"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            onClick={() => handleAnchor('#download')}
            className="btn-shimmer bg-anarchy-red text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-anarchy-red/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Download
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-anarchy-red"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-anarchy-dark/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleAnchor(link.href)}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-white/5 mt-3">
                <button
                  onClick={() => handleAnchor('#download')}
                  className="w-full bg-anarchy-red text-white text-sm font-medium px-4 py-3 rounded-lg hover:bg-anarchy-red/90 transition-colors text-center"
                >
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
