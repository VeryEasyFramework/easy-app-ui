import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

import {fileURLToPath} from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
   appType: "mpa",

   build: {

      rollupOptions: {
         input: {
            main: fileURLToPath(new URL("./index.html", import.meta.url)),
            login: fileURLToPath(new URL("./login.html", import.meta.url)),
         },
      }
   },
   resolve: {
      alias: {
         "@": fileURLToPath(new URL("./src", import.meta.url)),
         "@login": fileURLToPath(new URL("./login", import.meta.url)),

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
