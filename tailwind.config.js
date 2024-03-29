/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["winter", "night"]
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  variants: {
    borderWidth: ['responsive', 'first', 'hover', 'focus'],
  },
}

