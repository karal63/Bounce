import { apiJoinGroup } from "@/shared/api/group/joinGroup";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { AxiosError } from "axios";
import { useModalStore } from "./modal.store";

export const useJoinGroup = () => {
    const currentChatStore = useCurrentChatStore();
    const sessionStore = useSessionStore();
    const modalStore = useModalStore();

    const join = async (link: string) => {
        try {
            const codeFromLink: string = link.split("/").pop()!;

            if (!sessionStore.user?.id) return;
            const joinedGroup = await apiJoinGroup(
                codeFromLink,
                sessionStore.user?.id
            );

            modalStore.isModalOpen = false;
            modalStore.mode = "";
            currentChatStore.groups.push(joinedGroup.data);
            console.log(currentChatStore.members);
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

    return { join };
};
