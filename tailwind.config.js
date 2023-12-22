/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  media: false, // or 'purge' or 'class'
  darkMode:'class',
  theme: {
    extend: {},
    screens:{
      'xxl':'1200px',
      'xl':'992px',
      'lg':'840px',
      'md':'768px',
      'sm':'640px',
      'ssm':'576px',
      'vsm':'400px',
      'vvsm':'330px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: []
}