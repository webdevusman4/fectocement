/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./versions/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fecto: {
          navy: '#000080',
          sand: '#F4D5AB',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'glass': '18px',
        'menu': '20px',
      },
      boxShadow: {
        'navy-pill': '0 20px 40px -15px rgba(0, 0, 80, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
        'navy-card': '0 30px 60px -15px rgba(0, 0, 80, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      },
    },
  },
  plugins: [],
};
