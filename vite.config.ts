import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";
import eslint from "vite-plugin-eslint";
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    eslint(),
    svgLoader()
  ],
});
