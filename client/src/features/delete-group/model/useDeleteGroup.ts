import { AxiosError } from "axios";
import { useDeleteGroupStore } from "./deleteGroupStore";
import { apiDeleteGroup } from "../api/deleteGroup";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const useDeleteGroup = () => {
    const deleteGroupStore = useDeleteGroupStore();
    const currentChatStore = useCurrentChatStore();

    const deleteGroup = async () => {
        try {
            if (!deleteGroupStore.contextGroup?.id) return;
            await apiDeleteGroup(deleteGroupStore.contextGroup?.id);
            deleteGroupStore.error = "";
            deleteGroupStore.isDeleteModalOpen = false;
            currentChatStore.groups = currentChatStore.groups.filter(
                (group) => group.id !== deleteGroupStore.contextGroup?.id
            );
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                deleteGroupStore.error = error.response?.data;
            } else {
                console.log(error);
            }
        }
    };

    return { deleteGroup };
};
