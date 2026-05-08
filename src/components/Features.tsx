import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, ArrowUpRight, GitBranch, Brain, Maximize, Layers2, WifiOff, Presentation } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  size?: 'small' | 'medium' | 'large' | 'wide';
  gradient: string;
  lang: 'en' | 'ar';
}

// Cursor-following glow effect hook
function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return { ref, position, isHovered, setIsHovered, handleMouseMove };
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  titleAr, 
  description, 
  descriptionAr, 
  size = 'medium',
  gradient,
  lang
}: FeatureCardProps) {
  const { ref, position, isHovered, setIsHovered, handleMouseMove } = useMouseGlow();

  const sizeClasses = {
    small: 'lg:col-span-1',
    medium: 'lg:col-span-1',
    large: 'md:col-span-2 lg:col-span-1',
    wide: 'md:col-span-2 lg:col-span-1',
  };

  const isRTL = lang === 'ar';

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-3xl p-6 md:p-8
        bg-white/[0.02] backdrop-blur-xl
        border border-white/[0.08]
        hover:border-white/[0.15]
        transition-all duration-500
        group cursor-pointer
        ${sizeClasses[size]}
        ${isRTL ? 'text-right' : 'text-left'}
      `}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Cursor-following glow effect */}
      <div
        className={`
          pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-100' : ''}
        `}
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(225, 29, 72, 0.15), transparent 40%)`,
        }}
      />

      {/* Static gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Icon */}
        <motion.div 
          className={`
            w-14 h-14 rounded-2xl flex items-center justify-center mb-6
            bg-gradient-to-br ${gradient} 
            border border-white/10
            shadow-lg shadow-black/20
            ${isRTL ? 'md:mr-auto md:ml-0 mr-0 ml-auto' : ''}
          `}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon size={28} className="text-white" strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <h3 className={`
          text-2xl md:text-3xl font-bold mb-3 
          ${isRTL ? 'font-arabic' : 'font-sans'}
          bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent
        `}>
          {isRTL ? titleAr : title}
        </h3>

        {/* Description */}
        <p className={`
          text-base leading-relaxed flex-grow
          ${isRTL ? 'font-arabic text-gray-300' : 'text-gray-400'}
        `}>
          {isRTL ? descriptionAr : description}
        </p>

        {/* Learn more link */}
        <div className={`
          mt-6 flex items-center gap-2 text-anarchy-red 
          opacity-0 group-hover:opacity-100 transition-all duration-300
          ${isRTL ? 'flex-row-reverse' : ''}
        `}>
          <span className={`text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? 'اكتشف المزيد' : 'Learn more'}
          </span>
          <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Glass edge highlight */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export function Features() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: GitBranch,
      title: 'Node Canvas',
      titleAr: 'لوحة العقد',
      description: 'Visual workflow editor with node-based connections — design your pipeline visually.',
      descriptionAr: 'محرر سير عمل مرئي مع اتصالات قائمة على العقد — صمم خط الأنابيب بشكل مرئي.',
      size: 'large' as const,
      gradient: 'from-blue-500/30 to-cyan-500/20',
    },
    {
      icon: Brain,
      title: 'Multi-Model AI',
      titleAr: 'ذكاء اصطناعي متعدد النماذج',
      description: 'Kie AI, Gemini, and Stable Diffusion in one unified canvas.',
      descriptionAr: 'Kie AI و Gemini و Stable Diffusion في لوحة موحدة واحدة.',
      size: 'medium' as const,
      gradient: 'from-purple-500/30 to-pink-500/20',
    },
    {
      icon: Maximize,
      title: '3ds Max Bridge',
      titleAr: 'جسر 3ds Max',
      description: 'Live MAXScript plugin integration — send renders directly from 3ds Max.',
      descriptionAr: 'تكامل مباشر مع MAXScript - أرسل العروض مباشرة من 3ds Max.',
      size: 'wide' as const,
      gradient: 'from-anarchy-red/30 to-orange-500/20',
    },
    {
      icon: Layers2,
      title: 'Batch Generation',
      titleAr: 'التوليد بالدفعات',
      description: 'Run dozens of render variations in parallel without leaving your workflow.',
      descriptionAr: 'شغل العشرات من الاختلافات بشكل متوازي بدون مغادرة سير عملك.',
      size: 'small' as const,
      gradient: 'from-green-500/30 to-emerald-500/20',
    },
    {
      icon: WifiOff,
      title: 'Offline First',
      titleAr: 'يعمل بدون إنترنت',
      description: 'Runs locally on your machine via Tauri. No internet required. Your data stays yours.',
      descriptionAr: 'يعمل محليًا على جهازك عبر Tauri. لا يحتاج إنترنت. بياناتك تبقى لك.',
      size: 'small' as const,
      gradient: 'from-indigo-500/30 to-violet-500/20',
    },
    {
      icon: Presentation,
      title: 'Client Mode',
      titleAr: 'وضع العميل',
      description: 'Switch to presentation mode and present results directly to clients.',
      descriptionAr: 'انتقل لوضع العرض التقديمي واعرض النتائج مباشرة للعملاء.',
      size: 'medium' as const,
      gradient: 'from-yellow-500/30 to-amber-500/20',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-anarchy-dark via-anarchy-gray to-anarchy-dark" />
      <div className="absolute inset-0 grid-pattern opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-anarchy-red/10 rounded-full blur-[120px] opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`text-center mb-16 ${lang === 'ar' ? 'font-arabic' : ''}`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-sm">
              <Zap size={16} />
              {lang === 'ar' ? 'القدرات الأساسية' : 'Core Capabilities'}
            </span>
            
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {lang === 'ar' ? (
              <span className="font-arabic">مميزات قوية</span>
            ) : (
              <>Powerful <span className="text-anarchy-red">Features</span></>
            )}
          </h2>
          
          <p className={`text-xl text-gray-400 max-w-2xl mx-auto ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {lang === 'ar' 
              ? 'كل ما تحتاجه لأتمتة سير العمل المعماري الخاص بك بالذكاء الاصطناعي'
              : 'Everything you need to automate your architectural workflow with AI'
            }
          </p>
        </motion.div>

        {/* Bento Grid - 2x3 Layout with stagger */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[minmax(200px,auto)]"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              lang={lang}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`mt-16 text-center ${lang === 'ar' ? 'font-arabic' : ''}`}
        >
          <p className="text-gray-500 mb-4">
            {lang === 'ar' 
              ? 'هل تريد رؤية المزيد من المميزات؟'
              : 'Want to see more features?'
            }
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-anarchy-red to-red-600 text-white font-medium hover:shadow-[0_0_40px_rgba(225,29,72,0.3)] transition-all group">
            {lang === 'ar' ? 'اكتشف كل المميزات' : 'Explore All Features'}
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
