import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "vue3-select-option-searchable",
      fileName: 'vue3-select-option-searchable',
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
