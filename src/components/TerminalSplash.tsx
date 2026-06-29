import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Activity, Shield } from 'lucide-react';

const bootSequence = [
  { message: '// ANARCHY_AI_KERNEL v2.4.1', delay: 100, type: 'system' },
  { message: '// INITIALIZING_CORE_SYSTEMS...', delay: 200, type: 'info' },
  { message: '   [OK] Neural Network Engine', delay: 300, type: 'success' },
  { message: '   [OK] Multi-Engine Router', delay: 400, type: 'success' },
  { message: '   [OK] Node Canvas Interface', delay: 500, type: 'success' },
  { message: '   [OK] 16K Render Pipeline', delay: 600, type: 'success' },
  { message: '   [OK] Security Protocols', delay: 700, type: 'success' },
  { message: '// LOADING_ASSETS...', delay: 800, type: 'info' },
  { message: '   [OK] UI Components', delay: 900, type: 'success' },
  { message: '   [OK] Animation Systems', delay: 1000, type: 'success' },
  { message: '   [OK] 3D Shaders', delay: 1100, type: 'success' },
  { message: '// ESTABLISHING_CONNECTION...', delay: 1200, type: 'warning' },
  { message: '   [OK] Server Connected', delay: 1400, type: 'success' },
  { message: '   [OK] Latency: 12ms', delay: 1500, type: 'success' },
  { message: '// SYSTEM_READY', delay: 1700, type: 'system' },
  { message: '   Access granted. Welcome to Anarchy AI.', delay: 1900, type: 'success' },
];

export function TerminalSplash({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback: force complete after 4 seconds max
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (visible) {
        setVisible(false);
        setTimeout(onComplete, 300);
      }
    }, 4000);
    return () => clearTimeout(fallbackTimer);
  }, [visible, onComplete]);

  useEffect(() => {
    if (currentIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, bootSequence[currentIndex].message]);
        setProgress(((currentIndex + 1) / bootSequence.length) * 100);
        setCurrentIndex(prev => prev + 1);
      }, bootSequence[currentIndex].delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 500);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete]);

  if (!visible) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-anarchy-dark pointer-events-none"
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-anarchy-dark flex items-center justify-center"
      >
        <div className="w-full max-w-2xl mx-4">
          {/* Terminal Window */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden shadow-2xl shadow-anarchy-red/20"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-anarchy-red" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center gap-2 ml-4 text-xs font-mono text-gray-500">
                <Terminal size={14} />
                <span>boot_sequence.exe</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm min-h-[400px] relative">
              {/* ASCII Art Header */}
              <pre className="text-anarchy-red text-xs mb-4 opacity-80">
{`    _    ____  ____   ____    _    ____  _   _ _____ 
   / \  |  _ \|  _ \ / ___|  / \  / ___|| | | |_   _|
  / _ \ | |_) | |_) | |     / _ \ \___ \| |_| |  | |  
 / ___ \|  _ <|  _ <| |___ / ___ \ ___) |  _  |  | |  
/_/   \_\_| \_\_| \_\____/_/   \_\____/|_| |_|  |_|  `}
              </pre>

              {/* Logs */}
              <div className="space-y-1 h-64 overflow-hidden">
                {logs.map((log, index) => {
                  const type = bootSequence[index]?.type || 'info';
                  const colorClass = {
                    system: 'text-anarchy-red',
                    info: 'text-blue-400',
                    success: 'text-green-400',
                    warning: 'text-yellow-400',
                  }[type];

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`${colorClass} text-xs md:text-sm`}
                    >
                      {log}
                    </motion.div>
                  );
                })}
                
                {currentIndex < bootSequence.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-anarchy-red"
                  >
                    _
                  </motion.span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2 text-xs font-mono text-gray-500">
                  <span>SYSTEM_INITIALIZATION</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-anarchy-red to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* System Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-500">
                  <Cpu size={14} className="text-anarchy-red" />
                  <span>CPU: 12%</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Activity size={14} className="text-green-400" />
                  <span>MEM: 847MB</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Shield size={14} className="text-blue-400" />
                  <span>SEC: LOCKED</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skip Option */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(onComplete, 500);
              }}
              className="text-xs font-mono text-gray-500 hover:text-white transition-colors"
            >
              [ Press any key to skip ]
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
