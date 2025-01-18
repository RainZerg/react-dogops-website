import { resolve} from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = new URL('.', import.meta.url).pathname
// https://vite.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'client'),
  publicDir: resolve(__dirname, 'public'),
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    port: 3002,
  },
  build: {
    outDir: resolve(__dirname, 'dist'), //  Output directory relative to project root. Important!
    emptyOutDir: true // Clean the output directory before building. Recommended.
  }
})
