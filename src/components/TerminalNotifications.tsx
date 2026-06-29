import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: number;
}

let notificationId = 0;

export const showTerminalNotification = (
  type: Notification['type'],
  title: string,
  message: string
) => {
  const event = new CustomEvent('terminal-notification', {
    detail: { type, title, message, id: ++notificationId }
  });
  window.dispatchEvent(event);
};

export function TerminalNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handleNotification = (e: CustomEvent<Notification>) => {
      const notification = {
        ...e.detail,
        timestamp: Date.now(),
      };
      
      setNotifications(prev => [...prev, notification]);
      
      // Auto remove after 4 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 4000);
    };

    window.addEventListener('terminal-notification', handleNotification as EventListener);
    return () => window.removeEventListener('terminal-notification', handleNotification as EventListener);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return AlertCircle;
      default: return Info;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-500/30 bg-green-500/10 text-green-400';
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400';
      case 'error': return 'border-red-500/30 bg-red-500/10 text-red-400';
      default: return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
    }
  };

  return (
    <div className="fixed top-24 left-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          const colors = getColors(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              className={`pointer-events-auto max-w-sm rounded-lg border ${colors} backdrop-blur-xl shadow-lg`}
            >
              <div className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-black/40 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Terminal size={10} className="opacity-50" />
                      <span className="text-[10px] uppercase tracking-wider opacity-70">
                        {notification.type}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold truncate">{notification.title}</h4>
                    <p className="text-xs opacity-80">{notification.message}</p>
                  </div>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
