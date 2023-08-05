/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xxs': '360px',
      'xs': '500px',
      'sm':	'640px',
      'md':	'768px'	,
      'lg':	'1024px',
      'xl':	'1280px',
      '2xl':	'1536px',
      '3xl':	'1629px'

    }
  },
  plugins: [],
}