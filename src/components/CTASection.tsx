import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Loader2, Mail, User, MessageSquare } from 'lucide-react';
import { submitContactForm } from '../services/contactService';

export function CTASection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim() || !message.trim()) return;
    
    setStatus('loading');
    setStatusMessage('');
    
    try {
      const result = await submitContactForm(name.trim(), email.trim(), message.trim());
      
      if (result.success) {
        setStatus('done');
        setStatusMessage(result.message);
        // Clear form
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setStatusMessage(result.message);
      }
    } catch {
      setStatus('error');
      setStatusMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      className="py-32 px-6 relative overflow-hidden"
      aria-labelledby="contact-heading"
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

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-6">
            Get in Touch
          </span>

          <h2 id="contact-heading" className="text-headline text-white mb-5">
            Contact{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red to-red-400">
              Us
            </span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Have questions or feedback? Send us a message and we will get back to you as soon as possible.
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
              <span className="font-medium">{statusMessage || "Message sent successfully!"}</span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-lg mx-auto text-left"
              aria-label="Contact form"
            >
              {/* Name Field */}
              <div>
                <label htmlFor="contact-name" className="sr-only">Your Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    disabled={status === 'loading'}
                    minLength={2}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-anarchy-red/50 focus:ring-1 focus:ring-anarchy-red/30 disabled:opacity-50 transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="contact-email" className="sr-only">Email address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={status === 'loading'}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-anarchy-red/50 focus:ring-1 focus:ring-anarchy-red/30 disabled:opacity-50 transition-all"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="contact-message" className="sr-only">Your Message</label>
                <div className="relative">
                  <MessageSquare size={18} className="absolute left-4 top-4 text-gray-500" />
                  <textarea
                    id="contact-message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message..."
                    disabled={status === 'loading'}
                    minLength={10}
                    rows={4}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-anarchy-red/50 focus:ring-1 focus:ring-anarchy-red/30 disabled:opacity-50 transition-all resize-none"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading' || !email.trim() || !name.trim() || !message.trim()}
                className="w-full btn-shimmer bg-anarchy-red text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-anarchy-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {status === 'loading' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
              </motion.button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm text-red-400">{statusMessage || 'Something went wrong. Please try again.'}</p>
          )}

          <p className="mt-5 text-xs text-gray-600">
            Your message will be sent to{' '}
            <a href="mailto:anarchy.lat@gmail.com" className="text-anarchy-red hover:underline">
              anarchy.lat@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
