/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif JP"', 'serif'],
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 30px -8px rgba(0, 0, 0, 0.12)',
        lift: '0 12px 40px -12px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
