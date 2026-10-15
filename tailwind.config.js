/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          void: '#050508',
          obsidian: '#0B0C14',
          base: '#0B0C14',
          surface: '#111322',
          card: '#131627',
          'card-hover': '#1A1E35',
          border: '#1E233D',
          'border-light': '#2A3358',
          'border-glow': '#44538C',
          glass: 'rgba(15, 18, 30, 0.55)',
        },
        cyber: {
          cyan: '#00F0FF',
          violet: '#7000FF',
          amber: '#FFB800',
          silver: '#94A3B8',
          dim: '#16192E',
        },
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7000FF', // Neon Violet
          600: '#6000DB',
          700: '#5200BA',
          800: '#430099',
          900: '#340078',
        },
        neon: {
          purple: '#7000FF',
          cyan: '#00F0FF',
          blue: '#00B4D8',
          orange: '#FFB800',
          amber: '#FFB800',
          emerald: '#00F5A0',
          rose: '#FF0055',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Orbitron', '"Plus Jakarta Sans"', 'sans-serif'],
        tech: ['Orbitron', 'Syne', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.12em',
        widest3: '0.18em',
      },
      boxShadow: {
        'glow-brand': '0 0 30px -5px rgba(112, 0, 255, 0.55)',
        'glow-cyan': '0 0 30px -5px rgba(0, 240, 255, 0.55)',
        'glow-violet': '0 0 30px -5px rgba(112, 0, 255, 0.55)',
        'glow-amber': '0 0 30px -5px rgba(255, 184, 0, 0.55)',
        'card-hover': '0 16px 40px -10px rgba(0, 0, 0, 0.9), 0 0 25px -4px rgba(0, 240, 255, 0.28)',
        'hud': '0 0 20px rgba(0, 240, 255, 0.22), inset 0 0 15px rgba(112, 0, 255, 0.15)',
        'hud-strong': '0 0 35px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(112, 0, 255, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-bounce': 'glowPulse 3s ease-in-out infinite',
        'laser-scroll': 'laserScroll 2.2s ease-in-out infinite',
        'fog-drift-1': 'fogDrift1 28s linear infinite',
        'fog-drift-2': 'fogDrift2 38s linear infinite reverse',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        laserScroll: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '30%': { opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateY(180%)', opacity: '0' },
        },
        fogDrift1: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fogDrift2: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
