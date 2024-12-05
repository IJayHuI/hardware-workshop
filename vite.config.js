import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/server': {
        target: 'https://server.jayhu.site/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/server/, ''),
        secure: true
      }
    },
    host: '0.0.0.0'
  },
  plugins: [vue()]
})
