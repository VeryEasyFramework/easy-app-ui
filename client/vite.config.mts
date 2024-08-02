import { defineConfig } from "@vite";
import vue from "@vitePluginVue";

import "@vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  server: {
    port: 5174,
    strictPort: true,
    origin: "http://localhost:5174",

    hmr: {
      //   host: "localhost",

      // path: "/__vite_hmr",
      clientPort: 5174,
    },
    host: true,
  },
});
