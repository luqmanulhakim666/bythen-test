import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}', // Tailwind processes pages
    './src/components/**/*.{js,ts,jsx,tsx}', // Tailwind processes components
    './src/**/*.{js,ts,jsx,tsx}' // Covers all other src files
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      }
    }
  },
  plugins: []
} satisfies Config
