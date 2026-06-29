import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.button
      onClick={toggleLang}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors border border-white/10 rounded-lg hover:border-anarchy-red/50"
    >
      <Globe size={16} className="text-anarchy-red" />
      <span>{lang === 'en' ? 'EN' : 'عربي'}</span>
    </motion.button>
  );
}
