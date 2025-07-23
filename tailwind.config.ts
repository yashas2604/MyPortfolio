import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // this enables class-based dark mode
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // include this if you're using src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config