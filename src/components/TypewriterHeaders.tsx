import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorChar?: string;
}

export function TypewriterText({
  text,
  className = '',
  delay = 0,
  speed = 50,
  onComplete,
  showCursor = true,
  cursorChar = '_'
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayedText(text.slice(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed, onComplete]);

  // Blink cursor after typing is complete
  useEffect(() => {
    if (isComplete && showCursor) {
      const blinkInterval = setInterval(() => {
        setShowCursorState(prev => !prev);
      }, 500);
      return () => clearInterval(blinkInterval);
    }
  }, [isComplete, showCursor]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: showCursorState ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className="text-anarchy-red"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
}

// Scramble text effect like in the movies
interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ScrambleText({
  text,
  className = '',
  delay = 0,
  duration = 1500
}: ScrambleTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const revealedLength = Math.floor(progress * text.length);
        
        let result = text.slice(0, revealedLength);
        
        for (let i = revealedLength; i < text.length; i++) {
          if (Math.random() > 0.3) {
            result += chars[Math.floor(Math.random() * chars.length)];
          } else {
            result += text[i];
          }
        }
        
        setDisplayedText(result);
        
        if (progress >= 1) {
          clearInterval(interval);
          setDisplayedText(text);
        }
      }, 50);

      const startTime = Date.now();
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, duration]);

  return <span className={className}>{displayedText}</span>;
}

// Glitch typewriter effect
interface GlitchTypewriterProps {
  text: string;
  className?: string;
  glitchProbability?: number;
}

export function GlitchTypewriter({
  text,
  className = '',
  glitchProbability = 0.1
}: GlitchTypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        const shouldGlitch = Math.random() < glitchProbability;
        
        if (shouldGlitch) {
          setGlitchIndex(indexRef.current);
          setTimeout(() => setGlitchIndex(null), 100);
        }
        
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [text, glitchProbability]);

  return (
    <span className={className}>
      {displayedText.split('').map((char, i) => (
        <span
          key={i}
          className={glitchIndex === i ? 'text-anarchy-red inline-block transform translate-x-0.5' : ''}
        >
          {char}
        </span>
      ))}
      <span className="animate-pulse text-anarchy-red">_</span>
    </span>
  );
}

// Multi-line typewriter
interface MultiLineTypewriterProps {
  lines: string[];
  className?: string;
  lineDelay?: number;
  onComplete?: () => void;
}

export function MultiLineTypewriter({
  lines,
  className = '',
  lineDelay = 500,
  onComplete
}: MultiLineTypewriterProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const handleLineComplete = () => {
    if (currentLine < lines.length - 1) {
      setCompletedLines(prev => [...prev, lines[currentLine]]);
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, lineDelay);
    } else {
      setCompletedLines(prev => [...prev, lines[currentLine]]);
      onComplete?.();
    }
  };

  return (
    <div className={className}>
      {completedLines.map((line, i) => (
        <div key={i} className="font-mono text-anarchy-red/80">
          {`> ${line}`}
        </div>
      ))}
      {currentLine < lines.length && (
        <div className="font-mono text-anarchy-red">
          <TypewriterText
            text={`> ${lines[currentLine]}`}
            speed={30}
            onComplete={handleLineComplete}
            showCursor={currentLine === lines.length - 1}
          />
        </div>
      )}
    </div>
  );
}
