/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'border-orbit': {
          '0%': { transform: 'rotate(0deg) translateX(100%) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100%) rotate(-360deg)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'border-orbit': 'border-orbit 3s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards'
      }
    }
  },
  plugins: [],
} 