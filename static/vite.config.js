import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Your Express server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: rewrite the URL path
      },
    },
  },
})
