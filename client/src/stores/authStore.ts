import { defineStore } from "pinia";

type User = {
    email: string;
    password: string;
    passwordRepeat?: string;
    name?: string;
};

export const useAuthStore = defineStore("authStore", () => {
    const login = async (email: string, password: string) => {
        console.log(email);
    };
    const register = async (user: User) => {
        console.log(user.email);
    };

    return {
        login,
        register,
    };
});
