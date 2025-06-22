import { createRouter, createWebHistory, type Router } from "vue-router";
import { routes } from "@/app/router/routes";

export const appRouter: Router = createRouter({
    history: createWebHistory(),
    routes,
});
