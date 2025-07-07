import { axiosInstance } from "@/shared/config/axiosInstance";
import type { LoginProps } from "@/features/auth/model/index";

export const apiLogin = async ({ email, password }: LoginProps) => {
    const res = await axiosInstance.post("http://localhost:5000/api/login", {
        email,
        password,
    });

    return res;
};
