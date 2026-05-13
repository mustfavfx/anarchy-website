import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sun, Palette, Sparkles, Maximize2 } from 'lucide-react';

const tags = [
  { icon: Sun, label: 'Lighting Match' },
  { icon: Palette, label: 'Material Refinement' },
  { icon: Sparkles, label: 'Mood Transfer' },
  { icon: Maximize2, label: 'Upscale Ready' },
];

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-anarchy-dark" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(230,48,48,0.08) 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-anarchy-red text-sm font-medium uppercase tracking-widest mb-3 block">
            Transformation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From Raw Screenshot to Client-Ready Render
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload any architectural visualization and apply AI-powered lighting, materials, and mood adjustments.
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          {/* Main container */}
          <div
            className="relative aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-white/[0.08] cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          >
            {/* After Image (Full) */}
            <div className="absolute inset-0">
              <img
                src="/screenshots/builder.png"
                alt="AI-enhanced architectural render with refined lighting and materials"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Label */}
              <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-lg">
                <span className="text-xs font-medium text-white">AI Enhanced</span>
              </div>
            </div>

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src="/screenshots/projects.png"
                alt="Raw architectural screenshot before AI enhancement"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Label */}
              <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-lg">
                <span className="text-xs font-medium text-gray-300">Original</span>
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-anarchy-red cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle knob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-anarchy-red flex items-center justify-center shadow-lg">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                  <path d="M4 4L8 8L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 4L8 8L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Drag slider to compare before and after
          </p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            {tags.map((tag) => {
              const Icon = tag.icon;
              return (
                <div
                  key={tag.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]"
                >
                  <Icon size={14} className="text-anarchy-red" />
                  <span className="text-sm text-gray-300">{tag.label}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
