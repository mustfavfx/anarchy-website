import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Activity, Zap } from 'lucide-react';

export function LiveVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(1247);
  const [peakToday] = useState(3892);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increment or decrement slightly
      const change = Math.random() > 0.6 ? 1 : Math.random() > 0.8 ? -1 : 0;
      setVisitorCount(prev => Math.max(1000, prev + change));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-6 right-6 z-40 hidden lg:block"
    >
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Activity size={12} className="text-anarchy-red animate-pulse" />
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            Live Session Data
          </span>
        </div>

        {/* Current Visitors */}
        <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-blue-400" />
            <span className="text-xs text-gray-400 font-mono">ACTIVE</span>
          </div>
          <motion.span 
            key={visitorCount}
            initial={{ scale: 1.2, color: '#E63030' }}
            animate={{ scale: 1, color: '#ffffff' }}
            className="text-sm font-bold font-mono"
          >
            {visitorCount.toLocaleString()}
          </motion.span>
        </div>

        {/* Peak Today */}
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-yellow-400" />
            <span className="text-xs text-gray-500 font-mono">PEAK_24H</span>
          </div>
          <span className="text-xs text-gray-300 font-mono">
            {peakToday.toLocaleString()}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-green-400" />
            <span className="text-xs text-gray-500 font-mono">REGION</span>
          </div>
          <span className="text-xs text-anarchy-red font-mono">
            GLOBAL
          </span>
        </div>

        {/* Last Update */}
        <div className="mt-2 pt-2 border-t border-white/5 flex justify-between items-center">
          <span className="text-[9px] text-gray-600 font-mono">
            SYNC: {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
