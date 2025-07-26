import { apiAddMessagedUser } from "@/shared/api/user/addMessagedUser";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const useAddMessagedUsers = () => {
    const currentChatStore = useCurrentChatStore();

    const addMessagedUser = async (userId: string, targetUserId: string) => {
        const exists = currentChatStore.messagedUsers.find(
            (user) =>
                (user.userId === userId &&
                    user.targetUserId === targetUserId) ||
                (user.userId === userId && user.targetUserId === targetUserId)
        );

        if (exists) return;

        await apiAddMessagedUser(userId, targetUserId);
    };

    return { addMessagedUser };
};
