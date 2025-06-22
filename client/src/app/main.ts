import { createApp } from "vue";
import "@/app/style.css";
import App from "@/app/App.vue";
import { appRouter } from "@/app/router/index";
import { createPinia } from "pinia";

const pinia = createPinia();
createApp(App).use(appRouter).use(pinia).mount("#app");
