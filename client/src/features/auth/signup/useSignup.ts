import { apiSignup } from "@/features/auth/signup/apiSignup";
import type { User } from "@/shared/types/user";

export const signup = async ({
    email,
    password,
    passwordRepeat,
    name,
}: User) => {
    if (password === passwordRepeat) {
        const res = await apiSignup({
            email,
            password,
            passwordRepeat,
            name,
        });
        console.log(res);
        // next step: store fetched user in store and access token in localstorage
    }
};
