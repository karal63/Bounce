import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import AuthFormPage from "./components/AuthForm/AuthFormPage.vue";
import LandingPage from "./components/Landing/LandingPage.vue";
import {
    createMemoryHistory,
    createRouter,
    createWebHistory,
    type Router,
    type RouteRecordRaw,
} from "vue-router";
import { createPinia } from "pinia";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: LandingPage,
    },
    {
        path: "/login",
        component: AuthFormPage,
        props: { mode: "login" },
    },
    {
        path: "/sign-up",
        component: AuthFormPage,
        props: { mode: "signup" },
    },
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
