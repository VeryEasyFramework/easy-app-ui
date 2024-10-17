import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";

import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }

  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  },
  server: {

    port: 5174,
    strictPort: true,
    origin: "http://localhost:5174",
    hmr: {
      clientPort: 5174,
    },
    host: true,
  },
});
