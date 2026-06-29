import { Instagram, Send, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const getFooterLinks = (t: any) => ({
  product: [
    { label: t.footer.download, href: '#download' },
    { label: t.footer.documentation, href: '/docs' },
    { label: t.footer.changelog, href: '/changelog' },
  ],
  resources: [
    { label: t.footer.community, href: 'https://t.me/anarchyforarchitecture' },
  ],
  legal: [
    { label: t.footer.privacy, href: '/privacy' },
    { label: t.footer.terms, href: '/terms' },
    { label: t.footer.disclaimer, href: '/disclaimer' },
  ],
});

// Only Telegram and Instagram
const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/anarchy.lat/', label: 'Instagram' },
  { icon: Send, href: 'https://t.me/anarchyforarchitecture', label: 'Telegram' },
];

export function FooterEnhanced() {
  const { t } = useLanguage();
  const footerLinks = getFooterLinks(t);
  const { scrollY } = useScroll();
  const progressWidth = useTransform(
    scrollY,
    [0, document?.body?.scrollHeight - window?.innerHeight || 1000],
    ['0%', '100%']
  );

  return (
    <footer className="relative pt-24 pb-8 px-6 overflow-hidden">
      {/* Top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-anarchy-red/50 to-transparent" />
      
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-anarchy-red/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg overflow-hidden ring-1 ring-anarchy-red/30">
                <img src="/logo.png" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-white">
                Anarchy<span className="text-anarchy-red">AI</span>
              </span>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              {t.footer.description}
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-anarchy-red/50 hover:text-anarchy-red transition-all group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t.footer.product}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-anarchy-red text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t.footer.resources}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-anarchy-red text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{t.footer.legal}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-anarchy-red text-sm transition-colors flex items-center gap-1">
                    {link.label}
                    <ExternalLink size={12} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large brand statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/5 pt-12 pb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <h3 className="text-4xl md:text-6xl font-black text-white/10 tracking-tight uppercase">
                Build Without
                <span className="block text-anarchy-red/20">Limits</span>
              </h3>
            </div>
            
            <div className="text-right">
              <p className="text-gray-600 text-sm mb-2">
                © {new Date().getFullYear()} Anarchy AI. {t.footer.rights}.
              </p>
              <p className="text-gray-700 text-xs">
                {t.footer.builtWith}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <div className="flex items-center justify-center gap-1 pt-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <div className="w-2 h-2 bg-anarchy-red/30 rotate-45" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>

      {/* Progress bar - Anarchy identity element at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-anarchy-red via-orange-500 to-anarchy-red"
        style={{ width: progressWidth }}
      />
    </footer>
  );
}
