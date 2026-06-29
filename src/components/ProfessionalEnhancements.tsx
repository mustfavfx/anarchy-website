// Professional Enhancement Components for Anarchy AI

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Eye, Command, Terminal, 
  ArrowUpRight, ScanLine, Crosshair, Sparkles,
  Activity as ActivityIcon
} from 'lucide-react';

// ============================================
// 1. ADVANCED CURSOR SYSTEM
// ============================================

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  targetType: 'default' | 'button' | 'link' | 'text' | 'image';
}

export function AdvancedCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0, y: 0, isHovering: false, isClicking: false, targetType: 'default'
  });
  const [trail, setTrail] = useState<{x: number, y: number, id: number}[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
      
      // Add to trail
      setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };

    const handleMouseDown = () => setCursor(prev => ({ ...prev, isClicking: true }));
    const handleMouseUp = () => setCursor(prev => ({ ...prev, isClicking: false }));
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect element type on hover
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let targetType: CursorState['targetType'] = 'default';
      
      if (target.tagName === 'BUTTON' || target.closest('button')) targetType = 'button';
      else if (target.tagName === 'A' || target.closest('a')) targetType = 'link';
      else if (target.tagName === 'IMG' || target.closest('img')) targetType = 'image';
      else if (target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'H1' || target.tagName === 'H2') targetType = 'text';
      
      setCursor(prev => ({ ...prev, targetType, isHovering: true }));
    };

    const handleElementLeave = () => {
      setCursor(prev => ({ ...prev, isHovering: false, targetType: 'default' }));
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover, { passive: true });
    document.addEventListener('mouseout', handleElementLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseout', handleElementLeave);
    };
  }, []);

  const getCursorIcon = () => {
    switch (cursor.targetType) {
      case 'button': return <Zap size={16} className="text-anarchy-red" />;
      case 'link': return <ArrowUpRight size={16} className="text-blue-400" />;
      case 'text': return <ScanLine size={16} className="text-green-400" />;
      case 'image': return <Eye size={16} className="text-purple-400" />;
      default: return <Crosshair size={16} className="text-white" />;
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-[9999] w-1 h-1 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            backgroundColor: `rgba(230, 48, 48, ${(index + 1) / trail.length * 0.5})`,
          }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      ))}
      
      {/* Main Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[10000] flex items-center justify-center"
        style={{
          left: cursor.x - 20,
          top: cursor.y - 20,
        }}
        animate={{
          scale: cursor.isClicking ? 0.8 : cursor.isHovering ? 1.5 : 1,
          rotate: cursor.isHovering ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
          cursor.isClicking ? 'border-anarchy-red bg-anarchy-red/20' : 
          cursor.isHovering ? 'border-white bg-white/10' : 'border-anarchy-red'
        }`}>
          {getCursorIcon()}
        </div>
      </motion.div>

      {/* Click Ripple */}
      <AnimatePresence>
        {cursor.isClicking && (
          <motion.div
            className="fixed pointer-events-none z-[9999] rounded-full border-2 border-anarchy-red"
            style={{
              left: cursor.x - 40,
              top: cursor.y - 40,
              width: 80,
              height: 80,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// 2. KEYBOARD SHORTCUTS OVERLAY
// ============================================

const shortcuts = [
  { key: 'H', action: 'Go Home', description: 'Navigate to hero section' },
  { key: 'F', action: 'Features', description: 'Jump to features' },
  { key: 'D', action: 'Download', description: 'Start download process' },
  { key: 'P', action: 'Pricing', description: 'View pricing plans' },
  { key: 'C', action: 'Contact', description: 'Open contact section' },
  { key: 'T', action: 'Terminal', description: 'Toggle terminal mode' },
  { key: 'M', action: 'Mute', description: 'Toggle sound effects' },
  { key: '?', action: 'Help', description: 'Show this shortcuts menu' },
  { key: 'ESC', action: 'Close', description: 'Close any overlay' },
];

export function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const [lastKey, setLastKey] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setLastKey(key);

      if (key === '?') {
        setShowHelp(prev => !prev);
      } else if (key === 'ESCAPE') {
        setShowHelp(false);
      } else if (key === 'H') {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      } else if (key === 'F') {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
      } else if (key === 'D') {
        document.querySelector('[data-download]')?.dispatchEvent(new Event('click'));
      } else if (key === 'P') {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      } else if (key === 'C') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Last Key Indicator */}
      <AnimatePresence>
        {lastKey && !showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-black/80 backdrop-blur-xl border border-anarchy-red/30 rounded-lg font-mono text-sm text-anarchy-red"
          >
            [KEY_PRESSED: {lastKey}]
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-anarchy-dark border border-white/20 rounded-lg p-8 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Command size={20} className="text-anarchy-red" />
                  <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
                </div>
                <button 
                  onClick={() => setShowHelp(false)}
                  className="text-gray-500 hover:text-white"
                >
                  [ESC]
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map(({ key, action, description }) => (
                  <div key={key} className="flex items-center gap-4 p-2 rounded hover:bg-white/5">
                    <kbd className="px-3 py-1 bg-anarchy-red/20 border border-anarchy-red/30 rounded text-anarchy-red font-mono text-sm min-w-[40px] text-center">
                      {key}
                    </kbd>
                    <div>
                      <div className="text-white font-medium">{action}</div>
                      <div className="text-gray-500 text-xs">{description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-gray-500 text-center font-mono">
                Press ? anytime to show this menu
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// 3. SYSTEM METRICS DASHBOARD
// ============================================

export function SystemMetrics() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memory: 0,
    loadTime: 0,
    renderTime: 0,
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const updateMetrics = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: frameCount,
          memory: (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0,
        }));
        frameCount = 0;
        lastTime = now;
      }

      rafId = requestAnimationFrame(updateMetrics);
    };

    rafId = requestAnimationFrame(updateMetrics);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-20 right-6 z-40 hidden xl:block"
    >
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-3 font-mono text-xs shadow-lg">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
          <ActivityIcon size={12} className="text-anarchy-red animate-pulse" />
          <span className="text-gray-500 uppercase tracking-wider">System Metrics</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500">FPS</span>
            <span className={`font-bold ${metrics.fps >= 55 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
              {metrics.fps}
            </span>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500">MEMORY</span>
            <span className="text-white font-bold">{metrics.memory.toFixed(1)} MB</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500">STATUS</span>
            <span className="flex items-center gap-1 text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              OPTIMAL
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// 4. EASTER EGG KONAMI CODE
// ============================================

export function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[currentIndex]) {
        currentIndex++;
        setKonamiProgress(currentIndex);
        
        if (currentIndex === konamiCode.length) {
          setShowEasterEgg(true);
          currentIndex = 0;
          setKonamiProgress(0);
          
          setTimeout(() => {
            setShowEasterEgg(false);
            setMatrixMode(true);
            setTimeout(() => setMatrixMode(false), 5000);
          }, 2000);
        }
      } else {
        currentIndex = 0;
        setKonamiProgress(0);
      }

      // Secret: Type "matrix" anywhere
      if (e.key === 'm' || e.key === 'M') {
        const recentKeys: string[] = [];
        const checkMatrix = (ev: KeyboardEvent) => {
          recentKeys.push(ev.key.toLowerCase());
          if (recentKeys.length > 6) recentKeys.shift();
          
          if (recentKeys.join('') === 'matrix') {
            setMatrixMode(true);
            setTimeout(() => setMatrixMode(false), 5000);
          }
        };
        document.addEventListener('keydown', checkMatrix, { once: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Konami Progress */}
      {konamiProgress > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300] pointer-events-none"
        >
          <div className="bg-black/90 border border-anarchy-red/50 rounded-lg p-4">
            <div className="text-anarchy-red font-mono text-sm mb-2">
              {'█'.repeat(konamiProgress)}{'░'.repeat(konamiCode.length - konamiProgress)}
            </div>
            <div className="text-gray-500 text-xs font-mono">KONAMI CODE PROGRESS</div>
          </div>
        </motion.div>
      )}

      {/* Easter Egg Reveal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles size={80} className="text-anarchy-red mx-auto mb-4" />
              </motion.div>
              <h1 className="text-4xl font-black text-white mb-2">CHEAT CODE ACTIVATED</h1>
              <p className="text-anarchy-red font-mono">Matrix Mode Enabled for 5 seconds</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Mode Overlay */}
      <AnimatePresence>
        {matrixMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] pointer-events-none"
            style={{
              background: 'rgba(0, 255, 0, 0.03)',
              mixBlendMode: 'screen',
            }}
          >
            <div className="absolute inset-0 font-mono text-green-500 text-xs overflow-hidden opacity-30">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${i * 5}%`,
                    top: -50,
                  }}
                  animate={{
                    y: [0, window.innerHeight + 100],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {'アイウエオカキクケコ0123456789'.split('').map((char, j) => (
                    <div key={j} className="opacity-50">{char}</div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// 5. TERMINAL COMMAND OVERLAY
// ============================================

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>(['Anarchy AI Terminal v2.4.1', 'Type "help" for available commands', '']);

  const commands = {
    help: () => 'Available commands: help, clear, download, features, pricing, about, version, matrix, exit',
    clear: () => { setOutput([]); return ''; },
    download: () => 'Redirecting to download page...',
    features: () => 'Opening features section...',
    pricing: () => 'Opening pricing section...',
    about: () => 'Anarchy AI - AI Render Workflow Platform for Architects',
    version: () => 'Anarchy AI v2.4.1 - Build 2024.05.29',
    matrix: () => 'Activating matrix mode...',
    exit: () => { setIsOpen(false); return 'Goodbye!'; },
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    const cmd = command.toLowerCase().trim();
    const response = commands[cmd as keyof typeof commands]?.() || `Command not found: ${command}`;
    
    if (response) {
      setOutput(prev => [...prev, `> ${command}`, response, '']);
    }
    
    setCommand('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-6 z-50 w-96"
        >
          <div className="bg-black/95 backdrop-blur-xl border border-anarchy-red/30 rounded-lg overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-anarchy-red/10 border-b border-anarchy-red/20">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-anarchy-red" />
                <span className="text-xs font-mono text-anarchy-red">Terminal</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white text-xs">
                [×]
              </button>
            </div>

            {/* Output */}
            <div className="h-48 overflow-y-auto p-4 font-mono text-xs space-y-1">
              {output.map((line, i) => (
                <div key={i} className={line.startsWith('>') ? 'text-anarchy-red' : 'text-gray-300'}>
                  {line}
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 p-3 border-t border-white/10">
              <span className="text-anarchy-red font-mono text-sm">{'>'}</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm"
                placeholder="Type command..."
                autoFocus
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
