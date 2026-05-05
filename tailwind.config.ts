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
          navy: '#0d1825',
          'navy-deep': '#070e18',
          orange: '#ff6b35',
          'orange-hover': '#e55525',
          steel: '#8b95a0',
          'steel-dark': '#4d5764',
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
