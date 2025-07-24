import { apiCreateGroup } from "@/shared/api/group/createGroup";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useModalStore } from "./modal.store";
import { AxiosError } from "axios";

export const useCreateGroup = () => {
    const sessionStore = useSessionStore();
    const currentChatStore = useCurrentChatStore();
    const modalStore = useModalStore();

    const createGroup = async (groupName: string) => {
        try {
            if (!sessionStore.user?.id) return;
            const newGroup = await apiCreateGroup(
                groupName,
                sessionStore.user?.id,
                ""
            );

            modalStore.isModalOpen = false;
            modalStore.mode = "";

            currentChatStore.groups.push(newGroup.data);
        } catch (error) {
            if (
                error instanceof AxiosError &&
                error.response &&
                error.message
            ) {
                modalStore.error = error.response.data.message;
            } else {
                modalStore.error = "An unexpected error occurred.";
            }
        }
    };

    return { createGroup };
};
