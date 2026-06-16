/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        body:    ['"Nunito"', 'sans-serif'],
        serif:   ['"Playfair Display"', 'serif'],
      },
      colors: {
        ink:    '#0A0A0A',
        blade:  '#111111',
        steel:  '#1A1A1A',
        edge:   '#222222',
        smoke:  '#2C2C2C',
        ash:    '#3A3A3A',
        gold:   {
          300: '#F5D78E',
          400: '#EEC643',
          500: '#D4A017',
          600: '#B8860B',
          700: '#946D09',
        },
        blood:  {
          400: '#FF4444',
          500: '#E11D1D',
          600: '#C41A1A',
        },
        chalk:  '#F5F0E8',
        silver: '#9A9A9A',
      },
      animation: {
        'flicker':      'flicker 3s ease-in-out infinite',
        'slide-up':     'slideUp 0.6s cubic-bezier(.16,1,.3,1) both',
        'slide-right':  'slideRight 0.5s cubic-bezier(.16,1,.3,1) both',
        'glow-gold':    'glowGold 2s ease-in-out infinite',
        'glow-blood':   'glowBlood 2s ease-in-out infinite',
        'barber-spin':  'spin 8s linear infinite',
        'float':        'float 4s ease-in-out infinite',
        'scan':         'scan 3s ease-in-out infinite',
        'fade-in':      'fadeIn 0.5s ease both',
        'typewriter':   'typewriter 3s steps(30) forwards',
        'pulse-gold':   'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%,100%': { opacity:1 }, '92%': { opacity:1 },
          '93%': { opacity:0.4 }, '94%': { opacity:1 },
          '96%': { opacity:0.3 }, '97%': { opacity:1 },
        },
        slideUp: {
          '0%': { opacity:0, transform:'translateY(30px)' },
          '100%': { opacity:1, transform:'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity:0, transform:'translateX(-20px)' },
          '100%': { opacity:1, transform:'translateX(0)' },
        },
        glowGold: {
          '0%,100%': { boxShadow:'0 0 15px rgba(212,160,23,0.3)' },
          '50%': { boxShadow:'0 0 40px rgba(212,160,23,0.7), 0 0 80px rgba(212,160,23,0.2)' },
        },
        glowBlood: {
          '0%,100%': { boxShadow:'0 0 15px rgba(225,29,29,0.3)' },
          '50%': { boxShadow:'0 0 40px rgba(225,29,29,0.7)' },
        },
        float: {
          '0%,100%': { transform:'translateY(0px)' },
          '50%': { transform:'translateY(-12px)' },
        },
        scan: {
          '0%': { transform:'translateY(-100%)' },
          '100%': { transform:'translateY(100vh)' },
        },
        fadeIn: {
          '0%': { opacity:0 }, '100%': { opacity:1 },
        },
        pulseGold: {
          '0%,100%': { opacity:1 }, '50%': { opacity:0.6 },
        },
      },
    },
  },
  plugins: [],
}
