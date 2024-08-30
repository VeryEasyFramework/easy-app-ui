import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import {useAppStore} from "@/stores/appStore.ts";

export const router = createRouter({
   history: createWebHashHistory(),

   routes: [{
      name: "home",
      path: "/",
      component: () => import("@/views/HomeView.vue")
   }, {

      name: "entity",
      path: "/entity",
      component: () => import("@/views/entity/EntityView.vue"),
   },
      {
         name: "entityList",
         path: "/entity/:entity",
         component: () => import("@/views/entity/EntityListView.vue"),
         props: true,
      }]
})


router.beforeResolve(async (to, from, next) => {
   const appStore = useAppStore();
   await appStore.init();
   next();
})
