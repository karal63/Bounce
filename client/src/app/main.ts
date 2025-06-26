import { createApp } from "vue";
import "@/app/style.css";
import App from "@/app/App.vue";
import appRouter from "@/app/router/index";
import { createPinia } from "pinia";
import { useSessionStore } from "@/shared/session/model/sessionStore";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const sessionStore = useSessionStore();

if (localStorage.getItem("accessToken")) {
    console.log(localStorage.getItem("accessToken"));
    await sessionStore.checkAuth();
}

app.use(appRouter).mount("#app");
