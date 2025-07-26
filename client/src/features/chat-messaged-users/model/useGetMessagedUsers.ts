import { apiGetMessagedUsers } from "@/shared/api/user/getMessagedUsers";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const useGetMessagedUsers = () => {
    const currentChatStore = useCurrentChatStore();

    const getMessagedUsers = async (userId: string) => {
        try {
            const users = await apiGetMessagedUsers(userId);
            console.log(users);
            currentChatStore.messagedUsers = users.data;
        } catch (error) {
            console.log(error);
        }
    };

    return { getMessagedUsers };
};
