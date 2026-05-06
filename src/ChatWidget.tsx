import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage } from './services/chatService';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hi! I can help you with questions about Anarchy AI software. Ask me about features, pricing, or how to use the software.', isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim()) {
      setMessages(prev => [...prev, { text: message, isUser: true }]);
      setMessage('');
      setIsLoading(true);

      try {
        const chatMessages: { role: 'user' | 'assistant' | 'system'; content: string }[] = [
          { role: 'system', content: 'You are Anarchy AI assistant' },
          ...messages.map(m => ({ role: (m.isUser ? ('user' as const) : ('assistant' as const)), content: m.text })),
          { role: 'user', content: message }
        ];
        const response = await sendChatMessage(chatMessages);
        
        setMessages(prev => [...prev, { text: response, isUser: false }]);
      } catch (error) {
        setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', isUser: false }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-anarchy-red text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 bg-anarchy-gray border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-anarchy-red p-4">
              <h3 className="text-white font-semibold">Anarchy AI Assistant</h3>
              <p className="text-white/80 text-sm">Ask me about the software</p>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isUser
                        ? 'bg-anarchy-red text-white'
                        : 'bg-anarchy-dark text-gray-300 border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-anarchy-dark text-gray-300 border border-white/10 rounded-lg p-3">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Anarchy AI..."
                  className="flex-1 bg-anarchy-dark border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-anarchy-red"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !message.trim()}
                  className="bg-anarchy-red text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
