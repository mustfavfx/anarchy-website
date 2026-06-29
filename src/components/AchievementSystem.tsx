import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MousePointer, 
  Eye, 
  Download, 
  Star, 
  Zap, 
  Globe,
  Terminal,
  Award,
  Lock,
  Unlock,
  X
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  unlockedAt?: Date;
  secret?: boolean;
}

const initialAchievements: Achievement[] = [
  { id: 'FIRST_CLICK', title: 'Initiate Sequence', description: 'Made your first interaction', icon: MousePointer, unlocked: false },
  { id: 'EXPLORER', title: 'System Explorer', description: 'Viewed 3 different sections', icon: Eye, unlocked: false },
  { id: 'DOWNLOADER', title: 'Access Granted', description: 'Clicked download button', icon: Download, unlocked: false },
  { id: 'SCROLLER', title: 'Deep Dive', description: 'Scrolled through entire page', icon: Star, unlocked: false },
  { id: 'POWER_USER', title: 'Power User', description: 'Spent 60 seconds on the site', icon: Zap, unlocked: false },
  { id: 'GLOBE_TROTTER', title: 'Global Access', description: 'Visited from unique location', icon: Globe, unlocked: false, secret: true },
  { id: 'TERMINAL_MASTER', title: 'Terminal Master', description: 'Read the Subject Profile', icon: Terminal, unlocked: false, secret: true },
  { id: 'ARCHITECT', title: 'True Architect', description: 'Viewed all features', icon: Award, unlocked: false, secret: true },
];

export function AchievementSystem() {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [notification, setNotification] = useState<Achievement | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const sectionsViewed = useRef<Set<string>>(new Set());

  // Unlock achievement helper
  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (!achievement || achievement.unlocked) return prev;

      const updated = prev.map(a => 
        a.id === id ? { ...a, unlocked: true, unlockedAt: new Date() } : a
      );

      setNotification(achievement);
      setTimeout(() => setNotification(null), 4000);

      return updated;
    });
  }, []);

  // Track interactions
  useEffect(() => {
    const handleClick = () => unlockAchievement('FIRST_CLICK');
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if ((window.scrollY / docHeight) > 0.9) {
        unlockAchievement('SCROLLER');
      }
    };

    document.addEventListener('click', handleClick, { once: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [unlockAchievement]);

  // Track sections
  useEffect(() => {
    const sections = ['hero', 'features', 'subjectprofile', 'missionreport', 'pricing'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const viewed = sectionsViewed.current;
            if (!viewed.has(entry.target.id)) {
              viewed.add(entry.target.id);
              if (viewed.size >= 3) unlockAchievement('EXPLORER');
              if (viewed.size >= 5) unlockAchievement('ARCHITECT');
              if (viewed.has('subjectprofile')) unlockAchievement('TERMINAL_MASTER');
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [unlockAchievement]);

  // Track time
  useEffect(() => {
    const timer = setTimeout(() => unlockAchievement('POWER_USER'), 60000);
    return () => clearTimeout(timer);
  }, [unlockAchievement]);

  // Listen for download button clicks
  useEffect(() => {
    const handleDownloadClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.textContent?.toLowerCase().includes('download') || 
          target.closest('[data-download]')) {
        unlockAchievement('DOWNLOADER');
      }
    };

    document.addEventListener('click', handleDownloadClick);
    return () => document.removeEventListener('click', handleDownloadClick);
  }, [unlockAchievement]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progress = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <>
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="fixed top-24 right-6 z-50"
          >
            <div className="bg-black/90 backdrop-blur-xl border border-anarchy-red/50 rounded-lg p-4 shadow-lg shadow-anarchy-red/20 max-w-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-anarchy-red/20 flex items-center justify-center">
                  <notification.icon size={20} className="text-anarchy-red" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-anarchy-red">ACHIEVEMENT_UNLOCKED</span>
                  </div>
                  <h4 className="text-white font-bold text-sm">{notification.title}</h4>
                  <p className="text-gray-400 text-xs">{notification.description}</p>
                </div>
                <button 
                  onClick={() => setNotification(null)}
                  className="text-gray-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Toggle Button */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-6 right-6 z-40 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-3 hover:border-anarchy-red/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <Award size={20} className="text-anarchy-red" />
          {unlockedCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-anarchy-red rounded-full text-[10px] flex items-center justify-center text-white font-bold">
              {unlockedCount}
            </span>
          )}
        </div>
      </motion.button>

      {/* Achievement Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-40 w-80"
          >
            <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Terminal size={16} className="text-anarchy-red" />
                    <span className="font-mono text-sm text-white">ACHIEVEMENT_LOG</span>
                  </div>
                  <button 
                    onClick={() => setShowPanel(false)}
                    className="text-gray-500 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">UNLOCK_PROGRESS</span>
                      <span className="text-anarchy-red font-mono">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-anarchy-red"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    {unlockedCount}/{achievements.length}
                  </span>
                </div>
              </div>

              {/* Achievement List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        achievement.unlocked 
                          ? 'bg-anarchy-red/5' 
                          : achievement.secret 
                            ? 'opacity-50' 
                            : 'bg-white/5 opacity-70'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        achievement.unlocked 
                          ? 'bg-anarchy-red/20' 
                          : 'bg-gray-800'
                      }`}>
                        {achievement.unlocked ? (
                          <Icon size={18} className="text-anarchy-red" />
                        ) : achievement.secret ? (
                          <Lock size={16} className="text-gray-600" />
                        ) : (
                          <Unlock size={16} className="text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-medium truncate ${
                            achievement.unlocked ? 'text-white' : 'text-gray-500'
                          }`}>
                            {achievement.unlocked ? achievement.title : achievement.secret ? '?????' : achievement.title}
                          </h4>
                          {achievement.secret && achievement.unlocked && (
                            <span className="text-[10px] text-anarchy-red font-mono">[SECRET]</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {achievement.unlocked ? achievement.description : 'LOCKED'}
                        </p>
                      </div>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <span className="text-[10px] text-gray-600 font-mono">
                          {achievement.unlockedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
