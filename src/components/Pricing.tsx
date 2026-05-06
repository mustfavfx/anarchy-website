import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, CreditCard, Wallet, Globe, Check, 
  Zap, Building2, Landmark, ArrowRight, Shield,
  Sparkles, Cpu, Layers
} from 'lucide-react';

interface CreditPackage {
  id: string;
  amount: number;
  credits: number;
  bonus: number;
  popular?: boolean;
}

const creditPackages: CreditPackage[] = [
  { id: 'starter', amount: 5, credits: 525, bonus: 0 },
  { id: 'basic', amount: 10, credits: 1050, bonus: 0 },
  { id: 'pro', amount: 20, credits: 2150, bonus: 50, popular: true },
  { id: 'business', amount: 50, credits: 5500, bonus: 200 },
  { id: 'enterprise', amount: 100, credits: 11500, bonus: 500 },
  { id: 'mega', amount: 1000, credits: 125000, bonus: 10000 },
];

const generationCosts = [
  { name: 'Standard (flux-schnell)', cost: 3, description: 'Fast generation' },
  { name: 'HD (flux-dev)', cost: 25, description: 'High quality' },
  { name: '4K (flux-1.1-pro)', cost: 40, description: 'Ultra HD' },
  { name: 'Premium (ideogram-v3)', cost: 90, description: 'Best quality' },
  { name: 'Video 480p', cost: 90, description: 'Per second' },
  { name: 'Video 720p', cost: 250, description: 'Per second' },
  { name: 'Upscale', cost: 5, description: 'Enhance resolution' },
];

const paymentMethods = [
  { 
    id: 'zaincash', 
    name: 'Zain Cash', 
    icon: Wallet, 
    color: 'from-yellow-500 to-yellow-600',
    description: 'Iraqi mobile wallet',
    available: true
  },
  { 
    id: 'card', 
    name: 'Credit Card', 
    icon: CreditCard, 
    color: 'from-blue-500 to-blue-600',
    description: 'Visa, Mastercard',
    available: true
  },
  { 
    id: 'stripe', 
    name: 'Stripe', 
    icon: Globe, 
    color: 'from-purple-500 to-purple-600',
    description: 'Global payments',
    available: true
  },
  { 
    id: 'bank', 
    name: 'Bank Transfer', 
    icon: Landmark, 
    color: 'from-green-500 to-green-600',
    description: 'Wire transfer',
    available: true
  },
];

export const Pricing = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('pro');
  const [selectedPayment, setSelectedPayment] = useState<string>('card');
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
            Flexible Pricing
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Pay As You Go
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No monthly subscriptions. Purchase credits and use them whenever you need.
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
              Credit Packages
            </button>
            <button
              onClick={() => setActiveTab('costs')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'costs' 
                  ? 'bg-anarchy-red text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Generation Costs
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
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">${pkg.amount}</div>
                    <div className="text-sm text-gray-400 mb-3">
                      {pkg.credits.toLocaleString()} Credits
                    </div>
                    {pkg.bonus > 0 && (
                      <div className="text-xs text-anarchy-red">
                        +{pkg.bonus} Bonus
                      </div>
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
                    <h3 className="text-2xl font-bold text-white">
                      {creditPackages.find(p => p.id === selectedPackage)?.credits.toLocaleString()} Credits
                    </h3>
                    <p className="text-gray-400">Package: {selectedPackage}</p>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <div className="text-3xl font-bold text-white">
                    ${creditPackages.find(p => p.id === selectedPackage)?.amount}
                  </div>
                  <p className="text-gray-400">One-time payment</p>
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

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Shield size={16} />
                  Secure SSL encryption
                </div>
                <button className="bg-gradient-to-r from-anarchy-red to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(225,29,72,0.3)] transition-all flex items-center gap-2">
                  Purchase Now
                  <ArrowRight size={18} />
                </button>
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
