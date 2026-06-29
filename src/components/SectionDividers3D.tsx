import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface GeometricShapeProps {
  type: 'cube' | 'pyramid' | 'torus' | 'sphere';
  scrollYProgress: any;
  index: number;
}

function GeometricShape({ type, scrollYProgress, index }: GeometricShapeProps) {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 + index * 90]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const shapes = {
    cube: (
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-anarchy-red/40 transform rotate-45" />
        <div className="absolute inset-0 border-2 border-white/20 transform -rotate-12" />
      </div>
    ),
    pyramid: (
      <div className="relative w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] border-l-transparent border-r-transparent border-b-anarchy-red/30" />
    ),
    torus: (
      <div className="w-16 h-16 rounded-full border-4 border-t-anarchy-red/40 border-r-white/20 border-b-anarchy-red/40 border-l-white/20" />
    ),
    sphere: (
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-anarchy-red/20 to-transparent border border-anarchy-red/30" />
    ),
  };

  return (
    <motion.div
      style={{ rotate, scale, y }}
      className="absolute"
    >
      {shapes[type]}
    </motion.div>
  );
}

export function SectionDividers3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const shapes: Array<'cube' | 'pyramid' | 'torus' | 'sphere'> = ['cube', 'pyramid', 'torus', 'sphere'];

  return (
    <div ref={containerRef} className="relative">
      {/* Section 1: Hero → Features */}
      <div className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-anarchy-red/30 to-transparent" />
        </div>
        <div className="flex justify-center gap-8 relative z-10">
          {shapes.map((shape, i) => (
            <GeometricShape 
              key={i} 
              type={shape} 
              scrollYProgress={scrollYProgress}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Section 2: Features → SubjectProfile */}
      <div className="relative py-12 overflow-hidden">
        <div className="flex justify-between items-center px-20">
          <motion.div
            style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 180]) }}
            className="w-20 h-20 border-2 border-anarchy-red/30 rounded-lg"
          />
          <div className="flex-1 h-px mx-8 bg-gradient-to-r from-anarchy-red/30 via-white/20 to-anarchy-red/30" />
          <motion.div
            style={{ rotate: useTransform(scrollYProgress, [0, 1], [180, 0]) }}
            className="w-20 h-20 border-2 border-white/20 rounded-full"
          />
        </div>
      </div>

      {/* Section 3: Animated Line */}
      <div className="relative py-8">
        <motion.div
          className="h-px bg-anarchy-red/50"
          style={{
            scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
            originX: 0.5,
          }}
        />
      </div>
    </div>
  );
}

// Alternative simple divider
export function SectionDivider({ color = 'red' }: { color?: 'red' | 'white' }) {
  const borderColor = color === 'red' ? 'border-anarchy-red/30' : 'border-white/20';
  
  return (
    <div className="relative py-8">
      <div className="flex items-center justify-center gap-4">
        <div className={`w-16 h-16 border-2 ${borderColor} rotate-45`} />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className={`w-4 h-4 rounded-full ${color === 'red' ? 'bg-anarchy-red' : 'bg-white/50'}`} />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className={`w-16 h-16 border-2 ${borderColor} -rotate-12`} />
      </div>
    </div>
  );
}
