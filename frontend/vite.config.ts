import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "tailwindcss"
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@slices': path.resolve(__dirname, './src/store/slices'),
      '@api': path.resolve(__dirname, './src/store/api'),
      '@actions': path.resolve(__dirname, './src/store/actions'),
      '@interfaces': path.resolve(__dirname, './src/interfaces')
      // Agrega otros alias según necesites
    }
  }
})
