import { createRouter, createWebHistory, type Router } from "vue-router";
import { routes } from "@/app/router/routes";
import { useAuthStore } from "@/features/auth/model/authStore";

const appRouter: Router = createRouter({
    history: createWebHistory(),
    routes,
});

appRouter.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default appRouter;
