import {createEasyRouter} from "@eveffer/easy-client";
import {useAppStore} from "@/stores/index.ts";


const modules = import.meta.glob(`@/pages/**/*.vue`);
export const router = createEasyRouter({
   homeRoute: "/app",
   modules
});


router.beforeEach(async (to, from, next) => {
   const appStore = useAppStore();
   // await appStore.init();
   console.log("appStore", appStore);
   console.log("to", to);
   if (to.meta.requiresAuth && !appStore.isAuthenticated) {
      console.log("requiresAuth");
      next("/login");
      return;
   }
   console.log("to.path", to.path);
   if (to.path === "/login" && appStore.isAuthenticated) {
      console.log("authenticated");
      next("/app/api");
      return;
   }

   next();
});
