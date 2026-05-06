import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://cloth2cash.onrender.com', // Your backend server port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
