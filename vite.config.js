import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "vue3-select-option-search",
      fileName: 'vue3-select-option-search',
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          "vue": "Vue"
        },
      },
    },
  },
  plugins: [vue()],
})
