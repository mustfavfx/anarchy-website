import { motion } from 'framer-motion';
import { ArrowLeft, Shield, FileText, AlertTriangle, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalSectionProps {
  readonly title: string;
  readonly titleAr: string;
  readonly content: string[];
  readonly contentAr: string[];
  readonly lang: 'en' | 'ar';
  readonly icon?: React.ElementType;
}

function LegalSection({ title, titleAr, content, contentAr, lang, icon: Icon }: LegalSectionProps) {
  const isRTL = lang === 'ar';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-8 ${isRTL ? 'font-arabic text-right' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-anarchy-red/10 flex items-center justify-center flex-shrink-0">
            <Icon size={20} className="text-anarchy-red" />
          </div>
        )}
        <h2 className="text-2xl font-bold text-white">
          {isRTL ? titleAr : title}
        </h2>
      </div>
      <div className="glass-card rounded-2xl p-6">
        {(isRTL ? contentAr : content).map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-gray-400 leading-relaxed mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

interface LegalPageProps {
  readonly onBack: () => void;
}

export function PrivacyPolicy({ onBack }: LegalPageProps) {
  const { lang } = useLanguage();

  const sections = [
    {
      title: 'Privacy Policy',
      titleAr: 'سياسة الخصوصية',
      icon: Shield,
      content: [
        '**Anarchy AI** - AI-Powered Architectural Visualization',
        '',
        '**Effective Date:** April 27, 2026',
        '**Developer:** Architect Mustafa Hisham',
        '',
        '## 1. Information We Collect',
        '',
        '**Anarchy AI** is designed with privacy in mind. We collect minimal data:',
        '',
        '**Local Data (Stored on Your Device Only):**',
        '- App Settings: Theme preferences, language, notification settings',
        '- Project Data: Your architectural projects, workflows, and generated images',
        '- History: Generation history and usage logs',
        '- Library: Your saved assets and images',
        '',
        '**Important:** All data is stored locally on your device using localStorage. We do not store your data on any external servers.',
        '',
        '**API Usage:**',
        '- AI Providers: When you generate images, your prompts are sent to our AI providers for processing',
        '- API Tokens: Your API tokens are stored locally in your .env file or environment variables'
      ],
      contentAr: [
        '**Anarchy AI** - تصور معماري مدعوم بالذكاء الاصطناعي',
        '',
        '**تاريخ النفاذ:** 27 أبريل 2026',
        '**المطور:** المهندس المعماري مصطفى هشام',
        '',
        '## 1. المعلومات التي نجمعها',
        '',
        'تم تصميم **Anarchy AI** مع مراعاة الخصوصية. نحن نجمع الحد الأدنى من البيانات:',
        '',
        '**البيانات المحلية (مخزنة على جهازك فقط):**',
        '- إعدادات التطبيق: تفضيلات السمة، اللغة، إعدادات الإشعارات',
        '- بيانات المشروع: مشاريعك المعمارية، وسير العمل، والصور المولدة',
        '- السجل: سجل التوليد وسجلات الاستخدام',
        '- المكتبة: أصولك والصور المحفوظة',
        '',
        '**مهم:** يتم تخزين جميع البيانات محليًا على جهازك باستخدام localStorage. نحن لا نخزن بياناتك على أي خوادم خارجية.'
      ]
    },
    {
      title: 'How We Use Your Information',
      titleAr: 'كيف نستخدم معلوماتك',
      icon: FileText,
      content: [
        '- Local Storage: To save your preferences and projects',
        '- Image Generation: To process your architectural visualization requests',
        '- App Functionality: To provide the core features of the application'
      ],
      contentAr: [
        '- التخزين المحلي: لحفظ تفضيلاتك ومشاريعك',
        '- توليد الصور: لمعالجة طلبات التصور المعماري الخاصة بك',
        '- وظائف التطبيق: لتوفير الميزات الأساسية للتطبيق'
      ]
    },
    {
      title: 'Data Security',
      titleAr: 'أمان البيانات',
      icon: Shield,
      content: [
        '- All data remains on your device',
        '- No data is transmitted to our servers',
        '- API communications use HTTPS encryption',
        '- You can export/delete all data anytime via Settings > Storage'
      ],
      contentAr: [
        '- تبقى جميع البيانات على جهازك',
        '- لا يتم نقل البيانات إلى خوادمنا',
        '- تستخدم اتصالات API تشفير HTTPS',
        '- يمكنك تصدير/حذف جميع البيانات في أي وقت عبر الإعدادات > التخزين'
      ]
    },
    {
      title: 'Third-Party Services',
      titleAr: 'خدمات الطرف الثالث',
      icon: ChevronRight,
      content: [
        'We use the following third-party services:',
        '',
        '| Service | Purpose | Data Shared |',
        '|---------|---------|-------------|',
        '| AI Providers | AI image generation | Prompts, API token |'
      ],
      contentAr: [
        'نحن نستخدم خدمات الطرف الثالث التالية:',
        '',
        '| الخدمة | الغرض | البيانات المشتركة |',
        '|---------|---------|-------------|',
        '| مزودو الذكاء الاصطناعي | توليد الصور بالذكاء الاصطناعي | المطالبات، رمز API |'
      ]
    },
    {
      title: 'Your Rights',
      titleAr: 'حقوقك',
      icon: FileText,
      content: [
        'You have complete control over your data:',
        '- Export: Export all data as JSON',
        '- Delete: Clear all data from Settings',
        '- Transfer: Move data to another device',
        '- Offline Use: Use the app without internet (except for AI generation)'
      ],
      contentAr: [
        'لديك سيطرة كاملة على بياناتك:',
        '- تصدير: تصدير جميع البيانات كـ JSON',
        '- حذف: مسح جميع البيانات من الإعدادات',
        '- نقل: نقل البيانات إلى جهاز آخر',
        '- الاستخدام دون اتصال: استخدام التطبيق بدون إنترنت (ما عدا توليد الذكاء الاصطناعي)'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-anarchy-dark pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 glass px-4 py-2 rounded-full"
        >
          <ArrowLeft size={20} />
          {lang === 'ar' ? 'العودة' : 'Back'}
        </motion.button>

        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-4 ${lang === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-anarchy-red/20 to-purple-500/20 flex items-center justify-center">
              <Shield size={28} className="text-anarchy-red" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </h1>
              <p className="text-gray-500 mt-1">
                {lang === 'ar' ? 'آخر تحديث: 7 مايو 2026' : 'Last updated: May 7, 2026'}
              </p>
            </div>
          </motion.div>
        </div>

        <div className={`mb-6 p-4 rounded-xl bg-anarchy-red/10 border border-anarchy-red/20 ${lang === 'ar' ? 'font-arabic text-right' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <p className="text-gray-400 text-sm">
            {lang === 'ar' 
              ? 'نحن نأخذ خصوصيتك على محمل الجد. تواصل معنا على anarchy.lat@gmail.com لأي استفسارات.'
              : 'We take your privacy seriously. Contact us at anarchy.lat@gmail.com for any inquiries.'
            }
          </p>
        </div>

        {sections.map((section) => (
          <LegalSection key={section.title} {...section} lang={lang} />
        ))}

        <div className={`mt-12 pt-8 border-t border-white/10 text-center ${lang === 'ar' ? 'font-arabic' : ''}`}>
          <p className="text-gray-500 text-sm">
            {lang === 'ar' 
              ? '© 2026 Anarchy AI. جميع الحقوق محفوظة.'
              : '© 2026 Anarchy AI. All rights reserved.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export function TermsOfService({ onBack }: LegalPageProps) {
  const { lang } = useLanguage();

  const sections = [
    {
      title: 'Terms of Use',
      titleAr: 'شروط الاستخدام',
      icon: FileText,
      content: [
        '## 1. Acceptance of Terms',
        '',
        'By using Anarchy AI, you agree to these Terms of Use.',
        '',
        '## 2. License',
        '',
        '**Anarchy AI** is provided as-is for architectural visualization purposes.',
        '',
        '- Personal Use: Free for personal and professional architectural work',
        '- Commercial Use: Allowed for client projects and commercial work',
        '- Redistribution: Do not redistribute the application',
        '- Reverse Engineering: Do not modify or reverse engineer the code'
      ],
      contentAr: [
        '## 1. قبول الشروط',
        '',
        'باستخدام Anarchy AI، فإنك توافق على شروط الاستخدام هذه.',
        '',
        '## 2. الترخيص',
        '',
        'يتم توفير **Anarchy AI** كما هو لأغراض التصور المعماري.',
        '',
        '- الاستخدام الشخصي: مجاني للعمل المعماري الشخصي والمهني',
        '- الاستخدام التجاري: مسموح به لمشاريع العملاء والعمل التجاري',
        '- إعادة التوزيع: لا تقم بإعادة توزيع التطبيق',
        '- الهندسة العكسية: لا تقم بتعديل أو هندسة عكسية للكود'
      ]
    },
    {
      title: 'User Responsibilities',
      titleAr: 'مسؤوليات المستخدم',
      icon: ChevronRight,
      content: [
        'You are responsible for:',
        '- Maintaining your own AI provider account and usage limits',
        '- Ensuring your generated content complies with local laws',
        '- Respecting intellectual property rights of others',
        '- Keeping your API tokens secure'
      ],
      contentAr: [
        'أنت مسؤول عن:',
        '- الحفاظ على حساب مزود الذكاء الاصطناعي الخاص بك وحدود الاستخدام',
        '- ضمان امتثال المحتوى المولد للقوانين المحلية',
        '- احترام حقوق الملكية الفكرية للآخرين',
        '- الحفاظ على أمان رموز API الخاصة بك'
      ]
    },
    {
      title: 'AI-Generated Content',
      titleAr: 'المحتوى المولد بالذكاء الاصطناعي',
      icon: FileText,
      content: [
        '- Generated images are created using AI models via our providers',
        '- You retain rights to images you generate',
        '- AI models may have their own usage policies',
        '- Do not use for illegal, harmful, or deceptive purposes'
      ],
      contentAr: [
        '- يتم إنشاء الصور المولدة باستخدام نماذج الذكاء الاصطناعي عبر مزودينا',
        '- أنت تحتفظ بحقوق الصور التي تولدها',
        '- قد يكون للنماذج سياسات استخدام خاصة بها',
        '- لا تستخدم لأغراض غير قانونية أو ضارة أو خادعة'
      ]
    },
    {
      title: 'Limitations',
      titleAr: 'القيود',
      icon: AlertTriangle,
      content: [
        '**Anarchy AI** is provided without warranties:',
        '- AI generation availability depends on our AI providers',
        '- Generated image quality varies',
        '- We are not liable for any damages from app usage'
      ],
      contentAr: [
        'يتم توفير **Anarchy AI** دون ضمانات:',
        '- توفر توليد الذكاء الاصطناعي يعتمد على مزودي الذكاء الاصطناعي',
        '- جودة الصور المولدة تختلف',
        '- نحن غير مسؤولين عن أي أضرار ناتجة عن استخدام التطبيق'
      ]
    },
    {
      title: 'Changes to Terms',
      titleAr: 'التغييرات على الشروط',
      icon: ChevronRight,
      content: [
        'We may update these terms. Continued use after changes constitutes acceptance.'
      ],
      contentAr: [
        'قد نقوم بتحديث هذه الشروط. الاستخدام المستمر بعد التغييرات يشكل قبولاً.'
      ]
    },
    {
      title: 'Contact',
      titleAr: 'التواصل',
      icon: FileText,
      content: [
        'For questions or concerns:',
        '',
        '**Developer:** Architect Mustafa Hisham',
        '- Instagram: https://www.instagram.com/mustafa_hisham.1/',
        '- Behance: https://www.behance.net/Mustafa_VFX',
        '- Telegram: https://t.me/Mustafa_VFX'
      ],
      contentAr: [
        'للأسئلة أو الاستفسارات:',
        '',
        '**المطور:** المهندس المعماري مصطفى هشام',
        '- Instagram: https://www.instagram.com/mustafa_hisham.1/',
        '- Behance: https://www.behance.net/Mustafa_VFX',
        '- Telegram: https://t.me/Mustafa_VFX'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-anarchy-dark pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 glass px-4 py-2 rounded-full"
        >
          <ArrowLeft size={20} />
          {lang === 'ar' ? 'العودة' : 'Back'}
        </motion.button>

        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-4 ${lang === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <FileText size={28} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {lang === 'ar' ? 'شروط الاستخدام' : 'Terms of Use'}
              </h1>
              <p className="text-gray-500 mt-1">
                {lang === 'ar' ? 'آخر تحديث: 27 أبريل 2026' : 'Last updated: April 27, 2026'}
              </p>
            </div>
          </motion.div>
        </div>

        {sections.map((section) => (
          <LegalSection key={section.title} {...section} lang={lang} />
        ))}

        <div className={`mt-12 pt-8 border-t border-white/10 text-center ${lang === 'ar' ? 'font-arabic' : ''}`}>
          <p className="text-gray-500 text-sm">
            {lang === 'ar' 
              ? '© 2026 Anarchy AI. جميع الحقوق محفوظة.'
              : '© 2026 Anarchy AI. All rights reserved.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export function Disclaimer({ onBack }: LegalPageProps) {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-anarchy-dark pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 glass px-4 py-2 rounded-full"
        >
          <ArrowLeft size={20} />
          {lang === 'ar' ? 'العودة' : 'Back'}
        </motion.button>

        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-4 ${lang === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
              <AlertTriangle size={28} className="text-yellow-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {lang === 'ar' ? 'إخلاء مسؤولية' : 'Disclaimer'}
              </h1>
              <p className="text-gray-500 mt-1">
                {lang === 'ar' ? 'آخر تحديث: 7 مايو 2026' : 'Last updated: May 7, 2026'}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`glass-card rounded-2xl p-8 mb-6 ${lang === 'ar' ? 'font-arabic text-right' : ''}`}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            {lang === 'ar' ? 'إخلاء مسؤولية عام' : 'General Disclaimer'}
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            {lang === 'ar' 
              ? 'المعلومات والأدوات المقدمة من Anarchy AI هي لأغراض إعلامية ومساعدة في سير العمل المعماري فقط. بينما نسعى لتقديم أدوات ذكاء اصطناعي عالية الجودة، فإننا لا نقدم أي ضمانات أو تعهدات بشأن دقة أو اكتمال أو موثوقية المخرجات.'
              : 'The information and tools provided by Anarchy AI are for informational and architectural workflow assistance purposes only. While we strive to provide high-quality AI tools, we make no warranties or representations about the accuracy, completeness, or reliability of outputs.'
            }
          </p>
          <p className="text-gray-400 leading-relaxed">
            {lang === 'ar'
              ? 'استخدامك للبرنامج والخدمات المقدمة يكون على مسؤوليتك الخاصة. Anarchy AI ليست مسؤولة عن أي خسائر أو أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية تنشأ عن استخدام أو عدم القدرة على استخدام خدماتنا.'
              : 'Your use of the software and services provided is at your own risk. Anarchy AI is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of or inability to use our services.'
            }
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`glass-card rounded-2xl p-8 mb-6 ${lang === 'ar' ? 'font-arabic text-right' : ''}`}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            {lang === 'ar' ? 'إخلاء مسؤولية المحتوى المولد بالذكاء الاصطناعي' : 'AI-Generated Content Disclaimer'}
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            {lang === 'ar'
              ? 'الصور والتصاميم المولدة بواسطة الذكاء الاصطناعي من خلال Anarchy AI هي نتاج خوارزميات تعلم الآلة. هذه المخرجات:'
              : 'Images and designs generated through AI by Anarchy AI are the product of machine learning algorithms. These outputs:'
            }
          </p>
          <ul className={`space-y-2 text-gray-400 mb-4 ${lang === 'ar' ? 'pr-4' : 'pl-4'}`}>
            {(lang === 'ar' ? [
              'قد لا تكون دقيقة أو مناسبة لجميع الأغراض المعمارية',
              'يجب مراجعتها والتحقق منها من قبل محترفين قبل الاستخدام في مشاريع حقيقية',
              'قد تحتوي على أخطاء أو تشوهات بصرية أو عيوب في التصميم',
              'لا ينبغي الاعتماد عليها كبديل للحكم المهني أو الخبرة الهندسية'
            ] : [
              'May not be accurate or suitable for all architectural purposes',
              'Should be reviewed and verified by professionals before use in real-world projects',
              'May contain errors, visual artifacts, or design flaws',
              'Should not be relied upon as a substitute for professional judgment or engineering expertise'
            ]).map((item) => (
              <li key={item.slice(0, 40)} className="flex items-start gap-2">
                <span className="text-anarchy-red mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass-card rounded-2xl p-8 mb-6 ${lang === 'ar' ? 'font-arabic text-right' : ''}`}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            {lang === 'ar' ? 'إخلاء مسؤولية قانونية' : 'Legal Disclaimer'}
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            {lang === 'ar'
              ? 'Anarchy AI هي أداة مساعدة للتصميم وليست بديلاً عن المعماريين المرخصين أو المهندسين أو المهنيين الآخرين. المستخدمين مسؤولون عن:'
              : 'Anarchy AI is a design assistance tool and not a substitute for licensed architects, engineers, or other professionals. Users are responsible for:'
            }
          </p>
          <ul className={`space-y-2 text-gray-400 mb-4 ${lang === 'ar' ? 'pr-4' : 'pl-4'}`}>
            {(lang === 'ar' ? [
              'ضمان أن جميع التصاميم تتوافق مع قوانين البناء واللوائح المحلية',
              'الحصول على الموافقات والتصاريح اللازمة من السلطات المختصة',
              'التأكد من سلامة الهياكل والتصاميم المعمارية',
              'احترام حقوق الملكية الفكرية وحقوق النشر للآخرين'
            ] : [
              'Ensuring all designs comply with local building codes and regulations',
              'Obtaining necessary approvals and permits from relevant authorities',
              'Verifying the structural integrity and safety of architectural designs',
              'Respecting the intellectual property rights and copyrights of others'
            ]).map((item) => (
              <li key={item.slice(0, 40)} className="flex items-start gap-2">
                <span className="text-anarchy-red mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`glass-card rounded-2xl p-8 ${lang === 'ar' ? 'font-arabic text-right' : ''}`}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {lang === 'ar'
              ? 'إذا كانت لديك أي أسئلة أو مخاوف بشأن إخلاء المسؤولية هذا، يرجى التواصل معنا على: '
              : 'If you have any questions or concerns about this disclaimer, please contact us at: '
            }
            <a href="mailto:anarchy.lat@gmail.com" className="text-anarchy-red hover:underline">
              anarchy.lat@gmail.com
            </a>
          </p>
        </motion.div>

        <div className={`mt-12 pt-8 border-t border-white/10 text-center ${lang === 'ar' ? 'font-arabic' : ''}`}>
          <p className="text-gray-500 text-sm">
            {lang === 'ar' 
              ? '© 2026 Anarchy AI. جميع الحقوق محفوظة.'
              : '© 2026 Anarchy AI. All rights reserved.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
