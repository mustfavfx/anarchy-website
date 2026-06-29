import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Eye, 
  Zap, 
  Shield, 
  Radio,
  ChevronRight,
  Activity,
  Lock,
  Unlock
} from 'lucide-react';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'system';
  message: string;
}

const systemLogs: LogEntry[] = [
  { timestamp: '00:00:01', type: 'system', message: '// ANARCHY_AI_PROTOCOL_INITIATED' },
  { timestamp: '00:00:02', type: 'info', message: '// SUBJECT_PROFILE: ARCHITECT_AI' },
  { timestamp: '00:00:03', type: 'success', message: '// MULTI_ENGINE_SUPPORT: ONLINE' },
  { timestamp: '00:00:04', type: 'info', message: '// NODE_CANVAS_SYSTEM: ACTIVE' },
  { timestamp: '00:00:05', type: 'warning', message: '// RENDER_QUEUE: OPTIMIZED' },
  { timestamp: '00:00:06', type: 'success', message: '// ALL_SYSTEMS_OPERATIONAL' },
];

const capabilities = [
  { id: 'AI_CORE', label: 'AI Core Processing', status: 'ONLINE', level: 98, icon: Cpu },
  { id: 'BATCH_SYS', label: 'Batch Render System', status: 'ACTIVE', level: 94, icon: Zap },
  { id: 'NODE_WF', label: 'Node Workflow Engine', status: 'RUNNING', level: 100, icon: Terminal },
  { id: 'UPSCALE', label: '16K Upscaling Module', status: 'READY', level: 92, icon: Eye },
  { id: 'SECURITY', label: 'Security Protocol', status: 'LOCKED', level: 100, icon: Shield },
  { id: 'NETWORK', label: 'Multi-Engine Network', status: 'CONNECTED', level: 96, icon: Radio },
];

export function SubjectProfile() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);
  const [matrixRain, setMatrixRain] = useState<{char: string, x: number, y: number, speed: number}[]>([]);

  // Typewriter effect for logs
  useEffect(() => {
    if (currentLogIndex < systemLogs.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, systemLogs[currentLogIndex]]);
        setCurrentLogIndex(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowProfile(true), 800);
      return () => clearTimeout(timer);
    }
  }, [currentLogIndex]);

  // Matrix rain effect
  useEffect(() => {
    const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF';
    const rain = Array.from({ length: 20 }, (_) => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 1,
    }));
    setMatrixRain(rain);

    const interval = setInterval(() => {
      setMatrixRain(prev => prev.map(drop => ({
        ...drop,
        y: drop.y > 100 ? -5 : drop.y + drop.speed,
        char: Math.random() > 0.95 ? chars[Math.floor(Math.random() * chars.length)] : drop.char,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE':
      case 'ACTIVE':
      case 'RUNNING':
      case 'READY':
      case 'CONNECTED':
        return 'text-green-400';
      case 'LOCKED':
        return 'text-anarchy-red';
      default:
        return 'text-yellow-400';
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {matrixRain.map((drop, i) => (
          <motion.div
            key={i}
            className="absolute text-anarchy-red/40 font-mono text-sm"
            style={{
              left: `${drop.x}%`,
              top: `${drop.y}%`,
            }}
          >
            {drop.char}
          </motion.div>
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-anarchy-red/30" />
      <div className="absolute top-8 right-8 w-32 h-32 border-r-2 border-t-2 border-anarchy-red/30" />
      <div className="absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-anarchy-red/30" />
      <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-anarchy-red/30" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-anarchy-red animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-xs font-mono text-gray-500 tracking-wider">
              ANARCHY_AI_SUBJECT_PROFILE.exe
            </span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
            <span className="text-white">ANARCHY</span>
            <span className="text-anarchy-red">_AI</span>
          </h2>
          <p className="text-gray-400 font-mono mt-2 text-sm tracking-widest">
            // SUBJECT_PROFILE: NODE-BASED RENDER WORKFLOW PLATFORM
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: System Logs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 font-mono"
          >
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
              <Terminal size={16} className="text-anarchy-red" />
              <span className="text-sm font-bold text-gray-300">SYSTEM_INIT_LOGS</span>
            </div>
            
            <div className="space-y-2 h-64 overflow-hidden">
              <AnimatePresence>
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3 text-xs"
                  >
                    <span className="text-gray-600">[{log.timestamp}]</span>
                    <span className={`${
                      log.type === 'system' ? 'text-blue-400' :
                      log.type === 'success' ? 'text-green-400' :
                      log.type === 'warning' ? 'text-yellow-400' :
                      'text-gray-300'
                    }`}>
                      {log.message}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {currentLogIndex < systemLogs.length && (
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-anarchy-red text-xs"
                >
                  _
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: showProfile ? 1 : 0, x: showProfile ? 0 : 30 }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-anarchy-red" />
                <span className="text-sm font-bold text-gray-300">SYSTEM_CAPABILITIES</span>
              </div>
              <span className="text-xs text-green-400 font-mono">● ALL_SYSTEMS_OPERATIONAL</span>
            </div>

            <div className="space-y-3">
              {capabilities.map((cap, index) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredCapability(cap.id)}
                    onMouseLeave={() => setHoveredCapability(null)}
                    className="group relative"
                  >
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-anarchy-red/30">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-anarchy-red/20 to-transparent ${hoveredCapability === cap.id ? 'scale-110' : ''} transition-transform`}>
                        <Icon size={18} className="text-anarchy-red" />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-mono text-gray-300">{cap.id}</span>
                          <span className={`text-xs font-mono ${getStatusColor(cap.status)}`}>
                            {cap.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">{cap.label}</div>
                        
                        {/* Progress Bar */}
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cap.level}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="h-full bg-gradient-to-r from-anarchy-red to-orange-500"
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-[10px] text-gray-600">EFFICIENCY</span>
                          <span className="text-[10px] text-anarchy-red font-mono">{cap.level}%</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight 
                        size={16} 
                        className={`text-gray-600 transition-all ${hoveredCapability === cap.id ? 'translate-x-1 text-anarchy-red' : ''}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Terminal Commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showProfile ? 1 : 0, y: showProfile ? 0 : 20 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <button className="flex items-center gap-2 px-6 py-3 bg-anarchy-red/10 border border-anarchy-red/30 rounded-lg font-mono text-sm text-anarchy-red hover:bg-anarchy-red/20 transition-all group">
            <Terminal size={16} />
            <span>INITIATE_DOWNLOAD</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </button>

          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-mono text-sm text-gray-400 hover:text-white hover:border-white/30 transition-all">
            <Unlock size={16} />
            <span>ACCESS_DOCS</span>
          </button>

          <div className="flex items-center gap-2 px-6 py-3 bg-black/40 border border-white/10 rounded-lg font-mono text-xs text-gray-500">
            <Lock size={14} />
            <span>ENCRYPTION: AES-256</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
