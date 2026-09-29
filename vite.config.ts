import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
    },
  },
  plugins: [react()],
  server: {
        port: 3000,
        proxy: {
          '/api': {
            target: 'https://api.yeatwork.ru',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
      preview: {
        port: 4173,
        proxy: {
          '/api': {
            target: 'https://api.yeatwork.ru',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    });
