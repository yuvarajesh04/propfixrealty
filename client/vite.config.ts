// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    ssrManifest: true,
    outDir: 'dist/client',
  },
  ssr: {
    noExternal: ['react', 'react-dom', 'react-router-dom', 'react-helmet'],
  }
})
