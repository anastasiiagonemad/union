import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/union/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist'
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/assets/style/variables.scss" as *;
        @use "@/assets/style/fonts.scss" as *;
        `
      }
    }
  }
})
