import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const findMessagedUserById = (userId: string) => {
    const currentChatStore = useCurrentChatStore();
    return currentChatStore.messagedUsers.find(
        (user) => user.otherUserId === userId
    );
};
