import {defineStore} from "pinia";
import {EntityDefinition, UserSession} from "../types/index";

import {notify} from "../notify/index";
import {easyApi} from "@/api/index.ts";
import {entityStore} from "@/stores/entityStore.ts";


export const useAppStore = defineStore('app', {
   state: () => ({
      session: {} as UserSession,
      isMobile: false,
      initialized: false,
      booted: false,
      theme: "light" as "light" | "dark",
      userThemePref: null as "light" | "dark" | null,
      localTheme: null as "light" | "dark" | null,
      isAuthenticated: false,
   }),
   actions: {
      async init() {
         if (this.initialized) return;
         this.initTheme()
         // const response = await easyApi.call("auth", "check");
         // this.isAuthenticated = this.session.session_id != null;
         // if (this.isAuthenticated) {
         await this.boot();
         // }
         this.initialized = true;
      },
      async boot() {
         // this.app = await api.call("app", "boot");
         entityStore.entities = await easyApi.call("app", "entities")
         this.booted = true;
      },
      initTheme() {
         this.loadLocalTheme();
         this.loadUserThemePref();
         this.setTheme(this.localTheme || this.userThemePref || "light");
      },
      loadUserThemePref() {
         this.userThemePref = window?.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
      },
      loadLocalTheme() {
         this.localTheme = localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;
      },
      setTheme(theme: "light" | "dark") {
         localStorage.setItem("theme", theme);
         this.theme = theme;
         document.body.dataset.theme = this.theme;
      },
      toggleTheme() {
         if (this.theme == "light") {
            this.theme = "dark";
         } else {
            this.theme = "light";
         }
         this.setTheme(this.theme);
      },
      async login(user: string, password: string) {
         const response = await easyApi.call("auth", "login", {
            user,
            password
         });
         if (response.session_id == null) {
            notify({
               message: "Login failed",
               title: "Login failed",
               type: "error"
            });
            return;
         }
         // this.session = response;
         this.isAuthenticated = this.session.session_id != null;
         if (this.isAuthenticated) {
            await this.boot();
            notify({
               message: "Login successful",
               title: "Logged in",
               type: "success"
            });
         }
      },
      async logout() {
         await easyApi.call("auth", "logout");
         this.$reset();
         window.location.reload();
      }
   }
})