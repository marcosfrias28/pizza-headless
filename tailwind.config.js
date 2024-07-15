import plugin from 'tailwindcss-animated'
import defaultTheme from 'tailwindcss/defaultTheme'
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      animation: {
        'modalActive': 'modalActive 0.3s ease-in-out',
        'spin-slow': 'spin 30s linear infinite'
			  },
      keyframes: {
        modalActive: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      fontFamily: {
        pattaya: ["Pattaya", ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans]
      },
      width: {
        max: '1325px'
      },
      maxWidth: {
        max: '1325px'
      },
      colors: {
        'bridal-heath': {
          50: '#fff8f2',
          100: '#ffe9d5',
          200: '#fecfaa',
          300: '#fdad74',
          400: '#fb803c',
          500: '#f95e16',
          600: '#ea430c',
          700: '#c2300c',
          800: '#9a2712',
          900: '#7c2312',
          950: '#430e07'
        },
        'bright-sun': {
          50: '#fefbec',
          100: '#fcf3c9',
          200: '#fae68d',
          300: '#f6ce40',
          400: '#f5bf2a',
          500: '#ee9f12',
          600: '#d37a0c',
          700: '#af560e',
          800: '#8e4312',
          900: '#753712',
          950: '#431c05'
        }
      }
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ]
}
