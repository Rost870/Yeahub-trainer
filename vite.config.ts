import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
})
