import { createRouter, createWebHistory, type Router } from "vue-router";
import { routes } from "@/app/router/routes";
import { useSessionStore } from "@/shared/session/model/sessionStore";

const appRouter: Router = createRouter({
    history: createWebHistory(),
    routes,
});

appRouter.beforeEach((to, _, next) => {
    const auth = useSessionStore();
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default appRouter;
