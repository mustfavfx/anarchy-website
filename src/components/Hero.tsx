import { useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const engines = ['GPT Image 2', 'FLUX 2 Pro', 'Seedream 4.5', 'Grok Imagine', 'Nano Banana 2'];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; life: number;
  decay: number; color: string;
  erupting: boolean;
}

interface GlitchLine {
  x: number; y: number; w: number; h: number;
  life: number; decay: number; color: string;
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const glitchLinesRef = useRef<GlitchLine[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const titleWrapRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const createParticle = useCallback((x?: number, y?: number, erupting = false): Particle => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    if (erupting) {
      return {
        x: x ?? W / 2, y: y ?? H / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        size: Math.random() * 4 + 1,
        life: 1, decay: 0.02 + Math.random() * 0.02,
        color: Math.random() < 0.7 ? '#E63030' : `hsl(${Math.random() * 20},90%,65%)`,
        erupting: true,
      };
    }
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      life: Math.random(),
      decay: 0.002 + Math.random() * 0.003,
      color: Math.random() < 0.4 ? 'red' : 'white',
      erupting: false,
    };
  }, []);

  const createGlitchLine = useCallback((): GlitchLine => ({
    x: Math.random() * window.innerWidth * 0.3,
    y: Math.random() * window.innerHeight,
    w: Math.random() * window.innerWidth * 0.8 + 50,
    h: Math.random() * 2 + 0.5,
    life: 1,
    decay: 0.08 + Math.random() * 0.1,
    color: Math.random() < 0.6 ? '#E63030' : 'rgba(255,255,255,0.8)',
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    for (let i = 0; i < 180; i++) particlesRef.current.push(createParticle());

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, W, H);
      frameRef.current++;

      // Random glitch lines
      if (Math.random() < 0.04) glitchLinesRef.current.push(createGlitchLine());
      glitchLinesRef.current = glitchLinesRef.current.filter(l => l.life > 0);
      for (const l of glitchLinesRef.current) {
        l.life -= l.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(0, l.life * 0.4);
        ctx.fillStyle = l.color;
        ctx.fillRect(l.x, l.y, l.w, l.h);
        ctx.restore();
      }

      // Particles
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      for (const p of particlesRef.current) {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.erupting) { p.vx *= 0.93; p.vy *= 0.93; }
        ctx.save();
        const alpha = Math.max(0, p.life * (p.erupting ? 1 : 0.6));
        ctx.globalAlpha = alpha;
        if (p.erupting) {
          ctx.fillStyle = p.color;
        } else {
          ctx.fillStyle = p.color === 'red'
            ? `rgba(230,48,48,${alpha})`
            : `rgba(255,255,255,${alpha * 0.5})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      while (particlesRef.current.filter(p => !p.erupting).length < 180) {
        particlesRef.current.push(createParticle());
      }

      // Radial glow
      const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H * 0.6);
      const pulse = 0.5 + Math.sin(frameRef.current * 0.02) * 0.1;
      grd.addColorStop(0, `rgba(230,48,48,${0.04 * pulse})`);
      grd.addColorStop(0.5, `rgba(99,102,241,${0.02 * pulse})`);
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Scanlines
      if (frameRef.current % 3 === 0) {
        ctx.save();
        ctx.globalAlpha = 0.015;
        for (let y = 0; y < H; y += 4) {
          ctx.fillStyle = 'rgba(0,0,0,1)';
          ctx.fillRect(0, y, W, 1);
        }
        ctx.restore();
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [createParticle, createGlitchLine]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = (e.clientX - 6) + 'px';
        cursorRef.current.style.top = (e.clientY - 6) + 'px';
      }
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = (e.clientX - 20) + 'px';
          trailRef.current.style.top = (e.clientY - 20) + 'px';
        }
      }, 80);
      // Parallax
      const dx = (e.clientX - window.innerWidth / 2) / window.innerWidth * 12;
      const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight * 12;
      if (titleWrapRef.current) {
        titleWrapRef.current.style.transform = `translate(${dx}px,${dy}px)`;
      }
    };
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY, true));
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, [createParticle]);

  // Count-up animation
  useEffect(() => {
    const countUp = (id: string, target: number, suffix: string, delay: number) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        let current = 0;
        const step = target / 60;
        const iv = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(iv); }
          el.textContent = Math.round(current) + suffix;
        }, 800 / 60);
      }, delay);
    };
    countUp('stat-engines', 7, '+', 1400);
    countUp('stat-integrations', 5, '', 1500);
    countUp('stat-res', 2, 'K', 1600);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', width: 12, height: 12,
          background: '#E63030', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'transform 0.1s',
        }}
      />
      <div
        ref={trailRef}
        style={{
          position: 'fixed', width: 40, height: 40,
          border: '1px solid rgba(230,48,48,0.4)',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
          transition: 'all 0.15s ease',
        }}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Noise overlay */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 1, opacity: 0.035, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        body { cursor: none; }

        #anarchy-hero { cursor: none; }

        .anarchy-letter {
          display: inline-block;
          animation: letter-chaos 0.6s cubic-bezier(0.23,1,0.32,1) both;
        }
        @keyframes letter-chaos {
          0%   { opacity:0; transform: translateY(60px) rotate(var(--r,5deg)) scale(0.8); }
          100% { opacity:1; transform: translateY(0) rotate(0deg) scale(1); }
        }

        .anarchy-glitch { position: relative; }
        .anarchy-glitch::before,
        .anarchy-glitch::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0; right: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 13vw, 150px);
          line-height: 0.85;
          letter-spacing: -2px;
          clip: rect(0,0,0,0);
        }
        .anarchy-glitch::before {
          color: #00ffff; left: 2px;
          animation: glitch-1 4s infinite;
        }
        .anarchy-glitch::after {
          color: #ff00ff; left: -2px;
          animation: glitch-2 4s infinite;
        }
        @keyframes glitch-1 {
          0%,89%,100% { clip: rect(0,9999px,0,0); }
          10% { clip: rect(20px,9999px,60px,0); transform: skewX(-3deg); }
          15% { clip: rect(80px,9999px,120px,0); }
          20% { clip: rect(40px,9999px,80px,0); transform: skewX(2deg); }
          25% { clip: rect(0,9999px,0,0); }
        }
        @keyframes glitch-2 {
          0%,84%,100% { clip: rect(0,9999px,0,0); }
          12% { clip: rect(60px,9999px,100px,0); transform: skewX(4deg); }
          18% { clip: rect(10px,9999px,40px,0); }
          23% { clip: rect(90px,9999px,140px,0); transform: skewX(-2deg); }
          28% { clip: rect(0,9999px,0,0); }
        }

        .anarchy-badge-anim  { animation: fade-up 0.8s 0.2s cubic-bezier(0.23,1,0.32,1) both; }
        .anarchy-sub-anim    { animation: fade-up 0.8s 0.9s cubic-bezier(0.23,1,0.32,1) both; }
        .anarchy-eng-anim    { animation: fade-up 0.8s 0.85s cubic-bezier(0.23,1,0.32,1) both; }
        .anarchy-cta-anim    { animation: fade-up 0.8s 1.1s cubic-bezier(0.23,1,0.32,1) both; }
        .anarchy-stats-anim  { animation: fade-up 0.8s 1.3s cubic-bezier(0.23,1,0.32,1) both; }
        .anarchy-scroll-anim { animation: fade-up 1s 1.8s both; }
        .anarchy-ss-anim     { animation: fade-up 1s 1.5s cubic-bezier(0.23,1,0.32,1) both; }

        @keyframes fade-up {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }

        .anarchy-badge-dot { animation: badge-pulse 1.5s ease-in-out infinite; }
        @keyframes badge-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.6); }
        }

        .anarchy-btn-primary {
          padding: 14px 32px;
          background: #E63030; color: #fff;
          font-weight: 700; font-size: 13px;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: none; border-radius: 4px;
          cursor: none; position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s;
          font-family: inherit;
        }
        .anarchy-btn-primary::before {
          content:''; position:absolute; top:0; left:-100%;
          width:100%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
          transition: left 0.4s;
        }
        .anarchy-btn-primary:hover::before { left: 100%; }
        .anarchy-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 60px rgba(230,48,48,0.45);
        }

        .anarchy-btn-ghost {
          padding: 14px 32px;
          background: transparent; color: rgba(255,255,255,0.6);
          font-weight: 700; font-size: 13px;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.12); border-radius: 4px;
          cursor: none; transition: all 0.2s;
          font-family: inherit;
        }
        .anarchy-btn-ghost:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }

        .anarchy-scroll-line {
          width: 1px; height: 60px;
          background: linear-gradient(to bottom, rgba(230,48,48,0.8), transparent);
          animation: scroll-drop 2s ease-in-out infinite;
        }
        @keyframes scroll-drop {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        .anarchy-shimmer {
          animation: shimmer 3s ease-in-out 1s infinite;
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
      `}</style>

      <section
        id="anarchy-hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
          {/* Badge */}
          <div
            className="anarchy-badge-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-anarchy-red/10 border border-anarchy-red/20 text-anarchy-red text-xs font-medium mb-8 tracking-wide"
          >
            <span className="anarchy-badge-dot w-1.5 h-1.5 rounded-full bg-anarchy-red" />
            Node-based AI Workflow Platform
          </div>

          {/* Title */}
          <div ref={titleWrapRef} style={{ transition: 'transform 0.1s linear', marginBottom: 8 }}>
            {/* Line 1: BUILD AI */}
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(80px,13vw,150px)',
                lineHeight: 0.85, color: '#fff',
                letterSpacing: -2, display: 'block',
              }}
            >
              {'BUILD AI'.split('').map((ch, i) => (
                <span
                  key={i}
                  className="anarchy-letter"
                  style={{
                    animationDelay: (0.3 + i * 0.04) + 's',
                    ['--r' as string]: (Math.random() * 20 - 10) + 'deg',
                  }}
                >{ch}</span>
              ))}
            </div>

            {/* Line 2: ARCHITECTURE — glitch */}
            <div
              className="anarchy-glitch"
              data-text="ARCHITECTURE"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(80px,13vw,150px)',
                lineHeight: 0.85,
                color: '#E63030',
                letterSpacing: -2,
                textShadow: '0 0 80px rgba(230,48,48,0.5)',
                display: 'block',
              }}
            >
              {'ARCHITECTURE'.split('').map((ch, i) => (
                <span
                  key={i}
                  className="anarchy-letter"
                  style={{
                    animationDelay: (0.45 + i * 0.035) + 's',
                    ['--r' as string]: (Math.random() * 20 - 10) + 'deg',
                  }}
                >{ch}</span>
              ))}
            </div>

            {/* Line 3: WITHOUT LIMITS */}
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(80px,13vw,150px)',
                lineHeight: 0.85, color: '#fff',
                letterSpacing: -2, display: 'block',
              }}
            >
              {'WITHOUT LIMITS'.split('').map((ch, i) => (
                <span
                  key={i}
                  className="anarchy-letter"
                  style={{
                    animationDelay: (0.7 + i * 0.03) + 's',
                    ['--r' as string]: (Math.random() * 20 - 10) + 'deg',
                  }}
                >{ch === ' ' ? '\u00A0' : ch}</span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="anarchy-sub-anim text-lg text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{ fontSize: 'clamp(14px,2vw,17px)', maxWidth: 520, lineHeight: 1.75, margin: '28px auto 20px' }}
          >
            Upload a design screenshot, connect AI nodes, generate multiple render
            directions, upscale the best results — all inside one visual workflow.
          </p>

          {/* Engine pills */}
          <div
            className="anarchy-eng-anim flex items-center justify-center gap-2 flex-wrap mb-10"
            aria-label="Supported AI engines"
          >
            <span className="text-xs text-gray-600 uppercase tracking-widest mr-1">Powered by</span>
            {engines.map(e => (
              <span
                key={e}
                className="text-xs text-gray-400 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full"
              >{e}</span>
            ))}
          </div>

          {/* CTA - Watch Workflow only (no Request Access) */}
          <div
            className="anarchy-cta-anim flex items-center justify-center"
          >
            <button
              className="anarchy-btn-ghost"
              onClick={() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Watch Workflow ↗
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 14, letterSpacing: '1px' }}>
            Built for architects, interior designers & visualization teams.
          </p>

          {/* Stats */}
          <div
            className="anarchy-stats-anim flex items-center justify-center gap-10 flex-wrap mt-14 mb-16"
            aria-label="Product statistics"
          >
            {[
              { id: 'stat-engines', init: '7+', label: 'AI Engines' },
              { id: 'stat-integrations', init: '5', label: 'Integrations' },
              { id: 'stat-res', init: '2K', label: 'Max Resolution' },
              { id: '', init: '∞', label: 'Batch Renders' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div
                  id={s.id || undefined}
                  className="text-3xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: '#fff', lineHeight: 1 }}
                >{s.init}</div>
                <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest" style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Hero product screenshot with Windows frame */}
          <div
            className="anarchy-ss-anim relative mx-auto max-w-5xl"
          >
            {/* Glow halo */}
            <div className="absolute -inset-6 bg-gradient-to-r from-anarchy-red/20 via-purple-500/15 to-blue-500/10 rounded-3xl blur-3xl" />
            <div className="relative glass rounded-2xl p-2 ring-1 ring-white/[0.08]">
              {/* Windows frame header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 mb-0 bg-[#1e1e1e]/50">
                {/* Window title - Windows style */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Anarchy AI Builder</span>
                </div>
                {/* Window controls - Windows style (right side) */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-anarchy-dark">
                <img
                  src="/screenshots/builder-new.png"
                  alt="Anarchy AI Builder — Node canvas with connected AI render workflow"
                  className="w-full h-auto object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                  decoding="async"
                  style={{ display: 'block' }}
                />
                {/* Overlay badges */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between pointer-events-none">
                  <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-anarchy-red animate-pulse" />
                    <span className="text-xs text-gray-300 font-medium">Live Processing</span>
                  </div>
                  <div className="glass rounded-xl px-4 py-2.5">
                    <span className="text-xs text-gray-400">Seedream 4.5 · 2K · 1:1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="anarchy-scroll-anim absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-colors"
          aria-label="Scroll to features"
        >
          <button onClick={scrollToFeatures} className="focus-visible:outline-none">
            <ChevronDown size={24} className="animate-bounce" />
          </button>
        </div>
      </section>
    </>
  );
}

