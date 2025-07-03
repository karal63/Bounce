import { apiGetGroups } from "@/entities/Chat/api/getGroups/apiGetGroups";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";

export const useGetGroups = () => {
    const sessionStore = useSessionStore();
    const currentChatStore = useCurrentChatStore();

    const getGroups = async () => {
        try {
            if (!sessionStore.user?.id) return [];
            const groups = await apiGetGroups(sessionStore.user?.id);
            currentChatStore.groups = groups.data;
        } catch (error) {
            console.log(error);
        }
    };

    return { getGroups };
};
