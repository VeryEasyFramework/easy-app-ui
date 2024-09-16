import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import {useAppStore} from "@/stores/appStore.ts";

export const router = createRouter({
   history: createWebHistory(),

   routes: [{
      name: "home",
      path: "/",
      component: () => import("@/views/HomeView.vue")
   }, {

      name: "entity",
      path: "/entity",
      children: [
         {
            name: "entities",
            path: "",
            component: () => import("@/views/entity/EntityView.vue"),
         }, {
            name: "entityList",
            path: "/entity/:entity",
            component: () => import("@/views/entity/EntityListView.vue"),
            props: true,
            children: [{
               name: "entityRecord",
               path: ":id",
               component: () => import("@/views/entity/EntityRecordView.vue"),
               props: true
            }]
         },
      ]
   },
      {
         name: "theme",
         path: "/theme",
         component: () => import("@/views/theme/ThemeView.vue")
      },

      {
         name: "api-explorer",
         path: "/api-explorer",
         component: () => import("@/views/api/ApiExplorerView.vue")
      }, {
         name: "realtime",
         path: "/realtime",
         component: () => import("@/views/realtime/RealtimeView.vue")
      }
   ]

})


router.beforeResolve(async (to, from, next) => {
   const appStore = useAppStore();
   await appStore.init();
   next();
})
