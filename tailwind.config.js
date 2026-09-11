/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mea: {
          navy: '#0B3D91',
          darkNavy: '#082C6C',
          deepNavy: '#051C45',
          saffron: '#FF9933',
          green: '#138808',
          link: '#0645AD',
          text: '#212121',
          muted: '#555555',
          bg: '#FFFFFF',
          lightGrey: '#F5F5F5',
          border: '#DCE2E6',
        },
        hindi: {
          saffron: '#FF9933',
          gold: '#FFB800',
          indigo: '#0B3D91',
          navy: '#082C6C',
          emerald: '#138808',
          rose: '#F43F5E',
          cyan: '#00A8E8',
          violet: '#8B5CF6',
        },
        jethat: {
          orange: '#FF9933',
          saffron: '#FF9933',
          cyan: '#0645AD',
          teal: '#00A8E8',
          red: '#A91D22',
          navy: '#0B3D91',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'Devanagari', '"Noto Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(255, 119, 34, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 119, 34, 0.7)' },
        },
      },
    },
  },
  plugins: [],
}
