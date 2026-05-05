import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gnat: {
          navy: '#1a2332',
          'navy-deep': '#0f1822',
          orange: '#ff6b35',
          'orange-hover': '#e55a28',
          steel: '#8b95a0',
          'steel-dark': '#5a6470',
          concrete: '#e8eaed',
          'concrete-light': '#f5f6f8',
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
    },
  },
  plugins: [],
};

export default config;
