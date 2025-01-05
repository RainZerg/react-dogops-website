import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: resolve(import.meta.dirname, 'client'),
  publicDir: resolve(import.meta.dirname, 'public'),
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    port: 3002,
  },
  build: {
    outDir: resolve('import.meta.dirname', 'dist'), //  Output directory relative to project root. Important!
    emptyOutDir: true // Clean the output directory before building. Recommended.
  }
})
