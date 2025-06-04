import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    }
  },
  plugins: [animate],
}

export default config
