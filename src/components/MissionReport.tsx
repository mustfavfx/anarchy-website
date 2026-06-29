import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText,
  ExternalLink,
  Clock,
  MapPin,
  Tag
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Mission {
  id: string;
  codename: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  techStack: string[];
  location: string;
  duration: string;
  keywords: string[];
  status: 'COMPLETED' | 'IN_PROGRESS' | 'CLASSIFIED';
  impact: string;
  impactAr: string;
}

const missions: Mission[] = [
  {
    id: 'ARCH_001',
    codename: 'ARCHITECT_VISION',
    title: 'AI-Powered Architectural Visualization',
    titleAr: 'التصور المعماري بالذكاء الاصطناعي',
    description: 'Developed a revolutionary node-based workflow platform enabling architects to generate photorealistic renders from CAD files using multiple AI engines.',
    descriptionAr: 'تطوير منصة سير عمل ثورية قائمة على العقد تمكن المعماريين من توليد renders واقعية من ملفات CAD باستخدام محركات الذكاء الاصطناعي المتعددة.',
    techStack: ['React', 'Three.js', 'WebGL', 'Python', 'TensorFlow'],
    location: 'Global Architecture Firms',
    duration: '12 months',
    keywords: ['3D Rendering', 'AI Integration', 'Workflow Automation'],
    status: 'COMPLETED',
    impact: 'Reduced render time by 90%',
    impactAr: 'تقليل وقت التصيير بنسبة 90%'
  },
  {
    id: 'NODE_002',
    codename: 'NODE_CANVAS',
    title: 'Visual Workflow Engine',
    titleAr: 'محرك سير العمل البصري',
    description: 'Built an intuitive node-based canvas system allowing non-technical architects to create complex AI pipelines without writing code.',
    descriptionAr: 'بناء نظام لوحة عقد بديهي يسمح للمعماريين غير التقنيين بإنشاء خطوط أنابيب AI معقدة بدون كتابة كود.',
    techStack: ['React Flow', 'TypeScript', 'WebAssembly', 'GraphQL'],
    location: 'In-House Development',
    duration: '8 months',
    keywords: ['Node Editor', 'Visual Programming', 'UX Design'],
    status: 'COMPLETED',
    impact: '5000+ workflows created',
    impactAr: '+5000 سير عمل تم إنشاؤه'
  },
  {
    id: 'ENGINE_003',
    codename: 'MULTI_ENGINE',
    title: 'Multi-AI Engine Integration',
    titleAr: 'تكامل محركات الذكاء الاصطناعي المتعددة',
    description: 'Integrated 7 different AI image generation engines (GPT Image, FLUX, Seedream, Grok, etc.) with intelligent routing and load balancing.',
    descriptionAr: 'تكامل 7 محركات مختلفة لتوليد الصور بالذكاء الاصطناعي مع توجيه ذكي وتوازن الحمل.',
    techStack: ['Node.js', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
    location: 'Cloud Infrastructure',
    duration: '6 months',
    keywords: ['API Integration', 'Load Balancing', 'Microservices'],
    status: 'COMPLETED',
    impact: '99.9% uptime achieved',
    impactAr: '99.9% وقت تشغيل'
  },
  {
    id: 'RENDER_004',
    codename: 'BATCH_HORIZON',
    title: 'Mass Batch Processing System',
    titleAr: 'نظام معالجة الدفعات الجماعية',
    description: 'Designed a priority queue system capable of processing thousands of renders simultaneously with real-time progress tracking.',
    descriptionAr: 'تصميم نظام قائمة انتظار أولويات قادر على معالجة آلاف التصييرات في وقت واحد مع تتبع التقدم في الوقت الفعلي.',
    techStack: ['RabbitMQ', 'PostgreSQL', 'WebSocket', 'Redis'],
    location: 'Server Infrastructure',
    duration: '4 months',
    keywords: ['Queue Management', 'Real-time', 'Scalability'],
    status: 'COMPLETED',
    impact: 'Processing ∞ renders',
    impactAr: 'معالجة غير محدودة'
  }
];

export function MissionReport() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const { lang } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'IN_PROGRESS': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'CLASSIFIED': return 'text-anarchy-red border-anarchy-red/30 bg-anarchy-red/10';
      default: return 'text-gray-400';
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText size={20} className="text-anarchy-red" />
                <span className="text-xs font-mono text-anarchy-red tracking-widest">// MISSION_ARCHIVE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                {lang === 'en' ? 'FIELD OPERATIONS' : 'عمليات ميدانية'}
              </h2>
              <p className="text-gray-400 mt-2 font-mono text-sm">
                {lang === 'en' 
                  ? 'Classified technical interventions and system deployments'
                  : 'تدخلات تقنية مصنفة وعمليات نشر للأنظمة'
                }
              </p>
            </div>

          </motion.div>
        </div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedMission(mission)}
              className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 cursor-pointer hover:border-anarchy-red/30 transition-all duration-300"
            >
              {/* Mission ID Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-anarchy-red/10 border border-anarchy-red/30 rounded text-xs font-mono text-anarchy-red">
                    {mission.id}
                  </span>
                  <span className="text-xs font-mono text-gray-500">{mission.codename}</span>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-mono border ${getStatusColor(mission.status)}`}>
                  {mission.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-anarchy-red transition-colors">
                {lang === 'en' ? mission.title : mission.titleAr}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {lang === 'en' ? mission.description : mission.descriptionAr}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mission.techStack.slice(0, 3).map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 bg-white/5 rounded text-xs font-mono text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
                {mission.techStack.length > 3 && (
                  <span className="px-2 py-1 text-xs font-mono text-gray-500">
                    +{mission.techStack.length - 3}
                  </span>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-gray-500 font-mono border-t border-white/10 pt-4">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{mission.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{mission.location}</span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <span className="text-anarchy-red">
                    {lang === 'en' ? mission.impact : mission.impactAr}
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-anarchy-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Mission Detail Modal */}
        <AnimatePresence>
          {selectedMission && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedMission(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-anarchy-dark border border-white/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-anarchy-red">//</span>
                      <span className="text-xs font-mono text-gray-500">MISSION_DOSSIER</span>
                    </div>
                    <button 
                      onClick={() => setSelectedMission(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="font-mono">[CLOSE]</span>
                    </button>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {lang === 'en' ? selectedMission.title : selectedMission.titleAr}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                    <span className="text-anarchy-red">{selectedMission.id}</span>
                    <span>|</span>
                    <span>{selectedMission.codename}</span>
                    <span>|</span>
                    <span className={getStatusColor(selectedMission.status).split(' ')[0]}>
                      {selectedMission.status}
                    </span>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="text-xs font-mono text-gray-500 mb-2">// MISSION_DESCRIPTION</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {lang === 'en' ? selectedMission.description : selectedMission.descriptionAr}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xs font-mono text-gray-500 mb-2">// TECHNICAL_STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMission.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-sm font-mono text-gray-300 hover:border-anarchy-red/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <h4 className="text-xs font-mono text-gray-500 mb-2">// KEYWORDS</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMission.keywords.map((keyword) => (
                        <span 
                          key={keyword}
                          className="flex items-center gap-1 px-2 py-1 bg-anarchy-red/10 rounded text-xs text-anarchy-red"
                        >
                          <Tag size={10} />
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="p-4 bg-anarchy-red/5 border border-anarchy-red/20 rounded-lg">
                    <h4 className="text-xs font-mono text-anarchy-red mb-1">// MISSION_IMPACT</h4>
                    <p className="text-lg font-bold text-white">
                      {lang === 'en' ? selectedMission.impact : selectedMission.impactAr}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs font-mono text-gray-500 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {selectedMission.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {selectedMission.location}
                      </span>
                    </div>
                    <button className="flex items-center gap-2 text-anarchy-red hover:text-white transition-colors">
                      <span>VIEW_FULL_REPORT</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
