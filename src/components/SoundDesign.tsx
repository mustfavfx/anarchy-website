import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

// Audio context for generating sounds
class SoundEngine {
  private audioContext: AudioContext | null = null;
  private isMuted = false;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    if (typeof window !== 'undefined') {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
        } else {
          console.warn('[SoundEngine] AudioContext is not supported in this browser.');
        }
      } catch (e) {
        console.warn('[SoundEngine] AudioContext failed to initialize:', e);
      }
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  private ensureAudioContext() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Sci-fi hover sound
  playHover() {
    if (this.isMuted || !this.audioContext) return;
    this.ensureAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.05);
  }

  // Click sound
  playClick() {
    if (this.isMuted || !this.audioContext) return;
    this.ensureAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Success/Achievement sound
  playSuccess() {
    if (this.isMuted || !this.audioContext) return;
    this.ensureAudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C major arpeggio
    
    notes.forEach((freq, i) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, this.audioContext!.currentTime + i * 0.08);

      gainNode.gain.setValueAtTime(0, this.audioContext!.currentTime + i * 0.08);
      gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext!.currentTime + i * 0.08 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + i * 0.08 + 0.3);

      oscillator.start(this.audioContext!.currentTime + i * 0.08);
      oscillator.stop(this.audioContext!.currentTime + i * 0.08 + 0.3);
    });
  }

  // Scroll tick sound
  playScrollTick() {
    if (this.isMuted || !this.audioContext) return;
    this.ensureAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.03, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.02);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.02);
  }

  // Terminal type sound
  playTypeSound() {
    if (this.isMuted || !this.audioContext) return;
    this.ensureAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    filter.type = 'lowpass';
    filter.frequency.value = 2000;

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.03);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.03);
  }

  // Glitch/scan sound
  playGlitch() {
    if (this.isMuted || !this.audioContext) return;
    this.ensureAudioContext();

    const bufferSize = this.audioContext.sampleRate * 0.1;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    noise.start(this.audioContext.currentTime);
  }
}

const soundEngine = new SoundEngine();

export function SoundDesign() {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const lastScrollY = useRef(0);

  // Initialize on first user interaction
  const initializeAudio = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsMuted(false);
      soundEngine.setMuted(false);
    }
  }, [hasInteracted]);

  useEffect(() => {
    // Add click listeners for initialization
    const handleClick = () => initializeAudio();
    const handleKeyDown = () => initializeAudio();

    document.addEventListener('click', handleClick, { once: true });
    document.addEventListener('keydown', handleKeyDown, { once: true });

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [initializeAudio]);

  useEffect(() => {
    if (isMuted) return;

    // Hover sounds
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.tagName === 'A' ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        soundEngine.playHover();
      }
    };

    // Click sounds
    const handleClick = () => {
      soundEngine.playClick();
    };

    // Scroll sounds
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      
      if (delta > 50) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          soundEngine.playScrollTick();
        }, 50);
      }
      
      lastScrollY.current = currentScrollY;
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [isMuted]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundEngine.setMuted(newMuted);
    
    if (!newMuted && !hasInteracted) {
      setHasInteracted(true);
    }
  };

  // Expose sound engine for achievements
  useEffect(() => {
    (window as any).playAchievementSound = () => soundEngine.playSuccess();
    (window as any).playGlitchSound = () => soundEngine.playGlitch();
    (window as any).playTypeSound = () => soundEngine.playTypeSound();
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg hover:border-anarchy-red/30 transition-colors"
      onClick={toggleMute}
    >
      <div className="flex items-center gap-2">
        {isMuted ? (
          <>
            <VolumeX size={18} className="text-gray-500" />
            <span className="text-xs font-mono text-gray-500">SOUND_OFF</span>
          </>
        ) : (
          <>
            <Volume2 size={18} className="text-anarchy-red" />
            <span className="text-xs font-mono text-anarchy-red">SOUND_ON</span>
          </>
        )}
      </div>
      
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-8 right-0 text-[10px] text-gray-500 font-mono whitespace-nowrap"
        >
          Click to enable sound
        </motion.div>
      )}
    </motion.button>
  );
}

export { soundEngine };
