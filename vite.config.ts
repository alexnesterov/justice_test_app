import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
})
