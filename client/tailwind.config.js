/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#0F5C4C',
          dark: '#0A3F35',
          light: '#1A7A66',
          soft: '#E6F2EE',
        },
        accent: {
          DEFAULT: '#E8910F',
          hover: '#D07E08',
          soft: '#FFF4E3',
        },
        ink: {
          DEFAULT: '#14241F',
          muted: '#4A5560',
          faint: '#7A8694',
        },
        surface: {
          DEFAULT: '#F7F9F8',
          warm: '#F3F6F4',
        },
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        countPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease-out both',
        fadeIn: 'fadeIn 0.6s ease-out both',
        countPulse: 'countPulse 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
