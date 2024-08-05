import {createApp} from "vue";


import "@eveffer/easy-client/dist/style.css";
import "@eveffer/easy-client/src/style/_index.scss";
import {easyLib} from "@eveffer/easy-client";
import {router} from "@/router/index.ts";
import BasePage from "@/pages/BasePage.vue";

const app = createApp(BasePage);


app.use(easyLib);
app.use(router);
app.mount("#app");
