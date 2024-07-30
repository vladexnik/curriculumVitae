/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html,css}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
    },
    extend: {
      boxShadow: {
        dropdown:
          '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
        dropdownDark:
          'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px'
      },
      colors: {
        lightGrey: 'var(--light-grey)',
        textSec: 'var(--text-secondary)',
        textMain: 'var(--text-main)',
        bgColor: 'var(--bg-color)',
        darkGrey: 'var(--dark-grey)',
        optionHover: 'var(--option-hover)',
        bgDropdown: 'var(--bg-dropdown)',
        primary: 'var(--color-primary)',
        primaryDark: 'rgb(138, 33, 34)',
        primaryDarkActive: 'rgb(171, 45, 44)',

        primaryLight: 'var(--primary-light)',
        primaryLightActive: 'var(--primary-light-active)',
        disabledPrimary: 'var(--disabled-primary)',
        disabledPrimaryText: 'var(--disabled-primary-text)',
        secondary: 'rgb(118, 118, 118)',
        secondaryDark: 'rgb(94, 92, 92)',
        secondaryLight: 'var(--secondary-light)',
        secondaryLightActive: 'var(--secondary-light-active)'
      }
    }
  },
  plugins: []
}
