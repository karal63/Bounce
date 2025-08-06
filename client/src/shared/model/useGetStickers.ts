import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiGetStickers } from "@/shared/api/sticker/getStickers";

export const useGetStickers = () => {
    const currentChatStore = useCurrentChatStore();

    const getStickers = async () => {
        try {
            const stickers = await apiGetStickers();
            currentChatStore.stickers = stickers.data;
            console.log(stickers.data);
        } catch (error) {
            console.log(error);
        }
    };

    return { getStickers };
};
