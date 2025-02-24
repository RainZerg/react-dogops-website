import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend server port
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
