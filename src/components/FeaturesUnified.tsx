import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Workflow, 
  Layers, 
  Zap, 
  Maximize2, 
  GitBranch, 
  Cpu,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Unified feature data with Arabic support
const features = [
  {
    icon: Workflow,
    title: 'Node-Based Canvas',
    titleAr: 'لوحة العقد البصرية',
    description: 'Visual workflow editor. Drag, connect, and orchestrate AI nodes without writing code.',
    descriptionAr: 'محرر سير عمل بصري. اسحب وربط ونظم عقد الذكاء الاصطناعي بدون كتابة كود.',
    stat: 'pro',
    statLabel: 'nodes',
    statLabelAr: 'عقد احترافية',
    gradient: 'from-red-500 to-orange-600',
    color: '#E63030'
  },
  {
    icon: Layers,
    title: 'Multi-Engine Support',
    titleAr: 'دعم محركات متعددة',
    description: 'Switch between GPT Image 2, FLUX, Seedream, Grok, Nano Banana, and 6 more instantly.',
    descriptionAr: 'تبديل فوري بين GPT Image 2 و FLUX و Seedream و Grok و Nano Banana و 6 محركات أخرى.',
    stat: '11',
    statLabel: 'AI Engines',
    statLabelAr: 'محرك ذكاء اصطناعي',
    gradient: 'from-purple-500 to-pink-600',
    color: '#8B5CF6'
  },
  {
    icon: Zap,
    title: 'Batch Processing',
    titleAr: 'معالجة الدفعات',
    description: 'Generate hundreds of renders in parallel. Queue management with priority control.',
    descriptionAr: 'توليد مئات الرenders بشكل متوازي. إدارة قائمة الانتظار مع التحكم في الأولوية.',
    stat: '∞',
    statLabel: 'Batch Size',
    statLabelAr: 'حجم الدفعة غير محدود',
    gradient: 'from-yellow-500 to-red-600',
    color: '#EAB308'
  },
  {
    icon: Maximize2,
    title: '16K Upscaling',
    titleAr: 'تكبير 16K',
    description: 'Built-in super-resolution. Upscale to 16K without quality loss or external tools.',
    descriptionAr: 'دقة فائقة مدمجة. تكبير إلى 16K بدون فقدان الجودة أو أدوات خارجية.',
    stat: '16K',
    statLabel: 'Max Output',
    statLabelAr: 'أقصى دقة إخراج',
    gradient: 'from-blue-500 to-cyan-600',
    color: '#3B82F6'
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    titleAr: 'التحكم بالإصدار',
    description: 'Every workflow change tracked. Branch, merge, and rollback visual experiments.',
    descriptionAr: 'تتبع كل تغيير في سير العمل. تفرع ودمج واسترجاع التجارب البصرية.',
    stat: 'Git',
    statLabel: 'Integration',
    statLabelAr: 'تكامل Git',
    gradient: 'from-green-500 to-emerald-600',
    color: '#10B981'
  },
  {
    icon: Cpu,
    title: 'Plugin System',
    titleAr: 'نظام الإضافات',
    description: 'Extend with custom nodes. Python SDK for power users and teams.',
    descriptionAr: 'توسيع العقد المخصصة. Python SDK للمستخدمين المحترفين والفرق.',
    stat: 'API',
    statLabel: 'Extensible',
    statLabelAr: 'قابل للتوسيع',
    gradient: 'from-orange-500 to-red-600',
    color: '#F97316'
  }
];

// 3D Tilt Hook
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-8deg', '8deg']);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['-50%', '50%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['-50%', '50%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, rotateX, rotateY, glowX, glowY, handleMouseMove, handleMouseLeave };
}

// Unified Feature Card Component
interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
  lang: 'en' | 'ar';
}

