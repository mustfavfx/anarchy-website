import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al-Rashid',
    role: 'Lead Architect',
    company: 'AR Design Studio',
    image: '/testimonials/avatar1.jpg',
    content: 'Anarchy AI transformed our workflow. We cut render time by 70% and clients love the quick iterations.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Creative Director',
    company: 'Urban Spaces',
    image: '/testimonials/avatar2.jpg',
    content: 'The node-based approach is genius. We can create complex visual pipelines without any coding knowledge.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mohammed Hassan',
    role: '3D Visualization Artist',
    company: 'Horizon Architects',
    image: '/testimonials/avatar3.jpg',
    content: 'Finally, an AI tool that understands architectural context. The results are consistently impressive.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Emma Chen',
    role: 'Principal Architect',
    company: 'Chen & Partners',
    image: '/testimonials/avatar4.jpg',
    content: 'From concept to final render in minutes. This tool has become essential for our design process.',
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 15 : -15,
    }),
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-32 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-anarchy-dark" />
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(230,48,48,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(230,48,48,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(230,48,48,0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-anarchy-red/30"
            initial={{ x: Math.random() * 1000, y: 400 } }
            animate={{
              y: [400, -100],
              x: [Math.random() * 1000, Math.random() * 1000],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium tracking-wide mb-6"
            whileHover={{ scale: 1.05 }}
          >
            What Architects Say
          </motion.span>

          <h2 className="text-headline text-white mb-5">
            Trusted by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anarchy-red to-red-400">
              Industry Leaders
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how architects and designers are transforming their workflow with Anarchy AI.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto" style={{ perspective: 1000 }}>
          {/* Quote Icon */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-anarchy-red/10 flex items-center justify-center z-20"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Quote size={28} className="text-anarchy-red" />
          </motion.div>

          <div className="relative h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full max-w-3xl bg-anarchy-gray/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star size={20} className="text-yellow-500 fill-yellow-500" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <motion.p
                  className="text-xl md:text-2xl text-white/90 text-center mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  "{testimonials[current].content}"
                </motion.p>

                {/* Author */}
                <motion.div
                  className="flex items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-anarchy-red to-red-600 flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-semibold">{testimonials[current].name}</h4>
                    <p className="text-gray-400 text-sm">
                      {testimonials[current].role} at {testimonials[current].company}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-anarchy-gray/50 border border-white/10 flex items-center justify-center text-white hover:bg-anarchy-red/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? 'bg-anarchy-red' : 'bg-white/20'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  animate={i === current ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-anarchy-gray/50 border border-white/10 flex items-center justify-center text-white hover:bg-anarchy-red/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
