import {defineConfig} from "vite";
import vueDevTools from 'vite-plugin-vue-devtools'

import vue from "@vitejs/plugin-vue";

import {fileURLToPath} from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue(), vueDevTools({

      }
   )],
   appType: "mpa",
   base: "/dev",
   build: {

      rollupOptions: {
         input: {
            main: fileURLToPath(new URL("./index.html", import.meta.url)),
            login: fileURLToPath(new URL("./login/login.html", import.meta.url)),
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
      hmr: {
         clientPort: 5174,
      },
      host: true,
   },
});
