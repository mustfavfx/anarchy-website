import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations, Translations } from '../translations';

interface LanguageContextType {
  lang: 'en' | 'ar';
  toggleLang: () => void;
  setLang: (lang: 'en' | 'ar') => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<'en' | 'ar'>('en');

  const toggleLang = useCallback(() => {
    setLangState(prev => prev === 'en' ? 'ar' : 'en');
  }, []);

  const setLang = useCallback((newLang: 'en' | 'ar') => {
    setLangState(newLang);
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, t }}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={lang === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
