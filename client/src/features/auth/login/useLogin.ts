import { apiLogin } from "@/features/auth/login/apiLogin";
import type { User } from "@/shared/types/user";

export const login = async (user: User) => {
    const res = await apiLogin({
        email: user.email,
        password: user.password,
    });
    // next step: store fetched user in store and access token in localstorage
};
