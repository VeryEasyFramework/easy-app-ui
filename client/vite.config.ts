import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

import {fileURLToPath} from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
   resolve: {
      alias: {
         "@": fileURLToPath(new URL("./src", import.meta.url)),
         "#shared": fileURLToPath(new URL("../sharedTypes/index", import.meta.url)),
         "#shared/": fileURLToPath(new URL("../sharedTypes", import.meta.url)),

      }

   },
   server: {

      port: 5174,
      strictPort: true,
      origin: "http://localhost:5174",
      open: "http://localhost:8000",
      hmr: {
         //   host: "localhost",

         // path: "/__vite_hmr",
         clientPort: 5174,
      },
      host: true,
   },
});
