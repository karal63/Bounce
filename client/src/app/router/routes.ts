import type { RouteRecordRaw } from "vue-router";
import Landing from "../../pages/landing/index.vue";
import Auth from "../../pages/auth/index.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Landing,
    },
    {
        path: "/login",
        component: Auth,
        props: { mode: "login" },
    },
    {
        path: "/sign-up",
        component: Auth,
        props: { mode: "signup" },
    },
];
