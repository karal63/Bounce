import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { appRouter } from "./router/index";
import { createPinia } from "pinia";

const pinia = createPinia();
createApp(App).use(appRouter).use(pinia).mount("#app");
