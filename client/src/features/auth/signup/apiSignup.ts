import { type AxiosResponse } from "axios";
import { axiosInstance } from "@/shared/config/axiosInstance";
import type { SignupProps } from "@/features/auth/model/index";

export const apiSignup = async ({
    email,
    password,
    name,
}: SignupProps): Promise<AxiosResponse> => {
    const res = await axiosInstance.post("http://localhost:5000/api/signup", {
        email,
        password,
        name,
    });

    return res;
};
