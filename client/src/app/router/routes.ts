import type { RouteRecordRaw } from "vue-router";
import Landing from "@/pages/landingPage/index.vue";
import Login from "@/pages/loginPage/index.vue";
import Signup from "@/pages/signupPage/index.vue";
import ChatPage from "@/pages/chatPage/index.vue";

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
