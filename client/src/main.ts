import {createApp} from "vue";


import "@eveffer/easy-client/style";
import {easyLib} from "@eveffer/easy-client";
import {router} from "@/router/index.ts";
import BasePage from "@/pages/BasePage.vue";
import {createPinia} from "pinia";
import {useRouter} from "vue-router";

const app = createApp(BasePage);
app.use(router);
app.use(easyLib);
router.isReady().then(() => {


   app.mount("#app");
});
