import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiGetGroups } from "@/shared/api/group/getGroups";

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
