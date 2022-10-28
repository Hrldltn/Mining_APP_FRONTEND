/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
            './src/**/*.{html,jsx}'
  ],
  theme: {
    extend: {},
  },
  variants:{
    extend:{
      display:['group-focus']
    },
  },
  plugins: [],
}
