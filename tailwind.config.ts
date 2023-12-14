import type { Config } from 'tailwindcss'

const colors = require('tailwindcss/colors')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "main": {
          "DEFAULT": colors.blue[500],
          "hover": colors.blue[600],
        },
        "depth": {
          1: {
            "DEFAULT": colors.gray[100],
            "dark": colors.gray[900],
          },
          2: {
            "DEFAULT": "white",
            "hover": colors.gray[200],
            "dark": {
              "DEFAULT": colors.gray[800],
              "hover": colors.gray[700],
            },
          },
          3: {
            "DEFAULT": colors.gray[200],
            "dark": colors.gray[700],
          },
        },
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}
export default config
