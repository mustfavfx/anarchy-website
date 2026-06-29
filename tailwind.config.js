/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'anarchy-red': '#E63030',
        'anarchy-dark': '#0a0a0c',
        'anarchy-gray': '#1a1a1e',
        'anarchy-surface': '#141418',
        'anarchy-elevated': '#202024',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'tajawal': ['Tajawal', 'sans-serif'],
        'arabic': ['IBM Plex Sans Arabic', 'Tajawal', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'marquee': 'marquee 30s linear infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'glitch-1': 'glitch-1 3s infinite',
        'glitch-2': 'glitch-2 3s infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'kinetic': 'kinetic 0.8s cubic-bezier(0.23, 1, 0.32, 1) both',
        'scatter-in': 'scatter-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(225, 29, 72, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(225, 29, 72, 0.5)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(230, 48, 48, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(230, 48, 48, 0.6), 0 0 60px rgba(230, 48, 48, 0.3)' },
        },
        'glitch-1': {
          '0%, 90%, 100%': { transform: 'translateX(-3px)' },
          '10%': { transform: 'translateX(3px) skewX(-2deg)' },
          '20%': { transform: 'translateX(-2px)' },
          '30%': { transform: 'translateX(0)' },
        },
        'glitch-2': {
          '0%, 85%, 100%': { transform: 'translateX(3px)' },
          '15%': { transform: 'translateX(-3px) skewX(2deg)' },
          '25%': { transform: 'translateX(2px)' },
          '35%': { transform: 'translateX(0)' },
        },
        'scan-line': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'kinetic': {
          '0%': { opacity: '0', transform: 'translateY(80px) rotateX(-45deg) scale(0.8)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotateX(0) scale(1)' },
        },
        'scatter-in': {
          '0%': { opacity: '0', transform: 'translateY(60px) rotate(var(--rotation, 10deg)) scale(0.7)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0) scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(225, 29, 72, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(99, 102, 241, 0.1) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}
