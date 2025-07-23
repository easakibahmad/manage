import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        'pulse-ring': 'pulseRing 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
