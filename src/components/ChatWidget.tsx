import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage } from '../services/chatService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isArabic?: boolean;
}

const detectArabic = (text: string): boolean => {
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicPattern.test(text);
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1',
      text: 'Hi! I can help you with questions about Anarchy AI software. Ask me about features, pricing, or how to use the software.\n\nمرحباً! يمكنني مساعدتك في الأسئلة حول برنامج Anarchy AI. اسألني عن الميزات أو الأسعار أو كيفية استخدام البرنامج.',
      isUser: false,
      isArabic: true
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (message.trim()) {
      const isArabicInput = detectArabic(message);
      const newMessage: Message = { 
        id: Date.now().toString(),
        text: message, 
        isUser: true,
        isArabic: isArabicInput 
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setIsLoading(true);

      try {
        const response = await sendChatMessage([
          { role: 'system', content: 'You are Anarchy AI assistant. You can respond in English or Arabic.' },
          ...messages.map(m => ({ 
            role: (m.isUser ? ('user' as const) : ('assistant' as const)), 
            content: m.text 
          })),
          { role: 'user', content: message }
        ]);
        
        const isArabicResponse = detectArabic(response);
        setMessages(prev => [...prev, { 
          id: (Date.now() + 1).toString(),
          text: response, 
          isUser: false,
          isArabic: isArabicResponse
        }]);
      } catch (error) {
        setMessages(prev => [...prev, { 
          id: (Date.now() + 1).toString(),
          text: 'Sorry, I encountered an error. Please try again.\n\nعذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
          isUser: false,
          isArabic: true
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const switchLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-anarchy-red to-red-600 text-white p-4 rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(225,29,72,0.4)] transition-all duration-300 animate-pulse-glow"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-2rem)] glass rounded-2xl shadow-2xl overflow-hidden border border-white/10"
            style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-anarchy-red to-red-600 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {language === 'en' ? 'Anarchy AI Assistant' : 'مساعد Anarchy AI'}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {language === 'en' ? 'Ask me about the software' : 'اسألني عن البرنامج'}
                  </p>
                </div>
                <button
                  onClick={switchLanguage}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/90"
                  title={language === 'en' ? 'Switch to Arabic' : 'التبديل للإنجليزية'}
                >
                  <Globe size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[360px] overflow-y-auto p-4 space-y-4" dir="auto">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed
                      ${msg.isUser
                        ? 'bg-gradient-to-r from-anarchy-red to-red-600 text-white rounded-br-md'
                        : 'glass-card text-gray-200 rounded-bl-md border border-white/10'
                      }
                      ${msg.isArabic ? 'font-arabic' : 'font-inter'}
                    `}
                    dir={msg.isArabic ? 'rtl' : 'ltr'}
                  >
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i} className={i > 0 ? 'block mt-2' : ''}>
                        {line}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass-card rounded-2xl rounded-bl-md p-3 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-anarchy-red" />
                    <span className="text-gray-400 text-sm">
                      {language === 'en' ? 'Thinking...' : 'جاري التفكير...'}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-anarchy-surface/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'en' ? 'Ask about Anarchy AI...' : 'اسأل عن Anarchy AI...'}
                  className="flex-1 bg-anarchy-dark border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-anarchy-red/50 transition-colors placeholder:text-gray-500"
                  disabled={isLoading}
                  dir="auto"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={isLoading || !message.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-anarchy-red to-red-600 text-white p-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
