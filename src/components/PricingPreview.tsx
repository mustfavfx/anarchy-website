import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap } from 'lucide-react';

const tiers = [
  {
    id: 'starter',
    label: 'Starter',
    price: '$5',
    credits: '525 credits',
    highlight: false,
    perks: [
      '~175 standard renders',
      '~21 HD renders',
      'All engines included',
      'Credits never expire',
    ],
  },
  {
    id: 'pro',
    label: 'Pro',
    price: '$20',
    credits: '2,150 + 50 bonus credits',
    highlight: true,
    perks: [
      '~716 standard renders',
      '~86 HD renders',
      'All engines included',
      'Credits never expire',
      '+50 bonus credits',
    ],
  },
  {
    id: 'business',
    label: 'Business',
    price: '$50',
    credits: '5,500 + 200 bonus credits',
    highlight: false,
    perks: [
      '~1,833 standard renders',
      '~220 HD renders',
      'All engines included',
      'Credits never expire',
      '+200 bonus credits',
    ],
  },
];

export function PricingPreview() {
  return (
    <section id="pricing" className="py-28 px-6 relative" aria-labelledby="pricing-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-anarchy-dark via-anarchy-gray/20 to-anarchy-dark" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 50% 40% at 80% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-5">
            Pricing
          </span>
          <h2 id="pricing-heading" className="text-headline text-white mb-4">
            Pay As You Go.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red to-red-400">
              No Subscriptions.
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Buy credits once, use them whenever. Credits never expire. Start with $5.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className={`relative rounded-2xl p-7 border transition-all duration-300 ${
                tier.highlight
                  ? 'bg-gradient-to-b from-anarchy-red/10 to-anarchy-gray border-anarchy-red/30 shadow-[0_0_40px_rgba(230,48,48,0.08)]'
                  : 'glass-card border-white/[0.07] hover:border-white/[0.14]'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1.5 bg-anarchy-red text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    <Zap size={11} />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-sm text-gray-500 font-medium mb-1">{tier.label}</div>
                <div className="text-4xl font-bold text-white tracking-tight">{tier.price}</div>
                <div className="text-xs text-gray-500 mt-1">{tier.credits}</div>
              </div>

              <ul className="space-y-2.5 mb-7">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <Check size={14} className="text-anarchy-red flex-shrink-0 mt-0.5" />
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                  tier.highlight
                    ? 'bg-anarchy-red text-white hover:bg-anarchy-red/90'
                    : 'border border-white/10 text-gray-300 hover:border-white/25 hover:bg-white/[0.03]'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <a
            href="#pricing-full"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#pricing-full')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
          >
            See full pricing & generation costs
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
