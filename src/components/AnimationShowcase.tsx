import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Layers, Sparkles, ArrowRight } from 'lucide-react';

// Animation Ideas Collection
const animations = [
  {
    title: 'Magnetic Button',
    description: 'Buttons that attract to cursor on hover',
    component: MagneticButton,
  },
  {
    title: 'Text Reveal',
    description: 'Staggered letter-by-letter text animation',
    component: TextReveal,
  },
  {
    title: 'Floating Cards',
    description: '3D cards with parallax depth effect',
    component: FloatingCards,
  },
  {
    title: 'Glow Pulse',
    description: 'Pulsing glow effect on elements',
    component: GlowPulse,
  },
];

// 1. Magnetic Button
function MagneticButton() {
  return (
    <motion.button
      className="relative px-8 py-4 bg-anarchy-red rounded-xl text-white font-semibold overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
      />
      <span className="relative z-10 flex items-center gap-2">
        <Zap size={18} />
        Hover Me
      </span>
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-white/30"
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(230,48,48,0)',
            '0 0 20px 5px rgba(230,48,48,0.3)',
            '0 0 0 0 rgba(230,48,48,0)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
}

// 2. Text Reveal
function TextReveal() {
  const text = 'Anarchy AI';
  
  return (
    <div className="text-3xl font-bold text-white">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
            type: 'spring',
            stiffness: 100,
          }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

// 3. Floating Cards
function FloatingCards() {
  const cards = [
    { icon: Layers, title: 'Layers', color: 'from-blue-500 to-blue-600' },
    { icon: Sparkles, title: 'Effects', color: 'from-purple-500 to-purple-600' },
    { icon: Zap, title: 'Fast', color: 'from-anarchy-red to-red-600' },
  ];

  return (
    <div className="flex gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={`w-24 h-32 rounded-2xl bg-gradient-to-br ${card.color} p-4 flex flex-col items-center justify-center`}
          initial={{ y: 0, rotateY: 0 }}
          whileHover={{ 
            y: -10, 
            rotateY: 15,
            scale: 1.05,
            transition: { type: 'spring', stiffness: 300 }
          }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <card.icon size={24} className="text-white mb-2" />
          <span className="text-white text-xs font-semibold">{card.title}</span>
        </motion.div>
      ))}
    </div>
  );
}

// 4. Glow Pulse
function GlowPulse() {
  return (
    <div className="relative">
      <motion.div
        className="w-32 h-32 rounded-2xl bg-anarchy-gray relative z-10 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
      >
        <Layers size={40} className="text-white" />
      </motion.div>
      
      {/* Animated glow layers */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-2xl bg-anarchy-red/20"
          animate={{
            scale: [1, 1.2 + i * 0.1, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// Scroll Progress Bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-anarchy-red origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export function AnimationShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      <ScrollProgress />
      
      <div className="absolute inset-0 bg-anarchy-dark" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-6"
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            Animation Ideas
          </motion.span>

          <h2 className="text-headline text-white mb-5">
            Smooth{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red to-red-400">
              Interactions
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Micro-animations that make the experience feel premium and polished.
          </p>
        </motion.div>

        {/* Animation Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {animations.map((anim, i) => (
            <motion.div
              key={i}
              className="bg-anarchy-gray/50 rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(230,48,48,0.3)' }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{anim.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{anim.description}</p>
              
              {/* Demo Area */}
              <div className="h-40 rounded-xl bg-anarchy-dark/50 flex items-center justify-center">
                <anim.component />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra Animation Ideas List */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-4"
          style={{ y }}
        >
          {[
            'Cursor Trail Effect',
            'Page Transition Morph',
            'Scroll-triggered Parallax',
            '3D Card Flip',
            'Infinite Marquee',
            'Gradient Text Animation',
          ].map((idea, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 10, backgroundColor: 'rgba(230,48,48,0.1)' }}
            >
              <ArrowRight size={16} className="text-anarchy-red" />
              <span className="text-white text-sm">{idea}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
