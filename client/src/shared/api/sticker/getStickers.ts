import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { Sticker } from "@/shared/types/Sticker";
import type { AxiosResponse } from "axios";

export const apiGetStickers = async (): Promise<AxiosResponse<Sticker[]>> => {
    const stickers = await axiosInstance.get(`${API_URL}/stickers`);
    return stickers;
};
