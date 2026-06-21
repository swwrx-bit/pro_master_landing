/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F5E3A0',
          DEFAULT: '#D4AF37',
          dark: '#AA7C11',
          premium: '#C5A02F',
          glow: 'rgba(212, 175, 55, 0.15)',
        },
        dark: {
          bg: '#0A0A0A',
          card: '#141414',
          accent: '#1E1E1E',
          input: '#1A1A1A',
        }
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      borderRadius: {
        'card': '24px',
        'input': '20px',
      },
      boxShadow: {
        'gold-glow': '0 4px 20px 0 rgba(212, 175, 55, 0.15)',
        'gold-glow-lg': '0 10px 30px 0 rgba(212, 175, 55, 0.3)',
        'premium': '0 20px 45px -15px rgba(0,0,0,0.8)',
      }
    },
  },
  plugins: [],
}
