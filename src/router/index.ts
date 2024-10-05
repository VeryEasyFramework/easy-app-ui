import {createRouter, createWebHistory} from "vue-router";
import {useAppStore} from "@/stores/appStore.ts";

export const router = createRouter({
   history: createWebHistory(),

   routes: [{
      name: "login",
      path: "/login",
      component: () => import("@/views/login/LoginView.vue"),
      meta: {
         public: true
      }
   }, {
      name: "reset-password",
      path: "/reset-password",
      component: () => import("@/views/resetPassword/ResetPasswordView.vue"),
      meta: {
         public: true
      }
   },
      {
         name: "home",
         path: "/",
         component: () => import("@/views/HomeView.vue"),
         children: [
            {
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
      },

   ]

})


router.beforeResolve(async (to, from, next) => {
   const appStore = useAppStore();
   await appStore.init();
   if (!appStore.isAuthenticated && !to.meta.public) {
      return next({name: "login"});
   }
   if (appStore.isAuthenticated && to.name === "login") {
      return next({name: "home"});
   }
   next();
})
