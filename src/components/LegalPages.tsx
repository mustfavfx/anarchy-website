import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, FileText, AlertTriangle, ChevronRight } from 'lucide-react';

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
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const sections = [
    {
      title: 'Introduction',
      titleAr: 'مقدمة',
      icon: Shield,
      content: [
        'Anarchy AI ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our desktop application and website (collectively, the "Services").',
        'By using Anarchy AI, you agree to the collection and use of information in accordance with this policy. We prioritize your privacy and implement enterprise-grade security measures to protect your data.'
      ],
      contentAr: [
        'تنصح Anarchy AI ("نحن" أو "لنا" أو "خدماتنا") بالالتزام بحماية خصوصيتك. تشرح سياسة الخصوصية هذه كيفية جمع واستخدام والإفصاح وحماية معلوماتك عند استخدام تطبيق سطح المكتب والموقع الإلكتروني (يشار إليها مجتمعة بـ "الخدمات").',
        'باستخدام Anarchy AI، فإنك توافق على جمع واستخدام المعلومات وفقًا لهذه السياسة. نحن نعطي الأولية لخصوصيتك وننفذ تدابير أمان على مستوى المؤسسات لحماية بياناتك.'
      ]
    },
    {
      title: 'Information We Collect',
      titleAr: 'المعلومات التي نجمعها',
      icon: FileText,
      content: [
        'Account Information: When you create an account, we collect your email address, name, and authentication credentials through Supabase Auth.',
        'Usage Data: We collect information about how you interact with the application, including workflow configurations, node preferences, and feature usage patterns to improve our Services.',
        'AI Generation Data: Images and prompts you submit for AI processing are temporarily stored for processing purposes. We do not permanently store your architectural designs or creative content unless you explicitly save them to your account.',
        'Payment Information: Credit purchases are processed through secure third-party payment gateways (Zain Cash, Stripe). We do not store your payment card details on our servers.'
      ],
      contentAr: [
        'معلومات الحساب: عند إنشاء حساب، نجمع عنوان بريدك الإلكتروني واسمك وبيانات المصادقة من خلال Supabase Auth.',
        'بيانات الاستخدام: نجمع معلومات حول كيفية تفاعلك مع التطبيق، بما في ذلك تكوينات سير العمل وتفضيلات العقد وأنماط استخدام الميزات لتحسين خدماتنا.',
        'بيانات توليد الذكاء الاصطناعي: يتم تخزين الصور والمطالبات التي ترسلها للمعالجة بواسطة الذكاء الاصطناعي مؤقتًا لأغراض المعالجة. نحن لا نخزن تصاميمك المعمارية أو المحتوى الإبداعي بشكل دائم ما لم تقم بحفظها صراحةً في حسابك.',
        'معلومات الدفع: تتم معالجة مشتريات الائتمان من خلال بوابات دفع آمنة تابعة لجهات خارجية (Zain Cash، Stripe). نحن لا نخزن تفاصيل بطاقة الدفع الخاصة بك على خوادمنا.'
      ]
    },
    {
      title: 'How We Use Your Information',
      titleAr: 'كيف نستخدم معلوماتك',
      icon: ChevronRight,
      content: [
        'Service Provision: To provide, maintain, and improve Anarchy AI services, including AI-powered image generation, workflow automation, and user account management.',
        'AI Model Improvement: Anonymized and aggregated data may be used to improve our AI models. Personal identifiers are removed before any model training.',
        'Security and Fraud Prevention: To detect and prevent fraudulent transactions, unauthorized access, and ensure the security of our platform.',
        'Communication: To send important updates, security alerts, and respond to your support requests. You can opt-out of non-essential communications.'
      ],
      contentAr: [
        'تقديم الخدمة: لتوفير وصيانة وتحسين خدمات Anarchy AI، بما في ذلك توليد الصور بالذكاء الاصطناعي وأتمتة سير العمل وإدارة حسابات المستخدمين.',
        'تحسين نموذج الذكاء الاصطناعي: يمكن استخدام البيانات المجهولة والمجمعة لتحسين نماذج الذكاء الاصطناعي لدينا. يتم إزالة المعرفات الشخصية قبل أي تدريب للنماذج.',
        'الأمن والوقاية من الاحتيال: للكشف عن المعاملات الاحتيالية ومنع الوصول غير المصرح به وضمان أمان منصتنا.',
        'التواصل: لإرسال التحديثات المهمة وتنبيهات الأمان والرد على طلبات الدعم الخاصة بك. يمكنك إلغاء الاشتراك في الاتصالات غير الضرورية.'
      ]
    },
    {
      title: 'Data Storage and Security',
      titleAr: 'تخزين البيانات والأمان',
      icon: Shield,
      content: [
        'Encryption: All data transmitted between your device and our servers is encrypted using TLS 1.3. Sensitive data at rest is encrypted using AES-256.',
        'Local Processing: Whenever possible, AI processing is performed locally on your device to minimize data transmission. Cloud processing is only used when you explicitly choose cloud-based AI models.',
        'Third-Party Services: We use Supabase for authentication and database services, and Replicate API for AI model inference. These services are GDPR compliant and maintain strict security standards.',
        'Data Retention: Account information is retained as long as your account is active. AI generation logs are retained for 30 days for debugging purposes, then automatically deleted.'
      ],
      contentAr: [
        'التشفير: يتم تشفير جميع البيانات المنقولة بين جهازك وخوادمنا باستخدام TLS 1.3. يتم تشفير البيانات الحساسة في حالة الراحة باستخدام AES-256.',
        'المعالجة المحلية: كلما كان ذلك ممكنًا، يتم إجراء معالجة الذكاء الاصطناعي محليًا على جهازك لتقليل نقل البيانات. تُستخدم المعالجة السحابية فقط عندما تختار صراحةً نماذج الذكاء الاصطناعي المستندة إلى السحابة.',
        'خدمات الطرف الثالث: نستخدم Supabase للمصادقة وخدمات قاعدة البيانات، و Replicate API لاستدلال نماذج الذكاء الاصطناعي. هذه الخدمات متوافقة مع GDPR وتحافظ على معايير أمان صارمة.',
        'الاحتفاظ بالبيانات: يتم الاحتفاظ بمعلومات الحساب طالما أن حسابك نشط. يتم الاحتفاظ بسجلات توليد الذكاء الاصطناعي لمدة 30 يومًا لأغراض تصحيح الأخطاء، ثم يتم حذفها تلقائيًا.'
      ]
    },
    {
      title: 'Your Rights',
      titleAr: 'حقوقك',
      icon: FileText,
      content: [
        'Access and Portability: You can request a copy of all personal data we hold about you in a machine-readable format.',
        'Correction: You can update or correct your account information at any time through the Account Settings page.',
        'Deletion: You can delete your account and all associated data. Upon deletion, your data will be permanently removed from our active servers within 30 days.',
        'Opt-Out: You can opt-out of data collection for AI improvement purposes while still using the service.'
      ],
      contentAr: [
        'الوصول والتنقلية: يمكنك طلب نسخة من جميع البيانات الشخصية التي نحتفظ بها عنك بتنسيق يمكن قراءته آليًا.',
        'التصحيح: يمكنك تحديث أو تصحيح معلومات حسابك في أي وقت من خلال صفحة إعدادات الحساب.',
        'الحذف: يمكنك حذف حسابك وجميع البيانات المرتبطة به. عند الحذف، سيتم إزالة بياناتك بشكل دائم من خوادمنا النشطة خلال 30 يومًا.',
        'إلغاء الاشتراك: يمكنك إلغاء الاشتراك في جمع البيانات لأغراض تحسين الذكاء الاصطناعي مع الاستمرار في استخدام الخدمة.'
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

          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        <div className={`mb-6 p-4 rounded-xl bg-anarchy-red/10 border border-anarchy-red/20 ${lang === 'ar' ? 'font-arabic text-right' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <p className="text-gray-400 text-sm">
            {lang === 'ar' 
              ? 'نحن نأخذ خصوصيتك على محمل الجد. تواصل معنا على privacy@anarchyai.com لأي استفسارات.'
              : 'We take your privacy seriously. Contact us at privacy@anarchyai.com for any inquiries.'
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
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const sections = [
    {
      title: 'Acceptance of Terms',
      titleAr: 'قبول الشروط',
      icon: FileText,
      content: [
        'By accessing or using Anarchy AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.',
        'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the Services constitutes acceptance of the revised terms.'
      ],
      contentAr: [
        'باستخدام أو الوصول إلى Anarchy AI، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على هذه الشروط، فيرجى عدم استخدام خدماتنا.',
        'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستكون التغييرات سارية المفعول فور النشر. يشكل استمرارك في استخدام الخدمات قبولًا للشروط المنقحة.'
      ]
    },
    {
      title: 'Use License',
      titleAr: 'ترخيص الاستخدام',
      icon: ChevronRight,
      content: [
        'Subject to these Terms, Anarchy AI grants you a limited, non-exclusive, non-transferable, revocable license to download, install, and use the software for personal or commercial architectural projects.',
        'Restrictions: You may not reverse engineer, decompile, or disassemble the software. You may not rent, lease, lend, sell, redistribute, or sublicense the software. You may not use the software for any illegal or unauthorized purpose.'
      ],
      contentAr: [
        'يخضع لهذه الشروط، تمنحك Anarchy AI ترخيصًا محدودًا وغير حصري وغير قابل للتحويل وقابل للإلغاء لتنزيل البرنامج وتثبيته واستخدامه للمشاريع المعمارية الشخصية أو التجارية.',
        'القيود: لا يجوز لك إجراء هندسة عكسية أو تفكيك أو تفكيك البرنامج. لا يجوز لك تأجير أو استئجار أو إعارة أو بيع أو إعادة توزيع أو ترخيص البرنامج من الباطن. لا يجوز لك استخدام البرنامج لأي غرض غير قانوني أو غير مصرح به.'
      ]
    },
    {
      title: 'AI-Generated Content',
      titleAr: 'المحتوى المولد بالذكاء الاصطناعي',
      icon: FileText,
      content: [
        'Ownership: You retain all rights to images you create using Anarchy AI. We claim no ownership over your architectural designs, prompts, or outputs.',
        'Usage Rights: Generated images may be used for personal and commercial purposes, including client work, portfolio pieces, and published architectural projects.',
        'Content Guidelines: You agree not to generate content that violates applicable laws, infringes on intellectual property rights, or creates harmful, deceptive, or misleading imagery.',
        'Model Training: Your content is not used to train third-party AI models without your explicit consent. Anonymous, opt-in data may contribute to improving Anarchy AI\'s proprietary models.'
      ],
      contentAr: [
        'الملكية: أنت تحتفظ بجميع الحقوق في الصور التي تنشئها باستخدام Anarchy AI. نحن لا ندعي أي ملكية على تصاميمك المعمارية أو المطالبات أو المخرجات.',
        'حقوق الاستخدام: يمكن استخدام الصور المولدة للأغراض الشخصية والتجارية، بما في ذلك عمل العملاء وأعمال المحفظة والمشاريع المعمارية المنشورة.',
        'إرشادات المحتوى: أنت توافق على عدم توليد محتوى ينتهك القوانين المعمول بها أو ينتهك حقوق الملكية الفكرية أو ينشئ صورًا ضارة أو خادعة أو مضللة.',
        'تدريب النماذج: لا يتم استخدام محتواك لتدريب نماذج الذكاء الاصطناعي التابعة لجهات خارجية دون موافقتك الصريحة. قد تساهم البيانات المجهولة والمختارة في تحسين نماذج Anarchy AI الخاصة.'
      ]
    },
    {
      title: 'Credits and Payments',
      titleAr: 'الاعتمادات والمدفوعات',
      icon: ChevronRight,
      content: [
        'Credit System: Anarchy AI operates on a pay-as-you-go credit system. Credits are purchased in packages and consumed per AI generation based on the selected quality tier.',
        'Pricing: Credit packages and per-generation costs are displayed in the Pricing section. Prices are subject to change with 30 days notice.',
        'Refunds: Unused credits may be refunded within 14 days of purchase. Used credits are non-refundable. Technical failures resulting in no output will automatically refund credits.',
        'Payment Methods: We accept Zain Cash (Iraq), credit cards, and Stripe for international payments. All transactions are processed securely through PCI-compliant gateways.'
      ],
      contentAr: [
        'نظام الاعتمادات: تعمل Anarchy AI على نظام ائتمانات الدفع حسب الاستخدام. يتم شراء الاعتمادات في حزم واستهلاكها لكل توليد ذكاء اصطناعي بناءً على مستوى الجودة المحدد.',
        'التسعير: يتم عرض حزم الاعتمادات وتكاليف التوليد في قسم التسعير. تخضع الأسعار للتغيير مع إشعار 30 يومًا.',
        'المبالغ المستردة: يمكن استرداد الاعتمادات غير المستخدمة خلال 14 يومًا من الشراء. الاعتمادات المستخدمة غير قابلة للاسترداد. الإخفاقات التقنية التي تؤدي إلى عدم وجود مخرجات سوف تسترد الاعتمادات تلقائيًا.',
        'طرق الدفع: نقبل Zain Cash (العراق) وبطاقات الائتمان و Stripe للمدفوعات الدولية. تتم معالجة جميع المعاملات بأمان من خلال بوابات متوافقة مع PCI.'
      ]
    },
    {
      title: 'Limitation of Liability',
      titleAr: 'حدود المسؤولية',
      icon: AlertTriangle,
      content: [
        'Service Availability: Anarchy AI strives for 99.9% uptime but does not guarantee uninterrupted service. Scheduled maintenance and unforeseen technical issues may cause temporary interruptions.',
        'Data Loss: While we implement robust backup systems, we are not liable for loss of unsaved work, node configurations, or generated images that were not downloaded or saved to your account.',
        'Third-Party APIs: Anarchy AI integrates with third-party AI providers (Replicate, Segmind). We are not responsible for service interruptions, model degradation, or content policies of these providers.',
        'Maximum Liability: Our total liability shall not exceed the amount you paid for credits in the 12 months preceding the claim.'
      ],
      contentAr: [
        'توفر الخدمة: تسعى Anarchy AI لتحقيق 99.9% من وقت التشغيل ولكنها لا تضمن خدمة غير منقطعة. قد يسبب الصيانة المجدولة والمشكلات التقنية غير المتوقعة انقطاعات مؤقتة.',
        'فقدان البيانات: بينما ننفذ أنظمة نسخ احتياطي قوية، فإننا لسنا مسؤولين عن فقدان العمل غير المحفوظ أو تكوينات العقد أو الصور المولدة التي لم يتم تنزيلها أو حفظها في حسابك.',
        'واجهات برمجة التطبيقات التابعة لجهات خارجية: تتكامل Anarchy AI مع موفري ذكاء اصطناعي تابعين لجهات خارجية (Replicate، Segmind). نحن لسنا مسؤولين عن انقطاعات الخدمة أو تدهور النماذج أو سياسات المحتوى الخاصة بهؤلاء المزودين.',
        'الحد الأقصى للمسؤولية: لن تتجاوز إجمالي مسؤوليتنا المبلغ الذي دفعته مقابل الاعتمادات في الـ 12 شهرًا السابقة للمطالبة.'
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
                {lang === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
              </h1>
              <p className="text-gray-500 mt-1">
                {lang === 'ar' ? 'آخر تحديث: 7 مايو 2026' : 'Last updated: May 7, 2026'}
              </p>
            </div>
          </motion.div>

          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
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
  const [lang, setLang] = useState<'en' | 'ar'>('en');

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

          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
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
            <a href="mailto:legal@anarchyai.com" className="text-anarchy-red hover:underline">
              legal@anarchyai.com
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
