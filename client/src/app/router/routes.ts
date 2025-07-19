import type { RouteRecordRaw } from "vue-router";
import Landing from "@/pages/landing/index.vue";
import Login from "@/pages/login/index.vue";
import Signup from "@/pages/signup/index.vue";
import ChatPage from "@/pages/chat/index.vue";
import Settings from "@/pages/settings/index.vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

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
        path: "/chat",
        component: ChatPage,
        meta: { requiresAuth: true },
    },
    {
        path: "/chat/settings",
        component: Settings,
        meta: { requiresAuth: true },
        beforeEnter: (to, from, next) => {
            const store = useCurrentChatStore();
            if (!store.hasPermissions || !store.currentRoom) {
                next("/chat");
            } else {
                next();
            }
        },
    },
];
