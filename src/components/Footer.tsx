import { Link, useNavigate } from 'react-router-dom';

const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Download', href: '#download' },
];

const companyLinks = [
  { label: 'Privacy Policy', route: '/privacy' },
  { label: 'Terms of Service', route: '/terms' },
  { label: 'Disclaimer', route: '/disclaimer' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/anarchy.lat/' },
  { label: 'Telegram', href: 'https://t.me/anarchyforarchitecture' },
  { label: 'Email', href: 'mailto:anarchy.lat@gmail.com', email: 'anarchy.lat@gmail.com' },
];

export function Footer() {
  const navigate = useNavigate();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  };

  return (
    <footer className="bg-anarchy-dark border-t border-white/[0.05] py-16 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit" aria-label="Anarchy AI home">
              <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-anarchy-red/40 transition-all">
                <img src="/logo.png" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Anarchy<span className="text-anarchy-red">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-5">
              Node-based AI workflows for architectural visualization. Built for architects, designed for scale.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-xs text-gray-600 hover:text-gray-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-anarchy-red rounded"
                  aria-label={s.label}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <nav aria-label="Product links">
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Product</h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-anarchy-red rounded"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal links">
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.route}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-anarchy-red rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2026 Anarchy AI. All rights reserved.</p>
          <p className="text-xs text-gray-700">Designed for architects. Powered by AI.</p>
        </div>
      </div>
    </footer>
  );
}
