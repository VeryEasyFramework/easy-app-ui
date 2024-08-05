import { createApp } from "vue";

import App from "./App.vue";
import "@eveffer/easy-client/dist/style.css";
import "@eveffer/easy-client/src/style/_index.scss";
import { easyLib } from "@eveffer/easy-client";

const app = createApp(App);
app.use(easyLib);
app.mount("#app");
