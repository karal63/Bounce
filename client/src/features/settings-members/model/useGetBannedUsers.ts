import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiGetBannedUsers } from "../api/getBannedUsers";

export const useGetBannedUsers = () => {
    const currentChatStore = useCurrentChatStore();

    const getBannedUsers = async () => {
        try {
            if (!currentChatStore.currentRoom.id) return;
            const bannedMembers = await apiGetBannedUsers(
                currentChatStore.currentRoom.id
            );
            return bannedMembers.data;
        } catch (error) {
            console.log(error);
        }
    };

    return { getBannedUsers };
};
