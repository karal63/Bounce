import { createRouter, createWebHistory, type Router } from "vue-router";
import { routes } from "./routes";

export const appRouter: Router = createRouter({
    history: createWebHistory(),
    routes,
});
