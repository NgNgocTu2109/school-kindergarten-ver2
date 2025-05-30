import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Đúng với PORT bạn chạy backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
