import type { LoginProps } from "@/shared/types/auth";
import axios, { AxiosError } from "axios";

axios.defaults.withCredentials = true;

export const apiLogin = async ({ email, password }: LoginProps) => {
    const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
    });

    return res;
};
