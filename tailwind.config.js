/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'h1-headline': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1-subhead': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'h2-headline': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'h2-subhead': ['20px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3-headline': ['24px', { lineHeight: '1.2', fontWeight: '500' }],
        'h3-body': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'h4-body': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'h5-body': ['10px', { lineHeight: '1.5', fontWeight: '500' }],
      },
      fontFamily: {
        heading: ["Raleway", "sans-serif"],
        content: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
};
