import { useEffect, useRef, useCallback, useState } from 'react';
import { ChevronDown, X, Copy, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const engines = ['GPT Image 2', 'FLUX 2 Pro', 'Seedream 4.5', 'Grok Imagine', 'Nano Banana 2'];

// Engine information data
const engineInfo: Record<string, {
  description: string;
  strengths: string[];
  bestFor: string;
  officialUrl: string;
  developer: string;
  releaseDate: string;
}> = {
  'GPT Image 2': {
    description: 'OpenAI\'s latest image generation model with exceptional prompt understanding and photorealistic output.',
    strengths: ['Natural language understanding', 'Photorealistic renders', 'Architectural accuracy', 'Consistent style matching'],
    bestFor: 'Architectural visualization, interior design, realistic renders',
    officialUrl: 'https://openai.com/gpt-image-2',
    developer: 'OpenAI',
    releaseDate: '2025'
  },
  'FLUX 2 Pro': {
    description: 'Black Forest Labs\' professional-grade diffusion model with superior detail and control.',
    strengths: ['High detail preservation', 'Professional quality', 'Fast generation', 'Excellent composition'],
    bestFor: 'High-end architectural renders, detailed exteriors, complex scenes',
    officialUrl: 'https://blackforestlabs.ai/flux-2-pro',
    developer: 'Black Forest Labs',
    releaseDate: '2025'
  },
  'Seedream 4.5': {
    description: 'Advanced model optimized for creative and artistic architectural interpretations.',
    strengths: ['Artistic flexibility', 'Creative variations', 'Style diversity', 'Atmospheric rendering'],
    bestFor: 'Concept design, artistic renders, mood boards, style exploration',
    officialUrl: 'https://deepai.org/models/seedream-4-5',
    developer: 'DeepAI',
    releaseDate: '2024'
  },
  'Grok Imagine': {
    description: 'xAI\'s image generation with unique perspective and creative problem-solving abilities.',
    strengths: ['Innovative perspectives', 'Unconventional designs', 'Creative solutions', 'Bold aesthetics'],
    bestFor: 'Experimental designs, unique concepts, avant-garde architecture',
    officialUrl: 'https://xai.ai/grok-imagine',
    developer: 'xAI',
    releaseDate: '2024'
  },
  'Nano Banana 2': {
    description: 'Lightning-fast model optimized for rapid prototyping and quick iterations.',
    strengths: ['Ultra-fast generation', 'Low latency', 'Efficient workflow', 'Quick previews'],
    bestFor: 'Rapid prototyping, quick drafts, iterative design process',
    officialUrl: 'https://nanobanana.ai/nano-banana-2',
    developer: 'NanoBanana AI',
    releaseDate: '2024'
  }
};

interface EngineModalProps {
  engine: string | null;
  isOpen: boolean;
  onClose: () => void;
}

function EngineModal({ engine, isOpen, onClose }: EngineModalProps) {
  const info = engine ? engineInfo[engine] : null;
  
  return (
    <AnimatePresence>
      {isOpen && engine && info && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="w-full max-w-md">
            <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-anarchy-red/20 flex items-center justify-center">
                    <span className="text-anarchy-red font-bold text-sm">AI</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{engine}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {info.description}
              </p>
              
              {/* Strengths */}
              <div className="mb-4">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Key Strengths</h4>
                <div className="flex flex-wrap gap-2">
                  {info.strengths.map((strength, i) => (
                    <span 
                      key={i}
                      className="text-xs text-anarchy-red bg-anarchy-red/10 border border-anarchy-red/20 px-2 py-1 rounded-md"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Best For */}
              <div className="bg-black/40 rounded-xl p-3 border border-white/5 mb-4">
                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">Best For</h4>
                <p className="text-sm text-white">{info.bestFor}</p>
              </div>

              {/* Official Source */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-xs text-gray-500">
                  <span>By {info.developer} • {info.releaseDate}</span>
                </div>
                <a
                  href={info.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-anarchy-red hover:text-white transition-colors group"
                >
                  <span>Official Source</span>
                  <svg
                    className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Comprehensive Prompts Library with Arabic Translations
const prompts = [
  // ─── Rendering & Realism ──────────────────────────────────────────
  { name: 'Photorealistic Render', nameAr: 'تصوير واقعي', text: 'Create photorealistic image with accurate lighting, natural shadows, high-resolution textures, realistic reflections, and professional architectural photography quality.', textAr: 'أنشئ صورة واقعية مع إضاءة دقيقة وظلال طبيعية ونسيج عالي الدقة وانعكاسات واقعية وجودة تصوير معماري احترافية.' },
  { name: 'Enhance Realism', nameAr: 'تعزيز الواقعية', text: 'Make this render photorealistic, add realistic cast shadows and ambient occlusion, high contrast directional light, enhance surface textures with fine grain and imperfections, add subtle depth of field, professional color grading.', textAr: 'اجعل هذا الرندر واقعياً، أضف ظلال واقعية وتعتيم محيطي، وإضاءة جهتية عالية التباين، وحسّن نسيج السطح بحبيبات دقيقة وعيوب، وأضف عمق مجال خفيف، وتدرج ألوان احترافي.' },
  { name: 'Developer Finish', nameAr: 'تشطيب مطور', text: 'Transform this image into a clean developer-finish architectural visualization. Keep original geometry, layout and camera unchanged. Apply smooth painted white walls, finished floors, clean ceilings, installed windows and doors, neutral modern materials. Empty unfurnished space prepared for handover.', textAr: 'حوّل هذه الصورة إلى تصور معماري نظيف بتشطيب المطور. حافظ على الهندسة الأصلية والتخطيط والكاميرا دون تغيير. طبّق جدران بيضاء مطلية بشكل ناعم، وأرضيات منتهية، وأسقف نظيفة، ونوافذ وأبواب مثبتة، ومواد حديثة محايدة. مساحة فارغة غير مفروشة جاهزة للتسليم.' },
  { name: 'Construction State', nameAr: 'حالة البناء', text: 'Transform the scene into a realistic unfinished construction state, exposing raw concrete, structural surfaces and unpainted materials, with visible construction details such as rough textures, installation elements, exposed edges, dust and natural building imperfections while maintaining original architecture.', textAr: 'حوّل المشهد إلى حالة بناء واقعية غير منتهية، مع كشف الخرسانة الخام والأسطح الإنشائية والمواد غير المطلية، مع تفاصيل بناء مرئية مثل النسيج الخشن وعناصر التثبيت والحواف المكشوفة والغبار وعيوب البناء الطبيعية مع الحفاظ على الهندسة المعمارية الأصلية.' },

  // ─── Lighting & Mood ──────────────────────────────────────────────
  { name: 'Golden Hour', nameAr: 'الساعة الذهبية', text: 'Change the mood to golden hour, add low warm sun rays gently piercing through the shadows, rich amber and honey tones, long dramatic shadows, magical warm atmosphere, cinematic lens flare, photorealistic golden light.', textAr: 'غيّر المزاج إلى الساعة الذهبية، أضف أشعة شمس دافئة منخفضة تخترق الظلال برفق، وألوان كهرمان وعسل غنية، وظلال طويلة دراماتيكية، وأجواء دافئة سحرية، وهالة عدسات سينمائية، وضوء ذهبي واقعي.' },
  { name: 'Night Scene', nameAr: 'مشهد ليلي', text: 'Convert the daytime scene into a moody nighttime shot. Bright moon as the primary light source from window invisible in the scene, soft rim light outlining objects. Warm interior lights contrasting with cool moonlight tones. Add slight atmospheric haze or moisture for a cinematic feel. Realistic shadows, natural night white balance, high quality, dramatic cinematic look.', textAr: 'حوّل المشهد النهاري إلى لقطة ليلية دراماتيكية. القمر الساطع كمصدر إضاءة رئيسي من نافذة غير مرئية في المشهد، وضوء حافة ناعم يحيط بالأجسام. أضواء داخلية دافئة تتناقض مع نغمات ضوء القمر البارد. أضف ضباب جوي خفيف أو رطوبة لإحساس سينمائي. ظلال واقعية، توازن أبيض طبيعي ليلي، جودة عالية، مظهر سينمائي دراماتيكي.' },
  { name: 'Cozy Night + LEDs', nameAr: 'ليل دافئ + LED', text: 'Change day to night, add LED strips along architectural edges, turn all artificial lights on with warm color temperature, create cozy inviting vibe with soft ambient glow, realistic light falloff, warm reflections on surfaces.', textAr: 'حوّل النهار إلى ليل، أضف شرائط LED على طول الحواف المعمارية، شغّل جميع الأضواء الاصطناعية بدرجة حرارة لون دافئة، أنشئ أجواء دافئة وجذابة مع وهج محيط ناعم، وتلاشي إضاءة واقعي، وانعكاسات دافئة على الأسطح.' },
  { name: 'Rainy Day', nameAr: 'يوم ممطر', text: 'Change the scene to a rainy day. Overcast sky, soft diffused light, wet reflective surfaces, realistic rain streaks outside the windows, subtle water reflections on the ground, puddles with ripples, moody atmosphere, natural muted lighting, photorealistic render.', textAr: 'غيّر المشهد إلى يوم ممطر. سماء ملبدة بالغيوم، ضوء ناعم منتشر، أسطح رطبة عاكسة، خطوط مطر واقعية خارج النوافذ، انعكاسات مائية خفيفة على الأرض، برك ماء بتموجات، أجواء دراماتيكية، إضاءة خافتة طبيعية، رندر واقعي.' },

  // ─── Weather & Seasons ────────────────────────────────────────────
  { name: 'Autumn Scene', nameAr: 'مشهد الخريف', text: 'Ultra-realistic autumn scene with a moody atmosphere, overcast sky, soft diffused light, light mist in the air, wet ground reflecting subtle light, deep warm browns and muted orange tones mixed with cool grey shadows, fallen leaves scattered naturally, damp textures, cinematic mood, realistic fog depth, high detail, natural color grading, professional photography, shallow depth of field, sharp focus, 8k, photorealistic.', textAr: 'مشهد خريف واقعي للغاية مع أجواء دراماتيكية، سماء ملبدة بالغيوم، ضوء ناعم منتشر، ضباب خفيف في الهواء، أرض رطبة تعكس ضوء خافت، درجات بني دافئة عميقة ونغمات برتقالية خافتة ممزوجة مع ظلال رمادية باردة، أوراق ساقطة متناثرة بشكل طبيعي، نسيج رطب، مزاج سينمائي، عمق ضباب واقعي، تفاصيل عالية، تدرج ألوان طبيعي، تصوير احترافي، عمق مجال ضحل، تركيز حاد، 8k، واقعي.' },
  { name: 'Winter / Snow', nameAr: 'شتاء / ثلج', text: 'Transfer this image to winter, add a realistic blanket of snow covering roofs, ground, and landscape elements, frost on windows, overcast winter sky, cold blue-white color palette, visible breath in cold air, icicles on edges, photorealistic winter atmosphere.', textAr: 'انقل هذه الصورة إلى الشتاء، أضف غطاء ثلجي واقعي يغطي الأسطح والأرض وعناصر المناظر الطبيعية، صقيع على النوافذ، سماء شتوية ملبدة بالغيوم، لوحة ألوان زرقاء بيضاء باردة، أنفاس مرئية في الهواء البارد، كرات ثلجية على الحواف، أجواء شتوية واقعية.' },
  { name: 'Fog', nameAr: 'ضباب', text: 'Add realistic atmospheric fog to the scene, soft diffusion of distant elements, gradual depth fog reducing visibility, misty mysterious mood, subtle light scattering, photorealistic volumetric haze.', textAr: 'أضف ضباب جوي واقعي إلى المشهد، انتشار ناعم للعناصر البعيدة، ضباب عمق تدريجي يقلل الرؤية، أجواء ضبابية غامضة، تشتيت ضوء خفيف، ضباب حجمي واقعي.' },
  { name: 'Volumetric Rays', nameAr: 'أشعة حجمية', text: 'Add volumetric god rays coming from behind trees and structures, dramatic light beams cutting through shadows, enhanced atmospheric haze, cinematic lighting, photorealistic light scattering effect.', textAr: 'أضف أشعة إلهية حجمية قادمة من خلف الأشجار والهياكل، أشعة ضوء دراماتيكية تخترق الظلال، ضباب جوي معزز، إضاءة سينمائية، تأثير تشتيت ضوء واقعي.' },

  // ─── People & Objects ─────────────────────────────────────────────
  { name: 'Add People', nameAr: 'إضافة أشخاص', text: 'Add photorealistic people naturally interacting within the space — walking, sitting, conversing. Diverse group, contemporary casual clothing, natural poses, correct scale and perspective, realistic shadows and lighting matching the scene.', textAr: 'أضف أشخاصاً واقعيين يتفاعلون بشكل طبيعي في المساحة - مشياً أو جلوساً أو محادثة. مجموعة متنوعة، ملابس عصرية غير رسمية، أوضاع طبيعية، مقياس ومنظور صحيح، ظلال واقعية وإضاءة تطابق المشهد.' },
  { name: 'Add Cars', nameAr: 'إضافة سيارات', text: 'Add photorealistic parked cars appropriate to the scene context, correct scale and perspective, realistic reflections on car paint, natural shadows on ground, modern vehicle models.', textAr: 'أضف سيارات واقعية متوقفة مناسبة لسياق المشهد، مقياس ومنظور صحيح، انعكاسات واقعية على طلاء السيارة، ظلال طبيعية على الأرض، موديلات سيارات حديثة.' },
  { name: 'Add Trees', nameAr: 'إضافة أشجار', text: 'Add mature realistic trees to the landscape, appropriate species for the climate, natural canopy shapes, detailed bark and leaf textures, realistic shadows cast on ground and building, photorealistic foliage.', textAr: 'أضف أشجاراً ناضجة واقعية إلى المناظر الطبيعية، أنواع مناسبة للمناخ، أشكال مظلة طبيعية، نسيج قشرة وأوراق مفصل، ظلال واقعية تلقى على الأرض والمبنى، أوراق واقعية.' },

  // ─── Camera & Composition ─────────────────────────────────────────
  { name: 'Drone View', nameAr: 'منظر درون', text: 'Move the camera to a high drone viewpoint above the scene, revealing a large surrounding environment around the project. Keep the main object clearly visible while preserving original frame proportions and composition. Bird\'s eye perspective, wide context.', textAr: 'حرك الكاميرا إلى منظور درون عالي فوق المشهد، كاشفاً عن بيئة محيطة كبيرة حول المشروع. حافظ على وضوح الجسم الرئيسي مع الحفاظ على نسب الإطار الأصلية والتكوين. منظور عين الطائر، سياق واسع.' },
  { name: 'Another Angle', nameAr: 'زاوية أخرى', text: 'Take a shot from a completely different angle — new camera position revealing unseen aspects of the space, fresh perspective, maintain architectural accuracy and realistic lighting from the new viewpoint.', textAr: 'التقط لقطة من زاوية مختلفة تماماً - موضع كاميرا جديد يكشف عن جوانب غير مرئية من المساحة، منظور جديد، حافظ على الدقة المعمارية والإضاءة الواقعية من وجهة النظر الجديدة.' },

  // ─── Style & Aesthetics ───────────────────────────────────────────
  { name: 'Cinematic Film', nameAr: 'فيلم سينمائي', text: 'Ultra cinematic architectural photography, anamorphic lens flare, atmospheric depth, subtle film grain, moody contrast, realistic exposure rolloff, award-winning ArchDaily visual style.', textAr: 'تصوير معماري سينمائي فائق، وهمة عدسات انامورفيك، عمق جوي، حبيبات فيلم خفيفة، تباين دراماتيكي، تدرج تعريض واقعي، أسلوب بصري ArchDaily الحائز على الجوائز.' },
  { name: 'Luxury Interior', nameAr: 'داخلي فاخر', text: 'Luxury contemporary interior design, Italian furniture aesthetic, soft indirect lighting, natural stone surfaces, premium materials, elegant composition, high-end hospitality atmosphere.', textAr: 'تصميم داخلي معاصر فاخر، جماليات أثاث إيطالي، إضاءة غير مباشرة ناعمة، أسطح حجر طبيعي، مواد ممتازة، تكوين أنيق، أجواء ضيافة راقية.' },

  // ─── Technical & Presentation ─────────────────────────────────────
  { name: 'Material Moodboard', nameAr: 'لوحة مواد', text: 'Create a high-end interior design material moodboard using only the materials present in the 3D scene. Arrange the samples in an artistic, layered composition similar to luxury architectural boards, with realistic textures, shadows, and soft studio lighting.', textAr: 'أنشئ لوحة مواد تصميم داخلي راقية باستخدام المواد الموجودة في المشهد 3D فقط. رتّب العينات في تكوين فني متدرج مشابه لألواح العمارة الفاخرة، مع نسيج واقعي وظلال وإضاءة ستوديو ناعمة.' },
  { name: 'Editorial Board', nameAr: 'لوحة تحريرية', text: 'Create a high-end editorial design presentation board based on the provided project. Do not redesign the project — only present it in a premium portfolio style. Include: one large dominant isometric cut-away axonometric view as focal point, a front elevation with subtle dimensions, a secondary elevation highlighting materials, curated material swatches arranged aesthetically, minimal elegant annotations, clear visual hierarchy and negative space.', textAr: 'أنشئ لوحة عرض تصميم تحريرية راقية بناءً على المشروع المقدم. لا تعيد تصميم المشروع - قدّمه فقط بأسلوب محفظة فاخر. يتضمن: منظور ايزوميتريك قطعي كبير مهيمن كنقطة محورية، وواجهة أمامية بأبعاد خفيفة، وواجهة ثانوية تسلط الضوء على المواد، وعينات مواد مختارة بشكل جمالي، وتعليقات أنيقة بسيطة، وترتيب بصري واضح ومساحة سلبية.' },
];

interface PromptModalProps {
  prompt: { name: string; nameAr: string; text: string; textAr: string } | null;
  isOpen: boolean;
  onClose: () => void;
}

function PromptModal({ prompt, isOpen, onClose }: PromptModalProps) {
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();

  const handleCopy = () => {
    if (prompt) {
      // Use Arabic text if available and language is Arabic
      const textToCopy = lang === 'ar' && prompt.textAr ? prompt.textAr : prompt.text;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && prompt && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="w-full max-w-lg">
            <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-anarchy-red" />
                  <h3 className="text-lg font-bold text-white">{lang === 'ar' ? prompt.nameAr : prompt.name}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Prompt Text */}
              <div className="bg-black/40 rounded-xl p-4 mb-4 border border-white/5">
                <p className="text-sm text-gray-300 leading-relaxed font-mono">{lang === 'ar' ? prompt.textAr : prompt.text}</p>
              </div>
              
              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="w-full py-3 px-4 bg-anarchy-red hover:bg-anarchy-red/80 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <span>{lang === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    <span>{lang === 'ar' ? 'نسخ البرومبت' : 'Copy Prompt'}</span>
                  </>
                )}
              </button>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; life: number;
  decay: number; color: string;
  erupting: boolean;
}

interface GlitchLine {
  x: number; y: number; w: number; h: number;
  life: number; decay: number; color: string;
}

export function Hero() {
  const { t, lang } = useLanguage();
  const [selectedPrompt, setSelectedPrompt] = useState<{ name: string; nameAr: string; text: string; textAr: string } | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);
  const [isEngineModalOpen, setIsEngineModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const glitchLinesRef = useRef<GlitchLine[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const titleWrapRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const createParticle = useCallback((x?: number, y?: number, erupting = false): Particle => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    if (erupting) {
      return {
        x: x ?? W / 2, y: y ?? H / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        size: Math.random() * 4 + 1,
        life: 1, decay: 0.02 + Math.random() * 0.02,
        color: Math.random() < 0.7 ? '#E63030' : `hsl(${Math.random() * 20},90%,65%)`,
        erupting: true,
      };
    }
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      life: Math.random(),
      decay: 0.002 + Math.random() * 0.003,
      color: Math.random() < 0.4 ? 'red' : 'white',
      erupting: false,
    };
  }, []);

  const createGlitchLine = useCallback((): GlitchLine => ({
    x: Math.random() * window.innerWidth * 0.3,
    y: Math.random() * window.innerHeight,
    w: Math.random() * window.innerWidth * 0.8 + 50,
    h: Math.random() * 2 + 0.5,
    life: 1,
    decay: 0.08 + Math.random() * 0.1,
    color: Math.random() < 0.6 ? '#E63030' : 'rgba(255,255,255,0.8)',
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    for (let i = 0; i < 180; i++) particlesRef.current.push(createParticle());

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, W, H);
      frameRef.current++;

      // Random glitch lines
      if (Math.random() < 0.04) glitchLinesRef.current.push(createGlitchLine());
      glitchLinesRef.current = glitchLinesRef.current.filter(l => l.life > 0);
      for (const l of glitchLinesRef.current) {
        l.life -= l.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(0, l.life * 0.4);
        ctx.fillStyle = l.color;
        ctx.fillRect(l.x, l.y, l.w, l.h);
        ctx.restore();
      }

      // Particles
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      for (const p of particlesRef.current) {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.erupting) { p.vx *= 0.93; p.vy *= 0.93; }
        ctx.save();
        const alpha = Math.max(0, p.life * (p.erupting ? 1 : 0.6));
        ctx.globalAlpha = alpha;
        if (p.erupting) {
          ctx.fillStyle = p.color;
        } else {
          ctx.fillStyle = p.color === 'red'
            ? `rgba(230,48,48,${alpha})`
            : `rgba(255,255,255,${alpha * 0.5})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      while (particlesRef.current.filter(p => !p.erupting).length < 180) {
        particlesRef.current.push(createParticle());
      }

      // Radial glow
      const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H * 0.6);
      const pulse = 0.5 + Math.sin(frameRef.current * 0.02) * 0.1;
      grd.addColorStop(0, `rgba(230,48,48,${0.04 * pulse})`);
      grd.addColorStop(0.5, `rgba(99,102,241,${0.02 * pulse})`);
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Scanlines
      if (frameRef.current % 3 === 0) {
        ctx.save();
        ctx.globalAlpha = 0.015;
        for (let y = 0; y < H; y += 4) {
          ctx.fillStyle = 'rgba(0,0,0,1)';
          ctx.fillRect(0, y, W, 1);
        }
        ctx.restore();
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [createParticle, createGlitchLine]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = (e.clientX - 6) + 'px';
        cursorRef.current.style.top = (e.clientY - 6) + 'px';
      }
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = (e.clientX - 20) + 'px';
          trailRef.current.style.top = (e.clientY - 20) + 'px';
        }
      }, 80);
      // Parallax
      const dx = (e.clientX - window.innerWidth / 2) / window.innerWidth * 12;
      const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight * 12;
      if (titleWrapRef.current) {
        titleWrapRef.current.style.transform = `translate(${dx}px,${dy}px)`;
      }
    };
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY, true));
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, [createParticle]);

  // Count-up animation
  useEffect(() => {
    const countUp = (id: string, target: number, suffix: string, delay: number) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        let current = 0;
        const step = target / 60;
        const iv = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(iv); }
          el.textContent = Math.round(current) + suffix;
        }, 800 / 60);
      }, delay);
    };
    countUp('stat-engines', 11, '+', 1400);
    countUp('stat-integrations', 5, '', 1500);
    countUp('stat-res', 16, 'K', 1600);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', width: 12, height: 12,
          background: '#E63030', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'transform 0.1s',
        }}
      />
      <div
        ref={trailRef}
        style={{
          position: 'fixed', width: 40, height: 40,
          border: '1px solid rgba(230,48,48,0.4)',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
          transition: 'all 0.15s ease',
        }}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Noise overlay */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 1, opacity: 0.035, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        body { cursor: none; }

        #anarchy-hero { cursor: none; }

        .anarchy-letter {
          display: inline-block;
          animation: letter-chaos 0.6s cubic-bezier(0.23,1,0.32,1) both;
        }
        @keyframes letter-chaos {
          0%   { opacity:0; transform: translateY(60px) rotate(var(--r,5deg)) scale(0.8); }
          100% { opacity:1; transform: translateY(0) rotate(0deg) scale(1); }
        }

        .anarchy-glitch { position: relative; }
        .anarchy-glitch::before,
        .anarchy-glitch::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0; right: 0;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          letter-spacing: inherit;
          clip: rect(0,0,0,0);
        }
        .anarchy-glitch::before {
          color: #00ffff; left: 2px;
          animation: glitch-1 4s infinite;
        }
        .anarchy-glitch::after {
          color: #ff00ff; left: -2px;
          animation: glitch-2 4s infinite;
        }
        @keyframes glitch-1 {
          0%,89%,100% { clip: rect(0,9999px,0,0); }
          10% { clip: rect(20px,9999px,60px,0); transform: skewX(-3deg); }
          15% { clip: rect(80px,9999px,120px,0); }
          20% { clip: rect(40px,9999px,80px,0); transform: skewX(2deg); }
          25% { clip: rect(0,9999px,0,0); }
        }
        @keyframes glitch-2 {
          0%,84%,100% { clip: rect(0,9999px,0,0); }
          12% { clip: rect(60px,9999px,100px,0); transform: skewX(4deg); }
          18% { clip: rect(10px,9999px,40px,0); }
          23% { clip: rect(90px,9999px,140px,0); transform: skewX(-2deg); }
          28% { clip: rect(0,9999px,0,0); }
        }

        .anarchy-badge-anim  { animation: fade-up 0.8s 0.2s cubic-bezier(0.23,1,0.32,1) both; }
        .anarchy-sub-anim    { animation: fade-up 0.8s 0.9s cubic-bezier(0.23,1,0.32,1) both; }
        .anarchy-eng-anim    { animation: fade-up 0.8s 0.85s cubic-bezier(0.23,1,0.32,1) both; }
        .anarchy-cta-anim    { animation: fade-up 0.8s 1.1s cubic-bezier(0.23,1,0.32,1) both; }
        .anarchy-stats-anim  { animation: fade-up 0.8s 1.3s cubic-bezier(0.23,1,0.32,1) both; }
        .anarchy-scroll-anim { animation: fade-up 1s 1.8s both; }
        .anarchy-ss-anim     { animation: fade-up 1s 1.5s cubic-bezier(0.23,1,0.32,1) both; }

        @keyframes fade-up {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }

        .anarchy-badge-dot { animation: badge-pulse 1.5s ease-in-out infinite; }
        @keyframes badge-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.6); }
        }

        .anarchy-btn-primary {
          padding: 14px 32px;
          background: #E63030; color: #fff;
          font-weight: 700; font-size: 13px;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: none; border-radius: 4px;
          cursor: none; position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s;
          font-family: inherit;
        }
        .anarchy-btn-primary::before {
          content:''; position:absolute; top:0; left:-100%;
          width:100%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
          transition: left 0.4s;
        }
        .anarchy-btn-primary:hover::before { left: 100%; }
        .anarchy-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 60px rgba(230,48,48,0.45);
        }

        .anarchy-btn-ghost {
          padding: 14px 32px;
          background: transparent; color: rgba(255,255,255,0.6);
          font-weight: 700; font-size: 13px;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.12); border-radius: 4px;
          cursor: none; transition: all 0.2s;
          font-family: inherit;
        }
        .anarchy-btn-ghost:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }

        .anarchy-scroll-line {
          width: 1px; height: 60px;
          background: linear-gradient(to bottom, rgba(230,48,48,0.8), transparent);
          animation: scroll-drop 2s ease-in-out infinite;
        }
        @keyframes scroll-drop {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        .anarchy-shimmer {
          animation: shimmer 3s ease-in-out 1s infinite;
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }

        .anarchy-prompts-anim {
          animation: fade-in-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1.2s both;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        id="anarchy-hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
          {/* Badge */}
          <div
            className="anarchy-badge-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium mb-8 tracking-wide"
          >
            <span className="anarchy-badge-dot w-1.5 h-1.5 rounded-full bg-anarchy-red" />
            {t.hero.tagline}
          </div>

          {/* Title */}
          <div ref={titleWrapRef} style={{ transition: 'transform 0.1s linear', marginBottom: 8 }}>
            {/* Line 1 */}
            <div
              style={{
                fontFamily: lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Bebas Neue', sans-serif",
                fontSize: lang === 'ar' ? 'clamp(32px,8vw,120px)' : 'clamp(36px,10vw,150px)',
                lineHeight: 0.85, color: '#fff',
                letterSpacing: lang === 'ar' ? 0 : -2, display: 'block',
                fontWeight: lang === 'ar' ? 900 : 'normal',
              }}
            >
              {lang === 'ar' ? (
                <span className="anarchy-letter" style={{ animationDelay: '0.3s' }}>
                  {t.hero.title1}
                </span>
              ) : (
                'BUILD AI'.split('').map((ch, i) => (
                  <span
                    key={i}
                    className="anarchy-letter"
                    style={{
                      animationDelay: (0.3 + i * 0.04) + 's',
                      ['--r' as string]: (Math.random() * 20 - 10) + 'deg',
                    }}
                  >{ch === ' ' ? '\u00A0' : ch}</span>
                ))
              )}
            </div>

            {/* Line 2 — glitch */}
            <div
              className="anarchy-glitch"
              data-text={lang === 'ar' ? t.hero.title2 : 'ARCHITECTURE'}
              style={{
                fontFamily: lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Bebas Neue', sans-serif",
                fontSize: lang === 'ar' ? 'clamp(32px,8vw,120px)' : 'clamp(36px,10vw,150px)',
                lineHeight: 0.85,
                color: '#E63030',
                letterSpacing: lang === 'ar' ? 0 : -2,
                textShadow: '0 0 80px rgba(230,48,48,0.5)',
                display: 'block',
                fontWeight: lang === 'ar' ? 900 : 'normal',
              }}
            >
              {lang === 'ar' ? (
                <span className="anarchy-letter" style={{ animationDelay: '0.45s' }}>
                  {t.hero.title2}
                </span>
              ) : (
                'ARCHITECTURE'.split('').map((ch, i) => (
                  <span
                    key={i}
                    className="anarchy-letter"
                    style={{
                      animationDelay: (0.45 + i * 0.035) + 's',
                      ['--r' as string]: (Math.random() * 20 - 10) + 'deg',
                    }}
                  >{ch}</span>
                ))
              )}
            </div>

            {/* Line 3 */}
            <div
              style={{
                fontFamily: lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Bebas Neue', sans-serif",
                fontSize: lang === 'ar' ? 'clamp(32px,8vw,120px)' : 'clamp(36px,10vw,150px)',
                lineHeight: 0.85, color: '#fff',
                letterSpacing: lang === 'ar' ? 0 : -2, display: 'block',
                fontWeight: lang === 'ar' ? 900 : 'normal',
              }}
            >
              {lang === 'ar' ? (
                <span className="anarchy-letter" style={{ animationDelay: '0.6s' }}>
                  {t.hero.title3}
                </span>
              ) : (
                'WITHOUT LIMITS'.split('').map((ch, i) => (
                  <span
                    key={i}
                    className="anarchy-letter"
                    style={{
                      animationDelay: (0.6 + i * 0.03) + 's',
                      ['--r' as string]: (Math.random() * 20 - 10) + 'deg',
                    }}
                  >{ch === ' ' ? '\u00A0' : ch}</span>
                ))
              )}
            </div>
          </div>

          {/* Prompts Gallery - ABOVE THE FOLD */}
          <div className="anarchy-prompts-anim mb-8 w-full max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={14} className="text-anarchy-red" />
              <span className="text-xs text-gray-500 uppercase tracking-widest">
                {lang === 'ar' ? 'معرض البرومبتات' : 'Prompts Gallery'}
              </span>
              <Sparkles size={14} className="text-anarchy-red" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {prompts.slice(0, 10).map((prompt) => (
                <motion.button
                  key={prompt.name}
                  onClick={() => {
                    setSelectedPrompt(prompt);
                    setIsPromptModalOpen(true);
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(230, 48, 48, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/[0.03] border border-white/[0.08] hover:border-anarchy-red/30 rounded-full transition-all flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-anarchy-red/60" />
                  {lang === 'ar' ? prompt.nameAr : prompt.name}
                </motion.button>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              {lang === 'ar' ? `+${prompts.length - 10} برومبت إضافي` : `+${prompts.length - 10} more prompts`}
            </p>
          </div>

          {/* Subtitle */}
          <p
            className="anarchy-sub-anim text-lg text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{ fontSize: 'clamp(14px,2vw,17px)', maxWidth: 520, lineHeight: 1.75, margin: '20px auto 16px' }}
          >
            {t.hero.description}
          </p>

          {/* Engine pills */}
          <div
            className="anarchy-eng-anim flex items-center justify-center gap-2 flex-wrap mb-6"
            aria-label="Supported AI engines"
          >
            <span className="text-xs text-gray-600 uppercase tracking-widest mr-1">{t.hero.poweredBy}</span>
            {engines.map(e => (
              <motion.button
                key={e}
                onClick={() => {
                  setSelectedEngine(e);
                  setIsEngineModalOpen(true);
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(230, 48, 48, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                className="text-xs text-gray-400 bg-white/[0.04] border border-white/[0.08] hover:border-anarchy-red/40 px-3 py-1 rounded-full transition-all cursor-pointer"
              >{e}</motion.button>
            ))}
          </div>

          {/* Prompt Modal */}
          <PromptModal
            prompt={selectedPrompt}
            isOpen={isPromptModalOpen}
            onClose={() => setIsPromptModalOpen(false)}
          />

          {/* Engine Modal */}
          <EngineModal
            engine={selectedEngine}
            isOpen={isEngineModalOpen}
            onClose={() => setIsEngineModalOpen(false)}
          />

          {/* CTA - Watch Workflow only (no Request Access) */}
          <div
            className="anarchy-cta-anim flex items-center justify-center"
          >
            <button
              className="anarchy-btn-ghost"
              onClick={() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.watchWorkflow} ↗
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 14, letterSpacing: '1px' }}>
            {t.footer.builtWith}
          </p>

          {/* Stats */}
          <div
            className="anarchy-stats-anim flex items-center justify-center gap-10 flex-wrap mt-14 mb-16"
            aria-label="Product statistics"
          >
            {[
              { id: 'stat-engines', init: '11+', label: t.hero.stats.engines },
              { id: 'stat-integrations', init: '5', label: t.hero.stats.integrations },
              { id: 'stat-res', init: '16K', label: t.hero.stats.resolution },
              { id: '', init: '∞', label: t.hero.stats.renders },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div
                  id={s.id || undefined}
                  className="text-3xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: '#fff', lineHeight: 1 }}
                >{s.init}</div>
                <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest" style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Hero product screenshot */}
          <div
            className="anarchy-ss-anim relative mx-auto max-w-6xl px-4"
          >
            {/* Glow halo */}
            <div className="absolute -inset-6 bg-gradient-to-r from-anarchy-red/25 via-purple-500/15 to-blue-500/10 rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="/screenshots/builder-node.png"
                alt="Anarchy AI Builder — Node canvas with connected AI render workflow"
                className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
                decoding="async"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="anarchy-scroll-anim absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-colors"
          aria-label="Scroll to demo"
        >
          <button onClick={scrollToFeatures} className="focus-visible:outline-none">
            <ChevronDown size={24} className="animate-bounce" />
          </button>
        </div>
      </section>
    </>
  );
}

