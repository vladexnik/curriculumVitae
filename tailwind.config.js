/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html,css}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
    },
    extend: {
      colors: {
        darkText: 'rgb(46, 46, 46)',
        darkBg: 'rgb(53, 53, 53)',
        lightBg: 'rgb(245, 245, 247)',
        primary: 'rgb(198, 48, 49)',
        primaryHover: 'rgb(138, 33, 34)',
        secondary: 'rgb(118, 118, 118)',
        secondaryHover: 'rgb(94, 92, 92)',
        secondaryLight: 'rgb(220,220,220)'
      }
    }
  },
  plugins: []
}