function FeatureCard({ feature, index, lang }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, rotateX, rotateY, glowX, glowY, handleMouseMove, handleMouseLeave } = use3DTilt();
  const isRTL = lang === 'ar';
  
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-full"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Card Container */}
      <div className="relative h-full bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-8 overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:shadow-2xl hover:shadow-black/40">
        
        {/* Animated gradient background on hover */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* 3D Glow effect following mouse */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${feature.color} 0%, transparent 70%)`,
            left: glowX,
            top: glowY,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-anarchy-red/40" />
        </div>
        <div className="absolute bottom-0 left-0 w-20 h-20">
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-anarchy-red/40" />
        </div>

        {/* Scan line animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ background: feature.color }}
              animate={{
                y: [0, -30, 0],
                x: [0, (i - 1) * 15, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              initial={{
                left: `${20 + i * 30}%`,
                top: `${60 + i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon Container */}
          <motion.div 
            className="relative w-16 h-16 mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {/* Icon glow */}
            <motion.div 
              className="absolute inset-0 rounded-2xl blur-xl"
              style={{ background: feature.color }}
              animate={{ opacity: isHovered ? 0.4 : 0.2 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Icon background */}
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5`}>
              <div className="w-full h-full rounded-2xl bg-anarchy-dark flex items-center justify-center">
                <Icon 
                  size={28} 
                  style={{ color: feature.color }}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ 
                scale: isHovered ? [1, 1.2, 1] : 1,
                rotate: isHovered ? [0, 180, 360] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={16} className="text-white/60" />
            </motion.div>
          </motion.div>

          {/* Title with glitch effect on hover */}
          <motion.h3 
            className="text-xl font-bold text-white mb-3 transition-colors duration-300"
            animate={{ color: isHovered ? feature.color : '#ffffff' }}
          >
            {isRTL ? feature.titleAr : feature.title}
          </motion.h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
            {isRTL ? feature.descriptionAr : feature.description}
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <div className="flex items-baseline gap-2">
              <motion.span 
                className="text-3xl font-black"
                style={{ color: feature.color }}
                animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {feature.stat}
              </motion.span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                {isRTL ? feature.statLabelAr : feature.statLabel}
              </span>
            </div>
            
            {/* Arrow with animation */}
            <motion.div
              animate={{ 
                x: isHovered ? 4 : 0,
                y: isHovered ? -4 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <ArrowUpRight 
                size={22} 
                className="transition-colors duration-300"
                style={{ color: isHovered ? feature.color : '#6b7280' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

// Main Features Component
export function FeaturesUnified() {
  const { lang } = useLanguage();

  return (
    <section id="features" className="py-32 px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-anarchy-red/20 rotate-45 animate-pulse" />
      <div className="absolute bottom-40 right-20 w-24 h-24 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-anarchy-red/30 mb-6"
          >
            <motion.span 
              className="w-2 h-2 bg-anarchy-red rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-anarchy-red text-sm font-bold tracking-widest uppercase">
              {lang === 'en' ? 'Capabilities' : 'الميزات'}
            </span>
          </motion.div>
          
          {/* Title */}
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            <span className="block">{lang === 'en' ? 'BUILT FOR' : 'مبني من أجل'}</span>
            <span className="block text-anarchy-red neon-text">
              {lang === 'en' ? 'ARCHITECTS' : 'المعماريين'}
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {lang === 'en' 
              ? 'Every feature designed for the workflow of professional visualization teams. No bloat. Pure utility.'
              : 'كل ميزة مصممة لسير عمل فرق التصور الاحترافية. بدون تعقيد. فائدة بحتة.'
            }
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              feature={feature} 
              index={index}
              lang={lang}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-4 px-8 py-4 border border-white/10 rounded-full cursor-pointer group"
            whileHover={{ borderColor: 'rgba(230, 48, 48, 0.5)', scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-gray-400 group-hover:text-white transition-colors">
              {lang === 'en' ? 'Explore all features' : 'استكشف جميع الميزات'}
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight 
                size={18} 
                className="text-anarchy-red" 
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
