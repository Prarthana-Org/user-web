import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For Render: root domain. For GitHub Pages, use base: '/user-web/'
  base: '/',
})
