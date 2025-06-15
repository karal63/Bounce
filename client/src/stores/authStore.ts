import { defineStore } from "pinia";

type User = {
    email: string;
    password: string;
    passwordRepeat?: string;
    name?: string;
};

export const useAuthStore = defineStore("authStore", () => {
    const login = async (email: string, password: string) => {
        // send in body email and password
        console.log(email);
    };
    const register = async (user: User) => {
        console.log(user.password, user.passwordRepeat);
        if (user.password !== user.passwordRepeat) {
            console.error("Passwords must match!");
        }
        // send in body email, password and name
        console.log(user.email);
    };

    return {
        login,
        register,
    };
});
