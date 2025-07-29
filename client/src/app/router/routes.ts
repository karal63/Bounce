import type { RouteRecordRaw } from "vue-router";
import Landing from "@/pages/landing/index.vue";
import Login from "@/pages/login/index.vue";
import Signup from "@/pages/signup/index.vue";
import ChatPage from "@/pages/chat/index.vue";
import Settings from "@/pages/settings/index.vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import DefaultLayout from "../layout/DefaultLayout.vue";
import ChatLayout from "../layout/ChatLayout.vue";
import ChatNoChat from "@/pages/chat-no-chat/index.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: "",
                component: Landing,
            },
            {
                path: "login",
                component: Login,
            },
            {
                path: "sign-up",
                component: Signup,
            },
            {
                path: "chat",
                component: ChatLayout,
                meta: { requiresAuth: true },
                children: [
                    {
                        path: "",
                        component: ChatNoChat,
                    },
                    {
                        path: ":id",
                        component: ChatPage,
                    },
                ],
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
        ],
    },
];
