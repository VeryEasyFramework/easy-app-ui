import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/stores/appStore.ts";

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
          name: "entry",
          path: "/entry",
          children: [
            {
              name: "entryTypes",
              path: "",
              component: () => import("@/views/entry/EntryView.vue"),
            }, {
              name: "entryList",
              path: "/entry/:entryType",
              component: () => import("@/views/entry/EntryListView.vue"),
              props: true,
              children: [{
                name: "entryDetail",
                path: ":id",
                component: () => import("@/views/entry/EntryDetailView.vue"),
                props: true
              }]
            },
          ]
        }, {
          name: "settings",
          path: "/settings",
          component: () => import("@/views/settings/SettingsView.vue"),
          children: [{
            name: "settingsDetail",
            path: "/settings/:settingsType",
            component: () => import("@/views/settings/SettingsDetailView.vue"),
            props: true
          }],

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
