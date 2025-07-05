import type { RouteRecordRaw } from "vue-router";
import Landing from "@/pages/landing/index.vue";
import Login from "@/pages/login/index.vue";
import Signup from "@/pages/signup/index.vue";
import ChatPage from "@/pages/chat/index.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Landing,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/sign-up",
        component: Signup,
    },
    {
        path: "/chat/:name",
        component: ChatPage,
        meta: { requiresAuth: true },
    },
];
