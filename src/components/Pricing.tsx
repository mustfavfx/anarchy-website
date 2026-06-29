import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, CreditCard, Check, 
  Shield, Sparkles
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CreditPackage {
  id: string;
  amount: number;
  credits: number;
  bonus: number;
  popular?: boolean;
  isCustom?: boolean;
}

const creditPackages: CreditPackage[] = [
  { id: 'starter', amount: 10, credits: 100, bonus: 5, popular: false },    // 105 total
  { id: 'basic', amount: 20, credits: 200, bonus: 15, popular: true },       // 215 total  
  { id: 'pro', amount: 50, credits: 500, bonus: 50, popular: false },       // 550 total
  { id: 'business', amount: 100, credits: 1000, bonus: 150, popular: false }, // 1,150 total
  { id: 'mega', amount: 1000, credits: 10000, bonus: 2000, popular: false },  // 12,000 total
  { id: 'custom', amount: 0, credits: 0, bonus: 0, popular: false, isCustom: true },  // Custom amount ($5+)
];

const generationCosts = [
  { name: 'FLUX 2 Pro', cost: 1, description: 'High quality' },
  { name: 'Seedream 4.5', cost: 1, description: 'Standard quality' },
  { name: 'GPT Image 2 (low)', cost: 1, description: 'Standard resolution' },
  { name: 'GPT Image 2 (high)', cost: 2, description: 'High resolution' },
  { name: 'Nano Banana 2 (4K)', cost: 3, description: 'Ultra HD' },
  { name: 'Video 480p/sec', cost: 14, description: 'Per second' },
  { name: 'Video 720p/sec', cost: 38, description: 'Per second' },
  { name: 'Upscale', cost: 2, description: 'Enhance resolution' },
];

const paymentMethods = [
  { 
    id: 'stripe', 
    name: 'Stripe', 
    icon: CreditCard, 
    color: 'from-blue-500 to-blue-600',
    description: 'Visa, Mastercard, Apple Pay',
    available: true
  },
];

export const Pricing = () => {
  const { t } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<string>('pro');
  const [selectedPayment, setSelectedPayment] = useState<string>('stripe');
  const [activeTab, setActiveTab] = useState<'packages' | 'costs'>('packages');

  return (
    <section id="pricing" className="py-32 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-sm mb-6">
            <Sparkles size={16} />
            {t.pricing.badge}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'packages' 
                  ? 'bg-anarchy-red text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.pricing.creditPackages}
            </button>
            <button
              onClick={() => setActiveTab('costs')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'costs' 
                  ? 'bg-anarchy-red text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.pricing.generationCosts}
            </button>
          </div>
        </div>

        {/* Credit Packages */}
        {activeTab === 'packages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Packages Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {creditPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`
                    relative cursor-pointer rounded-2xl p-6 transition-all duration-300
                    ${selectedPackage === pkg.id 
                      ? 'bg-gradient-to-b from-anarchy-red/20 to-anarchy-gray border-2 border-anarchy-red' 
                      : 'glass-card border border-white/10 hover:border-anarchy-red/30'
                    }
                  `}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-anarchy-red text-white text-xs px-3 py-1 rounded-full">
                        {t.pricing.popular}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    {pkg.isCustom ? (
                      <>
                        <div className="text-xl font-bold text-white mb-1">{t.pricing.custom}</div>
                        <div className="text-sm text-gray-400 mb-3">
                          {t.pricing.anyAmount}
                        </div>
                        <div className="text-xs text-anarchy-red">
                          $5 {t.pricing.minimum}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-white mb-1">${pkg.amount}</div>
                        <div className="text-sm text-gray-400 mb-3">
                          {pkg.credits.toLocaleString()} {t.pricing.credits}
                        </div>
                        {pkg.bonus > 0 && (
                          <div className="text-xs text-anarchy-red">
                            +{pkg.bonus} {t.pricing.bonus}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {selectedPackage === pkg.id && (
                    <div className="absolute top-3 right-3">
                      <div className="w-5 h-5 rounded-full bg-anarchy-red flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Selected Package Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-anarchy-red to-red-600 flex items-center justify-center">
                    <Coins size={32} className="text-white" />
                  </div>
                  <div>
                    {creditPackages.find(p => p.id === selectedPackage)?.isCustom ? (
                      <>
                        <h3 className="text-2xl font-bold text-white">
                          Custom Amount
                        </h3>
                        <p className="text-gray-400">Enter your desired credits ($5+)</p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold text-white">
                          {creditPackages.find(p => p.id === selectedPackage)?.credits.toLocaleString()} Credits
                        </h3>
                        <p className="text-gray-400">Package: {selectedPackage}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-center md:text-right">
                  {creditPackages.find(p => p.id === selectedPackage)?.isCustom ? (
                    <>
                      <div className="text-2xl font-bold text-white">
                        $5+
                      </div>
                      <p className="text-gray-400">{t.pricing.minimum}</p>
                    </>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-white">
                        ${creditPackages.find(p => p.id === selectedPackage)?.amount}
                      </div>
                      <p className="text-gray-400">{t.pricing.oneTimePayment}</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield size={20} className="text-anarchy-red" />
                Payment Methods
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`
                      p-4 rounded-xl border transition-all duration-300 text-left
                      ${selectedPayment === method.id
                        ? 'bg-gradient-to-r ' + method.color + ' border-transparent text-white'
                        : 'glass-card border-white/10 hover:border-anarchy-red/30 text-gray-300'
                      }
                    `}
                  >
                    <method.icon size={24} className="mb-2" />
                    <div className="font-semibold text-sm">{method.name}</div>
                    <div className={`text-xs ${selectedPayment === method.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {method.description}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-gray-400 text-sm">
                <Shield size={16} />
                Secure SSL encryption
              </div>
            </div>
          </motion.div>
        )}

        {/* Generation Costs */}
        {activeTab === 'costs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generationCosts.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="glass-card rounded-xl p-4 flex items-center justify-between hover:border-anarchy-red/30 transition-colors"
                >
                  <div>
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                  <div className="text-anarchy-red font-bold">
                    {item.cost} <span className="text-sm text-gray-400">credits</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
