import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages: https://prarthana-org.github.io/user-web/
  // Change to base: '/' if deploying to root domain (Vercel, Netlify, Render)
  base: '/user-web/',
})
