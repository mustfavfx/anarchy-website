import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export default function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-anarchy-dark via-anarchy-gray to-anarchy-dark" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the Waitlist
          </h2>
          
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Free during beta. No credit card required. Shape the future of architectural AI.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-anarchy-red"
            >
              <Check size={20} />
              <span className="font-medium">You're on the list. We'll be in touch.</span>
            </motion.div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E63030]"
              />
              <button
                onClick={() => email && setSubmitted(true)}
                className="bg-[#E63030] hover:bg-[#c42828] text-white px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                Join Waitlist
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
