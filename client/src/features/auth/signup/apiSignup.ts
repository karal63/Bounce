import type { SignupProps } from "@/shared/types/auth";
import axios, { type AxiosResponse } from "axios";

// move this to axios config and dont write it all the time
axios.defaults.withCredentials;

export const apiSignup = async ({
    email,
    password,
    name,
}: SignupProps): Promise<AxiosResponse> => {
    const res = await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
        name,
    });

    return res;
};
