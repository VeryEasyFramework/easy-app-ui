import {createApp} from "vue";

import "@/style/_index.scss"

import {createPinia} from "pinia";
import App from "@/App.vue";
import {router} from "@/router/index.ts";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");

