/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Star Wars color palette
        'sw-yellow': '#ffd700',
        'sw-red': '#ff6b6b',
        'sw-blue': '#4dabf7',
        'sw-green': '#51cf66',
        'sw-orange': '#ff8c42',
        'sw-purple': '#9775fa',
        'sw-dark': '#0f0f23',
        'sw-darker': '#1a1a2e',
        'sw-darkest': '#16213e',
        // Legacy Discord colors (keep for compatibility)
        'discord-dark': '#2c2f33',
        'discord-blurple': '#5865f2',
      },
      fontFamily: {
        'retro': ['Orbitron', 'Share Tech Mono', 'monospace'],
        'mono-retro': ['Share Tech Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'star-fall': 'fall 50s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'text-flicker': 'text-flicker 3s ease-in-out infinite alternate',
        'scan-line': 'scan-line 2s linear infinite',
        'retro-bounce': 'retro-bounce 0.6s ease-in-out',
        'crt-flicker': 'crt-flicker 0.15s infinite linear alternate',
      },
      keyframes: {
        fall: {
          '0%': { 
            transform: 'translateY(-200px) rotateZ(0deg)',
            opacity: '0'
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { 
            transform: 'translateY(100vh) rotateZ(360deg)',
            opacity: '0'
          },
        },
        'pulse-glow': {
          '0%': { 
            filter: 'brightness(1) saturate(1)',
            transform: 'scale(1)'
          },
          '100%': { 
            filter: 'brightness(1.2) saturate(1.4)',
            transform: 'scale(1.02)'
          },
        },
        'text-flicker': {
          '0%, 100%': {
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
          },
          '50%': {
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px #ff8c42'
          },
        },
        'scan-line': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'retro-bounce': {
          '0%, 100%': { 
            transform: 'translateY(0px)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(-5px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          },
        },
        'crt-flicker': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        },
      },
      boxShadow: {
        'retro': '0 0 20px rgba(255, 215, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
        'retro-hover': '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 140, 66, 0.4)',
        'retro-inset': 'inset 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glow-yellow': '0 0 20px rgba(255, 215, 0, 0.6)',
        'glow-blue': '0 0 20px rgba(77, 171, 247, 0.6)',
        'glow-red': '0 0 20px rgba(255, 107, 107, 0.6)',
      },
      backdropBlur: {
        'retro': '10px',
      },
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      screens: {
        'retro': '1024px', // Custom breakpoint for retro layouts
      },
    },
  },
  plugins: [],
}