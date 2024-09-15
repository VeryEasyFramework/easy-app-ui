import {createApp} from "vue";
import "@/style/_index.scss"
import LoginView from "./LoginView.vue";
import {createPinia} from "pinia";

const app = createApp(LoginView)

app.use(createPinia());
app.mount("#login");
