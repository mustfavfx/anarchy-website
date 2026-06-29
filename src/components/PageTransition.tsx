import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  readonly children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 30, 
        scale: 0.95,
        filter: 'blur(10px)'
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: 'blur(0px)'
      }}
      exit={{ 
        opacity: 0, 
        y: -30, 
        scale: 0.95,
        filter: 'blur(10px)'
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
}
