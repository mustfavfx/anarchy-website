import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

async function submitWaitlist(email: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.info('Waitlist submission:', email);
  // Replace with: await supabase.from('waitlist').insert({ email });
}

export function CTASection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      await submitWaitlist(email.trim());
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="waitlist"
      className="py-32 px-6 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-anarchy-dark" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 60% at 50% 100%, rgba(230,48,48,0.14) 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-6">
            Early Access
          </span>

          <h2 id="cta-heading" className="text-headline text-white mb-5">
            Be First to Shape the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red to-red-400">
              Future of Architecture AI
            </span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Free during beta. No credit card required. Early members get bonus credits and direct access to the roadmap.
          </p>

          {status === 'done' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-anarchy-red/10 border border-anarchy-red/25 text-white"
            >
              <div className="w-7 h-7 rounded-full bg-anarchy-red flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
              <span className="font-medium">You're on the list — we'll be in touch.</span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              aria-label="Early access waitlist form"
            >
              <label htmlFor="waitlist-email" className="sr-only">Email address</label>
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={status === 'loading'}
                className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-anarchy-red/50 focus:ring-1 focus:ring-anarchy-red/30 disabled:opacity-50 transition-all"
              />
              <motion.button
                type="submit"
                disabled={status === 'loading' || !email.trim()}
                className="btn-shimmer bg-anarchy-red text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-anarchy-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {status === 'loading' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Request Access
                    <ArrowRight size={15} />
                  </>
                )}
              </motion.button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm text-red-400">Something went wrong. Please try again.</p>
          )}

          <p className="mt-5 text-xs text-gray-600">
            No spam. Unsubscribe at any time. Your email is never shared.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
