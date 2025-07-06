import { apiCreateGroup } from "@/shared/api/group/createGroup";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";

export const useCreateGroup = () => {
    const sessionStore = useSessionStore();
    const currentChatStore = useCurrentChatStore();

    const createGroup = async (groupName: string) => {
        const newGroup = await apiCreateGroup(
            groupName,
            sessionStore.user?.id,
            ""
        );
        currentChatStore.groups.push(newGroup.data);
    };

    return { createGroup };
};
