import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const getCurrentGroup = () => {
    const currentChatStore = useCurrentChatStore();
    return currentChatStore.groups.find(
        (group) => group.id === currentChatStore.currentRoom
    );
};
