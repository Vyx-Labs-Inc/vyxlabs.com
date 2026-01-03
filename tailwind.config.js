/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vyx': {
          'primary': '#3b82f6',
          'accent': '#6366f1',
          'dark': '#0a0a0f',
          'darker': '#050508',
          'surface': '#111118',
          'border': '#1e1e2a',
          'muted': '#6b7280',
          'text': '#e5e7eb',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'SF Mono',
          'Consolas',
          'Liberation Mono',
          'Menlo',
          'monospace',
        ],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
        'dot': '20px 20px',
      },
    },
  },
  plugins: [],
}
